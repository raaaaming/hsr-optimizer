export class ActionDefinition {

    constructor() {

        /**
         * skill
         * ultimate
         * talent
         * dragonBreath
         * ahaSkill
         */
        this.id = "";

        this.name = "";

        /**
         * 데미지 계산 함수 이름
         */
        this.formula = "";

        /**
         * 태그
         */
        this.tags = [];

        /**
         * SP 변화
         */
        this.sp = 0;

        /**
         * 에너지 변화
         */
        this.energy = 0;

        /**
         * 타격 수
         */
        this.hitCount = 1;

        /**
         * 피해를 주는 행동인지
         */
        this.damage = true;

        /**
         * 실행 시 발생하는 효과
         */
        this.effects = [];

        /**
         * 실행 후 발생하는 이벤트
         */
        this.events = [];

    }

}