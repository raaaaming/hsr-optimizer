import { ELEMENT_DMG_KEY } from "../data/gameData.js";

/**
 * 최종 피해 계산.
 *
 * 캐릭터별 공식은 "배율 x 스케일링 스탯"까지만 구하고(= base),
 * 그 뒤의 공통 계수는 전부 여기서 곱한다. 방어력/저항/치명타를
 * 캐릭터마다 다시 쓰면 한 군데만 틀려도 조용히 어긋나기 때문이다.
 *
 *   최종 피해 = base
 *             x (1 + 피해 증가)
 *             x 방어력 계수
 *             x (1 - 저항)
 *             x (1 + 취약)
 *             x 치명타 계수
 *             x 강인도 계수
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
 * 공통 계수를 base에 전부 곱한다.
 *
 * base 는 캐릭터 공식이 구한 "배율 x 스케일링 스탯"이다.
 */
export function computeDamage({
    base,
    element,
    stats,
    attackerLevel,
    enemy,
    extraBoost = 0,
    defReduction = 0,
    defIgnore = 0,
    resPen = 0,
    vulnerability = 0,
    critMode = "expected"
}) {

    return base
        * damageBoostMultiplier({ stats, element, extraBoost })
        * defenseMultiplier({ attackerLevel, enemy, defReduction, defIgnore })
        * resistanceMultiplier({ enemy, element, resPen })
        * (1 + vulnerability)
        * criticalMultiplier({ stats, critMode })
        * toughnessMultiplier({ enemy });

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
