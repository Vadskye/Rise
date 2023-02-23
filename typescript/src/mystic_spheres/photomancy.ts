import { MysticSphere } from '.';

export const photomancy: MysticSphere = {
  name: 'Photomancy',
  shortDescription: 'Create and manipulate light to hinder foes and conceal allies.',
  sources: ['arcane', 'divine', 'nature', 'pact'],

  cantrips: [
    {
      name: 'Beautify',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you gain a +4 bonus, and you cannot change the appearance of your equipment, species, creature type, or number of limbs (see \\pcref{Disguise Creature}).
          This ability is commonly used to hide blemishes or to appear younger or older than one's true age.

          This ability lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
        `,
        name: 'disguise creature',
      },
      scaling: {
        2: `The bonus increases to +6.`,
        4: `The bonus increases to +8.`,
        6: `The bonus increases to +10.`,
      },
      tags: ['Visual'],
    },

    {
      name: 'Illuminate',

      effect: `
        A glowing light appears in midair in any location within \\medrange.
        It creates \\glossterm{bright illumination} in a radius of your choice, up to a maximum of 15 feet, and \\glossterm{shadowy illumination} in twice that radius.
        You can freely choose the color of the light, but it is unchanging once created.

        This effect lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
      `,
      scaling: {
        2: `The maximum radius of bright illumination increases to 30 feet.`,
        4: `The maximum radius of bright illumination increases to 60 feet.`,
        6: `The maximum radius of bright illumination increases to 120 feet.`,
      },
      tags: ['Visual'],
    },
  ],
  spells: [
    {
      name: 'Color Spray',

      attack: {
        crit: `The target is \\stunned instead of dazed.`,
        hit: `
          Each target is \\dazed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against each creature within a \\medarea cone from you.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Visual'],
    },

    {
      name: 'Massive Color Spray',

      functionsLike: {
        exceptThat: `
          the area increases to a \\hugearea cone from you.
        `,
        name: 'color spray',
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Visual'],
    },

    {
      name: 'Prismatic Spray',

      attack: {
        crit: `The target is \\confused instead of stunned.`,
        hit: `
          Each target is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against each creature within a \\medarea cone from you.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Visual'],
    },

    {
      name: 'Army of Twins',

      // original targets: Up to five targets within \medrange from among you and your \glossterm{allies}
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        In addition, choose one of the targets as the primary target.
        You make a Disguise check to alter each target's appearance to exactly match the primary target (see \\pcref{Disguise Creature}).
        You gain a +4 bonus on the check, and you can freely alter the visual appearance of each target's clothes and equipment, regardless of their original form.
      `,
      rank: 3,
      tags: ['Visual'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Blurred Motion',

      effect: `
        If you move at least 15 feet during the \\glossterm{movement phase}, you gain a +1 bonus to Armor defense until the end of that round.
      `,
      rank: 3,
      type: 'Attune (deep)',
    },

    {
      name: 'Greater Blurred Motion',

      effect: `
        If you move at least 30 feet during the \\glossterm{movement phase}, you gain a +2 bonus to Armor defense until the end of that round.
      `,
      rank: 6,
      type: 'Attune (deep)',
    },

    {
      name: 'Wall of Light',

      effect: `
        You create a \\medarealong \\glossterm{wall} of light within \\longrange.
        The wall is visible as a solid block of light.
        It blocks all forms of vision, including \\trait{darkvision}, but does not block senses like \\trait{blindsight} that do not require the use of eyes.
        It does not inhibit the passage of objects or creatures.

        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 1,
      scaling: {
        3: 'You can choose to create a \\largearealong wall instead.',
        5: 'You can choose to create a \\hugearealong wall instead.',
        7: 'You can choose to create a \\gargarealong wall instead.',
      },
      tags: ['Barrier'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Flash',

      // -1d
      attack: {
        hit: `
          Each target is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you.
          In addition, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius around the area.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Massive Flash',

      // offset previous -1d
      functionsLike: {
        name: 'flash',
        exceptThat:
          'the area increases to a \\largearea radius from you.',
      },
      rank: 4,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Searing Light',

      attack: {
        hit: `
          The target takes \\damagerankone{energy}.
          If it takes damage and your attack result beats its Fortitude defense, it is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Reflex against anything within \\shortrange.
          Whether you hit or miss, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius around a 5 ft. wide straight line between you and the target.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Solar Ray',

      // +1r for true sunlight; that shouldn't be on a low-level effect, but it doesn't
      // add that much power here.
      attack: {
        hit: `
          The target takes \\damagerankfour{energy}.
          If it takes damage, it is \\dazzled as a \\glossterm{condition}.
          If it loses \\glossterm{hit points}, it also suffers consequences as if it had been struck by a beam of natural sunlight, which can be deadly for some creatures.
        `,
        targeting: `
          Make an attack vs. Reflex against anything within \\shortrange.
          Whether you hit or miss, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius around a 5 ft. wide straight line between you and the target.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Solar Flare',

      // +1r for true sunlight, +1r for enemies only - end up with d5l instead of d5?
      attack: {
        hit: `
          Each target takes \\damagerankfivelow{energy}.
          Each damaged creature is \\dazzled as a \\glossterm{condition}.
          Each creature that loses \\glossterm{hit points} also suffers consequences as if it had been struck by a beam of natural sunlight, which can be deadly for some creatures.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} within a \\smallarea radius from you.
          In addition, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius from the area.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Radiant Field',

      attack: {
        hit: `
          Each target takes \\damagerankone{energy}.
        `,
        missGlance: true,
        targeting: `
          You create a field of light in a \\medarea radius \\glossterm{zone} from your location.
          When you cast this spell, and during your next action, make an attack vs. Fortitude against all \\glossterm{enemies} in the area.
          In addition, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius from the area.
        `,
      },
      rank: 4,
      tags: [],
    },

    {
      name: 'Massive Radiant Field',

      functionsLike: {
        name: 'radiant field',
        exceptThat:
          'the area increases to a \\largearea radius \\glossterm{zone}, and the damage increases to \\damagerankfour{energy}.',
      },
      rank: 7,
      tags: [],
    },

    {
      name: 'Pillars of Light',

      attack: {
        hit: `
          Each target takes \\damagerankthree{energy}.
        `,
        missGlance: true,
        targeting: `
          Choose up to five \\tinyarea radius areas within \\longrange of you.
          Make an attack vs. Fortitude against all creatures in any of those areas.
          The areas can overlap, but this does not allow you to make multiple attacks against the same creature.
          Whether you hit or miss, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius from each area.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Visual'],
    },

    {
      name: 'Kaleidoscopic Pattern',

      attack: {
        crit: `The target is \\stunned instead of dazed.`,
        hit: `
          Each target is \\dazed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Compulsion', 'Visual'],
    },

    {
      name: 'Intense Kaleidoscopic Pattern',

      attack: {
        crit: `The target is \\confused instead of dazed.`,
        hit: `
          Each target is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
      tags: ['Compulsion', 'Visual'],
    },

    {
      name: 'Blur',

      effect: `
        All \\glossterm{targeted} attacks against you have a 20\\% \\glossterm{miss chance}.
        This ability provides no defensive benefit against creatures immune to \\abilitytag{Visual} abilities.
      `,
      narrative: `Your physical outline is distorted so it appears blurred, shifting, and wavering.`,
      rank: 5,
      tags: ['Visual'],
      type: 'Attune',
    },

    {
      name: 'Disguise Image',

      effect: `
        You make a Disguise check to alter your appearance (see \\pcref{Disguise Creature}).
        You gain a +4 bonus on the check, and you can freely alter the visual appearance of your clothes and equipment, regardless of their original form.
      `,
      rank: 1,
      tags: ['Visual'],
      type: 'Attune',
    },

    {
      name: 'Mass Disguise Image',

      functionsLike: {
        mass: true,
        name: 'Disguise Image',
      },
      // narrative: '',
      rank: 3,
      type: 'Attune (target)',
    },

    {
      name: 'Malleable Disguise',

      functionsLike: {
        exceptThat: `
          you can change the nature of the disguise as a \\glossterm{standard action}.
        `,
        name: 'disguise image',
      },
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Mirror Image',

      effect: `
        Three illusory duplicates appear around you that mirror your every move.
        The duplicates shift chaotically in your space, making it difficult to identify your real location.

        All \\glossterm{targeted} attacks against you have a 20\\% \\glossterm{miss chance}.
        Like other miss chances, this miss chance is rolled before determining whether the attack beats your defenses.
        When an attack misses in this way, it affects an image, destroying it.
        When the last image is destroyed, this ability provides no further benefit.
        This ability provides no defensive benefit against creatures immune to \\abilitytag{Visual} abilities.
      `,
      rank: 1,
      scaling: {
        3: `The miss chance increases to 30\\%.`,
        5: `The miss chance increases to 40\\%.`,
        7: `The miss chance increases to 50\\%.`,
      },
      tags: ['Visual'],
      type: 'Attune (deep)',
    },

    {
      name: 'Illusory Twin',

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
        6: `The maximum range increases to \\distrange.`,
      },
      type: 'Sustain (minor)',
    },

    {
      name: 'Invisibility',

      effect: `
        This spell has no \\glossterm{verbal components}.

        You \\glossterm{briefly} become \\trait{invisible}.
        This invisibility ends after you take any action.
      `,
      rank: 4,
    },

    {
      name: 'Enduring Invisibility',

      effect: `
        This spell has no \\glossterm{verbal components}.

        You become \\trait{invisible}.
        This invisibility ends after you take damage.
      `,
      rank: 7,
      tags: ['Sustain (standard)'],
    },

    {
      name: 'Chromatic Orb',

      attack: {
        // random effect is bad, but the sphere can't normally do most of those and you
        // can stack debuffs by repeatedly casting this spell, so no rank modifier
        hit: `
          The target takes \\damagerankone{energy}.
          If it loses \\glossterm{hit points} from this damage, it suffers one of the following effects as a \\glossterm{condition}, chosen randomly: \\frightened by you, \\goaded by you, \\slowed, or \\stunned.
        `,
        targeting: `
          Make an attack vs. Reflex against anything within \\medrange.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Chromatic Orb',

      functionsLike: {
        name: 'chromatic orb',
        exceptThat: 'the damage increases to \\damageranksix{energy}.',
      },
      rank: 7,
      scaling: 'accuracy',
    },

    {
      name: 'Lightbeam Dash',

      attack: {
        hit: `Each target takes \\damagerankone{energy}.`,
        missGlance: true,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\shortrange.
          A blast of \\glossterm{brilliant illumination} fills a 60 foot radius around both your starting location and your ending location.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Distant Lightbeam Dash',

      attack: {
        hit: `Each target takes \\damagerankfour{energy}.`,
        missGlance: true,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\distrange.
          Both your departure and arrival with this spell sound like a clap of thunder.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Faerie Fire',

      attack: {
        hit: `
          Each target becomes surrounded by glowing lights that highlight its outline as a \\glossterm{condition}.
          This gives it a -10 penalty to the Stealth skill, and it gains no benefit from \\glossterm{concealment} or \\glossterm{invisibility}.
          Other miss chances, such as the miss chance from attacking it while dazzled, are unaffected.
        `,
        targeting: `
          Make an attack vs. Reflex against all creatures in a \\medarea radius within \\longrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: [],
    },
  ],
  rituals: [
    {
      name: 'Continuous Light',

      castingTime: 'one minute',
      effect: `
        Choose either yourself or one Medium or smaller \\glossterm{ally} or unattended object within \\medrange.
        The target glows like a torch, emitting \\glossterm{bright illumination} in a \\smallarea radius and shadowy illumination for an additional 15 feet.
      `,
      rank: 1,
      tags: [],
      type: 'Attune',
    },

    {
      name: 'False Decrepify',

      castingTime: 'one hour',
      effect: `
        Choose one Medium or smaller \\glossterm{unattended} object within \\shortrange.
        The target appears old and worn down.
        It may be appear dusty, have cracks and wrinkles from age, or otherwise appear undesirable and low quality.
      `,
      rank: 1,
      tags: [],
      type: 'Attune',
    },

    {
      name: 'Permanent Light',

      castingTime: '24 hours',
      effect: `
        Choose one Medium or smaller \\glossterm{unattended} object within \\medrange.
        The target glows like a torch, emitting \\glossterm{bright illumination} in a \\smallarea radius and shadowy illumination for an additional 15 feet.
        This effect is permanent.
      `,
      rank: 2,
      tags: [],
    },
  ],
};
