import { CombatStyle } from '.';

export const flurryOfBlows: CombatStyle = {
  name: 'Flurry of Blows',
  shortDescription: 'Attack too rapidly for your foes to react.',

  maneuvers: [
    {
      name: 'Double Flurry',

      effect: `
        Make two \\glossterm{strikes} with a \\minus1 accuracy penalty.
      `,
      rank: 5,
      roles: ['burst'],
    },

    {
      name: 'Triple Flurry',

      effect: `
        Make three \\glossterm{strikes} with a \\minus1 accuracy penalty.
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
      cost: 'Two \\glossterm{fatigue levels}.',
      effect: `
        Make two \\glossterm{strikes} with a \\minus2 accuracy penalty.
        You cannot use the \\textit{desperate exertion} ability to affect these strikes.
      `,
      rank: 1,
      roles: ['burst', 'exertion'],
    },

    {
      name: 'Desperate Triple Flurry',

      cost: 'Two \\glossterm{fatigue levels}.',
      effect: `
        Make three \\glossterm{strikes}.
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
      name: 'Tripping Whirlwind',

      effect: `
        Make a melee \\glossterm{strike}.
        The strike targets all \\glossterm{enemies} adjacent to you.
        If the target takes damage and your attack result also hits its Fortitude defense, it falls \\prone.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures that are two or more size categories larger than you.
      `,
      rank: 5,
      roles: ['flash'],
    },

    {
      name: 'Double Whirlwind',

      effect: `
        Make two melee \\glossterm{strikes}.
        The strikes target all \\glossterm{enemies} adjacent to you.
      `,
      rank: 7,
      roles: ['clear'],
    },

    {
      name: 'Barrage',

      effect: `
        Make two ranged \\glossterm{strikes} using \\weapontag{Projectile} weapons.
        You take a -4 accuracy penalty with both strikes, and any \\glossterm{longshot penalty} that applies to the strikes is doubled.
        For each previous consecutive round that you used this ability in the same location, you reduce this accuracy penalty by 1.
      `,
      rank: 3,
      roles: ['ramp'],
    },

    {
      name: 'Shrapnel Burst',

      effect: `
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon against everything in a \\smallarea cone from you.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
      `,
      rank: 1,
      roles: ['clear'],
    },

    {
      name: 'Shrapnel Burst+',

      // large cone instead of med cone for projectile cost
      effect: `
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon against everything in a \\largearea cone from you.
        You take a -1 accuracy penalty with the strike, but it deals \\glossterm{extra damage} equal to your power.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
      `,
      rank: 5,
      roles: ['clear'],
    },

    {
      name: 'Volley Fire',

      effect: `
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon against all creatures in a \\smallarea radius within \\medrange.
        This requires firing your weapon five times as part of the strike to cover the full area.
        On a miss, you still deal half damage.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
      `,
      rank: 3,
      roles: ['clear'],
    },

    {
      name: 'Volley Fire+',

      // Technically t6 area instead of t7, but whatever
      effect: `
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon against all creatures in a \\medarea radius within \\distrange.
        The strike deals \\glossterm{extra damage} equal to your power.
        This requires firing your weapon five times as part of the strike to cover the full area.
        On a miss, you still deal half damage.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
      `,
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
      roles: ['burst'],
    },

    {
      name: 'Heavy Quickdraw',

      effect: `
        You can sheathe any weapons you wield, then draw one or two weapons into your \\glossterm{free hands}.
        Then, you can make a \\glossterm{strike}.
      `,
      rank: 3,
      roles: ['burst'],
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
      name: 'Deathseeking Double Flurry',

      effect: `
        Make a \\glossterm{strike}.
        \\hit Make an additional strike against all creatures that lost hit points from the first strike.
        The second strike cannot target any other creatures.
      `,
      rank: 3,
      roles: ['execute'],
    },

    {
      name: 'Static Shock',

      effect: `
        Make a \\glossterm{strike}.
        If the target loses hit points, it becomes \\stunned as a \\glossterm{condition}.
      `,
      rank: 3,
      roles: ['maim'],
      tags: ['Electricity'],
    },

    {
      name: 'Static Shock+',

      effect: `
        Make a \\glossterm{strike} that deals double \\glossterm{weapon damage}.
        If the target takes damage, it becomes \\stunned as a \\glossterm{condition}.
      `,
      rank: 7,
      roles: ['maim'],
      tags: ['Electricity'],
    },

    {
      name: 'Blinding Flurry',

      // Normally blind would be too strong for a 2x damage maneuver, but requiring *both*
      // strikes to hit makes it harder to pull off.
      effect: `
        Make two \\glossterm{strikes}.
        If both strikes deal damage and also hit the target's Reflex defense, it becomes \\blinded as a \\glossterm{condition}.
      `,
      rank: 7,
      roles: ['softener'],
    },

    {
      name: 'Dazzling Speed',

      effect: `
        Make a melee \\glossterm{strike}.
        If the target takes damage and your attack result also hits its Reflex defense, it becomes \\dazzled as a \\glossterm{condition}.
      `,
      rank: 1,
      roles: ['softener'],
    },
  ],
};
