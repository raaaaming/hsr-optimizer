import { Build } from "../models/Build.js";
import { characterRegistry, lightConeRegistry, relicSetRegistry } from "../registry/index.js";
import { statsCalculator } from "../services/StatsCalculator.js";
import { getKit } from "../data/kits/index.js";
import { Battle } from "../engine/Battle.js";
import { getBody } from "../util/http.js";
import { success, error, methodNotAllowed } from "../util/response.js";

/**
 * 턴제 전투 시뮬레이터.
 *
 * 무상태다. 킷·캐릭터 데이터는 직렬화할 수 없어 상태에 안 싣는다. 대신
 *   config : 파티 빌드 + 적 (누가 싸우나) — 매 요청 이걸로 멤버를 재구성한다.
 *   state  : 에너지/SP/조건/타임라인/로그 등 가변 상태만 왕복한다.
 *
 * body:
 *   { op: "init", party: [Build...], enemy?, dpsIndex? }
 *   { op: "act",  config, state, skillId }
 */
export async function handler(request, { repos }) {

    if (request.method !== "POST") {
        return methodNotAllowed(request.method);
    }

    const body = await getBody(request);

    if (body.op === "init") {
        return init(body);
    }
    if (body.op === "act") {
        return act(body);
    }

    return error("op must be 'init' or 'act'.", 400);

}

/** 빌드 config로 전투 멤버를 만든다(스탯/속도/킷/광추/세트). */
function buildMember(buildInput, id) {

    const build = Object.assign(new Build(), buildInput);

    const character = characterRegistry.get(build.character);
    if (!character) throw new Error(`Character not found: ${build.character}`);

    const kit = getKit(build.character);
    if (!kit) throw new Error(`No battle kit for: ${build.character}`);

    const stats = statsCalculator.calculate(character, build);

    const lightCone = lightConeRegistry.get(build.lightCone?.id);

    return {
        id,
        slug: build.character,
        character,
        build,
        stats: stats.final,
        speed: Math.round(stats.final.spd),
        maxEnergy: character.stats?.maxEnergy ?? 0,
        kit,
        lightCone,
        sets: statsCalculator.resolveSets(build),
        setRegistry: slug => relicSetRegistry.get(slug),
        statsCalculator
    };

}

function makeEnemy(input = {}) {
    const toughness = input.toughness ?? 180;
    return {
        level: input.level ?? 80,
        toughness,
        currentToughness: input.currentToughness ?? toughness,
        resistance: input.resistance ?? {
            physical: 0.2, fire: 0.2, ice: 0.2, lightning: 0.2,
            wind: 0.2, quantum: 0.2, imaginary: 0.2
        },
        weakness: input.weakness ?? [],
        defense: input.defense ?? null
    };
}

/** 클라이언트에 보여줄 상태 요약. */
function view(battle) {

    const actorId = battle.currentActor();
    const member = battle.member(actorId);

    return {
        time: Math.round(battle.time * 10) / 10,
        actor: {
            id: actorId,
            name: member.character.name,
            icon: member.character.yattaId,
            element: member.character.element
        },
        available: battle.available(actorId).map(id => ({
            id,
            name: member.kit.actions[id].name,
            icon: member.character.actions.get(id)?.icon ?? null
        })),
        energy: battle.energy,
        maxEnergy: Object.fromEntries(battle.party.map(m => [m.id, m.maxEnergy])),
        sp: battle.sp,
        maxSp: battle.maxSp,
        enemy: {
            toughness: battle.enemy.currentToughness,
            maxToughness: battle.enemy.toughness,
            broken: battle.enemy.currentToughness <= 0
        },
        upcoming: battle.upcoming(5),
        log: battle.log,
        totalDamage: battle.log.reduce((s, l) => s + l.damage, 0),
        conditions: [...battle.activeConditions()]
    };

}

function init(body) {

    const partyInput = body.party ?? [];
    if (partyInput.length === 0) {
        return error("party must have at least one build.", 400);
    }

    let members;
    try {
        members = partyInput.map((b, i) => buildMember(b, b.character ?? `unit${i}`));
    } catch (e) {
        return error(e.message, 400);
    }

    const enemy = makeEnemy(body.enemy);

    const battle = new Battle({ party: members, enemy, budget: body.budget ?? 1000 });

    return success({
        config: { party: partyInput, enemy: body.enemy, dpsIndex: body.dpsIndex ?? 0 },
        state: mutableState(battle),
        view: view(battle)
    });

}

function act(body) {

    const { config, state, skillId } = body;

    if (!config || !state) {
        return error("config and state are required.", 400);
    }

    let members;
    try {
        members = (config.party ?? []).map((b, i) => buildMember(b, b.character ?? `unit${i}`));
    } catch (e) {
        return error(e.message, 400);
    }

    const battle = new Battle({
        party: members,
        enemy: state.enemy,
        budget: state.budget ?? 1000,
        time: state.time,
        conditions: state.conditions,
        log: state.log,
        energy: state.energy,
        sp: state.sp,
        maxSp: state.maxSp,
        timelineAV: state.timelineAV
    });

    let result;
    try {
        result = battle.act(skillId);
    } catch (e) {
        return error(e.message, 400);
    }

    return success({
        result,
        state: mutableState(battle),
        view: view(battle)
    });

}

/** 상태에서 가변 부분만 뽑는다(파티/킷 제외). */
function mutableState(battle) {
    const s = battle.toState();
    return {
        enemy: s.enemy,
        budget: s.budget,
        time: s.time,
        conditions: s.conditions,
        log: s.log,
        energy: s.energy,
        sp: s.sp,
        maxSp: s.maxSp,
        timelineAV: s.timelineAV
    };
}
