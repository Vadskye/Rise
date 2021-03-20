import { CombatStyle } from ".";

export const penetratingPrecision: CombatStyle = {
  name: "Penetrating Precision",
  shortDescription: "Stab foes with carefully aimed piercing weapons.",
  sources: ["esoteric", "martial", "trick", "wild"],

  maneuvers: [
    {
      name: "Penetrating Strike",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        The attack is made against each subject's Reflex defense instead of its Armor defense.
        You take a -1d penalty to damage with the strike.
      `,
      rank: 1,
      type: "Instant",
    },

    {
      name: "Greater Penetrating Strike",

      effect: `
        Make a \\glossterm{strike} with a +2 bonus to \\glossterm{accuracy} using a piercing weapon.
        The attack is made against each subject's Reflex defense instead of its Armor defense.
        You take a -1d penalty to damage with the strike.
      `,

      rank: 5,
      type: "Instant",
    },

    {
      name: "Desperate Stab",

      effect: `
        Make a melee \\glossterm{strike}.
        Using the \\textit{desperate exertion} ability to affect this strike only costs one \\glossterm{fatigue point} instead of two.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Injection",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        You gain a +4 accuracy bonus with injury-based poisons delivered with the strike against each creature that loses \\glossterm{hit points} from the strike.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Greater Injection",

      effect: `
        Make a \\glossterm{strike} with a +2 \\glossterm{accuracy} bonus using a piercing weapon.
        You gain a +6 accuracy bonus with injury-based poisons delivered with the strike against each creature that loses \\glossterm{hit points} from the strike.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Penetrating Shot",

      effect: `
        Make a ranged \\glossterm{strike} against everything in a \\medarealong, 5 ft. wide line from you.
        Your \\glossterm{power} with the strike is halved.
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Greater Penetrating Shot",

      effect: `
        Make a ranged \\glossterm{strike} against everything in a \\largearealong, 5 ft. wide line from you.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Distant Shot",

      effect: `
        Make a ranged \\glossterm{strike}.
        You reduce your penalties for \\glossterm{range increments} by 2.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Greater Distant Shot",

      effect: `
        Make a ranged \\glossterm{strike}.
        You reduce your penalties for \\glossterm{range increments} by 3.
      `,
      rank: 4,
      type: "Instant",
    },

    {
      name: "Supreme Distant Shot",

      effect: `
        Make a ranged \\glossterm{strike}.
        You reduce your penalties for \\glossterm{range increments} by 4.
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
      type: "Instant",
    },

    {
      name: "Heartpiercing Strike",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        If you get a critical hit with the strike, you gain a bonus to damage with the strike equal to your \\glossterm{power}.
        This bonus applies before applying any multipliers for the critical hit.
      `,
      // narrative: '',
      rank: 1,
      type: "Instant",
    },
  ],
};
