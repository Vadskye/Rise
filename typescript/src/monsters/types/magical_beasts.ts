import { addType, TypelessMonsterInput } from "./add_type";

export const magicalBeastInput: TypelessMonsterInput[] = [
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "carapace" }],
    attackInputs: [
      {
        damageTypes: ["acid"],
        defense: "reflex",
        hit: "Each target takes $damage.",
        name: "Spit Acid",
        powerBonus: -2,
        source: "mundane",
        target: "Everything in a \\areamed line",
      },
      {
        // Accuracy bonus mimics size bonus from Shove and Str for accuracy
        accuracyBonus: 6,
        defense: "fortitude",
        hit: `The ankheg \\glossterm{pushes} the target up to 30 feet.
          It can move the same distance that it pushes the target.`,
        name: "Drag Prey",
        target: "One Medium or smaller creature or object within \\glossterm{reach}",
      },
    ],
    challengeRating: 2,
    description: `
      An ankheg is a burrowing monster with a taste for fresh meat. It has six legs, and some specimens are yellow rather than brown. It is about 10 feet long and weighs about 800 pounds.

      An ankheg burrows with legs and mandibles. A burrowing ankheg usually does not make a usable tunnel, but can construct a tunnel; it burrows at half speed when it does so. It often digs a winding tunnel up to 40 feet below the surface in the rich soil of forests or farmlands. The tunnel is 5 feet tall and wide, and usually 60 to 150 feet long.
    `,
    level: 5,
    passiveAbilities: [
      {
        name: "Darkvision (50 ft.)",
      },
      {
        name: "Tremorsense (50 ft.)",
      },
    ],
    name: "Ankheg",
    size: "large",
    speeds: {
      burrow: 20,
      land: 30,
    },
    skillPoints: { climb: 2, awareness: 1 },
    startingAttributes: { str: 4, dex: -1, con: 2, int: -8, wil: -2 },
    weaponInput: [{ damageTypes: ["piercing", "bludgeoning", "acid"], name: "bite" }],
    weight: "800 pounds",
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "thick skin" }],
    attackInputs: [
      {
        damageTypes: ["cold"],
        defense: "fortitude",
        name: "Crawling Darkness",
        powerBonus: -2,
        source: "magical",
        target: "Enemies in a \\areamed radius",
      },
      {
        damageTypes: ["cold"],
        defense: "reflex",
        name: "Dark Embrace",
        powerBonus: 2,
        source: "magical",
        target: "One enemy within \\reach",
      },
    ],
    challengeRating: 2,
    description: `
      A nightcrawler is a large worm imbued with umbramantic power.
      Its body is colored only in shades of gray.
      It is about 9 feet long and weighs about 700 pounds.
      Nightcrawlers move slowly, but they are surprisingly agile in combat.
      They can easily contort their body to avoid attacks or wrap around the defenses of foes.
    `,
    level: 7,
    name: "Nightcrawler",
    size: "large",
    skillPoints: { climb: 2, flexibility: 1 },
    speeds: {
      climb: 20,
      land: 20,
    },
    startingAttributes: { str: 1, dex: 3, con: 0, int: -8, per: 1, wil: 2 },
  },
  {
    alignment: "Always true neutral",
    armorInputs: [{ name: "thick skin" }],
    attackInputs: [
      {
        damageTypes: ["piercing"],
        defense: "reflex",
        hit: `
          The target takes $damage.
          In addition, if this attack also beats Fortitude defense, the target is \\glossterm{grappled} by the $name.
        `,
        name: "Impaling Tentacles",
        target: "One creature within \\glossterm{reach}",
        weaponName: "tentacle",
      },
    ],
    challengeRating: 2,
    description: `
      A hydra maggot is a large maggot-like creature that wriggles across the ground in search of food.
      Hydra maggots are named for the cluster of tentacles that sprout from their heads, which they use to grab foes.
      They are carnivorous, but are not picky, and will feast on rotting carcasses just as happily as they will feast on fresh meat.
    `,
    level: 7,
    name: "Hydra Maggot",
    size: "large",
    startingAttributes: { str: 1, dex: 3, int: -7, per: 2, wil: -1 },
    weaponInput: [{ name: "bite" }, { name: "tentacle" }],
  },
  {
    alignment: "Always neutral evil",
    armorInputs: [{ name: "thick skin" }],
    attackInputs: [
      {
        damageTypes: ["energy"],
        defense: "fortitude",
        hit: `
          The target takes $damage.
          If this attack \\glossterm{wounds} the target, the $name regains one lost hit point.
        `,
        name: "Leech Life",
        powerBonus: 4,
        source: "magical",
        target: "One living creature within \\glossterm{reach}",
      },
    ],
    challengeRating: 1,
    description: `
      A stygian leech is a worm-like creature that feeds on life energy.
      They have a rudimentary intelligence, and use their ability to crawl on walls and ceilings to drop on unsuspecting foes.
      They instinctively avoid feeding on other stygian leeches, but will otherwise attempt to drain the life from any living creatures, regardless of danger.
      Some non-living creatures, such as intelligent undead, gather stygian leeches to guard their homes, since the leeches ignore non-living creatures entirely unless severely provoked.
    `,
    level: 7,
    name: "Stygian Leech",
    skillPoints: { awareness: 1, climb: 2 },
    speeds: { climb: 30 },
    size: "medium",
    startingAttributes: { str: 0, dex: 2, con: 1, int: -5, wil: 3 },
    weaponInput: [{ name: "bite" }],
  },
];

export const magicalBeasts = addType("magical beast", magicalBeastInput);
