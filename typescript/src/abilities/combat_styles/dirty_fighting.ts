import { CombatStyle } from '.';
import { MULTIHIT_CRIT } from '@src/abilities/constants';

export const dirtyFighting: CombatStyle = {
  name: 'Dirty Fighting',
  shortDescription: 'Disable foes using freehanded attacks and tricks.',

  maneuvers: [
    // +0.4EA as a bonus for requiring punch/kick
    {
      name: 'Stunning Fist',

      effect: `
        Make a strike using the punch/kick \\glossterm{natural weapon} (see \\pcref{Natural Weapons}).
        \\hit The target is \\glossterm{briefly} \\stunned.
        \\injury The target is stunned as a \\glossterm{condition}.
      `,
      rank: 3,
      roles: ['softener', 'maim'],
    },

    {
      name: 'Quivering Palm',

      // A melee range injury-only spell would be dr9, or 9 + 4.5dpp.
      // Punch/kick has +2a, so -1dr, so 3.5 + 3.5dpp.
      // dr6 plus strike is about 4.5 + 2.25dpp + 3.5 + 0.5dpp = 8 + 2.75dpp.
      // That seems like a reasonable discount for the extra scaling you get with strikes.
      effect: `
        Make a strike using the punch/kick \\glossterm{natural weapon} (see \\pcref{Natural Weapons}).
        \\injury The target takes \\damageranksix.
        % TODO: wording
        \\crit ${MULTIHIT_CRIT}
      `,
      rank: 5,
      roles: ['execute'],
    },

    {
      name: 'Quivering Palm+',

      // Spell would be dr10, or 11 + 5.5dpp.
      // This is (4.5 + 0.5dpp) * 2 + 3.5 + 3.5dpp = 12.5 + 4.5dpp.
      effect: `
        Make a strike that deals double damage using the punch/kick \\glossterm{natural weapon} (see \\pcref{Natural Weapons}).
        \\injury The target takes \\damagerankeight.
        \\crit ${MULTIHIT_CRIT}
      `,
      rank: 7,
      roles: ['execute'],
    },

    // TODO: unclear EA?
    {
      name: 'Stay Down',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          the target is also \\glossterm{briefly} unable to stand up.
        `,
        name: 'trip',
      },
      rank: 5,
      roles: ['trip'],
      tags: ['Brawling'],
    },

    // Normal melee damage would be dr5, -1dr for brawling, -1dr for 
    {
      name: 'Sweep and Slam',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          the target also takes \\damagerankthree.
          You cannot get a \\glossterm{glancing blow} with this attack.
        `,
        name: 'trip',
      },
      rank: 3,
      roles: ['trip'],
      tags: ['Brawling'],
    },

    {
      name: 'Takedown',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          the target also falls \\prone.
        `,
        name: 'grapple',
      },
      rank: 3,
      roles: ['softener', 'trip'],
      tags: ['Brawling'],
    },

    {
      name: 'Piledriver',

      // A melee range spell would deal dr3.
      // Grapple requirement offsets the higher accuracy from the Brawling tag?
      attack: {
        hit: '\\damagerankthree.',
        targeting: `
          Make a \\glossterm{brawling attack} vs. Brawn using a \\glossterm{free hand} against a creature you are \\glossterm{grappling}.
        `,
      },
      rank: 1,
      roles: ['burst', 'payoff'],
      tags: ['Brawling'],
    },

    {
      name: 'Piledriver+',

      attack: {
        hit: '\\damagerankseven.',
        targeting: `
          Make a \\glossterm{brawling attack} vs. Brawn using a \\glossterm{free hand} against a creature you are \\glossterm{grappling}.
        `,
      },
      rank: 5,
      roles: ['burst', 'payoff'],
      tags: ['Brawling'],
    },

    {
      name: 'Body Bludgeon',

      // The baseline for this is using a creature to hit the ground. A linear upgrade from
      // Piledriver would expect to deal dr5 in that circumstance, though being able to
      // hit another creature means the damage can be closer to dr4, so about 1.75dpp plus
      // some amount.
      // Assume the Brawling accuracy bonus offsets the grapple requirement.
      //
      // If you use a Medium creature, the baseline damage is 2d6 + 0.83dpp, which is
      // roughly dr4, but with strong scaling based on the creature's size.
      attack: {
        hit: `
          You can make a \\glossterm{strike} with your normal accuracy using that creature as a weapon.
          Treat the creature as a \\weapontag{Heavy} weapon that deals 2d6 damage per size category by which the creature is above Small.
          You must also be strong enough to carry the weapon creature normally (see \\pcref{Weight Limits}).
          % TODO: clarify how this interacts with Sweeping
          The weapon creature takes damage equal to the damage dealt by the strike, ignoring any damage increase from critical hits.
        `,
        targeting: `
          Make an \\glossterm{brawling attack} against the Brawn defense of a Medium or larger creature you are \\glossterm{grappling}.
        `,
      },
      rank: 3,
      roles: ['burst', 'payoff'],
      // This doesn't need to be size-based because grappling already is size-based.
      // If you can grapple above your size, we don't need to block this maneuver.
      tags: ['Brawling'],
    },

    {
      name: 'Body Bludgeon+',

      // Expected damage would be about dr8, so about 3.5dpp plus some value.
      //
      // If you use a Medium creature, the baseline damage is 6d6 + 2dpp, which is
      // roughly dr8, but with strong scaling based on the creature's size.
      functionsLike: {
        name: 'body bludgeon',
        exceptThat: `
          the strike deals triple damage.
        `,
      },
      rank: 7,
      roles: ['burst', 'payoff'],
      // This doesn't need to be size-based because grappling already is size-based.
      // If you can grapple above your size, we don't need to block this maneuver.
      tags: ['Brawling'],
    },

    {
      name: 'Backbreaker',

      // A damage + debuff slow is 2.6 EA, so rank 7, or rank 5 if melee range.
      attack: {
        hit: '\\damageranksix.',
        injury: 'The target is \\slowed as a \\glossterm{condition}.',
        targeting: `
          Make a \\glossterm{brawling attack} vs. Brawn using a \\glossterm{free hand} against a creature you are \\glossterm{grappling}.
        `,
      },
      rank: 5,
      roles: ['maim', 'payoff'],
      tags: ['Brawling'],
    },

    {
      name: 'Strangle',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          the target also takes \\damageranktwo damage.
          You cannot get a \\glossterm{glancing blow} with this attack.
        `,
        name: 'grapple',
      },
      rank: 3,
      roles: ['softener'],
      tags: ['Brawling'],
    },

    {
      name: 'Muzzling Grapple',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          the target also has a 20\\% \\glossterm{failure chance} with abilities that have \\glossterm{verbal components} as long as it is \\grappled by you.
        `,
        name: 'grapple',
      },
      rank: 3,
      roles: ['softener'],
      tags: ['Brawling'],
    },

    {
      name: 'Muzzling Grapple+',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          the target also has a 50\\% \\glossterm{failure chance} with abilities that have \\glossterm{verbal components} as long as it is \\grappled by you.
        `,
        name: 'grapple',
      },
      rank: 7,
      roles: ['softener'],
      tags: ['Brawling'],
    },

    // Price as "stunned as a condition" in melee range; grappled requirement offsets
    // ability to use brawling accuracy
    {
      name: 'Pin',

      attack: {
        hit: `
          The defense penalties the target suffers from being \\grappled are doubled as long as the grapple continues.
          In addition, it takes a \\minus2 penalty to the \\ability{escape grapple} ability.
          These penalties do not stack if you use this ability multiple times.
        `,
        targeting: `
          Make a \\glossterm{brawling attack} vs. Brawn using a \\glossterm{free hand} against a creature you are \\glossterm{grappling}.
        `,
      },
      rank: 7,
      roles: ['maim'],
      tags: ['Brawling'],
    },

    {
      name: 'Fling',

      // -1r for using brawling accuracy? A 30' fling would normally be r2.
      attack: {
        hit: `
          If the target is \\glossterm{injured}, you \\glossterm{fling} it up to 30 feet.
        `,
        targeting: `
          Make an \\glossterm{brawling attack} vs. Brawn using a \\glossterm{free hand} against a creature you \\glossterm{touch}.
          The target's \\glossterm{weight category} must be below the maximum weight category you can lift normally (see \\pcref{Weight Categories}).
        `,
      },
      rank: 3,
      roles: ['maim'],
      tags: ['Brawling'],
    },

    {
      name: 'Fling+',

      attack: {
        hit: '\\damagerankeight.',
        injury: 'You \\glossterm{fling} the target up to 30 feet.',
        targeting: `
          Make an \\glossterm{brawling attack} vs. Brawn using a \\glossterm{free hand} against a creature you \\glossterm{touch}.
          The target's \\glossterm{weight category} must be below the maximum weight category you can lift normally (see \\pcref{Weight Categories}).
        `,
      },
      rank: 7,
      roles: ['burst', 'maim'],
      tags: ['Brawling'],
    },

    {
      name: 'Disarm',

      effect: `
        Make a \\glossterm{strike}.
        \\injury If your attack hits the target's Brawn defense, it drops one item of your choice that it is holding in a single hand.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures that are two or more size categories larger than you.
      `,
      rank: 3,
      roles: ['maim'],
    },

    {
      name: 'Steal Weapon',

      functionsLike: {
        exceptThat: `
          you can immediately grab a disarmed object if you have a \\glossterm{free hand} available, including a hand you used for this ability.
          If you take a weapon in this way, you can make a \\glossterm{strike} with it.
        `,
        name: 'disarm',
      },
      rank: 5,
      roles: ['maim'],
    },

    {
      name: 'Alchemical Admixture',

      effect: `
        Make a melee \\glossterm{strike}.
        In addition, you can throw a tanglefoot bag, vial of alchemist's fire, or similar small object at a target of the strike.
        You must still have a free hand that is not being used to make the strike to throw the object.
      `,
      rank: 3,
      roles: ['burst', 'softener'],
    },

    {
      name: 'Anklebreaker',

      effect: `
        Make a \\glossterm{strike} that deals triple damage.
        If you get a \\glossterm{critical hit}, the target is \\glossterm{briefly} \\slowed.
      `,
      rank: 7,
      roles: ['softener'],
    },

    {
      name: 'Eyebite',

      effect: `
        Make a melee \\glossterm{strike} that deals double damage.
        \\injury If your attack hits the target's Reflex defense, it treats you as being \\trait{invisible} as a \\glossterm{condition} (see \\pcref{Invisible}).
      `,
      rank: 5,
      roles: ['maim'],
    },

    {
      name: 'Eye Poke',

      effect: `
        Make a \\glossterm{strike}.
        \\hit If your attack result also hits the target's Fortitude defense, it is \\glossterm{briefly} \\dazzled.
      `,
      rank: 1,
      roles: ['softener'],
    },

    {
      name: 'Eye Gouge',

      effect: `
        Make a melee \\glossterm{strike} that deals triple damage.
        \\injury If your attack result also hits the target's Fortitude defense, it is \\glossterm{briefly} \\blinded.
      `,
      rank: 7,
      roles: ['maim'],
    },

    {
      name: 'Fake Out',

      effect: `
        Make a melee \\glossterm{strike}.
        If your attack result hits the target's Reflex defense, the strike deals \\glossterm{extra damage} equal to half your power.
        Otherwise, you \\glossterm{briefly} take a \\minus2 accuracy penalty against the target.
      `,
      rank: 3,
      roles: ['burst'],
    },

    {
      name: 'Fake Out+',

      effect: `
        Make a melee \\glossterm{strike} that deals double damage.
        If your attack result hits the target's Reflex defense, the strike deals 1d6 \\glossterm{extra damage} per 2 power.
        This extra damage is not doubled by the base double damage of the strike.
        Otherwise, you \\glossterm{briefly} take a \\minus2 accuracy penalty against the target.
      `,
      rank: 7,
      roles: ['burst'],
    },

    {
      name: 'Disappearing Act',

      // This gets r0 area instead of r1 because Reflex defense is easy to hit.
      attack: {
        hit: `The target \\glossterm{briefly} treats you as if you were \\trait{invisible}.`,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you.
        `,
      },
      rank: 1,
      roles: ['flash'],
    },

    {
      name: 'Disappearing Act+',

      // Brief invis is r0. Enemies in Med radius is a r3 area. We drop to r3 for focus.
      // This seems like a strong combo, so we don't layer any other benefits on it. Maybe
      // Reflex defense is too easy to hit for such a strong debuff?
      attack: {
        hit: `The target \\glossterm{briefly} treats you as if you were \\trait{invisible}.`,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} within a \\medarea radius from you.
          Then, you are \\glossterm{briefly} \\focused.
        `,
      },
      rank: 5,
      roles: ['generator', 'flash'],
    },

    {
      name: 'Gutshot',

      effect: `
        Make a melee strike.
        \\injury If your attack result hits the target's Fortitude defense, it is \\glossterm{briefly} \\stunned.
      `,
      rank: 1,
      roles: ['maim'],
    },

    {
      name: 'Gutshot+',

      effect: `
        Make a melee strike that deals double damage.
        \\hit If your attack result hits the target's Fortitude defense, it is \\glossterm{briefly} \\stunned.
        \\injury If your attack result hits the target's Fortitude defense, it is stunned as a \\glossterm{condition}.
      `,
      rank: 5,
      roles: ['maim'],
    },

    {
      name: 'Crush the Fallen',

      effect: `
        Make a melee strike.
        If the target is \\prone, the strike deals \\glossterm{extra damage} equal to half your \\glossterm{power}.
      `,
      rank: 1,
      roles: ['payoff'],
    },

    {
      name: 'Crush the Fallen+',

      effect: `
        Make a melee strike.
        If the target is \\prone, the strike deals triple damage.
      `,
      rank: 5,
      roles: ['payoff'],
    },
  ],
};
