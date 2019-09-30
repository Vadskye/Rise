import { addType, TypelessMonsterInput } from "./add_type";

const aberrationInput: TypelessMonsterInput[] = [];

const abolethLevel = 12;
aberrationInput.push({
  // TODO: add psionic barrier that increases energy resistance
  // TODO: add ritual casting
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
      hit: "The target takes <damage> and is \\glossterm{confused} as a \\glossterm{condition}.",
      name: "Mind Crush",
      powerBonus: 4,
      source: "magical",
      target: "One creature within \\rnglong range",
    },
    {
      damageTypes: [],
      defense: "mental",
      name: "Psionic Blast",
      hit: "Each target takes <damage> and is \\glossterm{dazed} as a \\glossterm{condition}.",
      target: "Each enemy in a \\arealarge cone from the aboleth",
    },
  ],
  challengeRating: 4,
  level: abolethLevel,
  name: "Aboleth",
  passiveAbilities: [
    {
      description:
        "The aboleth gains a bonus equal to its level to \\glossterm{resistances} against \\glossterm{energy damage}.",
      name: "Psionic Barrier",
    },
    {
      description: "The aboleth can learn and perform arcane rituals of up to 5th level.",
      name: "Rituals",
    },
  ],
  resistanceBonuses: {
    energy: abolethLevel,
  },
  size: "huge",
  startingAttributes: { str: 4, dex: -1, con: 3, int: 4, per: 2, wil: 4 },
  weaponInput: [{ name: "tentacle" }],
});

export const aberrations = addType("aberration", aberrationInput);
