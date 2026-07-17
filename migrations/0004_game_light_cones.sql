-- 게임 원본 광추 데이터.
--
-- characters와 같은 규칙이다. scripts/sync-gamedata.js가 Yatta에서 받아
-- src/data/generated/light_cones.sql을 만들고, 그걸 적용해서 채운다.
--
-- 주의: 여기 들어가는 건 기계적으로 확실한 것(기본 스탯, 원본 params/설명문)뿐이다.
-- 패시브가 실제로 "어떤 스탯을 얼마나" 올리는지는 params(자리표시자별 배열)와
-- 한국어 설명문을 사람이 대조해야 알 수 있고, 조건부 효과도 섞여 있다.
-- 그 해석은 src/data/lightConePassives.js에 손으로 적는다.

CREATE TABLE light_cones (
    id         TEXT    PRIMARY KEY,
    -- Yatta 내부 ID(예: "23025").

    slug       TEXT    NOT NULL DEFAULT '',
    -- 사람이 읽는 식별자. lightConePassives.js의 키다.

    name       TEXT    NOT NULL DEFAULT '',
    path       TEXT    NOT NULL DEFAULT '',
    rarity     INTEGER NOT NULL DEFAULT 3,

    -- { base, growth, ascensionAdd } — Character.stats와 같은 형태다.
    stats      TEXT    NOT NULL DEFAULT '{}',

    -- { name, desc, params } — 해석 전 원본이다.
    passive    TEXT    NOT NULL DEFAULT '{}',

    synced_at  INTEGER NOT NULL DEFAULT 0
);

CREATE UNIQUE INDEX idx_light_cones_slug   ON light_cones(slug);
CREATE INDEX        idx_light_cones_path   ON light_cones(path);
CREATE INDEX        idx_light_cones_rarity ON light_cones(rarity);
