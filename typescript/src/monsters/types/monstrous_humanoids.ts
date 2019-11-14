import { addType, TypelessMonsterInput } from "./add_type";

export const monstrousHumanoidInput: TypelessMonsterInput[] = [
  {
    armorInputs: [{ name: "breastplate" }],
    challengeRating: 2,
    resistanceBonuses: { physical: 4 },
    level: 11,
    name: "Giant, Hill",
    size: "huge",
    startingAttributes: { str: 6, dex: -2, con: 3, per: -2, wil: -2 },
    weaponInput: [{ name: "greatclub" }],
  },
];

export const monstrousHumanoids = addType("monstrous humanoid", monstrousHumanoidInput);
