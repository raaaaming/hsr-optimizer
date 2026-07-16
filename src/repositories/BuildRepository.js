import { BaseRepository } from "../repositories/BaseRepository.js";
import { storage } from "../storage/index.js";

export class BuildRepository extends BaseRepository {

    constructor() {
        super(storage, "builds");
    }

}

export const buildRepository = new BuildRepository();