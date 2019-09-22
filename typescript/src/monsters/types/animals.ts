import { addType, TypelessMonsterInput } from "./add_type";

const animalInput: TypelessMonsterInput[] = [
  // Brown bear
  {
    level: 3,
    name: "Black bear",
    startingAttributes: { str: 3, con: 2, int: -8, wil: -1 },
    weaponInput: [{ name: "bite" }],
  },
  {
    challengeRating: 2,
    level: 5,
    name: "Brown bear",
    size: "large",
    startingAttributes: { str: 4, con: 2, int: -8, wil: -1 },
    weaponInput: [{ name: "bite" }],
  },
  {
    attackInputs: [{ name: "Strike", weaponName: "bite" }],
    level: 2,
    name: "Wolf",
    startingAttributes: { str: 1, dex: 2, con: 1, int: -7, wil: -1 },
    weaponInput: [{ name: "bite" }],
  },
  {
    level: 2,
    name: "Pony",
    startingAttributes: { str: 1, con: 3, int: -7, wil: -1 },
    weaponInput: [{ powerBonus: -2, name: "bite" }],
  },
  {
    challengeRating: 4,
    level: 9,
    name: "Roc",
    size: "gargantuan",
    startingAttributes: { str: 4, con: 3, int: -7, wil: -1 },
    weaponInput: [{ name: "bite" }],
  },
];

export const animals = addType("animal", animalInput);
