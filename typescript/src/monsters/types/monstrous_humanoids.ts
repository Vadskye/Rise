import { WeaponInput } from "@src/weapons";
import { addType, TypelessMonsterInput } from "./add_type";

const boulder: WeaponInput = {
  damageTypes: ["bludgeoning"],
  name: "boulder",
  powerBonus: 2,
  rangeIncrement: 100,
};

export const monstrousHumanoidInput: TypelessMonsterInput[] = [
  {
    alignment: "Usually chaotic evil",
    armorInputs: [{ name: "breastplate" }, { name: "thick skin" }],
    challengeRating: 3,
    description: `
      Skin color among hill giants ranges from light tan to deep ruddy brown. Their hair is brown or black, with eyes the same color. Hill giants wear layers of crudely prepared hides with the fur left on. They seldom wash or repair their garments, preferring to simply add more hides as their old ones wear out.

      Adults are about 15 feet tall. Hill giants can live to be 70 years old.
    `,
    languages: ["Giant"],
    level: 7,
    name: "Giant, Hill",
    passiveAbilities: [
      { name: "Massive Sweep", description: "A hill giant's greatclub has the Sweeping (2) tag." },
    ],
    size: "huge",
    startingAttributes: { str: 5, dex: -2, con: 3, int: -2, per: -2, wil: -2 },
    tactics: `
      Hill giants prefer to fight from high, rocky outcroppings, where they can pelt opponents with rocks and boulders while limiting the risk to themselves.
      They lack the intelligence or desire to retreat if their enemies survive to approach them, and prefer to draw their massive clubs and enter melee.
      If possible, they smash their foes off of cliffs.
    `,
    weaponInput: [{ name: "greatclub" }, boulder],
  },
  {
    alignment: "Usually true neutral",
    armorInputs: [{ name: "hide" }, { name: "thick skin" }],
    challengeRating: 3,
    description: `
      Stone giants prefer thick leather garments, dyed in shades of brown and gray to match the stone around them. Adults stand about 20 feet tall. Stone giants can live to be 300 years old.

      Young stone giants can be capricious, hunting tiny creatures like goats and humanoids on a whim.
      Elder stone giants tend to be wiser and more cautious, and avoid unnecessary conflict.
    `,
    languages: ["Common", "Giant"],
    level: 10,
    name: "Giant, Stone",
    passiveAbilities: [
      { name: "Massive Sweep", description: "A stone giant's greatclub has the Sweeping (2) tag." },
    ],
    size: "gargantuan",
    startingAttributes: { str: 7, dex: -1, con: 3, int: 0, per: 0, wil: -2 },
    tactics: `
      Stone giants fight from a great distance whenever possible, using their ability to hurl stones up to 1,000 feet.
    `,
    weaponInput: [{ name: "greatclub" }, { ...boulder, rangeIncrement: 200 }],
  },
  {
    alignment: "Usually chaotic evil",
    attackInputs: [
      {
        // Uses str for accuracy instead of per
        accuracyBonus: 2,
        defense: "fortitude",
        hit: `The target is knocked back 10 feet and takes $damage.`,
        name: "Forceful Shove",
        powerBonus: -6,
        preface: `
          For each size category larger or smaller than the target that the minotaur is, it gains a +4 bonus or penalty to \\glossterm{accuracy}.
        `,
        target: "As a ram strike",
        weaponName: "ram",
      },
    ],
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
