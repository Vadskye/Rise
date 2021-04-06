import { CombatStyle } from ".";

export const bluntForce: CombatStyle = {
  name: "Blunt Force",
  shortDescription: "Smash foes with bludgeoning weapons and raw power.",
  sources: ["martial", "primal"],

  maneuvers: [
    {
      name: "Liver Shot",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\sickened as a \\glossterm{condition}.
        `,

      rank: 1,
      type: "Duration",
    },

    {
      name: "Nauseating Liver Shot",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\nauseated as a \\glossterm{condition}.
        `,

      rank: 3,
      type: "Duration",
    },
    {
      name: "Greater Nauseating Liver Shot",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\nauseated as a \\glossterm{condition}.
        `,

      rank: 6,
      type: "Duration",
    },

    {
      name: "Pulverizing Smash",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        You take -1d penalty to damage with the strike.
        `,

      rank: 1,
      type: "Instant",
    },

    {
      name: "Pulverizing Power Smash",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon with a -2 penalty to accuracy.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        You gain a +1d bonus to damage with the strike.
        `,

      rank: 3,
      type: "Instant",
    },

    {
      name: "Ground Stomp",

      attack: {
        hit: `Each subject takes 1d10 + half \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Reflex against everything adjacent to you that is on the same stable surface as you.
        `,
      },
      scaling: "damage",
      rank: 2,
      type: "Instant",
    },

    {
      name: "Greater Ground Stomp",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d10 + half \\glossterm{power} bludgeoning damage
        Each Large or smaller creature that loses \\glossterm{hit points} from this damage is knocked \\prone..`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarea radius from you that is on the same stable surface as you.
          You take a -4 penalty to accuracy with this attack against your \\glossterm{allies}.
        `,
      },
      rank: 5,
      type: "Instant",
    },

    {
      name: "Ground Slam",

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon against a stable surface.
        The strike targets everything on that surface in a \\smallarealong, 10 ft. wide line from you.
        Your \\glossterm{power} with the strike is halved.
        All damage dealt by this attack is bludgeoning damage instead of its normal types.
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Titanic Slam",

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon against a stable surface.
        The strike targets everything on that surface in a \\largearealong, 10 ft. wide line from you.
        Your \\glossterm{power} with the strike is halved.
        All damage dealt by this attack is bludgeoning damage instead of its normal types.
      `,
      rank: 5,
      type: "Instant",
    },

    {
      name: "Resonating Strike",

      effect: `
        Make a strike using a bludgeoning weapon.
        Damage dealt by the strike is sonic damage in addition to its normal damage types.
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Resonating Crush",

      effect: `
        Make a strike using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        You take -1d penalty to damage with the strike.
        Damage dealt by the strike is sonic damage in addition to its normal damage types.
      `,
      rank: 4,
      type: "Instant",
    },

    {
      name: "Headshot",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\dazed as a \\glossterm{condition}.
        `,

      rank: 1,
      type: "Duration",
    },

    {
      name: "Stunning Headshot",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\stunned as a \\glossterm{condition}.
        `,

      rank: 3,
      type: "Duration",
    },

    {
      name: "Confusing Headshot",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\confused as a \\glossterm{condition}.
        `,

      rank: 6,
      type: "Duration",
    },

    {
      name: "Leap Slam",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d8 + half \\glossterm{power} bludgeoning damage.`,
        targeting: `
          You make a Jump check to leap and move as normal for the leap, up to a maximum distance equal to your \\glossterm{base speed} (see \\pcref{Leap}).
          When you land, if the vertical distance in feet between the highest point of your leap and your landing point was at least ten feet, you emit a small shockwave.
          If you do, make an attack vs. Reflex against everything adjacent to you that is on the same stable surface as you.
        `,
      },
      scaling: "damage",
      rank: 4,
      type: "Instant",
    },

    {
      name: "Ricochet",

      effect: `
        Make a thrown \\glossterm{strike} using a slashing or bludgeoning weapon against up to three creatures or objects in a \\smallarea radius within \\shortrange.
        Your \\glossterm{power} with the strike is halved.
        If you choose yourself as one of the subjects, you can catch the weapon instead of taking damage from it.
      `,
      rank: 4,
      type: "Instant",
    },

    {
      name: "Knockdown",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        You take a -1d penalty to damage with the strike.
        Each creature that loses \\glossterm{hit points} from the strike falls \\prone if it is no larger than one size category larger than you.
      `,
      rank: 2,
      type: "Instant",
    },
  ],
};
