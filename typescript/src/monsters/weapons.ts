// For now, we only allow natural weapons. If we implement support for all manufactured
// weapons, we'll need to be more organized.
// If the name is plural, it indicates that the monster is using two of the weapon to
// make a dual strike.
export type MonsterWeapon = 'bite' | 'claws' | 'horn' | 'ram' | 'stinger' | 'talons' | 'tentacle';

export function getWeaponTag(weaponName: MonsterWeapon): string | null {
  return {
    bite: null,
    claws: null, // These have the Light tag, but that's irrelevant for running monsters.
    horn: 'Keen',
    ram: 'Impact',
    stinger: null,
    talons: null,
    tentacle: null, // This has the Maneuverable tag, but that doesn't affect strikes.
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
    horn: xdy(1, 6),
    ram: xdy(1, 6),
    stinger: xdy(1, 6),
    talons: xdy(2, 4),
    tentacle: xdy(1, 6),
  }[weaponName];
}

export function getWeaponAccuracy(weaponName: MonsterWeapon): number {
  return {
    bite: 0,
    claws: 2,
    horn: 0,
    ram: 0,
    stinger: 1,
    talons: 2,
    tentacle: 0,
  }[weaponName];
}

export function getWeaponPowerMultiplier(weaponName: MonsterWeapon): 0.5 | 1 {
  return ({
    bite: 1,
    claws: 0.5,
    horn: 1,
    ram: 1,
    stinger: 1,
    talons: 0.5,
    tentacle: 1,
  } as const)[weaponName];
}
