import { CombatStyle } from ".";

export const penetratingPrecision: CombatStyle = {
  name: "Penetrating Precision",
  shortDescription: "Stab foes with carefully aimed piercing weapons.",
  sources: ["martial", "trick", "wild"],

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
      name: "Precise Penetrating Strike",

      effect: `
        Make a \\glossterm{strike} with a +2 bonus to \\glossterm{accuracy} using a piercing weapon.
        The attack is made against each subject's Reflex defense instead of its Armor defense.
        You take a -1d penalty to damage with the strike.
        `,

      rank: 5,
      type: "Instant",
    },

    {
      name: "Injection",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        If a creature loses hit points from the strike, you gain a +4 accuracy bonus with injury-based poisons delivered with the strike.
        `,

      rank: 2,
      type: "Instant",
    },

    {
      name: "Penetrating Shot",

      // original targets: Everything in a \areamed, 5 ft.\ wide line from you
      effect: `
        Make a ranged \\glossterm{strike} against each subject.
        Your \\glossterm{power} with the strike is halved.
        `,

      rank: 3,
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
      name: "Lunge",

      // original targets: \glossterm{Enemies} in a 10 ft. long, 5 ft.\ wide line from you
      effect: `
        The line for this effect must point directly away from you.
        Only one of the spaces in the line can be adjacent to you.

        Make a melee \\glossterm{strike} using a piercing weapon against each subject.
        Your \\glossterm{power} with the strike is halved.
        `,

      rank: 1,
      type: "Instant",
    },
  ],
};
