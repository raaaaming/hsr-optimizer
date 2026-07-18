import { ELEMENT_DMG_KEY } from "../data/gameData.js";
import { breakLevelMultiplier, BREAK_ELEMENT_RATIO } from "./breakData.js";

/**
 * 최종 피해 계산.
 *
 * 게임의 피해는 유형마다 공식이 다르다. 일반 피해는 공격력×배율에 방어/저항/
 * 치명타를 곱하지만, 격파/초격파는 치명타도 속성피해증가도 안 받고 격파특효로
 * 스케일하며 레벨 계수가 따로 있다. 그래서 유형별 함수로 나누고, 방어/저항/
 * 취약처럼 공통인 계수만 공유한다. 캐릭터마다 다시 쓰면 한 곳만 틀려도
 * 조용히 어긋나기 때문이다.
 *
 * 유형(damage type):
 *   normal     일반 피해 (공격력/HP/방어력 × 배율, 치명타 O)
 *   break      격파 피해 (약점 격파 순간, 원소별 고정 × 격파특효, 치명타 X)
 *   superBreak 초격파 (강인도 소모 × 격파특효, 치명타 X)
 *   dot        지속 피해 (턴마다, 치명타 X)
 */

/**
 * 방어력 계수.
 *
 *   계수 = (공격자 레벨 x 10 + 200)
 *        / (공격자 레벨 x 10 + 200 + 적 방어력 x (1 - 방어력 감소) x (1 - 방어력 무시))
 *
 * 방어력 감소(디버프)와 방어력 무시(관통)는 곱연산으로 따로 적용된다.
 */
export function defenseMultiplier({
    attackerLevel,
    enemy,
    defReduction = 0,
    defIgnore = 0
}) {

    const constant = attackerLevel * 10 + 200;

    const effectiveDef =
        enemy.baseDefense()
        * (1 - defReduction)
        * (1 - defIgnore);

    return constant / (constant + Math.max(0, effectiveDef));

}

/**
 * 저항 계수. 관통이 저항을 넘으면 1을 넘을 수 있다(게임도 그렇다).
 */
export function resistanceMultiplier({ enemy, element, resPen = 0 }) {

    const resistance = enemy.resistance?.[element] ?? 0;

    return 1 - (resistance - resPen);

}

/**
 * 치명타 계수.
 *
 * 기본은 기댓값(1 + 확률 x 피해)이다. 사이클 합계를 보는 도구라
 * 매 타격을 확률로 굴리면 결과가 흔들려 비교가 안 된다.
 * mode: "expected" | "always" | "never"
 */
export function criticalMultiplier({ stats, mode = "expected" }) {

    const rate = Math.min(Math.max(stats.critRate ?? 0, 0), 1);

    const damage = stats.critDamage ?? 0;

    if (mode === "always") return 1 + damage;

    if (mode === "never") return 1;

    return 1 + rate * damage;

}

/**
 * 강인도(약점 격파) 계수.
 * 약점이 격파되지 않은 적은 받는 피해가 10% 줄어든다.
 */
export function toughnessMultiplier({ enemy }) {

    return enemy.currentToughness > 0 ? 0.9 : 1.0;

}

/**
 * 속성 피해 증가 + 추가 피해 증가.
 */
export function damageBoostMultiplier({ stats, element, extraBoost = 0 }) {

    const key = ELEMENT_DMG_KEY[element];

    return 1 + (stats[key] ?? 0) + extraBoost;

}

/**
 * 방어/저항/취약을 한 번에 묶는다. 세 유형이 공유한다.
 */
function mitigation({
    attackerLevel, enemy, element,
    defReduction = 0, defIgnore = 0, resPen = 0, vulnerability = 0
}) {
    return defenseMultiplier({ attackerLevel, enemy, defReduction, defIgnore })
        * resistanceMultiplier({ enemy, element, resPen })
        * (1 + vulnerability);
}

/**
 * 일반 피해.
 *
 * base = 배율 × 스케일링 스탯. 여기에 속성피해증가/치명타/강인도 계수를 곱한다.
 */
export function normalDamage({
    base, element, stats, attackerLevel, enemy,
    extraBoost = 0, defReduction = 0, defIgnore = 0, resPen = 0,
    vulnerability = 0, critMode = "expected"
}) {
    return base
        * damageBoostMultiplier({ stats, element, extraBoost })
        * mitigation({ attackerLevel, enemy, element, defReduction, defIgnore, resPen, vulnerability })
        * criticalMultiplier({ stats, critMode })
        * toughnessMultiplier({ enemy });
}

/**
 * 격파 피해. 약점을 격파하는 순간의 즉시 피해다.
 *
 *   격파 기본 = 원소배율 × 레벨계수(적 레벨) × 강인도계수
 *   강인도계수 = 0.5 + MaxToughness / 40
 *   격파 피해 = 격파 기본 × (1+격파특효) × (1+격파피해증가) × 방어 × 저항 × 취약
 *
 * 치명타도 속성피해증가도 받지 않는다. 격파 순간이라 강인도 감산(0.9)도 없다.
 *
 * NOTE: MaxToughness 단위(표기값 vs 유닛)는 인게임 격파 수치로 아직 확정
 *       못 했다. 지금은 표기값(적 toughness) 기준이다. 초격파는 별개로 확정됨.
 */
export function breakDamage({
    element, stats, attackerLevel, enemy,
    breakDmgIncrease = 0, defReduction = 0, defIgnore = 0, resPen = 0, vulnerability = 0
}) {
    const ratio = BREAK_ELEMENT_RATIO[element] ?? 1;

    const toughnessCoef = 0.5 + (enemy.toughness ?? 0) / 40;

    const breakBase = ratio * breakLevelMultiplier(enemy.level) * toughnessCoef;

    return breakBase
        * (1 + (stats.breakEffect ?? 0))
        * (1 + breakDmgIncrease)
        * mitigation({ attackerLevel, enemy, element, defReduction, defIgnore, resPen, vulnerability });
}

/**
 * 초격파. 타격의 강인도 소모량이 곧 피해로 환산된다.
 *
 *   초격파 = (강인도소모 ÷ 10) × 레벨계수 × 능력배율 × (1+격파특효)
 *          × (1+격파피해증가) × (1+초격파증가) × 방어 × 저항 × 취약
 *
 * BitTopup 예시(강인도 90, 배율 0.25 => Base 8478 ≈ 8500)로 교차검증했다.
 * toughnessReduction은 표기값이다(÷10으로 유닛 환산).
 */
export function superBreakDamage({
    element, stats, attackerLevel, enemy, toughnessReduction, abilityMultiplier = 1,
    breakDmgIncrease = 0, superBreakIncrease = 0,
    defReduction = 0, defIgnore = 0, resPen = 0, vulnerability = 0
}) {
    return (toughnessReduction / 10)
        * breakLevelMultiplier(enemy.level)
        * abilityMultiplier
        * (1 + (stats.breakEffect ?? 0))
        * (1 + breakDmgIncrease)
        * (1 + superBreakIncrease)
        * mitigation({ attackerLevel, enemy, element, defReduction, defIgnore, resPen, vulnerability });
}

/**
 * 지속 피해. 턴마다 들어가고 치명타가 없다.
 * 속성피해증가는 받는다(격파와 다른 점). 강인도 감산도 없다.
 */
export function dotDamage({
    base, element, stats, attackerLevel, enemy,
    extraBoost = 0, defReduction = 0, defIgnore = 0, resPen = 0, vulnerability = 0
}) {
    return base
        * damageBoostMultiplier({ stats, element, extraBoost })
        * mitigation({ attackerLevel, enemy, element, defReduction, defIgnore, resPen, vulnerability });
}

/**
 * 유형으로 라우팅한다. 선언형 능력 기술이 { type } 을 주면 여기가 받는다.
 * type 기본값은 normal이라 기존 공식은 그대로 동작한다.
 */
export function computeDamage({ type = "normal", ...args }) {
    switch (type) {
        case "break":      return breakDamage(args);
        case "superBreak": return superBreakDamage(args);
        case "dot":        return dotDamage(args);
        case "normal":     return normalDamage(args);
        default:
            throw new Error(`Unknown damage type: ${type}`);
    }
}

/**
 * 공식이 때리는 대상.
 * action.target이 없으면 첫 번째 적을 쓴다.
 */
export function resolveEnemy(context, action) {

    const enemy = action.target
        ? context.enemies.find(e => e.id === action.target)
        : context.enemies[0];

    if (!enemy) {
        throw new Error("Enemy not found.");
    }

    return enemy;

}
