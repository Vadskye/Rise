import { CombatStyle } from '.';

export const flurryOfBlows: CombatStyle = {
  name: 'Flurry of Blows',
  shortDescription: 'Attack too rapidly for your foes to react.',

  maneuvers: [
    {
      name: 'Double Strike',

      effect: `
        Make two \\glossterm{strikes} with a -1 accuracy penalty.
      `,
      rank: 5,
    },

    {
      name: 'Triple Strike',

      effect: `
        Make three \\glossterm{strikes} with a -1 accuracy penalty.
      `,
      rank: 7,
    },

    {
      name: 'Rapid Quaff',

      effect: `
        Make a \\glossterm{weak strike}.
        In addition, you can drink a potion.
        You must still have a free hand that is not being used to make the strike to hold and drink the potion.
      `,
      rank: 3,
    },

    {
      name: 'Desperate Double Strike',

      effect: `
        After you use this ability, you increase your \\glossterm{fatigue level} by one.

        Make two \\glossterm{weak strikes}.
        You cannot use the \\textit{desperate exertion} ability to affect these strikes.
      `,
      rank: 1,
    },

    {
      name: 'Desperate Triple Strike',

      effect: `
        After you use this ability, you increase your \\glossterm{fatigue level} by two.

        Make three \\glossterm{strikes}.
        You cannot use the \\textit{desperate exertion} ability to affect these strikes.
      `,
      rank: 5,
    },

    {
      name: 'Whirlwind',

      effect: `
        Make a melee \\glossterm{strike} with a -1 accuracy penalty.
        The strike targets all \\glossterm{enemies} adjacent to you.
        On a miss, you get a \\glossterm{glancing blow}.
      `,
      rank: 1,
    },

    {
      name: 'Tripping Whirlwind',

      effect: `
        Make a melee \\glossterm{strike}.
        The strike targets all \\glossterm{enemies} adjacent to you.
        On a miss, you get a \\glossterm{glancing blow}.
        Each damaged creature falls \\prone if your attack result beats its Fortitude defense.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 5,
    },

    {
      name: 'Double Whirlwind',

      effect: `
        Make two melee \\glossterm{strikes}.
        The strikes target all \\glossterm{enemies} adjacent to you.
        On a miss, you get a \\glossterm{glancing blow}.
      `,
      rank: 7,
    },

    {
      name: 'Barrage',

      effect: `
        Make two ranged \\glossterm{strikes} using a \\weapontag{Projectile} weapon with a -4 accuracy penalty.
        For each previous consecutive round that you used this ability in the same location, you reduce this accuracy penalty by 1.
      `,
      rank: 1,
    },

    {
      name: 'Shrapnel Burst',

      effect: `
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon against everything in a \\smallarea cone from you.
        The strike costs five projectiles.
        On a miss, you get a \\glossterm{glancing blow}.
      `,
      rank: 1,
    },

    {
      name: 'Shrapnel Burst+',

      // large cone instead of med cone for projectile cost
      effect: `
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon against everything in a \\largearea cone from you.
        You take a -1 accuracy penalty with the strike, but it deals 1d6 \\glossterm{extra damage} per 4 \\glossterm{power}.
        The strike costs ten projectiles.
        On a miss, you get a \\glossterm{glancing blow}.
      `,
      rank: 5,
    },

    {
      name: 'Volley Fire',

      effect: `
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon against each creature in a \\smallarea radius within \\medrange.
        This strike costs five projectiles.
        On a miss, you get a \\glossterm{glancing blow}.
      `,
      rank: 3,
    },

    {
      name: 'Volley Fire+',

      // Technically t6 area instead of t7, but whatever
      effect: `
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon against each creature in a \\medarea radius within \\distrange.
        The strike deals 1d6 \\glossterm{extra damage} per 4 \\glossterm{power}.
        This strike costs ten projectiles.
        On a miss, you get a \\glossterm{glancing blow}.
      `,
      rank: 7,
    },

    {
      name: 'Quickdraw',

      effect: `
        You can sheathe any non-\\weapontag{Heavy} weapons you wield, then draw one or two non-\\weapontag{Heavy} weapons into your \\glossterm{free hands}.
        Then, you can make a \\glossterm{strike} with a -2 accuracy penalty.
      `,
      rank: 1,
    },

    {
      name: 'Heavy Quickdraw',

      effect: `
        You can sheathe any weapons you wield, then draw one or two weapons into your \\glossterm{free hands}.
        Then, you can make a \\glossterm{strike} with a -2 accuracy penalty.
      `,
      rank: 3,
    },

    {
      name: 'Quickfire',

      effect: `
        Make a ranged \\glossterm{strike} using a \\weapontag{Projectile} weapon.
        You do not suffer the normal -4 accuracy penalty for using a Projectile weapon against a creature adjacent to you on this attack.
      `,
      rank: 3,
    },

    {
      name: 'Frenzied Strike',

      effect: `
        Make a melee \\glossterm{strike}.
        For each previous consecutive round in which you used this ability, you gain a +2 accuracy bonus with the strike, up to a maximum of +4.
      `,
      rank: 1,
    },

    {
      name: 'Frenzied Multistrike',

      effect: `
        Make a melee \\glossterm{strike}.
        For each previous consecutive round in which you used this ability, you can make an additional melee \\glossterm{strike}, up to a maximum of two extra strikes.
      `,
      rank: 5,
    },

    {
      name: 'Deathseeking Double Strike',

      effect: `
        Make a \\glossterm{strike}.
        Then, make an additional strike against each creature that lost hit points from the first strike.
        The second strike cannot target any other creatures.
      `,
      rank: 3,
    },

    {
      name: 'Static Strike',

      effect: `
        Make a \\glossterm{strike}.
        Damage dealt by the strike is electricity damage in addition to its normal damage types.
        If the target loses hit points, it becomes \\stunned as a \\glossterm{condition}.
      `,
      rank: 3,
    },

    {
      name: 'Static Strike+',

      effect: `
        Make a \\glossterm{strike} with double \\glossterm{weapon damage}.
        Damage dealt by the strike is electricity damage in addition to its normal damage types.
        If the target takes damage, it becomes \\stunned as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: 'Dazzling Flurry+',

      // reroll is about +2 ranks, weak strike dazzled would normally be r1, this is
      // probably weak but maybe okay?
      effect: `
        Make a strike.
        You may reroll the accuracy roll and take the highest result.
        If the target takes damage, it becomes \\dazzled as a \\glossterm{condition}.
      `,
      rank: 5,
    },

    {
      name: 'Dazzling Flurry',

      effect: `
        Make a \\glossterm{weak strike}.
        You may reroll the accuracy roll and take the highest result.
        If the target loses hit points, it is \\dazzled as a \\glossterm{condition}.
      `,
      rank: 1,
    },
  ],
};
