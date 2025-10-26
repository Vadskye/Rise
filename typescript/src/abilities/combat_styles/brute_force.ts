import { CombatStyle } from '.';

export const bruteForce: CombatStyle = {
  name: 'Brute Force',
  shortDescription: 'Smash foes with raw power.',

  maneuvers: [
    {
      name: 'Wild Swing',

      effect: `
        Make a \\glossterm{strike} that deals double \\glossterm{weapon damage}.
        The strike has a 50\\% miss chance.
      `,
      rank: 1,
      roles: ['burst'],
    },
    {
      name: 'Wild Swing+',

      effect: `
        Make a \\glossterm{strike} that deals triple damage.
        The strike has a 50\\% miss chance.
      `,
      rank: 5,
      roles: ['burst'],
    },
    {
      name: 'Armorcrusher',

      effect: `
        Make a \\glossterm{strike}.
        The attack is made against the target's Fortitude defense instead of its Armor defense.
      `,
      rank: 1,
      roles: ['softener'],
    },
    {
      name: 'Armorcrusher+',

      effect: `
        Make a \\glossterm{strike} that deals double damage.
        The attack is made against the target's Fortitude defense instead of its Armor defense.
      `,
      rank: 5,
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

      // -2dr for 0.4 EA buff.
      attack: {
        hit: `\\damageranktwo.`,
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

      // Must be a single weapon to avoid the dual totokia nonsense
      effect: `
        Make a melee \\glossterm{strike} using a single weapon.
        If you get a \\glossterm{glancing blow}, it deals full damage instead of half damage.
        However, you cannot get a \\glossterm{critical hit}.
      `,
      roles: ['burst'],
      rank: 1,
    },

    {
      name: 'Steady Slam+',

      // Must be a single weapon to avoid the dual totokia nonsense
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
        Make a \\glossterm{strike}.
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

    // Beating the extra defense is unnecessary, but we include it for symmetry with
    // Knockdown+.
    {
      name: 'Knockdown',
      effect: `
        Make a melee \\glossterm{strike}.
        \\injury If your attack result hits the target's Brawn defense, it falls \\prone.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 1,
      roles: ['trip'],
    },

    {
      name: 'Knockdown+',
      effect: `
        Make a melee \\glossterm{strike}.
        \\hit If your attack result hits the target's Brawn defense, it falls \\prone.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 3,
      roles: ['trip'],
    },

    // Brief empower costs 0.7 EA, and brief goad costs 1.0 EA. Total is 1.7 EA, or r3.
    {
      name: 'Ostentatious Flex',

      attack: {
        hit: `The target is \\glossterm{briefly} \\goaded by you.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} within a \\medarea radius from you.
          Then, you are \\glossterm{briefly} \\empowered.
        `,
      },
      rank: 3,
      roles: ['generator'],
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
      name: 'Mighty Muscle Burst',

      // With a fatigue, expected damage is drX-3 = dr4.
      effect: `
        You are \\glossterm{briefly} \\empowered.
        Make a \\glossterm{strike} with that deals double damage.
        Then, you are \\glossterm{briefly} \\maximized.
      `,
      rank: 7,
      roles: ['generator'],
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

    // Treat a no-condition brawling attack as being about +2 accuracy, so -1dr.
    // You have to have extremely high strength to get above +2 accuracy diff.
    // However, pure brawling attacks are still dangerous from an optimization
    // perspective, so they always have to be more complicated than pure damage.
    {
      name: 'Chokeslam',

      attack: {
        hit: `\\damagerankthree.`,
        injury: `The target falls \\prone.`,
        targeting: `
          Make a \\glossterm{brawling attack} vs. Brawn against one creature you \\glossterm{touch}.
        `,
      },
      rank: 3,
      roles: ['burst'],
      tags: ['Brawling'],
    },

    {
      name: 'Chokeslam+',

      attack: {
        hit: `\\damagerankseven, and the target falls \\prone.`,
        injury: `The target is \\glossterm{briefly} unable to stand.`,
        targeting: `
          Make a \\glossterm{brawling attack} vs. Brawn against one creature you \\glossterm{touch}.
        `,
      },
      rank: 7,
      roles: ['burst'],
      tags: ['Brawling'],
    },

    // -1dr for brawling attack, +1dr for stun, -1dr for accuracy.
    // Assume you have 4 str at level 1.
    // Using this attack, you deal 1d10+2 damage with +2 accuracy.
    // Using a greataxe, you deal 1d10+4 damage with +0 accuracy.
    // It's a pretty even trade at that level, +2 accuracy for -2 damage, and over time
    // the greataxe will scale better.
    {
      name: 'Body Slam',

      attack: {
        hit: `\\damageranktwo.`,
        targeting: `
          Make a \\glossterm{brawling attack} vs. Brawn against one creature you \\glossterm{touch}.
          Then, you fall \\prone.
        `,
      },
      rank: 1,
      roles: ['burst'],
      tags: ['Brawling'],
    },

    {
      name: 'Body Slam+',

      attack: {
        hit: `\\damageranksix.`,
        targeting: `
          Make a \\glossterm{brawling attack} vs. Brawn against one creature you \\glossterm{touch}.
          Then, you fall \\prone.
        `,
      },
      rank: 5,
      roles: ['burst'],
      tags: ['Brawling'],
    },

    {
      name: 'Boneshatter',

      effect: `
        Make a \\glossterm{strike}.
        \\injury If your attack result hits the target's Fortitude defense, it immediately takes the damage from the strike again.
      `,
      rank: 3,
      roles: ['execute'],
    },

    {
      name: 'Boneshatter+',

      effect: `
        Make a \\glossterm{strike} that deals six times \\glossterm{weapon damage}.
        \\injury If your attack result hits the target's Fortitude defense, it immediately takes the damage from the strike again.
      `,
      rank: 7,
      roles: ['execute'],
    },

    {
      name: 'Forceful Smash',

      effect: `
        Make a melee \\glossterm{strike}.
        \\injury If your attack result hits the target's Brawn defense, you \\glossterm{fling} it 15 feet.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 1,
      roles: ['payoff'],
    },

    {
      name: 'Forceful Smash+',

      effect: `
        Make a melee \\glossterm{strike} that deals double damage.
        \\injury If your attack result hits the target's Brawn defense, you \\glossterm{fling} it 30 feet.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 5,
      roles: ['payoff'],
    },
    {
      name: 'Heavy Hitter',

      effect: `
        Make a \\glossterm{strike} using a \\weapontag{Heavy} weapon that deals quadruple \\glossterm{weapon damage}.
      `,
      rank: 5,
      roles: ['burst'],
    },
  ],
};
