import { addType, TypelessMonsterInput } from "./add_type";

const animateInput: TypelessMonsterInput[] = [];

const baseAirElemental = {
  // TODO: add fly speed
  // TODO: add whirlwind
  armorInputs: [{ name: "hide" as const }],
  attackInputs: [
    {
      hit: "Each target takes <damage>.",
      name: "Whirlwind",
      target: "Each \\glossterm{enemy} within reach",
      weaponName: "slam" as const,
    },
  ],
  challengeRating: 2,
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

export const animates = addType("animate", animateInput);
