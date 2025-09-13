import { CombatStyle } from '.';
import { CONDITION_CRIT } from '../mystic_spheres/constants';

export const bruteForce: CombatStyle = {
  name: 'Brute Force',
  shortDescription: 'Smash foes with raw power.',

  maneuvers: [
    {
      name: 'Wild Swing',

      effect: `
        Make a \\glossterm{strike} with a 50\\% miss chance.
        The strike deals double damage.
      `,
      rank: 3,
      roles: ['burst'],
    },
    {
      name: 'Wild Swing+',

      effect: `
        Make a \\glossterm{strike} with a 50\\% miss chance that deals \\glossterm{extra damage} equal to half your \\glossterm{power}.
        The strike deals triple damage.
      `,
      rank: 7,
      roles: ['burst'],
    },
    {
      name: 'Pure Power',

      effect: `
        You become \\empowered this round.
        Make a \\glossterm{strike} with a -2 accuracy penalty.
      `,
      rank: 1,
      roles: ['burst'],
    },

    {
      name: 'Pure Power+',

      effect: `
        You become \\maximized this round.
        Make a \\glossterm{strike} with a -2 accuracy penalty that deals double damage.
      `,
      rank: 5,
      roles: ['burst'],
    },
    {
      name: 'Armorcrusher',

      effect: `
        Make a \\glossterm{strike}.
        The attack is made against the target's Fortitude defense instead of its Armor defense.
        \\hit The target \\glossterm{briefly} takes a -2 penalty to its Armor defense.
      `,
      rank: 3,
      roles: ['softener'],
    },

    {
      name: 'Ground Stomp',

      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you that are \\glossterm{grounded} on the same stable surface as you.
        `,
      },
      rank: 1,
      roles: ['clear'],
      tags: ['Earth'],
    },

    {
      name: 'Ground Stomp+',

      attack: {
        hit: `\\damageranksix.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you that are \\glossterm{grounded} on the same stable surface as you.
        `,
      },
      rank: 5,
      roles: ['clear'],
      tags: ['Earth'],
    },

    {
      name: 'Ground Slam',

      effect: `
        Make a melee \\glossterm{strike} with a -1 accuracy penalty against a stable surface.
        % TODO: wording
        The strike targets everything supported by that surface in a \\smallarea cone from one corner of the target space.
      `,
      rank: 1,
      roles: ['clear'],
      tags: ['Earth'],
    },

    {
      name: 'Mighty Stomp',

      // Start from r2 due to 0.2 EA buff. With an r0 area, we get r3 damage.
      attack: {
        hit: `\\damagerankthree.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you that are \\glossterm{grounded} on the same stable surface as you.
          Then, you are \\glossterm{briefly} \\empowered.
        `,
      },
      rank: 3,
      roles: ['clear', 'generator'],
      tags: ['Earth'],
    },

    {
      name: 'Ground Slam+',

      // TODO: actual math on effectiveness; -2 accuracy?
      effect: `
        Make a melee \\glossterm{strike} with a -1 accuracy penalty against a stable surface.
        It targets everything supported by that surface in a \\medarea cone from one corner of the target space.
        The strike deals double damage.
      `,
      rank: 5,
      roles: ['clear'],
      tags: ['Earth'],
    },

    {
      name: 'Steady Slam',

      effect: `
        Make a melee \\glossterm{strike}.
        If you get a \\glossterm{glancing blow}, it deals full damage instead of half damage.
        However, you cannot get a \\glossterm{critical hit}.
      `,
      roles: ['burst'],
      rank: 1,
    },

    {
      name: 'Steady Slam+',

      effect: `
        Make a melee \\glossterm{strike} that deals double damage using a single weapon.
        If you get a \\glossterm{glancing blow}, it deals full damage instead of half damage.
      `,
      roles: ['burst'],
      rank: 5,
    },

    {
      name: 'Concussion',

      effect: `
        Make a melee \\glossterm{strike}.
        \\injury The target becomes \\stunned as a \\glossterm{condition}.
      `,
      roles: ['maim'],
      rank: 3,
    },

    {
      name: 'Brain Scrambler',

      effect: `
        Make a melee \\glossterm{strike} that deals triple damage.
        \\injury If your attack result hits the target's Fortitude and Mental defenses, it becomes \\confused as a \\glossterm{condition}.
      `,
      roles: ['maim'],
      rank: 7,
    },

    {
      name: 'Leap Slam',

      // Basically tiny radius in short range, which is area rank 2
      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          You jump and move as normal for the jump (see \\pcref{Jumping}).
          When you land, if the vertical distance in feet between the highest point of your leap and your landing point was at least ten feet, you emit a small shockwave.
          If you do, make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you that are on the same stable surface as you.
        `,
      },
      rank: 3,
      roles: ['clear', 'dive'],
      tags: ['Earth'],
    },

    {
      name: 'Leap Slam+',

      functionsLike: {
        name: 'leap slam',
        exceptThat: 'the damage increases to \\damageranksix.',
      },
      rank: 7,
      roles: ['clear', 'dive'],
      tags: ['Earth'],
    },

    {
      name: 'Ricochet',

      effect: `
        Make a thrown \\glossterm{strike} against up to three creatures or objects in a \\smallarea radius within \\medrange of you.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 3,
      roles: ['clear'],
    },

    {
      name: 'Ricochet+',

      effect: `
        Make a thrown \\glossterm{strike} against up to six creatures or objects in a \\smallarea radius within \\medrange of you.
        You can choose the same target multiple times, but not twice in a row, and no more than three times total.
        Choosing the same target twice means it takes double damage, and three times means it takes triple damage.

        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 7,
      roles: ['clear'],
    },

    // {
    //   name: 'Knockdown',

    //   // We don't normally do brief effects on HP loss. Call it -0.4 EA, so 0.6 total?
    //   effect: `
    //     Make a melee \\glossterm{strike}.
    //     \\hit If the target loses hit points and your attack result also hits its Brawn defense, it falls \\prone.
    //     This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
    //   `,
    //   rank: 1,
    //   roles: ['maim'],
    // },

    {
      name: 'Knockdown+',
      effect: `
        Make a melee \\glossterm{strike}.
        \\hit If your attack result also hits the target's Brawn defense, it falls \\prone.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 3,
      roles: ['trip'],
    },

    {
      name: 'Forceful Smash',

      effect: `
        Make a melee \\glossterm{strike}.
        \\injury If your attack result hits the target's Brawn defense, you \\glossterm{knockback} it 15 feet.
        If you are \\empowered, this knockback distance is doubled.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 1,
      roles: ['combo', 'payoff'],
    },

    {
      name: 'Forceful Smash+',

      effect: `
        Make a melee \\glossterm{strike} that deals double damage.
        \\injury If your attack result hits the target's Brawn defense, you \\glossterm{knockback} it 30 feet.
        If you are \\empowered, this knockback distance is doubled.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 5,
      roles: ['combo', 'payoff'],
    },

    // Start from r0 due to 0.2 EA buff. Brief goad is r-1 normally, so we can get a r1
    // area by spending one rank on area size. We only use a r0 area though.
    {
      name: 'Ostentatious Flex',

      attack: {
        hit: `The target is \\glossterm{briefly} \\goaded by you.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} adjacent to you.
          Then, you are \\glossterm{briefly} \\empowered.
        `,
      },
      rank: 1,
      roles: ['generator'],
    },

    {
      name: 'Ostentatious Flex+',

      // Start from r6 due to 0.2 EA buff, limited scope gets us back to r7
      attack: {
        crit: CONDITION_CRIT,
        hit: `The target is \\goaded by you as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
          Then, you are \\glossterm{briefly} \\empowered.
        `,
      },
      rank: 7,
      roles: ['generator'],
    },

    {
      name: 'Rejuvenating Flex',

      // Pure healing would be dr5, so dr4 for empower
      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        You are \\glossterm{briefly} empowered.
        In addition, you regain 1d6 hit points per 2 power.
      `,
      rank: 3,
      roles: ['focus', 'healing'],
      tags: ['Swift'],
    },

    // This is 0.7 EA + 0.3 EA, but if you're a maneuver martial you generally
    // aren't doing 100% dice damage, so it can sneak in here at r3 instead of r4.
    {
      name: 'Steady Flex',

      effect: `
        You are \\glossterm{briefly} \\fortified and \\maximized.
      `,
      rank: 3,
      roles: ['focus'],
    },

    {
      name: 'Devastating Flex',

      effect: `
        You \\glossterm{briefly} are \\maximized and deal 1d8 \\glossterm{extra damage} with \\glossterm{strikes}.
      `,
      rank: 7,
      roles: ['focus'],
    },

    {
      name: 'Muscle Burst',

      // Standard effect for r3 would be brief empower -> dr1, which is basically what
      // this is.
      effect: `
        You are \\glossterm{briefly} \\empowered.
        Then, make a \\glossterm{strike}.
      `,
      rank: 3,
      roles: ['generator'],
    },

    {
      name: 'Desperate Muscle Burst',

      // With a fatigue, expected damage is drX-3 = dr4.
      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        Make a \\glossterm{strike} with that deals double damage.
        Then, you are \\glossterm{briefly} \\maximized.
      `,
      rank: 7,
      roles: ['exertion', 'generator'],
    },

    {
      name: 'Press Forward',

      effect: `
        Make a melee \\glossterm{strike}.
        After you make the strike, you can move up to 10 feet.
        During this movement, you can move into space occupied by creatures that you hit with the strike.
        When you do, you \\glossterm{push} that creature up to 5 feet away from you into an unoccupied space.
        This push is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 1,
      roles: ['dive'],
    },

    {
      name: 'Press Forward+',

      functionsLike: {
        exceptThat:
          'the strike deals double damage, and you can move up to half your movement speed instead of only 10 feet.',
        name: 'press forward',
      },
      rank: 5,
      roles: ['dive'],
    },

    {
      name: 'Desperate Smash',

      cost: 'One \\glossterm{fatigue level} (see text).',
      effect: `
        Make a \\glossterm{strike} that deals double damage.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.

        This ability only increases your fatigue level if the strike hits.
      `,
      rank: 3,
      roles: ['burst', 'exertion'],
    },

    {
      name: 'Desperate Smash+',

      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        Make a \\glossterm{strike} that deals \\glossterm{extra damage} equal to half your \\glossterm{power}.
        The strike deals triple damage.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.

        This ability only increases your fatigue level if the strike hits.
      `,
      rank: 7,
      roles: ['burst', 'exertion'],
    },

    {
      name: 'Gutshot',

      effect: `
        Make a melee strike.
        If you are \\empowered and the strike hits, the target is \\glossterm{briefly} \\stunned.
      `,
      rank: 3,
      roles: ['softener', 'payoff'],
    },

    {
      name: 'Gutshot+',

      effect: `
        Make a melee strike that deals triple damage.
        If you are \\empowered and the strike hits, the target is \\stunned as a \\glossterm{condition}.
      `,
      rank: 7,
      roles: ['softener', 'payoff'],
    },

    {
      name: 'Boneshatter',

      effect: `
        Make a \\glossterm{strike}.
        If your attack result hits the target's Fortitude defense, the strike deals triple damage.
      `,
      rank: 5,
      roles: ['burst'],
    },

    {
      name: 'Earsplitting Bonedrum',

      effect: `
        Make a melee \\glossterm{strike}.
        On a hit, you and the target are \\glossterm{briefly} \\deafened.
      `,
      rank: 1,
      roles: ['softener'],
      tags: ['Auditory'],
    },

    {
      name: 'Overhand Smash',

      effect: `
        Make a melee \\glossterm{strike}.
        It deals double damage, but you cannot get a \\glossterm{critical hit}.
        After making the strike, you \\glossterm{briefly} take a -2 penalty to your Armor and Reflex defenses.
        This penalty does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 3,
      roles: ['burst'],
    },

    {
      name: 'Overhand Smash+',

      effect: `
        Make a melee \\glossterm{strike} that deals \\glossterm{extra damage} equal to half your \\glossterm{power}.
        It deals triple damage, but you cannot get a \\glossterm{critical hit}.
        After making the strike, you \\glossterm{briefly} take a -2 penalty to your Armor and Reflex defenses.
        This penalty does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 7,
      roles: ['burst'],
    },

    {
      name: 'Erupting Bonedrum',

      effect: `
        Make a melee \\glossterm{strike}.
        \\hit Compare your attack result to the Fortitude defense of all other \\glossterm{enemies} within a \\medarea radius of the target of your strike.
        This is an \\atAuditory effect.
        On a hit against a secondary target, you deal damage equal to the damage you dealt with the strike, ignoring any damage increase from \\glossterm{critical hits} with the strike.
      `,
      rank: 3,
      roles: ['clear'],
      tags: [],
    },

    {
      name: 'Shrapnel Blast',

      // Expected line length is 10 feet, making this a r0 area. Normal damage in an r0
      // area would be dr4, so dr3 with the debuff.
      effect: `
        Make a melee \\glossterm{strike} against a stable surface and no other targets.
        Then, make an attack vs. Armor against everything in a 10 ft. wide line from one corner of the target space.
        The length of the line is equal to one foot per point of damage you dealt to the surface, rounded to the nearest 5 foot increment.
        \\hit \\damagerankthree. If your attack result also hits the target's Reflex defense, it is \\glossterm{briefly} \\dazzled.
        \\miss Half damage.
      `,
      rank: 3,
      roles: ['flash'],
      tags: ['Earth'],
    },

    {
      name: 'Shrapnel Blast+',

      // Expected line length is 4.5 + 8 + 3.5 = 15 feet, but it can be longer with
      // adamantine weapons and weird stuff. It still won't get much past 20 feet, so we
      // can still score this as a r0 area.
      effect: `
        Make a melee \\glossterm{strike} against a stable surface and no other targets.
        Then, make an attack vs. Armor against everything in a 10 ft. wide line from one corner of the target space.
        The length of the line is equal to one foot per point of damage you dealt to the surface, rounded to the nearest 5 foot increment.
        \\hit \\damagerankseven. If your attack result also hits the target's Reflex defense, it is \\dazzled as a \\glossterm{condition}.
        \\miss Half damage.
      `,
      rank: 7,
      roles: ['flash'],
      tags: ['Earth'],
    },

    {
      name: 'Forceful Retreat',

      effect: `
        Make a melee \\glossterm{strike}.
        If you hit, you \\glossterm{push} yourself up to 10 feet in a straight line away from the target.
      `,
      rank: 1,
      roles: ['retreat'],
    },

    {
      name: 'Forceful Retreat+',

      effect: `
        Make a melee \\glossterm{strike} that deals double damage.
        If you hit, you \\glossterm{push} yourself up to 20 feet in a straight line away from the target.
      `,
      rank: 5,
      roles: ['retreat'],
    },
  ],
};
