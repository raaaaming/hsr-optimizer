-- 캐릭터 최종 스펙 계산에 필요한 항목 추가.
-- level/ascension은 필터 대상이 될 수 있어 컬럼으로,
-- skills/traces는 중첩 구조라 JSON으로 저장한다.

ALTER TABLE builds ADD COLUMN level     INTEGER NOT NULL DEFAULT 80;
ALTER TABLE builds ADD COLUMN ascension INTEGER NOT NULL DEFAULT 6;
ALTER TABLE builds ADD COLUMN skills    TEXT    NOT NULL DEFAULT '{}';
ALTER TABLE builds ADD COLUMN traces    TEXT    NOT NULL DEFAULT '{"major":{},"minor":[]}';
