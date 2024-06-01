declare namespace Creature {
  type Attribute = "str" | "dex" | "con" | "int" | "per" | "wil";

  type Attributes = Record<Attribute, number | null>;

  type Skill =
    // Strength
    | "climb"
    | "jump"
    | "swim"

    // Dexterity
    | "agility"
    | "flexibility"
    | "ride"
    | "sleight of hand"
    | "stealth"

    // Constitution
    | "endurance"

    // Intelligence
    | "craft"
    | "deduction"
    | "devices"
    | "disguise"
    | "knowledge"
    | "medicine"

    // Perception
    | "awareness"
    | "creature handling"
    | "social insight"
    | "survival"

    // Willpower has no skills

    // Other skills
    | "bluff"
    | "intimidate"
    | "perform"
    | "persuasion";

  type Skills = Record<Skill, number | null>;

  type SkillPoints = Record<Skill, number>;

  type Size =
    | "fine"
    | "diminutive"
    | "tiny"
    | "small"
    | "medium"
    | "large"
    | "huge"
    | "gargantuan"
    | "colossal";
}
