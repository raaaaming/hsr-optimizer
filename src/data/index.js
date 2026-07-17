import { GameDataLoader } from "./GameDataLoader.js";
import { lightConeRegistry, relicSetRegistry } from "../registry/index.js";
import { CharacterRepository } from "../repositories/CharacterRepository.js";
import { LightConeRepository } from "../repositories/LightConeRepository.js";
import { RelicSetRepository } from "../repositories/RelicSetRepository.js";

export { GameDataLoader } from "./GameDataLoader.js";
export { CharacterLoader } from "./CharacterLoader.js";

/**
 * 캐릭터/광추는 D1에서 온다. D1 바인딩은 요청 시점의 env에만 있으므로
 * 모듈 로드 시점에 레지스트리를 채울 수 없다. 대신 isolate당 한 번만 읽는다.
 *
 * 게임 데이터는 시드로만 바뀌는 정적 데이터라 isolate 수명 동안 캐시해도
 * 안전하다. 시드를 다시 넣으면 isolate가 재활용되는 시점에 반영된다.
 */
let loading = null;

export function ensureGameData(env) {

    // 실패한 promise를 캐시하면 그 isolate는 영구히 빈 레지스트리로 남는다.
    loading ??= load(env).catch(error => {
        loading = null;
        throw error;
    });

    return loading;

}

async function load(env) {

    const [characters, lightCones, relicSets] = await Promise.all([
        new CharacterRepository(env.DB).all(),
        new LightConeRepository(env.DB).all(),
        new RelicSetRepository(env.DB).all()
    ]);

    if (
        characters.length === 0 ||
        lightCones.length === 0 ||
        relicSets.length === 0
    ) {
        throw new Error(
            "게임 데이터 테이블이 비어 있다. " +
            "'npm run data:sync' 후 'npm run data:seed'를 실행해라."
        );
    }

    new GameDataLoader().loadCharacters(characters);

    lightConeRegistry.registerAll(lightCones);

    relicSetRegistry.registerAll(relicSets);

}
