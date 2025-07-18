import { MysticSphere } from '.';
import { BARRIER_COOLDOWN, CONDITION_CRIT } from './constants';

export const photomancy: MysticSphere = {
  name: 'Photomancy',
  hasImage: true,
  shortDescription: 'Create and manipulate light to hinder foes and conceal allies.',
  sources: ['arcane', 'divine', 'nature', 'pact'],

  cantrips: [
    {
      name: 'Illuminate',

      effect: `
        A glowing light appears in midair in any location within \\medrange.
        It creates \\glossterm{bright illumination} in a radius of your choice, up to a maximum of 15 feet, and \\glossterm{shadowy illumination} in twice that radius.
        You can freely choose the color of the light, but it is unchanging once created.

        This ability lasts until you \\glossterm{dismiss} it or until you use it again.
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

      // Condition dazzle is 1.8 EA, so r3. Limited scope is r2.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\medarea cone from you.
          In addition, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius around you.
        `,
      },
      rank: 2,
      roles: ['flash'],
      scaling: 'accuracy',
      tags: ['Visual'],
    },

    {
      name: 'Massive Flash',

      // Condition dazzle is 1.8 EA, so r3. +1 rank of area gives a r5 area.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\largearea radius from you.
          In addition, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius around the area.
        `,
      },
      rank: 4,
      roles: ['flash'],
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
      roles: ['narrative'],
      scaling: 'accuracy',
      tags: ['Subtle', 'Sustain (minor)', 'Visual'],
    },

    {
      name: 'Searing Light',

      // 
      attack: {
        hit: `
          \\damageranktwolow.
        `,
        targeting: `
          Make an attack vs. Reflex and Fortitude against something within \\shortrange.
          Whether you hit or miss, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius around a 5 ft. wide straight line between you and the target.
        `,
      },
      rank: 1,
      roles: ['burst'],
      scaling: {
        special: "The damage increases by 1d6 per rank above 1.",
      },
    },

    {
      name: 'Solar Ray',

      // No rank modifier for true sunlight
      attack: {
        hit: `
          \\damagerankfivelow, and any \\glossterm{extra damage} is doubled.
          If the target loses \\glossterm{hit points}, it suffers consequences as if it had been struck by a beam of natural sunlight.
          This can be deadly for some creatures.
        `,
        targeting: `
          Make an attack vs. Reflex and Fortitude against something within \\shortrange.
          Whether you hit or miss, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius around a 5 ft. wide straight line between you and the target.
        `,
      },
      rank: 4,
      roles: ['burst'],
      scaling: { special: 'The damage increases by 2d8 for each rank beyond 4.' },
    },

    {
      name: 'Mighty Solar Ray',

      // No rank modifier for true sunlight
      attack: {
        hit: `
          \\damagerankeightlow, and any \\glossterm{extra damage} is tripled.
          If the target loses \\glossterm{hit points}, it suffers consequences as if it had been struck by a beam of natural sunlight.
          This can be deadly for some creatures.
        `,
        targeting: `
          Make an attack vs. Reflex and Fortitude against something within \\shortrange.
          Whether you hit or miss, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius around a 5 ft. wide straight line between you and the target.
        `,
      },
      rank: 7,
      roles: ['burst'],
    },

    {
      name: 'Solar Flare',

      // +1dr for not really escapable delay, +1dr for Fortitude and Reflex. Since this
      // deals flat damage, that adds up to +1 flat damage rank. The base damage rank for
      // a full area flat damage spell is -1dr, so this is just drX total.
      attack: {
        hit: `
          \\damagerankfivelow.
          Each creature that loses \\glossterm{hit points} also suffers consequences as if it had been struck by a beam of natural sunlight, which can be deadly for some creatures.
        `,
        missGlance: true,
        targeting: `
          When you cast this spell, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius \\glossterm{emanation} around you.
          During your next action, make an attack vs. Fortitude and Reflex against all \\glossterm{enemies} within that area, and brilliant illumination briefly fills a 60 foot radius around that area.
        `,
      },
      rank: 5,
      roles: ['clear'],
      scaling: { special: 'The damage increases by 2d8 for each rank beyond 5.' },
    },

    {
      name: 'Radiant Field',

      // Enemies in medium radius from self is r3 area, which would have base dr2.
      // Damage each round is -1dr. But since we're using flat damage, -2dr is -1dr flat.
      attack: {
        hit: `
          \\damageranktwolow.
        `,
        missGlance: true,
        targeting: `
          You create a field of light in a \\medarea radius \\glossterm{zone} from your location.
          When you cast this spell, and during your next action, make an attack vs. Fortitude against all \\glossterm{enemies} in the area.
          In addition, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius from the area.
        `,
      },
      rank: 3,
      roles: ['wildfire'],
      scaling: {
        special: 'The damage increases by 1d6 for each rank beyond 3.',
      },
    },

    {
      name: 'Massive Radiant Field',

      functionsLike: {
        name: 'radiant field',
        exceptThat:
          'the area increases to a \\largearea radius \\glossterm{zone}, and the damage increases to \\damagerankfivelow.',
      },
      rank: 6,
      roles: ['wildfire'],
    },

    {
      name: 'Pillars of Light',

      // This is basically an enemies-only large radius, but a
      // little worse, so call it a r4 area.
      attack: {
        hit: `
          \\damagerankthreelow.
        `,
        missGlance: true,
        targeting: `
          Choose up to five \\tinyarea radius cylinder-shaped areas within \\medrange of you.
          Each cylinder is 30 feet high.
          Make an attack vs. Reflex against all creatures in any of those areas.
          The areas can overlap, but this does not allow you to make multiple attacks against the same creature.
          Whether you hit or miss, \\glossterm{brilliant illumination} \\glossterm{briefly} fills a 60 foot radius from each area.
        `,
      },
      rank: 4,
      roles: ['clear'],
      scaling: {
        special: "The damage increases by 1d10 per rank above 4",
      },
    },

    {
      name: 'Kaleidoscopic Pattern',

      // Brief stun is 1.4 EA, or 2.4 EA as a sustain (minor). That's r6, though we only
      // use a r5 area, and we drop by 1 rank for the delay.
      attack: {
        hit: `
          Each target is \\glossterm{briefly} \\stunned.
        `,
        targeting: `
          You create a \\medarea radius \\glossterm{zone} of multicolored patterns within \\shortrange.
          This has no immediate effect other than creating \\glossterm{bright illumination} in the area.
          During each of your subsequent actions, make an attack vs. Mental against all \\glossterm{enemies} in the area.
        `,
      },
      rank: 5,
      roles: ['softener'],
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
      name: 'Sudden Mirrorswarm',

      // 50% miss chance for 2 rounds of attacks is 8 * 0.5 * 0.25 = 1 EA.
      effect: `
        You can activate this spell as a \\glossterm{free action}.
        When you do, a burst of illusory duplicates appear from your body, each appearing to performing a different action.
        All \\glossterm{targeted} attacks against you \\glossterm{briefly} have a 50\\% \\glossterm{miss chance}.
        After that time, this ability is \\glossterm{dismissed}.

        This is a \\atSwift effect, so it protects you from attacks during the current phase.
        It provides no defensive benefit against creatures immune to \\abilitytag{Visual} abilities.
      `,
      rank: 3,
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
      type: 'Sustain (attuneable, free)',
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
      // Random effect is pretty punishing for such situational conditions, so call that
      // -0.2 EA, or 0.6 total, so r2 total with damage.
      attack: {
        hit: `
          \\damageranktwolow, and the target \\glossterm{briefly} suffers one of the following effects, chosen randomly: \\dazzled, \\frightened by you, \\goaded by you, or -2 Reflex defense.
        `,
        targeting: `
          Make an attack vs. Reflex against one creature within \\shortrange.
        `,
      },
      rank: 2,
      roles: ['flash'],
      scaling: {
        special: 'The damage increases by 1d6 for each rank beyond 2.',
      },
      tags: ['Visual'],
      // Should this have the Emotion tag?
    },

    {
      name: 'Massive Chromatic Orb',

      // Baseline would be r2, we increase to with 5 +1 area rank and extended area scaling for a total of area rank 6.
      attack: {
        hit: `
          \\damagerankfourlow, and each target \\glossterm{briefly} suffers one of the following effects, chosen randomly: \\dazzled, \\frightened by you, \\goaded by you, or -2 Reflex defense.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} in a \\medarea radius within \\longrange.
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
        // TODO: dr2 or dr3?
        hit: `\\damagerankthreelow.`,
        missGlance: true,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\shortrange.
          A blast of \\glossterm{brilliant illumination} fills a 60 foot radius around both your starting location and your ending location.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 3,
      roles: ['clear', 'dive'],
      scaling: {
        special: 'the damage increases by 1d10 for each rank beyond 3.',
      },
    },

    {
      name: 'Distant Lightbeam Dash',

      cost: 'One optional \\glossterm{fatigue level}. If you pay this cost, the spell becomes \\abilitytag{Swift}.',
      attack: {
        hit: `\\damagerankfivelow.`,
        missGlance: true,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\distrange.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 6,
      roles: ['clear', 'dive'],
      scaling: {
        special: 'the damage increases by 1d6 for each rank beyond 3.',
      },
    },

    {
      name: 'Faerie Fire',

      // There are 15 player actions affected. Assume that this only affects concealment,
      // since invisibility is extremely rare, so that's 0.2 action effectiveness per
      // action assuming the enemy always has concealment. Assume that the enemy has
      // concealment in 20% of fights. That means this is worth 15 * 0.2 * 0.2 = 0.6 EA.
      // That gives 3 ranks of bonus area and 1 rank of extended range, so we have a rank
      // 6 extended area spell.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target becomes surrounded by glowing lights that highlight its outline as a \\glossterm{condition}.
          This gives it a -10 penalty to the Stealth skill, and it gains no benefit from \\glossterm{concealment} or being \\trait{invisible}.
          Other miss chances, such as the miss chance from attacking it while dazzled, are unaffected.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius within \\medrange.
        `,
      },
      rank: 2,
      roles: ['softener'],
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Radiant Aura',

      // Reactive brief dazzle is 1.2 EA, and r1 deep attunement is 1.5 EA.
      // That gives us some vague ranks to increase to medarea radius?
      attack: {
        hit: `The target is \\glossterm{briefly} \\dazzled.`,
        targeting: `
          You are surrounded by a \\medarea radius \\glossterm{emanation} of \\glossterm{brilliant illumination}.
          Whenever an \\glossterm{enemy} enters that area, make a \\glossterm{reactive attack} vs. Fortitude against them.
          After you attack a creature this way, it becomes immune to this attack from you until it finishes a \\glossterm{short rest}.
        `,
      },
      rank: 1,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Visual'],
      type: 'Attune (deep)',
    },

    {
      name: 'Reflective Lightbeam',

      attack: {
        hit: `\\damageranktwolow.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearealong, 5 ft. wide line from you.
          You can make the line bend at a 90 degree angle once during its length.
          This can allow it to include areas that you do not have \\glossterm{line of sight} or \\glossterm{line of effect} to.
        `,
      },
      rank: 3,
      roles: ['clear'],
      scaling: { special: 'The damage increases by 1d6 for each rank beyond 3.' },
    },

    {
      name: 'Mighty Reflective Lightbeam',

      functionsLike: {
        name: 'reflective lightbeam',
        exceptThat: 'the damage increases to \\damagerankfivelow, and it only targets \\glossterm{enemies} in the area.',
      },
      rank: 6,
      roles: ['clear'],
      scaling: { special: 'The damage increases by 2d8 for each rank beyond 6.' },
    },
  ],
};
