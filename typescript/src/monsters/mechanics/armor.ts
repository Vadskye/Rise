import { DamageType, damageTypes, DefenseType, defenseTypes } from "@src/data";
import { fromPairs } from "@src/util/from_pairs";

interface StandardArmorInput {
  name: StandardArmorName;
}

interface CustomArmorInput {
  defenseBonuses: Partial<Record<DefenseType, number>>;
  resistanceBonuses: Partial<Record<DamageType, number>>;
  name: string;
}

export type ArmorInput = StandardArmorInput | CustomArmorInput;

export interface Armor {
  defenseBonuses: Record<DefenseType, number>;
  name: string;
  resistanceBonuses: Record<DamageType, number>;
}

export function parseArmorInput(input: ArmorInput): Armor {
  const armorDefenseBonuses: Record<DefenseType, number> = Object.assign(
    {},
    fromPairs(defenseTypes.map((d) => [d, 0])),
    isStandardArmorInput(input) ? standardArmors[input.name].defenseBonuses : input.defenseBonuses,
  );
  const armorResistanceBonuses: Record<DamageType, number> = Object.assign(
    {},
    fromPairs(damageTypes.map((r) => [r, 0])),
    isStandardArmorInput(input)
      ? standardArmors[input.name].resistanceBonuses
      : input.resistanceBonuses,
  );
  return {
    defenseBonuses: armorDefenseBonuses,
    name: input.name,
    resistanceBonuses: armorResistanceBonuses,
  };
}

// This is somewhat cumbersome to write, but it ensure that we specify a damage type for any
// intentionally custom armor. For the foreseeable future, it's likely that any "custom" weapon is
// actually just a missing standard weapon, so it's worth the duplication.
export type StandardArmorName =
  | "breastplate"
  | "full plate"
  | "standard shield"
  | "hide"
  | "scales"
  | "fur"
  | "feathers"
  | "carapace"
  | "leather"
  | "studded leather"
  | "reinforced"
  | "double reinforced"
  | "thick skin";

export function isStandardArmorInput(input: ArmorInput): input is StandardArmorInput {
  return Boolean(standardArmors[(input as StandardArmorInput).name]);
}

// Monster-type armors give higher bonuses than seemingly equivalent body armor because monsters
// don't generally have access to shields.
// Conventions:
// * Manufactured armor doesn't provide energy resistances
// * Natural armor that is part of the body (fur, skin, etc.) provides equal energy/physical resists
// * Unusual natural armor (carapace) may provide unbalanced energy/physical resists
// * Natural armor that conflicts with body armor (scales, carapace) have unusually high armor
// defense bonuses
export const standardArmors: Record<StandardArmorName, Omit<CustomArmorInput, "name">> = {
  "full plate": {
    defenseBonuses: { armor: 4 },
    resistanceBonuses: {},
    // resistanceBonuses: { energy: 3, physical: 6 },
  },
  "standard shield": {
    defenseBonuses: { armor: 2 },
    resistanceBonuses: {},
  },
  "breastplate": {
    defenseBonuses: { armor: 3 },
    resistanceBonuses: {},
    // resistanceBonuses: { energy: 2, physical: 4 },
  },
  // Conflicts with body armor; equivalent to hide
  "fur": {
    defenseBonuses: { armor: 3 },
    resistanceBonuses: {},
    // resistanceBonuses: { energy: 3, physical: 3 },
  },
  // Conflicts with body armor; equivalent to breastplate
  "scales": {
    defenseBonuses: { armor: 3 },
    resistanceBonuses: {},
    // resistanceBonuses: { energy: 4, physical: 4 },
  },
  "hide": {
    defenseBonuses: { armor: 3 },
    resistanceBonuses: {},
    // resistanceBonuses: { energy: 2, physical: 2 },
  },
  "feathers": {
    defenseBonuses: { armor: 2 },
    resistanceBonuses: {},
    // resistanceBonuses: { energy: 1, physical: 1 },
  },
  // Conflicts with body armor; equivalent to full plate
  "carapace": {
    defenseBonuses: { armor: 4 },
    resistanceBonuses: {},
    // resistanceBonuses: { energy: 3, physical: 6 },
  },
  "thick skin": {
    defenseBonuses: { armor: 1 },
    resistanceBonuses: {},
    // resistanceBonuses: { energy: 3, physical: 3 },
  },
  "reinforced": {
    defenseBonuses: {},
    resistanceBonuses: {},
    // resistanceBonuses: { energy: 1, physical: 1 },
  },
  "double reinforced": {
    defenseBonuses: {},
    resistanceBonuses: {},
    // resistanceBonuses: { energy: 2, physical: 2 },
  },
  "leather": {
    defenseBonuses: { armor: 2 },
    resistanceBonuses: {},
    // resistanceBonuses: { energy: 2, physical: 0 },
  },
  "studded leather": {
    defenseBonuses: { armor: 2 },
    resistanceBonuses: {},
    // resistanceBonuses: { energy: 2, physical: 1 },
  },
};
