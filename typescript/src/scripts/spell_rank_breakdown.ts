import { mysticSpheres, Spell, MysticSphere } from '../mystic_spheres';
import cli from 'commander';

const RANKS = [1, 2, 3, 4, 5, 6, 7] as const;
type Rank = (typeof RANKS)[number];

type RankCounts = Record<string, number>;
type RankBreakdown = Record<string, RankCounts>;

function printTable(tableData: (string | number)[][]): void {
  const formattedData: string[][] = tableData.map(row =>
    row.map(cell => {
      if (typeof cell === 'number') {
        if (cell > 1) {
          return String(Math.round(cell));
        }
        return cell % 1 === 0 ? String(cell) : cell.toFixed(1);
      }
      return String(cell);
    })
  );

  const columnWidths: number[] = formattedData[0].map((_, i) =>
    Math.max(...formattedData.map(row => row[i].length))
  );

  const separator: string[] = columnWidths.map(w => '-'.repeat(w));
  formattedData.splice(1, 0, separator);

  const formattedTable: string = formattedData
    .map(row => row.map((cell, i) => cell.padEnd(columnWidths[i])).join(' | '))
    .join('\n');

  console.log(formattedTable);
}

function printBarChart(
  title: string,
  rankCounts: RankCounts,
  averageCounts: RankCounts
): void {
  const sortedRanks: [string, number][] = Object.entries(rankCounts)
    .sort(([a], [b]) => Number(a) - Number(b));

  if (sortedRanks.length === 0) {
    console.log(`\n--- ${title} ---`);
    console.log('No ranks to display for this sphere.');
    return;
  }

  const maxRankNameLength: number = Math.max(...sortedRanks.map(([name]) => name.length));
  const maxValue: number = Math.max(
    1,
    ...Object.values(rankCounts),
    ...Object.values(averageCounts)
  );
  const maxBarWidth = 40;

  console.log(`\n--- ${title} ---`);
  const header = `${'Rank'.padEnd(maxRankNameLength)} | Count | Avg   | Chart`;
  console.log(header);
  console.log(
    '-'.repeat(maxRankNameLength) + ' | ----- | ----- | ' + '-'.repeat(maxBarWidth)
  );

  for (const [rank, count] of sortedRanks) {
    const avg: number = averageCounts[rank] || 0;
    const formattedAvg: string =
      avg > 1 ? String(Math.round(avg)) : avg.toFixed(1);

    const barWidth: number = Math.round((count / maxValue) * maxBarWidth);
    const avgMarkerPos: number = Math.round((avg / maxValue) * maxBarWidth);

    let bar: string = '█'.repeat(barWidth);
    if (bar.length >= avgMarkerPos) {
      bar = bar.substring(0, avgMarkerPos) + '│' + bar.substring(avgMarkerPos + 1);
    } else {
      bar = bar + ' '.repeat(avgMarkerPos - bar.length) + '│';
    }

    console.log(
      `${rank.padEnd(maxRankNameLength)} | ${String(count).padEnd(
        5
      )} | ${formattedAvg.padEnd(5)} | ${bar}`
    );
  }
}

function calculateRankBreakdowns(
  spheres: MysticSphere[],
  ranks: readonly Rank[]
): {
  fullRankBreakdown: RankBreakdown;
  rankTotals: RankCounts;
  averageRankCounts: RankCounts;
} {
  const fullRankBreakdown: RankBreakdown = {};

  for (const sphere of spheres) {
    const sphereRanks: RankCounts = {};
    for (const rank of ranks) {
        sphereRanks[String(rank)] = 0;
    }

    const spells: Spell[] = sphere.spells || [];

    for (const spell of spells) {
      if (spell.rank && ranks.includes(spell.rank)) {
        sphereRanks[String(spell.rank)] = (sphereRanks[String(spell.rank)] || 0) + 1;
      }
    }
    fullRankBreakdown[sphere.name] = sphereRanks;
  }

  const rankTotals: RankCounts = {};
  const averageRankCounts: RankCounts = {};
  const spheresForAverage = spheres.filter(sphere => sphere.name !== 'Universal');
  const numSpheresForAverage: number = spheresForAverage.length;

  for (const rank of ranks) {
    let total = 0;
    for (const sphere of spheresForAverage) {
      total += fullRankBreakdown[sphere.name]?.[String(rank)] || 0;
    }
    rankTotals[String(rank)] = total;
    averageRankCounts[String(rank)] = total / numSpheresForAverage;
  }

  return { fullRankBreakdown, rankTotals, averageRankCounts };
}

function analyzeMysticSpheres(showChart: boolean, selectedSphereNames: string[]): void {
  const allRanks: Rank[] = [...RANKS];

  const allMysticSpheres: MysticSphere[] = [...mysticSpheres].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const { fullRankBreakdown, rankTotals, averageRankCounts } =
    calculateRankBreakdowns(allMysticSpheres, allRanks);

  fullRankBreakdown['Average'] = averageRankCounts;

  const spheresToShowNames: string[] =
    selectedSphereNames.length > 0
      ? selectedSphereNames
      : showChart
      ? allMysticSpheres.map(s => s.name)
      : [...allMysticSpheres.map(s => s.name), 'Average'];

  if (showChart) {
    for (const sphereName of spheresToShowNames) {
      if (fullRankBreakdown[sphereName]) {
        printBarChart(
          sphereName,
          fullRankBreakdown[sphereName],
          averageRankCounts
        );
      }
    }
  } else {
    const header: string[] = ['Sphere', ...allRanks.map(String), 'Total'];
    const tableData: (string | number)[][] = [header];

    for (const sphereName of spheresToShowNames) {
      const row: (string | number)[] = [sphereName];
      let sphereTotal = 0;
      for (const rank of allRanks) {
        const count: number = fullRankBreakdown[sphereName]?.[String(rank)] || 0;
        row.push(count);
        sphereTotal += count;
      }
      row.push(sphereTotal);
      tableData.push(row);
    }

    const totalRow: (string | number)[] = ['**Total**'];
    for (const rank of allRanks) {
      totalRow.push(rankTotals[String(rank)] || 0);
    }
    totalRow.push(Object.values(rankTotals).reduce((a, b) => a + b, 0));
    tableData.push(totalRow);
    printTable(tableData);
  }
}

function main(showChart: boolean, selectedSphereNames: string[]): void {
  analyzeMysticSpheres(showChart, selectedSphereNames);
}

if (require.main === module) {
  cli
    .option('--chart', 'Display data as a bar chart')
    .option(
      '--spheres <sphereNames>',
      'Comma-separated list of mystic sphere names to display'
    )
    .parse(process.argv);

  const options = cli.opts();
  main(options.chart, options.spheres ? options.spheres.split(',') : []);
}
