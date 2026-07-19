/**
 * AV 타임라인 위에서 도는 전투 시뮬레이터.
 *
 * Timeline이 "누가 언제 행동하는가"를 주면, 여기서 그 순서대로 각 유닛의
 * 턴을 실행한다. 턴에 무엇을 하는지(버프 적용/데미지)는 캐릭터 킷이 콜백으로
 * 넘긴다 — 아직 없으니 지금은 골격이다.
 *
 * 핵심은 "버프 타이밍이 자동으로 나온다"는 것이다.
 *   - 조건(condition)에 만료 시간을 붙인다. 서포터가 행동하며 버프를 켜면
 *     그 시점부터 지속 시간(AV)만큼 활성이다.
 *   - 딜러가 데미지를 넣을 때, 그 시점에 활성인 조건만 ModifierSet에 반영된다.
 *   - 그래서 딜러보다 먼저 행동한 서포터의 버프만 걸리고, 느리면 안 걸린다.
 *     사용자가 "이 버프 켜"라고 지정하지 않는다.
 *
 * 지속 시간은 AV로 다룬다. "2턴"은 캐릭터 킷이 대상 속도로 AV 환산해 넘긴다.
 */

import { Timeline } from "./Timeline.js";

export class Simulator {

    /**
     * units: [{ id, speed }]
     * budget: AV 예산 (여기까지 시뮬)
     */
    constructor({ units, budget = 600 }) {

        this.timeline = new Timeline(units);
        this.budget = budget;

        // 조건 => 만료 시간(AV). 만료 시간이 현재 시간보다 크면 활성.
        this.conditions = new Map();

        this.log = [];

    }

    get time() {
        return this.timeline.time;
    }

    /**
     * 조건을 켠다. 지금부터 durationAV 동안 활성.
     * 이미 있으면 더 늦은 만료로 갱신한다(리프레시).
     */
    setCondition(condition, durationAV = Infinity) {

        const expiry = this.time + durationAV;
        const prev = this.conditions.get(condition) ?? 0;
        this.conditions.set(condition, Math.max(prev, expiry));

    }

    /** 지금 활성인 조건 집합. 만료된 건 뺀다. */
    activeConditions() {

        const active = new Set();

        for (const [condition, expiry] of this.conditions) {
            if (expiry > this.time) active.add(condition);
        }

        return active;

    }

    /** 행동 게이지 앞당기기 / 속도 변경을 킷이 부를 수 있게 노출. */
    actionAdvance(id, pct) {
        this.timeline.actionAdvance(id, pct);
    }

    setSpeed(id, speed) {
        this.timeline.setSpeed(id, speed);
    }

    /**
     * 타임라인을 예산까지 돌린다. 매 턴 onTurn({ actorId, time, sim })을 부른다.
     *
     * onTurn은 캐릭터 킷이 준다. 그 안에서 sim.setCondition(...)으로 버프를 켜거나,
     * 데미지를 계산해 sim.log에 남긴다.
     */
    run(onTurn) {

        let guard = 0;

        while (this.timeline.peek().av + this.time <= this.budget && guard++ < 100000) {

            const { time, unit } = this.timeline.advance();

            onTurn({ actorId: unit, time, sim: this });

        }

        return { log: this.log, time: this.time };

    }

}
