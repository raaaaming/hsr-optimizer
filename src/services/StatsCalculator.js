import {
    STATS,
    RELIC_MAIN_STATS,
    relicMainValue,
    substatValue
} from "../data/gameData.js";

import { lightConeRegistry, relicSetRegistry } from "../registry/index.js";
import { LIGHT_CONE_PASSIVES } from "../data/lightConePassives.js";
import { RELIC_SET_EFFECTS } from "../data/relicSetEffects.js";

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
     * 어느 자리표시자가 어느 스탯인지는 lightConePassives.js에 적혀 있고,
     * 값은 시드의 원본 params에서 읽는다. 해석이 없는 광추는 건너뛴다.
     */
    applyLightCone(build, add) {

        const lightCone = lightConeRegistry.get(build.lightCone?.id);

        if (!lightCone) return;

        const effects = LIGHT_CONE_PASSIVES[lightCone.slug];

        if (!effects) return;

        const index = (build.lightCone.superimposition ?? 1) - 1;

        for (const effect of effects) {

            const value = lightCone.passive?.params?.[effect.param]?.[index];

            add(effect.stat, value);

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
     * 2세트 효과의 상시 스탯 보너스.
     *
     * 광추 패시브와 같은 구조다. 해석은 relicSetEffects.js에, 수치는 시드에.
     * 4세트 효과는 조건부가 대부분이라 스탯 합산에 넣지 않는다(설명만 보여준다).
     */
    applyRelicSets(build, add) {

        for (const { id, count } of this.resolveSets(build)) {

            if (count < 2) continue;

            const effects = RELIC_SET_EFFECTS[id];

            if (!effects) continue;

            const params = relicSetRegistry.get(id)?.effects?.["2"]?.params;

            for (const effect of effects) {

                // 세트 효과는 중첩 단계가 없어 배열 길이가 항상 1이다.
                add(effect.stat, params?.[effect.param]?.[0]);

            }

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
