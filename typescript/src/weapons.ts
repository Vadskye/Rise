import { DamageType } from "@src/data";

interface StandardWeaponInput {
  name: StandardWeaponName;
}

interface CustomWeaponInput {
  accuracyBonus?: number;
  damageTypes: DamageType[];
  effect?: string | null;
  name: string;
  source?: "magical" | "mundane";
  powerBonus?: number;
}

export type WeaponInput = StandardWeaponInput | CustomWeaponInput;

export type Weapon = Required<CustomWeaponInput>;

export function parseWeaponInput(input: WeaponInput): Weapon {
  return {
    accuracyBonus: 0,
    damageTypes: [],
    effect: null,
    powerBonus: 0,
    source: "mundane",
    ...(isStandardWeaponName(input.name) && standardWeapons[input.name]),
    ...input,
  };
}

// This is somewhat cumbersome to write, but it ensure that we specify a damage type for any
// intentionally custom weapons. For the foreseeable future, it's likely that any "custom" weapon is
// actually just a missing standard weapon, so it's worth the duplication.
type StandardWeaponName = "bite" | "greataxe" | "greatsword" | "longsword" | "short sword";

function isStandardWeaponName(name: StandardWeaponName | string): name is StandardWeaponName {
  return Boolean(standardWeapons[name as StandardWeaponName]);
}

const standardWeapons: Record<StandardWeaponName, Omit<CustomWeaponInput, "name">> = {
  "bite": {
    damageTypes: ["bludgeoning", "slashing"],
  },
  "greataxe": {
    powerBonus: 2,
    damageTypes: ["slashing"],
  },
  "greatsword": {
    powerBonus: 2,
    damageTypes: ["slashing"],
  },
  "longsword": {
    damageTypes: ["slashing"],
  },
  "short sword": {
    powerBonus: -2,
    damageTypes: ["slashing"],
  },
};
