export class TurnManager {

    constructor(state) {

        this.state = state;

    }

    /**
     * 다음 행동자
     */
    next() {

        if (this.state.actionQueue.length === 0) {

            return null;

        }

        return this.state.actionQueue.shift();

    }

    /**
     * 행동 예약
     */
    enqueue(action) {

        this.state.actionQueue.push(action);

    }

    /**
     * 추가 행동
     */
    insertNext(action) {

        this.state.actionQueue.unshift(action);

    }

    /**
     * 행동 종료
     */
    finishTurn() {

        this.state.actionCount++;

    }

}