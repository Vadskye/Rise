import { DicePool } from '../core_mechanics/dice_pool';
import { Weapon, WeaponTag } from './types';
import {
  PowerScaling,
  standardWeaponScaling,
  heavyWeaponScalings,
} from '../core_mechanics/power_scaling';

export function formatWeaponTagLatex(tag: WeaponTag): string {
  if (typeof tag === 'string') {
    switch (tag) {
      case 'Ammunition':
        return '\\weapontag{Ammunition}';
      case 'Clinch':
        return '\\abilitytag{Clinch}';
      case 'Compact':
        return '\\weapontag{Compact}';
      case 'Heavy':
        return '\\weapontag{Heavy}';
      case 'Impact':
        return '\\abilitytag{Impact}';
      case 'Keen':
        return '\\abilitytag{Keen}';
      case 'Light':
        return '\\weapontag{Light}';
      case 'Long':
        return '\\weapontag{Long}';
      case 'Maneuverable':
        return '\\weapontag{Maneuverable}';
      case 'Mounted':
        return '\\weapontag{Mounted}';
      case 'Parrying':
        return '\\weapontag{Parrying}';
      case 'Resonating':
        return '\\weapontag{Resonating}';
      case 'Subdual':
        return '\\abilitytag{Subdual}';
      case 'Versatile Grip':
        return '\\weapontag{Versatile Grip}';
      default:
        return `\\weapontag{${tag}}`;
    }
  } else {
    switch (tag.kind) {
      case 'Projectile':
        return `\\weapontag{Projectile} (${tag.close}/${tag.long})`;
      case 'Sweeping':
        return `\\weapontag{Sweeping} (${tag.count})`;
      case 'Thrown':
        return `\\weapontag{Thrown} (${tag.close}/${tag.long})`;
    }
  }
}

export function isWeaponTagVisibleInMonster(tag: WeaponTag): boolean {
  if (typeof tag === 'string') {
    switch (tag) {
      case 'Ammunition':
        return false;
      case 'Clinch':
        return true;
      case 'Compact':
        return true;
      case 'Heavy':
        return false;
      case 'Impact':
        return true;
      case 'Keen':
        return true;
      case 'Light':
        return true;
      case 'Long':
        return true;
      case 'Maneuverable':
        return true;
      case 'Mounted':
        return false;
      case 'Parrying':
        return true;
      case 'Resonating':
        return true;
      case 'Subdual':
        return true;
      case 'Versatile Grip':
        return false;
      default:
        return true;
    }
  } else {
    return true; // Projectile, Sweeping, Thrown are all visible
  }
}

export enum StandardWeapon {
  Battleaxe = 'Battleaxe',
  Beak = 'Beak',
  Bite = 'Bite',
  Broadsword = 'Broadsword',
  Claw = 'Claw',
  Club = 'Club',
  Dart = 'Dart',
  Fist = 'Fist',
  GiantBoulder = 'Giant Boulder',
  Greataxe = 'Greataxe',
  Greatclub = 'Greatclub',
  Greatmace = 'Greatmace',
  Greatsword = 'Greatsword',
  Flail = 'Flail',
  HeavyCrossbow = 'Heavy Crossbow',
  HeavyFlail = 'Heavy Flail',
  Horn = 'Horn',
  Horns = 'Horns',
  Javelin = 'Javelin',
  Kama = 'Kama',
  Lance = 'Lance',
  Longbow = 'Longbow',
  Morningstar = 'Morningstar',
  Pick = 'Pick',
  PunchKick = 'Punch/kick',
  Ram = 'Ram',
  Sap = 'Sap',
  Scimitar = 'Scimitar',
  Scythe = 'Scythe',
  Sickle = 'Sickle',
  Slam = 'Slam',
  Sledgehammer = 'Sledgehammer',
  Sling = 'Sling',
  Smallsword = 'Smallsword',
  Spear = 'Spear',
  Stinger = 'Stinger',
  Talon = 'Talon',
  Tentacle = 'Tentacle',
  Totokia = 'Totokia',
  Warhammer = 'Warhammer',
}

export const STANDARD_WEAPONS: Record<StandardWeapon, Weapon> = {
  [StandardWeapon.Battleaxe]: {
    accuracy: 0,
    damage_dice: DicePool.d6(),
    name: 'Battleaxe',
    tags: ['Keen', 'Versatile Grip'],
  },
  [StandardWeapon.Beak]: {
    accuracy: 1,
    damage_dice: DicePool.d6(),
    name: 'Beak',
    tags: ['Versatile Stance'],
    isNatural: true,
  },
  [StandardWeapon.Bite]: {
    accuracy: 0,
    damage_dice: DicePool.d8(),
    name: 'Bite',
    tags: ['Versatile Stance'],
    isNatural: true,
  },
  [StandardWeapon.Broadsword]: {
    accuracy: 1,
    damage_dice: DicePool.d6(),
    name: 'Broadsword',
    tags: ['Versatile Grip'],
  },
  [StandardWeapon.Claw]: {
    accuracy: 1,
    damage_dice: DicePool.d4(),
    name: 'Claw',
    tags: ['Light'],
    isNatural: true,
  },
  [StandardWeapon.Club]: {
    accuracy: 0,
    damage_dice: DicePool.d6(),
    name: 'Club',
    tags: ['Versatile Grip'],
  },
  [StandardWeapon.Dart]: {
    accuracy: 0,
    damage_dice: DicePool.d4(),
    name: 'Dart',
    tags: ['Ammunition', 'Compact', 'Light', { kind: 'Thrown', close: 30, long: 60 }],
  },
  [StandardWeapon.Fist]: {
    accuracy: 0,
    damage_dice: DicePool.d6(),
    name: 'Fist',
    tags: [],
    isNatural: true,
  },
  [StandardWeapon.GiantBoulder]: {
    accuracy: 0,
    damage_dice: DicePool.d8(),
    name: 'Boulder',
    tags: ['Impact', { kind: 'Thrown', close: 90, long: 180 }],
  },
  [StandardWeapon.Greataxe]: {
    accuracy: 0,
    damage_dice: DicePool.d8(),
    name: 'Greataxe',
    tags: ['Heavy', 'Keen'],
  },
  [StandardWeapon.Greatclub]: {
    accuracy: 0,
    damage_dice: DicePool.d10(),
    name: 'Greatclub',
    tags: ['Heavy'],
  },
  [StandardWeapon.Greatmace]: {
    accuracy: 0,
    damage_dice: DicePool.d8(),
    name: 'Greatmace',
    tags: ['Heavy', 'Impact'],
  },
  [StandardWeapon.Greatsword]: {
    accuracy: 0,
    damage_dice: DicePool.d8(),
    name: 'Greatsword',
    tags: ['Heavy', { kind: 'Sweeping', count: 1 }],
  },
  [StandardWeapon.Flail]: {
    accuracy: -1,
    damage_dice: DicePool.d8(),
    name: 'Flail',
    tags: ['Maneuverable', 'Versatile Grip'],
  },
  [StandardWeapon.HeavyCrossbow]: {
    accuracy: 0,
    damage_dice: DicePool.d10(),
    name: 'Heavy crossbow',
    tags: ['Heavy', { kind: 'Projectile', close: 90, long: 270 }],
  },
  [StandardWeapon.HeavyFlail]: {
    accuracy: -1,
    damage_dice: DicePool.d10(),
    name: 'Heavy flail',
    tags: ['Heavy', 'Maneuverable'],
  },
  [StandardWeapon.Javelin]: {
    accuracy: 0,
    damage_dice: DicePool.d6(),
    name: 'Javelin',
    tags: [{ kind: 'Thrown', close: 60, long: 120 }],
  },
  [StandardWeapon.Kama]: {
    accuracy: 0,
    damage_dice: DicePool.d4(),
    name: 'Kama',
    tags: ['Keen', 'Light'],
  },
  [StandardWeapon.Lance]: {
    accuracy: 0,
    damage_dice: DicePool.d6(),
    name: 'Lance',
    tags: ['Mounted'],
  },
  [StandardWeapon.Longbow]: {
    accuracy: 0,
    damage_dice: DicePool.d6(),
    name: 'Longbow',
    tags: ['Bow', { kind: 'Projectile', close: 90, long: 270 }],
  },
  [StandardWeapon.Morningstar]: {
    accuracy: 0,
    damage_dice: DicePool.d6(),
    name: 'Morning star',
    tags: ['Impact', 'Versatile Grip'],
  },
  [StandardWeapon.Horn]: {
    accuracy: 0,
    damage_dice: DicePool.d6(),
    name: 'Horn',
    tags: ['Keen', 'Versatile Stance'],
    isNatural: true,
  },
  [StandardWeapon.Horns]: {
    accuracy: 0,
    damage_dice: DicePool.d6(),
    name: 'Horns',
    tags: ['Keen', 'Versatile Stance'],
    isNatural: true,
  },
  [StandardWeapon.Ram]: {
    accuracy: 0,
    damage_dice: DicePool.d6(),
    name: 'Ram',
    tags: ['Impact', 'Versatile Stance'],
    isNatural: true,
  },
  [StandardWeapon.Stinger]: {
    accuracy: 1,
    damage_dice: DicePool.d6(),
    name: 'Stinger',
    tags: ['Versatile Stance'],
    isNatural: true,
  },
  [StandardWeapon.Tentacle]: {
    accuracy: 0,
    damage_dice: DicePool.d6(),
    name: 'Tentacle',
    tags: ['Maneuverable'],
    isNatural: true,
  },
  [StandardWeapon.Pick]: {
    accuracy: -1,
    damage_dice: DicePool.d8(),
    name: 'Pick',
    tags: ['Keen', 'Versatile Grip'],
  },
  [StandardWeapon.PunchKick]: {
    accuracy: 0,
    damage_dice: DicePool.xdy(1, 3),
    name: 'Punch/kick',
    tags: ['Subdual'],
    isNatural: true,
  },
  [StandardWeapon.Sap]: {
    accuracy: 0,
    damage_dice: DicePool.d4(),
    name: 'Sap',
    tags: ['Light', 'Subdual'],
  },
  [StandardWeapon.Scimitar]: {
    accuracy: 0,
    damage_dice: DicePool.d6(),
    name: 'Scimitar',
    tags: ['Mounted'],
  },
  [StandardWeapon.Scythe]: {
    accuracy: 0,
    damage_dice: DicePool.d6(),
    name: 'Scythe',
    tags: ['Heavy', { kind: 'Sweeping', count: 2 }],
  },
  [StandardWeapon.Sickle]: {
    accuracy: 0,
    damage_dice: DicePool.d4(),
    name: 'Sickle',
    tags: ['Light'],
  },
  [StandardWeapon.Slam]: {
    accuracy: -1,
    damage_dice: DicePool.d10(),
    name: 'Slam',
    tags: [],
    isNatural: true,
  },
  [StandardWeapon.Sledgehammer]: {
    accuracy: -1,
    damage_dice: DicePool.d10(),
    name: 'Sledgehammer',
    tags: ['Heavy', 'Impact'],
  },
  [StandardWeapon.Sling]: {
    accuracy: -1,
    damage_dice: DicePool.d6(),
    name: 'Sling',
    tags: [{ kind: 'Projectile', close: 90, long: 270 }],
  },
  [StandardWeapon.Smallsword]: {
    accuracy: 1,
    damage_dice: DicePool.d4(),
    name: 'Smallsword',
    tags: ['Light'],
  },
  [StandardWeapon.Spear]: {
    accuracy: 0,
    damage_dice: DicePool.d6(),
    name: 'Spear',
    tags: ['Long', { kind: 'Thrown', close: 30, long: 60 }, 'Versatile Grip'],
  },
  [StandardWeapon.Talon]: {
    accuracy: 1,
    damage_dice: DicePool.d4(),
    name: 'Talon',
    tags: ['Light'],
    isNatural: true,
  },
  [StandardWeapon.Totokia]: {
    accuracy: 0,
    damage_dice: DicePool.d8(),
    name: 'Totokia',
    tags: ['Impact', 'Versatile Grip'],
  },
  [StandardWeapon.Warhammer]: {
    accuracy: -1,
    damage_dice: DicePool.d8(),
    name: 'Warhammer',
    tags: ['Impact', 'Versatile Grip'],
  },
};

export function getStandardWeapon(kind: StandardWeapon): Weapon {
  return STANDARD_WEAPONS[kind];
}

export function getWeaponPowerScalings(weapon: Weapon): PowerScaling[] {
  if (weapon.tags.includes('Heavy') || weapon.tags.includes('Versatile Stance')) {
    return heavyWeaponScalings();
  } else {
    return [standardWeaponScaling()];
  }
}

export type WeaponMaterial =
  | 'Adamantine'
  | 'Pure Adamantine'
  | 'Cold Iron'
  | 'Normal'
  | 'Diamondsteel'
  | 'Pure Diamondsteel'
  | { kind: 'Dragonfang'; color: string }
  | { kind: 'Ancient Dragonfang'; color: string }
  | 'Mithral'
  | 'Pure Mithral'
  | 'Silver';

export function getWeaponMaterialName(material: WeaponMaterial): string {
  if (typeof material === 'string') {
    return material.toLowerCase();
  } else {
    switch (material.kind) {
      case 'Dragonfang':
        return `${material.color} dragonfang`;
      case 'Ancient Dragonfang':
        return `${material.color} ancient dragonfang`;
    }
  }
}
