import { Build } from "../models/Build.js";
import {
    RELIC_SLOTS,
    RELIC_MAIN_STATS,
    SUBSTAT_KEYS,
    MAX_LEVEL_BY_ASCENSION
} from "../data/gameData.js";
import { relicSetRegistry } from "../registry/index.js";
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

    // 레벨은 돌파 상한을 넘을 수 없다.
    if (data.level !== undefined && data.ascension !== undefined) {

        const cap = MAX_LEVEL_BY_ASCENSION[data.ascension];

        if (data.level > cap) {
            errors.push(`level ${data.level} exceeds the cap ${cap} for ascension ${data.ascension}.`);
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

        const level = relic.level ?? 15;

        if (!Number.isInteger(level) || level < 0 || level > 15) {
            errors.push(`relics[${index}].level must be an integer between 0 and 15.`);
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

        for (const [i, sub] of (relic.substats ?? []).entries()) {

            if (!SUBSTAT_KEYS.includes(sub?.key)) {
                errors.push(`relics[${index}].substats[${i}].key '${sub?.key}' is not a valid substat.`);
                continue;
            }

            if (typeof sub.value !== "number" || sub.value < 0) {
                errors.push(`relics[${index}].substats[${i}].value must be a non-negative number.`);
                continue;
            }

            substats.push({ key: sub.key, value: sub.value });

        }

        if (substats.length > 4) {
            errors.push(`relics[${index}] can have at most 4 substats.`);
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
