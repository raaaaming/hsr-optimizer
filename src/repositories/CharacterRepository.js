/**
 * 캐릭터 조회.
 *
 * BaseRepository를 상속하지 않는다. 그쪽은 유저가 만드는 데이터의
 * CRUD(updated_at 기준 정렬, 부분 update, insert)를 전제하는데,
 * characters는 시드로만 채워지는 읽기 전용 생성 데이터고
 * updated_at도 없다. 상속해봐야 쓸 수 있는 게 find/exists뿐이다.
 */
export class CharacterRepository {

    constructor(db) {

        if (!db) {
            throw new Error("D1 binding(env.DB) is required.");
        }

        this.db = db;

    }

    /**
     * CharacterLoader가 먹는 JSON 형태로 되돌린다.
     *
     * 레지스트리 키는 숫자 ID가 아니라 slug다. builds.character가
     * "firefly"를 참조하고 공식 ID도 "firefly.basic"이라 slug가 곧 정체성이다.
     * 숫자 ID는 Yatta 재동기화 때 행을 맞추는 용도로만 남긴다.
     */
    toJson(row) {

        if (!row) return null;

        const parse = (value, fallback) => {

            try {
                return JSON.parse(value);
            } catch {
                throw new Error(
                    `Corrupted JSON in characters.${fallback} (id=${row.id})`
                );
            }

        };

        return {
            id: row.slug,
            yattaId: row.id,
            name: row.name,
            element: row.element,
            path: row.path,
            rarity: row.rarity,

            isBeta: row.is_beta === 1,
            releasedAt: row.released_at,

            stats: parse(row.stats, "stats"),
            actions: parse(row.actions, "actions"),
            majorTraces: parse(row.major_traces, "major_traces"),
            minorTraces: parse(row.minor_traces, "minor_traces"),
            eidolons: parse(row.eidolons, "eidolons"),
            tags: parse(row.tags, "tags")
        };

    }

    /**
     * 전체 캐릭터.
     * 출시 순으로 준다. UI에서 최신 캐릭터를 위로 올리기 쉽다.
     */
    async all({ includeBeta = true } = {}) {

        const where = includeBeta ? "" : "WHERE is_beta = 0";

        const { results } = await this.db
            .prepare(
                `SELECT * FROM characters
                 ${where}
                 ORDER BY released_at DESC, id DESC`
            )
            .all();

        return results.map(row => this.toJson(row));

    }

    async findBySlug(slug) {

        const row = await this.db
            .prepare(`SELECT * FROM characters WHERE slug = ?1`)
            .bind(slug)
            .first();

        return this.toJson(row);

    }

    async count() {

        const row = await this.db
            .prepare(`SELECT COUNT(*) AS n FROM characters`)
            .first();

        return row.n;

    }

    /**
     * 시드가 언제 만들어졌는지. 데이터가 묵었는지 판단하는 용도다.
     */
    async syncedAt() {

        const row = await this.db
            .prepare(`SELECT MAX(synced_at) AS at FROM characters`)
            .first();

        return row?.at ?? 0;

    }

}
