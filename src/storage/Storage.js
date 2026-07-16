export class Storage {

    constructor() {
        this.collections = new Map();
    }

    /**
     * Collection(Map) 반환
     */
    collection(name) {

        if (!this.collections.has(name)) {
            this.collections.set(name, new Map());
        }

        return this.collections.get(name);

    }

    /**
     * Collection 삭제
     */
    clear(name) {

        if (name) {
            this.collection(name).clear();
            return;
        }

        this.collections.clear();

    }

}