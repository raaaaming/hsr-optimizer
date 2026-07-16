import {
    STATS,
    ELEMENT_LABEL,
    PATH_LABEL,
    RELIC_SLOTS,
    RELIC_MAIN_STATS,
    RELIC_SETS,
    SUBSTAT_KEYS,
    MAX_LEVEL_BY_ASCENSION
} from "../data/gameData.js";

import { characterRegistry, lightConeRegistry } from "../registry/index.js";
import { success, methodNotAllowed } from "../util/response.js";

import "../data/index.js";

/**
 * UI 부트스트랩용 단일 메타데이터 엔드포인트.
 * 드롭다운을 채우는 데 필요한 모든 정적 데이터를 한 번에 준다.
 */
export async function handler(request) {

    if (request.method !== "GET") {
        return methodNotAllowed(request.method);
    }

    return success({

        stats: STATS,
        elements: ELEMENT_LABEL,
        paths: PATH_LABEL,

        relicSlots: RELIC_SLOTS,
        relicMainStats: RELIC_MAIN_STATS,
        relicSets: RELIC_SETS,
        substatKeys: SUBSTAT_KEYS,
        maxLevelByAscension: MAX_LEVEL_BY_ASCENSION,

        characters: characterRegistry.getAll().map(character => ({
            id: character.id,
            name: character.name,
            element: character.element,
            path: character.path,
            rarity: character.rarity,
            actions: [...character.actions.values()].map(action => ({
                id: action.id,
                name: action.name
            })),
            majorTraces: character.majorTraces,
            minorTraces: character.minorTraces,
            eidolons: character.eidolons
        })),

        lightCones: lightConeRegistry.getAll()

    });

}
