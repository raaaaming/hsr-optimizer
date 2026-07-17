-- 자동 생성 파일. 직접 고치지 마라.
-- 생성: scripts/sync-gamedata.js (출처: sr.yatta.moe)
-- 생성 시각: 2026-07-17T04:08:25.280Z
-- 세트 수: 60 (유물 32, 행성구 28)
--
-- effects는 해석 전 원본이다. 실제 스탯 보너스는 src/data/relicSetEffects.js를 봐라.

DELETE FROM relic_sets;

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '101',
    'passerby-of-wandering-cloud',
    '흔적을 남기지 않은 과객',
    'relic',
    '{"2":{"desc":"치유량 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"전투 시작 시 즉시 아군의 전투 스킬 포인트를 1pt 회복한다","params":null}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '102',
    'musketeer-of-wild-wheat',
    '들이삭과 동행하는 거너',
    'relic',
    '{"2":{"desc":"공격력 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.12]}},"4":{"desc":"장착한 캐릭터의 속도가 <unbreak>#1[i]%</unbreak> 증가한다. 일반 공격이 가하는 피해가 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.06],"2":[0.1]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '103',
    'knight-of-purity-palace',
    '정토 교황의 팔라딘',
    'relic',
    '{"2":{"desc":"방어력 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.15]}},"4":{"desc":"장착한 캐릭터가 제공하는 실드량이 <unbreak>#1[i]%</unbreak> 증가한다","params":{"1":[0.2]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '104',
    'hunter-of-glacial-forest',
    '혹한 밀림의 사냥꾼',
    'relic',
    '{"2":{"desc":"얼음 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터는 필살기 발동 시 치명타 피해가 <unbreak>#1[i]%</unbreak> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴","params":{"1":[0.25],"2":[2]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '105',
    'champion-of-streetwise-boxing',
    '스트리트 격투왕',
    'relic',
    '{"2":{"desc":"물리 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터는 공격 발동 혹은 피격 후 해당 전투에서 공격력이 <unbreak>#1[i]%</unbreak> 증가한다. 최대 중첩수: <unbreak>#2[i]</unbreak>스택","params":{"1":[0.05],"2":[5]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '106',
    'guard-of-wuthering-snow',
    '눈보라에 맞서는 철위대',
    'relic',
    '{"2":{"desc":"받는 피해 <unbreak>#1[i]%</unbreak> 감소","params":{"1":[0.08]}},"4":{"desc":"턴 시작 시 장착한 캐릭터의 현재 HP 백분율이 <unbreak>#1[i]%</unbreak> 이하일 경우, 자신 HP 최대치 <unbreak>#2[i]%</unbreak>만큼의 HP를 회복하고 에너지를 <unbreak>#3[i]</unbreak>pt 회복한다","params":{"1":[0.5],"2":[0.08],"3":[5]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '107',
    'firesmith-of-lava-forging',
    '용암 단조의 화장(火匠)',
    'relic',
    '{"2":{"desc":"화염 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터의 전투 스킬이 가하는 피해가 <unbreak>#1[i]%</unbreak> 증가하고, 필살기 발동 후 다음번 공격이 가하는 화염 속성 피해가 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[0.12]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '108',
    'genius-of-brilliant-stars',
    '별처럼 빛나는 천재',
    'relic',
    '{"2":{"desc":"양자 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터는 적에게 피해를 줄 때 <unbreak>#1[i]%</unbreak>의 방어력을 무시한다. 목표가 양자 속성 약점을 보유할 경우, 추가로 <unbreak>#2[i]%</unbreak>의 방어력을 무시한다","params":{"1":[0.1],"2":[0.1]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '109',
    'band-of-sizzling-thunder',
    '뇌전을 울리는 밴드',
    'relic',
    '{"2":{"desc":"번개 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터는 전투 스킬 발동 시 공격력이 <unbreak>#1[i]%</unbreak> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴","params":{"1":[0.2],"2":[1]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '110',
    'eagle-of-twilight-line',
    '밤낮의 경계를 나는 매',
    'relic',
    '{"2":{"desc":"바람 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터는 필살기 발동 후 행동 게이지가 <unbreak>#1[i]%</unbreak> 증가한다","params":{"1":[0.25]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '111',
    'thief-of-shooting-meteor',
    '유성을 쫓는 괴도',
    'relic',
    '{"2":{"desc":"격파 특수효과 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.16]}},"4":{"desc":"장착한 캐릭터의 격파 특수효과가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터는 적의 약점을 격파한 후 에너지를 <unbreak>#2[i]</unbreak>pt 회복한다","params":{"1":[0.16],"2":[3]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '112',
    'wastelander-of-banditry-desert',
    '황무지의 도적, 황야인',
    'relic',
    '{"2":{"desc":"허수 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터가 디버프 효과에 빠진 적에게 피해를 가할 시 치명타 확률이 <unbreak>#1[i]%</unbreak> 증가한다. 속박 상태에 빠진 적에게 피해를 가할 시 치명타 피해가 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.1],"2":[0.2]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '113',
    'longevous-disciple',
    '장수를 원하는 제자',
    'relic',
    '{"2":{"desc":"HP 최대치 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.12]}},"4":{"desc":"장착한 캐릭터가 피격되거나 아군에 의해 HP가 소모되면 치명타 확률이 <unbreak>#1[i]%</unbreak> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴. 해당 효과 최대 중첩수: <unbreak>#3[i]</unbreak>스택","params":{"1":[0.08],"2":[2],"3":[2]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '114',
    'messenger-traversing-hackerspace',
    '가상공간을 누비는 메신저',
    'relic',
    '{"2":{"desc":"속도 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.06]}},"4":{"desc":"장착한 캐릭터가 아군에게 필살기 발동 시 모든 아군의 속도가 <unbreak>#1[i]%</unbreak> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴. 해당 효과는 중첩되지 않는다","params":{"1":[0.12],"2":[1]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '115',
    'the-ashblazing-grand-duke',
    '재와 뼈마저 불사르는 대공',
    'relic',
    '{"2":{"desc":"추가 공격으로 가하는 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.2]}},"4":{"desc":"장착한 캐릭터가 추가 공격을 가할 시, 추가 공격이 가한 피해 횟수에 따라 피해를 가할 때마다 장착한 캐릭터의 공격력이 <unbreak>#1[i]%</unbreak> 증가한다. 최대 중첩수: <unbreak>#2[i]</unbreak>회. 지속 시간: <unbreak>#3[i]</unbreak>턴. 해당 효과는 장착한 캐릭터가 다음 추가 공격 발동 시 해제된다","params":{"1":[0.06],"2":[8],"3":[3]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '116',
    'prisoner-in-deep-confinement',
    '깊은 감옥에 수감된 죄수',
    'relic',
    '{"2":{"desc":"공격력 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.12]}},"4":{"desc":"장착한 캐릭터가 적에게 피해를 가할 시 적이 받는 지속 피해 효과 1개마다 대상의 방어력을 <unbreak>#1[i]%</unbreak> 무시한다. 지속 피해 효과는 최대 <unbreak>#2[i]</unbreak>개까지 계산한다","params":{"1":[0.06],"2":[3]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '117',
    'pioneer-diver-of-dead-waters',
    '사수에 잠수한 선구자',
    'relic',
    '{"2":{"desc":"디버프 상태의 영향을 받은 적에게 가하는 피해가 <unbreak>#1[i]%</unbreak> 증가한다","params":{"1":[0.12]}},"4":{"desc":"치명타 확률이 <unbreak>#1[i]%</unbreak> 증가하고 장착한 캐릭터가 <unbreak>#4[i]</unbreak>/<unbreak>#5[i]</unbreak>개 이상의 디버프 효과에 빠진 적에게 가하는 치명타 피해가 <unbreak>#2[i]%</unbreak>/<unbreak>#3[i]%</unbreak> 증가한다. 장착한 캐릭터가 적에게 디버프 효과 부여 시 상기 효과가 <unbreak>100%</unbreak> 증가한다, 지속 시간: <unbreak>#6[i]</unbreak>턴","params":{"1":[0.04],"2":[0.08],"3":[0.12],"4":[2],"5":[3],"6":[1]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '118',
    'watchmaker-master-of-dream-machinations',
    '꿈을 조작하는 시계공',
    'relic',
    '{"2":{"desc":"격파 특수효과 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.16]}},"4":{"desc":"장착한 캐릭터가 아군에게 필살기 발동 시, 모든 아군의 격파 특수효과가 <unbreak>#1[i]%</unbreak> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴. 해당 효과는 중첩할 수 없다","params":{"1":[0.3],"2":[2]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '119',
    'iron-cavalry-against-the-scourge',
    '곤충 재앙을 잠재우는 철기군',
    'relic',
    '{"2":{"desc":"격파 특수효과 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.16]}},"4":{"desc":"장착한 캐릭터의 격파 특수효과가 <unbreak>#1[i]%</unbreak> 이상이면 적에게 가하는 격파 피해가 해당 적의 방어력을 <unbreak>#3[i]%</unbreak> 무시한다. 장착한 캐릭터의 격파 특수효과가 <unbreak>#2[i]%</unbreak> 이상이면 적에게 가하는 슈퍼 격파 피해가 적의 방어력을 <unbreak>#4[i]%</unbreak> 추가로 무시한다","params":{"1":[1.5],"2":[2.5],"3":[0.1],"4":[0.15]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '120',
    'the-wind-soaring-valorous',
    '바람과 구름을 가르는 용맹함',
    'relic',
    '{"2":{"desc":"공격력 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.12]}},"4":{"desc":"장착한 캐릭터의 치명타 확률이 <unbreak>#1[i]%</unbreak> 증가하고, 장착한 캐릭터가 추가 공격 발동 시 필살기가 가하는 피해가 <unbreak>#2[i]%</unbreak> 증가한다. 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.06],"2":[0.36],"3":[1]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '121',
    'sacerdos-relived-ordeal',
    '고행의 길에 다시 오른 사제',
    'relic',
    '{"2":{"desc":"속도 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.06]}},"4":{"desc":"단일 아군에게 전투 스킬 또는 필살기 발동 시, 스킬 목표의 치명타 피해를 <unbreak>#1[i]%</unbreak> 증가시킨다, 지속 시간: <unbreak>#2[i]</unbreak>턴, 해당 효과 최대 중첩수: <unbreak>#3[i]</unbreak>회","params":{"1":[0.18],"2":[2],"3":[2]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '122',
    'scholar-lost-in-erudition',
    '지식의 바다에 빠진 학자',
    'relic',
    '{"2":{"desc":"치명타 확률 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.08]}},"4":{"desc":"전투 스킬과 필살기로 가하는 피해가 <unbreak>#1[i]%</unbreak> 증가한다. 필살기 발동 후, 다음번 전투 스킬 발동 시 가하는 피해가 추가로 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.2],"2":[0.25]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '123',
    'hero-of-triumphant-song',
    '개선가를 울리는 영웅',
    'relic',
    '{"2":{"desc":"공격력 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.12]}},"4":{"desc":"장착한 캐릭터의 기억 정령이 필드에 있을 시 장착한 캐릭터의 속도가 <unbreak>#1[i]%</unbreak> 증가하고, 장착한 캐릭터의 기억 정령이 공격 시 장착한 캐릭터와 기억 정령의 치명타 피해가 <unbreak>#2[i]%</unbreak> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.06],"2":[0.3],"3":[2]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '124',
    'poet-of-mourning-collapse',
    '망국을 애도하는 시인',
    'relic',
    '{"2":{"desc":"양자 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터의 속도가 <unbreak>#6[i]%</unbreak> 감소한다. 전투 진입 전 장착한 캐릭터의 속도가 <unbreak>#2[i]</unbreak>/<unbreak>#3[i]</unbreak> 미만이면, 장착한 캐릭터의 치명타 확률이 <unbreak>#4[i]%</unbreak>/<unbreak>#5[i]%</unbreak> 증가한다. 해당 효과는 장착한 캐릭터의 기억 정령에게도 동시에 적용된다","params":{"1":[-0.08],"2":[110],"3":[95],"4":[0.2],"5":[0.32],"6":[0.08]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '125',
    'warrior-goddess-of-sun-and-thunder',
    '태양과 번개의 여전사',
    'relic',
    '{"2":{"desc":"속도 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.06]}},"4":{"desc":"장착한 캐릭터와 해당 캐릭터의 기억 정령이 장착한 캐릭터와 해당 캐릭터의 기억 정령을 제외한 아군에게 치유를 제공하면 장착한 캐릭터가 [단비]를 획득하며, 턴마다 최대 1회 발동한다, 지속 시간: <unbreak>#3[i]</unbreak>턴. 장착한 캐릭터가 [단비] 보유 시 속도가 <unbreak>#1[i]%</unbreak> 증가하고, 모든 아군의 치명타 피해가 <unbreak>#2[i]%</unbreak> 증가하며, 해당 효과는 중첩할 수 없다","params":{"1":[0.06],"2":[0.15],"3":[2]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '126',
    'wavestrider-captain',
    '거친 파도를 헤치는 선장',
    'relic',
    '{"2":{"desc":"치명타 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.16]}},"4":{"desc":"장착한 캐릭터가 다른 아군의 스킬 목표가 되면 [조력]을 1스택 획득한다, 최대 중첩수: <unbreak>#1[i]</unbreak>스택. 필살기 발동 시 [조력]을 <unbreak>#1[i]</unbreak>스택 보유하면, 모든 [조력]을 소모해 장착한 캐릭터의 공격력을 <unbreak>#2[i]%</unbreak> 증가시킨다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[2],"2":[0.48],"3":[1]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '127',
    'world-remaking-deliverer',
    '천지를 재창조한 구세주',
    'relic',
    '{"2":{"desc":"치명타 확률 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.08]}},"4":{"desc":"장착한 캐릭터가 일반 공격 또는 전투 스킬 발동 후, 장착한 캐릭터의 기억 정령이 필드에 있으면 장착한 캐릭터와 해당 캐릭터의 기억 정령의 HP 최대치가 <unbreak>#1[i]%</unbreak> 증가하고, 모든 아군이 가하는 피해가 <unbreak>#2[i]%</unbreak> 증가하며, 장착한 캐릭터가 다음 일반 공격 또는 전투 스킬을 발동한 후까지 지속된다","params":{"1":[0.24],"2":[0.15]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '128',
    'self-enshrouded-recluse',
    '별빛에 숨은 은둔자',
    'relic',
    '{"2":{"desc":"제공하는 실드량 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터가 제공하는 실드량이 <unbreak>#1[i]%</unbreak> 증가하고, 아군이 장착한 캐릭터가 제공한 실드 보유 시 치명타 피해가 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[0.15]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '129',
    'ever-glorious-magical-girl',
    '빛나는 공훈의 마법 소녀',
    'relic',
    '{"2":{"desc":"치명타 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.16]}},"4":{"desc":"장착한 캐릭터와 해당 캐릭터의 기억 정령이 가하는 환락 피해가 목표의 방어력을 <unbreak>#1[i]%</unbreak> 무시하고, 아군이 웃음 포인트를 누적 <unbreak>#2[i]</unbreak>pt 획득할 때마다 가하는 환락 피해가 추가로 목표의 방어력을 <unbreak>#3[i]%</unbreak> 무시한다, 최대 중첩수: <unbreak>#4[i]</unbreak>스택","params":{"1":[0.1],"2":[5],"3":[0.01],"4":[10]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '130',
    'diviner-of-distant-reach',
    '천명에 응해 먼 길을 떠난 점술가',
    'relic',
    '{"2":{"desc":"속도 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.06]}},"4":{"desc":"전투 진입 전, 장착한 캐릭터의 속도가 <unbreak>#1[i]</unbreak>/<unbreak>#2[i]</unbreak> 이상일 시 장착한 캐릭터의 치명타 확률이 <unbreak>#3[i]%</unbreak>/<unbreak>#4[i]%</unbreak> 증가한다. 장착한 캐릭터가 각 전투에서 처음으로 환락 스킬 발동 시 모든 아군의 환락도가 <unbreak>#5[i]%</unbreak> 증가하며, 해당 효과는 중첩되지 않는다","params":{"1":[120],"2":[160],"3":[0.1],"4":[0.18],"5":[0.1]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '131',
    'as-navigator-isee-sees-it',
    '별을 갈망하는 항법사 아집',
    'relic',
    '{"2":{"desc":"공격력 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.12]}},"4":{"desc":"장착한 캐릭터가 전투 진입 시/전투 스킬 발동 시, 전투 스킬과 필살기가 가하는 피해가 <unbreak>#1[i]%</unbreak> 증가한다, 최대 중첩수: <unbreak>#2[i]</unbreak>스택, 장착한 캐릭터의 턴 시작 시/필살기 발동 후, 해당 효과를 <unbreak>#3[i]</unbreak>스택 해제한다","params":{"1":[0.18],"2":[3],"3":[1]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '132',
    'divine-querying-master-smith',
    '신공을 탐구하는 명장',
    'relic',
    '{"2":{"desc":"HP 최대치 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.12]}},"4":{"desc":"장착한 캐릭터가 방어력 감소 상태의 적에게 가하는 치명타 피해가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터가 적에게 방어력 감소 상태를 부여하면 모든 아군은 [연소 촉진]을 획득한다, 지속 시간: <unbreak>#2[i]</unbreak>턴, 해당 효과는 중첩되지 않으며, [연소 촉진]을 보유한 아군은 가하는 피해가 <unbreak>#3[i]%</unbreak> 증가한다. 해당 효과는 장착한 캐릭터가 공격을 발동하면 다시 발동할 수 있다","params":{"1":[0.28],"2":[2],"3":[0.15]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '301',
    'space-sealing-station',
    '우주 봉인 정거장',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 공격력이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 속도가 <unbreak>#2[i]</unbreak> 이상일 경우 공격력이 추가로 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[120],"3":[0.12]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '302',
    'fleet-of-the-ageless',
    '불로인의 선주',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 HP 최대치가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 속도가 <unbreak>#2[i]</unbreak> 이상일 경우 모든 아군의 공격력이 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[120],"3":[0.08]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '303',
    'pan-cosmic-commercial-enterprise',
    '범은하 상사',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 효과 명중이 <unbreak>#1[i]%</unbreak> 증가한다. 동시에 장착한 캐릭터의 현재 효과 명중 <unbreak>#2[i]%</unbreak>만큼의 공격력이 증가하며 최대 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.1],"2":[0.25],"3":[0.25]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '304',
    'belobog-of-the-architects',
    '축성가의 벨로보그',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 방어력이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 효과 명중이 <unbreak>#2[i]%</unbreak> 이상일 경우 방어력이 추가로 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.15],"2":[0.5],"3":[0.15]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '305',
    'celestial-differentiator',
    '천체 차분기관',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 치명타 피해가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 치명타 피해가 <unbreak>#2[i]%</unbreak> 이상일 경우, 전투 진입 후 장착한 캐릭터의 치명타 확률이 <unbreak>#3[i]%</unbreak> 증가한다. 첫 공격 발동 후까지 지속하고 종료된다","params":{"1":[0.16],"2":[1.2],"3":[0.6]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '306',
    'inert-salsotto',
    '회전을 멈춘 살소토',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 치명타 확률이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 치명타 확률이 <unbreak>#2[i]%</unbreak> 이상일 경우, 필살기와 추가 공격이 가하는 피해가 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.08],"2":[0.5],"3":[0.15]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '307',
    'talia-kingdom-of-banditry',
    '도적국 탈리아',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 격파 특수효과가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 속도가 <unbreak>#2[i]</unbreak> 이상일 경우 격파 특수효과가 추가로 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.16],"2":[145],"3":[0.2]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '308',
    'sprightly-vonwacq',
    '생명의 바커 공',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 에너지 회복효율이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 속도가 <unbreak>#2[i]</unbreak> 이상일 경우 전투 진입 시 즉시 행동 게이지가 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.05],"2":[120],"3":[0.4]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '309',
    'rutilant-arena',
    '뭇별 경기장',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 치명타 확률이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 치명타 확률이 <unbreak>#2[i]%</unbreak> 이상일 경우, 일반 공격과 전투 스킬이 가하는 피해가 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.08],"2":[0.7],"3":[0.2]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '310',
    'broken-keel',
    '부러진 용골',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 효과 저항이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 효과 저항이 <unbreak>#2[i]%</unbreak> 이상일 경우 모든 아군의 치명타 피해가 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.1],"2":[0.3],"3":[0.1]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '311',
    'firmament-frontline-glamoth',
    '창공 전선 그라모스',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 공격력이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 속도가 <unbreak>#2[i]</unbreak>/<unbreak>#3[i]</unbreak> 이상일 경우, 장착한 캐릭터가 가하는 피해가 <unbreak>#4[i]%</unbreak>/<unbreak>#5[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[135],"3":[160],"4":[0.12],"5":[0.18]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '312',
    'penacony-land-of-the-dreams',
    '꿈의 땅 페나코니',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 에너지 회복효율이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터와 같은 속성의 파티 내 다른 아군 캐릭터가 주는 피해가 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.05],"2":[0.1]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '313',
    'sigonia-the-unclaimed-desolation',
    '주인 없는 황폐한 별 츠가냐',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 치명타 확률이 <unbreak>#3[i]%</unbreak> 증가한다. 적이 처치될 시 장착한 캐릭터의 치명타 피해가 <unbreak>#1[i]%</unbreak> 증가한다. 최대 중첩수: <unbreak>#2[i]</unbreak>","params":{"1":[0.04],"2":[10],"3":[0.04]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '314',
    'izumo-gensei-and-takama-divine-realm',
    '이즈모 현세와 타카마 신국',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 공격력이 <unbreak>#1[i]%</unbreak> 증가한다. 전투 진입 시 장착한 캐릭터와 운명의 길이 같은 동료가 최소 1명 존재할 경우, 장착한 캐릭터의 치명타 확률이 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[0.12]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '315',
    'duran-dynasty-of-running-wolves',
    '질주하는 늑대의 도람 왕조',
    'planar',
    '{"2":{"desc":"아군 캐릭터가 추가 공격을 발동하면 장착한 캐릭터는 [공훈]을 1스택 획득한다, 최대 중첩수: <unbreak>#1[i]</unbreak>스택. [공훈] 스택당 장착한 캐릭터의 추가 공격으로 가하는 피해가 <unbreak>#2[i]%</unbreak> 증가하고, <unbreak>#1[i]</unbreak>스택까지 중첩 시 장착한 캐릭터의 치명타 피해가 추가로 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[5],"2":[0.05],"3":[0.25]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '316',
    'forge-of-the-kalpagni-lantern',
    '겁화 연등의 연마궁',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 속도가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터가 화염 속성 약점을 보유한 적을 명중하면 격파 특수효과가 <unbreak>#2[i]%</unbreak> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.06],"2":[0.4],"3":[1]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '317',
    'lushaka-the-sunken-seas',
    '바다에 잠긴 루샤카',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 에너지 회복효율이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터가 파티 편성의 첫 번째 캐릭터가 아닐 경우, 파티 편성의 첫 번째 캐릭터의 공격력이 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.05],"2":[0.12]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '318',
    'the-wondrous-bananamusement-park',
    '기묘한 나나 낙원',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 치명타 피해가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터가 소환한 목표가 있을 시, 치명타 피해가 추가로 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.16],"2":[0.32]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '319',
    'bone-collection-s-serene-demesne',
    '고요한 습골지',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 HP 최대치가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 HP 최대치가 <unbreak>#2[i]</unbreak>pt 이상일 경우, 장착한 캐릭터와 해당 캐릭터의 기억 정령의 치명타 피해가 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[5000],"3":[0.28]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '320',
    'giant-tree-of-rapt-brooding',
    '사색하는 거목',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 속도가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 속도가 <unbreak>#2[i]</unbreak>/<unbreak>#3[i]</unbreak> 이상일 경우, 장착한 캐릭터와 해당 캐릭터의 기억 정령의 치유량이 <unbreak>#4[i]%</unbreak>/<unbreak>#5[i]%</unbreak> 증가한다","params":{"1":[0.06],"2":[135],"3":[180],"4":[0.12],"5":[0.2]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '321',
    'arcadia-of-woven-dreams',
    '꿈을 엮는 요정의 낙원',
    'planar',
    '{"2":{"desc":"파티 내 현재 필드에 있는 아군의 수가 4명이 아닐 경우, 아군 수가 1명 많을/적을 때마다 장착한 캐릭터와 해당 캐릭터의 기억 정령이 가하는 피해가 <unbreak>#1[i]%</unbreak>/<unbreak>#2[i]%</unbreak> 증가한다, 최대 중첩수: <unbreak>#3[i]</unbreak>/<unbreak>#4[i]</unbreak>스택","params":{"1":[0.09],"2":[0.12],"3":[4],"4":[3]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '322',
    'revelry-by-the-sea',
    '즐거움에 취한 바다의 일각',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 공격력이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 공격력이 <unbreak>#2[i]</unbreak>/<unbreak>#3[i]</unbreak> 이상일 시 가하는 지속 피해가 추가로 <unbreak>#4[i]%</unbreak>/<unbreak>#5[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[2400],"3":[3600],"4":[0.12],"5":[0.24]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '323',
    'amphoreus-the-eternal-land',
    '영원의 땅 앰포리어스',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 치명타 확률이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 기억 정령이 필드에 있을 시 모든 아군의 속도가 <unbreak>#2[i]%</unbreak> 증가하며, 해당 효과는 중첩할 수 없다","params":{"1":[0.08],"2":[0.08]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '324',
    'tengoku-livestream',
    '텐고쿠@라이브스트리밍',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 치명타 피해가 <unbreak>#1[i]%</unbreak> 증가하며, 같은 턴에 전투 스킬 포인트를 <unbreak>#2[i]</unbreak>pt 이상 소모 시 추가로 장착한 캐릭터의 치명타 피해가 <unbreak>#3[i]%</unbreak> 증가한다, 지속 시간: <unbreak>#4[i]</unbreak>턴","params":{"1":[0.16],"2":[3],"3":[0.32],"4":[3]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '325',
    'punklorde-stage-zero',
    '0호 스테이지 펑크 로드',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 환락도가 <unbreak>#1[i]%</unbreak> 증가한다. 전투 중 환락도가 처음으로 <unbreak>#2[i]%</unbreak>/<unbreak>#3[i]%</unbreak> 도달 시, 장착한 캐릭터의 치명타 피해가 <unbreak>#4[i]%</unbreak>/<unbreak>#5[i]%</unbreak> 증가한다","params":{"1":[0.08],"2":[0.4],"3":[0.8],"4":[0.2],"5":[0.32]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '326',
    'city-of-converging-stars',
    '천 개의 별이 모인 도시',
    'planar',
    '{"2":{"desc":"장착한 캐릭터가 추가 공격 발동 시, 공격력이 <unbreak>#1[i]%</unbreak> 증가한다, 지속 시간: <unbreak>#2[i]</unbreak>턴. 적이 처치될 시, 모든 아군이 이번 전투에서 치명타 피해가 <unbreak>#3[i]%</unbreak> 증가하며, 해당 효과는 중첩되지 않는다","params":{"1":[0.24],"2":[2],"3":[0.12]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '327',
    'fallen-star-anchorage',
    '추락한 별의 출항지',
    'planar',
    '{"2":{"desc":"장착한 캐릭터의 치명타 확률이 <unbreak>#1[i]%</unbreak> 증가한다. 전투 진입 시, 장착한 캐릭터와 다른 동료 1명이 모두 개척 동행 캐릭터일 경우, 장착한 캐릭터의 치명타 피해가 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.08],"2":[0.32]}}}',
    1784261305280
);

INSERT INTO relic_sets (id, slug, name, type, effects, synced_at) VALUES (
    '328',
    'cosmic-life-sciences-institute',
    '우주 생명과학연구원',
    'planar',
    '{"2":{"desc":"전투 진입 시 장착한 캐릭터의 에너지 최대치가 <unbreak>#1[i]</unbreak>pt 이상일 경우, 초과한 에너지 최대치 1pt당 장착한 캐릭터가 가하는 피해가 <unbreak>#2[f1]%</unbreak> 증가하며, 최대 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[200],"2":[0.0019999999],"3":[0.32]}}}',
    1784261305280
);
