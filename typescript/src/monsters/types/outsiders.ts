import { addType, TypelessMonsterInput } from "./add_type";

export const outsiderInput: TypelessMonsterInput[] = [
  {
    armorInputs: [{ name: "outsider skin" }],
    challengeRating: 2,
    description: `
      A deva is a powerful celestial creature that acts as a champion of good in the Outer Planes.
    `,
    height: "7-1/2 feet",
    languages: ["Celestial", "Common", "Draconic", "Infernal"],
    level: 14,
    name: "Deva",
    resistanceBonuses: { energy: 14 },
    speed: 40,
    startingAttributes: { str: 3, dex: 2, con: 2, int: 2, per: 2, wil: 3 },
    // TODO: fly speed
    // +2 power for two-handing the mace
    weaponInput: [{ name: "mace", powerBonus: 2 }],
    weight: "250",
  },
];

export const outsiders = addType("outsider", outsiderInput);
