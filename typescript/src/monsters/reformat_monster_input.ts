import { Armor } from "@src/armor";
import { attributesAtLevel } from "@src/calculate/attributes_at_level";
import { calculateAccuracy } from "@src/calculate/calculate_accuracy";
import { calculateDefenses } from "@src/calculate/calculate_defenses";
import { calculateHitPoints } from "@src/calculate/calculate_hit_points";
import { calculateMundanePower } from "@src/calculate/calculate_mundane_power";
import { calculateResistances, Resistances } from "@src/calculate/calculate_resistances";
import { reachBySize } from "@src/calculate/reach_by_size";
import { skillModifierByName } from "@src/calculate/skill_modifier_by_name";
import { spaceBySize } from "@src/calculate/space_by_size";
import { speedBySize } from "@src/calculate/speed_by_size";
import {
  attributes,
  DefenseType,
  defenseTypes,
  ResistanceType,
  resistanceTypes,
  skills,
} from "@src/data";
import { MonsterType } from "@src/monsters/types";
import { fromPairs } from "@src/util/from_pairs";
import { Weapon } from "@src/weapons";

interface MonsterRequiredInput {
  level: number;
  monsterType: MonsterType;
  name: string;
}

interface MonsterOptionalInput {
  armor?: Armor[];
  accuracyBonus?: number;
  challengeRating?: number;
  defenseBonuses?: Partial<Record<DefenseType, number>>;
  reach?: number;
  resistanceBonuses?: Partial<Record<ResistanceType, number>>;
  size?: Creature.Size;
  skillPoints?: Partial<Creature.Skills>;
  space?: number;
  speed?: number;
  startingAttributes?: Partial<Creature.Attributes>;
  weapons?: Weapon[];
}

interface MonsterCalculatedValues {
  accuracy: number;
  attributes: Creature.Attributes;
  defenses: Record<DefenseType, number>;
  defenseBonuses: Record<DefenseType, number>;
  hitPoints: number;
  mundanePower: number;
  reach: number;
  resistanceBonuses: Record<ResistanceType, number>;
  resistances: Resistances;
  skills: Creature.Skills;
  skillPoints: Creature.Skills;
  startingAttributes: Creature.Attributes;
  space: number;
  speed: number;
}

export type MonsterBase = MonsterRequiredInput &
  Required<MonsterOptionalInput> &
  MonsterCalculatedValues;

export type MonsterInput = MonsterRequiredInput & MonsterOptionalInput;

const monsterDefaults: Required<
  Omit<
    MonsterOptionalInput,
    | "defenseBonuses"
    | "startingAttributes"
    | "skillPoints"
    | "resistanceBonuses"
    | keyof MonsterCalculatedValues
  >
> & {
  defenseBonuses: Record<DefenseType, number>;
  resistanceBonuses: Record<ResistanceType, number>;
  startingAttributes: Creature.Attributes;
  skillPoints: Creature.Skills;
} = {
  accuracyBonus: 0,
  armor: [],
  challengeRating: 1,
  defenseBonuses: fromPairs(defenseTypes.map((d) => [d, 0])),
  resistanceBonuses: fromPairs(resistanceTypes.map((d) => [d, 0])),
  size: "medium",
  skillPoints: fromPairs(skills.map((s) => [s, 0])),
  startingAttributes: fromPairs(attributes.map((a) => [a, 0])),
  weapons: [],
};

function calculateSkills(
  attributes: Creature.Attributes,
  skillPoints: Creature.Skills,
  monsterInput: MonsterInput,
): Creature.Skills {
  const skillModifiers: Partial<Creature.Skills> = {};
  for (const skillName of skills) {
    skillModifiers[skillName] = skillModifierByName({
      attributes,
      level: monsterInput.level,
      name: skillName,
      skillPoints: skillPoints[skillName],
    });
  }
  return skillModifiers as Creature.Skills;
}

export function reformatMonsterInput(monsterInput: MonsterInput): MonsterBase {
  const defenseBonuses = Object.assign(
    {},
    monsterDefaults.defenseBonuses,
    monsterInput.defenseBonuses,
  );
  const startingAttributes = Object.assign(
    {},
    monsterDefaults.startingAttributes,
    monsterInput.startingAttributes,
  );
  const skillPoints = Object.assign({}, monsterDefaults.skillPoints, monsterInput.skillPoints);
  const resistanceBonuses = Object.assign(
    {},
    monsterDefaults.resistanceBonuses,
    monsterInput.resistanceBonuses,
  );
  const monster = {
    ...monsterDefaults,
    ...monsterInput,
    defenseBonuses,
    resistanceBonuses,
    startingAttributes,
    skillPoints,
  };

  const attributeModifiers = attributesAtLevel({ level: monster.level, startingAttributes });
  return {
    accuracy: calculateAccuracy({ ...monster, attributes: attributeModifiers }),
    attributes: attributeModifiers,
    defenses: calculateDefenses(monster),
    hitPoints: calculateHitPoints(monster),
    mundanePower: calculateMundanePower({ ...monster, attributes: attributeModifiers }),
    reach: reachBySize(monster.size),
    resistances: calculateResistances(monster),
    space: spaceBySize(monster.size),
    speed: speedBySize(monster.size),
    skills: calculateSkills(attributeModifiers, skillPoints, monster),
    ...monster,
  };
}
