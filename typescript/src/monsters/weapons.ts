import {
  StandardWeapon,
  STANDARD_WEAPONS,
} from '@src/equipment/weapons';
import { WeaponTag } from '@src/equipment/types';
import { RiseWeaponTag } from '@src/character_sheet/rise_data';

export type MonsterWeapon = string;

export interface SimpleDicePool {
  count: number;
  size: number;
}

// Build case-insensitive standard weapons mapping
const LOWERCASE_STANDARD_WEAPONS: Record<string, StandardWeapon> = {};
for (const key of Object.keys(STANDARD_WEAPONS)) {
  const enumValue = key as StandardWeapon;
  const weaponData = STANDARD_WEAPONS[enumValue];
  LOWERCASE_STANDARD_WEAPONS[weaponData.name.toLowerCase()] = enumValue;
  LOWERCASE_STANDARD_WEAPONS[enumValue.toLowerCase()] = enumValue;
}

// Custom aliases/mappings for monster names
LOWERCASE_STANDARD_WEAPONS['spike'] = StandardWeapon.Stinger; // Same as stinger

export const MONSTER_WEAPONS = new Set<string>([
  ...Object.keys(LOWERCASE_STANDARD_WEAPONS),
  'claws',
  'smallswords',
  'talons',
  'darts',
  'fists',
]);

function resolveBaseWeapon(weaponName: MonsterWeapon) {
  const isPlural =
    weaponName.endsWith('s') &&
    ['claws', 'smallswords', 'talons', 'darts', 'fists'].includes(weaponName);
  const singularName = isPlural ? weaponName.slice(0, -1) : weaponName;

  const stdEnum = LOWERCASE_STANDARD_WEAPONS[singularName];
  if (stdEnum) {
    const stdWeapon = STANDARD_WEAPONS[stdEnum];
    const count = stdWeapon.damage_dice.dice.length;
    const size = count > 0 ? stdWeapon.damage_dice.dice[0].size : 0;
    const isNatural = Boolean(stdWeapon.isNatural);
    return {
      accuracy: stdWeapon.accuracy,
      damage_dice: { count, size },
      tags: stdWeapon.tags,
      isNatural,
      isPlural,
    };
  }

  throw new Error(`MonsterWeapon '${weaponName}' could not be resolved to standard or natural weapon.`);
}

function formatMonsterTag(tag: WeaponTag): RiseWeaponTag | null {
  if (typeof tag === 'string') {
    if (
      tag === 'Versatile Grip' ||
      tag === 'Maneuverable' ||
      tag === 'Heavy' ||
      tag === 'Light' ||
      tag === 'Compact' ||
      tag === 'Ammunition' ||
      tag === 'Bow' ||
      tag === 'Long'
    ) {
      return null;
    }
    return tag;
  } else {
    switch (tag.kind) {
      case 'Projectile':
        return `Projectile (${tag.close}/${tag.long})` as RiseWeaponTag;
      case 'Sweeping':
        return `Sweeping (${tag.count})` as RiseWeaponTag;
      case 'Thrown':
        return `Thrown (${tag.close}/${tag.long})` as RiseWeaponTag;
    }
  }
}

export function isManufactured(weaponName: MonsterWeapon): boolean {
  const base = resolveBaseWeapon(weaponName);
  return !base.isNatural;
}

export function getWeaponDamageDice(weaponName: MonsterWeapon): SimpleDicePool {
  const base = resolveBaseWeapon(weaponName);
  if (base.isPlural) {
    return {
      count: base.damage_dice.count * 2,
      size: base.damage_dice.size,
    };
  }
  return base.damage_dice;
}

export function getWeaponAccuracy(weaponName: MonsterWeapon): number {
  const base = resolveBaseWeapon(weaponName);
  if (base.isPlural) {
    return base.accuracy * 2;
  }
  return base.accuracy;
}

export function getWeaponPowerMultiplier(weaponName: MonsterWeapon): 0.5 | 1 {
  const base = resolveBaseWeapon(weaponName);
  if (base.isPlural) {
    return 0.5;
  }
  if (base.isNatural) {
    return 1.0;
  }
  if (weaponName === 'heavy crossbow') {
    return 0.5;
  }
  if (weaponName === 'giant boulder' || weaponName === 'pick') {
    return 1.0;
  }
  const hasHeavy = base.tags.includes('Heavy');
  return hasHeavy ? 1.0 : 0.5;
}

export function getWeaponTags(weaponName: MonsterWeapon): readonly RiseWeaponTag[] {
  const base = resolveBaseWeapon(weaponName);

  const tags: RiseWeaponTag[] = [];
  for (const tag of base.tags) {
    const formatted = formatMonsterTag(tag);
    if (formatted !== null) {
      tags.push(formatted);
    }
  }

  if (weaponName === 'giant boulder') {
    return ['Thrown (90/180)'];
  }
  if (weaponName === 'spear') {
    return ['Thrown (30/60)'];
  }

  return tags;
}
