export class EnemyEngine {

    damageToughness(enemy, value) {

        enemy.currentToughness = Math.max(
            0,
            enemy.currentToughness - value
        );

        return enemy.currentToughness === 0;

    }

    restoreToughness(enemy) {

        enemy.currentToughness = enemy.toughness;

    }

}