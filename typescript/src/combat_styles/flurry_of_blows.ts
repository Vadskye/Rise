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
        Make a melee \\glossterm{strike} with a -2 accuracy penalty.
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
        Each creature damaged by the strike falls \\prone if your attack result beats its Fortitude defense.
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
        Make two ranged \\glossterm{strikes} with a -4 penalty to \\glossterm{accuracy}.
        For each previous consecutive round that you used this ability in the same location, you reduce the accuracy penalty by 1.
      `,
      rank: 1,
    },

    {
      name: 'Shrapnel Burst',

      effect: `
        Make a ranged \\glossterm{strike} using a projectile weapon against each creature in a \\smallarea cone from you.
        This strike costs five projectiles.
      `,
      rank: 3,
    },

    {
      name: 'Shrapnel Burst+',

      effect: `
        Make a ranged \\glossterm{strike} using a projectile weapon against each creature in a \\largearea cone from you.
        This strike costs ten projectiles.
      `,
      rank: 5,
    },

    {
      name: 'Volley Fire',

      effect: `
        Make a ranged \\glossterm{strike} using a projectile weapon against each creature in a \\smallarea radius within \\medrange.
        This strike costs five projectiles.
      `,
      rank: 5,
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
        Make a ranged \\glossterm{strike} using a \\glossterm{projectile} weapon.
        You do not suffer the normal -4 accuracy penalty for using a \\abilitytag{Projectile} weapon against a creature adjacent to you on this attack.
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
        For each previous consecutive round in which you used this ability, you can make an additional melee \\glossterm{strike}, up to a maximum of three extra strikes.
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
        Each creature damaged by the strike is \\dazed as a \\glossterm{condition} if your attack result beats its Fortitude defense.
      `,
      rank: 3,
    },

    {
      name: 'Static Strike+',

      effect: `
        Make a \\glossterm{strike} with double \\glossterm{weapon damage}.
        Damage dealt by the strike is electricity damage in addition to its normal damage types.
        Each creature damaged by the strike is \\stunned as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: 'Disorienting Flurry',

      // reroll is about +2 ranks, weak strike dazed would normally be r1, this is
      // probably strong but maybe okay?
      effect: `
        Make a \\glossterm{weak strike}.
        You may reroll the accuracy roll and take the highest result.
        Each creature damaged by the strike is \\dazed as a \\glossterm{condition} if your attack result beats its Mental defense.
      `,
      rank: 3,
    },

    {
      name: 'Disorienting Flurry+',

      // reroll is about +2 ranks, strike stunned would normally be r5, this is
      // probably strong but maybe okay?
      effect: `
        Make a \\glossterm{strike} with double \\glossterm{weapon damage}.
        You may reroll the accuracy roll and take the highest result.
        Each creature damaged by the strike is \\stunned as a \\glossterm{condition} if your attack result beats its Mental defense.
      `,
      rank: 7,
    },

    {
      name: 'Dazzling Flurry',

      effect: `
        Make a \\glossterm{weak strike}.
        You may reroll the accuracy roll and take the highest result.
        Each creature that loses \\glossterm{hit points} from the strike is \\dazzled as a \\glossterm{condition}.
      `,
      rank: 1,
    },
  ],
};
