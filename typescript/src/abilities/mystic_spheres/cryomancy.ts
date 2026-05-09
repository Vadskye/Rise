import { MysticSphere } from '.';
import { add_tag_to_sphere } from './add_tag';
import { BARRIER_COOLDOWN, CONDITION_CRIT } from '../constants';

const OPTIONAL_ICE_CRYSTAL = 'One optional \\glossterm{ice crystal}.';

export const cryomancy: MysticSphere = add_tag_to_sphere('Cold', {
  name: 'Cryomancy',
  hasImage: true,
  shortDescription: 'Drain heat to injure and freeze foes.',
  sources: ['arcane', 'nature', 'pact'],
  // Two modes for ice crystal spenders:
  // * Base spell is normal rank, ice crystal makes it +1 rank stronger (example: +2 accuracy)
  // * Base spell is -1 rank below baseline power, ice crystal makes it +2 ranks above baseline power (example: +4 accuracy)
  // Two modes for ice crystal generators:
  // * Base spell is normal rank, generate an ice crystal conditionally (about 25% of the time)
  // * Base spell is -1 rank below baseline power, always generate an ice crystal
  // Narratively, ice crystal *spenders* generally create physical ice, while ice crystal *generators* generally directly lower temperature.
  specialRules: `
    Many spells from this mystic sphere become stronger if you spend ice crystals, and some spells generate ice crystals.
    You can normally have a maximum of three ice crystals.
    They grow on your body, but do not impede your movements or actions in any way.
    At the end of your turn, if you did not gain or spend any ice crystals that turn, one of your ice crystals melts.
  `,
  cantrips: [
    {
      name: 'Crystal Growth',

      effect: `
        If you have no \\glossterm{ice crystals}, you gain one ice crystal.
        If you have exactly one ice crystal, it does not melt this turn.
      `,
      roles: ['focus'],
    },
  ],
  spells: [
    {
      name: 'Freezing Grasp',
      // Melee HP slow is normally 1.5 EA. Drop to 1.0 EA for delay, since delay is
      // particularly punishing if they already have to lose HP. With damage, that's 2
      // EA, so rank 4, or rank 2 in melee.
      // Rank 3 Spell
      // Range: Melee (mod +2)
      // Mod: Debuff (-1)
      // Result: 3 + 2 - 1 = dr4
      attack: {
        hit: `
          \\damagerankfour.
        `,
        injury: `
          The target slowly begins freezing as a \\glossterm{condition}.
          At the end of your next turn, it becomes \\slowed and you gain an \\glossterm{ice crystal}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against something you \\glossterm{touch}.
        `,
      },
      rank: 3,
      roles: ['maim'],
      scaling: 'damage',
    },

    {
      name: 'Rapid Freezing Grasp',

      // Rank 6 Spell
      // Range: Melee (mod +2)
      // Mod: Debuff (-1)
      // Result: 6 + 2 - 1 = dr7
      attack: {
        hit: `
          \\damagerankseven, and any \\glossterm{extra damage} is doubled.
        `,
        injury: `
          The target becomes \\slowed as a \\glossterm{condition}, and you gain an \\glossterm{ice crystal}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against something you \\glossterm{touch}.
        `,
      },
      rank: 6,
      roles: ['maim'],
      scaling: 'damage',
    },

    {
      name: 'Cone of Cold',

      // Rank 2 Spell
      // Area: Medium cone from self (R2, mod -1)
      // Result: 2 - 1 = dr1
      attack: {
        hit: `\\damagerankone.`,
        halfOnMiss: true,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\medarea cone from you.
          If the area includes at least three spaces occupied by living creatures or other heat sources, you gain an \\glossterm{ice crystal}.
        `,
      },
      rank: 2,
      roles: ['clear', 'generator'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Cone of Cold',

      // Rank 5 Spell
      // Area: Medium cone from self (R2, mod -1)
      // Result: 5 - 1 = dr4
      attack: {
        hit: `\\damagerankfour.`,
        halfOnMiss: true,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\medarea cone from you.
          If the area includes at least three spaces occupied by living creatures or other heat sources, you gain an \\glossterm{ice crystal}.
        `,
      },
      rank: 5,
      roles: ['clear', 'generator'],
      scaling: 'damage',
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
      // Rank 1 Spell
      // Range: Medium (mod 0)
      // Mod: Double Defense (+1)
      // Result: 1 + 0 + 1 = dr2
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
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Icicle',

      cost: OPTIONAL_ICE_CRYSTAL,
      // Rank 4 Spell
      // Range: Medium (mod 0)
      // Mod: Double Defense (+1)
      // Result: 4 + 0 + 1 = dr5
      attack: {
        hit: `
          \\damagerankfive, and any \\glossterm{extra damage} is doubled.
        `,
        targeting: `
          Make an attack vs. Armor and Fortitude against something within \\medrange.
          If you spent an \\glossterm{ice crystal}, you only need to hit the target's Armor defense.
        `,
      },
      rank: 4,
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Skate',

      effect: `
        You can move on top of water as if it were land.
        This also works on other liquids that can be frozen like water.
        At the end of your turn, if you are standing on a Medium or larger freezable liquid and have no \\glossterm{ice crystals}, you gain an ice crystal.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Skyskate',

      effect: `
        Whenever you move using your \\glossterm{walk speed}, you can leave a trail of ice behind you.
        The ice lasts \\briefly before disappearing.

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

      // Permanent shielded is 2.4 EA.
      // Assume that you have DR for ~2/3 of turns, so this is worth 1.6 EA.
      effect: `
        You are \\shielded.
        At the start of your turn, if you took damage from a \\atFire ability since your last turn or are \\glossterm{injured}, you can spend an \\glossterm{ice crystal}.
        If you do not, this ability is \\glossterm{dismisssed}.
      `,
      narrative:
        'Layers of ice form around you, shielding you from attacks until they are destroyed.',
      rank: 1,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Efficient Icy Shell',

      functionsLike: {
        name: 'icy shell',
        exceptThat: 'it is a normal attunement instead of a \\glossterm{deep attunement}.',
      },
      rank: 7,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Frostbite',

      // Rank 2 Spell
      // Range: Short (mod +1)
      // Mod: Inescapably Delayed (+1)
      // Result: 2 + 1 + 1 = dr4
      attack: {
        hit: `
          The target feels a growing chill.
          At the end of its next turn, it takes \\damagerankfour.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.

          If you \\glossterm{injure} any Medium or larger creatures with this spell, you gain an \\glossterm{ice crystal}.
        `,
      },
      rank: 2,
      roles: ['burn', 'generator'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Frostbite',

      // Rank 6 Spell
      // Range: Short (mod +1)
      // Mod: Inescapably Delayed (+1)
      // Result: 6 + 1 + 1 = dr8
      attack: {
        hit: `
          The target feels a growing chill.
          At the end of its next turn, it takes \\damagerankeight.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.

          If you \\glossterm{injure} any Medium or larger creatures with this spell, you gain an \\glossterm{ice crystal}.
        `,
      },
      rank: 6,
      roles: ['burn', 'generator'],
      scaling: 'damage',
    },

    {
      name: 'Hailstorm',

      // Rank 4 Spell
      // Area: Small radius in Short range (R3, mod -1)
      // Mod: Repeated (escapable) (-1), Double defense (+1)
      // Result: 4 - 1 - 1 + 1 = dr3
      cost: OPTIONAL_ICE_CRYSTAL,
      attack: {
        hit: `
          \\damagerankthree.
        `,
        halfOnMiss: true,
        targeting: `
          Choose a \\smallarea radius within \\shortrange.
          Make an attack vs. Armor and Fortitude against everything in the area.
          If you spent an \\glossterm{ice crystal}, you only need to hit each target's Armor defense.
          At the start of your next turn, this effect \\glossterm{repeats} in the same area.
        `,
      },
      rank: 4,
      roles: ['wildfire'],
      scaling: 'damage',
    },

    {
      name: 'Massive Hailstorm',

      // Rank 7 Spell
      // Area: Medium radius in Medium range (R5, mod -2)
      // Mod: Repeated (escapable) (-1), Double defense (+1)
      // Result: 7 - 2 - 1 + 1 = dr5
      attack: {
        hit: `
          \\damagerankfive.
        `,
        halfOnMiss: true,
        targeting: `
          Choose a \\medarea radius within \\medrange.
          Make an attack vs. Armor and Fortitude against everything in the area.
          If you spent an \\glossterm{ice crystal}, you only need to hit each target's Armor defense.
          At the start of your next turn, this effect \\glossterm{repeats} in the same area.
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
          The target becomes \\briefly \\slowed.
        `,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\medarea cone from you.

          If any Medium or larger creatures become slowed by this spell and were not already slowed, you gain a \\glossterm{ice crystal}.
        `,
      },
      rank: 3,
      roles: ['flash', 'generator'],
      scaling: 'accuracy',
    },

    // HP + brief is 2.5 EA, so r7. Drop area slightly to get to r6.
    {
      name: 'Massive Freezing Wind',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target becomes \\briefly \\slowed.
          If it is \\glossterm{injured}, it is also slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\largearea cone from you.

          If any Medium or larger creatures become slowed by this spell and were not already slowed, you gain a \\glossterm{ice crystal}.
        `,
      },
      rank: 6,
      roles: ['flash', 'generator'],
      scaling: 'accuracy',
    },

    {
      name: 'Icecraft',

      effect: `
        Choose one pool of \\glossterm{unattended}, nonmagical water within \\shortrange.
        This spell creates up to two weapons, suits of body armor, or shields from the target pool of water.
        You can create any weapon, shield, or body armor that you are proficient with, and which would normally be made of metal.
        Its rank cannot exceed your spellcasting rank with this spell.
        It is sized appropriately for you, up to a maximum of a Medium size item.
        The pool of water targeted must be at least as large as the largest item you create.

        An item created with this spell functions like a normal item of its type, with three exceptions.
        First, any \\glossterm{strikes} made with a weapon created with this ability have the \\atCold tag.
        Second, any creature wearing body armor created with this ability is \\resistant to \\atFire attacks.
        Third, whenever a creature using items from this ability is \\glossterm{injured} by a \\atFire attack, all of their items from this ability disappear.
        The items reappear at the end of that creature's next turn.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        2: `
          If you create body armor or a weapon, it can be created from any metallic special material other than cold iron and dragonscale.
          Its rank cannot exceed your spellcasting rank with this spell.
        `,
      },
      type: 'Attune',
    },

    {
      name: 'Frost Breath',

      // Rank 3 Spell
      // Area: Medium cone from self (R2, mod -1)
      // Mod: Inescapably Delayed (+1), Attune (R1-4) (+1)
      // Result: 3 - 1 + 1 + 1 = dr4
      attack: {
        hit: `
          The target feels a growing chill.
          At the end of its next turn, it takes \\damagerankfour.
        `,
        halfOnMiss: true,
        targeting: `
          For the duration of this spell, you can breathe cold like a dragon as a standard action.
          When you do, make an attack vs. Fortitude against everything in a \\medarea cone from you.
          You \\briefly can't use this ability again.

          If any Medium or larger creatures lose \\glossterm{hit points} from this spell, you gain an \\glossterm{ice crystal}.
        `,
      },
      rank: 3,
      roles: ['wildfire', 'generator'],
      scaling: 'damage',
      type: 'Attune',
    },

    {
      name: 'Mighty Frost Breath',

      // Rank 6 Spell
      // Area: Medium cone from self (R2, mod -1)
      // Mod: Inescapably Delayed (+1), Attune (R5+) (+2), Generator (-1)
      // Result: 6 - 1 + 1 + 2 - 1 = dr7
      functionsLike: {
        name: 'frost breath',
        exceptThat: `
          the damage increases to \\damagerankseven.
        `,
      },
      rank: 6,
      roles: ['wildfire', 'generator'],
      scaling: 'damage',
      type: 'Attune',
    },

    {
      name: 'Icicle Carapace',

      attack: {
        hit: `\\damagerankthree.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-\\weapontag{Long} weapon, make a \\glossterm{reactive attack} vs. Armor and Fortitude against them.
        `,
      },

      rank: 4,
      roles: ['attune'],
      scaling: 'damage',
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

      effect: `
        You teleport into an unoccupied destination on a stable surface within \\shortrange.
        If you have no \\glossterm{ice crystals}, you gain an ice crystal.
      `,
      rank: 3,
      roles: ['mobility', 'generator'],
    },

    {
      name: 'Wall of Ice',

      cost: BARRIER_COOLDOWN,
      effect: `
        You create a \\smallarealong \\glossterm{wall} of magical energy within \\medrange.
        The wall is visible as a wall of smooth, clear ice that does not block sight.
        Nothing can pass through the wall until it is destroyed.

        The wall has \\glossterm{hit points} equal to your \\glossterm{power}.
        If it is destroyed, it automatically reforms at the end of your next turn, ignoring any occupied spaces that would block the wall from reforming.
      `,
      rank: 1,
      scaling: {
        3: 'You can choose to create a \\medarealong wall instead.',
        5: 'You can choose to create a \\largearealong wall instead.',
        7: 'You can choose to create a \\hugearealong wall instead.',
      },
      roles: ['barrier'],
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attunable, minor)',
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
        If it is destroyed, it automatically reforms at the end of your next turn, ignoring any occupied spaces that would block the wall from reforming.
      `,
      rank: 4,
      roles: ['barrier'],
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attunable, minor)',
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
        At the end of its next turn, it takes 1d8 damage.
      `,
      rank: 3,
      roles: ['burn'],
      scaling: {
        special: 'The delayed damage increases by 1d8 for each rank beyond 3.',
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
        At the end of its next turn, it takes 1d6 damage per 2 \\glossterm{magical power}.
      `,
      rank: 6,
      roles: ['burn'],
      scaling: {
        special: 'The delayed damage increases by 3d6 for each rank beyond 6.',
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
        \\hit If your attack result also hits the target's Fortitude defense, it is \\briefly \\slowed.
      `,
      rank: 5,
      roles: ['burst', 'trip'],
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
        \\hit If your attack result also hits the target's Fortitude defense, it is \\briefly \\slowed.
        \\injury The target is also slowed as a \\glossterm{condition}.
      `,
      rank: 7,
      roles: ['burst', 'maim', 'trip'],
      scaling: 'accuracy',
      tags: [],
    },

    // Brief + injury ranged slow is about 2.4 EA, so 3.4 EA with damage, so 1.7 EA as a
    // double action, which is r3, or r2 at close range.
    // Normal close range debuff damage would be dr2. Double is about dr4. Upgrade to dr5
    // for the mandatory ice crystal cost.
    {
      name: 'Bonechill',

      cost: 'One \\glossterm{ice crystal}.',
      // Rank 2 Spell
      // Range: Short (mod +1)
      // Mod: Double Action (+2)
      // Result: 2 + 1 + 2 = dr5
      attack: {
        hit: `
          \\damagerankfive, and any \\glossterm{extra damage} is doubled.
          In addition, the target is \\briefly \\slowed.
        `,
        injury: `
          The target is slowed as a \\glossterm{condition}.
        `,
        targeting: `
          When you cast this spell, ice forms on your body and the air chills around you.
          During your next turn, you can spend a \\glossterm{standard action} to make an attack vs. Fortitude against something within \\shortrange.
        `,
      },
      rank: 2,
      roles: ['burst', 'softener', 'maim'],
      scaling: 'damage',
    },

    // Ranged slow is 5.2 EA, or 6.2 EA with damage. This is short range and requires an
    // ice crystal, so we fudge that to 5.6 EA. As a double action, that's 2.8 EA, which
    // is r7 with limited scope.
    {
      name: 'Mighty Bonechill',

      cost: 'One \\glossterm{ice crystal}.',
      // Rank 7 Spell
      // Range: Short (mod +1)
      // Mod: Double Action (+2)
      // Result: 7 + 1 + 2 = dr10
      attack: {
        hit: `
          \\damagerankten, and any \\glossterm{extra damage} is tripled.
          In addition, the target is \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          When you cast this spell, ice forms on your body and the air chills around you.
          During your next turn, you can spend a \\glossterm{standard action} to make an attack vs. Fortitude against something within \\shortrange.
        `,
      },
      rank: 7,
      roles: ['burst', 'softener'],
      scaling: 'damage',
    },

    {
      name: 'Creeping Frost',

      // Rank 2 Spell
      // Area: Medium 5 ft. wide line from self (R0, mod +1)
      // Mod: Repeated (escapable) (-1)
      // Result: 2 + 1 - 1 = dr2
      attack: {
        hit: `
          \\damageranktwo.
        `,
        halfOnMiss: true,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\medarealong, 5 ft.\\ wide line from you.
          At the start of your next turn, make an attack vs. Fortitude against everything in a \\medarealong, 5 ft.\\ wide line that continues straight from the end of the previous line.
          At the end of that turn, you gain an \\glossterm{ice crystal}.
        `,
      },
      rank: 2,
      roles: ['clear', 'generator'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Creeping Frost',

      // Rank 5 Spell
      // Area: Medium 5 ft. wide line from self (R0, mod +1)
      // Mod: Repeated (escapable) (-1)
      // Result: 5 + 1 - 1 = dr5
      functionsLike: {
        name: 'creeping frost',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      rank: 5,
      roles: ['clear', 'generator'],
    },

    {
      name: 'Ice Shield',

      // Cover is 0.5 EA. Adding empowered is +0.4 EA, so 0.9 EA, which
      // is fine for an optional ice crystal.
      cost: OPTIONAL_ICE_CRYSTAL,
      effect: `
        You \\briefly have \\glossterm{cover} from all attacks.
        If you spent an ice crystal, you are also \\briefly \\empowered.
      `,
      rank: 1,
      roles: ['focus', 'turtle'],
    },

    {
      name: 'Greater Ice Shield',

      // Cover is 0.5 EA. Adding a turn of maximized is +0.7 EA, so 1.2 EA, which
      // is fine for an optional ice crystal.
      cost: OPTIONAL_ICE_CRYSTAL,
      effect: `
        You \\briefly have \\glossterm{cover} from all attacks.
        If you spent an ice crystal, you are also \\briefly \\maximized.
      `,
      rank: 6,
      roles: ['focus', 'turtle'],
    },
  ],
});
