-- 유물 세트 그림.
--
-- 세트 대표 아이콘과 부위별 아이콘은 별개다.
--   icon   : 세트 대표. 숫자다(예: "71000"). id(101)와 다르므로 저장해야 한다.
--   pieces : 부위별 { name, icon }. 아이콘은 "IconRelic_101_1" 형식이다.
--
-- 캐릭터와 광추는 아이콘 이름이 곧 id라 따로 컬럼을 두지 않는다.
-- 실제 이미지는 scripts/sync-images.js가 public/img/ 아래로 받아둔다.

ALTER TABLE relic_sets ADD COLUMN icon   TEXT NOT NULL DEFAULT '';
ALTER TABLE relic_sets ADD COLUMN pieces TEXT NOT NULL DEFAULT '{}';
