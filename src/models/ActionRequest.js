export class ActionRequest {

    constructor() {

        /**
         * Build ID
         */
        this.actor = "";

        /**
         * Character Action ID
         */
        this.actionId = "";

        /**
         * 대상
         */
        this.target = [];

        /**
         * 실행 이유
         */
        this.reason = "normal";

        /**
         * 우선순위
         */
        this.priority = 0;

        /**
         * 실행 옵션
         */
        this.options = {};

    }

}