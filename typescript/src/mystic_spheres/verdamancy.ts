import { MysticSphere } from ".";

export const verdamancy: MysticSphere = {
  name: "Verdamancy",
  shortDescription: "Animate and manipulate plants.",
  sources: ["domain", "nature"],

  cantrips: [
    {
      name: "Fertile Patch",

      effect: `
        Choose one \\glossterm{unattended}, nonmagical 1-ft.\\ square of earth.
        The soil in the target becomes suffused with plant-sustaining nutrients, making it fertile ground for plants.
        This effect lasts for one year.
      `,
      scaling: {
        2: `The area increases to a 2-ft.\\ square.`,
        4: `The area increases to a 5-ft.\\ square.`,
        6: `The area increases to a 10-ft.\\ square.`,
      },
      type: "Instant",
    },

    {
      name: "Rapid Growth",

      effect: `
        Choose one Larger or smaller inanimate, \\glossterm{unattended} plant within \\shortrange.
        In addition, choose any number of days up to a week.
        The target grows as if much time had passed, assuming that it received adequate nutrition during that time.
        When this spell ends, the plant returns to its original state.
      `,
      scaling: {
        2: `You can choose up to a month of time to grow.`,
        4: `You can choose up to three months of time to grow.`,
        6: `You can choose up to a year of time to grow.`,
      },
      type: "Sustain (minor)",
    },
  ],
  spells: [
    {
      name: "Ensnaring Grasp",

      attack: {
        hit: `The target takes 1d8 + \\glossterm{power} piercing damage.`,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
          You gain a +2 bonus to \\glossterm{accuracy} with this attack if the target is in standing in \\glossterm{undergrowth}.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },
    {
      name: "Greater Ensnaring Grasp",

      attack: {
        hit: `
          The target takes 2d6 + \\glossterm{power} piercing damage.
          If it loses \\glossterm{hit points} from this damage, it is \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
          You gain a +2 bonus to \\glossterm{accuracy} with this attack if the target is in standing in \\glossterm{undergrowth}.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },
    {
      name: "Supreme Ensnaring Grasp",

      functionsLike: {
        name: 'greater ensnaring grasp',
        exceptThat: 'the damage increases to 4d6 + \\glossterm{power} damage, and the condition must be removed twice before the effect ends.',
      },
      rank: 6,
      scaling: "damage",
      type: "Duration",
    },
    {
      name: "Entangle",

      attack: {
        crit: `The target also cannot move farther than 10 feet from its original location until it ends the effect.`,
        hit: `The target is \\slowed as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Reflex against one Large or smaller creature within \\medrange that is on a stable surface.
          You gain a +2 bonus to \\glossterm{accuracy} with this attack if the target is in standing in \\glossterm{undergrowth}.
        `,
      },
      narrative: `
        Plants grow from nowhere to trap your foe.
      `,
      rank: 1,
      scaling: "accuracy",
      tags: ["Manifestation"],
      type: "Duration",
    },

    {
      name: "Greater Entangle",

      functionsLike: {
        name: 'entangle',
        exceptThat: 'the condition must be removed twice before the effect ends.',
      },
      narrative: `
        A flood of plants grow from nowhere to trap your foe.
      `,
      rank: 5,
      scaling: "accuracy",
      tags: ["Manifestation"],
      type: "Duration",
    },

    {
      name: "Vine Whip",

      attack: {
        hit: `The target takes 1d8 + \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Armor against one creature within \\medrange.
          You gain a +2 bonus to \\glossterm{accuracy} with this attack if the target is in standing in \\glossterm{undergrowth}.
        `,
      },
      rank: 1,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Greater Vine Whip",

      attack: {
        hit: `The target takes 2d10 + \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Armor against one creature within \\longrange.
          You gain a +2 bonus to \\glossterm{accuracy} with this attack if the target is in standing in \\glossterm{undergrowth}.
        `,
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Supreme Vine Whip",

      attack: {
        hit: `The target takes 5d10 + \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Armor against one creature within \\distrange.
          You gain a +2 bonus to \\glossterm{accuracy} with this attack if the target is in standing in \\glossterm{undergrowth}.
        `,
      },
      rank: 7,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Vinestorm",

      attack: {
        hit: `Each target takes 1d6 + half \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Armor against everything in a \\smallarea radius from you.
          You gain a +2 bonus to \\glossterm{accuracy} with this attack against targets standing in \\glossterm{undergrowth}.
        `,
      },
      rank: 1,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Greater Vinestorm",

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} in a \\largearea radius from you.
          You gain a +2 bonus to \\glossterm{accuracy} with this attack against targets standing in \\glossterm{undergrowth}.
        `,
      },

      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Supreme Vinestorm",

      attack: {
        hit: `Each target takes 4d6 + half \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} in a \\hugearea radius from you.
          You gain a +2 bonus to \\glossterm{accuracy} with this attack against targets standing in \\glossterm{undergrowth}.
        `,
      },
      rank: 7,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Vine Tentacles",

      effect: `
        You gain a slam \\glossterm{natural weapon} (see \\tref{Natural Weapons}).
        The natural weapon deals 1d8 damage, as normal for a slam natural weapon.
        In addition, it has the Long and Sweeping (1) \\glossterm{weapon tags} (see \\pcref{Weapon Tags}).
        Strikes using it are considered \\glossterm{magical} abilities, which means you use your Willpower to determine your damage dice instead of your Strength (see \\pcref{Dice Bonuses From Attributes}).
      `,
      rank: 2,
      narrative: `
        You grow a massive vine tentacle from your body.
      `,
      scaling: {
        4: `You gain a +5 foot bonus to \\glossterm{reach} with attacks using the tentacle.`,
        6: `The bonus to reach increases to 10 feet.`,
      },
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Poison -- Nitharit",

      attack: {
        crit: `The target immediately reaches the second \\glossterm{poison stage}, as normal for poisons.`,
        // No relevant glance effect
        hit: `The target becomes \\glossterm{poisoned} by the first \\glossterm{poison stage} of nitharit.
        At the end of each subsequent round, you repeat this attack, as normal for poisons (see \\pcref{Poison}).
        A creature poisoned by nitharit becomes \\dazed as long as it is poisoned.
        Reaching the third \\glossterm{poison stage} causes the target to become \\stunned as long as it is poisoned.
        A third failed attack ends the poison.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },

      rank: 2,
      scaling: "accuracy",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Poison -- Sassone Leaf",

      attack: {
        crit: `The target immediately reaches the second \\glossterm{poison stage}, as normal for poisons.`,
        // No relevant glance effect
        hit: `The target becomes \\glossterm{poisoned} with sassone leaf.
        At the end of each subsequent round, you repeat this attack, as normal for poisons.
        For each \\glossterm{poison stage}, including the initial stage, the target takes 1d4 physical damage.
        Reaching the third \\glossterm{poison stage} ends the poison.
        A third failed attack also ends the poison.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 1,
      scaling: {
        special: "The hit point loss from the poison increases by +1d for each rank beyond 1.",
      },
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Poison -- Arsenic",

      attack: {
        crit: `The target immediately reaches the second \\glossterm{poison stage}, as normal for poisons.`,
        hit: `The target becomes \\glossterm{poisoned} with arsenic.
        At the end of each subsequent round, you repeat this attack, as normal for poisons.
        For each \\glossterm{poison stage}, including the initial stage, the target takes 1d8 physical damage.
        Reaching the third \\glossterm{poison stage} causes the target to gain a \\glossterm{vital wound} and ends the poison.
        A third failed attack also ends the poison.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature within \\longrange.
        `,
      },
      rank: 3,
      scaling: {
        special: "The hit point loss from the poison increases by +1d for each rank beyond 3.",
      },
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Poison -- Black Lotus",

      attack: {
        crit: `The target immediately reaches the second \\glossterm{poison stage}, as normal for poisons.`,
        hit: `The target becomes \\glossterm{poisoned} with arsenic.
        At the end of each subsequent round, you repeat this attack, as normal for poisons.
        For each \\glossterm{poison stage}, including the initial stage, the target loses 2d8 + half \\glossterm{power} \\glossterm{hit points}.
        Reaching the third \\glossterm{poison stage} causes the target to gain a \\glossterm{vital wound}.
        A third failed attack ends the poison.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 5,
      scaling: {
        special: "The hit point loss from the poison increases by +1d for each rank beyond 5.",
      },
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Herbal Antidote",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The target gains an additional success to resist a poison currently affecting it (see \\pcref{Poison}).
      `,
      rank: 1,
      scaling: {
        3: `The number of additional successes increases to two.
            The target can split these successes among any number of different poisons affecting it.`,
        5: `The number of additional successes increases to three.`,
        7: `The number of additional successes increases to four.`,
      },
      type: "Instant",
    },

    {
      name: "Barkskin",

      castingTime: "minor action",
      effect: `
        You gain a +4 \\glossterm{magic bonus} to \\glossterm{damage resistance}.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +8.`,
        5: `The bonus increases to +16.`,
        7: `The bonus increases to +32.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Barkskin",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Barkskin",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The bonus increases to +8.`,
        7: `The bonus increases to +16.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Embedded Growth",

      attack: {
        crit: `The damage from the condition is doubled.`,
        hit: `As a \\glossterm{condition}, the target takes 1d4 physical damage at the end of each round.
        If the the target gains a \\glossterm{vital wound} from this damage, the condition ends.

        This effect can be removed with the \\textit{treat condition} ability from the Medicine skill (see \\pcref{Medicine}).
        The \\glossterm{difficulty value} of the check is equal to 10.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      narrative: `
        You throw a seed that embeds itself in a foe and grows painfully.
      `,
      rank: 1,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Fire Seeds",

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} fire damage.`,
        targeting: `
        % Does "seed structure" make sense?
        You transform up to three \\glossterm{unattended} acorns or similar seed structures you touch into small bombs.
        As a standard action, you or another creature can throw the acorn up to 30 feet.
        % More accurate version: the acorn has a range increment of 10 feet to hit its target, but that accuracy roll is completely independent of the explosion.
        % Doesn't seem worth the complexity, and implicitly gives the fire seed surprisingly long range since objects are easy to hit.
        On impact, the acorn detonates, and you make an attack vs. Reflex against everything within a \\smallarea radius of the struck creature or object.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Sustain (free)",
    },

    {
      name: "Greater Fire Seeds",

      functionsLike: {
        name: 'fire seeds',
        exceptThat: 'the damage increases to 4d6 + half \\glossterm{power}, and the range of each acorn increases to \\medrange.',
      },
      rank: 6,
      scaling: "damage",
      type: "Sustain (free)",
    },

    {
      name: "Wall of Thorns",

      // original targets: Each creature that moves through the area (see text)
      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} piercing damage.`,
        targeting: `
        You create a wall of thorns in 15 ft.\\ high, \\smallarea \\glossterm{wall} within \\medrange.
        The base of at least half of the wall must be in arable earth.
        The wall is four inches thick, but permeable.
        It provides \\glossterm{cover} to attacks made through the wall.
        Creatures can pass through the wall, though it costs five extra feet of movement to move through the wall.
        Whenever anything moves through the wall, make an attack vs. Armor against it.
        You can only make an attack in this way against a given target once per \\glossterm{phase}.

        Each five-foot square of wall has hit points equal to three times your \\glossterm{power}, and all of its defenses are 0.
        `,
      },

      rank: 3,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Greater Wall of Thorns",

      functionsLike: {
        name: 'wall of thorns',
        exceptThat: 'the damage increases to 4d6 + half \\glossterm{power}, and the area increases to a 20 ft. high, \\medarea \\glossterm{wall}.',
      },
      rank: 6,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Plant Growth",

      effect: `
        Choose a \\smallarea radius \\glossterm{zone} within \\longrange.
        In addition, choose whether you want plants within the area to grow or diminish.

        If you choose for plants to grow, all earth and unworked stone within the area becomes overrun with \\glossterm{light undergrowth}.
        Light undergrowth within the area is increased in density to \\glossterm{heavy undergrowth}.
        If you choose for plants to diminish, all \\glossterm{heavy undergrowth} in the area is reduced to \\glossterm{light undergrowth}, and all \\glossterm{light undergrowth} is removed.

        When this spell's duration ends, the plants return to their original size.
      `,
      rank: 2,
      scaling: {
        4: `The area increases to a \\medarea radius.`,
        6: `The area increases to a \\largearea radius.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Blight",

      attack: {
        hit: `The target takes 2d6 + \\glossterm{power} acid damage.
        This damage is doubled if the target is a plant, including plant creatures.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature or plant within \\shortrange.
        `,
      },
      rank: 2,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Blight",

      attack: {
        hit: `The target takes 4d8 + \\glossterm{power} acid damage.
        This damage is doubled if the target is a plant, including plant creatures.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature or plant within \\medrange.
        `,
      },
      rank: 5,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Shillelagh",

      effect: `
        Choose one nonmagical, \\glossterm{unattended} stick of wood you touch.
        You transform the target into a club, greatclub, or quarterstaff, as you choose (see \\pcref{Weapons}).
        You cannot change the target's size by more than one size category.
        You gain a +2 \\glossterm{magic bonus} to \\glossterm{power} on attacks with it.
      `,
      rank: 1,
      scaling: {
        3: `The power bonus increases to +4.`,
        5: `The power bonus increases to +8.`,
        7: `The power bonus increases to +16.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Survivalist",

      effect: `
        If you are \\glossterm{trained} with the Survival skill, you gain a +3 \\glossterm{magic bonus} to it.
        Otherwise, you are treated as being \\glossterm{trained} in that skill.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Flourishing Vines",

      effect: `
        Long, thin vines continuously grow and writhe on your body.
        At the end of each round, you may choose to cause the vines to extend out onto the ground in a \\smallarea radius around you.
        When you do, that area becomes covered in \\glossterm{light undergrowth}.
        Whenever your location changes by any means, the vines retreat back to your body.
        That prevents the vines from impeding your movement, though they do impede the movement of any other creatures that move simultaneously.
      `,
      rank: 4,
      scaling: { 6: `The area increases to a \\medarea radius.` },
      type: "Attune (self)",
    },

    {
      name: "Thornblade",

      castingTime: "minor action",
      effect: `
        All damage you deal with \\glossterm{strikes} becomes piercing damage in addition to the attack's normal damage types.
        Whenever you cause a creature to lose \\glossterm{hit points} with a \\glossterm{strike}, thorns from the striking weapon enter the target's body.
        As a \\glossterm{condition}, the target unable to heal the \\glossterm{hit points} lost to the attack.

        This effect can be removed with the \\textit{treat condition} ability (see \\pcref{Treat Condition}).
        The \\glossterm{difficulty value} of the check is equal to 5 \\add your \\glossterm{power}.
      `,
      rank: 3,
      scaling: {
        5: `The condition cannot be removed with the Medicine skill.`,
        7: `Each creature affected by the condition also takes 2d8 piecing damage at the end of each round.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Thornblade",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Thornblade",
      },
      // narrative: '',
      rank: 5,
      scaling: {
        7: `The condition cannot be removed with the Medicine skill.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Verdant Armor",

      effect: `
        When you cast this spell, you choose a type of body armor you are proficient with that is not normally made from metal.
        Plants grow around your body, functioning like your chosen type of armor for you, except that the \\glossterm{encumbrance} of the armor is reduced by 2.
        These plants are considered to be normal plants for the purpose of abilities that require plants to be near targets, such as spells from this mystic sphere.
        This spell has no effect if you are wearing other body armor.
      `,
      rank: 1,
      scaling: {
        3: `You also gain a +4 \\glossterm{magic bonus} to \\glossterm{damage resistance}.`,
        5: `The damage resistance bonus increases to +8.`,
        7: `The damage resistance bonus increases to +16.`,
      },
      tags: ["Manifestation"],
      type: "Attune (self)",
    },
  ],
  rituals: [
    {
      name: "Fertility",

      castingTime: "24 hours",
      effect: `
        This ritual creates an area of bountiful growth in a one mile radius \\glossterm{zone} from your location.
        Normal plants within the area become twice as productive as normal for the next year.
        This ritual does not stack with itself.
        If the \\ritual{infertility} ritual is also applied to the same area, the most recently performed ritual takes precedence.
        `,

      rank: 3,
      type: "Instant",
    },

    {
      name: "Infertility",

      castingTime: "24 hours",
      effect: `
        This ritual creates an area of death and decay in a one mile radius \\glossterm{zone} from your location.
        Normal plants within the area become half as productive as normal for the next year.
        This ritual does not stack with itself.
        If the \\ritual{fertility} ritual is also applied to the same area, the most recently performed ritual takes precedence.
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Lifeweb Transit",

      castingTime: "24 hours",
      effect: `
        Choose up to five Medium or smaller ritual participants.
        In addition, choose a living plant that all ritual participants touch during the ritual.
        The plant must be at least one size category larger than the largest chosen ritual participant.
        In addition, choose a destination up to 100 miles away from you on your current plane.
        By walking through the chosen plant, each target is teleported to the closest plant to the destination that is at least one size category larger than the largest chosen ritual participant.

        You must specify the destination with a precise mental image of its appearance.
        The image does not have to be perfect, but it must unambiguously identify the destination.
        If you specify its appearance incorrectly, or if the area has changed its appearance, the destination may be a different area than you intended.
        The new destination will be one that more closely resembles your mental image.
        If no such area exists, the ritual simply fails.
        % TODO: does this need more clarity about what teleportation works?
      `,
      rank: 5,
      type: "Instant",
    },
  ],
};
