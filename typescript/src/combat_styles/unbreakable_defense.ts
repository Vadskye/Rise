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
          you gain an additional +2 bonus to Armor defense if you are not using a shield.
          In addition, choose a creature you can see.
          Whenever that creature misses or \\glossterm{glances} you with a melee \\glossterm{strike} this round, it \\glossterm{briefly} takes a -2 penalty to Armor defense.
          As normal, this bonus does not stack with itself, even if the same creature misses you with multiple melee attacks.
          The defense bonus from this ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
          However, the penalty imposed on attackers is not Swift.
        `,
        name: "total defense",
      },
      rank: 1,
      scaling: {
        3: "The penalty increases to -3.",
        5: "The penalty increases to -4.",
        7: "The penalty increases to -5.",
      },
      tags: ["Swift"],
      type: "Duration",
    },

    {
      name: "Flamboyant Parry",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          you gain an additional +2 bonus to Armor defense if you are not using a shield.
          In addition, choose a creature you can see.
          Whenever that creature misses or \\glossterm{glances} you with a melee \\glossterm{strike} this round, it becomes \\dazzled as a \\glossterm{condition}.
          This ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
          However, the penalty imposed on attackers is not Swift.
        `,
        name: "total defense",
      },
      rank: 3,
      scaling: {
        5: "The Armor defense bonus increases to +3.",
        7: "The Armor defense bonus increases to +4.",
      },
      tags: ["Swift"],
      type: "Duration",
    },

    {
      name: "Redirecting Parry",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          you gain an additional +2 bonus to Armor defense if you are not using a shield.
          In addition, choose a creature you can see.
          Whenever that creature misses or \\glossterm{glances} you with a melee \\glossterm{strike} this round, it treats itself as a target of that strike in addition to any other targets.
          It cannot choose to reduce its accuracy or damage against itself.
          This ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
        `,
        name: "total defense",
      },
      rank: 5,
      scaling: {
        7: "A creature that makes a strike against itself in this way takes a -2 penalty to defenses against that strike.",
      },
      tags: ["Swift"],
      type: "Duration",
    },

    {
      name: "Reflective Parry",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          you gain an additional +2 bonus to Armor defense if you are not using a shield.
          In addition, choose a creature you can see.
          Whenever that creature misses or \\glossterm{glances} you with a \\glossterm{targeted} attack this round, it treats itself as a target of that attack in addition to any other targets.
          This ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
        `,
        name: "total defense",
      },
      rank: 7,
      tags: ["Swift"],
      type: "Duration",
    },

    {
      name: "Brace for Impact",

      effect: `
        You are \\trait{impervious} to \\glossterm{physical damage} this round.
        Because this is a \\abilitytag{Swift} ability, it affects damage you take during the current phase.
      `,
      rank: 2,
      scaling: {
        4: "You are impervious to all damage, not just physical damage.",
        6: "You also negate any \\glossterm{conditions} that you would gain this round.",
      },
      tags: ["Swift"],
      type: "Duration",
    },

    {
      name: "Bracing Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        You do not add your \\glossterm{power} to damage with the strike.

        You are \\trait{impervious} to \\glossterm{physical damage} this round.
        Becoming impervious in this way is a \\abilitytag{Swift} ability, so it affects damage you take during the current phase.
      `,
      rank: 5,
      scaling: {
        7: "You are impervious to all damage, not just physical damage.",
      },
      type: "Duration",
    },

    {
      name: "Second Wind",

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by two.

        You regain hit points equal to half your maximum \\glossterm{hit points}.
        If you take damage in the same phase that you use this ability, the healing and damage offset, which can prevent you from gaining vital wounds from dropping below 0 hit points (see \\pcref{Resolving Simultaneous Damage}).

        After you use this ability, you cannot use it again until you take a \\glossterm{short rest}.
      `,
      rank: 4,
      tags: [],
      scaling: {
        6: `
          You can also remove a single condition.
          This cannot remove an effect applied during the current round.
        `,
      },
      type: "Duration",
    },

    {
      name: "Shield Bash",

      effect: `
        Make a \\glossterm{strike} using a shield.
        You gain a +1 bonus to Armor defense until the end of the round.
        The defense bonus is a \\abilitytag{Swift} effect, so it protects you from attacks in the current phase.
      `,
      rank: 1,
      scaling: {
        3: "The defense bonus increases to +2.",
        5: "The defense bonus increases to +3.",
        7: "The defense bonus increases to +4.",
      },
      type: "Duration",
    },

    {
      name: "Dazing Shield Slam",

      // full power, +1 rank instead of half power due to shield limitation
      effect: `
        Make a \\glossterm{strike} using a shield.
        Each creature that loses \\glossterm{hit points} from the strike is \\dazed as a \\glossterm{condition}.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1 accuracy bonus with the strike.",
        6: "The accuracy bonus increases to +2.",
      },
      type: "Duration",
    },

    {
      name: "Stunning Shield Slam",

      effect: `
        Make a \\glossterm{strike} using a shield.
        Each creature that loses \\glossterm{hit points} from the strike is \\stunned as a \\glossterm{condition}.
      `,
      rank: 6,
      type: "Duration",
    },

    {
      name: "Defensive Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        You do not add your \\glossterm{power} to damage with the strike.
        In exchange, you gain a +2 bonus to Armor and Reflex defenses until the end of the round.
        The defense bonus is a \\abilitytag{Swift} effect, so it protects you from attacks in the current phase.
      `,
      rank: 2,
      scaling: {
        4: "The defense bonuses increase to +3.",
        6: "The defense bonuses increase to +4.",
      },
      tags: ["Swift (see text)"],
      type: "Duration",
    },

    {
      name: "Cleanse",

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        You remove a \\glossterm{condition} affecting you.
        This cannot remove an effect applied during the current round.
      `,
      rank: 2,
      scaling: {
        4: "Using this ability does not increase your fatigue level.",
        6: "You may remove an additional effect.",
      },
      type: "Duration",
    },

    {
      name: "Cleansing Strike",

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        Make a \\glossterm{strike}.
        In addition, you may remove a \\glossterm{condition} affecting you.
        This cannot remove an effect applied during the current round.
        The penalties from the effect still affect you when you make the strike.
      `,
      rank: 4,
      scaling: {
        6: "You gain a +1d damage bonus with the strike.",
      },
      type: "Duration",
    },

    {
      name: "Revitalizing Strike",

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        Make a strike.
        Your \\glossterm{power} with the strike is halved.
        In addition, you regain 1d10 + \\glossterm{power} hit points.
      `,
      scaling: {
        special: "The healing increases by +1d for each rank beyond 3.",
      },
      rank: 3,
      type: "Instant",
    },

    {
      name: "Greater Revitalizing Strike",

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        Make a strike.
        Your \\glossterm{power} with the strike is halved.
        In addition, you regain 4d8 + \\glossterm{power} hit points.
      `,
      rank: 7,
      type: "Instant",
    },

    {
      name: "Steadfast Strike",

      effect: `
        Make a strike.
        In addition, you gain a +1 bonus to \\glossterm{vital rolls} until the end of the round.
        This bonus is a \\abilitytag{Swift} effect, so it affects any vital wounds you gain during the current phase.
      `,
      rank: 2,
      scaling: {
        4: "The bonus increases to +2.",
        6: "The bonus increases to +3.",
      },
      tags: ["\\abilitytag{Swift} (see text)"],
      type: "Duration",
    },

    {
      name: "Guard the Pass",

      effect: `
        Make a melee \\glossterm{strike}.
        Your \\glossterm{enemies} \\glossterm{briefly} treat all squares within a \\tinyarea radius \\glossterm{zone} from your location as \\glossterm{difficult terrain}.
      `,
      rank: 1,
      scaling: {
        3: "The area increases to a \\smallarea radius.",
        5: "The area increases to a \\medarea radius.",
        7: "The area increases to a \\largearea radius.",
      },
      type: "Duration",
    },

    {
      name: "Prepared Defense",

      effect: `
        Make a \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        In addition, choose any one defense: Armor, Fortitude, Reflex, or Mental.
        You \\glossterm{briefly} gain a +2 bonus to that defense.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 1,
      scaling: {
        3: "The bonus increases to +3.",
        5: "The bonus increases to +4.",
        7: "The bonus increases to +5.",
      },
      type: "Duration",
    },

    {
      name: "Greater Prepared Defense",

      effect: `
        Make a strike.
        Your \\glossterm{power} with the strike is halved.
        After you make the strike, you \\glossterm{briefly} gain a +2 bonus to all defenses.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 6,
      type: "Duration",
    },

    {
      name: "Covering Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature damaged by the strike is \\glossterm{briefly} \\goaded by you.
      `,
      rank: 1,
      scaling: {
        3: "You gain a +1 accuracy bonus with the strike.",
        5: "The accuracy bonus increases to +2.",
        7: "The accuracy bonus increases to +3.",
      },
      type: "Duration",
    },

    {
      name: "Greater Covering Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature damaged by the strike is \\goaded by you as a \\glossterm{condition}.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1 accuracy bonus with the strike.",
        7: "The accuracy bonus increases to +2.",
      },
      type: "Duration",
    },
  ],
};
