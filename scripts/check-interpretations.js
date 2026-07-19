/**
 * 손으로 적은 게임 데이터가 실제 게임과 맞는지 검사한다.
 *
 *   node scripts/check-interpretations.js
 *
 * 1) 해석(lightConePassives / relicSetEffects)이 시드와 맞는지.
 *    사람이 적는 파일이라 오타가 나면 보너스가 조용히 0이 된다.
 *
 *      - 시드에 없는 slug (오타 / 이름이 바뀐 세트)
 *      - 시드에 없는 자리표시자 (패치로 params 구조가 바뀐 경우)
 *      - STATS에 없는 스탯 키
 *
 * 2) 부옵션 굴림값(SUBSTAT_ROLL)이 게임의 표와 맞는지.
 *    최대치 하나만 틀려도 모든 유물 계산이 조용히 어긋난다.
 *
 * 패치 후 data:sync를 돌렸으면 이것도 같이 돌려라.
 */

import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { STATS, SUBSTAT_ROLL_VALUES } from "../src/data/gameData.js";
import { LIGHT_CONE_PASSIVES } from "../src/data/lightConePassives.js";
import { RELIC_SET_EFFECTS } from "../src/data/relicSetEffects.js";
import { SITUATIONAL_BUCKETS } from "../src/formula/modifiers.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * 생성된 시드 SQL에서 slug => params를 뽑는다.
 * DB를 띄우지 않고 파일만 읽는다.
 */
async function readSeed(file, column) {

    const sql = await readFile(resolve(ROOT, file), "utf8");

    const rows = new Map();

    // INSERT ... VALUES ( 'id', 'slug', ... ) 에서 slug와 JSON을 꺼낸다.
    for (const statement of sql.split("INSERT INTO").slice(1)) {

        const slug = statement.match(/VALUES \(\s*'[^']*',\s*'([^']+)'/)?.[1];

        if (!slug) continue;

        // 해당 컬럼의 JSON을 찾는다. SQL 이스케이프('')를 되돌린다.
        const json = [...statement.matchAll(/'(\{.*?\})'(?=,|\s*\))/gs)]
            .map(m => m[1].replaceAll("''", "'"))
            .map(text => { try { return JSON.parse(text); } catch { return null; } })
            .filter(Boolean)
            .find(value => column(value) !== undefined);

        rows.set(slug, json ? column(json) : undefined);

    }

    return rows;

}

/**
 * getParams(seedValue, effect) => 그 효과의 자리표시자별 배열.
 *   광추: 평평한 params. 유물 세트: 세트 개수(pieces)로 나뉜 params.
 */
function check(label, interpretations, seed, getParams) {

    const problems = [];

    for (const [slug, effects] of Object.entries(interpretations)) {

        if (!seed.has(slug)) {
            problems.push(`${label}: '${slug}'가 시드에 없다.`);
            continue;
        }

        const seedValue = seed.get(slug);

        for (const effect of effects) {

            // 광추는 bucket, 유물 세트는 stat을 쓴다. 버킷은 스탯(STATS) 또는
            // 상황 버킷(SITUATIONAL_BUCKETS) 어느 쪽이어도 된다.
            const bucket = effect.bucket ?? effect.stat;

            if (!Object.hasOwn(STATS, bucket) && !SITUATIONAL_BUCKETS.has(bucket)) {
                problems.push(
                    `${label}: '${slug}'의 버킷 '${bucket}'가 STATS/상황 버킷에 없다.`
                );
            }

            const params = getParams(seedValue, effect);

            const values = params?.[effect.param];

            const pieces = effect.pieces ? ` (${effect.pieces}세트)` : "";

            if (!Array.isArray(values) || values.length === 0) {
                problems.push(
                    `${label}: '${slug}'${pieces}의 자리표시자 #${effect.param}가 시드에 없다. ` +
                    `(있는 것: ${Object.keys(params ?? {}).join(", ") || "없음"})`
                );
                continue;
            }

            if (typeof values[0] !== "number") {
                problems.push(
                    `${label}: '${slug}'${pieces} #${effect.param}의 값이 숫자가 아니다.`
                );
            }

        }

    }

    return problems;

}

/**
 * 위키의 "Subsidiary Stat Values (5-Star)" 표 [하, 중, 상].
 * https://honkai-star-rail.fandom.com/wiki/Relic/Stats
 *
 * 대부분은 상한의 80/90/100%지만 속도(2 / 2.3 / 2.6)는 아니다.
 * 그래서 비율로 유도하지 않고 값을 그대로 적는다. 비율로 유도하면 속도
 * 최저 등급이 2가 아니라 2.08이 되는데, 1굴림에서는 표시가 같아서(2.0)
 * 안 드러나고 굴림이 쌓여야 어긋난다.
 *
 * 퍼센트 스탯은 0~1 스케일로 저장하므로 100을 곱해 비교한다.
 */
const SUBSTAT_TABLE = {
    hp:            [33.87004, 38.103795, 42.33751],
    atk:           [16.935, 19.051877, 21.168754],
    def:           [16.935, 19.051877, 21.168754],
    spd:           [2, 2.3, 2.6],
    hpPct:         [3.456, 3.888, 4.32],
    atkPct:        [3.456, 3.888, 4.32],
    defPct:        [4.32, 4.86, 5.4],
    critRate:      [2.592, 2.916, 3.24],
    critDamage:    [5.184, 5.832, 6.48],
    breakEffect:   [5.184, 5.832, 6.48],
    effectHitRate: [3.456, 3.888, 4.32],
    effectRes:     [3.456, 3.888, 4.32]
};

function checkSubstats() {

    const problems = [];

    for (const [key, expected] of Object.entries(SUBSTAT_TABLE)) {

        const tiers = SUBSTAT_ROLL_VALUES[key];

        if (!tiers) {
            problems.push(`부옵션: SUBSTAT_ROLL_VALUES에 '${key}'가 없다.`);
            continue;
        }

        if (tiers.length !== expected.length) {
            problems.push(
                `부옵션: '${key}'의 등급이 ${tiers.length}개다. ` +
                `${expected.length}개여야 한다.`
            );
            continue;
        }

        const percent = STATS[key]?.percent === true;

        const actual = tiers.map(value => percent ? value * 100 : value);

        // 위키 표기가 소수점에서 반올림돼 있어 아주 작은 차이는 허용한다.
        const off = actual.findIndex((value, i) => Math.abs(value - expected[i]) > 0.001);

        if (off !== -1) {
            problems.push(
                `부옵션: '${key}'가 게임 표와 다르다. ` +
                `기대 ${expected.join("/")}, 실제 ${actual.map(v => +v.toFixed(6)).join("/")}`
            );
        }

    }

    const missing = Object.keys(SUBSTAT_ROLL_VALUES)
        .filter(key => !Object.hasOwn(SUBSTAT_TABLE, key));

    if (missing.length) {
        problems.push(`부옵션: 표에 없는 항목이 있다: ${missing.join(", ")}`);
    }

    return problems;

}

async function main() {

    const lightCones = await readSeed(
        "src/data/generated/light_cones.sql",
        value => value.params ?? (value.desc !== undefined ? null : undefined)
    );

    // 유물 세트는 세트 개수(2/4)로 나뉜 effects 전체를 보관한다.
    const relicSets = await readSeed(
        "src/data/generated/relic_sets.sql",
        value => (value["2"] !== undefined || value["4"] !== undefined) ? value : undefined
    );

    const problems = [
        ...check("광추", LIGHT_CONE_PASSIVES, lightCones, sv => sv),
        ...check("유물 세트", RELIC_SET_EFFECTS, relicSets,
            (sv, effect) => sv[String(effect.pieces ?? 2)]?.params),
        ...checkSubstats()
    ];

    if (problems.length) {
        console.error(`게임 데이터가 어긋난다 (${problems.length}건):\n`);
        for (const problem of problems) console.error(`  - ${problem}`);
        process.exit(1);
    }

    const lcCount = Object.keys(LIGHT_CONE_PASSIVES).length;
    const rsCount = Object.keys(RELIC_SET_EFFECTS).length;

    console.log("게임 데이터가 일치한다.");
    console.log(`  광추      ${lcCount}/${lightCones.size} 해석됨`);
    console.log(`  유물 세트 ${rsCount}/${relicSets.size} 해석됨`);
    console.log(`  부옵션    ${Object.keys(SUBSTAT_TABLE).length}/12 게임 표와 일치`);

}

main().catch(error => {
    console.error(`실패: ${error.message}`);
    process.exit(1);
});
