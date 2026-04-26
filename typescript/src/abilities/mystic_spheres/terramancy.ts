import { MysticSphere } from '.';
import { add_tag_to_sphere } from './add_tag';
import { BARRIER_COOLDOWN, CONDITION_CRIT, MULTIHIT_CRIT } from '../constants';

export const terramancy: MysticSphere = add_tag_to_sphere('Earth', {
  name: 'Terramancy',
  shortDescription: 'Manipulate earth to crush foes.',
  sources: ['arcane', 'domain', 'nature'],
  // Almost all creatures are grounded most of the time, so it's not a big deal to just
  // be grounded at all.
  // In general, -1r if it only works against grounded
  // +1r for +2acc vs grounded on stone or while grounded on stone
  specialRules: `
    Some spells from this mystic sphere are more effective if you or the target are \\glossterm{grounded}.
  `,

  cantrips: [
    {
      name: 'Rocky Carapace',

      // Braced + fortified is 0.8 EA
      effect: `
        You are \\briefly \\braced and \\fortified.
      `,
      roles: ['turtle'],
      tags: ['Manifestation'],
    },
  ],
  spells: [
    {
      name: 'Rock Throw',

      // Rank 1 Spell
      // Range: Short (+1)
      // Mod: Accuracy Bonus (-1)
      // Result: 1 + 1 - 1 = dr1
      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          Make an attack vs. Armor against something within \\shortrange.
          You gain a +2 \\glossterm{accuracy} bonus if you are \\glossterm{grounded} on stone.
        `,
      },
      roles: ['burst'],
      rank: 1,
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Rock Throw',

      // Rank 4 Spell
      // Range: Short (+1)
      // Mod: Accuracy Bonus (-1)
      // Result: 4 + 1 - 1 = dr4
      attack: {
        hit: `\\damagerankfour.`,
        targeting: `
          Make an attack vs. Armor against something within \\shortrange.
          You gain a +2 accuracy bonus if you are \\glossterm{grounded} on stone.
        `,
      },
      rank: 4,
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Boulder Heave',

      // Rank 2 Spell
      // Range: Medium (0)
      // Mod: Escapably Delayed (+1)
      // Result: 2 + 0 + 1 = dr3
      // (Uses +1 for delay due to failure condition and being a standard action start)
      attack: {
        hit: `\\damagerankthree.`,
        targeting: `
          When you cast this spell, you create a boulder in midair above your space and choose a target within \\medrange.
          If the area above you is occupied, this spell fails without effect.
          At the start of your next turn, if that target is still within \\medrange, make a \\glossterm{reactive attack} vs. Armor against it.
          Otherwise, the boulder disappears and this spell is wasted.
        `,
      },
      rank: 2,
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Meteor',

      // Rank 4 Spell
      // Area: Med radius in Med range (R4, mod -2)
      // Mod: Escapably Delayed (+2), Double Defense (+1)
      // Result: 4 - 2 + 2 + 1 = dr5
      // (The open area requirement is a cost for stacking this much +damage.)
      attack: {
        hit: `\\damagerankfive.`,
        halfOnMiss: true,
        targeting: `
          When you cast this spell, you choose a \\smallarea radius, 60 foot tall cylinder-shaped \\glossterm{zone} within \\medrange.
          The bottom of the area must be \\glossterm{grounded}, and you must have \\glossterm{line of sight} and \\glossterm{line of effect} to both the top and bottom of the area.
          This means you cannot cast this spell in tight tunnels.

          A meteor appears at the top of the area.
          Creatures can generally identify what area the meteor will fall into with a DV 10 Awareness check.
          At the start of your next turn, the meteor crashes into the ground, and you make a \\glossterm{reactive attack} vs. Armor and Reflex against everything in a \\medarea radius of your chosen location.
          Creatures under overhanging structures may have \\glossterm{cover} from the attack or be entirely excluded from the effect based on their location.
        `,
      },
      rank: 4,
      roles: ['clear'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Meteor',

      // Rank 7 Spell
      // Area: Med radius in Med range (R4, mod -2)
      // Mod: Escapably Delayed (+2), Double Defense (+1)
      // Result: 7 - 2 + 2 + 1 = dr8
      functionsLike: {
        name: 'meteor',
        exceptThat: `
          the damage increases to \\damagerankeight.
        `,
      },
      rank: 7,
      roles: ['clear'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Crushing Gravity',

      // Rank 3 Spell
      // Range: Medium (0)
      // Result: 3 + 0 = dr3
      // (Original design: This doesn't pay a cost for its accuracy bonus because it's
      // just offsetting the intrinsic bonus that larger creatures get to their Brawn.)
      attack: {
        hit: `
          \\damagerankthree.
        `,
        targeting: `
          Make an attack vs. Brawn against a \\glossterm{grounded} creature or object within \\medrange.
          You gain a +1 accuracy bonus for each weight category by which the target is heavier than Medium.
        `,
      },
      rank: 3,
      roles: ['burst'],
      scaling: 'damage',
      tags: [],
    },

    {
      name: 'Mighty Crushing Gravity',

      // Rank 6 Spell
      // Range: Medium (0)
      // Result: 6 + 0 = dr6
      attack: {
        hit: `
          \\damageranksix, and any \\glossterm{extra damage} is doubled.
        `,
        targeting: `
          Make an attack vs. Brawn against a \\glossterm{grounded} creature or object within \\medrange.
          You gain a +1 accuracy bonus for each weight category by which the target is heavier than Medium.
        `,
      },
      rank: 6,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Rockshard Blast',

      // Rank 1 Spell
      // Area: Small cone from self (R0, mod +1)
      // Mod: Double Defense (+1), Accuracy Bonus (-1)
      // Result: 1 + 1 + 1 - 1 = dr2
      attack: {
        hit: `\\damageranktwo.`,
        halfOnMiss: true,
        targeting: `
          Make an attack vs. Armor and Reflex against everything in a \\smallarea cone from you.
          You gain a +2 accuracy bonus if you are \\glossterm{grounded} on stone.
        `,
      },
      rank: 1,
      roles: ['clear'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Rockshard Blast',

      // Rank 4 Spell
      // Area: Small cone from self (R0, mod +1)
      // Mod: Double Defense (+1), Accuracy Bonus (-1)
      // Result: 4 + 1 + 1 - 1 = dr5
      attack: {
        hit: `\\damagerankfive.`,
        halfOnMiss: true,
        targeting: `
          Make an attack vs. Armor and Reflex against everything in a \\smallarea cone from you.
          You gain a +2 \\glossterm{accuracy} bonus if you are \\glossterm{grounded} on stone.
        `,
      },
      rank: 4,
      roles: ['clear'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    // TODO: calculate EA of immunities
    {
      name: 'Earthen Anchor',

      effect: `
        While you are \\glossterm{grounded}, you are immune to \\glossterm{push}, \\glossterm{fling}, and \\glossterm{teleport} effects from attacks.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Mass Earthen Anchor',

      functionsLike: {
        mass: true,
        name: 'earthen anchor',
      },
      rank: 4,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Deep Earthen Anchor',

      functionsLike: {
        name: 'earthen anchor',
        exceptThat: `
          as long as you are within 30 feet of stable ground, you are always considered either \\glossterm{grounded} or not grounded, whichever is more beneficial for you.

          For example, you would not take damage from the \\spell{earthquake} spell.
          You must still stand on appropriate materials for effects like \\spell{rock throw} which require a specific type of grounding.
        `,
      },
      rank: 5,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Earthspike',

      // Rank 3 Spell
      // Range: Short (+1)
      // Mod: Double Defense (+1)
      // Result: 3 + 1 + 1 = dr5
      attack: {
        hit: `
          \\damagerankfive, and any \\glossterm{extra damage} is doubled.
        `,
        targeting: `
          Make an attack vs. Armor and Reflex against one creature in \\shortrange.
        `,
      },
      rank: 3,
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Earthspike',

      // Rank 6 Spell
      // Range: Short (+1)
      // Mod: Double Defense (+1)
      // Result: 6 + 1 + 1 = dr8
      attack: {
        hit: `
          \\damagerankeight, and any \\glossterm{extra damage} is doubled.
        `,
        targeting: `
          Make an attack vs. Armor and Reflex against one creature in \\shortrange.
        `,
      },
      rank: 6,
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Meld into Stone',

      effect: `
        You and up to 100 pounds of nonliving equipment meld into one stone object you \\glossterm{touch} that is at least as large as your body.
        If you try to bring excess equipment into the stone, the spell fails without effect.

        As long as the spell lasts, you can move within the stone as if it was thick water.
        However, at least part of you must remain within one foot of the place you originally melded with the stone.
        You gain no special ability to breathe or see while embedded the stone, and you cannot speak if your mouth is within the stone.
        The stone muffles sound, but very loud noises may reach your ears within it.
        If you fully exit the stone, this ability is \\glossterm{dismissed}.

        If this spell ends before you exit the stone, or if the stone stops being a valid target for the spell (such as if it is broken into pieces), you are forcibly expelled from the stone.
        When you are forcibly expelled from the stone, you take 4d8 bludgeoning damage and become \\stunned as a \\glossterm{condition}.
      `,
      rank: 3,
      roles: ['narrative'],
      type: 'Sustain (attunable, standard)',
    },

    {
      name: 'Rippling Earthwave',

      // r1 area is about halfway between "ranged" and "melee"; call it 1.4 EA. That lets
      // us get enemies-only.
      attack: {
        hit: `The target is knocked \\prone.`,
        targeting: `
          Make an attack vs. Brawn against all Large or smaller \\glossterm{grounded} \\glossterm{enemies} in in a \\medarea cone from you.
        `,
      },
      rank: 2,
      roles: ['flash'],
      scaling: 'accuracy',
    },

    {
      name: 'Stoneward',

      // 0.5 + 0.4 EA
      effect: `
         If you are \\glossterm{grounded} on stone, you are \\briefly \\braced and \\fortified.
      `,
      rank: 2,
      roles: ['turtle'],
    },

    {
      name: 'Draw Upon The Deepest Earth',

      // 0.5 + 0.7 EA
      effect: `
         If you are \\glossterm{grounded} on stone, you are \\briefly \\braced and \\maximized.
         However, your \\glossterm{speed} is also briefly halved.
      `,
      rank: 5,
      roles: ['focus'],
    },

    {
      name: 'Tremor',

      // r1 area of immediate damage is normally dr2, or dr3 with double defense. The
      // second half of the damage is escapable and includes yourself, so -2dr seems
      // reasonable.
      attack: {
        hit: `
          \\damagerankone.
        `,
        halfOnMiss: true,
        targeting: `
          The earth shakes in a \\medarea radius \\glossterm{zone} from your location.
          Make an attack vs. Brawn and Reflex against everything in the area that is \\glossterm{grounded}.
          At the start of your next turn, this effect \\glossterm{repeats} in the same area.
        `,
      },
      narrative: `
        You crack the earth around you, shaking everyone violently.
      `,
      rank: 2,
      roles: ['wildfire'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Tremor',

      // Prone is normally about 1.4 EA, but it's hard to calculate the double prone here,
      // especially since the first prone makes the second one more likely to hit. Just
      // assume it's a reasonable debuff level.
      attack: {
        hit: `
          \\damagerankthree, and the target falls \\prone.
        `,
        halfOnMiss: true,
        targeting: `
          The earth shakes in a \\medarea radius \\glossterm{zone} from your location.
          Make an attack vs. Reflex and Brawn against everything in the area that is \\glossterm{grounded}.
          At the start of your next turn, this effect \\glossterm{repeats} in the same area.
        `,
      },
      narrative: `
        You crack the earth around you, shaking everyone violently.
      `,
      rank: 5,
      roles: ['wildfire'],
      scaling: 'damage',
    },

    {
      name: 'Earthquake',

      // Increasing to a large area puts us into limited scope, so normal damage would be
      // dr6, +1dr for double defense, -1dr for debuff, -2dr for repeat attack = dr4.
      attack: {
        hit: `
          \\damagerankfour, and the target falls \\prone.
        `,
        halfOnMiss: true,
        targeting: `
          The earth shakes in a \\largearea radius \\glossterm{zone} from your location.
          Make an attack vs. Reflex and Brawn against everything in the area that is \\glossterm{grounded}.
          At the start of your next turn, this effect \\glossterm{repeats} in the same area.
        `,
      },
      narrative: `
        You crack the earth around you, shaking everyone violently.
      `,
      rank: 7,
      roles: ['wildfire'],
      scaling: 'accuracy',
    },

    {
      name: 'Swallowed by Earth',

      // Limited scope r7 can just barely get away with a brief slow + damage, especially
      // considering the size + grounded limitation. We drop the damage by a tier to allow
      // the silly double effect.
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankfive, and the target is \\briefly \\slowed.
        `,
        injury: `
          If the target was already slowed by this ability, it is also swallowed by the earth as a \\glossterm{condition}.
          While it is swallowed by the earth, it does not have \\glossterm{line of sight} or \\glossterm{line of effect} to any creature other than itself.
          During each of your subsequent actions, it takes \\damagerankfive as the earth grinds it into paste.

          The target can remove this condition by making a \\glossterm{difficulty value} 12 Strength check as a standard action.
          If the earth or stone it is swallowed by is destroyed or otherwise rendered unable to contain the creature, this ability is \\glossterm{dismissed}.
          When this effect ends, the target reappears in the closest unoccupied space to where it was swallowed by the earth.
          Some effects such as teleportation can also remove the target from the fissure, which also ends the condition.
        `,
        halfOnMiss: true,
        targeting: `
          Make an attack vs. Reflex and Brawn against all Large or smaller \\glossterm{grounded} \\glossterm{enemies} in a \\smallarea radius in \\shortrange.
        `,
      },
      roles: ['maim', 'burst'],
      narrative: `
        You open up a rift in the ground that swallows and traps a foe.
      `,
      rank: 7,
    },

    {
      name: 'Earthbind',

      // This is relevant for maybe 20% of fights, and in those fights it's roughly 40%
      // action denial. That's 12 * 0.4 * 0.2 = 1 EA. That gives 2 ranks to spend on AOE
      // and 1 rank to spend on the accuracy bonus, for a total of a r3 area.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, the target is pulled towards the ground with great force, approximately doubling the gravity it experiences.
          It is unable to use any fly speed or glide speed, and its jump distance is halved.
          All \\glossterm{falling damage} that it takes is doubled.
          Standing up from a prone position costs its full speed rather than only half its speed.
        `,
        targeting: `
          Make an attack vs. Brawn against up to two creatures within \\medrange that are no more than 60 feet above a stable surface that could support their weight.
          You gain a +2 \\glossterm{accuracy} bonus if you are \\glossterm{grounded} on stone.
        `,
      },
      rank: 2,
      roles: ['softener'],
      scaling: 'accuracy',
    },

    {
      name: 'Fall to Earth',

      // Same as scaled r2 vs Large, +2a relative diff vs Huge, amazing vs larger
      functionsLike: {
        name: 'earthbind',
        exceptThat: `
          you gain a +2 accuracy bonus for each weight category by which the target is heavier than Medium. 
          This accuracy bonus is doubled if the target is not \\glossterm{grounded}.
        `,
      },
      narrative: `
        The heavier they are, the harder they fall.
      `,
      rank: 4,
      roles: ['softener'],
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Intense Earthbind',

      // 1 EA from earthbind + 2.1 EA from slowed = rank 10. Add the check to
      // drop this to rank 7.
      functionsLike: {
        name: 'earthbind',
        exceptThat: `
          as part of the same condition, the target is also \\slowed while it is \\glossterm{injured}.
          At the start of its turn, the target can make a DV 10 Strength check.
          Success means that it stops being slowed during that turn.
        `,
      },
      rank: 7,
      roles: ['maim', 'softener'],
      scaling: 'accuracy',
    },

    {
      name: 'Gravity Well',

      // Brief ranged slow is 2 EA. However, ranged slow is penalized for its kiting
      // potential, and a zone can't be used for kiting, so drop it to 1.6 EA, or
      // 2.6 EA as sustain (minor). That's a rank 7 effect.
      attack: {
        hit: `
          The target is \\briefly \\slowed.
        `,
        targeting: `
          You create an area of intense gravity in a \\medarea radius \\glossterm{zone} within \\medrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Brawn against all \\glossterm{enemies} in the area.
        `,
      },
      rank: 7,
      roles: ['hazard', 'softener'],
      scaling: 'accuracy',
      type: 'Sustain (attunable, minor)',
    },

    {
      name: 'Earthen Fortification',

      effect: `
        You construct a fortification made of packed earth within \\medrange.
        This takes the form of up to ten contiguous 5-foot squares, each of which is four inches thick.
        The squares can be placed at any angle and used to form any structure as long as that structure is stable.
        Since the fortifications are made of packed earth, their maximum weight is limited, and structures taller than ten feet high are usually impossible.
        A typical Large wall made of earth has 50 hit points, 5 \\glossterm{hardness}, and a Sunder DV of 20.

        The fortifications form slowly, rather than instantly.
        The structure becomes complete at the end of your next turn.
        This makes it difficult to trap creatures within structures formed.
      `,
      rank: 4,
      scaling: {
        6: `
          You can also construct fortifications from stone.
          This makes them more difficult to damage and allows the construction of more complex structures.
          A typical Large wall made of stone has 50 hit points, 10 \\glossterm{hardness}, and a Sunder DV of 25.
        `,
      },
      roles: ['hazard'],
      tags: ['Manifestation'],
      type: 'Sustain (attunable, minor)',
    },

    // TODO: calculate EA of movement effects
    {
      name: 'Earthglide',

      effect: `
        You gain a slow \\glossterm{burrow speed}.
        This does not allow you to breathe while inside the earth, so your ability to traverse long distances may be limited.
      `,
      rank: 3,
      roles: ['narrative'],
      type: 'Sustain (attunable, standard)',
    },

    {
      name: 'Rapid Earthglide',

      effect: `
        You gain an average \\glossterm{burrow speed}.
        This does not allow you to breathe while inside the earth, so your ability to traverse long distances may be limited.
      `,
      rank: 6,
      roles: ['attune'],
      type: 'Sustain (attunable, standard)',
    },

    {
      name: 'Solid Earthglide',

      effect: `
        You gain a slow \\glossterm{burrow speed}.
        Unlike most burrow speeds, this burrow speed also allows you to pass through solid stone.
        This does not allow you to breathe while inside the earth or stone, so your ability to traverse long distances may be limited.
      `,
      rank: 5,
      roles: ['narrative'],
      type: 'Sustain (attunable, standard)',
    },

    {
      name: 'Stoneskin',

      effect: `
        You gain a +3 \\glossterm{enhancement bonus} to your \\glossterm{durability}.
        However, you also take a \\minus1 penalty to your Reflex defense.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: 'The bonus increases to +4.',
        5: 'The bonus increases to +5.',
        7: 'The bonus increases to +6.',
      },
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Steelskin',

      effect: `
        Whenever a damaging attack would get a \\glossterm{critical hit} against you, you automatically become \\glossterm{briefly} \\steeled, protecting you from the triggering attack.
        Then, this effect is \\glossterm{dismissed}.
      `,
      rank: 1,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Greater Steelskin',

      effect: `
        Whenever a damaging attack would get a \\glossterm{critical hit} against you, you automatically become \\glossterm{briefly} \\steeled and \\fortified, protecting you from the triggering attack.
        Then, this effect is \\glossterm{dismissed}.
      `,
      rank: 5,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Volcano',

      // Rank 3 Spell
      // Area: Small radius in Short range (R3, mod -1)
      // Mod: Sustain Zone (-2), Escapable (+1)
      // Result: 3 - 1 - 2 + 1 = dr1
      attack: {
        hit: `\\damagerankone.`,
        halfOnMiss: true,
        targeting: `
          You create a volcano at a \\glossterm{grounded} location within \\shortrange.
          The area affected by the volcano increases over time.
          It affects a \\smallarea radius \\glossterm{zone} in the first turn, a \\medarea radius in the second turn, and a \\largearea radius in all subsequent turns.
          Any effect which increases or changes this spell's area affects all of its areas equally, not just the area in the first turn.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against everything in the area.
        `,
      },
      narrative: `
        You create a small volcano that showers everything nearby in burning shrapnel.
      `,
      rank: 3,
      scaling: 'damage',
      roles: ['wildfire'],
      tags: ['Manifestation', 'Sustain (minor)'],
    },

    {
      name: 'Mighty Volcano',

      // Rank 6 Spell
      // Area: Small radius in Short range (R3, mod -1)
      // Mod: Sustain Zone (-2), Escapable (+1)
      // Result: 6 - 1 - 2 + 1 = dr4
      functionsLike: {
        name: 'volcano',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      narrative: `
        You create a small volcano that showers everything nearby in burning shrapnel.
      `,
      rank: 6,
      scaling: 'damage',
      roles: ['wildfire'],
      tags: ['Manifestation', 'Sustain (minor)'],
    },

    // TODO: calculate EA for movement effects
    {
      name: 'Personal Gravitation',

      effect: `
        Once during your turn, while you are within 5 feet of an \\glossterm{unattended} object at least one size category larger than you, you can adjust your personal gravity as a \\glossterm{free action}.
        When you do, gravity pulls you towards that object instead of in the normal direction.
        This allows you to walk normally on walls or even ceilings.

        Whenever you change the direction that gravity pulls you, you must make a \\glossterm{difficulty value} 10 Balance check to keep your feet.
        Failure means you fall \\prone and your movement ends.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Distant Personal Gravitation',

      functionsLike: {
        name: 'personal gravitation',
        exceptThat:
          'the maximum distance from you to the object increases to 30 feet. This can cause you to take \\glossterm{falling damage}.',
      },
      rank: 5,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Stonefist',

      // +2 over a normal weapon
      effect: `
        You gain a stonefist \\glossterm{natural weapon} that replaces one of your \\glossterm{free hands}.
        The weapon deals 1d10 bludgeoning damage and has the \\abilitytag{Impact} and \\weapontag{Resonating} weapon tags (see \\pcref{Weapon Tags}).
      `,
      rank: 1,
      roles: ['attune'],
      narrative: `
        You encase one of your arms in a mighty stone bulwark, empowering it to crush your foes with sheer brute force.
      `,
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Mass Stonefist',

      functionsLike: {
        mass: true,
        name: 'stonefist',
      },
      rank: 3,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Mighty Stonefist',

      // Three upgrades above a normal weapon. TODO figure out whether this is balanced??
      functionsLike: {
        name: 'stonefist',
        exceptThat: 'the damage dealt by the weapon increases to 2d6.',
      },
      rank: 5,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Wall of Stone',

      // +1r for double HP
      cost: BARRIER_COOLDOWN,
      effect: `
        You create a \\smallarealong \\glossterm{wall} of stone within \\shortrange.
        Every square of the wall must be \\glossterm{grounded}.
        Nothing can pass through the wall until it is destroyed.

        The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}, and is destroyed when its hit points become negative.
        If the entire wall is directly supported by stone, its hit points are doubled.
      `,
      rank: 2,
      roles: ['hazard'],
      scaling: {
        4: "The wall's hit points increase to four times your power.",
        6: "The wall's hit points increase to five times your power.",
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attunable, minor)',
    },

    {
      name: 'Massive Wall of Stone',

      // +3r for small -> large, +1r for short -> med
      cost: BARRIER_COOLDOWN,
      functionsLike: {
        name: 'wall of force',
        exceptThat:
          'the area increases to a \\largearealong wall within \\medrange, and its hit points increase to five times your \\glossterm{power}.',
      },
      rank: 6,
      roles: ['hazard'],
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attunable, minor)',
    },

    {
      name: 'Tremorsense',

      effect: `
        You gain \\sense{tremorsense} with a 60 foot range, allowing you to sense your surroundings without light (see \\pcref{Tremorsense}).
        If you already have tremorsense, the range of your tremorsense increases by 60 feet.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Tremorsight',

      effect: `
        You gain \\sense{tremorsight} with a 30 foot range, allowing you to see your surroundings without light (see \\pcref{Tremorsight}).
        If you already have tremorsight, the range of your tremorsight increases by 30 feet.
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Earthcraft',

      effect: `
        Choose yourself or an \\glossterm{ally} within \\medrange.

        This spell creates up to two weapons, suits of body armor, or shields from a Large or smaller \\glossterm{unattended} body of earth or stone within 5 feet of you.
        The body targeted must be at least as large as the largest item you create.
        You can create any weapon, shield, or body armor that you are proficient with, and which would normally be made of metal.
        The item's rank cannot exceed your spellcasting rank with this spell.
        It is sized appropriately for the target, up to a maximum of a Medium size item.
        The items appear in your hand or on the ground at your feet.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        2: `
          If you create body armor or a weapon, it can be created from any special material other than cold iron, dragonscale, and dragonfang (see \\pcref{Armor Special Materials}, and \\pcref{Weapon Special Materials}).
          Its rank cannot exceed your spellcasting rank with this spell.
        `,
      },
      type: 'Attune (target)',
    },

    // Any two shielded is 0.9 EA
    {
      name: 'Earthen Shield',

      effect: `
        Choose up to two \\glossterm{grounded} creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each target is \\briefly \\shielded.
        If a target moves from its location or stops being grounded, this effect immediately ends on it.
      `,
      rank: 1,
      roles: ['boon'],
    },

    {
      name: 'Mass Earthen Shield',

      effect: `
        Choose up to five \\glossterm{grounded} creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each target is \\briefly \\shielded.
        If a target moves from its location or stops being grounded, this effect immediately ends on it.
      `,
      rank: 5,
      roles: ['boon'],
    },
  ],
});
