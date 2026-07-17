/**
 * 손으로 적은 해석(lightConePassives / relicSetEffects)이 시드와 맞는지 검사한다.
 *
 *   node scripts/check-interpretations.js
 *
 * 이 둘은 사람이 적는 파일이라 오타가 나면 보너스가 조용히 0이 된다.
 * 다음을 잡는다.
 *
 *   - 시드에 없는 slug (오타 / 이름이 바뀐 세트)
 *   - 시드에 없는 자리표시자 (패치로 params 구조가 바뀐 경우)
 *   - STATS에 없는 스탯 키
 *
 * 패치 후 data:sync를 돌렸으면 이것도 같이 돌려라.
 */

import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { STATS } from "../src/data/gameData.js";
import { LIGHT_CONE_PASSIVES } from "../src/data/lightConePassives.js";
import { RELIC_SET_EFFECTS } from "../src/data/relicSetEffects.js";

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

function check(label, interpretations, seed) {

    const problems = [];

    for (const [slug, effects] of Object.entries(interpretations)) {

        if (!seed.has(slug)) {
            problems.push(`${label}: '${slug}'가 시드에 없다.`);
            continue;
        }

        const params = seed.get(slug);

        for (const effect of effects) {

            if (!Object.hasOwn(STATS, effect.stat)) {
                problems.push(
                    `${label}: '${slug}'의 스탯 '${effect.stat}'가 STATS에 없다.`
                );
            }

            const values = params?.[effect.param];

            if (!Array.isArray(values) || values.length === 0) {
                problems.push(
                    `${label}: '${slug}'의 자리표시자 #${effect.param}가 시드에 없다. ` +
                    `(있는 것: ${Object.keys(params ?? {}).join(", ") || "없음"})`
                );
                continue;
            }

            if (typeof values[0] !== "number") {
                problems.push(
                    `${label}: '${slug}' #${effect.param}의 값이 숫자가 아니다.`
                );
            }

        }

    }

    return problems;

}

async function main() {

    const lightCones = await readSeed(
        "src/data/generated/light_cones.sql",
        value => value.params ?? (value.desc !== undefined ? null : undefined)
    );

    const relicSets = await readSeed(
        "src/data/generated/relic_sets.sql",
        value => value["2"]?.params ?? (value["2"] ? null : undefined)
    );

    const problems = [
        ...check("광추", LIGHT_CONE_PASSIVES, lightCones),
        ...check("유물 세트", RELIC_SET_EFFECTS, relicSets)
    ];

    if (problems.length) {
        console.error(`해석과 시드가 어긋난다 (${problems.length}건):\n`);
        for (const problem of problems) console.error(`  - ${problem}`);
        process.exit(1);
    }

    const lcCount = Object.keys(LIGHT_CONE_PASSIVES).length;
    const rsCount = Object.keys(RELIC_SET_EFFECTS).length;

    console.log("해석과 시드가 일치한다.");
    console.log(`  광추      ${lcCount}/${lightCones.size} 해석됨`);
    console.log(`  유물 세트 ${rsCount}/${relicSets.size} 해석됨`);

}

main().catch(error => {
    console.error(`실패: ${error.message}`);
    process.exit(1);
});
