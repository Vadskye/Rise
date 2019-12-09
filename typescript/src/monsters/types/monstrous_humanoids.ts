import { addType, TypelessMonsterInput } from "./add_type";

export const monstrousHumanoidInput: TypelessMonsterInput[] = [
  {
    armorInputs: [{ name: "breastplate" }, { name: "thick skin" }],
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
    languages: ["Giant"],
    level: 11,
    name: "Giant, Hill",
    size: "huge",
    startingAttributes: { str: 6, dex: -2, con: 3, per: -2, wil: -2 },
    weaponInput: [{ name: "greatclub" }, { name: "boulder" }],
  },
  {
    armorInputs: [{ name: "fur" }],
    challengeRating: 2,
    description: `
      Minotaurs are bull-headed creatures known for their poor sense of direction.
      They can be cunning in battle, but have a tendency to become trapped in dungeons of even moderate complexity.
    `,
    languages: [],
    level: 6,
    name: "Minotaur",
    size: "large",
    startingAttributes: { str: 4, dex: -1, con: 2, per: 0, wil: 1 },
    weaponInput: [{ name: "gore" }, { name: "ram" }],
  },
];

export const monstrousHumanoids = addType("monstrous humanoid", monstrousHumanoidInput);
