import { CombatStyle } from '.';

export const perfectPrecision: CombatStyle = {
  name: 'Perfect Precision',
  shortDescription: 'Stab foes with careful aim.',

  maneuvers: [
    {
      name: 'Pure Precision',

      effect: `
        Make a \\glossterm{strike} with a +3 accuracy bonus.
      `,
      rank: 3,
      roles: ['burst'],
    },

    {
      name: 'Pure Precision+',

      effect: `
        Make a \\glossterm{strike} with a +15 accuracy bonus.
      `,
      rank: 7,
      roles: ['burst'],
    },
    {
      name: 'Armorpiercer',

      effect: `
        Make a \\glossterm{strike}.
        The attack is made against the target's Reflex defense instead of its Armor defense.
      `,
      rank: 3,
      roles: ['softener'],
    },

    {
      name: 'Desperate Pierce',

      cost: 'See text.',
      effect: `
        Make a \\glossterm{strike}.
        You can increase your \\glossterm{fatigue level} by one to reroll the attack roll with a +4 accuracy bonus.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
      `,
      rank: 1,
      roles: ['burst'],
    },

    {
      name: 'Injection',

      effect: `
        Make a \\glossterm{strike}.
        If it target loses hit points, you gain a +4 accuracy bonus with contact-based and injury-based poisons delivered with the strike.
      `,
      rank: 1,
      roles: ['softener'],
    },

    {
      name: 'Injection+',

      effect: `
        Make a \\glossterm{strike} that deals double damage.
        If it target takes damage, you gain a +4 accuracy bonus with contact-based and injury-based poisons delivered with the strike.
      `,
      rank: 5,
      roles: ['softener'],
    },

    {
      name: 'Penetrating Shot',

      effect: `
        Make a ranged \\glossterm{strike} against everything in a \\medarealong, 5 ft. wide line from you.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        You also still take the normal -4 accuracy penalty for attacking an adjacent creature with a Projectile weapon (see \\pcref{Weapon Tags}).
      `,
      rank: 1,
      roles: ['clear'],
    },

    {
      name: 'Penetrating Shot+',

      effect: `
        Make a ranged \\glossterm{strike} against everything in a \\largearealong, 5 ft. wide line from you.
        The strike deals double damage.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        You also still take the normal -4 accuracy penalty for attacking an adjacent creature with a Projectile weapon (see \\pcref{Weapon Tags}).
      `,
      rank: 5,
      roles: ['clear'],
    },

    {
      name: 'Distant Shot',

      effect: `
        Make a ranged \\glossterm{strike}.
        You reduce your \\glossterm{longshot penalty} with the strike by 4, which generally removes the penalty entirely.
      `,
      rank: 3,
      roles: ['snipe'],
    },

    {
      name: 'Lunge',

      effect: `
        Make a melee \\glossterm{strike} against up to two creatures or objects in a 10 ft. long, 5 ft. wide line from you.
        The line must point directly away from you.
        Only one of the spaces in the line can be adjacent to you.
      `,
      rank: 1,
      roles: ['clear'],
    },

    {
      name: 'Focusing Lunge',

      effect: `
        Make a melee \\glossterm{strike} that deals double dmage against up to two creatures or objects in a 10 ft. long, 5 ft. wide line from you.
        The line must point directly away from you.
        Only one of the spaces in the line can be adjacent to you.
        If you deal damage to two creatures in this way, you \\glossterm{briefly} become \\focused.
      `,
      rank: 5,
      roles: ['clear'],
    },

    {
      name: 'Arrowguide',

      effect: `
        Make a ranged \\glossterm{strike}.
        If the target takes damage and your attack hits its Reflex defense, you \\glossterm{briefly} gain a +2 \\glossterm{accuracy} bonus with ranged \\glossterm{strikes} against it.
      `,
      rank: 1,
      roles: ['generator'],
    },

    {
      name: 'Heartpiercer',

      // Assume you have an 80% hit chance (+0 vs AD 3).
      // Expected damage is 0.8 + 0.5*0.2 + 0.1*0.8 = 0.98x hit damage.
      // Losing glancing blows means you deal 0.8x.
      // +4 accuracy with crits means you crit on a 9.
      // That makes expected damage 0.8 + 0.2 = 1x hit damage, scaling to be stronger as
      // your accuracy increases.
      // Now assume you crit on a 9 before this maneuver due to Keen, but you still miss
      // on 1/2.
      // Expected damage is 0.8 + 0.5 * 0.2 + 0.2 = 1.1x hit damage.
      // With this maneuver, expected damage is 0.8 + 0.6 = 1.4x hit damage, or 27% more
      // damage.
      effect: `
        Make a \\glossterm{strike}.
        You gain a +3 accuracy bonus with the strike for the purpose of determining whether you get a \\glossterm{critical hit}.
        However, you cannot get a \\glossterm{glancing blow} with this strike.
      `,
      narrative: `
        You strike directly for your foe's heart.
      `,
      rank: 1,
      roles: ['burst'],
    },

    {
      name: 'Heartpiercer+',

      // Assume you hit 80% of the time normally (+0 vs AD 3).
      // This has expected damage of 0.3 * 3 + 0.5 * 2 = 2x hit damage.
      //
      // Now assume you hit 130% of the time normally (+5 vs AD 3).
      // Normal expected damage is 0.3 * 2 + 0.7 * 1 = 1.3x hit damage.
      // With this, expected damage is 0.8 * 3 + 0.2 * 2 = 2.8x hit damage.
      // That's still only slightly better than a double damage strike, so it seems safe.
      effect: `
        Make a \\glossterm{strike}.
        You gain a +15 accuracy bonus with the strike for the purpose of determining whether you get a \\glossterm{critical hit}.
        However, you cannot get a \\glossterm{glancing blow} with this strike.
      `,
      narrative: `
        You strike directly for your foe's heart.
      `,
      rank: 5,
      roles: ['burst'],
    },

    {
      name: 'Pinning Shot',

      effect: `
        Make a \\glossterm{strike} that deals triple damage.
        If the target loses \\glossterm{hit points}, it becomes \\slowed as a \\glossterm{condition}.
      `,
      rank: 7,
      roles: ['maim'],
    },

    {
      name: 'Chargebreaker',

      effect: `
        You ready a reactive melee strike (see \\pcref{Ready Reaction}).
        The strike triggers against any \\glossterm{enemy} that you couldn't already hit with a melee strike at the start of the phase, such as enemies already adjacent to you.
        You gain a +2 accuracy bonus with the reactive strike.
      `,
      rank: 1,
      roles: ['payoff'],
    },

    {
      name: 'Called Shot',

      // effectively +0.5 accuracy
      effect: `
        Choose a number from 1--10, then make a \\glossterm{strike}.
        If you roll that number on your attack roll, you gain a +5 accuracy bonus.
        Any die rolled as part of an attack that \\glossterm{explodes} counts for this purpose, and you use your final die result after applying any rerolls.
        Effects which would replace your attack roll with a fixed value, such as a law paladin's \\ability{aligned aura} ability, do not apply to this strike.
      `,
      rank: 1,
      roles: ['burst'],
    },

    {
      name: 'Called Shot+',

      effect: `
        Choose a number from 1--10, then make a \\glossterm{strike} that deals double damage.
        If you roll that number on your attack roll, you gain a +5 accuracy bonus.
        Any die rolled as part of an attack that \\glossterm{explodes} counts for this purpose, and you use your final die result after applying any rerolls.
        Effects which would replace your attack result with a fixed value, such as a law paladin's \\ability{aligned aura} ability, do not apply to this strike.
      `,
      rank: 5,
      roles: ['burst'],
    },

    {
      name: 'Full-Body Thrust',

      effect: `
        Make a melee \\glossterm{strike} with \\glossterm{extra damage} equal to 1d4 plus half your \\glossterm{power}.
        However, you \\glossterm{briefly} take a -2 penalty to your accuracy and defenses after making the strike.
      `,
      rank: 3,
      roles: ['burst'],
    },

    {
      name: 'Full-Body Thrust+',

      effect: `
        Make a melee \\glossterm{strike} with \\damagerankseven \\glossterm{extra damage}.
        However, you \\glossterm{briefly} take a -2 penalty to your accuracy and defenses after making the strike.
      `,
      rank: 7,
      roles: ['burst'],
    },

    {
      name: 'Pressure Point Puncture',

      // If you call this 2/3 of a stun, it's worth 2 EA.
      effect: `
        Make a melee \\glossterm{strike} that deals triple damage.
        If the target takes damage and your attack result beats its Fortitude defense, it takes a \\minus1 penalty to all defenses as a \\glossterm{condition}.
        A creature can have up to four instances of this condition on it at once, and the penalty from each instance stacks.
        Any individual creature can only gain one instance of this condition per round, even if multiple creatures use this ability on it.
      `,
      rank: 7,
      roles: ['softener'],
    },
  ],
};
