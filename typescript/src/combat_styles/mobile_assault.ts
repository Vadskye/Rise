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
        The strike targets any number of creatures and objects within your \\glossterm{reach} at any point during your movement.
      `,
      rank: 3,
    },

    {
      name: "Greater Reaping Harvest",

      effect: `
        Move up to your movement speed in a straight line.
        You can make a melee \\glossterm{strike} using a slashing or bludgeoning weapon.
        The strike targets any number of creatures and objects within your \\glossterm{reach} at any point during your movement.
      `,
      rank: 7,
    },

    {
      name: "Spring Attack",

      effect: `
        Move up to half your movement speed and make a \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        If you use this ability during the \\glossterm{action phase}, you may use the other half of your movement during the \\glossterm{delayed action phase}.
      `,
      rank: 3,
    },

    {
      name: "Wanderer's Strike",

      effect: `
        You can either move up to half your speed or make a \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        If you use this ability during the \\glossterm{action phase}, you can take the other action during the \\glossterm{delayed action phase}.
      `,
      rank: 1,
    },

    {
      name: "Wanderer's Strike+",

      effect: `
        You can either move up to your speed or make a \\glossterm{strike}.
        If you use this ability during the \\glossterm{action phase}, you can take the other action during the \\glossterm{delayed action phase}.
      `,
      rank: 5,
    },

    {
      name: "Push Through",

      effect: `
        Make a melee \\glossterm{strike}.
        You can \\glossterm{briefly} move through the space of each creature damaged by the strike.
      `,
      rank: 1,
    },

    {
      name: "Sprinting Charge",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          you can move up to twice your speed instead of up to your speed, and the defense penalty is removed.
          After you use this ability, you increase your \\glossterm{fatigue level} by 1.
        `,
        name: "charge",
      },
      rank: 1,
    },

    {
      name: "Prepared Sprint",

      effect: `
        Your movement speed is \\glossterm{briefly} doubled.
        However, you also cannot use the \\textit{sprint} ability during that time.
      `,
      rank: 1,
    },

    {
      name: "Retreating Strike",

      effect: `
        Make a \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        In addition, you can move up to half your movement speed in a straight line away from one target of the strike.
      `,
      rank: 1,
    },

    {
      name: "Retreating Strike+",

      effect: `
        Make a \\glossterm{strike}.
        In addition, you can move up to your movement speed in a straight line away from one target of the strike.
      `,
      rank: 5,
    },

    {
      name: "Flash Strike",

      effect: `
        You \\glossterm{teleport} into an unoccupied destination on a stable surface within \\shortrange.
        In addition, you can make a melee \\glossterm{strike} against any single creature within a 5 ft.\\ wide line between your starting location and your ending location.
        You cannot use this ability if you have any \\glossterm{encumbrance}.
      `,
      rank: 5,
    },

    {
      name: "Flash Flurry",

      effect: `
        You \\glossterm{teleport} into an unoccupied destination on a stable surface within \\medrange.
        In addition, you can make a melee \\glossterm{strike} that targets up to three creatures within a 5 ft.\\ wide line between your starting location and your ending location.
        You cannot use this ability if you have any \\glossterm{encumbrance}.
      `,
      rank: 7,
    },

    {
      name: "Flash Charge",

      effect: `
        You \\glossterm{teleport} into an unoccupied destination on a stable surface within \\shortrange.
        In addition, you can make a melee \\glossterm{strike} at your destination.
        You cannot use this ability if you have any \\glossterm{encumbrance}.
      `,
      rank: 3,
    },

    {
      name: "Leaping Strike",

      effect: `
        You make a long jump or high jump and move as normal for the jump (see \\pcref{Jump}).
        You can make a melee \\glossterm{strike} from any location you occupy during the motion, including both your initial leap and your fall afterwards (if any).
      `,
      rank: 3,
    },

    {
      name: "Leaping Impact Strike",

      effect: `
        You make a long jump or high jump and move as normal for the jump (see \\pcref{Jump}).
        You can make a melee \\glossterm{strike} from any location you occupy during the motion, including both your initial leap and your fall afterwards (if any).
        If you hit with the strike, the target takes half of the \\glossterm{falling damage} that you would normally take based on the height of the jump, ignoring any of your abilities that reduce that damage.
      `,
      rank: 7,
    },

    {
      name: "Vault Over",

      effect: `
        Make an attack vs. Reflex against one creature adjacent to you that is no more than one size category larger than you.
        Your \\glossterm{accuracy} with this attack is equal to your Jump skill.
        If you hit, you leap up over the target's body, using its body as a springboard if necessary, and land in any space adjacent to it.
        % TODO: wording
        Your final destination cannot be more distant from your starting location than half your \\glossterm{land speed}.
        If this attack succeeds, you can make a \\glossterm{strike} from any location you occupy during the leap.
      `,
      rank: 1,
    },

    {
      name: "Passing Splitstrike",

      effect: `
        Make a melee \\glossterm{strike}, then move up to 10 feet and make another melee \\glossterm{strike}.
        Your \\glossterm{power} with both strikes is halved.
        You cannot include the same creature or object as a target of both strikes.
        If your weapon has the Sweeping weapon tag, you ignore that tag on the first strike (see \\pcref{Sweeping}).
      `,
      rank: 3,
    },

    {
      name: "Unbalancing Backstep",

      effect: `
        Choose a creature you can see.
        You can move up to 5 feet away from that creature.
        In addition, you gain a +2 bonus to your Armor and Reflex defenses until the end of the round.
        Whenever that creature misses or \\glossterm{glances} you with a melee \\glossterm{strike} this round, it \\glossterm{briefly} takes a -2 penalty to Armor defense.
        As normal, this bonus does not stack with itself, even if the same creature misses you with multiple melee attacks.

        The defense bonus from this ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
        However, the movement and the penalty imposed on attackers is not Swift.
      `,
      rank: 1,
    },

    {
      name: "Fearsome Pounce",

      effect: `
        Move up to half your movement speed and make a \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\shaken by you as a \\glossterm{condition}.
      `,
      rank: 1,
      tags: ["Emotion"],
    },

    {
      name: "Greater Fearsome Pounce",

      effect: `
        Move up to half your movement speed and make a \\glossterm{strike}.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature that loses \\glossterm{hit points} from the strike is \\frightened by you as a \\glossterm{condition}.
      `,
      rank: 5,
      tags: ["Emotion"],
    },

    {
      name: "Mighty Charge",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          you gain a +2 damage bonus with the strike.
        `,
        name: "charge",
      },
      rank: 3,
      scaling: {
        5: "The damage bonus increases to +4.",
        7: "The damage bonus increases to +8.",
      },
    },

    {
      name: "Frenzied Charge",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          you gain a +1 accuracy bonus and a +4 damage bonus with the strike.
          However, the penalty to your defenses increases to \\minus4.
        `,
        name: "charge",
      },
      rank: 3,
    },
  ],
};
