import { CombatStyle } from '.';

export const unbreakableDefense: CombatStyle = {
  name: 'Unbreakable Defense',
  shortDescription: 'Guard yourself and your allies with careful attacks and recovery abilities.',

  maneuvers: [
    {
      name: 'Parry',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you gain an additional +2 bonus to Armor defense if you are not using a shield.
          In addition, choose a creature you can see.
          Whenever that creature misses or \\glossterm{glances} you with a melee \\glossterm{strike} this round, it \\glossterm{briefly} takes a -2 penalty to Armor defense.
          As normal, this bonus does not stack with itself, even if the same creature misses you with multiple melee attacks.
          The defense bonus from this ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
          However, the penalty imposed on attackers is not Swift.
        `,
        name: 'total defense',
      },
      rank: 1,
      tags: ['Swift (see text)'],
    },

    {
      name: 'Flamboyant Parry',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you gain an additional +2 bonus to Armor defense if you are not using a shield.
          In addition, whenever a creature misses or \\glossterm{glances} you with a melee \\glossterm{strike} this round, it becomes \\dazzled as a \\glossterm{condition}.
          This ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
          However, the penalty imposed on attackers is not Swift.
        `,
        name: 'total defense',
      },
      rank: 5,
      tags: ['Swift (see text)'],
    },

    {
      name: 'Redirecting Parry',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you gain an additional +2 bonus to Armor defense if you are not using a shield.
          In addition, choose a creature you can see.
          Whenever that creature misses or \\glossterm{glances} you with a melee \\glossterm{strike} this round, it treats itself as a target of that strike in addition to any other targets.
          It cannot choose to reduce its accuracy or damage against itself.
          This ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
        `,
        name: 'total defense',
      },
      rank: 3,
      tags: ['Swift'],
    },

    {
      name: 'Reflective Parry',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you gain an additional +2 bonus to Armor defense if you are not using a shield.
          In addition, choose a creature you can see.
          Whenever that creature misses or \\glossterm{glances} you with a \\glossterm{targeted} attack this round, it treats itself as a target of that attack in addition to any other targets.
          This ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
        `,
        name: 'total defense',
      },
      rank: 7,
      tags: ['Swift'],
    },

    {
      name: 'Brace for Impact',

      effect: `
        You are \\trait{impervious} to all damage this round.
        Because this is a \\abilitytag{Swift} ability, it affects attacks against you during the current phase.
      `,
      rank: 3,
      tags: ['Swift'],
    },

    {
      name: 'Bracing Strike',

      effect: `
        Make a melee \\glossterm{strike}.
        You do not add your \\glossterm{power} to damage with the strike.

        You are \\trait{impervious} to all damage this round.
        Becoming impervious in this way is a \\abilitytag{Swift} ability, so it affects damage you take during the current phase.
      `,
      rank: 5,
    },

    {
      name: 'Second Wind',

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by two.

        You regain all of your hit points.
        After you use this ability, you cannot use it again until you take a \\glossterm{short rest}.
      `,
      rank: 3,
      tags: ['Swift'],
    },

    {
      name: 'Shield Bash',

      effect: `
        Make a \\glossterm{strike} using a shield.
        In addition, you gain a +1 bonus to Armor defense this round.
        The defense bonus is a \\abilitytag{Swift} effect, but not the strike.
      `,
      rank: 1,
      tags: ['Swift (see text)'],
    },

    {
      name: 'Dazing Shield Slam',

      // -2 ranks due to shield limitation
      effect: `
        Make a \\glossterm{strike} using a shield.
        Each creature that loses \\glossterm{hit points} from the strike is \\dazed as a \\glossterm{condition}.
      `,
      rank: 1,
    },

    {
      name: 'Stunning Shield Slam',

      // -2 ranks due to shield limitation
      effect: `
        Make a \\glossterm{strike} using a shield.
        Each creature that loses \\glossterm{hit points} from the strike is \\stunned as a \\glossterm{condition}.
      `,
      rank: 5,
    },

    {
      name: 'Defensive Strike',

      effect: `
        Make a melee \\glossterm{strike}.
        You do not add your \\glossterm{power} to damage with the strike.
        In exchange, you gain a +2 bonus to Armor and Reflex defenses this round.
        The defense bonus is a \\abilitytag{Swift} effect, but not the strike.
      `,
      rank: 1,
      tags: ['Swift (see text)'],
    },

    {
      name: 'Cleanse',

      effect: `
        You remove a \\glossterm{condition} affecting you.
      `,
      rank: 5,
    },

    {
      name: 'Cleansing Strike',

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        Remove a \\glossterm{condition} affecting you.
        Then, make a \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
      `,
      rank: 3,
    },

    {
      name: 'Cleansing Strike+',

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        Remove a \\glossterm{condition} affecting you.
        Then, make a \\glossterm{strike}.
      `,
      rank: 7,
    },

    {
      name: 'Revitalizing Strike',

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        Make a strike.
        Your \\glossterm{power} with the strike is halved.
        In addition, you regain 2d6 + \\glossterm{power} hit points.
        This ability does not have the \\abilitytag{Swift} tag, so it resolves after incoming attacks during the current phase.
      `,
      scaling: {
        special: 'The healing increases by +1d for each rank beyond 3.',
      },
      rank: 3,
    },

    {
      name: 'Revitalizing Strike+',

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        Make a strike.
        Your \\glossterm{power} with the strike is halved.
        In addition, you regain 4d10 + \\glossterm{power} hit points.
        This ability does not have the \\abilitytag{Swift} tag, so it resolves after incoming attacks during the current phase.
      `,
      rank: 7,
    },

    {
      name: 'Steadfast Strike',

      effect: `
        Make a melee strike.
        In addition, you gain a +4 bonus to \\glossterm{vital rolls} this round.
        The vital roll bonus is a \\abilitytag{Swift} effect, but not the strike.
      `,
      rank: 1,
      tags: ['Swift (see text)'],
    },

    {
      name: 'Prepared Defense',

      effect: `
        Make a \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        In addition, choose any one defense: Armor, Fortitude, Reflex, or Mental.
        You \\glossterm{briefly} gain a +2 bonus to that defense.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 1,
    },

    {
      name: 'Prepared Defense+',

      effect: `
        Make a strike.
        Your \\glossterm{power} with the strike is halved.
        After you make the strike, you \\glossterm{briefly} gain a +2 bonus to all defenses.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 5,
    },

    {
      name: 'Covering Strike',

      // -2 ranks for melee goad
      effect: `
        Make a melee \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike is \\goaded by you as a \\glossterm{condition} if your attack result beats its Mental defense.
      `,
      rank: 3,
    },

    {
      name: 'Covering Strike+',

      effect: `
        Make a melee \\glossterm{strike}.
        Each creature damaged by the strike is \\goaded by you as a \\glossterm{condition} if your attack result beats its Mental defense.
      `,
      rank: 7,
    },
  ],
};
