import { FormulaRegistry } from "./FormulaRegistry.js";
import { fireflyFormulas } from "./characters/firefly/index.js";

export const formulaRegistry = new FormulaRegistry();

/**
 * 공식은 정적 데이터이므로 isolate 시작 시 한 번만 등록한다.
 * (요청별 상태가 아니므로 모듈 스코프 싱글턴이어도 안전하다.)
 */
for (const [id, formula] of Object.entries(fireflyFormulas)) {
    formulaRegistry.register(id, formula);
}
