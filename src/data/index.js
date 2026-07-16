import firefly from "./characters/firefly.json";
import lightConeData from "./lightCones.json";

import { GameDataLoader } from "./GameDataLoader.js";
import { lightConeRegistry } from "../registry/index.js";

export { GameDataLoader } from "./GameDataLoader.js";
export { CharacterLoader } from "./CharacterLoader.js";

const CHARACTER_DATA = [
    firefly
];

/**
 * 캐릭터/광추 데이터는 정적이므로 isolate 시작 시 한 번 등록한다.
 * 이 모듈을 import하면 레지스트리가 채워진 상태가 보장된다.
 */
const loader = new GameDataLoader();

loader.loadCharacters(CHARACTER_DATA);

lightConeRegistry.registerAll(lightConeData.lightCones);
