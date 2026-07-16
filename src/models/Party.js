export class Party {

    constructor() {

        this.id = crypto.randomUUID();

        this.name = "New Party";

        /**
         * Build ID 4개를 저장
         * Character가 아니라 Build를 참조한다.
         */
        this.slots = [
            null,
            null,
            null,
            null
        ];

        /**
         * 파티 메모
         */
        this.memo = "";

        /**
         * 시뮬레이션 기본 설정
         */
        this.settings = {

            enemyLevel: 95,

            enemyCount: 1,

            battleType: "single",

            moc: false,

            apocalypticShadow: false,

            pureFiction: false

        };

        this.createdAt = Date.now();

        this.updatedAt = Date.now();

    }

}