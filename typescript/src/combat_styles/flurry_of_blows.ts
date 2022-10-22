import { CombatStyle } from '.';

export const flurryOfBlows: CombatStyle = {
  name: 'Flurry of Blows',
  shortDescription: 'Attack rapidly at any range.',

  maneuvers: [
    {
      name: 'Twinstrike',

      // roll twice is a little over 2.5 accuracy; not adding power makes this normally
      // worse than certain strike, but it's better for crit fishing
      effect: `
        Make a \\glossterm{strike}.
        You may reroll the accuracy roll and take the highest result.
        However, you do not add your \\glossterm{power} to damage with the strike.
      `,
      rank: 1,
    },

    // roll three times is about 4.5 accuracy
    {
      name: 'Triplestrike',

      effect: `
        Make a \\glossterm{strike}.
        You may reroll the accuracy roll twice and take the highest result.
        However, you do not add your \\glossterm{power} to damage with the strike.
      `,
      rank: 5,
    },

    {
      name: 'Rapid Quaff',

      effect: `
        Make a \\glossterm{strike}.
        You do not add your \\glossterm{power} to damage with the strike.
        In addition, you can drink a potion.
        You must still have a free hand that is not being used to make the strike to hold and drink the potion.
      `,
      rank: 3,
    },

    {
      name: 'Desperate Flurry',

      // Two fatigue instead of one fatigue like desperate smash because it also doubles
      // damage from power
      effect: `
        After you use this ability, you increase your \\glossterm{fatigue level} by two.

        Make two \\glossterm{strikes}.
        You cannot use the \\textit{desperate exertion} ability to affect these strikes.
      `,
      rank: 3,
    },

    {
      name: 'Desperate Flurry+',

      effect: `
        After you use this ability, you increase your \\glossterm{fatigue level} by one.

        Make three \\glossterm{strikes}.
        Your \\glossterm{power} with each strike is halved.
      `,
      rank: 7,
    },

    // TODO: unclear rank
    {
      name: 'Strike Flurry',

      effect: `
        Make two \\glossterm{strikes}.
        You do not add your \\glossterm{power} to damage with either strike.
      `,
      rank: 5,
    },

    {
      name: 'Power Flurry',

      effect: `
        Make two \\glossterm{strikes} with a -2 penalty to \\glossterm{accuracy}.
        Your \\glossterm{power} is halved with both strikes.
      `,
      rank: 3,
    },

    {
      name: 'Whirlwind',

      effect: `
        Make a melee \\glossterm{strike} using a light or medium slashing or bludgeoning weapon.
        The strike targets all \\glossterm{enemies} adjacent to you.
        Your \\glossterm{power} with the strike is halved.
      `,
      rank: 1,
    },

    {
      name: 'Tripping Whirlwind',

      effect: `
        Make a melee \\glossterm{strike} using a light or medium slashing or bludgeoning weapon.
        Your \\glossterm{power} with the strike is halved.
        The strike targets all \\glossterm{enemies} adjacent to you.
        Each creature damaged by the strike falls \\prone if your attack result beats its Fortitude defense.
      `,
      rank: 7,
    },

    {
      name: 'Whirlwind Flurry',

      effect: `
        Make two melee \\glossterm{strikes} using a light or medium slashing or bludgeoning weapon against all \\glossterm{enemies} adjacent to you.
        You take a -2 accuracy penalty with both strikes, and you do not add your \\glossterm{power} to damage with either strike.
      `,
      rank: 7,
    },

    {
      name: 'Barrage',

      effect: `
        Make two ranged \\glossterm{strikes} with a -4 penalty to \\glossterm{accuracy}.
        Your \\glossterm{power} with both strikes is halved.
        For each previous consecutive round that you used this ability in the same location, you reduce the accuracy penalty by 1.
      `,
      rank: 3,
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
        You can sheathe any small or medium weapons you wield, then draw one or two small or medium weapons into your \\glossterm{free hands}.
        Then, you can make a \\glossterm{strike}.
      `,
      rank: 3,
    },

    {
      name: 'Heavy Quickdraw',

      effect: `
        You can sheathe any weapons you wield, then draw one or two weapons into your \\glossterm{free hands}.
        Then, you can make a \\glossterm{strike}.
      `,
      rank: 5,
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
        If you \\glossterm{teleport}, your streak of consecutive rounds is broken.
      `,
      rank: 1,
    },

    {
      name: 'Frenzied Flurry',

      effect: `
        Make a melee \\glossterm{strike}.
        For each previous consecutive round in which you used this ability, you can make an additional \\glossterm{strike}, up to a maximum of three extra strikes.
        Your \\glossterm{power} with each extra strike is halved.
        If you \\glossterm{teleport}, your streak of consecutive rounds is broken.
      `,
      rank: 7,
    },

    {
      name: 'Deathseeking Flurry',

      effect: `
        Make a melee \\glossterm{strike}.
        Then, make an additional melee strike against each creature that lost hit points from the first strike.
        The second strike cannot target any other creatures.
        You do not add your \\glossterm{power} to damage with either strike.
      `,
      rank: 1,
    },

    {
      name: 'Deathseeking Flurry+',

      effect: `
        Make a melee \\glossterm{strike}.
        Then, make an additional melee strike against each creature that lost hit points from the first strike.
        The second strike cannot target any other creatures.
      `,
      rank: 5,
    },

    {
      name: 'Static Strike',

      effect: `
        Make a melee strike.
        Damage dealt by the strike is electricity damage in addition to its normal damage types.
        If your attack result beats a target's Fortitude defense, you gain a +2 damage bonus with the strike against that target.
      `,
      rank: 1,
      scaling: {
        3: 'The damage bonus increases to +4.',
        5: 'The damage bonus increases to +8.',
        7: 'The damage bonus increases to +16.',
      },
    },

    {
      name: 'Mindbreak Twinstrike',

      effect: `
        Make a \\glossterm{strike}.
        You may reroll the accuracy roll and take the highest result.
        However, you do not add your \\glossterm{power} to damage with the strike.
        Each creature that loses \\glossterm{hit points} from the strike is \\dazed as a \\glossterm{condition}.
      `,
      rank: 3,
    },

    {
      name: 'Mindshatter Twinstrike',

      effect: `
        Make a \\glossterm{strike}.
        You may reroll the accuracy roll and take the highest result.
        However, you do not add your \\glossterm{power} to damage with the strike.
        Each creature that loses \\glossterm{hit points} from the strike is \\stunned as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: 'Eye-Watering Swiftstrike',

      effect: `
        Make a melee \\glossterm{strike} with a +2 accuracy bonus.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature that loses \\glossterm{hit points} from the strike is \\dazzled as a \\glossterm{condition}.
      `,
      rank: 1,
    },

    {
      name: 'Blinding Swiftstrike',

      effect: `
        Make a melee \\glossterm{strike} with a +2 accuracy bonus.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature that loses \\glossterm{hit points} from the strike is \\glossterm{briefly} \\blinded.
      `,
      rank: 7,
    },
  ],
};
