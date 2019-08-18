interface SkillModifierArgs {
  attribute: number;
  level: number;
  skillPoints: number;
}

export function skillModifier({ attribute, level, skillPoints }: SkillModifierArgs) {
  if (skillPoints === 0) {
    return Math.floor(attribute / 2);
  } else if (skillPoints === 1) {
    return Math.max(attribute, 1 + Math.floor(level / 2));
  } else {
    return Math.max(attribute + 4, level + 4);
  }
}
