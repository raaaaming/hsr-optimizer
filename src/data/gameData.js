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

export const PATH_LABEL = {
    destruction: "파멸", hunt: "사냥", erudition: "지식", harmony: "화합",
    nihility: "허무", preservation: "보존", abundance: "풍요", remembrance: "기억"
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
 * 유물 세트.
 * two: 2세트 효과 중 무조건 적용되는 스탯.
 * four: 4세트 효과는 조건부가 많아 설명만 두고 계산에는 넣지 않는다.
 */
export const RELIC_SETS = {
    musketeer:      { label: "황야의 밀무리 무사", type: "relic", two: { atkPct: 0.12 }, four: "속도 +6%, 일반 공격 피해 +10%" },
    ironCavalry:    { label: "천군만마의 강철 기병단", type: "relic", two: { breakEffect: 0.16 }, four: "격파 특수효과 150% 이상 시 격파 피해 증가" },
    firesmith:      { label: "용암을 단조하는 대장장이", type: "relic", two: { fireDmg: 0.10 }, four: "전투 스킬 피해 +12%" },
    glacialForest:  { label: "설원을 뒤덮는 사냥꾼", type: "relic", two: { iceDmg: 0.10 }, four: "필살기 사용 후 치명타 피해 +25%" },
    brilliantStars: { label: "찬란한 별의 명인", type: "relic", two: { quantumDmg: 0.10 }, four: "적 방어력 무시 +10%" },
    bandOfSizzling: { label: "우레를 쫓는 무리", type: "relic", two: { lightningDmg: 0.10 }, four: "전투 스킬 피해 +20%" },
    eagle:          { label: "지는 해의 순간을 나는 매", type: "relic", two: { windDmg: 0.10 }, four: "필살기 사용 시 행동 앞당기기 25%" },
    wastelander:    { label: "황무지의 무법자", type: "relic", two: { imaginaryDmg: 0.10 }, four: "적 감전/구속 시 치명타 확률·피해 증가" },
    champion:       { label: "우승을 노리는 권투 챔피언", type: "relic", two: { physicalDmg: 0.10 }, four: "일반/전투 스킬 적중 시 공격력 증가" },
    thief:          { label: "허공을 가르는 도적", type: "relic", two: { breakEffect: 0.16 }, four: "격파 특수효과 +20%, 적 약점 격파 시 에너지 회복" },
    guard:          { label: "삶을 지키는 파수꾼", type: "relic", two: { hpPct: 0.12 }, four: "받는 피해 감소" },
    messenger:      { label: "우주를 가로지르는 사자", type: "relic", two: { spdPct: 0.06 }, four: "필살기로 아군에게 속도 +12%" },

    spaceSealing:   { label: "우주 밀봉 스테이션", type: "planar", two: { atkPct: 0.12 }, four: "" },
    talia:          { label: "도적 공국 태연", type: "planar", two: { breakEffect: 0.16 }, four: "" },
    glamoth:        { label: "창궁 전선 글라모스", type: "planar", two: { atkPct: 0.12 }, four: "" },
    salsotto:       { label: "결투의 도시 살소토", type: "planar", two: { critRate: 0.08 }, four: "" },
    izumo:          { label: "이즈모 고국과 타케히코", type: "planar", two: { atkPct: 0.12 }, four: "" },
    sigonia:        { label: "피눈물의 시고니아", type: "planar", two: { critRate: 0.04 }, four: "" },
    duran:          { label: "천마의 유목민 두란", type: "planar", two: {}, four: "" },
    penacony:        { label: "꿈의 도시 페나코니", type: "planar", two: { energyRegen: 0.05 }, four: "" },
    fleetOfAgeless: { label: "장생의 함대", type: "planar", two: { hpPct: 0.12 }, four: "" },
    rutilantArena:  { label: "성휘 투기장", type: "planar", two: { critRate: 0.08 }, four: "" },
    broken_keel:    { label: "부서진 용골", type: "planar", two: { effectRes: 0.10 }, four: "" }
};

/**
 * 부옵션으로 나올 수 있는 스탯.
 * 실제 수치는 굴림값이라 사용자가 직접 입력한다.
 */
export const SUBSTAT_KEYS = [
    "hp", "atk", "def", "hpPct", "atkPct", "defPct", "spd",
    "critRate", "critDamage", "breakEffect", "effectHitRate", "effectRes"
];

/**
 * 5성 부옵션 1회 굴림 최대치. 명중 횟수 추정에 쓴다.
 */
export const SUBSTAT_ROLL = {
    hp: 42.34, atk: 21.17, def: 21.17, spd: 2.6,
    hpPct: 0.0432, atkPct: 0.0432, defPct: 0.054,
    critRate: 0.0324, critDamage: 0.0648,
    breakEffect: 0.0648, effectHitRate: 0.0432, effectRes: 0.0432
};

export const MAX_LEVEL_BY_ASCENSION = [20, 30, 40, 50, 60, 70, 80];
