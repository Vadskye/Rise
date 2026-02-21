import { CombatStyle } from '.';
import { CONDITION_CRIT } from '../constants';

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
          Until your next turn, whenever that creature misses you with a melee \\glossterm{strike}, it \\briefly takes a -2 penalty to Armor defense.
          As normal, this bonus does not stack with itself, even if the same creature misses you with multiple melee attacks.
        `,
        name: 'total defense',
      },
      rank: 1,
      roles: ['turtle'],
    },

    {
      name: 'Flamboyant Parry',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you gain an additional +2 bonus to your Armor defense if you are using a melee weapon.
          This bonus is considered to come from a shield, and does not stack with the benefits of using a shield.
          Until your next turn, whenever a creature misses you with a melee \\glossterm{strike}, it becomes \\dazzled as a \\glossterm{condition}.
        `,
        name: 'total defense',
      },
      rank: 5,
      roles: ['turtle'],
    },

    {
      name: 'Redirecting Parry',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you gain an additional +2 bonus to your Armor defense if you are using a melee weapon.
          This bonus is considered to come from a shield, and does not stack with the benefits of using a shield.
          In addition, choose a creature you can see.
          Until your next turn, whenever that creature misses with a melee \\glossterm{strike}, it treats itself as a target of that strike in addition to any other targets.
          It cannot choose to reduce its accuracy or damage against itself.
        `,
        name: 'total defense',
      },
      rank: 3,
      roles: ['turtle'],
    },

    {
      name: 'Reflective Parry',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you gain an additional +2 bonus to Armor defense if you are not using a shield.
          In addition, choose one creature you can see.
          Until your next turn, whenever that creature misses you with a \\glossterm{targeted} attack, it treats itself as a target of that attack in addition to any other targets.
        `,
        name: 'total defense',
      },
      rank: 7,
      roles: ['turtle'],
    },

    {
      name: 'Brace for Impact',

      // 0.5 + 0.7 EA, but they have antisynergy
      effect: `
        You \\briefly are \\braced and take half damage from all sources.
      `,
      rank: 5,
      roles: ['turtle'],
    },

    {
      name: 'Unbreakable Bastion',

      // 1.3 EA
      effect: `
        You are \\briefly \\impervious to all damage.
      `,
      rank: 7,
      roles: ['turtle'],
    },

    {
      name: 'Weather the Storm',

      // 0.7 EA
      effect: `
        You \\briefly take half damage from all sources.
      `,
      rank: 1,
      roles: ['turtle'],
    },

    {
      name: 'Shield Bash',

      effect: `
        You are \\briefly \\shielded.
        Make a melee \\glossterm{strike} with a -1 accuracy penalty using a shield.
      `,
      rank: 1,
      roles: ['turtle'],
    },

    {
      name: 'Shield Bash+',

      effect: `
        You are \\briefly \\shielded.
        Make a melee \\glossterm{strike} that deals double damage using a shield.
      `,
      rank: 5,
      roles: ['turtle'],
    },

    // +0.4ea as a bonus for requiring shield
    {
      name: 'Stunning Shield Bash',

      effect: `
        Make a melee \\glossterm{strike} using a shield.
        \\hit The target is \\briefly \\stunned.
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
        In addition, you regain \\hprankthree.
      `,
      rank: 3,
      roles: ['healing'],
      scaling: 'healing',
    },

    {
      name: 'Revitalizing Blow+',

      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        Make a \\glossterm{strike} that deals double damage.
        In addition, you regain \\hprankseven.
      `,
      rank: 7,
      roles: ['healing'],
    },

    {
      name: 'Sinews of Steel',

      // 0.5 + 0.4 EA
      effect: `
        You are \\briefly \\steeled and \\empowered.
      `,
      rank: 3,
      roles: ['turtle'],
    },

    {
      name: 'Sinews of Steel+',

      // 0.5 + 0.7 EA
      effect: `
        You are \\briefly \\steeled and \\maximized.
      `,
      rank: 7,
      roles: ['focus'],
    },

    {
      name: 'Prepared Defense',

      effect: `
        Make a \\glossterm{strike}.
        After making the strike, you can choose to either be \\briefly \\fortified or briefly \\shielded.
      `,
      rank: 3,
      roles: ['generator', 'turtle'],
    },

    {
      name: 'Prepared Defense+',

      effect: `
        Make a \\glossterm{strike} with a -1 accuracy penalty that deals triple damage.
        Then, you can choose to either be \\briefly \\fortified or briefly \\shielded.
      `,
      rank: 7,
      roles: ['generator'],
    },

    {
      name: 'I Am Your Opponent',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\briefly \\goaded by you.
          If it is \\glossterm{injured}, it is also goaded by you as a \\glossterm{condition}.
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
          The target is \\goaded by you as a \\glossterm{condition}.
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
      name: 'Invigoration',

      // Pure healing would be dr3, so dr2 for empower
      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        You are \\briefly empowered.
        In addition, you regain \\hpranktwo.
      `,
      rank: 1,
      roles: ['focus', 'healing'],
      scaling: 'healing',
    },

    {
      name: 'Greater Invigoration',

      // Pure healing would be dr3, so dr2 for empower
      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        You are \\briefly empowered.
        In addition, you regain \\hpranksix.
      `,
      rank: 5,
      roles: ['focus', 'healing'],
      scaling: 'healing',
    },

    {
      name: 'Fortifying Force',

      effect: `
        Make a \\glossterm{strike} that deals double damage.
        After making the strike, you are \\briefly \\fortified.
      `,
      rank: 5,
      roles: ['generator', 'turtle'],
    },

    {
      name: 'Bracing Blow',

      effect: `
        Make a \\glossterm{strike} that deals triple damage.
        \\hit You are \\briefly \\braced.
      `,
      rank: 7,
      roles: ['generator', 'turtle'],
    },
  ],
};
