export class StatsCalculator {

    /**
     * Character + Build => Final Stats
     */
    calculate(character, build) {

        const stats = structuredClone(character.baseStats);

        this.applyLightCone(stats, build);

        this.applyRelics(stats, build);

        this.applyRelicSets(stats, build);

        this.applyTraces(stats, character);

        this.applyEidolons(stats, character);

        return stats;

    }

    applyLightCone(stats, build) {

        // TODO

    }

    applyRelics(stats, build) {

        // TODO

    }

    applyRelicSets(stats, build) {

        // TODO

    }

    applyTraces(stats, character) {

        // TODO

    }

    applyEidolons(stats, character) {

        // TODO

    }

}