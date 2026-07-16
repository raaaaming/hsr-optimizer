import { DamageEngine } from "./DamageEngine.js";

export class BattleEngine {

    constructor(context) {

        this.context = context;

        this.damageEngine = new DamageEngine();

    }

    execute(action) {

        // 1. 행동 시작
        this.beforeAction(action);

        // 2. 행동 실행
        const result = this.executeAction(action);

        // 3. 행동 종료
        this.afterAction(action, result);

        return result;

    }

    beforeAction(action) {

        // TODO
        // Buff
        // Debuff
        // Trigger

    }

    executeAction(action) {

        return this.damageEngine.calculate(

            this.context,

            action

        );

    }

    afterAction(action, result) {

        // TODO
        // SP
        // Energy
        // Follow-up
        // Talent

    }

}