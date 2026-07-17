/**
 * 유물 편집기 UI 회귀 확인용 일회성 스크립트.
 *
 *   npx wrangler dev --port 8788
 *   node scripts/ui-check.mjs
 *
 * 사용자가 보고한 증상을 실제 브라우저에서 재현해본다.
 *   - 세트를 먼저 고르면 사라진다
 *   - 부옵션을 골라도 선택되지 않는다
 *   - 유물 상자가 자꾸 닫힌다
 */

import { chromium } from "playwright";

const URL = "http://127.0.0.1:8788";

const results = [];

const check = (name, pass, detail = "") => {
    results.push({ name, pass, detail });
    console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

const browser = await chromium.launch();
const page = await browser.newPage();

const errors = [];
page.on("pageerror", e => errors.push(e.message));
page.on("console", m => m.type() === "error" && errors.push(m.text()));

await page.goto(URL);
await page.waitForFunction(() => window.META !== undefined || document.querySelector("#relics details"));
await page.waitForTimeout(600);

// 첫 유물 상자를 연다
const box = page.locator("#relics details").first();
await box.locator("summary").click();
check("유물 상자가 열린다", await box.evaluate(n => n.open));

// 1) 세트를 먼저 고른다 (주옵션 없이)
const setSelect = box.locator("select").first();
const setValue = await setSelect.locator("option").nth(1).getAttribute("value");
await setSelect.selectOption(setValue);
await page.waitForTimeout(250);

check(
    "세트를 먼저 골라도 유지된다",
    await setSelect.inputValue() === setValue,
    `기대 ${setValue}, 실제 ${await setSelect.inputValue()}`
);
check("세트 선택 후에도 상자가 열려 있다", await box.evaluate(n => n.open));

// 2) 주옵션을 고른다
const mainSelect = box.locator("select").nth(1);
const mainValue = await mainSelect.locator("option").nth(1).getAttribute("value");
await mainSelect.selectOption(mainValue);
await page.waitForTimeout(250);

check("주옵션 선택 후에도 상자가 열려 있다", await box.evaluate(n => n.open));
check("주옵션 선택 후에도 세트가 남아 있다", await setSelect.inputValue() === setValue);

// 3) 부옵션을 빈 줄에서 고른다 (값 입력 없이)
const subSelect = box.locator(".sub-row select").first();
await subSelect.selectOption("critDamage");
await page.waitForTimeout(250);

check(
    "값을 안 적어도 부옵션이 선택된다",
    await subSelect.inputValue() === "critDamage",
    `실제 '${await subSelect.inputValue()}'`
);
check("부옵션 굴림 칩이 생긴다", await box.locator(".roll").count() > 0);

// 4) 빈 줄을 건너뛰어 세 번째 줄에서 고른다 (희소 배열 회귀)
await box.locator(".sub-row select").nth(2).selectOption("spd");
await page.waitForTimeout(250);

// 구멍 없이 앞으로 당겨져야 한다.
const rowValues = await box.locator(".sub-row select").evaluateAll(
    nodes => nodes.map(n => n.value)
);

check(
    "빈 줄을 건너뛰어 골라도 앞으로 당겨진다",
    rowValues[0] === "critDamage" && rowValues[1] === "spd" && rowValues[2] === "",
    JSON.stringify(rowValues)
);

// 저장이 통과해야 배열에 null이 안 섞인 것이다(서버가 거부한다).
page.once("dialog", d => d.dismiss());
await page.click("#saveBtn");
await page.waitForTimeout(700);

const toastText = await page.locator("#toast").textContent();
const toastError = await page.locator("#toast").evaluate(n => n.className.includes("error"));

check(
    "이 상태로 저장이 통과한다",
    !toastError,
    toastText
);

// 5) 굴림 칩을 눌러 등급을 바꾼다
const firstChip = box.locator(".roll").first();
const before = await firstChip.textContent();
await firstChip.click();
await page.waitForTimeout(250);
const after = await box.locator(".roll").first().textContent();

check("굴림 칩을 누르면 등급이 바뀐다", before !== after, `${before} -> ${after}`);

// 6) + 로 굴림을 추가하면 값이 오른다
const valueBefore = await box.locator(".roll-value").first().textContent();
await box.locator(".roll-btn").nth(1).click();
await page.waitForTimeout(250);
const valueAfter = await box.locator(".roll-value").first().textContent();

check("굴림을 추가하면 값이 오른다", valueBefore !== valueAfter, `${valueBefore} -> ${valueAfter}`);

// 7) 유효 옵션은 최소 1개
const effChips = page.locator("#effectiveStats .chip.on");
const onCount = await effChips.count();
for (let i = 0; i < onCount; i++) {
    await page.locator("#effectiveStats .chip.on").first().click();
    await page.waitForTimeout(120);
}
check(
    "유효 옵션을 0개로 만들 수 없다",
    await page.locator("#effectiveStats .chip.on").count() === 1
);

// 8) 스탯 시트 강조가 유효 옵션을 따라간다
await page.selectOption("#characterSelect", "firefly");
await page.waitForTimeout(800);

const onChips = await page.locator("#effectiveStats .chip.on").allTextContents();
const hiRows = await page.locator("#statGrid .stat-row.hi .k").allTextContents();

check(
    "시트 강조가 유효 옵션과 일치한다",
    onChips.length > 0 && [...onChips].sort().join() === [...hiRows].sort().join(),
    `옵션 [${onChips}] vs 강조 [${hiRows}]`
);

check(
    "치확/치피로 고정돼 있지 않다",
    !hiRows.includes("치명타 확률") || onChips.includes("치명타 확률"),
    `강조 [${hiRows}]`
);

// 유효 옵션을 바꾸면 강조도 바뀐다
await page.locator("#effectiveStats .chip", { hasText: "치명타 피해" }).first().click();
await page.waitForTimeout(600);

check(
    "유효 옵션을 켜면 그 행이 강조된다",
    (await page.locator("#statGrid .stat-row.hi .k").allTextContents()).includes("치명타 피해")
);

await page.locator("#effectiveStats .chip.on", { hasText: "속도" }).first().click();
await page.waitForTimeout(600);

check(
    "유효 옵션을 끄면 강조가 사라진다",
    !(await page.locator("#statGrid .stat-row.hi .k").allTextContents()).includes("속도")
);

// 설명문 자리표시자가 실제 수치로 렌더된다 (#1[i] 같은 게 남으면 안 된다)
const rawPlaceholders = await page.evaluate(() =>
    (document.body.innerText.match(/#\d+\[[a-z]\d?\]/g) || []).slice(0, 5));

check("설명문에 raw 자리표시자가 없다", rawPlaceholders.length === 0, rawPlaceholders.join(", "));

// 돌파 효과 패널이 채워진다
check("돌파 효과가 표시된다",
    await page.locator("#eidolonList .trace-row").count() === 6);

check("돌파 효과 설명에 수치가 박힌다",
    (await page.locator("#eidolonList .trace-desc b").count()) > 0);

// 큰 행적도 설명이 나온다
check("큰 행적 설명이 표시된다",
    (await page.locator("#majorTraces .trace-desc").first().innerText()).length > 5);

// 스킬 아이콘을 누르면 설명이 열리고 다시 누르면 닫힌다
const firstSkill = page.locator("#heroSkills .hero-skill").first();
await firstSkill.click();
await page.waitForTimeout(300);
check("스킬 아이콘을 누르면 설명이 열린다",
    (await page.locator("#skillDetail .passive-desc").count()) === 1);
await firstSkill.click();
await page.waitForTimeout(300);
check("같은 스킬을 다시 누르면 닫힌다",
    (await page.locator("#skillDetail .passive-desc").count()) === 0);

// 광추 패시브 설명이 나온다
await page.selectOption("#lcSelect", { index: 1 });
await page.waitForTimeout(400);
check("광추 패시브 설명이 표시된다",
    (await page.locator("#lcPassive .passive-desc").count()) === 1);

// 전용 광추가 목록 맨 위에 온다
check("전용 광추가 맨 위에 온다",
    (await page.locator("#lcSelect option").nth(1).innerText()).includes("전용"));

// 9) 그림이 다 뜬다
const broken = await page.evaluate(() =>
    [...document.images]
        .filter(img => img.src && (!img.complete || img.naturalWidth === 0))
        .map(img => img.src.split("/img/")[1] ?? img.src)
);

check("깨진 그림이 없다", broken.length === 0, broken.slice(0, 3).join(", "));

check("캐릭터 일러가 뜬다",
    await page.locator("#heroArt").evaluate(n => n.naturalWidth > 0));

check("스킬 아이콘이 뜬다",
    await page.locator("#heroSkills img").count() > 0);

// 10) 스킬 레벨은 상한을 넘을 수 없다
await page.selectOption("#eidolon", "0");
await page.waitForTimeout(500);

const basic = page.locator("#skills input").first();

check("E0 일반 공격 상한은 6",
    await basic.getAttribute("max") === "6",
    `max=${await basic.getAttribute("max")}`);

await basic.fill("99");
await page.waitForTimeout(400);

check("상한을 넘겨 입력하면 상한으로 잘린다",
    await basic.inputValue() === "6",
    `실제 ${await basic.inputValue()}`);

// 성흔을 올리면 상한도 올라간다
await page.selectOption("#eidolon", "3");
await page.waitForTimeout(600);

check("E3에서 일반 공격 상한이 7로 오른다",
    await page.locator("#skills input").first().getAttribute("max") === "7",
    `max=${await page.locator("#skills input").first().getAttribute("max")}`);

// 성흔을 내리면 올려둔 레벨이 같이 내려온다
await page.locator("#skills input").first().fill("7");
await page.waitForTimeout(300);
await page.selectOption("#eidolon", "0");
await page.waitForTimeout(600);

check("성흔을 내리면 레벨도 상한까지 내려온다",
    await page.locator("#skills input").first().inputValue() === "6",
    `실제 ${await page.locator("#skills input").first().inputValue()}`);

// 11) 6돌파에서 레벨 하한
await page.selectOption("#ascension", "6");
await page.waitForTimeout(200);
check(
    "6돌파 레벨 하한이 70",
    await page.locator("#level").getAttribute("min") === "70",
    `min=${await page.locator("#level").getAttribute("min")}`
);

await page.fill("#level", "65");
await page.locator("#level").blur();
await page.waitForTimeout(300);
check(
    "6돌파에서 65를 입력하면 70으로 보정된다",
    await page.locator("#level").inputValue() === "70",
    `실제 ${await page.locator("#level").inputValue()}`
);

check("콘솔 에러 없음", errors.length === 0, errors.slice(0, 2).join(" | "));

await browser.close();

const failed = results.filter(r => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} 통과`);
process.exit(failed.length ? 1 : 0);
