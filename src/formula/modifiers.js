/**
 * 2층: 수정자(Modifier) 시스템.
 *
 * 최종 스탯은 정적이지만 실제 데미지는 조건부·일시 버프가 절반이다.
 * "필살기 발동 시 공격력 +40%", "약점 격파 시 취약 +10%", "완전연소 상태에서
 * 격파 피해 증가" 같은 것들. 그래서 데미지는 고정 스탯이 아니라 그 타격 순간에
 * 활성인 수정자들의 합을 받아야 한다.
 *
 * 수정자는 데이터다. 선언형 능력 기술(3층)이 이걸 뿜고, 팀 버프나 적 디버프도
 * 같은 형태다. 한 곳(엔진)에서 해석하므로 캐릭터마다 다시 안 짠다.
 *
 *   { bucket, value, target?, when?, stacks?, damageTypes?, source? }
 *
 *   bucket       어느 통에 담기는가 (아래 BUCKETS)
 *   value        숫자거나, 컨텍스트를 받는 함수. 스택 버프면 "스택 1개당 값".
 *   target       누구에게: self | allies | ally | enemy. 기본 self.
 *                파티 수집(collectPartyModifiers)에서 딜러에게 라우팅할 때 쓴다.
 *   when         이 조건이 활성일 때만 적용. 문자열(조건 집합에 있어야) 또는 함수
 *   stacks       { max } — 값이 스택당이라 현재 스택 수를 곱한다.
 *   damageTypes  이 데미지 유형에만 적용 (예: 추가타 피해 증가)
 *   source       출처. 스택 수를 출처별로 추적할 때 키로도 쓴다.
 *
 * 버킷은 HSR Damage 위키의 일반 데미지 공식 항들에서 왔다.
 */

/** 수정자가 누구에게 걸리는가. 파티 수집 단계에서 라우팅에 쓴다. */
export const TARGETS = new Set(["self", "allies", "ally", "enemy"]);

/**
 * 스탯 버킷 — StatsCalculator.combine이 아는 키들.
 * base × (1 + %) + flat 로 최종 스탯에 반영된다. 동적 버프도 여기 얹으면
 * 정적 버프와 똑같이 계산된다(공격력 버프가 기본 공격력에 곱해지는 등).
 */
export const STAT_BUCKETS = new Set([
    "atkPct", "atk", "hpPct", "hp", "defPct", "def", "spdPct", "spd",
    "critRate", "critDamage", "breakEffect",
    "effectHitRate", "effectRes", "energyRegen", "outgoingHealing",
    "physicalDmg", "fireDmg", "iceDmg", "lightningDmg",
    "windDmg", "quantumDmg", "imaginaryDmg"
]);

/**
 * 상황 버킷 — 스탯 시트엔 없고 그 타격에만 관여하는 것들.
 * 대부분 0(또는 곱셈 항은 1)이 기본이고 수정자로 채워진다.
 */
export const SITUATIONAL_BUCKETS = new Set([
    "dmgBoost",             // 속성 외 추가 피해 증가 (전 타입 / 특정 타입)
    "dmgMultiplierIncrease",// 능력 배율 증가 (Base DMG에 더해짐)
    "extraDmg",             // Base DMG에 더해지는 고정 피해
    "defReduction",         // 적 방어력 감소
    "defIgnore",            // 적 방어력 무시
    "resPen",               // 저항 관통
    "vulnerability",        // 적 취약 (받는 피해 증가)
    "weaken",               // 공격자 약화 (주는 피해 감소, 보통 0)
    "dmgMitigation",        // 적 피해 감면 (곱연산, 보통 0)
    "breakDmgIncrease",     // 격파 피해 증가
    "superBreakIncrease"    // 초격파 피해 증가
]);

/**
 * 수정자 하나가 지금 타격에 적용되는지.
 *
 * hit = { conditions: Set<string>, damageType: string }
 */
function applies(modifier, hit) {

    if (modifier.damageTypes && !modifier.damageTypes.includes(hit.damageType)) {
        return false;
    }

    const when = modifier.when;

    if (when == null) return true;

    if (typeof when === "function") return !!when(hit);

    // 문자열이면 활성 조건 집합에 있어야 한다.
    return hit.conditions?.has(when) ?? false;

}

/**
 * 수정자 모음. 능력·팀·적이 add하고, resolve가 지금 타격 기준으로 합산한다.
 */
export class ModifierSet {

    constructor() {
        this.modifiers = [];
    }

    /** 수정자 하나 또는 배열 추가 */
    add(modifier) {
        if (Array.isArray(modifier)) {
            this.modifiers.push(...modifier);
        } else if (modifier) {
            this.modifiers.push(modifier);
        }
        return this;
    }

    /**
     * 지금 타격에 적용되는 수정자를 버킷별로 합산한다.
     *
     *   { statBonus, situational }
     *
     * statBonus는 StatsCalculator.combine에 넘길 형태, situational은
     * 데미지 함수가 받는 상황 계수다.
     *
     * hit.stacks가 있으면 스택 버프의 현재 스택 수를 출처별로 읽는다.
     * 없으면 최대 스택으로 본다(로테이션에서 대개 최대까지 쌓인다).
     */
    resolve(hit) {

        const statBonus = {};
        const situational = {};

        for (const modifier of this.modifiers) {

            if (!applies(modifier, hit)) continue;

            let value = typeof modifier.value === "function"
                ? modifier.value(hit)
                : modifier.value;

            // 스택 버프: 값은 스택 1개당이다. 현재 스택 수를 곱한다.
            if (modifier.stacks) {
                const current = hit.stacks?.[modifier.source] ?? modifier.stacks.max;
                value *= Math.min(current, modifier.stacks.max);
            }

            if (typeof value !== "number" || value === 0) continue;

            const target = STAT_BUCKETS.has(modifier.bucket)
                ? statBonus
                : situational;

            if (!STAT_BUCKETS.has(modifier.bucket)
                && !SITUATIONAL_BUCKETS.has(modifier.bucket)) {
                throw new Error(`Unknown modifier bucket: ${modifier.bucket}`);
            }

            target[modifier.bucket] = (target[modifier.bucket] ?? 0) + value;

        }

        return { statBonus, situational };

    }

}
