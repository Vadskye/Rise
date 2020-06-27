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
    weaponInput: [{ name: "greataxe" }, { name: "light crossbow" }],
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
];

const lizardfolkBase = {
  description: `
    Lizardfolk are bipedal creatures covered in reptilian scales.
    Their tail resembles that of a crocodile, and is typically 3 to 4 feet long.
    They use it for balance on land and to accelerate their swimming while in water.
    Their scales are typically green, gray, or brown.

    Lizardfolk fight as unorganized individuals.
    They prefer frontal assaults and massed rushes, sometimes trying to force foes into the water, where the lizardfolk have an advantage.
    If outnumbered or if their territory is being invaded, they set snares, plan ambushes, and make raids to hinder enemy supplies.
    Advanced tribes use more sophisticated tactics and have better traps and ambushes.
  `,
  height: "6-7 feet",
  languages: ["Draconic"],
  weight: "200-250 pounds",
};

humanoidInput.push({
  ...lizardfolkBase,
  armorInputs: [{ name: "breastplate" }, { name: "hide" }, { name: "standard shield" }],
  resistanceBonuses: { physical: 4 },
  level: 10,
  name: "Lizardfolk, Grunt",
  passiveAbilities: [
    {
      description: "A lizardfolk can hold its breath for ten times the normal length of time.",
      name: "Hold Breath",
    },
  ],
  startingAttributes: { str: 2, con: 2 },
  weaponInput: [{ name: "spear" }],
});
humanoidInput.push({
  ...lizardfolkBase,
  armorInputs: [{ name: "breastplate" }, { name: "hide" }, { name: "standard shield" }],
  challengeRating: 2,
  passiveAbilities: [
    {
      description: "A lizardfolk can hold its breath for ten times the normal length of time.",
      name: "Hold Breath",
    },
  ],
  resistanceBonuses: { physical: 4 },
  level: 10,
  name: "Lizardfolk, Elite",
  startingAttributes: { str: 3, con: 2 },
  weaponInput: [{ damageTypes: ["piercing"], name: "spear" }],
});

export const humanoids = addType("humanoid", humanoidInput);
