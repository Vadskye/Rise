import { DefenseType, defenseTypes, ResistanceType, resistanceTypes } from "@src/data";
import { fromPairs } from "@src/util/from_pairs";

interface StandardArmorInput {
  name: StandardArmorName;
}

interface CustomArmorInput {
  defenseBonuses: Partial<Record<DefenseType, number>>;
  resistanceBonuses: Partial<Record<ResistanceType, number>>;
  name: string;
}

export type ArmorInput = StandardArmorInput | CustomArmorInput;

export interface Armor {
  defenseBonuses: Record<DefenseType, number>;
  name: string;
  resistanceBonuses: Record<ResistanceType, number>;
}

export function parseArmorInput(input: ArmorInput): Armor {
  const armorDefenseBonuses: Record<DefenseType, number> = Object.assign(
    {},
    fromPairs(defenseTypes.map((d) => [d, 0])),
    isStandardArmorInput(input) ? standardArmors[input.name].defenseBonuses : input.defenseBonuses,
  );
  const armorResistanceBonuses: Record<ResistanceType, number> = Object.assign(
    {},
    fromPairs(resistanceTypes.map((r) => [r, 0])),
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
  | "heavy shield"
  | "hide"
  | "scales"
  | "fur"
  | "feathers"
  | "carapace";

export function isStandardArmorInput(input: ArmorInput): input is StandardArmorInput {
  return Boolean(standardArmors[(input as StandardArmorInput).name]);
}

// Monster-type armors give higher bonuses than seemingly equivalent body armor because monsters
// don't generally have access to shields
export const standardArmors: Record<StandardArmorName, Omit<CustomArmorInput, "name">> = {
  "full plate": {
    defenseBonuses: { armor: 4 },
    resistanceBonuses: { physical: 6 },
  },
  "heavy shield": {
    defenseBonuses: { armor: 2 },
    resistanceBonuses: {},
  },
  "breastplate": {
    defenseBonuses: { armor: 3 },
    resistanceBonuses: { physical: 4 },
  },
  "fur": {
    defenseBonuses: { armor: 3 },
    resistanceBonuses: { energy: 3, physical: 3 },
  },
  "scales": {
    defenseBonuses: { armor: 4 },
    resistanceBonuses: { energy: 2, physical: 4 },
  },
  "hide": {
    defenseBonuses: { armor: 3 },
    resistanceBonuses: { physical: 1 },
  },
  "feathers": {
    defenseBonuses: { armor: 3 },
    resistanceBonuses: {},
  },
  "carapace": {
    defenseBonuses: { armor: 4 },
    resistanceBonuses: { energy: 3, physical: 6 },
  },
};
