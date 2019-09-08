import { skillModifier } from "@src/calculate/skill_modifier";
import { skillAttributes } from "@src/data";

interface SkillModifierByNameArgs {
  attributes: Creature.Attributes;
  level: number;
  name: keyof Creature.Skills;
  skillPoints: number;
}

export function skillModifierByName({
  attributes,
  level,
  name,
  skillPoints,
}: SkillModifierByNameArgs): number {
  const attributeName = skillAttributes[name];
  const attribute = attributeName ? attributes[attributeName] : 0;

  return skillModifier({
    attribute,
    level,
    skillPoints,
  });
}
