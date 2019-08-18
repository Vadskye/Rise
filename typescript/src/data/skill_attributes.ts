export const skillAttributes: Record<keyof Creature.Skills, keyof Creature.Attributes | null> = {
  // Strength
  "climb": "str",
  "jump": "str",
  "swim": "str",

  // Dexterity
  "acrobatics": "dex",
  "escape artist": "dex",
  "ride": "dex",
  "sleight of hand": "dex",
  "stealth": "dex",

  // Constitution has no skills

  // Intelligence
  "craft": "int",
  "deduction": "int",
  "devices": "int",
  "disguise": "int",
  "heal": "int",
  "knowledge": "int",
  "linguistics": "int",

  // Perception
  "awareness": "per",
  "creature handling": "per",
  "sense motive": "per",
  "spellcraft": "per",
  "survival": "per",

  // Willpower has no skills

  // Other skills
  "bluff": null,
  // Intimidate is sort of "any", but let's ignore that for now to simplify
  "intimidate": null,
  "perform": null,
  "persuasion": null,
};
