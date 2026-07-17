import fireflyBasic from "./basic.js";
import fireflyBasicEnhanced from "./basic2.js";
import fireflySkill from "./skill.js";
import fireflySkillEnhanced from "./skill2.js";
import fireflyUltimate from "./ultimate.js";
import fireflyTalent from "./talent.js";
import fireflyTechnique from "./technique.js";

/**
 * characters 시드의 actions[].formula 값과 키가 일치해야 한다.
 * 시드는 `${slug}.${actionId}` 규칙으로 만든다(반디의 slug는 "firefly").
 *
 * 반디는 공식이 다 채워진 유일한 캐릭터다. 새 캐릭터를 붙일 때 참고해라.
 * 배율은 하드코딩하지 않고 param(build, definition, n)으로 시드에서 읽는다.
 */
export const fireflyFormulas = {
    "firefly.basic": fireflyBasic,
    "firefly.basic2": fireflyBasicEnhanced,
    "firefly.skill": fireflySkill,
    "firefly.skill2": fireflySkillEnhanced,
    "firefly.ultimate": fireflyUltimate,
    "firefly.talent": fireflyTalent,
    "firefly.technique": fireflyTechnique
};
