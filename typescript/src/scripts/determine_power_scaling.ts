import { StockCharacters } from '@src/character_sheet/stock_characters';
import { Creature } from '@src/character_sheet/creature';
import { DamageScaling } from '@src/core_mechanics/damage_scaling';
import cli from 'commander';

export type OutlierStatus = '---' | 'Excessive power scaling' | 'Insufficient power scaling';

export interface TargetDamageRange {
  minPct: number;
  maxPct: number;
}

export interface PowerScalingComparison {
  level: number;
  characterName: string;
  className: string;
  rank: number;
  power: number;
  drPoolText: string;
  avgDR: number;
  drlPoolText: string;
  avgDRL: number;
  diff: number;
  pctDiff: number;
  targetRange: TargetDamageRange;
  isOutlier: boolean;
  status: OutlierStatus;
}

export interface PowerScalingOptions {
  className?: string;
  onlyOutliers?: boolean;
  json?: boolean;
  level?: number;
}

/**
 * Returns the target percentage difference range [minPct, maxPct] between
 * power-scaling damage (DR) and non-power-scaling damage (DRL).
 *
 * Design Goal:
 * Power-scaling damage should consistently be between 10% and 30% stronger
 * than non-power-scaled damage ([+10%, +30%]).
 */
export function getTargetRange(): TargetDamageRange {
  return { minPct: 10.0, maxPct: 30.0 };
}

/**
 * Evaluates whether power scaling vs non-power scaling is an outlier against the design goals.
 */
export function evaluatePowerComparison(
  level: number,
  characterName: string,
  className: string,
  rank: number,
  power: number,
  targetRange: TargetDamageRange = getTargetRange(),
): PowerScalingComparison {
  const drScaling = DamageScaling.dr(rank);
  const drlScaling = DamageScaling.drl(rank);

  const drPool = drScaling.scaledPool(power, 0);
  const avgDR = drPool.averageDamage();

  const drlPool = drlScaling.scaledPool(power, 0);
  const avgDRL = drlPool.averageDamage();

  const diff = avgDR - avgDRL;
  const pctDiff = avgDRL !== 0 ? (diff / avgDRL) * 100 : 0;

  let status: OutlierStatus = '---';
  let isOutlier = false;

  if (pctDiff < targetRange.minPct) {
    isOutlier = true;
    status = 'Insufficient power scaling';
  } else if (pctDiff > targetRange.maxPct) {
    isOutlier = true;
    status = 'Excessive power scaling';
  }

  return {
    level,
    characterName,
    className,
    rank,
    power,
    drPoolText: drPool.toString(),
    avgDR,
    drlPoolText: drlPool.toString(),
    avgDRL,
    diff,
    pctDiff,
    targetRange,
    isOutlier,
    status,
  };
}

/**
 * Evaluates power scaling comparison for a specific creature at its active rank.
 */
export function evaluateCreaturePowerScaling(
  creature: Creature,
  targetRange: TargetDamageRange = getTargetRange(),
): PowerScalingComparison {
  const rank = creature.calculateRank();
  const power = creature.getRelevantPower(true);
  const className = creature.base_class || creature.name;

  return evaluatePowerComparison(
    creature.level,
    creature.name,
    className,
    rank,
    power,
    targetRange,
  );
}

/**
 * Runs power scaling analysis across all levels (1..21) of a stock character class.
 */
export function runPowerScalingAnalysis(
  stock: StockCharacters,
  options: PowerScalingOptions = {},
): PowerScalingComparison[] {
  const targetClass = (options.className || 'sorcerer').trim().toLowerCase();
  const results: PowerScalingComparison[] = [];

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
    const comparison = evaluateCreaturePowerScaling(char);
    results.push(comparison);
  }

  return results;
}

/**
 * Format and print the power scaling comparison table and summary report.
 */
export function printReport(
  comparisons: PowerScalingComparison[],
  options: PowerScalingOptions = {},
) {
  const targetClass = options.className || 'sorcerer';
  const displayRows = options.onlyOutliers ? comparisons.filter((c) => c.isOutlier) : comparisons;

  console.log(
    `\n========================================================================================================`,
  );
  console.log(
    ` Power Scaling (DR) vs Non-Power Scaling (DRL) Report: ${targetClass.toUpperCase()}`,
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
      'DR(X) Pool'.padEnd(12),
      'DR(X) Avg'.padEnd(10),
      'DRL(X) Pool'.padEnd(12),
      'DRL(X) Avg'.padEnd(10),
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
        `R${row.rank}`.padEnd(5),
        row.power.toString().padEnd(4),
        row.drPoolText.padEnd(12),
        row.avgDR.toFixed(2).padEnd(10),
        row.drlPoolText.padEnd(12),
        row.avgDRL.toFixed(2).padEnd(10),
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
  const tooWeakCount = comparisons.filter((c) => c.status === 'Insufficient power scaling').length;
  const tooStrongCount = comparisons.filter((c) => c.status === 'Excessive power scaling').length;

  console.log(
    `\n--------------------------------------------------------------------------------------------------------`,
  );
  console.log(` Summary:`);
  console.log(`   Total Levels Evaluated:      ${totalCount}`);
  console.log(
    `   Passed Design Goals:         ${passedCount} (${((passedCount / totalCount) * 100).toFixed(1)}%)`,
  );
  console.log(
    `   Outliers:                    ${outlierCount} (${((outlierCount / totalCount) * 100).toFixed(1)}%)`,
  );
  if (outlierCount > 0) {
    console.log(`     - Power Scaling Too Weak (< +10%):           ${tooWeakCount}`);
    console.log(`     - Power Scaling Too Strong (> +30%):         ${tooStrongCount}`);
  }
  console.log(
    `--------------------------------------------------------------------------------------------------------\n`,
  );
}

export async function main(options: PowerScalingOptions = {}) {
  const stock = new StockCharacters();
  stock.addAllCharacters();

  const comparisons = runPowerScalingAnalysis(stock, options);

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
    .option('--json', 'Output results in JSON format')
    .parse(process.argv);

  main({
    className: cli.class,
    level: cli.level,
    onlyOutliers: Boolean(cli.onlyOutliers),
    json: Boolean(cli.json),
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
