import { DamageResult } from "../../../models/DamageResult.js";

/**
 * 반딧불이 Type-IV•완전연소 (필살기)
 *
 * 반디의 필살기는 피해를 주지 않는다. 「완전연소」 상태에 진입해
 * 속도 +#3, 약점 격파 효율 +#2%, 받는 격파 피해 +#1%를 얻고
 * 일반 공격/전투 스킬이 강화판(basic2 / skill2)으로 바뀐다.
 *
 * 그 상태 전이는 BattleEngine의 버프/상태 처리가 생기면 그쪽에서 다룬다.
 * 여기서 피해 0을 반환하는 건 미구현이 아니라 실제로 0이기 때문이다.
 * (이전 자리표시자는 공격력 x 4.0을 반환했는데, 근거 없는 값이었다)
 */
export default function fireflyUltimate({ character, action }) {

    const result = new DamageResult();

    result.damage = 0;
    result.hitCount = 0;
    result.element = character.element;
    result.targetId = action.target ?? "";

    result.logs.push("「완전연소」 상태 진입 (피해 없음)");

    return result;

}
