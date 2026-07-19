const $ = id => document.getElementById(id);

let META = null;
let BUILDS = [];      // 킷이 있는 저장된 빌드
let config = null;    // 전투 config (파티 빌드 + 적)
let state = null;     // 전투 가변 상태

const api = async (path, body) => {
    const res = await fetch(`/api${path}`, {
        method: body ? "POST" : "GET",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined
    });
    return res.json();
};

const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
};

let toastTimer;
const toast = (msg, err = false) => {
    const n = $("toast");
    n.textContent = msg;
    n.className = `toast show${err ? " error" : ""}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { n.className = "toast"; }, 2800);
};

const ELEMENTS = ["physical", "fire", "ice", "lightning", "wind", "quantum", "imaginary"];

// ===== 세팅 =====

let selectedWeakness = new Set(["fire"]);
let partyBuildIds = [];

function renderSetup() {

    // 약점 칩
    $("weaknessChips").replaceChildren(...ELEMENTS.map(e => {
        const on = selectedWeakness.has(e);
        const chip = el("label", `chip${on ? " on" : ""}`, META.elements[e]);
        chip.onclick = () => {
            if (on) selectedWeakness.delete(e); else selectedWeakness.add(e);
            renderSetup();
        };
        return chip;
    }));

    // 파티 슬롯 (킷 있는 빌드만)
    const usable = BUILDS.filter(b => META.battleKits.includes(b.character));

    $("partySlots").replaceChildren(...[0, 1, 2, 3].map(i => {
        const field = el("div", "field");
        const select = el("select");
        const none = el("option", null, "— 비어 있음 —");
        none.value = "";
        select.append(none);
        for (const b of usable) {
            const char = META.characters.find(c => c.id === b.character);
            const opt = el("option", null, `${b.name} · ${char?.name ?? b.character}`);
            opt.value = b.id;
            select.append(opt);
        }
        select.value = partyBuildIds[i] ?? "";
        select.onchange = () => { partyBuildIds[i] = select.value || null; };
        field.append(el("label", null, `${i + 1}번`), select);
        return field;
    }));

    if (usable.length === 0) {
        $("partySlots").append(el("p", "empty",
            "전투 킷이 있는 캐릭터(반디)의 빌드를 먼저 최적화 화면에서 저장하세요."));
    }
}

async function startBattle() {

    const ids = partyBuildIds.filter(Boolean);
    if (ids.length === 0) return toast("파티에 최소 1명이 필요합니다.", true);

    // 저장된 빌드 전체를 config로 보낸다.
    const party = ids.map(id => BUILDS.find(b => b.id === id));

    const enemy = {
        level: Number($("enemyLevel").value) || 80,
        toughness: Number($("enemyToughness").value) || 180,
        weakness: [...selectedWeakness]
    };

    const res = await api("/battle", { op: "init", party, enemy });
    if (!res.success) return toast(res.message ?? "전투 시작 실패", true);

    config = res.data.config;
    state = res.data.state;

    $("setup").hidden = true;
    $("battle").hidden = false;
    renderBattle(res.data.view);
}

// ===== 전투 =====

function renderBattle(view) {

    $("battleTime").textContent = `AV ${view.time}`;

    // 행동 순서 바
    $("orderBar").replaceChildren(...view.upcoming.map((u, i) => {
        const item = el("div", `order-item${i === 0 ? " now" : ""}`);
        item.append(portrait(u.icon, u.name));
        if (i === 0) item.append(el("span", "now-label", "지금"));
        return item;
    }));

    // 적 강인도
    const pct = view.enemy.maxToughness
        ? (view.enemy.toughness / view.enemy.maxToughness) * 100 : 0;
    $("toughValue").textContent = `${view.enemy.toughness} / ${view.enemy.maxToughness}`;
    $("toughFill").style.width = `${pct}%`;
    $("toughFill").classList.toggle("broken", view.enemy.broken);
    $("totalDamage").textContent = `총 피해 ${view.totalDamage.toLocaleString("ko-KR")}`;

    // 활성 버프
    $("activeBuffs").replaceChildren(...(view.conditions.length
        ? view.conditions.map(c => el("span", "chip readonly on", conditionLabel(c)))
        : [el("span", "empty-inline", "없음")]));

    // 현재 턴
    $("currentTurn").replaceChildren(
        portrait(view.actor.icon, view.actor.name),
        el("div", "turn-name", `${view.actor.name}의 턴`)
    );

    // 스킬 버튼
    $("skills").replaceChildren(...view.available.map(s => {
        const btn = el("button", "skill-btn");
        if (s.icon) {
            const img = el("img");
            Object.assign(img, { src: `/img/skill/${s.icon}.png`, width: 40, height: 40, alt: "" });
            btn.append(img);
        }
        btn.append(el("span", null, `${s.name}<br><small>${skillTypeLabel(s.id)}</small>`));
        btn.onclick = () => act(s.id);
        return btn;
    }));

    // 자원 (에너지/SP)
    const actorId = view.actor.id;
    const energy = view.energy[actorId] ?? 0;
    const maxEnergy = view.maxEnergy[actorId] ?? 0;
    $("resources").replaceChildren(
        el("div", "res", `⚡ 에너지 <b>${energy} / ${maxEnergy}</b>`),
        el("div", "res", `◆ 스킬 포인트 <b>${view.sp} / ${view.maxSp}</b>`)
    );

    // 전투 기록
    $("battleLog").replaceChildren(...[...view.log].reverse().slice(0, 20).map(l => {
        const row = el("div", "log-row");
        row.innerHTML =
            `<span class="log-skill">${l.name}</span>` +
            (l.damage > 0 ? `<span class="log-dmg">${l.damage.toLocaleString("ko-KR")}</span>` : "") +
            (l.broken ? `<span class="log-break">약점 격파!</span>` : "");
        return row;
    }));
}

async function act(skillId) {
    const res = await api("/battle", { op: "act", config, state, skillId });
    if (!res.success) return toast(res.message ?? "행동 실패", true);
    state = res.data.state;
    renderBattle(res.data.view);
}

// ===== 유틸 =====

const portrait = (icon, name) => {
    const img = el("img", "portrait");
    Object.assign(img, { src: `/img/character/${icon}.png`, width: 44, height: 44, alt: name, title: name });
    return img;
};

const SKILL_TYPE = {
    basic: "일반 공격", basic2: "강화 일반", skill: "전투 스킬", skill2: "강화 스킬",
    ultimate: "필살기", technique: "비술"
};
const skillTypeLabel = id => SKILL_TYPE[id] ?? id;

const CONDITION = {
    enhanced: "완전연소", afterUltimate: "필살기 후", afterSkill: "스킬 후",
    afterKill: "처치 후", afterKillOrHit: "처치·피격 후", targetDetonated: "궤멸",
    enemyBroken: "약점 격파", enemyDebuffed: "디버프", battleStart: "전투 시작"
};
const conditionLabel = c => CONDITION[c] ?? c;

// ===== 초기화 =====

async function init() {
    const [meta, builds] = await Promise.all([api("/meta"), api("/builds")]);
    META = meta.data;
    BUILDS = builds.data ?? [];
    renderSetup();

    $("startBattle").onclick = startBattle;
    $("restart").onclick = () => {
        config = state = null;
        $("battle").hidden = true;
        $("setup").hidden = false;
    };
}

init();
