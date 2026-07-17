/**
 * 유물 세트 조회.
 *
 * CharacterRepository / LightConeRepository와 같은 이유로
 * BaseRepository를 상속하지 않는다. 시드로만 채워지는 읽기 전용 데이터다.
 */
export class RelicSetRepository {

    constructor(db) {

        if (!db) {
            throw new Error("D1 binding(env.DB) is required.");
        }

        this.db = db;

    }

    toJson(row) {

        if (!row) return null;

        let effects;

        try {
            effects = JSON.parse(row.effects);
        } catch {
            throw new Error(
                `Corrupted JSON in relic_sets.effects (id=${row.id})`
            );
        }

        return {
            id: row.id,
            slug: row.slug,
            name: row.name,
            type: row.type,
            effects
        };

    }

    /**
     * 전체 세트. 유물 => 행성구 순으로, 그 안에서는 ID 순으로 준다.
     */
    async all() {

        const { results } = await this.db
            .prepare(
                `SELECT * FROM relic_sets
                 ORDER BY type ASC, CAST(id AS INTEGER) ASC`
            )
            .all();

        return results.map(row => this.toJson(row));

    }

    async count() {

        const row = await this.db
            .prepare(`SELECT COUNT(*) AS n FROM relic_sets`)
            .first();

        return row.n;

    }

}
