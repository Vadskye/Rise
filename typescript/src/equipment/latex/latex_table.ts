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
  tags?: string[];
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
    tags: item.tags,
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
      tags: upgradedItem.tags,
    });
  }

  return rows;
}

export function rowToLatex(
  row: TableRow,
  percentile?: string,
  withAttunement: boolean = false,
): string {
  const sparkle = row.magical ? '\\sparkle' : '';
  const categorySeparator = row.category ? '&' : '';
  const category = row.category || '';

  const attunementSeparator = withAttunement ? '&' : '';
  let attunementText = '';
  if (withAttunement) {
    const tags = row.tags || [];
    if (tags.some((t) => t.toLowerCase() === 'attune (deep)')) {
      attunementText = 'Deep';
    } else if (tags.some((t) => t.toLowerCase() === 'attune')) {
      attunementText = 'Yes';
    } else {
      attunementText = 'No';
    }
  }

  const rankAndPrice = getRankAndPriceText(row.rank, row.rarity);
  const pageOrPercentile = percentile || `\\itempref{${row.name}}`;

  const latex = `
    \\itemref{${row.name}}${sparkle} ${categorySeparator} ${category} ${attunementSeparator} ${attunementText}
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
  withAttunement: boolean = false,
): string {
  const categorySeparator = withCategory ? '&' : '';
  const categoryColumnName = withCategory ? ' \\tb{Type}' : '';
  const attunementSeparator = withAttunement ? '&' : '';
  const attunementColumnName = withAttunement ? ' \\tb{Attunement}' : '';
  const pageOrPercentile = withPercentile ? '\\tb{d100}' : '\\tb{Page}';

  return `
    \\tb{${nameText}}${categorySeparator}${categoryColumnName}${attunementSeparator}${attunementColumnName} & \\tb{Description} & \\tb{Rank (Cost)} & ${pageOrPercentile} \\tableheaderrule
  `.trim();
}

export function standardSort(rows: TableRow[]): void {
  rows.sort((a, b) => {
    // Primary: Rank
    if (a.rank !== b.rank) return a.rank - b.rank;
    // Secondary: Consumability (consumables first)
    if (a.consumable !== b.consumable) return a.consumable ? -1 : 1;
    // Tertiary: Category
    if (a.category !== b.category) {
      const catA = a.category || '';
      const catB = b.category || '';
      return catA < catB ? -1 : 1;
    }
    // Final: Name
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });
}

export interface LongtableOptions {
  caption: string;
  rows: TableRow[];
  withCategory: boolean;
  withAttunement?: boolean;
}

export function longtable(options: LongtableOptions): string {
  const { caption, rows, withCategory, withAttunement = false } = options;
  let colSpec = '';
  if (withCategory && withAttunement) {
    colSpec = 'p{17em} p{5em} p{5em} p{15em} p{6em} p{3em}';
  } else if (withCategory) {
    colSpec = 'p{17em} p{5em} p{20em} p{6em} p{3em}';
  } else if (withAttunement) {
    colSpec = 'p{17em} p{5em} p{21em} p{6em} p{3em}';
  } else {
    colSpec = 'p{17em} p{26em} p{6em} p{3em}';
  }

  const content = `
\\begin{longtablewrapper}
\\begin{longtable}{${colSpec}}
    ${tableCaption(caption)}
    ${tableHeader('Name', withCategory, false, withAttunement)}
    ${rows.map((r) => rowToLatex(r, undefined, withAttunement)).join('\n')}
\\end{longtable}
\\end{longtablewrapper}
  `.trim();

  return latexify(content);
}

export function longtablePercentile({
  caption,
  rows,
  withCategory,
  withAttunement = false,
}: LongtableOptions): string {
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

  let colSpec = '';
  if (withCategory && withAttunement) {
    colSpec = 'p{17em} p{5em} p{5em} p{15em} p{6em} p{3em}';
  } else if (withCategory) {
    colSpec = 'p{17em} p{5em} p{20em} p{6em} p{3em}';
  } else if (withAttunement) {
    colSpec = 'p{17em} p{5em} p{21em} p{6em} p{3em}';
  } else {
    colSpec = 'p{17em} p{26em} p{6em} p{3em}';
  }

  const content = `
\\begin{longtablewrapper}
\\begin{longtable}{${colSpec}}
    ${tableCaption(caption)}
    ${tableHeader('Name', withCategory, true, withAttunement)}
    ${percentileRows.map((pr) => rowToLatex(pr.row, pr.range, withAttunement)).join('\n')}
\\end{longtable}
\\end{longtablewrapper}
  `.trim();

  return latexify(content);
}
