export class LightConeRegistry {

    constructor() {
        this.lightCones = new Map();
    }

    register(lightCone) {
        this.lightCones.set(lightCone.id, lightCone);
    }

    registerAll(lightCones) {
        for (const lightCone of lightCones) {
            this.register(lightCone);
        }
    }

    get(id) {
        return this.lightCones.get(id) ?? null;
    }

    has(id) {
        return this.lightCones.has(id);
    }

    getAll() {
        return [...this.lightCones.values()];
    }

    /**
     * 운명별 필터. 광추 선택 UI에서 쓴다.
     */
    getByPath(path) {
        return this.getAll().filter(lc => lc.path === path);
    }

    clear() {
        this.lightCones.clear();
    }

}
