/**
 * 광추 패시브의 해석 — 상시 스탯 + 조건부/피해 버프.
 *
 * 두 출처를 병합한다.
 *   AUTO   : scripts/parse-lightcones.js가 설명문 맨 앞의 상시 스탯을 자동 추출.
 *            (generated/lightConePassivesAuto.js)
 *   MANUAL : 아래 손으로 적은 것. 조건부/피해 버프, 파서가 놓친 것, 자동 추출
 *            수정. 같은 slug면 MANUAL이 AUTO를 덮어쓴다(전체 교체).
 *
 * 각 항목은 수정자(Modifier)다.
 *
 *   { bucket, param, when?, damageTypes? }
 *
 *   bucket  스탯 키(atkPct 등) 또는 상황 버킷(dmgBoost, breakDmgIncrease 등).
 *   param   시드 params의 자리표시자 번호. 값은 중첩 단계로 읽는다.
 *   when    조건. 없으면 상시(최종 스탯 시트 반영). 있으면 그 조건이 활성일
 *           때만 데미지에 반영(시트에는 안 들어감). 스냅샷은 토글, 시뮬은 상태.
 *   damageTypes  특정 데미지 유형에만. (basic/skill/ultimate/followup/dot/break...)
 *
 * 조건 이름 규약(when):
 *   battleStart      전투 시작 시 (초반 몇 턴)
 *   afterUltimate    필살기 발동 후
 *   afterSkill       전투 스킬 발동 후
 *   afterKill        적 처치 후
 *   afterKillOrHit   처치 또는 피격 후
 *   lowHp            자신 HP 낮을 때
 *   enemySlowed      적이 감속 상태
 *   enemyDebuffed    적이 디버프 보유
 *   targetDetonated  대상이 [궤멸] 상태 (반디 전용 광추)
 *
 * HP 회복 / 에너지 / 실드 / 행동 게이지 같은 사이클 효과는 아직 데미지 모델
 * 밖이라 넣지 않는다(값이 0이 아니라 "우리가 안 쓰는" 것).
 */

import { AUTO_LIGHT_CONE_PASSIVES } from "./generated/lightConePassivesAuto.js";

/**
 * 손으로 적은 항목. 조건부/피해 버프가 있거나 파서가 놓친 광추.
 * 상시 스탯도 여기 있으면 AUTO 대신 이걸 쓴다(전체 교체).
 */
const MANUAL = {

    // ===== 상시 스탯 + 조건부 (파서는 상시만 뽑음, 조건부를 여기서 더함) =====

    // 꿈은 어디로 돌아가야 하는가 (반디 전용)
    //   #1 격파 특수효과(상시) / #2 [궤멸] 상태 격파 피해 증가 / #3 속도 감소(적)
    "whereabouts-should-dreams-rest": [
        { bucket: "breakEffect", param: "1" },
        { bucket: "breakDmgIncrease", param: "2", when: "targetDetonated" }
    ],

    // 마음에 새긴 약속: #1 격파 특수효과(상시) / #2 필살기 후 치명타 확률
    "indelible-promise": [
        { bucket: "breakEffect", param: "1" },
        { bucket: "critRate", param: "2", when: "afterUltimate" }
    ],

    // 대체할 수 없는 것: #1 공격력(상시) / #3 처치·피격 후 피해 증가
    "something-irreplaceable": [
        { bucket: "atkPct", param: "1" },
        { bucket: "dmgBoost", param: "3", when: "afterKillOrHit" }
    ],

    // ===== 파서 실패분 — 조건부 스탯 =====

    "arrows": [{ bucket: "critRate", param: "1", when: "battleStart" }],
    "darting-arrow": [{ bucket: "atkPct", param: "1", when: "afterKill" }],
    "adversarial": [{ bucket: "spdPct", param: "1", when: "afterKill" }],
    "mutual-demise": [{ bucket: "critRate", param: "2", when: "lowHp" }],
    "sagacity": [{ bucket: "atkPct", param: "1", when: "afterUltimate" }],
    "dance-at-sunset": [{ bucket: "critDamage", param: "1" }],  // #1 상시 치피(#2~는 추가공격 스택)

    // ===== 상시 피해 증가 (dmgBoost는 상황 버킷이라 when 없어도 시트엔 안 들어감) =====

    "a-secret-vow": [{ bucket: "dmgBoost", param: "1" }],
    "patience-is-all-you-need": [{ bucket: "dmgBoost", param: "2" }],
    "holiday-thermae-escapade": [{ bucket: "dmgBoost", param: "1" }],
    // 속도·피해 모두 "피격 시 사라짐"이라 조건부. spd를 상시로 두면 시트가 부푼다.
    "river-flows-in-spring": [
        { bucket: "spdPct", param: "1", when: "battleStart" },
        { bucket: "dmgBoost", param: "2", when: "battleStart" }
    ],

    // ===== 데미지 유형별 피해 증가 =====

    "collapsing-sky": [{ bucket: "dmgBoost", param: "1", damageTypes: ["basic", "skill"] }],
    "subscribe-for-more": [{ bucket: "dmgBoost", param: "1", damageTypes: ["basic", "skill"] }],
    "data-bank": [{ bucket: "dmgBoost", param: "1", damageTypes: ["ultimate"] }],
    "make-the-world-clamor": [{ bucket: "dmgBoost", param: "1", damageTypes: ["ultimate"] }],
    "the-birth-of-the-self": [{ bucket: "dmgBoost", param: "1", damageTypes: ["followup"] }],

    // ===== 조건부 피해 증가 =====

    "loop": [{ bucket: "dmgBoost", param: "1", when: "enemySlowed" }],
    "shattered-home": [{ bucket: "dmgBoost", param: "2", when: "enemyHighHp" }],
    "in-the-name-of-the-world": [{ bucket: "dmgBoost", param: "1", when: "enemyDebuffed" }],

    // ===== 격파 피해 증가 =====

    "in-pursuit-of-the-wind": [{ bucket: "breakDmgIncrease", param: "1" }],

    // ===== 적 방어 무시/감소 =====

    "thus-burns-the-dawn": [{ bucket: "defIgnore", param: "2" }],
    "a-star-that-lights-the-night": [{ bucket: "defIgnore", param: "7" }],
    "resolution-shines-as-pearls-of-sweat": [{ bucket: "defReduction", param: "2", when: "targetImprisoned" }],

    // ===== 팀 버프 (target: allies => 파티 수집 시 딜러에게 전달) =====

    "chorus": [{ bucket: "atkPct", param: "1", target: "allies" }],
    "past-and-future": [{ bucket: "dmgBoost", param: "1", target: "allies", when: "afterSkill" }],
    // [카덴차]로 모든 아군 피해 증가 (착용자 필살기 후). 스택/에너지 부분은 생략.
    "flowing-nightglow": [{ bucket: "dmgBoost", param: "3", target: "allies", when: "afterUltimate" }],

    // ===== 스택 버프 (값은 스택당, stacks.max까지 쌓임) =====

    // 같은 적 여러 회 명중 시 스택 피해. #2가 최대 스택(5).
    "swordplay": [{ bucket: "dmgBoost", param: "1", stacks: { max: 5 } }],
    // 적 디버프 1개당 피해. #2가 최대 스택(3). 지속 피해에도 적용.
    "good-night-and-sleep-well": [
        { bucket: "dmgBoost", param: "1", stacks: { max: 3 }, when: "enemyDebuffed" }
    ],
    // 필드 적 1기당 공격력(최대 5) + 약점 격파 시 피해 증가
    "night-on-the-milky-way": [
        { bucket: "atkPct", param: "2", stacks: { max: 5 } },
        { bucket: "dmgBoost", param: "1", when: "enemyBroken" }
    ],
    // 상시 피해 증가 + 처치 스택 공격력(최대 #3=3)
    "the-seriousness-of-breakfast": [
        { bucket: "dmgBoost", param: "1" },
        { bucket: "atkPct", param: "2", stacks: { max: 3 }, when: "afterKill" }
    ],
    // 공격 시 스택 공격력(최대 #2=4) + 약점 격파 후 피해 증가
    "on-the-fall-of-an-aeon": [
        { bucket: "atkPct", param: "1", stacks: { max: 4 } },
        { bucket: "dmgBoost", param: "3", when: "enemyBroken" }
    ]

    // 여전히 스킵(데미지 모델 밖): 에너지/행동게이지/SP/힐/실드/받는피해감소,
    //   별도 추가 타격(hidden-shadow/we-will-meet-again — 버프가 아니라 데미지원),
    //   환락도 상태(sneering/lingering-tear/mushy), 랜덤 팀 버프(carve-the-moon),
    //   에너지 최대치 비례(today-is-another-peaceful-day), max 미상 스택(the-moles)

};

export const LIGHT_CONE_PASSIVES = { ...AUTO_LIGHT_CONE_PASSIVES, ...MANUAL };
