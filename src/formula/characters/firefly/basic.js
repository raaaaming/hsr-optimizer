import { DamageResult } from "../../../models/DamageResult.js";

/**
 * NOTE: 배율은 자리표시자다. 실제 게임 수치로 교체해야 한다.
 */
export default function fireflyBasic({ stats, character, definition, action }) {

    const result = new DamageResult();

    result.damage = stats.atk * 1.0;

    result.hitCount = definition.hitCount;

    result.element = character.element;

    result.targetId = action.target;

    return result;

}
