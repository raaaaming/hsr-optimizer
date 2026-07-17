export class Enemy {

    constructor() {

        this.id = crypto.randomUUID();

        this.name = "";

        this.level = 95;

        /**
         * 방어력 직접 지정값. null이면 레벨에서 유도한다.
         * 대부분의 적은 공식대로라 보통 null로 둔다.
         */
        this.defense = null;

        /**
         * 속성 저항
         */
        this.resistance = {

            physical: 0.20,

            fire: 0.20,

            ice: 0.20,

            lightning: 0.20,

            wind: 0.20,

            quantum: 0.20,

            imaginary: 0.20

        };

        /**
         * 약점
         */
        this.weakness = [];

        /**
         * 강인도
         */
        this.toughness = 180;

        this.currentToughness = 180;

        this.tags = [];

    }

    /**
     * 적 방어력 = 200 + 10 x 레벨
     * defense를 직접 지정했으면 그 값을 쓴다.
     */
    baseDefense() {

        return this.defense ?? 200 + 10 * this.level;

    }

    /**
     * 해당 속성이 약점인지
     */
    isWeakTo(element) {

        return this.weakness.includes(element);

    }

}