import { DamageResult } from "../../../models/index.js";
import { computeDamage, resolveEnemy } from "../../damage.js";
import { param } from "../../params.js";

/**
 * 지령-폭연 추진 (일반 공격)
 *
 *   "지정된 단일 적에게 기갑 「샘」 공격력의 #1%만큼 화염 속성 피해를 가한다"
 */
export default function fireflyBasic({
    context, stats, character, build, definition, action
}) {

    const enemy = resolveEnemy(context, action);

    const result = new DamageResult();

    result.damage = computeDamage({
        base: stats.atk * param(build, definition, 1),
        element: character.element,
        stats,
        attackerLevel: build.level,
        enemy
    });

    result.hitCount = definition.hitCount;
    result.element = character.element;
    result.targetId = enemy.id;

    return result;

}
