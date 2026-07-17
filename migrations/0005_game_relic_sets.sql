-- 게임 원본 유물 세트 데이터.
--
-- characters / light_cones와 같은 규칙이다. scripts/sync-gamedata.js가
-- Yatta에서 받아 src/data/generated/relic_sets.sql을 만든다.
--
-- effects에는 해석 전 원본만 들어간다. 세트 개수("2"/"4")별로
-- { desc, params } 형태다. 어느 자리표시자가 어떤 스탯인지, 그리고 그게
-- 상시인지 조건부인지는 src/data/relicSetEffects.js에 사람이 적는다.

CREATE TABLE relic_sets (
    id         TEXT    PRIMARY KEY,
    -- Yatta 내부 ID(예: "102").

    slug       TEXT    NOT NULL DEFAULT '',
    -- 사람이 읽는 식별자. relicSetEffects.js의 키이자 build.relics[].set이 참조하는 값.

    name       TEXT    NOT NULL DEFAULT '',

    -- relic(4부위) | planar(2부위). 부위 슬롯 종류와 대응한다.
    type       TEXT    NOT NULL DEFAULT 'relic',

    -- { "2": { desc, params }, "4": { desc, params } }
    effects    TEXT    NOT NULL DEFAULT '{}',

    synced_at  INTEGER NOT NULL DEFAULT 0
);

CREATE UNIQUE INDEX idx_relic_sets_slug ON relic_sets(slug);
CREATE INDEX        idx_relic_sets_type ON relic_sets(type);
