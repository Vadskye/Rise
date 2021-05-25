import { DefenseType, defenseTypes } from "@src/data";
import { fromPairs } from "@src/util/from_pairs";

interface StandardArmorInput {
  name: StandardArmorName;
}

interface CustomArmorInput {
  defenseBonuses: Partial<Record<DefenseType, number>>;
  drBonus: number;
  name: string;
}

export type ArmorInput = StandardArmorInput | CustomArmorInput;

export interface Armor {
  defenseBonuses: Record<DefenseType, number>;
  drBonus: number;
  name: string;
}

export function parseArmorInput(input: ArmorInput): Armor {
  const armorDefenseBonuses: Record<DefenseType, number> = Object.assign(
    {},
    fromPairs(defenseTypes.map((d) => [d, 0])),
    isStandardArmorInput(input) ? standardArmors[input.name].defenseBonuses : input.defenseBonuses,
  );
  const drBonus =isStandardArmorInput(input)
      ? standardArmors[input.name].drBonus
      : input.drBonus;
  return {
    defenseBonuses: armorDefenseBonuses,
    drBonus,
    name: input.name,
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
    drBonus: 0,
  },
  "standard shield": {
    defenseBonuses: { armor: 2 },
    drBonus: 0,
  },
  "breastplate": {
    defenseBonuses: { armor: 3 },
    drBonus: 0,
  },
  // Conflicts with body armor; equivalent to hide
  "fur": {
    defenseBonuses: { armor: 3 },
    drBonus: 0,
  },
  // Conflicts with body armor; equivalent to breastplate
  "scales": {
    defenseBonuses: { armor: 3 },
    drBonus: 0,
  },
  "hide": {
    defenseBonuses: { armor: 3 },
    drBonus: 0,
  },
  "feathers": {
    defenseBonuses: { armor: 2 },
    drBonus: 0,
  },
  // Conflicts with body armor; equivalent to full plate
  "carapace": {
    defenseBonuses: { armor: 4 },
    drBonus: 0,
  },
  "thick skin": {
    defenseBonuses: { armor: 2 },
    drBonus: 0,
  },
  "reinforced": {
    defenseBonuses: {},
    drBonus: 0,
  },
  "double reinforced": {
    defenseBonuses: {},
    drBonus: 0,
  },
  "leather": {
    defenseBonuses: { armor: 2 },
    drBonus: 0,
  },
  "studded leather": {
    defenseBonuses: { armor: 2 },
    drBonus: 0,
  },
};
