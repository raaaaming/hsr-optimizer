export class FormulaRegistry {

    constructor() {

        this.formulas = new Map();

    }

    register(id, formula) {

        this.formulas.set(id, formula);

    }

    get(id) {

        return this.formulas.get(id) ?? null;

    }

    has(id) {

        return this.formulas.has(id);

    }

}