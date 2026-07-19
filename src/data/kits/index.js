/**
 * 캐릭터 스킬 킷 레지스트리.
 *
 * 킷은 배율 함수 등을 담아 JSON으로 직렬화되지 않는다. 그래서 전투 상태에
 * 실어 나르지 않고, 매 요청 slug로 여기서 다시 가져온다.
 *
 * 반디만 구현돼 있다. 킷이 없는 캐릭터는 전투 시뮬에 넣을 수 없다.
 */

import { FIREFLY_KIT } from "./firefly.js";

const KITS = {
    firefly: FIREFLY_KIT
};

export function getKit(slug) {
    return KITS[slug] ?? null;
}

export function hasKit(slug) {
    return Object.hasOwn(KITS, slug);
}

export function kitSlugs() {
    return Object.keys(KITS);
}
