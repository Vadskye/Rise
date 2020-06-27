import { addType, TypelessMonsterInput } from "./add_type";

const animateInput: TypelessMonsterInput[] = [];

const baseAirElemental = {
  // TODO: add fly speed
  // TODO: add whirlwind
  armorInputs: [{ name: "hide" as const }],
  attackInputs: [
    {
      hit: "Each target takes $damage.",
      name: "Whirlwind",
      target: "Each \\glossterm{enemy} within reach",
      weaponName: "slam" as const,
    },
  ],
  challengeRating: 2 as const,
  description: `
    Air elementals are an embodiment of the natural element of air.
    Their rapid flying speed makes them useful on vast battlefields or in extended aerial combat.
  `,
  languages: ["Auran"],
  startingAttributes: { str: 1, dex: 4, con: 1, int: -2, per: 2 },
  weaponInput: [{ name: "slam" as const }],
};
animateInput.push({
  ...baseAirElemental,
  level: 5,
  name: "Air Elemental, Large",
  size: "large",
});
animateInput.push({
  ...baseAirElemental,
  level: 8,
  name: "Air Elemental, Huge",
  size: "huge",
});
animateInput.push({
  ...baseAirElemental,
  challengeRating: 4,
  level: 11,
  name: "Air Elemental, Elder",
  size: "huge",
  startingAttributes: { str: 1, dex: 5, con: 1, int: 0, per: 3 },
});

const baseAnimatedObject = {
  armorInputs: [{ name: "thick skin" as const }],
  description: `
    Animated objects come in all sizes, shapes, and colors. They owe their existence as creatures to magical effects.

    Animated objects fight only as directed by the animator. They follow orders without question and to the best of their abilities. Since they do not need to breathe and never tire, they can be extremely capable minions.
  `,
  startingAttributes: { int: null, per: 0, wil: -8 },
  // TODO: special abilities for each animated object shape
  weaponInput: [{ name: "slam" as const }],
};
animateInput.push({
  ...baseAnimatedObject,
  challengeRating: 0.5,
  level: 1,
  name: "Animated Object, Tiny",
  size: "tiny",
  startingAttributes: { ...baseAnimatedObject.startingAttributes, str: -4, dex: 4, con: -4 },
});
animateInput.push({
  ...baseAnimatedObject,
  challengeRating: 1,
  level: 1,
  name: "Animated Object, Small",
  size: "small",
  startingAttributes: { ...baseAnimatedObject.startingAttributes, str: -2, dex: 2, con: -2 },
});
animateInput.push({
  ...baseAnimatedObject,
  challengeRating: 2,
  level: 2,
  name: "Animated Object, Medium",
  size: "medium",
  startingAttributes: { ...baseAnimatedObject.startingAttributes, str: 0, dex: 0, con: 0 },
});
animateInput.push({
  ...baseAnimatedObject,
  challengeRating: 2,
  level: 4,
  name: "Animated Object, Large",
  size: "large",
  startingAttributes: { ...baseAnimatedObject.startingAttributes, str: 2, dex: 0, con: 2 },
});
animateInput.push({
  ...baseAnimatedObject,
  challengeRating: 2,
  level: 7,
  name: "Animated Object, Huge",
  size: "huge",
  startingAttributes: { ...baseAnimatedObject.startingAttributes, str: 3, dex: -1, con: 3 },
});
animateInput.push({
  ...baseAnimatedObject,
  challengeRating: 3,
  level: 9,
  name: "Animated Object, Gargantuan",
  size: "gargantuan",
  startingAttributes: { ...baseAnimatedObject.startingAttributes, str: 4, dex: -2, con: 4 },
});
animateInput.push({
  ...baseAnimatedObject,
  challengeRating: 3,
  level: 11,
  name: "Animated Object, Colossal",
  size: "gargantuan",
  startingAttributes: { ...baseAnimatedObject.startingAttributes, str: 5, dex: -3, con: 5 },
});

export const animates = addType("animate", animateInput);
