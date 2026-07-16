export class BattleState {

    constructor() {

        /**
         * 전투 ID
         */
        this.id = crypto.randomUUID();

        /**
         * 현재 Wave
         */
        this.wave = 1;

        /**
         * 현재 턴
         */
        this.turn = 1;

        /**
         * 현재 행동 횟수
         * (추가 행동도 포함)
         */
        this.actionCount = 0;

        /**
         * SP
         */
        this.skillPoint = {

            current: 3,

            max: 5

        };

        /**
         * 아군
         */
        this.party = null;

        /**
         * 적
         */
        this.enemies = [];

        /**
         * 버프
         */
        this.buffs = [];

        /**
         * 디버프
         */
        this.debuffs = [];

        /**
         * 소환수
         */
        this.summons = [];

        /**
         * 기억 정령
         */
        this.memosprites = [];

        /**
         * 행동 큐
         */
        this.actionQueue = [];

        /**
         * 이벤트 로그
         */
        this.logs = [];

    }

}