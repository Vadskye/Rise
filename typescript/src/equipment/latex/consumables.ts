import { Tool, ToolCategory } from '../types';
import { consumables as allConsumables } from '../data/consumables';
import * as table from './latex_table';
import { itemLatex } from './item_latex';

export function consumableToolsTable(): string {
  const items = allConsumables().filter((t) => t.item.rarity === 'Common');
  const rows = items.flatMap((t) => table.fromItem(t.item, true, getToolCategoryName(t.category)));
  table.standardSort(rows);
  return table.longtable('Consumables', rows, true);
}

export function consumableToolsDescriptions(): string {
  const items = allConsumables().filter((t) => t.item.rarity === 'Common');
  items.sort((a, b) => a.item.name.localeCompare(b.item.name));
  return items.map((t) => itemLatex(t.item, getToolCraftingLatex(t.category))).join('\n');
}

function getToolCategoryName(category: ToolCategory): string {
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
    return category.kind;
  }
}

function getToolCraftingLatex(category: ToolCategory): string {
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
