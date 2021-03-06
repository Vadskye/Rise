import { MysticSphere } from ".";

export const channelDivinity: MysticSphere = {
  name: "Channel Divinity",
  shortDescription: "Invoke divine power to smite foes and gain power.",
  sources: ["divine"],

  cantrips: [
    {
      effect: `
        The magical essence of your deity or alignment is overlayed on your body as an aura.
        This represents your deity if you are a cleric, or your alignment if you are a paladin.
        In either case, you gain the ability to see the auras of other creatures using this spell if they are within \\rngshort range.
        If you see another creature with the same aura as you, this spell grants you the unerring knowledge of that similarity.
        This can allow you to identify other followers of your deity or alignment with certainty.

        This spell lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
      `,
      focus: false,
      name: "Testament",
      scaling: {
        2: "The range increases to \\rngmed.",
        4: `
          If you are a cleric, you can also unerringly see an aura around creatures who worship your deity.
          If you are a paladin, you can also unerringly see an aura around creatures who share your devoted alignment.
        `,
        6: "The range increases to \\rnglong.",
      },
      type: "Duration",
    },
    {
      effect: `
        You emit \\glossterm{bright illumination} in a radius of your choice, up to a maximum of 15 feet, and \\glossterm{shadowy illumination} in twice that radius.
        The color of the light depends on the nature of your deity or alignment.
        Each deity has their own color or color combination.
        Typically, good is yellow, evil is purple, law is white, and chaos is a myriad of ever-changing colors.
      `,
      focus: false,
      name: "Divine Radiance",
      narrative: `
        You call on the majesty of your deity or alignment to radiate into the world.
      `,
      scaling: {
        2: "The maximum radius of bright illumination increases to 30 feet.",
        4: "The maximum radius of bright illumination increases to 60 feet.",
        6: "The maximum radius of bright illumination increases to 120 feet.",
      },
      type: "Sustain (minor)",
    },
  ],
  spells: [
    {
      name: "Faith Rewarded",

      effect: `
        At the end of the next round, you become infused with divine power.
        You remove one \\glossterm{condition} affecting you and heal one \\glossterm{hit point}.
        This cannot remove a condition applied during that round.
        In addition, you gain a +4 bonus to \\glossterm{accuracy} during the round after you become infused with divine power.
        `,
      rank: 3,
      scaling: {
        5: `The accuracy bonus increases to +5.`,
        7: `The accuracy bonus increases to +6.`,
      },
      type: "Duration",
    },

    {
      name: "Divine Authority",

      effect: `
        You gain a +3 \\glossterm{magic bonus} to the Persuasion skill.
        In addition, you are treated as being \\glossterm{trained} in that skill if you would otherwise be untrained.
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
      name: "Agent of the Divine",

      effect: `
        You gain a +2 \\glossterm{magic bonus} to \\glossterm{accuracy}.
        In addition, you gain a +4 \\glossterm{magic bonus} to \\glossterm{power}.
        `,
      rank: 5,
      scaling: { 7: `The accuracy bonus increases to +3, and the power bonus increases to +8.` },
      type: "Attune (self)",
    },

    {
      name: "Endurance of the Faithful",

      effect: `
        This spell does not have the \\glossterm{Focus} tag.

        You take half damage from \\glossterm{physical damage} this round.
        This halving is applied before \\glossterm{resistances} and similar abilities.
        Because this ability has the \\glossterm{Swift} tag, this improves your resistances against damage you take during the current phase.
        `,
      focus: false,
      rank: 2,
      scaling: {
        4: `You also take half damage from \\glossterm{energy} damage this round.`,
        6: `You also negate any \\glossterm{conditions} that you would gain this round.`,
      },
      tags: ["Swift"],
      type: "Instant",
    },

    {
      name: "Divine Judgment",

      attack: {
        hit: `
          The subject takes 1d10 + \\glossterm{power} energy damage.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\medrange.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Stunning Judgment",

      attack: {
        hit: `
          The subject takes 1d6 energy damage.
          If it loses \\glossterm{hit points} from this damage, it is \\glossterm{stunned} as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\medrange.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Glimpse of Divinity",

      attack: {
        crit: "The subject is also \\glossterm{dazed} as part of the same condition.",
        glance: "The effect lasts until the end of the next round.",
        hit: `
          The subject is \\glossterm{dazzled} as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\longrange.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Fear of the Divine",

      attack: {
        crit: "The subject is \\glossterm{panicked} instead of \\glossterm{frightened}.",
        glance: "The effect lasts until the end of the next round.",
        hit: `
          The subject is \\frightened by you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Judge Unworthy",

      attack: {
        crit: "The penalty increases to -5.",
        // glance: '',
        hit: `
          As a \\glossterm{condition}, the subject takes a -2 penalty to Mental defense.
        `,
        targeting: `
          Make an attack vs. Mental with a +2 \\glossterm{accuracy} bonus against one creature within \\longrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Word of Faith",

      attack: {
        hit: `
          Each subject takes 1d10 + half \\glossterm{power} energy damage.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
        `,
      },
      rank: 2,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Word of Faith",

      attack: {
        glance: "Half damage.",
        hit: `
          Each subject takes 2d8 + half \\glossterm{power} energy damage.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Mantle of Faith",

      castingTime: "minor action",
      effect: `
        You gain a +6 \\glossterm{magic bonus} to your \\glossterm{resistances} to both \\glossterm{physical damage} and \\glossterm{energy damage}.
        `,
      rank: 3,
      scaling: {
        5: `The bonus increases to +12.`,
        7: `The bonus increases to +24.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Divine Might",

      castingTime: "minor action",
      effect: `
        Your size increases by one \\glossterm{size category}.
        This increases your \\glossterm{base speed} and reduces your \\glossterm{Stealth} skill.
        It may also increase your \\glossterm{reach} (see \\pcref{Size in Combat}).
        However, your physical form is not altered fully to match your new size, and your Strength and Dexterity are unchanged.
      `,
      rank: 3,
      scaling: {
        5: `You also gain a +2 bonus to Strength-based checks, and you gain a +2 bonus to Strength for the purpose of determining your carrying capacity.`,
        7: "You can increase your size category by up to two size categories",
      },
      type: "Attune (self)",
    },

    {
      name: "Divine Presence",

      attack: {
        crit: "The effect becomes a \\glossterm{condition} on each subject.",
        // glance: '',
        hit: `
          Each subject is \\glossterm{shaken} by you until the end of the next round.
        `,
        targeting: `
          At the end of each round, make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius \\glossterm{emanation} from you.
          After you attack a creature this way, it becomes immune to this ability from you until it takes a \\glossterm{short rest}.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Attune (self)",
    },

    {
      name: "Greater Divine Presence",

      functionsLike: {
        exceptThat: `
          the area increases to a \\largearea radius \\glossterm{emanation} from you.
        `,
        name: "divine presence",
      },
      rank: 6,
      tags: ["Emotion"],
      type: "Attune (self)",
    },

    {
      name: "Faithful Endurance",

      castingTime: "minor action",
      effect: `
        You gain a +1 \\glossterm{magic bonus} to \\glossterm{vital rolls} (see \\pcref{Vital Rolls}).
      `,
      rank: 3,
      scaling: { 5: `The bonus increases to +2.`, 7: `The bonus increases to +3.` },
      type: "Attune (self)",
    },

    {
      name: "Divine Conduit",

      castingTime: "minor action",
      effect: `
        You reduce your \\glossterm{focus penalty} with divine spells by 2.
      `,
      rank: 2,
      scaling: {
        4: `You gain a +1 \\glossterm{magic bonus} to \\glossterm{accuracy} with divine spells.`,
        6: `You gain a +4 \\glossterm{magic bonus} to \\glossterm{power} with divine spells.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Divine Favor",

      castingTime: "minor action",
      effect: `
        You gain a +1 \\glossterm{magic bonus} to \\glossterm{accuracy} with all attacks.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +2.`,
        5: `The bonus increases to +3.`,
        7: `The bonus increases to +4.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Divine Power",

      castingTime: "minor action",
      effect: `
        You gain a +2 \\glossterm{magic bonus} to \\glossterm{power}.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +8.`,
        7: `The bonus increases to +16.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Divine Offering",

      castingTime: "minor action",
      effect: `
        When you cast this spell, you gain a \\glossterm{vital wound} that has no vital wound effect.
        In exchange, you gain a +4 \\glossterm{magic bonus} to \\glossterm{vital rolls} and become immune to \\glossterm{conditions}.
      `,
      rank: 6,
      type: "Sustain (free)",
    },

    {
      name: "Divine Seal",

      effect: `
        Choose a \\smallarea radius \\glossterm{zone} within \\longrange.
        Whenever a creature casts a divine spell in the area, if that creature does not share your deity (for clerics) or devoted alignment (for paladins), the spell has a 50\\% chance to fail with no effect.
      `,
      rank: 3,
      scaling: {
        5: `The area increases to a \\medarea radius.`,
        7: `The area increases to a \\largearea radius.`,
      },
      type: "Sustain (minor)",
    },

    {
      name: "Banish Anathema",

      attack: {
        crit: `
          Double damage.
          In addition, if the subject is a \\glossterm{planeforged} not on its home plane, it is teleported to a random location on its home plane.
          If it is a creature created by a \\glossterm{Manifestation} ability, it immediately disappears.
        `,
        glance: "Half damage.",
        hit: `
          The subject takes 2d6 + half \\glossterm{power} energy damage.
        `,
        // +2 accuracy in exchange for +1 level and -half power
        targeting: `
          Make an attack vs. Mental with a +2 \\glossterm{accuracy} bonus against anything within \\medrange.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Astral Refuge",

      castingTime: "minor action",
      effect: `
        Choose yourself or one Medium or smaller \\glossterm{ally} or unattended object within \\medrange.
        You send that creature into a random safe location in the Astral Plane, causing it to temporarily disappear.
        When you cast this spell, you choose how many rounds the subject spends in the Astral Plane, up to a maximum of five rounds.
        At the end of the last round, it reappears in the same location where it disappeared, or in the closest unoccupied space if that location is occupied.
        `,
      rank: 2,
      scaling: {
        4: `The maximum size of the subject increases to Large.`,
        6: `The maximum size of the subject increases to Huge.`,
      },
      type: "Duration",
    },
  ],
  rituals: [
    {
      name: "Consecration",

      castingTime: "24 hours",
      effect: `
        The area within an \\medarea radius \\glossterm{zone} from your location becomes sacred to your deity.
        % TODO: what cares about consecration?
        This has no tangible effects by itself, but some special abilities and monsters behave differently in consecrated areas.
      `,
      rank: 3,
      type: "Attune (self)",
    },
    {
      name: "Permanent Consecration",

      castingTime: "24 hours",
      effect: `
        The area within an \\medarea radius \\glossterm{zone} from your location becomes permanently sacred to your deity.
      `,
      rank: 5,
      type: "Duration",
    },

    {
      name: "Divine Transit",

      castingTime: "24 hours",
      effect: `
        Choose a destination up to 100 miles away from you on your current plane.
        Up to five Medium or smaller ritual participants are teleported to the temple or equivalent holy site to your deity that is closest to the chosen destination.

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

    {
      name: "Commune",

      castingTime: "24 hours",
      effect: `
        You ask your source of divine power a single yes or no question.
        You receive a correct answer to that question to the limit of that source's knowledge, which is usually quite extensive.
        The answer is typically given as "yes" or "no", but it may answer "unclear" if the source does not know the answer.
        In cases where a one-word answer would be misleading or contrary to the source's interests, a short phrase may be given as an answer instead.

        This ritual only yields accurate results once for any given situation.
        If you perform the ritual again in a situation that has not meaningfully changed, you receive no answer regardless of your question.
        For example, if you are presented with seven doorways, with one doorway leading to a magnificent treasure and all other doorways leading to certain death, you cannot simply perform this ritual six times to determine the correct doorway.
      `,
      rank: 5,
      type: "Instant",
    },
  ],
};
