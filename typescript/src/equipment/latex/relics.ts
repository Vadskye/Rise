import { allMagicArmor } from '../data/magic_armor';
import { allMagicWeapons } from '../data/magic_weapons';
import { allImplements } from '../data/implements';
import { allApparel, apparelLatex } from '../apparel';
import { allTools } from '../data/all_tools';
import { itemLatex } from './item_latex';
import * as table from './latex_table';
import { ToolCategory } from '../types';
import { getToolCategoryName, getToolCraftingLatex } from './tools';

export function generateRelicDescriptions(): string {
  const armor = allMagicArmor()
    .filter((m) => m.item.rarity === 'Relic')
    .map((m) => {
      const materials = m.kind === 'Body' ? 'bone, leather, or metal' : 'bone, metal, or wood';
      const category = m.kind === 'Body' ? 'Body armor' : 'Shield';
      return itemLatex(m.item, `${category} -- Craft (${materials})`);
    });

  const weapons = allMagicWeapons()
    .filter((m) => m.item.rarity === 'Relic')
    .map((m) => itemLatex(m.item, 'Craft (as base weapon)'));

  const apparel = allApparel('Relic').map((a) => apparelLatex(a));

  const implementsData = allImplements()
    .filter((m) => m.item.rarity === 'Relic')
    .map((m) => {
      let craftingLatex = '';
      if (m.kind === 'Staff') craftingLatex = 'bone or wood';
      else if (m.kind === 'Rod') craftingLatex = 'bone, metal, or wood';
      else if (m.kind === 'Wand') craftingLatex = 'bone or wood';
      return itemLatex(m.item, `${m.kind} -- ${craftingLatex}`);
    });

  const tools = allTools({ rarity: 'Relic' }).map((t) =>
    itemLatex(t.item, getToolCraftingLatex(t.category)),
  );

  const all = [...apparel, ...implementsData, ...armor, ...weapons, ...tools];
  return all.join('\n');
}

export function generateRelicsTable(): string {
  const rows: table.TableRow[] = [];

  rows.push(
    ...allApparel('Relic').flatMap((a) => table.fromItem(a.item, false, a.kind)),
  );
  rows.push(
    ...allMagicArmor()
      .filter((m) => m.item.rarity === 'Relic')
      .flatMap((m) => table.fromItem(m.item, false, m.kind === 'Body' ? 'Body armor' : 'Shield')),
  );
  rows.push(
    ...allMagicWeapons()
      .filter((m) => m.item.rarity === 'Relic')
      .flatMap((m) => table.fromItem(m.item, false, 'Weapon')),
  );
  rows.push(
    ...allImplements()
      .filter((m) => m.item.rarity === 'Relic')
      .flatMap((m) => table.fromItem(m.item, false, m.kind)),
  );
  rows.push(
    ...allTools({ rarity: 'Relic' }).flatMap((t) =>
      table.fromItem(t.item, isConsumable(t), getToolCategoryName(t.category)),
    ),
  );

  table.standardSort(rows);
  return table.longtable('Relics', rows, true);
}

function isConsumable(tool: any): boolean {
  if (typeof tool.category === 'string') {
    return (
      tool.category === 'Alchemical' || tool.category === 'Poison' || tool.category === 'Potion'
    );
  }
  return false;
}
