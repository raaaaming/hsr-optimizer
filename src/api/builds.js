import { Build } from "../models/Build.js";
import {
    RELIC_SLOTS,
    RELIC_MAIN_STATS,
    SUBSTAT_KEYS,
    SUBSTAT_ROLL_VALUES,
    SUBSTAT_TIER_LABELS,
    RELIC_LEVEL_STEP,
    RELIC_MAX_LEVEL,
    MAX_SUBSTATS,
    MAX_ROLLS_PER_SUBSTAT,
    MIN_EFFECTIVE_STATS,
    MAX_EFFECTIVE_STATS,
    MAX_LEVEL_BY_ASCENSION,
    MIN_LEVEL_BY_ASCENSION,
    rollBudget
} from "../data/gameData.js";
import { relicSetRegistry, characterRegistry } from "../registry/index.js";
import { defaultEffectiveStats } from "../data/effectiveStats.js";
import { getBody, getPagination } from "../util/http.js";
import {
    success,
    error,
    notFound,
    methodNotAllowed
} from "../util/response.js";

const ELEMENTS = [
    "physical", "fire", "ice", "lightning",
    "wind", "quantum", "imaginary"
];

const PATHS = [
    "destruction", "hunt", "erudition", "harmony",
    "nihility", "preservation", "abundance", "remembrance"
];

export async function handler(request, { repos, id, query }) {

    switch (request.method) {

        case "GET":
            return id
                ? getBuild(repos, id)
                : listBuilds(repos, query);

        case "POST":
            return id
                ? error("POST is not allowed on a single build.", 405)
                : createBuild(repos, request);

        case "PUT":
            return id
                ? updateBuild(repos, id, request)
                : error("Build id is required.", 400);

        case "DELETE":
            return id
                ? deleteBuild(repos, id)
                : error("Build id is required.", 400);

        default:
            return methodNotAllowed(request.method);

    }

}

async function listBuilds(repos, query) {

    const pagination = getPagination(query);

    const builds = query.character
        ? await repos.builds.findByCharacter(query.character, pagination)
        : await repos.builds.all(pagination);

    return success(builds);

}

async function getBuild(repos, id) {

    const build = await repos.builds.find(id);

    if (!build) return notFound(`/api/builds/${id}`);

    return success(build);

}

async function createBuild(repos, request) {

    const body = await getBody(request);

    const input = pickBuildInput(body);

    if (input.errors.length > 0) {
        return error("Invalid build.", 400, { errors: input.errors });
    }

    const build = Object.assign(new Build(), input.data);

    // 유효 옵션은 최소 1개여야 하는데 새 빌드는 비어 있다.
    // 고르지 않았으면 캐릭터에서 유추해 채워둔다(사용자가 바꿀 수 있다).
    if (build.effectiveStats.length === 0) {
        build.effectiveStats = defaultEffectiveStats(
            characterRegistry.get(build.character)
        );
    }

    return success(await repos.builds.insert(build), "Created");

}

async function updateBuild(repos, id, request) {

    const body = await getBody(request);

    const input = pickBuildInput(body);

    if (input.errors.length > 0) {
        return error("Invalid build.", 400, { errors: input.errors });
    }

    const build = await repos.builds.update(id, input.data);

    if (!build) return notFound(`/api/builds/${id}`);

    return success(build, "Updated");

}

async function deleteBuild(repos, id) {

    const removed = await repos.builds.remove(id);

    if (!removed) return notFound(`/api/builds/${id}`);

    return success({ id }, "Deleted");

}

/**
 * 요청 본문에서 알려진 속성만 추린다.
 * 생성/수정 양쪽에서 쓰이므로 없는 키는 그냥 건너뛴다.
 */
function pickBuildInput(body) {

    const data = {};
    const errors = [];

    if (Object.hasOwn(body, "name")) {

        if (typeof body.name !== "string" || body.name.trim() === "") {
            errors.push("name must be a non-empty string.");
        } else {
            data.name = body.name.trim();
        }

    }

    if (Object.hasOwn(body, "character")) {

        if (typeof body.character !== "string") {
            errors.push("character must be a string.");
        } else {
            data.character = body.character;
        }

    }

    if (Object.hasOwn(body, "element")) {

        if (body.element !== "" && !ELEMENTS.includes(body.element)) {
            errors.push(`element must be one of: ${ELEMENTS.join(", ")}`);
        } else {
            data.element = body.element;
        }

    }

    if (Object.hasOwn(body, "path")) {

        if (body.path !== "" && !PATHS.includes(body.path)) {
            errors.push(`path must be one of: ${PATHS.join(", ")}`);
        } else {
            data.path = body.path;
        }

    }

    if (Object.hasOwn(body, "eidolon")) {

        if (!Number.isInteger(body.eidolon) || body.eidolon < 0 || body.eidolon > 6) {
            errors.push("eidolon must be an integer between 0 and 6.");
        } else {
            data.eidolon = body.eidolon;
        }

    }

    if (Object.hasOwn(body, "level")) {

        if (!Number.isInteger(body.level) || body.level < 1 || body.level > 80) {
            errors.push("level must be an integer between 1 and 80.");
        } else {
            data.level = body.level;
        }

    }

    if (Object.hasOwn(body, "ascension")) {

        if (!Number.isInteger(body.ascension) || body.ascension < 0 || body.ascension > 6) {
            errors.push("ascension must be an integer between 0 and 6.");
        } else {
            data.ascension = body.ascension;
        }

    }

    // 레벨은 돌파가 허용하는 구간 안이어야 한다.
    // 돌파를 하면 상한이 열리는 동시에 하한도 같이 올라간다(6돌파 => 70~80).
    if (data.level !== undefined && data.ascension !== undefined) {

        const cap = MAX_LEVEL_BY_ASCENSION[data.ascension];
        const floor = MIN_LEVEL_BY_ASCENSION[data.ascension];

        if (data.level > cap) {
            errors.push(`level ${data.level} exceeds the cap ${cap} for ascension ${data.ascension}.`);
        }

        if (data.level < floor) {
            errors.push(`level ${data.level} is below the floor ${floor} for ascension ${data.ascension}.`);
        }

    }

    if (Object.hasOwn(body, "skills")) {

        if (typeof body.skills !== "object" || body.skills === null) {
            errors.push("skills must be an object.");
        } else {

            const skills = {};

            for (const [key, value] of Object.entries(body.skills)) {

                if (!Number.isInteger(value) || value < 1 || value > 15) {
                    errors.push(`skills.${key} must be an integer between 1 and 15.`);
                } else {
                    skills[key] = value;
                }

            }

            data.skills = skills;

        }

    }

    if (Object.hasOwn(body, "traces")) {

        if (typeof body.traces !== "object" || body.traces === null) {
            errors.push("traces must be an object.");
        } else if (body.traces.minor !== undefined && !Array.isArray(body.traces.minor)) {
            errors.push("traces.minor must be an array of node ids.");
        } else {
            data.traces = {
                major: body.traces.major ?? {},
                minor: body.traces.minor ?? []
            };
        }

    }

    if (Object.hasOwn(body, "lightCone")) {

        if (typeof body.lightCone !== "object" || body.lightCone === null) {
            errors.push("lightCone must be an object.");
        } else {

            const superimposition = body.lightCone.superimposition ?? 1;

            if (!Number.isInteger(superimposition) || superimposition < 1 || superimposition > 5) {
                errors.push("lightCone.superimposition must be an integer between 1 and 5.");
            }

            data.lightCone = {
                id: body.lightCone.id ?? null,
                level: body.lightCone.level ?? 80,
                ascension: body.lightCone.ascension ?? 6,
                superimposition
            };

        }

    }

    if (Object.hasOwn(body, "relics")) {

        if (!Array.isArray(body.relics)) {
            errors.push("relics must be an array.");
        } else if (body.relics.length > 6) {
            errors.push("relics can have at most 6 entries.");
        } else {
            const relics = pickRelics(body.relics, errors);

            if (relics) data.relics = relics;
        }

    }

    if (Object.hasOwn(body, "stats")) {

        if (typeof body.stats !== "object" || body.stats === null) {
            errors.push("stats must be an object.");
        } else {
            data.stats = body.stats;
        }

    }

    if (Object.hasOwn(body, "effectiveStats")) {

        const list = body.effectiveStats;

        if (!Array.isArray(list)) {
            errors.push("effectiveStats must be an array.");
        } else if (
            list.length < MIN_EFFECTIVE_STATS ||
            list.length > MAX_EFFECTIVE_STATS
        ) {
            errors.push(
                `effectiveStats must have ${MIN_EFFECTIVE_STATS} to ` +
                `${MAX_EFFECTIVE_STATS} entries.`
            );
        } else if (list.some(key => !SUBSTAT_KEYS.includes(key))) {
            errors.push(
                `effectiveStats must contain only substat keys: ${SUBSTAT_KEYS.join(", ")}`
            );
        } else if (new Set(list).size !== list.length) {
            errors.push("effectiveStats must not contain duplicates.");
        } else {
            data.effectiveStats = [...list];
        }

    }

    if (Object.hasOwn(body, "memo")) {

        if (typeof body.memo !== "string") {
            errors.push("memo must be a string.");
        } else {
            data.memo = body.memo;
        }

    }

    return { data, errors };

}

const SLOT_IDS = RELIC_SLOTS.map(slot => slot.id);

/**
 * 유물 부위/세트/주옵션/부옵션 검증.
 * 주옵션은 부위마다 나올 수 있는 것이 정해져 있다.
 */
function pickRelics(source, errors) {

    const relics = [];

    const seen = new Set();

    source.forEach((relic, index) => {

        if (typeof relic !== "object" || relic === null) {
            errors.push(`relics[${index}] must be an object.`);
            return;
        }

        if (!SLOT_IDS.includes(relic.slot)) {
            errors.push(`relics[${index}].slot must be one of: ${SLOT_IDS.join(", ")}`);
            return;
        }

        if (seen.has(relic.slot)) {
            errors.push(`relics[${index}]: duplicate slot '${relic.slot}'.`);
            return;
        }

        seen.add(relic.slot);

        if (relic.set && !relicSetRegistry.has(relic.set)) {
            errors.push(`relics[${index}].set '${relic.set}' is unknown.`);
            return;
        }

        const level = relic.level ?? RELIC_MAX_LEVEL;

        // 강화는 3레벨 단위로만 올라간다. 그때마다 부옵션 굴림이 1회 일어난다.
        if (
            !Number.isInteger(level) ||
            level < 0 ||
            level > RELIC_MAX_LEVEL ||
            level % RELIC_LEVEL_STEP !== 0
        ) {
            errors.push(
                `relics[${index}].level must be a multiple of ${RELIC_LEVEL_STEP} ` +
                `between 0 and ${RELIC_MAX_LEVEL}.`
            );
            return;
        }

        const allowedMain = Object.keys(RELIC_MAIN_STATS[relic.slot]);

        if (!allowedMain.includes(relic.mainStat)) {
            errors.push(
                `relics[${index}].mainStat '${relic.mainStat}' is not valid for slot '${relic.slot}'. ` +
                `allowed: ${allowedMain.join(", ")}`
            );
            return;
        }

        const substats = [];

        const seenKeys = new Set();

        for (const [i, sub] of (relic.substats ?? []).entries()) {

            if (!SUBSTAT_KEYS.includes(sub?.key)) {
                errors.push(`relics[${index}].substats[${i}].key '${sub?.key}' is not a valid substat.`);
                continue;
            }

            if (seenKeys.has(sub.key)) {
                errors.push(`relics[${index}].substats[${i}]: duplicate substat '${sub.key}'.`);
                continue;
            }

            seenKeys.add(sub.key);

            // 값이 아니라 굴림 목록을 받는다. 부옵션은 붙거나 강화될 때마다
            // 하/중/상 중 하나가 굴려져 쌓인다. 굴림마다 등급이 따로 정해지므로
            // 같은 부옵션이라도 등급이 섞일 수 있다.
            if (
                !Array.isArray(sub.rolls) ||
                sub.rolls.length < 1 ||
                sub.rolls.length > MAX_ROLLS_PER_SUBSTAT
            ) {
                errors.push(
                    `relics[${index}].substats[${i}].rolls must have 1 to ` +
                    `${MAX_ROLLS_PER_SUBSTAT} entries.`
                );
                continue;
            }

            const tierCount = SUBSTAT_ROLL_VALUES[sub.key].length;

            const badTier = sub.rolls.some(
                tier => !Number.isInteger(tier) || tier < 0 || tier >= tierCount
            );

            if (badTier) {
                errors.push(
                    `relics[${index}].substats[${i}].rolls must contain integers ` +
                    `between 0 and ${tierCount - 1} (${SUBSTAT_TIER_LABELS.join("/")}).`
                );
                continue;
            }

            substats.push({ key: sub.key, rolls: [...sub.rolls] });

        }

        if (substats.length > MAX_SUBSTATS) {
            errors.push(`relics[${index}] can have at most ${MAX_SUBSTATS} substats.`);
            return;
        }

        // 굴림 총합은 강화 레벨이 허용하는 만큼만 나올 수 있다.
        //
        //   총 굴림 = 초기 부옵션 개수(3 또는 4) + 3레벨마다 1회
        //
        // 하한은 강제하지 않는다. 입력이 덜 끝난 유물도 저장할 수 있어야 한다.
        const totalRolls = substats.reduce((sum, sub) => sum + sub.rolls.length, 0);

        const budget = rollBudget(level);

        if (totalRolls > budget.max) {
            errors.push(
                `relics[${index}]: total substat rolls ${totalRolls} exceed ` +
                `${budget.max} for level +${level}.`
            );
            return;
        }

        relics.push({
            slot: relic.slot,
            set: relic.set ?? null,
            level,
            mainStat: relic.mainStat,
            substats
        });

    });

    return errors.length > 0 ? null : relics;

}
