import { Build } from "../models/Build.js";
import { characterRegistry } from "../registry/index.js";
import { statsCalculator } from "../services/StatsCalculator.js";
import { getBody } from "../util/http.js";
import { success, error, methodNotAllowed } from "../util/response.js";

/**
 * 저장하지 않고 최종 스펙만 계산한다.
 * 편집 중 실시간 미리보기에 쓴다.
 *
 * body: Build 형태(부분 가능) 또는 { buildId }
 */
export async function handler(request, { repos }) {

    if (request.method !== "POST") {
        return methodNotAllowed(request.method);
    }

    const body = await getBody(request);

    const build = body.buildId
        ? await repos.builds.find(body.buildId)
        : Object.assign(new Build(), body);

    if (!build) {
        return error("Build not found.", 404, { buildId: body.buildId });
    }

    const character = characterRegistry.get(build.character);

    if (!character) {
        return error("Character not found.", 400, { character: build.character });
    }

    const result = statsCalculator.calculate(character, build);

    return success({
        character: {
            id: character.id,
            name: character.name,
            element: character.element,
            path: character.path,
            rarity: character.rarity
        },
        level: build.level,
        ascension: build.ascension,
        eidolon: build.eidolon,
        ...result
    });

}
