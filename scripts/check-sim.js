/**
 * AV 타임라인/시뮬레이터 검증.
 *
 *   node scripts/check-sim.js
 *
 * "행동 순서가 속도로 정해지고, 버프 타이밍이 그 순서에서 자동으로 나온다"를
 * 못 박는다.
 */

import { Timeline } from "../src/engine/Timeline.js";
import { Simulator } from "../src/engine/Simulator.js";

const problems = [];
const ok = (label, cond, detail = "") => {
    if (!cond) problems.push(`${label}${detail ? ` — ${detail}` : ""}`);
};
const near = (label, a, b, tol = 0.01) => ok(label, Math.abs(a - b) <= tol, `${a} vs ${b}`);

// ===== 단일 유닛: 속도 100 => 100 AV마다 =====
{
    const tl = new Timeline([{ id: "a", speed: 100 }]);
    const events = tl.run(300);
    ok("속도100 3회 행동", events.length === 3, `${events.length}회`);
    near("첫 행동 100 AV", events[0].time, 100);
    near("셋째 행동 300 AV", events[2].time, 300);
}

// ===== 빠른 유닛이 더 자주 =====
{
    const tl = new Timeline([{ id: "fast", speed: 160 }, { id: "slow", speed: 100 }]);
    const events = tl.run(800);
    const fast = events.filter(e => e.unit === "fast").length;
    const slow = events.filter(e => e.unit === "slow").length;
    ok("빠른 유닛이 더 많이 행동", fast > slow, `fast ${fast} vs slow ${slow}`);
    ok("첫 행동은 빠른 유닛", events[0].unit === "fast");
    // 160은 800/  (10000/160=62.5) => 12회, 100은 8회
    ok("속도160 ≈ 12회", fast === 12, `${fast}`);
    ok("속도100 ≈ 8회", slow === 8, `${slow}`);
}

// ===== 행동 앞당기기: av를 줄인다 =====
{
    const tl = new Timeline([{ id: "a", speed: 100 }, { id: "b", speed: 100 }]);
    // a를 50% 앞당기면 a가 먼저 행동
    tl.actionAdvance("a", 0.5);
    ok("앞당긴 유닛이 먼저", tl.peek().id === "a");
}

// ===== 버프 타이밍: 서포터가 먼저 행동하면 딜러 턴에 버프가 걸린다 =====
// 서포터 속도 120(먼저) vs 딜러 100. 서포터가 행동하며 "atkBuff"를 넉넉히 켠다.
{
    const sim = new Simulator({ units: [{ id: "sup", speed: 120 }, { id: "dps", speed: 100 }], budget: 200 });
    const buffAtDpsTurns = [];
    sim.run(({ actorId, sim }) => {
        if (actorId === "sup") sim.setCondition("atkBuff", 100);   // 100 AV 지속
        if (actorId === "dps") buffAtDpsTurns.push(sim.activeConditions().has("atkBuff"));
    });
    ok("빠른 서포터 버프가 딜러 첫 턴에 걸림", buffAtDpsTurns[0] === true, JSON.stringify(buffAtDpsTurns));
}

// ===== 반대: 서포터가 느리면 딜러 첫 턴엔 버프가 없다 =====
{
    const sim = new Simulator({ units: [{ id: "sup", speed: 90 }, { id: "dps", speed: 100 }], budget: 100 });
    const buffAtDpsTurns = [];
    sim.run(({ actorId, sim }) => {
        if (actorId === "sup") sim.setCondition("atkBuff", 100);
        if (actorId === "dps") buffAtDpsTurns.push(sim.activeConditions().has("atkBuff"));
    });
    // 딜러(속도100)가 100AV에, 서포터(속도90)가 111AV에 => 딜러 첫 턴엔 버프 없음
    ok("느린 서포터 버프는 딜러 첫 턴에 없음", buffAtDpsTurns[0] === false, JSON.stringify(buffAtDpsTurns));
}

// ===== 조건 만료 =====
{
    const sim = new Simulator({ units: [{ id: "a", speed: 100 }], budget: 500 });
    sim.setCondition("short", 50);   // 50 AV만 지속
    // 시간 0에는 활성
    ok("만료 전 활성", sim.activeConditions().has("short"));
    sim.run(() => {});   // 시간 진행(100 AV+)
    ok("만료 후 비활성", !sim.activeConditions().has("short"));
}

if (problems.length) {
    console.error(`AV 시뮬 검증 실패 (${problems.length}건):\n`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
}

console.log("AV 시뮬 검증 통과.");
console.log("  행동 순서(속도) / 앞당기기 / 버프 타이밍(서포터 순서) / 조건 만료");
