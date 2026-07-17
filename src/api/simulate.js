import { BattleEngine } from "../engine/BattleEngine.js";
import { BattleContext } from "../engine/BattleContext.js";
import { Enemy } from "../models/Enemy.js";
import { getBody } from "../util/http.js";
import { error, success, methodNotAllowed } from "../util/response.js";

// 공식 레지스트리를 채우기 위한 import.
// 캐릭터 레지스트리는 D1에서 오므로 router가 ensureGameData()로 채운다.
import "../formula/index.js";

export async function handler(request, { repos }) {

    if (request.method !== "POST") {
        return methodNotAllowed(request.method);
    }

    const body = await getBody(request);

    const plan = await resolvePlan(repos, body);

    if (plan.error) return plan.error;

    const { party, builds, actions, repeat } = plan;

    const context = createContext(party, builds);

    const engine = new BattleEngine(context);

    try {

        for (let round = 0; round < repeat; round++) {

            for (const action of actions) {

                const result = engine.execute(action);

                context.totalDamage += result.damage * result.hitCount;

                context.damageLog.push({
                    round,
                    actor: action.actor,
                    actionId: action.actionId,
                    damage: result.damage,
                    hitCount: result.hitCount,
                    element: result.element
                });

            }

        }

    } catch (cause) {

        // 존재하지 않는 캐릭터/행동/공식 참조는 요청 데이터 문제다.
        return error(cause.message, 400);

    }

    return success({
        partyId: party.id,
        totalDamage: context.totalDamage,
        actionCount: context.damageLog.length,
        damageLog: context.damageLog
    });

}

/**
 * cycleId로 저장된 사이클을 돌리거나,
 * partyId + actions로 즉석 실행한다.
 */
async function resolvePlan(repos, body) {

    let partyId = body.partyId ?? null;
    let actions = body.actions ?? null;
    let repeat = body.repeat ?? 1;

    if (body.cycleId) {

        const cycle = await repos.cycles.find(body.cycleId);

        if (!cycle) {
            return { error: error("Cycle not found.", 404, { cycleId: body.cycleId }) };
        }

        partyId = cycle.partyId;
        actions = cycle.actions;
        repeat = cycle.repeat;

    }

    if (!partyId) {
        return { error: error("cycleId or partyId is required.", 400) };
    }

    if (!Array.isArray(actions) || actions.length === 0) {
        return { error: error("actions must be a non-empty array.", 400) };
    }

    if (!Number.isInteger(repeat) || repeat < 1 || repeat > 100) {
        return { error: error("repeat must be an integer between 1 and 100.", 400) };
    }

    const party = await repos.parties.find(partyId);

    if (!party) {
        return { error: error("Party not found.", 404, { partyId }) };
    }

    const buildIds = party.slots.filter(slot => slot !== null);

    if (buildIds.length === 0) {
        return { error: error("Party has no builds assigned.", 400) };
    }

    const builds = await repos.builds.findMany(buildIds);

    if (builds.length !== buildIds.length) {

        const found = new Set(builds.map(build => build.id));

        return {
            error: error("Party references missing builds.", 400, {
                missing: buildIds.filter(id => !found.has(id))
            })
        };

    }

    return { party, builds, actions, repeat };

}

function createContext(party, builds) {

    const context = new BattleContext();

    context.party = builds;

    context.enemies = Array.from(
        { length: party.settings.enemyCount },
        () => {
            const enemy = new Enemy();
            enemy.level = party.settings.enemyLevel;
            return enemy;
        }
    );

    return context;

}
