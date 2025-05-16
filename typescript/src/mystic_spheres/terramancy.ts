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

      // +1r for +1acc
      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          Make an attack vs. Armor against something within \\shortrange.
          You gain a +2 \\glossterm{accuracy} bonus if you are \\glossterm{grounded} on stone.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Rock Throw',

      attack: {
        hit: `\\damagerankfour.`,
        targeting: `
          Make an attack vs. Armor against something within \\shortrange.
          You gain a +2 accuracy bonus if you are \\glossterm{grounded} on stone.
        `,
      },
      rank: 4,
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
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Meteor',

      // +2r for delay, +1r for open area requirement, so effective rank 7.
      // That allows a t3.5 area and dr6; this uses a t4 area.
      attack: {
        hit: `\\damageranksix.`,
        missGlance: true,
        targeting: `
          When you cast this spell, you choose a \\medarea radius within \\medrange.
          A meteor appears high in the sky over that area, falling down towards it.
          During your next action, the meteor crashes into your chosen area, and you make an attack vs. Armor against everything in the area.
          If there is not at least fifty feet of open space above your chosen area, this spell fails with no effect.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Meteor Swarm',

      functionsLike: {
        name: 'meteor',
        exceptThat: `
          you can choose up to four separate areas within \\distrange, creating one meteor per area.
          In addition, the damage increases to \\damageranknine.
          Any individual creature can only be attacked by one meteor, even if it occupies multiple areas, and overlapping the areas has no benefit.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Fall to Earth',

      // +1r for acc and very circumstantial HP effect
      attack: {
        hit: `
          \\damageranktwo.
          If the target loses \\glossterm{hit points}, it cannot use any \\glossterm{fly speed} or \\glossterm{glide speed} as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Brawn against something within \\medrange.
          You gain a +1 accuracy bonus for each weight category by which the target is heavier than Medium.
          This accuracy bonus is doubled if the target is not \\glossterm{grounded}.
        `,
      },
      narrative: `
        The bigger they are, the more heavily gravity pulls them to the ground.
      `,
      rank: 3,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Crushing Gravity',

      // +1r for acc alone, which is more powerful at higher levels
      attack: {
        hit: `
          \\damagerankfive.
        `,
        targeting: `
          Make an attack vs. Brawn against a \\glossterm{grounded} creature or object within \\shortrange.
          You gain a +1 accuracy bonus for each weight category by which the target is heavier than Medium.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Rockshard Blast',

      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor and Reflex against everything in a \\smallarea cone from you.
          You gain a +2 accuracy bonus if you are \\glossterm{grounded} on stone.
        `,
      },
      rank: 1,
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
      rank: 3,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Earthspike',

      attack: {
        hit: `
          \\damagerankone.
          If the target loses \\glossterm{hit points}, it becomes \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Armor and Reflex against something within \\medrange that is \\glossterm{grounded}.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Penetrating Earthspike',

      attack: {
        hit: `
          \\damagerankfour.
          If the target loses \\glossterm{hit points}, it becomes \\immobilized as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Reflex against something within \\medrange that is \\glossterm{grounded}.
        `,
      },
      rank: 5,
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

      attack: {
        hit: `Each target is knocked \\prone.`,
        targeting: `
          Make an attack vs. Reflex against all Large or smaller \\glossterm{grounded} creatures in in a \\medarea cone from you.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Massive Rippling Earthwave',

      functionsLike: {
        name: 'rippling earthwave',
        exceptThat: 'the area increases to a \\hugearea cone.',
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Tremor',

      attack: {
        hit: `
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          The earth shakes in a \\medarea radius \\glossterm{zone} around you.
          When you cast this spell, and during your next action, make an attack vs. Reflex against everything in the area that is \\glossterm{grounded}.
        `,
      },
      narrative: `
        You crack the earth around you, shaking everyone violently.
      `,
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Earthquake',

      attack: {
        hit: `
          \\damagerankfive.
          If the target loses \\glossterm{hit points} from this damage and your attack also hits its Brawn defense, it falls \\prone.
        `,
        missGlance: true,
        targeting: `
          The earth shakes in a \\largearea radius \\glossterm{zone} around you.
          When you cast this spell, and during your next action, make an attack vs. Reflex against everything in the area that is \\glossterm{grounded}.
        `,
      },
      narrative: `
        You crack the earth around you, shaking everyone violently.
      `,
      rank: 7,
      scaling: 'accuracy',
    },

    {
      name: 'Swallowed by Earth',

      // Price as r3.75 condition??, -1r for grounded, -1r for range, +1r for acc
      attack: {
        hit: `
          If the target has no remaining \\glossterm{damage resistance}, it is swallowed by the earth as a \\glossterm{condition}.
          While it is swallowed by the earth, it is \\paralyzed and does not have \\glossterm{line of sight} or \\glossterm{line of effect} to any creature other than itself.
          During each of your subsequent actions, it takes \\damagerankfive as the earth grinds it into paste.
          If the earth or stone it is swallowed by is destroyed or otherwise rendered unable to contain the creature, this effect ends.
          Special movement abilities such as teleportation can also remove the target from the fissure.
        `,
        targeting: `
          Make an attack vs. Reflex against one Large or smaller \\glossterm{grounded} creature within \\shortrange.
          You gain a +2 \\glossterm{accuracy} bonus if the target is grounded on stone.
        `,
      },
      narrative: `
        You open up a rift in the ground that swallows and traps a foe.
      `,
      rank: 7,
    },

    {
      name: 'Earthbind',

      // treat as r1 condition.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, the target is pulled towards the ground with great force, approximately doubling the gravity it experiences.
          It is unable to use any fly speed or glide speed, and its jump distance is halved.
          All \\glossterm{falling damage} that it takes is doubled.
          Standing up from a prone position costs its full speed rather than only half its speed.
        `,
        targeting: `
          Make an attack vs. Brawn against one creature within \\medrange that is no more than 60 feet above a stable surface that could support its weight.
          You gain a +2 \\glossterm{accuracy} bonus if you are \\glossterm{grounded} on stone.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Intense Earthbind',

      functionsLike: {
        name: 'earthbind',
        exceptThat: `
          the target is also \\slowed as part of the same condition.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Quagmire',

      // TODO: define correct rank
      effect: `
        Choose a \\smallarea radius \\glossterm{zone} within \\medrange.
        All earth and stone in the area is softened into a thick sludge, creating a quagmire that is difficult to move through.
        The area becomes \\glossterm{difficult terrain}.

        This does not affect objects under structural stress, such as walls and support columns.
        Affected objects retain their own fundamental structural integrity and do not blend with other objects.
        When the spell ends, affected objects regain their original shape, suffering no damage from their time spent softened.
      `,
      rank: 4,
      scaling: {
        6: 'You can choose to affect a \\medarea radius instead.',
      },
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Earthen Fortification',

      effect: `
        You construct a fortification made of packed earth within \\medrange.
        This takes the form of up to ten contiguous 5-foot squares, each of which is four inches thick.
        The squares can be placed at any angle and used to form any structure as long as that structure is stable.
        Since the fortifications are made of packed earth, their maximum weight is limited, and structures taller than ten feet high are usually impossible.
        % TODO: define hit points and resistances of earth

        The fortifications form slowly, rather than instantly.
        The structure becomes complete at the end of the next round after this spell is cast.
        This makes it difficult to trap creatures within structures formed.
      `,
      rank: 4,
      // TODO: define hit points and resistances of stone
      scaling: {
        6: `You can also construct fortifications from stone.
            This makes them more resistant to attack and allows the construction of more complex structures.`,
      },
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
      name: 'Rocky Shell',

      effect: `
        You cover your body with two layers of rock that crumple when they take damage.
        The rock does not cover your joints, allowing you to move, though the shell increases your \\glossterm{encumbrance} by 2.
        Whenever you would take damage, you reduce that damage by 5, and one layer of rock is destroyed.
        When the last layer is destroyed, this ability ends.

        If you take simultaneous damage from more sources than you have remaining layers, the remaining layers apply to the largest damage sources, and you take full damage from any lower damage values.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: `The damage reduction increases to 10.`,
        5: `The damage reduction increases to 20.`,
        7: `The damage reduction increases to 40.`,
      },
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Volcano',

      // treat as short range med radius, which is a t3 area
      attack: {
        hit: `\\damagerankthree.`,
        missGlance: true,
        targeting: `
          You create a volcano at a \\glossterm{grounded} location within \\shortrange.
          The area affected by the volcano increases over time.
          It affects a \\smallarea radius \\glossterm{zone} in the first round, a \\medarea radius in the second round, and a \\largearea radius in all subsequent rounds.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against everything in the area.
        `,
      },
      narrative: `
        You create a small volcano that showers everything nearby in burning shrapnel.
      `,
      rank: 5,
      scaling: 'accuracy',
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

      cost: BARRIER_COOLDOWN,
      effect: `
        You create a \\smallarealong \\glossterm{wall} of stone within \\medrange.
        Every square of the wall must be \\glossterm{grounded}.
        Nothing can pass through the wall until it is destroyed.

        The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}, and is destroyed when its hit points become negative.
        If the entire wall is directly supported by stone, its hit points are doubled.
      `,
      rank: 1,
      scaling: {
        3: 'You can choose to create a \\medarealong wall instead.',
        5: 'You can choose to create a \\largearealong wall instead.',
        7: 'You can choose to create a \\hugearealong wall instead.',
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Desperate Stoneskin',

      effect: `
        Whenever you use the \\ability{total defense} or \\ability{recover} ability, you can activate this ability.
        If you do, your body becomes covered in stone for the rest of the round, and this ability ends.
        Whenever you would take damage while covered in this stone, you reduce that damage by an amount equal to your \\glossterm{power}.
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
