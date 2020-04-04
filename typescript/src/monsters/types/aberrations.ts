import { addType, TypelessMonsterInput } from "./add_type";

const aberrationInput: TypelessMonsterInput[] = [];

const abolethLevel = 12;
aberrationInput.push({
  // TODO: add ritual casting
  armorInputs: [{ name: "carapace" }],
  attackInputs: [
    {
      crit: `
          The aboleth can spend an action point to attune to this ability.
          If it does, the target is dominated by the aboleth as long as the ability lasts.
          Otherwise, the target takes double the damage of a non-critical hit.
        `,
      damageTypes: [],
      defense: "mental",
      hit: "The target takes $damage and is \\glossterm{confused} as a \\glossterm{condition}.",
      name: "Mind Crush",
      source: "magical",
      target: "One creature within \\rnglong range",
    },
    {
      damageTypes: ["energy"],
      defense: "mental",
      name: "Psionic Blast",
      hit: "Each target takes $damage and is \\glossterm{dazed} as a \\glossterm{condition}.",
      target: "Each enemy in a \\arealarge cone from the aboleth",
    },
  ],
  challengeRating: 4,
  description: `
    The aboleth is a revolting fishlike amphibian found primarily in subterranean lakes and rivers.
    It has a pink belly.
    Four pulsating blueblack orifices line the bottom of its body and secrete gray slime that smells like rancid grease.
    It uses its tail for propulsion in the water and drags itself along with its tentacles on land.
  `,
  languages: ["Aquan", "Undercommon"],
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
    {
      // TODO: this was originally a disease, but disease trigger times are less well defined
      description: `
        Whenever a creature is \\glossterm{wounded} by the aboleth's tentacle,
          the damaged creature becomes \\glossterm{poisoned} by aboleth slime.
        The creature is \\glossterm{sickened} as long as it remains poisoned.
        On a third hit, the creature gains a \\glossterm{vital wound}.

        Instead of making a \\glossterm{vital roll} for the \\glossterm{vital wound},
          the target's skin is transformed into a clear, slimy membrane.
        Every 5 minutes, an afflicted creature must be moistened with cool, fresh water
          or it will lose a \\glossterm{hit point}.
        This effect lasts until the \\glossterm{vital wound} is removed.
      `,
      name: "Slime",
    },
  ],
  resistanceBonuses: {
    energy: abolethLevel,
  },
  size: "huge",
  startingAttributes: { str: 4, dex: -1, con: 4, int: 3, per: 1, wil: 4 },
  weaponInput: [{ name: "tentacle" }],
  weight: "6,500 pounds",
});

aberrationInput.push({
  armorInputs: [{ name: "carapace" }],
  attackInputs: [
    {
      crit: "Each target is \\glossterm{confused} as a \\glossterm{condition}.",
      defense: "mental",
      hit: "Each target is \\glossterm{dazed} as a \\glossterm{condition}.",
      name: "Confusing Gaze",
      source: "magical",
      target: "Each creature within a \\areamed cone",
    },
  ],
  challengeRating: 2,
  description: `
    An umber hulk is a massive insectoid creature with bulging compound eyes that it uses to
    confuse nearby creatures. Umber hulks are simple-minded and easily manipulated.
  `,
  level: 12,
  name: "Umber Hulk",
  size: "gargantuan",
  startingAttributes: { str: 4, dex: 0, con: 3, int: -3, per: 0, wil: -3 },
});

export const aberrations = addType("aberration", aberrationInput);
