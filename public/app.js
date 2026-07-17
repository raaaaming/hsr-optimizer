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

/** 내부 저장은 0~1 비율, 화면은 % */
const toDisplay = (key, value) =>
    isPercent(key) ? value * 100 : value;

const toInternal = (key, value) =>
    isPercent(key) ? value / 100 : value;

const fmt = (key, value) => {
    if (value === undefined || value === null) return "—";
    return isPercent(key)
        ? `${(value * 100).toFixed(1)}%`
        : Math.round(value).toLocaleString("ko-KR");
};

const label = key => META.stats[key]?.label ?? key;

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
    // 주옵션 없는 유물은 서버 검증에서 막히므로 제거한다.
    state.relics = state.relics.filter(r => r.mainStat);
}

// ===== 편집 렌더 =====

function renderEditor() {
    const char = character();

    $("buildName").value = state.name;
    $("characterSelect").value = state.character;
    $("eidolon").value = state.eidolon;
    $("ascension").value = state.ascension;
    $("level").value = state.level;
    $("levelCap").textContent = `(최대 ${META.maxLevelByAscension[state.ascension]})`;

    // 스킬
    $("skills").replaceChildren(...levelledActions(char).map(action => {
        const wrap = el("div", "field");
        wrap.append(el("label", null, action.name));
        const input = el("input");
        Object.assign(input, {
            type: "number",
            min: 1,
            max: action.maxLevel,
            value: state.skills[action.levelKey] ?? action.maxLevel
        });
        input.oninput = () => {
            state.skills[action.levelKey] = Number(input.value);
            refresh();
        };
        wrap.append(input);
        return wrap;
    }));

    // 큰 행적
    $("majorTraces").replaceChildren(...char.majorTraces.map(trace => {
        const locked = trace.unlockAscension > state.ascension;
        const on = !!state.traces.major[trace.id] && !locked;
        const chip = el("label", `chip${on ? " on" : ""}`);
        chip.innerHTML = `${trace.name} <span class="n">A${trace.unlockAscension}</span>`;
        chip.style.opacity = locked ? .4 : 1;
        chip.onclick = () => {
            if (locked) return toast(`${trace.unlockAscension}돌파가 필요합니다.`, true);
            state.traces.major[trace.id] = !state.traces.major[trace.id];
            renderEditor();
            refresh();
        };
        return chip;
    }));

    // 작은 행적
    $("minorTraces").replaceChildren(...char.minorTraces.map(trace => {
        const locked = trace.unlockAscension > state.ascension;
        const on = state.traces.minor.includes(trace.id) && !locked;
        const chip = el("label", `chip${on ? " on" : ""}`);
        chip.innerHTML =
            `${label(trace.stat)} +${fmt(trace.stat, trace.value)} <span class="n">A${trace.unlockAscension}</span>`;
        chip.style.opacity = locked ? .4 : 1;
        chip.onclick = () => {
            if (locked) return toast(`${trace.unlockAscension}돌파가 필요합니다.`, true);
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
    for (const lc of META.lightCones.filter(lc => lc.path === char.path)) {
        const option = el("option", null,
            `${lc.name} (${lc.rarity}★)` + (PASSIVE_READY.has(lc.slug) ? "" : " ·패시브 미반영")
        );
        option.value = lc.id;
        options.push(option);
    }
    lcSelect.replaceChildren(...options);
    lcSelect.value = state.lightCone.id ?? "";
    $("lcLevel").value = state.lightCone.level;
    $("lcSuper").value = state.lightCone.superimposition;

    renderRelicEditor();
}

function renderRelicEditor() {
    $("relics").replaceChildren(...META.relicSlots.map(slot => {
        const relic = relicFor(slot.id);
        const box = el("details", "relic-box");

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
            if (!mainSelect.value) {
                state.relics = state.relics.filter(r => r.slot !== slot.id);
            } else {
                setRelic(slot.id, { mainStat: mainSelect.value });
            }
            renderRelicEditor();
            refresh();
        };
        mainField.append(mainSelect);
        row.append(mainField);

        const lvField = el("div", "field");
        lvField.append(el("label", null, "강화"));
        const lvInput = el("input");
        Object.assign(lvInput, { type: "number", min: 0, max: 15, value: relic?.level ?? 15 });
        lvInput.oninput = () => {
            setRelic(slot.id, { level: Number(lvInput.value) });
            refresh();
        };
        lvField.append(lvInput);
        row.append(lvField);
        box.append(row);

        // 부옵션 4개
        box.append(el("label", "hint", "부 옵션 (실제 유물 수치를 입력)"));
        for (let i = 0; i < 4; i++) {
            const sub = relic?.substats?.[i];
            const subRow = el("div", "sub-row");

            const keySelect = el("select");
            const keyNone = el("option", null, "—");
            keyNone.value = "";
            keySelect.append(keyNone);
            for (const key of META.substatKeys) {
                const option = el("option", null, label(key));
                option.value = key;
                keySelect.append(option);
            }
            keySelect.value = sub?.key ?? "";

            const valueInput = el("input");
            Object.assign(valueInput, {
                type: "number", step: "0.1", min: 0,
                value: sub ? Number(toDisplay(sub.key, sub.value).toFixed(2)) : ""
            });
            valueInput.placeholder = sub && isPercent(sub.key) ? "%" : "값";

            const commit = () => {
                const target = relicFor(slot.id);
                if (!target) return;
                const key = keySelect.value;
                const raw = Number(valueInput.value);
                const next = [...(target.substats ?? [])];
                if (!key || !valueInput.value) {
                    next[i] = null;
                } else {
                    next[i] = { key, value: toInternal(key, raw) };
                }
                target.substats = next.filter(Boolean);
                refresh();
            };

            keySelect.onchange = () => { commit(); renderRelicEditor(); };
            valueInput.oninput = commit;

            subRow.append(keySelect, valueInput);
            box.append(subRow);
        }

        return box;
    }));
}

// ===== 결과 렌더 =====

const SHEET_LEFT = ["hp", "atk", "def", "spd", "critRate", "critDamage"];

function renderSheet(data) {
    $("sheetName").textContent = data.character.name;
    $("sheetLevel").textContent = `Lv.${data.level}`;

    $("sheetTags").replaceChildren(
        el("span", "tag el", META.elements[data.character.element]),
        el("span", "tag", META.paths[data.character.path]),
        el("span", "tag", `${data.ascension}돌파`),
        el("span", "tag", `${data.eidolon}성혼`)
    );

    // 우측: 원소 피해 + 나머지 비율 스탯
    const dmgKey = `${data.character.element}Dmg`;
    const right = [dmgKey, "breakEffect", "outgoingHealing", "energyRegen", "effectHitRate", "effectRes"];

    const rows = [];

    for (const key of SHEET_LEFT) {
        const value = data.final[key];
        const base = data.base[key];
        const row = el("div", `stat-row${["critRate", "critDamage"].includes(key) ? " hi" : ""}`);
        row.append(el("span", "k", label(key)));

        const split = el("span", "split");
        // HP/ATK/DEF/SPD만 기본값+보너스 분해가 의미 있다.
        if (base !== undefined && !isPercent(key)) {
            const diff = value - base;
            const bd = el("span", "breakdown");
            bd.innerHTML = `<span>${Math.round(base)}</span><span class="plus">+${Math.round(diff)}</span>`;
            split.append(bd);
        }
        split.append(el("span", "v", fmt(key, value)));
        row.append(split);
        rows.push(row);
    }

    for (const key of right) {
        const row = el("div", "stat-row");
        row.append(el("span", "k", label(key)));
        row.append(el("span", "v", fmt(key, data.final[key] ?? 0)));
        rows.push(row);
    }

    $("statGrid").replaceChildren(...rows);

    // 세트
    const sets = data.sets.filter(s => s.count >= 2);
    $("setList").replaceChildren(...(sets.length
        ? sets.map(set => {
            const row = el("div", "set-row");
            const meta = META.relicSets[set.id];
            const left = el("div");
            left.append(el("div", null, set.label));
            if (set.active4 && meta?.four) left.append(el("div", "desc", meta.four));
            row.append(left);
            row.append(el("span", "pc", set.active4 ? "4세트" : "2세트"));
            return row;
        })
        : [el("p", "empty", "2세트 이상 착용한 세트가 없습니다.")]
    ));

    // 명중 통계
    const rollEntries = Object.entries(data.rolls).filter(([, n]) => n > 0);
    const total = rollEntries.reduce((sum, [, n]) => sum + n, 0);
    $("rollTotal").textContent = total;
    $("rollList").replaceChildren(...(rollEntries.length
        ? rollEntries.map(([key, n]) => {
            const chip = el("span", "chip readonly");
            chip.innerHTML = `${label(key)} <span class="n">${n}</span>`;
            return chip;
        })
        : [el("p", "empty", "부 옵션을 입력하면 명중 횟수가 집계됩니다.")]
    ));

    renderRelicCards();
}

function renderRelicCards() {
    const cards = META.relicSlots.map(slot => {
        const relic = relicFor(slot.id);
        if (!relic) return null;

        const card = el("div", "relic-card");
        const head = el("div", "rc-head");
        head.innerHTML =
            `<span>${slot.label}</span><span class="lv">+${relic.level}</span>`;
        card.append(head);

        const body = el("div", "rc-body");

        const max = META.relicMainStats[slot.id][relic.mainStat];
        const mainValue = max * (0.16 + 0.84 * (relic.level / 15));
        const main = el("div", "rc-line main");
        main.innerHTML =
            `<span>${label(relic.mainStat)}</span><span class="v">${fmt(relic.mainStat, mainValue)}</span>`;
        body.append(main);

        for (const sub of relic.substats) {
            const rolls = Math.round(sub.value / (SUB_ROLL[sub.key] ?? Infinity));
            const line = el("div", "rc-line");
            line.innerHTML =
                `<span>${label(sub.key)}${rolls > 1 ? `<span class="rolls">»${rolls}</span>` : ""}</span>` +
                `<span class="v">${fmt(sub.key, sub.value)}</span>`;
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

let SUB_ROLL = {};

// ===== 서버 연동 =====

let refreshTimer;
function refresh() {
    clearTimeout(refreshTimer);
    // 입력할 때마다 요청하지 않도록 살짝 모은다.
    refreshTimer = setTimeout(async () => {
        const result = await api("/stats", {
            method: "POST",
            body: JSON.stringify(state)
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
        body: JSON.stringify(state)
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

    // 명중 횟수 표시는 서버와 같은 기준을 쓴다.
    SUB_ROLL = {
        hp: 42.34, atk: 21.17, def: 21.17, spd: 2.6,
        hpPct: 0.0432, atkPct: 0.0432, defPct: 0.054,
        critRate: 0.0324, critDamage: 0.0648,
        breakEffect: 0.0648, effectHitRate: 0.0432, effectRes: 0.0432
    };

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
        const option = el("option", null, `${n}성혼`);
        option.value = n;
        return option;
    }));

    $("ascension").replaceChildren(...[0, 1, 2, 3, 4, 5, 6].map(n => {
        const option = el("option", null, `${n}돌파 (Lv.${META.maxLevelByAscension[n]})`);
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

    $("eidolon").onchange = e => { state.eidolon = Number(e.target.value); refresh(); };

    $("ascension").onchange = e => {
        state.ascension = Number(e.target.value);
        const cap = META.maxLevelByAscension[state.ascension];
        if (state.level > cap) state.level = cap;
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
        const cap = META.maxLevelByAscension[state.ascension];
        state.level = Math.min(Number(e.target.value) || 1, cap);
        if (Number(e.target.value) > cap) e.target.value = cap;
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
        refresh();
    };
    $("lcLevel").oninput = e => { state.lightCone.level = Number(e.target.value); refresh(); };
    $("lcSuper").onchange = e => { state.lightCone.superimposition = Number(e.target.value); refresh(); };

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
