-- synced_at 제거.
--
-- 행마다 동기화 시각을 넣었더니, 수치가 하나도 안 바뀌어도 data:sync를
-- 돌릴 때마다 320개 행 전부가 다시 써졌다. 생성된 시드를 커밋하는 이유가
-- "패치 때 diff로 수치 변화를 확인한다"는 건데, 진짜 변경이 타임스탬프
-- 노이즈에 파묻혀서 그 목적이 사라졌다.
--
-- 데이터가 언제 만들어졌는지는 생성된 SQL 파일 헤더 주석에 있다.
-- 런타임에서 읽던 곳도 없었다.

ALTER TABLE characters  DROP COLUMN synced_at;
ALTER TABLE light_cones DROP COLUMN synced_at;
ALTER TABLE relic_sets  DROP COLUMN synced_at;
