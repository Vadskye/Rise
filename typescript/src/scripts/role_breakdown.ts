import { mysticSpheres, AbilityRole, ABILITY_ROLES, MysticSphere } from '../mystic_spheres';
import * as process from 'process';

function printTable(tableData: (string | number)[][]) {
  // Format numbers to be more readable
  const formattedData = tableData.map(row => {
    return row.map(cell => {
      if (typeof cell === 'number') {
        if (cell > 1) {
            return String(Math.round(cell));
        }
        return cell % 1 === 0 ? String(cell) : cell.toFixed(1);
      }
      return cell;
    });
  });

  // Calculate column widths
  const columnWidths: number[] = formattedData[0].map((_, i) => {
    return Math.max(...formattedData.map(row => String(row[i]).length));
  });

  // Add separator row for markdown
  const separator = columnWidths.map(w => '-'.repeat(w));
  formattedData.splice(1, 0, separator);

  // Format and print table
  const formattedTable = formattedData.map(row => {
    return row
      .map((cell, i) => String(cell).padEnd(columnWidths[i]))
      .join(' | ');
  });

  console.log(formattedTable.join('\n'));
}

function printBarChart(title: string, roleCounts: Record<string, number>, averageCounts: Record<string, number>) {
  const sortedRoles = Object.entries(roleCounts).filter(([, count]) => count > 0).sort(([, a], [, b]) => b - a);

  if (sortedRoles.length === 0) {
    console.log(`\n--- ${title} ---`);
    console.log('No roles to display for this sphere with the current filters.');
    return;
  }

  const maxRoleNameLength = Math.max(...sortedRoles.map(([name]) => name.length));
  const maxValue = Math.max(...Object.values(roleCounts), ...Object.values(averageCounts));
  const maxBarWidth = 40;

  console.log(`\n--- ${title} ---`);
  const header = `${ 'Role'.padEnd(maxRoleNameLength)} | Count | Avg   | Chart`;
  console.log(header);
  console.log('-'.repeat(maxRoleNameLength) + ' | ----- | ----- | ' + '-'.repeat(maxBarWidth));

  for (const [role, count] of sortedRoles) {
    const avg = averageCounts[role] || 0;
    const formattedAvg = avg > 1 ? String(Math.round(avg)) : avg.toFixed(1);

    const barWidth = Math.round((count / maxValue) * maxBarWidth);
    const avgMarkerPos = Math.round((avg / maxValue) * maxBarWidth);
    
    let bar = '█'.repeat(barWidth);
    if (bar.length >= avgMarkerPos) {
        bar = bar.substring(0, avgMarkerPos) + '│' + bar.substring(avgMarkerPos + 1);
    } else {
        bar = bar + ' '.repeat(avgMarkerPos - bar.length) + '│';
    }

    console.log(
      `${role.padEnd(maxRoleNameLength)} | ${String(count).padEnd(5)} | ${formattedAvg.padEnd(5)} | ${bar}`
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

  let allRoles = [...ABILITY_ROLES].sort();
  if (filterAttune) {
    allRoles = allRoles.filter(role => role !== 'attune');
  }

  const allMysticSpheres = [...mysticSpheres].sort((a, b) => a.name.localeCompare(b.name));
  const fullRoleBreakdown: Record<string, Record<string, number>> = {};

  for (const sphere of allMysticSpheres) {
    const sphereRoles: Record<string, number> = {};
    const spellsAndCantrips = [...(sphere.spells || []), ...(sphere.cantrips || [])];
    for (const spell of spellsAndCantrips) {
      if (spell.roles) {
        for (const role of spell.roles) {
          if (allRoles.includes(role)) {
            sphereRoles[role] = (sphereRoles[role] || 0) + 1;
          }
        }
      }
    }
    fullRoleBreakdown[sphere.name] = sphereRoles;
  }

  const roleTotals: Record<string, number> = {};
  const averageRoleCounts: Record<string, number> = {};
  const numSpheres = allMysticSpheres.length;
  for (const role of allRoles) {
    let total = 0;
    for (const sphere of allMysticSpheres) {
      total += fullRoleBreakdown[sphere.name][role] || 0;
    }
    roleTotals[role] = total;
    averageRoleCounts[role] = total / numSpheres;
  }
  fullRoleBreakdown['Average'] = averageRoleCounts;


  let spheresToShowNames: string[];
  if (selectedSphereNames.length > 0) {
    spheresToShowNames = selectedSphereNames;
  } else {
    spheresToShowNames = showChart ? allMysticSpheres.map(s => s.name) : [...allMysticSpheres.map(s => s.name), 'Average'];
  }


  if (showChart) {
    for (const sphereName of spheresToShowNames) {
      if (fullRoleBreakdown[sphereName]) {
        printBarChart(sphereName, fullRoleBreakdown[sphereName], averageRoleCounts);
      }
    }
  } else {
    const sphereNames = spheresToShowNames;
    const header = ['Role', ...sphereNames, 'Total'];
    const tableData: (string | number)[][] = [header];

    for (const role of allRoles) {
      const row: (string | number)[] = [role];
      for (const sphereName of sphereNames) {
        const count = fullRoleBreakdown[sphereName][role] || 0;
        row.push(count);
      }
      row.push(roleTotals[role] || 0);
      tableData.push(row);
    }

    const totalRow: (string | number)[] = ['**Total**'];
    for (const sphereName of sphereNames) {
      const sphereTotal = Object.values(fullRoleBreakdown[sphereName]).reduce((a, b) => a + b, 0);
      totalRow.push(sphereTotal);
    }
    totalRow.push(Object.values(roleTotals).reduce((a, b) => a + b, 0));
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
