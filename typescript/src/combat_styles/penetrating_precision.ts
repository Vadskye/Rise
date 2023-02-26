import { CombatStyle } from '.';

export const penetratingPrecision: CombatStyle = {
  name: 'Penetrating Precision',
  shortDescription: 'Stab foes with carefully aimed piercing weapons.',

  maneuvers: [
    {
      name: 'Armorpiercer',

      effect: `
        Make a \\glossterm{weak strike} using a piercing weapon.
        The attack is made against each target's Reflex defense instead of its Armor defense.
      `,
      rank: 1,
    },

    {
      name: 'Armorpiercer+',

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        The attack is made against each target's Reflex defense instead of its Armor defense.
      `,
      rank: 3,
    },

    {
      name: 'Desperate Pierce',

      effect: `
        Make a \\glossterm{strike}.
        If you miss, you can increase your \\glossterm{fatigue level} by one to reroll the attack with a +4 accuracy bonus.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
      `,
      rank: 1,
    },

    {
      name: 'Injection',

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        You gain a +4 accuracy bonus with contact-based and injury-based poisons delivered against each creature that lost \\glossterm{hit points} from the strike.
      `,
      rank: 1,
    },

    {
      name: 'Penetrating Shot',

      effect: `
        Make a ranged \\glossterm{strike} against everything in a \\medarealong, 5 ft. wide line from you using a piercing weapon.
      `,
      rank: 3,
    },

    {
      name: 'Penetrating Shot+',

      effect: `
        Make a ranged \\glossterm{strike} against everything in a \\hugearealong, 5 ft. wide line from you using a piercing weapon.
      `,
      rank: 5,
    },

    {
      name: 'Distant Shot',

      effect: `
        Make a ranged \\glossterm{strike} using a piercing weapon.
        You reduce your \\glossterm{longshot penalty} with the strike by 4.
      `,
      rank: 3,
    },

    {
      name: 'Lunge',

      effect: `
        Make a melee \\glossterm{strike} using a piercing weapon against up to two creatures or objects in a 10 ft. long, 5 ft. wide line from you.
        The line must point directly away from you.
        Only one of the spaces in the line can be adjacent to you.
      `,
      rank: 1,
    },

    {
      name: 'Deathblow',

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        If the target has no remaining \\glossterm{damage resistance}, the strike deals double \\glossterm{weapon damage}.
      `,
      // narrative: '',
      rank: 3,
    },

    {
      name: 'Deathblow+',

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        If the target has no remaining \\glossterm{damage resistance}, the strike deals quadruple \\glossterm{weapon damage}.
      `,
      // narrative: '',
      rank: 7,
    },

    {
      name: 'Arrowguide',

      effect: `
        Make a ranged \\glossterm{strike} using a piercing weapon.
        Your \\glossterm{power} with the strike is halved.
        You \\glossterm{briefly} gain a +2 \\glossterm{accuracy} bonus with \\glossterm{strikes} against each target of that strike.
      `,
      rank: 1,
    },

    {
      name: 'Heartpiercer',

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        You gain a +3 accuracy bonus to the strike for the purpose of determining whether you get a \\glossterm{critical hit}.
        However, you cannot get a \\glossterm{glancing blow} with this strike.
      `,
      narrative: `
        You strike directly for your foe's heart.
      `,
      rank: 1,
    },

    {
      name: 'Heartpiercer+',

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        You gain a +10 accuracy bonus to the strike for the purpose of determining whether you get a \\glossterm{critical hit}.
        However, you cannot get a \\glossterm{glancing blow} with this strike.
      `,
      narrative: `
        You strike directly for your foe's heart.
      `,
      rank: 5,
    },

    {
      name: 'Groundspike',

      effect: `
        Make a melee \\glossterm{weak strike} using a piercing weapon.
        Each creature that loses \\glossterm{hit points} from the strike is \\slowed as a \\glossterm{condition}.
      `,
      rank: 3,
    },

    {
      name: 'Groundspike+',

      effect: `
        Make a melee \\glossterm{strike} with double \\glossterm{weapon damage} using a piercing weapon.
        Each creature that loses \\glossterm{hit points} from the strike is \\immobilized as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: 'Chargebreaker',

      effect: `
        Make a melee \\glossterm{strike} using a piercing weapon.
        You gain a +2 accuracy bonus with the strike if you stayed in the same location while the target moved towards you during the movement phase.
      `,
      rank: 1,
    },

    {
      name: 'Called Shot',

      effect: `
        Choose a number from 1--10, then make a \\glossterm{strike} using a piercing weapon.
        If you roll that number on your attack roll, you gain a +4 accuracy bonus.
        Dice from \\glossterm{explosions} do not count for this purpose, and you use your final die result after applying any rerolls.
      `,
      rank: 1,
    },

    {
      name: 'Called Shot+',

      effect: `
        Choose any two numbers from 1--10, then make a \\glossterm{strike} using a piercing weapon.
        If you roll either number on your attack roll, you gain a +4 accuracy bonus and the strike deals double \\glossterm{weapon damage}.
        Dice from \\glossterm{explosions} do not count for this purpose, and you use your final die result after applying any rerolls.
      `,
      rank: 5,
    },

    {
      name: 'Full-Body Thrust',

      effect: `
        Make a melee \\glossterm{strike} with 1d4 \\glossterm{extra damage} +1d per two \\glossterm{power} using a piercing weapon.
        However, you \\glossterm{briefly} take a -2 accuracy penalty after making the strike.
      `,
      rank: 3,
    },

    {
      name: 'Full-Body Thrust+',

      effect: `
        Make a melee \\glossterm{strike} with \\damagerankfive{} extra damage using a piercing weapon.
        However, you \\glossterm{briefly} take a -2 accuracy penalty after making the strike.
      `,
      rank: 7,
    },
  ],
};
