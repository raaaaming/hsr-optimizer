import { DamageResult } from "../../../models/DamageResult.js";
import { computeDamage, resolveEnemy } from "../../damage.js";
import { param } from "../../params.js";

/**
 * 반딧불이 Type-IV•데스 스타 과부하 (강화 전투 스킬, 확산)
 *
 *   "해당 목표에게 기갑 「샘」 공격력의 (#5 x 격파 특수효과 + #1%)만큼 화염 속성 피해를,
 *    인접한 목표에게 기갑 「샘」 공격력의 (#6 x 격파 특수효과 + #2%)만큼 가한다.
 *    격파 특수효과는 최대 #7%까지 계산한다"
 *
 * 반디의 핵심이자, 배율을 자동으로 못 뽑는 이유이기도 하다.
 * 공격력과 격파 특수효과 양쪽에 스케일링하고 격파 특수효과에 상한이 걸린다.
 *
 * 엔진에 인접 개념이 없어서 주 대상 외 적을 인접으로 친다(최대 2체).
 * damage에 전체 합을 넣고 hitCount는 1로 둔다.
 */
export default function fireflySkillEnhanced({
    context, stats, character, build, definition, action
}) {

    const enemy = resolveEnemy(context, action);

    // 격파 특수효과는 상한까지만 계산에 들어간다.
    const breakEffect = Math.min(
        stats.breakEffect ?? 0,
        param(build, definition, 7)
    );

    const common = {
        element: character.element,
        stats,
        attackerLevel: build.level,
        enemy
    };

    const main = computeDamage({
        ...common,
        base: stats.atk * (
            param(build, definition, 5) * breakEffect
            + param(build, definition, 1)
        )
    });

    const adjacentCount = Math.min(
        Math.max(context.enemies.length - 1, 0),
        2
    );

    const adjacent = adjacentCount === 0 ? 0 : computeDamage({
        ...common,
        base: stats.atk * (
            param(build, definition, 6) * breakEffect
            + param(build, definition, 2)
        )
    });

    const result = new DamageResult();

    result.damage = main + adjacent * adjacentCount;
    result.hitCount = 1;
    result.element = character.element;
    result.targetId = enemy.id;

    result.logs.push(
        `주 대상 ${Math.round(main)}` +
        (adjacentCount ? ` + 인접 ${Math.round(adjacent)} x ${adjacentCount}` : "")
    );

    return result;

}
