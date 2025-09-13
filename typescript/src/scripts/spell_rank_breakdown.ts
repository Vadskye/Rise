import { mysticSpheres, Spell, MysticSphere, Rank } from '../mystic_spheres';
import cli from 'commander';
import { printTable, printBarChart, calculateBreakdown } from '../util/cli_output';

const RANKS: Rank[] = [1, 2, 3, 4, 5, 6, 7] as const;

type RankCounts = Record<string, number>;
type RankBreakdown = Record<string, RankCounts>;

function calculateRankBreakdowns(
  spheres: MysticSphere[],
  ranks: readonly Rank[]
): {
  fullRankBreakdown: RankBreakdown;
  rankTotals: RankCounts;
  averageRankCounts: RankCounts;
} {
  const { fullBreakdown, totals, averageCounts } = calculateBreakdown<Rank, Spell>(
    spheres,
    ranks,
    (spell: Spell) => spell.rank,
    (sphere: MysticSphere) => sphere.spells || []
  );
  return { fullRankBreakdown: fullBreakdown, rankTotals: totals, averageRankCounts: averageCounts };
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
          averageRankCounts,
          'Rank'
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
    let grandTotal = 0;
    for (const rank of allRanks) {
      let rankSum = 0;
      for (const sphereName of spheresToShowNames) {
        rankSum += fullRankBreakdown[sphereName]?.[String(rank)] || 0;
      }
      totalRow.push(rankSum);
      grandTotal += rankSum;
    }
    totalRow.push(grandTotal);
    tableData.push(totalRow);
    printTable(tableData);
  }
}

export function main(showChart: boolean, selectedSphereNames: string[]): void {
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
