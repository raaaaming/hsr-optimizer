-- 게임 원본 캐릭터 데이터.
--
-- builds/parties/cycles가 유저 데이터인 것과 달리 이 테이블은 전적으로
-- 생성물이다. 사람이 직접 INSERT하지 않는다.
-- scripts/sync-gamedata.js가 Yatta(sr.yatta.moe)에서 받아
-- src/data/generated/characters.sql을 만들고, 그걸 적용해서 채운다.
--
-- 기존 테이블과 같은 하이브리드 규칙을 따른다.
-- 조회/필터 대상이 되는 스칼라 값은 실제 컬럼으로,
-- 중첩 구조(stats / actions / traces / eidolons)는 JSON 문자열 컬럼으로.

CREATE TABLE characters (
    id           TEXT    PRIMARY KEY,
    -- Yatta 내부 ID(예: "1310"). 로케일과 무관하게 안정적이라 PK로 쓴다.

    slug         TEXT    NOT NULL DEFAULT '',
    -- 사람이 읽는 식별자(예: "firefly"). 공식(formula) 조회 키다.

    name         TEXT    NOT NULL DEFAULT '',
    element      TEXT    NOT NULL DEFAULT '',
    path         TEXT    NOT NULL DEFAULT '',
    rarity       INTEGER NOT NULL DEFAULT 5,

    -- 미출시 캐릭터. 베타 수치는 출시 전에 바뀌므로 UI에서 구분해야 한다.
    is_beta      INTEGER NOT NULL DEFAULT 0,
    released_at  INTEGER NOT NULL DEFAULT 0,

    stats        TEXT    NOT NULL DEFAULT '{}',
    actions      TEXT    NOT NULL DEFAULT '[]',
    major_traces TEXT    NOT NULL DEFAULT '[]',
    minor_traces TEXT    NOT NULL DEFAULT '[]',
    eidolons     TEXT    NOT NULL DEFAULT '[]',
    tags         TEXT    NOT NULL DEFAULT '[]',

    -- 시드를 만든 시점. 데이터가 얼마나 묵었는지 판단하는 용도다.
    synced_at    INTEGER NOT NULL DEFAULT 0
);

CREATE UNIQUE INDEX idx_characters_slug    ON characters(slug);
CREATE INDEX        idx_characters_element ON characters(element);
CREATE INDEX        idx_characters_path    ON characters(path);
CREATE INDEX        idx_characters_is_beta ON characters(is_beta);
