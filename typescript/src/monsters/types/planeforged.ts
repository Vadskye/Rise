import { addType, TypelessMonsterInput } from "./add_type";

export const planeforgedInput: TypelessMonsterInput[] = [];

const baseAirElemental = {
  // TODO: add fly speed
  // TODO: add whirlwind
  alignment: "Usually true neutral",
  armorInputs: [{ name: "hide" as const }],
  attackInputs: [
    {
      hit: "Each target takes $damage.",
      name: "Whirlwind",
      powerMultiplier: 0.5 as const,
      target: "Each \\glossterm{enemy} within reach",
      weaponName: "slam" as const,
    },
  ],
  challengeRating: 2 as const,
  knowledgeSkills: ["planes"],
  // TODO: give air elementals a unique description
  languages: ["Auran"],
  startingAttributes: { str: 1, dex: 4, con: 1, int: -2, per: 2 },
  weaponInput: [{ name: "slam" as const }],
};
planeforgedInput.push({
  knowledge: {
    0: `
      Air elementals are the embodiment of the natural element of air.
      Their rapid flying speed makes them useful on vast battlefields or in extended aerial combat.
    `,
  },
  knowledgeSkills: ["planes"],
  level: 5,
  name: "Air Elementals",
  monsters: [
    {
      ...baseAirElemental,
      level: 5,
      name: "Large Air Elemental",
      size: "large",
    },
    {
      ...baseAirElemental,
      level: 8,
      name: "Huge Air Elemental",
      size: "huge",
    },
    {
      ...baseAirElemental,
      challengeRating: 4,
      level: 11,
      name: "Elder Air Elemental",
      size: "huge",
      startingAttributes: { str: 1, dex: 6, con: 1, int: 0, per: 3 },
    },
  ],
});

export const planeforged = addType("planeforged", planeforgedInput);
