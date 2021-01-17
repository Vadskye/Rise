import { damageTypes } from "@src/data";
import * as format from "@src/latex/format";
import { addType, TypelessMonsterInput } from "./add_type";

const aberrationInput: TypelessMonsterInput[] = [];

const abolethLevel = 12;
aberrationInput.push({
  alignment: "Usually lawful evil",
  // TODO: add ritual casting
  armorInputs: [{ name: "carapace" }],
  attackInputs: [
    {
      crit: `
        The aboleth can spend an attunement point to attune to this ability.
        If it does, the target is dominated by the aboleth as long as the ability lasts.
        Otherwise, the target takes double the damage of a non-critical hit.
      `,
      defense: "mental",
      hit: "The target is \\glossterm{confused} as a \\glossterm{condition}.",
      name: "Mind Control",
      preface: "An aboleth can use this ability as a \\glossterm{minor action}.",
      source: "magical",
      target: "One creature within \\rnglong range",
    },
    {
      baseDamageDie: "1d10",
      damageTypes: ["energy"],
      defense: "mental",
      name: "Mind Crush",
      hit: "The target takes $damage.",
      powerMultiplier: 1,
      preface: "An aboleth can use this ability as a \\glossterm{minor action}.",
      target: "One creature within \\rnglong range",
    },
    {
      baseDamageDie: "1d8",
      damageTypes: ["energy"],
      defense: "mental",
      name: "Psionic Blast",
      hit:
        "Each target takes $damage. Any target that loses \\glossterm{hit points} from this damage is \\glossterm{dazed} as a \\glossterm{condition}.",
      powerMultiplier: 0.5,
      preface: "An aboleth can use this ability as a \\glossterm{minor action}.",
      target: "Each enemy in a \\areamed cone from the aboleth",
    },
  ],
  challengeRating: 4,
  delayedCalculations: [
    (monster) => {
      for (const damageType of damageTypes) {
        monster.resistances[damageType] += Math.floor(monster.magicalPower / 2);
      }
    },
  ],
  knowledge: {
    "-10": `
      Legends speak of revolting water-dwelling creatures called aboleths that lurk in the deepest caves.
      They are said to have power over people's minds.
    `,
    "0": `
      An aboleth is a Huge fishlike creature found primarily in subterranean lakes and rivers.
      It has four tentacles and two vertically stacked eyes in the center of its ridged forehead.
      It uses its powerful mental abilities to overwhelm the minds of its foes.
    `,
    "5": `
      Four pulsating dark blue orifices line the bottom of an aboleth's body and secrete gray slime that smells like rancid grease.
      This slime coats its tentacles, and creatures struck by the tentacles can have their skin transformed into a similar slime.
      Aboleths are amphibious, and they are able to drag themselves along with their tentacles on land, though they are much faster in the water.
      A typical aboleth weighs about 6,500 pounds.
    `,
    "10": `
      Aboleths can completely dominate the minds of lesser creatures.
      They sometimes use their minions as agents to spy in cities or otherwise further their sinister goals.
    `,
  },
  languages: ["Aboleth", "Aquan", "Undercommon"],
  level: abolethLevel,
  name: "Aboleth",
  passiveAbilities: [
    {
      description: "1,200 ft.",
      name: "Telepathy",
    },
    {
      description: (monster) => `
        The aboleth is \\glossterm{attuned} to this ability.
        It gains a ${format.modifier(
          Math.floor(monster.magicalPower / 2),
        )} \\glossterm{magic bonus} to \\glossterm{resistances}.
      `,
      magical: true,
      name: "Psionic Barrier",
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
  size: "huge",
  speeds: { land: 10, swim: 50 },
  startingAttributes: { str: 3, dex: -1, con: 4, int: 3, per: 1, wil: 4 },
  weaponInput: [{ name: "tentacle" }],
});

export const aberrations = addType("aberration", aberrationInput);
