export default function fireflySkill(context) {

    const {

        actor,

        target,

        stats

    } = context;

    const damage = stats.atk * 2.4;

    return {

        damage,

        hits:1

    };

}