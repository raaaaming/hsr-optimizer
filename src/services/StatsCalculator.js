import {
    STATS,
    RELIC_MAIN_STATS,
    relicMainValue,
    substatValue
} from "../data/gameData.js";

import { lightConeRegistry, relicSetRegistry } from "../registry/index.js";
import { lightConeModifiers, relicSetModifiers } from "../formula/modifierSources.js";
import { STAT_BUCKETS } from "../formula/modifiers.js";

/**
 * 광추 기본 스탯. Character.baseStatsAt과 같은 공식이다.
 *
 *   value = base + growth * (level - 1) + ascensionAdd[ascension]
 */
function lightConeStatsAt(lightCone, level, ascension) {

    const add = lightCone.stats.ascensionAdd?.[ascension]
        ?? lightCone.stats.ascensionAdd?.at(-1)
        ?? { hp: 0, atk: 0, def: 0 };

    const scale = key =>
        (lightCone.stats.base?.[key] ?? 0)
        + (lightCone.stats.growth?.[key] ?? 0) * (level - 1)
        + (add[key] ?? 0);

    return {
        hp: scale("hp"),
        atk: scale("atk"),
        def: scale("def")
    };

}

export class StatsCalculator {

    /**
     * Character + Build => 최종 스펙
     *
     * 반환 형태는 UI가 "기본값 +보너스 = 최종값"을 그대로 보여줄 수 있도록
     * base / bonus / final 을 분리한다.
     */
    calculate(character, build) {

        const base = this.resolveBase(character, build);

        const bonus = this.collectBonuses(character, build);

        const final = this.combine(base, bonus);

        return {
            base,
            bonus,
            final,
            sets: this.resolveSets(build),
            rolls: this.countRolls(build)
        };

    }

    /**
     * 캐릭터 기본 스탯 + 광추 기본 스탯
     */
    resolveBase(character, build) {

        const charBase = character.baseStatsAt(build.level, build.ascension);

        const lightCone = lightConeRegistry.get(build.lightCone?.id);

        const lcStats = lightCone
            ? lightConeStatsAt(
                lightCone,
                build.lightCone.level ?? 80,
                build.lightCone.ascension ?? 6
            )
            : { hp: 0, atk: 0, def: 0 };

        return {
            hp: charBase.hp + lcStats.hp,
            atk: charBase.atk + lcStats.atk,
            def: charBase.def + lcStats.def,
            spd: charBase.spd,
            taunt: charBase.taunt
        };

    }

    /**
     * 행적 / 광추 효과 / 유물 주·부옵션 / 세트 효과를 하나의 가산 풀로 모은다.
     */
    collectBonuses(character, build) {

        const bonus = {};

        const add = (key, value) => {
            if (!key || typeof value !== "number") return;
            bonus[key] = (bonus[key] ?? 0) + value;
        };

        this.applyTraces(character, build, add);
        this.applyLightCone(build, add);
        this.applyRelics(build, add);
        this.applyRelicSets(build, add);
        this.applyEidolons(character, build, add);

        return bonus;

    }

    /**
     * 작은 행적. 개방한 노드만 반영한다.
     * 큰 행적(A2/A4/A6)은 스탯이 아니라 효과라 데미지 계산 쪽에서 다룬다.
     */
    applyTraces(character, build, add) {

        const unlocked = new Set(build.traces?.minor ?? []);

        const majorOn = build.traces?.major ?? {};

        for (const trace of character.minorTraces) {

            if (!unlocked.has(trace.id)) continue;

            // 승급이 모자라면 개방할 수 없다.
            if (trace.unlockAscension > build.ascension) continue;

            // 매달린 큰 행적이 꺼져 있으면 이 작은 행적도 열 수 없다.
            // (UI가 막지만 저장된 빌드가 어긋날 수 있어 여기서도 지킨다)
            if (trace.parentMajor && !majorOn[trace.parentMajor]) continue;

            add(trace.stat, trace.value);

        }

    }

    /**
     * 광추 패시브의 상시 스탯 보너스.
     *
     * 광추 패시브는 이제 수정자 목록이다. 그중 조건 없는(상시) 스탯 버킷만
     * 최종 스탯 시트에 반영한다. 조건부 버프(궤멸 상태 격파 피해 등)와 상황
     * 버킷(dmgBoost 등)은 데미지 엔진의 몫이라 여기선 뺀다.
     */
    applyLightCone(build, add) {

        const lightCone = lightConeRegistry.get(build.lightCone?.id);

        if (!lightCone) return;

        const modifiers = lightConeModifiers(
            lightCone,
            build.lightCone?.superimposition ?? 1
        );

        for (const modifier of modifiers) {

            // 정적 시트에는 "상시 · 자기(또는 전체 아군) · 스택 아님 · 스탯 버킷"만.
            if (modifier.when) continue;                        // 조건부 => 데미지 전용
            if (modifier.stacks) continue;                      // 스택 => 동적, 시트 아님
            if (!STAT_BUCKETS.has(modifier.bucket)) continue;   // 상황 버킷 => 시트 아님

            const target = modifier.target ?? "self";
            if (target !== "self" && target !== "allies") continue; // 착용자에게 안 걸림

            add(modifier.bucket, modifier.value);

        }

    }

    applyRelics(build, add) {

        for (const relic of build.relics ?? []) {

            if (!relic?.slot) continue;

            // 주옵션은 레벨에 따라 오르므로 최대치에서 역산한다.
            const max = RELIC_MAIN_STATS[relic.slot]?.[relic.mainStat];

            if (typeof max === "number") {
                add(relic.mainStat, relicMainValue(max, relic.level ?? 15));
            }

            // 부옵션 값은 굴림의 합이다.
            for (const sub of relic.substats ?? []) {
                add(sub.key, substatValue(sub.key, sub.rolls));
            }

        }

    }

    /**
     * 유물 세트의 상시 스탯 보너스.
     *
     * 광추와 같다. 세트 효과를 수정자로 만든 뒤, 시트엔 "상시·자기(또는 전체
     * 아군)·스택 아님·스탯 버킷"만 반영한다. 조건부/피해 버프는 데미지 엔진의 몫.
     */
    applyRelicSets(build, add) {

        const modifiers = relicSetModifiers(
            this.resolveSets(build),
            id => relicSetRegistry.get(id)
        );

        for (const modifier of modifiers) {

            if (modifier.when) continue;
            if (modifier.stacks) continue;
            if (!STAT_BUCKETS.has(modifier.bucket)) continue;

            const target = modifier.target ?? "self";
            if (target !== "self" && target !== "allies") continue;

            add(modifier.bucket, modifier.value);

        }

    }

    applyEidolons(character, build, add) {

        // TODO: 성혼별 스탯 보정

    }

    /**
     * 착용 중인 세트와 개수
     */
    resolveSets(build) {

        const counts = new Map();

        for (const relic of build.relics ?? []) {

            if (!relic?.set) continue;

            counts.set(relic.set, (counts.get(relic.set) ?? 0) + 1);

        }

        return [...counts].map(([id, count]) => ({
            id,
            count,
            label: relicSetRegistry.get(id)?.name ?? id,
            active2: count >= 2,
            active4: count >= 4
        }));

    }

    /**
     * 부옵션 명중 횟수 추정.
     * 레퍼런스 UI의 "유효 보조 속성 명중 통계"에 해당한다.
     */
    countRolls(build) {

        // 유효 옵션으로 고른 것만 센다. 어떤 부옵션이 유효한지는
        // 캐릭터마다 달라서 사용자가 직접 고른다.
        const effective = new Set(build.effectiveStats ?? []);

        const rolls = {};

        for (const key of effective) {
            rolls[key] = 0;
        }

        for (const relic of build.relics ?? []) {

            for (const sub of relic.substats ?? []) {

                if (!effective.has(sub.key)) continue;

                // 값에서 역산하지 않는다. 굴림 횟수가 곧 명중 횟수다.
                rolls[sub.key] += sub.rolls?.length ?? 0;

            }

        }

        return rolls;

    }

    /**
     * 동적 버프를 얹은 전투 시점 스탯.
     *
     * 정적 스탯(행적/유물/광추)에 그 타격 순간의 버프(statBonus)를 더해
     * 다시 combine한다. 공격력 버프가 기본 공격력에 곱해지는 것 등이
     * 정적 버프와 똑같이 처리된다. 2층 수정자 시스템이 statBonus를 준다.
     */
    combatStats(character, build, statBonus = {}) {

        const base = this.resolveBase(character, build);

        const bonus = this.collectBonuses(character, build);

        // 정적 + 동적 버킷 합산
        const merged = { ...bonus };
        for (const [key, value] of Object.entries(statBonus)) {
            merged[key] = (merged[key] ?? 0) + value;
        }

        return this.combine(base, merged);

    }

    /**
     * base * (1 + %) + flat
     */
    combine(base, bonus) {

        const pct = key => bonus[key] ?? 0;

        const final = {
            hp:  base.hp  * (1 + pct("hpPct"))  + pct("hp"),
            atk: base.atk * (1 + pct("atkPct")) + pct("atk"),
            def: base.def * (1 + pct("defPct")) + pct("def"),
            spd: base.spd * (1 + pct("spdPct")) + pct("spd"),

            // 기본값이 있는 스탯들
            critRate:    0.05 + pct("critRate"),
            critDamage:  0.50 + pct("critDamage"),
            energyRegen: 1.00 + pct("energyRegen"),

            breakEffect:     pct("breakEffect"),
            effectHitRate:   pct("effectHitRate"),
            effectRes:       pct("effectRes"),
            outgoingHealing: pct("outgoingHealing"),

            taunt: base.taunt
        };

        // 속성 피해 증가
        for (const key of Object.keys(STATS)) {
            if (key.endsWith("Dmg")) final[key] = pct(key);
        }

        return final;

    }

}

export const statsCalculator = new StatsCalculator();
