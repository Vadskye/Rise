import { MysticSphere } from '.';
import { add_tag_to_sphere } from './add_tag';
import { BARRIER_COOLDOWN, CONDITION_CRIT, SWIFT_FATIGUE_SELF } from '../constants';

const WATER_ACCURACY_BONUS =
  'You gain a +2 accuracy bonus with the attack if there is a Large or larger body of water within \\shortrange of you.';

export const aquamancy: MysticSphere = add_tag_to_sphere('Water', {
  name: 'Aquamancy',
  hasImage: true,
  shortDescription: 'Command water to crush and drown foes.',
  sources: ['domain', 'nature'],

  cantrips: [
    {
      name: 'Aquatic Freedom',

      effect: `
        You gain a +3 \\glossterm{enhancement bonus} to the Swim skill.
      `,
      roles: ['attune'],
      scaling: {
        2: 'The bonus increases to +4.',
        4: 'The bonus increases to +5.',
        6: 'The bonus increases to +6.',
      },
      type: 'Sustain (attuneable, standard)',
    },
  ],
  spells: [
    {
      name: 'Restorative Water',

      castingTime: 'minor action',
      effect: `
        Choose yourself or an \\glossterm{ally} within \\medrange.
        The target is \\glossterm{briefly} healed by water.
        During this spell's effect, the target can draw restorative power from water by drinking at least one ounce of clean water as a standard action.
        % dr3l
        When it does, it regains 2d10 hit points and increases its \\glossterm{fatigue level} by one.
      `,
      rank: 1,
      scaling: { special: 'The healing increases by 1d10 for each rank beyond 1.' },
      roles: ['healing', 'exertion'],
    },
    {
      name: 'Greater Restorative Water',

      castingTime: 'minor action',
      functionsLike: {
        name: 'restorative water',
        exceptThat: 'the healing increases to 7d8.',
      },
      rank: 4,
      scaling: { special: 'The healing increases by 3d8 for each rank beyond 4.' },
      roles: ['healing', 'exertion'],
    },
    {
      name: 'Cleansing Water',

      castingTime: 'minor action',
      effect: `
        Choose yourself or an \\glossterm{ally} within \\medrange.
        The target is \\glossterm{briefly} purified by water.
        During this spell's effect, the target can cleanse itself by drinking at least one ounce of clean water as a standard action.
        When it does, it removes one \\glossterm{condition} affecting it.
      `,
      rank: 3,
      roles: ['cleanse'],
    },
    {
      name: 'Aquatic Agility',

      effect: `
        You gain a slow \\glossterm{swim speed} (see \\pcref{Swimming}).
        If you already have a slow swim speed, your swim speed becomes average instead.
        While swimming, you gain a \\plus1 \\glossterm{enhancement bonus} to your Armor and Reflex defenses.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Desiccate',

      // No penalty for the extremely rare bonus
      attack: {
        hit: `
          \\damagerankthree.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
          You gain a +2 accuracy bonus if the target is native to water, which is typically true for creatures with a swim speed and no walk speed.
        `,
      },
      rank: 2,
      roles: ['burst'],
      scaling: 'damage',
    },
    {
      name: 'Mighty Desiccate',

      // No penalty for the extremely rare bonus
      attack: {
        hit: `
          \\damagerankseven.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
          You gain a +4 accuracy bonus if the target is native to water, which is typically true for creatures with a swim speed and no walk speed.
        `,
      },
      rank: 6,
      roles: ['burst'],
      scaling: 'damage',
    },
    {
      name: 'Constraining Bubble',

      // Unsteady is basically frightened by all, but with much more common defense
      // penalties.
      // Assume 1.2 EA from the defense penalty instead of the 0.35 from frightened by
      // all, so 2.5 EA total.
      // Huge or smaller offsets the bonus "cannot fly or glide".
      // -1 rank for limited scope
      attack: {
        hit: `
          The target is \\glossterm{briefly} surrounded by a bubble of water.
          It cannot breathe air, fly, or glide, but it can use its other movement modes normally.
          If it does not have a \\glossterm{swim speed}, it is \\unsteady (see \\pcref{Fighting in Water}).
        `,
        targeting: `
          Make an attack vs. Brawn against up to two Huge or smaller creatures within \\medrange.
          You gain a +2 accuracy bonus with the attack if there is a Large or larger body of water within \\shortrange of you.
        `,
      },
      rank: 6,
      roles: ['softener'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
    {
      name: 'Drowning Bubble',

      // Huge or smaller offsets the bonus "cannot fly or glide".
      // -1 rank for limited scope
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          If the target is \\glossterm{injured}, it is surrounded by a bubble of water as a \\glossterm{condition}.
          It cannot breathe air, fly, or glide, but it can use its other movement modes normally.
          If it does not have a \\glossterm{swim speed}, it is \\unsteady (see \\pcref{Fighting in Water}).
        `,
        targeting: `
          Make an attack vs. Brawn against up to three Huge or smaller creatures within \\medrange.
          ${WATER_ACCURACY_BONUS}
        `,
      },
      rank: 7,
      roles: ['maim'],
      tags: ['Manifestation'],
    },

    {
      name: 'Crashing Wave',

      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Brawn and Reflex against everything in a \\medarealong, 10 ft. wide line from you.
          ${WATER_ACCURACY_BONUS}
        `,
      },
      rank: 1,
      roles: ['clear'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },
    {
      name: 'Mighty Crashing Wave',

      attack: {
        hit: `
          \\damagerankfive.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Brawn and Reflex against everything in a \\medarealong, 10 ft. wide line from you.
          ${WATER_ACCURACY_BONUS}
        `,
      },
      rank: 4,
      roles: ['clear'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },
    {
      name: 'Water Hammer',

      // No standard calculation for either the self-stun or the "must have previously
      // hit" requirement. Assume those combine to give about +2 ranks of power, which are
      // split between +1dr and +2a.
      cost: 'You \\glossterm{briefly} cannot use this ability and are \\stunned.',
      attack: {
        hit: `
          \\damagerankfour.
        `,
        targeting: `
          Make an attack vs. Fortitude with a \\plus2 accuracy bonus against something within \\shortrange.
          This attack automatically fails unless you hit the target with a \\atWater attack last round.
          ${WATER_ACCURACY_BONUS}
        `,
      },
      rank: 2,
      roles: ['burst', 'payoff'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },
    {
      name: 'Mighty Water Hammer',

      cost: 'You \\glossterm{briefly} cannot use this ability and are \\stunned.',
      attack: {
        hit: `
          \\damagerankseven.
        `,
        targeting: `
          Make an attack vs. Fortitude with a \\plus2 accuracy bonus against something within \\shortrange.
          This attack automatically fails unless you hit the target with a \\atWater attack last round.
          ${WATER_ACCURACY_BONUS}
        `,
      },
      rank: 5,
      roles: ['burst', 'payoff'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },
    {
      name: 'Surfing Slam',

      // Treat this as a short range attack. Moving is sometimes good, sometimes bad.
      attack: {
        hit: `
          \\damagerankthree.
        `,
        targeting: `
          Move up to your speed with your \\glossterm{walk speed} or \\glossterm{swim speed}.
          Then, make an attack vs. Armor against something you \\glossterm{touch}.
        `,
      },
      rank: 2,
      roles: ['dive', 'burst'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },
    {
      name: 'Mighty Surfing Slam',

      // Treat this as a short range attack. Moving is sometimes good, sometimes bad.
      attack: {
        hit: `
          \\damageranksix.
        `,
        targeting: `
          Move up to your speed with your \\glossterm{walk speed} or \\glossterm{swim speed}.
          Then, make an attack vs. Armor against something you \\glossterm{touch}.
        `,
      },
      rank: 5,
      roles: ['dive', 'burst'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },
    {
      name: 'Fountain',

      attack: {
        hit: `
          \\damagerankthree.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Brawn and Reflex against all \\glossterm{enemies} within a \\smallarea radius from you.
          If there is a Large or larger source of water within \\shortrange of you, this area increases to a \\medarea radius.
        `,
      },
      rank: 3,
      roles: ['clear'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },
    {
      name: 'Mighty Fountain',

      attack: {
        hit: `
          \\damageranksix.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Brawn and Reflex against all \\glossterm{enemies} within a \\smallarea radius from you.
          If there is a Large or larger source of water within \\shortrange of you, this area increases to a \\medarea radius.
        `,
      },
      rank: 6,
      roles: ['clear'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },
    {
      name: 'Wall of Water',

      // targeting: None,
      cost: BARRIER_COOLDOWN,
      effect: `
          You create a \\medarealong \\glossterm{wall} of water within \\medrange.
          The wall is four inches thick.
          Sight through the wall is possible, though distorted.
          The wall provides both \\glossterm{cover} and \\glossterm{concealment} to targets on the opposite side of the wall (see \\pcref{Obstacles and Cover}).
          In addition, ranged \\glossterm{strikes} that pass through the wall take a -4 accuracy penalty.
          Creatures can pass through the wall unharmed, though it costs five extra feet of movement to move through the wall.

          The wall has \\glossterm{hit points} equal to twice times your \\glossterm{power}, and is destroyed when its hit points become negative.
      `,
      rank: 1,
      roles: ['barrier'],
      scaling: {
        3: `The wall's hit points increase to three times your \\glossterm{power}.`,
        5: `The wall's hit points increase to four times your \\glossterm{power}.`,
        7: `The wall's hit points increase to five times your \\glossterm{power}.`,
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Massive Wall of Water',

      // targeting: None,
      cost: BARRIER_COOLDOWN,
      functionsLike: {
        name: 'wall of water',
        exceptThat: `
          the area increases to a \\largearealong \\glossterm{wall} of water within \\longrange.
          In addition, the hit points of the wall increase to three times your \\glossterm{power}.
        `,
      },
      rank: 4,
      roles: ['barrier'],
      scaling: {
        6: `The wall's hit points increase to four times your \\glossterm{power}.`,
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Raging River',

      // Ranged push is 0.9 EA, so damaging ranged push is 1.9 EA. Round down to 1.8 since
      // this is less than Medium range. +1 rank for Sustain (attuneable, standard)?
      attack: {
        hit: `
          \\damageranktwo.
          In addition, if the target is Large or smaller, it is \\glossterm{pushed} 15 feet in the direction the water flows.
          Once the target leaves the area, it stops being moved and blocks any other targets from being pushed.
        `,
        missGlance: true,
        targeting: `
          You create a continuous river of water in a \\medarealong, 10 ft. wide line-shaped \\glossterm{zone} from you.
          The water flows in a direction that you choose when you cast the spell.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Brawn against everything in the area.
          ${WATER_ACCURACY_BONUS}
        `,
      },
      rank: 4,
      roles: ['flash', 'hazard'],
      scaling: 'damage',
      tags: ['Manifestation', 'Sustain (attuneable, standard)'],
    },
    {
      name: 'Geyser',

      // -1r for reflex single target area, -1r for sustain minor in tiny area?
      attack: {
        hit: `
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          You create a geyser in a \\medarealong, 5 ft.\\ wide vertical line-shaped \\glossterm{zone} within \\shortrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against everything in the area.
          ${WATER_ACCURACY_BONUS}
        `,
      },
      rank: 2,
      roles: ['burst', 'hazard'],
      scaling: 'damage',
      tags: ['Manifestation', 'Sustain (minor)'],
    },
    {
      name: 'Mighty Geyser',

      // Treat the knockback plus larger area as +1 rank. The knockback is not a ton of
      // damage, and it doesn't meaningfully restrain movement, but this should pay some
      // rank cost relative to geyser.
      attack: {
        hit: `
          \\damagerankthree.
          If the target is Huge or smaller, you \\glossterm{knockback} it 20 feet vertically.
        `,
        missGlance: true,
        targeting: `
          You create a geyser in a \\largearealong, 5 ft.\\ wide vertical line-shaped \\glossterm{zone} within \\shortrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against everything in the area.
        `,
      },
      rank: 5,
      roles: ['burst', 'hazard'],
      scaling: 'damage',
      tags: ['Manifestation', 'Sustain (minor)'],
    },
    // 20% miss chance is about rank 3. But globally providing concealment that could
    // affect you and your allies seems stronger than that, even with the risk of
    // protecting your enemies, so call this a deep attunement.
    {
      name: 'Misty Shroud',

      effect: `
        At the end of each round, fog \\glossterm{briefly} fills a \\smallarea radius \\glossterm{zone} from you.
        This fog does not fully block sight, but it provides \\glossterm{concealment}.
        There is no time gap between the disappearance of the old fog and the appearance of the new fog, so you can keep continuous fog cover by staying in the same place or moving slowly.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune (deep)',
    },
    {
      name: 'Aqueous Tentacle',

      effect: `
        You gain an aqueous \\glossterm{natural weapon} that replaces one of your \\glossterm{free hands}.
        The weapon deals 1d8 damage and has the \\atWater and \\weapontag{Long} \\glossterm{weapon tags} (see \\pcref{Weapon Tags}).
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with strikes using the weapon (see \\pcref{Power}).
      `,
      narrative: `
        You grow a massive watery tentacle that extends from your body.
      `,
      rank: 1,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },
    {
      name: 'Mass Aqueous Tentacle',

      functionsLike: {
        name: 'aqueous tentacle',
        exceptThat: `
          it affects up to five creatures of your choice from among yourself and your allies within \\medrange.
          Each target uses the higher of your \\glossterm{magical power} and its own \\glossterm{mundane power} to determine its damage with strikes using the weapon.
        `,
      },
      rank: 4,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune (target)',
    },
    // TODO: EA math for weapon replacement
    {
      name: 'Mighty Aqueous Tentacle',

      functionsLike: {
        name: 'aqueous tentacle',
        exceptThat: 'the damage dealt by the weapon increases to 2d6.',
      },
      narrative: `
        You grow a massive watery tentacle that extends from your body.
      `,
      rank: 6,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },
    // TODO: EA math for weapon replacement
    {
      name: 'Octopus Tentacles',

      effect: `
        You gain eight aqueous \\glossterm{natural weapons} that resemble tentacles.
        Each natural weapon deals 1d6 damage and has the \\atWater, \\weapontag{Long}, and \\weapontag{Light} tags (see \\pcref{Weapon Tags}).
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with strikes using the weapons (see \\pcref{Power}).

        Whenever you make a \\glossterm{strike} with the tentacles, you can attack with all of the tentacles at once, with each tentacle attacking a different target.
        This functions as if your attacks had the \\weapontag{Sweeping} (7) tag, with no limit on how far each secondary target must be from the primary target.
        Alternately, you can make \\glossterm{dual strikes} with the tentacles.
        If you do, your attacks have \\weapontag{Sweeping} (3) instead of \\weapontag{Sweeping} (7).
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Water Whip',

      // -1dr for push
      attack: {
        hit: `
          \\damagerankone.
          If the target takes damage and your attack result beats its Brawn defense, you can \\glossterm{push} it up to 15 feet.
        `,
        targeting: `
          Make an attack vs. Armor against one creature within \\shortrange.
          ${WATER_ACCURACY_BONUS}
        `,
      },
      rank: 1,
      roles: ['burst', 'softener'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Intense Water Whip',

      // -1dr for push
      attack: {
        hit: `
          \\damagerankfour.
          If the target takes damage and your attack result beats its Brawn defense, you can \\glossterm{push} it up to 30 feet.
        `,
        targeting: `
          Make an attack vs. Armor against one creature within \\shortrange.
          ${WATER_ACCURACY_BONUS}
        `,
      },
      rank: 4,
      roles: ['burst', 'softener'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },
    {
      name: 'Aqueous Form',

      // Strike crit immune alone is about right for rank 2.
      // The deep attunement gives the other bonuses.
      // TODO: proper EA math
      effect: `
        You transform your body and equipment into water, allowing you to compress your body or contort yourself into odd shapes.
        This has the following effects:

        \\begin{raggeditemize}
          \\item You gain a +8 \\glossterm{enhancement bonus} to the Flexibility skill.
          \\item You ignore \\glossterm{difficult terrain} from all sources except for creature abilities.
          \\item You gain an slow \\glossterm{swim speed}.
            If you already have a slow swim speed, your swim speed becomes average instead.
        \\end{raggeditemize}
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Fog Cloud',

      // r2 base, +1r for +1 area rank
      effect: `
        A cloud of fog appears in a \\smallarea radius within \\medrange.
        The fog provides \\glossterm{concealment} for anything within or seen through the area.
      `,
      rank: 3,
      scaling: {
        5: 'You can choose to create a \\medarea radius instead.',
        7: 'You can choose to create a \\largearea radius instead.',
      },
      roles: ['flash', 'hazard'],
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, standard)',
    },
    {
      name: 'Persistent Fog Cloud',

      effect: `
        A cloud of fog appears in a \\medarea radius within \\medrange.
        The fog provides \\glossterm{concealment} for anything within or seen through the area.
      `,
      rank: 6,
      roles: ['flash', 'hazard'],
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Solid Fog Cloud',

      effect: `
        A cloud of fog appears in a \\smallarea radius within \\medrange.
        The fog provides \\glossterm{concealment} for anything within or seen through the area.
        In addition, the fog's area is \\glossterm{difficult terrain}.
      `,
      rank: 7,
      roles: ['flash', 'hazard'],
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, standard)',
    },
    {
      name: 'Fluid Motion',

      // TODO: proper EA calculation
      effect: `
        When you move using one of your movement speeds, you can \\glossterm{shapeshift} into a rushing flow of water with a volume roughly equal to your normal volume until your movement is complete.
        You can only transform into water in this way once during your movement, and you return to your normal form at the end of the movement.

        While transformed into water, you may move wherever water could go.
        However, you cannot take other actions, such as jumping, attacking, or casting spells.
        Your speed is halved when moving up a steep slope and doubled when moving down a steep slope.
        You may move through squares occupied by enemies without penalty.
        % TODO: timing is slightly wrong
        When you transform into water, you stop being \\grappled.

        If the water is split, you may reform from anywhere the water has reached, to as little as a single ounce of water.
        If not even an ounce of water exists contiguously, your body reforms from all of the largest available sections of water, cut into pieces of appropriate size.
        This usually causes you to die.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Aquajet Grasp',

      attack: {
        hit: `
          \\damageranktwo.
        `,
        injury: `
          If the target is Large or smaller, you \\glossterm{knockback} it up to 15 feet horizontally (see \\pcref{Knockback Effects}).
          If the target is immersed in water, this distance is doubled and you can also move it vertically.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Brawn against something you \\glossterm{touch}.
          ${WATER_ACCURACY_BONUS}
        `,
      },
      // narrative: '',
      rank: 1,
      roles: ['burst', 'maim'],
      scaling: 'damage',
    },
    {
      name: 'Intense Aquajet Grasp',

      functionsLike: {
        name: 'aquajet grasp',
        exceptThat:
          'the damage increases to \\damagerankseven, and the knockback distance increases to 30 feet.',
      },
      // narrative: '',
      rank: 6,
      roles: ['burst', 'maim'],
      scaling: 'damage',
    },
    // TODO: proper EA math
    {
      name: 'Personal Aquarium',

      // The last four effects basically do nothing unless you have a fast swim speed,
      // which is extremely unlikely. All of the "power" of the ability is in the first
      // effect, and the other effects are basically the cost you pay to get that
      // bonus.
      effect: `
        You surround yourself in a bubble of water.
        This has the following effects:
        \\begin{mdframeditemize}
          \\item You are \\shielded.
          \\item You are \\impervious to \\atFire attacks.
          \\item If you have a walk speed, it becomes slow.
          \\item If you have a swim speed, you can use it to move around on land.
          \\item You are always submerged in water, so you are \\unsteady if you do not have a swim speed (see \\pcref{Fighting In Water}).
          \\item The water blocks you from breathing air, but you can poke your head out of the bubble to take a breath as a \\glossterm{move action}.
        \\end{mdframeditemize}
      `,
      // narrative: '',
      rank: 2,
      roles: ['attune'],
      type: 'Attune (deep)',
    },
    {
      name: 'Waterward',

      effect: `
        You gain a +4 \\glossterm{enhancement bonus} to your maximum \\glossterm{hit points}.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: `The bonus increases to +8.`,
        5: `The bonus increases to +16.`,
        7: `The bonus increases to +32.`,
      },
      type: 'Attune',
    },
    {
      name: 'Slippery Escapist',

      effect: `
        If you have Flexibility as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
        Otherwise, you are treated as being trained in that skill.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: 'Attune',
    },
    {
      name: 'Liquifying Grasp',

      // Permanent prone is essentially the same as slowed, which is 1.5 EA.
      // Add +0.3 EA for the melting damage, so 1.8 EA. Then +0.4 for prefire, so 2.2 EA.
      attack: {
        hit: `
          The target's body starts to liquify as a \\glossterm{condition}.
          While it is below its maximum \\glossterm{hit points}, its lower body \\glossterm{shapeshifts} into a puddle of water.
          This has the following effects:
          \\begin{mdframeditemize}
            \\item It has no functioning legs, causing it to be permanently \\prone. It can still slosh across the ground, but at half speed, as normal for being prone.
            \\item During each of your subsequent actions, if it is immersed in liquid or not \\glossterm{grounded}, it takes \\damagerankfour as its body melts away.
          \\end{mdframeditemize}
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against one creature you \\glossterm{touch}.
          ${WATER_ACCURACY_BONUS}
        `,
      },
      rank: 3,
      roles: ['maim', 'burn'],
      scaling: 'damage',
    },
    {
      name: 'Liquify',

      functionsLike: {
        name: 'liquifying grasp',
        exceptThat:
          'it does not require a \\glossterm{free hand}, and it targets one creature within \\medrange.',
      },
      rank: 5,
      roles: ['maim'],
    },
    {
      name: 'Slippery Puddle',

      // +1r for area
      attack: {
        hit: `The target falls \\prone.`,
        targeting: `
          Make an attack vs. Reflex against each Large or smaller \\glossterm{grounded} \\glossterm{enemy} in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 3,
      roles: ['flash'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
    {
      name: 'Drowning Grasp',

      // Touch range would normally be dr4.
      // Drop to dr3 for accuracy and rarely releavnt condition.
      attack: {
        hit: `
          \\damageranktwo.
        `,
        injury: `
          The target becomes unable to breathe air as a \\glossterm{condition}.
          It can remove this condition by making a \\glossterm{difficulty value} 8 Constitution check as a \\glossterm{standard action}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against one creature you \\glossterm{touch}.
          You gain a \\plus2 accuracy bonus if the target needs to breathe and cannot breathe water.
        `,
      },
      // narrative: '',
      rank: 2,
      roles: ['burst', 'maim'],
      scaling: 'damage',
    },
    {
      name: 'Mighty Drowning Grasp',

      attack: {
        hit: `
          \\damageranksix.
        `,
        injury: `
          If the target loses hit points, it becomes unable to breathe air as a \\glossterm{condition}.
          It can remove this condition by making a \\glossterm{difficulty value} 10 Constitution check as a \\glossterm{standard action}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against one creature you \\glossterm{touch}.
          You gain a \\plus2 accuracy bonus if the target needs to breathe and cannot breathe water.
        `,
      },
      // narrative: '',
      rank: 5,
      roles: ['burst', 'maim'],
      scaling: 'damage',
    },
    {
      name: 'Sudden Liquification',

      // TODO: steeled is weird
      effect: `
        When you would suffer a \\glossterm{critical hit}, this spell automatically activates.
        When it does, your body liquifies in an instant, limiting the damage to vital areas.
        This causes the critical hit to become only a regular hit, and you remain \\glossterm{briefly} \\steeled.
        Then, this ability is \\glossterm{dismissed}.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: "River's Passage",

      cost: SWIFT_FATIGUE_SELF,
      effect: `
        Choose either yourself or one unattended object or \\glossterm{ally} within \\medrange.
        If you choose something other than yourself, it must have a \\glossterm{weight category} of Medium or less.

        You \\glossterm{push} the target up to 30 feet horizontally.
        You can change the direction of the push partway through the movement, allowing you to push the target around obstacles.
        Pushing the target down a steep slope or through water costs half the normal movement cost, but pushing it up a steep slope costs twice the normal movement cost.
      `,
      rank: 1,
      roles: ['mobility'],
      tags: ['Manifestation'],
    },
    {
      name: "Intense River's Passage",

      cost: SWIFT_FATIGUE_SELF,
      functionsLike: {
        name: "River's Passage",
        exceptThat: 'the maximum push distance increases to 60 feet.',
      },
      rank: 4,
      roles: ['mobility'],
      tags: ['Manifestation'],
    },
    {
      name: 'Waterward',

      // Shielded alone is on the weaker side, so add impervious to fire
      effect: `
        You are \\glossterm{briefly} \\impervious to \\atFire attacks and \\shielded.
        This is a \\atSwift effect, so it protects you from attacks during the current phase.
      `,
      rank: 1,
      roles: ['turtle'],
      tags: ['Manifestation', 'Swift'],
    },
    {
      name: 'Waterward Dash',

      // Cover is basically shielded, but also prevents half on miss and glancing blows.
      // Call that equal to braced.
      effect: `
        You are \\glossterm{briefly} \\impervious to \\atFire attacks and \\shielded.
        In addition, you can move up to your movement speed during your action.
        The protection is \\atSwift, but the movement is not.
      `,
      rank: 5,
      roles: ['mobility', 'turtle'],
      tags: ['Manifestation', 'Swift (see text)'],
    },
    {
      name: 'Expanded Waterward',

      // You and all adjacent isn't as flexible as "any two", but it's similarly strong.
      effect: `
        This round, you and all \\glossterm{allies} adjacent to you are \\impervious to \\atFire attacks and \\shielded.
        This is a \\atSwift effect, so it protects each target from attacks during the current phase.
      `,
      rank: 4,
      // Normally we don't combine boon and turtle, but this is a bit weird since it
      // always affects you and only sometimes affects allies.
      roles: ['boon', 'turtle'],
      tags: ['Manifestation', 'Swift'],
    },
    {
      name: 'Rising Tide',

      effect: `
        When you cast this spell, and whenever you sustain it, water loudly swirls and crashes around you.
        When you stop sustaining this spell, you gain a benefit based on how many times you sustained it.
        \\begin{mdframedraggeditemize}
          \\item Never: You are \\empowered this round.
          \\item Once: You are \\maximized this round.
          \\item Two or more times: You are maximized and \\fortified this round.
        \\end{mdframedraggeditemize}
      `,
      rank: 2,
      roles: ['focus'],
      type: 'Sustain (minor)',
    },
    {
      name: 'Greater Rising Tide',

      effect: `
        When you cast this spell, and whenever you sustain it, water loudly swirls and crashes around you.
        When you stop sustaining this spell, you gain a benefit based on how many times you sustained it.
        \\begin{mdframedraggeditemize}
          \\item Never: You are \\empowered and \\fortified this round.
          \\item Once: You are \\maximized and fortified this round.
          \\item Two or more times: You are maximized this round and \\glossterm{briefly} fortified.
        \\end{mdframedraggeditemize}
      `,
      rank: 6,
      roles: ['focus'],
    },
  ],
});
