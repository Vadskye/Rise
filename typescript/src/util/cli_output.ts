import { MysticSphere, BaseSpellLike } from '../mystic_spheres';

type Counts = Record<string, number>;
type Breakdown = Record<string, Counts>;

export function printTable(tableData: (string | number)[][]): void {
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

export function printBarChart(
  title: string,
  counts: Counts,
  averageCounts: Counts,
  label: string
): void {
  const sortedEntries: [string, number][] = Object.entries(counts).sort(([a], [b]) => {
    const isNumeric = !isNaN(Number(a)) && !isNaN(Number(b));
    if (isNumeric) {
      return Number(a) - Number(b);
    }
    return a.localeCompare(b)
  });

  if (sortedEntries.length === 0) {
    console.log(`
--- ${title} ---`);
    console.log(`No ${label.toLowerCase()}s to display for this sphere.`);
    return;
  }

  const maxNameLength: number = Math.max(...sortedEntries.map(([name]) => name.length));
  const maxValue: number = Math.max(
    1, // Ensure a minimum value of 1 to avoid division by zero if all counts are 0
    ...Object.values(counts),
    ...Object.values(averageCounts)
  );
  const maxBarWidth = 40;

  console.log(`
--- ${title} ---`);
  const header = `${label.padEnd(maxNameLength)} | Count | Avg   | Chart`;
  console.log(header);
  console.log(
    '-'.repeat(maxNameLength) + ' | ----- | ----- | ' + '-'.repeat(maxBarWidth)
  );

  for (const [name, count] of sortedEntries) {
    const avg: number = averageCounts[name] || 0;
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
      `${name.padEnd(maxNameLength)} | ${String(count).padEnd(
        5
      )} | ${formattedAvg.padEnd(5)} | ${bar}`
    );
  }
}

export function calculateBreakdown<T, AbilityType extends BaseSpellLike>(
  spheres: MysticSphere[],
  keys: readonly T[],
  getAbilityKeys: (ability: AbilityType) => T[] | T | undefined,
  getAbilities: (sphere: MysticSphere) => AbilityType[]
): {
  fullBreakdown: Breakdown;
  totals: Counts;
  averageCounts: Counts;
} {
  const fullBreakdown: Breakdown = {};

  for (const sphere of spheres) {
    const sphereCounts: Counts = {};
    for (const key of keys) {
      sphereCounts[String(key)] = 0;
    }

    const abilities = getAbilities(sphere);

    for (const ability of abilities) {
      const abilityKeys = getAbilityKeys(ability);
      if (abilityKeys) {
        const keysArray = Array.isArray(abilityKeys) ? abilityKeys : [abilityKeys];
        for (const key of keysArray) {
          if (keys.includes(key as T)) {
            sphereCounts[String(key)] = (sphereCounts[String(key)] || 0) + 1;
          }
        }
      }
    }
    fullBreakdown[sphere.name] = sphereCounts;
  }

  const totals: Counts = {};
  const averageCounts: Counts = {};
  const spheresForAverage = spheres.filter(sphere => sphere.name !== 'Universal');
  const numSpheresForAverage: number = spheresForAverage.length;

  for (const key of keys) {
    let total = 0;
    for (const sphere of spheresForAverage) {
      total += fullBreakdown[sphere.name]?.[String(key)] || 0;
    }
    totals[String(key)] = total;
    averageCounts[String(key)] = total / numSpheresForAverage;
  }

  return { fullBreakdown, totals, averageCounts };
}
