import { MysticSphere } from '.';
import { add_tag_to_sphere } from './add_tag';
import { BARRIER_COOLDOWN, CONDITION_CRIT, SWIFT_FATIGUE } from './constants';

const OPTIONAL_ICE_CRYSTAL = 'One optional \\glossterm{ice crystal}.';

export const cryomancy: MysticSphere = add_tag_to_sphere('Cold', {
  name: 'Cryomancy',
  hasImage: true,
  shortDescription: 'Drain heat to injure and freeze foes.',
  sources: ['arcane', 'nature', 'pact'],
  // Two modes for ice crystal spenders:
  // * Base spell is normal rank, ice crystal makes it +1 rank stronger (+2 accuracy)
  // * Base spell is -1 rank, ice crystal makes it +2 ranks stronger
  // Generating an ice crystal reduces a spell's rank by 1.
  specialRules: `
    Many spells from this mystic sphere become stronger if you spend ice crystals, and some spells generate ice crystals.
    You can normally have a maximum of three ice crystals.
    They grow on your body, but do not impede your movements or actions in any way.
    At the end of each round, if you did not gain or spend any ice crystals that round, one of your ice crystals melts.
  `,
  cantrips: [
    {
      name: 'Crystal Growth',

      effect: `
        If you have no \\glossterm{ice crystals}, you gain one ice crystal.
        If you have exactly one ice crystal, it does not melt this round.
      `,
      roles: ['ramp'],
    },
  ],
  spells: [
    {
      name: 'Freezing Grasp',

      // Melee HP slow is normally 1.5 EA. Drop to 1.0 EA for delay, since delay is
      // particularly punishing if they already have to lose HP. With damage, that's 2
      // EA, so rank 4, or rank 2 in melee.
      cost: OPTIONAL_ICE_CRYSTAL,
      attack: {
        hit: `
          \\damagerankthree.
          If the target loses hit points, it slowly begins freezing as a \\glossterm{condition}.
          After your action next round, it becomes \\slowed.
          If you spent an ice crystal, it becomes \\slowed immediately.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against something you \\glossterm{touch}.
        `,
      },
      rank: 3,
      roles: ['maim'],
      scaling: 'accuracy',
    },

    {
      name: 'Rapid Freezing Grasp',

      cost: OPTIONAL_ICE_CRYSTAL,
      attack: {
        hit: `
          \\damagerankfive.
          If the target loses hit points, it becomes \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against something you \\glossterm{touch}.
          If you spent an ice crystal, you gain a \\plus2 accuracy bonus with the attack.
        `,
      },
      rank: 5,
      roles: ['maim'],
      scaling: 'accuracy',
    },

    {
      name: 'Cone of Cold',

      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\smallarea cone from you.
          If you have no \\glossterm{ice crystals}, you gain an ice crystal.
        `,
      },
      rank: 1,
      roles: ['clear', 'generator'],
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Cone of Cold',

      attack: {
        hit: `\\damagerankfour.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\medarea cone from you.
          If you have no \\glossterm{ice crystals}, you gain an ice crystal.
        `,
      },
      rank: 5,
      roles: ['clear', 'generator'],
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

      cost: OPTIONAL_ICE_CRYSTAL,
      attack: {
        hit: `
          \\damageranktwo.
        `,
        targeting: `
          Make an attack vs. Armor and Fortitude against something within \\medrange.
          If you spent an \\glossterm{ice crystal}, you only need to hit the target's Armor defense.
        `,
      },
      rank: 1,
      roles: ['burst'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Icicle',

      cost: OPTIONAL_ICE_CRYSTAL,
      attack: {
        hit: `
          \\damagerankfive.
        `,
        targeting: `
          Make an attack vs. Armor and Fortitude against something within \\medrange.
          If you spent an \\glossterm{ice crystal}, you only need to hit the target's Armor defense.
        `,
      },
      rank: 4,
      roles: ['burst'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Skate',

      effect: `
        You can move on top of water as if it were land.
        This also works on other liquids that can be frozen like water.
        At the end of each round, if you are standing on a Medium or larger freezable liquid and have no \\glossterm{ice crystals}, you gain an ice crystal.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
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

      // Permanent shielded is 2 EA.
      // Assume that you have DR for ~50% of rounds, so this is worth 1 EA.
      effect: `
        You are \\shielded.
        At the end of each round, if you took damage from a \\atFire ability that round or have no remaining \\glossterm{damage resistance}, you can spend an \\glossterm{ice crystal}.
        If you do not, this ability is \\glossterm{dismisssed}.
      `,
      narrative: 'Layers of ice form around you, shielding you from attacks until they are destroyed.',
      rank: 3,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Enduring Icy Shell',

      // Permanent shielded is 2 EA.
      // Assume that you have DR for 3/5 of rounds, so this is worth 1.2 EA.
      effect: `
        You are \\shielded.
        At the end of each round, if you took damage from a \\atFire ability that round or have no remaining \\glossterm{damage resistance}, you can spend an \\glossterm{ice crystal}.
        If you do not, this effect is \\glossterm{suppressed}.
        Whenever you regain damage resistance, this effect is immediately resumed.
      `,
      narrative: 'Layers of ice form around you, shielding you from attacks until they are destroyed.',
      rank: 6,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Frostbite',

      // +1dr for delay, +1dr for short range
      attack: {
        hit: `
          The target feels a growing chill.
          During your next action, it takes \\damagerankfour.
          If any Medium or larger creatures lose \\glossterm{hit points} from this damage, you gain an \\glossterm{ice crystal}.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.
        `,
      },
      rank: 2,
      roles: ['burn', 'generator'],
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Frostbite',

      attack: {
        hit: `
          The target feels a growing chill.
          During your next action, it takes \\damagerankeight.
          If any Medium or larger creatures lose \\glossterm{hit points} from this damage, you gain an \\glossterm{ice crystal}.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.
        `,
      },
      rank: 6,
      roles: ['burn', 'generator'],
      scaling: 'accuracy',
    },

    {
      name: 'Hailstorm',

      // -2dr for large area, -1dr for repeated damage, +1dr for double defense
      cost: OPTIONAL_ICE_CRYSTAL,
      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: true,
        targeting: `
          Choose a \\smallarea radius within \\shortrange.
          When you cast this spell, and during your next action, make an attack vs. Armor and Fortitude against everything in the area.
          If you spent an \\glossterm{ice crystal}, you only need to hit each target's Armor defense.
        `,
      },
      rank: 4,
      roles: ['wildfire'],
      scaling: 'accuracy',
    },

    {
      name: 'Massive Hailstorm',

      // -2dr for large area, -1dr for repeated damage, +1dr for double defense
      attack: {
        hit: `
          \\damagerankfive.
        `,
        missGlance: true,
        targeting: `
          Choose a \\medarea radius within \\longrange.
          When you cast this spell, and during your next action, make an attack vs. Armor and Fortitude against everything in the area.
          If you spent an \\glossterm{ice crystal}, you only need to hit each target's Armor defense.
        `,
      },
      roles: ['wildfire'],
      rank: 7,
      // scaling: 'accuracy',
    },

    // A medium cone is somewhere between ranged and melee slow - call it 1.8 EA, so r3.
    {
      name: 'Freezing Wind',

      attack: {
        hit: `
          Each target becomes \\glossterm{briefly} \\slowed.
          If any Medium or larger creatures become slowed in this way and were not already slowed, you gain a \\glossterm{ice crystal}.
        `,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\medarea cone from you.
        `,
      },
      rank: 3,
      roles: ['flash'],
      scaling: 'accuracy',
    },

    // HP + brief is 2.5 EA, so r7. Drop area slightly to get to r6.
    {
      name: 'Massive Freezing Wind',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target becomes \\glossterm{briefly} \\slowed.
          Each creature with no remaining \\glossterm{damage resistance} is also slowed as a \\glossterm{condition}.
          If any Medium or larger creatures become slowed in this way and were not already slowed, you gain a \\glossterm{ice crystal}.
        `,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\largearea cone from you.
        `,
      },
      rank: 6,
      roles: ['flash'],
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

      // +1dr for delay
      attack: {
        hit: `
          Each target feels a growing chill.
          During your next action, it takes \\damagerankfive.
          If any Medium or larger creatures lose \\glossterm{hit points} from this damage, you gain an \\glossterm{ice crystal}.
        `,
        missGlance: true,
        targeting: `
          For the duration of this spell, you can breathe cold like a dragon as a standard action.
          When you do, make an attack vs. Fortitude against everything in a \\medarea cone from you.
          After you breathe cold, you \\glossterm{briefly} cannot do so again.
        `,
      },
      rank: 3,
      roles: ['wildfire', 'generator'],
      scaling: 'accuracy',
      type: 'Attune',
    },

    {
      name: 'Mighty Frost Breath',

      functionsLike: {
        name: 'frost breath',
        exceptThat: `
          the damage increases to \\damagerankeight, and the area increases to a \\largearea cone.
        `,
      },
      rank: 6,
      roles: ['wildfire', 'generator'],
      scaling: 'accuracy',
      type: 'Attune',
    },

    {
      name: 'Icicle Carapace',

      // Common reactive damage
      attack: {
        hit: `\\damagerankthree.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-\\weapontag{Long} weapon, make a \\glossterm{reactive attack} vs. Armor and Fortitude against them.
        `,
      },

      rank: 4,
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
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-\\weapontag{Long} weapon, make a \\glossterm{reactive attack} vs. Armor and Fortitude against them.
        `,
      },

      rank: 7,
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
        If you have no \\glossterm{ice crystals}, you gain an ice crystal.
      `,
      rank: 3,
      roles: ['dive'],
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
      roles: ['hazard'],
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
      roles: ['hazard'],
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Frostblade',

      cost: OPTIONAL_ICE_CRYSTAL,
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        If you spent an \\glossterm{ice crystal}, you gain a +2 accuracy bonus with the strike.
      `,
      rank: 1,
      roles: ['burst'],
      scaling: 'accuracy',
      tags: [],
    },
    {
      name: 'Chilling Slash',

      cost: OPTIONAL_ICE_CRYSTAL,
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        If you spent an \\glossterm{ice crystal}, you gain a +2 accuracy bonus with the strike.
        \\hit The target feels a growing chill.
        During your next action, it takes 1d8 damage.
      `,
      rank: 3,
      roles: ['burn'],
      scaling: {
        'special': 'The delayed damage increases by 1d8 for each rank beyond 3.',
      },
      tags: [],
    },
    {
      name: 'Mighty Chilling Slash',

      cost: OPTIONAL_ICE_CRYSTAL,
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        If you spent an \\glossterm{ice crystal}, you gain a +2 accuracy bonus with the strike.
        \\hit The target feels a growing chill.
        During your next action, it takes 1d6 damage per 2 \\glossterm{magical power}.
      `,
      rank: 6,
      roles: ['burn'],
      scaling: {
        'special': 'The delayed damage increases by 3d6 for each rank beyond 6.',
      },
      tags: [],
    },
    {
      name: 'Freezing Slash',

      cost: OPTIONAL_ICE_CRYSTAL,
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike} that deals double damage.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        If you spent an \\glossterm{ice crystal}, you gain a +2 accuracy bonus with the strike.
        \\hit If your attack result also hits the target's Fortitude defense, it is \\glossterm{briefly} \\slowed.
      `,
      rank: 5,
      roles: ['burst'],
      scaling: 'accuracy',
      tags: [],
    },
    {
      name: 'Mighty Freezing Slash',

      cost: OPTIONAL_ICE_CRYSTAL,
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike} that deals triple damage.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        If you spent an \\glossterm{ice crystal}, you gain a +2 accuracy bonus with the strike.
        \\hit If your attack result also hits the target's Fortitude defense, it is \\glossterm{briefly} \\slowed.
        If it also loses \\glossterm{hit points} from the strike, it is also slowed as a \\glossterm{condition}.
      `,
      rank: 7,
      roles: ['burst', 'maim'],
      scaling: 'accuracy',
      tags: [],
    },
  ],
});
