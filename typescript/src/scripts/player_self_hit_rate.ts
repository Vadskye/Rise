import { StockCharacters } from '@src/character_sheet/stock_characters';
import { Creature } from '@src/character_sheet/creature';
import { createTeam, createScenario } from '@src/combat/combat_scenario';
import cli from 'commander';

interface BucketData {
  hitRates: number[];
  killTimes: number[];
}

interface RunOptions {
  class?: string;
  iterations?: number;
}

/**
 * Calculates the average hit rate and self-kill time of player stock characters against themselves.
 * By default includes all stock characters, or filters by class if specified.
 */
export async function main(options: RunOptions = {}) {
  const stock = new StockCharacters();
  stock.addAllCharacters();

  // Gather available classes and filter stock characters
  const allNames = stock.getCharacterNames();
  const availableClassesSet = new Set<string>();
  const candidates: Creature[] = [];

  for (const name of allNames) {
    // Skip unnumbered aliases (e.g. "Fighter" alongside "Fighter 1") and non-numbered names
    if (!/\s\d+$/.test(name)) {
      continue;
    }

    const char = stock.getCharacter(name);
    if (!char) {
      continue;
    }

    const baseClass = char.base_class;
    if (!baseClass) {
      continue;
    }

    availableClassesSet.add(baseClass.toLowerCase());
    candidates.push(char);
  }

  const availableClasses = Array.from(availableClassesSet).sort();

  let targetCharacters: Creature[] = candidates;
  let filterTitle = 'All Classes';

  if (options.class) {
    const classFilter = options.class.trim().toLowerCase();
    if (!availableClassesSet.has(classFilter)) {
      console.error(
        `Error: Unknown class '${options.class}'.\nAvailable classes: ${availableClasses.join(', ')}`,
      );
      process.exit(1);
    }

    targetCharacters = candidates.filter(
      (c) => c.base_class && c.base_class.toLowerCase() === classFilter,
    );
    const matchedClassName = targetCharacters[0]?.base_class ?? classFilter;
    filterTitle = `Class: ${matchedClassName.charAt(0).toUpperCase() + matchedClassName.slice(1)}`;
  }

  console.log(
    `Found ${targetCharacters.length} stock character(s) (${filterTitle}). Starting simulations...`,
  );

  const overallHitRates: number[] = [];
  const overallKillTimes: number[] = [];

  const levelBuckets: Record<string, BucketData> = {
    '1-5': { hitRates: [], killTimes: [] },
    '6-10': { hitRates: [], killTimes: [] },
    '11-15': { hitRates: [], killTimes: [] },
    '16-20': { hitRates: [], killTimes: [] },
    '21+': { hitRates: [], killTimes: [] },
  };

  const iterations = options.iterations ?? 50;

  for (const baseChar of targetCharacters) {
    const uniqueId = Math.random().toString(36).substring(7);
    const name1 = `${baseChar.name}_A_${uniqueId}`;
    const name2 = `${baseChar.name}_B_${uniqueId}`;

    const c1 = baseChar.clone(name1);
    const c2 = baseChar.clone(name2);

    const teamA = createTeam('Team A', [c1]);
    const teamB = createTeam('Team B', [c2]);

    const scenario = createScenario([teamA, teamB]);
    const stats = scenario.simulate(iterations);

    const hitRateA = stats.averageHitRates['Team A'] ?? 0;
    const hitRateB = stats.averageHitRates['Team B'] ?? 0;
    const avgHitRate = (hitRateA + hitRateB) / 2;
    const avgKillTime = stats.averageTurns;

    const level = baseChar.level;
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

    overallHitRates.push(avgHitRate);
    overallKillTimes.push(avgKillTime);
    bucket.hitRates.push(avgHitRate);
    bucket.killTimes.push(avgKillTime);
  }

  const calculateOverallAvg = (values: number[]) =>
    values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;

  const avgOverallHit = calculateOverallAvg(overallHitRates);
  const avgOverallKill = calculateOverallAvg(overallKillTimes);

  console.log(
    `\n--- Player Stock Character Self-Hit Rate & Self-Kill Time Results (${filterTitle}) ---`,
  );
  console.log(
    `Stock Characters (${targetCharacters.length}): Hit Rate: ${avgOverallHit.toFixed(2)}%, Self-Kill Time: ${avgOverallKill.toFixed(2)} turns`,
  );

  console.log('\n--- Level-based Hit Rates & Self-Kill Times ---');
  console.log(
    `${'Range'.padEnd(6)} | ${'Count'.padEnd(7)} | ${'Avg Hit Rate'.padEnd(14)} | ${'Avg Self-Kill Time'.padEnd(20)}`,
  );
  console.log('-'.repeat(57));

  for (const range in levelBuckets) {
    const bucket = levelBuckets[range];
    if (bucket.hitRates.length > 0) {
      const avgHit = calculateOverallAvg(bucket.hitRates);
      const avgKill = calculateOverallAvg(bucket.killTimes);
      const countStr = `${bucket.hitRates.length}`;
      const hitStr = `${avgHit.toFixed(2)}%`;
      const killStr = `${avgKill.toFixed(2)} turns`;

      console.log(
        `${range.padEnd(6)} | ${countStr.padEnd(7)} | ${hitStr.padEnd(14)} | ${killStr.padEnd(20)}`,
      );
    }
  }
  console.log('---------------------------------------------------------\n');
}

if (require.main === module) {
  cli
    .option('-c, --class <string>', 'Filter by stock character class (e.g. fighter, wizard)')
    .option(
      '-i, --iterations <number>',
      'Number of iterations per combat (default: 50)',
      (val) => parseInt(val, 10),
      50,
    )
    .parse(process.argv);

  main({
    class: cli.class,
    iterations: cli.iterations,
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
