import { CombatStyle } from '.';
import { CONDITION_CRIT } from '../mystic_spheres/constants';

export const unbreakableDefense: CombatStyle = {
  name: 'Unbreakable Defense',
  shortDescription: 'Guard yourself and your allies with careful attacks and recovery abilities.',

  maneuvers: [
    {
      name: 'Parry',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you gain an additional +2 bonus to your Armor defense if you are using a melee weapon.
          This bonus is considered to come from a shield, and does not stack with the benefits of using a shield.
          In addition, choose a creature you can see.
          Whenever that creature misses or \\glossterm{glances} you with a melee \\glossterm{strike} this round, it \\glossterm{briefly} takes a -2 penalty to Armor defense.
          As normal, this bonus does not stack with itself, even if the same creature misses you with multiple melee attacks.
          The defense bonus from this ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
          However, the penalty imposed on attackers is not Swift.
        `,
        name: 'total defense',
      },
      rank: 1,
      roles: ['turtle'],
      tags: ['Swift (see text)'],
    },

    {
      name: 'Flamboyant Parry',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you gain an additional +2 bonus to your Armor defense if you are using a melee weapon.
          This bonus is considered to come from a shield, and does not stack with the benefits of using a shield.
          In addition, whenever a creature misses or \\glossterm{glances} you with a melee \\glossterm{strike} this round, it becomes \\dazzled as a \\glossterm{condition}.
          This ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
          However, the penalty imposed on attackers is not Swift.
        `,
        name: 'total defense',
      },
      rank: 5,
      roles: ['turtle'],
      tags: ['Swift (see text)'],
    },

    {
      name: 'Redirecting Parry',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you gain an additional +2 bonus to your Armor defense if you are using a melee weapon.
          This bonus is considered to come from a shield, and does not stack with the benefits of using a shield.
          In addition, choose a creature you can see.
          Whenever that creature misses or \\glossterm{glances} you with a melee \\glossterm{strike} this round, it treats itself as a target of that strike in addition to any other targets.
          It cannot choose to reduce its accuracy or damage against itself.
          This ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
        `,
        name: 'total defense',
      },
      rank: 3,
      roles: ['turtle'],
      tags: ['Swift'],
    },

    {
      name: 'Reflective Parry',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you gain an additional +2 bonus to Armor defense if you are not using a shield.
          In addition, choose one creature you can see.
          Whenever that creature misses or \\glossterm{glances} you with a \\glossterm{targeted} attack this round, it treats itself as a target of that attack in addition to any other targets.
          This ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
        `,
        name: 'total defense',
      },
      rank: 7,
      roles: ['turtle'],
      tags: ['Swift'],
    },

    {
      name: 'Brace for Impact',

      effect: `
        You are \\trait{impervious} to all damage this round.
        Because this is a \\abilitytag{Swift} ability, it affects attacks against you during the current phase.
      `,
      rank: 5,
      roles: ['turtle'],
      tags: ['Swift'],
    },

    {
      name: 'Weather the Storm',

      // 1 EA is very slightly above rate for r3
      effect: `
        You take half damage from all sources this round.
        Because this is a \\abilitytag{Swift} ability, it affects attacks against you during the current phase.
      `,
      rank: 3,
      roles: ['turtle'],
      tags: ['Swift'],
    },

    {
      name: 'Second Wind',

      cost: 'Two \\glossterm{fatigue levels}, and you cannot use this ability again until you finish a \\glossterm{short rest}.',
      effect: `
        You regain all of your hit points.
      `,
      rank: 3,
      roles: ['healing'],
      tags: ['Swift'],
    },

    {
      name: 'Shield Bash',

      effect: `
        Make a melee \\glossterm{strike} using a shield.
        In addition, you are \\shielded this round.
        The defense bonus is a \\abilitytag{Swift} effect, but not the strike.
      `,
      rank: 3,
      roles: ['turtle'],
      tags: ['Swift (see text)'],
    },

    // +0.4ea as a bonus for requiring shield
    {
      name: 'Stunning Shield Bash',

      effect: `
        Make a melee \\glossterm{strike} using a shield.
        \\hit The target is \\glossterm{briefly} \\stunned.
      `,
      rank: 3,
      roles: ['softener'],
    },

    {
      name: 'Cleanse',

      effect: `
        You remove a \\glossterm{condition} affecting you.
      `,
      rank: 5,
      roles: ['cleanse'],
    },

    {
      name: 'Cleansing Blow',

      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        Remove a \\glossterm{condition} affecting you.
        Then, make a \\glossterm{strike}.
      `,
      rank: 3,
      roles: ['cleanse'],
    },

    {
      name: 'Revitalizing Blow',

      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        Make a strike.
        In addition, you regain hit points equal to 1d6 \\add your \\glossterm{power} at the end of the round.
      `,
      rank: 3,
      roles: ['healing'],
    },

    {
      name: 'Revitalizing Blow+',

      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        Make a \\glossterm{strike} that deals double damage.
        In addition, you regain 1d10 hit points plus 1d10 per 2 power at the end of the round.
      `,
      rank: 7,
      roles: ['healing'],
    },

    // Fortified + steeled is 0.5 EA, so double it to 1 EA.
    {
      name: 'Sinews of Steel',

      effect: `
        You are \\glossterm{briefly} \\fortified and \\steeled.
        This ability has the \\abilitytag{Swift} tag, so it affects attacks made against you during the current phase.
      `,
      rank: 3,
      roles: ['focus'],
      tags: ['Swift'],
    },

    {
      name: 'Sinews of Steel+',

      // 1.2 EA
      effect: `
        You are \\glossterm{briefly} \\empowered, \\fortified, and \\steeled.
        This ability has the \\abilitytag{Swift} tag, so it affects attacks made against you during the current phase.
      `,
      rank: 7,
      roles: ['focus'],
    },

    {
      name: 'Prepared Defense',

      effect: `
        Make a \\glossterm{strike}.
        Then, you can choose to either be \\glossterm{briefly} \\fortified or \\glossterm{briefly} \\shielded.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 3,
      roles: ['generator'],
    },

    {
      name: 'Prepared Defense+',

      effect: `
        Make a \\glossterm{strike} with a -1 accuracy penalty that deals triple damage.
        Then, you can choose to either be \\glossterm{briefly} \\fortified or \\glossterm{briefly} \\shielded.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 7,
      roles: ['generator'],
    },

    {
      name: 'I Am Your Opponent',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target is \\glossterm{briefly} \\goaded by you.
          If it has no remaining \\glossterm{hit points}, it is also goaded by you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} adjacent to you.
        `,
      },
      rank: 1,
      roles: ['softener'],
      tags: ['Emotion'],
    },

    {
      name: 'I Am Your Opponent+',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target is \\goaded by you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} adjacent to you.
        `,
      },
      rank: 5,
      roles: ['softener'],
      tags: ['Emotion'],
    },

    {
      name: 'Defensive Stance',

      // Theoretically 3 rounds of shielded, so 0.9 EA.
      effect: `
        You become \\glossterm{briefly} \\shielded.
        At the end of next round, if you took damage that round, you are \\glossterm{briefly} \\shielded again.
        This ability has the \\abilitytag{Swift} tag, so it affects attacks made against you during the current phase.
      `,
      rank: 1,
      roles: ['focus'],
      tags: ['Swift'],
    },
  ],
};
