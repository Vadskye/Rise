import { addType, TypelessMonsterInput } from "./add_type";

export const outsiderInput: TypelessMonsterInput[] = [
  {
    armorInputs: [{ name: "outsider skin" }],
    challengeRating: 2,
    description: `
      An astral deva is about 7-1/2 feet tall and weighs about 250 pounds.
    `,
    languages: ["Celestial", "Common", "Draconic", "Infernal"],
    level: 14,
    resistanceBonuses: { energy: 14 },
    name: "astral deva",
    // TODO: fly speed
    speed: 40,
    startingAttributes: { str: 3, dex: 2, con: 2, int: 2, per: 2, wil: 3 },
    weaponInput: [{ name: "heavy mace" }],
  },
];

export const outsiders = addType("outsider", outsiderInput);
