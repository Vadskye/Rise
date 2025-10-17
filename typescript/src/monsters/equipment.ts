import { MonsterWeapon, MONSTER_WEAPONS } from './weapons';

// TODO: add more logic and better organize.
// We use `EquippedItem` instead of the more obvious `Equipment` because `Equipment` is an
// ambiguous plural and I don't want to write "equipments".
export type EquippedItem = MonsterWeapon | BodyArmor | Shield;

// We don't do any processing of body armor; it's pure flavor, with any effects being
// taken care of by the monster roles. We also don't currently support special material
// armor, which would be a reasonable addition for high level monsters.
const BODY_ARMORS_LIST = [
  'buff leather',
  'mail shirt',
  'rawhide',
  'leather lamellar',
  'scale',
  'brigandine',
  'breastplate',
  'half plate',
  'full plate',
] as const;
export type BodyArmor = (typeof BODY_ARMORS_LIST)[number];
export const BODY_ARMORS = new Set(BODY_ARMORS_LIST);

export function isBodyArmor(item: EquippedItem): item is BodyArmor {
  return BODY_ARMORS.has(item as BodyArmor);
}

// This is used to apply numeric modifiers to the monster.
const SHIELDS_LIST = [
  'buckler',
  'standard shield',
  'tower shield',
] as const;
export type Shield = (typeof SHIELDS_LIST)[number];
export const SHIELDS = new Set(SHIELDS_LIST);

export function isShield(item: EquippedItem): item is Shield {
  return SHIELDS.has(item as Shield);
}

export function generateShieldProperties(shield: Shield) {
  return {
    buckler: {
      shield_accuracy: 0,
      shield_name: shield,
      shield_defense: 1,
      shield_reflex: 1,
    },
    ['standard shield']: {
      shield_accuracy: 0,
      shield_name: shield,
      shield_defense: 2,
      shield_reflex: 2,
    },
    ['tower shield']: {
      shield_accuracy: -1,
      shield_name: shield,
      shield_defense: 3,
      shield_reflex: 3,
    },
  }[shield];
}

export function isWeapon(item: EquippedItem): item is MonsterWeapon {
  return MONSTER_WEAPONS.has(item as MonsterWeapon);
}
