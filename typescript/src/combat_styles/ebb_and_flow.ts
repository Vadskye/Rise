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
      type: "Instant",
    },

    {
      name: "Greater Counterstrike",

      functionsLike: {
        exceptThat: "the accuracy bonus increases to +4.",
        name: "counterstrike",
      },
      rank: 5,
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
      type: "Instant",
    },

    {
      name: "Followup Strike",

      effect: `
        Make a \\glossterm{strike}.
        You gain a +2 bonus to \\glossterm{accuracy} with the strike against each creature that you missed with a \\glossterm{strike} last round.
      `,
      rank: 2,
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
        The strike deals minimum damage, and your \\glossterm{power} is halved.
        If a creature takes damage from the strike, it takes a -2 penalty to Armor defense until the end of the next round.
      `,
      rank: 1,
      type: "Duration",
    },

    {
      name: "Frenzied Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        % This would be easier to write as +1d up to +3d, but that is very
        % annoying to track in practice due to the different dice for each stage.
        % A static damage bonus is more complex to write down, but much easier
        % to actually make attacks with.
        For each previous consecutive round that you used this ability, you gain a +1 bonus to damage with the strike, up to a maximum of +3.
      `,
      scaling: {
        special: `
          The damage bonus for each consecutive round increases by 1 for each rank beyond 1.
          In addition, the maximum damage bonus increases by 3 for each rank beyond 1.
        `,
      },
      rank: 1,
      type: "Instant",
    },

    {
      name: "Reckless Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        You gain a +1d bonus to damage with the strike.
        During the next round, you take a -2 penalty to all defenses.
      `,
      rank: 2,
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
      type: "Instant",
    },

    {
      name: "Meteor Smash",

      effect: `
        Make a melee \\glossterm{strike}.
        If your movement during the \\glossterm{movement phase} consisted entirely of moving at least 20 feet in a straight line towards your target, you gain a +3d bonus to damage with the strike.
      `,
      rank: 5,
      type: "Instant",
    },

    {
      name: "Certain Strike",

      effect: `
        Make a \\glossterm{strike} with a +2 accuracy bonus.
        You take a -2d penalty to damage with the strike.
      `,
      rank: 1,
      type: "Instant",
    },

    {
      name: "Greater Certain Strike",

      effect: `
        Make a \\glossterm{strike} with a +3 accuracy bonus.
        You take a -2d penalty to damage with the strike.
        `,

      rank: 3,
      type: "Instant",
    },

    {
      name: "Supreme Certain Strike",

      effect: `
        Make a \\glossterm{strike} with a +4 accuracy bonus.
        You take a -2d penalty to damage with the strike.
        `,

      rank: 5,
      type: "Instant",
    },

    {
      name: "Power Strike",

      effect: `
        Make a \\glossterm{strike} with a -2 penalty to \\glossterm{accuracy}.
        You gain a +2d bonus to damage with the strike.
        `,

      rank: 1,
      type: "Instant",
    },

    {
      name: "Greater Power Strike",

      effect: `
        Make a \\glossterm{strike} with a -2 penalty to \\glossterm{accuracy}.
        You gain a +3d bonus to damage with the strike.
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Supreme Power Strike",

      effect: `
        Make a \\glossterm{strike} with a -2 penalty to \\glossterm{accuracy}.
        You gain a +4d bonus to damage with the strike.
      `,
      rank: 5,
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
      type: "Duration",
    },

    {
      name: "Greater Hunting Strike",

      functionsLike: {
        exceptThat: "the accuracy bonus from each strike increases to +2.",
        name: "hunting strike",
      },
      rank: 5,
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
      type: "Instant",
    },

    {
      name: "Greater Punish Inattention",

      functionsLike: {
        exceptThat: "the accuracy bonus increases to +4.",
        name: "punish inattention",
      },
      rank: 6,
      type: "Instant",
    },
  ],
};
