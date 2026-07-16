export class Enemy {

    constructor() {

        this.id = crypto.randomUUID();

        this.name = "";

        this.level = 95;

        /**
         * 기본 방어력
         */
        this.defense = 0;

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

}