import { CombatStyle } from ".";

export const ebbAndFlow: CombatStyle = {
  name: "Ebb and Flow",
  shortDescription: "Fight reactively, shifting your style with the flow of combat.",

  maneuvers: [
    {
      name: "Counterstrike",

      effect: `
        You can only use this ability during the \\glossterm{action phase}.
        During that phase, you prepare to retaliate against any incoming attacks.

        During the \\glossterm{delayed action phase}, make a melee \\glossterm{strike}.
        You gain a +2 bonus to \\glossterm{accuracy} with the strike against each creature that attacked you during the action phase of this round.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1d bonus to damage with the strike.",
        6: "The damage bonus increases to +2d.",
      },
      type: "Instant",
    },

    {
      name: "Counter Sweep",

      effect: `
        You can only use this ability during the \\glossterm{action phase}.
        During that phase, you prepare to retaliate against any incoming attacks.

        During the \\glossterm{delayed action phase}, make a melee \\glossterm{strike} with a slashing or bludgeoning weapon.
        The strike targets one creature or object of your choice,
        plus each creature within your weapon's \\glossterm{reach} that attacked you during the action phase of this round.
      `,
      rank: 4,
      scaling: {
        6: "You gain a +1d damage bonus with the strike.",
      },
      type: "Instant",
    },

    {
      name: "Counter Flurry",

      effect: `
        You can only use this ability during the \\glossterm{action phase}.
        During that phase, you prepare to retaliate against any incoming attacks.

        During the \\glossterm{delayed action phase}, make two melee \\glossterm{strikes}.
        Your \\glossterm{power} with both strikes is halved.
        You take a -4 penalty to \\glossterm{accuracy} with the strikes against any target that did not attack you during the action phase of this round.
      `,
      rank: 5,
      scaling: {
        6: "You gain a +1d damage bonus with the strike.",
      },
      type: "Instant",
    },

    {
      name: "Followup Strike",

      effect: `
        Make a \\glossterm{strike}.
        You gain a +2 bonus to \\glossterm{accuracy} with the strike against each creature that you missed with a \\glossterm{strike} last round.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1 accuracy bonus with the strike.",
        6: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
    },

    {
      name: "Followup Flurry",

      effect: `
        Make two \\glossterm{strikes}.
        Your \\glossterm{power} with both strikes is halved.
        You take a -4 penalty to accuracy with the strikes against anything other than creatures that you missed with a \\glossterm{strike} last round.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Feint",

      effect: `
        Make a melee \\glossterm{strike} with a +2 bonus to \\glossterm{accuracy}.
        The attack is made against each subject's Reflex defense instead of its Armor defense.
        You take a -3d damage penalty with the strike, and your \\glossterm{power} is halved.
        If a creature takes damage from the strike, it takes a -2 penalty to Armor defense until the end of the next round.
      `,
      rank: 1,
      scaling: {
        3: "The accuracy bonus increases to +3.",
        5: "The accuracy bonus increases to +4.",
        7: "The accuracy bonus increases to +5.",
      },
      type: "Duration",
    },

    {
      name: "Reckless Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        You gain a +1d bonus to damage with the strike.
        During the next round, you take a -2 penalty to all defenses.
      `,
      rank: 1,
      scaling: {
        3: "The damage bonus increases to +2d.",
        5: "The damage bonus increases to +3d.",
        7: "The damage bonus increases to +4d.",
      },
      type: "Instant",
    },

    {
      name: "Reckless Flurry",

      effect: `
        Make two melee \\glossterm{strikes}.
        You take a -2d penalty to damage with both strikes, and your \\glossterm{power} is \\glossterm{halved}.
        During the next round, you take a -2 penalty to all defenses.
      `,
      rank: 5,
      type: "Instant",
    },

    {
      name: "Momentum Smash",

      effect: `
        Make a melee \\glossterm{strike}.
        If your movement during the \\glossterm{movement phase} consisted entirely of moving at least 20 feet in a straight line towards your target, you gain a +1d bonus to damage with the strike.
      `,
      rank: 1,
      scaling: {
        3: "The damage bonus increases to +2d.",
        5: "The damage bonus increases to +3d.",
        7: "The damage bonus increases to +4d.",
      },
      type: "Instant",
    },

    {
      name: "Meteor Smash",

      effect: `
        Make a melee \\glossterm{strike}.
        If your movement during the \\glossterm{movement phase} consisted entirely of moving at least 20 feet in a straight line towards your target, you gain a +2 accuracy bonus and a +2d damage bonus with the strike.
      `,
      rank: 7,
      type: "Instant",
    },

    {
      name: "Certain Strike",

      effect: `
        Make a \\glossterm{strike} with a +3 accuracy bonus.
        You take a -2d penalty to damage with the strike.
      `,
      rank: 1,
      scaling: {
        3: "The accuracy bonus increases to +4.",
        5: "The accuracy bonus increases to +5.",
        7: "The accuracy bonus increases to +6.",
      },
      type: "Instant",
    },

    {
      name: "Power Strike",

      effect: `
        Make a \\glossterm{strike} with a -2 penalty to \\glossterm{accuracy}.
        You gain a +2d bonus to damage with the strike.
      `,
      rank: 1,
      scaling: {
        3: "The damage bonus increases to +3d.",
        5: "The damage bonus increases to +4d.",
        7: "The damage bonus increases to +4d.",
      },
      type: "Instant",
    },

    {
      name: "Focused Strike",

      effect: `
        You can only use this ability during the \\glossterm{action phase}.
        Choose one creature within \\shortrange.
        During the action phase, you concentrate on your target.
        You only suffer a \\glossterm{focus penalty} for this attack during the action phase.

        During the \\glossterm{delayed action phase}, you can make a melee \\glossterm{strike} against the subject.
        You take a -1d penalty to damage with the strike.
        The attack roll \\glossterm{explodes} regardless of what you roll.
      `,
      focus: true,
      rank: 2,
      scaling: {
        4: "You gain a +1 accuracy bonus with the strike.",
        6: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
    },

    {
      name: "Hunting Strike",

      effect: `
        Make a \\glossterm{strike} with a -1d damage penalty against a creature.
        After making the strike, you gain a +1 bonus to \\glossterm{accuracy} against one target of the strike with all future attacks.
        If the strike had multiple targets, you choose which target you gain the bonus against.
        This effect stacks with itself, up to a maximum of a +4 bonus.
        It lasts until you take a \\glossterm{short rest} or use this ability on a different creature.
      `,
      rank: 1,
      scaling: {
        3: "You gain a +1 accuracy bonus with the strike.",
        5: "The accuracy bonus increases to +2.",
        7: "The accuracy bonus increases to +3.",
      },
      type: "Duration",
    },

    {
      name: "Greater Hunting Strike",

      functionsLike: {
        exceptThat: "the accuracy bonus from each strike increases to +2.",
        name: "hunting strike",
      },
      rank: 5,
      scaling: {
        7: "The damage penalty is removed.",
      },
      type: "Duration",
    },

    {
      name: "Punish Inattention",

      effect: `
        You can only use this ability during the \\glossterm{action phase}.
        During that phase, you prepare to strike against creatures who do not force you back.

        During the \\glossterm{delayed action phase}, make a melee \\glossterm{strike}.
        You gain a +2 bonus to \\glossterm{accuracy} with the strike against each creature that did not attack you during the action phase of this round.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1d damage bonus with the strike.",
        7: "The damage bonus increases to +2d.",
      },
      type: "Instant",
    },

    {
      name: "Covering Strike",

      effect: `
        Make a melee \\glossterm{strike} with a -1d damage penalty.
        Each creature damaged by the strike takes a -2 penalty to \\glossterm{accuracy} against your \\glossterm{allies} until the end of the next round.
      `,
      rank: 1,
      scaling: {
        3: "You gain a +1 accuracy bonus with the strike.",
        5: "The accuracy bonus increases to +2.",
        7: "The accuracy bonus increases to +3.",
      },
      type: "Duration",
    },

    {
      name: "Mainhand Feint",

      effect: `
        Make a melee \\glossterm{strike} with a -2d damage penalty.
        During the next round, you gain a +2 accuracy bonus and a +2d damage bonus with your \\textit<offhand strike> ability against each creature that took damage from this strike.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1 accuracy bonus with the strike.",
        7: "The accuracy bonus increases to +2d.",
      },
      type: "Duration",
    },

    {
      name: "Pursuer's Strike",

      effect: `
        Make a \\glossterm{strike}.
        You gain a +4 bonus to contested \\glossterm{initiative} checks against each creature damaged by the strike until the end of the next round.
      `,
      rank: 2,
      scaling: {
        4: "The initiative bonus increases to +6.",
        6: "The initiative bonus increases to +8.",
      },
      type: "Duration",
    },
  ],
};
