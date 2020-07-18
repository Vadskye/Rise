import { addType, TypelessMonsterInput } from "./add_type";

export const outsiderInput: TypelessMonsterInput[] = [
  {
    description: `
      Angels are divine beings native to the good-aligned Outer Planes.
      All angels have a striking and highly memorable appearance that evokes strong emotions in most viewers.
      Most angels evoke an overpowering sense of awe and beauty, but individual angels may have highly varied appearances.
    `,
    name: "Angels",
    monsters: [
      {
        alignment: "Always good",
        armorInputs: [{ name: "thick skin" }],
        challengeRating: 4,
        description: `
         An astral deva is about 7 1/2 feet tall and weighs about 250 pounds.
        `,
        height: "7-1/2 feet",
        languages: ["Celestial", "Common", "Draconic", "Infernal"],
        level: 12,
        name: "Deva",
        resistanceBonuses: { energy: 14 },
        speeds: { fly: 40, land: 40 },
        startingAttributes: { str: 3, dex: 2, con: 2, int: 2, per: 2, wil: 3 },
        weaponInput: [{ name: "greatmace" }],
        weight: "250",
      },
      {
        alignment: "Always good",
        armorInputs: [{ name: "thick skin" }],
        challengeRating: 4,
        description: `
         An astral deva is about 7 1/2 feet tall and weighs about 250 pounds.
        `,
        height: "7-1/2 feet",
        languages: ["Celestial", "Common", "Draconic", "Infernal"],
        level: 16,
        name: "Planetar",
        resistanceBonuses: { energy: 14 },
        speeds: { fly: 40, land: 40 },
        startingAttributes: { str: 3, dex: 2, con: 2, int: 2, per: 2, wil: 3 },
        weaponInput: [{ name: "greatmace" }],
        weight: "250",
      },
      {
        alignment: "Always good",
        armorInputs: [{ name: "thick skin" }],
        challengeRating: 4,
        description: `
         A planetar is nearly 9 feet tall and weighs about 500 pounds.
        `,
        height: "7-1/2 feet",
        languages: ["Celestial", "Common", "Draconic", "Infernal"],
        level: 16,
        name: "Planetar",
        resistanceBonuses: { energy: 14 },
        speeds: { fly: 40, land: 40 },
        startingAttributes: { str: 3, dex: 2, con: 2, int: 2, per: 2, wil: 3 },
        weaponInput: [{ name: "greatmace" }],
        weight: "250",
      },
    ],
  },
];

export const outsiders = addType("outsider", outsiderInput);
