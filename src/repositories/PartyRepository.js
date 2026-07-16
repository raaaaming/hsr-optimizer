import { BaseRepository } from "./BaseRepository.js";
import { Party } from "../models/Party.js";

export class PartyRepository extends BaseRepository {

    get table() {
        return "parties";
    }

    get model() {
        return Party;
    }

    get fields() {
        return [
            { prop: "id",        column: "id" },
            { prop: "name",      column: "name" },
            { prop: "slots",     column: "slots",    json: true },
            { prop: "memo",      column: "memo" },
            { prop: "settings",  column: "settings", json: true },
            { prop: "createdAt", column: "created_at" },
            { prop: "updatedAt", column: "updated_at" }
        ];
    }

}
