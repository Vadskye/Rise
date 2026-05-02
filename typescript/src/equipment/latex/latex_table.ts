import { ItemRarity, StandardItem, getUpgradeItems } from '../types';
import { getRankAndPriceText } from '../item_price';
import { getItemCreature } from '../item_creature';
import { replacePlaceholders } from '../../latex/monsters/replace_placeholders';
import { latexify } from '../../latex/format';

export interface TableRow {
  category?: string;
  consumable: boolean;
  name: string;
  magical: boolean;
  rank: number;
  rarity: ItemRarity;
  short_description: string;
}

export function fromItem(item: StandardItem, consumable: boolean, category?: string): TableRow[] {
  const rows: TableRow[] = [];
  rows.push({
    category,
    consumable,
    magical: item.magical,
    name: item.name,
    rank: item.rank,
    rarity: item.rarity,
    short_description: item.short_description,
  });

  for (const upgradedItem of getUpgradeItems(item)) {
    rows.push({
      category,
      consumable,
      magical: item.magical,
      name: upgradedItem.name,
      rank: upgradedItem.rank,
      rarity: upgradedItem.rarity,
      short_description: upgradedItem.short_description,
    });
  }

  return rows;
}

export function rowToLatex(row: TableRow, percentile?: string): string {
  const sparkle = row.magical ? '\\sparkle' : '';
  const categorySeparator = row.category ? '&' : '';
  const category = row.category || '';
  const rankAndPrice = getRankAndPriceText(row.rank, row.rarity);
  const pageOrPercentile = percentile || `\\itempref{${row.name}}`;

  const latex = `
    \\itemref{${row.name}}${sparkle} ${categorySeparator} ${category}
    & ${row.short_description.trim()}
    & ${rankAndPrice}
    & ${pageOrPercentile}
    \\\\
  `.trim();

  const creature = getItemCreature(row.rank);
  return replacePlaceholders(creature, latex, { isMagical: row.magical });
}

function tableCaption(caption: string): string {
  return `\\lcaption{${caption}} \\\\`;
}

export function tableHeader(
  nameText: string,
  withCategory: boolean,
  withPercentile: boolean,
): string {
  const categorySeparator = withCategory ? '&' : '';
  const categoryColumnName = withCategory ? ' \\tb{Type}' : '';
  const pageOrPercentile = withPercentile ? '\\tb{d100}' : '\\tb{Page}';

  return `
    \\tb{${nameText}}${categorySeparator}${categoryColumnName} & \\tb{Description} & \\tb{Rank (Cost)} & ${pageOrPercentile} \\tableheaderrule
  `.trim();
}

export function standardSort(rows: TableRow[]): void {
  rows.sort((a, b) => {
    // Primary: Rank
    if (a.rank !== b.rank) return a.rank - b.rank;
    // Secondary: Consumability (consumables first)
    if (a.consumable !== b.consumable) return a.consumable ? -1 : 1;
    // Tertiary: Category
    if (a.category !== b.category) return (a.category || '').localeCompare(b.category || '');
    // Final: Name
    return a.name.localeCompare(b.name);
  });
}

export function longtable(caption: string, rows: TableRow[], withCategory: boolean): string {
  const categoryAndEffects = withCategory ? 'p{5em} p{20em}' : 'p{26em}';

  const content = `
\\begin{longtablewrapper}
\\begin{longtable}{p{17em} ${categoryAndEffects} p{6em} p{3em}}
    ${tableCaption(caption)}
    ${tableHeader('Name', withCategory, false)}
    ${rows.map((r) => rowToLatex(r)).join('\n')}
\\end{longtable}
\\end{longtablewrapper}
  `.trim();

  return latexify(content);
}

export function longtablePercentile(
  caption: string,
  rows: TableRow[],
  withCategory: boolean,
): string {
  const percentileRows: { range: string; row: TableRow }[] = [];

  for (let rank = -1; rank <= 8; rank++) {
    const rowsAtRank = rows.filter((r) => r.rank === rank);
    const distinctItemCount = rowsAtRank.length;
    if (distinctItemCount === 0) continue;

    const stepSize = 99.0 / distinctItemCount;
    let minRoll = 0;
    let trueMaxRoll = stepSize;

    for (const row of rowsAtRank) {
      const maxRollInt = Math.round(trueMaxRoll);
      percentileRows.push({
        range: maxRollInt === minRoll ? `${minRoll}` : `${minRoll}--${maxRollInt}`,
        row: row,
      });
      minRoll = 1 + maxRollInt;
      trueMaxRoll += stepSize;
    }
  }

  const categoryAndEffects = withCategory ? 'p{5em} p{20em}' : 'p{26em}';

  const content = `
\\begin{longtablewrapper}
\\begin{longtable}{p{17em} ${categoryAndEffects} p{6em} p{3em}}
    ${tableCaption(caption)}
    ${tableHeader('Name', withCategory, true)}
    ${percentileRows.map((pr) => rowToLatex(pr.row, pr.range)).join('\n')}
\\end{longtable}
\\end{longtablewrapper}
  `.trim();

  return latexify(content);
}
