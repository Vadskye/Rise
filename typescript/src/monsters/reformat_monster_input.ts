import { Armor } from "@src/armor";
import { attributesAtLevel } from "@src/calculate/attributes_at_level";
import { skillModifierByName } from "@src/calculate/skill_modifier_by_name";
import { attributes } from "@src/data/attributes";
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
  size?: Creature.Size;
  skillPoints?: Partial<Creature.Skills>;
  startingAttributes?: Partial<Creature.Attributes>;
  weapons?: Weapon[];
}

interface MonsterCalculatedValues {
  attributes: Creature.Attributes;
  skills: Creature.Skills;
}

export type MonsterBase = MonsterRequiredInput &
  Required<MonsterOptionalInput> &
  MonsterCalculatedValues;

export type MonsterInput = MonsterRequiredInput & MonsterOptionalInput;

const monsterDefaults: Required<
  Omit<MonsterOptionalInput, "startingAttributes" | "skillPoints">
> & {
  startingAttributes: Creature.Attributes;
  skillPoints: Creature.Skills;
} = {
  armor: [],
  challengeRating: 1,
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
  const attributeModifiers = attributesAtLevel({ level: monsterInput.level, startingAttributes });
  const skillPoints = Object.assign({}, monsterDefaults.skillPoints, monsterInput.skillPoints);
  const skillModifiers = calculateSkills(attributeModifiers, skillPoints, monsterInput);
  return {
    ...monsterInput,
    ...monsterDefaults,
    attributes: attributeModifiers,
    skills: skillModifiers,
  };
}
