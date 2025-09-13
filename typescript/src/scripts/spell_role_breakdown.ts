import { mysticSpheres, AbilityRole, ABILITY_ROLES, BaseSpellLike, MysticSphere } from '../mystic_spheres';
import cli from 'commander';

type RoleCounts = Record<string, number>;
type RoleBreakdown = Record<string, RoleCounts>;

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
  roleCounts: RoleCounts,
  averageCounts: RoleCounts
): void {
  const sortedRoles: [string, number][] = Object.entries(roleCounts)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a);

  if (sortedRoles.length === 0) {
    console.log(`\n--- ${title} ---`);
    console.log('No roles to display for this sphere with the current filters.');
    return;
  }

  const maxRoleNameLength: number = Math.max(...sortedRoles.map(([name]) => name.length));
  const maxValue: number = Math.max(
    ...Object.values(roleCounts),
    ...Object.values(averageCounts)
  );
  const maxBarWidth = 40;

  console.log(`\n--- ${title} ---`);
  const header = `${'Role'.padEnd(maxRoleNameLength)} | Count | Avg   | Chart`;
  console.log(header);
  console.log(
    '-'.repeat(maxRoleNameLength) + ' | ----- | ----- | ' + '-'.repeat(maxBarWidth)
  );

  for (const [role, count] of sortedRoles) {
    const avg: number = averageCounts[role] || 0;
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
      `${role.padEnd(maxRoleNameLength)} | ${String(count).padEnd(
        5
      )} | ${formattedAvg.padEnd(5)} | ${bar}`
    );
  }
}

function calculateRoleBreakdowns(
  spheres: MysticSphere[],
  roles: AbilityRole[]
): {
  fullRoleBreakdown: RoleBreakdown;
  roleTotals: RoleCounts;
  averageRoleCounts: RoleCounts;
} {
  const fullRoleBreakdown: RoleBreakdown = {};

  for (const sphere of spheres) {
    const sphereRoles: RoleCounts = {};
    const spellsAndCantrips: BaseSpellLike[] = [
      ...(sphere.spells || []),
      ...(sphere.cantrips || []),
    ];

    for (const spell of spellsAndCantrips) {
      if (spell.roles) {
        for (const role of spell.roles) {
          if (roles.includes(role)) {
            sphereRoles[role] = (sphereRoles[role] || 0) + 1;
          }
        }
      }
    }
    fullRoleBreakdown[sphere.name] = sphereRoles;
  }

  const roleTotals: RoleCounts = {};
  const averageRoleCounts: RoleCounts = {};
  const spheresForAverage = spheres.filter(sphere => sphere.name !== 'Universal');
  const numSpheresForAverage: number = spheresForAverage.length;

  for (const role of roles) {
    let total = 0;
    for (const sphere of spheresForAverage) {
      total += fullRoleBreakdown[sphere.name]?.[role] || 0;
    }
    roleTotals[role] = total;
    averageRoleCounts[role] = total / numSpheresForAverage;
  }

  return { fullRoleBreakdown, roleTotals, averageRoleCounts };
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
          averageRoleCounts
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
    for (const sphereName of spheresToShowNames) {
      const sphereTotal: number = Object.values(
        fullRoleBreakdown[sphereName]
      ).reduce((a, b) => a + b, 0);
      totalRow.push(sphereTotal);
    }
    totalRow.push(Object.values(roleTotals).reduce((a, b) => a + b, 0));
    tableData.push(totalRow);
    printTable(tableData);
  }
}

function main(filterAttune: boolean, showChart: boolean, selectedSphereNames: string[]): void {
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
