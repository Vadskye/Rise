import { StockCharacters } from '@src/character_sheet/stock_characters';
import { Creature } from '@src/character_sheet/creature';
import { DamageScaling } from '@src/core_mechanics/damage_scaling';
import cli from 'commander';

export type OutlierStatus = '---' | 'Excessive rank scaling' | 'Insufficient rank scaling';

export interface TargetDamageRange {
  minPct: number;
  maxPct: number;
}

export interface DamageScalingComparison {
  level: number;
  characterName: string;
  className: string;
  rankX: number;
  rankY: number;
  y: number;
  power: number;
  poolXText: string;
  avgX: number;
  poolXYText: string;
  avgXY: number;
  diff: number;
  pctDiff: number;
  targetRange: TargetDamageRange;
  isOutlier: boolean;
  status: OutlierStatus;
}

export interface DamageScalingOptions {
  className?: string;
  onlyOutliers?: boolean;
  drl?: boolean;
  json?: boolean;
  level?: number;
  sortByAltRank?: boolean;
}

/**
 * Returns the target percentage difference range [minPct, maxPct] for a given excess rank Y.
 * The percentage difference is defined as: ((avg(drX) - avg(dr(X-Y)+Y)) / avg(drX)) * 100.
 *
 * Design Goals:
 * - Y = 1: Both spells within 5% damage of each other ([-5%, +5%]).
 * - Y = 2: drX spell deals 0-10% more damage ([0%, +10%]).
 * - Y = 3: drX spell deals 5-20% more damage ([+5%, +20%]).
 */
export function getTargetRange(y: number): TargetDamageRange | null {
  switch (y) {
    case 1:
      return { minPct: -10, maxPct: 5 };
    case 2:
      return { minPct: -5, maxPct: 5 };
    case 3:
      return { minPct: 5.0, maxPct: 15.0 };
    default:
      return null;
  }
}

/**
 * Evaluates whether a comparison is an outlier against the design goals.
 */
export function evaluateComparison(
  level: number,
  characterName: string,
  className: string,
  rankX: number,
  y: number,
  power: number,
  lowPowerScaling: boolean = false,
): DamageScalingComparison | null {
  const rankY = rankX - y;
  if (rankY <= 0) {
    return null;
  }

  const targetRange = getTargetRange(y);
  if (!targetRange) {
    return null;
  }

  const scalingX = lowPowerScaling ? DamageScaling.drl(rankX) : DamageScaling.dr(rankX);
  const scalingXY = lowPowerScaling ? DamageScaling.drl(rankY) : DamageScaling.dr(rankY);

  const poolX = scalingX.scaledPool(power, 0);
  const avgX = poolX.averageDamage();

  const poolXY = scalingXY.scaledPool(power, y);
  const avgXY = poolXY.averageDamage();

  const diff = avgX - avgXY;
  const pctDiff = avgX !== 0 ? (diff / avgX) * 100 : 0;

  let status: OutlierStatus = '---';
  let isOutlier = false;

  if (pctDiff < targetRange.minPct) {
    isOutlier = true;
    status = 'Excessive rank scaling';
  } else if (pctDiff > targetRange.maxPct) {
    isOutlier = true;
    status = 'Insufficient rank scaling';
  }

  return {
    level,
    characterName,
    className,
    rankX,
    rankY,
    y,
    power,
    poolXText: poolX.toString(),
    avgX,
    poolXYText: poolXY.toString(),
    avgXY,
    diff,
    pctDiff,
    targetRange,
    isOutlier,
    status,
  };
}

/**
 * Evaluates damage scaling comparisons for a specific creature.
 */
export function evaluateCreatureDamageScaling(
  creature: Creature,
  lowPowerScaling: boolean = false,
): DamageScalingComparison[] {
  const rankX = creature.calculateRank();
  const power = creature.getRelevantPower(true);
  const className = creature.base_class || creature.name;
  const comparisons: DamageScalingComparison[] = [];

  for (let y = 1; y <= 3; y++) {
    const comparison = evaluateComparison(
      creature.level,
      creature.name,
      className,
      rankX,
      y,
      power,
      lowPowerScaling,
    );
    if (comparison) {
      comparisons.push(comparison);
    }
  }

  return comparisons;
}

/**
 * Runs damage scaling analysis across all levels (1..21) of a stock character class.
 */
export function runDamageScalingAnalysis(
  stock: StockCharacters,
  options: DamageScalingOptions = {},
): DamageScalingComparison[] {
  const targetClass = (options.className || 'sorcerer').trim().toLowerCase();
  const lowPower = options.drl ?? false;
  const results: DamageScalingComparison[] = [];

  const characterNames = stock.getCharacterNames();
  const matchingCharacters: Creature[] = [];

  for (const name of characterNames) {
    // Only process numbered level characters (e.g. "Sorcerer 1")
    if (!/\s\d+$/.test(name)) {
      continue;
    }

    const char = stock.getCharacter(name);
    if (!char) {
      continue;
    }

    if (char.base_class && char.base_class.toLowerCase() === targetClass) {
      if (options.level !== undefined && char.level !== options.level) {
        continue;
      }
      matchingCharacters.push(char);
    }
  }

  matchingCharacters.sort((a, b) => a.level - b.level);

  if (matchingCharacters.length === 0) {
    throw new Error(
      `No stock characters found for class '${options.className || 'sorcerer'}'. Available classes in stock characters can be checked via StockCharacters.`,
    );
  }

  for (const char of matchingCharacters) {
    const charComparisons = evaluateCreatureDamageScaling(char, lowPower);
    results.push(...charComparisons);
  }

  if (options.sortByAltRank) {
    results.sort((a, b) => a.rankY - b.rankY || a.level - b.level || a.y - b.y);
  }

  return results;
}

/**
 * Format and print the comparison results table and summary.
 */
export function printReport(
  comparisons: DamageScalingComparison[],
  options: DamageScalingOptions = {},
) {
  const targetClass = options.className || 'sorcerer';
  const scalingType = options.drl ? 'DRL (Low Power)' : 'DR (Standard)';
  const displayRows = options.onlyOutliers ? comparisons.filter((c) => c.isOutlier) : comparisons;

  console.log(
    `\n========================================================================================================`,
  );
  console.log(
    ` Spell Damage Excess Rank Scaling Report: ${targetClass.toUpperCase()} [${scalingType}]`,
  );
  console.log(
    `========================================================================================================`,
  );

  if (displayRows.length === 0) {
    if (options.onlyOutliers) {
      console.log(`\nNo outliers detected! All comparisons meet the design goals.\n`);
    } else {
      console.log(`\nNo comparisons available.\n`);
    }
  } else {
    // Table Header
    const header = [
      'Lvl'.padEnd(4),
      'Rank'.padEnd(5),
      'Pwr'.padEnd(4),
      'DR(X) Pool'.padEnd(10),
      'DR(X) Avg'.padEnd(10),
      'Alt Rank'.padEnd(8),
      'Alt Pool'.padEnd(12),
      'Alt Avg'.padEnd(8),
      'Diff'.padEnd(7),
      '% Diff'.padEnd(9),
      'Target %'.padEnd(13),
      'Status',
    ].join(' | ');

    console.log(`\n${header}`);
    console.log('-'.repeat(header.length + 5));

    for (const row of displayRows) {
      const minP =
        row.targetRange.minPct >= 0
          ? `+${row.targetRange.minPct.toFixed(0)}%`
          : `${row.targetRange.minPct.toFixed(0)}%`;
      const maxP = `+${row.targetRange.maxPct.toFixed(0)}%`;
      const targetStr = `[${minP}, ${maxP}]`;
      const pctStr = `${row.pctDiff >= 0 ? '+' : ''}${row.pctDiff.toFixed(2)}%`;
      const diffStr = `${row.diff >= 0 ? '+' : ''}${row.diff.toFixed(2)}`;

      const line = [
        row.level.toString().padEnd(4),
        `R${row.rankX}`.padEnd(5),
        row.power.toString().padEnd(4),
        row.poolXText.padEnd(10),
        row.avgX.toFixed(2).padEnd(10),
        `${row.rankX - row.y}`.padEnd(8),
        row.poolXYText.padEnd(12),
        row.avgXY.toFixed(2).padEnd(8),
        diffStr.padEnd(7),
        pctStr.padEnd(9),
        targetStr.padEnd(13),
        row.status,
      ].join(' | ');

      console.log(line);
    }
  }

  // Summary Metrics
  const totalCount = comparisons.length;
  const outlierCount = comparisons.filter((c) => c.isOutlier).length;
  const passedCount = totalCount - outlierCount;
  const tooWeakCount = comparisons.filter((c) => c.status === 'Insufficient rank scaling').length;
  const tooStrongCount = comparisons.filter((c) => c.status === 'Excessive rank scaling').length;

  console.log(
    `\n--------------------------------------------------------------------------------------------------------`,
  );
  console.log(` Summary:`);
  console.log(`   Total Comparisons Evaluated: ${totalCount}`);
  console.log(
    `   Passed Design Goals:         ${passedCount} (${((passedCount / totalCount) * 100).toFixed(1)}%)`,
  );
  console.log(
    `   Outliers:                    ${outlierCount} (${((outlierCount / totalCount) * 100).toFixed(1)}%)`,
  );
  if (outlierCount > 0) {
    console.log(`     - Lower Rank Too Weak (Exceeds Max Diff):    ${tooWeakCount}`);
    console.log(`     - Lower Rank Too Strong (Below Min Diff):    ${tooStrongCount}`);
  }
  console.log(
    `--------------------------------------------------------------------------------------------------------\n`,
  );
}

export async function main(options: DamageScalingOptions = {}) {
  const stock = new StockCharacters();
  stock.addAllCharacters();

  const comparisons = runDamageScalingAnalysis(stock, options);

  if (options.json) {
    console.log(JSON.stringify(comparisons, null, 2));
    return;
  }

  printReport(comparisons, options);
}

if (require.main === module) {
  cli
    .option(
      '-c, --class <string>',
      'Filter by stock character class (default: sorcerer)',
      'sorcerer',
    )
    .option('-l, --level <number>', 'Filter to a specific level', (val) => parseInt(val, 10))
    .option('-o, --only-outliers', 'Only show outlier comparisons')
    .option('--sort-by-alt-rank', 'Sort the output table by Alt Rank instead of Lvl')
    .option('--drl', 'Evaluate Low-Power scaling (DamageScaling.drl) instead of standard DR')
    .option('--json', 'Output results in JSON format')
    .parse(process.argv);

  main({
    className: cli.class,
    level: cli.level,
    onlyOutliers: Boolean(cli.onlyOutliers),
    sortByAltRank: Boolean(cli.sortByAltRank),
    drl: Boolean(cli.drl),
    json: Boolean(cli.json),
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
