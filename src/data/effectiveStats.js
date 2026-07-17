import { SUBSTAT_KEYS, MAX_EFFECTIVE_STATS } from "./gameData.js";

/**
 * 유효 옵션 기본값.
 *
 * 게임은 캐릭터마다 추천 옵션을 알려주지만 우리에겐 그 데이터가 없다.
 * 대신 작은 행적이 올려주는 스탯을 쓴다. 그 캐릭터의 킷이 무엇을 원하는지
 * 게임이 직접 드러낸 신호라서 출발점으로 쓸 만하다.
 * (반디라면 격파 특수효과 / 효과 저항 / 속도가 나온다)
 *
 * 어디까지나 출발점이고 사용자가 바꾼다.
 *
 * meta(새 빌드의 초기값)와 builds(생성 시 보정)가 같이 쓴다.
 * 양쪽이 다른 값을 쓰면 화면에 보이던 게 저장하는 순간 바뀐다.
 */
export function defaultEffectiveStats(character) {

    const fromTraces = [...new Set(
        (character?.minorTraces ?? []).map(trace => trace.stat)
    )].filter(stat => SUBSTAT_KEYS.includes(stat));

    const picked = fromTraces.slice(0, MAX_EFFECTIVE_STATS);

    // 행적이 부옵션과 안 겹치는 캐릭터(속성 피해만 올리는 등)도 있다.
    return picked.length > 0 ? picked : ["critRate", "critDamage"];

}
