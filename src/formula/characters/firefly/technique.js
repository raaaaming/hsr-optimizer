import { DamageResult } from "../../../models/DamageResult.js";
import { computeDamage, resolveEnemy } from "../../damage.js";
import { param } from "../../params.js";

/**
 * Δ지령-초토화 운석 폭격 (비술)
 *
 *   "모든 적에게 화염 속성 약점을 추가한다, 지속 시간: #3턴.
 *    이후 모든 적에게 기갑 「샘」 공격력의 #2%만큼 화염 속성 피해를 가한다"
 *
 * 비술은 레벨이 없다(maxLevel 1). 약점 부여(#3)는 전투 상태의 영역이다.
 * 전체 공격이라 모든 적의 피해를 합쳐 damage에 넣는다.
 */
export default function fireflyTechnique({
    context, stats, character, build, definition, action
}) {

    const enemy = resolveEnemy(context, action);

    const multiplier = param(build, definition, 2);

    const total = context.enemies.reduce((sum, target) => sum + computeDamage({
        base: stats.atk * multiplier,
        element: character.element,
        stats,
        attackerLevel: build.level,
        enemy: target
    }), 0);

    const result = new DamageResult();

    result.damage = total;
    result.hitCount = 1;
    result.element = character.element;
    result.targetId = enemy.id;

    result.logs.push(`전체 공격 ${context.enemies.length}체`);

    return result;

}
