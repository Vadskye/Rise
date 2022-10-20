import { MysticSphere } from ".";

export const toxicology: MysticSphere = {
  name: "Toxicology",
  shortDescription: "Create and manipulate poisons, acids, and fungi.",
  sources: ["arcane", "nature", "pact"],

  cantrips: [
    {
      name: "Intensify Poison",

      attack: {
        crit: `As above, except that the poison progresses by two stages instead of one.`,
        hit: `Choose a poison affecting the target.
        The poison progresses by one stage against the target, which can have varying effects depending on the poison (see \\pcref{Poison}).`,
        targeting: `
        Make an attack vs. Fortitude with a +4 \\glossterm{accuracy} bonus against one living creature within \\medrange.
        If the target is not currently poisoned, this ability has no effect.
        `,
      },
      scaling: "accuracy",
    },

    {
      name: "Neutralize Poison",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\shortrange.
        The target gains an additional success to resist a poison currently affecting it (see \\pcref{Poison}).
      `,
      scaling: {
        2: `The number of additional successes increases to two.
            The target can split these successes among any number of different poisons affecting it.`,
        4: `The number of additional successes increases to three.`,
        6: `The range increases to \\medrange.`,
      },
    },
  ],
  spells: [
    {
      name: "Corrosive Grasp",

      attack: {
        hit: `The target takes 1d8 + \\glossterm{power} acid damage.`,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything adjacent to you.
        `,
      },
      rank: 1,
      scaling: "damage",
    },

    {
      name: "Greater Corrosive Grasp",

      attack: {
        hit: `
          The target takes 2d6 + \\glossterm{power} acid damage.
          If it loses \\glossterm{hit points} from this damage, it becomes coated in acid as a \\glossterm{condition}.
          It takes 1d10 + half \\glossterm{power} acid damage immediately and during each of your subsequent actions.

          The condition can be removed if the target makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{move action} to scrape off the acid.
          Dropping \\prone as part of this action gives a +5 bonus to this check.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything adjacent to you.
        `,
      },
      rank: 3,
      scaling: "damage",
    },

    {
      name: "Supreme Corrosive Grasp",

      functionsLike: {
        name: 'greater corrosive grasp',
        exceptThat: `
          the initial damage increases to 4d8 + \\glossterm{power}, and the subsequent damage increases to 4d6 + half \\glossterm{power}.
          In addition, the condition cannot be removed with a Dexterity check.
        `,
      },
      rank: 7,
      scaling: "damage",
    },

    {
      name: "Poison -- Asp Venom",

      attack: {
        crit: `Double damage, and if the target becomes poisoned, it immediately reaches the second \\glossterm{poison stage}.`,
        hit: `
          The target takes 1d6 acid damage.
          If it loses \\glossterm{hit points} from this damage, it becomes \\glossterm{poisoned} by asp venom (see \\pcref{Poison}).
          The stage 1 effect makes the target \\stunned while the poison lasts.
          The stage 3 effect makes the target \\blinded while the poison lasts.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      tags: ["Manifestation"],
    },

    {
      name: "Poison -- Giant Wasp Venom",

      attack: {
        crit: `Double damage, and if the target becomes poisoned, it immediately reaches the second \\glossterm{poison stage}.`,
        hit: `
          The target takes 1d6 acid damage.
          If it loses \\glossterm{hit points} from this damage, it becomes \\glossterm{poisoned} by giant wasp venom (see \\pcref{Poison}).
          The stage 1 effect makes the target \\slowed while the poison lasts.
          The stage 3 effect makes the target \\immobilized while the poison lasts.
        `,
        targeting: `
          Make an attack vs. Fortitude with a +1 accuracy bonus against one living creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      tags: ["Manifestation"],
    },

    {
      name: "Poison -- Black Adder Venom",

      attack: {
        crit: `Double damage, and if the target becomes poisoned, it immediately reaches the second \\glossterm{poison stage}.`,
        hit: `
          The target takes 1d6 acid damage.
          If it loses \\glossterm{hit points} from this damage, it becomes \\glossterm{poisoned} by black adder venom (see \\pcref{Poison}).
          The stage 1 effect inflicts 2d6 + half \\glossterm{power} damage each time the poison's attack succeeds.
        `,
        targeting: `
          Make an attack vs. Fortitude with a +1 accuracy bonus against one living creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      tags: ["Manifestation"],
    },

    {
      name: "Poison -- Wyvern Venom",

      attack: {
        crit: `Double damage, and if the target becomes poisoned, it immediately reaches the second \\glossterm{poison stage}.`,
        hit: `
          The target takes 1d10 acid damage.
          If it loses \\glossterm{hit points} from this damage, it becomes \\glossterm{poisoned} by wyvern venom (see \\pcref{Poison}).
          The stage 1 effect inflicts 2d8 + \\glossterm{power} damage each time the poison's attack succeeds.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Poison -- Blood Leech Venom",

      attack: {
        crit: `Double damage, and if the target becomes poisoned, it immediately reaches the second \\glossterm{poison stage}.`,
        hit: `
          The target takes 2d8 acid damage.
          If it loses \\glossterm{hit points} from this damage, it becomes \\glossterm{poisoned} by blood leech venom (see \\pcref{Poison}).
          The stage 1 effect makes the target \\vulnerable to all damage while the poison lasts.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      tags: ["Manifestation"],
    },

    {
      name: "Poison -- Cockatrice Venom",

      attack: {
        crit: `Double damage, and if the target becomes poisoned, it immediately reaches the second \\glossterm{poison stage}.`,
        hit: `
          The target takes 2d8 acid damage.
          If it loses \\glossterm{hit points} from this damage, it becomes \\glossterm{poisoned} by cockatrice bile (see \\pcref{Poison}).
          The stage 1 effect makes the target \\slowed and \\stunned while the poison lasts.
          The stage 3 effect makes the target \\petrified while the poison lasts.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      tags: ["Manifestation"],
    },

    {
      name: "Poison -- Jellyfish Extract",

      attack: {
        crit: `The target immediately reaches the second \\glossterm{poison stage}, as normal for poisons.`,
        hit: `
          The target becomes \\glossterm{poisoned} with dragon bile (see \\pcref{Poison}).
          The stage 1 effect inflicts 1d4 + half \\glossterm{power} damage each time the poison's attack succeeds.
          The stage 3 effect also ends the poison.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },

      rank: 1,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Poison -- Dragon Bile",

      attack: {
        crit: `The target immediately reaches the second \\glossterm{poison stage}, as normal for poisons.`,
        hit: `
          The target becomes \\glossterm{poisoned} with dragon bile (see \\pcref{Poison}).
          The stage 1 effect inflicts 2d8 + half \\glossterm{power} damage each time the poison's attack succeeds.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },

      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Poison Transferance",

      attack: {
        crit: `As above, except that the primary target gains two successes to resist its poison.
        In addition, the secondary target immediately reaches the poison's second poison stage.`,
        // No glance effect; weird shenanigans if you autoremove the poison.
        hit: `The chosen creature gains an additional success to resist a poison currently affecting it.
        In addition, the struck creature becomes \\glossterm{poisoned} by that same poison, and immediately suffers the effect of the poison's first \\glossterm{poison stage}.`,
        targeting: `
          Choose yourself or one \\glossterm{ally} within \\medrange that is currently affected by a poison.
          In addition, make an attack vs. Fortitude against one other creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
    },

    {
      name: "Poison Immunity",

      effect: `
        You become \\glossterm{immune} to \\glossterm{poisons}.
      `,
      rank: 4,
      type: "Attune",
    },

    {
      name: "Acidic Blood",

      attack: {
        hit: `Each target takes 1d8 acid damage.`,
        targeting: `
          Once per round, when you lose \\glossterm{hit points} during the \\glossterm{action phase}, make a \\glossterm{reactive attack} vs. Reflex against everything adjacent to you.
        `,
      },
      narrative: `
        Your blood becomes acidic.
        This does not harm you, but your blood can be dangerous to anything nearby when you bleed.
      `,
      rank: 1,
      scaling: "damage",
      type: "Attune (deep)",
    },

    {
      name: "Greater Acidic Blood",

      attack: {
        hit: `Each target takes 4d6 acid damage.`,
        targeting: `
          Once per round, when you lose \\glossterm{hit points} during the \\glossterm{action phase}, make a \\glossterm{reactive attack} vs. Reflex against all \\glossterm{enemies} in a \\smallarea radius from you.
        `,
      },
      narrative: `
        Your blood becomes acidic.
        This does not harm you, but your blood can be dangerous to your enemies when you bleed.
      `,
      rank: 5,
      scaling: "damage",
      type: "Attune (deep)",
    },

    {
      name: "Sudden Rot",

      attack: {
        hit: `
          The target takes 2d6 + \\glossterm{power} acid damage.
          This damage is doubled if the target is an object that is not primarily made of metal.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      rank: 2,
      scaling: "damage",
      tags: [],
    },

    {
      name: 'Fungal Armor',

      effect: `
        You gain a +8 \\glossterm{magic bonus} to your \\glossterm{damage resistance}.
        However, you take a -4 penalty to your \\glossterm{hit points}.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +16, but the penalty increases to -8.`,
        5: `The bonus increases to +32, but the penalty increases to -16.`,
        7: `The bonus increases to +64, but the penalty increases to -32.`,
      },
      type: 'Attune',
    },

    {
      name: "Acid Bath",

      attack: {
        hit: `
          The target takes 4d6 + \\glossterm{power} acid damage.
          In addition, if the target is unconscious from vital wounds at the end of the current \\glossterm{phase}, it dies.
          Its body is completely dissolved by acid, leaving behind only a splash of black sludge.
          Its equipment is unaffected.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Greater Acid Bath",

      attack: {
        hit: `
          The target takes 6d10 + \\glossterm{power} acid damage.
          In addition, if the target is unconscious from vital wounds at the end of the current \\glossterm{phase}, it dies.
          Its body is completely dissolved by acid, leaving behind only a splash of black sludge.
          Its equipment is unaffected.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
        `,
      },
      rank: 7,
      tags: ["Manifestation"],
    },

    {
      name: "Acid Arrow",

      attack: {
        hit: `The target takes 2d6 + \\glossterm{power} acid damage.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\distrange.
        `,
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Greater Acid Arrow",

      attack: {
        hit: `The target takes 4d8 + \\glossterm{power} acid damage.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\extrange.
        `,
      },
      rank: 6,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Acid Breath",

      attack: {
        hit: `Each target takes 2d6 + half \\glossterm{power} acid damage.`,
        targeting: `
          For the duration of this spell, you can breathe acid like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything in a \\largearea cone from you.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Attune",
    },

    {
      name: "Greater Acid Breath",

      functionsLike: {
        name: 'acid breath',
        exceptThat: `
          the damage increases to 4d10 + half \\glossterm{power}.
          In addition, the area increases to a \\hugearea cone.
        `,
      },
      rank: 7,
      scaling: "damage",
      type: "Attune",
    },

    {
      name: "Corrosive Splash",

      attack: {
        hit: `The target takes 2d10 + \\glossterm{power} acid damage.
        This attack deals double damage to objects.`,
        targeting: `
        Make an attack vs. Fortitude against anything within \\medrange.
        `,
      },

      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Acid Rain",

      attack: {
        hit: `Each target takes 2d6 + half \\glossterm{power} acid damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\areasmall radius, 30 ft.\\ high cylinder within \\medrange.
        `,
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Greater Acid Rain",

      attack: {
        hit: `Each target takes 4d6 + half \\glossterm{power} acid damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\arealarge radius, 30 ft.\\ high cylinder within \\longrange.
        `,
      },
      rank: 7,
      tags: ["Manifestation"],
    },

    {
      name: "Acid Orb",

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} acid damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\areasmall radius within \\medrange.
        `,
      },
      rank: 3,
      scaling: "damage",
    },

    {
      name: "Greater Acid Orb",

      attack: {
        hit: `Each target takes 4d6 + half \\glossterm{power} acid damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\areamed radius within \\medrange.
        `,
      },
      rank: 6,
      scaling: "damage",
    },

    {
      name: "Healing Salve",

      effect: `
        Choose yourself or an adjacent living \\glossterm{ally}.
        The target regains 1d8 + \\glossterm{power} \\glossterm{hit points} and increases its \\glossterm{fatigue level} by one.
        In addition, it gains a +2 bonus to its Fortitude defense this round.
        This defense bonus is \\abilitytag{Swift}, but the recovery is not.
      `,
      rank: 1,
      scaling: { special: "The healing increases by +1d for each rank beyond 1." },
      tags: ['Swift (see text)'],
    },

    {
      name: "Greater Healing Salve",

      functionsLike: {
        name: "healing salve",
        exceptThat: "The healing increases to 2d10, and the Fortitude bonus increases to +3.",
      },
      rank: 4,
      scaling: { special: "The healing increases by +1d for each rank beyond 4." },
      tags: ['Swift (see text)'],
    },

    {
      name: "Supreme Healing Salve",

      functionsLike: {
        name: "healing salve",
        exceptThat: "The healing increases to 5d10, and the Fortitude bonus increases to +3.",
      },
      rank: 7,
      tags: ['Swift (see text)'],
    },

    {
      name: "Cleansing Draught",

      effect: `
        You or an adjacent \\glossterm{ally} can remove a \\glossterm{condition}.
        This cannot remove an effect applied during the current round.
      `,
      rank: 4,
      scaling: {
        6: `The target can remove two conditions.`,
      },
    },
    {
      name: "Fungal Growth",

      attack: {
        crit: `The damage from the condition is doubled.`,
        hit: `The target becomes covered in devouring fungus as a \\glossterm{condition}.
        It takes 1d6 + half \\glossterm{power} acid damage immediately and during each of your subsequent actions.

        The condition can be removed if the target makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{move action} to scrape off the fungus.
        Dropping \\prone as part of this action gives a +5 bonus to this check.`,
        targeting: `
          Make an attack vs. Reflex against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: "damage",
    },
    {
      name: "Greater Fungal Growth",

      attack: {
        crit: `The damage from the condition is doubled.`,
        hit: `
          The target becomes covered in devouring fungus as a \\glossterm{condition}.
          It takes 2d8 + half \\glossterm{power} acid damage immediately and during each of your subsequent actions.
        `,
        targeting: `
          Make an attack vs. Reflex against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "damage",
    },
  ],
  rituals: [],
};
