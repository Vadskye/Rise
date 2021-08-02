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
        4: "You gain a +1d damage bonus with the strike.",
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
        You gain a +1 bonus to \\glossterm{accuracy} with the strike against each creature that you missed with a \\glossterm{strike} last round.
      `,
      rank: 1,
      scaling: {
        3: "The accuracy bonus increases to +2.",
        5: "The accuracy bonus increases to +3.",
        7: "The accuracy bonus increases to +4.",
      },
      type: "Instant",
    },

    {
      name: "Followup Flurry",

      effect: `
        Make two \\glossterm{strikes}.
        Your \\glossterm{power} with both strikes is halved.
        You take a -4 accuracy penalty with the strikes against anything other than creatures that you missed with a \\glossterm{strike} last round.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Dazing Feint",

      effect: `
        Make a melee \\glossterm{strike}.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature damaged by the strike is \\glossterm{briefly} \\dazed.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1 accuracy bonus with the strike.",
        7: "The accuracy bonus increases to +2.",
      },
      type: "Duration",
    },

    {
      name: "Stunning Feint",

      effect: `
        Make a melee \\glossterm{strike}.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        The attack is made against each subject's Reflex defense instead of its Armor defense.
        Each creature damaged by the strike is \\glossterm{briefly} \\stunned.
      `,
      rank: 7,
      type: "Duration",
    },

    {
      name: "Disorienting Feint",

      effect: `
        Make a melee \\glossterm{strike}.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\glossterm{disoriented} as a \\glossterm{condition}.
      `,
      rank: 7,
      type: "Duration",
    },

    {
      name: "Reckless Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        You gain a +1d damage bonus with the strike.
        However, you \\glossterm{briefly} take a -2 penalty to all defenses.
        This ability does not have the \\glossterm{Swift} tag, so it does not affect attacks made against you during the current phase.
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
        You take a -2d damage penalty with both strikes, and your \\glossterm{power} is \\glossterm{halved}.
        However, you \\glossterm{briefly} take a -2 penalty to all defenses.
        This ability does not have the \\glossterm{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 5,
      type: "Instant",
    },

    {
      name: "Momentum Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        If your movement during the \\glossterm{movement phase} of this round consisted entirely of moving at least 20 feet in a straight line towards your target, you gain a +1d damage bonus with the strike.
      `,
      rank: 2,
      scaling: {
        4: "The damage bonus increases to +2d.",
        6: "The damage bonus increases to +3d.",
      },
      type: "Instant",
    },

    {
      name: "Certain Strike",

      effect: `
        Make a \\glossterm{strike} with a +3 accuracy bonus.
        You take a -2d damage penalty with the strike.
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
        You gain a +2d damage bonus with the strike.
      `,
      rank: 1,
      scaling: {
        3: "The damage bonus increases to +3d.",
        5: "The damage bonus increases to +4d.",
        7: "The damage bonus increases to +5d.",
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
        You take a -1d damage penalty with the strike.
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
        Make a \\glossterm{strike}.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        After making the strike, you gain a +1 bonus to \\glossterm{accuracy} against one target of the strike with future strikes.
        If the strike had multiple targets, you choose which target you gain the bonus against.
        This effect stacks with itself, up to a maximum of a +4 bonus.
        It lasts until you take a \\glossterm{short rest} or make a \\glossterm{strike} that does not include that creature as a target.
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
        exceptThat: "the accuracy bonus from each strike increases to +2. This bonus does not stack with the bonus from the \\maneuver{hunting strike} maneuver.",
        name: "hunting strike",
      },
      rank: 5,
      scaling: {
        7: "You gain a +1 accuracy bonus with the strike.",
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
        Make a melee \\glossterm{strike}.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature damaged by the strike is \\glossterm{briefly} \\goaded by you.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1 accuracy bonus with the strike.",
        7: "The accuracy bonus increases to +2.",
      },
      type: "Duration",
    },

    {
      name: "Mainhand Feint",

      effect: `
        Make a melee \\glossterm{strike} with a -2d damage penalty.
        You \\glossterm{briefly} gain a +3d damage bonus with your \\textit{offhand strike} ability.
        This bonus has the \\glossterm{Swift} tag, so it affects the \\textit{offhand strike} ability if you use it during the current phase.
      `,
      rank: 4,
      scaling: {
        6: "The damage bonus increases to +4d.",
      },
      type: "Duration",
    },

    {
      name: "Pursuer's Strike",

      effect: `
        Make a \\glossterm{strike}.
        You \\glossterm{briefly} gain a +4 bonus to contested \\glossterm{initiative} checks against each creature damaged by the strike.
      `,
      rank: 2,
      scaling: {
        4: "The initiative bonus increases to +6.",
        6: "The initiative bonus increases to +8.",
      },
      type: "Duration",
    },

    {
      name: "Reckless Assault",

      // -1 rank for self-daze
      effect: `
        Make a \\glossterm{strike}.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        You and each creature damaged by the strike are \\glossterm{briefly} \\dazed.
        This ability does not have the \\glossterm{Swift} tag, so it does not affect attacks made against you or the damaged creatures during the current phase.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1 accuracy bonus with the strike.",
        6: "The accuracy bonus increases to +2.",
      },
      type: "Duration",
    },

    {
      name: "Greater Reckless Assault",

      effect: `
        Make a \\glossterm{strike}.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        You and each creature damaged by the strike are \\glossterm{briefly} \\stunned.
        This ability does not have the \\glossterm{Swift} tag, so it does not affect attacks made against you or the damaged creatures during the current phase.
      `,
      rank: 6,
      type: "Duration",
    },

    {
      name: "Back Into the Fray",

      effect: `
        Make a \\glossterm{strike}.
        You gain a +2d damage bonus with the strike if you used the \\textit{recover} ability or a \\abilitytag{Healing} ability last round.
      `,
      rank: 4,
      scaling: {
        6: "The damage bonus increases to +3d.",
      },
      type: "Instant",
    },

    {
      name: "Tag-Team Strike",

      effect: `
        Make a \\glossterm{strike}.
        You gain a +1d damage bonus with the strike if the target is \\glossterm{surrounded}.
      `,
      rank: 2,
      scaling: {
        4: "The damage bonus increases to +2d.",
        6: "The damage bonus increases to +3d.",
      },
      type: "Instant",
    },
  ],
};
