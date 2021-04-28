import { CombatStyle } from ".";

export const unbreakableDefense: CombatStyle = {
  name: "Unbreakable Defense",
  shortDescription: "Guard yourself and your allies with careful attacks and recovery abilities.",

  maneuvers: [
    {
      name: "Parry",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          you gain an additional +2 bonus to Armor defense.
          In addition, whenever a creature misses you with a melee \\glossterm{strike} this round, that creature takes a -2 penalty to Armor defense during the next round.
          As normal, this bonus does not stack with itself, even if the same creature misses you with multiple melee attacks.
          This ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
        `,
        name: "total defense",
      },
      rank: 1,
      tags: ["Swift"],
      type: "Duration",
    },

    {
      name: "Brace for Impact",

      effect: `
        You take half damage from \\glossterm{physical damage} this round.
        This halving is applied before \\glossterm{resistances} and similar abilities.
        Because this is a \\abilitytag{Swift} ability, it affects damage you take during the current phase.
      `,
      rank: 2,
      scaling: {
        4: "You also take half damage from \\glossterm{energy} damage this round.",
        6: "You also negate any \\glossterm{conditions} that you would gain this round.",
      },
      tags: ["Swift"],
      type: "Duration",
    },

    {
      name: "Second Wind",

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by two.

        You regain hit points equal to your maximum \\glossterm{hit points}.
        If you take damage in the same phase that you use this ability, the healing and damage offset, which can prevent you from gaining vital wounds from dropping below 0 hit points (see \\pcref{Regaining Hit Points and Resistances}).

        After you use this ability, you cannot use it again until you take a \\glossterm{short rest}.
      `,
      rank: 4,
      tags: [],
      type: "Duration",
    },

    {
      name: "Shield Slam",

      effect: `
        Make a \\glossterm{strike} using a shield.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\sickened as a \\glossterm{condition}.
      `,
      rank: 1,
      type: "Duration",
    },

    {
      name: "Nauseating Shield Slam",

      effect: `
        Make a \\glossterm{strike} using a shield.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\nauseated as a \\glossterm{condition}.
        `,

      rank: 3,
      type: "Duration",
    },

    {
      name: "Defensive Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        You take a -1d penalty to damage with the strike.
        In exchange, you gain a +2 bonus to Armor and Reflex defenses until the end of the round.
        The defense bonus is a \\abilitytag{Swift} effect, so it protects you from attacks in the current phase.
      `,
      rank: 2,
      tags: ["Swift (see text)"],
      type: "Duration",
    },

    // TODO: change to rank 5 once campaigns progress far enough
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
      name: "Greater Cleansing Strike",

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
        After you use this ability, you cannot use it or any other \\abilitytag{Healing} ability until after the end of the next round.
      `,
      scaling: {
        special: "The healing increases by +1d for each rank beyond 3.",
      },
      rank: 3,
      tags: ['Healing'],
      type: "Instant",
    },

    {
      name: "Bracing Strike",

      effect: `
        Make a strike.
        In addition, you gain a +1 bonus to \\glossterm{vital rolls} until the end of the round.
        This bonus is a \\abilitytag{Swift} effect, so it affects any vital wounds you gain during the current phase.
      `,
      rank: 1,
      tags: ["\\abilitytag{Swift} (see text)"],
      type: "Duration",
    },

    {
      name: "Greater Bracing Strike",

      functionsLike: {
        abilityType: "maneuver",
        exceptThat: "the bonus increases to +2.",
        name: "Bracing Strike",
      },
      rank: 3,
      tags: ["\\abilitytag{Swift} (see text)"],
      type: "Duration",
    },

    {
      name: "Supreme Bracing Strike",

      functionsLike: {
        abilityType: "maneuver",
        exceptThat: "the bonus increases to +3.",
        name: "Bracing Strike",
      },
      rank: 5,
      tags: ["\\abilitytag{Swift} (see text)"],
      type: "Duration",
    },
  ],
};
