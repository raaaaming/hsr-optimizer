-- 하이브리드 스키마
--
-- 조회/필터 대상이 되는 스칼라 값은 실제 컬럼으로,
-- 중첩 구조(lightCone / relics / stats / slots / settings / actions)는
-- JSON 문자열 컬럼으로 저장한다.

CREATE TABLE builds (
    id          TEXT    PRIMARY KEY,
    name        TEXT    NOT NULL DEFAULT 'New Build',
    character   TEXT    NOT NULL DEFAULT '',
    element     TEXT    NOT NULL DEFAULT '',
    path        TEXT    NOT NULL DEFAULT '',
    eidolon     INTEGER NOT NULL DEFAULT 0,
    light_cone  TEXT    NOT NULL DEFAULT '{"id":null,"superimposition":1}',
    relics      TEXT    NOT NULL DEFAULT '[]',
    stats       TEXT    NOT NULL DEFAULT '{}',
    memo        TEXT    NOT NULL DEFAULT '',
    created_at  INTEGER NOT NULL,
    updated_at  INTEGER NOT NULL
);

CREATE INDEX idx_builds_character  ON builds(character);
CREATE INDEX idx_builds_updated_at ON builds(updated_at DESC);

CREATE TABLE parties (
    id          TEXT    PRIMARY KEY,
    name        TEXT    NOT NULL DEFAULT 'New Party',
    -- Build ID 4개. Character가 아니라 Build를 참조한다.
    slots       TEXT    NOT NULL DEFAULT '[null,null,null,null]',
    memo        TEXT    NOT NULL DEFAULT '',
    settings    TEXT    NOT NULL DEFAULT '{}',
    created_at  INTEGER NOT NULL,
    updated_at  INTEGER NOT NULL
);

CREATE INDEX idx_parties_updated_at ON parties(updated_at DESC);

CREATE TABLE cycles (
    id          TEXT    PRIMARY KEY,
    name        TEXT    NOT NULL DEFAULT 'New Cycle',
    party_id    TEXT,
    actions     TEXT    NOT NULL DEFAULT '[]',
    repeat      INTEGER NOT NULL DEFAULT 1,
    memo        TEXT    NOT NULL DEFAULT '',
    created_at  INTEGER NOT NULL,
    updated_at  INTEGER NOT NULL,

    -- 파티가 삭제되면 사이클은 남기되 참조만 끊는다.
    FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);

CREATE INDEX idx_cycles_party_id   ON cycles(party_id);
CREATE INDEX idx_cycles_updated_at ON cycles(updated_at DESC);
