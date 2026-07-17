/**
 * 광추 조회.
 *
 * CharacterRepository와 같은 이유로 BaseRepository를 상속하지 않는다.
 * 시드로만 채워지는 읽기 전용 생성 데이터다.
 */
export class LightConeRepository {

    constructor(db) {

        if (!db) {
            throw new Error("D1 binding(env.DB) is required.");
        }

        this.db = db;

    }

    toJson(row) {

        if (!row) return null;

        const parse = (value, column) => {

            try {
                return JSON.parse(value);
            } catch {
                throw new Error(
                    `Corrupted JSON in light_cones.${column} (id=${row.id})`
                );
            }

        };

        return {
            // 레지스트리 키는 Yatta 숫자 ID다. build.lightCone.id가 이걸 참조한다.
            id: row.id,
            slug: row.slug,
            name: row.name,
            path: row.path,
            rarity: row.rarity,
            stats: parse(row.stats, "stats"),
            passive: parse(row.passive, "passive")
        };

    }

    /**
     * 전체 광추. 높은 성급부터, 같은 성급이면 이름순으로 준다.
     */
    async all() {

        const { results } = await this.db
            .prepare(
                `SELECT * FROM light_cones
                 ORDER BY rarity DESC, name ASC`
            )
            .all();

        return results.map(row => this.toJson(row));

    }

    async count() {

        const row = await this.db
            .prepare(`SELECT COUNT(*) AS n FROM light_cones`)
            .first();

        return row.n;

    }

}
