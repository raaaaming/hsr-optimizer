export class BattleContext {

    constructor() {

        // ===== Battle =====

        this.turn = 1;
        this.wave = 1;

        // 행동 순서(AV)
        this.timeline = [];

        // ===== Party =====

        this.party = [];

        // Enemy

        this.enemies = [];

        // ===== Resources =====

        // 전투 스킬 포인트
        this.skillPoints = {
            current: 3,
            max: 5
        };

        // 캐릭터별 에너지
        this.energy = new Map();

        // ===== Battle State =====

        this.buffs = [];

        this.debuffs = [];

        this.summons = [];

        this.memory = [];

        // ===== Statistics =====

        this.totalDamage = 0;

        this.damageLog = [];

        this.actionLog = [];

    }

}