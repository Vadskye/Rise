import { addType, TypelessMonsterInput } from "./add_type";

export const humanoidInput: TypelessMonsterInput[] = [
  {
    alignment: "Usually lawful evil",
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
    alignment: "Any",
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
  alignment: "Usually true neutral",
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

const baseOrc = {
  alignment: "Usually lawful evil",
  languages: ["Orc"],
};

humanoidInput.push({
  description: `
      Orcs are green-skinned humanoids that are generally larger, stronger, and less intelligent than humans.
      Most other humanoid races consider them ugly, though orcs would say the same about most other humanoid races.
      Orc hierarchy and status is almost always determined by power, and chieftains can be deposed at specific intervals in a personal trial by combat.

      Orcs have highly militaristic and regimented society that is divided into different clans, each of which is ruled by a powerful chieftain.
      They tend to be selfish, but they adhere strictly to the particular orcish interpretation of honorable combat.
      Honorable orc combat avoids sneak attacks or deception, allows enemies to surrender, and respects the distinction between civilians and combatants.
      However, honorable orc combat does not require a great deal of warning before battle is joined, and they have no concept of "dirty fighting" - orcs fight brutally and with no reservations in combat.
    `,
  name: "Orcs",
  monsters: [
    {
      ...baseOrc,
      armorInputs: [{ name: "studded leather" }],
      attackInputs: [
        {
          accuracyBonus: -2,
          powerBonus: 6,
          name: "Power Smash",
          weaponName: "greataxe",
        },
      ],
      challengeRating: 1,
      description: `
        Orc grunts are the standard warrior that orc clans field in battle.
      `,
      level: 2,
      name: "Grunt",
      startingAttributes: { str: 3, con: 1, int: -2, wil: -1 },
      weaponInput: [{ name: "greataxe" }],
    },
    {
      ...baseOrc,
      armorInputs: [{ name: "leather" }],
      challengeRating: 0.5,
      description: `
        Orc peons are the weakest warrior that orc clans field in battle.
        They have the lowest status of any adult in orc society.
      `,
      level: 1,
      name: "Peon",
      startingAttributes: { str: 2, con: 1, int: -2, wil: -1 },
      weaponInput: [{ name: "greataxe" }],
    },
    {
      ...baseOrc,
      armorInputs: [{ name: "breastplate" }, { name: "reinforced" }],
      attackInputs: [
        {
          accuracyBonus: -2,
          powerBonus: 6,
          name: "Power Smash",
          weaponName: "greataxe",
        },
        {
          accuracyBonus: -2,
          powerBonus: 6,
          name: "Power Shot",
          weaponName: "light crossbow",
        },
      ],
      challengeRating: 2,
      description: `
        Orc veterans are battle-hardened elite warriors who are deadly at any range.
        They often serve as bodyguards to orc chieftains or as devastating shock troops in battle.
      `,
      level: 6,
      name: "Veteran",
      startingAttributes: { str: 4, con: 2, int: -2, wil: -1 },
      weaponInput: [{ name: "greataxe" }, { name: "light crossbow" }],
    },
    {
      ...baseOrc,
      armorInputs: [{ name: "breastplate" }, { name: "double reinforced" }],
      attackInputs: [
        {
          accuracyBonus: -2,
          powerBonus: 6,
          name: "Power Smash",
          weaponName: "greataxe",
        },
        {
          accuracyBonus: -2,
          powerBonus: 6,
          name: "Power Shot",
          weaponName: "light crossbow",
        },
      ],
      challengeRating: 4,
      description: `
        Orc chieftains are the most powerful orc warriors.
        Even the lowest chieftain commands hundreds of powerful orc warriors, plus at least as many noncombatants.
      `,
      level: 8,
      name: "Veteran",
      startingAttributes: { str: 4, con: 2, int: -2, wil: -1 },
      weaponInput: [{ name: "greataxe" }, { name: "light crossbow" }],
    },
    {
      // TODO: define the orc god(s)
      ...baseOrc,
      activeAbilityInputs: [
        {
          effect: `
            The target regains one \\glossterm{hit point}.
          `,
          name: "Cure Wound",
          target: "One \\glossterm{ally} within \\rngmed range",
          tags: ["Focus"],
        },
      ],
      armorInputs: [{ name: "studded leather" }],
      attackInputs: [{ name: "drain life" }],
      challengeRating: 2,
      description: `
        Orc shamans provide orc squads with divine magical support.
      `,
      level: 2,
      name: "Shaman",
      startingAttributes: { str: 1, con: 0, int: -1, wil: 2 },
      weaponInput: [{ name: "battleaxe" }],
    },
  ],
});

export const humanoids = addType("humanoid", humanoidInput);
