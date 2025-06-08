import { MysticSphere } from '.';
import { BARRIER_COOLDOWN, CONDITION_CRIT } from './constants';

export const photomancy: MysticSphere = {
  name: 'Photomancy',
  hasImage: true,
  shortDescription: 'Create and manipulate light to hinder foes and conceal allies.',
  sources: ['arcane', 'divine', 'nature', 'pact'],

  cantrips: [
    {
      name: 'Beautify',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you gain a +4 bonus to the Disguise check, but you can only accomplish changes that would be possible with makeup, paint, and dye.
          You cannot make significant changes to your facial structure, equipment, and so on.
          This ability is commonly used to hide blemishes or to appear younger or older than one's true age.

          This ability lasts until you \glossterm{dismiss} it or until you use it again.
        `,
        name: 'change appearance',
      },
      roles: ['narrative'],
      tags: ['Visual'],
    },

    {
      name: 'Illuminate',

      effect: `
        A glowing light appears in midair in any location within \\medrange.
        It creates \\glossterm{bright illumination} in a radius of your choice, up to a maximum of 15 feet, and \\glossterm{shadowy illumination} in twice that radius.
        You can freely choose the color of the light, but it is unchanging once created.

        This ability lasts until you \glossterm{dismiss} it or until you use it again.
      `,
      roles: ['narrative'],
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

      // Dazzled as a condition is 1.8 EA, so r3. Limited scope and double defense means
      // this is r1.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Reflex and Mental against each creature within a \\smallarea cone from you.
        `,
      },
      rank: 1,
      roles: ['flash'],
      scaling: 'accuracy',
      tags: ['Visual'],
    },

    {
      name: 'Prismatic Spray',

      // dazzled is 0.6, stunned is 1.4, so 2.0 total. Double defense means r3.
      // The area is rank 2, which is a little awkward.
      attack: {
        hit: `
          Each target is \\glossterm{briefly} \\dazzled and \\stunned.
        `,
        targeting: `
          Make an attack vs. Reflex and Mental against each \\glossterm{enemy} within a \\medarea cone from you.
        `,
      },
      rank: 3,
      roles: ['flash'],
      scaling: 'accuracy',
      tags: ['Visual'],
    },

    {
      name: 'Army of Twins',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        In addition, choose one of the targets as the primary target.
        You make a Disguise check to alter each target's appearance to exactly match the primary target (see \\pcref{Change Appearance}).
        You gain a +4 bonus on the check, and you can freely alter the visual appearance of each target's clothes and equipment, regardless of their original form.
      `,
      rank: 3,
      roles: ['narrative'],
      tags: ['Visual'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Wall of Light',

      cost: BARRIER_COOLDOWN,
      effect: `
        You create a \\medarealong \\glossterm{wall} of light within \\medrange.
        The wall is visible as a solid block of light.
        It blocks all forms of vision, including \\trait{darkvision}, but does not block senses like \\trait{blindsight} that do not require the use of eyes.
        It does not inhibit the passage of objects or creatures.
      `,
      rank: 1,
      roles: ['hazard'],
      tags: ['Barrier', 'Visual'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Massive Wall of Light',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        name: 'wall of light',
        exceptThat: 'it creates a \\largearealong wall of light within \\longrange.',
      },
      rank: 5,
      roles: ['hazard'],
      tags: ['Barrier', 'Visual'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Flash',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
          In addition, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius around the target.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Visual'],
    },

    {
      name: 'Blinding Flash',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          If the target has no remaining \\glossterm{damage resistance}, it becomes \\blinded as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange of you.
          In addition, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius around the target.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Visual'],
    },

    {
      name: 'Borrow Vision',

      attack: {
        hit: `
          This spell has no \\glossterm{verbal components}.

          You see out of the target's eyes instead of your own.
          This does not inhibit the target's vision.
          Whenever you sustain this spell, you can change between seeing out of your eyes and seeing out of the target's eyes.
          If you cannot see yourself, you are \\blinded for combat purposes.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
          If you target an \\glossterm{ally}, this attack automatically succeeds.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Subtle', 'Sustain (minor)', 'Visual'],
    },

    {
      name: 'Searing Light',

      attack: {
        hit: `
          1d10 damage.
          If this attack beats a creature's Fortitude defense, you deal it \\glossterm{extra damage} equal to your power.
        `,
        targeting: `
          Make an attack vs. Reflex against something within \\shortrange.
          Whether you hit or miss, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius around a 5 ft. wide straight line between you and the target.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Solar Ray',

      // No rank modifier for true sunlight
      attack: {
        hit: `
          \\damagerankfivelow.
          If this attack beats a creature's Fortitude defense, it deals maximum damage.
          If the target loses \\glossterm{hit points}, it suffers consequences as if it had been struck by a beam of natural sunlight.
          This can be deadly for some creatures.
        `,
        targeting: `
          Make an attack vs. Reflex against something within \\shortrange.
          Whether you hit or miss, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius around a 5 ft. wide straight line between you and the target.
        `,
      },
      rank: 5,
      scaling: { special: 'The damage increases by 2d8 for each rank beyond 5.' },
    },

    {
      name: 'Solar Flare',

      // +2r for delay, +2r for Fortitude and Reflex. Base rank is 8? But the delay is
      // less of a penalty when the area is so large, so call it +1r, total rank 7.
      // That allows a t4 area and dr6 damage.
      attack: {
        hit: `
          \\damageranksixlow.
          Each creature that loses \\glossterm{hit points} also suffers consequences as if it had been struck by a beam of natural sunlight, which can be deadly for some creatures.
        `,
        missGlance: true,
        targeting: `
          When you cast this spell, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius \\glossterm{emanation} around you.
          During your next action, make an attack vs. Fortitude and Reflex against all \\glossterm{enemies} within that area, and brilliant illumination briefly fills a 60 foot radius around that area.
        `,
      },
      rank: 4,
      scaling: { special: 'The damage increases by 3d8 for each rank beyond 4.' },
    },

    {
      name: 'Radiant Field',

      attack: {
        hit: `
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          You create a field of light in a \\medarea radius \\glossterm{zone} from your location.
          When you cast this spell, and during your next action, make an attack vs. Fortitude against all \\glossterm{enemies} in the area.
          In addition, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius from the area.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Massive Radiant Field',

      functionsLike: {
        name: 'radiant field',
        exceptThat:
          'the area increases to a \\largearea radius \\glossterm{zone}, and the damage increases to \\damagerankfour.',
      },
      rank: 7,
    },

    {
      name: 'Pillars of Light',

      attack: {
        hit: `
          \\damagerankfive.
        `,
        missGlance: true,
        targeting: `
          Choose up to five \\tinyarea radius areas within \\longrange of you.
          Make an attack vs. Reflex and Fortitude against all creatures in any of those areas.
          The areas can overlap, but this does not allow you to make multiple attacks against the same creature.
          Whether you hit or miss, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius from each area.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Kaleidoscopic Pattern',

      // t3 area, -2r for delay + sustain
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target with no remaining \\glossterm{damage resistance} is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          You create a \\medarea radius \\glossterm{zone} of multicolored patterns within \\shortrange.
          This has no immediate effect other than creating \\glossterm{bright illumination} in the area.
          During each of your subsequent actions, make an attack vs. Mental against all creatures in the area.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Compulsion', 'Sustain (minor)', 'Visual'],
    },

    {
      name: 'Blur',

      effect: `
        All \\glossterm{targeted} attacks against you have a 20\\% \\glossterm{miss chance}.
        This ability provides no defensive benefit against creatures immune to \\abilitytag{Visual} abilities.
      `,
      narrative: `Your physical outline is distorted so it appears blurred, shifting, and wavering.`,
      rank: 3,
      roles: ['attune'],
      tags: ['Visual'],
      type: 'Attune',
    },

    {
      name: 'Desperate Mirrorswarm',

      effect: `
        Whenever you use the \\ability{total defense} or \\ability{recover} ability, you can activate this ability.
        When you do, a burst of illusory duplicates appear from your body, each appearing to performing a different action.
        All \\glossterm{targeted} attacks against you have a 50\\% \\glossterm{miss chance} for the rest of the round.
        After that time, this ability ends.
        This is a \\atSwift effect, so it protects you from attacks during the current phase.
        It provides no defensive benefit against creatures immune to \\abilitytag{Visual} abilities.
      `,
      rank: 1,
      roles: ['attune'],
      tags: ['Visual'],
      type: 'Attune',
    },

    {
      name: 'Beacon of Light',

      effect: `
        All of your abilities and equipment that create light have their light radius doubled.
        This includes mundane equipment you carry, such as torches.
      `,
      rank: 1,
      roles: ['attune'],
      tags: ['Visual'],
      type: 'Attune',
    },

    // Rank 5 version is unlimited. It's not obvious how to downscale that correctly to
    // rank 1, but 3 images seems about right.
    {
      name: 'Mirror Image',

      effect: `
        Three illusory duplicates appear around you that mirror your every move.
        The duplicates shift chaotically in your space, making it difficult to hit you.

        All \\glossterm{targeted} attacks against you have a 50\\% \\glossterm{miss chance}.
        Like other miss chances, this miss chance is rolled before determining whether the attack beats your defenses.
        When an attack misses in this way, it affects an image, destroying it.
        When the last image is destroyed, this ability provides no further benefit.
        This ability provides no defensive benefit against creatures immune to \\abilitytag{Visual} abilities.
      `,
      rank: 1,
      roles: ['attune'],
      tags: ['Visual'],
      type: 'Attune (deep)',
    },

    {
      name: 'Greater Mirror Image',

      functionsLike: {
        name: 'mirror image',
        exceptThat: 'the images are recreated immediately after being destroyed, so they never run out.',
      },
      rank: 5,
      roles: ['attune'],
      tags: ['Visual'],
      type: 'Attune (deep)',
    },

    {
      name: 'Illusory Twin',

      effect: `
        You create an illusory duplicate of yourself overlayed on your body.
        Whenever you move using one of your movement speeds, you may also move the illusory duplicate the same distance in any direction.
        If the duplicate was sharing a space with you before this movement, onlookers must make a DV 20 Awareness check to identify which is the real you and which is the duplicate.
        When the duplicate is attacked by a \\glossterm{targeted} attack, it is destroyed.
        At the end of each round, if the duplicate is outside of \\medrange from you, it is destroyed.
        This effect ends when you have no duplicate remaining.
      `,
      rank: 2,
      roles: ['attune'],
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

        You become \\trait{invisible}.
        This invisibility ends if you attack or take damage.
        If you spend one minute without attacking or taking damage, this invisibility is reapplied.
      `,
      rank: 6,
      roles: ['attune'],
      tags: ['Attune (deep)'],
    },

    {
      name: 'Chromatic Orb',

      // Use 0.8 EA, which allows dazzled / frightened / goaded / single defense, with
      // goaded being the strongest since the single hit is Reflex.
      // Random effect is bad, but the sphere can't normally do most of those and you
      // can stack debuffs by repeatedly casting this spell, so no rank modifier.
      // Limited scope drops from r3 to r2. r1 area is normally drX, so with debuff it's
      // drX-1.
      attack: {
        hit: `
          \\damagerankone, and each target \\glossterm{briefly} suffers one of the following effects, chosen randomly: \\dazzled, \\frightened by you, \\goaded by you, or -2 Reflex defense.
        `,
        targeting: `
          Make an attack vs. Reflex against up to two creatures within \\shortrange.
        `,
      },
      rank: 2,
      roles: ['flash'],
      scaling: 'accuracy',
      tags: ['Visual'],
      // Should this have the Emotion tag?
    },

    {
      name: 'Chromatic Sphere',

      // Baseline would be r3, we increase to with 5 +1 area rank and extended area scaling for a total of area rank 6.
      attack: {
        hit: `
          \\damageranktwo, and each target \\glossterm{briefly} suffers one of the following effects, chosen randomly: \\dazzled, \\frightened by you, \\goaded by you, or -2 Reflex defense.
        `,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} in a \\medarea radius within \\medrange.
        `,
      },
      rank: 5,
      roles: ['flash'],
      scaling: 'accuracy',
      tags: ['Visual'],
    },

    {
      name: 'Lightbeam Dash',

      cost: 'One optional \\glossterm{fatigue level}. If you pay this cost, the spell becomes \\abilitytag{Swift}.',
      attack: {
        hit: `\\damagerankone.`,
        missGlance: true,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\shortrange.
          A blast of \\glossterm{brilliant illumination} fills a 60 foot radius around both your starting location and your ending location.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 3,
      roles: ['clear', 'dive'],
      scaling: 'accuracy',
    },

    {
      name: 'Distant Lightbeam Dash',

      cost: 'One optional \\glossterm{fatigue level}. If you pay this cost, the spell becomes \\abilitytag{Swift}.',
      attack: {
        hit: `\\damagerankfour.`,
        missGlance: true,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\distrange.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Faerie Fire',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target becomes surrounded by glowing lights that highlight its outline as a \\glossterm{condition}.
          This gives it a -10 penalty to the Stealth skill, and it gains no benefit from \\glossterm{concealment} or being \\trait{invisible}.
          Other miss chances, such as the miss chance from attacking it while dazzled, are unaffected.
        `,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\medarea radius within \\longrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Radiant Aura',

      attack: {
        crit: CONDITION_CRIT,
        hit: `The target is \\dazzled as a \\glossterm{condition}.`,
        targeting: `
          You are surrounded by a \\medarea radius \\glossterm{emanation} of \\glossterm{brilliant illumination}.
          Whenever an \\glossterm{enemy} enters that area, make a \\glossterm{reactive attack} vs. Fortitude against them.
          After you attack a creature this way, it becomes immune to this attack from you until it finishes a \\glossterm{short rest}.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Visual'],
      type: 'Attune (deep)',
    },

    {
      name: 'Reflective Lightbeam',

      attack: {
        hit: `\\damagerankonelow.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearealong, 5 ft. wide line from you.
          You can make the line bend at a 90 degree angle once during its length.
          This can allow it to include areas that you do not have \\glossterm{line of sight} or \\glossterm{line of effect} to.
        `,
      },
      rank: 3,
      scaling: { special: 'The damage increases by +2 for each rank beyond 3.' },
    },

    {
      name: 'Mighty Reflective Lightbeam',

      functionsLike: {
        name: 'reflective lightbeam',
        exceptThat: 'the damage increases to \\damagerankfivelow.',
      },
      rank: 6,
      scaling: { special: 'The damage increases by 2d8 for each rank beyond 6.' },
    },
    {
      name: 'Disguise Image',

      effect: `
        You make a Disguise check to alter your appearance (see \\pcref{Change Appearance}).
        You gain a +4 bonus on the check, and you can freely alter the visual appearance of your clothes and equipment, regardless of their original form.
      `,
      rank: 1,
      roles: ['attune'],
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
      roles: ['attune'],
      type: 'Attune (target)',
    },
    {
      name: 'Malleable Disguise Image',

      functionsLike: {
        exceptThat: `
        you can change the nature of the disguise as a \\glossterm{minor action}.
      `,
        name: 'disguise image',
      },
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },
  ],
};
