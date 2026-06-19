import type { RiseTag } from '@src/character_sheet/rise_data';

export type ItemRarity = 'Common' | 'Relic';
export type AttunementRequirement = 'Attune' | 'Attune (deep)' | 'Unrestricted';

export interface ItemUpgrade {
  description: string;
  rank: number;
  /** Summary description used in tables. */
  short_description: string;
}

export interface StandardItem {
  /** Main descriptive text for the item's LaTeX block. */
  description: string;
  /** Summary used in equipment tables. */
  short_description: string;
  /** Affects the LaTeX environment used for the item block. */
  magical: boolean;
  name: string;
  /** Used for pricing and scaling calculations. */
  rank: number;
  rarity: ItemRarity;
  /** Variants of this item at higher ranks. */
  upgrades: ItemUpgrade[];
  tags: RiseTag[];
  attunement: AttunementRequirement;
}

export type RawConsumable = Omit<StandardItem, 'magical' | 'rarity' | 'tags' | 'upgrades' | 'attunement'> &
  Partial<Pick<StandardItem, 'tags' | 'upgrades'>> & { attunement: AttunementRequirement };

/**
 * Expands an item into its upgrade variants, adding the '+' suffix to their names.
 */
export function getUpgradeItems(item: StandardItem): StandardItem[] {
  return item.upgrades.map((upgrade, i) => {
    const upgradeTier = i + 1;
    return {
      description: upgrade.description,
      short_description: upgrade.short_description,
      magical: item.magical,
      name: `${item.name}${'+'.repeat(upgradeTier)}`,
      rank: upgrade.rank,
      rarity: item.rarity,
      upgrades: [],
      tags: item.tags,
      attunement: item.attunement,
    };
  });
}

import { ArmorUsageClass, ArmorMaterial } from './armor';
export { ArmorUsageClass, ArmorMaterial };

export type MagicArmor =
  | { kind: 'Body'; item: StandardItem }
  | { kind: 'Shield'; item: StandardItem };

export type MagicWeapon =
  | { kind: 'Melee'; item: StandardItem }
  | { kind: 'Ranged'; item: StandardItem }
  | { kind: 'Unrestricted'; item: StandardItem };

export type Implement =
  | { kind: 'Rod'; item: StandardItem }
  | { kind: 'Staff'; item: StandardItem }
  | { kind: 'Wand'; item: StandardItem };

import { DicePool } from '../core_mechanics/dice_pool';

export interface Weapon {
  name: string;
  accuracy: number;
  damage_dice: DicePool;
  tags: WeaponTag[];
  isNatural?: boolean;
}


export type WeaponTag =
  | 'Ammunition'
  | 'Bow'
  | 'Clinch'
  | 'Compact'
  | 'Heavy'
  | 'Impact'
  | 'Keen'
  | 'Light'
  | 'Long'
  | 'Maneuverable'
  | 'Mounted'
  | 'Parrying'
  | { kind: 'Projectile'; close: number; long: number }
  | 'Resonating'
  | { kind: 'Sweeping'; count: number }
  | 'Subdual'
  | { kind: 'Thrown'; close: number; long: number }
  | 'Versatile Grip'
  | 'Versatile Stance';

/** Method of delivery for a poison. */
export type Exposure = 'contact' | 'ingestion' | 'injury';
/** Physical state/packaging of a poison. */
export type PoisonForm = 'gas' | 'liquid' | 'pellet' | 'powder';

export type ApparelKind =
  | 'Amulet'
  | 'Belt'
  | 'Blindfold'
  | 'Boots'
  | 'Bracers'
  | 'Circlet'
  | 'Cloak'
  | 'Crown'
  | 'Gauntlets'
  | 'Gloves'
  | 'Ring'
  | 'Tattoo'
  | 'Veil';

export type Apparel = { kind: ApparelKind; item: StandardItem };

export type ToolCategory =
  | 'Alchemical'
  | { kind: 'Kit'; subskill: string }
  | 'Mount'
  | { kind: 'Permanent'; subskill: string }
  | 'Poison'
  | 'Potion'
  | { kind: 'Trap'; subskill: string };

export interface Tool {
  category: ToolCategory;
  item: StandardItem;
}
