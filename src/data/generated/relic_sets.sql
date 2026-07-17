-- 자동 생성 파일. 직접 고치지 마라.
-- 생성: scripts/sync-gamedata.js (출처: sr.yatta.moe)
-- 생성 시각: 2026-07-17T11:20:32.050Z
-- 세트 수: 60 (유물 32, 행성구 28)
--
-- effects는 해석 전 원본이다. 실제 스탯 보너스는 src/data/relicSetEffects.js를 봐라.

DELETE FROM relic_sets;

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '101',
    'passerby-of-wandering-cloud',
    '흔적을 남기지 않은 과객',
    'relic',
    '71000',
    '{"2":{"desc":"치유량 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"전투 시작 시 즉시 아군의 전투 스킬 포인트를 1pt 회복한다","params":null}}',
    '{"head":{"name":"과객의 봄맞이 나무 비녀","icon":"IconRelic_101_1"},"hands":{"name":"과객의 유룡완갑","icon":"IconRelic_101_2"},"body":{"name":"과객의 낡은 자수 외투","icon":"IconRelic_101_3"},"feet":{"name":"과객의 뒤안길 유랑 신발","icon":"IconRelic_101_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '102',
    'musketeer-of-wild-wheat',
    '들이삭과 동행하는 거너',
    'relic',
    '71001',
    '{"2":{"desc":"공격력 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.12]}},"4":{"desc":"장착한 캐릭터의 속도가 <unbreak>#1[i]%</unbreak> 증가한다. 일반 공격이 가하는 피해가 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.06],"2":[0.1]}}}',
    '{"head":{"name":"거너의 들이삭 페도라","icon":"IconRelic_102_1"},"hands":{"name":"거너의 거친 가죽장갑","icon":"IconRelic_102_2"},"body":{"name":"거너의 윈드헌터 망토","icon":"IconRelic_102_3"},"feet":{"name":"거너의 리벳 승마화","icon":"IconRelic_102_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '103',
    'knight-of-purity-palace',
    '정토 교황의 팔라딘',
    'relic',
    '71002',
    '{"2":{"desc":"방어력 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.15]}},"4":{"desc":"장착한 캐릭터가 제공하는 실드량이 <unbreak>#1[i]%</unbreak> 증가한다","params":{"1":[0.2]}}}',
    '{"head":{"name":"팔라딘의 용서 가면","icon":"IconRelic_103_1"},"hands":{"name":"팔라딘의 침묵 맹세 반지","icon":"IconRelic_103_2"},"body":{"name":"기사의 엄숙 갑옷","icon":"IconRelic_103_3"},"feet":{"name":"팔라딘의 질서 철장화","icon":"IconRelic_103_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '104',
    'hunter-of-glacial-forest',
    '혹한 밀림의 사냥꾼',
    'relic',
    '71003',
    '{"2":{"desc":"얼음 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터는 필살기 발동 시 치명타 피해가 <unbreak>#1[i]%</unbreak> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴","params":{"1":[0.25],"2":[2]}}}',
    '{"head":{"name":"설원 사냥꾼의 황신(荒神) 후드모자","icon":"IconRelic_104_1"},"hands":{"name":"설원 사냥꾼의 도마뱀 장갑","icon":"IconRelic_104_2"},"body":{"name":"설원 사냥꾼의 얼음 드래곤 망토","icon":"IconRelic_104_3"},"feet":{"name":"설원 사냥꾼의 벅스킨 부츠","icon":"IconRelic_104_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '105',
    'champion-of-streetwise-boxing',
    '스트리트 격투왕',
    'relic',
    '71004',
    '{"2":{"desc":"물리 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터는 공격 발동 혹은 피격 후 해당 전투에서 공격력이 <unbreak>#1[i]%</unbreak> 증가한다. 최대 중첩수: <unbreak>#2[i]</unbreak>스택","params":{"1":[0.05],"2":[5]}}}',
    '{"head":{"name":"격투왕의 챔피언 헤드 기어","icon":"IconRelic_105_1"},"hands":{"name":"격투왕의 대포 글러브","icon":"IconRelic_105_2"},"body":{"name":"격투왕의 가슴 보호대","icon":"IconRelic_105_3"},"feet":{"name":"격투왕의 휘어진 스텝 부츠","icon":"IconRelic_105_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '106',
    'guard-of-wuthering-snow',
    '눈보라에 맞서는 철위대',
    'relic',
    '71005',
    '{"2":{"desc":"받는 피해 <unbreak>#1[i]%</unbreak> 감소","params":{"1":[0.08]}},"4":{"desc":"턴 시작 시 장착한 캐릭터의 현재 HP 백분율이 <unbreak>#1[i]%</unbreak> 이하일 경우, 자신 HP 최대치 <unbreak>#2[i]%</unbreak>만큼의 HP를 회복하고 에너지를 <unbreak>#3[i]</unbreak>pt 회복한다","params":{"1":[0.5],"2":[0.08],"3":[5]}}}',
    '{"head":{"name":"철위대의 무쇠 복면 헬멧","icon":"IconRelic_106_1"},"hands":{"name":"철위대의 은비늘 손갑옷","icon":"IconRelic_106_2"},"body":{"name":"철위대의 구식 군복","icon":"IconRelic_106_3"},"feet":{"name":"철위대의 은 정강이 보호대","icon":"IconRelic_106_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '107',
    'firesmith-of-lava-forging',
    '용암 단조의 화장(火匠)',
    'relic',
    '71006',
    '{"2":{"desc":"화염 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터의 전투 스킬이 가하는 피해가 <unbreak>#1[i]%</unbreak> 증가하고, 필살기 발동 후 다음번 공격이 가하는 화염 속성 피해가 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[0.12]}}}',
    '{"head":{"name":"화장(火匠)의 흑요석 고글","icon":"IconRelic_107_1"},"hands":{"name":"화장(火匠)의 어화(御火) 반지","icon":"IconRelic_107_2"},"body":{"name":"화장(火匠)의 난연성 앞치마","icon":"IconRelic_107_3"},"feet":{"name":"화장(火匠)의 합금 의족","icon":"IconRelic_107_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '108',
    'genius-of-brilliant-stars',
    '별처럼 빛나는 천재',
    'relic',
    '71007',
    '{"2":{"desc":"양자 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터는 적에게 피해를 줄 때 <unbreak>#1[i]%</unbreak>의 방어력을 무시한다. 목표가 양자 속성 약점을 보유할 경우, 추가로 <unbreak>#2[i]%</unbreak>의 방어력을 무시한다","params":{"1":[0.1],"2":[0.1]}}}',
    '{"head":{"name":"지니어스의 초원격 감지","icon":"IconRelic_108_1"},"hands":{"name":"지니어스의 주파수 변환 포착 장갑","icon":"IconRelic_108_2"},"body":{"name":"지니어스의 메타버스 딥 다이빙","icon":"IconRelic_108_3"},"feet":{"name":"지니어스의 중력 보행","icon":"IconRelic_108_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '109',
    'band-of-sizzling-thunder',
    '뇌전을 울리는 밴드',
    'relic',
    '71008',
    '{"2":{"desc":"번개 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터는 전투 스킬 발동 시 공격력이 <unbreak>#1[i]%</unbreak> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴","params":{"1":[0.2],"2":[1]}}}',
    '{"head":{"name":"밴드의 편광 선글라스","icon":"IconRelic_109_1"},"hands":{"name":"밴드의 투어 팔찌","icon":"IconRelic_109_2"},"body":{"name":"밴드의 리벳 가죽 재킷","icon":"IconRelic_109_3"},"feet":{"name":"밴드의 리벳 숏부츠","icon":"IconRelic_109_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '110',
    'eagle-of-twilight-line',
    '밤낮의 경계를 나는 매',
    'relic',
    '71009',
    '{"2":{"desc":"바람 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터는 필살기 발동 후 행동 게이지가 <unbreak>#1[i]%</unbreak> 증가한다","params":{"1":[0.25]}}}',
    '{"head":{"name":"매의 부리 헬멧","icon":"IconRelic_110_1"},"hands":{"name":"매의 활공 반지","icon":"IconRelic_110_2"},"body":{"name":"매의 날개 장비 벨트","icon":"IconRelic_110_3"},"feet":{"name":"매의 깃털 붕대","icon":"IconRelic_110_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '111',
    'thief-of-shooting-meteor',
    '유성을 쫓는 괴도',
    'relic',
    '71010',
    '{"2":{"desc":"격파 특수효과 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.16]}},"4":{"desc":"장착한 캐릭터의 격파 특수효과가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터는 적의 약점을 격파한 후 에너지를 <unbreak>#2[i]</unbreak>pt 회복한다","params":{"1":[0.16],"2":[3]}}}',
    '{"head":{"name":"괴도의 천인 가면","icon":"IconRelic_111_1"},"hands":{"name":"괴도의 무늬 장갑","icon":"IconRelic_111_2"},"body":{"name":"괴도의 쇠갈고리","icon":"IconRelic_111_3"},"feet":{"name":"괴도의 유성 부츠","icon":"IconRelic_111_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '112',
    'wastelander-of-banditry-desert',
    '황무지의 도적, 황야인',
    'relic',
    '71011',
    '{"2":{"desc":"허수 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터가 디버프 효과에 빠진 적에게 피해를 가할 시 치명타 확률이 <unbreak>#1[i]%</unbreak> 증가한다. 속박 상태에 빠진 적에게 피해를 가할 시 치명타 피해가 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.1],"2":[0.2]}}}',
    '{"head":{"name":"황야인의 호흡 마스크","icon":"IconRelic_112_1"},"hands":{"name":"황야인의 황무지 단자","icon":"IconRelic_112_2"},"body":{"name":"황야인의 수도사 로브","icon":"IconRelic_112_3"},"feet":{"name":"황야인의 동력 다리 갑옷","icon":"IconRelic_112_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '113',
    'longevous-disciple',
    '장수를 원하는 제자',
    'relic',
    '71020',
    '{"2":{"desc":"HP 최대치 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.12]}},"4":{"desc":"장착한 캐릭터가 피격되거나 아군에 의해 HP가 소모되면 치명타 확률이 <unbreak>#1[i]%</unbreak> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴. 해당 효과 최대 중첩수: <unbreak>#3[i]</unbreak>스택","params":{"1":[0.08],"2":[2],"3":[2]}}}',
    '{"head":{"name":"제자에게 빛을 가져다준 의안","icon":"IconRelic_113_1"},"hands":{"name":"제자의 기교 의수","icon":"IconRelic_113_2"},"body":{"name":"제자의 이슬받이 날개옷","icon":"IconRelic_113_3"},"feet":{"name":"제자의 천인 비단신","icon":"IconRelic_113_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '114',
    'messenger-traversing-hackerspace',
    '가상공간을 누비는 메신저',
    'relic',
    '71021',
    '{"2":{"desc":"속도 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.06]}},"4":{"desc":"장착한 캐릭터가 아군에게 필살기 발동 시 모든 아군의 속도가 <unbreak>#1[i]%</unbreak> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴. 해당 효과는 중첩되지 않는다","params":{"1":[0.12],"2":[1]}}}',
    '{"head":{"name":"메신저의 홀로그램 고글","icon":"IconRelic_114_1"},"hands":{"name":"메신저의 변형 의수","icon":"IconRelic_114_2"},"body":{"name":"메신저의 비밀 편지 크로스백","icon":"IconRelic_114_3"},"feet":{"name":"메신저의 프리러닝화","icon":"IconRelic_114_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '115',
    'the-ashblazing-grand-duke',
    '재와 뼈마저 불사르는 대공',
    'relic',
    '71024',
    '{"2":{"desc":"추가 공격으로 가하는 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.2]}},"4":{"desc":"장착한 캐릭터가 추가 공격을 가할 시, 추가 공격이 가한 피해 횟수에 따라 피해를 가할 때마다 장착한 캐릭터의 공격력이 <unbreak>#1[i]%</unbreak> 증가한다. 최대 중첩수: <unbreak>#2[i]</unbreak>회. 지속 시간: <unbreak>#3[i]</unbreak>턴. 해당 효과는 장착한 캐릭터가 다음 추가 공격 발동 시 해제된다","params":{"1":[0.06],"2":[8],"3":[3]}}}',
    '{"head":{"name":"대공의 지옥불 면류관","icon":"IconRelic_115_1"},"hands":{"name":"대공의 화염 장갑","icon":"IconRelic_115_2"},"body":{"name":"대공의 은혜로운 로브","icon":"IconRelic_115_3"},"feet":{"name":"대공의 우아한 예복 장화","icon":"IconRelic_115_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '116',
    'prisoner-in-deep-confinement',
    '깊은 감옥에 수감된 죄수',
    'relic',
    '71025',
    '{"2":{"desc":"공격력 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.12]}},"4":{"desc":"장착한 캐릭터가 적에게 피해를 가할 시 적이 받는 지속 피해 효과 1개마다 대상의 방어력을 <unbreak>#1[i]%</unbreak> 무시한다. 지속 피해 효과는 최대 <unbreak>#2[i]</unbreak>개까지 계산한다","params":{"1":[0.06],"2":[3]}}}',
    '{"head":{"name":"죄수의 입마개","icon":"IconRelic_116_1"},"hands":{"name":"죄수의 납석 수갑","icon":"IconRelic_116_2"},"body":{"name":"죄수의 유폐 포박","icon":"IconRelic_116_3"},"feet":{"name":"죄수의 결박 족쇄","icon":"IconRelic_116_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '117',
    'pioneer-diver-of-dead-waters',
    '사수에 잠수한 선구자',
    'relic',
    '71028',
    '{"2":{"desc":"디버프 상태의 영향을 받은 적에게 가하는 피해가 <unbreak>#1[i]%</unbreak> 증가한다","params":{"1":[0.12]}},"4":{"desc":"치명타 확률이 <unbreak>#1[i]%</unbreak> 증가하고 장착한 캐릭터가 <unbreak>#4[i]</unbreak>/<unbreak>#5[i]</unbreak>개 이상의 디버프 효과에 빠진 적에게 가하는 치명타 피해가 <unbreak>#2[i]%</unbreak>/<unbreak>#3[i]%</unbreak> 증가한다. 장착한 캐릭터가 적에게 디버프 효과 부여 시 상기 효과가 <unbreak>100%</unbreak> 증가한다, 지속 시간: <unbreak>#6[i]</unbreak>턴","params":{"1":[0.04],"2":[0.08],"3":[0.12],"4":[2],"5":[3],"6":[1]}}}',
    '{"head":{"name":"선구자의 단열 헬멧","icon":"IconRelic_117_1"},"hands":{"name":"선구자의 허극 나침반","icon":"IconRelic_117_2"},"body":{"name":"선구자의 밀폐형 납 잠수복","icon":"IconRelic_117_3"},"feet":{"name":"선구자의 별에 정박하는 닻","icon":"IconRelic_117_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '118',
    'watchmaker-master-of-dream-machinations',
    '꿈을 조작하는 시계공',
    'relic',
    '71029',
    '{"2":{"desc":"격파 특수효과 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.16]}},"4":{"desc":"장착한 캐릭터가 아군에게 필살기 발동 시, 모든 아군의 격파 특수효과가 <unbreak>#1[i]%</unbreak> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴. 해당 효과는 중첩할 수 없다","params":{"1":[0.3],"2":[2]}}}',
    '{"head":{"name":"시계공의 망원 렌즈","icon":"IconRelic_118_1"},"hands":{"name":"시계공의 행운 손목시계","icon":"IconRelic_118_2"},"body":{"name":"시계공의 환상 예복","icon":"IconRelic_118_3"},"feet":{"name":"시계공의 숨겨진 꿈 가죽신발","icon":"IconRelic_118_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '119',
    'iron-cavalry-against-the-scourge',
    '곤충 재앙을 잠재우는 철기군',
    'relic',
    '71032',
    '{"2":{"desc":"격파 특수효과 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.16]}},"4":{"desc":"장착한 캐릭터의 격파 특수효과가 <unbreak>#1[i]%</unbreak> 이상이면 적에게 가하는 격파 피해가 해당 적의 방어력을 <unbreak>#3[i]%</unbreak> 무시한다. 장착한 캐릭터의 격파 특수효과가 <unbreak>#2[i]%</unbreak> 이상이면 적에게 가하는 슈퍼 격파 피해가 적의 방어력을 <unbreak>#4[i]%</unbreak> 추가로 무시한다","params":{"1":[1.5],"2":[2.5],"3":[0.1],"4":[0.15]}}}',
    '{"head":{"name":"철기군의 정찰 투구","icon":"IconRelic_119_1"},"hands":{"name":"철기군의 견고한 철완","icon":"IconRelic_119_2"},"body":{"name":"철기군의 은빛 기갑","icon":"IconRelic_119_3"},"feet":{"name":"철기군의 비행 그리브","icon":"IconRelic_119_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '120',
    'the-wind-soaring-valorous',
    '바람과 구름을 가르는 용맹함',
    'relic',
    '71033',
    '{"2":{"desc":"공격력 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.12]}},"4":{"desc":"장착한 캐릭터의 치명타 확률이 <unbreak>#1[i]%</unbreak> 증가하고, 장착한 캐릭터가 추가 공격 발동 시 필살기가 가하는 피해가 <unbreak>#2[i]%</unbreak> 증가한다. 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.06],"2":[0.36],"3":[1]}}}',
    '{"head":{"name":"용맹한 현효 면갑","icon":"IconRelic_120_1"},"hands":{"name":"용맹한 갈고리 완갑","icon":"IconRelic_120_2"},"body":{"name":"용맹한 날개깃 갑옷","icon":"IconRelic_120_3"},"feet":{"name":"용맹한 사냥 경갑","icon":"IconRelic_120_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '121',
    'sacerdos-relived-ordeal',
    '고행의 길에 다시 오른 사제',
    'relic',
    '71038',
    '{"2":{"desc":"속도 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.06]}},"4":{"desc":"단일 아군에게 전투 스킬 또는 필살기 발동 시, 스킬 목표의 치명타 피해를 <unbreak>#1[i]%</unbreak> 증가시킨다, 지속 시간: <unbreak>#2[i]</unbreak>턴, 해당 효과 최대 중첩수: <unbreak>#3[i]</unbreak>회","params":{"1":[0.18],"2":[2],"3":[2]}}}',
    '{"head":{"name":"사제의 음률 귀걸이","icon":"IconRelic_121_1"},"hands":{"name":"사제의 환영 장갑","icon":"IconRelic_121_2"},"body":{"name":"사제의 성직 예복","icon":"IconRelic_121_3"},"feet":{"name":"사제의 고행 단화","icon":"IconRelic_121_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '122',
    'scholar-lost-in-erudition',
    '지식의 바다에 빠진 학자',
    'relic',
    '71039',
    '{"2":{"desc":"치명타 확률 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.08]}},"4":{"desc":"전투 스킬과 필살기로 가하는 피해가 <unbreak>#1[i]%</unbreak> 증가한다. 필살기 발동 후, 다음번 전투 스킬 발동 시 가하는 피해가 추가로 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.2],"2":[0.25]}}}',
    '{"head":{"name":"학자의 은테 모노클","icon":"IconRelic_122_1"},"hands":{"name":"학자의 보조 너클","icon":"IconRelic_122_2"},"body":{"name":"학자의 트위드 재킷","icon":"IconRelic_122_3"},"feet":{"name":"학자의 스웨이드 스노우 부츠","icon":"IconRelic_122_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '123',
    'hero-of-triumphant-song',
    '개선가를 울리는 영웅',
    'relic',
    '71040',
    '{"2":{"desc":"공격력 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.12]}},"4":{"desc":"장착한 캐릭터의 기억 정령이 필드에 있을 시 장착한 캐릭터의 속도가 <unbreak>#1[i]%</unbreak> 증가하고, 장착한 캐릭터의 기억 정령이 공격 시 장착한 캐릭터와 기억 정령의 치명타 피해가 <unbreak>#2[i]%</unbreak> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.06],"2":[0.3],"3":[2]}}}',
    '{"head":{"name":"영웅의 우승자 월계관","icon":"IconRelic_123_1"},"hands":{"name":"영웅의 황금 완갑","icon":"IconRelic_123_2"},"body":{"name":"영웅의 용맹한 황금 갑옷","icon":"IconRelic_123_3"},"feet":{"name":"영웅의 불을 쫓는 정강이 보호대","icon":"IconRelic_123_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '124',
    'poet-of-mourning-collapse',
    '망국을 애도하는 시인',
    'relic',
    '71041',
    '{"2":{"desc":"양자 속성 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터의 속도가 <unbreak>#6[i]%</unbreak> 감소한다. 전투 진입 전 장착한 캐릭터의 속도가 <unbreak>#2[i]</unbreak>/<unbreak>#3[i]</unbreak> 미만이면, 장착한 캐릭터의 치명타 확률이 <unbreak>#4[i]%</unbreak>/<unbreak>#5[i]%</unbreak> 증가한다. 해당 효과는 장착한 캐릭터의 기억 정령에게도 동시에 적용된다","params":{"1":[-0.08],"2":[110],"3":[95],"4":[0.2],"5":[0.32],"6":[0.08]}}}',
    '{"head":{"name":"시인의 딜 화관","icon":"IconRelic_124_1"},"hands":{"name":"시인의 귀금속 팔찌","icon":"IconRelic_124_2"},"body":{"name":"시인의 별 장식 치마","icon":"IconRelic_124_3"},"feet":{"name":"시인의 은 징 신발","icon":"IconRelic_124_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '125',
    'warrior-goddess-of-sun-and-thunder',
    '태양과 번개의 여전사',
    'relic',
    '71044',
    '{"2":{"desc":"속도 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.06]}},"4":{"desc":"장착한 캐릭터와 해당 캐릭터의 기억 정령이 장착한 캐릭터와 해당 캐릭터의 기억 정령을 제외한 아군에게 치유를 제공하면 장착한 캐릭터가 [단비]를 획득하며, 턴마다 최대 1회 발동한다, 지속 시간: <unbreak>#3[i]</unbreak>턴. 장착한 캐릭터가 [단비] 보유 시 속도가 <unbreak>#1[i]%</unbreak> 증가하고, 모든 아군의 치명타 피해가 <unbreak>#2[i]%</unbreak> 증가하며, 해당 효과는 중첩할 수 없다","params":{"1":[0.06],"2":[0.15],"3":[2]}}}',
    '{"head":{"name":"여전사의 날개 달린 투구","icon":"IconRelic_125_1"},"hands":{"name":"여전사의 기창 건틀릿","icon":"IconRelic_125_2"},"body":{"name":"여전사의 여행 망토","icon":"IconRelic_125_3"},"feet":{"name":"여전사의 수훈 박차","icon":"IconRelic_125_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '126',
    'wavestrider-captain',
    '거친 파도를 헤치는 선장',
    'relic',
    '71045',
    '{"2":{"desc":"치명타 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.16]}},"4":{"desc":"장착한 캐릭터가 다른 아군의 스킬 목표가 되면 [조력]을 1스택 획득한다, 최대 중첩수: <unbreak>#1[i]</unbreak>스택. 필살기 발동 시 [조력]을 <unbreak>#1[i]</unbreak>스택 보유하면, 모든 [조력]을 소모해 장착한 캐릭터의 공격력을 <unbreak>#2[i]%</unbreak> 증가시킨다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[2],"2":[0.48],"3":[1]}}}',
    '{"head":{"name":"선장의 항해 모자","icon":"IconRelic_126_1"},"hands":{"name":"선장의 별빛 포획 아스트롤라베","icon":"IconRelic_126_2"},"body":{"name":"선장의 바람 망토","icon":"IconRelic_126_3"},"feet":{"name":"선장의 파도타기 부츠","icon":"IconRelic_126_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '127',
    'world-remaking-deliverer',
    '천지를 재창조한 구세주',
    'relic',
    '71048',
    '{"2":{"desc":"치명타 확률 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.08]}},"4":{"desc":"장착한 캐릭터가 일반 공격 또는 전투 스킬 발동 후, 장착한 캐릭터의 기억 정령이 필드에 있으면 장착한 캐릭터와 해당 캐릭터의 기억 정령의 HP 최대치가 <unbreak>#1[i]%</unbreak> 증가하고, 모든 아군이 가하는 피해가 <unbreak>#2[i]%</unbreak> 증가하며, 장착한 캐릭터가 다음 일반 공격 또는 전투 스킬을 발동한 후까지 지속된다","params":{"1":[0.24],"2":[0.15]}}}',
    '{"head":{"name":"구세주의 등정 후드","icon":"IconRelic_127_1"},"hands":{"name":"구세주의 보호 장갑","icon":"IconRelic_127_2"},"body":{"name":"구세주의 전승 전투복","icon":"IconRelic_127_3"},"feet":{"name":"구세주의 개간 부츠","icon":"IconRelic_127_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '128',
    'self-enshrouded-recluse',
    '별빛에 숨은 은둔자',
    'relic',
    '71049',
    '{"2":{"desc":"제공하는 실드량 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.1]}},"4":{"desc":"장착한 캐릭터가 제공하는 실드량이 <unbreak>#1[i]%</unbreak> 증가하고, 아군이 장착한 캐릭터가 제공한 실드 보유 시 치명타 피해가 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[0.15]}}}',
    '{"head":{"name":"은둔자의 챙 넓은 페도라","icon":"IconRelic_128_1"},"hands":{"name":"은둔자의 단정한 손목시계","icon":"IconRelic_128_2"},"body":{"name":"은둔자의 카멜색 재킷","icon":"IconRelic_128_3"},"feet":{"name":"은둔자의 스웨이드 신발","icon":"IconRelic_128_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '129',
    'ever-glorious-magical-girl',
    '빛나는 공훈의 마법 소녀',
    'relic',
    '71052',
    '{"2":{"desc":"치명타 피해 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.16]}},"4":{"desc":"장착한 캐릭터와 해당 캐릭터의 기억 정령이 가하는 환락 피해가 목표의 방어력을 <unbreak>#1[i]%</unbreak> 무시하고, 아군이 웃음 포인트를 누적 <unbreak>#2[i]</unbreak>pt 획득할 때마다 가하는 환락 피해가 추가로 목표의 방어력을 <unbreak>#3[i]%</unbreak> 무시한다, 최대 중첩수: <unbreak>#4[i]</unbreak>스택","params":{"1":[0.1],"2":[5],"3":[0.01],"4":[10]}}}',
    '{"head":{"name":"마법 소녀의 빛나는 훈장","icon":"IconRelic_129_1"},"hands":{"name":"마법 소녀의 수호 장갑","icon":"IconRelic_129_2"},"body":{"name":"마법 소녀의 댄스 전투복","icon":"IconRelic_129_3"},"feet":{"name":"마법 소녀의 계약 롱부츠","icon":"IconRelic_129_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '130',
    'diviner-of-distant-reach',
    '천명에 응해 먼 길을 떠난 점술가',
    'relic',
    '71053',
    '{"2":{"desc":"속도 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.06]}},"4":{"desc":"전투 진입 전, 장착한 캐릭터의 속도가 <unbreak>#1[i]</unbreak>/<unbreak>#2[i]</unbreak> 이상일 시 장착한 캐릭터의 치명타 확률이 <unbreak>#3[i]%</unbreak>/<unbreak>#4[i]%</unbreak> 증가한다. 장착한 캐릭터가 각 전투에서 처음으로 환락 스킬 발동 시 모든 아군의 환락도가 <unbreak>#5[i]%</unbreak> 증가하며, 해당 효과는 중첩되지 않는다","params":{"1":[120],"2":[160],"3":[0.1],"4":[0.18],"5":[0.1]}}}',
    '{"head":{"name":"점술가의 연산 옥조","icon":"IconRelic_130_1"},"hands":{"name":"점술가의 기계 의수","icon":"IconRelic_130_2"},"body":{"name":"점술가의 관천 성포","icon":"IconRelic_130_3"},"feet":{"name":"점술가의 등운화","icon":"IconRelic_130_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '131',
    'as-navigator-isee-sees-it',
    '별을 갈망하는 항법사 아집',
    'relic',
    '71056',
    '{"2":{"desc":"공격력 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.12]}},"4":{"desc":"장착한 캐릭터가 전투 진입 시/전투 스킬 발동 시, 전투 스킬과 필살기가 가하는 피해가 <unbreak>#1[i]%</unbreak> 증가한다, 최대 중첩수: <unbreak>#2[i]</unbreak>스택, 장착한 캐릭터의 턴 시작 시/필살기 발동 후, 해당 효과를 <unbreak>#3[i]</unbreak>스택 해제한다","params":{"1":[0.18],"2":[3],"3":[1]}}}',
    '{"head":{"name":"항법사의 심우주 망원경","icon":"IconRelic_131_1"},"hands":{"name":"항법사의 게임 주사위","icon":"IconRelic_131_2"},"body":{"name":"항법사의 성도 제복","icon":"IconRelic_131_3"},"feet":{"name":"항법사의 영원한 여정 부츠","icon":"IconRelic_131_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '132',
    'divine-querying-master-smith',
    '신공을 탐구하는 명장',
    'relic',
    '71057',
    '{"2":{"desc":"HP 최대치 <unbreak>#1[i]%</unbreak> 증가","params":{"1":[0.12]}},"4":{"desc":"장착한 캐릭터가 방어력 감소 상태의 적에게 가하는 치명타 피해가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터가 적에게 방어력 감소 상태를 부여하면 모든 아군은 [연소 촉진]을 획득한다, 지속 시간: <unbreak>#2[i]</unbreak>턴, 해당 효과는 중첩되지 않으며, [연소 촉진]을 보유한 아군은 가하는 피해가 <unbreak>#3[i]%</unbreak> 증가한다. 해당 효과는 장착한 캐릭터가 공격을 발동하면 다시 발동할 수 있다","params":{"1":[0.28],"2":[2],"3":[0.15]}}}',
    '{"head":{"name":"명장의 화염 짐승 안면 보호구","icon":"IconRelic_132_1"},"hands":{"name":"명장의 단철 보호 장갑","icon":"IconRelic_132_2"},"body":{"name":"명장의 방염 장인복","icon":"IconRelic_132_3"},"feet":{"name":"명장의 무애 중장화","icon":"IconRelic_132_4"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '301',
    'space-sealing-station',
    '우주 봉인 정거장',
    'planar',
    '71012',
    '{"2":{"desc":"장착한 캐릭터의 공격력이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 속도가 <unbreak>#2[i]</unbreak> 이상일 경우 공격력이 추가로 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[120],"3":[0.12]}}}',
    '{"sphere":{"name":"「헤르타」의 우주정거장","icon":"IconRelic_301_5"},"rope":{"name":"「헤르타」의 궤적","icon":"IconRelic_301_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '302',
    'fleet-of-the-ageless',
    '불로인의 선주',
    'planar',
    '71013',
    '{"2":{"desc":"장착한 캐릭터의 HP 최대치가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 속도가 <unbreak>#2[i]</unbreak> 이상일 경우 모든 아군의 공격력이 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[120],"3":[0.08]}}}',
    '{"sphere":{"name":"나부 선주의 천외 누선","icon":"IconRelic_302_5"},"rope":{"name":"나부 선주의 불멸의 거목 가지","icon":"IconRelic_302_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '303',
    'pan-cosmic-commercial-enterprise',
    '범은하 상사',
    'planar',
    '71014',
    '{"2":{"desc":"장착한 캐릭터의 효과 명중이 <unbreak>#1[i]%</unbreak> 증가한다. 동시에 장착한 캐릭터의 현재 효과 명중 <unbreak>#2[i]%</unbreak>만큼의 공격력이 증가하며 최대 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.1],"2":[0.25],"3":[0.25]}}}',
    '{"sphere":{"name":"컴퍼니의 거대 기관 본부","icon":"IconRelic_303_5"},"rope":{"name":"컴퍼니의 무역 항로","icon":"IconRelic_303_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '304',
    'belobog-of-the-architects',
    '축성가의 벨로보그',
    'planar',
    '71015',
    '{"2":{"desc":"장착한 캐릭터의 방어력이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 효과 명중이 <unbreak>#2[i]%</unbreak> 이상일 경우 방어력이 추가로 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.15],"2":[0.5],"3":[0.15]}}}',
    '{"sphere":{"name":"벨로보그 보존의 보루","icon":"IconRelic_304_5"},"rope":{"name":"벨로보그 철위대 방어선","icon":"IconRelic_304_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '305',
    'celestial-differentiator',
    '천체 차분기관',
    'planar',
    '71016',
    '{"2":{"desc":"장착한 캐릭터의 치명타 피해가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 치명타 피해가 <unbreak>#2[i]%</unbreak> 이상일 경우, 전투 진입 후 장착한 캐릭터의 치명타 확률이 <unbreak>#3[i]%</unbreak> 증가한다. 첫 공격 발동 후까지 지속하고 종료된다","params":{"1":[0.16],"2":[1.2],"3":[0.6]}}}',
    '{"sphere":{"name":"스크루별의 기계 태양","icon":"IconRelic_305_5"},"rope":{"name":"스크루별의 행성 고리","icon":"IconRelic_305_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '306',
    'inert-salsotto',
    '회전을 멈춘 살소토',
    'planar',
    '71017',
    '{"2":{"desc":"장착한 캐릭터의 치명타 확률이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 치명타 확률이 <unbreak>#2[i]%</unbreak> 이상일 경우, 필살기와 추가 공격이 가하는 피해가 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.08],"2":[0.5],"3":[0.15]}}}',
    '{"sphere":{"name":"살소토의 움직이는 도시","icon":"IconRelic_306_5"},"rope":{"name":"살소토의 명암 경계선","icon":"IconRelic_306_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '307',
    'talia-kingdom-of-banditry',
    '도적국 탈리아',
    'planar',
    '71018',
    '{"2":{"desc":"장착한 캐릭터의 격파 특수효과가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 속도가 <unbreak>#2[i]</unbreak> 이상일 경우 격파 특수효과가 추가로 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.16],"2":[145],"3":[0.2]}}}',
    '{"sphere":{"name":"탈리아의 네일스크랩 타운","icon":"IconRelic_307_5"},"rope":{"name":"탈리아의 벗겨진 전선","icon":"IconRelic_307_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '308',
    'sprightly-vonwacq',
    '생명의 바커 공',
    'planar',
    '71019',
    '{"2":{"desc":"장착한 캐릭터의 에너지 회복효율이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 속도가 <unbreak>#2[i]</unbreak> 이상일 경우 전투 진입 시 즉시 행동 게이지가 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.05],"2":[120],"3":[0.4]}}}',
    '{"sphere":{"name":"바커 공의 탄생의 섬","icon":"IconRelic_308_5"},"rope":{"name":"바커 공의 섬 둘레 해안","icon":"IconRelic_308_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '309',
    'rutilant-arena',
    '뭇별 경기장',
    'planar',
    '71022',
    '{"2":{"desc":"장착한 캐릭터의 치명타 확률이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 치명타 확률이 <unbreak>#2[i]%</unbreak> 이상일 경우, 일반 공격과 전투 스킬이 가하는 피해가 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.08],"2":[0.7],"3":[0.2]}}}',
    '{"sphere":{"name":"타이키얀 레이저 구장","icon":"IconRelic_309_5"},"rope":{"name":"타이키얀 아크라이트 트랙","icon":"IconRelic_309_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '310',
    'broken-keel',
    '부러진 용골',
    'planar',
    '71023',
    '{"2":{"desc":"장착한 캐릭터의 효과 저항이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 효과 저항이 <unbreak>#2[i]%</unbreak> 이상일 경우 모든 아군의 치명타 피해가 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.1],"2":[0.3],"3":[0.1]}}}',
    '{"sphere":{"name":"인스머스의 고래 낙하선","icon":"IconRelic_310_5"},"rope":{"name":"인스머스의 해진 밧줄","icon":"IconRelic_310_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '311',
    'firmament-frontline-glamoth',
    '창공 전선 그라모스',
    'planar',
    '71026',
    '{"2":{"desc":"장착한 캐릭터의 공격력이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 속도가 <unbreak>#2[i]</unbreak>/<unbreak>#3[i]</unbreak> 이상일 경우, 장착한 캐릭터가 가하는 피해가 <unbreak>#4[i]%</unbreak>/<unbreak>#5[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[135],"3":[160],"4":[0.12],"5":[0.18]}}}',
    '{"sphere":{"name":"그라모스의 철기 군단","icon":"IconRelic_311_5"},"rope":{"name":"그라모스의 적막한 묘비","icon":"IconRelic_311_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '312',
    'penacony-land-of-the-dreams',
    '꿈의 땅 페나코니',
    'planar',
    '71027',
    '{"2":{"desc":"장착한 캐릭터의 에너지 회복효율이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터와 같은 속성의 파티 내 다른 아군 캐릭터가 주는 피해가 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.05],"2":[0.1]}}}',
    '{"sphere":{"name":"페나코니의 그랜드 호텔","icon":"IconRelic_312_5"},"rope":{"name":"페나코니의 꿈을 좇는 궤도","icon":"IconRelic_312_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '313',
    'sigonia-the-unclaimed-desolation',
    '주인 없는 황폐한 별 츠가냐',
    'planar',
    '71030',
    '{"2":{"desc":"장착한 캐릭터의 치명타 확률이 <unbreak>#3[i]%</unbreak> 증가한다. 적이 처치될 시 장착한 캐릭터의 치명타 피해가 <unbreak>#1[i]%</unbreak> 증가한다. 최대 중첩수: <unbreak>#2[i]</unbreak>","params":{"1":[0.04],"2":[10],"3":[0.04]}}}',
    '{"sphere":{"name":"츠가냐의 지모신 침상","icon":"IconRelic_313_5"},"rope":{"name":"츠가냐의 윤회 매듭","icon":"IconRelic_313_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '314',
    'izumo-gensei-and-takama-divine-realm',
    '이즈모 현세와 타카마 신국',
    'planar',
    '71031',
    '{"2":{"desc":"장착한 캐릭터의 공격력이 <unbreak>#1[i]%</unbreak> 증가한다. 전투 진입 시 장착한 캐릭터와 운명의 길이 같은 동료가 최소 1명 존재할 경우, 장착한 캐릭터의 치명타 확률이 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[0.12]}}}',
    '{"sphere":{"name":"이즈모의 재앙신","icon":"IconRelic_314_5"},"rope":{"name":"이즈모의 종시일도","icon":"IconRelic_314_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '315',
    'duran-dynasty-of-running-wolves',
    '질주하는 늑대의 도람 왕조',
    'planar',
    '71034',
    '{"2":{"desc":"아군 캐릭터가 추가 공격을 발동하면 장착한 캐릭터는 [공훈]을 1스택 획득한다, 최대 중첩수: <unbreak>#1[i]</unbreak>스택. [공훈] 스택당 장착한 캐릭터의 추가 공격으로 가하는 피해가 <unbreak>#2[i]%</unbreak> 증가하고, <unbreak>#1[i]</unbreak>스택까지 중첩 시 장착한 캐릭터의 치명타 피해가 추가로 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[5],"2":[0.05],"3":[0.25]}}}',
    '{"sphere":{"name":"도람의 궁륭 금빛 장막","icon":"IconRelic_315_5"},"rope":{"name":"도람의 기계짐승 고삐","icon":"IconRelic_315_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '316',
    'forge-of-the-kalpagni-lantern',
    '겁화 연등의 연마궁',
    'planar',
    '71035',
    '{"2":{"desc":"장착한 캐릭터의 속도가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터가 화염 속성 약점을 보유한 적을 명중하면 격파 특수효과가 <unbreak>#2[i]%</unbreak> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.06],"2":[0.4],"3":[1]}}}',
    '{"sphere":{"name":"연마궁의 연등 심지","icon":"IconRelic_316_5"},"rope":{"name":"연마궁의 염륜 비단","icon":"IconRelic_316_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '317',
    'lushaka-the-sunken-seas',
    '바다에 잠긴 루샤카',
    'planar',
    '71036',
    '{"2":{"desc":"장착한 캐릭터의 에너지 회복효율이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터가 파티 편성의 첫 번째 캐릭터가 아닐 경우, 파티 편성의 첫 번째 캐릭터의 공격력이 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.05],"2":[0.12]}}}',
    '{"sphere":{"name":"루샤카의 물에 잠긴 도시","icon":"IconRelic_317_5"},"rope":{"name":"루샤카의 쌍생 항로","icon":"IconRelic_317_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '318',
    'the-wondrous-bananamusement-park',
    '기묘한 나나 낙원',
    'planar',
    '71037',
    '{"2":{"desc":"장착한 캐릭터의 치명타 피해가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터가 소환한 목표가 있을 시, 치명타 피해가 추가로 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.16],"2":[0.32]}}}',
    '{"sphere":{"name":"나나 낙원의 중앙 광장","icon":"IconRelic_318_5"},"rope":{"name":"나나 낙원의 밈 케이블","icon":"IconRelic_318_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '319',
    'bone-collection-s-serene-demesne',
    '고요한 습골지',
    'planar',
    '71042',
    '{"2":{"desc":"장착한 캐릭터의 HP 최대치가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 HP 최대치가 <unbreak>#2[i]</unbreak>pt 이상일 경우, 장착한 캐릭터와 해당 캐릭터의 기억 정령의 치명타 피해가 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[5000],"3":[0.28]}}}',
    '{"sphere":{"name":"아이도니아의 무명 비석","icon":"IconRelic_319_5"},"rope":{"name":"아이도니아의 저승 뼈사슬","icon":"IconRelic_319_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '320',
    'giant-tree-of-rapt-brooding',
    '사색하는 거목',
    'planar',
    '71043',
    '{"2":{"desc":"장착한 캐릭터의 속도가 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 속도가 <unbreak>#2[i]</unbreak>/<unbreak>#3[i]</unbreak> 이상일 경우, 장착한 캐릭터와 해당 캐릭터의 기억 정령의 치유량이 <unbreak>#4[i]%</unbreak>/<unbreak>#5[i]%</unbreak> 증가한다","params":{"1":[0.06],"2":[135],"3":[180],"4":[0.12],"5":[0.2]}}}',
    '{"sphere":{"name":"깨달음의 나무 정원의 사색하는 거대한 가지","icon":"IconRelic_320_5"},"rope":{"name":"깨달음의 나무 정원의 지식을 잇는 잎사귀 길","icon":"IconRelic_320_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '321',
    'arcadia-of-woven-dreams',
    '꿈을 엮는 요정의 낙원',
    'planar',
    '71046',
    '{"2":{"desc":"파티 내 현재 필드에 있는 아군의 수가 4명이 아닐 경우, 아군 수가 1명 많을/적을 때마다 장착한 캐릭터와 해당 캐릭터의 기억 정령이 가하는 피해가 <unbreak>#1[i]%</unbreak>/<unbreak>#2[i]%</unbreak> 증가한다, 최대 중첩수: <unbreak>#3[i]</unbreak>/<unbreak>#4[i]</unbreak>스택","params":{"1":[0.09],"2":[0.12],"3":[4],"4":[3]}}}',
    '{"sphere":{"name":"비밀 미궁의 평온한 꿈 나무집","icon":"IconRelic_321_5"},"rope":{"name":"비밀 미궁의 소원 피리","icon":"IconRelic_321_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '322',
    'revelry-by-the-sea',
    '즐거움에 취한 바다의 일각',
    'planar',
    '71047',
    '{"2":{"desc":"장착한 캐릭터의 공격력이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 공격력이 <unbreak>#2[i]</unbreak>/<unbreak>#3[i]</unbreak> 이상일 시 가하는 지속 피해가 추가로 <unbreak>#4[i]%</unbreak>/<unbreak>#5[i]%</unbreak> 증가한다","params":{"1":[0.12],"2":[2400],"3":[3600],"4":[0.12],"5":[0.24]}}}',
    '{"sphere":{"name":"노래의 해안의 암초섬 등대","icon":"IconRelic_322_5"},"rope":{"name":"노래의 해안의 선율길","icon":"IconRelic_322_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '323',
    'amphoreus-the-eternal-land',
    '영원의 땅 앰포리어스',
    'planar',
    '71050',
    '{"2":{"desc":"장착한 캐릭터의 치명타 확률이 <unbreak>#1[i]%</unbreak> 증가한다. 장착한 캐릭터의 기억 정령이 필드에 있을 시 모든 아군의 속도가 <unbreak>#2[i]%</unbreak> 증가하며, 해당 효과는 중첩할 수 없다","params":{"1":[0.08],"2":[0.08]}}}',
    '{"sphere":{"name":"앰포리어스의 서풍의 끝","icon":"IconRelic_323_5"},"rope":{"name":"앰포리어스의 영원한 시편","icon":"IconRelic_323_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '324',
    'tengoku-livestream',
    '텐고쿠@라이브스트리밍',
    'planar',
    '71051',
    '{"2":{"desc":"장착한 캐릭터의 치명타 피해가 <unbreak>#1[i]%</unbreak> 증가하며, 같은 턴에 전투 스킬 포인트를 <unbreak>#2[i]</unbreak>pt 이상 소모 시 추가로 장착한 캐릭터의 치명타 피해가 <unbreak>#3[i]%</unbreak> 증가한다, 지속 시간: <unbreak>#4[i]</unbreak>턴","params":{"1":[0.16],"2":[3],"3":[0.32],"4":[3]}}}',
    '{"sphere":{"name":"라이브 스트리밍의 수많은 창","icon":"IconRelic_324_5"},"rope":{"name":"라이브 스트리밍의 끊김 없는 채팅","icon":"IconRelic_324_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '325',
    'punklorde-stage-zero',
    '0호 스테이지 펑크 로드',
    'planar',
    '71054',
    '{"2":{"desc":"장착한 캐릭터의 환락도가 <unbreak>#1[i]%</unbreak> 증가한다. 전투 중 환락도가 처음으로 <unbreak>#2[i]%</unbreak>/<unbreak>#3[i]%</unbreak> 도달 시, 장착한 캐릭터의 치명타 피해가 <unbreak>#4[i]%</unbreak>/<unbreak>#5[i]%</unbreak> 증가한다","params":{"1":[0.08],"2":[0.4],"3":[0.8],"4":[0.2],"5":[0.32]}}}',
    '{"sphere":{"name":"펑크 로드의 네온 시티","icon":"IconRelic_325_5"},"rope":{"name":"펑크 로드의 데이터 홍수","icon":"IconRelic_325_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '326',
    'city-of-converging-stars',
    '천 개의 별이 모인 도시',
    'planar',
    '71055',
    '{"2":{"desc":"장착한 캐릭터가 추가 공격 발동 시, 공격력이 <unbreak>#1[i]%</unbreak> 증가한다, 지속 시간: <unbreak>#2[i]</unbreak>턴. 적이 처치될 시, 모든 아군이 이번 전투에서 치명타 피해가 <unbreak>#3[i]%</unbreak> 증가하며, 해당 효과는 중첩되지 않는다","params":{"1":[0.24],"2":[2],"3":[0.12]}}}',
    '{"sphere":{"name":"아스트로폴리스 미디어 본부","icon":"IconRelic_326_5"},"rope":{"name":"아스트로폴리스 사원증","icon":"IconRelic_326_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '327',
    'fallen-star-anchorage',
    '추락한 별의 출항지',
    'planar',
    '71058',
    '{"2":{"desc":"장착한 캐릭터의 치명타 확률이 <unbreak>#1[i]%</unbreak> 증가한다. 전투 진입 시, 장착한 캐릭터와 다른 동료 1명이 모두 개척 동행 캐릭터일 경우, 장착한 캐릭터의 치명타 피해가 <unbreak>#2[i]%</unbreak> 증가한다","params":{"1":[0.08],"2":[0.32]}}}',
    '{"sphere":{"name":"출항지의 좌초된 열차","icon":"IconRelic_327_5"},"rope":{"name":"출항지의 꿈이 깃든 은하 궤도","icon":"IconRelic_327_6"}}'
);

INSERT INTO relic_sets (id, slug, name, type, icon, effects, pieces) VALUES (
    '328',
    'cosmic-life-sciences-institute',
    '우주 생명과학연구원',
    'planar',
    '71059',
    '{"2":{"desc":"전투 진입 시 장착한 캐릭터의 에너지 최대치가 <unbreak>#1[i]</unbreak>pt 이상일 경우, 초과한 에너지 최대치 1pt당 장착한 캐릭터가 가하는 피해가 <unbreak>#2[f1]%</unbreak> 증가하며, 최대 <unbreak>#3[i]%</unbreak> 증가한다","params":{"1":[200],"2":[0.0019999999],"3":[0.32]}}}',
    '{"sphere":{"name":"생명과학연구원의 중심 시냅스","icon":"IconRelic_328_5"},"rope":{"name":"생명과학연구원의 외곽 파이프라인","icon":"IconRelic_328_6"}}'
);
