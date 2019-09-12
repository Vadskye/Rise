import { DamageType } from "@src/data";

export interface WeaponInput {
  accuracyBonus?: number;
  damageBonus?: number;
  damageTypes?: DamageType[];
  name: string;
}

export type Weapon = Required<WeaponInput>;

export function parseWeaponInput(input: WeaponInput): Weapon {
  return {
    accuracyBonus: 0,
    damageBonus: 0,
    damageTypes: [],
    ...standardWeapons[input.name],
    ...input,
  };
}

const standardWeapons: Record<string, Omit<WeaponInput, "name">> = {
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
