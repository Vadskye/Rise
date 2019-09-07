declare namespace Creature {
  interface Attributes {
    str: number;
    dex: number;
    con: number;
    int: number;
    per: number;
    wil: number;
  }

  interface Skills {
    // Strength
    climb: number;
    jump: number;
    swim: number;

    // Dexterity
    acrobatics: number;
    "escape artist": number;
    ride: number;
    "sleight of hand": number;
    stealth: number;

    // Constitution has no skills

    // Intelligence
    craft: number;
    deduction: number;
    devices: number;
    disguise: number;
    heal: number;
    knowledge: number;
    linguistics: number;

    // Perception
    awareness: number;
    "creature handling": number;
    "sense motive": number;
    spellcraft: number;
    survival: number;

    // Willpower has no skills

    // Other skills
    bluff: number;
    intimidate: number;
    perform: number;
    persuasion: number;
  }

  type Size =
    | "fine"
    | "diminuitive"
    | "tiny"
    | "small"
    | "medium"
    | "large"
    | "huge"
    | "gargantuan"
    | "colossal";
}
