import { CombatStyle } from ".";

export const mobileAssault: CombatStyle = {
  name: "Mobile Assault",
  sources: ["esoteric", "trick", "wild", "primal"],

  maneuvers: [
    {
      name: "Reaping Charge",

      // original targets: See text
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
      name: "Reaping Harvest",

      effect: `
        Move up to your movement speed.
        You can make a melee \\glossterm{strike} using a slashing or bludgeoning weapon.
        Your \\glossterm{power} with the strike is halved.
        The strike targets any number of creatures and objects within your \\glossterm{reach} at any point during your movement, except for the space you start in and the space you end in.
        `,

      rank: 6,
      type: "Instant",
    },

    {
      name: "Spring Attack",

      effect: `
        Move up to half your movement speed and make a melee \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        If you use this ability during the \\glossterm{action phase}, you may use the other half of your movement during the \\glossterm{delayed action phase}.
        `,

      rank: 3,
      type: "Instant",
    },

    {
      name: "Wanderer's Strike",

      effect: `
        You can either move up to half your speed or make a \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        %TODO: wording
        During the \\glossterm{delayed action phase}, you can take the action you did not take during the \\glossterm{action phase}.
        `,

      rank: 2,
      type: "Instant",
    },

    {
      name: "Retreating Strike",

      effect: `
        Make a melee \\glossterm{strike} and move up to half your movement speed in a straight line away from one target of the strike.
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

      // original targets: One creature adjacent to you no more than one size category larger than you
      effect: `
        Make a Jump attack against the subject's Reflex defense.
        If you hit, you leap up over its body, using its body as a springboard if necessary, and land in any space adjacent to it.
        % TODO: wording
        Your final destination cannot be more distant from your starting location than your \\glossterm{land speed}.
        You can make a \\glossterm{strike} from any location you occupy during the leap.
        `,

      rank: 4,
      type: "Instant",
    },
  ],
};
