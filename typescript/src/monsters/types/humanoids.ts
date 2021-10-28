import { addType, TypelessMonsterInput } from "./add_type";

export const humanoidInput: TypelessMonsterInput[] = [
  {
    alignment: "Usually lawful evil",
    attackInputs: [{ name: "drain life" }],
    knowledge: {
      0: `
        Cultists may serve many masters.
        They are united in their generally malign intentions and their magical abilities.
      `,
    },
    level: 2,
    name: "Cultist",
    startingAttributes: { str: -1, int: -1, wil: 2 },
    weaponInput: [{ name: "club" }],
  },
  {
    alignment: "Any",
    attackInputs: [{ name: "combustion" }, { name: "fireball" }],
    knowledge: {
      0: `
        Pyromancers wield powerful fire magic to attack their foes.
      `,
    },
    // TODO: passive abilities
    level: 5,
    name: "Pyromancer",
    startingAttributes: { str: -1, con: 1, int: -1, wil: 2 },
    weaponInput: [{ name: "club" }],
  },
];

const lizardfolkBase = {
  alignment: "Usually true neutral",
  passiveAbilities: [
    {
      description: "A lizardfolk can hold its breath for ten times the normal length of time.",
      name: "Hold Breath",
    },
  ],
  languages: ["Draconic"],
};

humanoidInput.push({
  knowledge: {
    0: `
      Lizardfolk are Medium bipedal creatures covered in reptilian scales.
      They are slightly taller and bulkier than humans, typically standing 6 to 7 feet tall and weighing up to 250 pounds.
      Their tail resembles that of a crocodile, and is typically 3 to 4 feet long.
      Their scales are typically green, gray, or brown.
      In battle, they typically fight as unorganized individuals.
    `,
    5: `
      Lizardfolk use their tail for balance on land and to accelerate their swimming while in water.
      They prefer frontal assaults and massed rushes in battle, sometimes trying to force foes into the water, where the lizardfolk have an advantage.
      If lizardfolk are outnumbered or if their territory is being invaded, they set snares, plan ambushes, and make raids to hinder enemy supplies.
      Advanced tribes use more sophisticated tactics and have better traps and ambushes.
    `,
  },
  level: 3,
  name: "Lizardfolk",
  monsters: [
    {
      ...lizardfolkBase,
      armorInputs: [{ name: "breastplate" }, { name: "hide" }, { name: "standard shield" }],
      level: 3,
      name: "Lizardfolk Grunt",
      startingAttributes: { str: 2, con: 2 },
      weaponInput: [{ name: "spear" }],
    },
    {
      ...lizardfolkBase,
      armorInputs: [{ name: "breastplate" }, { name: "hide" }, { name: "standard shield" }],
      challengeRating: 2,
      level: 4,
      name: "Lizardfolk Elite",
      startingAttributes: { str: 3, con: 2 },
      weaponInput: [{ damageTypes: ["piercing"], name: "spear" }],
    },
  ],
});

const baseOrc = {
  alignment: "Usually lawful evil",
  languages: ["Orc"],
};

humanoidInput.push({
  knowledge: {
    0: `
      Orcs are green-skinned humanoids that are generally larger, stronger, and less intelligent than humans.
      Most other humanoid races consider them ugly, though orcs would say the same about most other humanoid races.
      They tend to be selfish, but they adhere strictly to the particular orcish interpretation of honorable combat.
    `,
    5: `
      Honorable orc combat avoids sneak attacks or deception, allows enemies to surrender, and respects the distinction between civilians and combatants.
      However, honorable orc combat does not require a great deal of warning before battle is joined, and they have no concept of "dirty fighting" - orcs fight brutally and with no reservations in combat.

      Orcs have highly militaristic and regimented society that is divided into different clans, each of which is ruled by a powerful chieftain.
    `,
    10: `
      Orc hierarchy and status is almost always determined by power, and chieftains can be deposed at specific intervals in a personal trial by combat.
      You know the general patterns that determine when these personal trials by combat are permissible for local orc clans.
    `,
  },
  level: 1,
  name: "Orcs",
  monsters: [
    {
      ...baseOrc,
      armorInputs: [{ name: "studded leather" }],
      attackInputs: [
        {
          baseDamageDie: "2d10",
          accuracyBonus: -2,
          name: "Power Smash",
          powerMultiplier: 1,
          weaponName: "greataxe",
        },
      ],
      challengeRating: 1,
      knowledge: {
        0: `
          Orc grunts are the standard warrior that orc clans field in battle.
        `,
      },
      level: 2,
      name: "Orc Grunt",
      startingAttributes: { str: 3, con: 1, int: -2, wil: -1 },
      weaponInput: [{ name: "greataxe" }],
    },
    {
      ...baseOrc,
      armorInputs: [{ name: "leather" }],
      challengeRating: 0.5,
      knowledge: {
        0: `
          Orc peons are the weakest warrior that orc clans field in battle.
          They have the lowest status of any adult in orc society.
        `,
      },
      level: 1,
      name: "Orc Peon",
      startingAttributes: { str: 2, con: 1, int: -2, wil: -1 },
      weaponInput: [{ name: "greataxe" }],
    },
    {
      ...baseOrc,
      armorInputs: [{ name: "breastplate" }, { name: "reinforced" }],
      attackInputs: [
        {
          accuracyBonus: -2,
          baseDamageDie: "2d10",
          name: "Power Smash",
          powerMultiplier: 1,
          weaponName: "greataxe",
        },
        {
          accuracyBonus: -2,
          baseDamageDie: "2d6",
          name: "Power Shot",
          powerMultiplier: 1,
          weaponName: "light crossbow",
        },
      ],
      challengeRating: 2,
      knowledge: {
        0: `
          Orc veterans are battle-hardened elite warriors who are deadly at any range.
          They often serve as bodyguards to orc chieftains or as devastating shock troops in battle.
        `,
      },
      level: 6,
      name: "Orc Veteran",
      startingAttributes: { str: 4, con: 2, int: -2, wil: -1 },
      weaponInput: [{ name: "greataxe" }, { name: "light crossbow" }],
    },
    {
      ...baseOrc,
      armorInputs: [{ name: "breastplate" }, { name: "double reinforced" }],
      attackInputs: [
        {
          accuracyBonus: -2,
          baseDamageDie: "2d10",
          name: "Power Smash",
          powerMultiplier: 1,
          weaponName: "greataxe",
        },
        {
          accuracyBonus: -2,
          baseDamageDie: "2d6",
          name: "Power Shot",
          powerMultiplier: 1,
          weaponName: "light crossbow",
        },
      ],
      challengeRating: 4,
      knowledge: {
        0: `
          Orc chieftains are the most powerful orc warriors.
          Even the lowest chieftain commands hundreds of powerful orc warriors, plus at least as many noncombatants.
        `,
      },
      level: 8,
      name: "Orc Chieftain",
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
          source: "magical",
          target: "One \\glossterm{ally} within \\rngmed range",
          tags: [],
        },
      ],
      armorInputs: [{ name: "studded leather" }],
      attackInputs: [{ name: "drain life" }],
      challengeRating: 2,
      knowledge: {
        0: `
          Orc shamans provide orc squads with divine magical support.
        `,
      },
      level: 2,
      name: "Orc Shaman",
      startingAttributes: { str: 1, con: 0, int: -1, wil: 2 },
      weaponInput: [{ name: "battleaxe" }],
    },
  ],
});

export const humanoids = addType("humanoid", humanoidInput);
