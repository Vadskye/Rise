// For now, we only allow natural weapons. If we implement support for all manufactured
// weapons, we'll need to be more organized.
// If the name is plural, it indicates that the monster is using two of the weapon to
// make a dual strike.
const MONSTER_WEAPONS_LIST = [
  'battleaxe',
  'bite',
  'claws',
  'club',
  'flail',
  'heavy flail',
  'greataxe',
  'heavy crossbow',
  'horn',
  'javelin',
  'lance',
  'longbow',
  'ram',
  'scythe',
  'sickle',
  'smallswords',
  'spear',
  'stinger',
  'talons',
  'tentacle',
] as const;
export type MonsterWeapon = (typeof MONSTER_WEAPONS_LIST)[number];
export const MONSTER_WEAPONS = new Set(MONSTER_WEAPONS_LIST);

// TODO: weapons can have multiple tags...
export function getWeaponTag(weaponName: MonsterWeapon): string | null {
  return {
    bite: null,
    claws: null, // These have the Light tag, but that's irrelevant for running monsters.
    club: null,
    flail: null, // Ignore Maneuverable tag
    ['heavy flail']: null, // Ignore Maneuverable tag
    greataxe: null,
    ['heavy crossbow']: 'Projectile (90/270)', // Ignore Heavy tag
    horn: 'Keen',
    javelin: 'Thrown (60/120)',
    lance: 'Mounted',
    longbow: 'Projectile (90/270)', // Ignore Heavy tag
    ram: 'Impact',
    scythe: 'Sweeping (2)',
    sickle: null,
    smallswords: null,
    spear: 'Thrown (30/60)', // Ignore Versatile Grip tag and assume one-handing, so not Long
    stinger: null,
    talons: null,
    tentacle: null, // This has the Maneuverable tag, but that doesn't affect strikes.
    battleaxe: null,
  }[weaponName];
}

export interface DicePool {
  count: number;
  size: number;
}

function xdy(count: number, size: number): DicePool {
  return { count, size };
}

export function isManufactured(weaponName: MonsterWeapon): boolean {
  return {
    battleaxe: true,
    bite: false,
    claws: false,
    club: true,
    flail: true,
    ['heavy flail']: true, // Ignore Maneuverable tag
    greataxe: true,
    ['heavy crossbow']: true,
    horn: false,
    javelin: true,
    lance: true,
    longbow: true,
    ram: false,
    scythe: true,
    sickle: true,
    smallswords: true,
    spear: true,
    stinger: false,
    talons: false,
    tentacle: false,
  }[weaponName];
}

export function getWeaponDamageDice(weaponName: MonsterWeapon): DicePool {
  return {
    bite: xdy(1, 8),
    claws: xdy(2, 4),
    club: xdy(1, 6),
    flail: xdy(1, 8),
    ['heavy flail']: xdy(1, 10), // Ignore Maneuverable tag
    greataxe: xdy(1, 10),
    ['heavy crossbow']: xdy(1, 10),
    horn: xdy(1, 6),
    javelin: xdy(1, 6),
    lance: xdy(1, 6),
    longbow: xdy(1, 6),
    ram: xdy(1, 6),
    scythe: xdy(1, 6),
    sickle: xdy(1, 4),
    smallswords: xdy(2, 4),
    spear: xdy(1, 6),
    stinger: xdy(1, 6),
    talons: xdy(2, 4),
    tentacle: xdy(1, 6),
    battleaxe: xdy(1, 8),
  }[weaponName];
}

export function getWeaponAccuracy(weaponName: MonsterWeapon): number {
  return {
    bite: 0,
    claws: 2,
    club: 0,
    flail: -1,
    ['heavy flail']: -1,
    greataxe: 0,
    ['heavy crossbow']: 0,
    horn: 0,
    javelin: 0,
    lance: 0,
    longbow: 0,
    ram: 0,
    scythe: 0,
    sickle: 0,
    smallswords: 2,
    spear: 0,
    stinger: 1,
    talons: 2,
    tentacle: 0,
    battleaxe: 0,
  }[weaponName];
}

// TODO: add support for Versatile Grip?
export function getWeaponPowerMultiplier(weaponName: MonsterWeapon): 0.5 | 1 {
  return (
    {
      bite: 1,
      claws: 0.5,
      club: 0.5,
      flail: 0.5,  // Assume one-handing.
      ['heavy flail']: 1,
      greataxe: 1,
      ['heavy crossbow']: 0.5,
      horn: 1,
      javelin: 0.5,
      lance: 0.5,
      longbow: 0.5,
      ram: 1,
      scythe: 1,
      sickle: 0.5,
      smallswords: 0.5,
      spear: 0.5,  // Assume one-handing.
      stinger: 1,
      talons: 0.5,
      tentacle: 1,
      battleaxe: 0.5,  // Assume one-handing.
    } as const
  )[weaponName];
}
