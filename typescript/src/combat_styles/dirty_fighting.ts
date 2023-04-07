import { CombatStyle } from '.';

export const dirtyFighting: CombatStyle = {
  name: 'Dirty Fighting',
  shortDescription: 'Disable foes using freehanded attacks and tricks.',

  maneuvers: [
    {
      name: 'Dazing Fist',

      // -2 ranks / non-weak due to unarmed limitation
      effect: `
        Make a strike using the punch/kick \\glossterm{natural weapon} (see \\pcref{Natural Weapons}).
        Each damaged creature becomes \\dazed as a \\glossterm{condition} if your attack result beats its Fortitude defense.
      `,
      rank: 1,
    },

    {
      name: 'Stunning Fist',

      // -2 ranks due to unarmed limitation
      effect: `
        Make a \\glossterm{weak strike} using the punch/kick \\glossterm{natural weapon} (see \\pcref{Natural Weapons}).
        Each damaged creature becomes \\stunned as a \\glossterm{condition} if your attack result beats its Fortitude defense.
      `,
      rank: 3,
    },

    {
      name: 'Quivering Palm',

      effect: `
        Make a strike using the punch/kick \\glossterm{natural weapon} (see \\pcref{Natural Weapons}).
        Each creature that loses \\glossterm{hit points} from the strike takes \\damagerankseven{bludgeoning} if your attack result beats its Fortitude defense.
      `,
      rank: 5,
    },

    {
      name: 'Strangle',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          the target also takes \\damageranktwo{bludgeoning} damage.
          Any accuracy bonuses you have that apply specifically to the \\textit{grapple} ability also apply to this ability.
        `,
        name: 'grapple',
      },
      rank: 3,
    },

    {
      name: 'Muzzling Grapple',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          the target also has a 20\\% \\glossterm{failure chance} with abilities that have \\glossterm{verbal components} as long as it is \\grappled by you.
          Any accuracy bonuses you have that apply specifically to the \\textit{grapple} ability also apply to this ability.
        `,
        name: 'grapple',
      },
      rank: 1,
    },

    {
      name: 'Muzzling Grapple+',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          the target also has a 50\\% \\glossterm{failure chance} with abilities that have \\glossterm{verbal components} as long as it is \\grappled by you.
          Any accuracy bonuses you have that apply specifically to the \\textit{grapple} ability also apply to this ability.
        `,
        name: 'grapple',
      },
      rank: 5,
    },

    {
      name: 'Pin',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          if the target has no remaining \\glossterm{damage resistance}, it is pinned completely instead of simply grappled.
          It is \\helpless, and the only physical ability it can use is the \\textit{escape grapple} ability (see \\pcref{Escape Grapple}).
          Any accuracy bonuses you have that apply specifically to the \\textit{grapple} ability also apply to this ability.
        `,
        name: 'grapple',
      },
      rank: 7,
    },

    {
      name: 'Knockback Shove',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you \\glossterm{knockback} the target up to 15 feet instead of pushing it.
          On a critical hit, you knockback the target 30 feet instead.
          Any accuracy bonuses you have that apply specifically to the \\textit{shove} ability also apply to this ability.
        `,
        name: 'shove',
      },
      rank: 1,
    },

    {
      name: 'Knockback Sweep',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          it affects up to three creatures adjacent to you instead of only one.
          In addition, you \\glossterm{knockback} each target up to 15 feet instead of pushing it.
          On a critical hit, you knockback each target 30 feet instead.
          Any accuracy bonuses you have that apply specifically to the \\textit{shove} ability also apply to this ability.
        `,
        name: 'shove',
      },
      rank: 3,
    },

    {
      name: 'Disarm',

      effect: `
        Make a melee \\glossterm{strike}.
        If your attack result beats a damaged creature's Fortitude and Reflex defenses, it drops one item of your choice that it is holding in a single hand.
      `,
      rank: 5,
      tags: ['Size-Based'],
    },

    {
      name: 'Steal Weapon',

      functionsLike: {
        exceptThat: `
          you can immediately grab a disarmed object if you have a \\glossterm{free hand} available, including a hand you used for this ability.
          Any accuracy bonuses you have that apply specifically to the \\textit{disarm} ability also apply to this ability.
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
          In addition, creatures cannot choose to avoid you, and each creature that you move through takes \\damageranktwo{bludgeoning}.
          Any accuracy bonuses you have that apply specifically to the \\textit{overrun} ability also apply to this ability.
        `,
        name: 'overrun',
      },
      rank: 3,
    },

    {
      name: 'Battering Ram+',

      functionsLike: {
        abilityType: 'maneuver',
        exceptThat: `
          the damage increases to \\damageranksix{bludgeoning}.
        `,
        name: 'battering ram',
      },
      rank: 7,
    },

    {
      name: 'Alchemical Strike',

      effect: `
        Make a melee \\glossterm{weak strike}.
        In addition, you can throw a tanglefoot bag, vial of alchemist's fire, or similar small object at a target of the strike.
        You must still have a free hand that is not being used to make the strike to throw the object.
      `,
      rank: 3,
    },

    {
      name: 'Slipstrike',

      effect: `
        Make a melee \\glossterm{strike} with a +1 accuracy bonus.
        After making the strike, you fall \\prone.
      `,
      rank: 1,
    },

    {
      name: 'Sweep the Leg',

      effect: `
        Make a melee \\glossterm{weak strike}.
        Each Large or smaller damaged creature falls \\prone if your attack result beats its Fortitude defense.
      `,
      rank: 1,
    },

    {
      name: 'Anklesprainer',

      effect: `
        Make a melee \\glossterm{strike}.
        Each damaged creature is \\slowed as a \\glossterm{condition} if your attack result beats its Reflex defense.
      `,
      rank: 5,
    },

    {
      name: 'Switchstrike',

      effect: `
        Make a melee \\glossterm{strike}.
        You may switch places with one damaged creature that is the same \\glossterm{size category} as you or smaller.
      `,
      rank: 1,
    },

    {
      name: 'Eye-Averting Strike',

      effect: `
        Make a \\glossterm{strike}.
        As a \\glossterm{condition}, each creature that loses \\glossterm{hit points} from the strike treats you as being \\trait{invisible} (see \\pcref{Invisible}).
      `,
      rank: 5,
    },

    {
      name: 'Eye Poke',

      effect: `
        Make a \\glossterm{strike}.
        Each damaged creature is \\dazzled as a \\glossterm{condition} if your attack result beats its Reflex defense.
      `,
      rank: 3,
    },

    {
      name: 'Eye Gouge',

      effect: `
        Make a \\glossterm{strike}.
        Each creature that loses \\glossterm{hit points} from the strike is \\blinded as a \\glossterm{condition} if your attack result beats its Reflex defense.
      `,
      rank: 5,
    },

    {
      name: 'Fake-Out Assault',

      effect: `
        Make a melee \\glossterm{strike}.
        If your attack result beats a target's Reflex defense, the strike deals 1d6 \\glossterm{extra damage} per 4 power (minimum 1d6) against that target.
        After you attack a creature with this ability, it \\glossterm{briefly} becomes immune to the extra damage from this ability.
      `,
      rank: 3,
    },

    {
      name: 'Fake-Out Assault+',

      effect: `
        Make a melee \\glossterm{strike}.
        If your attack result beats a target's Reflex defense, the strike deals 1d10 \\glossterm{extra damage} per 3 power against that target.
        After you attack a creature with this ability, it \\glossterm{briefly} becomes immune to the extra damage from this ability.
      `,
      rank: 7,
    },
  ],
};
