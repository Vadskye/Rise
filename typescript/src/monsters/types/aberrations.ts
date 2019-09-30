import { addType, TypelessMonsterInput } from "./add_type";

const aberrationInput: TypelessMonsterInput[] = [
  {
    // TODO: add psionic barrier that increases energy resistance
    armorInputs: [{ name: "tough hide" }],
    attackInputs: [
      {
        crit: `
          The aboleth can spend an action point to attune to this ability.
          If it does, the target is dominated by the aboleth as long as the ability lasts.
          Otherwise, the target takes double the damage of a non-critical hit.
        `,
        damageTypes: [],
        defense: "mental",
        hit: "The target takes <damage> and is \\glossterm{dazed} as a \\glossterm{condition}.",
        name: "Mind Crush",
        powerBonus: 4,
        source: "magical",
        target: "One creature within \\rnglong range",
      },
    ],
    level: 12,
    name: "Aboleth",
    size: "huge",
    startingAttributes: { str: 4, dex: -1, con: 3, int: 4, per: 2, wil: 4 },
    weaponInput: [{ name: "tentacle" }],
  },
];

export const aberrations = addType("aberration", aberrationInput);
