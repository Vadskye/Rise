import { Apparel, ApparelKind, ItemRarity } from './types';
import { itemLatex } from './latex/item_latex';
import { TableRow, fromItem, longtable, standardSort } from './latex/latex_table';
import { allApparel as getAllApparelData } from './data/apparel';

export function getApparelCraftMaterials(kind: ApparelKind): string {
  switch (kind) {
    case 'Amulet':
      return 'bone, metal, or wood';
    case 'Belt':
      return 'leather or textiles';
    case 'Blindfold':
      return 'textiles';
    case 'Boots':
      return 'bone, leather, or metal';
    case 'Bracers':
      return 'bone, metal, or wood';
    case 'Circlet':
      return 'bone or metal';
    case 'Cloak':
      return 'leather or textiles';
    case 'Crown':
      return 'bone or metal';
    case 'Gauntlets':
      return 'bone, metal, or wood';
    case 'Gloves':
      return 'leather or textiles';
    case 'Ring':
      return 'bone, metal, or wood';
    case 'Tattoo':
      return 'manuscripts or textiles';
    case 'Veil':
      return 'textiles';
  }
}

export function apparelLatex(apparel: Apparel): string {
  // Relics are allowed to not require attunement
  if (
    apparel.item.rarity === 'Common' &&
    !apparel.item.tags?.some((tag) => tag.toLowerCase().includes('attune'))
  ) {
    console.error(`Apparel ${apparel.item.name} must require attunement`);
  }

  const subline = `${apparel.kind} -- Craft (${getApparelCraftMaterials(apparel.kind)})`;
  return itemLatex(apparel.item, subline);
}

export function allApparel(rarityFilter?: ItemRarity): Apparel[] {
  let apparel = getAllApparelData();

  if (rarityFilter) {
    apparel = apparel.filter((a) => a.item.rarity === rarityFilter);
  }

  return apparel.sort((a, b) =>
    a.item.name < b.item.name ? -1 : a.item.name > b.item.name ? 1 : 0,
  );
}

export function apparelTable(): string {
  const commonApparel = allApparel('Common');
  const rows: TableRow[] = commonApparel.flatMap((a) => fromItem(a.item, false, a.kind));

  standardSort(rows);

  return longtable({
    caption: 'Magic Apparel',
    rows,
    withCategory: true,
    withAttunement: true,
  });
}
