import { DamageType } from "@src/data";

interface StandardWeaponInput {
  name: StandardWeaponName;
}

interface CustomWeaponInput {
  accuracyBonus?: number;
  baseDamageDie: string;
  damageTypes: DamageType[];
  name: string;
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
    baseDamageDie: isStandardWeaponInput(input)
      ? standardWeapons[input.name].baseDamageDie
      : input.baseDamageDie,
    damageTypes: [],
    rangeIncrement: null,
    tags: [],
    ...(isStandardWeaponInput(input) && standardWeapons[input.name]),
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
  | "battleaxe"
  | "javelin"
  | "ram"
  | "smallsword"
  | "slam"
  | "spear"
  | "stinger"
  | "talon"
  | "tentacle";

export function isStandardWeaponInput(input: WeaponInput): input is StandardWeaponInput {
  return isStandardWeaponName(input.name);
}

export function isStandardWeaponName(
  name: StandardWeaponName | string | null | undefined,
): name is StandardWeaponName {
  return Boolean(standardWeapons[name as StandardWeaponName]);
}

export const standardWeapons: Record<StandardWeaponName, Omit<CustomWeaponInput, "name">> = {
  "bite": {
    baseDamageDie: "1d8",
    damageTypes: ["bludgeoning", "piercing"],
  },
  "claw": {
    accuracyBonus: 2,
    baseDamageDie: "1d6",
    damageTypes: ["slashing", "piercing"],
  },
  "club": {
    baseDamageDie: "1d8",
    damageTypes: ["bludgeoning"],
  },
  "constrict": {
    baseDamageDie: "1d10",
    damageTypes: ["bludgeoning"],
    tags: ["grappling"],
  },
  "greataxe": {
    baseDamageDie: "2d6",
    damageTypes: ["slashing"],
    tags: ["sweeping 1"],
  },
  "battleaxe": {
    baseDamageDie: "1d8",
    damageTypes: ["slashing"],
    tags: ["sweeping 1"],
  },
  "greatclub": {
    baseDamageDie: "2d6",
    damageTypes: ["bludgeoning"],
    tags: ["forceful"],
  },
  "greatmace": {
    baseDamageDie: "2d6",
    damageTypes: ["bludgeoning"],
    tags: ["impact"],
  },
  "greatsword": {
    baseDamageDie: "1d10",
    damageTypes: ["slashing"],
    tags: ["sweeping 2"],
  },
  "gore": {
    baseDamageDie: "1d8",
    damageTypes: ["piercing"],
    tags: ["impact"],
  },
  "light crossbow": {
    baseDamageDie: "1d8",
    damageTypes: ["piercing"],
    rangeIncrement: 60,
  },
  "javelin": {
    baseDamageDie: "1d6",
    damageTypes: ["piercing"],
    rangeIncrement: 30,
  },
  "mace": {
    baseDamageDie: "1d8",
    damageTypes: ["bludgeoning"],
  },
  "ram": {
    baseDamageDie: "1d8",
    damageTypes: ["bludgeoning"],
    tags: ["forceful"],
  },
  "slam": {
    baseDamageDie: "1d10",
    damageTypes: ["bludgeoning"],
  },
  "smallsword": {
    accuracyBonus: 2,
    baseDamageDie: "1d6",
    damageTypes: ["slashing"],
    tags: ["keen"],
  },
  "spear": {
    baseDamageDie: "1d8",
    damageTypes: ["piercing"],
  },
  "tentacle": {
    accuracyBonus: 1,
    baseDamageDie: "1d8",
    damageTypes: ["bludgeoning"],
  },
  "talon": {
    accuracyBonus: 2,
    baseDamageDie: "1d6",
    damageTypes: ["piercing", "slashing"],
  },
  "stinger": {
    accuracyBonus: 1,
    baseDamageDie: "1d8",
    damageTypes: ["piercing"],
  },
};
