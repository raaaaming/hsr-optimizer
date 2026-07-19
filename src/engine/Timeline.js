/**
 * 행동값(Action Value) 타임라인.
 *
 * HSR의 행동 순서는 속도로 정해진다. 각 유닛은 10000 "거리"를 자기 속도로
 * 이동하며, 먼저 도착한 유닛이 행동한다. 도착까지 걸리는 AV = 10000 / 속도.
 *   속도 100 => 100 AV마다 행동
 *   속도 134 => 약 74.6 AV마다 행동 (더 자주)
 *
 * 이 엔진은 순수하게 "누가 언제 행동하는가"만 계산한다. 그 턴에 무엇을
 * 하는지(버프/데미지)는 상위 시뮬레이터가 콜백으로 처리한다.
 *
 * 서포터가 딜러보다 먼저 행동하면 버프가 딜러 턴에 걸리고, 느리면 안 걸린다.
 * 그 타이밍이 여기 행동 순서에서 자동으로 나온다 — 손으로 지정하지 않는다.
 */

const BASE_DISTANCE = 10000;

const avToAct = speed => BASE_DISTANCE / speed;

export class Timeline {

    /**
     * units: [{ id, speed }]
     */
    constructor(units) {

        // 전투 시작 시 모두 같은 출발선. av = 첫 행동까지 남은 AV.
        this.units = units.map(u => ({
            id: u.id,
            speed: u.speed,
            av: avToAct(u.speed)
        }));

        this.time = 0;

    }

    unit(id) {
        return this.units.find(u => u.id === id);
    }

    /** 다음에 행동할 유닛(앞당기지 않고 확인만). av가 같으면 먼저 등록된 순. */
    peek() {

        return this.units.reduce(
            (min, u) => (u.av < min.av ? u : min),
            this.units[0]
        );

    }

    /**
     * 다음 행동으로 진행한다. { time, unit: id }.
     *
     * 가장 av가 작은 유닛이 행동한다. 전원의 av를 그만큼 줄이고, 행동한
     * 유닛의 av를 다시 채운다. 전역 시간도 그만큼 흐른다.
     */
    advance() {

        const actor = this.peek();

        const dt = actor.av;

        for (const u of this.units) {
            u.av -= dt;
        }

        this.time += dt;

        // 행동한 유닛은 다음 행동까지 다시 채운다.
        actor.av = avToAct(actor.speed);

        return { time: this.time, unit: actor.id };

    }

    /**
     * 행동 게이지 앞당기기. 그 유닛의 남은 av를 pct(0~1)만큼 줄인다.
     * 필살기·스킬로 "행동 앞당기기"를 표현한다.
     */
    actionAdvance(id, pct) {

        const u = this.unit(id);

        if (u) u.av *= (1 - Math.min(Math.max(pct, 0), 1));

    }

    /** 유닛 속도를 바꾼다(버프/디버프). 남은 av는 새 속도 비율로 다시 잡는다. */
    setSpeed(id, speed) {

        const u = this.unit(id);

        if (!u) return;

        // 남은 진행 비율을 유지한 채 속도만 반영한다.
        const remaining = u.av / avToAct(u.speed);
        u.speed = speed;
        u.av = remaining * avToAct(speed);

    }

    /**
     * 시간 예산까지 행동 순서를 뽑는다. [{ time, unit }].
     * 예산을 넘는 행동은 제외한다.
     */
    run(budget) {

        const events = [];

        // 안전장치: 무한 루프 방지(속도 0 등).
        let guard = 0;

        while (this.peek().av + this.time <= budget && guard++ < 100000) {
            events.push(this.advance());
        }

        return events;

    }

}
