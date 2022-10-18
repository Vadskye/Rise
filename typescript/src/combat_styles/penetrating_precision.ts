import { CombatStyle } from ".";

export const penetratingPrecision: CombatStyle = {
  name: "Penetrating Precision",
  shortDescription: "Stab foes with carefully aimed piercing weapons.",

  maneuvers: [
    {
      name: "Armorpiercer",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        Your \\glossterm{power} with the strike is halved.
        The attack is made against each target's Reflex defense instead of its Armor defense.
      `,
      rank: 1,
    },

    {
      name: "Armorpiercer+",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        The attack is made against each target's Reflex defense instead of its Armor defense.
      `,
      rank: 3,
    },

    {
      name: "Desperate Pierce",

      effect: `
        Make a \\glossterm{strike}.
        If you miss, you can increase your \\glossterm{fatigue level} by one to reroll the attack with a +3 accuracy bonus.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
      `,
      rank: 1,
    },

    {
      name: "Injection",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        You gain a +4 accuracy bonus with contact-based and injury-based poisons delivered against each creature that lost \\glossterm{hit points} from the strike.
      `,
      rank: 1,
    },

    {
      name: "Penetrating Shot",

      effect: `
        Make a ranged \\glossterm{strike} against everything in a \\medarealong, 5 ft. wide line from you.
        Your \\glossterm{power} with the strike is halved.
      `,
      rank: 3,
    },

    {
      name: "Penetrating Shot+",

      effect: `
        Make a ranged \\glossterm{strike} against everything in a \\hugearealong, 5 ft. wide line from you.
        Your \\glossterm{power} with the strike is halved.
      `,
      rank: 5,
    },

    {
      name: "Distant Shot",

      effect: `
        Make a ranged \\glossterm{strike}.
        You reduce your \\glossterm{longshot penalty} with the strike by 2.
      `,
      rank: 3,
    },

    {
      name: "Distant Shot+",

      effect: `
        Make a ranged \\glossterm{strike}.
        You reduce your \\glossterm{longshot penalty} with the strike by 4.
      `,
      rank: 7,
    },

    {
      name: "Lunge",

      effect: `
        Make a melee \\glossterm{strike} using a piercing weapon against up to two creatures or objects in a 10 ft. long, 5 ft. wide line from you.
        The line must point directly away from you.
        Only one of the spaces in the line can be adjacent to you.
      `,
      rank: 1,
    },

    {
      name: "Deathblow",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        If you get a \\glossterm{critical hit}, you double all of your damage bonuses along with your damage dice.
      `,
      // narrative: '',
      rank: 1,
    },

    {
      name: "Deathblow+",

      // TODO: unclear rank
      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        You gain a +4 accuracy bonus with the strike for the purpose of determining whether you get a critical hit.
        If you get a \\glossterm{critical hit}, you double all of your damage bonuses along with your damage dice.
      `,
      rank: 5,
    },

    {
      name: "Arrowguide",

      effect: `
        Make a ranged \\glossterm{strike} using a piercing weapon.
        Your \\glossterm{power} with the strike is halved.
        You \\glossterm{briefly} gain a +2 \\glossterm{accuracy} bonus with \\glossterm{strikes} against each target of that strike.
      `,
      rank: 1,
    },

    {
      name: "Heartpiercing Strike",

      effect: `
        Make a \\glossterm{strike} with a +4 damage bonus using a piercing weapon.
        Each target that has any remaining \\glossterm{damage resistance} takes no damage from the strike.
      `,
      narrative: `
        You strike directly for your foe's heart, hoping its armor is too damaged to effectively deflect the blow.
      `,
      rank: 3,
      scaling: {
        5: "The damage bonus increases to +8.",
        7: "The damage bonus increases to +16.",
      },
    },

    {
      name: "Eye Gouge",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\blinded as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: "Eye Poke",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike is \\dazzled as a \\glossterm{condition} if your attack result beats its Reflex defense.
      `,
      rank: 1,
    },

    {
      name: "Groundspike",

      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike is \\slowed as a \\glossterm{condition} if your attack result beats its Reflex defense.
      `,
      rank: 5,
    },

    {
      name: "Chargebreaker",

      effect: `
        Make a melee \\glossterm{strike} using a piercing weapon.
        You gain a +2 accuracy bonus with the strike if you stayed in the same location while the target moved towards you during the movement phase.
      `,
      rank: 1,
    },

    {
      name: "Called Shot",

      // +2 ranks for choice of debuff?
      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike suffers your choice of one of the following effects as a \\glossterm{condition}: \\dazed, \\dazzled, or \\slowed.
      `,
      rank: 1,
    },

    {
      name: "Called Shot+",

      // +2 ranks for choice of debuff?
      effect: `
        Make a \\glossterm{strike} using a piercing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\dazed, \\dazzled, and \\slowed as a single condition.
      `,
      rank: 5,
    },

    {
      name: "Sacrificial Thrust",

      effect: `
        Make a \\glossterm{strike} with a +2 \\glossterm{accuracy} bonus using a piercing weapon.
        You \\glossterm{briefly} take a -4 penalty to all defenses against each target of your strike.
      `,
      rank: 3,
    },

    {
      name: "Pierce Weakness",

      effect: `
        Make a strike using a piercing weapon.
        If your attack result beats a target's Reflex defense, you gain a +2 damage bonus with the strike against that target.
      `,
      rank: 1,
      scaling: {
        3: "The damage bonus increases to +4.",
        5: "The damage bonus increases to +8.",
        7: "The damage bonus increases to +16.",
      },
    },
  ],
};
