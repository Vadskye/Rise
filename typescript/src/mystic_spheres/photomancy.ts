import { MysticSphere } from ".";

export const photomancy: MysticSphere = {
  name: "Photomancy",
  shortDescription: "Create and manipulate light to hinder foes and conceal allies.",
  sources: ["arcane", "divine", "nature", "pact"],

  cantrips: [
    {
      name: "Beautify",

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
        You alter your appearance in minor ways.
        This functions like the \\textit{disguise creature}  ability with a +4 bonus, except that you cannot change the appearance of your equipment, species, creature type, or number of limbs (see \\pcref{Disguise Creature}).
        This ability is commonly used to hide blemishes or to appear younger or older than one's true age.

        This ability lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
        `,
        name: "disguise creature",
      },
      focus: false,
      scaling: {
        2: `The bonus increases to +6.`,
        4: `The bonus increases to +8.`,
        6: `The bonus increases to +10.`,
      },
      tags: ["Sensation", "Visual"],
      type: "Duration",
    },

    {
      name: "Illuminate",

      effect: `
        A glowing light appears in midair in any location within \\medrange.
        It creates \\glossterm{bright illumination} in a radius of your choice, up to a maximum of 15 feet, and \\glossterm{shadowy illumination} in twice that radius.
        You can freely choose the color of the light, but it is unchanging once created.
        This effect lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
      `,
      focus: false,
      scaling: {
        2: `The maximum radius of bright illumination increases to 30 feet.`,
        4: `The maximum radius of bright illumination increases to 60 feet.`,
        6: `The maximum radius of bright illumination increases to 120 feet.`,
      },
      tags: ["Sensation", "Visual"],
      type: "Duration",
    },
  ],
  spells: [
    {
      name: "Color Spray",

      attack: {
        crit: `The effect is a \\glossterm{condition} that lasts until it is removed.`,
        hit: `Each subject at its maximum hit points is \\dazed until the end of the next round.
        Each subject that is at less than its maximum \\glossterm{hit points} is \\stunned instead of dazed.`,
        targeting: `
          Make an attack vs. Mental against each creature within a \\smallarea cone from you.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      tags: ["Sensation", "Visual"],
      type: "Duration",
    },

    {
      name: "Greater Color Spray",

      functionsLike: {
        exceptThat: `
          the area increases to a \\largearea cone from you.
        `,
        name: "color spray",
      },
      rank: 3,
      scaling: "accuracy",
      tags: ["Sensation", "Visual"],
      type: "Instant",
    },

    {
      name: "Prismatic Spray",

      attack: {
        crit: `The effect is a \\glossterm{condition} that lasts until it is removed.`,
        hit: `Each subject at its maximum hit points is \\stunned until the end of the next round.
        Each subject that is at less than its maximum \\glossterm{hit points} is \\confused instead of stunned.`,
        targeting: `
          Make an attack vs. Mental against each creature within a \\medarea cone from you.
        `,
      },

      rank: 5,
      scaling: "accuracy",
      tags: ["Sensation", "Visual"],
      type: "Duration",
    },

    {
      name: "Greater Prismatic Spray",

      functionsLike: {
        // note: technically this should be largearea + 1 level...
        exceptThat: `
          the area increases to a \\hugearea cone from you.
        `,
        name: "prismatic spray",
      },
      rank: 7,
      tags: ["Sensation", "Visual"],
      type: "Instant",
    },

    {
      name: "Army of Twins",

      // original targets: Up to five targets within \medrange from among you and your \glossterm{allies}
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        In addition, choose one of the subjects as the primary subject.
        You make a Disguise check to alter each subject's appearance to exactly match the primary subject (see \\pcref{Disguise Creature}).
        You gain a +4 bonus on the check, and you can freely alter the appearance of each subject's clothes and equipment, regardless of their original form.
        However, this effect is unable to alter the sound, smell, texture, or temperature of any subject or its clothes and equipment.
      `,
      rank: 3,
      scaling: { 5: `The bonus increases to +6.`, 7: `The bonus increases to +8.` },
      tags: ["Sensation", "Visual"],
      type: "Sustain (free)",
    },

    {
      name: "Blurred Motion",

      effect: `
        If you move at least 15 feet during the \\glossterm{movement phase}, you gain a +1 bonus to Armor defense until the end of that round.
      `,
      rank: 4,
      scaling: {
        6: `The bonus increases to +2.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Wall of Light",

      effect: `
        You create a wall of light in a 15 ft.\\ high, \\medarealong line within \\medrange.
        If you create the wall within a space too small to hold it, it fills as much of the space as possible, starting from the middle of the chosen space.
        This can allow you to completely block off small tunnels.
        The wall is visible as a solid block of light that blocks sight.
        It does not inhibit the passage of objects or creatures.
      `,
      rank: 1,
      scaling: {
        3: `The area increases to a \\largearealong line.`,
        5: `The area increases to a 30 ft.\\ high, \\hugearealong line.`,
        7: `The area increases to a 60 ft.\\ high, \\gargarealong line.`,
      },
      tags: ["Sensation"],
      type: "Sustain (minor)",
    },

    {
      name: "Flash",

      attack: {
        crit: `The subject is \\blinded instead of dazzled.`,
        hit: `The subject is \\dazzled as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
          Whether you hit or miss, \\glossterm{brilliant illumination} fills a 60 foot radius around the subject until the end of the next round.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      tags: ["Sensation", "Visual"],
      type: "Duration",
    },

    {
      name: "Blinding Flash",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `The subject is \\blinded as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
          Whether you hit or miss, \\glossterm{brilliant illumination} fills a 120 foot radius around the subject until the end of the next round.
        `,
      },
      rank: 7,
      tags: ["Sensation", "Visual"],
      type: "Duration",
    },

    {
      name: "Searing Light",

      attack: {
        // +1 accuracy, low power; photomancy isn't supposed to be a high damage sphere
        hit: `The subject takes 1d8 + half \\glossterm{power} energy damage.`,
        targeting: `
          Make an attack vs. Reflex with a +1 \\glossterm{accuracy} bonus against anything within \\medrange.
          Whether you hit or miss, \\glossterm{brilliant illumination} fills a 60 foot radius around a 5 ft. wide straight line between you and the subject.
          The illumination lasts until the end of the next round.
        `,
      },
      rank: 1,
      scaling: "damage",
      tags: ["Sensation", "Visual"],
      type: "Duration",
    },

    {
      name: "Solar Ray",

      attack: {
        crit: `Double damage. In addition, the subject suffers consequences as if it had been struck by a beam of true sunlight.`,
        glance: `Half damage.`,
        // +1 accuracy, low power; photomancy isn't supposed to be a high damage sphere
        hit: `The subject takes 2d8 + half \\glossterm{power} energy damage.`,
        targeting: `
          Make an attack vs. Reflex with a +2 \\glossterm{accuracy} bonus against anything within \\medrange.
          Whether you hit or miss, \\glossterm{brilliant illumination} fills a 120 foot radius around a 5 ft. wide straight line between you and the subject.
          The illumination lasts until the end of the next round.
        `,
      },
      rank: 4,
      scaling: "damage",
      tags: ["Sensation", "Visual"],
      type: "Duration",
    },

    {
      name: "Lightburst",

      attack: {
        crit: "The effect becomes a \\glossterm{condition} on each subject.",
        hit: `Each subject is \\dazzled until the end of the next round.`,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\smallarea radius within \\medrange of you.
          Whether you hit or miss, \\glossterm{brilliant illumination} fills a 60 foot radius from the center of that area until the end of the next round.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      tags: ["Sensation", "Visual"],
      type: "Duration",
    },

    {
      name: "Sunburst",

      attack: {
        crit: `
          The effect becomes a \\glossterm{condition} on each subject.
          In addition, each subject is affected as if it had entered natural sunlight.
        `,
        hit: `Each subject is \\blinded until the end of the next round.`,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\smallarea radius within \\medrange of you.
          Whether you hit or miss, \\glossterm{brilliant illumination} fills a 120 foot radius from the center of that area until the end of the next round.
        `,
      },
      rank: 7,
      tags: ["Sensation", "Visual"],
      type: "Duration",
    },

    {
      name: "Pillars of Light",

      attack: {
        crit: "The effect becomes a \\glossterm{condition} on each subject.",
        hit: `Each subject is \\dazzled until the end of the next round.`,
        targeting: `
          Make an attack vs. Fortitude against all creatures in up to five \\tinyarea radius areas within \\longrange of you.
          Whether you hit or miss, \\glossterm{brilliant illumination} fills a 60 foot radius from the center of each area until the end of the next round.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      tags: ["Sensation", "Visual"],
      type: "Duration",
    },

    {
      name: "Kaleidoscopic Pattern",

      attack: {
        crit: "The effect becomes a \\glossterm{condition} on each subject.",
        hit: `Each subject is \\stunned until the end of the next round.`,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\medrange of you.
          Whether you hit or miss, \\glossterm{brilliant illumination} fills a 60 foot radius from the center of that area until the end of the next round.
        `,
      },
      rank: 4,
      scaling: "accuracy",
      tags: ["Compulsion", "Sensation", "Visual"],
      type: "Duration",
    },

    {
      name: "Blur",

      castingTime: "minor action",
      effect: `
        Your physical outline is distorted so it appears blurred, shifting, and wavering.
        You gain a +1 \\glossterm{magic bonus} to Armor defense and the Stealth skill.
        This effect provides no defensive benefit against creatures immune to \\abilitytag{Visual} abilities.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +2.`,
        5: `The bonus increases to +3.`,
      },
      tags: ["Sensation", "Visual"],
      type: "Attune (self)",
    },

    {
      name: "Mass Blur",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Blur",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The bonus increases to +2.`,
        7: `The bonus increases to +3.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Disguise Image",

      effect: `
        You make a Disguise check to alter your appearance (see \\pcref{Disguise Creature}).
        You gain a +4 bonus on the check, and you can freely alter the appearance of your clothes and equipment, regardless of their original form.
        However, this effect is unable to alter your sound, smell, texture, or temperature, or your clothes and equipment.
      `,
      rank: 2,
      scaling: {
        4: `The bonus increases to +6.`,
        6: `The bonus increases to +8.`,
      },
      tags: ["Sensation", "Visual"],
      type: "Attune (self)",
    },

    {
      name: "Mass Disguise Image",

      castingTime: "minor ation",
      functionsLike: {
        mass: true,
        name: "Disguise Image",
      },
      // narrative: '',
      rank: 4,
      scaling: {
        6: `The bonus increases to +6.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Malleable Disguise",

      functionsLike: {
        exceptThat: `
          you can change the nature of the disguise as a \\glossterm{standard action}.
        `,
        name: "disguise image",
      },
      rank: 4,
      scaling: { 6: `The bonus increases to +6.` },
      type: "Attune (self)",
    },

    {
      name: "Mirror Image",

      effect: `
        Two illusory duplicates appear around you that mirror your every move.
        The duplicates shift chaotically in your space, making it difficult to identify your real location.

        All \\glossterm{targeted} attacks against you have a 50\\% miss chance.
        Like other miss chances, this miss chance is rolled before determining whether the attack beats your defenses.
        When an attack misses in this way, it affects an image, destroying it.
        When the last image is destroyed, this ability provides no further benefit.
        This ability provides no defensive benefit against creatures immune to \\abilitytag{Visual} abilities.
      `,
      rank: 1,
      scaling: {
        3: `The spell creates three duplicates.`,
        5: `The spell creates four duplicates.`,
        7: `The spell creates five duplicates.`,
      },
      tags: ["Sensation", "Visual"],
      type: "Attune (self)",
    },

    {
      name: "Displacement",

      effect: `
        Your image appears to be two to three feet from its real location.
        All \\glossterm{strikes} against you suffer a 20\\% miss chance.
        This ability provides no defensive benefit against creatures immune to \\abilitytag{Visual} abilities.
      `,
      rank: 6,
      tags: ["Sensation", "Visual"],
      type: "Attune (self)",
    },

    {
      name: "Illusory Twin",

      effect: `
        You create an illusory duplicate of yourself overlayed on your body.
        Whenever you move using one of your movement speeds, you may also move the illusory duplicate the same distance in any direction.
        If the duplicate was sharing a space with you before this movement, onlookers cannot tell which is the real you and which is the duplicate.
        When the duplicate is attacked by a \\glossterm{targeted} attack, it is destroyed.
        At the end of each round, if the duplicate is outside of \\medrange from you, it is destroyed.
        This effect ends when there are no duplicates remaining.
      `,
      rank: 2,
      scaling: {
        4: `The maximum range increases to \\longrange.`,
        6: `You can create a second duplicate of yourself.`,
      },
      type: "Sustain (minor)",
    },

    {
      name: "False Wound",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        You make a Disguise check to alter the subject's appearance to make it appear wounded (see \\pcref{Disguise Creature}).
        You can choose whether the subject appears to be at less than its maximum hit points, whether it appears to have a vital wound, or both.
        You gain a +10 bonus on the check, and you can freely alter the appearance of the subject's clothes and equipment, regardless of their original form.
        However, this effect is unable to alter the sound, smell, texture, or temperature of the subject or its clothes and equipment.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +15.`,
        5: `The bonus increases to +20.`,
        7: `The bonus increases to +25.`,
      },
      type: "Sustain (minor)",
    },

    {
      name: "Chromatic Orb",

      attack: {
        hit: `The subject takes 1d8 energy damage.
        If it loses \\glossterm{hit points} from this damage, it suffers one of the following effects as a \\glossterm{condition}, chosen randomly: \\frightened by you, \\nauseated, \\stunned, or knocked \\prone.`,
        targeting: `
        Make an attack vs. Reflex against anything within \\medrange.
        `,
      },
      rank: 2,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Greater Chromatic Orb",

      functionsLike: {
        exceptThat: "the damage increases to 2d10 + half \\glossterm{power}.",
        name: "chromatic orb",
      },
      rank: 5,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Lightbeam Dash",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d6 + half \\glossterm{power} electricity damage.`,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\shortrange.
          A blast of \\glossterm{brilliant illumination} fills a 60 foot radius around both your starting location and your ending location.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Lightbeam Dash",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 4d6 + half \\glossterm{power} electricity damage.`,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\distrange.
          Both your departure and arrival with this spell sound like a clap of thunder.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 6,
      scaling: "damage",
      type: "Instant",
    },
  ],
  rituals: [
    {
      name: "Continuous Light",

      castingTime: "one minute",
      effect: `
        Choose either yourself or one Medium or smaller \\glossterm{ally} or unattended object within \\medrange.
        The subject glows like a torch, emitting \\glossterm{bright illumination} in a \\smallarea radius and shadowy illumination for an additional 15 feet.
      `,
      rank: 1,
      tags: ["Sensation"],
      type: "Attune (ritual)",
    },

    {
      name: "False Decrepify",

      castingTime: "one hour",
      effect: `
        Choose one Medium or smaller \\glossterm{unattended} object within \\shortrange.
        The subject appears old and worn down.
        It may be appear dusty, have cracks and wrinkles from age, or otherwise appear undesirable and low quality.
      `,
      rank: 1,
      tags: ["Sensation"],
      type: "Attune (ritual)",
    },

    {
      name: "Permanent Light",

      castingTime: "24 hours",
      functionsLike: {
        exceptThat: `
          it loses the \\abilitytag{Attune} (ritual) tag and the effect lasts permanently.
          In addition, it can only target objects.
        `,
        name: "continuous light",
      },
      rank: 3,
      tags: ["Sensation"],
      type: "Instant",
    },
  ],
};
