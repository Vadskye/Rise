import { DicePool, Die } from '../types/dice_pool';
import { Weapon, WeaponTag } from './types';
import { PowerScaling } from '../types/power_scaling';

export function formatWeaponTagLatex(tag: WeaponTag): string {
  if (typeof tag === 'string') {
    switch (tag) {
      case 'Ammunition': return '\\weapontag{Ammunition}';
      case 'Clinch': return '\\abilitytag{Clinch}';
      case 'Compact': return '\\weapontag{Compact}';
      case 'Heavy': return '\\weapontag{Heavy}';
      case 'Impact': return '\\abilitytag{Impact}';
      case 'Keen': return '\\abilitytag{Keen}';
      case 'Light': return '\\weapontag{Light}';
      case 'Long': return '\\weapontag{Long}';
      case 'Maneuverable': return '\\weapontag{Maneuverable}';
      case 'Mounted': return '\\weapontag{Mounted}';
      case 'Parrying': return '\\weapontag{Parrying}';
      case 'Resonating': return '\\weapontag{Resonating}';
      case 'Subdual': return '\\abilitytag{Subdual}';
      case 'Versatile Grip': return '\\weapontag{Versatile Grip}';
      default: return `\\weapontag{${tag}}`;
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
      case 'Ammunition': return false;
      case 'Clinch': return true;
      case 'Compact': return true;
      case 'Heavy': return false;
      case 'Impact': return true;
      case 'Keen': return true;
      case 'Light': return true;
      case 'Long': return true;
      case 'Maneuverable': return true;
      case 'Mounted': return false;
      case 'Parrying': return true;
      case 'Resonating': return true;
      case 'Subdual': return true;
      case 'Versatile Grip': return false;
      default: return true;
    }
  } else {
    return true; // Projectile, Sweeping, Thrown are all visible
  }
}

export enum StandardWeapon {
  Battleaxe = 'Battleaxe',
  Bite = 'Bite',
  Broadsword = 'Broadsword',
  Claw = 'Claw',
  Club = 'Club',
  GiantBoulder = 'GiantBoulder',
  Greataxe = 'Greataxe',
  Greatclub = 'Greatclub',
  Greatmace = 'Greatmace',
  Greatsword = 'Greatsword',
  Flail = 'Flail',
  HeavyCrossbow = 'HeavyCrossbow',
  HeavyFlail = 'HeavyFlail',
  Javelin = 'Javelin',
  Kama = 'Kama',
  Lance = 'Lance',
  Longbow = 'Longbow',
  MorningStar = 'MorningStar',
  MonsterBite = 'MonsterBite',
  MonsterHorn = 'MonsterHorn',
  MonsterHorns = 'MonsterHorns',
  MonsterPunch = 'MonsterPunch',
  MonsterRam = 'MonsterRam',
  MonsterStinger = 'MonsterStinger',
  MonsterTentacle = 'MonsterTentacle',
  Sap = 'Sap',
  Scimitar = 'Scimitar',
  Sickle = 'Sickle',
  Sledgehammer = 'Sledgehammer',
  Sling = 'Sling',
  Smallsword = 'Smallsword',
  Spear = 'Spear',
  Talon = 'Talon',
  Totokia = 'Totokia',
  Warhammer = 'Warhammer',
}

export function getStandardWeapon(kind: StandardWeapon): Weapon {
  switch (kind) {
    case StandardWeapon.Battleaxe:
      return {
        accuracy: 1,
        damage_dice: DicePool.d6(),
        name: 'Battleaxe',
        tags: ['Versatile Grip'],
      };
    case StandardWeapon.Bite:
      return {
        accuracy: 0,
        damage_dice: DicePool.d6(),
        name: 'Bite',
        tags: ['Clinch'],
      };
    case StandardWeapon.Broadsword:
      return {
        accuracy: 0,
        damage_dice: DicePool.d6(),
        name: 'Broadsword',
        tags: [{ kind: 'Sweeping', count: 1 }, 'Versatile Grip'],
      };
    case StandardWeapon.Claw:
      return {
        accuracy: 2,
        damage_dice: DicePool.d4(),
        name: 'Claw',
        tags: ['Light'],
      };
    case StandardWeapon.Club:
      return {
        accuracy: 0,
        damage_dice: DicePool.d8(),
        name: 'Club',
        tags: [],
      };
    case StandardWeapon.Flail:
      return {
        accuracy: 0,
        damage_dice: DicePool.d6(),
        name: 'Flail',
        tags: ['Maneuverable'],
      };
    case StandardWeapon.GiantBoulder:
      return {
        accuracy: 0,
        damage_dice: DicePool.d8(),
        name: 'Boulder',
        tags: ['Impact', { kind: 'Thrown', close: 120, long: 360 }],
      };
    case StandardWeapon.Greataxe:
      return {
        accuracy: 1,
        damage_dice: DicePool.d8(),
        name: 'Greataxe',
        tags: ['Heavy', { kind: 'Sweeping', count: 1 }],
      };
    case StandardWeapon.Greatclub:
      return {
        accuracy: 0,
        damage_dice: DicePool.d10(),
        name: 'Greatclub',
        tags: ['Heavy', 'Impact'],
      };
    case StandardWeapon.Greatmace:
      return {
        accuracy: 0,
        damage_dice: DicePool.d10(),
        name: 'Greatmace',
        tags: ['Heavy', 'Impact'],
      };
    case StandardWeapon.Greatsword:
      return {
        accuracy: 0,
        damage_dice: DicePool.d8(),
        name: 'Greatsword',
        tags: ['Heavy', { kind: 'Sweeping', count: 2 }],
      };
    case StandardWeapon.HeavyCrossbow:
      return {
        accuracy: 0,
        damage_dice: DicePool.d10(),
        name: 'Heavy crossbow',
        tags: [{ kind: 'Projectile', close: 90, long: 270 }],
      };
    case StandardWeapon.HeavyFlail:
      return {
        accuracy: 0,
        damage_dice: DicePool.d10(),
        name: 'Heavy flail',
        tags: ['Heavy', 'Maneuverable'],
      };
    case StandardWeapon.Javelin:
      return {
        accuracy: 0,
        damage_dice: DicePool.d6(),
        name: 'Javelin',
        tags: [{ kind: 'Thrown', close: 60, long: 120 }],
      };
    case StandardWeapon.Kama:
      return {
        accuracy: 1,
        damage_dice: DicePool.d4(),
        name: 'Kama',
        tags: ['Light', { kind: 'Sweeping', count: 1 }],
      };
    case StandardWeapon.Lance:
      return {
        accuracy: 2,
        damage_dice: DicePool.d10(),
        name: 'Lance',
        tags: ['Ammunition', 'Long', 'Mounted'],
      };
    case StandardWeapon.Longbow:
      return {
        accuracy: 0,
        damage_dice: DicePool.d6(),
        name: 'Longbow',
        tags: [{ kind: 'Projectile', close: 90, long: 270 }],
      };
    case StandardWeapon.MorningStar:
      return {
        accuracy: 0,
        damage_dice: DicePool.d8(),
        name: 'Morning star',
        tags: ['Versatile Grip'],
      };
    case StandardWeapon.MonsterBite:
      return {
        accuracy: 0,
        damage_dice: DicePool.d8(),
        name: 'Bite',
        tags: ['Clinch', 'Heavy'],
      };
    case StandardWeapon.MonsterHorn:
      return {
        accuracy: 0,
        damage_dice: DicePool.d6(),
        name: 'Horn',
        tags: ['Heavy', 'Impact'],
      };
    case StandardWeapon.MonsterHorns:
      return {
        accuracy: 0,
        damage_dice: DicePool.d6(),
        name: 'Horns',
        tags: ['Heavy', 'Impact'],
      };
    case StandardWeapon.MonsterPunch:
      return {
        accuracy: 2,
        damage_dice: DicePool.d4(),
        name: 'Punch',
        tags: ['Light'],
      };
    case StandardWeapon.MonsterRam:
      return {
        accuracy: 0,
        damage_dice: DicePool.d6(),
        name: 'Ram',
        tags: ['Heavy', 'Resonating'],
      };
    case StandardWeapon.MonsterStinger:
      return {
        accuracy: 1,
        damage_dice: DicePool.d6(),
        name: 'Stinger',
        tags: ['Heavy'],
      };
    case StandardWeapon.MonsterTentacle:
      return {
        accuracy: 0,
        damage_dice: DicePool.d8(),
        name: 'Tentacle',
        tags: ['Heavy', 'Long'],
      };
    case StandardWeapon.Sap:
      return {
        accuracy: 1,
        damage_dice: DicePool.xdy(1, 3),
        name: 'Sap',
        tags: ['Compact', 'Light', 'Subdual'],
      };
    case StandardWeapon.Scimitar:
      return {
        accuracy: 1,
        damage_dice: DicePool.d6(),
        name: 'Scimitar',
        tags: ['Mounted'],
      };
    case StandardWeapon.Sickle:
      return {
        accuracy: 1,
        damage_dice: DicePool.d4(),
        name: 'Sickle',
        tags: ['Light', { kind: 'Sweeping', count: 1 }],
      };
    case StandardWeapon.Sledgehammer:
      return {
        accuracy: -1,
        damage_dice: DicePool.xdy(2, 6),
        name: 'Sledgehammer',
        tags: ['Resonating', 'Heavy'],
      };
    case StandardWeapon.Sling:
      return {
        accuracy: 0,
        damage_dice: DicePool.d4(),
        name: 'Sling',
        tags: [{ kind: 'Projectile', close: 60, long: 120 }, 'Compact'],
      };
    case StandardWeapon.Smallsword:
      return {
        accuracy: 1,
        damage_dice: DicePool.d4(),
        name: 'Smallsword',
        tags: ['Keen', 'Light'],
      };
    case StandardWeapon.Spear:
      return {
        accuracy: 0,
        damage_dice: DicePool.d6(),
        name: 'Spear',
        tags: [{ kind: 'Thrown', close: 30, long: 60 }, 'Versatile Grip'],
      };
    case StandardWeapon.Talon:
      return {
        accuracy: 2,
        damage_dice: DicePool.d4(),
        name: 'Talon',
        tags: ['Light', 'Versatile Grip'],
      };
    case StandardWeapon.Totokia:
      return {
        accuracy: 0,
        damage_dice: DicePool.d8(),
        name: 'Totokia',
        tags: ['Impact', 'Versatile Grip'],
      };
    case StandardWeapon.Warhammer:
      return {
        accuracy: 0,
        damage_dice: DicePool.d6(),
        name: 'Warhammer',
        tags: ['Resonating', 'Versatile Grip'],
      };
  }
}

export function getWeaponPowerScalings(weapon: Weapon): PowerScaling[] {
  if (weapon.tags.includes('Heavy')) {
    return PowerScaling.heavyWeaponScalings();
  } else {
    return [PowerScaling.standardWeaponScaling()];
  }
}

export type WeaponMaterial =
  | 'Adamantine'
  | 'Pure Adamantine'
  | 'Cold Iron'
  | 'Normal'
  | 'Diamondsteel'
  | 'Pure Diamondsteel'
  | { kind: 'Dragonfang', color: string }
  | { kind: 'Ancient Dragonfang', color: string }
  | 'Mithral'
  | 'Pure Mithral'
  | 'Silver';

export function getWeaponMaterialName(material: WeaponMaterial): string {
  if (typeof material === 'string') {
    return material.toLowerCase();
  } else {
    switch (material.kind) {
      case 'Dragonfang': return `${material.color} dragonfang`;
      case 'Ancient Dragonfang': return `${material.color} ancient dragonfang`;
    }
  }
}
