import { Armor } from "@src/armor";
import { attributesAtLevel } from "@src/calculate/attributes_at_level";
import { calculateHitPoints } from "@src/calculate/calculate_hit_points";
import { calculateResistances, Resistances } from "@src/calculate/calculate_resistances";
import { reachBySize } from "@src/calculate/reach_by_size";
import { skillModifierByName } from "@src/calculate/skill_modifier_by_name";
import { spaceBySize } from "@src/calculate/space_by_size";
import { speedBySize } from "@src/calculate/speed_by_size";
import { attributes } from "@src/data/attributes";
import { resistanceTypes } from "@src/data/resistance_types";
import { skills } from "@src/data/skills";
import { MonsterType } from "@src/monsters/types";
import { fromPairs } from "@src/util/from_pairs";
import { Weapon } from "@src/weapons";

interface MonsterRequiredInput {
  level: number;
  name: string;
  type: MonsterType;
}

interface MonsterOptionalInput {
  armor?: Armor[];
  challengeRating?: number;
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
  attributes: Creature.Attributes;
  hitPoints: number;
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
    "startingAttributes" | "skillPoints" | "resistanceBonuses" | keyof MonsterCalculatedValues
  >
> & {
  resistanceBonuses: Record<ResistanceType, number>;
  startingAttributes: Creature.Attributes;
  skillPoints: Creature.Skills;
} = {
  armor: [],
  challengeRating: 1,
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
    resistanceBonuses,
    startingAttributes,
    skillPoints,
  };

  const attributeModifiers = attributesAtLevel({ level: monster.level, startingAttributes });
  const skillModifiers = calculateSkills(attributeModifiers, skillPoints, monster);
  return {
    attributes: attributeModifiers,
    hitPoints: calculateHitPoints({ startingAttributes }),
    reach: reachBySize(monster.size),
    resistances: calculateResistances(monster),
    space: spaceBySize(monster.size),
    speed: speedBySize(monster.size),
    skills: skillModifiers,
    ...monster,
  };
}
