/**
 * 빌드의 각 요소(광추/유물 세트/행적)를 2층 수정자로 바꾸는 어댑터.
 *
 * 손으로 적은 해석(lightConePassives 등)은 "어느 자리표시자가 어느 버킷인가"만
 * 담고, 실제 값은 시드에서 중첩/승급 단계로 읽는다. 여기서 그 둘을 합쳐
 * 값이 박힌 Modifier 목록을 만든다.
 *
 * 정적 스탯 시트(StatsCalculator)와 데미지 엔진이 같은 목록을 공유한다.
 * 시트는 조건 없는(when 미지정) 스탯 버킷만 골라 쓰고, 데미지 엔진은 전부
 * ModifierSet에 담아 그 타격의 조건으로 필터한다.
 */

import { LIGHT_CONE_PASSIVES } from "../data/lightConePassives.js";
import { RELIC_SET_EFFECTS } from "../data/relicSetEffects.js";
import { ModifierSet } from "./modifiers.js";

/**
 * 중첩 단계의 값을 params에서 읽는다. 배열을 벗어나면 끝값으로 고정한다.
 */
function paramValue(passive, param, superimposition) {

    const arr = passive?.params?.[param];

    if (!Array.isArray(arr) || arr.length === 0) return null;

    return arr[Math.min(superimposition - 1, arr.length - 1)];

}

/**
 * 광추 패시브 => 값이 박힌 Modifier 목록.
 *
 * 해석에 없는 광추는 빈 목록. 값을 못 읽은 항목(param 누락)도 버린다.
 */
export function lightConeModifiers(lightCone, superimposition = 1) {

    const effects = LIGHT_CONE_PASSIVES[lightCone?.slug];

    if (!effects) return [];

    const modifiers = [];

    for (const effect of effects) {

        const value = paramValue(lightCone.passive, effect.param, superimposition);

        if (typeof value !== "number") continue;

        modifiers.push({
            bucket: effect.bucket,
            value,
            // 광추 버프는 대개 착용자 자신. "모든 아군"이면 데이터에 target 지정.
            target: effect.target ?? "self",
            when: effect.when,
            stacks: effect.stacks,
            damageTypes: effect.damageTypes,
            source: `lc:${lightCone.slug}`
        });

    }

    return modifiers;

}

/**
 * 유물 세트 => 값이 박힌 Modifier 목록.
 *
 * 해석은 세트 개수(2/4)별로 적혀 있다. 그 개수 이상 착용해야 적용된다.
 * 값은 effects[pieces].params에서 읽는다(중첩 없어 항상 index 0).
 *
 * sets = [{ id: slug, count }]  (StatsCalculator.resolveSets 형태)
 * registry = slug => { effects: { "2": {params}, "4": {params} } }
 */
export function relicSetModifiers(sets, registry) {

    const modifiers = [];

    for (const { id, count } of sets) {

        const effects = RELIC_SET_EFFECTS[id];

        if (!effects) continue;

        const setData = registry(id);

        for (const effect of effects) {

            const pieces = effect.pieces ?? 2;

            if (count < pieces) continue;

            const value = setData?.effects?.[String(pieces)]?.params?.[effect.param]?.[0];

            if (typeof value !== "number") continue;

            modifiers.push({
                bucket: effect.bucket,
                value,
                target: effect.target ?? "self",
                when: effect.when,
                stacks: effect.stacks,
                damageTypes: effect.damageTypes,
                source: `set:${id}:${pieces}`
            });

        }

    }

    return modifiers;

}

/**
 * 한 파티원이 제공하는 모든 수정자. (지금은 광추 + 유물 세트, 나중에 행적/능력)
 *
 * member = { character, build, lightCone, sets, setRegistry }
 *   sets        = [{ id, count }]
 *   setRegistry = slug => 세트 데이터
 */
export function memberModifiers(member) {

    const superimposition = member.build?.lightCone?.superimposition ?? 1;

    const lc = member.lightCone
        ? lightConeModifiers(member.lightCone, superimposition)
        : [];

    const sets = member.sets && member.setRegistry
        ? relicSetModifiers(member.sets, member.setRegistry)
        : [];

    return [...lc, ...sets];

}

/**
 * 파티 전체 => 딜러의 데미지에 적용될 ModifierSet.
 *
 * 각 파티원의 제공 버프를 target으로 라우팅한다.
 *   - 딜러 자신: self / allies / ally / enemy 전부 (자기에게 걸리거나 적 디버프)
 *   - 서포터: allies / ally(딜러를 버프) 와 enemy(디버프)만. self는 딜러에게 안 감.
 *
 * "게임처럼 자동으로" 버프가 들어가는 지점이다. 사용자가 어떤 버프를 켤지
 * 지정하지 않는다 — 파티에 넣은 캐릭터/광추가 제공하는 걸 엔진이 모은다.
 * (타이밍은 4층 시뮬이 결정. 여기선 제공 버프를 모으기만 한다)
 */
export function collectPartyModifiers(members, dpsIndex) {

    const set = new ModifierSet();

    members.forEach((member, i) => {

        const isDps = i === dpsIndex;

        for (const modifier of memberModifiers(member)) {

            const target = modifier.target ?? "self";

            const reaches = isDps
                ? true                               // 딜러: 전부
                : target === "allies" || target === "ally" || target === "enemy";

            if (reaches) set.add(modifier);

        }

    });

    return set;

}
