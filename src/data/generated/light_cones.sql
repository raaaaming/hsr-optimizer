-- 자동 생성 파일. 직접 고치지 마라.
-- 생성: scripts/sync-gamedata.js (출처: sr.yatta.moe)
-- 생성 시각: 2026-07-17T11:20:32.050Z
-- 광추 수: 165
--
-- passive는 해석 전 원본이다. 실제 스탯 보너스는 src/data/lightConePassives.js를 봐라.

DELETE FROM light_cones;

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20000',
    'arrows',
    '화살촉',
    'hunt',
    3,
    '{"base":{"hp":38.4,"atk":14.4,"def":12},"growth":{"hp":5.76,"atk":2.16,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":17.28,"def":14.4},{"hp":107.52,"atk":40.32,"def":33.6},{"hp":168.96,"atk":63.36,"def":52.8},{"hp":230.4,"atk":86.4,"def":72},{"hp":291.84,"atk":109.44,"def":91.2},{"hp":353.28,"atk":132.48,"def":110.4}]}',
    '{"name":"위기","desc":"전투 시작 시 장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴","params":{"1":[0.12,0.15,0.18,0.21,0.24],"2":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20001',
    'cornucopia',
    '풍작',
    'abundance',
    3,
    '{"base":{"hp":43.2,"atk":12,"def":12},"growth":{"hp":6.48,"atk":1.8,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":14.4,"def":14.4},{"hp":120.96,"atk":33.6,"def":33.6},{"hp":190.08,"atk":52.8,"def":52.8},{"hp":259.2,"atk":72,"def":72},{"hp":328.32,"atk":91.2,"def":91.2},{"hp":397.44,"atk":110.4,"def":110.4}]}',
    '{"name":"번성","desc":"장착한 캐릭터가 전투 스킬과 필살기 발동 시 치유량이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다","params":{"1":[0.12,0.15,0.18,0.21,0.24]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20002',
    'collapsing-sky',
    '천경',
    'destruction',
    3,
    '{"base":{"hp":38.4,"atk":16.8,"def":9},"growth":{"hp":5.76,"atk":2.52,"def":1.35},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":20.16,"def":10.8},{"hp":107.52,"atk":47.04,"def":25.2},{"hp":168.96,"atk":73.92,"def":39.6},{"hp":230.4,"atk":100.8,"def":54},{"hp":291.84,"atk":127.68,"def":68.4},{"hp":353.28,"atk":154.56,"def":82.8}]}',
    '{"name":"파멸","desc":"장착한 캐릭터가 일반 공격과 전투 스킬로 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다","params":{"1":[0.2,0.25,0.3,0.35,0.4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20003',
    'amber',
    '앰버',
    'preservation',
    3,
    '{"base":{"hp":38.4,"atk":12,"def":15},"growth":{"hp":5.76,"atk":1.8,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":14.4,"def":18},{"hp":107.52,"atk":33.6,"def":42},{"hp":168.96,"atk":52.8,"def":66},{"hp":230.4,"atk":72,"def":90},{"hp":291.84,"atk":91.2,"def":114},{"hp":353.28,"atk":110.4,"def":138}]}',
    '{"name":"정체","desc":"장착한 캐릭터의 방어력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터의 현재 HP 백분율이 <unbreak>#2[i]%</unbreak> 미만일 경우 방어력이 추가로 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[0.5,0.5,0.5,0.5,0.5],"3":[0.16,0.2,0.24,0.28,0.32]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20004',
    'void',
    '그윽',
    'nihility',
    3,
    '{"base":{"hp":38.4,"atk":14.4,"def":12},"growth":{"hp":5.76,"atk":2.16,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":17.28,"def":14.4},{"hp":107.52,"atk":40.32,"def":33.6},{"hp":168.96,"atk":63.36,"def":52.8},{"hp":230.4,"atk":86.4,"def":72},{"hp":291.84,"atk":109.44,"def":91.2},{"hp":353.28,"atk":132.48,"def":110.4}]}',
    '{"name":"타락","desc":"전투 시작 시 장착한 캐릭터의 효과 명중이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴","params":{"1":[0.2,0.25,0.3,0.35,0.4],"2":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20005',
    'chorus',
    '합창',
    'harmony',
    3,
    '{"base":{"hp":38.4,"atk":14.4,"def":12},"growth":{"hp":5.76,"atk":2.16,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":17.28,"def":14.4},{"hp":107.52,"atk":40.32,"def":33.6},{"hp":168.96,"atk":63.36,"def":52.8},{"hp":230.4,"atk":86.4,"def":72},{"hp":291.84,"atk":109.44,"def":91.2},{"hp":353.28,"atk":132.48,"def":110.4}]}',
    '{"name":"협력","desc":"전투 진입 후 모든 아군의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 같은 유형의 스킬 효과는 중복 적용되지 않는다","params":{"1":[0.08,0.09,0.1,0.11,0.12]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20006',
    'data-bank',
    '아카이브',
    'erudition',
    3,
    '{"base":{"hp":33.6,"atk":16.8,"def":12},"growth":{"hp":5.04,"atk":2.52,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":40.32,"atk":20.16,"def":14.4},{"hp":94.08,"atk":47.04,"def":33.6},{"hp":147.84,"atk":73.92,"def":52.8},{"hp":201.6,"atk":100.8,"def":72},{"hp":255.36,"atk":127.68,"def":91.2},{"hp":309.12,"atk":154.56,"def":110.4}]}',
    '{"name":"박식","desc":"장착한 캐릭터가 필살기로 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다","params":{"1":[0.28,0.35,0.42,0.49,0.56]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20007',
    'darting-arrow',
    '시위를 떠난 화살',
    'hunt',
    3,
    '{"base":{"hp":33.6,"atk":16.8,"def":12},"growth":{"hp":5.04,"atk":2.52,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":40.32,"atk":20.16,"def":14.4},{"hp":94.08,"atk":47.04,"def":33.6},{"hp":147.84,"atk":73.92,"def":52.8},{"hp":201.6,"atk":100.8,"def":72},{"hp":255.36,"atk":127.68,"def":91.2},{"hp":309.12,"atk":154.56,"def":110.4}]}',
    '{"name":"호각","desc":"장착한 캐릭터는 적을 처치한 후 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴","params":{"1":[0.24,0.3,0.36,0.42,0.48],"2":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20008',
    'fine-fruit',
    '알찬 열매',
    'abundance',
    3,
    '{"base":{"hp":43.2,"atk":14.4,"def":9},"growth":{"hp":6.48,"atk":2.16,"def":1.35},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":17.28,"def":10.8},{"hp":120.96,"atk":40.32,"def":25.2},{"hp":190.08,"atk":63.36,"def":39.6},{"hp":259.2,"atk":86.4,"def":54},{"hp":328.32,"atk":109.44,"def":68.4},{"hp":397.44,"atk":132.48,"def":82.8}]}',
    '{"name":"감미","desc":"전투 시작 시 즉시 모든 아군의 에너지를 <color=#f29e38ff><unbreak>#1[i]</unbreak></color>pt 회복한다","params":{"1":[6,7.5,9,10.5,12]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20009',
    'shattered-home',
    '무너진 행복',
    'destruction',
    3,
    '{"base":{"hp":38.4,"atk":16.8,"def":9},"growth":{"hp":5.76,"atk":2.52,"def":1.35},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":20.16,"def":10.8},{"hp":107.52,"atk":47.04,"def":25.2},{"hp":168.96,"atk":73.92,"def":39.6},{"hp":230.4,"atk":100.8,"def":54},{"hp":291.84,"atk":127.68,"def":68.4},{"hp":353.28,"atk":154.56,"def":82.8}]}',
    '{"name":"토벌","desc":"장착한 캐릭터는 현재 HP 백분율이 <unbreak>#1[i]%</unbreak>보다 높은 적을 공격할 경우 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[0.5,0.5,0.5,0.5,0.5],"2":[0.2,0.25,0.3,0.35,0.4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20010',
    'defense',
    '수비',
    'preservation',
    3,
    '{"base":{"hp":43.2,"atk":12,"def":12},"growth":{"hp":6.48,"atk":1.8,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":14.4,"def":14.4},{"hp":120.96,"atk":33.6,"def":33.6},{"hp":190.08,"atk":52.8,"def":52.8},{"hp":259.2,"atk":72,"def":72},{"hp":328.32,"atk":91.2,"def":91.2},{"hp":397.44,"atk":110.4,"def":110.4}]}',
    '{"name":"부흥","desc":"장착한 캐릭터가 필살기 발동 시 HP 최대치 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color>만큼의 HP를 회복한다","params":{"1":[0.18,0.21,0.24,0.27,0.3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20011',
    'loop',
    '심연의 고리',
    'nihility',
    3,
    '{"base":{"hp":38.4,"atk":14.4,"def":12},"growth":{"hp":5.76,"atk":2.16,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":17.28,"def":14.4},{"hp":107.52,"atk":40.32,"def":33.6},{"hp":168.96,"atk":63.36,"def":52.8},{"hp":230.4,"atk":86.4,"def":72},{"hp":291.84,"atk":109.44,"def":91.2},{"hp":353.28,"atk":132.48,"def":110.4}]}',
    '{"name":"추궁","desc":"장착한 캐릭터가 감속 상태의 적에게 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다","params":{"1":[0.24,0.3,0.36,0.42,0.48]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20012',
    'meshing-cogs',
    '맞물린 톱니',
    'harmony',
    3,
    '{"base":{"hp":38.4,"atk":14.4,"def":12},"growth":{"hp":5.76,"atk":2.16,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":17.28,"def":14.4},{"hp":107.52,"atk":40.32,"def":33.6},{"hp":168.96,"atk":63.36,"def":52.8},{"hp":230.4,"atk":86.4,"def":72},{"hp":291.84,"atk":109.44,"def":91.2},{"hp":353.28,"atk":132.48,"def":110.4}]}',
    '{"name":"속결","desc":"장착한 캐릭터가 공격 발동 혹은 피격 후 추가로 에너지를 <color=#f29e38ff><unbreak>#1[i]</unbreak></color>pt 회복한다. 해당 효과는 단일 턴 내 중복 발동되지 않는다","params":{"1":[4,5,6,7,8]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20013',
    'passkey',
    '영험한 열쇠',
    'erudition',
    3,
    '{"base":{"hp":33.6,"atk":16.8,"def":12},"growth":{"hp":5.04,"atk":2.52,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":40.32,"atk":20.16,"def":14.4},{"hp":94.08,"atk":47.04,"def":33.6},{"hp":147.84,"atk":73.92,"def":52.8},{"hp":201.6,"atk":100.8,"def":72},{"hp":255.36,"atk":127.68,"def":91.2},{"hp":309.12,"atk":154.56,"def":110.4}]}',
    '{"name":"깨달음","desc":"장착한 캐릭터가 전투 스킬 발동 후 추가로 에너지를 <color=#f29e38ff><unbreak>#1[i]</unbreak></color>pt 회복한다. 해당 효과는 단일 턴 내 중복 발동되지 않는다","params":{"1":[8,9,10,11,12]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20014',
    'adversarial',
    '대립',
    'hunt',
    3,
    '{"base":{"hp":33.6,"atk":16.8,"def":12},"growth":{"hp":5.04,"atk":2.52,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":40.32,"atk":20.16,"def":14.4},{"hp":94.08,"atk":47.04,"def":33.6},{"hp":147.84,"atk":73.92,"def":52.8},{"hp":201.6,"atk":100.8,"def":72},{"hp":255.36,"atk":127.68,"def":91.2},{"hp":309.12,"atk":154.56,"def":110.4}]}',
    '{"name":"연맹","desc":"장착한 캐릭터는 적을 처치한 후 속도가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴","params":{"1":[0.1,0.12,0.14,0.16,0.18],"2":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20015',
    'multiplication',
    '증식',
    'abundance',
    3,
    '{"base":{"hp":43.2,"atk":14.4,"def":9},"growth":{"hp":6.48,"atk":2.16,"def":1.35},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":17.28,"def":10.8},{"hp":120.96,"atk":40.32,"def":25.2},{"hp":190.08,"atk":63.36,"def":39.6},{"hp":259.2,"atk":86.4,"def":54},{"hp":328.32,"atk":109.44,"def":68.4},{"hp":397.44,"atk":132.48,"def":82.8}]}',
    '{"name":"풍요의 백성","desc":"장착한 캐릭터가 일반 공격 발동 후 다음번 행동 게이지가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다","params":{"1":[0.12,0.14,0.16,0.18,0.2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20016',
    'mutual-demise',
    '전멸',
    'destruction',
    3,
    '{"base":{"hp":38.4,"atk":16.8,"def":9},"growth":{"hp":5.76,"atk":2.52,"def":1.35},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":20.16,"def":10.8},{"hp":107.52,"atk":47.04,"def":25.2},{"hp":168.96,"atk":73.92,"def":39.6},{"hp":230.4,"atk":100.8,"def":54},{"hp":291.84,"atk":127.68,"def":68.4},{"hp":353.28,"atk":154.56,"def":82.8}]}',
    '{"name":"군단","desc":"장착한 캐릭터의 현재 HP 백분율이 <unbreak>#1[i]%</unbreak> 미만일 경우 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[0.8,0.8,0.8,0.8,0.8],"2":[0.12,0.15,0.18,0.21,0.24]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20017',
    'pioneering',
    '강토 개척',
    'preservation',
    3,
    '{"base":{"hp":43.2,"atk":12,"def":12},"growth":{"hp":6.48,"atk":1.8,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":14.4,"def":14.4},{"hp":120.96,"atk":33.6,"def":33.6},{"hp":190.08,"atk":52.8,"def":52.8},{"hp":259.2,"atk":72,"def":72},{"hp":328.32,"atk":91.2,"def":91.2},{"hp":397.44,"atk":110.4,"def":110.4}]}',
    '{"name":"컴퍼니","desc":"장착한 캐릭터는 적의 약점을 격파할 시 자신 HP 최대치 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color>만큼의 HP를 회복한다","params":{"1":[0.12,0.14,0.16,0.18,0.2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20018',
    'hidden-shadow',
    '숨은 그림자',
    'nihility',
    3,
    '{"base":{"hp":38.4,"atk":14.4,"def":12},"growth":{"hp":5.76,"atk":2.16,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":17.28,"def":14.4},{"hp":107.52,"atk":40.32,"def":33.6},{"hp":168.96,"atk":63.36,"def":52.8},{"hp":230.4,"atk":86.4,"def":72},{"hp":291.84,"atk":109.44,"def":91.2},{"hp":353.28,"atk":132.48,"def":110.4}]}',
    '{"name":"장치","desc":"전투 스킬 발동 후, 장착한 캐릭터의 다음 일반 공격 1회는 적에게 자신 공격력 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color>만큼의 추가 피해를 가한다","params":{"1":[0.6,0.75,0.9,1.05,1.2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20019',
    'mediation',
    '어울림',
    'harmony',
    3,
    '{"base":{"hp":38.4,"atk":14.4,"def":12},"growth":{"hp":5.76,"atk":2.16,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":17.28,"def":14.4},{"hp":107.52,"atk":40.32,"def":33.6},{"hp":168.96,"atk":63.36,"def":52.8},{"hp":230.4,"atk":86.4,"def":72},{"hp":291.84,"atk":109.44,"def":91.2},{"hp":353.28,"atk":132.48,"def":110.4}]}',
    '{"name":"가족","desc":"전투 진입 시, 모든 아군의 속도가 <color=#f29e38ff><unbreak>#1[i]</unbreak></color>pt 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴","params":{"1":[12,14,16,18,20],"2":[1,1,1,1,1]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20020',
    'sagacity',
    '식견',
    'erudition',
    3,
    '{"base":{"hp":33.6,"atk":16.8,"def":12},"growth":{"hp":5.04,"atk":2.52,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":40.32,"atk":20.16,"def":14.4},{"hp":94.08,"atk":47.04,"def":33.6},{"hp":147.84,"atk":73.92,"def":52.8},{"hp":201.6,"atk":100.8,"def":72},{"hp":255.36,"atk":127.68,"def":91.2},{"hp":309.12,"atk":154.56,"def":110.4}]}',
    '{"name":"천재","desc":"장착한 캐릭터가 필살기 발동 시 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴","params":{"1":[0.24,0.3,0.36,0.42,0.48],"2":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20021',
    'shadowburn',
    '불타는 그림자',
    'remembrance',
    3,
    '{"base":{"hp":38.4,"atk":14.4,"def":12},"growth":{"hp":5.76,"atk":2.16,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":17.28,"def":14.4},{"hp":107.52,"atk":40.32,"def":33.6},{"hp":168.96,"atk":63.36,"def":52.8},{"hp":230.4,"atk":86.4,"def":72},{"hp":291.84,"atk":109.44,"def":91.2},{"hp":353.28,"atk":132.48,"def":110.4}]}',
    '{"name":"미화","desc":"장착한 캐릭터가 처음으로 기억 정령 소환 시 전투 스킬 포인트를 <unbreak>#1[i]</unbreak>pt 회복하고 자신의 에너지를 <color=#f29e38ff><unbreak>#2[i]</unbreak></color>pt 회복한다","params":{"1":[1,1,1,1,1],"2":[12,14,16,18,20]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20022',
    'reminiscence',
    '추억 회상',
    'remembrance',
    3,
    '{"base":{"hp":28.8,"atk":19.2,"def":12},"growth":{"hp":4.32,"atk":2.88,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":34.56,"atk":23.04,"def":14.4},{"hp":80.64,"atk":53.76,"def":33.6},{"hp":126.72,"atk":84.48,"def":52.8},{"hp":172.8,"atk":115.2,"def":72},{"hp":218.88,"atk":145.92,"def":91.2},{"hp":264.96,"atk":176.64,"def":110.4}]}',
    '{"name":"잠에 들다","desc":"기억 정령의 턴 시작 시 장착한 캐릭터와 기억 정령이 각각 [회고]를 1스택 획득하며, 스택마다 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다, 최대 중첩수: <unbreak>#2[i]</unbreak>스택. 기억 정령이 사라질 시 장착한 캐릭터와 기억 정령의 [회고]가 해제된다","params":{"1":[0.08,0.09,0.1,0.11,0.12],"2":[4,4,4,4,4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20023',
    'sneering',
    '비웃음',
    'elation',
    3,
    '{"base":{"hp":33.6,"atk":16.8,"def":12},"growth":{"hp":5.04,"atk":2.52,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":40.32,"atk":20.16,"def":14.4},{"hp":94.08,"atk":47.04,"def":33.6},{"hp":147.84,"atk":73.92,"def":52.8},{"hp":201.6,"atk":100.8,"def":72},{"hp":255.36,"atk":127.68,"def":91.2},{"hp":309.12,"atk":154.56,"def":110.4}]}',
    '{"name":"자유로운 환락","desc":"아하 타임 발동 시 장착한 캐릭터의 환락도가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하며, 아하 타임이 종료될 때까지 지속된다","params":{"1":[0.16,0.2,0.24,0.28,0.32]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '20024',
    'lingering-tear',
    '눈물의 흔적',
    'elation',
    3,
    '{"base":{"hp":38.4,"atk":14.4,"def":12},"growth":{"hp":5.76,"atk":2.16,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":17.28,"def":14.4},{"hp":107.52,"atk":40.32,"def":33.6},{"hp":168.96,"atk":63.36,"def":52.8},{"hp":230.4,"atk":86.4,"def":72},{"hp":291.84,"atk":109.44,"def":91.2},{"hp":353.28,"atk":132.48,"def":110.4}]}',
    '{"name":"애도","desc":"보유한 웃음 포인트가 <unbreak>#1[i]</unbreak>pt 이상일 시, 장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[10,10,10,10,10],"2":[0.2,0.25,0.3,0.35,0.4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21000',
    'post-op-conversation',
    '수술 후의 대화',
    'abundance',
    4,
    '{"base":{"hp":48,"atk":19.2,"def":15},"growth":{"hp":7.2,"atk":2.88,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":23.04,"def":18},{"hp":134.4,"atk":53.76,"def":42},{"hp":211.2,"atk":84.48,"def":66},{"hp":288,"atk":115.2,"def":90},{"hp":364.8,"atk":145.92,"def":114},{"hp":441.6,"atk":176.64,"def":138}]}',
    '{"name":"상호 치유","desc":"장착한 캐릭터의 에너지 회복효율이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 필살기 발동 시 치유량이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[0.08,0.1,0.12,0.14,0.16],"2":[0.12,0.15,0.18,0.21,0.24]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21001',
    'good-night-and-sleep-well',
    '밤 인사와 잠든 얼굴',
    'nihility',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"고된 자","desc":"적이 디버프 효과 1개를 보유할 때마다 장착한 캐릭터가 대상에게 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 최대 중첩수: <unbreak>#2[i]</unbreak>스택. 해당 효과는 지속 피해에도 적용된다","params":{"1":[0.12,0.15,0.18,0.21,0.24],"2":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21002',
    'day-one-of-my-new-life',
    '여생의 첫날',
    'preservation',
    4,
    '{"base":{"hp":43.2,"atk":16.8,"def":21},"growth":{"hp":6.48,"atk":2.52,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":20.16,"def":25.2},{"hp":120.96,"atk":47.04,"def":58.8},{"hp":190.08,"atk":73.92,"def":92.4},{"hp":259.2,"atk":100.8,"def":126},{"hp":328.32,"atk":127.68,"def":159.6},{"hp":397.44,"atk":154.56,"def":193.2}]}',
    '{"name":"지금 이 순간","desc":"장착한 캐릭터의 방어력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 전투 진입 후 모든 아군의 모든 속성 저항이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 같은 유형의 스킬 효과는 중복 적용되지 않는다","params":{"1":[0.16,0.18,0.2,0.22,0.24],"2":[0.08,0.09,0.1,0.11,0.12]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21003',
    'only-silence-remains',
    '침묵만이',
    'hunt',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"기록","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 필드 위의 적이 2명 이하일 경우, 장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[0.12,0.15,0.18,0.21,0.24]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21004',
    'memories-of-the-past',
    '기억 속 모습',
    'harmony',
    4,
    '{"base":{"hp":43.2,"atk":19.2,"def":18},"growth":{"hp":6.48,"atk":2.88,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":23.04,"def":21.6},{"hp":120.96,"atk":53.76,"def":50.4},{"hp":190.08,"atk":84.48,"def":79.2},{"hp":259.2,"atk":115.2,"def":108},{"hp":328.32,"atk":145.92,"def":136.8},{"hp":397.44,"atk":176.64,"def":165.6}]}',
    '{"name":"오래된 사진","desc":"장착한 캐릭터의 격파 특수효과가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 공격 발동 후 추가로 에너지가 <color=#f29e38ff><unbreak>#2[i]</unbreak></color>pt 증가한다. 해당 효과는 단일 턴 내 중복 발동되지 않는다","params":{"1":[0.28,0.35,0.42,0.49,0.56],"2":[4,5,6,7,8]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21005',
    'the-moles-welcome-you',
    '두더지파가 환영해',
    'destruction',
    4,
    '{"base":{"hp":48,"atk":21.6,"def":12},"growth":{"hp":7.2,"atk":3.24,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":25.92,"def":14.4},{"hp":134.4,"atk":60.48,"def":33.6},{"hp":211.2,"atk":95.04,"def":52.8},{"hp":288,"atk":129.6,"def":72},{"hp":364.8,"atk":164.16,"def":91.2},{"hp":441.6,"atk":198.72,"def":110.4}]}',
    '{"name":"기묘한 모험","desc":"장착한 캐릭터가 일반 공격, 전투 스킬 혹은 필살기를 발동하여 적을 공격하면 각 1스택의 「장난기」를 획득하며 스택마다 장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다","params":{"1":[0.12,0.15,0.18,0.21,0.24]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21006',
    'the-birth-of-the-self',
    '「나」의 탄생',
    'erudition',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"그림 속 소녀","desc":"장착한 캐릭터의 추가 공격으로 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 해당 적의 현재 HP 백분율이 <unbreak>#2[i]%</unbreak> 이하일 경우, 추가 공격으로 가하는 피해가 추가로 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다","params":{"1":[0.24,0.3,0.36,0.42,0.48],"2":[0.5,0.5,0.5,0.5,0.5],"3":[0.24,0.3,0.36,0.42,0.48]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21007',
    'shared-feeling',
    '같은 심정',
    'abundance',
    4,
    '{"base":{"hp":43.2,"atk":19.2,"def":18},"growth":{"hp":6.48,"atk":2.88,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":23.04,"def":21.6},{"hp":120.96,"atk":53.76,"def":50.4},{"hp":190.08,"atk":84.48,"def":79.2},{"hp":259.2,"atk":115.2,"def":108},{"hp":328.32,"atk":145.92,"def":136.8},{"hp":397.44,"atk":176.64,"def":165.6}]}',
    '{"name":"치료와 수리","desc":"장착한 캐릭터의 치유량이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 전투 스킬 발동 시 모든 아군의 에너지가 <color=#f29e38ff><unbreak>#2[f1]</unbreak></color>pt 회복된다","params":{"1":[0.1,0.125,0.15,0.175,0.2],"2":[2,2.5,3,3.5,4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21008',
    'eyes-of-the-prey',
    '사냥감의 시선',
    'nihility',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"자신감","desc":"장착한 캐릭터의 효과 명중이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 동시에 가하는 지속 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[0.2,0.25,0.3,0.35,0.4],"2":[0.24,0.3,0.36,0.42,0.48]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21009',
    'landau-s-choice',
    '랜도의 선택',
    'preservation',
    4,
    '{"base":{"hp":43.2,"atk":19.2,"def":18},"growth":{"hp":6.48,"atk":2.88,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":23.04,"def":21.6},{"hp":120.96,"atk":53.76,"def":50.4},{"hp":190.08,"atk":84.48,"def":79.2},{"hp":259.2,"atk":115.2,"def":108},{"hp":328.32,"atk":145.92,"def":136.8},{"hp":397.44,"atk":176.64,"def":165.6}]}',
    '{"name":"빠른 세월","desc":"장착한 캐릭터가 피격될 확률이 증가하고 받는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 감소한다","params":{"1":[2,2,2,2,2],"2":[0.16,0.18,0.2,0.22,0.24]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21010',
    'swordplay',
    '논검',
    'hunt',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"각자의 답","desc":"장착한 캐릭터가 동일한 적을 여러 회 명중 후 매번 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 해당 효과 최대 중첩수: <unbreak>#2[i]</unbreak>스택. 공격 목표에 변화가 생길 경우 현재 버프 효과가 해제된다","params":{"1":[0.08,0.1,0.12,0.14,0.16],"2":[5,5,5,5,5]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21011',
    'planetary-rendezvous',
    '행성과의 만남',
    'harmony',
    4,
    '{"base":{"hp":48,"atk":19.2,"def":15},"growth":{"hp":7.2,"atk":2.88,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":23.04,"def":18},{"hp":134.4,"atk":53.76,"def":42},{"hp":211.2,"atk":84.48,"def":66},{"hp":288,"atk":115.2,"def":90},{"hp":364.8,"atk":145.92,"def":114},{"hp":441.6,"atk":176.64,"def":138}]}',
    '{"name":"출발","desc":"전투 진입 후 아군이 장착한 캐릭터와 동일한 속성의 피해를 가할 시 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다","params":{"1":[0.12,0.15,0.18,0.21,0.24]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21012',
    'a-secret-vow',
    '비밀 맹세',
    'destruction',
    4,
    '{"base":{"hp":48,"atk":21.6,"def":12},"growth":{"hp":7.2,"atk":3.24,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":25.92,"def":14.4},{"hp":134.4,"atk":60.48,"def":33.6},{"hp":211.2,"atk":95.04,"def":52.8},{"hp":288,"atk":129.6,"def":72},{"hp":364.8,"atk":164.16,"def":91.2},{"hp":441.6,"atk":198.72,"def":110.4}]}',
    '{"name":"젖 먹던 힘까지","desc":"장착한 캐릭터가 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하며, 동시에 현재 HP 백분율이 장착한 캐릭터 자신의 HP 백분율 이상인 적에게 가하는 피해가 추가로 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[0.2,0.25,0.3,0.35,0.4],"2":[0.2,0.25,0.3,0.35,0.4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21013',
    'make-the-world-clamor',
    '세상을 진정시키지 마',
    'erudition',
    4,
    '{"base":{"hp":38.4,"atk":21.6,"def":18},"growth":{"hp":5.76,"atk":3.24,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":25.92,"def":21.6},{"hp":107.52,"atk":60.48,"def":50.4},{"hp":168.96,"atk":95.04,"def":79.2},{"hp":230.4,"atk":129.6,"def":108},{"hp":291.84,"atk":164.16,"def":136.8},{"hp":353.28,"atk":198.72,"def":165.6}]}',
    '{"name":"소리의 힘","desc":"장착한 캐릭터가 전투 진입 시 에너지가 즉시 <color=#f29e38ff><unbreak>#2[i]</unbreak></color>pt 회복하고, 대상의 필살기가 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다","params":{"1":[0.32,0.4,0.48,0.56,0.64],"2":[20,23,26,29,32]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21014',
    'perfect-timing',
    '알맞은 타이밍',
    'abundance',
    4,
    '{"base":{"hp":43.2,"atk":19.2,"def":18},"growth":{"hp":6.48,"atk":2.88,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":23.04,"def":21.6},{"hp":120.96,"atk":53.76,"def":50.4},{"hp":190.08,"atk":84.48,"def":79.2},{"hp":259.2,"atk":115.2,"def":108},{"hp":328.32,"atk":145.92,"def":136.8},{"hp":397.44,"atk":176.64,"def":165.6}]}',
    '{"name":"굴절된 시선","desc":"장착한 캐릭터의 효과 저항이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 장착한 캐릭터 치유량이 증가한다. 증가 수치는 효과 저항의 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color>만큼이다. 치유량은 최대 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[0.33,0.36,0.39,0.42,0.45],"3":[0.15,0.18,0.21,0.24,0.27]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21015',
    'resolution-shines-as-pearls-of-sweat',
    '땀방울처럼 빛나는 결심',
    'nihility',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"뒤돌아봄","desc":"장착한 캐릭터는 적 명중 시 만일 해당 목표가 [함락] 상태가 아닐 경우 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color>의 기본 확률로 대상을 [함락] 상태에 빠트린다. [함락] 상태의 적은 방어력이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 감소한다. 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.6,0.7,0.8,0.9,1],"2":[0.12,0.13,0.14,0.15,0.16],"3":[1,1,1,1,1]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21016',
    'trend-of-the-universal-market',
    '우주 시장 동향',
    'preservation',
    4,
    '{"base":{"hp":48,"atk":16.8,"def":18},"growth":{"hp":7.2,"atk":2.52,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":20.16,"def":21.6},{"hp":134.4,"atk":47.04,"def":50.4},{"hp":211.2,"atk":73.92,"def":79.2},{"hp":288,"atk":100.8,"def":108},{"hp":364.8,"atk":127.68,"def":136.8},{"hp":441.6,"atk":154.56,"def":165.6}]}',
    '{"name":"새로운 개편","desc":"장착한 캐릭터의 방어력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 피격된 후 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color>의 기본 확률로 적이 연소 상태에 빠진다. 턴마다 장착한 캐릭터 방어력 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color>만큼의 지속 피해를 준다. 지속 시간: <unbreak>#4[i]</unbreak>턴","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[1,1.05,1.1,1.15,1.2],"3":[0.4,0.5,0.6,0.7,0.8],"4":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21017',
    'subscribe-for-more',
    '팔로우를 부탁해!',
    'hunt',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"좋아요도 안 하고 가려고?","desc":"장착한 캐릭터의 일반 공격 혹은 전투 스킬이 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하며, 장착한 캐릭터의 현재 에너지가 에너지 최대치일 시, 해당 효과는 추가로 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[0.24,0.3,0.36,0.42,0.48],"2":[0.24,0.3,0.36,0.42,0.48]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21018',
    'dance-dance-dance',
    '댄스! 댄스! 댄스!',
    'harmony',
    4,
    '{"base":{"hp":43.2,"atk":19.2,"def":18},"growth":{"hp":6.48,"atk":2.88,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":23.04,"def":21.6},{"hp":120.96,"atk":53.76,"def":50.4},{"hp":190.08,"atk":84.48,"def":79.2},{"hp":259.2,"atk":115.2,"def":108},{"hp":328.32,"atk":145.92,"def":136.8},{"hp":397.44,"atk":176.64,"def":165.6}]}',
    '{"name":"멈출 수 없어!","desc":"장착한 캐릭터가 필살기 발동 후 모든 아군의 행동 게이지가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다","params":{"1":[0.16,0.18,0.2,0.22,0.24]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21019',
    'under-the-blue-sky',
    '푸른 하늘 아래',
    'destruction',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"파도치는 따스한 이삭","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터는 적을 처치한 후 치명타 확률이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[0.12,0.15,0.18,0.21,0.24],"3":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21020',
    'geniuses-repose',
    '천재들의 휴식',
    'erudition',
    4,
    '{"base":{"hp":38.4,"atk":21.6,"def":18},"growth":{"hp":5.76,"atk":3.24,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":25.92,"def":21.6},{"hp":107.52,"atk":60.48,"def":50.4},{"hp":168.96,"atk":95.04,"def":79.2},{"hp":230.4,"atk":129.6,"def":108},{"hp":291.84,"atk":164.16,"def":136.8},{"hp":353.28,"atk":198.72,"def":165.6}]}',
    '{"name":"각자 제자리에","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터는 적을 처치한 후 치명타 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[0.24,0.3,0.36,0.42,0.48],"3":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21021',
    'quid-pro-quo',
    '등가교환',
    'abundance',
    4,
    '{"base":{"hp":43.2,"atk":19.2,"def":18},"growth":{"hp":6.48,"atk":2.88,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":23.04,"def":21.6},{"hp":120.96,"atk":53.76,"def":50.4},{"hp":190.08,"atk":84.48,"def":79.2},{"hp":259.2,"atk":115.2,"def":108},{"hp":328.32,"atk":145.92,"def":136.8},{"hp":397.44,"atk":176.64,"def":165.6}]}',
    '{"name":"편안함","desc":"장착한 캐릭터의 턴 시작 시 랜덤으로 현재 에너지 백분율이 <unbreak>#1[i]%</unbreak> 미만인 다른 아군의 에너지를 <color=#f29e38ff><unbreak>#2[i]</unbreak></color>pt 회복한다","params":{"1":[0.5,0.5,0.5,0.5,0.5],"2":[8,10,12,14,16]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21022',
    'fermata',
    '페르마타',
    'nihility',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"쉼표","desc":"장착한 캐릭터의 격파 특수효과가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 감전이나 풍화 상태의 적에게 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 해당 효과는 지속 피해에도 적용된다","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[0.16,0.2,0.24,0.28,0.32]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21023',
    'we-are-wildfire',
    '우리는 와일드 파이어',
    'preservation',
    4,
    '{"base":{"hp":33.6,"atk":21.6,"def":21},"growth":{"hp":5.04,"atk":3.24,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":40.32,"atk":25.92,"def":25.2},{"hp":94.08,"atk":60.48,"def":58.8},{"hp":147.84,"atk":95.04,"def":92.4},{"hp":201.6,"atk":129.6,"def":126},{"hp":255.36,"atk":164.16,"def":159.6},{"hp":309.12,"atk":198.72,"def":193.2}]}',
    '{"name":"눈물을 글썽이는 사람","desc":"전투 시작 시 모든 아군이 받는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 감소한다. 지속 시간: <unbreak>#3[i]</unbreak>턴. 동시에 즉시 모든 아군이 각자 손실한 HP <color=#f29e38ff><unbreak>#1[i]%</unbreak></color>만큼의 HP를 회복한다","params":{"1":[0.3,0.35,0.4,0.45,0.5],"2":[0.08,0.1,0.12,0.14,0.16],"3":[5,5,5,5,5]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21024',
    'river-flows-in-spring',
    '움트는 봄물',
    'hunt',
    4,
    '{"base":{"hp":38.4,"atk":21.6,"def":18},"growth":{"hp":5.76,"atk":3.24,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":25.92,"def":21.6},{"hp":107.52,"atk":60.48,"def":50.4},{"hp":168.96,"atk":95.04,"def":79.2},{"hp":230.4,"atk":129.6,"def":108},{"hp":291.84,"atk":164.16,"def":136.8},{"hp":353.28,"atk":198.72,"def":165.6}]}',
    '{"name":"남은 추위 몰아내기","desc":"전투 진입 후 장착한 캐릭터의 속도가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 피해를 받은 후 해당 효과는 사라지며 다음 턴이 종료되면 해당 효과는 회복된다","params":{"1":[0.08,0.09,0.1,0.11,0.12],"2":[0.12,0.15,0.18,0.21,0.24]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21025',
    'past-and-future',
    '과거와 미래',
    'harmony',
    4,
    '{"base":{"hp":43.2,"atk":19.2,"def":18},"growth":{"hp":6.48,"atk":2.88,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":23.04,"def":21.6},{"hp":120.96,"atk":53.76,"def":50.4},{"hp":190.08,"atk":84.48,"def":79.2},{"hp":259.2,"atk":115.2,"def":108},{"hp":328.32,"atk":145.92,"def":136.8},{"hp":397.44,"atk":176.64,"def":165.6}]}',
    '{"name":"옛날 연","desc":"장착한 캐릭터가 전투 스킬 발동 후 다음에 행동하는 다른 아군이 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#2[i]</unbreak>턴","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[1,1,1,1,1]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21026',
    'woof-walk-time',
    '멍! 산책 시간!',
    'destruction',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"튀어!","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 연소나 열상 상태의 적에게 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 해당 효과는 지속 피해에도 적용된다","params":{"1":[0.1,0.125,0.15,0.175,0.2],"2":[0.16,0.2,0.24,0.28,0.32]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21027',
    'the-seriousness-of-breakfast',
    '느낌 있는 아침 식사 루틴',
    'erudition',
    4,
    '{"base":{"hp":38.4,"atk":21.6,"def":18},"growth":{"hp":5.76,"atk":3.24,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":25.92,"def":21.6},{"hp":107.52,"atk":60.48,"def":50.4},{"hp":168.96,"atk":95.04,"def":79.2},{"hp":230.4,"atk":129.6,"def":108},{"hp":291.84,"atk":164.16,"def":136.8},{"hp":353.28,"atk":198.72,"def":165.6}]}',
    '{"name":"각자 위치로","desc":"장착한 캐릭터가 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 적 1기를 처치할 때마다, 장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 해당 효과 최대 중첩수: <unbreak>#3[i]</unbreak>스택","params":{"1":[0.12,0.15,0.18,0.21,0.24],"2":[0.04,0.05,0.06,0.07,0.08],"3":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21028',
    'warmth-shortens-cold-nights',
    '따듯한 밤은 길지 않고',
    'abundance',
    4,
    '{"base":{"hp":48,"atk":16.8,"def":18},"growth":{"hp":7.2,"atk":2.52,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":20.16,"def":21.6},{"hp":134.4,"atk":47.04,"def":50.4},{"hp":211.2,"atk":73.92,"def":79.2},{"hp":288,"atk":100.8,"def":108},{"hp":364.8,"atk":127.68,"def":136.8},{"hp":441.6,"atk":154.56,"def":165.6}]}',
    '{"name":"작은 등불","desc":"장착한 캐릭터의 HP 최대치가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 일반 공격 혹은 전투 스킬 발동 후 HP를 각자 HP 최대치 <color=#f29e38ff><unbreak>#2[f1]%</unbreak></color> 만큼 회복시킨다","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[0.02,0.025,0.03,0.035,0.04]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21029',
    'we-will-meet-again',
    '훗날 기약',
    'nihility',
    4,
    '{"base":{"hp":38.4,"atk":24,"def":15},"growth":{"hp":5.76,"atk":3.6,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":28.8,"def":18},{"hp":107.52,"atk":67.2,"def":42},{"hp":168.96,"atk":105.6,"def":66},{"hp":230.4,"atk":144,"def":90},{"hp":291.84,"atk":182.4,"def":114},{"hp":353.28,"atk":220.8,"def":138}]}',
    '{"name":"교섭 같은 교전","desc":"장착한 캐릭터가 일반 공격 혹은 전투 스킬 발동 후 임의의 피격된 적 1기에게 자신의 공격력 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 만큼의 추가 피해를 준다","params":{"1":[0.48,0.6,0.72,0.84,0.96]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21030',
    'this-is-me',
    '이게 바로 나야!',
    'preservation',
    4,
    '{"base":{"hp":38.4,"atk":16.8,"def":24},"growth":{"hp":5.76,"atk":2.52,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":20.16,"def":28.8},{"hp":107.52,"atk":47.04,"def":67.2},{"hp":168.96,"atk":73.92,"def":105.6},{"hp":230.4,"atk":100.8,"def":144},{"hp":291.84,"atk":127.68,"def":182.4},{"hp":353.28,"atk":154.56,"def":220.8}]}',
    '{"name":"지평","desc":"장착한 캐릭터의 방어력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터는 필살기 발동 시 가하는 피해량이 증가하고, 증가 수치는 자신 방어력의 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color>만큼이다. 해당 효과는 필살기를 발동할 때마다 적 1기당 1회만 적용된다","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[0.6,0.75,0.9,1.05,1.2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21031',
    'return-to-darkness',
    '또다시 저승으로',
    'hunt',
    4,
    '{"base":{"hp":38.4,"atk":24,"def":15},"growth":{"hp":5.76,"atk":3.6,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":28.8,"def":18},{"hp":107.52,"atk":67.2,"def":42},{"hp":168.96,"atk":105.6,"def":66},{"hp":230.4,"atk":144,"def":90},{"hp":291.84,"atk":182.4,"def":114},{"hp":353.28,"atk":220.8,"def":138}]}',
    '{"name":"용솟음","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 치명타 발동 후 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color>의 고정 확률로 피격된 적이 보유한 버프 효과를 1개 해제한다. 해당 효과는 턴마다 1회만 발동할 수 있다","params":{"1":[0.12,0.15,0.18,0.21,0.24],"2":[0.16,0.2,0.24,0.28,0.32]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21032',
    'carve-the-moon-weave-the-clouds',
    '누월재운의 뜻',
    'harmony',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"비밀","desc":"전투 시작 시 및 장착한 캐릭터 턴 시작 시 랜덤으로 1개의 효과가 적용된다. 해당 효과 적용 시 이전 효과를 대체하며 이전과 중복되지 않는다. 효과 종류: 모든 아군의 공격력 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가/모든 아군의 치명타 피해 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가/모든 아군의 에너지 회복효율 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가. 같은 유형의 효과는 중첩되지 않으며 장착한 캐릭터가 전투 불능 상태에 빠지면 해제된다","params":{"1":[0.1,0.125,0.15,0.175,0.2],"2":[0.12,0.15,0.18,0.21,0.24],"3":[0.06,0.075,0.09,0.105,0.12]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21033',
    'nowhere-to-run',
    '도망칠 곳은 없다',
    'destruction',
    4,
    '{"base":{"hp":43.2,"atk":24,"def":12},"growth":{"hp":6.48,"atk":3.6,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":28.8,"def":14.4},{"hp":120.96,"atk":67.2,"def":33.6},{"hp":190.08,"atk":105.6,"def":52.8},{"hp":259.2,"atk":144,"def":72},{"hp":328.32,"atk":182.4,"def":91.2},{"hp":397.44,"atk":220.8,"def":110.4}]}',
    '{"name":"곤경","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터는 적을 처치할 때 자신의 공격력 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color>만큼의 HP를 회복한다","params":{"1":[0.24,0.3,0.36,0.42,0.48],"2":[0.12,0.15,0.18,0.21,0.24]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21034',
    'today-is-another-peaceful-day',
    '오늘도 평화로운 하루',
    'erudition',
    4,
    '{"base":{"hp":38.4,"atk":24,"def":15},"growth":{"hp":5.76,"atk":3.6,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":28.8,"def":18},{"hp":107.52,"atk":67.2,"def":42},{"hp":168.96,"atk":105.6,"def":66},{"hp":230.4,"atk":144,"def":90},{"hp":291.84,"atk":182.4,"def":114},{"hp":353.28,"atk":220.8,"def":138}]}',
    '{"name":"폭풍전야","desc":"전투 진입 후 장착한 캐릭터의 에너지 최대치에 따라 장착한 캐릭터가 가하는 피해가 증가한다: 에너지 1pt당 <color=#f29e38ff><unbreak>#1[f2]%</unbreak></color> 증가. 최대 <unbreak>#2[i]</unbreak>pt까지 계산한다","params":{"1":[0.0019999999,0.0025000002,0.0029999998,0.0035,0.0039999997],"2":[160,160,160,160,160]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21035',
    'what-is-real',
    '무엇이 진실인가',
    'abundance',
    4,
    '{"base":{"hp":48,"atk":19.2,"def":15},"growth":{"hp":7.2,"atk":2.88,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":23.04,"def":18},{"hp":134.4,"atk":53.76,"def":42},{"hp":211.2,"atk":84.48,"def":66},{"hp":288,"atk":115.2,"def":90},{"hp":364.8,"atk":145.92,"def":114},{"hp":441.6,"atk":176.64,"def":138}]}',
    '{"name":"가설","desc":"장착한 캐릭터의 격파 특수효과가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 일반 공격 발동 후, 장착한 캐릭터는 HP 최대치의 <color=#f29e38ff><unbreak>#2[f1]%</unbreak></color>+<unbreak>#3[i]</unbreak>pt만큼 HP를 회복한다","params":{"1":[0.24,0.3,0.36,0.42,0.48],"2":[0.02,0.025,0.03,0.035,0.04],"3":[800,800,800,800,800]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21036',
    'dreamville-adventure',
    '좋은꿈 마을 대모험',
    'harmony',
    4,
    '{"base":{"hp":43.2,"atk":19.2,"def":18},"growth":{"hp":6.48,"atk":2.88,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":23.04,"def":21.6},{"hp":120.96,"atk":53.76,"def":50.4},{"hp":190.08,"atk":84.48,"def":79.2},{"hp":259.2,"atk":115.2,"def":108},{"hp":328.32,"atk":145.92,"def":136.8},{"hp":397.44,"atk":176.64,"def":165.6}]}',
    '{"name":"단결","desc":"장착한 캐릭터가 일반 공격, 전투 스킬, 필살기 중 임의 유형의 스킬 발동 후 모든 아군에게 [동심]을 부여한다. [동심]은 아군의 상응하는 유형의 스킬이 가하는 피해를 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가시킬 수 있다. [동심] 효과는 장착한 캐릭터가 가장 최근 사용한 스킬 유형에만 효과가 적용되며, 중첩할 수 없다","params":{"1":[0.12,0.14,0.16,0.18,0.2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21037',
    'final-victor',
    '최후의 승자',
    'hunt',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"베팅","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 적에게 치명타를 가하면 [행운]을 1스택 획득한다. 최대 중첩수: <unbreak>#3[i]</unbreak>스택. [행운] 스택당 장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. [행운]은 장착한 캐릭터의 턴 종료 시 해제된다","params":{"1":[0.12,0.14,0.16,0.18,0.2],"2":[0.08,0.09,0.1,0.11,0.12],"3":[4,4,4,4,4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21038',
    'flames-afar',
    '불의 먼 곳에서',
    'destruction',
    4,
    '{"base":{"hp":48,"atk":21.6,"def":12},"growth":{"hp":7.2,"atk":3.24,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":25.92,"def":14.4},{"hp":134.4,"atk":60.48,"def":33.6},{"hp":211.2,"atk":95.04,"def":52.8},{"hp":288,"atk":129.6,"def":72},{"hp":364.8,"atk":164.16,"def":91.2},{"hp":441.6,"atk":198.72,"def":110.4}]}',
    '{"name":"폭연","desc":"장착한 캐릭터가 단일 공격에서 누적으로 잃은 HP가 최대 HP의 <unbreak>#1[i]%</unbreak>를 초과하거나, 자신이 단일 소모한 HP가 최대 HP의 <unbreak>#1[i]%</unbreak>를 초과할 시, 즉시 장착한 캐릭터 HP 최대치의 <unbreak>#3[i]%</unbreak>만큼 HP를 회복하고, 동시에 장착한 캐릭터가 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#4[i]</unbreak>턴. 해당 효과는 <unbreak>#5[i]</unbreak>턴마다 최대 1회 발동한다","params":{"1":[0.25,0.25,0.25,0.25,0.25],"2":[0.25,0.3125,0.375,0.4375,0.5],"3":[0.15,0.15,0.15,0.15,0.15],"4":[2,2,2,2,2],"5":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21039',
    'destiny-s-threads-forewoven',
    '운명의 실을 엮다',
    'preservation',
    4,
    '{"base":{"hp":43.2,"atk":16.8,"def":21},"growth":{"hp":6.48,"atk":2.52,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":20.16,"def":25.2},{"hp":120.96,"atk":47.04,"def":58.8},{"hp":190.08,"atk":73.92,"def":92.4},{"hp":259.2,"atk":100.8,"def":126},{"hp":328.32,"atk":127.68,"def":159.6},{"hp":397.44,"atk":154.56,"def":193.2}]}',
    '{"name":"간파","desc":"장착한 캐릭터의 효과 저항이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 방어력을 <unbreak>#2[i]</unbreak>pt 보유할 때마다 가하는 피해가 <color=#f29e38ff><unbreak>#3[f1]%</unbreak></color> 증가하며, 해당 효과는 최대 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color>까지 증가한다","params":{"1":[0.12,0.14,0.16,0.18,0.2],"2":[100,100,100,100,100],"3":[0.007999999,0.009,0.01,0.011,0.012],"4":[0.32,0.36,0.4,0.44,0.48]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21040',
    'the-day-the-cosmos-fell',
    '은하 함락의 날',
    'erudition',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"공략","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 공격 발동 후 피격된 적 2기 이상이 대응하는 약점 속성을 보유하고 있으면 장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.16,0.18,0.2,0.22,0.24],"2":[0.2,0.25,0.3,0.35,0.4],"3":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21041',
    'it-s-showtime',
    '쇼타임',
    'nihility',
    4,
    '{"base":{"hp":48,"atk":21.6,"def":12},"growth":{"hp":7.2,"atk":3.24,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":25.92,"def":14.4},{"hp":134.4,"atk":60.48,"def":33.6},{"hp":211.2,"atk":95.04,"def":52.8},{"hp":288,"atk":129.6,"def":72},{"hp":364.8,"atk":164.16,"def":91.2},{"hp":441.6,"atk":198.72,"def":110.4}]}',
    '{"name":"스스로 찾는 즐거움","desc":"장착한 캐릭터가 적에게 디버프 상태를 부여한 후 [트릭]을 1스택 획득한다. [트릭] 스택당 장착한 캐릭터가 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 최대 중첩수: <unbreak>#2[i]</unbreak>스택, 지속 시간: <unbreak>#3[i]</unbreak>턴. 장착한 캐릭터의 효과 명중이 <unbreak>#4[i]%</unbreak> 이상일 시, 공격력이 <color=#f29e38ff><unbreak>#5[i]%</unbreak></color> 증가한다","params":{"1":[0.06,0.07,0.08,0.09,0.1],"2":[3,3,3,3,3],"3":[1,1,1,1,1],"4":[0.8,0.8,0.8,0.8,0.8],"5":[0.2,0.24,0.28,0.32,0.36]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21042',
    'indelible-promise',
    '마음에 새긴 약속',
    'destruction',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"전승","desc":"장착한 캐릭터의 격파 특수효과가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 필살기 발동 시 치명타 확률이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.28,0.35,0.42,0.49,0.56],"2":[0.15,0.1875,0.225,0.2625,0.3],"3":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21043',
    'concert-for-two',
    '두 사람의 콘서트',
    'preservation',
    4,
    '{"base":{"hp":43.2,"atk":16.8,"def":21},"growth":{"hp":6.48,"atk":2.52,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":20.16,"def":25.2},{"hp":120.96,"atk":47.04,"def":58.8},{"hp":190.08,"atk":73.92,"def":92.4},{"hp":259.2,"atk":100.8,"def":126},{"hp":328.32,"atk":127.68,"def":159.6},{"hp":397.44,"atk":154.56,"def":193.2}]}',
    '{"name":"격려","desc":"장착한 캐릭터의 방어력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 필드 위에 실드를 보유한 캐릭터가 1명 있을 때마다 장착한 캐릭터가 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[0.04,0.05,0.06,0.07,0.08]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21044',
    'boundless-choreo',
    '끝없는 춤',
    'nihility',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"탐색","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 방어력 감소 혹은 감속 상태의 적에게 가하는 치명타 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[0.08,0.1,0.12,0.14,0.16],"2":[0.24,0.3,0.36,0.42,0.48]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21045',
    'after-the-charmony-fall',
    '조화가 침묵한 후',
    'erudition',
    4,
    '{"base":{"hp":38.4,"atk":21.6,"def":18},"growth":{"hp":5.76,"atk":3.24,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":25.92,"def":21.6},{"hp":107.52,"atk":60.48,"def":50.4},{"hp":168.96,"atk":95.04,"def":79.2},{"hp":230.4,"atk":129.6,"def":108},{"hp":291.84,"atk":164.16,"def":136.8},{"hp":353.28,"atk":198.72,"def":165.6}]}',
    '{"name":"적막","desc":"장착한 캐릭터의 격파 특수효과가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 필살기 발동 후 속도가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.28,0.35,0.42,0.49,0.56],"2":[0.08,0.1,0.12,0.14,0.16],"3":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21046',
    'poised-to-bloom',
    '피어나길 기다리는 꽃',
    'harmony',
    4,
    '{"base":{"hp":43.2,"atk":19.2,"def":18},"growth":{"hp":6.48,"atk":2.88,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":23.04,"def":21.6},{"hp":120.96,"atk":53.76,"def":50.4},{"hp":190.08,"atk":84.48,"def":79.2},{"hp":259.2,"atk":115.2,"def":108},{"hp":328.32,"atk":145.92,"def":136.8},{"hp":397.44,"atk":176.64,"def":165.6}]}',
    '{"name":"잃지도, 잊지도 않으리","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 전투 진입 시 운명의 길이 같은 아군 캐릭터가 2명 이상일 경우, 해당 캐릭터들의 치명타 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 같은 유형의 스킬 효과는 중복 적용되지 않는다","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[0.16,0.2,0.24,0.28,0.32]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21047',
    'shadowed-by-night',
    '그림자처럼 뒤따르는 밤',
    'hunt',
    4,
    '{"base":{"hp":38.4,"atk":21.6,"def":18},"growth":{"hp":5.76,"atk":3.24,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":25.92,"def":21.6},{"hp":107.52,"atk":60.48,"def":50.4},{"hp":168.96,"atk":95.04,"def":79.2},{"hp":230.4,"atk":129.6,"def":108},{"hp":291.84,"atk":164.16,"def":136.8},{"hp":353.28,"atk":198.72,"def":165.6}]}',
    '{"name":"은닉","desc":"장착한 캐릭터의 격파 특수효과가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 전투 진입 시 또는 격파 피해를 가한 후 속도가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴, 해당 효과는 턴마다 1회만 발동할 수 있다","params":{"1":[0.28,0.35,0.42,0.49,0.56],"2":[0.08,0.09,0.1,0.11,0.12],"3":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21048',
    'dream-s-montage',
    '꿈의 몽타주',
    'abundance',
    4,
    '{"base":{"hp":43.2,"atk":19.2,"def":18},"growth":{"hp":6.48,"atk":2.88,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":23.04,"def":21.6},{"hp":120.96,"atk":53.76,"def":50.4},{"hp":190.08,"atk":84.48,"def":79.2},{"hp":259.2,"atk":115.2,"def":108},{"hp":328.32,"atk":145.92,"def":136.8},{"hp":397.44,"atk":176.64,"def":165.6}]}',
    '{"name":"아카데믹 편집","desc":"장착한 캐릭터의 속도가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 약점 격파 상태의 적을 공격하면 에너지를 <color=#f29e38ff><unbreak>#2[f1]</unbreak></color>pt 회복하며, 해당 효과는 턴마다 최대 <unbreak>#3[i]</unbreak>회 발동한다","params":{"1":[0.08,0.09,0.1,0.11,0.12],"2":[3,3.5,4,4.5,5],"3":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21050',
    'victory-in-a-blink',
    '찰나에 결정되는 승리',
    'remembrance',
    4,
    '{"base":{"hp":38.4,"atk":21.6,"def":18},"growth":{"hp":5.76,"atk":3.24,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":25.92,"def":21.6},{"hp":107.52,"atk":60.48,"def":50.4},{"hp":168.96,"atk":95.04,"def":79.2},{"hp":230.4,"atk":129.6,"def":108},{"hp":291.84,"atk":164.16,"def":136.8},{"hp":353.28,"atk":198.72,"def":165.6}]}',
    '{"name":"최후의 일격","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하며, 장착한 캐릭터의 기억 정령이 아군에게 스킬 발동 시 모든 아군이 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.12,0.15,0.18,0.21,0.24],"2":[0.08,0.1,0.12,0.14,0.16],"3":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21051',
    'geniuses-greetings',
    '천재들의 안부 인사',
    'remembrance',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"축하해","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하며, 장착한 캐릭터가 필살기 발동 후 장착한 캐릭터와 기억 정령이 가하는 일반 공격 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[0.2,0.25,0.3,0.35,0.4],"3":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21052',
    'sweat-now-cry-less',
    '땀은 많이, 눈물은 적게',
    'remembrance',
    4,
    '{"base":{"hp":48,"atk":24,"def":9},"growth":{"hp":7.2,"atk":3.6,"def":1.35},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":28.8,"def":10.8},{"hp":134.4,"atk":67.2,"def":25.2},{"hp":211.2,"atk":105.6,"def":39.6},{"hp":288,"atk":144,"def":54},{"hp":364.8,"atk":182.4,"def":68.4},{"hp":441.6,"atk":220.8,"def":82.8}]}',
    '{"name":"와서 훈련해!","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하며, 장착한 캐릭터의 기억 정령이 필드에 있을 시 장착한 캐릭터와 기억 정령이 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[0.12,0.14,0.16,0.18,0.2],"2":[0.24,0.27,0.3,0.33,0.36]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21053',
    'journey-forever-peaceful',
    '언제나 여정이 평탄하기를',
    'preservation',
    4,
    '{"base":{"hp":48,"atk":16.8,"def":24},"growth":{"hp":7.2,"atk":2.52,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":20.16,"def":28.8},{"hp":134.4,"atk":47.04,"def":67.2},{"hp":211.2,"atk":73.92,"def":105.6},{"hp":288,"atk":100.8,"def":144},{"hp":364.8,"atk":127.68,"def":182.4},{"hp":441.6,"atk":154.56,"def":220.8}]}',
    '{"name":"달콤한 꿈","desc":"장착한 캐릭터가 제공하는 실드량이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 아군이 실드를 보유할 시 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[0.12,0.15,0.18,0.21,0.24],"2":[0.12,0.14,0.16,0.18,0.2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21054',
    'the-story-s-next-page',
    '이야기의 다음 페이지',
    'remembrance',
    4,
    '{"base":{"hp":48,"atk":16.8,"def":18},"growth":{"hp":7.2,"atk":2.52,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":20.16,"def":21.6},{"hp":134.4,"atk":47.04,"def":50.4},{"hp":211.2,"atk":73.92,"def":79.2},{"hp":288,"atk":100.8,"def":108},{"hp":364.8,"atk":127.68,"def":136.8},{"hp":441.6,"atk":154.56,"def":165.6}]}',
    '{"name":"작성","desc":"장착한 캐릭터의 HP 최대치가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터의 기억 정령이 공격하면 장착한 캐릭터와 기억 정령의 치유량이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[0.12,0.15,0.18,0.21,0.24],"3":[1,1,1,1,1]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21055',
    'unto-tomorrow-s-morrow',
    '내일의 내일이 올 때까지',
    'abundance',
    4,
    '{"base":{"hp":48,"atk":21.6,"def":18},"growth":{"hp":7.2,"atk":3.24,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":25.92,"def":21.6},{"hp":134.4,"atk":60.48,"def":50.4},{"hp":211.2,"atk":95.04,"def":79.2},{"hp":288,"atk":129.6,"def":108},{"hp":364.8,"atk":164.16,"def":136.8},{"hp":441.6,"atk":198.72,"def":165.6}]}',
    '{"name":"이별","desc":"장착한 캐릭터의 치유량이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 아군의 현재 HP 백분율이 <unbreak>#2[i]%</unbreak> 이상일 시 가하는 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다","params":{"1":[0.12,0.15,0.18,0.21,0.24],"2":[0.5,0.5,0.5,0.5,0.5],"3":[0.12,0.14,0.16,0.18,0.2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21056',
    'in-pursuit-of-the-wind',
    '바람을 쫓을 때',
    'harmony',
    4,
    '{"base":{"hp":48,"atk":21.6,"def":18},"growth":{"hp":7.2,"atk":3.24,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":25.92,"def":21.6},{"hp":134.4,"atk":60.48,"def":50.4},{"hp":211.2,"atk":95.04,"def":79.2},{"hp":288,"atk":129.6,"def":108},{"hp":364.8,"atk":164.16,"def":136.8},{"hp":441.6,"atk":198.72,"def":165.6}]}',
    '{"name":"허둥지둥","desc":"전투 진입 후 모든 아군이 가하는 격파 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 같은 유형의 스킬 효과는 중복 적용되지 않는다","params":{"1":[0.16,0.18,0.2,0.22,0.24]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21057',
    'the-flower-remembers',
    '꽃은 잊지 않는다',
    'remembrance',
    4,
    '{"base":{"hp":48,"atk":24,"def":15},"growth":{"hp":7.2,"atk":3.6,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":28.8,"def":18},{"hp":134.4,"atk":67.2,"def":42},{"hp":211.2,"atk":105.6,"def":66},{"hp":288,"atk":144,"def":90},{"hp":364.8,"atk":182.4,"def":114},{"hp":441.6,"atk":220.8,"def":138}]}',
    '{"name":"서로 의지하며","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터의 기억 정령이 가하는 치명타 피해가 추가로 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[0.24,0.28,0.32,0.36,0.4],"2":[0.24,0.3,0.36,0.42,0.48]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21058',
    'a-trail-of-bygone-blood',
    '과거의 핏자국',
    'destruction',
    4,
    '{"base":{"hp":48,"atk":24,"def":15},"growth":{"hp":7.2,"atk":3.6,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":28.8,"def":18},{"hp":134.4,"atk":67.2,"def":42},{"hp":211.2,"atk":105.6,"def":66},{"hp":288,"atk":144,"def":90},{"hp":364.8,"atk":182.4,"def":114},{"hp":441.6,"atk":220.8,"def":138}]}',
    '{"name":"살육","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 가하는 전투 스킬과 필살기 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[0.12,0.14,0.16,0.18,0.2],"2":[0.24,0.28,0.32,0.36,0.4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21060',
    'a-dream-scented-in-wheat',
    '밀 내음이 가득한 꿈',
    'erudition',
    4,
    '{"base":{"hp":43.2,"atk":24,"def":18},"growth":{"hp":6.48,"atk":3.6,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":28.8,"def":21.6},{"hp":120.96,"atk":67.2,"def":50.4},{"hp":190.08,"atk":105.6,"def":79.2},{"hp":259.2,"atk":144,"def":108},{"hp":328.32,"atk":182.4,"def":136.8},{"hp":397.44,"atk":220.8,"def":165.6}]}',
    '{"name":"동경","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 가하는 필살기와 추가 공격 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[0.12,0.14,0.16,0.18,0.2],"2":[0.24,0.28,0.32,0.36,0.4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21061',
    'holiday-thermae-escapade',
    '휴일의 목욕탕 대모험',
    'nihility',
    4,
    '{"base":{"hp":48,"atk":24,"def":15},"growth":{"hp":7.2,"atk":3.6,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":28.8,"def":18},{"hp":134.4,"atk":67.2,"def":42},{"hp":211.2,"atk":105.6,"def":66},{"hp":288,"atk":144,"def":90},{"hp":364.8,"atk":182.4,"def":114},{"hp":441.6,"atk":220.8,"def":138}]}',
    '{"name":"진정해","desc":"장착한 캐릭터가 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 공격 후 피격된 목표를 <unbreak>#2[i]%</unbreak>의 기본 확률로 취약 상태에 빠트리고 받는 피해를 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가시킨다, 지속 시간: <unbreak>#4[i]</unbreak>턴. 같은 유형의 효과는 중첩되지 않는다","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[1,1,1,1,1],"3":[0.1,0.115,0.13,0.145,0.16],"4":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21062',
    'see-you-at-the-end',
    '그 종착지에서 다시 만나자',
    'hunt',
    4,
    '{"base":{"hp":43.2,"atk":24,"def":18},"growth":{"hp":6.48,"atk":3.6,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":28.8,"def":21.6},{"hp":120.96,"atk":67.2,"def":50.4},{"hp":190.08,"atk":105.6,"def":79.2},{"hp":259.2,"atk":144,"def":108},{"hp":328.32,"atk":182.4,"def":136.8},{"hp":397.44,"atk":220.8,"def":165.6}]}',
    '{"name":"집착","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 가하는 전투 스킬과 추가 공격 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다","params":{"1":[0.24,0.28,0.32,0.36,0.4],"2":[0.24,0.28,0.32,0.36,0.4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21064',
    'mushy-shroomy-s-adventures',
    '슈룸 모험기',
    'elation',
    4,
    '{"base":{"hp":38.4,"atk":21.6,"def":18},"growth":{"hp":5.76,"atk":3.24,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":25.92,"def":21.6},{"hp":107.52,"atk":60.48,"def":50.4},{"hp":168.96,"atk":95.04,"def":79.2},{"hp":230.4,"atk":129.6,"def":108},{"hp":291.84,"atk":164.16,"def":136.8},{"hp":353.28,"atk":198.72,"def":165.6}]}',
    '{"name":"난투","desc":"장착한 캐릭터의 환락도가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 환락 스킬 발동 시, 모든 적이 받는 환락 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.12,0.14,0.16,0.18,0.2],"2":[0.06,0.07,0.08,0.09,0.1],"3":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '21065',
    'today-s-good-luck',
    '오늘의 행운',
    'elation',
    4,
    '{"base":{"hp":43.2,"atk":24,"def":18},"growth":{"hp":6.48,"atk":3.6,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":28.8,"def":21.6},{"hp":120.96,"atk":67.2,"def":50.4},{"hp":190.08,"atk":105.6,"def":79.2},{"hp":259.2,"atk":144,"def":108},{"hp":328.32,"atk":182.4,"def":136.8},{"hp":397.44,"atk":220.8,"def":165.6}]}',
    '{"name":"선택","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 환락 스킬 발동 시 환락도가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다, 해당 효과 최대 중첩수: <unbreak>#3[i]</unbreak>회","params":{"1":[0.12,0.14,0.16,0.18,0.2],"2":[0.12,0.14,0.16,0.18,0.2],"3":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '22000',
    'before-the-tutorial-mission-starts',
    '초보자 임무 시작 전',
    'nihility',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"빠른 눈썰미","desc":"장착한 캐릭터의 효과 명중이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 방어력이 감소된 적을 공격하면 에너지를 <color=#f29e38ff><unbreak>#2[i]</unbreak></color>pt 회복한다","params":{"1":[0.2,0.25,0.3,0.35,0.4],"2":[4,5,6,7,8]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '22001',
    'hey-over-here',
    '저기, 나 여기 있어',
    'abundance',
    4,
    '{"base":{"hp":43.2,"atk":19.2,"def":18},"growth":{"hp":6.48,"atk":2.88,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":23.04,"def":21.6},{"hp":120.96,"atk":53.76,"def":50.4},{"hp":190.08,"atk":84.48,"def":79.2},{"hp":259.2,"atk":115.2,"def":108},{"hp":328.32,"atk":145.92,"def":136.8},{"hp":397.44,"atk":176.64,"def":165.6}]}',
    '{"name":"무섭지 않아…!","desc":"장착한 캐릭터의 HP 최대치가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 전투 스킬 발동 시 치유량이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.08,0.09,0.1,0.11,0.12],"2":[0.16,0.19,0.22,0.25,0.28],"3":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '22002',
    'for-tomorrow-s-journey',
    '내일을 위한 여정',
    'harmony',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"연결","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 필살기를 발동한 후 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[0.18,0.21,0.24,0.27,0.3],"3":[1,1,1,1,1]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '22003',
    'ninja-record-sound-hunt',
    '인사록•음률 사냥',
    'destruction',
    4,
    '{"base":{"hp":48,"atk":21.6,"def":12},"growth":{"hp":7.2,"atk":3.24,"def":1.8},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":25.92,"def":14.4},{"hp":134.4,"atk":60.48,"def":33.6},{"hp":211.2,"atk":95.04,"def":52.8},{"hp":288,"atk":129.6,"def":72},{"hp":364.8,"atk":164.16,"def":91.2},{"hp":441.6,"atk":198.72,"def":110.4}]}',
    '{"name":"공연 시작!","desc":"장착한 캐릭터의 HP 최대치가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 자신의 HP를 잃거나 회복하면 치명타 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴, 해당 효과는 턴마다 1회만 발동한다","params":{"1":[0.12,0.15,0.18,0.21,0.24],"2":[0.18,0.225,0.27,0.315,0.36],"3":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '22004',
    'the-great-cosmic-enterprise',
    '우주 대사업',
    'erudition',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"상호 이익","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 적이 서로 다른 속성의 약점을 1개 보유할 때마다 장착한 캐릭터가 대상에게 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가하며, 최대 7개까지 계산한다","params":{"1":[0.08,0.1,0.12,0.14,0.16],"2":[0.04,0.05,0.06,0.07,0.08]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '22005',
    'the-forever-victual',
    '영원한 미궁의 식사',
    'harmony',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"맛있는 냄새","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 전투 스킬 발동 후 공격력이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다, 해당 효과 최대 중첩수: <unbreak>#3[i]</unbreak>스택","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[0.08,0.1,0.12,0.14,0.16],"3":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '22006',
    'fly-into-a-pink-tomorrow',
    '핑크빛 내일을 향해',
    'remembrance',
    4,
    '{"base":{"hp":38.4,"atk":21.6,"def":18},"growth":{"hp":5.76,"atk":3.24,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":25.92,"def":21.6},{"hp":107.52,"atk":60.48,"def":50.4},{"hp":168.96,"atk":95.04,"def":79.2},{"hp":230.4,"atk":129.6,"def":108},{"hp":291.84,"atk":164.16,"def":136.8},{"hp":353.28,"atk":198.72,"def":165.6}]}',
    '{"name":"주시","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 개척자•기억이 장착할 시 모든 아군이 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가하고, 강화된 일반 공격 [내일을, 함께 써내려 가자!]가 가하는 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다","params":{"1":[0.12,0.15,0.18,0.21,0.24],"2":[0.08,0.1,0.12,0.14,0.16],"3":[0.6,0.7,0.8,0.9,1]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '22007',
    'tomorrow-together',
    '미래엔 우리가 함께할 거야',
    'elation',
    4,
    '{"base":{"hp":43.2,"atk":21.6,"def":15},"growth":{"hp":6.48,"atk":3.24,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":18},{"hp":120.96,"atk":60.48,"def":42},{"hp":190.08,"atk":95.04,"def":66},{"hp":259.2,"atk":129.6,"def":90},{"hp":328.32,"atk":164.16,"def":114},{"hp":397.44,"atk":198.72,"def":138}]}',
    '{"name":"동행","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 필살기 발동 후, 모든 아군의 환락도가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.12,0.15,0.18,0.21,0.24],"2":[0.08,0.09,0.1,0.11,0.12],"3":[1,1,1,1,1]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23000',
    'night-on-the-milky-way',
    '은하철도의 밤',
    'erudition',
    5,
    '{"base":{"hp":52.8,"atk":26.4,"def":18},"growth":{"hp":7.92,"atk":3.96,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":63.36,"atk":31.68,"def":21.6},{"hp":147.84,"atk":73.92,"def":50.4},{"hp":232.32,"atk":116.16,"def":79.2},{"hp":316.8,"atk":158.4,"def":108},{"hp":401.28,"atk":200.64,"def":136.8},{"hp":485.76,"atk":242.88,"def":165.6}]}',
    '{"name":"유성군","desc":"필드에 적이 1기 있을 때마다 장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#2[f1]%</unbreak></color> 증가한다. 해당 효과 최대 중첩수: 5스택. 적의 약점이 격파될 시 장착한 캐릭터가 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 지속 시간: 1턴","params":{"1":[0.3,0.35,0.4,0.45,0.5],"2":[0.09,0.105,0.12,0.135,0.15]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23001',
    'in-the-night',
    '야경 속에서',
    'hunt',
    5,
    '{"base":{"hp":48,"atk":26.4,"def":21},"growth":{"hp":7.2,"atk":3.96,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":31.68,"def":25.2},{"hp":134.4,"atk":73.92,"def":58.8},{"hp":211.2,"atk":116.16,"def":92.4},{"hp":288,"atk":158.4,"def":126},{"hp":364.8,"atk":200.64,"def":159.6},{"hp":441.6,"atk":242.88,"def":193.2}]}',
    '{"name":"꽃과 나비","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터의 전투 중 속도가 <unbreak>100</unbreak>보다 높을 경우, <unbreak>#2[i]</unbreak>pt 초과할 때마다 일반 공격 및 전투 스킬이 가하는 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가하고, 필살기의 치명타 피해가 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가한다. 최대 중첩수: <unbreak>#5[i]</unbreak>스택","params":{"1":[0.18,0.21,0.24,0.27,0.3],"2":[10,10,10,10,10],"3":[0.06,0.07,0.08,0.09,0.1],"4":[0.12,0.14,0.16,0.18,0.2],"5":[6,6,6,6,6]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23002',
    'something-irreplaceable',
    '대체할 수 없는 것',
    'destruction',
    5,
    '{"base":{"hp":52.8,"atk":26.4,"def":18},"growth":{"hp":7.92,"atk":3.96,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":63.36,"atk":31.68,"def":21.6},{"hp":147.84,"atk":73.92,"def":50.4},{"hp":232.32,"atk":116.16,"def":79.2},{"hp":316.8,"atk":158.4,"def":108},{"hp":401.28,"atk":200.64,"def":136.8},{"hp":485.76,"atk":242.88,"def":165.6}]}',
    '{"name":"가족","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터는 적을 처치하거나 피격된 후 즉시 공격력 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color>만큼의 HP를 회복하고, 가하는 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가하며, 자신의 다음 턴이 끝날 때까지 지속된다. 해당 효과는 중첩될 수 없으며 턴마다 1회만 발동할 수 있다","params":{"1":[0.24,0.28,0.32,0.36,0.4],"2":[0.08,0.09,0.1,0.11,0.12],"3":[0.24,0.28,0.32,0.36,0.4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23003',
    'but-the-battle-isn-t-over',
    '아직 전투는 끝나지 않았다',
    'harmony',
    5,
    '{"base":{"hp":52.8,"atk":24,"def":21},"growth":{"hp":7.92,"atk":3.6,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":63.36,"atk":28.8,"def":25.2},{"hp":147.84,"atk":67.2,"def":58.8},{"hp":232.32,"atk":105.6,"def":92.4},{"hp":316.8,"atk":144,"def":126},{"hp":401.28,"atk":182.4,"def":159.6},{"hp":485.76,"atk":220.8,"def":193.2}]}',
    '{"name":"계승자","desc":"장착한 캐릭터의 에너지 회복효율이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 아군에게 필살기 발동 시 전투 스킬 포인트를 1pt 회복한다. 해당 효과는 필살기를 2회 발동할 때마다 1회 발동할 수 있다. 장착한 캐릭터가 전투 스킬 발동 후 다음에 행동하는 다른 아군이 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.1,0.12,0.14,0.16,0.18],"2":[0.3,0.35,0.4,0.45,0.5],"3":[1,1,1,1,1]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23004',
    'in-the-name-of-the-world',
    '세계의 이름으로',
    'nihility',
    5,
    '{"base":{"hp":48,"atk":26.4,"def":21},"growth":{"hp":7.2,"atk":3.96,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":31.68,"def":25.2},{"hp":134.4,"atk":73.92,"def":58.8},{"hp":211.2,"atk":116.16,"def":92.4},{"hp":288,"atk":158.4,"def":126},{"hp":364.8,"atk":200.64,"def":159.6},{"hp":441.6,"atk":242.88,"def":193.2}]}',
    '{"name":"전승자","desc":"장착한 캐릭터가 디버프 효과에 빠진 적에게 가하는 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 전투 스킬 발동 시 장착한 캐릭터의 이번 공격은 효과 명중이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가하고, 공격력이 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다","params":{"1":[0.24,0.28,0.32,0.36,0.4],"2":[0.18,0.21,0.24,0.27,0.3],"3":[0.24,0.28,0.32,0.36,0.4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23005',
    'moment-of-victory',
    '승리의 순간',
    'preservation',
    5,
    '{"base":{"hp":48,"atk":21.6,"def":27},"growth":{"hp":7.2,"atk":3.24,"def":4.05},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":25.92,"def":32.4},{"hp":134.4,"atk":60.48,"def":75.6},{"hp":211.2,"atk":95.04,"def":118.8},{"hp":288,"atk":129.6,"def":162},{"hp":364.8,"atk":164.16,"def":205.2},{"hp":441.6,"atk":198.72,"def":248.4}]}',
    '{"name":"결단","desc":"장착한 캐릭터의 방어력이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가하고, 효과 명중이 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가하며, 자신이 피격될 확률이 증가한다. 장착한 캐릭터는 피격 후 자신의 턴이 끝날 때까지 방어력이 추가로 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다","params":{"1":[2,2,2,2,2],"2":[0.24,0.28,0.32,0.36,0.4],"3":[0.24,0.28,0.32,0.36,0.4],"4":[0.24,0.28,0.32,0.36,0.4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23006',
    'patience-is-all-you-need',
    '필요한 건 기다림뿐',
    'nihility',
    5,
    '{"base":{"hp":48,"atk":26.4,"def":21},"growth":{"hp":7.2,"atk":3.96,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":31.68,"def":25.2},{"hp":134.4,"atk":73.92,"def":58.8},{"hp":211.2,"atk":116.16,"def":92.4},{"hp":288,"atk":158.4,"def":126},{"hp":364.8,"atk":200.64,"def":159.6},{"hp":441.6,"atk":242.88,"def":193.2}]}',
    '{"name":"거미줄","desc":"장착한 캐릭터가 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 공격을 발동할 때마다 속도가 <color=#f29e38ff><unbreak>#3[f1]%</unbreak></color> 증가한다. 최대 중첩수: <unbreak>#4[i]</unbreak>스택\\n장착한 캐릭터가 적 명중 시, 해당 목표가 [흐름] 상태가 아니면 해당 목표는 <unbreak>100%</unbreak>의 기본 확률로 [흐름] 상태에 빠진다. [흐름] 상태는 감전과 동일한 상태로 간주한다. [흐름] 상태에서 적은 턴이 시작될 때마다 장착한 캐릭터 공격력의 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color>만큼 번개 속성 지속 피해를 받는다. 지속 시간: <unbreak>#5[i]</unbreak>턴","params":{"1":[0.6,0.7,0.8,0.9,1],"2":[0.24,0.28,0.32,0.36,0.4],"3":[0.048,0.055999998,0.064,0.072,0.08],"4":[3,3,3,3,3],"5":[1,1,1,1,1]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23007',
    'incessant-rain',
    '계속 내리는 비',
    'nihility',
    5,
    '{"base":{"hp":48,"atk":26.4,"def":21},"growth":{"hp":7.2,"atk":3.96,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":31.68,"def":25.2},{"hp":134.4,"atk":73.92,"def":58.8},{"hp":211.2,"atk":116.16,"def":92.4},{"hp":288,"atk":158.4,"def":126},{"hp":364.8,"atk":200.64,"def":159.6},{"hp":441.6,"atk":242.88,"def":193.2}]}',
    '{"name":"현실 속 신기루","desc":"장착한 캐릭터의 효과 명중이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 동시에 디버프 효과 <unbreak>#4[i]</unbreak>개 이상인 적에게 피해를 가하면 치명타 확률이 <color=#f29e38ff><unbreak>#5[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 일반 공격, 전투 스킬, 필살기 발동 후 <unbreak>#2[i]%</unbreak>의 기본 확률로 [에테르 코드]를 보유하지 않은 랜덤 피격 목표 1기에 [에테르 코드]를 부여한다. [에테르 코드]를 보유한 목표가 받는 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다. 지속 시간: 1턴","params":{"1":[0.24,0.28,0.32,0.36,0.4],"2":[1,1,1,1,1],"3":[0.12,0.14,0.16,0.18,0.2],"4":[3,3,3,3,3],"5":[0.12,0.14,0.16,0.18,0.2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23008',
    'echoes-of-the-coffin',
    '관의 울림',
    'abundance',
    5,
    '{"base":{"hp":52.8,"atk":26.4,"def":18},"growth":{"hp":7.92,"atk":3.96,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":63.36,"atk":31.68,"def":21.6},{"hp":147.84,"atk":73.92,"def":50.4},{"hp":232.32,"atk":116.16,"def":79.2},{"hp":316.8,"atk":158.4,"def":108},{"hp":401.28,"atk":200.64,"def":136.8},{"hp":485.76,"atk":242.88,"def":165.6}]}',
    '{"name":"가시","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 공격을 발동하면 다른 적 1기를 명중할 때마다 에너지를 <color=#f29e38ff><unbreak>#3[f1]</unbreak></color>pt 회복한다. 공격할 때마다 해당 방식으로 에너지를 최대 <unbreak>#4[i]</unbreak>회 회복한다. 장착한 캐릭터가 필살기를 발동하면 모든 아군의 속도가 <color=#f29e38ff><unbreak>#2[i]</unbreak></color>pt 증가한다. 지속 시간: 1턴","params":{"1":[0.24,0.28,0.32,0.36,0.4],"2":[12,14,16,18,20],"3":[3,3.5,4,4.5,5],"4":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23009',
    'the-unreachable-side',
    '닿을 수 없는 저편',
    'destruction',
    5,
    '{"base":{"hp":57.6,"atk":26.4,"def":15},"growth":{"hp":8.64,"atk":3.96,"def":2.25},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":69.12,"atk":31.68,"def":18},{"hp":161.28,"atk":73.92,"def":42},{"hp":253.44,"atk":116.16,"def":66},{"hp":345.6,"atk":158.4,"def":90},{"hp":437.76,"atk":200.64,"def":114},{"hp":529.92,"atk":242.88,"def":138}]}',
    '{"name":"불능","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, HP 최대치가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 피격되거나 자신의 HP를 소모한 후 가하는 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다. 해당 효과는 장착한 캐릭터가 공격을 발동한 후 해제된다","params":{"1":[0.18,0.21,0.24,0.27,0.3],"2":[0.18,0.21,0.24,0.27,0.3],"3":[0.24,0.28,0.32,0.36,0.4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23010',
    'before-dawn',
    '동트기 전',
    'erudition',
    5,
    '{"base":{"hp":48,"atk":26.4,"def":21},"growth":{"hp":7.2,"atk":3.96,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":31.68,"def":25.2},{"hp":134.4,"atk":73.92,"def":58.8},{"hp":211.2,"atk":116.16,"def":92.4},{"hp":288,"atk":158.4,"def":126},{"hp":364.8,"atk":200.64,"def":159.6},{"hp":441.6,"atk":242.88,"def":193.2}]}',
    '{"name":"긴 밤","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하며, 장착한 캐릭터의 전투 스킬과 필살기로 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 장착한 캐릭터는 전투 스킬 혹은 필살기 발동 후 [몽신] 효과를 획득한다. 추가 공격 발동 시 [몽신]을 소모해 추가 공격으로 가하는 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다","params":{"1":[0.36,0.42,0.48,0.54,0.6],"2":[0.18,0.21,0.24,0.27,0.3],"3":[0.48,0.56,0.64,0.72,0.8]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23011',
    'she-already-shut-her-eyes',
    '그녀는 두 눈을 감았네',
    'preservation',
    5,
    '{"base":{"hp":57.6,"atk":19.2,"def":24},"growth":{"hp":8.64,"atk":2.88,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":69.12,"atk":23.04,"def":28.8},{"hp":161.28,"atk":53.76,"def":67.2},{"hp":253.44,"atk":84.48,"def":105.6},{"hp":345.6,"atk":115.2,"def":144},{"hp":437.76,"atk":145.92,"def":182.4},{"hp":529.92,"atk":176.64,"def":220.8}]}',
    '{"name":"펼쳐진 세계","desc":"장착한 캐릭터의 HP 최대치가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 에너지 회복효율이 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가한다. 장착한 캐릭터의 HP가 감소하면, 모든 아군이 가하는 피해가 <color=#f29e38ff><unbreak>#2[f1]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#5[i]</unbreak>턴\\n웨이브가 시작될 때마다 모든 아군의 HP가 각자 손실한 HP의 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color>만큼 회복한다","params":{"1":[0.24,0.28,0.32,0.36,0.4],"2":[0.09,0.105,0.12,0.135,0.15],"3":[0.8,0.85,0.9,0.95,1],"4":[0.12,0.14,0.16,0.18,0.2],"5":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23012',
    'sleep-like-the-dead',
    '깊게 든 단잠',
    'hunt',
    5,
    '{"base":{"hp":48,"atk":26.4,"def":21},"growth":{"hp":7.2,"atk":3.96,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":31.68,"def":25.2},{"hp":134.4,"atk":73.92,"def":58.8},{"hp":211.2,"atk":116.16,"def":92.4},{"hp":288,"atk":158.4,"def":126},{"hp":364.8,"atk":200.64,"def":159.6},{"hp":441.6,"atk":242.88,"def":193.2}]}',
    '{"name":"좋은꿈","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터의 일반 공격 혹은 전투 스킬 피해가 치명타를 발동하지 않으면 자신의 치명타 확률이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#3[i]</unbreak>턴. 해당 효과는 <unbreak>#4[i]</unbreak>턴마다 1회만 발동할 수 있다","params":{"1":[0.3,0.35,0.4,0.45,0.5],"2":[0.36,0.42,0.48,0.54,0.6],"3":[1,1,1,1,1],"4":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23013',
    'time-waits-for-no-one',
    '세월은 흐를 뿐',
    'abundance',
    5,
    '{"base":{"hp":57.6,"atk":21.6,"def":21},"growth":{"hp":8.64,"atk":3.24,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":69.12,"atk":25.92,"def":25.2},{"hp":161.28,"atk":60.48,"def":58.8},{"hp":253.44,"atk":95.04,"def":92.4},{"hp":345.6,"atk":129.6,"def":126},{"hp":437.76,"atk":164.16,"def":159.6},{"hp":529.92,"atk":198.72,"def":193.2}]}',
    '{"name":"아침, 점심, 저녁, 그리고 밤","desc":"장착한 캐릭터의 HP 최대치가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 치유량이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 아군에게 치유 제공 시 치유량을 기록한다. 임의의 아군은 공격 발동 후 기록한 치유량의 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color>에 따라 임의의 피격된 적 1기에게 장착한 캐릭터 속성의 추가 피해를 준다. 해당 피해는 보너스의 영향을 받지 않고 턴마다 최대 1회 결산한다.","params":{"1":[0.18,0.21,0.24,0.27,0.3],"2":[0.12,0.14,0.16,0.18,0.2],"3":[0.36,0.42,0.48,0.54,0.6]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23014',
    'i-shall-be-my-own-sword',
    '이 몸이 검이니',
    'destruction',
    5,
    '{"base":{"hp":52.8,"atk":26.4,"def":18},"growth":{"hp":7.92,"atk":3.96,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":63.36,"atk":31.68,"def":21.6},{"hp":147.84,"atk":73.92,"def":50.4},{"hp":232.32,"atk":116.16,"def":79.2},{"hp":316.8,"atk":158.4,"def":108},{"hp":401.28,"atk":200.64,"def":136.8},{"hp":485.76,"atk":242.88,"def":165.6}]}',
    '{"name":"옥을 쥐고","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 동료가 공격을 받거나 HP를 소모하면 장착한 캐릭터는 [월식]을 1스택 획득한다. 최대 중첩수: <unbreak>#2[i]</unbreak>스택. [월식] 스택당 장착한 캐릭터의 다음번 공격이 가하는 피해가 <color=#f29e38ff><unbreak>#3[f1]%</unbreak></color> 증가한다. <unbreak>#2[i]</unbreak>스택까지 중첩 시, 이번 공격은 추가로 목표의 방어력을 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 무시한다. 해당 효과는 장착한 캐릭터가 공격을 발동하면 해제된다","params":{"1":[0.2,0.23,0.26,0.29,0.32],"2":[3,3,3,3,3],"3":[0.14,0.165,0.19,0.215,0.24],"4":[0.12,0.14,0.16,0.18,0.2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23015',
    'brighter-than-the-sun',
    '태양보다 밝게 빛나는 것',
    'destruction',
    5,
    '{"base":{"hp":48,"atk":28.8,"def":18},"growth":{"hp":7.2,"atk":4.32,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":34.56,"def":21.6},{"hp":134.4,"atk":80.64,"def":50.4},{"hp":211.2,"atk":126.72,"def":79.2},{"hp":288,"atk":172.8,"def":108},{"hp":364.8,"atk":218.88,"def":136.8},{"hp":441.6,"atk":264.96,"def":165.6}]}',
    '{"name":"결사 저항","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 일반 공격을 발동하면 [용의 포효]를 1스택 획득한다. 지속 시간: <unbreak>#2[i]</unbreak>턴. [용의 포효] 스택마다 장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가하고, 에너지 회복효율이 <color=#f29e38ff><unbreak>#5[f1]%</unbreak></color> 증가한다. [용의 포효] 최대 중첩수: <unbreak>#3[i]</unbreak>스택","params":{"1":[0.18,0.21,0.24,0.27,0.3],"2":[2,2,2,2,2],"3":[2,2,2,2,2],"4":[0.18,0.21,0.24,0.27,0.3],"5":[0.06,0.07,0.08,0.09,0.1]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23016',
    'worrisome-blissful',
    '고민, 그리고 행복',
    'hunt',
    5,
    '{"base":{"hp":48,"atk":26.4,"def":21},"growth":{"hp":7.2,"atk":3.96,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":31.68,"def":25.2},{"hp":134.4,"atk":73.92,"def":58.8},{"hp":211.2,"atk":116.16,"def":92.4},{"hp":288,"atk":158.4,"def":126},{"hp":364.8,"atk":200.64,"def":159.6},{"hp":441.6,"atk":242.88,"def":193.2}]}',
    '{"name":"한 번에 하나씩","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 추가 공격으로 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 추가 공격을 발동하면 목표가 [온순] 상태에 빠진다. 해당 효과 최대 중첩수: <unbreak>#4[i]</unbreak>스택. 아군이 [온순] 상태의 적을 명중하면 [온순] 스택마다 가하는 치명타 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다","params":{"1":[0.18,0.21,0.24,0.27,0.3],"2":[0.3,0.35,0.4,0.45,0.5],"3":[0.12,0.14,0.16,0.18,0.2],"4":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23017',
    'night-of-fright',
    '섬뜩한 밤',
    'abundance',
    5,
    '{"base":{"hp":52.8,"atk":21.6,"def":24},"growth":{"hp":7.92,"atk":3.24,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":63.36,"atk":25.92,"def":28.8},{"hp":147.84,"atk":60.48,"def":67.2},{"hp":232.32,"atk":95.04,"def":105.6},{"hp":316.8,"atk":129.6,"def":144},{"hp":401.28,"atk":164.16,"def":182.4},{"hp":485.76,"atk":198.72,"def":220.8}]}',
    '{"name":"깊은 심호흡","desc":"장착한 캐릭터의 에너지 회복효율이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 아군이 필살기 발동 시, 장착한 캐릭터는 현재 HP 백분율이 가장 낮은 아군의 HP를 대상 HP 최대치의 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color>만큼 회복시킨다. 장착한 캐릭터가 아군에게 치유 제공 시, 해당 아군의 공격력이 <color=#f29e38ff><unbreak>#3[f1]%</unbreak></color> 증가한다. 해당 효과 최대 중첩수: <unbreak>#4[i]</unbreak>스택. 지속 시간: <unbreak>#5[i]</unbreak>턴","params":{"1":[0.12,0.14,0.16,0.18,0.2],"2":[0.1,0.11,0.12,0.13,0.14],"3":[0.024,0.027999999,0.032,0.036,0.04],"4":[5,5,5,5,5],"5":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23018',
    'an-instant-before-a-gaze',
    '눈에 담긴 순간',
    'erudition',
    5,
    '{"base":{"hp":48,"atk":26.4,"def":21},"growth":{"hp":7.2,"atk":3.96,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":31.68,"def":25.2},{"hp":134.4,"atk":73.92,"def":58.8},{"hp":211.2,"atk":116.16,"def":92.4},{"hp":288,"atk":158.4,"def":126},{"hp":364.8,"atk":200.64,"def":159.6},{"hp":441.6,"atk":242.88,"def":193.2}]}',
    '{"name":"기사의 순례","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 필살기 발동 시 자신의 에너지 최대치에 따라 자신이 필살기로 가하는 피해가 증가한다. (에너지 1pt당 <color=#f29e38ff><unbreak>#2[f2]%</unbreak></color> 증가, 최대 <unbreak>#3[i]</unbreak>pt까지 계산)","params":{"1":[0.36,0.42,0.48,0.54,0.6],"2":[0.0036000002,0.0042,0.0048,0.0054,0.0059999996],"3":[180,180,180,180,180]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23019',
    'past-self-in-mirror',
    '거울 속 지난날의 나',
    'harmony',
    5,
    '{"base":{"hp":48,"atk":24,"def":24},"growth":{"hp":7.2,"atk":3.6,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":28.8,"def":28.8},{"hp":134.4,"atk":67.2,"def":67.2},{"hp":211.2,"atk":105.6,"def":105.6},{"hp":288,"atk":144,"def":144},{"hp":364.8,"atk":182.4,"def":182.4},{"hp":441.6,"atk":220.8,"def":220.8}]}',
    '{"name":"뼈에 사무치는 매화향","desc":"장착한 캐릭터의 격파 특수효과가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터는 필살기 발동 후 모든 아군이 가하는 피해를 <unbreak>#3[i]</unbreak>턴 동안 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가시키며, 장착한 캐릭터의 격파 특수효과가 <unbreak>#4[i]%</unbreak> 이상일 경우 전투 스킬 포인트를 1pt 회복한다.\\n웨이브가 시작될 때마다 모든 아군은 즉시 에너지를 <color=#f29e38ff><unbreak>#5[f1]</unbreak></color>pt 회복한다. 같은 유형의 스킬 효과는 중복 적용되지 않는다","params":{"1":[0.6,0.7,0.8,0.9,1],"2":[0.24,0.28,0.32,0.36,0.4],"3":[3,3,3,3,3],"4":[1.5,1.5,1.5,1.5,1.5],"5":[10,12.5,15,17.5,20]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23020',
    'baptism-of-pure-thought',
    '순수 사유의 세례',
    'hunt',
    5,
    '{"base":{"hp":43.2,"atk":26.4,"def":24},"growth":{"hp":6.48,"atk":3.96,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":31.68,"def":28.8},{"hp":120.96,"atk":73.92,"def":67.2},{"hp":190.08,"atk":116.16,"def":105.6},{"hp":259.2,"atk":158.4,"def":144},{"hp":328.32,"atk":200.64,"def":182.4},{"hp":397.44,"atk":242.88,"def":220.8}]}',
    '{"name":"사고력 훈련","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 적이 보유한 디버프 효과 1개당 장착한 캐릭터가 해당 적에게 가하는 치명타 피해가 추가로 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다, 해당 효과 최대 중첩수: <unbreak>#3[i]</unbreak>스택. 필살기로 적 공격 시 장착한 캐릭터는 [변론] 효과를 획득해 가하는 피해가 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가하고, 추가 공격은 목표의 방어력을 <color=#f29e38ff><unbreak>#5[i]%</unbreak></color> 무시한다, 해당 효과 지속 시간: <unbreak>#6[i]</unbreak>턴","params":{"1":[0.2,0.23,0.26,0.29,0.32],"2":[0.08,0.09,0.1,0.11,0.12],"3":[3,3,3,3,3],"4":[0.36,0.42,0.48,0.54,0.6],"5":[0.24,0.28,0.32,0.36,0.4],"6":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23021',
    'earthly-escapade',
    '속세에서의 유희',
    'harmony',
    5,
    '{"base":{"hp":52.8,"atk":24,"def":21},"growth":{"hp":7.92,"atk":3.6,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":63.36,"atk":28.8,"def":25.2},{"hp":147.84,"atk":67.2,"def":58.8},{"hp":232.32,"atk":105.6,"def":92.4},{"hp":316.8,"atk":144,"def":126},{"hp":401.28,"atk":182.4,"def":159.6},{"hp":485.76,"atk":220.8,"def":193.2}]}',
    '{"name":"변덕","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 전투 시작 시 장착한 캐릭터가 [가면]을 획득한다, 지속 시간: <unbreak>#6[i]</unbreak>턴. 장착한 캐릭터가 [가면] 보유 시, 장착한 캐릭터 동료의 치명타 확률이 <color=#f29e38ff><unbreak>#5[i]%</unbreak></color> 증가하고 치명타 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 전투 스킬 포인트를 1pt 회복할 때마다 [무지개 화염]을 1스택 획득하고, 회복 시 초과한 전투 스킬 포인트도 계산에 포함된다. [무지개 화염]이 <unbreak>#4[i]</unbreak>스택에 도달하면 모든 [무지개 화염]을 해제하고 [가면]을 획득한다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.32,0.39,0.46,0.53,0.6],"2":[0.28,0.35,0.42,0.49,0.56],"3":[4,4,4,4,4],"4":[4,4,4,4,4],"5":[0.1,0.11,0.12,0.13,0.14],"6":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23022',
    'reforged-remembrance',
    '시간의 기억에 대한 재구성',
    'nihility',
    5,
    '{"base":{"hp":48,"atk":26.4,"def":21},"growth":{"hp":7.2,"atk":3.96,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":31.68,"def":25.2},{"hp":134.4,"atk":73.92,"def":58.8},{"hp":211.2,"atk":116.16,"def":92.4},{"hp":288,"atk":158.4,"def":126},{"hp":364.8,"atk":200.64,"def":159.6},{"hp":441.6,"atk":242.88,"def":193.2}]}',
    '{"name":"결정","desc":"장착한 캐릭터의 효과 명중이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 풍화, 연소, 감전, 열상 상태에 빠진 적에게 피해를 가하면 각각 [예지]를 1스택 획득한다. 최대 중첩수: <unbreak>#4[i]</unbreak>스택. 단일 전투에서 지속 피해 상태 유형마다 [예지] 효과를 1회 중첩할 수 있다. [예지] 1스택당 장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가하고, 가하는 지속 피해가 목표의 방어력을 <color=#f29e38ff><unbreak>#3[f1]%</unbreak></color> 무시한다","params":{"1":[0.4,0.45,0.5,0.55,0.6],"2":[0.05,0.06,0.07,0.08,0.09],"3":[0.072,0.078999996,0.086,0.093,0.1],"4":[4,4,4,4,4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23023',
    'inherently-unjust-destiny',
    '언제나 불공평한 운명',
    'preservation',
    5,
    '{"base":{"hp":48,"atk":19.2,"def":30},"growth":{"hp":7.2,"atk":2.88,"def":4.5},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":23.04,"def":36},{"hp":134.4,"atk":53.76,"def":84},{"hp":211.2,"atk":84.48,"def":132},{"hp":288,"atk":115.2,"def":180},{"hp":364.8,"atk":145.92,"def":228},{"hp":441.6,"atk":176.64,"def":276}]}',
    '{"name":"올인","desc":"장착한 캐릭터의 방어력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 아군에게 실드 제공 시, 장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#3[i]</unbreak>턴. 장착한 캐릭터가 추가 공격을 발동해 적을 명중하면, <color=#f29e38ff><unbreak>#4[i]%</unbreak></color>의 기본 확률로 피격된 적이 받는 피해가 <color=#f29e38ff><unbreak>#5[f1]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#6[i]</unbreak>턴","params":{"1":[0.4,0.46,0.52,0.58,0.64],"2":[0.4,0.46,0.52,0.58,0.64],"3":[2,2,2,2,2],"4":[1,1.15,1.3,1.45,1.6],"5":[0.1,0.115,0.13,0.145,0.16],"6":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23024',
    'along-the-passing-shore',
    '흘러가는 강가를 따라',
    'nihility',
    5,
    '{"base":{"hp":48,"atk":28.8,"def":18},"growth":{"hp":7.2,"atk":4.32,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":34.56,"def":21.6},{"hp":134.4,"atk":80.64,"def":50.4},{"hp":211.2,"atk":126.72,"def":79.2},{"hp":288,"atk":172.8,"def":108},{"hp":364.8,"atk":218.88,"def":136.8},{"hp":441.6,"atk":264.96,"def":165.6}]}',
    '{"name":"뱃사공","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 적 명중 시 적을 [포영] 상태에 빠트린다. 지속 시간: 1턴. 장착한 캐릭터가 공격할 때마다 적 1기당 1회만 발동한다. 장착한 캐릭터가 [포영] 상태에 빠진 적에게 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가하고, 필살기로 가하는 피해가 추가로 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다","params":{"1":[0.36,0.42,0.48,0.54,0.6],"2":[0.24,0.28,0.32,0.36,0.4],"3":[0.24,0.28,0.32,0.36,0.4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23025',
    'whereabouts-should-dreams-rest',
    '꿈은 어디로 돌아가야 하는가',
    'destruction',
    5,
    '{"base":{"hp":52.8,"atk":21.6,"def":24},"growth":{"hp":7.92,"atk":3.24,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":63.36,"atk":25.92,"def":28.8},{"hp":147.84,"atk":60.48,"def":67.2},{"hp":232.32,"atk":95.04,"def":105.6},{"hp":316.8,"atk":129.6,"def":144},{"hp":401.28,"atk":164.16,"def":182.4},{"hp":485.76,"atk":198.72,"def":220.8}]}',
    '{"name":"탈바꿈","desc":"장착한 캐릭터의 격파 특수효과가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 적에게 격파 피해를 가할 시 적을 [궤멸] 상태에 빠트린다, 지속 시간: <unbreak>#4[i]</unbreak>턴. [궤멸] 상태에서 목표가 장착한 캐릭터로부터 받는 격파 피해가 <color=#f29e38ff><unbreak>#2[f1]%</unbreak></color> 증가하고 속도가 <unbreak>#3[i]%</unbreak> 감소하며, 같은 유형의 효과는 중첩되지 않는다","params":{"1":[0.6,0.7,0.8,0.9,1],"2":[0.24,0.28,0.32,0.36,0.4],"3":[0.2,0.2,0.2,0.2,0.2],"4":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23026',
    'flowing-nightglow',
    '찬란하게 빛나는 밤',
    'harmony',
    5,
    '{"base":{"hp":43.2,"atk":28.8,"def":21},"growth":{"hp":6.48,"atk":4.32,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":34.56,"def":25.2},{"hp":120.96,"atk":80.64,"def":58.8},{"hp":190.08,"atk":126.72,"def":92.4},{"hp":259.2,"atk":172.8,"def":126},{"hp":328.32,"atk":218.88,"def":159.6},{"hp":397.44,"atk":264.96,"def":193.2}]}',
    '{"name":"위로","desc":"아군 캐릭터가 공격할 때마다 장착한 캐릭터가 [노래]를 1스택 획득한다. [노래] 스택마다 장착한 캐릭터의 에너지 회복효율이 <color=#f29e38ff><unbreak>#1[f1]%</unbreak></color> 증가한다. 최대 중첩수: <unbreak>#2[i]</unbreak>스택. 장착한 캐릭터가 필살기를 발동하면 [노래]가 해제되고 [카덴차]를 획득한다. [카덴차]는 장착한 캐릭터의 공격력을 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가시키고, 모든 아군이 가하는 피해를 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가시킨다, 지속 시간: <unbreak>#5[i]</unbreak>턴","params":{"1":[0.03,0.035,0.04,0.044999998,0.05],"2":[5,5,5,5,5],"3":[0.24,0.28,0.32,0.36,0.4],"4":[0.48,0.6,0.72,0.84,0.96],"5":[1,1,1,1,1]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23027',
    'sailing-towards-a-second-life',
    '두 번째 생명을 향해',
    'hunt',
    5,
    '{"base":{"hp":48,"atk":26.4,"def":21},"growth":{"hp":7.2,"atk":3.96,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":31.68,"def":25.2},{"hp":134.4,"atk":73.92,"def":58.8},{"hp":211.2,"atk":116.16,"def":92.4},{"hp":288,"atk":158.4,"def":126},{"hp":364.8,"atk":200.64,"def":159.6},{"hp":441.6,"atk":242.88,"def":193.2}]}',
    '{"name":"고된 항해","desc":"장착한 캐릭터의 격파 특수효과가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 가하는 격파 피해는 목표의 방어력을 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 무시한다. 전투 중 장착한 캐릭터의 격파 특수효과가 <unbreak>#2[i]%</unbreak> 이상일 경우 속도가 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가한다","params":{"1":[0.6,0.7,0.8,0.9,1],"2":[1.5,1.5,1.5,1.5,1.5],"3":[0.2,0.23,0.26,0.29,0.32],"4":[0.12,0.14,0.16,0.18,0.2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23028',
    'yet-hope-is-priceless',
    '값을 매길 수 없는 건 희망뿐',
    'erudition',
    5,
    '{"base":{"hp":43.2,"atk":26.4,"def":24},"growth":{"hp":6.48,"atk":3.96,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":31.68,"def":28.8},{"hp":120.96,"atk":73.92,"def":67.2},{"hp":190.08,"atk":116.16,"def":105.6},{"hp":259.2,"atk":158.4,"def":144},{"hp":328.32,"atk":200.64,"def":182.4},{"hp":397.44,"atk":242.88,"def":220.8}]}',
    '{"name":"약속","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 전투 중 장착한 캐릭터의 치명타 피해가 <unbreak>#2[i]%</unbreak> 초과 시 <unbreak>#3[i]%</unbreak>를 초과할 때마다 추가 공격으로 가하는 피해가 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가하며, 해당 효과는 <unbreak>#5[i]</unbreak>스택 중첩 가능하다. 전투 시작 시 및 장착한 캐릭터가 일반 공격 발동 후, 필살기 또는 추가 공격이 가하는 피해는 목표의 방어력을 <color=#f29e38ff><unbreak>#6[i]%</unbreak></color> 무시한다, 지속 시간: <unbreak>#7[i]</unbreak>턴","params":{"1":[0.16,0.19,0.22,0.25,0.28],"2":[1.2,1.2,1.2,1.2,1.2],"3":[0.2,0.2,0.2,0.2,0.2],"4":[0.12,0.14,0.16,0.18,0.2],"5":[4,4,4,4,4],"6":[0.2,0.24,0.28,0.32,0.36],"7":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23029',
    'those-many-springs',
    '그 무수한 봄날',
    'nihility',
    5,
    '{"base":{"hp":43.2,"atk":26.4,"def":24},"growth":{"hp":6.48,"atk":3.96,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":31.68,"def":28.8},{"hp":120.96,"atk":73.92,"def":67.2},{"hp":190.08,"atk":116.16,"def":105.6},{"hp":259.2,"atk":158.4,"def":144},{"hp":328.32,"atk":200.64,"def":182.4},{"hp":397.44,"atk":242.88,"def":220.8}]}',
    '{"name":"흔적 없는 세상만사","desc":"장착한 캐릭터의 효과 명중이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 장착한 캐릭터가 일반 공격, 전투 스킬, 필살기를 발동해 적을 공격하면 <unbreak>#2[i]%</unbreak>의 기본 확률로 해당 목표를 [무장해제] 상태에 빠트린다. [무장해제] 상태의 적은 받는 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#4[i]</unbreak>턴. 목표가 장착한 캐릭터가 부여한 지속 피해 상태일 시 <unbreak>#5[i]%</unbreak>의 기본 확률로 장착한 캐릭터가 부여한 [무장해제] 상태가 [궁지 몰이] 상태로 업그레이드되며, 적이 받는 피해가 추가로 <color=#f29e38ff><unbreak>#6[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#4[i]</unbreak>턴, 지속 시간 동안 장착한 캐릭터는 해당 목표에게 [무장해제]를 부여할 수 없다","params":{"1":[0.6,0.7,0.8,0.9,1],"2":[0.6,0.6,0.6,0.6,0.6],"3":[0.1,0.12,0.14,0.16,0.18],"4":[2,2,2,2,2],"5":[0.6,0.6,0.6,0.6,0.6],"6":[0.14,0.16,0.18,0.2,0.22]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23030',
    'dance-at-sunset',
    '해 질 무렵 시작되는 춤',
    'destruction',
    5,
    '{"base":{"hp":48,"atk":26.4,"def":21},"growth":{"hp":7.2,"atk":3.96,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":31.68,"def":25.2},{"hp":134.4,"atk":73.92,"def":58.8},{"hp":211.2,"atk":116.16,"def":92.4},{"hp":288,"atk":158.4,"def":126},{"hp":364.8,"atk":200.64,"def":159.6},{"hp":441.6,"atk":242.88,"def":193.2}]}',
    '{"name":"심취","desc":"장착한 캐릭터가 피격될 확률이 대폭 증가하고, 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 필살기를 발동하면 [화염의 춤]을 1스택 획득한다, 지속 시간: 2턴, 최대 중첩수: <unbreak>#2[i]</unbreak>스택. [화염의 춤] 스택마다 장착한 캐릭터의 추가 공격으로 가하는 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다","params":{"1":[0.36,0.42,0.48,0.54,0.6],"2":[2,2,2,2,2],"3":[0.36,0.42,0.48,0.54,0.6],"4":[5,5,5,5,5]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23031',
    'i-venture-forth-to-hunt',
    '정복하고 사냥하리',
    'hunt',
    5,
    '{"base":{"hp":43.2,"atk":28.8,"def":21},"growth":{"hp":6.48,"atk":4.32,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":34.56,"def":25.2},{"hp":120.96,"atk":80.64,"def":58.8},{"hp":190.08,"atk":126.72,"def":92.4},{"hp":259.2,"atk":172.8,"def":126},{"hp":328.32,"atk":218.88,"def":159.6},{"hp":397.44,"atk":264.96,"def":193.2}]}',
    '{"name":"진섭","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[f1]%</unbreak></color> 증가한다. 장착한 캐릭터가 추가 공격 발동 시 [유광]을 1스택 획득한다, 최대 중첩수: <unbreak>#3[i]</unbreak>스택. [유광] 1스택마다 장착한 캐릭터가 가하는 필살기 피해가 목표의 방어력을 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 무시한다. 장착한 캐릭터의 턴 종료 시 [유광]이 1스택 해제된다","params":{"1":[0.15,0.175,0.2,0.225,0.25],"2":[0.27,0.3,0.33,0.36,0.39],"3":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23032',
    'scent-alone-stays-true',
    '오직 향만이 변함없이',
    'abundance',
    5,
    '{"base":{"hp":48,"atk":24,"def":24},"growth":{"hp":7.2,"atk":3.6,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":28.8,"def":28.8},{"hp":134.4,"atk":67.2,"def":67.2},{"hp":211.2,"atk":105.6,"def":105.6},{"hp":288,"atk":144,"def":144},{"hp":364.8,"atk":182.4,"def":182.4},{"hp":441.6,"atk":220.8,"def":220.8}]}',
    '{"name":"안심","desc":"장착한 캐릭터의 격파 특수효과가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 필살기를 발동하여 적 공격 후 해당 적을 [망우] 상태에 빠트린다, 지속 시간: <unbreak>#5[i]</unbreak>턴. [망우] 상태의 적은 받는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가하고, 장착한 캐릭터의 현재 격파 특수효과가 <unbreak>#3[i]%</unbreak> 이상이면 받는 피해 증가 효과가 추가로 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가한다","params":{"1":[0.6,0.7,0.8,0.9,1],"2":[0.1,0.12,0.14,0.16,0.18],"3":[1.5,1.5,1.5,1.5,1.5],"4":[0.08,0.1,0.12,0.14,0.16],"5":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23033',
    'ninjutsu-inscription-dazzling-evilbreaker',
    '인법첩•요란 파마',
    'erudition',
    5,
    '{"base":{"hp":43.2,"atk":26.4,"def":24},"growth":{"hp":6.48,"atk":3.96,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":31.68,"def":28.8},{"hp":120.96,"atk":73.92,"def":67.2},{"hp":190.08,"atk":116.16,"def":105.6},{"hp":259.2,"atk":158.4,"def":144},{"hp":328.32,"atk":200.64,"def":182.4},{"hp":397.44,"atk":242.88,"def":220.8}]}',
    '{"name":"제악","desc":"장착한 캐릭터의 격파 특수효과가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 전투 진입 시 즉시 에너지를 <color=#f29e38ff><unbreak>#2[f1]</unbreak></color>pt 회복하며, 장착한 캐릭터가 필살기를 발동하면 [뇌둔]을 획득하고, 일반 공격을 2회 발동하면 장착한 캐릭터의 행동 게이지가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가하고 [뇌둔]이 해제된다. 장착한 캐릭터가 필살기를 발동하면 [뇌둔]이 초기화된다","params":{"1":[0.6,0.7,0.8,0.9,1],"2":[30,32.5,35,37.5,40],"3":[0.5,0.55,0.6,0.65,0.7]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23034',
    'a-grounded-ascent',
    '대지로 돌아온 비행',
    'harmony',
    5,
    '{"base":{"hp":52.8,"atk":21.6,"def":24},"growth":{"hp":7.92,"atk":3.24,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":63.36,"atk":25.92,"def":28.8},{"hp":147.84,"atk":60.48,"def":67.2},{"hp":232.32,"atk":95.04,"def":105.6},{"hp":316.8,"atk":129.6,"def":144},{"hp":401.28,"atk":164.16,"def":182.4},{"hp":485.76,"atk":198.72,"def":220.8}]}',
    '{"name":"재출발","desc":"장착한 캐릭터가 단일 아군 캐릭터에게 전투 스킬 또는 필살기를 발동하면 장착한 캐릭터는 에너지를 <color=#f29e38ff><unbreak>#1[f1]</unbreak></color>pt 회복하고, 스킬 목표는 [신성한 영창]을 1스택 획득한다, 지속 시간: <unbreak>#4[i]</unbreak>턴, 최대 중첩수: <unbreak>#3[i]</unbreak>스택. [신성한 영창] 1스택마다 보유자가 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 단일 아군 캐릭터에게 전투 스킬 또는 필살기를 <unbreak>#5[i]</unbreak>회 발동할 때마다 전투 스킬 포인트를 1pt 회복한다","params":{"1":[6,6.5,7,7.5,8],"2":[0.15,0.1725,0.195,0.2175,0.24],"3":[3,3,3,3,3],"4":[3,3,3,3,3],"5":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23035',
    'long-road-leads-home',
    '먼 길 끝의 귀로',
    'nihility',
    5,
    '{"base":{"hp":43.2,"atk":21.6,"def":30},"growth":{"hp":6.48,"atk":3.24,"def":4.5},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":25.92,"def":36},{"hp":120.96,"atk":60.48,"def":84},{"hp":190.08,"atk":95.04,"def":132},{"hp":259.2,"atk":129.6,"def":180},{"hp":328.32,"atk":164.16,"def":228},{"hp":397.44,"atk":198.72,"def":276}]}',
    '{"name":"신생","desc":"장착한 캐릭터의 격파 특수효과가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 적의 약점이 격파될 시 <unbreak>#2[i]%</unbreak>의 기본 확률로 대상을 [타오름] 상태에 빠트리고 받는 격파 피해를 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가시킨다, 지속 시간: <unbreak>#4[i]</unbreak>턴. 해당 효과는 <unbreak>#5[i]</unbreak>스택 중첩 가능하다","params":{"1":[0.6,0.7,0.8,0.9,1],"2":[1,1,1,1,1],"3":[0.18,0.21,0.24,0.27,0.3],"4":[2,2,2,2,2],"5":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23036',
    'time-woven-into-gold',
    '시간을 황금으로 엮어',
    'remembrance',
    5,
    '{"base":{"hp":48,"atk":28.8,"def":18},"growth":{"hp":7.2,"atk":4.32,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":34.56,"def":21.6},{"hp":134.4,"atk":80.64,"def":50.4},{"hp":211.2,"atk":126.72,"def":79.2},{"hp":288,"atk":172.8,"def":108},{"hp":364.8,"atk":218.88,"def":136.8},{"hp":441.6,"atk":264.96,"def":165.6}]}',
    '{"name":"창설","desc":"장착한 캐릭터의 기본 속도가 <color=#f29e38ff><unbreak>#1[i]</unbreak></color> 증가한다. 장착한 캐릭터 및 장착한 캐릭터의 기억 정령이 공격 후 장착한 캐릭터는 [비단]을 1스택 획득하며, [비단] 스택마다 장착한 캐릭터 및 장착한 캐릭터의 기억 정령의 치명타 피해가 <color=#f29e38ff><unbreak>#4[f1]%</unbreak></color> 증가한다, 최대 중첩수: <unbreak>#2[i]</unbreak>스택. 최대 중첩수에 도달하면 [비단] 스택마다 가하는 일반 공격 피해가 추가로 <color=#f29e38ff><unbreak>#3[f1]%</unbreak></color> 증가한다","params":{"1":[12,14,16,18,20],"2":[6,6,6,6,6],"3":[0.09,0.105,0.12,0.135,0.15],"4":[0.09,0.105,0.12,0.135,0.15]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23037',
    'into-the-unreachable-veil',
    '추궁할 수 없는 곳을 향해',
    'erudition',
    5,
    '{"base":{"hp":43.2,"atk":28.8,"def":21},"growth":{"hp":6.48,"atk":4.32,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":34.56,"def":25.2},{"hp":120.96,"atk":80.64,"def":58.8},{"hp":190.08,"atk":126.72,"def":92.4},{"hp":259.2,"atk":172.8,"def":126},{"hp":328.32,"atk":218.88,"def":159.6},{"hp":397.44,"atk":264.96,"def":193.2}]}',
    '{"name":"두뇌 게임","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 필살기 발동 시 장착한 캐릭터가 가하는 전투 스킬과 필살기 피해가 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#5[i]</unbreak>턴. 장착한 캐릭터가 필살기 발동 후 이번 필살기로 소모한 에너지가 <unbreak>#3[i]</unbreak>pt 이상일 경우 전투 스킬 포인트를 1pt 회복한다","params":{"1":[0.12,0.14,0.16,0.18,0.2],"2":[2,2,2,2,2],"3":[140,140,140,140,140],"4":[0.6,0.7,0.8,0.9,1],"5":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23038',
    'if-time-were-a-flower',
    '시간이 한 송이 꽃이라면',
    'harmony',
    5,
    '{"base":{"hp":57.6,"atk":24,"def":18},"growth":{"hp":8.64,"atk":3.6,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":69.12,"atk":28.8,"def":21.6},{"hp":161.28,"atk":67.2,"def":50.4},{"hp":253.44,"atk":105.6,"def":79.2},{"hp":345.6,"atk":144,"def":108},{"hp":437.76,"atk":182.4,"def":136.8},{"hp":529.92,"atk":220.8,"def":165.6}]}',
    '{"name":"희망","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 추가 공격 발동 후 추가로 에너지를 <unbreak>#2[i]</unbreak>pt 회복하고 [지시]를 획득한다, 지속 시간: <unbreak>#3[i]</unbreak>턴. 장착한 캐릭터가 [지시] 보유 시 모든 아군의 치명타 피해가 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가한다. 전투 진입 시 장착한 캐릭터가 에너지를 <unbreak>#5[i]</unbreak>pt 회복하고 [지시]를 획득한다, 지속 시간: <unbreak>#6[i]</unbreak>턴","params":{"1":[0.36,0.42,0.48,0.54,0.6],"2":[12,12,12,12,12],"3":[2,2,2,2,2],"4":[0.48,0.6,0.72,0.84,0.96],"5":[21,21,21,21,21],"6":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23039',
    'flame-of-blood-blaze-my-path',
    '피의 불꽃이여, 앞길을 태워라',
    'destruction',
    5,
    '{"base":{"hp":62.4,"atk":21.6,"def":18},"growth":{"hp":9.36,"atk":3.24,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":74.88,"atk":25.92,"def":21.6},{"hp":174.72,"atk":60.48,"def":50.4},{"hp":274.56,"atk":95.04,"def":79.2},{"hp":374.4,"atk":129.6,"def":108},{"hp":474.24,"atk":164.16,"def":136.8},{"hp":574.08,"atk":198.72,"def":165.6}]}',
    '{"name":"조망","desc":"장착한 캐릭터의 HP 최대치가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 받는 치유량이 <color=#f29e38ff><unbreak>#6[i]%</unbreak></color> 증가한다. 전투 스킬 또는 필살기 발동 시 자신의 HP 최대치의 <color=#f29e38ff><unbreak>#2[f1]%</unbreak></color>만큼 HP를 소모해 이번 공격으로 가하는 피해를 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가시킨다. 해당 효과로 소모된 HP가 <unbreak>#4[i]</unbreak>pt보다 높을 경우 피해가 추가로 <color=#f29e38ff><unbreak>#5[i]%</unbreak></color> 증가한다.\\n현재 HP가 부족하면 해당 효과는 장착한 캐릭터의 현재 HP를 최대 1pt까지 감소시킨다","params":{"1":[0.18,0.21,0.24,0.27,0.3],"2":[0.06,0.065,0.07,0.075,0.08],"3":[0.3,0.35,0.4,0.45,0.5],"4":[500,500,500,500,500],"5":[0.3,0.35,0.4,0.45,0.5],"6":[0.2,0.25,0.3,0.35,0.4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23040',
    'make-farewells-more-beautiful',
    '이별이 더 아름답도록',
    'remembrance',
    5,
    '{"base":{"hp":57.6,"atk":24,"def":18},"growth":{"hp":8.64,"atk":3.6,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":69.12,"atk":28.8,"def":21.6},{"hp":161.28,"atk":67.2,"def":50.4},{"hp":253.44,"atk":105.6,"def":79.2},{"hp":345.6,"atk":144,"def":108},{"hp":437.76,"atk":182.4,"def":136.8},{"hp":529.92,"atk":220.8,"def":165.6}]}',
    '{"name":"각명","desc":"장착한 캐릭터의 HP 최대치가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 장착한 캐릭터 또는 장착한 캐릭터의 기억 정령이 자신의 턴 동안 HP를 잃을 시, 장착한 캐릭터가 [저승의 꽃]을 획득한다. [저승의 꽃]은 장착한 캐릭터와 장착한 캐릭터의 기억 정령이 피해를 가할 시 목표의 방어력을 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 무시하게 한다, 지속 시간: <unbreak>#3[i]</unbreak>턴\\n장착한 캐릭터의 기억 정령이 사라질 시, 장착한 캐릭터의 행동 게이지가 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가한다. 해당 효과는 최대 1회 발동하며, 장착한 캐릭터가 필살기를 발동할 때마다 발동 횟수가 초기화된다","params":{"1":[0.3,0.375,0.45,0.525,0.6],"2":[0.3,0.35,0.4,0.45,0.5],"3":[2,2,2,2,2],"4":[0.12,0.15,0.18,0.21,0.24]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23041',
    'life-should-be-cast-to-flames',
    '생명은 불태워야 하는 것',
    'erudition',
    5,
    '{"base":{"hp":43.2,"atk":26.4,"def":24},"growth":{"hp":6.48,"atk":3.96,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":31.68,"def":28.8},{"hp":120.96,"atk":73.92,"def":67.2},{"hp":190.08,"atk":116.16,"def":105.6},{"hp":259.2,"atk":158.4,"def":144},{"hp":328.32,"atk":200.64,"def":182.4},{"hp":397.44,"atk":242.88,"def":220.8}]}',
    '{"name":"정련","desc":"장착한 캐릭터 턴 시작 시 에너지를 <unbreak>#5[i]</unbreak>pt 회복한다. 적이 장착한 캐릭터가 부여한 약점을 보유했을 경우 장착한 캐릭터가 대상에게 가하는 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다.\\n적이 장착한 캐릭터의 공격을 받을 시 장착한 캐릭터가 대상의 방어력을 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 감소시킨다, 지속 시간: <unbreak>#4[i]</unbreak>턴. 같은 유형의 효과는 중첩되지 않는다","params":{"1":[0,0,0,0,0],"2":[0.12,0.15,0.18,0.21,0.24],"3":[0.6,0.7,0.8,0.9,1],"4":[2,2,2,2,2],"5":[10,10,10,10,10]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23042',
    'long-may-rainbows-adorn-the-sky',
    '무지개가 영원히 하늘에 머물길',
    'remembrance',
    5,
    '{"base":{"hp":52.8,"atk":21.6,"def":24},"growth":{"hp":7.92,"atk":3.24,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":63.36,"atk":25.92,"def":28.8},{"hp":147.84,"atk":60.48,"def":67.2},{"hp":232.32,"atk":95.04,"def":105.6},{"hp":316.8,"atk":129.6,"def":144},{"hp":401.28,"atk":164.16,"def":182.4},{"hp":485.76,"atk":198.72,"def":220.8}]}',
    '{"name":"포용","desc":"장착한 캐릭터의 속도가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 일반 공격, 전투 스킬, 필살기 발동 시 모든 아군의 HP를 현재 HP의 <color=#f29e38ff><unbreak>#2[f1]%</unbreak></color>만큼 소모하고, 장착한 캐릭터의 기억 정령은 다음번 공격 후 추가로 공격 목표에게 장착한 캐릭터의 기억 정령 속성에 기반한 추가 피해를 HP 총 소모량의 <color=#f29e38ff><unbreak>#6[f1]%</unbreak></color>만큼 1회 가하며, 이후 HP 총 소모량을 초기화한다. 장착한 캐릭터의 기억 정령이 기억 정령 스킬 발동 시, 모든 적이 받는 피해가 <color=#f29e38ff><unbreak>#4[f1]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#5[i]</unbreak>턴. 같은 유형의 효과는 중첩되지 않는다","params":{"1":[0.18,0.21,0.24,0.27,0.3],"2":[0.01,0.0125,0.015,0.0175,0.02],"3":[0,0,0,0,0],"4":[0.18,0.225,0.27,0.315,0.36],"5":[2,2,2,2,2],"6":[2.5,3.125,3.75,4.375,5]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23043',
    'lies-dance-on-the-breeze',
    '바람에 흩날리는 거짓말',
    'nihility',
    5,
    '{"base":{"hp":43.2,"atk":26.4,"def":24},"growth":{"hp":6.48,"atk":3.96,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":31.68,"def":28.8},{"hp":120.96,"atk":73.92,"def":67.2},{"hp":190.08,"atk":116.16,"def":105.6},{"hp":259.2,"atk":158.4,"def":144},{"hp":328.32,"atk":200.64,"def":182.4},{"hp":397.44,"atk":242.88,"def":220.8}]}',
    '{"name":"기만","desc":"장착한 캐릭터의 속도가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 공격을 발동하면 <unbreak>#2[i]%</unbreak>의 기본 확률로 각 단일 적을 [망연] 상태에 빠트리며, [망연] 상태의 적은 방어력이 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 감소한다, 지속 시간: <unbreak>#4[i]</unbreak>턴. 장착한 캐릭터의 속도가 <unbreak>#7[i]</unbreak> 이상일 경우 <unbreak>#5[i]%</unbreak>의 기본 확률로 각 단일 적을 [도난] 상태에 빠트리며, [도난] 상태의 적은 방어력이 <color=#f29e38ff><unbreak>#6[i]%</unbreak></color> 감소한다, 지속 시간: <unbreak>#4[i]</unbreak>턴. [망연] 또는 [도난]이 중복 부여될 경우, 가장 최근에 부여된 것만 적용된다","params":{"1":[0.18,0.21,0.24,0.27,0.3],"2":[1.2,1.2,1.2,1.2,1.2],"3":[0.16,0.18,0.2,0.22,0.24],"4":[2,2,2,2,2],"5":[1.2,1.2,1.2,1.2,1.2],"6":[0.08,0.09,0.1,0.11,0.12],"7":[170,170,170,170,170]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23044',
    'thus-burns-the-dawn',
    '이와 같이 타오르는 여명',
    'destruction',
    5,
    '{"base":{"hp":43.2,"atk":31.2,"def":18},"growth":{"hp":6.48,"atk":4.68,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":37.44,"def":21.6},{"hp":120.96,"atk":87.36,"def":50.4},{"hp":190.08,"atk":137.28,"def":79.2},{"hp":259.2,"atk":187.2,"def":108},{"hp":328.32,"atk":237.12,"def":136.8},{"hp":397.44,"atk":287.04,"def":165.6}]}',
    '{"name":"상실","desc":"장착한 캐릭터의 기본 속도가 <color=#f29e38ff><unbreak>#1[i]</unbreak></color> 증가하고, 피해를 가할 시 목표의 방어력을 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 무시한다. 장착한 캐릭터가 필살기를 발동하면 [뜨거운 태양]을 획득하며, 턴 시작 시 해제된다. [뜨거운 태양] 보유 시 장착한 캐릭터가 가하는 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다","params":{"1":[12,14,16,18,20],"2":[0.18,0.225,0.27,0.315,0.36],"3":[0.6,0.78,0.96,1.14,1.32]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23045',
    'a-thankless-coronation',
    '보답 없는 왕관',
    'destruction',
    5,
    '{"base":{"hp":43.2,"atk":26.4,"def":24},"growth":{"hp":6.48,"atk":3.96,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":31.68,"def":28.8},{"hp":120.96,"atk":73.92,"def":67.2},{"hp":190.08,"atk":116.16,"def":105.6},{"hp":259.2,"atk":158.4,"def":144},{"hp":328.32,"atk":200.64,"def":182.4},{"hp":397.44,"atk":242.88,"def":220.8}]}',
    '{"name":"기사왕","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 필살기 발동 시 장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#6[i]%</unbreak></color> 증가하며, 장착한 캐릭터의 에너지 최대치가 <unbreak>#3[i]</unbreak>pt 이상일 경우 장착한 캐릭터의 에너지를 장착한 캐릭터 에너지 최대치의 <unbreak>#5[i]%</unbreak>만큼 고정으로 회복하고, 다시 장착한 캐릭터의 공격력을 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가시킨다, 지속 시간: <unbreak>#4[i]</unbreak>턴","params":{"1":[0.36,0.45,0.54,0.63,0.72],"2":[0.4,0.5,0.6,0.7,0.8],"3":[300,300,300,300,300],"4":[2,2,2,2,2],"5":[0.1,0.1,0.1,0.1,0.1],"6":[0.4,0.5,0.6,0.7,0.8]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23046',
    'the-hell-where-ideals-burn',
    '이상이 불타는 지옥',
    'hunt',
    5,
    '{"base":{"hp":43.2,"atk":26.4,"def":24},"growth":{"hp":6.48,"atk":3.96,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":31.68,"def":28.8},{"hp":120.96,"atk":73.92,"def":67.2},{"hp":190.08,"atk":116.16,"def":105.6},{"hp":259.2,"atk":158.4,"def":144},{"hp":328.32,"atk":200.64,"def":182.4},{"hp":397.44,"atk":242.88,"def":220.8}]}',
    '{"name":"적원엽병","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 전투 진입 시 아군의 전투 스킬 포인트 최대치가 <unbreak>#2[i]</unbreak>pt 이상일 경우, 장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 전투 스킬을 발동할 때마다 장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가한다, 최대 중첩수: <unbreak>#5[i]</unbreak>회","params":{"1":[0.16,0.2,0.24,0.28,0.32],"2":[6,6,6,6,6],"3":[0.4,0.5,0.6,0.7,0.8],"4":[0.1,0.125,0.15,0.175,0.2],"5":[4,4,4,4,4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23047',
    'why-does-the-ocean-sing',
    '바다는 왜 노래하는가',
    'nihility',
    5,
    '{"base":{"hp":43.2,"atk":28.8,"def":21},"growth":{"hp":6.48,"atk":4.32,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":34.56,"def":25.2},{"hp":120.96,"atk":80.64,"def":58.8},{"hp":190.08,"atk":126.72,"def":92.4},{"hp":259.2,"atk":172.8,"def":126},{"hp":328.32,"atk":218.88,"def":159.6},{"hp":397.44,"atk":264.96,"def":193.2}]}',
    '{"name":"독주","desc":"장착한 캐릭터의 효과 명중이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 장착한 캐릭터가 부여한 디버프 효과에 빠진 적이 있을 시 대상을 <unbreak>#2[i]%</unbreak>의 기본 확률로 [혼미] 상태에 빠트린다, 지속 시간: <unbreak>#3[i]</unbreak>턴, 같은 유형의 효과는 중첩되지 않는다. [혼미] 상태일 때 장착한 캐릭터가 부여한 디버프 효과 1개당 받는 지속 피해가 <color=#f29e38ff><unbreak>#4[f1]%</unbreak></color> 증가한다, 해당 효과 최대 중첩수: <unbreak>#5[i]</unbreak>스택, 아군의 공격을 받을 시 공격자의 속도가 <color=#f29e38ff><unbreak>#6[f1]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#7[i]</unbreak>턴. 장착한 캐릭터가 전투 불능 상태에 빠질 시 모든 [혼미]를 해제한다","params":{"1":[0.4,0.45,0.5,0.55,0.6],"2":[0.8,0.8,0.8,0.8,0.8],"3":[3,3,3,3,3],"4":[0.05,0.0625,0.075,0.0875,0.1],"5":[6,6,6,6,6],"6":[0.1,0.125,0.15,0.175,0.2],"7":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23048',
    'epoch-etched-in-golden-blood',
    '황금 피가 새긴 시대',
    'harmony',
    5,
    '{"base":{"hp":43.2,"atk":28.8,"def":21},"growth":{"hp":6.48,"atk":4.32,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":34.56,"def":25.2},{"hp":120.96,"atk":80.64,"def":58.8},{"hp":190.08,"atk":126.72,"def":92.4},{"hp":259.2,"atk":172.8,"def":126},{"hp":328.32,"atk":218.88,"def":159.6},{"hp":397.44,"atk":264.96,"def":193.2}]}',
    '{"name":"정복","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 필살기를 발동해 공격하면 전투 스킬 포인트를 <unbreak>#3[i]</unbreak>pt 회복하며, 장착한 캐릭터가 단일 아군 캐릭터에게 전투 스킬 발동 후 목표가 가하는 전투 스킬 피해가 <color=#f29e38ff><unbreak>#4[f1]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#5[i]</unbreak>턴","params":{"1":[0.64,0.8,0.96,1.12,1.28],"2":[1,1,1,1,1],"3":[1,1,1,1,1],"4":[0.54,0.675,0.81,0.945,1.08],"5":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23049',
    'to-evernight-s-stars',
    '긴 밤의 별빛에게',
    'remembrance',
    5,
    '{"base":{"hp":52.8,"atk":24,"def":21},"growth":{"hp":7.92,"atk":3.6,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":63.36,"atk":28.8,"def":25.2},{"hp":147.84,"atk":67.2,"def":58.8},{"hp":232.32,"atk":105.6,"def":92.4},{"hp":316.8,"atk":144,"def":126},{"hp":401.28,"atk":182.4,"def":159.6},{"hp":485.76,"atk":220.8,"def":193.2}]}',
    '{"name":"불면","desc":"장착한 캐릭터의 HP 최대치가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터의 기억 정령이 스킬 발동 시, 장착한 캐릭터가 [밤빛]을 획득한다. 장착한 캐릭터가 [밤빛] 보유 시, 모든 아군 기억 정령이 가하는 피해가 목표의 방어력을 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 무시하고, 장착한 캐릭터와 장착한 캐릭터의 기억 정령이 가하는 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가하며, 장착한 캐릭터의 기억 정령이 사라질 시 장착한 캐릭터의 에너지를 <color=#f29e38ff><unbreak>#4[i]</unbreak></color>pt 회복한다. 같은 유형의 효과는 중첩되지 않는다","params":{"1":[0.3,0.375,0.45,0.525,0.6],"2":[0.2,0.225,0.25,0.275,0.3],"3":[0.3,0.375,0.45,0.525,0.6],"4":[8,10,12,14,16]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23050',
    'never-forget-her-flame',
    '그녀의 불꽃을 잊지 말라',
    'nihility',
    5,
    '{"base":{"hp":52.8,"atk":24,"def":21},"growth":{"hp":7.92,"atk":3.6,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":63.36,"atk":28.8,"def":25.2},{"hp":147.84,"atk":67.2,"def":58.8},{"hp":232.32,"atk":105.6,"def":92.4},{"hp":316.8,"atk":144,"def":126},{"hp":401.28,"atk":182.4,"def":159.6},{"hp":485.76,"atk":220.8,"def":193.2}]}',
    '{"name":"분신","desc":"장착한 캐릭터의 격파 특수효과가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 전투 진입 시 장착한 캐릭터와 전투를 시작한 다른 동료가 가하는 격파 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 전투를 시작한 동료가 없을 경우, 장착한 캐릭터와 격파 특수효과가 가장 높은 동료에게 효과가 적용된다. 같은 유형의 효과는 중첩되지 않는다. 장착한 캐릭터가 적에게 약점 부여 시 전투 스킬 포인트를 1pt 회복하고, 해당 효과는 최대 1회 발동할 수 있으며, 필살기 발동 시 발동 가능 횟수가 초기화된다","params":{"1":[0.6,0.75,0.9,1.05,1.2],"2":[0.32,0.42,0.52,0.62,0.72]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23051',
    'though-worlds-apart',
    '끝없는 산과 강을 거치더라도',
    'preservation',
    5,
    '{"base":{"hp":48,"atk":26.4,"def":21},"growth":{"hp":7.2,"atk":3.96,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":31.68,"def":25.2},{"hp":134.4,"atk":73.92,"def":58.8},{"hp":211.2,"atk":116.16,"def":92.4},{"hp":288,"atk":158.4,"def":126},{"hp":364.8,"atk":200.64,"def":159.6},{"hp":441.6,"atk":242.88,"def":193.2}]}',
    '{"name":"새로운 비늘","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 필살기 발동 시, 모든 아군의 HP를 장착한 캐릭터 공격력의 <color=#f29e38ff><unbreak>#5[i]%</unbreak></color>만큼 회복하고, 추가로 현재 HP가 가장 낮은 아군 캐릭터의 HP를 장착한 캐릭터 공격력의 <color=#f29e38ff><unbreak>#6[i]%</unbreak></color>만큼 회복하며, 모든 아군이 [방위]를 획득한다, [방위] 지속 시간: <unbreak>#4[i]</unbreak>턴. [방위]를 획득한 목표는 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가하며, 목표가 소환물을 보유한 경우 가하는 피해가 추가로 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다","params":{"1":[0.64,0.8,0.96,1.12,1.28],"2":[0.24,0.3,0.36,0.42,0.48],"3":[0.12,0.15,0.18,0.21,0.24],"4":[3,3,3,3,3],"5":[0.1,0.125,0.15,0.175,0.2],"6":[0.1,0.125,0.15,0.175,0.2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23052',
    'this-love-forever',
    '이 순간처럼 영원한 사랑',
    'remembrance',
    5,
    '{"base":{"hp":57.6,"atk":21.6,"def":21},"growth":{"hp":8.64,"atk":3.24,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":69.12,"atk":25.92,"def":25.2},{"hp":161.28,"atk":60.48,"def":58.8},{"hp":253.44,"atk":95.04,"def":92.4},{"hp":345.6,"atk":129.6,"def":126},{"hp":437.76,"atk":164.16,"def":159.6},{"hp":529.92,"atk":198.72,"def":193.2}]}',
    '{"name":"서약","desc":"장착한 캐릭터의 속도가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터의 기억 정령이 단일 아군에게 기억 정령 스킬 발동 시 [공백]을 획득한다. [공백]: 모든 적이 받는 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다. 장착한 캐릭터의 기억 정령이 적에게 기억 정령 스킬 발동 시 [시구]를 획득한다. [시구]: 모든 아군의 치명타 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 장착한 캐릭터의 기억 정령이 [공백]과 [시구]를 동시에 보유할 시 [공백]과 [시구]의 효과가 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가한다","params":{"1":[0.18,0.21,0.24,0.27,0.3],"2":[0.16,0.19,0.22,0.25,0.28],"3":[0.1,0.12,0.14,0.16,0.18],"4":[0.6,0.65,0.7,0.75,0.8]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23053',
    'dazzled-by-a-flowery-world',
    '눈부신 파키의 세상',
    'elation',
    5,
    '{"base":{"hp":48,"atk":26.4,"def":21},"growth":{"hp":7.2,"atk":3.96,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":31.68,"def":25.2},{"hp":134.4,"atk":73.92,"def":58.8},{"hp":211.2,"atk":116.16,"def":92.4},{"hp":288,"atk":158.4,"def":126},{"hp":364.8,"atk":200.64,"def":159.6},{"hp":441.6,"atk":242.88,"def":193.2}]}',
    '{"name":"이목","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 필드에 있을 시, 파티에 있는 「환락」 운명의 길 캐릭터 1명당 전투 스킬 포인트 최대치가 <unbreak>#2[i]</unbreak>pt 증가하며, 최대 <unbreak>#3[i]</unbreak>pt 증가한다. 장착한 캐릭터가 전투 스킬 포인트를 1pt 소모할 때마다 자신이 가하는 환락 피해가 적의 방어력을 <color=#f29e38ff><unbreak>#6[f1]%</unbreak></color> 무시한다, 최대 중첩수: <unbreak>#5[i]</unbreak>스택, 같은 턴 동안 전투 스킬 포인트를 <unbreak>#7[i]</unbreak>pt 이상 소모할 시 장착한 캐릭터는 [방송 지원]을 획득한다. 장착한 캐릭터가 [방송 지원] 보유 시, 모든 아군의 환락도가 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가한다. 같은 종류의 광추 효과는 중첩되지 않는다","params":{"1":[0.48,0.56,0.64,0.72,0.8],"2":[1,1,1,1,1],"3":[3,3,3,3,3],"4":[0.2,0.24,0.28,0.32,0.36],"5":[4,4,4,4,4],"6":[0.05,0.06,0.07,0.08,0.09],"7":[4,4,4,4,4]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23054',
    'when-she-decided-to-see',
    '그녀가 보기로 결심했을 때',
    'elation',
    5,
    '{"base":{"hp":48,"atk":24,"def":24},"growth":{"hp":7.2,"atk":3.6,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":28.8,"def":28.8},{"hp":134.4,"atk":67.2,"def":67.2},{"hp":211.2,"atk":105.6,"def":105.6},{"hp":288,"atk":144,"def":144},{"hp":364.8,"atk":182.4,"def":182.4},{"hp":441.6,"atk":220.8,"def":220.8}]}',
    '{"name":"타개","desc":"장착한 캐릭터의 속도가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 전투 진입 또는 아군에게 필살기 발동 시, 장착한 캐릭터가 [대길]을 획득한다, 지속 시간: <unbreak>#4[i]</unbreak>턴. 장착한 캐릭터가 [대길] 보유 시, 모든 아군의 치명타 확률이 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가하고, 치명타 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가하며, 장착한 캐릭터의 에너지 회복효율이 <color=#f29e38ff><unbreak>#5[i]%</unbreak></color> 증가한다.\\n웨이브가 시작될 때마다 장착한 캐릭터가 고정으로 에너지를 <unbreak>#6[i]</unbreak>pt 회복한다","params":{"1":[0.18,0.21,0.24,0.27,0.3],"2":[0.1,0.11,0.12,0.13,0.14],"3":[0.3,0.375,0.45,0.525,0.6],"4":[3,3,3,3,3],"5":[0.12,0.14,0.16,0.18,0.2],"6":[15,15,15,15,15]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23056',
    'the-finale-of-a-lie',
    '거짓말의 종막',
    'hunt',
    5,
    '{"base":{"hp":38.4,"atk":28.8,"def":24},"growth":{"hp":5.76,"atk":4.32,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":34.56,"def":28.8},{"hp":107.52,"atk":80.64,"def":67.2},{"hp":168.96,"atk":126.72,"def":105.6},{"hp":230.4,"atk":172.8,"def":144},{"hp":291.84,"atk":218.88,"def":182.4},{"hp":353.28,"atk":264.96,"def":220.8}]}',
    '{"name":"잠식","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 전투 시작 시 또는 장착한 캐릭터가 추가 공격을 누적 <unbreak>#2[i]</unbreak>회 발동할 때마다 장착한 캐릭터는 [그림자 포식]을 획득한다, 지속 시간: <unbreak>#3[i]</unbreak>턴. 장착한 캐릭터가 [그림자 포식] 보유 시, 공격력이 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가하고, 모든 적이 받는 피해를 <color=#f29e38ff><unbreak>#5[i]%</unbreak></color> 증가시키며, 같은 유형의 효과는 중첩되지 않는다","params":{"1":[0.18,0.21,0.24,0.27,0.3],"2":[4,4,4,4,4],"3":[3,3,3,3,3],"4":[0.4,0.5,0.6,0.7,0.8],"5":[0.2,0.225,0.25,0.275,0.3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23057',
    'welcome-to-the-cosmic-city',
    '갤럭시 시티에 오신 것을 환영합니다',
    'elation',
    5,
    '{"base":{"hp":52.8,"atk":21.6,"def":24},"growth":{"hp":7.92,"atk":3.24,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":63.36,"atk":25.92,"def":28.8},{"hp":147.84,"atk":60.48,"def":67.2},{"hp":232.32,"atk":95.04,"def":105.6},{"hp":316.8,"atk":129.6,"def":144},{"hp":401.28,"atk":164.16,"def":182.4},{"hp":485.76,"atk":198.72,"def":220.8}]}',
    '{"name":"확실한 승리","desc":"장착한 캐릭터의 속도가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 가하는 환락 피해가 목표의 방어력을 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 무시한다. 장착한 캐릭터가 자신에게 단일 필살기 발동 시, [웃음 포인트]를 <color=#f29e38ff><unbreak>#3[i]</unbreak></color>pt 획득한다. 해당 효과는 최대 1회 발동하며, 일반 공격을 <unbreak>#4[i]</unbreak>회 발동하면 발동 횟수가 초기화된다","params":{"1":[0.18,0.21,0.24,0.27,0.3],"2":[0.2,0.24,0.28,0.32,0.36],"3":[20,25,30,35,40],"4":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23058',
    'until-the-flowers-bloom-again',
    '다음 꽃피는 계절의 만남',
    'elation',
    5,
    '{"base":{"hp":43.2,"atk":28.8,"def":21},"growth":{"hp":6.48,"atk":4.32,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":34.56,"def":25.2},{"hp":120.96,"atk":80.64,"def":58.8},{"hp":190.08,"atk":126.72,"def":92.4},{"hp":259.2,"atk":172.8,"def":126},{"hp":328.32,"atk":218.88,"def":159.6},{"hp":397.44,"atk":264.96,"def":193.2}]}',
    '{"name":"사색","desc":"장착한 캐릭터의 치명타 피해가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 에너지 회복효율이 <color=#f29e38ff><unbreak>#4[f1]%</unbreak></color> 증가한다. 장착한 캐릭터의 에너지 최대치가 <unbreak>#5[i]</unbreak>보다 높을 시, 초과한 에너지 최대치 <unbreak>10</unbreak>pt당 에너지 회복효율이 추가로 <unbreak>#6[f1]%</unbreak> 증가하며, 초과한 에너지 최대치는 최대 <unbreak>#7[i]</unbreak>pt까지 계산한다. 장착한 캐릭터가 환락 스킬을 발동하면 모든 적이 받는 피해가 <color=#f29e38ff><unbreak>#2[f1]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴, 같은 유형의 효과는 중첩되지 않는다","params":{"1":[0.6,0.75,0.9,1.05,1.2],"2":[0.15,0.1875,0.225,0.2625,0.3],"3":[2,2,2,2,2],"4":[0.1,0.115,0.13,0.145,0.16],"5":[120,120,120,120,120],"6":[0.0029999998,0.0029999998,0.0029999998,0.0029999998,0.0029999998],"7":[360,360,360,360,360]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23059',
    'reforged-in-hellfire',
    '연옥을 불사른 새로운 몸',
    'nihility',
    5,
    '{"base":{"hp":62.4,"atk":19.2,"def":21},"growth":{"hp":9.36,"atk":2.88,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":74.88,"atk":23.04,"def":25.2},{"hp":174.72,"atk":53.76,"def":58.8},{"hp":274.56,"atk":84.48,"def":92.4},{"hp":374.4,"atk":115.2,"def":126},{"hp":474.24,"atk":145.92,"def":159.6},{"hp":574.08,"atk":176.64,"def":193.2}]}',
    '{"name":"단련","desc":"장착한 캐릭터의 HP 최대치가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 장착한 캐릭터의 턴 시작 시 에너지를 고정으로 <unbreak>#2[i]</unbreak>pt 회복하며, 해당 효과는 웨이브마다 1회 발동한다. 장착한 캐릭터가 전투 스킬을 발동하여 공격 후, 목표를 <unbreak>#3[i]</unbreak>턴 동안 [연옥] 상태에 빠트린다. [연옥] 상태의 목표는 받는 치명타 피해가 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가하고, 장착한 캐릭터에게 받는 치명타 피해가 추가로 <color=#f29e38ff><unbreak>#5[i]%</unbreak></color> 증가한다","params":{"1":[0.3,0.375,0.45,0.525,0.6],"2":[20,20,20,20,20],"3":[2,2,2,2,2],"4":[0.3,0.375,0.45,0.525,0.6],"5":[0.3,0.375,0.45,0.525,0.6]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23060',
    'a-star-that-lights-the-night',
    '별이 밤하늘을 밝힐 때',
    'erudition',
    5,
    '{"base":{"hp":38.4,"atk":28.8,"def":24},"growth":{"hp":5.76,"atk":4.32,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":34.56,"def":28.8},{"hp":107.52,"atk":80.64,"def":67.2},{"hp":168.96,"atk":126.72,"def":105.6},{"hp":230.4,"atk":172.8,"def":144},{"hp":291.84,"atk":218.88,"def":182.4},{"hp":353.28,"atk":264.96,"def":220.8}]}',
    '{"name":"최초의 소원","desc":"장착한 캐릭터가 피해를 가할 시 목표의 방어력을 <color=#f29e38ff><unbreak>#7[i]%</unbreak></color> 무시한다. 장착한 캐릭터가 전투 지원 스킬 발동 시 에너지를 <unbreak>#2[i]</unbreak>pt 회복하고 [출항]을 획득한다, 지속 시간: 2턴, 최대 중첩수: <unbreak>#3[i]</unbreak>스택. [출항] 스택당 전투 지원 스킬 피해가 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가하며, [출항] <unbreak>#5[i]</unbreak>스택 도달 시 [출항] 스택당 필살기 피해가 <color=#f29e38ff><unbreak>#6[i]%</unbreak></color> 증가한다","params":{"1":[0,0,0,0,0],"2":[6,6,6,6,6],"3":[3,3,3,3,3],"4":[0.2,0.25,0.3,0.35,0.4],"5":[3,3,3,3,3],"6":[0.2,0.25,0.3,0.35,0.4],"7":[0.32,0.36,0.4,0.44,0.48]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23061',
    'flickering-stars',
    '고요히 빛나는 불티',
    'erudition',
    5,
    '{"base":{"hp":38.4,"atk":28.8,"def":24},"growth":{"hp":5.76,"atk":4.32,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":46.08,"atk":34.56,"def":28.8},{"hp":107.52,"atk":80.64,"def":67.2},{"hp":168.96,"atk":126.72,"def":105.6},{"hp":230.4,"atk":172.8,"def":144},{"hp":291.84,"atk":218.88,"def":182.4},{"hp":353.28,"atk":264.96,"def":220.8}]}',
    '{"name":"발아","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 임의의 아군 캐릭터가 자신의 같은 턴 동안 전투 스킬 포인트를 누적 <unbreak>#3[i]</unbreak>pt 이상 소모하면 장착한 캐릭터는 [빛나는 왕관]을 획득한다, 지속 시간: <unbreak>#4[i]</unbreak>턴. 장착한 캐릭터가 [빛나는 왕관] 보유 시, 모든 아군이 가하는 피해가 목표의 방어력을 <color=#f29e38ff><unbreak>#5[i]%</unbreak></color> 무시하고, 장착한 캐릭터가 가하는 전투 스킬 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가하며, 같은 유형의 효과는 중첩되지 않는다","params":{"1":[0.18,0.21,0.24,0.27,0.3],"2":[0.72,0.84,0.96,1.08,1.2],"3":[4,4,4,4,4],"4":[3,3,3,3,3],"5":[0.2,0.24,0.28,0.32,0.36]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '23062',
    'i-am-as-you-behold',
    '보이는 것이 곧 나',
    'destruction',
    5,
    '{"base":{"hp":43.2,"atk":28.8,"def":21},"growth":{"hp":6.48,"atk":4.32,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":34.56,"def":25.2},{"hp":120.96,"atk":80.64,"def":58.8},{"hp":190.08,"atk":126.72,"def":92.4},{"hp":259.2,"atk":172.8,"def":126},{"hp":328.32,"atk":218.88,"def":159.6},{"hp":397.44,"atk":264.96,"def":193.2}]}',
    '{"name":"마음 가는 대로","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가하고, 에너지 회복효율이 <color=#f29e38ff><unbreak>#2[f1]%</unbreak></color> 증가한다. 장착한 캐릭터가 필살기 발동 시, 소모한 에너지 1pt당 이번에 가하는 필살기 피해가 <color=#f29e38ff><unbreak>#3[f2]%</unbreak></color> 증가하며, 최대 <color=#f29e38ff><unbreak>#6[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 전투 진입 또는 필살기 발동 시, 장착한 캐릭터가 [왕의 여흥]을 획득한다, 지속 시간: <unbreak>#4[i]</unbreak>턴. 장착한 캐릭터가 [왕의 여흥] 보유 시, 모든 아군의 치명타 피해가 <color=#f29e38ff><unbreak>#5[i]%</unbreak></color> 증가하며, 같은 유형의 효과는 중첩되지 않는다","params":{"1":[0.18,0.21,0.24,0.27,0.3],"2":[0.1,0.125,0.15,0.175,0.2],"3":[0.0019999999,0.0025000002,0.0029999998,0.0035,0.0039999997],"4":[3,3,3,3,3],"5":[0.24,0.3,0.36,0.42,0.48],"6":[0.72,0.9,1.08,1.26,1.44]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '24000',
    'on-the-fall-of-an-aeon',
    '어떤 에이언즈의 몰락',
    'destruction',
    5,
    '{"base":{"hp":48,"atk":24,"def":18},"growth":{"hp":7.2,"atk":3.6,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":28.8,"def":21.6},{"hp":134.4,"atk":67.2,"def":50.4},{"hp":211.2,"atk":105.6,"def":79.2},{"hp":288,"atk":144,"def":108},{"hp":364.8,"atk":182.4,"def":136.8},{"hp":441.6,"atk":220.8,"def":165.6}]}',
    '{"name":"자충수","desc":"장착한 캐릭터가 공격 발동 시 장착한 캐릭터의 이번 전투에서 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 해당 효과 최대 중첩수: <unbreak>#2[i]</unbreak>스택. 장착한 캐릭터는 적의 약점을 격파한 후 가하는 피해가 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#4[i]</unbreak>턴","params":{"1":[0.08,0.1,0.12,0.14,0.16],"2":[4,4,4,4,4],"3":[0.12,0.15,0.18,0.21,0.24],"4":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '24001',
    'cruising-in-the-stellar-sea',
    '별바다 순항',
    'hunt',
    5,
    '{"base":{"hp":43.2,"atk":24,"def":21},"growth":{"hp":6.48,"atk":3.6,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":28.8,"def":25.2},{"hp":120.96,"atk":67.2,"def":58.8},{"hp":190.08,"atk":105.6,"def":92.4},{"hp":259.2,"atk":144,"def":126},{"hp":328.32,"atk":182.4,"def":159.6},{"hp":397.44,"atk":220.8,"def":193.2}]}',
    '{"name":"사냥감 추적","desc":"장착한 캐릭터의 치명타 확률이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터는 HP 백분율이 <unbreak>#2[i]%</unbreak> 이하인 적에게 가하는 치명타 확률이 추가로 <color=#f29e38ff><unbreak>#3[i]%</unbreak></color> 증가한다. 장착한 캐릭터는 적을 처치한 후 공격력이 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#5[i]</unbreak>턴","params":{"1":[0.08,0.1,0.12,0.14,0.16],"2":[0.5,0.5,0.5,0.5,0.5],"3":[0.08,0.1,0.12,0.14,0.16],"4":[0.2,0.25,0.3,0.35,0.4],"5":[2,2,2,2,2]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '24002',
    'texture-of-memories',
    '기억의 소재',
    'preservation',
    5,
    '{"base":{"hp":48,"atk":19.2,"def":24},"growth":{"hp":7.2,"atk":2.88,"def":3.6},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":23.04,"def":28.8},{"hp":134.4,"atk":53.76,"def":67.2},{"hp":211.2,"atk":84.48,"def":105.6},{"hp":288,"atk":115.2,"def":144},{"hp":364.8,"atk":145.92,"def":182.4},{"hp":441.6,"atk":176.64,"def":220.8}]}',
    '{"name":"간직","desc":"장착한 캐릭터의 효과 저항이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터는 피격 후 자신이 실드를 보유하지 않았다면 장착한 캐릭터 HP 최대치 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color>만큼의 실드를 획득한다. 지속 시간: <unbreak>#3[i]</unbreak>턴. 해당 효과는 <unbreak>#4[i]</unbreak>턴마다 1회만 발동할 수 있다. 장착한 캐릭터가 실드를 보유하면 자신이 받는 피해가 <color=#f29e38ff><unbreak>#5[i]%</unbreak></color> 감소한다","params":{"1":[0.08,0.1,0.12,0.14,0.16],"2":[0.16,0.2,0.24,0.28,0.32],"3":[2,2,2,2,2],"4":[3,3,3,3,3],"5":[0.12,0.15,0.18,0.21,0.24]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '24003',
    'solitary-healing',
    '고독의 치유',
    'nihility',
    5,
    '{"base":{"hp":48,"atk":24,"def":18},"growth":{"hp":7.2,"atk":3.6,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":28.8,"def":21.6},{"hp":134.4,"atk":67.2,"def":50.4},{"hp":211.2,"atk":105.6,"def":79.2},{"hp":288,"atk":144,"def":108},{"hp":364.8,"atk":182.4,"def":136.8},{"hp":441.6,"atk":220.8,"def":165.6}]}',
    '{"name":"혼돈 영약","desc":"장착한 캐릭터의 격파 특수효과가 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 필살기 발동 시 장착한 캐릭터가 가하는 지속 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다. 지속 시간: <unbreak>#3[i]</unbreak>턴. 장착한 캐릭터가 부여한 지속 피해 효과에 빠진 적이 처치되면 장착한 캐릭터는 에너지를 <color=#f29e38ff><unbreak>#4[f1]</unbreak></color>pt 회복한다","params":{"1":[0.2,0.25,0.3,0.35,0.4],"2":[0.24,0.3,0.36,0.42,0.48],"3":[2,2,2,2,2],"4":[4,4.5,5,5.5,6]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '24004',
    'eternal-calculus',
    '멈추지 않는 연산',
    'erudition',
    5,
    '{"base":{"hp":48,"atk":24,"def":18},"growth":{"hp":7.2,"atk":3.6,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":28.8,"def":21.6},{"hp":134.4,"atk":67.2,"def":50.4},{"hp":211.2,"atk":105.6,"def":79.2},{"hp":288,"atk":144,"def":108},{"hp":364.8,"atk":182.4,"def":136.8},{"hp":441.6,"atk":220.8,"def":165.6}]}',
    '{"name":"끝없는 생각","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 공격 발동 후 적을 1기 명중할 때마다 공격력이 추가로 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가하며(최대 중첩수: 5회), 다음 공격 후까지 지속된다. <unbreak>#3[i]</unbreak>기 이상의 적을 명중하면 자신의 속도가 <color=#f29e38ff><unbreak>#4[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#5[i]</unbreak>턴","params":{"1":[0.08,0.09,0.1,0.11,0.12],"2":[0.04,0.05,0.06,0.07,0.08],"3":[3,3,3,3,3],"4":[0.08,0.1,0.12,0.14,0.16],"5":[1,1,1,1,1]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '24005',
    'memory-s-curtain-never-falls',
    '기억은 영원히 막을 내리지 않는다',
    'remembrance',
    5,
    '{"base":{"hp":48,"atk":24,"def":18},"growth":{"hp":7.2,"atk":3.6,"def":2.7},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":57.6,"atk":28.8,"def":21.6},{"hp":134.4,"atk":67.2,"def":50.4},{"hp":211.2,"atk":105.6,"def":79.2},{"hp":288,"atk":144,"def":108},{"hp":364.8,"atk":182.4,"def":136.8},{"hp":441.6,"atk":220.8,"def":165.6}]}',
    '{"name":"수취","desc":"장착한 캐릭터의 속도가 <color=#f29e38ff><unbreak>#1[f1]%</unbreak></color> 증가한다. 장착한 캐릭터가 전투 스킬을 발동하면 모든 아군이 가하는 피해가 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가한다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.06,0.075,0.09,0.105,0.12],"2":[0.08,0.1,0.12,0.14,0.16],"3":[3,3,3,3,3]}}'
);

INSERT INTO light_cones (id, slug, name, path, rarity, stats, passive) VALUES (
    '24006',
    'elation-brimming-with-blessings',
    '넘치는 환락의 축복',
    'elation',
    5,
    '{"base":{"hp":43.2,"atk":24,"def":21},"growth":{"hp":6.48,"atk":3.6,"def":3.15},"ascensionAdd":[{"hp":0,"atk":0,"def":0},{"hp":51.84,"atk":28.8,"def":25.2},{"hp":120.96,"atk":67.2,"def":58.8},{"hp":190.08,"atk":105.6,"def":92.4},{"hp":259.2,"atk":144,"def":126},{"hp":328.32,"atk":182.4,"def":159.6},{"hp":397.44,"atk":220.8,"def":193.2}]}',
    '{"name":"오프닝","desc":"장착한 캐릭터의 공격력이 <color=#f29e38ff><unbreak>#1[i]%</unbreak></color> 증가한다. 장착한 캐릭터가 단일 아군 캐릭터에게 전투 스킬 또는 필살기를 발동한 후, 목표의 환락도를 <color=#f29e38ff><unbreak>#2[i]%</unbreak></color> 증가시킨다, 지속 시간: <unbreak>#3[i]</unbreak>턴","params":{"1":[0.2,0.25,0.3,0.35,0.4],"2":[0.12,0.15,0.18,0.21,0.24],"3":[2,2,2,2,2]}}'
);
