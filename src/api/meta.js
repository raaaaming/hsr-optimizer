import {
    STATS,
    ELEMENT_LABEL,
    PATH_LABEL,
    RELIC_SLOTS,
    RELIC_MAIN_STATS,
    SUBSTAT_KEYS,
    MAX_LEVEL_BY_ASCENSION
} from "../data/gameData.js";

import { LIGHT_CONE_PASSIVES } from "../data/lightConePassives.js";
import { RELIC_SET_EFFECTS } from "../data/relicSetEffects.js";

import {
    characterRegistry,
    lightConeRegistry,
    relicSetRegistry
} from "../registry/index.js";
import { success, methodNotAllowed } from "../util/response.js";

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
        // UI 계약 유지: id를 키로 { label, type, four }.
        // four는 4세트 효과 설명이다(스탯 합산에는 들어가지 않는다).
        relicSets: Object.fromEntries(
            relicSetRegistry.getAll().map(set => [
                set.slug,
                {
                    label: set.name,
                    type: set.type,
                    two: set.effects?.["2"]?.desc ?? "",
                    four: set.effects?.["4"]?.desc ?? "",
                    // 상시 스탯이 모델링된 세트인지. 아니면 조건부 효과뿐이다.
                    modeled: Object.hasOwn(RELIC_SET_EFFECTS, set.slug)
                }
            ])
        ),
        substatKeys: SUBSTAT_KEYS,
        maxLevelByAscension: MAX_LEVEL_BY_ASCENSION,

        characters: characterRegistry.getAll().map(character => ({
            id: character.id,
            name: character.name,
            element: character.element,
            path: character.path,
            rarity: character.rarity,
            isBeta: character.isBeta,
            actions: [...character.actions.values()].map(action => ({
                id: action.id,
                name: action.name,
                levelKey: action.levelKey,
                maxLevel: action.maxLevel
            })),
            majorTraces: character.majorTraces,
            minorTraces: character.minorTraces,
            eidolons: character.eidolons
        })),

        lightCones: lightConeRegistry.getAll().map(lightCone => ({
            id: lightCone.id,
            slug: lightCone.slug,
            name: lightCone.name,
            path: lightCone.path,
            rarity: lightCone.rarity,
            passive: {
                name: lightCone.passive?.name ?? "",
                desc: lightCone.passive?.desc ?? ""
            }
        })),

        // 상시 스탯 보너스가 모델링된 광추. 나머지는 기본 스탯만 반영된다.
        // UI가 "이 광추는 패시브가 빠졌다"고 알려줄 수 있어야 한다.
        lightConePassivesReady: Object.keys(LIGHT_CONE_PASSIVES)

    });

}
