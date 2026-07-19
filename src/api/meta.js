import {
    STATS,
    ELEMENT_LABEL,
    PATH_LABEL,
    RELIC_SLOTS,
    RELIC_MAIN_STATS,
    SUBSTAT_KEYS,
    SUBSTAT_ROLL_VALUES,
    SUBSTAT_TIER_LABELS,
    RELIC_LEVELS,
    MAX_SUBSTATS,
    MAX_ROLLS_PER_SUBSTAT,
    MIN_EFFECTIVE_STATS,
    MAX_EFFECTIVE_STATS,
    MAX_LEVEL_BY_ASCENSION,
    MIN_LEVEL_BY_ASCENSION
} from "../data/gameData.js";

import { LIGHT_CONE_PASSIVES } from "../data/lightConePassives.js";
import { RELIC_SET_EFFECTS } from "../data/relicSetEffects.js";
import { defaultEffectiveStats } from "../data/effectiveStats.js";
import { SIGNATURE_LIGHT_CONES } from "../data/signatureLightCones.js";
import { kitSlugs } from "../data/kits/index.js";

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
                    icon: set.icon,
                    // 부위마다 그림이 다르다. { head: { name, icon }, ... }
                    pieces: set.pieces,
                    // 세트 개수별 { desc, params }. 행성구는 "2"만 있다.
                    effects: set.effects,
                    // 상시 스탯이 모델링된 세트인지. 아니면 조건부 효과뿐이다.
                    modeled: Object.hasOwn(RELIC_SET_EFFECTS, set.slug)
                }
            ])
        ),
        substatKeys: SUBSTAT_KEYS,

        // 부옵션 굴림. UI가 서버와 같은 기준으로 값을 보여줘야 한다.
        substatRollValues: SUBSTAT_ROLL_VALUES,
        substatTierLabels: SUBSTAT_TIER_LABELS,
        maxRollsPerSubstat: MAX_ROLLS_PER_SUBSTAT,
        relicLevels: RELIC_LEVELS,
        maxSubstats: MAX_SUBSTATS,

        minEffectiveStats: MIN_EFFECTIVE_STATS,
        maxEffectiveStats: MAX_EFFECTIVE_STATS,

        maxLevelByAscension: MAX_LEVEL_BY_ASCENSION,
        minLevelByAscension: MIN_LEVEL_BY_ASCENSION,

        characters: characterRegistry.getAll().map(character => ({
            id: character.id,
            name: character.name,
            element: character.element,
            path: character.path,
            rarity: character.rarity,
            isBeta: character.isBeta,
            // 그림 파일 이름이 곧 Yatta의 숫자 ID다. /img/character|portrait/{icon}.png
            icon: character.yattaId,
            // 전투 시뮬용 최대 에너지(궁극기 요구치).
            maxEnergy: character.stats?.maxEnergy ?? 0,
            actions: [...character.actions.values()].map(action => ({
                id: action.id,
                name: action.name,
                levelKey: action.levelKey,
                maxLevel: action.maxLevel,
                icon: action.icon,
                tag: action.tag,
                // 전투 자원.
                energy: action.energy,
                toughness: action.toughness,
                toughnessSpread: action.toughnessSpread,
                // 설명문에 실제 수치를 박으려면 원본과 params가 같이 필요하다.
                desc: action.desc,
                params: action.params,
                // 돌파 상한 계산에 필요하다(skillAddLevelList의 키).
                skillId: action.skillId
            })),
            majorTraces: character.majorTraces,
            minorTraces: character.minorTraces,
            eidolons: character.eidolons,
            // 새 빌드의 유효 옵션 초기값. 서버가 생성 시 쓰는 것과 같은 값이라
            // 화면에 보이던 게 저장하는 순간 바뀌지 않는다.
            defaultEffectiveStats: defaultEffectiveStats(character),
            // 전용 광추 slug. 데이터에 없어 손으로 적으므로 대부분 null이다.
            signatureLightCone: SIGNATURE_LIGHT_CONES[character.id] ?? null
        })),

        lightCones: lightConeRegistry.getAll().map(lightCone => ({
            id: lightCone.id,
            slug: lightCone.slug,
            name: lightCone.name,
            path: lightCone.path,
            rarity: lightCone.rarity,
            passive: {
                name: lightCone.passive?.name ?? "",
                desc: lightCone.passive?.desc ?? "",
                // 중첩 단계별 배열. UI가 설명문에 실제 수치를 박는 데 쓴다.
                params: lightCone.passive?.params ?? null
            }
        })),

        // 상시 스탯 보너스가 모델링된 광추. 나머지는 기본 스탯만 반영된다.
        // UI가 "이 광추는 패시브가 빠졌다"고 알려줄 수 있어야 한다.
        lightConePassivesReady: Object.keys(LIGHT_CONE_PASSIVES),

        // 전투 시뮬 킷이 있는 캐릭터. 이들만 전투에 넣을 수 있다.
        battleKits: kitSlugs()

    });

}
