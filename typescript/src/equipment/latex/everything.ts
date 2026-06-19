import { allMagicArmor } from '../data/magic_armor';
import { allMagicWeapons } from '../data/magic_weapons';
import { allImplements } from '../data/implements';
import { allApparel } from '../apparel';
import { allTools } from '../data/all_tools';
import * as table from './latex_table';
import { getToolCategoryName } from './tools';

export function generateEverythingTable(): string {
  const rows: table.TableRow[] = [];

  rows.push(
    ...allMagicArmor().flatMap((m) =>
      table.fromItem(m.item, false, m.kind === 'Body' ? 'Body armor' : 'Shield'),
    ),
  );
  rows.push(...allMagicWeapons().flatMap((m) => table.fromItem(m.item, false, 'Weapon')));
  rows.push(...allImplements().flatMap((m) => table.fromItem(m.item, false, m.kind)));
  rows.push(...allApparel(undefined).flatMap((a) => table.fromItem(a.item, false, a.kind)));
  rows.push(
    ...allTools().flatMap((t) =>
      table.fromItem(t.item, isConsumable(t), getToolCategoryName(t.category)),
    ),
  );

  table.standardSort(rows);
  return table.longtablePercentile({
    caption: 'All Items',
    rows,
    withCategory: true,
  });
}

function isConsumable(tool: any): boolean {
  if (typeof tool.category === 'string') {
    return (
      tool.category === 'Alchemical' || tool.category === 'Poison' || tool.category === 'Potion'
    );
  }
  return false;
}
