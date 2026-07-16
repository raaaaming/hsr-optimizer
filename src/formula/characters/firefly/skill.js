import { DamageResult } from "../../../models/DamageResult.js";

/**
 * DamageEngine이 넘기는 인자 형태에 맞춘다.
 * { context, stats, character, build, definition, action }
 *
 * NOTE: 배율은 자리표시자다. 실제 게임 수치가 아니며
 *       Firefly의 실제 킷은 격파 특화라 별도 모델링이 필요하다.
 */
export default function fireflySkill({ stats, character, definition, action }) {

    const result = new DamageResult();

    result.damage = stats.atk * 2.4;

    result.hitCount = definition.hitCount;

    result.element = character.element;

    result.targetId = action.target;

    return result;

}
