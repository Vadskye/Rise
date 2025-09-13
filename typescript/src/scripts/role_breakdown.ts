import { mysticSpheres, AbilityRole, ABILITY_ROLES, MysticSphere } from '../mystic_spheres';
import * as process from 'process';

function printTable(tableData: (string | number)[][]) {
  // Calculate column widths
  const columnWidths: number[] = tableData[0].map((_, i) => {
    return Math.max(...tableData.map(row => String(row[i]).length));
  });

  // Add separator row for markdown
  const separator = columnWidths.map(w => '-'.repeat(w));
  tableData.splice(1, 0, separator);

  // Format and print table
  const formattedTable = tableData.map(row => {
    return row
      .map((cell, i) => String(cell).padEnd(columnWidths[i]))
      .join(' | ');
  });

  console.log(formattedTable.join('\n'));
}

function printBarChart(title: string, roleCounts: Record<string, number>) {
  const sortedRoles = Object.entries(roleCounts).filter(([, count]) => count > 0).sort(([, a], [, b]) => b - a);

  if (sortedRoles.length === 0) {
    return;
  }

  const maxRoleNameLength = Math.max(...sortedRoles.map(([name]) => name.length));
  const maxValue = Math.max(...sortedRoles.map(([, value]) => value));
  const maxBarWidth = 50;

  console.log(`\n--- ${title} ---`);
  console.log('Role'.padEnd(maxRoleNameLength) + ' | Count | Chart');
  console.log('-'.repeat(maxRoleNameLength) + ' | ----- | ' + '-'.repeat(maxBarWidth));

  for (const [role, count] of sortedRoles) {
    const barWidth = Math.round((count / maxValue) * maxBarWidth);
    const bar = '█'.repeat(barWidth);
    console.log(
      `${role.padEnd(maxRoleNameLength)} | ${String(count).padEnd(5)} | ${bar}`
    );
  }
}


function analyzeMysticSpheres() {
  const args = process.argv.slice(2);
  const filterAttune = args.includes('--no-attune');
  const showChart = args.includes('--chart');
  const spheresIndex = args.indexOf('--spheres');
  let selectedSphereNames: string[] = [];
  if (spheresIndex !== -1 && spheresIndex + 1 < args.length) {
    selectedSphereNames = args[spheresIndex + 1].split(',');
  }


  const roleBreakdown: Record<string, Record<AbilityRole, number>> = {};
  let allRoles = [...ABILITY_ROLES].sort();

  if (filterAttune) {
    allRoles = allRoles.filter(role => role !== 'attune');
  }

  let spheres: MysticSphere[] = [...mysticSpheres].sort((a, b) => a.name.localeCompare(b.name));

  if (selectedSphereNames.length > 0) {
    spheres = spheres.filter(s => selectedSphereNames.includes(s.name));
  }

  for (const sphere of spheres) {
    const sphereRoles: Record<AbilityRole, number> = {} as Record<AbilityRole, number>;

    if (sphere.cantrips) {
      for (const cantrip of sphere.cantrips) {
        if (cantrip.roles) {
          for (const role of cantrip.roles) {
            if (allRoles.includes(role)) {
              sphereRoles[role] = (sphereRoles[role] || 0) + 1;
            }
          }
        }
      }
    }

    for (const spell of sphere.spells) {
      if (spell.roles) {
        for (const role of spell.roles) {
          if (allRoles.includes(role)) {
            sphereRoles[role] = (sphereRoles[role] || 0) + 1;
          }
        }
      }
    }
    roleBreakdown[sphere.name] = sphereRoles;
  }

  if (showChart) {
    for (const sphere of spheres) {
        printBarChart(sphere.name, roleBreakdown[sphere.name]);
    }
  } else {
    const roleTotals: Record<string, number> = {};
    for (const role of allRoles) {
        let roleTotal = 0;
        for (const sphere of spheres) {
            roleTotal += roleBreakdown[sphere.name][role] || 0;
        }
        roleTotals[role] = roleTotal;
    }

    const sphereNames = spheres.map(s => s.name);
    const header = ['Role', ...sphereNames, 'Total'];
    const tableData: (string | number)[][] = [header];

    for (const role of allRoles) {
      const row: (string | number)[] = [role];
      for (const sphere of spheres) {
        const count = roleBreakdown[sphere.name][role] || 0;
        row.push(count);
      }
      row.push(roleTotals[role]);
      tableData.push(row);
    }

    // Add total row
    const totalRow: (string | number)[] = ['**Total**'];
    let grandTotal = 0;
    for (const sphere of spheres) {
      const sphereTotal = Object.values(roleBreakdown[sphere.name]).reduce((a, b) => a + b, 0);
      totalRow.push(sphereTotal);
      grandTotal += sphereTotal;
    }
    totalRow.push(grandTotal);
    tableData.push(totalRow);
    printTable(tableData);
  }
}

function main() {
  analyzeMysticSpheres();
}

if (require.main === module) {
  main();
}
