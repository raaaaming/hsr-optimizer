/**
 * Yatta(sr.yatta.moe) => characters 시드 SQL 생성기.
 *
 *   node scripts/sync-gamedata.js
 *
 * 빌드 타임에만 돈다. Worker 런타임은 Yatta를 알지 못한다.
 * 결과물 src/data/generated/characters.sql은 git에 커밋한다.
 * 패치 때 재실행 후 diff를 보면 수치 변화가 그대로 드러난다.
 *
 * 매핑 테이블은 전부 strict다. Yatta에 모르는 값이 새로 생기면
 * 조용히 빈 값으로 새는 대신 여기서 죽는다. 4.x에서 '환락(Elation)'
 * 운명과 '환락도(IconJoy)' 스탯이 실제로 그렇게 추가됐다.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const API = "https://sr.yatta.moe/api/v2";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const OUT_CHARACTERS = resolve(ROOT, "src/data/generated/characters.sql");

const OUT_LIGHT_CONES = resolve(ROOT, "src/data/generated/light_cones.sql");

const OUT_RELIC_SETS = resolve(ROOT, "src/data/generated/relic_sets.sql");

/** Yatta pathType.id => gameData.js의 PATH_LABEL 키 */
const PATH_MAP = {
    Warrior: "destruction",
    Rogue: "hunt",
    Mage: "erudition",
    Shaman: "harmony",
    Warlock: "nihility",
    Knight: "preservation",
    Priest: "abundance",
    Memory: "remembrance",
    Elation: "elation"
};

/** Yatta combatType.id => gameData.js의 ELEMENT_LABEL 키 */
const ELEMENT_MAP = {
    Physical: "physical",
    Fire: "fire",
    Ice: "ice",
    Thunder: "lightning",
    Wind: "wind",
    Quantum: "quantum",
    Imaginary: "imaginary"
};

/** 부가 행적 statusList[].icon => gameData.js의 STATS 키 */
const STAT_ICON_MAP = {
    IconMaxHP: "hpPct",
    IconAttack: "atkPct",
    IconDefence: "defPct",
    IconSpeed: "spd",
    IconCriticalChance: "critRate",
    IconCriticalDamage: "critDamage",
    IconBreakUp: "breakEffect",
    IconStatusProbability: "effectHitRate",
    IconStatusResistance: "effectRes",
    IconJoy: "joy",
    IconPhysicalAddedRatio: "physicalDmg",
    IconFireAddedRatio: "fireDmg",
    IconIceAddedRatio: "iceDmg",
    IconThunderAddedRatio: "lightningDmg",
    IconWindAddedRatio: "windDmg",
    IconQuantumAddedRatio: "quantumDmg",
    IconImaginaryAddedRatio: "imaginaryDmg"
};

/**
 * 영어 로케일의 skill type => 우리 action id.
 *
 * 한국어 type("일반 공격")은 로케일이 바뀌면 깨지므로 분류에 쓰지 않는다.
 * 표시용 이름만 한국어에서 가져온다.
 */
const ACTION_TYPE_MAP = {
    "Basic ATK": "basic",
    Skill: "skill",
    Ultimate: "ultimate",
    Talent: "talent",
    Technique: "technique",
    "Elation Skill": "elationSkill",
    "Assist Skill": "assistSkill"
};

function must(map, key, what, who) {
    if (!Object.hasOwn(map, key)) {
        throw new Error(
            `알 수 없는 ${what}: ${JSON.stringify(key)} (${who}). ` +
            `scripts/sync-gamedata.js의 매핑과 src/data/gameData.js를 함께 갱신해라.`
        );
    }
    return map[key];
}

async function get(path) {

    const response = await fetch(`${API}${path}`, {
        headers: { "User-Agent": "hsr-optimizer/sync-gamedata" }
    });

    if (!response.ok) {
        throw new Error(`GET ${path} => HTTP ${response.status}`);
    }

    const body = await response.json();

    if (body.response !== 200) {
        throw new Error(`GET ${path} => response ${body.response}`);
    }

    return body.data;

}

/**
 * route("March 7th") => slug("march-7th")
 */
function toSlug(route) {

    return String(route ?? "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

}

/**
 * 캐릭터마다 유일한 slug를 배정한다.
 *
 * 대부분은 route만으로 유일하다("firefly"). 개척자 10종과 3월 7일 2종처럼
 * route가 겹칠 때만 id를 붙인다("trailblazer-8001"). 겹치지도 않는데
 * 전부 id를 달면 formula 키가 "firefly-1310.basic"처럼 지저분해진다.
 */
function assignSlugs(entries) {

    const count = new Map();

    for (const entry of entries) {

        const slug = toSlug(entry.meta.route);

        count.set(slug, (count.get(slug) ?? 0) + 1);

    }

    return new Map(
        entries.map(entry => {

            const slug = toSlug(entry.meta.route);

            const unique = slug && count.get(slug) === 1
                ? slug
                : `${slug || "avatar"}-${entry.id}`;

            return [entry.id, unique];

        })
    );

}

/**
 * upgrade[] => Character.baseStatsAt()이 기대하는 형태.
 *
 *   value = base + growth * (level - 1) + ascensionAdd[ascension]
 *
 * Yatta는 승급 단계마다 skillBase(그 단계의 1레벨 기준값)와
 * skillAdd(레벨당 증가량)를 준다. skillAdd는 전 단계에서 동일하므로
 * growth로 그대로 쓰고, 단계별 기준값 차이를 ascensionAdd로 환산한다.
 */
function toStats(upgrade, who) {

    const first = upgrade[0];

    const base = {
        hp: first.skillBase.hPBase,
        atk: first.skillBase.attackBase,
        def: first.skillBase.defenceBase
    };

    const growth = {
        hp: first.skillAdd.hPAdd,
        atk: first.skillAdd.attackAdd,
        def: first.skillAdd.defenceAdd
    };

    // growth가 단계마다 다르면 위 공식이 성립하지 않는다. 조용히 틀리느니 죽는다.
    for (const tier of upgrade) {
        if (
            tier.skillAdd.hPAdd !== growth.hp ||
            tier.skillAdd.attackAdd !== growth.atk ||
            tier.skillAdd.defenceAdd !== growth.def
        ) {
            throw new Error(
                `${who}: 승급 단계마다 성장치가 다르다. ` +
                `Character.baseStatsAt()의 선형 공식으로 표현할 수 없다.`
            );
        }
    }

    const round = n => Math.round(n * 1000) / 1000;

    return {
        base: {
            hp: round(base.hp),
            atk: round(base.atk),
            def: round(base.def)
        },
        growth: {
            hp: round(growth.hp),
            atk: round(growth.atk),
            def: round(growth.def)
        },
        ascensionAdd: upgrade.map(tier => ({
            hp: round(tier.skillBase.hPBase - base.hp),
            atk: round(tier.skillBase.attackBase - base.atk),
            def: round(tier.skillBase.defenceBase - base.def)
        })),
        spd: first.skillBase.speedBase,
        taunt: first.skillBase.baseAggro
    };

}

/**
 * traces.mainSkills => actions[]
 *
 * 강화 일반 공격처럼 한 노드에 스킬이 여러 개 달리는 경우가 있어
 * 첫 번째를 기본으로 두고 나머지는 basic2, basic3... 으로 편다.
 */
function toActions(mainSkills, enSkills, slug, who) {

    const actions = [];

    const used = new Map();

    for (const [nodeId, node] of Object.entries(mainSkills ?? {})) {

        const enNode = enSkills?.[nodeId];

        const list = Object.entries(node.skillList ?? {});

        // 레벨은 개별 스킬이 아니라 노드에 붙는다. 반디의 basic(지령-폭연 추진)과
        // basic2(강화 일반 공격)는 같은 노드라 레벨을 공유한다.
        // 그 노드의 첫 액션 id를 레벨 키로 삼는다.
        let levelKey = null;

        for (const [skillId, skill] of list) {

            const enType = enNode?.skillList?.[skillId]?.type;

            if (!enType) {
                throw new Error(`${who}: 스킬 ${skillId}의 영어 type이 없다.`);
            }

            const kind = must(ACTION_TYPE_MAP, enType, "스킬 종류", who);

            const seen = (used.get(kind) ?? 0) + 1;

            used.set(kind, seen);

            const id = seen === 1 ? kind : `${kind}${seen}`;

            levelKey ??= id;

            actions.push({
                id,
                levelKey,
                name: skill.name ?? "",
                formula: `${slug}.${id}`,

                // UI/skill/{icon}.png. scripts/sync-images.js가 받아둔다.
                icon: skill.icon ?? null,

                // 손으로 쓴 공식이 없을 때 generic 공식이 읽는 값.
                // params[n] = n번 자리표시자(#n)의 레벨별 배열.
                params: skill.params ?? null,
                desc: skill.description ?? "",
                tag: skill.tag ?? null,
                maxLevel: node.maxLevel ?? 1,
                skillId
            });

        }

    }

    return actions;

}

/**
 * traces.subSkills => { majorTraces, minorTraces }
 *
 * pointType Special = 큰 행적(A2/A4/A6), Attribute = 스탯을 주는 작은 행적.
 * Unknown은 개척자의 statusList가 빈 자리표시자 노드라 버린다.
 */
function toTraces(subSkills, who) {

    const majorTraces = [];

    const minorTraces = [];

    for (const [id, node] of Object.entries(subSkills ?? {})) {

        // 승급으로 열리거나(avatarPromotionLimit) 레벨로 열린다(avatarLevelLimit).
        // 레벨 개방은 그 레벨에 도달 가능한 최소 승급으로 환산한다.
        const unlockAscension =
            node.avatarPromotionLimit ??
            ascensionForLevel(node.avatarLevelLimit);

        if (node.pointType === "Special") {

            majorTraces.push({
                id,
                name: node.name ?? "",
                desc: node.description ?? "",
                icon: node.icon ?? null,
                unlockAscension
            });

            continue;

        }

        if (node.pointType !== "Attribute") {
            continue;
        }

        for (const status of node.statusList ?? []) {

            minorTraces.push({
                id,
                stat: must(STAT_ICON_MAP, status.icon, "스탯 아이콘", who),
                value: status.value,
                unlockAscension
            });

        }

    }

    return { majorTraces, minorTraces };

}

/** MAX_LEVEL_BY_ASCENSION = [20,30,40,50,60,70,80] */
const MAX_LEVEL_BY_ASCENSION = [20, 30, 40, 50, 60, 70, 80];

function ascensionForLevel(level) {

    if (!level) return 0;

    const index = MAX_LEVEL_BY_ASCENSION.findIndex(max => level <= max);

    return index === -1 ? MAX_LEVEL_BY_ASCENSION.length - 1 : index;

}

function toEidolons(eidolons) {

    return Object.values(eidolons ?? {})
        .sort((a, b) => a.rank - b.rank)
        .map(eidolon => ({
            id: `e${eidolon.rank}`,
            name: eidolon.name ?? "",
            desc: eidolon.description ?? "",
            icon: eidolon.icon ?? null,
            params: eidolon.params ?? null,
            // 성흔이 올려주는 스킬 레벨. 키는 원본 스킬 ID다.
            skillAddLevelList: eidolon.skillAddLevelList ?? null
        }));

}

function transform(kr, en, meta, slug, now) {

    const who = `${kr.name}(${kr.id})`;

    const { majorTraces, minorTraces } = toTraces(kr.traces?.subSkills, who);

    const releasedAt = (meta.release ?? 0) * 1000;

    return {
        id: String(kr.id),
        slug,
        name: kr.name ?? "",
        element: must(ELEMENT_MAP, kr.types.combatType.id, "속성", who),
        path: must(PATH_MAP, kr.types.pathType.id, "운명", who),
        rarity: kr.rank ?? 5,

        isBeta: releasedAt === 0 || releasedAt > now ? 1 : 0,
        releasedAt,

        stats: toStats(kr.upgrade, who),
        actions: toActions(kr.traces?.mainSkills, en.traces?.mainSkills, slug, who),
        majorTraces,
        minorTraces,
        eidolons: toEidolons(kr.eidolons),
        tags: []
    };

}

/**
 * 광추. 캐릭터와 구조가 거의 같아 upgrade는 toStats를 그대로 쓴다.
 *
 * passive는 해석하지 않고 원본(params + 설명문)만 넣는다.
 * params는 자리표시자 번호 => 중첩 1~5단계 배열이고, 어느 자리표시자가
 * 어떤 스탯인지는 한국어 설명문에만 있다. 게다가 무조건 효과와 조건부 효과가
 * 섞여 있어서(#1은 상시, #4는 "스택마다") 전부 더하면 조용히 틀린다.
 * 그 해석은 src/data/lightConePassives.js에서 사람이 한다.
 */
function transformLightCone(kr, slug, now) {

    const who = `${kr.name}(${kr.id})`;

    return {
        id: String(kr.id),
        slug,
        name: kr.name ?? "",
        path: must(PATH_MAP, kr.types.pathType.id, "운명", who),
        rarity: kr.rank ?? 3,

        stats: toStats(kr.upgrade, who),

        passive: {
            name: kr.skill?.name ?? "",
            desc: kr.skill?.description ?? "",
            params: kr.skill?.params ?? null
        }
    };

}

/**
 * Yatta의 한국어 텍스트는 공백을 전부 non-breaking space(U+00A0)로 준다.
 * 그대로 두면 "토오사카 린"을 검색해도 안 걸리고 비교도 어긋난다.
 * 의미는 같으니 평범한 공백으로 되돌린다.
 */
const clean = text => text.replaceAll("\u00a0", " ");

/**
 * Yatta suite 키 => gameData.js의 RELIC_SLOTS 키.
 *
 * NECK/OBJECT가 헷갈리는데, 부위 이름을 보면 알 수 있다.
 * 우주 봉인 정거장의 NECK은 「헤르타」의 우주정거장(차원 구체),
 * OBJECT는 「헤르타」의 궤적(연결 매듭)이다.
 */
const SUITE_SLOT_MAP = {
    HEAD: "head",
    HAND: "hands",
    BODY: "body",
    FOOT: "feet",
    NECK: "sphere",
    OBJECT: "rope"
};

/**
 * 유물 세트.
 *
 * skillList는 세트 개수("2"/"4")를 키로 { description, params }를 준다.
 * 광추 패시브와 같은 이유로 해석은 하지 않고 원본만 넣는다.
 * 실제로 어떤 스탯이 오르는지는 src/data/relicSetEffects.js가 정한다.
 */
function transformRelicSet(kr, slug, now) {

    const who = `${kr.name}(${kr.id})`;

    const effects = {};

    for (const [pieces, effect] of Object.entries(kr.skillList ?? {})) {

        effects[pieces] = {
            desc: effect.description ?? "",
            params: effect.params ?? null
        };

    }

    // 부위마다 그림이 다르다. UI/relic/{icon}.png
    const pieces = {};

    for (const [suiteKey, piece] of Object.entries(kr.suite ?? {})) {

        const slot = must(SUITE_SLOT_MAP, suiteKey, "유물 부위", who);

        pieces[slot] = { name: piece.name ?? "", icon: piece.icon ?? null };

    }

    return {
        id: String(kr.id),
        slug,
        name: kr.name ?? "",
        type: kr.isPlanarSuit ? "planar" : "relic",
        // 세트 대표 그림. 부위 아이콘과 달리 숫자다(예: "71000").
        icon: kr.icon ? String(kr.icon) : null,
        effects,
        pieces
    };

}

const quote = value => `'${clean(String(value)).replaceAll("'", "''")}'`;

const json = value => quote(
    JSON.stringify(value, (_, v) => typeof v === "string" ? clean(v) : v)
);

const COLUMNS = `id, slug, name, element, path, rarity, ` +
    `is_beta, released_at, ` +
    `stats, actions, major_traces, minor_traces, eidolons, tags`;

const LC_COLUMNS = `id, slug, name, path, rarity, stats, passive`;

const RS_COLUMNS = `id, slug, name, type, icon, effects, pieces`;

function toRelicSetSql(sets, now) {

    const rows = sets.map(set =>
        `INSERT INTO relic_sets (${RS_COLUMNS}) VALUES (
    ${quote(set.id)},
    ${quote(set.slug)},
    ${quote(set.name)},
    ${quote(set.type)},
    ${quote(set.icon ?? "")},
    ${json(set.effects)},
    ${json(set.pieces)}
);`
    );

    return `-- 자동 생성 파일. 직접 고치지 마라.
-- 생성: scripts/sync-gamedata.js (출처: sr.yatta.moe)
-- 생성 시각: ${new Date(now).toISOString()}
-- 세트 수: ${sets.length} (유물 ${sets.filter(s => s.type === "relic").length}, 행성구 ${sets.filter(s => s.type === "planar").length})
--
-- effects는 해석 전 원본이다. 실제 스탯 보너스는 src/data/relicSetEffects.js를 봐라.

DELETE FROM relic_sets;

${rows.join("\n\n")}
`;

}

function toLightConeSql(lightCones, now) {

    const rows = lightCones.map(lc =>
        `INSERT INTO light_cones (${LC_COLUMNS}) VALUES (
    ${quote(lc.id)},
    ${quote(lc.slug)},
    ${quote(lc.name)},
    ${quote(lc.path)},
    ${lc.rarity},
    ${json(lc.stats)},
    ${json(lc.passive)}
);`
    );

    return `-- 자동 생성 파일. 직접 고치지 마라.
-- 생성: scripts/sync-gamedata.js (출처: sr.yatta.moe)
-- 생성 시각: ${new Date(now).toISOString()}
-- 광추 수: ${lightCones.length}
--
-- passive는 해석 전 원본이다. 실제 스탯 보너스는 src/data/lightConePassives.js를 봐라.

DELETE FROM light_cones;

${rows.join("\n\n")}
`;

}

function toSql(characters, now) {

    // 95명을 INSERT 하나에 몰면 구문이 500KB를 넘어 D1이 SQLITE_TOOBIG로 거절한다.
    // 캐릭터당 한 문장으로 쪼갠다.
    const rows = characters.map(character =>
        `INSERT INTO characters (${COLUMNS}) VALUES (
    ${quote(character.id)},
    ${quote(character.slug)},
    ${quote(character.name)},
    ${quote(character.element)},
    ${quote(character.path)},
    ${character.rarity},
    ${character.isBeta},
    ${character.releasedAt},
    ${json(character.stats)},
    ${json(character.actions)},
    ${json(character.majorTraces)},
    ${json(character.minorTraces)},
    ${json(character.eidolons)},
    ${json(character.tags)}
);`
    );

    return `-- 자동 생성 파일. 직접 고치지 마라.
-- 생성: scripts/sync-gamedata.js (출처: sr.yatta.moe)
-- 생성 시각: ${new Date(now).toISOString()}
-- 캐릭터 수: ${characters.length} (베타 ${characters.filter(c => c.isBeta).length})
--
-- 통째로 갈아끼우므로 재실행해도 안전하다.

DELETE FROM characters;

${rows.join("\n\n")}
`;

}

/**
 * 목록을 청크로 나눠 상세를 받는다. 팬 API를 한꺼번에 두들기지 않는다.
 */
async function fetchDetails(ids, fetchOne) {

    const entries = [];

    const CHUNK = 8;

    for (let i = 0; i < ids.length; i += CHUNK) {

        const details = await Promise.all(
            ids.slice(i, i + CHUNK).map(fetchOne)
        );

        entries.push(...details);

        console.log(`  ${entries.length}/${ids.length}`);

    }

    return entries;

}

async function syncLightCones(now) {

    console.log("\n광추 목록을 받는다...");

    const list = await get("/kr/equipment");

    const ids = Object.keys(list.items);

    console.log(`${ids.length}개. 상세를 받는다...`);

    const entries = await fetchDetails(ids, async id => ({
        id,
        kr: await get(`/kr/equipment/${id}`),
        meta: list.items[id]
    }));

    const slugs = assignSlugs(entries);

    const lightCones = entries
        .map(entry => transformLightCone(entry.kr, slugs.get(entry.id), now))
        .sort((a, b) => Number(a.id) - Number(b.id));

    await writeFile(OUT_LIGHT_CONES, toLightConeSql(lightCones, now), "utf8");

    console.log(`\n${OUT_LIGHT_CONES} 생성 완료.`);
    console.log(`광추 ${lightCones.length}개`);

}

async function syncRelicSets(now) {

    console.log("\n유물 세트 목록을 받는다...");

    const list = await get("/kr/relic");

    const ids = Object.keys(list.items);

    console.log(`${ids.length}개. 상세를 받는다...`);

    const entries = await fetchDetails(ids, async id => ({
        id,
        kr: await get(`/kr/relic/${id}`),
        meta: list.items[id]
    }));

    const slugs = assignSlugs(entries);

    const sets = entries
        .map(entry => transformRelicSet(entry.kr, slugs.get(entry.id), now))
        .sort((a, b) => Number(a.id) - Number(b.id));

    await writeFile(OUT_RELIC_SETS, toRelicSetSql(sets, now), "utf8");

    console.log(`\n${OUT_RELIC_SETS} 생성 완료.`);
    console.log(`유물 세트 ${sets.length}개`);

}

async function syncCharacters(now) {

    console.log("캐릭터 목록을 받는다...");

    const krList = await get("/kr/avatar");

    const ids = Object.keys(krList.items);

    console.log(`${ids.length}명. 상세를 받는다...`);

    // 분류는 로케일에 안 흔들리는 영어 type으로, 표시명은 한국어로 쓴다.
    const entries = await fetchDetails(ids, async id => {

        const [kr, en] = await Promise.all([
            get(`/kr/avatar/${id}`),
            get(`/en/avatar/${id}`)
        ]);

        return { id, kr, en, meta: krList.items[id] };

    });

    // slug는 전체를 봐야 충돌을 알 수 있으므로 상세를 다 받은 뒤에 배정한다.
    const slugs = assignSlugs(entries);

    const characters = entries
        .map(entry =>
            transform(entry.kr, entry.en, entry.meta, slugs.get(entry.id), now)
        )
        .sort((a, b) => Number(a.id) - Number(b.id));

    await writeFile(OUT_CHARACTERS, toSql(characters, now), "utf8");

    const beta = characters.filter(c => c.isBeta);

    console.log(`\n${OUT_CHARACTERS} 생성 완료.`);
    console.log(`캐릭터 ${characters.length}명, 베타 ${beta.length}명`);

    if (beta.length) {
        console.log(`베타: ${beta.map(c => c.name).join(", ")}`);
    }

}

async function main() {

    const now = Date.now();

    await mkdir(dirname(OUT_CHARACTERS), { recursive: true });

    await syncCharacters(now);

    await syncLightCones(now);

    await syncRelicSets(now);

    console.log("\n적용: npm run data:seed");

}

main().catch(error => {
    console.error(`\n실패: ${error.message}`);
    process.exit(1);
});
