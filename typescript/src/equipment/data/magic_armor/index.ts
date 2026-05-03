import { ItemRarity, MagicArmor } from '../../types';
import { bodyArmor } from './body_armor';
import { shields } from './shields';
import { itemLatex } from '../../latex/item_latex';
import * as latexTable from '../../latex/latex_table';

export function allMagicArmor(rarityFilter?: ItemRarity): MagicArmor[] {
  let armor = [...bodyArmor(), ...shields()];

  if (rarityFilter) {
    armor = armor.filter((a) => a.item.rarity === rarityFilter);
  }

  return armor.sort((a, b) => a.item.name.localeCompare(b.item.name));
}

export function magicArmorLatex(rarityFilter?: ItemRarity): string {
  const armor = allMagicArmor(rarityFilter);
  return armor
    .map((a) => {
      const craftMaterials = a.kind === 'Body' ? 'bone, leather, or metal' : 'bone, metal, or wood';
      const category = a.kind === 'Body' ? 'Body armor' : 'Shield';
      return itemLatex(a.item, `${category} -- Craft (${craftMaterials})`);
    })
    .join('\n\n');
}

export function magicArmorTable(): string {
  const allArmor = allMagicArmor('Common');

  const bodyRows = allArmor
    .filter((a) => a.kind === 'Body')
    .flatMap((a) => latexTable.fromItem(a.item, false, 'Body armor'));
  latexTable.standardSort(bodyRows);

  const shieldRows = allArmor
    .filter((a) => a.kind === 'Shield')
    .flatMap((a) => latexTable.fromItem(a.item, false, 'Shield'));
  latexTable.standardSort(shieldRows);

  return `
    ${latexTable.longtable('Magic Body Armor', bodyRows, true)}
    ${latexTable.longtable('Magic Shields', shieldRows, true)}
  `.trim();
}
