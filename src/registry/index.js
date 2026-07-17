import { CharacterRegistry } from "./CharacterRegistry.js";
import { LightConeRegistry } from "./LightConeRegistry.js";
import { RelicSetRegistry } from "./RelicSetRegistry.js";

export { CharacterRegistry, LightConeRegistry, RelicSetRegistry };

export const characterRegistry = new CharacterRegistry();

export const lightConeRegistry = new LightConeRegistry();

export const relicSetRegistry = new RelicSetRegistry();
