import { BaseRepository } from "./BaseRepository.js";
import { Build } from "../models/Build.js";

export class BuildRepository extends BaseRepository {

    get table() {
        return "builds";
    }

    get model() {
        return Build;
    }

    get fields() {
        return [
            { prop: "id",        column: "id" },
            { prop: "name",      column: "name" },
            { prop: "character", column: "character" },
            { prop: "element",   column: "element" },
            { prop: "path",      column: "path" },
            { prop: "level",     column: "level" },
            { prop: "ascension", column: "ascension" },
            { prop: "eidolon",   column: "eidolon" },
            { prop: "skills",    column: "skills",     json: true },
            { prop: "traces",    column: "traces",     json: true },
            { prop: "lightCone", column: "light_cone", json: true },
            { prop: "relics",    column: "relics",     json: true },
            { prop: "stats",     column: "stats",      json: true },
            { prop: "memo",      column: "memo" },
            { prop: "createdAt", column: "created_at" },
            { prop: "updatedAt", column: "updated_at" }
        ];
    }

    /**
     * 특정 캐릭터의 빌드만 조회
     */
    async findByCharacter(characterId, { limit = 100, offset = 0 } = {}) {

        const { results } = await this.db
            .prepare(
                `SELECT * FROM builds
                 WHERE character = ?1
                 ORDER BY updated_at DESC
                 LIMIT ?2 OFFSET ?3`
            )
            .bind(characterId, limit, offset)
            .all();

        return results.map(row => this.toModel(row));

    }

    /**
     * 여러 ID를 한 번에 조회.
     * 파티 슬롯(Build ID 4개)을 채울 때 사용한다.
     */
    async findMany(ids) {

        if (ids.length === 0) return [];

        const placeholders = ids.map((_, i) => `?${i + 1}`);

        const { results } = await this.db
            .prepare(
                `SELECT * FROM builds
                 WHERE id IN (${placeholders.join(", ")})`
            )
            .bind(...ids)
            .all();

        return results.map(row => this.toModel(row));

    }

}
