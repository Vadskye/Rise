export const skillAttributes: Record<keyof Creature.Skills, keyof Creature.Attributes | null> = {
  // Strength
  "climb": "str",
  "jump": "str",
  "swim": "str",

  // Dexterity
  "agility": "dex",
  "flexibility": "dex",
  "ride": "dex",
  "sleight of hand": "dex",
  "stealth": "dex",

  // Constitution
  "endurance": "con",

  // Intelligence
  "craft": "int",
  "deduction": "int",
  "devices": "int",
  "disguise": "int",
  "knowledge": "int",
  "linguistics": "int",
  "medicine": "int",

  // Perception
  "awareness": "per",
  "creature handling": "per",
  "social insight": "per",
  "survival": "per",

  // Willpower has no skills

  // Other skills
  "bluff": null,
  // Intimidate is sort of "any", but let's ignore that for now to simplify
  "intimidate": null,
  "perform": null,
  "persuasion": null,
};
