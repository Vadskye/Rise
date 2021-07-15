import { CombatStyle } from ".";

export const penetratingPrecision: CombatStyle = {
  name: "Penetrating Precision",
  shortDescription: "Stab foes with carefully aimed piercing weapons.",

  maneuvers: [
    {
      name: "Penetrating Strike",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        The attack is made against each subject's Reflex defense instead of its Armor defense.
      `,
      rank: 1,
      scaling: {
        3: "You gain a +1 accuracy bonus with the strike.",
        5: "The accuracy bonus increases to +2.",
        7: "The accuracy bonus increases to +3.",
      },
      type: "Instant",
    },

    {
      name: "Desperate Pierce",

      effect: `
        Make a \\glossterm{strike}.
        If you miss, you can increase your \\glossterm{fatigue level} by one to reroll the attack with a +3 accuracy bonus.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
      `,
      rank: 1,
      scaling: {
        3: "You gain a +1 accuracy bonus with the strike.",
        5: "The accuracy bonus increases to +2.",
        7: "The accuracy bonus increases to +3.",
      },
      type: "Instant",
    },

    {
      name: "Injection",

      effect: `
        Make a \\glossterm{strike} with a -2d damage penalty using a piercing weapon.
        You gain a +4 accuracy bonus with contact-based and injury-based poisons delivered with the strike.
      `,
      rank: 1,
      scaling: {
        3: "The accuracy bonus increases to +5.",
        5: "The accuracy bonus increases to +6.",
        7: "The accuracy bonus increases to +7.",
      },
      type: "Instant",
    },

    {
      name: "Penetrating Shot",

      effect: `
        Make a ranged \\glossterm{strike} against everything in a \\medarealong, 5 ft. wide line from you.
        Your \\glossterm{power} with the strike is halved.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1d damage bonus with the strike.",
        7: "The damage bonus increases to +2d.",
      },
      type: "Instant",
    },

    {
      name: "Penetrating Longshot",

      effect: `
        Make a ranged \\glossterm{strike} against everything in a \\hugearealong, 5 ft. wide line from you.
        Your \\glossterm{power} with the strike is halved.
      `,
      rank: 5,
      scaling: {
        7: "You gain a +1d damage bonus with the strike.",
      },
      type: "Instant",
    },

    {
      name: "Distant Shot",

      effect: `
        Make a ranged \\glossterm{strike}.
        You reduce your \\glossterm{longshot penalty} with the strike by 2.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1 accuracy bonus with the strike.",
        7: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
    },

    {
      name: "Greater Distant Shot",

      effect: `
        Make a ranged \\glossterm{strike}.
        You reduce your \\glossterm{longshot penalty} with the strike by 4.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Lunge",

      effect: `
        Make a melee \\glossterm{strike} using a piercing weapon against everything in a 10 ft. long, 5 ft. wide line from you.
        The line must point directly away from you.
        Only one of the spaces in the line can be adjacent to you.
        Your \\glossterm{power} with the strike is halved.
      `,
      rank: 1,
      scaling: {
        3: "You gain a +1 accuracy bonus with the strike.",
        5: "The accuracy bonus increases to +2.",
        7: "The accuracy bonus increases to +3.",
      },
      type: "Instant",
    },

    {
      name: "Greater Lunge",

      effect: `
        Make a melee \\glossterm{strike} using a piercing weapon against everything in a 15 ft. long, 5 ft. wide line from you.
        The line must point directly away from you.
        Only one of the spaces in the line can be adjacent to you.
      `,
      rank: 4,
      scaling: {
        6: "You gain a +1 accuracy bonus with the strike.",
      },
      type: "Instant",
    },

    {
      name: "Deathblow",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        If you get a critical hit with the strike, you gain a damage bonus with the strike equal to your \\glossterm{power}.
        This bonus applies before applying any multipliers for the critical hit.
      `,
      // narrative: '',
      rank: 1,
      scaling: {
        3: "You gain a +1 accuracy bonus with the strike.",
        5: "The accuracy bonus increases to +2.",
        7: "The accuracy bonus increases to +3.",
      },
      type: "Instant",
    },

    {
      name: "Greater Deathblow",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        If you get a critical hit with the strike, you gain a damage bonus with the strike equal to twice your \\glossterm{power}.
        This bonus applies before applying any multipliers for the critical hit.
      `,
      // narrative: '',
      rank: 7,
      type: "Instant",
    },

    {
      name: "Arrowguide",

      effect: `
        Make a ranged \\glossterm{strike} with a -1d damage penalty using a piercing weapon.
        You \\glossterm{briefly} gain a +2 \\glossterm{accuracy} bonus with \\glossterm{strikes} against each creature damaged by that strike.
      `,
      rank: 2,
      scaling: {
        4: "The accuracy bonus increases to +3.",
        6: "The accuracy bonus increases to +4.",
      },
      type: "Instant",
    },

    {
      name: "Heartpiercing Strike",

      effect: `
        Make a \\glossterm{strike} with a +2d damage bonus using a piercing weapon.
        Each target that has any remaining \\glossterm{damage resistance} takes no damage from the strike.
      `,
      narrative: `
        You strike directly for your foe's heart, hoping its armor is too damaged to effectively deflect the blow.
      `,
      rank: 3,
      scaling: {
        5: "The damage bonus increases to +3d.",
        7: "The damage bonus increases to +4d.",
      },
      type: "Instant",
    },

    {
      name: "Eye Poke",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        You take a -1d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\dazzled as a \\glossterm{condition}.
      `,
      rank: 1,
      type: "Duration",
    },

    {
      name: "Greater Eye Poke",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\blinded as a \\glossterm{condition}.
      `,
      rank: 7,
      type: "Duration",
    },

    {
      name: "Eye Gouge",

      effect: `
        Make a \\glossterm{strike} with a -2d damage penalty using a piercing weapon.
        Each creature damaged by the strike is \\glossterm{briefly} \\dazzled.
      `,
      rank: 5,
      type: "Duration",
    },

    {
      name: "Groundspike",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\decelerated as a \\glossterm{condition}.
      `,
      rank: 3,
      type: "Duration",
    },

    {
      name: "Greater Groundspike",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\immobilized as a \\glossterm{condition}.
      `,
      rank: 7,
      type: "Duration",
    },

    {
      name: "Chargebreaker",

      effect: `
        Make a melee \\glossterm{strike} using a piercing weapon.
        You gain a +1d damage bonus with the strike if the target moved towards you during the movement phase.
      `,
      rank: 2,
      scaling: {
        4: "The damage bonus increases to +2d.",
        6: "The damage bonus increases to +3d.",
      },
      type: "Instant",
    },

    {
      name: "Called Shot",

      // +1 level for choice of debuff
      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike suffers your choice of one of the following effects as a \\glossterm{condition}: \\shaken by you, \\slowed, or \\sickened.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1 accuracy bonus with the strike.",
        6: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
    },

    {
      name: "Greater Called Shot",

      // +1 level for choice of debuff
      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike suffers your choice of one of the following effects as a \\glossterm{condition}: \\decelerated, \\frightened by you, or \\nauseated.
      `,
      rank: 6,
      type: "Instant",
    },
  ],
};
