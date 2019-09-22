import { addType, TypelessMonsterInput } from "./add_type";

export const humanoidInput: TypelessMonsterInput[] = [
  {
    attackInputs: [
      {
        accuracyBonus: -2,
        powerBonus: 4,
        name: "Power Smash",
        weaponName: "greataxe",
      },
    ],
    level: 8,
    name: "Orc elite",
    resistanceBonuses: { physical: 3 },
    startingAttributes: { str: 3 },
    weaponInput: [{ name: "greataxe" }],
  },
  {
    attackInputs: [
      {
        // TODO: Should this be explicitly marked as 'untyped'?
        damageTypes: [],
        defense: "fortitude",
        effect: "TODO",
        name: "Inflict Wounds",
        powerBonus: 2,
        source: "magical",
        target: "One creature within \\rngmed range",
      },
    ],
    activeAbilityInputs: [
      {
        effect: `
          You move the target up to 50 feet in any direction.
          You cannot change the direction of the movement partway through.
          Moving the target upwards costs twice the normal movement cost.
        `,
        name: "Propulsion",
        target: "Yourself or one Large or smaller \\glossterm{ally} in \\rngclose range",
        source: "magical",
      },
    ],
    level: 2,
    name: "Cultist",
    startingAttributes: { str: -1, int: -1, wil: 2 },
    weaponInput: [{ name: "club" }],
  },
  {
    attackInputs: [{ name: "fireball" }],
    // TODO: passive abilities
    level: 2,
    name: "Pyromancer",
    startingAttributes: { str: -1, con: 1, int: -1, wil: 2 },
    weaponInput: [{ name: "club" }],
  },
];

export const humanoids = addType("humanoid", humanoidInput);
