import { addType, TypelessMonsterInput } from "./add_type";

export const humanoidInput: TypelessMonsterInput[] = [
  {
    armorInputs: [{ name: "breastplate" }],
    attackInputs: [
      {
        accuracyBonus: -2,
        powerBonus: 4,
        name: "Power Smash",
        weaponName: "greataxe",
      },
    ],
    description: `
      Elite orcs are battle-hardened war veterans who are deadly at any range.
      They tend to prioritize raw strength over subtlety.
    `,
    languages: ["Orc"],
    level: 8,
    name: "Orc, Elite",
    resistanceBonuses: { physical: 3 },
    startingAttributes: { str: 4, con: 2, int: -2, wil: -1 },
    weaponInput: [{ name: "light crossbow" }, { name: "greataxe" }],
  },
  {
    attackInputs: [{ name: "drain life" }],
    description: `
      Cultists may serve many masters.
      They are united in their generally malign intentions and their magical abilities.
    `,
    level: 2,
    name: "Cultist",
    startingAttributes: { str: -1, int: -1, wil: 2 },
    weaponInput: [{ name: "club" }],
  },
  {
    attackInputs: [{ name: "combustion", powerBonus: 2 }, { name: "fireball" }],
    description: `
      Pyromancers wield powerful fire magic to attack their foes.
    `,
    // TODO: passive abilities
    level: 5,
    name: "Pyromancer",
    startingAttributes: { str: -1, con: 1, int: -1, wil: 2 },
    weaponInput: [{ name: "club" }],
  },
  {
    armorInputs: [{ name: "breastplate" }, { name: "hide" }, { name: "heavy shield" }],
    description: `
      Lizardfolk are usually 6 to 7 feet tall with green, gray, or brown scales.
      Their tail is used for balance and is 3 to 4 feet long.
      They can weigh from 200 to 250 pounds.
    `,
    languages: ["Draconic"],
    resistanceBonuses: { physical: 4 },
    level: 10,
    name: "Lizardfolk, Grunt",
    passiveAbilities: [
      {
        description: "A lizardfolk can hold its breath for ten times the normal length of time",
        name: "Hold Breath",
      },
    ],
    startingAttributes: { str: 2, con: 2 },
    weaponInput: [{ name: "spear" }],
  },
  {
    armorInputs: [{ name: "breastplate" }, { name: "hide" }, { name: "heavy shield" }],
    challengeRating: 2,
    description: `
      Lizardfolk are usually 6 to 7 feet tall with green, gray, or brown scales.
      Their tail is used for balance and is 3 to 4 feet long.
      They can weigh from 200 to 250 pounds.

      Lizardfolk fight as unorganized individuals.
      They prefer frontal assaults and massed rushes, sometimes trying to force foes into the water, where the lizardfolk have an advantage.
      If outnumbered or if their territory is being invaded, they set snares, plan ambushes, and make raids to hinder enemy supplies.
      Advanced tribes use more sophisticated tactics and have better traps and ambushes.
    `,
    passiveAbilities: [
      {
        description: "A lizardfolk can hold its breath for ten times the normal length of time",
        name: "Hold Breath",
      },
    ],
    resistanceBonuses: { physical: 4 },
    level: 10,
    name: "Lizardfolk, Elite",
    startingAttributes: { str: 3, con: 2 },
    weaponInput: [{ damageTypes: ["piercing"], name: "spear" }],
  },
];

export const humanoids = addType("humanoid", humanoidInput);
