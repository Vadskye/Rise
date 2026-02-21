import { Grimoire } from '../monsters/grimoire';
import { Creature } from '../character_sheet/creature';
import { createTeam, createScenario } from '../character_sheet/combat_scenario';

/**
 * Calculates the average hit rate of monsters against themselves.
 * Splits results into elite and non-elite categories.
 */
async function main() {
    const grimoire = new Grimoire();
    grimoire.addAllMonsters();

    const allMonsters: Creature[] = [];

    // Add individual monsters
    for (const name of grimoire.getMonsterNames()) {
        const monster = grimoire.getMonster(name);
        if (monster) allMonsters.push(monster);
    }

    // Add monsters from groups
    for (const groupName of grimoire.getMonsterGroupNames()) {
        const group = grimoire.getMonsterGroup(groupName);
        if (group) {
            allMonsters.push(...group.monsters);
        }
    }

    console.log(`Found ${allMonsters.length} monsters. Starting simulations...`);

    const eliteHitRates: number[] = [];
    const nonEliteHitRates: number[] = [];

    for (const baseMonster of allMonsters) {
        // Create two instances of the same monster
        // Note: we use unique IDs to ensure they get separate character sheets
        const uniqueId = Math.random().toString(36).substring(7);
        const name1 = `${baseMonster.name}_A_${uniqueId}`;
        const name2 = `${baseMonster.name}_B_${uniqueId}`;

        const m1 = baseMonster.clone(name1);
        const m2 = baseMonster.clone(name2);

        const teamA = createTeam("Team A", [m1]);
        const teamB = createTeam("Team B", [m2]);

        const scenario = createScenario([teamA, teamB]);
        // Simulate with fewer iterations for speed if there are many monsters, 
        // but 100 is standard in combat_scenario.ts
        const iterations = 50;
        const stats = scenario.simulate(iterations);

        // Aggregate hit rates
        const hitRateA = stats.averageHitRates["Team A"];
        const hitRateB = stats.averageHitRates["Team B"];
        const avgHitRate = (hitRateA + hitRateB) / 2;

        if (baseMonster.elite) {
            eliteHitRates.push(avgHitRate);
        } else {
            nonEliteHitRates.push(avgHitRate);
        }
    }

    const calculateOverallAvg = (rates: number[]) =>
        rates.length > 0 ? rates.reduce((a, b) => a + b, 0) / rates.length : 0;

    const avgElite = calculateOverallAvg(eliteHitRates);
    const avgNonElite = calculateOverallAvg(nonEliteHitRates);

    console.log('\n--- Overall Self-Hit Rate Results ---');
    console.log(`Non-Elite Monsters (${nonEliteHitRates.length}): ${avgNonElite.toFixed(2)}%`);
    console.log(`Elite Monsters (${eliteHitRates.length}): ${avgElite.toFixed(2)}%`);
    console.log('-------------------------------------\n');
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
