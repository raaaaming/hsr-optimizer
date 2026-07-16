import { BuildRepository } from "./BuildRepository.js";
import { PartyRepository } from "./PartyRepository.js";
import { CycleRepository } from "./CycleRepository.js";

export { BaseRepository } from "./BaseRepository.js";
export { BuildRepository, PartyRepository, CycleRepository };

/**
 * 요청 단위 Repository 묶음.
 *
 * D1 바인딩은 env에서만 얻을 수 있으므로
 * 모듈 로드 시점이 아니라 요청마다 생성한다.
 */
export function createRepositories(db) {

    return {
        builds: new BuildRepository(db),
        parties: new PartyRepository(db),
        cycles: new CycleRepository(db)
    };

}
