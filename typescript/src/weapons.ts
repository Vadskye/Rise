import { DamageType } from "@src/data";

interface StandardWeaponInput {
  name: StandardWeaponName;
}

interface CustomWeaponInput {
  accuracyBonus?: number;
  damageBonus?: number;
  damageTypes: DamageType[];
  name: string;
}

export type WeaponInput = StandardWeaponInput | CustomWeaponInput;

export type Weapon = Required<WeaponInput>;

export function parseWeaponInput(input: WeaponInput): Weapon {
  return {
    accuracyBonus: 0,
    damageBonus: 0,
    ...(isStandardWeaponName(input.name) && standardWeapons[input.name]),
    ...input,
  };
}

// This is somewhat cumbersome to write, but it ensure that we specify a damage type for any
// intentionally custom weapons. For the foreseeable future, it's likely that any "custom" weapon is
// actually just a missing standard weapon, so it's worth the duplication.
type StandardWeaponName = "bite" | "greatsword" | "longsword" | "short sword";

function isStandardWeaponName(name: StandardWeaponName | string): name is StandardWeaponName {
  return Boolean(standardWeapons[name as StandardWeaponName]);
}

const standardWeapons: Record<StandardWeaponName, Omit<WeaponInput, "name">> = {
  "bite": {
    damageTypes: ["bludgeoning", "slashing"],
  },
  "greatsword": {
    damageBonus: 1,
    damageTypes: ["slashing"],
  },
  "longsword": {
    damageTypes: ["slashing"],
  },
  "short sword": {
    damageBonus: -1,
    damageTypes: ["slashing"],
  },
};
