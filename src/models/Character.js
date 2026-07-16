export class Character {

    constructor() {

        /**
         * 기본 정보
         */
        this.id = "";
        this.name = "";
        this.element = "";
        this.path = "";
        this.rarity = 5;

        /**
         * 레벨 / 성혼
         * (빌드에서 덮어쓸 수 있음)
         */
        this.level = 80;
        this.eidolon = 0;

        /**
         * 기본 스탯
         */
        this.baseStats = {

            hp: 0,

            atk: 0,

            def: 0,

            spd: 100,

            taunt: 100

        };

        /**
         * 승급 스탯
         */
        this.ascensionStats = [];

        /**
         * 행동 정의
         *
         * key : actionId
         * value : ActionDefinition
         */
        this.actions = new Map();

        /**
         * 행적
         */
        this.traces = [];

        /**
         * 성혼
         */
        this.eidolons = [];

        /**
         * 태그
         */
        this.tags = [];

    }

    registerAction(actionDefinition) {

        this.actions.set(actionDefinition.id, actionDefinition);

    }

    getAction(actionId) {

        return this.actions.get(actionId) ?? null;

    }

}