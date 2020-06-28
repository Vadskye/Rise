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
        target: "One Medium or smaller creature or object within \\reach",
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
];

export const magicalBeasts = addType("magical beast", magicalBeastInput);
