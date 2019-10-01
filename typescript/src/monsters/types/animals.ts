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
  {
    armorInputs: [{ name: "fur" }],
    challengeRating: 2,
    level: 5,
    name: "Dire Wolf",
    size: "large",
    startingAttributes: { str: 4, dex: 3, con: 2, int: -7, per: 2 },
    weaponInput: [{ name: "bite" }],
  },
  {
    armorInputs: [{ name: "feathers" }],
    level: 1,
    name: "raven",
    size: "tiny",
    startingAttributes: { str: -8, dex: 3, con: -4, int: -6, per: 2 },
    weaponInput: [{ name: "talon" }],
  },
  {
    armorInputs: [{ name: "carapace" }],
    challengeRating: 2,
    level: 6,
    name: "Giant Wasp",
    size: "large",
    startingAttributes: { str: 1, dex: 4, con: 1, int: -8, per: 2, wil: -2 },
    weaponInput: [{ name: "stinger" }],
    passiveAbilities: [
      {
        description: `
        Whenever a creature takes damage from the giant wasp's stinger, the damaged creature becomes \\glossterm{poisoned}.
        The poison's primary effect makes the target \\glossterm{sickened}, and the terminal effect makes it \\glossterm{paralyzed}.
      `,
        name: "Poison Sting",
      },
    ],
  },
  {
    armorInputs: [{ name: "carapace" }],
    challengeRating: 2,
    level: 7,
    name: "Dire Beetle",
    size: "large",
    startingAttributes: { str: 4, dex: -1, con: 4, int: -9 },
    weaponInput: [{ name: "bite" }],
  },
];

const baseCentipede = {
  armorInputs: [{ name: "carapace" as const }],
  challengeRating: 4,
  weaponInput: [{ name: "bite" as const }],
};
animalInput.push({
  ...baseCentipede,
  level: 4,
  name: "Large Centipede",
  size: "large",
  startingAttributes: { str: 2, dex: -1, con: 2, int: -9 },
});
animalInput.push({
  ...baseCentipede,
  level: 7,
  name: "Huge Centipede",
  size: "huge",
  startingAttributes: { str: 3, dex: -1, con: 3, int: -9 },
});
animalInput.push({
  ...baseCentipede,
  level: 10,
  name: "Gargantuan Centipede",
  size: "gargantuan",
  startingAttributes: { str: 4, dex: -1, con: 4, int: -9 },
});
animalInput.push({
  ...baseCentipede,
  level: 13,
  name: "Colossal Centipede",
  size: "colossal",
  startingAttributes: { str: 5, dex: -1, con: 5, int: -9 },
});

const spiderBase = {
  armorInputs: [{ name: "carapace" as const }],
  challengeRating: 4,
  passiveAbilities: [
    {
      description: `
        Whenever a creature takes damage from the spider's bite,
          the damaged creature becomes \\glossterm{poisoned}.
        The poison's primary effect makes the target \\glossterm{sickened},
          and the terminal effect makes it \\glossterm{paralyzed}.
      `,
      name: "Poison Sting",
    },
  ],
  weaponInput: [{ name: "bite" as const }],
};
animalInput.push({
  ...spiderBase,
  level: 3,
  name: "Spider, Large",
  size: "large",
  startingAttributes: { str: 1, dex: 3, int: -9, per: 2 },
});
animalInput.push({
  ...spiderBase,
  level: 6,
  name: "Spider, Huge",
  size: "huge",
  startingAttributes: { str: 2, dex: 3, int: -9, per: 3 },
});
animalInput.push({
  ...spiderBase,
  level: 9,
  name: "Spider, Gargantuan",
  size: "gargantuan",
  startingAttributes: { str: 3, dex: 4, int: -9, per: 3 },
});
animalInput.push({
  ...spiderBase,
  level: 12,
  name: "Spider, Colossal",
  size: "colossal",
  startingAttributes: { str: 4, dex: 4, int: -9, per: 4 },
});

export const animals = addType("animal", animalInput);
