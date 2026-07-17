/**
 * 시드가 넣어둔 스킬 원본 params를 읽는 도우미.
 *
 * definition.params는 자리표시자 번호 => 레벨별 배열이다.
 *
 *   { "1": [0.5, 0.6, ... 1.4] }   // desc의 #1
 *
 * 배열 길이는 성흔으로 올라간 최대 레벨까지다(일반 공격 10, 나머지 15).
 * 공식이 배율을 하드코딩하는 대신 이걸 쓰면 패치로 수치가 바뀌어도
 * data:sync만 다시 돌리면 된다.
 */

/**
 * 이 액션의 스킬 레벨.
 *
 * 레벨은 개별 스킬이 아니라 스킬 트리 노드에 붙으므로 levelKey로 찾는다.
 * (강화 일반 공격은 일반 공격과 레벨을 공유한다)
 */
export function skillLevel(build, definition) {

    const level = build.skills?.[definition.levelKey];

    return Number.isInteger(level) && level > 0 ? level : 1;

}

/**
 * definition.params[index] 에서 level에 해당하는 값.
 *
 * 없는 자리표시자를 읽는 건 공식이 설명문과 어긋났다는 뜻이라 죽인다.
 * 조용히 0을 반환하면 피해가 0이 되고 원인을 못 찾는다.
 */
export function paramAt(definition, index, level) {

    const values = definition.params?.[String(index)];

    if (!Array.isArray(values) || values.length === 0) {
        throw new Error(
            `Param #${index} not found on action '${definition.id}'. ` +
            `(있는 것: ${Object.keys(definition.params ?? {}).join(", ") || "없음"})`
        );
    }

    // 레벨이 배열을 넘어가면 마지막 값으로 고정한다.
    const i = Math.min(Math.max(level, 1), values.length) - 1;

    return values[i];

}

/**
 * paramAt을 이 액션의 스킬 레벨로 바로 읽는다. 공식에서 제일 많이 쓰는 형태다.
 */
export function param(build, definition, index) {

    return paramAt(definition, index, skillLevel(build, definition));

}
