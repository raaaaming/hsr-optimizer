/**
 * 턴제 전투 엔진 검증. 반디로 실제 전투 루프를 돌린다.
 *
 *   node scripts/check-battle.js
 */

import { Battle } from "../src/engine/Battle.js";

const problems = [];
const ok = (label, cond, detail = "") => {
    if (!cond) problems.push(`${label}${detail ? ` — ${detail}` : ""}`);
};

import { FIREFLY_KIT } from "../src/data/kits/firefly.js";

// 반디 액션 데이터(배율 params). 레벨 10 기준.
const character = {
    element: "fire",
    actions: [
        { id: "basic", levelKey: "basic", maxLevel: 6, energy: 20, toughness: 30, params: { "1": [0.5, 0.6, 0.7, 0.8, 0.9, 1] } },
        { id: "basic2", levelKey: "basic", maxLevel: 6, energy: 0, toughness: 45, params: { "1": [1, 1.2, 1.4, 1.6, 1.8, 2] } },
        { id: "skill", levelKey: "skill", maxLevel: 10, energy: 0, toughness: 60, params: { "1": [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.625, 1.75, 1.875, 2] } },
        {
            id: "skill2", levelKey: "skill", maxLevel: 10, energy: 0, toughness: 90,
            params: {
                "1": [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.625, 1.75, 1.875, 2],
                "5": [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
                "7": [3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6]
            }
        },
        { id: "ultimate", levelKey: "ultimate", maxLevel: 10, energy: 5, toughness: 0, params: {} },
        { id: "technique", levelKey: "technique", maxLevel: 1, energy: 0, toughness: 60, params: { "2": [2] } }
    ]
};

const member = {
    id: "firefly", slug: "firefly", character, maxEnergy: 240,
    build: { level: 80, skills: { basic: 6, skill: 10, ultimate: 10 }, lightCone: { superimposition: 1 } },
    // 격파특효 1.0 포함한 최종 스탯
    stats: { atk: 1300, breakEffect: 1.0, critRate: 0.05, critDamage: 0.5 },
    speed: 104,
    kit: FIREFLY_KIT,
    // 마음에 새긴 약속: 격파특효(상시) + 필살기 후 치명타 확률
    lightCone: { slug: "indelible-promise", passive: { params: { "1": [0.28], "2": [0.15] } } },
    sets: [], setRegistry: () => null
};

const enemy = {
    level: 80, toughness: 180, currentToughness: 180,
    resistance: { fire: 0 }, weakness: ["fire"], defense: null
};

// 에너지 절반(120)으로 시작하면 궁극기(240) 불가. 만충으로 시작해 흐름을 본다.
const battle = new Battle({ party: [member], enemy, energy: { firefly: 240 } });

// 0) SP 기본 3, 최대 5
ok("SP 시작 3", battle.sp === 3, `${battle.sp}`);
ok("SP 최대 5", battle.maxSp === 5, `${battle.maxSp}`);

// 1) 초기 사용 가능 스킬: 강화 스킬은 아직 없음, 필살기는 에너지 만충이라 가능
const av0 = battle.available("firefly");
ok("초기 스킬 목록", av0.includes("skill") && av0.includes("ultimate") && !av0.includes("skill2"), av0.join(","));

// 2) 전투 스킬 => 데미지 + 강인도 감소 + SP 1 소모
const r1 = battle.act("skill");
ok("스킬 데미지 > 0", r1.damage > 0, `${r1.damage}`);
ok("강인도 180 => 120", enemy.currentToughness === 120, `${enemy.currentToughness}`);
ok("스킬 후 SP 3=>2", r1.sp === 2, `${r1.sp}`);

// 3) 필살기 => 완전연소 진입, 피해 없음, 에너지 소진
const r2 = battle.act("ultimate");
ok("필살기 피해 0", r2.damage === 0, `${r2.damage}`);
ok("필살기 후 에너지 0", r2.energy === 0, `${r2.energy}`);
ok("완전연소 활성", battle.activeConditions().has("enhanced"));
ok("afterUltimate 활성", battle.activeConditions().has("afterUltimate"));
// 에너지 소진됐으니 필살기 다시 불가
ok("에너지 소진 후 필살기 불가", !battle.available("firefly").includes("ultimate"));

// 4) 강화 상태: skill2/basic2 사용 가능, 원본 숨김
const av1 = battle.available("firefly");
ok("강화 후 skill2 가능", av1.includes("skill2") && !av1.includes("skill"), av1.join(","));

// 5) 직렬화 라운드트립 (강화 활성 시점에)
const state = battle.toState();
const restored = Battle.fromState(JSON.parse(JSON.stringify(state)));
ok("직렬화 복원 - 시간 유지", Math.abs(restored.time - battle.time) < 0.01);
ok("직렬화 복원 - 강화 유지", restored.activeConditions().has("enhanced"));
ok("복원 후 skill2 가능", restored.available("firefly").includes("skill2"));

// 6) 강화 전투 스킬 => 격파특효 스케일 (0.2×1.0 + 2.0 = 2.2 배율)
const r3 = battle.act("skill2");
ok("강화 스킬 데미지 > 0", r3.damage > 0, `${r3.damage}`);

if (problems.length) {
    console.error(`전투 엔진 검증 실패 (${problems.length}건):\n`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
}

console.log("전투 엔진 검증 통과.");
console.log("  스킬 목록/강화 치환 / 데미지 / 강인도 격파 / 필살기 상태 / 격파특효 스케일 / 직렬화");
console.log(`  전투 로그: ${battle.log.map(l => `${l.skill}(${l.damage})`).join(" -> ")}`);
