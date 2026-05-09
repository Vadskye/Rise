import { ToolCategory } from '../types';
import { allTools } from '../data/all_tools';
import * as table from './latex_table';
import { itemLatex } from './item_latex';

export function permanentToolsTable(): string {
  const items = allTools({ consumable: false, rarity: 'Common' });
  const rows = items.flatMap((t) => table.fromItem(t.item, false, getToolCategoryName(t.category)));
  table.standardSort(rows);
  return table.longtable('Permanent Tools, Goods, and Mounts', rows, true);
}

export function permanentToolsDescriptions(): string {
  const items = allTools({ consumable: false, rarity: 'Common' });
  return items.map((t) => itemLatex(t.item, getToolCraftingLatex(t.category))).join('\n');
}

export function getToolCategoryName(category: ToolCategory): string {
  if (typeof category === 'string') {
    switch (category) {
      case 'Alchemical':
        return 'Alchemical';
      case 'Mount':
        return 'Mount';
      case 'Poison':
        return 'Poison\\poison';
      case 'Potion':
        return 'Potion\\potion';
    }
  } else {
    switch (category.kind) {
      case 'Kit':
        return 'Kit';
      case 'Permanent':
        return 'Object';
      case 'Trap':
        return 'Trap';
    }
  }
}

export function getToolCraftingLatex(category: ToolCategory): string {
  if (typeof category === 'string') {
    switch (category) {
      case 'Alchemical':
        return 'Craft (alchemy)';
      case 'Mount':
        return 'Mount';
      case 'Poison':
        return 'Poison\\poison {} -- Craft (poison)';
      case 'Potion':
        return 'Potion\\potion {} -- Craft (alchemy)';
    }
  } else {
    switch (category.kind) {
      case 'Kit':
        return `Kit -- Craft (${category.subskill})`;
      case 'Permanent':
        return `Craft (${category.subskill})`;
      case 'Trap':
        return `Trap -- Craft (${category.subskill})`;
    }
  }
}
