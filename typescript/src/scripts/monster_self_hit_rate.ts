import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';
import { createTeam, createScenario } from '@src/combat/combat_scenario';

/**
 * Calculates the average hit rate and self-kill time of monsters against themselves.
 * Splits results into elite and non-elite categories.
 */
async function main() {
  const grimoire = new Grimoire();
  grimoire.addAllMonsters();

  const allMonsters: Creature[] = [];

  // Add individual monsters
  for (const name of grimoire.getMonsterNames()) {
    const monster = grimoire.getMonster(name);
    if (monster) {
      allMonsters.push(monster);
    }
  }

  // Add monsters from groups (excluding animals)
  for (const groupName of grimoire.getMonsterGroupNames()) {
    if (groupName.toLowerCase() === 'animals') {
      continue;
    }
    const group = grimoire.getMonsterGroup(groupName);
    if (group) {
      allMonsters.push(...group.monsters);
    }
  }

  console.log(`Found ${allMonsters.length} monsters. Starting simulations...`);

  const eliteHitRates: number[] = [];
  const nonEliteHitRates: number[] = [];
  const eliteKillTimes: number[] = [];
  const nonEliteKillTimes: number[] = [];

  // Bucket by level ranges: 1-5, 6-10, 11-15, 16-20, 21+
  interface BucketData {
    eliteHitRates: number[];
    nonEliteHitRates: number[];
    eliteKillTimes: number[];
    nonEliteKillTimes: number[];
  }
  const levelBuckets: Record<string, BucketData> = {
    '1-5': { eliteHitRates: [], nonEliteHitRates: [], eliteKillTimes: [], nonEliteKillTimes: [] },
    '6-10': { eliteHitRates: [], nonEliteHitRates: [], eliteKillTimes: [], nonEliteKillTimes: [] },
    '11-15': { eliteHitRates: [], nonEliteHitRates: [], eliteKillTimes: [], nonEliteKillTimes: [] },
    '16-20': { eliteHitRates: [], nonEliteHitRates: [], eliteKillTimes: [], nonEliteKillTimes: [] },
    '21+': { eliteHitRates: [], nonEliteHitRates: [], eliteKillTimes: [], nonEliteKillTimes: [] },
  };

  for (const baseMonster of allMonsters) {
    // Create two instances of the same monster
    // Note: we use unique IDs to ensure they get separate character sheets
    const uniqueId = Math.random().toString(36).substring(7);
    const name1 = `${baseMonster.name}_A_${uniqueId}`;
    const name2 = `${baseMonster.name}_B_${uniqueId}`;

    const m1 = baseMonster.clone(name1);
    const m2 = baseMonster.clone(name2);

    const teamA = createTeam('Team A', [m1]);
    const teamB = createTeam('Team B', [m2]);

    const scenario = createScenario([teamA, teamB]);
    // Simulate with fewer iterations for speed if there are many monsters,
    // but 100 is standard in combat_scenario.ts
    const iterations = 50;
    const stats = scenario.simulate(iterations);

    // Aggregate hit rates and average kill times (turns)
    const hitRateA = stats.averageHitRates['Team A'];
    const hitRateB = stats.averageHitRates['Team B'];
    const avgHitRate = (hitRateA + hitRateB) / 2;
    const avgKillTime = stats.averageTurns;

    const level = baseMonster.level;
    let bucket: BucketData;
    if (level <= 5) {
      bucket = levelBuckets['1-5'];
    } else if (level <= 10) {
      bucket = levelBuckets['6-10'];
    } else if (level <= 15) {
      bucket = levelBuckets['11-15'];
    } else if (level <= 20) {
      bucket = levelBuckets['16-20'];
    } else {
      bucket = levelBuckets['21+'];
    }

    if (baseMonster.elite) {
      eliteHitRates.push(avgHitRate);
      eliteKillTimes.push(avgKillTime);
      bucket.eliteHitRates.push(avgHitRate);
      bucket.eliteKillTimes.push(avgKillTime);
    } else {
      nonEliteHitRates.push(avgHitRate);
      nonEliteKillTimes.push(avgKillTime);
      bucket.nonEliteHitRates.push(avgHitRate);
      bucket.nonEliteKillTimes.push(avgKillTime);
    }
  }

  const calculateOverallAvg = (values: number[]) =>
    values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;

  const avgEliteHit = calculateOverallAvg(eliteHitRates);
  const avgNonEliteHit = calculateOverallAvg(nonEliteHitRates);
  const avgEliteKill = calculateOverallAvg(eliteKillTimes);
  const avgNonEliteKill = calculateOverallAvg(nonEliteKillTimes);

  console.log('\n--- Overall Self-Hit Rate & Self-Kill Time Results ---');
  console.log(
    `Non-Elite Monsters (${nonEliteHitRates.length}): Hit Rate: ${avgNonEliteHit.toFixed(2)}%, Self-Kill Time: ${avgNonEliteKill.toFixed(2)} turns`,
  );
  console.log(
    `Elite Monsters (${eliteHitRates.length}): Hit Rate: ${avgEliteHit.toFixed(2)}%, Self-Kill Time: ${avgEliteKill.toFixed(2)} turns`,
  );

  console.log('\n--- Level-based Hit Rates (Separated) ---');
  console.log(
    `${'Range'.padEnd(6)} | ${'Non-Elite'.padEnd(15)} | ${'Elite'.padEnd(15)} | ${'Combined'.padEnd(15)}`,
  );
  console.log('-'.repeat(55));
  for (const range in levelBuckets) {
    const bucket = levelBuckets[range];
    const combined = [...bucket.eliteHitRates, ...bucket.nonEliteHitRates];
    if (combined.length > 0) {
      const avgNonElite = calculateOverallAvg(bucket.nonEliteHitRates);
      const avgElite = calculateOverallAvg(bucket.eliteHitRates);
      const avgCombined = calculateOverallAvg(combined);

      const nonEliteStr =
        bucket.nonEliteHitRates.length > 0
          ? `${avgNonElite.toFixed(2)}% (${bucket.nonEliteHitRates.length})`
          : 'N/A';
      const eliteStr =
        bucket.eliteHitRates.length > 0
          ? `${avgElite.toFixed(2)}% (${bucket.eliteHitRates.length})`
          : 'N/A';
      const combinedStr = `${avgCombined.toFixed(2)}% (${combined.length})`;

      console.log(
        `${range.padEnd(6)} | ${nonEliteStr.padEnd(15)} | ${eliteStr.padEnd(15)} | ${combinedStr.padEnd(15)}`,
      );
    }
  }
  console.log('-------------------------------------\n');

  console.log('\n--- Level-based Self-Kill Times in Turns (Separated) ---');
  console.log(
    `${'Range'.padEnd(6)} | ${'Non-Elite'.padEnd(18)} | ${'Elite'.padEnd(18)} | ${'Combined'.padEnd(18)}`,
  );
  console.log('-'.repeat(64));
  for (const range in levelBuckets) {
    const bucket = levelBuckets[range];
    const combined = [...bucket.eliteKillTimes, ...bucket.nonEliteKillTimes];
    if (combined.length > 0) {
      const avgNonElite = calculateOverallAvg(bucket.nonEliteKillTimes);
      const avgElite = calculateOverallAvg(bucket.eliteKillTimes);
      const avgCombined = calculateOverallAvg(combined);

      const nonEliteStr =
        bucket.nonEliteKillTimes.length > 0
          ? `${avgNonElite.toFixed(2)} turns (${bucket.nonEliteKillTimes.length})`
          : 'N/A';
      const eliteStr =
        bucket.eliteKillTimes.length > 0
          ? `${avgElite.toFixed(2)} turns (${bucket.eliteKillTimes.length})`
          : 'N/A';
      const combinedStr = `${avgCombined.toFixed(2)} turns (${combined.length})`;

      console.log(
        `${range.padEnd(6)} | ${nonEliteStr.padEnd(18)} | ${eliteStr.padEnd(18)} | ${combinedStr.padEnd(18)}`,
      );
    }
  }
  console.log('-------------------------------------\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

