const $ = id => document.getElementById(id);

let META = null;
let state = null;
let currentId = null;

/** 패시브가 모델링된 광추 slug. 나머지는 기본 스탯만 반영된다. */
let PASSIVE_READY = new Set();

// ===== 유틸 =====

const api = async (path, options) => {
    const res = await fetch(`/api${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options
    });
    return res.json();
};

const isPercent = key => META.stats[key]?.percent === true;

/**
 * 게임은 스탯을 반올림하지 않고 버린다.
 *
 * 부옵션 굴림으로 확인할 수 있다. 효과 저항 1굴림은 내부적으로 3.888%인데
 * 게임은 3.8%로 보여준다(반올림이면 3.9%). 방어력 16.936은 16이다(반올림 17).
 * 속도 2.08 => 2.0, 치명타 확률 2.592 => 2.5, 치명타 피해 5.184 => 5.1 도
 * 전부 같은 규칙이다.
 *
 * 부동소수점 때문에 4.32가 4.3199999로 계산돼 4.3이 4.2로 밀리는 걸 막으려고
 * 아주 작은 값을 더한 뒤 버린다.
 */
const truncate = (value, decimals) => {
    const factor = 10 ** decimals;
    return Math.trunc(value * factor + 1e-9) / factor;
};

const fmt = (key, value) => {
    if (value === undefined || value === null) return "—";

    if (isPercent(key)) return `${truncate(value * 100, 1).toFixed(1)}%`;

    // 속도는 소수점을 버리면 안 된다. 행동 순서가 갈리는 구간이
    // 소수점에서 정해지는데 2.6을 3으로 보여주면 실제로는 못 넘는
    // 구간을 넘은 것처럼 보인다.
    if (key === "spd") return truncate(value, 1).toFixed(1);

    return truncate(value, 0).toLocaleString("ko-KR");
};

const label = key => META.stats[key]?.label ?? key;

// ===== 게임 설명문 =====

const escapeHtml = text => String(text ?? "").replace(
    /[&<>"']/g,
    ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
);

/**
 * 게임 설명문을 실제 수치가 박힌 HTML로 바꾼다.
 *
 * 원본은 이렇게 생겼다.
 *
 *   "공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다"
 *   params = { "1": [0.24, 0.28, 0.32, 0.36, 0.4] }
 *
 * #n[형식] 은 params의 값으로 바뀐다. 뒤에 %가 붙어 있으면 비율이라
 * 100을 곱한다(0.24 => 24%). 형식은 i=정수, f1=소수 1자리, f2=2자리다.
 *
 * params 형태가 두 가지다.
 *   - 스킬/광추/유물: { "1": [레벨0, 레벨1, ...] } 처럼 자리표시자별 배열.
 *     #n 은 params[n][index]. index는 스킬 레벨-1 / 광추 중첩-1이다.
 *   - 돌파: [값1, 값2] 처럼 평평한 배열. 레벨이 없다.
 *     #n 은 params[n-1] (자리표시자는 1부터, 배열은 0부터).
 *
 * 태그는 게임 고유 문법이라 HTML로 옮긴다. 데이터는 우리가 만든 시드지만
 * 그래도 먼저 이스케이프하고 아는 태그만 되살린다. 남의 데이터를 그대로
 * innerHTML에 넣는 습관은 언젠가 사고가 난다.
 */
function renderDesc(desc, params, index = 0) {

    if (!desc) return "";

    // 돌파처럼 평평한 배열이면 자리표시자 n을 params[n-1]로 읽는다.
    const flat = Array.isArray(params);

    let html = escapeHtml(desc);

    // #1[i]% => 24%
    html = html.replace(
        /#(\d+)\[([if])(\d?)\](%?)/g,
        (whole, n, kind, digits, percent) => {

            const value = flat
                ? params[Number(n) - 1]
                : params?.[n]?.[Math.min(index, (params[n]?.length ?? 1) - 1)];

            if (typeof value !== "number") return whole;

            const scaled = percent ? value * 100 : value;

            const text = kind === "i"
                ? String(Math.round(scaled))
                : scaled.toFixed(Number(digits) || 1);

            return `<b>${text}${percent}</b>`;

        }
    );

    return html
        // 게임이 강조색으로 칠한 부분. 색은 금색 하나뿐이라 클래스로 넘긴다.
        .replace(/&lt;color=#[0-9a-fA-F]{6,8}&gt;/g, '<span class="em">')
        .replace(/&lt;\/color&gt;/g, "</span>")
        .replace(/&lt;u&gt;/g, "<u>")
        .replace(/&lt;\/u&gt;/g, "</u>")
        // 줄바꿈 방지 태그. 의미가 없어 지운다.
        .replace(/&lt;\/?unbreak&gt;/g, "")
        // 인라인 스프라이트. 우리에겐 그림이 없어 지운다.
        .replace(/&lt;icon[^&]*&gt;/g, "")
        .replace(/\\n|\n/g, "<br>");

}

const el = (tag, cls, html) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html !== undefined) node.innerHTML = html;
    return node;
};

let toastTimer;
const toast = (message, isError = false) => {
    const node = $("toast");
    node.textContent = message;
    node.className = `toast show${isError ? " error" : ""}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { node.className = "toast"; }, 2800);
};

const character = () => META.characters.find(c => c.id === state.character);

// ===== 상태 =====

/**
 * 캐릭터 목록은 출시 최신순이라 [0]이 미출시 베타일 수 있다.
 * 베타는 수치가 출시 전에 바뀌므로 기본 선택으로 삼지 않는다.
 */
const defaultCharacter = () =>
    META.characters.find(c => !c.isBeta) ?? META.characters[0];

/**
 * 레벨을 올릴 수 있는 액션만, 레벨 키당 하나씩.
 *
 * 강화 일반 공격은 일반 공격과 레벨을 공유하므로 입력이 하나여야 하고,
 * 비술(maxLevel 1)은 레벨 자체가 없다.
 */
const levelledActions = char => char.actions.filter((action, i, all) =>
    action.maxLevel > 1 &&
    all.findIndex(a => a.levelKey === action.levelKey) === i
);

/** 스킬 종류. 액션 id/levelKey의 접두사로 판별한다(숫자 접미사 제거). */
const SKILL_TYPE_LABEL = {
    basic: "일반 공격",
    skill: "전투 스킬",
    ultimate: "필살기",
    talent: "특성",
    technique: "비술",
    elationSkill: "환락 스킬",
    assistSkill: "전투 지원 스킬"
};

const skillTypeLabel = levelKey =>
    SKILL_TYPE_LABEL[levelKey] ?? levelKey;

/**
 * 스킬을 메인 + 하위로 묶는다.
 *
 * Yatta는 한 스킬 노드에 실제 스킬과 그 강화판/하위 스킬을 함께 담는다.
 * 반디의 강화 일반 공격, 히메코•노바 필살기의 [초주파 입자 광선] 같은 게
 * 하위 스킬이다. levelKey가 같으면 한 노드이므로 그걸로 묶는다.
 *
 * 각 그룹의 메인은 id === levelKey인 액션(레벨을 표기하는 대표 스킬),
 * 나머지는 하위 스킬(레벨 없음)이다. 설명이 빈 하위는 버린다(중복 변형).
 */
function skillGroups(char) {

    const groups = new Map();

    for (const action of char.actions) {
        if (!groups.has(action.levelKey)) {
            groups.set(action.levelKey, { main: null, subs: [] });
        }
        const group = groups.get(action.levelKey);
        if (action.id === action.levelKey) group.main = action;
        else if (action.desc) group.subs.push(action);
    }

    // 메인이 없는 그룹은 없어야 하지만, 방어적으로 첫 하위를 메인으로 올린다.
    return [...groups.values()].map(group =>
        group.main ? group : { main: group.subs[0], subs: group.subs.slice(1) }
    ).filter(group => group.main);

}

/**
 * 성흔을 감안한 스킬 레벨 상한. 서버 Character.maxSkillLevel()과 같은 계산이다.
 *
 * 성흔 일부가 특정 스킬의 상한을 올린다(대개 3성흔/5성흔). 어느 스킬이
 * 얼마나 오르는지는 eidolons[].skillAddLevelList에 원본 스킬 ID로 들어있다.
 */
const maxSkillLevel = (char, action, eidolon) => {

    const bonus = char.eidolons.reduce((sum, e) => {
        const rank = Number(String(e.id).replace("e", ""));
        if (!Number.isInteger(rank) || rank > eidolon) return sum;
        return sum + (e.skillAddLevelList?.[action.skillId] ?? 0);
    }, 0);

    return action.maxLevel + bonus;

};

/**
 * 승급이 허용하는 구간으로 레벨을 끌어당긴다.
 * 승급은 상한만 여는 게 아니라 하한도 올린다(6승급 => 70~80).
 */
const clampLevel = (level, ascension) => Math.min(
    Math.max(level, META.minLevelByAscension[ascension]),
    META.maxLevelByAscension[ascension]
);

function newBuild(characterId = defaultCharacter().id) {
    const char = META.characters.find(c => c.id === characterId);
    return {
        name: `${char.name} 빌드`,
        character: char.id,
        element: char.element,
        path: char.path,
        level: 80,
        ascension: 6,
        eidolon: 0,
        skills: Object.fromEntries(
            levelledActions(char).map(action => [action.levelKey, action.maxLevel])
        ),
        // 행적 ID는 캐릭터마다 다르므로(Yatta 노드 ID) 목록에서 만들어야 한다.
        traces: {
            major: Object.fromEntries(char.majorTraces.map(t => [t.id, true])),
            minor: []
        },
        lightCone: { id: null, level: 80, ascension: 6, superimposition: 1 },
        relics: [],
        // 서버가 생성 시 채우는 것과 같은 값이라 저장해도 안 바뀐다.
        effectiveStats: [...char.defaultEffectiveStats],
        stats: {},
        memo: ""
    };
}

const relicFor = slot =>
    state.relics.find(r => r.slot === slot) ?? null;

function setRelic(slot, patch) {
    let relic = relicFor(slot);
    if (!relic) {
        relic = { slot, set: null, level: 15, mainStat: null, substats: [] };
        state.relics.push(relic);
    }
    Object.assign(relic, patch);
    return relic;
}

/**
 * 서버로 보낼 형태.
 *
 * 주옵션이 없는 유물은 서버 검증에서 막히므로 여기서 뺀다.
 * 편집 중에는 남겨둬야 한다. 세트를 먼저 고르고 주옵션을 나중에 고르는 건
 * 자연스러운 순서인데, 상태에서 지워버리면 방금 고른 세트가 사라진다.
 */
function toPayload() {
    return {
        ...state,
        relics: state.relics.filter(relic => relic.mainStat)
    };
}

// ===== 편집 렌더 =====

function renderEditor() {
    const char = character();

    $("buildName").value = state.name;
    $("characterSelect").value = state.character;
    $("eidolon").value = state.eidolon;
    $("ascension").value = state.ascension;

    // 승급은 상한만 여는 게 아니라 하한도 같이 올린다(6승급 => 70~80).
    const floor = META.minLevelByAscension[state.ascension];
    const cap = META.maxLevelByAscension[state.ascension];

    Object.assign($("level"), { min: floor, max: cap, value: state.level });
    $("levelCap").textContent = `(${floor}~${cap})`;

    // 스킬
    $("skills").replaceChildren(...levelledActions(char).map(action => {
        const cap = maxSkillLevel(char, action, state.eidolon);
        const wrap = el("div", "field");
        wrap.append(el("label", null, `${action.name} <span class="cap">/${cap}</span>`));
        const input = el("input");
        Object.assign(input, {
            type: "number",
            min: 1,
            max: cap,
            value: Math.min(state.skills[action.levelKey] ?? cap, cap)
        });
        // max 속성만으로는 직접 타이핑한 값을 못 막는다.
        input.oninput = () => {
            const typed = Number(input.value);
            if (!Number.isFinite(typed)) return;
            state.skills[action.levelKey] = Math.min(Math.max(typed, 1), cap);
            if (typed > cap) input.value = cap;
            refresh();
        };
        wrap.append(input);
        return wrap;
    }));

    // 큰 행적. 스탯이 아니라 효과라 설명을 봐야 뭘 켜는지 알 수 있다.
    $("majorTraces").replaceChildren(...char.majorTraces.map(trace => {
        const locked = trace.unlockAscension > state.ascension;
        const on = !!state.traces.major[trace.id] && !locked;

        const row = el("div", `trace-row${on ? " on" : ""}`);
        row.style.opacity = locked ? .45 : 1;

        if (trace.icon) {
            const icon = el("img", "trace-icon");
            Object.assign(icon, {
                src: `/img/skill/${trace.icon}.png`, alt: "",
                loading: "lazy", width: 30, height: 30
            });
            row.append(icon);
        }

        const body = el("div", "trace-body");
        body.append(el("div", "trace-name",
            `${escapeHtml(trace.name)} <span class="n">승급 ${trace.unlockAscension}</span>`));
        body.append(el("div", "trace-desc", renderDesc(trace.desc, trace.params)));
        row.append(body);

        row.onclick = () => {
            if (locked) return toast(`${trace.unlockAscension}승급이 필요합니다.`, true);
            const next = !state.traces.major[trace.id];
            state.traces.major[trace.id] = next;
            // 큰 행적을 끄면 거기 매달린 작은 행적도 선택 해제한다.
            if (!next) {
                const orphans = new Set(
                    char.minorTraces
                        .filter(m => m.parentMajor === trace.id)
                        .map(m => m.id)
                );
                state.traces.minor = state.traces.minor.filter(id => !orphans.has(id));
            }
            renderEditor();
            refresh();
        };

        return row;
    }));

    // 작은 행적. 매달린 큰 행적(parentMajor)이 꺼져 있으면 못 켠다.
    $("minorTraces").replaceChildren(...char.minorTraces.map(trace => {
        const needsMajor = trace.parentMajor && !state.traces.major[trace.parentMajor];
        const locked = trace.unlockAscension > state.ascension || needsMajor;
        const on = state.traces.minor.includes(trace.id) && !locked;
        const chip = el("label", `chip${on ? " on" : ""}`);
        chip.innerHTML =
            `${label(trace.stat)} +${fmt(trace.stat, trace.value)} <span class="n">A${trace.unlockAscension}</span>`;
        chip.style.opacity = locked ? .4 : 1;
        chip.onclick = () => {
            if (trace.unlockAscension > state.ascension) {
                return toast(`${trace.unlockAscension}승급이 필요합니다.`, true);
            }
            if (needsMajor) {
                const major = char.majorTraces.find(m => m.id === trace.parentMajor);
                return toast(`큰 행적 '${major?.name ?? ""}'을(를) 먼저 켜야 합니다.`, true);
            }
            state.traces.minor = on
                ? state.traces.minor.filter(id => id !== trace.id)
                : [...state.traces.minor, trace.id];
            renderEditor();
            refresh();
        };
        return chip;
    }));

    // 광추
    const lcSelect = $("lcSelect");
    const options = [el("option", null, "— 없음 —")];
    options[0].value = "";
    // 광추가 165개라 전부 넣고 비활성화하면 목록이 못 쓰게 된다.
    // 어차피 운명이 다르면 착용할 수 없으니 아예 뺀다.
    // 전용 광추를 맨 위로, 그 아래는 5성 => 4성 => 3성 순이다.
    for (const lc of lightConesFor(char)) {
        const option = el("option", null,
            (lc.signature ? "★전용★ " : "") +
            `${lc.name} (${lc.rarity}★)` +
            (PASSIVE_READY.has(lc.slug) ? "" : " ·패시브 미반영")
        );
        option.value = lc.id;
        options.push(option);
    }
    lcSelect.replaceChildren(...options);
    lcSelect.value = state.lightCone.id ?? "";
    $("lcLevel").value = state.lightCone.level;
    $("lcSuper").value = state.lightCone.superimposition;

    renderLightConePassive();
    renderEidolons(char);
    renderEffectiveStats();
    renderRelicEditor();
}

/**
 * 광추 패시브 설명.
 *
 * 중첩 단계에 따라 수치가 바뀌므로 지금 고른 단계의 값을 박아서 보여준다.
 * 상시 스탯만 최종 스펙에 들어가고 조건부 효과는 아직 안 들어간다는 것도
 * 같이 알려준다. 숫자가 안 맞는다고 오해하지 않도록.
 */
function renderLightConePassive() {

    const lightCone = META.lightCones.find(lc => lc.id === state.lightCone.id);

    const box = $("lcPassive");

    if (!lightCone?.passive?.desc) {
        box.replaceChildren();
        return;
    }

    const wrap = el("div", "passive");

    wrap.append(el("div", "passive-name", escapeHtml(lightCone.passive.name)));

    const desc = el("div", "passive-desc");
    desc.innerHTML = renderDesc(
        lightCone.passive.desc,
        lightCone.passive.params,
        state.lightCone.superimposition - 1
    );
    wrap.append(desc);

    if (!PASSIVE_READY.has(lightCone.slug)) {
        wrap.append(el("div", "passive-note",
            "이 광추의 패시브는 아직 최종 스탯에 반영되지 않습니다 (기본 스탯만 적용)."));
    }

    box.replaceChildren(wrap);

}

/**
 * 돌파(성흔) 목록.
 *
 * 1/2/4/6돌파는 스킬 레벨이 아니라 효과를 준다. 뭘 얻는지 보여야
 * 몇 돌파를 맞출지 판단할 수 있다.
 *
 * 효과 자체는 아직 데미지 계산에 안 들어간다. 그건 전투 엔진의 몫이라
 * 여기서는 보여주기만 한다.
 */
function renderEidolons(char) {

    $("eidolonList").replaceChildren(...char.eidolons.map(eidolon => {

        const rank = Number(String(eidolon.id).replace("e", ""));
        const on = rank <= state.eidolon;

        const row = el("div", `trace-row${on ? " on" : ""}`);
        row.style.opacity = on ? 1 : .45;

        if (eidolon.icon) {
            const icon = el("img", "trace-icon");
            Object.assign(icon, {
                src: `/img/skill/${eidolon.icon}.png`, alt: "",
                loading: "lazy", width: 30, height: 30
            });
            row.append(icon);
        }

        const body = el("div", "trace-body");
        body.append(el("div", "trace-name",
            `${escapeHtml(eidolon.name)} <span class="n">${rank}돌파</span>`));
        body.append(el("div", "trace-desc", renderDesc(eidolon.desc, eidolon.params)));
        row.append(body);

        // 누르면 그 돌파까지 맞춘다. 위쪽 셀렉트와 같은 상태를 건드린다.
        row.onclick = () => {
            $("eidolon").value = rank === state.eidolon ? rank - 1 : rank;
            $("eidolon").dispatchEvent(new Event("change"));
        };

        return row;

    }));

}

/**
 * 유효 옵션 선택.
 *
 * 어떤 부옵션이 유효한지는 캐릭터마다 다르다. 게임은 추천해주지만 우리에겐
 * 그 데이터가 없어서 직접 고른다. 명중 통계가 이 목록만 집계한다.
 */
function renderEffectiveStats() {

    const min = META.minEffectiveStats;
    const max = META.maxEffectiveStats;

    $("effectiveHint").textContent = `${state.effectiveStats.length}/${max} (최소 ${min})`;

    $("effectiveStats").replaceChildren(...META.substatKeys.map(key => {

        const on = state.effectiveStats.includes(key);

        const chip = el("label", `chip${on ? " on" : ""}`, label(key));

        chip.onclick = () => {

            if (on) {
                if (state.effectiveStats.length <= min) {
                    return toast(`유효 옵션은 최소 ${min}개입니다.`, true);
                }
                state.effectiveStats = state.effectiveStats.filter(k => k !== key);
            } else {
                if (state.effectiveStats.length >= max) {
                    return toast(`유효 옵션은 최대 ${max}개입니다.`, true);
                }
                state.effectiveStats = [...state.effectiveStats, key];
            }

            renderEffectiveStats();
            refresh();

        };

        return chip;

    }));

}

/** 이 유물이 쓴 굴림 총합 */
const rollsUsed = relic =>
    (relic?.substats ?? []).reduce((sum, sub) => sum + (sub.rolls?.length ?? 0), 0);

/**
 * 강화 레벨이 허용하는 굴림 총합.
 *
 *   총 굴림 = 초기 부옵션 개수 + 3레벨마다 1회
 *
 * 5성은 초기 부옵션이 3개 또는 4개라 +15면 8~9회다. 다 만들어진 유물만
 * 보고는 어느 쪽으로 시작했는지 알 수 없어서 범위로 둔다.
 */
const rollBudget = level => {
    const upgrades = Math.floor((level ?? 0) / 3);
    return { min: 3 + upgrades, max: META.maxSubstats + upgrades };
};

/**
 * 이 캐릭터가 낄 수 있는 광추. 전용 광추가 맨 위, 그 아래는 5성 => 4성 => 3성.
 *
 * 운명이 다른 광추는 애초에 못 낀다. 165개를 전부 넣고 비활성화하면
 * 목록이 못 쓰게 되므로 아예 뺀다.
 */
const lightConesFor = char => META.lightCones
    .filter(lc => lc.path === char.path)
    .map(lc => ({ ...lc, signature: lc.slug === char.signatureLightCone }))
    .sort((a, b) =>
        (b.signature - a.signature) ||
        (b.rarity - a.rarity) ||
        a.name.localeCompare(b.name, "ko")
    );

/** 굴림 목록 => 실제 값. 서버의 substatValue()와 같은 계산이다. */
const substatValue = (key, rolls) => {
    const tiers = META.substatRollValues[key];
    if (!tiers || !rolls) return 0;
    return rolls.reduce((sum, tier) => sum + (tiers[tier] ?? tiers.at(-1)), 0);
};

/**
 * 굴림 편집기.
 *
 * 실제 게임의 부옵션은 아무 수나 나오는 게 아니라, 붙거나 강화될 때마다
 * 하/중/상 중 하나가 굴려져 쌓인다. 그래서 값을 직접 적는 대신 굴림을
 * 하나씩 넣고 등급을 고른다. 값은 거기서 유도된다.
 *
 * 굴림마다 등급이 따로 정해지므로 같은 부옵션이라도 등급이 섞일 수 있다.
 * (치명타 피해가 상+하로 붙으면 11.6%가 되는데, 등급이 고정이면 나올 수 없는 값이다)
 */
function renderRolls(slotId, index, sub, used, cap) {

    const wrap = el("div", "roll-list");

    const commit = mutate => {
        const target = relicFor(slotId);
        const next = [...target.substats];
        next[index] = { ...next[index], rolls: mutate([...next[index].rolls]) };
        target.substats = next;
        renderRelicEditor();
        refresh();
    };

    sub.rolls.forEach((tier, r) => {
        const chip = el("button", "roll");
        chip.type = "button";
        // 등급을 %로 부르지 않는다. 속도는 2/2.3/2.6이라 80/90/100%가 아니다.
        chip.textContent = META.substatTierLabels[tier];
        chip.title =
            `${r === 0 ? "초기값" : `강화 ${r}회차`} — ` +
            fmt(sub.key, META.substatRollValues[sub.key][tier]);
        if (r === 0) chip.classList.add("initial");
        // 클릭할 때마다 하 → 중 → 상 → 하 로 돈다.
        chip.onclick = () => commit(rolls => {
            rolls[r] = (rolls[r] + 1) % META.substatTierLabels.length;
            return rolls;
        });
        wrap.append(chip);
    });

    const minus = el("button", "roll-btn");
    minus.type = "button";
    minus.textContent = "−";
    minus.title = "굴림 제거";
    minus.disabled = sub.rolls.length <= 1;
    minus.onclick = () => commit(rolls => rolls.slice(0, -1));

    const plus = el("button", "roll-btn");
    plus.type = "button";
    plus.textContent = "+";
    plus.title = "강화 굴림 추가";
    plus.disabled = used >= cap || sub.rolls.length >= META.maxRollsPerSubstat;
    plus.onclick = () => commit(rolls => [...rolls, 2]);

    const total = el("span", "roll-value",
        fmt(sub.key, substatValue(sub.key, sub.rolls))
    );

    wrap.append(minus, plus, total);

    return wrap;

}

function renderRelicEditor() {
    // 다시 그려도 열어둔 부위는 열린 채로 둔다.
    // 안 그러면 주옵션 하나 고를 때마다 상자가 닫힌다.
    const open = new Set(
        [...$("relics").querySelectorAll("details[open]")].map(node => node.dataset.slot)
    );

    $("relics").replaceChildren(...META.relicSlots.map(slot => {
        const relic = relicFor(slot.id);
        const box = el("details", "relic-box");
        box.dataset.slot = slot.id;
        box.open = open.has(slot.id);

        const summary = el("summary");
        summary.innerHTML = `<span>${slot.label}</span><span class="sum">${
            relic?.mainStat ? `${label(relic.mainStat)} · +${relic.level}` : "미설정"
        }</span>`;
        box.append(summary);

        // 세트
        const setField = el("div", "field");
        setField.append(el("label", null, "세트"));
        const setSelect = el("select");
        const none = el("option", null, "— 없음 —");
        none.value = "";
        setSelect.append(none);
        for (const [id, set] of Object.entries(META.relicSets)) {
            if (set.type !== slot.type) continue;
            // 조건부 효과뿐인 세트는 2세트 스탯이 없다. 빠진 게 아니라 원래 없는 것.
            const option = el("option", null,
                set.label + (set.modeled ? "" : " ·상시 스탯 없음")
            );
            option.value = id;
            setSelect.append(option);
        }
        setSelect.value = relic?.set ?? "";
        setSelect.onchange = () => {
            setRelic(slot.id, { set: setSelect.value || null });
            refresh();
        };
        setField.append(setSelect);
        box.append(setField);

        // 주옵션 + 레벨
        const row = el("div", "grid-2");

        const mainField = el("div", "field");
        mainField.append(el("label", null, "주 옵션"));
        const mainSelect = el("select");
        const mainNone = el("option", null, "— 없음 —");
        mainNone.value = "";
        mainSelect.append(mainNone);
        for (const key of Object.keys(META.relicMainStats[slot.id])) {
            const option = el("option", null, label(key));
            option.value = key;
            mainSelect.append(option);
        }
        mainSelect.value = relic?.mainStat ?? "";
        mainSelect.onchange = () => {
            // 주옵션을 비워도 유물을 지우지 않는다. 세트나 부옵션을 먼저
            // 넣어둔 게 통째로 날아가면 안 된다. 서버로 보낼 때만 걸러진다.
            setRelic(slot.id, { mainStat: mainSelect.value || null });
            renderRelicEditor();
            refresh();
        };
        mainField.append(mainSelect);
        row.append(mainField);

        const lvField = el("div", "field");
        lvField.append(el("label", null, "강화"));
        // 강화는 3레벨 단위로만 올라간다. 그때마다 부옵션 굴림이 1회 일어난다.
        const lvSelect = el("select");
        for (const n of META.relicLevels) {
            const option = el("option", null, `+${n}`);
            option.value = n;
            lvSelect.append(option);
        }
        lvSelect.value = relic?.level ?? 15;
        lvSelect.onchange = () => {
            setRelic(slot.id, { level: Number(lvSelect.value) });
            renderRelicEditor();
            refresh();
        };
        lvField.append(lvSelect);
        row.append(lvField);
        box.append(row);

        // 부옵션 4개
        const used = rollsUsed(relic);
        const budget = rollBudget(relic?.level ?? 15);
        const cap = budget.max;

        box.append(el("label", "hint",
            `부 옵션 — 굴림 ${used}/${budget.min}~${budget.max}회 ` +
            `(3강마다 1회씩 붙거나 오른다)`
        ));

        for (let i = 0; i < META.maxSubstats; i++) {
            const sub = relic?.substats?.[i];
            const subRow = el("div", "sub-row");

            const keySelect = el("select");
            const keyNone = el("option", null, "—");
            keyNone.value = "";
            keySelect.append(keyNone);
            for (const key of META.substatKeys) {
                const option = el("option", null, label(key));
                option.value = key;
                // 한 유물에 같은 부옵션이 두 번 붙지 않는다.
                option.disabled = key !== sub?.key
                    && (relic?.substats ?? []).some(s => s.key === key);
                keySelect.append(option);
            }
            keySelect.value = sub?.key ?? "";

            keySelect.onchange = () => {
                const target = setRelic(slot.id, {});
                const next = [...(target.substats ?? [])];

                if (!keySelect.value) {
                    next.splice(i, 1);
                } else if (next[i]) {
                    // 부옵션 종류만 바꾼다. 굴림은 그대로 둔다.
                    next[i] = { ...next[i], key: keySelect.value };
                } else {
                    // 빈 줄에서 골랐다. next[i] = ... 로 넣으면 앞이 빈
                    // 희소 배열이 되고 JSON에 null이 섞여 서버가 거부한다.
                    if (used >= cap) {
                        keySelect.value = "";
                        return toast(`+${relic?.level ?? 15} 유물의 굴림은 ${cap}회까지입니다.`, true);
                    }
                    // 부옵션이 붙는 순간 초기값 굴림 1회를 갖는다.
                    // 값을 안 적었다고 선택이 취소되면 안 된다.
                    next.push({ key: keySelect.value, rolls: [2] });
                }

                target.substats = next;
                renderRelicEditor();
                refresh();
            };

            subRow.append(keySelect);

            if (sub) {
                subRow.append(renderRolls(slot.id, i, sub, used, cap));
            }

            box.append(subRow);
        }

        return box;
    }));
}

// ===== 결과 렌더 =====

const SHEET_LEFT = ["hp", "atk", "def", "spd", "critRate", "critDamage"];

/**
 * 유효 옵션이 가리키는 스탯 시트의 행.
 *
 * 유효 옵션은 부옵션 키라서 비율 옵션(atkPct)은 시트에 그 이름의 행이 없다.
 * STATS의 appliesTo가 "공격력 비율은 공격력에 붙는다"는 관계를 갖고 있으니
 * 그걸로 실제 행(atk)으로 접는다. 공격력과 공격력 비율 중 뭘 골랐든
 * 강조되는 건 공격력 행이다.
 */
const effectiveRows = () => new Set(
    state.effectiveStats.map(key => META.stats[key]?.appliesTo ?? key)
);

/**
 * 캐릭터 일러스트 + 스킬/광추 그림.
 *
 * 그림은 전부 우리 도메인에서 나온다(public/img). scripts/sync-images.js가
 * 빌드 타임에 받아둔 것이라 런타임에 Yatta를 부르지 않는다.
 */
/**
 * 스킬 설명. 지금 스킬 레벨의 수치를 박아서 보여준다.
 *
 * 아이콘만 봐서는 뭘 하는 스킬인지 알 수 없고, 레벨을 올릴 때 수치가
 * 어떻게 변하는지도 여기서만 확인할 수 있다.
 */
function showSkill(action, level, { isSub = false } = {}) {

    const box = $("skillDetail");

    // 같은 걸 다시 누르면 닫는다.
    if (box.dataset.action === action.id) {
        box.replaceChildren();
        box.dataset.action = "";
        return;
    }

    box.dataset.action = action.id;

    const wrap = el("div", "passive");

    const head = el("div", "passive-name");
    head.innerHTML =
        escapeHtml(action.name) +
        (action.maxLevel > 1 ? ` <span class="n">Lv.${level}</span>` : "");
    wrap.append(head);

    // 실제 스킬(하위 제외)은 종류와 공격 방식을 보여준다.
    if (!isSub) {
        const tags = el("div", "skill-tags");
        tags.append(el("span", "skill-type", skillTypeLabel(action.levelKey)));
        if (action.tag) tags.append(el("span", "skill-tag", action.tag));
        wrap.append(tags);
    }

    const desc = el("div", "passive-desc");
    desc.innerHTML = renderDesc(action.desc, action.params, level - 1);
    wrap.append(desc);

    box.replaceChildren(wrap);

}

/** 스킬 아이콘 하나(메인/하위 공용). */
function skillIcon(char, action, { isSub = false } = {}) {

    const cap = maxSkillLevel(char, action, state.eidolon);
    const level = action.maxLevel > 1
        ? Math.min(state.skills[action.levelKey] ?? cap, cap)
        : 1;

    const item = el("button", `hero-skill${isSub ? " sub" : ""}`);
    item.type = "button";
    item.title = action.name;

    const icon = el("img");
    Object.assign(icon, {
        src: `/img/skill/${action.icon}.png`,
        alt: action.name, loading: "lazy",
        width: isSub ? 26 : 34, height: isSub ? 26 : 34
    });
    item.append(icon);

    // 하위 스킬은 레벨을 표기하지 않는다. 메인 중 레벨이 있는 것만.
    if (!isSub && action.maxLevel > 1) item.append(el("span", "lv", `${level}`));

    item.onclick = () => showSkill(action, level, { isSub });

    return item;

}

function renderHero(char, data) {

    const art = $("heroArt");
    art.src = `/img/portrait/${char.icon}.png`;
    art.alt = data.character.name;

    // 스킬을 메인 + 하위로 묶어서 보여준다. 하위 스킬(강화판, 소환수 스킬 등)은
    // 메인 아래에 작은 아이콘으로 딸린다.
    $("heroSkills").replaceChildren(...skillGroups(char).map(group => {
        const wrap = el("div", "skill-group");
        wrap.append(skillIcon(char, group.main));
        if (group.subs.length) {
            const subs = el("div", "skill-subs");
            subs.append(...group.subs.map(sub => skillIcon(char, sub, { isSub: true })));
            wrap.append(subs);
        }
        return wrap;
    }));

    const lightCone = META.lightCones.find(lc => lc.id === state.lightCone.id);

    $("heroLightCone").replaceChildren(...(lightCone ? [(() => {
        const row = el("div", "lc-row");
        const icon = el("img");
        Object.assign(icon, {
            src: `/img/lightcone/${lightCone.id}.png`,
            alt: lightCone.name, loading: "lazy", width: 44, height: 44
        });
        const text = el("div");
        text.append(
            el("div", "lc-name", lightCone.name),
            el("div", "lc-sub",
                `Lv.${state.lightCone.level} · 중첩 ${state.lightCone.superimposition}단계`)
        );
        row.append(icon, text);
        return row;
    })()] : []));

}

function renderSheet(data) {
    const char = character();

    $("sheetName").textContent = data.character.name;
    $("sheetLevel").textContent = `Lv.${data.level}`;

    $("sheetTags").replaceChildren(
        el("span", "tag el", META.elements[data.character.element]),
        el("span", "tag", META.paths[data.character.path]),
        el("span", "tag", `${data.ascension}승급`),
        el("span", "tag", `${data.eidolon}돌파`)
    );

    renderHero(char, data);

    // 우측: 원소 피해 + 나머지 비율 스탯
    const dmgKey = `${data.character.element}Dmg`;
    const right = [dmgKey, "breakEffect", "outgoingHealing", "energyRegen", "effectHitRate", "effectRes"];

    const rows = [];

    // 강조는 고른 유효 옵션을 따라간다. 치확/치피로 고정하면
    // 반디처럼 격파 특수효과가 핵심인 캐릭터에서 엉뚱한 걸 강조하게 된다.
    const highlight = effectiveRows();

    for (const key of SHEET_LEFT) {
        const value = data.final[key];
        const base = data.base[key];
        const row = el("div", `stat-row${highlight.has(key) ? " hi" : ""}`);
        row.append(el("span", "k", label(key)));

        const split = el("span", "split");
        // HP/ATK/DEF/SPD만 기본값+보너스 분해가 의미 있다.
        if (base !== undefined && !isPercent(key)) {
            const diff = value - base;
            const bd = el("span", "breakdown");
            // fmt를 거쳐야 속도가 소수점을 유지한다.
            bd.innerHTML =
                `<span>${fmt(key, base)}</span>` +
                `<span class="plus">+${fmt(key, diff)}</span>`;
            split.append(bd);
        }
        split.append(el("span", "v", fmt(key, value)));
        row.append(split);
        rows.push(row);
    }

    for (const key of right) {
        const row = el("div", `stat-row${highlight.has(key) ? " hi" : ""}`);
        row.append(el("span", "k", label(key)));
        row.append(el("span", "v", fmt(key, data.final[key] ?? 0)));
        rows.push(row);
    }

    $("statGrid").replaceChildren(...rows);

    // 세트
    const sets = data.sets.filter(s => s.count >= 2);
    $("setList").replaceChildren(...(sets.length
        ? sets.map(set => {
            const meta = META.relicSets[set.id];
            const row = el("div", "set-row");

            const head = el("div", "set-head");
            if (meta?.icon) {
                const icon = el("img", "set-icon");
                Object.assign(icon, {
                    src: `/img/relic/${meta.icon}.png`, alt: "",
                    loading: "lazy", width: 24, height: 24
                });
                head.append(icon);
            }
            head.append(el("span", null, set.label));
            head.append(el("span", "pc", set.active4 ? "4세트" : "2세트"));
            row.append(head);

            // 2세트 효과도 보여준다. 행성구는 2세트 효과뿐이라 이걸 빼면
            // 이름만 덩그러니 남는다.
            for (const pieces of ["2", "4"]) {
                const effect = meta?.effects?.[pieces];
                if (!effect?.desc || set.count < Number(pieces)) continue;
                const line = el("div", "set-effect");
                line.innerHTML =
                    `<span class="pcs">${pieces}세트</span> ` +
                    renderDesc(effect.desc, effect.params, 0);
                row.append(line);
            }

            return row;
        })
        : [el("p", "empty", "2세트 이상 착용한 세트가 없습니다.")]
    ));

    // 명중 통계.
    // 고른 유효 옵션은 0회여도 보여준다. 아직 안 붙었다는 것 자체가 정보고,
    // 목록에서 사라지면 그 옵션을 고른 적 있는지조차 알 수 없다.
    const rollEntries = Object.entries(data.rolls);
    const total = rollEntries.reduce((sum, [, n]) => sum + n, 0);
    $("rollTotal").textContent = total;
    $("rollList").replaceChildren(...(rollEntries.length
        ? rollEntries.map(([key, n]) => {
            const chip = el("span", `chip readonly${n > 0 ? " on" : ""}`);
            chip.innerHTML = `${label(key)} <span class="n">${n}</span>`;
            return chip;
        })
        : [el("p", "empty", "유효 옵션을 고르면 명중 횟수가 집계됩니다.")]
    ));

    renderRelicCards();
}

function renderRelicCards() {
    const effective = new Set(state.effectiveStats);

    const cards = META.relicSlots.map(slot => {
        const relic = relicFor(slot.id);
        // 주옵션이 없는 유물은 아직 편집 중이라 결과에 넣지 않는다.
        if (!relic?.mainStat) return null;

        const card = el("div", "relic-card");
        const head = el("div", "rc-head");

        // 부위 그림은 세트마다 다르다. 세트를 안 고른 유물은 그림이 없다.
        const piece = META.relicSets[relic.set]?.pieces?.[slot.id];

        if (piece?.icon) {
            const icon = el("img", "rc-icon");
            Object.assign(icon, {
                src: `/img/relic/${piece.icon}.png`,
                alt: piece.name, title: piece.name, loading: "lazy",
                width: 28, height: 28
            });
            head.append(icon);
        }

        head.append(el("span", "rc-slot", slot.label));
        head.append(el("span", "lv", `+${relic.level}`));
        card.append(head);

        const body = el("div", "rc-body");

        const max = META.relicMainStats[slot.id][relic.mainStat];
        const mainValue = max * (0.16 + 0.84 * (relic.level / 15));
        const main = el("div", "rc-line main");
        main.innerHTML =
            `<span>${label(relic.mainStat)}</span><span class="v">${fmt(relic.mainStat, mainValue)}</span>`;
        body.append(main);

        for (const sub of relic.substats) {
            // 굴림 횟수는 역산하지 않는다. 이제 그 자체가 데이터다.
            const count = sub.rolls?.length ?? 0;
            const line = el("div", `rc-line${effective.has(sub.key) ? " eff" : ""}`);
            line.innerHTML =
                `<span>${label(sub.key)}${count > 1 ? `<span class="rolls">»${count}</span>` : ""}</span>` +
                `<span class="v">${fmt(sub.key, substatValue(sub.key, sub.rolls))}</span>`;
            body.append(line);
        }

        card.append(body);
        return card;
    }).filter(Boolean);

    $("relicCards").replaceChildren(...(cards.length
        ? cards
        : [el("p", "empty", "유물을 설정하면 여기에 표시됩니다.")]
    ));
}

// ===== 서버 연동 =====

let refreshTimer;
function refresh() {
    clearTimeout(refreshTimer);
    // 입력할 때마다 요청하지 않도록 살짝 모은다.
    refreshTimer = setTimeout(async () => {
        const result = await api("/stats", {
            method: "POST",
            body: JSON.stringify(toPayload())
        });
        if (!result.success) return toast(result.message, true);
        renderSheet(result.data);
    }, 120);
}

async function loadBuildList(selectId = "") {
    const result = await api("/builds");
    const picker = $("buildPicker");
    const first = el("option", null, "— 저장된 빌드 —");
    first.value = "";
    picker.replaceChildren(first, ...result.data.map(build => {
        const option = el("option", null, `${build.name} (Lv.${build.level})`);
        option.value = build.id;
        return option;
    }));
    picker.value = selectId;
}

async function save() {
    const isUpdate = Boolean(currentId);
    const result = await api(isUpdate ? `/builds/${currentId}` : "/builds", {
        method: isUpdate ? "PUT" : "POST",
        body: JSON.stringify(toPayload())
    });

    if (!result.success) {
        return toast(result.errors?.[0] ?? result.message, true);
    }

    currentId = result.data.id;
    await loadBuildList(currentId);
    toast(isUpdate ? "저장했습니다." : "새 빌드를 만들었습니다.");
}

// ===== 초기화 =====

async function init() {
    const meta = await api("/meta");
    META = meta.data;

    PASSIVE_READY = new Set(META.lightConePassivesReady ?? []);

    // 95명을 한 줄로 늘어놓으면 못 찾는다. 운명별로 묶고 이름순으로 정렬한다.
    const byPath = new Map(Object.keys(META.paths).map(path => [path, []]));

    for (const char of META.characters) {
        byPath.get(char.path)?.push(char);
    }

    $("characterSelect").replaceChildren(
        ...[...byPath]
            .filter(([, list]) => list.length > 0)
            .map(([path, list]) => {
                const group = el("optgroup");
                group.label = META.paths[path];
                group.append(...list
                    .sort((a, b) => a.name.localeCompare(b.name, "ko"))
                    .map(char => {
                        const option = el("option", null,
                            `${char.name} · ${META.elements[char.element]}` +
                            (char.isBeta ? " (베타)" : "")
                        );
                        option.value = char.id;
                        return option;
                    }));
                return group;
            })
    );

    $("eidolon").replaceChildren(...[0, 1, 2, 3, 4, 5, 6].map(n => {
        const option = el("option", null, `${n}돌파`);
        option.value = n;
        return option;
    }));

    $("ascension").replaceChildren(...[0, 1, 2, 3, 4, 5, 6].map(n => {
        const option = el("option", null,
            `${n}승급 (Lv.${META.minLevelByAscension[n]}~${META.maxLevelByAscension[n]})`
        );
        option.value = n;
        return option;
    }));

    $("lcSuper").replaceChildren(...[1, 2, 3, 4, 5].map(n => {
        const option = el("option", null, `중첩 ${n}단계`);
        option.value = n;
        return option;
    }));

    state = newBuild();
    renderEditor();
    await loadBuildList();
    refresh();

    // ===== 이벤트 =====

    $("buildName").oninput = e => { state.name = e.target.value; };

    $("characterSelect").onchange = e => {
        state = newBuild(e.target.value);
        currentId = null;
        $("buildPicker").value = "";
        renderEditor();
        refresh();
    };

    $("eidolon").onchange = e => {
        state.eidolon = Number(e.target.value);
        // 성흔이 스킬 레벨 상한을 정한다. 성흔을 내리면 상한도 내려가므로
        // 이미 올려둔 레벨을 같이 끌어내린다.
        const char = character();
        for (const action of levelledActions(char)) {
            const cap = maxSkillLevel(char, action, state.eidolon);
            state.skills[action.levelKey] = Math.min(
                state.skills[action.levelKey] ?? cap,
                cap
            );
        }
        renderEditor();
        refresh();
    };

    $("ascension").onchange = e => {
        state.ascension = Number(e.target.value);
        // 돌파를 올리면 하한도 같이 올라가므로 양쪽으로 끌어당긴다.
        state.level = clampLevel(state.level, state.ascension);
        // 돌파가 내려가면 잠긴 행적은 자동으로 해제한다.
        const char = character();
        const allowed = new Set(
            char.minorTraces.filter(t => t.unlockAscension <= state.ascension).map(t => t.id)
        );
        state.traces.minor = state.traces.minor.filter(id => allowed.has(id));
        renderEditor();
        refresh();
    };

    $("level").oninput = e => {
        // 입력 중에는 하한으로 튕기지 않는다. 70을 지우고 65를 치려면
        // 잠깐 6이 되는데 거기서 70으로 되돌리면 아무것도 못 친다.
        const typed = Number(e.target.value);
        if (!Number.isFinite(typed)) return;
        state.level = Math.min(typed, META.maxLevelByAscension[state.ascension]);
        refresh();
    };

    // 하한 보정은 입력이 끝난 뒤에 한다.
    $("level").onblur = () => {
        state.level = clampLevel(state.level, state.ascension);
        renderEditor();
        refresh();
    };

    $("traceAll").onclick = () => {
        const char = character();
        state.traces.minor = char.minorTraces
            .filter(t => t.unlockAscension <= state.ascension)
            .map(t => t.id);
        renderEditor();
        refresh();
    };

    $("lcSelect").onchange = e => {
        state.lightCone.id = e.target.value || null;
        renderLightConePassive();
        refresh();
    };
    $("lcLevel").oninput = e => { state.lightCone.level = Number(e.target.value); refresh(); };
    $("lcSuper").onchange = e => {
        state.lightCone.superimposition = Number(e.target.value);
        // 중첩 단계가 바뀌면 패시브 설명의 수치도 바뀐다.
        renderLightConePassive();
        refresh();
    };

    $("saveBtn").onclick = save;

    $("newBtn").onclick = () => {
        state = newBuild(state.character);
        currentId = null;
        $("buildPicker").value = "";
        renderEditor();
        refresh();
        toast("새 빌드를 시작합니다.");
    };

    $("deleteBtn").onclick = async () => {
        if (!currentId) return toast("저장된 빌드가 아닙니다.", true);
        const result = await api(`/builds/${currentId}`, { method: "DELETE" });
        if (!result.success) return toast(result.message, true);
        currentId = null;
        state = newBuild(state.character);
        renderEditor();
        await loadBuildList();
        refresh();
        toast("삭제했습니다.");
    };

    $("buildPicker").onchange = async e => {
        if (!e.target.value) return;
        const result = await api(`/builds/${e.target.value}`);
        if (!result.success) return toast(result.message, true);
        state = result.data;
        currentId = state.id;
        renderEditor();
        refresh();
    };
}

init();
