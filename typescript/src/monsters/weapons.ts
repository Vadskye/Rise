import { StandardWeapon, STANDARD_WEAPONS } from '@src/equipment/weapons';
import { WeaponTag } from '@src/equipment/types';
import { RiseWeaponTag } from '@src/character_sheet/rise_data';

export type MonsterWeapon = string;

export interface SimpleDicePool {
  count: number;
  size: number;
}

const DICE_INCREMENT_ORDER = [
  '1d2',
  '1d3',
  '1d4',
  '1d6',
  '1d8',
  '1d10',
  '2d6',
  '2d8',
  '2d10',
  '4d6',
  '4d8',
  '4d10',
];

export function addDiceIncrement(dicePool: SimpleDicePool, increments: number): SimpleDicePool {
  const currentIncrementIndex = DICE_INCREMENT_ORDER.indexOf(`${dicePool.count}d${dicePool.size}`);
  if (currentIncrementIndex === undefined) {
    throw new Error(`Can't add increments to ${dicePool}: Match not found.`);
  }
  const revisedIndex = currentIncrementIndex + increments;
  if (revisedIndex < 0) {
    throw new Error(`Can't add increments to ${dicePool}: Result is too small.`);
  } else if (revisedIndex > DICE_INCREMENT_ORDER.length) {
    throw new Error(`Can't add increments to ${dicePool}: Result is too large.`);
  } else {
    // Parsing the dice pool out of the string is a little dumb, but it's easy for me to
    // reason about.
    const [, count, size] = DICE_INCREMENT_ORDER[revisedIndex].match(/(\d)d(\d+)/) || [];
    return {
      count: Number(count),
      size: Number(count),
    };
  }

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

  throw new Error(
    `MonsterWeapon '${weaponName}' could not be resolved to standard or natural weapon.`,
  );
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
