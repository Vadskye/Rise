import { addType, TypelessMonsterInput } from "./add_type";

export const monstrousHumanoidInput: TypelessMonsterInput[] = [
  {
    armorInputs: [{ name: "breastplate" }],
    attackInputs: [
      {
        name: "Sweeping Smash",
        hit: "Each target takes $damage.",
        target: "Up to three creatures or objects within \\glossterm{reach}",
        weaponName: "greatclub",
      },
    ],
    challengeRating: 2,
    description: `
      Giants relish melee combat.
      They favor massive two-handed weapons and wield them with impressive skill.
      They have enough cunning to soften up a foe with ranged attacks first, if they can.
      A giant's favorite ranged weapon is a big rock.
    `,
    resistanceBonuses: { physical: 4 },
    languages: ["Giant"],
    level: 11,
    name: "Giant, Hill",
    size: "huge",
    startingAttributes: { str: 5, dex: -2, con: 3, per: -2, wil: -2 },
    // TODO: mark attacks as sweeping
    weaponInput: [{ name: "greatclub" }, { name: "boulder" }],
  },
];

export const monstrousHumanoids = addType("monstrous humanoid", monstrousHumanoidInput);
