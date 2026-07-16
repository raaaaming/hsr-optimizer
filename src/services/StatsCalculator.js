import {
    STATS,
    RELIC_MAIN_STATS,
    RELIC_SETS,
    SUBSTAT_ROLL,
    relicMainValue
} from "../data/gameData.js";

import { lightConeRegistry } from "../registry/index.js";

/**
 * 광추 레벨 스케일링.
 *
 * NOTE: 실제 광추는 캐릭터처럼 base/growth/돌파 보정을 가진다.
 *       현재 데이터에는 만렙(80) 수치만 있어 선형 근사로 처리한다.
 *       광추 데이터가 확정되면 Character.baseStatsAt과 같은 형태로 교체할 것.
 */
const LC_LEVEL1_RATIO = 0.10;

function lightConeStatsAt(lightCone, level) {

    const ratio = LC_LEVEL1_RATIO
        + (1 - LC_LEVEL1_RATIO) * ((level - 1) / 79);

    return {
        hp: (lightCone.stats.hp ?? 0) * ratio,
        atk: (lightCone.stats.atk ?? 0) * ratio,
        def: (lightCone.stats.def ?? 0) * ratio
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
            ? lightConeStatsAt(lightCone, build.lightCone.level ?? 80)
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

        for (const trace of character.minorTraces) {

            if (!unlocked.has(trace.id)) continue;

            // 돌파가 모자라면 개방할 수 없다.
            if (trace.unlockAscension > build.ascension) continue;

            add(trace.stat, trace.value);

        }

    }

    applyLightCone(build, add) {

        const lightCone = lightConeRegistry.get(build.lightCone?.id);

        if (!lightCone?.passive) return;

        const index = (build.lightCone.superimposition ?? 1) - 1;

        const effect = lightCone.passive.superimposition?.[index];

        if (!effect) return;

        for (const [key, value] of Object.entries(effect)) {
            add(key, value);
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

            // 부옵션은 굴림값이라 입력값을 그대로 더한다.
            for (const sub of relic.substats ?? []) {
                add(sub.key, sub.value);
            }

        }

    }

    applyRelicSets(build, add) {

        for (const { id, count } of this.resolveSets(build)) {

            const set = RELIC_SETS[id];

            if (!set) continue;

            if (count >= 2 && set.two) {
                for (const [key, value] of Object.entries(set.two)) {
                    add(key, value);
                }
            }

            // 4세트 효과는 조건부가 대부분이라 스탯 합산에 넣지 않는다.

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
            label: RELIC_SETS[id]?.label ?? id,
            active2: count >= 2,
            active4: count >= 4
        }));

    }

    /**
     * 부옵션 명중 횟수 추정.
     * 레퍼런스 UI의 "유효 보조 속성 명중 통계"에 해당한다.
     */
    countRolls(build) {

        const rolls = {};

        for (const relic of build.relics ?? []) {

            for (const sub of relic.substats ?? []) {

                const unit = SUBSTAT_ROLL[sub.key];

                if (!unit) continue;

                rolls[sub.key] = (rolls[sub.key] ?? 0)
                    + Math.round(sub.value / unit);

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
