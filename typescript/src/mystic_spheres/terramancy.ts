import { MysticSphere } from '.';
import { add_tag_to_sphere } from './add_tag';
import { BARRIER_COOLDOWN, CONDITION_CRIT } from './constants';

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
      name: 'Shape Earth',

      // TODO: nerf crafting efficiency, clarify how long it typically takes to dig
      // through dirt
      effect: `
        Choose one unattended, nonmagical body of earth or unworked stone you \\glossterm{touch}.
        You make a Craft check to alter the target (see \\pcref{Craft}), except that you do not need any special tools to make the check, such as a shovel or hammer and chisel.
        The maximum \\glossterm{damage resistance} of a material you can affect with this ability is equal to your \\glossterm{power}.

        % should be longer than polymorph's alter object ability
        % TODO: nerf all magical crafting times
        Each time you cast this spell, you can accomplish work that would take up to five rounds with a normal Craft check.
      `,
        roles: ['narrative'],
      scaling: {
        2: `The amount of work you accomplish with the spell increases to one minute.`,
        4: `The amount of work you accomplish with the spell increases to two minutes.`,
        6: `The amount of work you accomplish with the spell increases to five minutes.`,
      },
    },
  ],
  spells: [
    {
      name: 'Rock Throw',

      // +1r for +2acc
      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          Make an attack vs. Armor against something within \\shortrange.
          You gain a +2 \\glossterm{accuracy} bonus if you are \\glossterm{grounded} on stone.
        `,
      },
      roles: ['burst'],
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Rock Throw',

      // +1r for +2acc
      attack: {
        hit: `\\damagerankfour.`,
        targeting: `
          Make an attack vs. Armor against something within \\shortrange.
          You gain a +2 accuracy bonus if you are \\glossterm{grounded} on stone.
        `,
      },
      rank: 4,
      roles: ['burst'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Boulder Heave',

      attack: {
        hit: `\\damagerankthree.`,
        targeting: `
          When you cast this spell, you create a boulder in midair above your space and choose a target within \\medrange.
          If the area above you is occupied, this spell fails without effect.
          During your next action, if that target is still within \\medrange, make an attack vs. Armor against it.
          Otherwise, the boulder disappears and this spell is wasted.
        `,
      },
      rank: 2,
      roles: ['burst'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Meteor',

      // -2r for avoidable delay, so effective rank 6. That allows a t3 area and dr5.
      // Bump to a r4 area due to the open area requirement.
      attack: {
        hit: `\\damagerankfive.`,
        missGlance: true,
        targeting: `
          When you cast this spell, you choose a \\medarea radius within \\shortrange.
          A meteor appears high in the sky over that area, falling down towards it.
          Creatures can generally identify what area the meteor will fall into with a DV 10 Awareness check.
          During your next action, the meteor crashes into your chosen area, and you make an attack vs. Armor against everything in the area.
          If there is not at least fifty feet of open space above your chosen area, this spell fails with no effect.
        `,
      },
      rank: 4,
      roles: ['clear'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Meteor Swarm',

      // -2r for avoidable delay, +1r for extended range, so effective rank 8. That allows
      // a t8 area and dr6.
      functionsLike: {
        name: 'meteor',
        exceptThat: `
          you can choose up to four separate areas within \\longrange, creating one meteor per area.
          In addition, the damage increases to \\damageranksix.
          Any individual creature can only be attacked by one meteor, even if it occupies multiple areas, and overlapping the areas has no benefit.
        `,
      },
      rank: 7,
      roles: ['clear'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Crushing Gravity',

      // This doesn't pay a cost for its accuracy bonus because it's just offsetting the
      // intrinsic bonus that larger creatures get to their Brawn.
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
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Mighty Crushing Gravity',

      functionsLike: {
        name: 'crushing gravity',
        exceptThat: 'the damage increases to \\damageranksix, and any \\glossterm{extra damage} is doubled.',
      },
      rank: 6,
      roles: ['burst'],
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Rockshard Blast',

      // A r0 area is drX+1, and this gets drX+2 for double defense, then -1dr for the
      // accuracy bonus
      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor and Reflex against everything in a \\smallarea cone from you.
          You gain a +2 accuracy bonus if you are \\glossterm{grounded} on stone.
        `,
      },
      rank: 1,
      roles: ['clear'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Rockshard Blast',

      attack: {
        hit: `\\damagerankfour.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor and Reflex against everything in a \\medarea cone from you.
          You gain a +2 \\glossterm{accuracy} bonus if you are \\glossterm{grounded} on stone.
        `,
      },
      rank: 4,
      roles: ['clear'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Earthen Anchor',

      effect: `
        You are immune to \\glossterm{knockback}, \\glossterm{push}, and \\glossterm{teleport} effects from attacks, unless the effects come from an attack that scores a \\glossterm{critical hit}.
        In addition, you are always considered either \\glossterm{grounded} or not grounded, whichever is more beneficial for you.

        For example, you would not take damage from the \\spell{earthquake} spell.
        You must still stand on appropriate materials for effects like \\spell{rock throw} which require a specific type of grounding.
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
      name: 'Earthspike',

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
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Earthspike',

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
      scaling: 'accuracy',
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
        If you fully exit the stone, this spell ends.

        If this spell ends before you exit the stone, or if the stone stops being a valid target for the spell (such as if it is broken into pieces), you are forcibly expelled from the stone.
        When you are forcibly expelled from the stone, you take 4d8 bludgeoning damage and become \\stunned as a \\glossterm{condition}.
      `,
      rank: 3,
      roles: ['narrative'],
      type: 'Sustain (attuneable, standard)',
    },

    {
      name: 'Rippling Earthwave',

      // r1 area is about halfway between "ranged" and "melee"; call it 1.4 EA. That gives
      // 0.2 EA for empowerment.
      attack: {
        hit: `Each target is knocked \\prone.`,
        targeting: `
          Make an attack vs. Reflex against all Large or smaller \\glossterm{grounded} creatures in in a \\medarea cone from you.
          Then, you are \\glossterm{briefly} \\empowered.
        `,
      },
      rank: 2,
      roles: ['generator', 'flash'],
      scaling: 'accuracy',
    },

    {
      name: 'Stoneward',

      effect: `
         If you are \\glossterm{grounded} on stone, you are \\glossterm{briefly} \\braced and \\steeled.
      `,
      rank: 2,
      roles: ['focus'],
    },

    {
      name: 'Draw Upon The Deepest Earth',

      effect: `
         If you are \\glossterm{grounded} on stone, you are \\glossterm{briefly} \\braced and \\maximized.
         However, your movement speed is also \\glossterm{briefly} halved.
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
        missGlance: true,
        targeting: `
          The earth shakes in a \\medarea radius \\glossterm{zone} from your location.
          When you cast this spell, and during your next action, make an attack vs. Brawn and Reflex against everything in the area that is \\glossterm{grounded}.
        `,
      },
      narrative: `
        You crack the earth around you, shaking everyone violently.
      `,
      rank: 2,
      roles: ['wildfire'],
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Tremor',

      // Prone is normally about 1.4 EA, but it's hard to calculate the double prone here,
      // especially since the first prone makes the second one more likely to hit. Just
      // assume it's a reasonable debuff level.
      attack: {
        hit: `
          \\damagerankthree, and each target falls \\prone.
        `,
        missGlance: true,
        targeting: `
          The earth shakes in a \\medarea radius \\glossterm{zone} from your location.
          When you cast this spell, and during your next action, make an attack vs. Reflex and Brawn against everything in the area that is \\glossterm{grounded}.
        `,
      },
      narrative: `
        You crack the earth around you, shaking everyone violently.
      `,
      rank: 5,
      roles: ['wildfire'],
      scaling: 'accuracy',
    },

    {
      name: 'Earthquake',

      // Increasing to a large area puts us into limited scope, so normal damage would be
      // dr6, +1dr for double defense, -1dr for debuff, -2dr for repeat attack = dr4.
      attack: {
        hit: `
          \\damagerankfour, and each target falls \\prone.
        `,
        missGlance: true,
        targeting: `
          The earth shakes in a \\largearea radius \\glossterm{zone} from your location.
          When you cast this spell, and during your next action, make an attack vs. Reflex and Brawn against everything in the area that is \\glossterm{grounded}.
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
        hit: `
          \\damagerankfive, and each target is \\glossterm{briefly} \\slowed.
          If a target loses \\glossterm{hit points} and it was already slowed by this ability, it is also swallowed by the earth as a \\glossterm{condition}.
          While it is swallowed by the earth, it does not have \\glossterm{line of sight} or \\glossterm{line of effect} to any creature other than itself.
          During each of your subsequent actions, it takes \\damagerankfive as the earth grinds it into paste.

          A creature swallowed by the arth can remove this condition by making a \\glossterm{difficulty value} 12 Strength check as a standard action.
          If the earth or stone it is swallowed by is destroyed or otherwise rendered unable to contain the creature, this effect ends.
          When the effect ends, the target reappears in the closest unoccupied space to where it was swallowed by the earth.
          Some effects such as teleportation can also remove the target from the fissure, which also ends the condition.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex and Brawn against all Large or smaller \\glossterm{grounded} \\glossterm{enemies} in a \\smallarea radius in \\shortrange.
        `,
      },
      roles: ['maim'],
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
          As a \\glossterm{condition}, each target is pulled towards the ground with great force, approximately doubling the gravity it experiences.
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
          you gain a +2 accuracy bonus for each weight category by which each target is heavier than Medium. 
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
          as part of the same condition, each target is also \\slowed while it is below its maximum \\glossterm{hit points}.
          At the start of each round, a target can make a DV 10 Strength check.
          Success means that it stops being slowed during that round.
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
          Each target is \\glossterm{briefly} \\slowed.
        `,
        targeting: `
          You create an area of intense gravity in a \\medarea radius \\glossterm{zone} within \\medrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Brawn against all \\glossterm{enemies} in the area.
        `,
      },
      rank: 7,
      roles: ['hazard', 'softener'],
      scaling: 'accuracy',
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Earthen Fortification',

      effect: `
        You construct a fortification made of packed earth within \\medrange.
        This takes the form of up to ten contiguous 5-foot squares, each of which is four inches thick.
        The squares can be placed at any angle and used to form any structure as long as that structure is stable.
        Since the fortifications are made of packed earth, their maximum weight is limited, and structures taller than ten feet high are usually impossible.
        A typical Large wall made of earth has 50 hit points, 5 damage resistance, and a Sunder DV of 15.

        The fortifications form slowly, rather than instantly.
        The structure becomes complete at the end of the next round after this spell is cast.
        This makes it difficult to trap creatures within structures formed.
      `,
      rank: 4,
      scaling: {
        6: `
          You can also construct fortifications from stone.
          This makes them more resistant to attack and allows the construction of more complex structures.
          A typical Large wall made of stone has 50 hit points, 10 damage resistance, and a Sunder DV of 20.
        `,
      },
      roles: ['hazard'],
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Earthglide',

      effect: `
        You gain a slow \\glossterm{burrow speed}.
        This does not allow you to breathe while inside the earth, so your ability to traverse long distances may be limited.
      `,
      rank: 3,
      roles: ['narrative'],
      type: 'Sustain (attuneable, standard)',
    },

    {
      name: 'Rapid Earthglide',

      effect: `
        You gain an average \\glossterm{burrow speed}.
        This does not allow you to breathe while inside the earth, so your ability to traverse long distances may be limited.
      `,
      rank: 6,
      roles: ['attune'],
      type: 'Sustain (attuneable, standard)',
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
      type: 'Sustain (attuneable, standard)',
    },

    {
      name: 'Stoneskin',

      effect: `
        You gain a +6 \\glossterm{enhancement bonus} to your maximum \\glossterm{damage resistance}.
        However, you also increase your \\glossterm{encumbrance} by 2.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: `The bonus increases to +12.`,
        5: `The bonus increases to +24.`,
        7: `The bonus increases to +48.`,
      },
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Steelskin',

      effect: `
        At the start of each round, if you are at your maximum \\glossterm{damage resistance}, you become \\steeled during that round.
      `,
      rank: 2,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Volcano',

      // treat as short range med radius, which is a t3 area
      attack: {
        hit: `\\damagerankone.`,
        missGlance: true,
        targeting: `
          You create a volcano at a \\glossterm{grounded} location within \\shortrange.
          The area affected by the volcano increases over time.
          It affects a \\smallarea radius \\glossterm{zone} in the first round, a \\medarea radius in the second round, and a \\largearea radius in all subsequent rounds.
          Any effect which increases or changes this spell's area affects all of its areas equally, not just the area in the first round.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against everything in the area.
        `,
      },
      narrative: `
        You create a small volcano that showers everything nearby in burning shrapnel.
      `,
      rank: 3,
      scaling: 'accuracy',
      roles: ['wildfire'],
      tags: ['Manifestation', 'Sustain (minor)'],
    },

    {
      name: 'Mighty Volcano',

      functionsLike: {
        name: 'volcano',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      narrative: `
        You create a small volcano that showers everything nearby in burning shrapnel.
      `,
      rank: 6,
      scaling: 'accuracy',
      roles: ['wildfire'],
      tags: ['Manifestation', 'Sustain (minor)'],
    },

    {
      name: 'Personal Gravitation',

      effect: `
        Once per phase, while you are within 5 feet of an \\glossterm{unattended} object at least one size category larger than you, you can adjust your personal gravity as a \\glossterm{free action}.
        When you do, gravity pulls you towards that object instead of in the normal direction.
        This allows you to walk normally on walls or even ceilings.

        Whenever you change the direction that gravity pulls you, you must make a \\glossterm{difficulty value} 10 Balance check to keep your feet.
        Failure means you fall \\prone and your movement for that phase ends.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Distant Personal Gravitation',

      functionsLike: {
        name: 'personal gravitation',
        exceptThat: 'the maximum distance from you to the object increases to 30 feet. This can cause you to take \\glossterm{falling damage}.',
      },
      rank: 6,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Stonefist',

      // +2 over a normal weapon
      effect: `
        You gain a stonefist \\glossterm{natural weapon} that replaces one of your \\glossterm{free hands}.
        The weapon deals 1d10 bludgeoning damage and has the \\weapontag{Impact} and \\weapontag{Resonating} weapon tags (see \\pcref{Weapon Tags}).
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
        exceptThat:
          'the damage dealt by the weapon increases to 2d6, and it gains the \\weapontag{Impact} weapon tag (see \\pcref{Weapon Tags}).',
      },
      rank: 6,
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
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Massive Wall of Stone',

      // +3r for small -> large, +1r for short -> med
      cost: BARRIER_COOLDOWN,
      functionsLike: {
        name: 'wall of force',
        exceptThat: 'the area increases to a \\largearealong wall within \\medrange, and its hit points increase to five times your \\glossterm{power}.',
      },
      rank: 6,
      roles: ['hazard'],
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Desperate Stoneskin',

      effect: `
        Whenever you use the \\ability{total defense} or \\ability{recover} ability, you can activate this ability.
        If you do, your body becomes covered in stone for the rest of the round, and this ability ends.
        This makes you \\fortified and \\steeled.
        This is a \\atSwift effect, so it protects you from attacks during the current phase.
      `,
      rank: 1,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },
    {
      name: 'Tremorsense',

      effect: `
        You gain \\trait{tremorsense} with a 60 foot range, allowing you to sense your surroundings without light (see \\pcref{Tremorsense}).
        If you already have tremorsense, the range of your tremorsense increases by 60 feet.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Tremorsight',

      effect: `
        You gain \\trait{tremorsight} with a 30 foot range, allowing you to see your surroundings without light (see \\pcref{Tremorsight}).
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

        This spell creates up to two weapons, suits of body armor, or shields from a body of earth or stone within 5 feet of you.
        The body targeted must be at least as large as the largest item you create.
        You can create any weapon, shield, or body armor that you are proficient with, and which would normally be made of metal.
        It is sized appropriately for the target, up to a maximum of a Medium size item.
        The items appear in your hand or on the ground at your feet.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        2: `
          If you create body armor or a weapon, it can be created from any special material other than cold iron, dragonscale, and dragonfang (see \\pcref{Armor Special Materials}, and \\pcref{Weapon Special Materials}).
          The item's rank cannot exceed your spellcasting rank with this spell.
        `,
      },
      type: 'Attune (target)',
    },
  ],
});
