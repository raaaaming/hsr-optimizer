import { CharacterLoader } from "./loader/CharacterLoader.js";
import { characterRegistry } from "../registry/index.js";

export class GameDataLoader {

    constructor() {

        this.characterLoader = new CharacterLoader();

    }

    loadCharacters(list) {

        for (const json of list) {

            const character = this.characterLoader.load(json);

            characterRegistry.register(character);

        }

    }

}