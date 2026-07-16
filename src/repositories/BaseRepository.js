/**
 * D1 기반 Repository 베이스.
 *
 * D1 바인딩은 요청 시점의 env에만 존재하므로
 * Repository는 모듈 스코프 싱글턴이 될 수 없다.
 * 반드시 요청마다 env.DB로 생성해야 한다.
 *
 * 서브클래스는 table / model / fields 를 선언한다.
 * fields[].json 이 true면 컬럼에는 JSON 문자열로 저장되고,
 * 모델에는 파싱된 값으로 복원된다.
 */
export class BaseRepository {

    constructor(db) {

        if (!db) {
            throw new Error("D1 binding(env.DB) is required.");
        }

        this.db = db;

    }

    /** 테이블 이름 */
    get table() {
        throw new Error(`${this.constructor.name} must define 'table'.`);
    }

    /** 행을 복원할 모델 클래스 */
    get model() {
        throw new Error(`${this.constructor.name} must define 'model'.`);
    }

    /** [{ prop, column, json }] */
    get fields() {
        throw new Error(`${this.constructor.name} must define 'fields'.`);
    }

    /**
     * update()로 덮어쓸 수 없는 속성.
     * id는 PK, createdAt은 생성 시점 기록이므로 불변으로 둔다.
     */
    get immutableProps() {
        return ["id", "createdAt"];
    }

    // ===== 매핑 =====

    /**
     * D1 row => 모델 인스턴스
     */
    toModel(row) {

        if (!row) return null;

        const model = new this.model();

        for (const field of this.fields) {

            const value = row[field.column];

            model[field.prop] = field.json
                ? this.decode(value, field)
                : value;

        }

        return model;

    }

    decode(value, field) {

        if (value === null || value === undefined) return null;

        try {
            return JSON.parse(value);
        } catch {
            throw new Error(
                `Corrupted JSON in ${this.table}.${field.column}`
            );
        }

    }

    /**
     * 모델 값 => D1 bind 가능한 값.
     * D1은 undefined를 bind할 수 없으므로 null로 정규화한다.
     */
    encode(value, field) {

        if (field.json) {
            return JSON.stringify(value ?? null);
        }

        return value ?? null;

    }

    // ===== 조회 =====

    /**
     * 최근 수정순 목록
     */
    async all({ limit = 100, offset = 0 } = {}) {

        const { results } = await this.db
            .prepare(
                `SELECT * FROM ${this.table}
                 ORDER BY updated_at DESC
                 LIMIT ?1 OFFSET ?2`
            )
            .bind(limit, offset)
            .all();

        return results.map(row => this.toModel(row));

    }

    async find(id) {

        const row = await this.db
            .prepare(`SELECT * FROM ${this.table} WHERE id = ?1`)
            .bind(id)
            .first();

        return this.toModel(row);

    }

    async exists(id) {

        const row = await this.db
            .prepare(`SELECT 1 FROM ${this.table} WHERE id = ?1`)
            .bind(id)
            .first();

        return row !== null;

    }

    async count() {

        const row = await this.db
            .prepare(`SELECT COUNT(*) AS n FROM ${this.table}`)
            .first();

        return row.n;

    }

    // ===== 변경 =====

    async insert(model) {

        const columns = this.fields.map(f => f.column);

        const placeholders = this.fields.map((_, i) => `?${i + 1}`);

        const values = this.fields.map(
            f => this.encode(model[f.prop], f)
        );

        const row = await this.db
            .prepare(
                `INSERT INTO ${this.table} (${columns.join(", ")})
                 VALUES (${placeholders.join(", ")})
                 RETURNING *`
            )
            .bind(...values)
            .first();

        return this.toModel(row);

    }

    /**
     * 부분 업데이트.
     * data에 있는 알려진 속성만 반영하고 updatedAt을 갱신한다.
     */
    async update(id, data) {

        const targets = this.fields.filter(
            f =>
                Object.hasOwn(data, f.prop) &&
                !this.immutableProps.includes(f.prop) &&
                f.prop !== "updatedAt"
        );

        // 반영할 값이 없으면 불필요한 쓰기를 하지 않는다.
        if (targets.length === 0) {
            return this.find(id);
        }

        const assignments = targets.map(
            (f, i) => `${f.column} = ?${i + 1}`
        );

        const values = targets.map(
            f => this.encode(data[f.prop], f)
        );

        // updatedAt, id를 뒤에 이어 붙인다.
        const updatedAtIndex = targets.length + 1;
        const idIndex = targets.length + 2;

        assignments.push(`updated_at = ?${updatedAtIndex}`);

        const row = await this.db
            .prepare(
                `UPDATE ${this.table}
                 SET ${assignments.join(", ")}
                 WHERE id = ?${idIndex}
                 RETURNING *`
            )
            .bind(...values, Date.now(), id)
            .first();

        return this.toModel(row);

    }

    /**
     * 삭제 성공 여부
     */
    async remove(id) {

        const result = await this.db
            .prepare(`DELETE FROM ${this.table} WHERE id = ?1`)
            .bind(id)
            .run();

        return result.meta.changes > 0;

    }

    async clear() {

        await this.db
            .prepare(`DELETE FROM ${this.table}`)
            .run();

    }

}
