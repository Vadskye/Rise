import { CombatStyle } from '.';

export const flurryOfBlows: CombatStyle = {
  name: 'Flurry of Blows',
  shortDescription: 'Attack too rapidly for your foes to react.',

  maneuvers: [
    {
      name: 'Double Flurry',

      effect: `
        Make two \\glossterm{strikes} with a \\plus1 accuracy bonus.
      `,
      rank: 5,
      roles: ['burst'],
    },

    {
      name: 'Triple Flurry',

      effect: `
        Make three \\glossterm{strikes} with a \\plus1 accuracy bonus.
      `,
      rank: 7,
      roles: ['burst'],
    },

    {
      name: 'Rapid Quaff',

      effect: `
        Make a strike.
        In addition, you can drink a potion.
        You must still have a free hand that is not being used to make the strike to hold and drink the potion.
      `,
      rank: 3,
      roles: ['healing'],
    },

    {
      name: 'Desperate Double Flurry',

      // Assume a 70% hit chance, so base 0.7x dpr.
      // This is 1.0x dpr, so 42% more damage than a regular strike.
      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        Make two \\glossterm{strikes} with a \\minus2 accuracy penalty.
        You cannot use the \\textit{desperate exertion} ability to affect these strikes.
      `,
      rank: 3,
      roles: ['burst', 'exertion'],
    },

    {
      name: 'Desperate Triple Flurry',

      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        Make three \\glossterm{strikes} with a \\minus1 accuracy penalty that deal triple \\glossterm{weapon damage}.
        You cannot use the \\textit{desperate exertion} ability to affect these strikes.
      `,
      rank: 7,
      roles: ['burst', 'exertion'],
    },

    {
      name: 'Whirlwind',

      effect: `
        Make a melee \\glossterm{strike} with a -1 accuracy penalty.
        The strike targets all \\glossterm{enemies} adjacent to you.
      `,
      rank: 1,
      roles: ['clear'],
    },

    {
      name: 'Whirlwind+',

      effect: `
        Make a melee \\glossterm{strike} that deals double damage.
        The strike targets all \\glossterm{enemies} adjacent to you.
      `,
      rank: 5,
      roles: ['clear'],
    },

    {
      name: 'Whirlwind Flurry',

      effect: `
        Make three melee \\glossterm{strikes} with a -1 accuracy penalty.
        The strikes target all \\glossterm{enemies} adjacent to you.
      `,
      rank: 7,
      roles: ['clear'],
    },

    {
      name: 'Barrage',

      effect: `
        Make two ranged \\glossterm{strikes} using \\weapontag{Projectile} weapons.
        You take a -5 accuracy penalty with both strikes, and any \\glossterm{longshot penalty} that applies to the strikes is doubled.
        For each previous consecutive round that you used this ability in the same location, you reduce this accuracy penalty by 1.
      `,
      rank: 3,
      roles: ['ramp'],
    },

    {
      name: 'Fragmentary Burst',

      effect: `
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon.
        The strike targets everything in a \\smallarea cone from you.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        You also still take the normal -4 accuracy penalty for attacking an adjacent creature with a Projectile weapon (see \\pcref{Weapon Tags}).
      `,
      rank: 1,
      roles: ['clear'],
    },

    {
      name: 'Fragmentary Burst+',

      // Double damage with a heavy crossbow is 11 + 1dpp.
      // A standard rank 5 AOE damage spell would affect a Huge cone and deal 1.75dpp.
      // Seems close enough.
      effect: `
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon.
        The strike targets everything in a \\largearea cone from you.
        You take a -1 accuracy penalty with the strike, but it deals double damage.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        You also still take the normal -4 accuracy penalty for attacking an adjacent creature with a Projectile weapon (see \\pcref{Weapon Tags}).
      `,
      rank: 5,
      roles: ['clear'],
    },

    {
      name: 'Rain of Arrows',

      // A standard rank 5 AOE damage spell with extended area scaling would use dr2, so
      // 3.5 + 1dpp. This strike using a longbow would deal 3.5 + 0.5dpp.
      effect: `
        Choose a \\smallarea radius within \\longrange.
        You shoot a volley of projectiles into their air that arc towards that area.
        This requires shooting a \\weapontag{Projectile} weapon five times to cover the full area.
        Creature can generally recognize the area that the arrows will land in with a DV 15 Awareness check.

        During your next action, the arrows land, and you make a \\glossterm{strike} with your weapon from last round against all creatures in the area.
        The attack is a \\glossterm{reactive attack}.
        On a miss, you still deal half damage.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
      `,
      rank: 3,
      roles: ['clear'],
    },

    {
      name: 'Rain of Arrows+',

      // A standard rank 9 AOE damage spell with extended area scaling would use dr6, so
      // 4.5 + 2.75dpp. This strike using a longbow would deal 10.5 + 1.5dpp.
      functionsLike: {
        name: 'rain of arrows',
        exceptThat: 'the area increases to a \\medarea radius, and the strike deals triple damage.',
      },
      rank: 7,
      roles: ['clear'],
    },

    {
      name: 'Quickdraw',

      effect: `
        You can sheathe any non-\\weapontag{Heavy} weapons you wield, then draw one or two non-\\weapontag{Heavy} weapons into your \\glossterm{free hands}.
        Then, you can make a \\glossterm{strike} with a -1 accuracy penalty.
      `,
      rank: 1,
      roles: ['generator'],
    },

    {
      name: 'Heavy Quickdraw',

      effect: `
        You can sheathe any weapons you wield, then draw one or two weapons into your \\glossterm{free hands}.
        Then, you can make a \\glossterm{strike}.
      `,
      rank: 3,
      roles: ['generator'],
    },

    {
      name: 'Quickfire',

      effect: `
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon.
        You do not suffer the normal -4 accuracy penalty for using a Projectile weapon against a creature adjacent to you on this attack.
      `,
      rank: 1,
      roles: ['burst'],
    },

    {
      name: 'Quickfire Flurry',

      effect: `
        Make two ranged \\glossterm{strikes} using a \\weapontag{Projectile} weapon.
        You do not suffer the normal -4 accuracy penalty for using a Projectile weapon against a creature adjacent to you on this attack.
      `,
      rank: 5,
      roles: ['burst'],
    },

    {
      name: 'Deathseeking Flurry',

      effect: `
        Make a \\glossterm{strike} with a \\minus1 accuracy penalty.
        \\injury Make an additional strike with a \\minus1 accuracy penalty.
        The strike targets against all creatures that were injured by the first strike, and cannot target any other creatures.
      `,
      rank: 3,
      roles: ['execute'],
    },

    {
      name: 'Deathseeking Flurry+',

      effect: `
        Make a \\glossterm{strike} that deals double damage.
        \\injury Make an additional strike that deals triple damage.
        The strike targets against all creatures that were injured by the first strike, and cannot target any other creatures.
      `,
      rank: 7,
      roles: ['execute'],
    },

    {
      name: 'Static Shock',

      effect: `
        Make a \\glossterm{strike}.
        If your attack result hits the target's Fortitude defense, it becomes \\glossterm{briefly} \\stunned.
      `,
      rank: 3,
      roles: ['maim'],
      tags: ['Electricity'],
    },

    {
      name: 'Static Shock+',

      effect: `
        Make a \\glossterm{strike} that deals triple damage.
        \\hit The target is \\glossterm{briefly} \\stunned.
        \\injury The target is stunned as a \\glossterm{condition}.
      `,
      rank: 7,
      roles: ['softener'],
      tags: ['Electricity'],
    },

    {
      name: 'Blinding Flurry',

      // Normally blind would be too strong, but requiring all three strikes to hit
      // means this is probably fine.
      effect: `
        Make three melee \\glossterm{strikes} with a \\minus1 accuracy penalty.
        If all three strikes deal damage and also hit the target's Fortitude defense, it is \\glossterm{briefly} \\blinded.
      `,
      rank: 7,
      roles: ['softener'],
    },

    {
      name: 'Dazzling Display',

      // Dazzled is 0.6 EA and we have 1.0 EA to work with. Spending two ranks on area
      // tier gets us back to a r1 area, since we start from r-1. We only actually use a
      // r0 area.
      attack: {
        hit: `The target is \\glossterm{briefly} \\dazzled.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you.
          Then, you are \\glossterm{briefly} \\focused.
        `,
      },
      rank: 1,
      roles: ['flash', 'generator'],
    },

    {
      name: 'Dazzling Speed',

      // Missing 0.2 EA from the debuff
      effect: `
        Make a \\glossterm{strike}.
        \\hit The target is \\glossterm{briefly} \\dazzled.
      `,
      rank: 3,
      roles: ['softener'],
    },

    {
      name: 'Dazzling Speed+',

      // Should be r8, but eh
      effect: `
        Make a \\glossterm{strike} that deals triple damage.
        \\hit The target is \\dazzled as a \\glossterm{condition}.
      `,
      rank: 7,
      roles: ['softener'],
    },

    {
      name: 'Guardweave',

      effect: `
        You are \\shielded this round.
        Make a \\glossterm{strike}.
        The shielding is a \\atSwift effect, but the strike is not.
      `,
      rank: 3,
      roles: ['turtle'],
      tags: ['Swift (see text)'],
    },

    {
      name: 'Guardweave Flurry',

      effect: `
        You are \\shielded this round.
        Make three \\glossterm{strikes} with a -2 accuracy penalty.
        The shielding is a \\atSwift effect, but the strikes are not.
      `,
      rank: 7,
      roles: ['turtle'],
      tags: ['Swift (see text)'],
    },

    {
      name: 'Building Frenzy',

      effect: `
        Make a \\glossterm{strike} with a -1 accuracy penalty.
        Then, you are \\glossterm{briefly} \\focused.
      `,
      rank: 3,
      roles: ['generator'],
    },

    {
      name: 'Building Frenzy+',

      effect: `
        You are \\glossterm{briefly} \\focused.
        Then, make a \\glossterm{strike} with a -1 accuracy penalty that deals double damage.
      `,
      rank: 7,
      roles: ['generator'],
    },

    {
      name: 'Building Storm',

      effect: `
        If you hit with a strike last round, you are \\glossterm{briefly} \\primed.
      `,
      rank: 1,
      roles: ['focus'],
    },

    {
      name: 'Building Storm+',

      effect: `
        You are \\glossterm{briefly} \\primed.
        If you hit with at least two strikes last round, you are also briefly \\focused.
      `,
      rank: 5,
      roles: ['focus'],
    },

    // Brief invis is 1.2 EA. Melee extra defense allows 1.8 EA. That's probably enough to
    // allow the "if either hits" text?
    {
      name: 'Faster Than Sight',

      effect: `
        Make two melee \\glossterm{strikes}.
        If either strike hits and its attack result also hits the target's Reflex defense, the target \\glossterm{briefly} treats you as \\glossterm{invisible}.
      `,
      rank: 5,
      roles: ['trip'],
    },
  ],
};
