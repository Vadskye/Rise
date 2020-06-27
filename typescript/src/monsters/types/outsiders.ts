import { addType, TypelessMonsterInput } from "./add_type";

export const outsiderInput: TypelessMonsterInput[] = [
  {
    armorInputs: [{ name: "thick skin" }],
    challengeRating: 2,
    description: `
      A deva is a powerful celestial creature that acts as a champion of good in the Outer Planes.
    `,
    height: "7-1/2 feet",
    languages: ["Celestial", "Common", "Draconic", "Infernal"],
    level: 14,
    name: "Deva",
    resistanceBonuses: { energy: 14 },
    speeds: { fly: 40, land: 40 },
    startingAttributes: { str: 3, dex: 2, con: 2, int: 2, per: 2, wil: 3 },
    weaponInput: [{ name: "greatmace" }],
    weight: "250",
  },
];

export const outsiders = addType("outsider", outsiderInput);
