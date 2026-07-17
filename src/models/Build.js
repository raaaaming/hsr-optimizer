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
         *
         * { slot, set, level, mainStat, substats: [{ key, rolls }] }
         *
         * rolls는 굴림 등급(0=80% / 1=90% / 2=100%) 배열이다.
         * 값을 직접 저장하지 않는 이유는 실제 게임의 부옵션이 임의의 수가 아니라
         * 굴림의 합으로만 나오기 때문이다. 값은 substatValue()로 유도한다.
         */
        this.relics = [];

        /**
         * 사용자가 직접 덮어쓰는 스탯(선택)
         */
        this.stats = {};

        /**
         * 유효 부옵션 (1~5개).
         *
         * 캐릭터마다 다르고 게임처럼 추천해줄 데이터가 없어 사용자가 고른다.
         * 유효 부옵션 명중 통계가 이 목록만 집계한다.
         */
        this.effectiveStats = [];

        this.memo = "";

        this.createdAt = Date.now();

        this.updatedAt = Date.now();

    }

}
