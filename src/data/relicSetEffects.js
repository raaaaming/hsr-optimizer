/**
 * 유물 세트 2세트 효과 중 "상시 스탯 보너스"의 해석.
 *
 * lightConePassives.js와 같은 이유로 존재한다. 시드(relic_sets.effects)에는
 * Yatta 원본(desc + params)만 들어있고, 어느 자리표시자가 어떤 스탯인지는
 * 한국어 설명문에만 있다. 수치는 시드에서 읽으므로 패치로 값이 바뀌면
 * 해석은 그대로 두고 수치만 따라온다.
 *
 * 자리표시자 번호가 항상 #1인 건 아니다. 츠가냐(sigonia)는 상시 효과가
 * #3이고 #1은 조건부(적 처치 시)다. 그래서 세트마다 직접 적어야 한다.
 *
 * 여기 없는 세트는 조건부 효과뿐이라 상시 스탯이 없는 것이다.
 * 4세트 효과는 대부분 조건부라 스탯 합산에 넣지 않는다(설명만 보여준다).
 */
export const RELIC_SET_EFFECTS = {

    // ===== 유물 (4부위) =====

    "passerby-of-wandering-cloud":      [{ stat: "outgoingHealing", param: "1" }],
    "musketeer-of-wild-wheat":          [{ stat: "atkPct", param: "1" }],
    "knight-of-purity-palace":          [{ stat: "defPct", param: "1" }],
    "hunter-of-glacial-forest":         [{ stat: "iceDmg", param: "1" }],
    "champion-of-streetwise-boxing":    [{ stat: "physicalDmg", param: "1" }],
    "guard-of-wuthering-snow":          [{ stat: "dmgReduction", param: "1" }],
    "firesmith-of-lava-forging":        [{ stat: "fireDmg", param: "1" }],
    "genius-of-brilliant-stars":        [{ stat: "quantumDmg", param: "1" }],
    "band-of-sizzling-thunder":         [{ stat: "lightningDmg", param: "1" }],
    "eagle-of-twilight-line":           [{ stat: "windDmg", param: "1" }],
    "thief-of-shooting-meteor":         [{ stat: "breakEffect", param: "1" }],
    "wastelander-of-banditry-desert":   [{ stat: "imaginaryDmg", param: "1" }],
    "longevous-disciple":               [{ stat: "hpPct", param: "1" }],
    "messenger-traversing-hackerspace": [{ stat: "spdPct", param: "1" }],
    "prisoner-in-deep-confinement":     [{ stat: "atkPct", param: "1" }],
    "watchmaker-master-of-dream-machinations": [{ stat: "breakEffect", param: "1" }],
    "iron-cavalry-against-the-scourge": [{ stat: "breakEffect", param: "1" }],
    "the-wind-soaring-valorous":        [{ stat: "atkPct", param: "1" }],
    "sacerdos-relived-ordeal":          [{ stat: "spdPct", param: "1" }],
    "scholar-lost-in-erudition":        [{ stat: "critRate", param: "1" }],
    "hero-of-triumphant-song":          [{ stat: "atkPct", param: "1" }],
    "poet-of-mourning-collapse":        [{ stat: "quantumDmg", param: "1" }],
    "warrior-goddess-of-sun-and-thunder": [{ stat: "spdPct", param: "1" }],
    "wavestrider-captain":              [{ stat: "critDamage", param: "1" }],
    "world-remaking-deliverer":         [{ stat: "critRate", param: "1" }],
    "self-enshrouded-recluse":          [{ stat: "shieldBoost", param: "1" }],
    "ever-glorious-magical-girl":       [{ stat: "critDamage", param: "1" }],
    "diviner-of-distant-reach":         [{ stat: "spdPct", param: "1" }],
    "as-navigator-isee-sees-it":        [{ stat: "atkPct", param: "1" }],
    "divine-querying-master-smith":     [{ stat: "hpPct", param: "1" }],

    // 상시 스탯이 없는 유물 세트 (조건부 피해 증가뿐이라 여기 없다)
    //   the-ashblazing-grand-duke   : 추가 공격으로 가하는 피해 증가
    //   pioneer-diver-of-dead-waters: 디버프 상태의 적에게 가하는 피해 증가

    // ===== 행성구 (2부위) =====
    // 앞 문장이 상시, 뒷 문장이 조건부인 구조가 대부분이다.

    "space-sealing-station":            [{ stat: "atkPct", param: "1" }],
    "fleet-of-the-ageless":             [{ stat: "hpPct", param: "1" }],
    "pan-cosmic-commercial-enterprise": [{ stat: "effectHitRate", param: "1" }],
    "belobog-of-the-architects":        [{ stat: "defPct", param: "1" }],
    "celestial-differentiator":         [{ stat: "critDamage", param: "1" }],
    "inert-salsotto":                   [{ stat: "critRate", param: "1" }],
    "talia-kingdom-of-banditry":        [{ stat: "breakEffect", param: "1" }],
    "sprightly-vonwacq":                [{ stat: "energyRegen", param: "1" }],
    "rutilant-arena":                   [{ stat: "critRate", param: "1" }],
    "broken-keel":                      [{ stat: "effectRes", param: "1" }],
    "firmament-frontline-glamoth":      [{ stat: "atkPct", param: "1" }],
    "penacony-land-of-the-dreams":      [{ stat: "energyRegen", param: "1" }],

    // 주의: 상시 효과가 #1이 아니라 #3이다. #1은 "적이 처치될 시" 조건부다.
    "sigonia-the-unclaimed-desolation": [{ stat: "critRate", param: "3" }],

    "izumo-gensei-and-takama-divine-realm": [{ stat: "atkPct", param: "1" }],
    "forge-of-the-kalpagni-lantern":    [{ stat: "spdPct", param: "1" }],
    "lushaka-the-sunken-seas":          [{ stat: "energyRegen", param: "1" }],
    "the-wondrous-bananamusement-park": [{ stat: "critDamage", param: "1" }],
    "bone-collection-s-serene-demesne": [{ stat: "hpPct", param: "1" }],
    "giant-tree-of-rapt-brooding":      [{ stat: "spdPct", param: "1" }],
    "revelry-by-the-sea":               [{ stat: "atkPct", param: "1" }],
    "amphoreus-the-eternal-land":       [{ stat: "critRate", param: "1" }],
    "tengoku-livestream":               [{ stat: "critDamage", param: "1" }],
    "punklorde-stage-zero":             [{ stat: "joy", param: "1" }],
    "fallen-star-anchorage":            [{ stat: "critRate", param: "1" }]

    // 상시 스탯이 없는 행성구 (전부 조건부라 여기 없다)
    //   duran-dynasty-of-running-wolves: 아군 추가 공격 시 [공훈] 스택
    //   arcadia-of-woven-dreams        : 파티 인원 수에 따른 피해 증가
    //   city-of-converging-stars       : 추가 공격 발동 시 공격력 증가
    //   cosmic-life-sciences-institute : 에너지 최대치 초과분에 따른 피해 증가

};
