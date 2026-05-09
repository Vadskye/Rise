import { allMagicArmor } from '../data/magic_armor';
import { allMagicWeapons } from '../data/magic_weapons';
import { allImplements } from '../data/implements';
import { allApparel, apparelLatex, apparelTable } from '../apparel';
import { itemLatex } from './item_latex';
import { fromItem, standardSort, longtable } from './latex_table';
import { consumableToolsDescriptions, consumableToolsTable } from './consumables';
import { permanentToolsDescriptions, permanentToolsTable } from './tools';
import { generateRelicDescriptions, generateRelicsTable } from './relics';
import { generateEverythingTable } from './everything';

/**
 * Items are sorted alphabetically by name.
 */
export function generateMagicArmorDescriptions(): string {
  const items = allMagicArmor().sort((a, b) => a.item.name.localeCompare(b.item.name));
  return items
    .map((m) => {
      const materials = m.kind === 'Body' ? 'bone, leather, or metal' : 'bone, metal, or wood';
      const category = m.kind === 'Body' ? 'Body armor' : 'Shield';
      return itemLatex(m.item, `${category} -- Craft (${materials})`);
    })
    .join('\n');
}

/**
 * Produces separate longtables for "Magic Body Armor" and "Magic Shields".
 */
export function generateMagicArmorTables(): string {
  const allArmor = allMagicArmor();

  const bodyRows = allArmor
    .filter((m) => m.kind === 'Body')
    .flatMap((m) => fromItem(m.item, false, 'Body armor'));
  standardSort(bodyRows);

  const shieldRows = allArmor
    .filter((m) => m.kind === 'Shield')
    .flatMap((m) => fromItem(m.item, false, 'Shield'));
  standardSort(shieldRows);

  return (
    longtable('Magic Body Armor', bodyRows, true) +
    '\n\n' +
    longtable('Magic Shields', shieldRows, true)
  );
}

/**
 * Items are sorted alphabetically by name.
 */
export function generateMagicWeaponsDescriptions(): string {
  const items = allMagicWeapons().sort((a, b) => a.item.name.localeCompare(b.item.name));
  return items.map((m) => itemLatex(m.item, 'Craft (as base weapon)')).join('\n');
}

export function generateMagicWeaponsTables(): string {
  const rows = allMagicWeapons().flatMap((m) => fromItem(m.item, false, undefined));
  standardSort(rows);
  return longtable('Magic Weapons', rows, false);
}

/**
 * Handles rods, staffs, and wands, sorted alphabetically by name.
 */
export function generateImplementsDescriptions(): string {
  const items = allImplements().sort((a, b) => a.item.name.localeCompare(b.item.name));
  return items
    .map((m) => {
      let craftingLatex = '';
      if (m.kind === 'Staff') craftingLatex = 'bone or wood';
      else if (m.kind === 'Rod') craftingLatex = 'bone, metal, or wood';
      else if (m.kind === 'Wand') craftingLatex = 'bone or wood';
      return itemLatex(m.item, `${m.kind} -- ${craftingLatex}`);
    })
    .join('\n');
}

export function generateImplementsTables(): string {
  const rows = allImplements().flatMap((m) => fromItem(m.item, false, m.kind));
  standardSort(rows);
  return longtable('Implements', rows, true);
}

export function generateApparelDescriptions(): string {
  const items = allApparel('Common');
  return items.map((a) => apparelLatex(a)).join('\n');
}

export function generateApparelTables(): string {
  return apparelTable();
}

export {
  consumableToolsDescriptions as generateConsumableToolsDescriptions,
  consumableToolsTable as generateConsumableToolsTables,
  permanentToolsDescriptions as generatePermanentToolsDescriptions,
  permanentToolsTable as generatePermanentToolsTables,
  generateRelicDescriptions,
  generateRelicsTable,
  generateEverythingTable,
};
