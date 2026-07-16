import fireflyBasic from "./basic.js";
import fireflySkill from "./skill.js";
import fireflyUltimate from "./ultimate.js";

/**
 * firefly.json의 actions[].formula 값과 키가 일치해야 한다.
 */
export const fireflyFormulas = {
    "firefly.basic": fireflyBasic,
    "firefly.skill": fireflySkill,
    "firefly.ultimate": fireflyUltimate
};
