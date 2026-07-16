import { Character } from "../models/Character.js";
import { ActionDefinition } from "../models/ActionDefinition.js";

export class CharacterLoader {

    /**
     * JSON 하나를 Character 객체로 변환
     */
    load(json) {

        const character = new Character();

        character.id = json.id;
        character.name = json.name;
        character.element = json.element;
        character.path = json.path;
        character.rarity = json.rarity;

        // 덮어쓰지 않고 병합한다. JSON에 taunt처럼 빠진 값이 있어도
        // Character의 기본값이 유지되어야 한다.
        Object.assign(character.stats, json.stats);

        character.majorTraces = json.majorTraces ?? [];
        character.minorTraces = json.minorTraces ?? [];
        character.eidolons = json.eidolons ?? [];
        character.tags = json.tags ?? [];

        for (const actionJson of json.actions ?? []) {

            const action = new ActionDefinition();

            action.id = actionJson.id;
            action.name = actionJson.name;
            action.formula = actionJson.formula;

            action.tags = actionJson.tags ?? [];
            action.sp = actionJson.sp ?? 0;
            action.energy = actionJson.energy ?? 0;
            action.hitCount = actionJson.hitCount ?? 1;
            action.damage = actionJson.damage ?? true;
            action.effects = actionJson.effects ?? [];
            action.events = actionJson.events ?? [];

            character.registerAction(action);

        }

        return character;

    }

}
