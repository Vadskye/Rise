import { MysticSphere } from '.';
import { add_tag_to_sphere } from './add_tag';
import { BARRIER_COOLDOWN, CONDITION_CRIT, SWIFT_FATIGUE } from './constants';

export const cryomancy: MysticSphere = add_tag_to_sphere('Cold', {
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

    Creatures with a Large or lighter weight category can walk on ice-covered water.
    At the GM's discretion, water-like liquids may also become icy terrain, or they may be unaffected.
    The ice is similar to natural ice, but since it was created recently by a spell, the effects of icy terrain do not have as much variance as natural terrain.

    Icy terrain requires a DV 5 Balance check to move at full speed, so most creatures can move at half speed even if they are untrained (see \\pcref{Balance}).
    When a Large or smaller creature takes damage from a non-\\atCold ability while on icy terrain, it must make a DV 5 Balance check to avoid falling \\prone.
    Any individual creature only has to make this check once per \\glossterm{phase}.
    At the GM's discretion, icy terrain may have additional effects in specific circumstances, such as on steep slopes.

    If a 5-foot square of icy terrain takes any damage from a \\atFire ability, it is destroyed and becomes normal ground or water again.
    Ice covering solid ground can't be damaged by non-Fire abilities, but ice covering water is destroyed if it takes any damage.
  `,

  cantrips: [
    {
      name: 'Chill',

      attack: {
        hit: `
          The target takes damage equal to your \\glossterm{power}.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.
        `,
      },
      roles: ['burst'],
    },
    {
      name: 'Chill Air',

      effect: `
        The temperatuture of the air within a \\largearea radius \\glossterm{emanation} from you is reduced by an amount of your choice, to a maximum reduction of 20 degrees Fahrenheit.
        You cannot reduce the temperature below 0 degrees in this way.
        This typically imposes no direct penalties on other creatures, but it may make them more or less comfortable depending on their preferred temperature.
      `,
      roles: ['narrative'],
      scaling: {
        2: 'The maximum temperature change increases to 25 degrees.',
        4: 'The area increases to a \\hugearea radius.',
        6: 'The maximum temperature change increases to 30 degrees.',
      },
      type: 'Attune',
    },
  ],
  spells: [
    {
      name: 'Thick Ice',

      effect: `
        All \\glossterm{icy terrain} created by your abilities must be damaged three times before it is destroyed, rather than only once.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Slick Ice',

      effect: `
        The \\glossterm{difficulty value} to move or stay standing on \\glossterm{icy terrain} created by your abilities increases by 3.
      `,
      rank: 5,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Freezing Grasp',

      // -2 ranks for delayed onset, which is particularly punishing if they already have
      // to lose HP.
      attack: {
        hit: `
          \\damagerankone.
          If the target loses hit points, it slowly begins freezing as a \\glossterm{condition}.
          After your action next round, it becomes \\slowed.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against something you \\glossterm{touch}.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Intense Freezing Grasp',

      attack: {
        hit: `
          \\damagerankfour.
          If the target takes damage, it becomes \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against something you \\glossterm{touch}.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Cone of Cold',

      // This is cheating a bit to get icy terrain
      attack: {
        hit: `\\damagerankone.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\smallarea cone from you.
          The area \\glossterm{briefly} becomes \\sphereterm{icy terrain}.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Massive Cone of Cold',

      // 2 ranks for larger area, 1 rank for icy terrain
      attack: {
        hit: `\\damagerankthree.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\largearea cone from you.
          The area \\glossterm{briefly} becomes \\sphereterm{icy terrain}.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    // {
    //   name: 'Frozen Legs',

    //   // -3r for removed if damaged, for a total of r+5
    //   attack: {
    //     hit: `
    //       \\damagerankfive.
    //       If the target loses \\glossterm{hit points}, it becomes \\immobilized as a \\glossterm{condition}.
    //       This condition is automatically removed if the target takes damage.
    //     `,
    //     targeting: `
    //       Make an attack vs. Fortitude against one creature within \\shortrange.
    //       You gain a +2 accuracy bonus if the target is standing or swimming in water.
    //     `,
    //   },
    //   rank: 6,
    //   scaling: 'accuracy',
    // },

    {
      name: 'Icicle',

      attack: {
        hit: `
          \\damagerankthree.
          If the target loses \\glossterm{hit points}, is Large or smaller, and is on \\sphereterm{icy terrain}, it falls \\prone.
        `,
        targeting: `
          Make an attack vs. Armor and Fortitude against something within \\medrange.
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
          \\damageranksix.
          If the target loses \\glossterm{hit points}, is Large or smaller, and is on \\sphereterm{icy terrain}, it falls \\prone.
        `,
        targeting: `
          Make an attack vs. Armor and Fortitude against something within \\medrange.
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
        1 damage.
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
    roles: ['attune'],
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
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Skyskate',

      effect: `
        Whenever you move using your \\glossterm{walk speed}, you can leave a trail of ice behind you.
        The ice lasts \\glossterm{briefly} before disappearing.

        While you are leaving a trail of ice behind you, you can move into thin air by walking on your own ice trail, just as if it was solid ground.
        If you are still standing on your own ice trail when it disappears, you fall.

        Creatures following closely behind you while you move may also be able to use your ice trail.
        However, most Large or larger creatures will break the ice trail if they step onto it, which may cause both of you to fall.
      `,
      rank: 4,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Icy Shell',

      effect: `
        You are \\steeled.
        At the end of each round, if you have no remaining \\glossterm{damage resistance}, this effect ends.
      `,
      narrative: 'Layers of ice form around you, crumpling to protect you from catastrophic injury.',
      rank: 2,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Frostbite',

      attack: {
        hit: `
          \\damagerankthree.
          If the target takes damage, its \\glossterm{space} and all squares adjacent to it \\glossterm{briefly} become \\sphereterm{icy terrain}.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.
        `,
      },

      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Frostbite',

      attack: {
        hit: `
          \\damagerankseven.
          If the target takes damage, its \\glossterm{space} and all squares adjacent to it \\glossterm{briefly} become \\sphereterm{icy terrain}.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
    },

    {
      name: 'Hailstorm',

      attack: {
        hit: `
          \\damagerankthree.
          If a target loses \\glossterm{hit points}, is Large or smaller, and is on \\sphereterm{icy terrain}, it falls \\prone.
        `,
        miss: `
          Half damage, and the target is not knocked prone.
        `,
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
          \\damageranksix.
          If a target loses \\glossterm{hit points}, is Large or smaller, and is on \\sphereterm{icy terrain}, it falls \\prone.
        `,
        miss: `
          Half damage, and the target is not knocked prone.
        `,
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
        This spell creates up to two weapons, suits of body armor, or shields from the target pool of water.
        You can create any weapon, shield, or body armor that you are proficient with, and which would normally be made of metal.
        It is sized appropriately for you, up to a maximum of a Medium size item.
        The pool of water targeted must be at least as large as the largest item you create.

        An item created with this spell functions like a normal item of its type, with three exceptions.
        First, any \\glossterm{strikes} made with a weapon created with this ability have the \\atCold tag.
        Second, any creature wearing body armor created with this ability is \\impervious to \\atFire attacks.
        Third, whenever a creature using items from this ability loses \\glossterm{hit points} from a \\atFire attack, all of the items they are holding from this ability disappear.
        The items reappear at the end of the next round.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        2: `
          If you create body armor or a weapon, it can be created from any metallic special material other than cold iron and dragonscale.
          The item's rank cannot exceed your spellcasting rank with this spell.
        `,
      },
      type: 'Attune',
    },

    {
      name: 'Frost Breath',

      attack: {
        // icy terrain for attune + every other round
        hit: `
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          For the duration of this spell, you can breathe cold like a dragon as a standard action.
          When you do, make an attack vs. Fortitude against everything in a \\largearea cone from you.
          In addition, the area \\glossterm{briefly} becomes \\sphereterm{icy terrain}.
          After you breathe cold, you \\glossterm{briefly} cannot do so again.
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
          the damage increases to \\damagerankfive.
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
        hit: `\\damagerankfour.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-Long weapon, make a \\glossterm{reactive attack} vs. Armor and Fortitude against them.
        `,
      },

      rank: 3,
      roles: ['attune'],
      scaling: 'accuracy',
      type: 'Attune (deep)',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Icicle Carapace',

      attack: {
        hit: `\\damagerankseven.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-Long weapon, make a \\glossterm{reactive attack} vs. Armor and Fortitude against them.
        `,
      },

      rank: 6,
      roles: ['attune'],
      // scaling: "accuracy",
      type: 'Attune (deep)',
      tags: ['Manifestation'],
    },

    {
      name: 'Chillwind Dash',

      cost: SWIFT_FATIGUE,
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

    // {
    //   name: 'Bonechill',

    //   attack: {
    //     hit: `
    //       \\damageranksix.
    //       If the target loses \\glossterm{hit points}, it is \\immobilized as a \\glossterm{condition}.
    //     `,
    //     targeting: `
    //       Make an attack vs. Fortitude against one creature within \\shortrange.
    //     `,
    //   },
    //   rank: 7,
    // },

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

      cost: BARRIER_COOLDOWN,
      effect: `
        You create a \\smallarealong \\glossterm{wall} of magical energy within \\medrange.
        The wall is visible as a wall of smooth, clear ice that does not block sight.
        Nothing can pass through the wall until it is destroyed.

        The wall has \\glossterm{hit points} equal to your \\glossterm{power}.
        If it is destroyed, it automatically reforms at the end of the next round, ignoring any occupied spaces that would block the wall from reforming.
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

      cost: BARRIER_COOLDOWN,
      effect: `
        You create a sphere of ice in a \\smallarea sphere within \\medrange.
        The sphere fails to form in any occupied space, but its walls fill in the space as much as possible.
        It is visible as smooth, clear ice that does not block sight.
        Nothing can pass through the sphere until it is destroyed.

        The sphere as a whole has \\glossterm{hit points} equal to your \\glossterm{power}.
        If it is destroyed, it automatically reforms at the end of the next round, ignoring any occupied spaces that would block the wall from reforming.
      `,
      rank: 4,
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Cryostrike',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        If the target loses hit points, it becomes \\slowed as a \\glossterm{condition}.
      `,
      rank: 2,
      scaling: 'accuracy',
      tags: [],
    },
    {
      name: 'Mighty Cryostrike',

      // TODO: damage math
      functionsLike: {
        name: 'cryostrike',
        exceptThat: `
          if your attack result beats the target's Fortitude defense, the strike deals \\glossterm{extra damage} equal to your \\glossterm{power}.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: [],
    },
    {
      name: 'Mighty Cryostrike+',

      functionsLike: {
        name: 'cryostrike',
        exceptThat: `
          the strike deals double damage.
          In addition, if your attack result beats the target's Fortitude defense, the strike deals \\glossterm{extra damage} equal to 1d8 per 2 power.
        `,
      },
      rank: 7,
      // scaling: 'accuracy',
      tags: [],
    },
    {
      name: 'Efficient Cryostrike',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike} that deals double damage.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        If the target takes damage and your attack also hits its Fortitude defense, it becomes \\slowed as a condition.
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
});
