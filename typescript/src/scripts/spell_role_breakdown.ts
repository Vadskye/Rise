import { mysticSpheres, AbilityRole, ABILITY_ROLES, BaseSpellLike, MysticSphere } from '../mystic_spheres';
import cli from 'commander';
import { printTable, printBarChart, calculateBreakdown } from '../util/cli_output';

type RoleCounts = Record<string, number>;
type RoleBreakdown = Record<string, RoleCounts>;

function calculateRoleBreakdowns(
  spheres: MysticSphere[],
  roles: AbilityRole[]
): {
  fullRoleBreakdown: RoleBreakdown;
  roleTotals: RoleCounts;
  averageRoleCounts: RoleCounts;
} {
  const { fullBreakdown, totals, averageCounts } = calculateBreakdown<AbilityRole, BaseSpellLike>(
    spheres,
    roles,
    (ability: BaseSpellLike) => ability.roles,
    (sphere: MysticSphere) => [...(sphere.spells || []), ...(sphere.cantrips || [])]
  );
  return { fullRoleBreakdown: fullBreakdown, roleTotals: totals, averageRoleCounts: averageCounts };
}

function analyzeMysticSpheres(filterAttune: boolean, showChart: boolean, selectedSphereNames: string[]): void {
  let allRoles: AbilityRole[] = [...ABILITY_ROLES].sort();
  if (filterAttune) {
    allRoles = allRoles.filter(role => role !== 'attune');
  }

  const allMysticSpheres: MysticSphere[] = [...mysticSpheres].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const { fullRoleBreakdown, roleTotals, averageRoleCounts } =
    calculateRoleBreakdowns(allMysticSpheres, allRoles);

  fullRoleBreakdown['Average'] = averageRoleCounts;

  const spheresToShowNames: string[] =
    selectedSphereNames.length > 0
      ? selectedSphereNames
      : showChart
      ? allMysticSpheres.map(s => s.name)
      : [...allMysticSpheres.map(s => s.name), 'Average'];

  if (showChart) {
    for (const sphereName of spheresToShowNames) {
      if (fullRoleBreakdown[sphereName]) {
        printBarChart(
          sphereName,
          fullRoleBreakdown[sphereName],
          averageRoleCounts,
          'Role'
        );
      }
    }
  } else {
    const header: string[] = ['Role', ...spheresToShowNames, 'Total'];
    const tableData: (string | number)[][] = [header];

    for (const role of allRoles) {
      const row: (string | number)[] = [role];
      for (const sphereName of spheresToShowNames) {
        const count: number = fullRoleBreakdown[sphereName]?.[role] || 0;
        row.push(count);
      }
      row.push(roleTotals[role] || 0);
      tableData.push(row);
    }

    const totalRow: (string | number)[] = ['**Total**'];
    let grandTotal = 0;
    for (const sphereName of spheresToShowNames) {
      const sphereTotal: number = Object.values(
        fullRoleBreakdown[sphereName]
      ).reduce((a, b) => a + b, 0);
      totalRow.push(sphereTotal);
      grandTotal += sphereTotal;
    }
    totalRow.push(grandTotal);
    tableData.push(totalRow);
    printTable(tableData);
  }
}

export function main(filterAttune: boolean, showChart: boolean, selectedSphereNames: string[]): void {
  analyzeMysticSpheres(filterAttune, showChart, selectedSphereNames);
}

if (require.main === module) {
  cli
    .option('--no-attune', 'Filter out "attune" role from the breakdown')
    .option('--chart', 'Display data as a bar chart')
    .option(
      '--spheres <sphereNames>',
      'Comma-separated list of mystic sphere names to display'
    )
    .parse(process.argv);

  const options = cli.opts();
  main(options.noAttune, options.chart, options.spheres ? options.spheres.split(',') : []);
}
