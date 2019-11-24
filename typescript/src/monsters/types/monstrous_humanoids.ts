import { addType, TypelessMonsterInput } from "./add_type";

export const monstrousHumanoidInput: TypelessMonsterInput[] = [
  {
    armorInputs: [{ name: "breastplate" }],
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
    startingAttributes: { str: 6, dex: -2, con: 3, per: -2, wil: -2 },
    weaponInput: [{ name: "greatclub" }],
  },
];

export const monstrousHumanoids = addType("monstrous humanoid", monstrousHumanoidInput);
