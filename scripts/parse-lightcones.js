/**
 * 광추 패시브의 "상시 스탯 버프"를 시드에서 자동 추출한다.
 *
 *   node scripts/parse-lightcones.js
 *
 * 결과: src/data/generated/lightConePassivesAuto.js (커밋한다)
 * 그리고 파서가 처리 못 한 광추 목록을 출력한다 — 그건 손으로 채운다.
 *
 * 안전 규칙(조용한 오류를 막는다):
 *   - 설명문이 조건어 없이 "장착한 캐릭터의 [스탯]"으로 시작해야 상시로 인정.
 *     ("전투 시작 시 ...", "필살기 발동 시 ..." 로 시작하면 조건부 => 스킵)
 *   - 값은 스탯 이름 바로 뒤의 첫 #N을 잡는다. 종결어미(증가한다/하고/하며)를
 *     찾으면 다중 절에서 엉뚱한 자리표시자를 문다(post-op-conversation 사례).
 *   - 추출한 param이 시드 params에 실제로 있고 숫자여야 채택.
 *
 * 조건부/피해 버프는 파서가 손대지 않는다. 실패 목록으로 보고하고 사람이 적는다.
 */

import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SEED = resolve(ROOT, "src/data/generated/light_cones.sql");
const OUT = resolve(ROOT, "src/data/generated/lightConePassivesAuto.js");

/** 설명문의 스탯 이름 => 버킷. 표기 그대로. */
const STAT = {
    "공격력": "atkPct",
    "HP 최대치": "hpPct",
    "방어력": "defPct",
    "속도": "spdPct",
    "치명타 확률": "critRate",
    "치명타 피해": "critDamage",
    "격파 특수효과": "breakEffect",
    "효과 명중": "effectHitRate",
    "효과 저항": "effectRes",
    "에너지 회복효율": "energyRegen",
    "치유량": "outgoingHealing"
};

// 스탯 이름이 긴 것부터 매칭해야 "HP 최대치"가 "HP"에 안 먹힌다.
const STAT_NAMES = Object.keys(STAT).sort((a, b) => b.length - a.length);

const stripTags = t => t.replace(/<[^>]+>/g, "");

/** 시드에서 광추별 { slug, name, desc, params } 를 뽑는다. */
function readSeed(sql) {
    const rows = [];
    for (const stmt of sql.split("INSERT INTO light_cones").slice(1)) {
        const head = stmt.match(/VALUES \(\s*'(\d+)',\s*'([^']+)',\s*'([^']+)'/);
        if (!head) continue;
        const passive = stmt.match(/'(\{"name".*?"params":(?:\{.*?\}\}|null))'/s);
        let parsed = null;
        if (passive) {
            try { parsed = JSON.parse(passive[1].replaceAll("''", "'")); } catch { /* skip */ }
        }
        rows.push({
            id: head[1], slug: head[2], name: head[3],
            desc: parsed?.desc ?? "", params: parsed?.params ?? null
        });
    }
    return rows;
}

/**
 * 상시 스탯 버프 하나를 뽑는다. 실패하면 null.
 *
 * 설명문 맨 앞이 "장착한 캐릭터의 [스탯](이|가) ... #N" 형태여야 한다.
 */
function extractLeadingStat(desc) {

    const text = stripTags(desc).trimStart();

    if (!text.startsWith("장착한 캐릭터의")) return null;

    for (const name of STAT_NAMES) {
        // "장착한 캐릭터의 [스탯](이|가) [# 아닌 것들] #N"
        const re = new RegExp(
            `^장착한 캐릭터의 ${name}(?:이|가) [^#]*?#(\\d)`
        );
        const m = text.match(re);
        if (m) return { bucket: STAT[name], param: m[1] };
    }

    return null;
}

async function main() {

    const rows = readSeed(await readFile(SEED, "utf8"));

    const auto = {};
    const failed = [];

    for (const row of rows) {

        const hit = extractLeadingStat(row.desc);

        // 검증: param이 시드에 실제로 있고 숫자여야 한다.
        const ok = hit
            && Array.isArray(row.params?.[hit.param])
            && typeof row.params[hit.param][0] === "number";

        if (ok) {
            auto[row.slug] = [{ bucket: hit.bucket, param: hit.param }];
        } else {
            failed.push(row);
        }

    }

    const body =
        "// 자동 생성 파일. 직접 고치지 마라.\n" +
        "// 생성: scripts/parse-lightcones.js\n" +
        "//\n" +
        "// 광추 설명문 맨 앞의 '상시 스탯 버프'만 뽑은 것이다.\n" +
        "// 조건부/피해 버프는 여기 없다 — lightConePassives.js의 수동 항목에서 더한다.\n" +
        "// 수동 항목이 같은 slug를 가지면 그쪽이 이 파일을 덮어쓴다.\n\n" +
        "export const AUTO_LIGHT_CONE_PASSIVES = " +
        JSON.stringify(auto, null, 2) + ";\n";

    await writeFile(OUT, body, "utf8");

    console.log(`자동 추출: ${Object.keys(auto).length} / ${rows.length}`);
    console.log(`${OUT}\n`);
    console.log(`파서 실패 ${failed.length}개 (손으로 검토):`);
    for (const row of failed) {
        console.log(`  [${row.slug}] ${stripTags(row.desc).slice(0, 70) || "(설명 없음)"}`);
    }
}

main().catch(e => { console.error(e); process.exit(1); });
