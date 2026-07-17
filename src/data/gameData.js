/**
 * 스탯 정의.
 *
 * percent : 0~1 비율로 저장하고 UI에서 %로 표시한다.
 * base    : 캐릭터/광추 기본값에 곱해지는 비율 스탯인지 여부
 */
export const STATS = {
    hp:            { label: "HP",             percent: false },
    atk:           { label: "공격력",          percent: false },
    def:           { label: "방어력",          percent: false },
    spd:           { label: "속도",            percent: false },
    hpPct:         { label: "HP 비율",         percent: true, appliesTo: "hp" },
    atkPct:        { label: "공격력 비율",      percent: true, appliesTo: "atk" },
    defPct:        { label: "방어력 비율",      percent: true, appliesTo: "def" },
    spdPct:        { label: "속도 비율",        percent: true, appliesTo: "spd" },
    critRate:      { label: "치명타 확률",      percent: true },
    critDamage:    { label: "치명타 피해",      percent: true },
    breakEffect:   { label: "격파 특수효과",    percent: true },
    effectHitRate: { label: "효과 명중",        percent: true },
    effectRes:     { label: "효과 저항",        percent: true },
    energyRegen:   { label: "에너지 회복 효율",  percent: true },
    outgoingHealing:{ label: "치유량 보너스",   percent: true },
    joy:           { label: "환락도",           percent: true },
    dmgReduction:  { label: "받는 피해 감소",    percent: true },
    shieldBoost:   { label: "실드량 보너스",     percent: true },
    physicalDmg:   { label: "물리 속성 피해 증가",   percent: true },
    fireDmg:       { label: "화염 속성 피해 증가",   percent: true },
    iceDmg:        { label: "얼음 속성 피해 증가",   percent: true },
    lightningDmg:  { label: "번개 속성 피해 증가",   percent: true },
    windDmg:       { label: "바람 속성 피해 증가",   percent: true },
    quantumDmg:    { label: "양자 속성 피해 증가",   percent: true },
    imaginaryDmg:  { label: "허수 속성 피해 증가",   percent: true }
};

export const ELEMENT_DMG_KEY = {
    physical: "physicalDmg",
    fire: "fireDmg",
    ice: "iceDmg",
    lightning: "lightningDmg",
    wind: "windDmg",
    quantum: "quantumDmg",
    imaginary: "imaginaryDmg"
};

export const ELEMENT_LABEL = {
    physical: "물리", fire: "화염", ice: "얼음", lightning: "번개",
    wind: "바람", quantum: "양자", imaginary: "허수"
};

/**
 * 라벨은 Yatta의 types.pathType.name(공식 한국어 명칭)을 따른다.
 * scripts/sync-gamedata.js의 PATH_MAP과 키가 일치해야 한다.
 */
export const PATH_LABEL = {
    destruction: "파멸", hunt: "수렵", erudition: "지식", harmony: "화합",
    nihility: "공허", preservation: "보존", abundance: "풍요", remembrance: "기억",
    elation: "환락"
};

export const RELIC_SLOTS = [
    { id: "head",   label: "머리",      type: "relic" },
    { id: "hands",  label: "핸드",      type: "relic" },
    { id: "body",   label: "바디",      type: "relic" },
    { id: "feet",   label: "신발",      type: "relic" },
    { id: "sphere", label: "차원 구체",  type: "planar" },
    { id: "rope",   label: "연결 매듭",  type: "planar" }
];

/**
 * 5성 유물 +15 기준 주옵션 최대치.
 * 비율 스탯은 0~1 스케일이다.
 */
export const RELIC_MAIN_STATS = {
    head:   { hp: 705.6 },
    hands:  { atk: 352.8 },
    body: {
        hpPct: 0.4320, atkPct: 0.4320, defPct: 0.5400,
        critRate: 0.3240, critDamage: 0.6480,
        outgoingHealing: 0.3456, effectHitRate: 0.4320
    },
    feet: {
        hpPct: 0.4320, atkPct: 0.4320, defPct: 0.5400, spd: 25.032
    },
    sphere: {
        hpPct: 0.4320, atkPct: 0.4320, defPct: 0.5400,
        physicalDmg: 0.3888, fireDmg: 0.3888, iceDmg: 0.3888,
        lightningDmg: 0.3888, windDmg: 0.3888, quantumDmg: 0.3888,
        imaginaryDmg: 0.3888
    },
    rope: {
        hpPct: 0.4320, atkPct: 0.4320, defPct: 0.5400,
        breakEffect: 0.6480, energyRegen: 0.1944
    }
};

/**
 * 5성 주옵션은 +0에서 최대치의 16%, +15에서 100%가 된다.
 * (예: 머리 HP 705.6 → +0에서 112.896)
 */
export function relicMainValue(max, level) {
    return max * (0.16 + 0.84 * (level / 15));
}

/**
 * 부옵션으로 나올 수 있는 스탯.
 * 실제 수치는 굴림값이라 사용자가 직접 입력한다.
 */
export const SUBSTAT_KEYS = [
    "hp", "atk", "def", "hpPct", "atkPct", "defPct", "spd",
    "critRate", "critDamage", "breakEffect", "effectHitRate", "effectRes"
];

/**
 * 5성 부옵션 1회 굴림 최대치.
 */
export const SUBSTAT_ROLL = {
    hp: 42.34, atk: 21.17, def: 21.17, spd: 2.6,
    hpPct: 0.0432, atkPct: 0.0432, defPct: 0.054,
    critRate: 0.0324, critDamage: 0.0648,
    breakEffect: 0.0648, effectHitRate: 0.0432, effectRes: 0.0432
};

/**
 * 부옵션 굴림 등급.
 *
 * 실제 게임은 부옵션이 붙거나 강화될 때마다 최대치의 80% / 90% / 100% 중
 * 하나가 굴려져 더해진다. 그래서 부옵션 값은 임의의 수가 아니라
 * 이 세 값의 합으로만 나올 수 있다.
 */
export const SUBSTAT_ROLL_TIERS = [0.8, 0.9, 1.0];

/**
 * 굴림 목록 => 실제 부옵션 값.
 * rolls는 SUBSTAT_ROLL_TIERS의 인덱스 배열이다. 첫 굴림이 초기값이고
 * 나머지는 강화하면서 그 부옵션이 선택될 때마다 붙은 것이다.
 */
export function substatValue(key, rolls) {

    const unit = SUBSTAT_ROLL[key];

    if (!unit || !Array.isArray(rolls)) return 0;

    return rolls.reduce(
        (sum, tier) => sum + unit * (SUBSTAT_ROLL_TIERS[tier] ?? 1),
        0
    );

}

/**
 * 유물 강화로 부옵션이 굴려지는 횟수. 3레벨마다 1회다(+15면 5회).
 */
export function upgradeRolls(level) {

    return Math.floor((level ?? 0) / 3);

}

/**
 * 부옵션 굴림 총합의 상한.
 * 초기 부옵션 4개 + 강화 굴림. 5성 +15면 4 + 5 = 9회다.
 */
export function maxTotalRolls(level) {

    return 4 + upgradeRolls(level);

}

/** 부옵션 하나에 몰아줄 수 있는 최대 굴림 수 (초기 1 + 강화 5) */
export const MAX_ROLLS_PER_SUBSTAT = 6;

/** 유효 옵션 선택 개수 */
export const MIN_EFFECTIVE_STATS = 1;
export const MAX_EFFECTIVE_STATS = 5;

export const MAX_LEVEL_BY_ASCENSION = [20, 30, 40, 50, 60, 70, 80];

/**
 * 돌파별 레벨 하한.
 *
 * 돌파를 하면 그 아래 레벨로는 내려갈 수 없다.
 * 6돌파 70~80, 5돌파 60~70, 4돌파 50~60, 3돌파 40~50,
 * 2돌파 30~40, 1돌파 20~30, 0돌파 1~20.
 */
export const MIN_LEVEL_BY_ASCENSION = [1, 20, 30, 40, 50, 60, 70];
