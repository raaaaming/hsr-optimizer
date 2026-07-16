import { Cycle } from "../models/Cycle.js";
import { getBody, getPagination } from "../util/http.js";
import {
    success,
    error,
    notFound,
    methodNotAllowed
} from "../util/response.js";

export async function handler(request, { repos, id, query }) {

    switch (request.method) {

        case "GET":
            return id
                ? getCycle(repos, id)
                : listCycles(repos, query);

        case "POST":
            return id
                ? error("POST is not allowed on a single cycle.", 405)
                : createCycle(repos, request);

        case "PUT":
            return id
                ? updateCycle(repos, id, request)
                : error("Cycle id is required.", 400);

        case "DELETE":
            return id
                ? deleteCycle(repos, id)
                : error("Cycle id is required.", 400);

        default:
            return methodNotAllowed(request.method);

    }

}

async function listCycles(repos, query) {

    const cycles = query.partyId
        ? await repos.cycles.findByParty(query.partyId)
        : await repos.cycles.all(getPagination(query));

    return success(cycles);

}

async function getCycle(repos, id) {

    const cycle = await repos.cycles.find(id);

    if (!cycle) return notFound(`/api/cycles/${id}`);

    return success(cycle);

}

async function createCycle(repos, request) {

    const body = await getBody(request);

    const input = pickCycleInput(body);

    if (input.errors.length > 0) {
        return error("Invalid cycle.", 400, { errors: input.errors });
    }

    const partyError = await checkParty(repos, input.data.partyId);

    if (partyError) return partyError;

    const cycle = Object.assign(new Cycle(), input.data);

    return success(await repos.cycles.insert(cycle), "Created");

}

async function updateCycle(repos, id, request) {

    const body = await getBody(request);

    const input = pickCycleInput(body);

    if (input.errors.length > 0) {
        return error("Invalid cycle.", 400, { errors: input.errors });
    }

    const partyError = await checkParty(repos, input.data.partyId);

    if (partyError) return partyError;

    const cycle = await repos.cycles.update(id, input.data);

    if (!cycle) return notFound(`/api/cycles/${id}`);

    return success(cycle, "Updated");

}

async function deleteCycle(repos, id) {

    const removed = await repos.cycles.remove(id);

    if (!removed) return notFound(`/api/cycles/${id}`);

    return success({ id }, "Deleted");

}

/**
 * 없는 파티를 참조하면 FK 위반으로 500이 나므로 미리 400으로 막는다.
 */
async function checkParty(repos, partyId) {

    if (!partyId) return null;

    const exists = await repos.parties.exists(partyId);

    if (exists) return null;

    return error("Referenced party does not exist.", 400, { partyId });

}

function pickCycleInput(body) {

    const data = {};
    const errors = [];

    if (Object.hasOwn(body, "name")) {

        if (typeof body.name !== "string" || body.name.trim() === "") {
            errors.push("name must be a non-empty string.");
        } else {
            data.name = body.name.trim();
        }

    }

    if (Object.hasOwn(body, "partyId")) {

        if (body.partyId !== null && typeof body.partyId !== "string") {
            errors.push("partyId must be a string or null.");
        } else {
            data.partyId = body.partyId;
        }

    }

    if (Object.hasOwn(body, "actions")) {

        if (!Array.isArray(body.actions)) {
            errors.push("actions must be an array.");
        } else {
            const actions = pickActions(body.actions, errors);

            if (actions) data.actions = actions;
        }

    }

    if (Object.hasOwn(body, "repeat")) {

        if (!Number.isInteger(body.repeat) || body.repeat < 1 || body.repeat > 100) {
            errors.push("repeat must be an integer between 1 and 100.");
        } else {
            data.repeat = body.repeat;
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

function pickActions(source, errors) {

    const actions = [];

    source.forEach((action, index) => {

        if (typeof action !== "object" || action === null) {
            errors.push(`actions[${index}] must be an object.`);
            return;
        }

        if (typeof action.actor !== "string" || action.actor === "") {
            errors.push(`actions[${index}].actor must be a build id string.`);
            return;
        }

        if (typeof action.actionId !== "string" || action.actionId === "") {
            errors.push(`actions[${index}].actionId must be a non-empty string.`);
            return;
        }

        actions.push({
            actor: action.actor,
            actionId: action.actionId,
            target: action.target ?? null,
            targetIndex: action.targetIndex ?? 0
        });

    });

    return errors.length > 0 ? null : actions;

}
