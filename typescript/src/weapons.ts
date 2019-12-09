import { DamageType } from "@src/data";

interface StandardWeaponInput {
  name: StandardWeaponName;
}

interface CustomWeaponInput {
  accuracyBonus?: number;
  damageTypes: DamageType[];
  name: string;
  powerBonus?: number;
  tags?: WeaponTag[];
}

export type WeaponInput = StandardWeaponInput | CustomWeaponInput;

export type Weapon = Required<CustomWeaponInput>;

export type WeaponTag = "sweeping 1" | "sweeping 2" | "forceful" | "long";

export function parseWeaponInput(input: WeaponInput): Weapon {
  return {
    accuracyBonus: 0,
    damageTypes: [],
    powerBonus: 0,
    tags: [],
    ...(isStandardWeaponName(input.name) && standardWeapons[input.name]),
    ...input,
  };
}

// This is somewhat cumbersome to write, but it ensure that we specify a damage type for any
// intentionally custom weapons. For the foreseeable future, it's likely that any "custom" weapon is
// actually just a missing standard weapon, so it's worth the duplication.
export type StandardWeaponName =
  | "bite"
  | "boulder"
  | "claw"
  | "club"
  | "greataxe"
  | "greatclub"
  | "greatsword"
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
  name: StandardWeaponName | string,
): name is StandardWeaponName {
  return Boolean(standardWeapons[name as StandardWeaponName]);
}

export const standardWeapons: Record<StandardWeaponName, Omit<CustomWeaponInput, "name">> = {
  "bite": {
    damageTypes: ["bludgeoning", "piercing"],
    powerBonus: 2,
  },
  "boulder": {
    damageTypes: ["bludgeoning"],
    powerBonus: 2,
    // TODO: define range increment
  },
  "claw": {
    accuracyBonus: 1,
    damageTypes: ["slashing", "piercing"],
  },
  "club": {
    accuracyBonus: -1,
    damageTypes: ["bludgeoning"],
  },
  "greataxe": {
    damageTypes: ["slashing"],
    powerBonus: 4,
    tags: ["sweeping 1"],
  },
  "greatclub": {
    powerBonus: 4,
    damageTypes: ["bludgeoning"],
  },
  "greatsword": {
    damageTypes: ["slashing"],
    powerBonus: 2,
    tags: ["long", "sweeping 2"],
  },
  "gore": {
    damageTypes: ["piercing"],
    powerBonus: 2,
  },
  "light crossbow": {
    damageTypes: ["piercing"],
  },
  "mace": {
    damageTypes: ["bludgeoning"],
    powerBonus: 2,
  },
  "ram": {
    damageTypes: ["bludgeoning"],
    tags: ["forceful"],
  },
  "slam": {
    damageTypes: ["bludgeoning"],
    powerBonus: 2,
  },
  "smallsword": {
    accuracyBonus: 2,
    powerBonus: -2,
    damageTypes: ["slashing"],
  },
  "spear": {
    damageTypes: ["piercing"],
  },
  "tentacle": {
    damageTypes: ["bludgeoning"],
    powerBonus: 2,
  },
  "talon": {
    accuracyBonus: 1,
    damageTypes: ["piercing", "slashing"],
    powerBonus: -2,
  },
  "stinger": {
    damageTypes: ["piercing"],
    powerBonus: 2,
  },
};
