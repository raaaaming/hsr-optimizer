import { DamageResult } from "../../../models/DamageResult.js";

/**
 * 고치형 원초 화염 중추 (특성)
 *
 * 방어 특성이라 피해가 없다. HP가 낮을수록 받는 피해가 최대 #1%까지
 * 감소하고, 「완전연소」 상태에서는 최대치를 유지하며 효과 저항이 #4% 증가한다.
 *
 * 받는 피해 감소는 전투 중 HP에 따라 변하므로 스탯 시트가 아니라
 * BattleEngine의 피격 처리에서 다뤄야 한다.
 */
export default function fireflyTalent({ character, action }) {

    const result = new DamageResult();

    result.damage = 0;
    result.hitCount = 0;
    result.element = character.element;
    result.targetId = action.target ?? "";

    result.logs.push("특성: 받는 피해 감소 (피해 없음)");

    return result;

}
