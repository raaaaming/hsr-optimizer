import { BaseRepository } from "./BaseRepository.js";
import { Cycle } from "../models/Cycle.js";

export class CycleRepository extends BaseRepository {

    get table() {
        return "cycles";
    }

    get model() {
        return Cycle;
    }

    get fields() {
        return [
            { prop: "id",        column: "id" },
            { prop: "name",      column: "name" },
            { prop: "partyId",   column: "party_id" },
            { prop: "actions",   column: "actions", json: true },
            { prop: "repeat",    column: "repeat" },
            { prop: "memo",      column: "memo" },
            { prop: "createdAt", column: "created_at" },
            { prop: "updatedAt", column: "updated_at" }
        ];
    }

    async findByParty(partyId) {

        const { results } = await this.db
            .prepare(
                `SELECT * FROM cycles
                 WHERE party_id = ?1
                 ORDER BY updated_at DESC`
            )
            .bind(partyId)
            .all();

        return results.map(row => this.toModel(row));

    }

}
