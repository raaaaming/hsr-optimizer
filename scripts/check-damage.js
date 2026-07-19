/**
 * 데미지 코어 + 수정자 시스템이 검증된 수치를 내는지 확인한다.
 *
 *   node scripts/check-damage.js
 *
 * 공식 상수(레벨 계수, 원소 배율, 격파/초격파 식)와 2층 수정자 합산을
 * 알려진 값에 못 박는다. check-interpretations와 같은 목적이다.
 *
 * 기준값 출처:
 *   - 초격파: BitTopup 예시. 강인도소모 90, 능력배율 0.25, 격파특효 0 =>
 *     (90/10) × 3767.5533 × 0.25 = 8477.7 (문서의 "Base 8500"과 일치)
 *   - 나머지 공식/계수: HSR Fandom Wiki (Damage, Toughness)
 */

import {
    superBreakDamage, breakDamage, normalDamage
} from "../src/formula/damage.js";
import { breakLevelMultiplier } from "../src/formula/breakData.js";
import { ModifierSet } from "../src/formula/modifiers.js";
import { lightConeModifiers, collectPartyModifiers } from "../src/formula/modifierSources.js";
import { Enemy } from "../src/models/Enemy.js";

const problems = [];

const near = (label, actual, expected, tol = 1) => {
    if (Math.abs(actual - expected) > tol) {
        problems.push(`${label}: 기대 ${expected}, 실제 ${actual.toFixed(3)}`);
    }
};

// ===== 레벨 계수 표 =====
near("레벨 계수 80", breakLevelMultiplier(80), 3767.5533, 0.001);
near("레벨 계수 1", breakLevelMultiplier(1), 54.0, 0.001);
near("레벨 계수 95", breakLevelMultiplier(95), 7494.3713, 0.001);

const enemy = new Enemy();
enemy.level = 80;
enemy.toughness = 180;
enemy.resistance.fire = 0;   // 약점 => 저항 0
enemy.currentToughness = 0;  // 격파됨

// ===== 초격파 Base (BitTopup 교차검증) =====
near(
    "초격파 Base",
    superBreakDamage({
        element: "fire", stats: { breakEffect: 0 }, attackerLevel: 80, enemy,
        toughnessReduction: 90, abilityMultiplier: 0.25,
        situational: { defReduction: 1 }  // 방어완화 100% => 방어계수 1
    }),
    8477.7,
    1
);

// ===== 일반 피해: 방어 계수 =====
// 레벨 80 공격자 vs 레벨 80 적(방어 1000) => 1000/2000 = 0.5
near(
    "일반 피해 방어 0.5",
    normalDamage({
        base: 1000, element: "fire",
        stats: { critRate: 0, critDamage: 0 }, attackerLevel: 80, enemy
    }),
    500,
    1
);

// ===== 새 항: 약화(Weaken) =====
// 위키 일반 공식의 (1 - Weaken). 20% 약화 => 0.8배
near(
    "약화 20% => 0.8배",
    normalDamage({
        base: 1000, element: "fire", stats: {}, attackerLevel: 80, enemy,
        situational: { weaken: 0.2 }
    }),
    400,  // 1000 × 0.5(방어) × 0.8(약화)
    1
);

// ===== 새 항: 피해 감면(DMG Mitigation) =====
near(
    "피해 감면 10% => 0.9배",
    normalDamage({
        base: 1000, element: "fire", stats: {}, attackerLevel: 80, enemy,
        situational: { dmgMitigation: 0.1 }
    }),
    450,  // 1000 × 0.5 × 0.9
    1
);

// ===== Base DMG 조립: 배율증가 + 고정피해 =====
// scaling 1000 × (배율 2.0 + 배율증가 0.5) + 고정피해 300 = 2800, × 0.5(방어) = 1400
near(
    "배율증가+고정피해",
    normalDamage({
        scaling: 1000, multiplier: 2.0, element: "fire", stats: {},
        attackerLevel: 80, enemy,
        situational: { dmgMultiplierIncrease: 0.5, extraDmg: 300 }
    }),
    1400,
    1
);

// ===== 2층 수정자: 조건부 적용 =====
const mods = new ModifierSet()
    .add({ bucket: "dmgBoost", value: 0.4, when: "enhanced" })   // 강화 상태에서만
    .add({ bucket: "vulnerability", value: 0.1 })                 // 항상
    .add({ bucket: "atkPct", value: 0.3, when: "ultimate" });     // 필살기 후에만

// 조건 없음: dmgBoost/atkPct 안 붙고 vulnerability만
const off = mods.resolve({ conditions: new Set(), damageType: "normal" });
near("조건 미충족 dmgBoost", off.situational.dmgBoost ?? 0, 0, 0.0001);
near("항상 취약", off.situational.vulnerability, 0.1, 0.0001);
if ((off.statBonus.atkPct ?? 0) !== 0) problems.push("조건 미충족 atkPct가 붙었다");

// 강화 조건: dmgBoost 붙음
const on = mods.resolve({ conditions: new Set(["enhanced", "ultimate"]), damageType: "normal" });
near("강화 시 dmgBoost", on.situational.dmgBoost, 0.4, 0.0001);
near("필살기 시 atkPct", on.statBonus.atkPct, 0.3, 0.0001);

// 데미지 유형 필터: 추가타 전용 버프
const fua = new ModifierSet()
    .add({ bucket: "dmgBoost", value: 0.25, damageTypes: ["followup"] });
near("추가타 버프 - 일반 피해엔 미적용",
    fua.resolve({ conditions: new Set(), damageType: "normal" }).situational.dmgBoost ?? 0, 0, 0.0001);
near("추가타 버프 - 추가타엔 적용",
    fua.resolve({ conditions: new Set(), damageType: "followup" }).situational.dmgBoost, 0.25, 0.0001);

// ===== 광추 수정자: 상시 + 조건부 =====
// 꿈은 어디로 돌아가야 하는가: #1 격파특효(상시), #2 궤멸 시 격파피해증가(조건부)
const whereabouts = {
    slug: "whereabouts-should-dreams-rest",
    passive: { params: { "1": [0.6, 0.7, 0.8, 0.9, 1], "2": [0.24, 0.28, 0.32, 0.36, 0.4] } }
};
const lcMods = lightConeModifiers(whereabouts, 1);  // 중첩 1
const lcSet = new ModifierSet().add(lcMods);

// 궤멸 조건 없음: 격파특효만(상시), 격파피해증가 없음
const noDet = lcSet.resolve({ conditions: new Set(), damageType: "break" });
near("광추 상시 격파특효", noDet.statBonus.breakEffect, 0.6, 0.0001);
near("궤멸 미충족 격파피해증가", noDet.situational.breakDmgIncrease ?? 0, 0, 0.0001);

// 궤멸 조건 충족: 격파피해증가 붙음
const det = lcSet.resolve({ conditions: new Set(["targetDetonated"]), damageType: "break" });
near("궤멸 시 격파피해증가", det.situational.breakDmgIncrease, 0.24, 0.0001);

// ===== 스택 버프: 값은 스택당, 최대까지 =====
const stackSet = new ModifierSet().add({
    bucket: "dmgBoost", value: 0.05, stacks: { max: 5 }, source: "test"
});
// 스택 수 미지정 => 최대(5)
near("스택 기본=최대", stackSet.resolve({ conditions: new Set(), damageType: "normal" }).situational.dmgBoost, 0.25, 0.0001);
// 스택 3 지정
near("스택 3", stackSet.resolve({ conditions: new Set(), damageType: "normal", stacks: { test: 3 } }).situational.dmgBoost, 0.15, 0.0001);
// 최대 초과 지정 => 최대로 고정
near("스택 초과=최대", stackSet.resolve({ conditions: new Set(), damageType: "normal", stacks: { test: 99 } }).situational.dmgBoost, 0.25, 0.0001);

// ===== 파티 수집: 서포터 팀 버프는 딜러에게, self 버프는 안 감 =====
// 실제 광추로 검증한다. only-silence-remains=atkPct(self), chorus=atkPct(allies)
const onlySilence = slug => ({
    slug, passive: { params: { "1": [0.24, 0.28, 0.32, 0.36, 0.4] } }, build: {}
});
const chorus = { slug: "chorus", passive: { params: { "1": [0.08, 0.09, 0.1, 0.11, 0.12] } }, build: {} };

// 딜러(only-silence, self) + 서포터(chorus, allies) => 둘 다 딜러에게
const withSupport = collectPartyModifiers([onlySilence("only-silence-remains"), chorus], 0)
    .resolve({ conditions: new Set(), damageType: "normal" });
near("서포터 팀 버프가 딜러에게", withSupport.statBonus.atkPct, 0.24 + 0.08, 0.0001);

// 딜러(only-silence, self) + 서포터(only-silence, self) => 서포터 self는 안 감
const selfOnly = collectPartyModifiers([onlySilence("only-silence-remains"), onlySilence("only-silence-remains")], 0)
    .resolve({ conditions: new Set(), damageType: "normal" });
near("서포터 self 버프는 딜러에게 안 감", selfOnly.statBonus.atkPct, 0.24, 0.0001);

if (problems.length) {
    console.error(`데미지 코어/수정자가 검증값과 어긋난다 (${problems.length}건):\n`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
}

console.log("데미지 코어 + 수정자 검증 통과.");
console.log("  레벨 계수 / 초격파 / 방어·약화·피해감면 / Base 조립");
console.log("  조건부·유형 수정자 / 광추 상시+조건부 / 스택 / 파티 수집(팀 버프 라우팅)");
