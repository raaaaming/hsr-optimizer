/**
 * 턴제 전투 엔진.
 *
 * AV 타임라인이 행동 순서를 정하고, 사용자가 그 캐릭터의 스킬을 골라 진행한다.
 * 로테이션은 데이터가 아니라 사용자의 손이 정한다.
 *
 * 무상태 서버를 위해 전체 상태를 JSON으로 주고받는다(toState/fromState).
 * 계산 로직(타임라인/수정자/데미지)은 이미 있는 걸 그대로 쓴다.
 *
 * v1 범위: 행동 순서 + 스킬 데미지 + 타이밍 버프 + 강인도(약점 격파).
 * 에너지/SP는 정확한 데이터가 필요해 후속으로 미룬다.
 */

import { Timeline } from "./Timeline.js";
import { Enemy } from "../models/Enemy.js";
import { computeDamage } from "../formula/damage.js";
import { collectPartyModifiers } from "../formula/modifierSources.js";

/** 1턴 ≈ 대상 속도로 환산한 AV. 버프 지속 시간(턴)을 AV로 바꾼다. */
const turnsToAV = (turns, speed) => turns * (10000 / speed);

export class Battle {

    /**
     * party: [{ id, slug, character, build, stats, speed, kit, lightCone, sets, setRegistry }]
     * enemy: { level, toughness, currentToughness, resistance, weakness, defense }
     */
    constructor({
        party, enemy, budget = 1000, time = 0, conditions = [], log = [],
        timelineAV, energy, sp, maxSp
    }) {

        this.party = party;
        this.enemy = enemy;
        this.budget = budget;

        this.timeline = new Timeline(party.map(m => ({ id: m.id, speed: m.speed })));
        this.timeline.time = time;
        // 저장된 av가 있으면 복원
        if (timelineAV) {
            for (const u of this.timeline.units) {
                if (timelineAV[u.id] != null) u.av = timelineAV[u.id];
            }
        }

        // 조건 => 만료 시간(AV)
        this.conditions = new Map(conditions);

        // 캐릭터별 에너지. 시작 시 최대치의 절반(게임 관례).
        this.energy = energy ?? Object.fromEntries(
            party.map(m => [m.id, Math.floor((m.maxEnergy ?? 0) / 2)])
        );

        // 전투 스킬 포인트. 기본 최대 5, 시작 3.
        // 특정 캐릭터가 상한을 올리면 member.spBonus로 더한다.
        this.maxSp = maxSp ?? (5 + party.reduce((s, m) => s + (m.spBonus ?? 0), 0));
        this.sp = sp ?? Math.min(3, this.maxSp);

        this.log = log;

    }

    get time() { return this.timeline.time; }

    member(id) { return this.party.find(m => m.id === id); }

    /** 지금 행동할 캐릭터. */
    currentActor() { return this.timeline.peek().id; }

    /**
     * 다음 n턴 행동 순서 미리보기(상태를 바꾸지 않는다).
     * 행동 순서 바에 쓴다.
     */
    upcoming(n = 5) {
        const clone = new Timeline(this.party.map(m => ({ id: m.id, speed: m.speed })));
        clone.time = this.time;
        for (const u of clone.units) {
            const cur = this.timeline.unit(u.id);
            if (cur) u.av = cur.av;
        }
        const out = [];
        for (let i = 0; i < n; i++) {
            const { unit } = clone.advance();
            const member = this.member(unit);
            out.push({ id: unit, name: member.character.name, icon: member.character.yattaId });
        }
        return out;
    }

    /** 지금 활성인 조건 집합. */
    activeConditions() {
        const active = new Set();
        for (const [c, expiry] of this.conditions) {
            if (expiry > this.time) active.add(c);
        }
        return active;
    }

    /**
     * 시드 액션(에너지/강인도/params). member.character.actions에서 찾는다.
     * 실제 모델은 Map, 테스트는 배열이라 둘 다 받는다.
     */
    seedAction(member, id) {
        const acts = member.character?.actions;
        if (acts instanceof Map) return acts.get(id);
        if (Array.isArray(acts)) return acts.find(a => a.id === id);
        return member.actions?.[id];
    }

    /**
     * 이 캐릭터가 지금 쓸 수 있는 스킬 id 목록.
     * 강화 상태면 원래 스킬 대신 강화 스킬을 주고, 자원 부족 스킬은 뺀다.
     */
    available(actorId) {

        const member = this.member(actorId);
        const kit = member.kit;
        const enhanced = kit.enhanceCondition && this.activeConditions().has(kit.enhanceCondition);

        const list = [];
        for (const [id, action] of Object.entries(kit.actions)) {
            if (action.requires && !this.activeConditions().has(action.requires)) continue;
            // 강화 상태에서 원본이 강화 스킬로 치환되면 원본은 숨긴다.
            if (enhanced && (id === "basic" || id === "skill")) continue;
            if (!enhanced && action.requires === "enhanced") continue;

            // 필살기는 에너지가 최대치에 도달해야.
            if (id === "ultimate" && this.energy[actorId] < (member.maxEnergy ?? 0)) continue;
            // 스킬 포인트가 모자라면 못 쓴다(스킬 -1 등).
            if (this.sp + (action.sp ?? 0) < 0) continue;

            list.push(id);
        }
        return list;

    }

    /**
     * 액션의 스킬 레벨 배율을 읽는 함수. (스킬 레벨은 build.skills)
     */
    paramReader(member, action) {
        const seedAction = this.seedAction(member, action._id);
        const level = member.build?.skills?.[seedAction?.levelKey ?? action._id] ?? seedAction?.maxLevel ?? 1;
        const params = seedAction?.params ?? {};
        return n => {
            const arr = params[String(n)];
            if (!Array.isArray(arr)) return 0;
            return arr[Math.min(level - 1, arr.length - 1)];
        };
    }

    /**
     * 지금 행동자가 skillId를 쓴다.
     * { damage, broken, actor, skill } 를 반환하고 타임라인을 진행한다.
     */
    act(skillId) {

        const actorId = this.currentActor();
        const member = this.member(actorId);
        const action = { ...member.kit.actions[skillId], _id: skillId };

        if (!action.damageType) {
            throw new Error(`Unknown skill: ${skillId}`);
        }
        if (!this.available(actorId).includes(skillId)) {
            throw new Error(`Skill not available now: ${skillId}`);
        }

        const element = member.character.element;
        const conditions = this.activeConditions();
        const idx = this.party.indexOf(member);

        // 파티 제공 버프(광추/유물) 수집 => 지금 조건으로 해석
        const partyMods = collectPartyModifiers(this.party, idx);
        const { statBonus, situational } = partyMods.resolve({
            conditions, damageType: action.damageType, element
        });

        // 동적 버프를 얹은 전투 시점 스탯
        const stats = member.statsCalculator
            ? member.statsCalculator.combatStats(member.character, member.build, statBonus)
            : mergeStats(member.stats, statBonus);

        let damage = 0;

        if (action.damageType !== "none") {

            const param = this.paramReader(member, action);

            const multiplier = typeof action.multiplier === "function"
                ? action.multiplier({ param, stats })
                : param(action.param);

            const hits = this.enemyList(action.target);

            for (const enemy of hits) {
                damage += computeDamage({
                    type: action.damageType,
                    scaling: stats[action.scaling] ?? 0,
                    multiplier,
                    element, stats,
                    attackerLevel: member.build?.level ?? 80,
                    enemy,
                    situational
                });
            }

            // 강인도 감소는 시드값(Yatta). 첫 대상 기준으로 단순화.
            const seed = this.seedAction(member, skillId);
            if (seed?.toughness) this.reduceToughness(seed.toughness);

        }

        // 자원 갱신. 에너지는 시드에서, SP는 킷에서.
        const seed = this.seedAction(member, skillId);
        if (skillId === "ultimate") {
            this.energy[actorId] = 0;                       // 필살기: 에너지 소진
        } else {
            const cap = member.maxEnergy ?? 0;
            this.energy[actorId] = Math.min(cap, this.energy[actorId] + (seed?.energy ?? 0));
        }
        this.sp = Math.max(0, Math.min(this.maxSp, this.sp + (action.sp ?? 0)));

        // 이 액션이 켜는 버프
        for (const buff of action.buffs ?? []) {
            this.setCondition(buff.condition, turnsToAV(buff.turns ?? 1, member.speed));
        }
        if (action.enter) {
            this.setCondition(action.enter, turnsToAV(2, member.speed));
        }
        // 방금 이 캐릭터가 필살기를 썼다는 조건 (광추 afterUltimate 등)
        if (skillId === "ultimate") this.setCondition("afterUltimate", turnsToAV(2, member.speed));
        if (skillId === "skill" || skillId === "skill2") this.setCondition("afterSkill", turnsToAV(1, member.speed));

        // 타임라인 진행
        this.timeline.advance();

        const result = {
            time: this.time, actor: actorId, skill: skillId,
            name: action.name, damage: Math.round(damage),
            broken: this.enemy.currentToughness <= 0,
            energy: this.energy[actorId], sp: this.sp
        };
        this.log.push(result);

        return result;

    }

    setCondition(condition, durationAV = Infinity) {
        const expiry = this.time + durationAV;
        this.conditions.set(condition, Math.max(this.conditions.get(condition) ?? 0, expiry));
    }

    reduceToughness(amount) {
        this.enemy.currentToughness = Math.max(0, this.enemy.currentToughness - amount);
    }

    enemyList() {
        // v1: 단일 적. blast/all도 같은 적 하나로 계산.
        // 데미지 계산은 Enemy 인스턴스(baseDefense 등)를 쓰므로 plain 상태에서 만든다.
        const e = Object.assign(new Enemy(), this.enemy);
        return [e];
    }

    /** 무상태 서버용 직렬화. */
    toState() {
        return {
            party: this.party,
            enemy: this.enemy,
            budget: this.budget,
            time: this.time,
            conditions: [...this.conditions],
            log: this.log,
            energy: this.energy,
            sp: this.sp,
            maxSp: this.maxSp,
            timelineAV: Object.fromEntries(this.timeline.units.map(u => [u.id, u.av]))
        };
    }

    static fromState(state) {
        return new Battle(state);
    }

}

/** statsCalculator가 없을 때(테스트) 스탯에 % 버프를 대충 얹는다. */
function mergeStats(stats, statBonus) {
    const out = { ...stats };
    for (const [k, v] of Object.entries(statBonus)) {
        out[k] = (out[k] ?? 0) + v;
    }
    return out;
}
