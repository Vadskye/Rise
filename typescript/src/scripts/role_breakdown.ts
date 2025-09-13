import { mysticSpheres, AbilityRole, ABILITY_ROLES } from '../mystic_spheres';
import * as process from 'process';

function analyzeMysticSpheres() {
  const args = process.argv.slice(2);
  const filterAttune = args.includes('--no-attune');

  const roleBreakdown: Record<string, Record<AbilityRole, number>> = {};
  let allRoles = [...ABILITY_ROLES].sort();

  if (filterAttune) {
    allRoles = allRoles.filter(role => role !== 'attune');
  }

  const spheres = [...mysticSpheres].sort((a, b) => a.name.localeCompare(b.name));

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

  // Generate Markdown table data
  const sphereNames = spheres.map(s => s.name);
  const header = ['Role', ...sphereNames, 'Total'];
  const tableData: (string | number)[][] = [header];

  for (const role of allRoles) {
    const row: (string | number)[] = [role];
    let roleTotal = 0;
    for (const sphere of spheres) {
      const count = roleBreakdown[sphere.name][role] || 0;
      row.push(count);
      roleTotal += count;
    }
    row.push(roleTotal);
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

  // Calculate column widths
  const columnWidths: number[] = header.map((h, i) => {
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

function main() {
  analyzeMysticSpheres();
}

if (require.main === module) {
  main();
}
