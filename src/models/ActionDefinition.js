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

        // ===== Yatta 시드에서 오는 원본 데이터 =====

        /**
         * 자리표시자 번호 => 레벨별 값 배열.
         * 예: { "1": [0.5, 0.6, ... 1.4] } 이면 desc의 #1이 스킬 레벨에 따라 이 값을 갖는다.
         *
         * 손으로 쓴 공식이 배율을 하드코딩하는 대신 여기서 읽어 쓰라고 둔다.
         */
        this.params = null;

        /**
         * 게임 내 스킬 설명. #n[i] 자리표시자가 params[n]에 대응한다.
         */
        this.desc = "";

        /**
         * 스킬 최대 레벨 (일반 공격 6, 나머지 10 등). 1이면 레벨이 없다(비술).
         */
        this.maxLevel = 1;

        /**
         * 레벨을 공유하는 액션들의 대표 id.
         *
         * 레벨은 개별 스킬이 아니라 스킬 트리 노드에 붙는다. 강화 일반 공격은
         * 별도 액션이지만 일반 공격과 같은 노드라 레벨이 같다.
         * build.skills는 이 키로 저장한다.
         */
        this.levelKey = "";

        /**
         * Yatta 원본 스킬 ID. 재동기화 때 대조용이다.
         */
        this.skillId = null;

    }

}