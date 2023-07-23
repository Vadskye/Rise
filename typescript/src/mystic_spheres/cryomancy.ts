import { MysticSphere } from '.';
import { CONDITION_CRIT } from './constants';

export const cryomancy: MysticSphere = {
  name: 'Cryomancy',
  hasImage: true,
  shortDescription: 'Drain heat to injure and freeze foes.',
  sources: ['arcane', 'nature', 'pact'],
  // In general, creating icy terrain is treated as having an area tier that is one
  // higher for area spells.
  // For single target spells, target's space + adjacent spaces is a t0.5 condition.
  specialRules: `
    Some spells from this mystic sphere can create icy terrain.
    \\spheredef{icy terrain} Icy terrain is covered in ice, making it hard to traverse.
    When an area becomes icy terrain, all water and solid ground in the area becomes covered in a layer of solid ice.
    This allows creatures to walk on ice-covered water.
    At the GM's discretion, water-like liquids may also become icy terrain, or they may be unaffected.
    The ice is similar to natural ice, but since it was created recently by a spell, the effects of icy terrain do not have as much variance as natural terrain.

    Icy terrain requires a DV 5 Balance check to move at full speed, so most creatures can move at half speed even if they are untrained (see \\pcref{Balance}).
    When a Large or smaller creature takes physical damage while on icy terrain, it must make a DV 5 Balance check to avoid falling \\prone.
    At the GM's discretion, icy terrain may have additional effects in specific circumstances, such as on steep slopes.

    If an area of icy terrain takes any fire damage, it is destroyed and becomes normal ground or water again.
  `,

  cantrips: [
    {
      name: 'Chill',

      attack: {
        hit: `
          2 cold damage.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      scaling: {
        2: 'The damage increases to 5.',
        4: 'The damage increases to 10.',
        6: 'The damage increases to 20.',
      },
    },
    {
      name: 'Chill Air',

      effect: `
        The temperatuture of the air within a \\areamed radius \\glossterm{emanation} from you is reduced by an amount of your choice, to a maximum reduction of 20 degrees Fahrenheit.
        You cannot reduce the temperature below 0 degrees in this way.
        This typically imposes no direct penalties on other creatures, but it may make them more or less comfortable depending on their preferred temperature.

        This ability lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
      `,
      scaling: {
        3: 'You can choose to affect a \\largearea radius instead, and the maximum temperature change increases to 30 degrees.',
        5: 'You can choose to affect a \\hugearea radius instead, and the maximum temperature change increases to 40 degrees.',
        7: 'You can choose to affect a \\gargarea radius instead, and the maximum temperature change increases to 50 degrees.',
      },
    },
  ],
  spells: [
    {
      name: 'Freezing Grasp',

      // -2 ranks for delayed onset
      attack: {
        hit: `
          \\damagerankone{cold}.
          If it loses hit points, it slowly begins freezing as a \\glossterm{condition}.
          After your action next round, it becomes \\slowed.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Reflex against something you \\glossterm{touch}.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Intense Freezing Grasp',

      attack: {
        hit: `
          \\damagerankfour{cold}.
          If it takes damage, it is \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Reflex against something you \\glossterm{touch}.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Cone of Cold',

      // d1l instead of d1 for icy terrain
      attack: {
        hit: `\\damagerankonelow{cold}.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\smallarea cone from you.
          In addition, the area \\glossterm{briefly} becomes \\sphereterm{icy terrain}.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Massive Cone of Cold',

      // 2 ranks for larger area, 1 rank for icy terrain
      attack: {
        hit: `\\damagerankthree{cold}.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\largearea cone from you.
          In addition, all water and ground in the area \\glossterm{briefly} becomes \\sphereterm{icy terrain}.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Frozen Legs',

      // -3r for removed if damaged, for a total of r+5
      attack: {
        hit: `
          \\damagerankfive{cold}.
          If it loses \\glossterm{hit points} from this damage, it is \\immobilized as a \\glossterm{condition}.
          This condition is automatically removed if the target takes damage.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
          You gain a +2 accuracy bonus if the target is standing or swimming in water.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Icicle',

      attack: {
        hit: `
          \\damagerankthree{piercing and cold}.
          If the target loses \\glossterm{hit points}, is Large or smaller, and is on \\sphereterm{icy terrain}, it falls \\prone.
        `,
        targeting: `
          Make an attack vs. Armor and Fortitude against anything within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Icicle',

      attack: {
        hit: `
          \\damageranksix{piercing and cold}.
          If the target loses \\glossterm{hit points}, is Large or smaller, and is on \\sphereterm{icy terrain}, it falls \\prone.
        `,
        targeting: `
          Make an attack vs. Armor and Fortitude against anything within \\medrange.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Freeze Poison',

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        1 cold damage.
        In addition, it gains an additional success to resist a poison currently affecting it (see \\pcref{Poison}).
      `,
      rank: 1,
      scaling: {
        3: `The number of additional successes increases to two.
            The target can split these successes among any number of different poisons affecting it.`,
        5: `The number of additional successes increases to three.`,
        7: `The number of additional successes increases to four.`,
      },
    },

    {
      name: 'Skate',

      effect: `
        You can move on top of water as if it were land.
        This also works on other liquids that can be frozen like water.
        In addition, you move at double speed on \\sphereterm{icy terrain}.
      `,
      rank: 2,
      type: 'Attune',
    },

    {
      name: 'Mass Skate',

      functionsLike: {
        mass: true,
        name: 'Skate',
      },
      // narrative: '',
      rank: 4,
      type: 'Attune (target)',
    },

    {
      name: 'Skyskate',

      effect: `
        Whenever you move using your land speed, you can leave a trail of ice behind you.
        The ice lasts \\glossterm{briefly} before disappearing.

        While you are leaving a trail of ice behind you, you can move into thin air by walking on your own ice trail, just as if it was solid ground.
        If you are still standing on your own ice trail when it disappears, you fall.

        Creatures following closely behind you while you move may also be able to use your ice trail.
        However, most Large or larger creatures will break the ice trail if they step onto it, which may cause both of you to fall.
      `,
      rank: 4,
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Icy Shell',

      effect: `
        You cover your body with two layers of ice that crumple when they take damage.
        The ice does not cover your joints, allowing you to move freely.
        Whenever you would take physical damage or fire damage, you reduce that damage by 5, and one layer of ice is destroyed.
        When the last layer of ice is destroyed, this ability provides no further benefit.

        If you take simultaneous damage from more sources than you have remaining layers, the remaining layers apply to the largest damage sources, and you take full damage from any lower damage values.
      `,
      rank: 1,
      scaling: {
        3: `The damage reduction increases to 10.`,
        5: `The damage reduction increases to 20.`,
        7: `The damage reduction increases to 40.`,
      },
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Frostbite',

      attack: {
        hit: `
          \\damagerankthreehigh{cold}.
          If it takes damage, its \\glossterm{space} and all squares adjacent to it \\glossterm{briefly} become \\sphereterm{icy terrain}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },

      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Frostbite',

      attack: {
        hit: `
          \\damageranksevenhigh{cold}.
          If it takes damage, its \\glossterm{space} and all squares adjacent to it \\glossterm{briefly} become \\sphereterm{icy terrain}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
    },

    {
      name: 'Hailstorm',

      attack: {
        hit: `
          \\damagerankthree{bludgeoning and cold}.
          If a target loses \\glossterm{hit points}, is Large or smaller, and is on \\sphereterm{icy terrain}, it falls \\prone.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor and Fortitude against everything in a \\smallarea radius within \\medrange.
        `,
      },

      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Massive Hailstorm',

      attack: {
        hit: `
          \\damageranksix{bludgeoning and cold}.
          If a target loses \\glossterm{hit points}, is Large or smaller, and is on \\sphereterm{icy terrain}, it falls \\prone.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor and Fortitude against everything in a \\largearea radius within \\longrange.
        `,
      },

      rank: 6,
      // scaling: 'accuracy',
    },

    {
      name: 'Frigid Nova',

      // +1r for icy terrain
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target with no remaining \\glossterm{damage resistance} becomes \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\smallarea radius from you.
          In addition, the area \\glossterm{briefly} becomes \\sphereterm{icy terrain}.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Massive Frigid Nova',

      // +1r for icy terrain
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target with no remaining \\glossterm{damage resistance} becomes \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\hugearea radius from you.
          In addition, the area \\glossterm{briefly} becomes \\sphereterm{icy terrain}.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Icecraft',

      effect: `
        Choose one pool of \\glossterm{unattended}, nonmagical water within \\shortrange.
        This spell creates one or two weapons, suits of body armor, or shields from the target pool of water.
        You can create any weapon, shield, or body armor that you are proficient with, and which would normally be made of metal.
        It is sized appropriately for you, up to a maximum of a Medium size item.
        The pool of water targeted must be at least as large as the largest item you create.

        If you create body armor or a weapon, it can be created from any metallic special material other than cold iron.
        The item's rank cannot exceed your spellcasting rank with this spell, including any modifiers from special materials.

        An item created with this spell functions like a normal item of its type, with three exceptions.
        First, any \\glossterm{strikes} that you make with a weapon created with this ability are \\magical abilities, so you use your \\glossterm{magical power} to determine your damage instead of your \\glossterm{mundane power} (see \\pcref{Power}).
        Second, while wearing body armor from this spell, you are \\trait{impervious} to fire damage.
        Third, whenever you lose \\glossterm{hit points} from fire damage, all items you made with this ability disappear.
        They reappear at the end of the next round.
      `,
      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Frost Breath',

      attack: {
        // icy terrain for attune + every other round
        hit: `
          \\damagerankone{cold}.
        `,
        missGlance: true,
        targeting: `
          For the duration of this spell, you can breathe cold like a dragon as a standard action.
          When you do, make an attack vs. Fortitude against everything in a \\largearea cone from you.
          In addition, the area \\glossterm{briefly} becomes \\sphereterm{icy terrain}.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      type: 'Attune',
    },

    {
      name: 'Mighty Frost Breath',

      functionsLike: {
        name: 'frost breath',
        exceptThat: `
          the damage increases to \\damagerankfive{cold}.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      type: 'Attune',
    },

    {
      name: 'Icicle Carapace',

      // original targets: ['Yourself', 'See text']
      attack: {
        hit: `\\damagerankfour{piercing and cold}.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-Long weapon, make a \\glossterm{reactive attack} vs. Armor and Fortitude against them.
        `,
      },

      rank: 3,
      scaling: 'accuracy',
      type: 'Attune (deep)',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Icicle Carapace',

      attack: {
        hit: `\\damagerankseven{piercing and cold}.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-Long weapon, make a \\glossterm{reactive attack} vs. Armor and Fortitude against them.
        `,
      },

      rank: 6,
      // scaling: "accuracy",
      type: 'Attune (deep)',
      tags: ['Manifestation'],
    },

    {
      name: 'Chillwind Dash',

      effect: `
        You teleport into an unoccupied destination on a stable surface within \\shortrange.
        In addition, everything in a 5 ft.\\ wide line between your starting location and your ending location \\glossterm{briefly} becomes \\sphereterm{icy terrain}.
      `,
      rank: 3,
      scaling: {
        5: 'The range increases to \\medrange.',
        7: 'The range increases to \\distrange.',
      },
    },

    {
      name: 'Bonechill',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          If the target has no remaining \\glossterm{damage resistance}, it becomes \\immobilized as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 7,
    },

    {
      name: 'Icefield',

      // treat persistent icy terrain as a r1 debuff
      effect: `
        A \\medarea radius \\glossterm{zone} centered on you becomes \\sphereterm{icy terrain}.
      `,
      rank: 1,
      scaling: {
        3: 'You can choose to create a \\largearea radius instead.',
        5: 'You can choose to create a \\hugearea radius instead.',
        7: 'You can choose to create a \\gargarea radius instead.',
      },
      tags: ['Sustain (attuneable, minor)'],
    },
    {
      name: 'Wall of Ice',

      effect: `
        You create a \\smallarealong \\glossterm{wall} of magical energy within \\medrange.
        The wall is visible as a wall of smooth, clear ice that does not block sight.
        Nothing can pass through the wall until it is destroyed.

        The wall has \\glossterm{hit points} equal to your \\glossterm{power}.
        If it is destroyed, it automatically reforms at the end of the next round, ignoring any occupied spaces that would block the wall from reforming.

        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
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
    // TODO: unclear rank
    {
      name: 'Ice Globe',

      effect: `
        You create a sphere of ice in a \\smallarea sphere within \\medrange.
        The sphere fails to form in any occupied space, but its walls fill in the space as much as possible.
        It is visible as smooth, clear ice that does not block sight.
        Nothing can pass through the sphere until it is destroyed.

        The sphere as a whole has \\glossterm{hit points} equal to your \\glossterm{power}.
        If it is destroyed, it automatically reforms at the end of the next round, ignoring any occupied spaces that would block the wall from reforming.

        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 4,
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Cryostrike',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        Damage dealt by the strike is cold damage in addition to its normal damage types.
        If your attack result beats a target's Fortitude defense, the strike deals 1d6 \\glossterm{extra damage} per four \\glossterm{power} (minimum 1d6).
      `,
      rank: 3,
      scaling: 'accuracy',
      tags: [],
    },
    {
      name: 'Cryostrike+',

      functionsLike: {
        name: 'cryostrike',
        exceptThat: 'the extra damage increases to 1d8 per 2 power.',
      },
      rank: 7,
      // scaling: 'accuracy',
      tags: [],
    },
    {
      name: 'Chilling Strike',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        Damage dealt by the strike is cold damage in addition to its normal damage types.
        Each damaged creature is \\slowed as a \\glossterm{condition}.
      `,
      rank: 5,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Chilling Aura',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is chilled as a \\glossterm{condition}.
          While it is below its maximum hit points, it is \\slowed.
        `,
        targeting: `
          Whenever an \\glossterm{enemy} enters a \\medarea radius \\glossterm{emanation} from you, make a \\glossterm{reactive attack} vs. Fortitude against them.
          After you attack a creature this way, it becomes immune to this attack from you until it finishes a \\glossterm{short rest}.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: [],
      type: 'Attune (deep)',
    },

    {
      name: 'Freezing Aura',

      functionsLike: {
        name: 'chilling aura',
        exceptThat: 'affected creatures become slowed even if they are at full hit points.',
      },
      rank: 6,
      scaling: 'accuracy',
      tags: [],
      type: 'Attune (deep)',
    },
  ],
  rituals: [
    {
      name: 'Cold Tolerance',

      castingTime: 'one minute',
      effect: `
        Choose either yourself or an \\glossterm{ally} or unattended object within \\medrange.
        The target suffers no harm from being in a cold environment.
        It can exist comfortably in conditions as low as -50 degrees Fahrenheit.
        Its equipment, if any, is also protected.
        This does not protect the target from cold damage.
      `,
      rank: 1,
      type: 'Attune',
    },
    {
      name: 'Frostfall',

      castingTime: 'one hour',
      effect: `
        The temperature in a two mile radius cylinder-shaped \\glossterm{zone} from your location decreases rapidly.
        Over the next minute after you finish this ritual, the temperature decreases by 40 degrees Fahrenheit, to a minimum of \\minus30 degrees.
        Unlike normal, this effect does not require \\glossterm{line of effect} to you.
        Instead, it affects all outdoor locations within the area.
        Even a thin barrier, such as a tent, is enough to protect locations from the effect of this ritual.
      `,
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Froststorm',

      castingTime: 'one hour',
      functionsLike: {
        exceptThat: `
          the temperature in the area decreases by 60 degrees, to a minimum of \\minus70 degrees.
        `,
        name: 'frostfall',
      },
      rank: 7,
      type: 'Attune',
    },
  ],
};
