// For now, we only allow natural weapons. If we implement support for all manufactured
// weapons, we'll need to be more organized.
// If the name is plural, it indicates that the monster is using two of the weapon to
// make a dual strike.
export type MonsterWeapon = 'bite' | 'claws' | 'horn' | 'ram' | 'stinger' | 'talons' | 'tentacle' | 'heavy crossbow' | 'spear' | 'longbow' | 'sickle' | 'club' | 'lance';

export function getWeaponTag(weaponName: MonsterWeapon): string | null {
  return {
    bite: null,
    claws: null, // These have the Light tag, but that's irrelevant for running monsters.
    ['heavy crossbow']: 'Projectile (90/270)', // Ignore Heavy tag
    horn: 'Keen',
    longbow: 'Projectile (90/270)', // Ignore Heavy tag
    ram: 'Impact',
    spear: 'Thrown (30/60)', // Ignore Versatile Grip tag and assume one-handing, so not Long
    stinger: null,
    talons: null,
    tentacle: null, // This has the Maneuverable tag, but that doesn't affect strikes.
    sickle: null,
    club: null,
    lance: 'Mounted',
  }[weaponName];
}

export interface DicePool {
  count: number;
  size: number;
}

function xdy(count: number, size: number): DicePool {
  return { count, size };
}

export function getWeaponDamageDice(weaponName: MonsterWeapon): DicePool {
  return {
    bite: xdy(1, 8),
    claws: xdy(2, 4),
    ['heavy crossbow']: xdy(1, 10),
    horn: xdy(1, 6),
    longbow: xdy(1, 6),
    ram: xdy(1, 6),
    spear: xdy(1, 6),
    stinger: xdy(1, 6),
    talons: xdy(2, 4),
    tentacle: xdy(1, 6),
    sickle: xdy(1, 4),
    club: xdy(1, 8),
    lance: xdy(1, 6),
  }[weaponName];
}

export function getWeaponAccuracy(weaponName: MonsterWeapon): number {
  return {
    bite: 0,
    claws: 2,
    ['heavy crossbow']: 0,
    horn: 0,
    longbow: 0,
    ram: 0,
    spear: 0,
    stinger: 1,
    talons: 2,
    tentacle: 0,
    sickle: 0,
    club: 0,
    lance: 0,
  }[weaponName];
}

export function getWeaponPowerMultiplier(weaponName: MonsterWeapon): 0.5 | 1 {
  return (
    {
      bite: 1,
      claws: 0.5,
      ['heavy crossbow']: 0.5,
      horn: 1,
      longbow: 0.5,
      ram: 1,
      spear: 0.5,  // Assume one-handing. Currently, there's no way to mark a monster as two-handing a spear.
      stinger: 1,
      talons: 0.5,
      tentacle: 1,
      sickle: 0.5,
      club: 1,
      lance: 0.5,
    } as const
  )[weaponName];
}
