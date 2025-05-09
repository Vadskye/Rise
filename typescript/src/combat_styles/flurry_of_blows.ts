import { CombatStyle } from '.';

export const flurryOfBlows: CombatStyle = {
  name: 'Flurry of Blows',
  shortDescription: 'Attack too rapidly for your foes to react.',

  maneuvers: [
    {
      name: 'Double Flurry',

      effect: `
        Make two \\glossterm{strikes}.
      `,
      rank: 5,
      roles: ['burst'],
    },

    {
      name: 'Triple Flurry',

      effect: `
        Make three \\glossterm{strikes}.
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
        Make three \\glossterm{strikes} with a \\minus2 accuracy penalty.
        You cannot use the \\textit{desperate exertion} ability to affect these strikes.
      `,
      rank: 5,
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
        Make a melee \\glossterm{strike} with a -1 accuracy penalty that deals double damage.
        The strike targets all \\glossterm{enemies} adjacent to you.
      `,
      rank: 5,
      roles: ['clear'],
    },

    {
      name: 'Whirlwind Flurry',

      effect: `
        Make three melee \\glossterm{strikes} with a -2 accuracy penalty.
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
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon against everything in a \\smallarea cone from you.
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
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon against everything in a \\largearea cone from you.
        You take a -1 accuracy penalty with the strike, but it deals double damage.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        You also still take the normal -4 accuracy penalty for attacking an adjacent creature with a Projectile weapon (see \\pcref{Weapon Tags}).
      `,
      rank: 5,
      roles: ['clear'],
    },

    {
      name: 'Rain of Arrows',

      // A standard rank 3 AOE damage spell would affect a Med radius in Med range and
      // deal 3.5 + 1pp. This strike using a longbow would deal 3.5 + 0.5dpp.
      effect: `
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon against all creatures in a \\smallarea radius within \\longrange.
        This requires shooting your weapon five times as part of the strike to cover the full area.
        On a miss, you still deal half damage.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
      `,
      rank: 3,
      roles: ['artillery'],
    },

    {
      name: 'Rain of Arrows+',

      // A standard rank 7 AOE damage spell with a range bonus would affect a Medium radius in Extreme range and
      // deal 3.5 + 1.75dpp. This strike using a longbow would deal 7 + 1dpp.
      effect: `
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon against all creatures in a \\medarea radius within \\extrange.
        The strike deals double damage.
        This requires shooting your weapon five times as part of the strike to cover the full area.
        On a miss, you still deal half damage.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
      `,
      rank: 7,
      roles: ['artillery'],
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
        Make a \\glossterm{strike}.
        \\hit Make an additional strike against all creatures that lost hit points from the first strike.
        The second strike cannot target any other creatures.
      `,
      rank: 3,
      roles: ['execute'],
    },

    {
      name: 'Deathseeking Flurry+',

      effect: `
        Make a \\glossterm{strike} that deals double damage.
        \\hit Make an additional strike against all creatures that lost hit points from the first strike.
        The second strike deals double damage, and cannot target any other creatures.
      `,
      rank: 7,
      roles: ['execute'],
    },

    {
      name: 'Static Shock',

      effect: `
        Make a \\glossterm{strike}.
        If the target loses hit points and your attack result hits its Fortitude defense, it becomes \\stunned as a \\glossterm{condition}.
      `,
      rank: 3,
      roles: ['maim'],
      tags: ['Electricity'],
    },

    {
      name: 'Static Shock+',

      effect: `
        Make a \\glossterm{strike} that deals triple damage.
        If the target takes damage, it is \\glossterm{briefly} \\stunned.
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
        Make three melee \\glossterm{strikes} with a \minus1 accuracy penalty.
        If all three strikes deal damage and also hit the target's Fortitude defense, it is \\glossterm{briefly} \\blinded.
      `,
      rank: 7,
      roles: ['softener'],
    },

    {
      name: 'Dazzling Speed',

      effect: `
        Make a \\glossterm{strike}.
        If the target takes damage, it is \\glossterm{briefly} \\dazzled.
      `,
      rank: 3,
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
      roles: ['softener'],
      tags: ['Swift (see text)'],
    },

    {
      name: 'Guardweave',

      effect: `
        You are \\shielded this round.
        Make a \\glossterm{strike}.
        The shielding is a \\atSwift effect, but the strike is not.
      `,
      rank: 3,
      roles: ['softener'],
      tags: ['Swift (see text)'],
    },

    {
      name: 'Focusing Frenzy',

      effect: `
        Make a \\glossterm{strike} with a -2 accuracy penalty.
        Then, you are \\glossterm{briefly} \\focused.
      `,
      rank: 3,
      roles: ['generator'],
    },

    {
      name: 'Building Storm',

      effect: `
        You \\glossterm{briefly} become \\focused and gain a \plus10 foot bonus to your speed.
      `,
      rank: 1,
      roles: ['focus'],
    },

    {
      name: 'Building Storm+',

      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        You \\glossterm{briefly} become \\primed and gain a \plus20 foot bonus to your speed.
      `,
      rank: 5,
      roles: ['focus'],
    },
  ],
};
