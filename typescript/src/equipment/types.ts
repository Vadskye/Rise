import { Attribute, Defense, Tag } from '../types/core';
import { ActiveAbility } from '../abilities';

export type ItemRarity = 'Common' | 'Relic';

export interface ItemUpgrade {
  description: string;
  rank: number;
  short_description: string;
}

export interface StandardItem {
  description: string;
  short_description: string;
  magical: boolean;
  name: string;
  rank: number;
  rarity: ItemRarity;
  upgrades: ItemUpgrade[];
  tags: ActiveAbility['tags'];
}

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
    };
  });
}

import { ArmorUsageClass, ArmorMaterial } from './armor';
export { ArmorUsageClass, ArmorMaterial };

export type MagicArmor = 
  | { kind: 'Body', item: StandardItem }
  | { kind: 'Shield', item: StandardItem };

export type MagicWeapon =
  | { kind: 'Melee', item: StandardItem }
  | { kind: 'Ranged', item: StandardItem }
  | { kind: 'Unrestricted', item: StandardItem };

export type Implement =
  | { kind: 'Rod', item: StandardItem }
  | { kind: 'Staff', item: StandardItem }
  | { kind: 'Wand', item: StandardItem };

import { DicePool } from '../types/dice_pool';

export interface Weapon {
  name: string;
  accuracy: number;
  damage_dice: DicePool;
  tags: WeaponTag[];
}

export type WeaponTag =
  | 'Ammunition'
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
  | { kind: 'Projectile', close: number, long: number }
  | 'Resonating'
  | { kind: 'Sweeping', count: number }
  | 'Subdual'
  | { kind: 'Thrown', close: number, long: number }
  | 'Versatile Grip';

export type Exposure = 'contact' | 'ingestion' | 'injury';
export type PoisonForm = 'gas' | 'liquid' | 'pellet' | 'powder';
