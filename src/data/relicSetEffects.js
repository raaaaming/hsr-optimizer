/**
 * 유물 세트 효과의 해석 — 상시 스탯 + 조건부/피해 버프.
 *
 * lightConePassives.js와 같은 수정자(Modifier) 형식이다.
 *
 *   { pieces, bucket, param, when?, target?, stacks?, damageTypes? }
 *
 *   pieces  이 효과가 나오는 세트 개수(2 또는 4). 기본 2. 그 개수 이상
 *           착용해야 적용되고, 값은 effects[pieces].params[param]에서 읽는다.
 *   bucket  스탯 키 또는 상황 버킷.
 *   param   자리표시자 번호. 유물 세트는 중첩이 없어 값이 단일이다.
 *   when/target/stacks/damageTypes  lightConePassives.js와 동일.
 *
 * 자리표시자가 항상 #1인 건 아니다(sigonia는 상시가 #3). 세트마다 직접 적는다.
 *
 * 조건(when) 규약: lightConePassives.js 참고. 추가로 —
 *   enemyImprisoned  적이 속박/함락 상태
 *   quantumWeakness  적이 양자 약점 보유
 *   afterFollowup    추가 공격 발동 후
 *   hasSummon        소환/기억 정령이 필드에
 *   highSpeed        착용자 속도가 문턱 이상 (엔진이 최종 스탯으로 판정)
 *   highCritRate     착용자 치명타 확률이 문턱 이상
 *
 * 사이클(에너지/SP/행동게이지)·힐·실드·속도 문턱 복잡·기억 정령 전용은 생략한다.
 */
export const RELIC_SET_EFFECTS = {

    // ===== 유물 (4부위) — 2세트 상시 스탯 =====

    "passerby-of-wandering-cloud":      [{ bucket: "outgoingHealing", param: "1" }],
    "musketeer-of-wild-wheat": [
        { bucket: "atkPct", param: "1" },
        // 4세트: 속도 +6%, 일반 공격 피해 +10% (둘 다 상시)
        { pieces: 4, bucket: "spdPct", param: "1" },
        { pieces: 4, bucket: "dmgBoost", param: "2", damageTypes: ["basic"] }
    ],
    "knight-of-purity-palace":          [{ bucket: "defPct", param: "1" }],
    "hunter-of-glacial-forest": [
        { bucket: "iceDmg", param: "1" },
        { pieces: 4, bucket: "critDamage", param: "1", when: "afterUltimate" }
    ],
    "champion-of-streetwise-boxing": [
        { bucket: "physicalDmg", param: "1" },
        { pieces: 4, bucket: "atkPct", param: "1", stacks: { max: 5 } }
    ],
    "guard-of-wuthering-snow":          [{ bucket: "dmgReduction", param: "1" }],
    "firesmith-of-lava-forging": [
        { bucket: "fireDmg", param: "1" },
        { pieces: 4, bucket: "dmgBoost", param: "1", damageTypes: ["skill"] },
        { pieces: 4, bucket: "fireDmg", param: "2", when: "afterUltimate" }
    ],
    "genius-of-brilliant-stars": [
        { bucket: "quantumDmg", param: "1" },
        { pieces: 4, bucket: "defIgnore", param: "1" },
        { pieces: 4, bucket: "defIgnore", param: "2", when: "quantumWeakness" }
    ],
    "band-of-sizzling-thunder": [
        { bucket: "lightningDmg", param: "1" },
        { pieces: 4, bucket: "atkPct", param: "1", when: "afterSkill" }
    ],
    "eagle-of-twilight-line":           [{ bucket: "windDmg", param: "1" }],  // 4세트: 행동게이지(사이클)
    "thief-of-shooting-meteor": [
        { bucket: "breakEffect", param: "1" },
        { pieces: 4, bucket: "breakEffect", param: "1" }  // 4세트도 격파특효 +16%
    ],
    "wastelander-of-banditry-desert": [
        { bucket: "imaginaryDmg", param: "1" },
        { pieces: 4, bucket: "critRate", param: "1", when: "enemyDebuffed" },
        { pieces: 4, bucket: "critDamage", param: "2", when: "enemyImprisoned" }
    ],
    "longevous-disciple": [
        { bucket: "hpPct", param: "1" },
        { pieces: 4, bucket: "critRate", param: "1", stacks: { max: 2 }, when: "afterKillOrHit" }
    ],
    "messenger-traversing-hackerspace": [{ bucket: "spdPct", param: "1" }],  // 4세트: 팀 속도(사이클)
    "prisoner-in-deep-confinement": [
        { bucket: "atkPct", param: "1" },
        { pieces: 4, bucket: "defIgnore", param: "1", stacks: { max: 3 }, when: "enemyDebuffed" }
    ],
    // 2세트가 조건부 피해증가(상시 스탯 없음), 4세트는 치명타
    "pioneer-diver-of-dead-waters": [
        { bucket: "dmgBoost", param: "1", when: "enemyDebuffed" },
        { pieces: 4, bucket: "critRate", param: "1" },
        { pieces: 4, bucket: "critDamage", param: "2", when: "enemyDebuffed" }
    ],
    "watchmaker-master-of-dream-machinations": [
        { bucket: "breakEffect", param: "1" },
        { pieces: 4, bucket: "breakEffect", param: "1", target: "allies", when: "afterUltimate" }
    ],
    "iron-cavalry-against-the-scourge": [{ bucket: "breakEffect", param: "1" }],
        // 4세트: 격파특효 문턱 조건 격파/초격파 방어 무시 — 자기 스탯 문턱이라 생략
    "the-wind-soaring-valorous": [
        { bucket: "atkPct", param: "1" },
        { pieces: 4, bucket: "critRate", param: "1" },
        { pieces: 4, bucket: "dmgBoost", param: "2", damageTypes: ["ultimate"], when: "afterFollowup" }
    ],
    "sacerdos-relived-ordeal": [
        { bucket: "spdPct", param: "1" },
        { pieces: 4, bucket: "critDamage", param: "1", target: "ally", stacks: { max: 2 } }
    ],
    "scholar-lost-in-erudition": [
        { bucket: "critRate", param: "1" },
        { pieces: 4, bucket: "dmgBoost", param: "1", damageTypes: ["skill", "ultimate"] }
    ],
    "hero-of-triumphant-song":          [{ bucket: "atkPct", param: "1" }],  // 4세트: 기억 정령 전용
    "poet-of-mourning-collapse":        [{ bucket: "quantumDmg", param: "1" }],  // 4세트: 속도 문턱 복잡
    "warrior-goddess-of-sun-and-thunder": [{ bucket: "spdPct", param: "1" }],  // 4세트: 힐 기반
    "wavestrider-captain":              [{ bucket: "critDamage", param: "1" }],  // 4세트: 조력 스택 복잡
    "world-remaking-deliverer":         [{ bucket: "critRate", param: "1" }],  // 4세트: HP 기반
    "self-enshrouded-recluse":          [{ bucket: "shieldBoost", param: "1" }],  // 4세트: 실드
    "ever-glorious-magical-girl":       [{ bucket: "critDamage", param: "1" }],  // 4세트: 환락 전용
    "diviner-of-distant-reach":         [{ bucket: "spdPct", param: "1" }],  // 4세트: 속도 문턱
    "as-navigator-isee-sees-it": [
        { bucket: "atkPct", param: "1" },
        { pieces: 4, bucket: "dmgBoost", param: "1", damageTypes: ["skill", "ultimate"], stacks: { max: 3 } }
    ],
    "divine-querying-master-smith": [
        { bucket: "hpPct", param: "1" },
        { pieces: 4, bucket: "critDamage", param: "1", when: "enemyDefDown" }
    ],

    // ===== 행성구 (2부위) — 상시 스탯 + 조건부 =====

    "space-sealing-station": [
        { bucket: "atkPct", param: "1" },
        { bucket: "atkPct", param: "3", when: "highSpeed" }
    ],
    "fleet-of-the-ageless": [
        { bucket: "hpPct", param: "1" },
        { bucket: "atkPct", param: "3", target: "allies", when: "highSpeed" }
    ],
    "pan-cosmic-commercial-enterprise": [{ bucket: "effectHitRate", param: "1" }],
    "belobog-of-the-architects":        [{ bucket: "defPct", param: "1" }],
    "celestial-differentiator":         [{ bucket: "critDamage", param: "1" }],
    "inert-salsotto": [
        { bucket: "critRate", param: "1" },
        { bucket: "dmgBoost", param: "3", damageTypes: ["ultimate", "followup"], when: "highCritRate" }
    ],
    "talia-kingdom-of-banditry":        [{ bucket: "breakEffect", param: "1" }],
    "sprightly-vonwacq":                [{ bucket: "energyRegen", param: "1" }],
    "rutilant-arena": [
        { bucket: "critRate", param: "1" },
        { bucket: "dmgBoost", param: "3", damageTypes: ["basic", "skill"], when: "highCritRate" }
    ],
    "broken-keel": [
        { bucket: "effectRes", param: "1" },
        { bucket: "critDamage", param: "3", target: "allies", when: "highEffectRes" }
    ],
    "firmament-frontline-glamoth": [
        { bucket: "atkPct", param: "1" },
        { bucket: "dmgBoost", param: "4", when: "highSpeed" }
    ],
    "penacony-land-of-the-dreams": [
        { bucket: "energyRegen", param: "1" },
        { bucket: "dmgBoost", param: "2", target: "allies" }  // 같은 속성 아군(근사: 딜러 상시)
    ],
    // 상시가 #3, #1은 처치 스택(조건부)
    "sigonia-the-unclaimed-desolation": [
        { bucket: "critRate", param: "3" },
        { bucket: "critDamage", param: "1", stacks: { max: 10 }, when: "afterKill" }
    ],
    "izumo-gensei-and-takama-divine-realm": [
        { bucket: "atkPct", param: "1" },
        { bucket: "critRate", param: "2", when: "samePathAlly" }
    ],
    "forge-of-the-kalpagni-lantern":    [{ bucket: "spdPct", param: "1" }],  // 4? no, planar. 조건부 격파특효
    "lushaka-the-sunken-seas":          [{ bucket: "energyRegen", param: "1" }],  // 팀 공격력(사이클성)
    "the-wondrous-bananamusement-park": [
        { bucket: "critDamage", param: "1" },
        { bucket: "critDamage", param: "2", when: "hasSummon" }
    ],
    "bone-collection-s-serene-demesne": [{ bucket: "hpPct", param: "1" }],  // HP 문턱 조건
    "giant-tree-of-rapt-brooding":      [{ bucket: "spdPct", param: "1" }],  // 속도 문턱 치유
    "revelry-by-the-sea":               [{ bucket: "atkPct", param: "1" }],  // 공격력 문턱 지속피해
    "amphoreus-the-eternal-land":       [{ bucket: "critRate", param: "1" }],  // 기억 정령 속도
    "tengoku-livestream": [
        { bucket: "critDamage", param: "1" },
        { bucket: "critDamage", param: "3", when: "spentSkillPoints" }
    ],
    "punklorde-stage-zero":             [{ bucket: "joy", param: "1" }],  // 환락도 문턱
    "fallen-star-anchorage":            [{ bucket: "critRate", param: "1" }]  // 개척 동행 조건

    // 상시 스탯도 상황 피해도 없어 생략한 세트:
    //   duran-dynasty-of-running-wolves (추가공격 스택), arcadia-of-woven-dreams (파티 인원),
    //   city-of-converging-stars (추가공격 후), cosmic-life-sciences-institute (에너지 초과)

};
