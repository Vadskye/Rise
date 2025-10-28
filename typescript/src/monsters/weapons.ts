// If the name is plural, it indicates that the monster is using two of the weapon to
// make a dual strike.
const MONSTER_WEAPONS_LIST = [
  'battleaxe',
  'beak',
  'bite',
  'claws',
  'club',
  'darts',
  'fists', // Dual-wielding punch/kick, assuming monk bonus
  'flail',
  'giant boulder',
  'greataxe',
  'greatclub',
  'greatsword',
  'heavy crossbow',
  'heavy flail',
  'horn',
  'javelin',
  'lance',
  'longbow',
  'pick',
  'ram',
  'scythe',
  'sickle',
  'slam',
  'sling',
  'smallswords',
  'spear',
  'spike', // Same as stinger
  'stinger',
  'talons',
  'tentacle',
] as const;
export type MonsterWeapon = (typeof MONSTER_WEAPONS_LIST)[number];
export const MONSTER_WEAPONS = new Set(MONSTER_WEAPONS_LIST);

// TODO: weapons can have multiple tags, and some tags are \weapontag{} while some are
// \abilitytag{}.
export function getWeaponTag(weaponName: MonsterWeapon): string | null {
  return {
    battleaxe: 'Keen',
    beak: null,
    bite: null,
    claws: null, // These have the Light tag, but that's irrelevant for running monsters.
    club: null,
    darts: 'Thrown (30/60)',
    fists: null,
    flail: null, // Ignore Maneuverable tag
    'giant boulder': 'Thrown (90/180)',
    greataxe: 'Keen',
    greatclub: null,
    greatsword: 'Sweeping (1)',
    ['heavy crossbow']: 'Projectile (90/270)', // Ignore Heavy tag
    ['heavy flail']: null, // Ignore Maneuverable tag
    horn: 'Keen',
    javelin: 'Thrown (60/120)',
    lance: 'Mounted',
    longbow: 'Projectile (90/270)', // Ignore Heavy tag
    pick: 'Keen',
    ram: 'Impact',
    scythe: 'Sweeping (2)',
    sickle: null,
    slam: null,
    sling: 'Projectile (50/150)',
    smallswords: null,
    spear: 'Thrown (30/60)', // Ignore Versatile Grip tag and assume one-handing, so not Long
    spike: null,
    stinger: null,
    talons: null,
    tentacle: null,
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
    beak: false,
    bite: false,
    claws: false,
    club: true,
    darts: true,
    fists: false,
    flail: true,
    'giant boulder': true,
    greataxe: true,
    greatclub: true,
    greatsword: true,
    ['heavy crossbow']: true,
    ['heavy flail']: true,
    horn: false,
    javelin: true,
    lance: true,
    longbow: true,
    pick: true,
    ram: false,
    scythe: true,
    sickle: true,
    slam: false,
    sling: true,
    smallswords: true,
    spear: true,
    spike: false,
    stinger: false,
    talons: false,
    tentacle: false,
  }[weaponName];
}

export function getWeaponDamageDice(weaponName: MonsterWeapon): DicePool {
  return {
    battleaxe: xdy(1, 6),
    beak: xdy(1, 6),
    bite: xdy(1, 8),
    claws: xdy(2, 4),
    club: xdy(1, 6),
    darts: xdy(2, 4),
    fists: xdy(2, 6),
    flail: xdy(1, 8),
    'giant boulder': xdy(1, 8),
    greataxe: xdy(1, 8),
    greatclub: xdy(1, 10),
    greatsword: xdy(1, 8),
    ['heavy crossbow']: xdy(1, 10),
    ['heavy flail']: xdy(1, 10), // Ignore Maneuverable tag
    horn: xdy(1, 6),
    javelin: xdy(1, 6),
    lance: xdy(1, 6),
    longbow: xdy(1, 6),
    pick: xdy(1, 8),
    ram: xdy(1, 6),
    scythe: xdy(1, 6),
    sickle: xdy(1, 4),
    slam: xdy(1, 10),
    sling: xdy(1, 4),
    smallswords: xdy(2, 4),
    spear: xdy(1, 6),
    spike: xdy(1, 6),
    stinger: xdy(1, 6),
    talons: xdy(2, 4),
    tentacle: xdy(1, 6),
  }[weaponName];
}

export function getWeaponAccuracy(weaponName: MonsterWeapon): number {
  return {
    battleaxe: 0,
    beak: 1,
    bite: 0,
    claws: 2,
    club: 0,
    darts: 0, // +3 light offsets -3 dual strike
    fists: 0,
    flail: -1,
    'giant boulder': 0,
    greataxe: 0,
    greatclub: 0,
    greatsword: 0,
    ['heavy crossbow']: 0,
    ['heavy flail']: -1,
    horn: 0,
    javelin: 0,
    lance: 0,
    longbow: 0,
    pick: -1,
    ram: 0,
    scythe: 0,
    sickle: 0,
    slam: -1,
    sling: 0,
    smallswords: 2,
    spear: 0,
    spike: 1,
    stinger: 1,
    talons: 2,
    tentacle: 0,
  }[weaponName];
}

// TODO: add support for Versatile Grip?
export function getWeaponPowerMultiplier(weaponName: MonsterWeapon): 0.5 | 1 {
  return (
    {
      battleaxe: 0.5, // Assume one-handing.
      beak: 1,
      bite: 1,
      claws: 0.5,
      club: 0.5,
      darts: 0.5,
      fists: 0.5,
      flail: 0.5, // Assume one-handing.
      'giant boulder': 1,
      greataxe: 1,
      greatclub: 1,
      greatsword: 1,
      ['heavy crossbow']: 0.5,
      ['heavy flail']: 1,
      horn: 1,
      javelin: 0.5,
      lance: 0.5,
      longbow: 0.5,
      pick: 1, // Assume two-handing
      ram: 1,
      scythe: 1,
      sickle: 0.5,
      slam: 1,
      sling: 0.5,
      smallswords: 0.5,
      spear: 0.5, // Assume one-handing.
      spike: 1,
      stinger: 1,
      talons: 0.5,
      tentacle: 1,
    } as const
  )[weaponName];
}
