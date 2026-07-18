/**
 * 데미지 코어가 검증된 수치를 내는지 확인한다.
 *
 *   node scripts/check-damage.js
 *
 * 공식 상수(레벨 계수, 원소 배율, 격파/초격파 식)를 누가 잘못 건드리면
 * 바로 걸리도록 알려진 값에 못 박는다. check-interpretations와 같은 목적이다.
 *
 * 기준값 출처:
 *   - 초격파: BitTopup 예시. 강인도소모 90, 능력배율 0.25, 격파특효 0 =>
 *     (90/10) × 3767.5533 × 0.25 = 8477.7 (문서의 "Base 8500"과 일치)
 *   - 레벨 계수: HSR Fandom Wiki
 */

import { superBreakDamage, breakDamage, normalDamage } from "../src/formula/damage.js";
import { breakLevelMultiplier } from "../src/formula/breakData.js";
import { Enemy } from "../src/models/Enemy.js";

const problems = [];

const near = (label, actual, expected, tol = 1) => {
    if (Math.abs(actual - expected) > tol) {
        problems.push(`${label}: 기대 ${expected}, 실제 ${actual.toFixed(3)}`);
    }
};

// 레벨 계수 표
near("레벨 계수 80", breakLevelMultiplier(80), 3767.5533, 0.001);
near("레벨 계수 1", breakLevelMultiplier(1), 54.0, 0.001);
near("레벨 계수 95", breakLevelMultiplier(95), 7494.3713, 0.001);

const enemy = new Enemy();
enemy.level = 80;
enemy.toughness = 180;
enemy.resistance.fire = 0;   // 약점 => 저항 0
enemy.currentToughness = 0;  // 격파됨

// 초격파 Base (방어완화 100%로 mitigation 제거, 격파특효 0)
near(
    "초격파 Base",
    superBreakDamage({
        element: "fire", stats: { breakEffect: 0 }, attackerLevel: 80, enemy,
        toughnessReduction: 90, abilityMultiplier: 0.25, defReduction: 1
    }),
    8477.7,
    1
);

// 방어 계수: 레벨 80 공격자 vs 레벨 80 적(방어 1000) => 1000/2000 = 0.5
near(
    "일반 피해 방어/치명타",
    normalDamage({
        base: 1000, element: "fire",
        stats: { critRate: 0, critDamage: 0 }, attackerLevel: 80, enemy
    }),
    500,  // 1000 × 1(속성) × 0.5(방어) × 1(저항) × 1(치명타없음) × 1(격파됨)
    1
);

// 격파 피해가 격파특효로 스케일하는지 (구조 확인)
const be0 = breakDamage({ element: "fire", stats: { breakEffect: 0 }, attackerLevel: 80, enemy, defReduction: 1 });
const be1 = breakDamage({ element: "fire", stats: { breakEffect: 1 }, attackerLevel: 80, enemy, defReduction: 1 });
near("격파 격파특효 100% => 2배", be1 / be0, 2, 0.001);

if (problems.length) {
    console.error(`데미지 코어가 검증값과 어긋난다 (${problems.length}건):\n`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
}

console.log("데미지 코어 검증 통과.");
console.log("  레벨 계수 표 / 초격파 Base / 일반 피해 / 격파 스케일링");
