export class Character {

    constructor() {

        this.id = "";
        this.name = "";
        this.element = "";
        this.path = "";
        this.rarity = 5;

        /**
         * Yatta 내부 ID(예: "1310"). id는 slug라 재동기화 때 대조용으로 쓴다.
         */
        this.yattaId = null;

        /**
         * 미출시 캐릭터. 베타 수치는 출시 전에 바뀌므로 UI에서 구분해야 한다.
         */
        this.isBeta = false;

        this.releasedAt = 0;

        /**
         * 레벨/돌파에 따라 계산되는 기본 스탯 정의
         */
        this.stats = {
            base: { hp: 0, atk: 0, def: 0 },
            growth: { hp: 0, atk: 0, def: 0 },
            ascensionAdd: [],
            spd: 100,
            taunt: 100
        };

        /**
         * key : actionId, value : ActionDefinition
         */
        this.actions = new Map();

        /**
         * 큰 행적 [{ id, name, unlockAscension }]
         */
        this.majorTraces = [];

        /**
         * 작은 행적 [{ id, stat, value, unlockAscension }]
         */
        this.minorTraces = [];

        this.eidolons = [];

        this.tags = [];

    }

    registerAction(actionDefinition) {
        this.actions.set(actionDefinition.id, actionDefinition);
    }

    getAction(actionId) {
        return this.actions.get(actionId) ?? null;
    }

    /**
     * 레벨 + 돌파 => 기본 HP/ATK/DEF/SPD
     *
     * value = base + growth * (level - 1) + ascensionAdd[ascension]
     */
    baseStatsAt(level, ascension) {

        const add = this.stats.ascensionAdd[ascension]
            ?? this.stats.ascensionAdd.at(-1)
            ?? { hp: 0, atk: 0, def: 0 };

        const scale = key =>
            this.stats.base[key]
            + this.stats.growth[key] * (level - 1)
            + add[key];

        return {
            hp: scale("hp"),
            atk: scale("atk"),
            def: scale("def"),
            spd: this.stats.spd,
            taunt: this.stats.taunt
        };

    }

    /**
     * 해당 돌파에서 개방 가능한 작은 행적
     */
    availableMinorTraces(ascension) {
        return this.minorTraces.filter(
            trace => trace.unlockAscension <= ascension
        );
    }

    availableMajorTraces(ascension) {
        return this.majorTraces.filter(
            trace => trace.unlockAscension <= ascension
        );
    }

}
