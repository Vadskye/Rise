import { DamageType } from "@src/data";

interface StandardWeaponInput {
  name: StandardWeaponName;
}

interface CustomWeaponInput {
  accuracyBonus?: number;
  damageTypes: DamageType[];
  name: string;
  powerBonus?: number;
  rangeIncrement?: number | null;
  tags?: WeaponTag[];
}

export type WeaponInput = StandardWeaponInput | CustomWeaponInput;

export type Weapon = Required<CustomWeaponInput>;

export type WeaponTag =
  | "keen"
  | "impact"
  | "sweeping 1"
  | "sweeping 2"
  | "forceful"
  | "long"
  | "grappling";

export function parseWeaponInput(input: WeaponInput): Weapon {
  const weapon = {
    accuracyBonus: 0,
    damageTypes: [],
    powerBonus: 0,
    rangeIncrement: null,
    tags: [],
    ...(isStandardWeaponName(input.name) && standardWeapons[input.name]),
    ...input,
  };
  weapon.damageTypes.sort();
  return weapon;
}

// This is somewhat cumbersome to write, but it ensure that we specify a damage type for any
// intentionally custom weapons. For the foreseeable future, it's likely that any "custom" weapon is
// actually just a missing standard weapon, so it's worth the duplication.
export type StandardWeaponName =
  | "bite"
  | "claw"
  | "club"
  | "constrict"
  | "greataxe"
  | "greatclub"
  | "greatsword"
  | "greatmace"
  | "gore"
  | "light crossbow"
  | "mace"
  | "ram"
  | "smallsword"
  | "slam"
  | "spear"
  | "stinger"
  | "talon"
  | "tentacle";

export function isStandardWeaponName(
  name: StandardWeaponName | string | null | undefined,
): name is StandardWeaponName {
  return Boolean(standardWeapons[name as StandardWeaponName]);
}

export const standardWeapons: Record<StandardWeaponName, Omit<CustomWeaponInput, "name">> = {
  "bite": {
    damageTypes: ["bludgeoning", "piercing"],
    powerBonus: 2,
  },
  "claw": {
    accuracyBonus: 2,
    powerBonus: -2,
    damageTypes: ["slashing", "piercing"],
  },
  "club": {
    damageTypes: ["bludgeoning"],
  },
  "constrict": {
    damageTypes: ["bludgeoning"],
    powerBonus: 4,
    tags: ["grappling"],
  },
  "greataxe": {
    damageTypes: ["slashing"],
    powerBonus: 4,
    tags: ["sweeping 1"],
  },
  "greatclub": {
    powerBonus: 4,
    damageTypes: ["bludgeoning"],
    tags: ["forceful"],
  },
  "greatmace": {
    damageTypes: ["bludgeoning"],
    powerBonus: 4,
    tags: ["impact"],
  },
  "greatsword": {
    damageTypes: ["slashing"],
    powerBonus: 2,
    tags: ["sweeping 2"],
  },
  "gore": {
    damageTypes: ["piercing"],
    powerBonus: 2,
    tags: ["impact"],
  },
  "light crossbow": {
    damageTypes: ["piercing"],
  },
  "mace": {
    damageTypes: ["bludgeoning"],
  },
  "ram": {
    damageTypes: ["bludgeoning"],
    powerBonus: 2,
    tags: ["forceful"],
  },
  "slam": {
    damageTypes: ["bludgeoning"],
    powerBonus: 4,
  },
  "smallsword": {
    accuracyBonus: 2,
    damageTypes: ["slashing"],
    powerBonus: -2,
    tags: ["keen"],
  },
  "spear": {
    damageTypes: ["piercing"],
  },
  "tentacle": {
    accuracyBonus: 1,
    damageTypes: ["bludgeoning"],
    powerBonus: -2,
  },
  "talon": {
    accuracyBonus: 2,
    damageTypes: ["piercing", "slashing"],
    powerBonus: -2,
  },
  "stinger": {
    accuracyBonus: 1,
    damageTypes: ["piercing"],
    powerBonus: 2,
  },
};
