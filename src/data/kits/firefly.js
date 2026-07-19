/**
 * 반디 스킬 킷.
 *
 * 각 액션이 "무엇을 하는가"를 데이터로 적는다. 로테이션(언제 뭘 쓰나)은
 * 데이터가 아니라 사용자가 턴제로 직접 정한다.
 *
 * action:
 *   damageType   normal | superBreak | break | dot | none
 *   scaling      배율이 곱해지는 스탯 (atk 등)
 *   param        시드 params의 자리표시자 번호. 스킬 레벨로 값을 읽는다.
 *   multiplier   param 대신 함수로 배율을 구할 때 (반디 강화 스킬은 격파특효 스케일)
 *   sp           전투 스킬 포인트 변화 (일반 +1, 스킬 -1, 강화 스킬 0 등)
 *   target       single | blast | all
 *   requires     이 조건이 활성일 때만 사용 가능 (강화 스킬)
 *   buffs        [{ condition, turns }] 이 액션이 켜는 버프
 *   enter        진입하는 상태 조건 (필살기 => enhanced)
 *
 * 에너지·강인도는 시드(Yatta)에서 온다. 킷엔 안 적는다.
 */
export const FIREFLY_KIT = {

    slug: "firefly",

    // 반디는 필살기로 「완전연소」에 진입하면 일반/전투 스킬이 강화된다.
    enhanceCondition: "enhanced",

    actions: {

        basic: {
            name: "지령-폭연 추진",
            damageType: "normal", scaling: "atk", param: "1",
            sp: 1, target: "single"
        },

        // 강화 일반 공격 (완전연소 상태)
        basic2: {
            name: "반딧불이 Type-IV·뇌관 참격",
            damageType: "normal", scaling: "atk", param: "1",
            sp: 1, target: "single", requires: "enhanced"
        },

        skill: {
            name: "지령-천공 포격",
            damageType: "normal", scaling: "atk", param: "1",
            sp: -1, target: "single"
        },

        // 강화 전투 스킬: 공격력 × (0.2×격파특효 + 2.0), 격파특효 상한 3.6
        skill2: {
            name: "반딧불이 Type-IV·데스 스타 과부하",
            damageType: "normal", scaling: "atk",
            multiplier: ({ param, stats }) =>
                param("5") * Math.min(stats.breakEffect ?? 0, param("7")) + param("1"),
            sp: 0, target: "blast", requires: "enhanced"
        },

        // 필살기: 피해 없음. 완전연소 진입 + 강화.
        ultimate: {
            name: "반딧불이 Type-IV·완전연소",
            damageType: "none",
            enter: "enhanced",
            // 완전연소: 속도 증가(#3), 적 받는 격파 피해 증가(#1)는 강화 스킬에 반영
            buffs: [{ condition: "enhanced", turns: 1 }]
        },

        technique: {
            name: "Δ지령-초토화 운석 폭격",
            damageType: "normal", scaling: "atk", param: "2",
            sp: 0, target: "all"
        }

    }

};
