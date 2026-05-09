export const RISE_ATTRIBUTES = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'perception',
  'willpower',
] as const;

export type RiseAttribute = (typeof RISE_ATTRIBUTES)[number];

export type RiseAttributeModifier =
  | 'strength_at_creation'
  | 'strength_level_scaling'
  | 'dexterity_at_creation'
  | 'dexterity_level_scaling'
  | 'constitution_at_creation'
  | 'constitution_level_scaling'
  | 'intelligence_at_creation'
  | 'intelligence_level_scaling'
  | 'perception_at_creation'
  | 'perception_level_scaling'
  | 'willpower_at_creation'
  | 'willpower_level_scaling';

export type RiseDefense = 'armor_defense' | 'brawn' | 'fortitude' | 'reflex' | 'mental';

export type Attribute = RiseAttribute;
export type Defense = RiseDefense;

export function getAttributeShorthand(attr: Attribute): string {
  switch (attr) {
    case 'strength':
      return 'Str';
    case 'dexterity':
      return 'Dex';
    case 'constitution':
      return 'Con';
    case 'intelligence':
      return 'Int';
    case 'perception':
      return 'Per';
    case 'willpower':
      return 'Wil';
  }
}

export const DEFENSES: Defense[] = ['armor_defense', 'brawn', 'fortitude', 'mental', 'reflex'];

export function getDefenseShorthand(defense: Defense): string {
  switch (defense) {
    case 'armor_defense':
      return 'Armor';
    case 'brawn':
      return 'Brn';
    case 'fortitude':
      return 'Fort';
    case 'mental':
      return 'Ment';
    case 'reflex':
      return 'Ref';
  }
}

export function getDefenseAttribute(defense: Defense): Attribute | null {
  switch (defense) {
    case 'brawn':
      return 'strength';
    case 'fortitude':
      return 'constitution';
    case 'mental':
      return 'willpower';
    case 'reflex':
      return 'dexterity';
    default:
      return null;
  }
}
