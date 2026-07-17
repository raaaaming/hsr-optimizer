/**
 * Yatta => public/img 이미지 받기.
 *
 *   npm run data:sync    # 먼저 시드를 만들고
 *   npm run img:sync     # 그 시드가 가리키는 그림을 받는다
 *
 * 데이터와 같은 이유로 빌드 타임에만 돈다. 브라우저는 우리 도메인에서만
 * 이미지를 가져오고 Yatta를 알지 못한다. 팬 사이트 CDN에 실사용 트래픽을
 * 얹지 않으려는 것이기도 하다.
 *
 * 받을 목록은 시드에서 읽는다. 시드에 없는 그림은 화면에도 안 나온다.
 *
 * 이미 있는 파일은 건너뛰므로 다시 돌려도 싸다. 패치로 새 캐릭터가
 * 들어오면 새 그림만 받는다.
 */

import { writeFile, mkdir, readFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ASSETS = "https://sr.yatta.moe/hsr/assets";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const OUT = resolve(ROOT, "public/img");

const exists = path => access(path).then(() => true, () => false);

/**
 * 생성된 시드에서 특정 컬럼 위치의 값을 훑는다.
 * DB를 띄우지 않으려고 파일을 직접 읽는다.
 */
async function readSeed(file) {

    const sql = await readFile(resolve(ROOT, file), "utf8");

    return sql.split("INSERT INTO").slice(1);

}

/** VALUES ( 'a', 'b', ... ) 에서 n번째 문자열 */
const nth = (statement, n) => {
    const match = statement.match(
        new RegExp(`VALUES \\(\\s*(?:'[^']*',\\s*){${n}}'([^']*)'`)
    );
    return match?.[1] ?? null;
};

/** 문 안의 JSON 조각들 */
const jsons = statement =>
    [...statement.matchAll(/'(\[.*?\]|\{.*?\})'(?=,|\s*\))/gs)]
        .map(m => { try { return JSON.parse(m[1].replaceAll("''", "'")); } catch { return null; } })
        .filter(Boolean);

/**
 * 스킬 아이콘 이름 => Yatta 경로.
 *
 * 대부분 UI/skill 아래지만 접두사에 따라 다른 곳에 있다.
 * 실버울프 LV.999의 필살기 아이콘(UltraItem_1506_00)은 UI/item 아래다.
 */
function skillIconPath(icon) {

    if (icon.startsWith("UltraItem_")) return `UI/item/${icon}.png`;

    return `UI/skill/${icon}.png`;

}

async function collect() {

    /** @type {Map<string, string>} 저장 경로 => 원본 경로 */
    const wanted = new Map();

    // 캐릭터: 아이콘 이름이 곧 id다.
    for (const statement of await readSeed("src/data/generated/characters.sql")) {

        const id = nth(statement, 0);

        if (!id) continue;

        wanted.set(`character/${id}.png`, `UI/avatar/${id}.png`);
        wanted.set(`portrait/${id}.png`, `UI/avatar/medium/${id}.png`);

        // 스킬 / 성흔 / 행적 아이콘은 JSON 안에 이름으로 들어있다.
        for (const value of jsons(statement)) {
            for (const entry of Array.isArray(value) ? value : []) {
                if (entry?.icon) {
                    wanted.set(`skill/${entry.icon}.png`, skillIconPath(entry.icon));
                }
            }
        }

    }

    // 광추: 아이콘 이름이 곧 id다.
    for (const statement of await readSeed("src/data/generated/light_cones.sql")) {

        const id = nth(statement, 0);

        if (!id) continue;

        wanted.set(`lightcone/${id}.png`, `UI/equipment/${id}.png`);

    }

    // 유물: 세트 대표 아이콘은 숫자, 부위 아이콘은 IconRelic_ 형식이다.
    for (const statement of await readSeed("src/data/generated/relic_sets.sql")) {

        const icon = nth(statement, 4);

        if (icon) {
            wanted.set(`relic/${icon}.png`, `UI/relic/${icon}.png`);
        }

        for (const value of jsons(statement)) {
            for (const piece of Object.values(value)) {
                if (piece?.icon) {
                    wanted.set(`relic/${piece.icon}.png`, `UI/relic/${piece.icon}.png`);
                }
            }
        }

    }

    return wanted;

}

async function download(target, source) {

    const path = resolve(OUT, target);

    if (await exists(path)) return "skip";

    const response = await fetch(`${ASSETS}/${source}`, {
        headers: { "User-Agent": "hsr-optimizer/sync-images" }
    });

    if (!response.ok) {
        throw new Error(`GET ${source} => HTTP ${response.status}`);
    }

    await mkdir(dirname(path), { recursive: true });

    await writeFile(path, Buffer.from(await response.arrayBuffer()));

    return "saved";

}

async function main() {

    console.log("시드에서 받을 그림 목록을 뽑는다...");

    const wanted = await collect();

    console.log(`${wanted.size}개.`);

    const entries = [...wanted];

    let saved = 0;
    let skipped = 0;

    const failed = [];

    // 팬 API를 한꺼번에 두들기지 않는다.
    const CHUNK = 8;

    for (let i = 0; i < entries.length; i += CHUNK) {

        await Promise.all(
            entries.slice(i, i + CHUNK).map(async ([target, source]) => {
                try {
                    if (await download(target, source) === "saved") saved++;
                    else skipped++;
                } catch (error) {
                    failed.push(`${target}: ${error.message}`);
                }
            })
        );

        if ((i / CHUNK) % 10 === 0) {
            console.log(`  ${Math.min(i + CHUNK, entries.length)}/${entries.length}`);
        }

    }

    console.log(`\n${OUT}`);
    console.log(`새로 받음 ${saved} / 이미 있음 ${skipped} / 실패 ${failed.length}`);

    if (failed.length) {
        for (const message of failed.slice(0, 10)) console.error(`  - ${message}`);
        process.exit(1);
    }

}

main().catch(error => {
    console.error(`\n실패: ${error.message}`);
    process.exit(1);
});
