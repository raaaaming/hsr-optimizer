import * as BuildsAPI from "./api/builds.js";
import * as PartiesAPI from "./api/parties.js";
import * as CyclesAPI from "./api/cycles.js";
import * as SimulateAPI from "./api/simulate.js";
import * as MetaAPI from "./api/meta.js";
import * as StatsAPI from "./api/stats.js";

import { createRepositories } from "./repositories/index.js";
import { notFound, error, preflight } from "./util/response.js";
import { getQuery } from "./util/http.js";

/**
 * /api/{resource} 및 /api/{resource}/{id} 를 처리한다.
 */
const routes = {
    builds: BuildsAPI.handler,
    parties: PartiesAPI.handler,
    cycles: CyclesAPI.handler,
    simulate: SimulateAPI.handler,
    meta: MetaAPI.handler,
    stats: StatsAPI.handler
};

export async function router(request, env, ctx) {

    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
        return preflight();
    }

    const segments = url.pathname.split("/").filter(Boolean);

    const [prefix, resource, id] = segments;

    if (prefix !== "api" || !resource) {
        return notFound(url.pathname);
    }

    const handler = routes[resource];

    if (!handler) {
        return notFound(url.pathname);
    }

    if (!env.DB) {
        return error(
            "D1 binding 'DB' is not configured.",
            500
        );
    }

    return handler(request, {
        env,
        ctx,
        repos: createRepositories(env.DB),
        id: id ?? null,
        query: getQuery(request)
    });

}
