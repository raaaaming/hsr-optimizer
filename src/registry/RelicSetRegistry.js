export class RelicSetRegistry {

    constructor() {

        this.sets = new Map();

    }

    /** 키는 slug다. build.relics[].set이 이 값을 참조한다. */
    register(set) {

        this.sets.set(set.slug, set);

    }

    registerAll(sets) {

        for (const set of sets) {
            this.register(set);
        }

    }

    get(slug) {

        return this.sets.get(slug) ?? null;

    }

    has(slug) {

        return this.sets.has(slug);

    }

    getAll() {

        return [...this.sets.values()];

    }

    /**
     * relic(4부위) / planar(2부위) 필터. 부위별 세트 선택 UI에서 쓴다.
     */
    getByType(type) {

        return this.getAll().filter(set => set.type === type);

    }

    clear() {

        this.sets.clear();

    }

}
