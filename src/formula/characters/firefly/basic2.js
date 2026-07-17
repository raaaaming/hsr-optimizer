import { DamageResult } from "../../../models/DamageResult.js";
import { computeDamage, resolveEnemy } from "../../damage.js";
import { param } from "../../params.js";

/**
 * 반딧불이 Type-IV•뇌관 참격 (강화 일반 공격)
 *
 *   "자신의 HP 최대치의 #2%만큼 HP를 회복한다.
 *    지정된 단일 적에게 기갑 「샘」 공격력의 #1%만큼 화염 속성 피해를 가한다"
 *
 * 「완전연소」 상태에서만 쓸 수 있고 레벨은 일반 공격과 공유한다(levelKey: basic).
 * 회복(#2)은 전투 상태의 영역이라 여기서 다루지 않는다.
 */
export default function fireflyBasicEnhanced({
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
