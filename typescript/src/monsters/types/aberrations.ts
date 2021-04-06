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
      hit: "The target is \\confused as a \\glossterm{condition}.",
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
        "Each target takes $damage. Any target that loses \\glossterm{hit points} from this damage is \\dazed as a \\glossterm{condition}.",
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
        The creature is \\sickened as long as it remains poisoned.
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

aberrationInput.push({
  // Required
  alignment: "Always true neutral",
  armorInputs: [],
  knowledge: {
    0: `
      A gibbering mouther is a horrible creature seemingly drawn from a lunatic's nightmares.
      They are named for their tendency for speak gibberish to baffle the minds of their prey.
      It is about 3 feet across and 3 to 4 feet high, and weighs about 200 pounds.
    `,
    5: `
      Although gibbering mouthers are not intelligent enough to be actively evil, they thirst after bodily fluids and seem to prefer the blood of intelligent creatures.
      They speak their gibberish in Common, but cannot understand it.
    `,
  },
  level: 4,
  name: "gibbering mouther",
  size: "medium",
  startingAttributes: { str: 0, dex: 1, con: 4, int: -6, per: 1, wil: 0 },
  weaponInput: [{ name: "bite", powerMultiplier: 0.5, tags: ["sweeping 1"] }],

  // Optional
  attackInputs: [
    {
      crit: `
        The target is is \\confused until the end of the next round.
      `,
      defense: "mental",
      hit: `
        If the target is at its maximum \\glossterm{hit points}, it is \\dazed until the end of the next round.
        Otherwise, it is \\confused until the end of the next round.
      `,
      name: "Gibber",
      preface: "The $name can use this ability as a \\glossterm{minor action}.",
      // source: "magical",
      target: "All creatures within a \\areamed radius from the $name",
    },
  ],
  challengeRating: 4,
  // delayedCalculations: [],
  // description: "",
  languages: ["Common"],
  passiveAbilities: [
    {
      description: `
        A $name has many mouths.
        It can make two bite attacks as a single standard action.
        In addition, its bite attacks have the Sweeping (1) tag.
      `,
      name: "Many-Mouthed",
    },
  ],
  // skillPoints: {},
  // speeds: {},
});

export const aberrations = addType("aberration", aberrationInput);
