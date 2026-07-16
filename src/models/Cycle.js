export class Cycle {

    constructor() {

        this.id = crypto.randomUUID();

        this.name = "New Cycle";

        /**
         * 어떤 파티를 사용할지
         */
        this.partyId = null;

        /**
         * 실행할 Action 목록
         */
        this.actions = [];

        /**
         * 반복 횟수
         */
        this.repeat = 1;

        /**
         * 설명
         */
        this.memo = "";

        this.createdAt = Date.now();

        this.updatedAt = Date.now();

    }

}