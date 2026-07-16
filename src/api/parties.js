import { Party } from "../models/Party.js";
import { getBody, getPagination } from "../util/http.js";
import {
    success,
    error,
    notFound,
    methodNotAllowed
} from "../util/response.js";

const BATTLE_TYPES = ["single", "aoe", "mixed"];

export async function handler(request, { repos, id, query }) {

    switch (request.method) {

        case "GET":
            return id
                ? getParty(repos, id, query)
                : listParties(repos, query);

        case "POST":
            return id
                ? error("POST is not allowed on a single party.", 405)
                : createParty(repos, request);

        case "PUT":
            return id
                ? updateParty(repos, id, request)
                : error("Party id is required.", 400);

        case "DELETE":
            return id
                ? deleteParty(repos, id)
                : error("Party id is required.", 400);

        default:
            return methodNotAllowed(request.method);

    }

}

async function listParties(repos, query) {

    return success(await repos.parties.all(getPagination(query)));

}

/**
 * ?expand=builds 이면 슬롯의 Build ID를 실제 Build로 채워서 반환한다.
 */
async function getParty(repos, id, query) {

    const party = await repos.parties.find(id);

    if (!party) return notFound(`/api/parties/${id}`);

    if (query.expand !== "builds") {
        return success(party);
    }

    const ids = party.slots.filter(slot => slot !== null);

    const builds = await repos.builds.findMany(ids);

    const byId = new Map(builds.map(build => [build.id, build]));

    return success({
        ...party,
        slots: party.slots.map(slot =>
            slot === null ? null : byId.get(slot) ?? null
        )
    });

}

async function createParty(repos, request) {

    const body = await getBody(request);

    const input = pickPartyInput(body);

    if (input.errors.length > 0) {
        return error("Invalid party.", 400, { errors: input.errors });
    }

    const party = new Party();

    // settings는 기본값 위에 부분 병합한다.
    const { settings, ...rest } = input.data;

    Object.assign(party, rest);

    if (settings) {
        Object.assign(party.settings, settings);
    }

    return success(await repos.parties.insert(party), "Created");

}

async function updateParty(repos, id, request) {

    const body = await getBody(request);

    const input = pickPartyInput(body);

    if (input.errors.length > 0) {
        return error("Invalid party.", 400, { errors: input.errors });
    }

    const data = { ...input.data };

    // settings는 JSON 컬럼 전체가 덮어써지므로
    // 기존 값 위에 병합한 결과를 저장해야 일부 키만 보내도 안전하다.
    if (data.settings) {

        const current = await repos.parties.find(id);

        if (!current) return notFound(`/api/parties/${id}`);

        data.settings = { ...current.settings, ...data.settings };

    }

    const party = await repos.parties.update(id, data);

    if (!party) return notFound(`/api/parties/${id}`);

    return success(party, "Updated");

}

async function deleteParty(repos, id) {

    const removed = await repos.parties.remove(id);

    if (!removed) return notFound(`/api/parties/${id}`);

    return success({ id }, "Deleted");

}

function pickPartyInput(body) {

    const data = {};
    const errors = [];

    if (Object.hasOwn(body, "name")) {

        if (typeof body.name !== "string" || body.name.trim() === "") {
            errors.push("name must be a non-empty string.");
        } else {
            data.name = body.name.trim();
        }

    }

    if (Object.hasOwn(body, "slots")) {

        if (!Array.isArray(body.slots) || body.slots.length !== 4) {
            errors.push("slots must be an array of exactly 4 entries.");
        } else if (
            body.slots.some(
                slot => slot !== null && typeof slot !== "string"
            )
        ) {
            errors.push("each slot must be a build id string or null.");
        } else {
            data.slots = body.slots;
        }

    }

    if (Object.hasOwn(body, "memo")) {

        if (typeof body.memo !== "string") {
            errors.push("memo must be a string.");
        } else {
            data.memo = body.memo;
        }

    }

    if (Object.hasOwn(body, "settings")) {

        if (typeof body.settings !== "object" || body.settings === null) {
            errors.push("settings must be an object.");
        } else {
            const settings = pickPartySettings(body.settings, errors);

            if (settings) data.settings = settings;
        }

    }

    return { data, errors };

}

function pickPartySettings(source, errors) {

    const settings = {};

    if (Object.hasOwn(source, "enemyLevel")) {

        if (
            !Number.isInteger(source.enemyLevel) ||
            source.enemyLevel < 1 ||
            source.enemyLevel > 95
        ) {
            errors.push("settings.enemyLevel must be an integer between 1 and 95.");
        } else {
            settings.enemyLevel = source.enemyLevel;
        }

    }

    if (Object.hasOwn(source, "enemyCount")) {

        if (
            !Number.isInteger(source.enemyCount) ||
            source.enemyCount < 1 ||
            source.enemyCount > 5
        ) {
            errors.push("settings.enemyCount must be an integer between 1 and 5.");
        } else {
            settings.enemyCount = source.enemyCount;
        }

    }

    if (Object.hasOwn(source, "battleType")) {

        if (!BATTLE_TYPES.includes(source.battleType)) {
            errors.push(`settings.battleType must be one of: ${BATTLE_TYPES.join(", ")}`);
        } else {
            settings.battleType = source.battleType;
        }

    }

    for (const flag of ["moc", "apocalypticShadow", "pureFiction"]) {

        if (!Object.hasOwn(source, flag)) continue;

        if (typeof source[flag] !== "boolean") {
            errors.push(`settings.${flag} must be a boolean.`);
        } else {
            settings[flag] = source[flag];
        }

    }

    return settings;

}
