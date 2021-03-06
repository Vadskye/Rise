import { CombatStyle } from ".";

export const unbreakableDefense: CombatStyle = {
  name: "Unbreakable Defense",
  shortDescription: "Guard yourself and your allies with careful attacks and recovery abilities.",
  sources: ["esoteric", "martial"],

  maneuvers: [
    {
      name: "Parry",

      effect: `
        You gain a +4 bonus to Armor defense until the end of the round.
        Whenever a creature misses you with a melee \\glossterm{strike} this round, that creature takes a -2 penalty to Armor defense during the next round.
        As normal, this bonus does not stack with itself, even if the same creature misses you with multiple melee attacks.
        This ability is \\glossterm{Swift}, so it protects you from attacks in the current phase.

        \\rankline
        \\rank{3} The defense penalty increases to -3.
        \\rank{5} The defense penalty increases to -4.
        \\rank{7} The defense penalty increases to -5.
        `,

      rank: 1,
      tags: ["Swift"],
      type: "Duration",
    },

    {
      name: "Brace for Impact",

      // original targets: Yourself
      effect: `
        You take half damage from \\glossterm{physical damage} this round.
        This halving is applied before \\glossterm{resistances} and similar abilities.
        Because this is a \\glossterm{Swift} ability, it affects damage you take during the current phase.
        `,

      rank: 2,
      scaling: {
        4: "You also take half damage from \\glossterm{energy} damage this round.",
        6: "You also negate any \\glossterm{conditions} that you would gain this round.",
      },
      tags: ["Swift"],
      type: "Instant",
    },

    {
      name: "Second Wind",

      // original targets: Yourself
      effect: `
        When you use this ability, you gain a \\glossterm{fatigue point}.

        You regain hit points equal to your maximum \\glossterm{hit points}.
        If you take damage in the same phase that you use this ability, the healing and damage offset, which can prevent you from gaining vital wounds from dropping below 0 hit points (see \\pcref{Regaining Hit Points and Resistances}).

        After you use this ability, you cannot use it again until you take a \\glossterm{short rest}.
        `,

      rank: 4,
      tags: ["Swift"],
      type: "Duration",
    },

    {
      name: "Shield Slam",

      effect: `
        Make a \\glossterm{strike} using a shield.
        Your \\glossterm{power} with the strike is halved.
        If a creature loses hit points from the strike, it is \\glossterm{sickened} as a \\glossterm{condition}.
        `,

      rank: 1,
      type: "Duration",
    },

    {
      name: "Nauseating Shield Slam",

      effect: `
        Make a \\glossterm{strike} using a shield.
        Your \\glossterm{power} with the strike is halved.
        If a creature loses hit points from the strike, it is \\glossterm{nauseated} as a \\glossterm{condition}.
        `,

      rank: 3,
      type: "Duration",
    },

    {
      name: "Defensive Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        In exchange, you gain a +2 bonus to Armor and Reflex defenses until the end of the round.
        The defense bonus is a \\glossterm{Swift} effect, so it protects you from attacks in the current phase.
        `,

      rank: 2,
      tags: ["Swift (see text)"],
      type: "Duration",
    },

    {
      name: "Cleansing Strike",

      effect: `
        Make a strike.
        You take a -2d penalty to damage with the strike.

        In addition, you may remove a \\glossterm{condition} affecting you.
        This cannot remove a condition applied during the current round.
        The penalties from the condition still affect you when you make the strike.
        `,

      rank: 4,
      type: "Duration",
    },

    {
      name: "Cleansing Smash",

      effect: `
        Make a strike.
        In addition, you may remove a \\glossterm{condition} affecting you.
        This cannot remove a condition applied during the current round.
        The penalties from the condition still affect you when you make the strike.
        `,

      rank: 7,
      type: "Duration",
    },

    {
      name: "Revitalizing Strike",

      effect: `
        Make a strike.
        In addition, you regain 1d10 hit points.

        \\rankline
        The healing increases by +1d for each rank beyond 4.
        `,

      rank: 4,
      type: "Instant",
    },
  ],
};
