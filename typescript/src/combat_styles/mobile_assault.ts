import { CombatStyle } from ".";

export const mobileAssault: CombatStyle = {
  name: "Mobile Assault",
  shortDescription: "Move around the battlefield with ease to avoid threats or hunt weak foes.",

  maneuvers: [
    {
      name: "Reaping Harvest",

      effect: `
        Move up to half your movement speed in a straight line.
        You can make a melee \\glossterm{strike} using a slashing or bludgeoning weapon.
        Your \\glossterm{power} with the strike is halved.
        The strike targets any number of creatures and objects within your \\glossterm{reach} at any point during your movement, except for the space you start in and the space you end in.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Greater Reaping Harvest",

      functionsLike: {
        abilityType: "maneuver",
        exceptThat: "you can move up to your full speed instead of up to half your speed.",
        name: "reaping harvest",
      },
      rank: 4,
      type: "Instant",
    },

    {
      name: "Supreme Reaping Harvest",

      functionsLike: {
        abilityType: "maneuver",
        exceptThat: "you can move up to your full speed instead of up to half your speed, and you do not have to move in a straight line.",
        name: "reaping harvest",
      },
      rank: 6,
      type: "Instant",
    },

    {
      name: "Spring Attack",

      effect: `
        Move up to half your movement speed and make a \\glossterm{strike}.
        You take a -1d penalty to damage with the strike.
        If you use this ability during the \\glossterm{action phase}, you may use the other half of your movement during the \\glossterm{delayed action phase}.
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Wanderer's Strike",

      effect: `
        You can either move up to half your speed or make a \\glossterm{strike}.
        You take a -1d penalty to damage with the strike.
        %TODO: wording
        During the \\glossterm{delayed action phase}, you can take the action you did not take during the \\glossterm{action phase}.
        `,

      rank: 1,
      type: "Instant",
    },

    {
      name: "Push Through",

      effect: `
        Make a \\glossterm{strike} with a -1d penalty to damage.
        During the next round, you can move through the space of any creatures that took damage from this strike.
      `,
      rank: 1,
      type: "Duration",
    },

    {
      name: "Sprinting Charge",

      functionsLike: {
        abilityType: "ability",
        exceptThat: "you can move up to twice your speed instead of up to your speed.",
        name: "charge",
      },
      rank: 1,
      type: "Instant",
    },

    {
      name: "Reckless Charge",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          it does not increase your \\glossterm{fatigue level}.
          In exchange, you take a -2 penalty to Armor and Reflex defenses during the next round.
        `,
        name: "charge",
      },
      rank: 2,
      type: "Instant",
    },

    {
      name: "Prepared Sprint",

      effect: `
        During the next round, your movement speed is doubled.
        You cannot use the \\textit{sprint} ability during that round.
      `,
      rank: 1,
      type: "Duration",
    },

    {
      name: "Retreating Strike",

      effect: `
        Make a \\glossterm{strike} with a -1d penalty to damage.
        In addition, you can move up to half your movement speed in a straight line away from one target of the strike.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Flash Strike",

      effect: `
        You \\glossterm{teleport} into an unoccupied destination on a stable surface within \\shortrange.
        In addition, you can make a melee \\glossterm{strike} against any single creature within a 5 ft.\\ wide line between your starting location and your ending location.
      `,
      rank: 5,
      type: "Instant",
    },

    {
      name: "Flash Charge",

      effect: `
        You \\glossterm{teleport} into an unoccupied destination on a stable surface within \\shortrange.
        In addition, you can make a melee \\glossterm{strike} at your destination.
      `,
      rank: 4,
      type: "Instant",
    },

    {
      name: "Leaping Strike",

      effect: `
        You make a Jump check to leap and move as normal for the leap, up to a maximum distance equal to half your \\glossterm{base speed} (see \\pcref{Leap}).
        You can make a melee \\glossterm{strike} from any location you occupy during the motion, including both your initial leap and your fall afterwards (if any).
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Leaping Impact Strike",

      effect: `
        You make a Jump check to leap and move as normal for the leap, up to a maximum distance equal to half your \\glossterm{base speed} (see \\pcref{Leap}).
        You can make a melee \\glossterm{strike} from any location you occupy during the motion, including both your initial leap and your fall afterwards (if any).
        If you hit with the strike, the subject takes half of the \\glossterm{falling damage} that you would normally take based on the height of the jump, ignoring any of your abilities that reduce that damage.
        `,

      rank: 6,
      type: "Instant",
    },

    {
      name: "Vault Over",

      effect: `
        Make an attack vs. Reflex against one creature adjacent to you that is no more than one size category larger than you.
        Your \\glossterm{accuracy} with this attack is equal to your Jump skill.
        If you hit, you leap up over the subject's body, using its body as a springboard if necessary, and land in any space adjacent to it.
        % TODO: wording
        Your final destination cannot be more distant from your starting location than your \\glossterm{land speed}.
        You can make a \\glossterm{strike} from any location you occupy during the leap.
      `,
      rank: 4,
      type: "Instant",
    },
  ],
};
