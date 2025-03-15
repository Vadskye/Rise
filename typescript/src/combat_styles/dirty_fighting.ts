import { CombatStyle } from '.';

export const dirtyFighting: CombatStyle = {
  name: 'Dirty Fighting',
  shortDescription: 'Disable foes using freehanded attacks and tricks.',

  maneuvers: [
    {
      name: 'Stunning Fist',

      // +2r for condition purposes due to unarmed limitation
      effect: `
        Make a strike using the punch/kick \\glossterm{natural weapon} (see \\pcref{Natural Weapons}).
        If the target loses hit points, it becomes \\stunned as a \\glossterm{condition}.
      `,
      rank: 1,
    },

    {
      name: 'Quivering Palm',

      effect: `
        Make a strike using the punch/kick \\glossterm{natural weapon} (see \\pcref{Natural Weapons}).
        If the target loses hit points, it takes \\damagerankseven.
      `,
      rank: 5,
    },

    {
      name: 'Stay Down',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          the target is also unable to stand up during the next movement phase.
        `,
        name: 'trip',
      },
      rank: 3,
      tags: ['Brawling'],
    },

    {
      name: 'Sweep and Slam',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          the target also takes \\damagerankfour.
          You cannot get a \\glossterm{glancing blow} with this attack.
        `,
        name: 'trip',
      },
      rank: 5,
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
      tags: ['Brawling'],
    },

    {
      name: 'Piledriver',

      // A melee range spell would deal dr3.
      // Grapple requirement offsets the higher accuracy from the Brawling tag?
      effect: `
        Make a \\glossterm{brawling attack} vs. Fortitude using a \\glossterm{free hand} against a creature you are \\glossterm{grappling}.
        \\hit The target takes \\damagerankthree.
      `,
      rank: 1,
      tags: ['Brawling'],
    },

    {
      name: 'Piledriver+',

      effect: `
        Make a \\glossterm{brawling attack} vs. Fortitude using a \\glossterm{free hand} against a creature you are \\glossterm{grappling}.
        \\hit The target takes \\damagerankseven.
      `,
      rank: 5,
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
      // If you use a Medium creature, the baseline damage is 2d6 + 1.66dpp, which is
      // roughly dr5, but with strong scaling based on the creature's size.
      effect: `
        Make an \\glossterm{brawling attack} against the Fortitude defense of a Medium or larger creature you are \\glossterm{grappling}.
        If you hit, you can make a \\glossterm{strike} with your normal accuracy using that creature as a weapon.
        The strike deals double \\glossterm{weapon damage}.
        Treat the creature as a weapon with the \\weapontag{Heavy} weapon tag that deals 1d6 damage per size category by which the creature is above Small.
        This means you normally need two free hands to make the strike.
        You must also be strong enough to carry the weapon creature normally (see \\pcref{Weight Limits}).

        The weapon creature takes damage equal to the damage dealt by the strike, ignoring any extra damage from critical hits.
      `,
      rank: 3,
      // This doesn't need to be size-based because grappling already is size-based.
      // If you can grapple above your size, we don't need to block this maneuver.
      tags: ['Brawling'],
    },

    {
      name: 'Body Bludgeon+',

      // Expected damage would be between dr8 and dr9, so about 4dpp plus some value.
      //
      // If you use a Medium creature, the baseline damage is 4d8 + 3.3dpp, which is
      // roughly dr8, but with strong scaling based on the creature's size.
      functionsLike: {
        name: "body bludgeon",
        exceptThat: `
          the strike deals quadruple \\glossterm{weapon damage}, and the weapon deals 1d8 damage per size category by which the creature is above Small (minimum 1d8).
        `,
      },
      rank: 7,
      // This doesn't need to be size-based because grappling already is size-based.
      // If you can grapple above your size, we don't need to block this maneuver.
      tags: ['Brawling'],
    },

    {
      name: 'Backbreaker',

      // A melee range spell would be rank 9, so it could get paralyzed on HP.
      // Grapple requirement offsets the higher accuracy from the Brawling tag?
      effect: `
        Make a \\glossterm{brawling attack} vs. Fortitude using a \\glossterm{free hand} against a creature you are \\glossterm{grappling}.
        \\hit The target takes \\damagerankseven.
        If it loses hit points from this damage, it becomes \\paralyzed as a \\glossterm{condition}.
      `,
      rank: 7,
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
      rank: 1,
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
      rank: 5,
      tags: ['Brawling'],
    },

    {
      name: 'Pin',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          if the target has no remaining \\glossterm{damage resistance}, it is pinned completely instead of simply grappled.
          It is effectively \\paralyzed, except that it can still use the \\textit{escape grapple} ability (see \\pcref{Escape Grapple}).
        `,
        name: 'grapple',
      },
      rank: 7,
      tags: ['Brawling'],
    },

    {
      name: 'Knock Flying',

      effect: `
        Make an \\glossterm{brawling attack} vs. Fortitude using a \\glossterm{free hand} against a creature you \\glossterm{touch}.
        You must be strong enough to carry the target.
        \\hit You \\glossterm{knockback} the target 10 feet away from you.
        \\crit Double damage and double knockback distance.
      `,
      rank: 1,
      tags: ['Brawling'],
    },

    {
      name: 'Knock Flying+',

      // TODO: what damage value makes sense here?
      effect: `
        Make an \\glossterm{brawling attack} vs. Fortitude using a \\glossterm{free hand} against a creature you \\glossterm{touch}.
        You must be strong enough to carry the target.
        \\hit \\damagerankthree.
        In addition, you \\glossterm{knockback} the target 20 feet away from you.
        \\crit Double damage and double knockback distance.
      `,
      rank: 5,
      tags: ['Brawling'],
    },

    {
      name: 'Disarm',

      effect: `
        Make a melee \\glossterm{strike}.
        \\hit If your attack also hits the target's Fortitude and Reflex defenses, it drops one item of your choice that it is holding in a single hand.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures that are two or more size categories larger than you.
      `,
      rank: 5,
    },

    {
      name: 'Steal Weapon',

      functionsLike: {
        exceptThat: `
          you can immediately grab a disarmed object if you have a \\glossterm{free hand} available, including a hand you used for this ability.
        `,
        name: 'disarm',
      },
      rank: 7,
    },

    {
      name: 'Battering Ram',

      functionsLike: {
        abilityType: 'ability',
        // This is basically a 30' line of standard AOE damage, -1d because it's easier to optimize
        exceptThat: `
          it requires a standard action to use and does not increase your \\glossterm{fatigue level}.
          % TODO: clarify that this doesn't work with "move through enemies freely" abilities
          In addition, creatures cannot choose to avoid you, and all creatures that you move through takes \\damageranktwo.
        `,
        name: 'overrun',
      },
      rank: 3,
      tags: ['Brawling'],
    },

    {
      name: 'Battering Ram+',

      functionsLike: {
        abilityType: 'maneuver',
        exceptThat: `
          the damage increases to \\damageranksix.
        `,
        name: 'battering ram',
      },
      rank: 7,
    },

    {
      name: 'Alchemical Admixture',

      effect: `
        Make a melee \\glossterm{strike}.
        In addition, you can throw a tanglefoot bag, vial of alchemist's fire, or similar small object at a target of the strike.
        You must still have a free hand that is not being used to make the strike to throw the object.
      `,
      rank: 3,
    },

    {
      name: 'Sweep the Leg',

      effect: `
        Make a melee \\glossterm{strike}.
        If the target takes damage and your attack result also hits its Fortitude defense, it falls \\prone.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures two or more size categories larger than you.
      `,
      rank: 1,
    },

    {
      name: 'Anklesprainer',

      effect: `
        Make a melee \\glossterm{strike}.
        If the target takes damage and your attack result also hits its Reflex defense, it becomes \\slowed as a \\glossterm{condition}.
      `,
      rank: 3,
    },

    {
      name: 'Anklesprainer+',

      effect: `
        Make a melee \\glossterm{strike} that deals double \\glossterm{weapon damage}.
        If the target takes damage and your attack result also hits its Reflex defense, it becomes \\slowed as a \\glossterm{condition}.
      `,
      rank: 5,
    },

    {
      name: 'Switchstrike',

      effect: `
        Make a melee \\glossterm{strike}.
        If the target takes damage, you may switch spaces with it, as long as this would not result in either of you entering a occupied space.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 1,
    },

    {
      name: 'Eyebite',

      effect: `
        Make a \\glossterm{strike}.
        If the target takes damage and your attack result also hits its Reflex defense, it treats you as being \\trait{invisible} as a \\glossterm{condition} (see \\pcref{Invisible}).
      `,
      rank: 5,
    },

    {
      name: 'Eye Poke',

      effect: `
        Make a \\glossterm{strike}.
        If the target loses hit points, it becomes \\dazzled as a \\glossterm{condition}.
      `,
      rank: 1,
    },

    {
      name: 'Eye Gouge',

      effect: `
        Make a \\glossterm{strike}.
        If the target loses hit points, it becomes \\blinded as a \\glossterm{condition}.
      `,
      rank: 5,
    },

    {
      name: 'Fake Out',

      effect: `
        Make a melee \\glossterm{strike}.
        If your attack result also hits the target's Reflex defense, the strike deals \\glossterm{extra damage} equal to your power.
        If this attack misses, you \\glossterm{briefly} take a \\minus2 accuracy penalty against the target.
      `,
      rank: 3,
    },

    {
      name: 'Fake Out+',

      effect: `
        Make a melee \\glossterm{strike}.
        If your attack result also hits the target's Reflex defense, the strike deals 1d10 \\glossterm{extra damage} per 2 power.
        If this attack misses, you \\glossterm{briefly} take a \\minus2 accuracy penalty against the target.
      `,
      rank: 7,
    },
  ],
};
