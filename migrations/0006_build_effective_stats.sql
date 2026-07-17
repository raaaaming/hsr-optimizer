-- 유효 옵션.
--
-- 어떤 부옵션이 "유효"한지는 캐릭터마다 다르다. 게임은 추천을 해주지만
-- 우리에겐 그 데이터가 없으므로 사용자가 직접 고른다(1~5개).
-- 유효 부옵션 명중 통계가 이 목록을 기준으로 집계된다.
--
-- 부위/세트처럼 필터 대상이 아니라 빌드에 딸린 목록이라 JSON으로 둔다.

ALTER TABLE builds ADD COLUMN effective_stats TEXT NOT NULL DEFAULT '[]';
