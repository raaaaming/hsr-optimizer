export class BaseRepository {

    constructor(storage, collectionName) {

        this.collection = storage.collection(collectionName);

    }

    all() {
        return [...this.collection.values()];
    }

    find(id) {
        return this.collection.get(id) ?? null;
    }

    exists(id) {
        return this.collection.has(id);
    }

    insert(model) {

        this.collection.set(model.id, model);

        return model;

    }

    update(id, data) {

        const model = this.find(id);

        if (!model) return null;

        Object.assign(model, data);

        this.collection.set(id, model);

        return model;

    }

    remove(id) {

        return this.collection.delete(id);

    }

    clear() {

        this.collection.clear();

    }

}