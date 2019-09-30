import { addType, TypelessMonsterInput } from "./add_type";

const animalInput: TypelessMonsterInput[] = [
  {
    armorInputs: [{ name: "fur" }],
    challengeRating: 2,
    level: 3,
    name: "Black bear",
    startingAttributes: { str: 3, con: 3, int: -8, wil: -1 },
    weaponInput: [{ name: "bite" }],
  },
  {
    armorInputs: [{ name: "fur" }],
    challengeRating: 2,
    level: 5,
    name: "Brown bear",
    size: "large",
    startingAttributes: { str: 4, con: 4, int: -8, wil: -1 },
    weaponInput: [{ name: "bite" }],
  },
  {
    armorInputs: [{ name: "fur" }],
    level: 2,
    name: "Wolf",
    startingAttributes: { str: 1, dex: 2, con: 1, int: -7, wil: -1 },
    weaponInput: [{ name: "bite" }],
  },
  {
    armorInputs: [{ name: "thick skin" }],
    level: 2,
    name: "Pony",
    startingAttributes: { str: 1, con: 3, int: -7, wil: -1 },
    weaponInput: [{ powerBonus: -2, name: "bite" }],
  },
  {
    armorInputs: [{ name: "thick skin" }],
    challengeRating: 4,
    level: 9,
    name: "Roc",
    size: "gargantuan",
    startingAttributes: { str: 4, con: 3, int: -7, wil: -1 },
    weaponInput: [{ name: "bite" }],
  },
  {
    armorInputs: [{ name: "scales" }],
    challengeRating: 2,
    level: 6,
    name: "Vampire Eel",
    size: "large",
    startingAttributes: { str: 3, dex: 3, con: 2, int: -8, per: 0, wil: -1 },
  },
];

export const animals = addType("animal", animalInput);
