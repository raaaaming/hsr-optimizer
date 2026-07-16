export class StatModifier {

    constructor(stat, value, type = "flat") {

        this.stat = stat;

        this.value = value;

        /**
         * flat
         * percent
         * final
         */
        this.type = type;

    }

}