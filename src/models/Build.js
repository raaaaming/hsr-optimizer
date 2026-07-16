export class Build {

    constructor(){

        this.id = crypto.randomUUID();

        this.name = "New Build";

        this.character = "";

        this.element = "";

        this.path = "";

        /**
         * 레벨 / 돌파
         */
        this.level = 80;

        this.ascension = 6;

        this.eidolon = 0;

        /**
         * 스킬 레벨
         * key : basic / skill / ultimate / talent
         */
        this.skills = {

            basic: 6,

            skill: 10,

            ultimate: 10,

            talent: 10

        };

        /**
         * 행적
         *
         * major : 큰 행적(A2/A4/A6) 개방 여부
         * minor : 개방한 작은 행적 노드 id 목록
         */
        this.traces = {

            major: {

                a2: true,

                a4: true,

                a6: true

            },

            minor: []

        };

        this.lightCone = {

            id: null,

            level: 80,

            ascension: 6,

            superimposition: 1

        };

        /**
         * 유물 6부위
         * { slot, set, level, mainStat, substats:[{ key, value }] }
         */
        this.relics = [];

        /**
         * 사용자가 직접 덮어쓰는 스탯(선택)
         */
        this.stats = {};

        this.memo = "";

        this.createdAt = Date.now();

        this.updatedAt = Date.now();

    }

}
