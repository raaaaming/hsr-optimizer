import { characterRegistry } from "../registry/index.js";
import { formulaRegistry } from "../formula/index.js";
import { statsCalculator } from "../services/StatsCalculator.js";

export class DamageEngine {

    calculate(context, action) {

        const build = context.party.find(

            b => b.id === action.actor

        );

        if (!build) {

            throw new Error("Build not found.");

        }

        const character = characterRegistry.get(

            build.character

        );

        if (!character) {

            throw new Error("Character not found.");

        }

        // 공식은 최종 스탯만 필요하다. base/bonus 분해는 UI 표시용이다.
        const { final: stats } = statsCalculator.calculate(

            character,

            build
        );

        const definition = character.getAction(

            action.actionId

        );

        if (!definition) {

            throw new Error("Action not found.");

        }

        const formula = formulaRegistry.get(

            definition.formula

        );

        if (!formula) {

            throw new Error(

                `Formula not found : ${definition.formula}`

            );

        }

        return formula({

            context,

            stats,

            character,

            build,

            definition,

            action

        });

    }

}