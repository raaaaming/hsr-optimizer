export class EventBus {

    constructor() {

        /**
         * key   : event name
         * value : handler Set
         */
        this.listeners = new Map();

    }

    on(event, listener) {

        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }

        this.listeners.get(event).add(listener);

        // 구독 해제 함수
        return () => this.off(event, listener);

    }

    off(event, listener) {

        this.listeners.get(event)?.delete(listener);

    }

    emit(event, payload) {

        const listeners = this.listeners.get(event);

        if (!listeners) return;

        // 리스너가 emit 도중 구독을 바꿔도 안전하도록 복사본을 순회한다.
        for (const listener of [...listeners]) {
            listener(payload);
        }

    }

    clear() {

        this.listeners.clear();

    }

}
