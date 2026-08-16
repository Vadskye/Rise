import { MysticSphere } from '.';
import { add_tag_to_sphere } from './add_tag';
import { CRIT_BECOMES_CONDITION, INJURY_CRIT } from '../constants';

const OPTIONAL_ICE_CRYSTAL = 'One optional \\glossterm{ice crystal}.';
const ICE_CRYSTAL_AND_BARRIER = `
  ${OPTIONAL_ICE_CRYSTAL}.
  In addition, you \\glossterm{briefly} cannot use this ability or any other \\atBarrier ability.
`;

export const cryomancy: MysticSphere = add_tag_to_sphere('Cold', {
  name: 'Cryomancy',
  hasImage: true,
  shortDescription: 'Drain heat to injure and freeze foes.',
  sources: ['arcane', 'nature', 'pact'],
  // Two modes for ice crystal spenders:
  // * Base spell is normal rank, ice crystal makes it +1 rank stronger (example: +2 accuracy)
  // * Base spell is -1 rank below baseline power, ice crystal makes it +2 ranks above baseline power (example: +4 accuracy)
  // Two modes for ice crystal generators:
  // * Base spell is normal rank, generate an ice crystal
  // * Base spell is -1 rank below baseline power, generate two ice crystals
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
        Whenever you sustain this spell, if you have exactly one ice crystal, it does not melt this turn.
      `,
      roles: ['focus'],
      type: 'Sustain (standard)',
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
      // Result: 3 + 2 = dr5
      attack: {
        hit: `
          \\damagerankfive, and you gain an \\glossterm{ice crystal}.
        `,
        injury: `
          The target slowly begins freezing as a \\glossterm{condition}.
          At the end of your next turn, the target becomes \\slowed while the condition lasts.
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
      // Result: 6 + 2 = dr8
      attack: {
        hit: `
          \\damagerankeight, and any \\glossterm{extra damage} is doubled.
          You gain an \\glossterm{ice crystal}.
        `,
        injury: `
          The target is \\slowed as a \\glossterm{condition}.
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
      attack: {
        hit: `
          \\damagerankthree.
        `,
        targeting: `
          Make an attack vs. Armor and Fortitude against something within \\shortrange.
          If you spent an \\glossterm{ice crystal}, the range increases to \\medrange.
        `,
      },
      rank: 1,
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Manifestation', 'Physical'],
    },

    {
      name: 'Mighty Icicle',

      cost: OPTIONAL_ICE_CRYSTAL,
      attack: {
        hit: `
          \\damageranksix, and any \\glossterm{extra damage} is doubled.
        `,
        targeting: `
          Make an attack vs. Armor and Fortitude against something within \\shortrange.
          If you spent an \\glossterm{ice crystal}, the range increases to \\medrange.
        `,
      },
      rank: 4,
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Manifestation', 'Physical'],
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
      // Assume that you have DR for ~3/4 of turns, so this is worth 1.8 EA.
      effect: `
        You are \\shielded.
        At the end of your turn, if you took damage since your last turn, this effect is \\glossterm{dismissed} unless you spend an \\glossterm{ice crystal}.
      `,
      narrative: 'Ice forms around you, shielding you from attacks until it is destroyed.',
      rank: 2,
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
      name: 'Frost Bomb',

      // small radius in short range is rank 2 = dr-1.
      // Avoidable delay is dr+2.
      // This is one of the few ways to generate multiple ice crystals.
      attack: {
        hit: `
          \\damagerankfour.
          If the target is a Medium or larger creature, you gain an \\glossterm{ice crystal}.
        `,
        injury: `
          The target is \\briefly \\slowed.
        `,
        halfOnMiss: true,
        targeting: `
          You create a \\smallarea radius \\glossterm{zone} of growing cold within \\shortrange.
          At the end of your next turn, make an attack vs. Fortitude against everything in the area.
        `,
      },
      rank: 3,
      roles: ['clear', 'generator'],
      scaling: 'damage',
    },

    {
      name: 'Frostbite',

      // Immediate damage would be dr1 = 5.75 damage.
      // Delayed damage is dr2 = 7.75 (+34%)
      attack: {
        hit: `
          You gain an \\glossterm{ice crystal}, and the target feels a growing chill.
          At the end of its next turn, it takes \\damageranktwo.
        `,
        injury: `
          The target is \\briefly \\slowed.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\medrange.
        `,
      },
      rank: 1,
      roles: ['burn', 'generator'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Frostbite',

      // Immediate damage would be dr5 = 25
      // Delayed damage is 32.6 (+30%)
      attack: {
        hit: `
          You gain an \\glossterm{ice crystal}, and the target feels a growing chill.
          At the end of its next turn, it takes \\damageranksix, and any \\glossterm{extra damage} is doubled.
        `,
        injury: `
          The target is \\briefly \\slowed.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\medrange.
        `,
      },
      rank: 5,
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
      tags: ['Manifestation', 'Physical'],
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
      tags: ['Manifestation', 'Physical'],
      // scaling: 'accuracy',
    },

    {
      name: 'Frozen Lattice',

      // -1dr for area, +1dr for double defense, -2dr for difficult terrain + cover + repeat effect.
      cost: OPTIONAL_ICE_CRYSTAL,
      attack: {
        hit: `
          \\damagerankthree.
        `,
        halfOnMiss: true,
        injury: `
          The target is \\briefly \\slowed.
        `,
        targeting: `
          You \\briefly create a \\smallarea radius \\glossterm{zone} within \\shortrange.
          A thin lattice of ice fills the area, providing \\glossterm{cover} to everything in the area and making it \\glossterm{difficult terrain}.
          You immediately make an attack vs. Reflex and Fortitude against everything in the area.
          This attack ignores the cover provided by this spell.

          If you spent an \\glossterm{ice crystal}, this effect \\glossterm{repeats} in the same area at the start of your next turn.
        `,
      },
      rank: 5,
      roles: ['wildfire'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    // A medium line is somewhere between ranged and melee slow - call it 1.8 EA, so r3.
    {
      name: 'Freezing Wind',

      attack: {
        crit: CRIT_BECOMES_CONDITION,
        hit: `
          The target becomes \\briefly \\slowed.
        `,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\medarealong, 10 ft.\\ wide line from you.

          If any Medium or larger creatures are slowed by this spell, you gain a \\glossterm{ice crystal}.
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
        crit: INJURY_CRIT,
        hit: `
          The target becomes \\briefly \\slowed.
          If it is \\glossterm{injured}, it is also slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\largearealong, 15 ft.\\ wide line from you.

          If any Medium or larger creatures are slowed by this spell, you gain a \\glossterm{ice crystal}.
        `,
      },
      rank: 6,
      roles: ['flash', 'maim'],
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

        An item created with this spell functions like a normal item of its type, with three exceptions:
        \\begin{itemize}
          \\item Any \\glossterm{strikes} made with a weapon created with this ability have the \\atCold tag.
          \\item Any creature wearing body armor created with this ability is \\resistant to \\atFire attacks.
          \\item Whenever a creature using items from this ability is \\glossterm{injured} by a \\atFire attack, all of their items from this ability are temporarily destroyed.
            The items are recreated in the same location at the end of that creature's next turn.
        \\end{itemize}

        If you are using an item created with this spell, you can spend it as if it were an \\glossterm{ice crystal}.
        This destroys the item.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        2: `
          If you create body armor or a weapon, it can be created from any metallic special material other than cold iron and dragonscale.
          Its rank cannot exceed your spellcasting rank with this spell.
        `,
      },
      tags: ['Physical'],
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
      tags: ['Manifestation', 'Physical'],
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
      tags: ['Manifestation', 'Physical'],
    },

    {
      name: 'Chillwind Dash',

      effect: `
        You teleport into an unoccupied destination on a stable surface within \\shortrange.
        In addition, you gain an \\glossterm{ice crystal}.
      `,
      rank: 3,
      roles: ['mobility', 'generator'],
    },

    {
      name: 'Wall of Ice',

      cost: ICE_CRYSTAL_AND_BARRIER,
      effect: `
        You create a \\smallarealong \\glossterm{wall} of magical energy within \\medrange.
        The wall is visible as a wall of smooth, clear ice that does not block sight.
        Nothing can pass through the wall until it is destroyed.

        The wall has \\glossterm{hit points} equal to your \\glossterm{power}.
        If you spent an \\glossterm{ice crystal}, the wall has hit points equal to twice your power instead.
        When the wall is destroyed, it automatically reforms at the end of your next turn, ignoring any occupied spaces that would block the wall from reforming.
      `,
      rank: 1,
      scaling: {
        3: 'You can choose to create a \\medarealong wall instead.',
        5: 'You can choose to create a \\largearealong wall instead.',
        7: 'You can choose to create a \\hugearealong wall instead.',
      },
      roles: ['barrier'],
      tags: ['Barrier', 'Manifestation', 'Physical'],
      type: 'Sustain (attunable, minor)',
    },
    // TODO: unclear rank
    {
      name: 'Ice Globe',

      cost: ICE_CRYSTAL_AND_BARRIER,
      effect: `
        You create a sphere of ice in a \\smallarea sphere within \\medrange.
        The sphere fails to form in any occupied space, but its walls fill in the space as much as possible.
        It is visible as smooth, clear ice that does not block sight.
        Nothing can pass through the sphere until it is destroyed.

        The sphere as a whole has \\glossterm{hit points} equal to your \\glossterm{power}.
        If you spent an \\glossterm{ice crystal}, the wall has hit points equal to twice your power instead.
        When the sphere is destroyed, it automatically reforms at the end of your next turn, ignoring any occupied spaces that would block it from reforming.
      `,
      rank: 4,
      roles: ['barrier'],
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attunable, minor)',
    },
    {
      name: 'Frostblade',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike} with an accuracy bonus equal to the number of \\glossterm{ice crystals} you have.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        If you hit any Medium or larger creature with the strike, you gain an \\glossterm{ice crystal}.
      `,
      rank: 1,
      roles: ['burst'],
      scaling: 'accuracy',
      tags: [],
    },
    {
      name: 'Mighty Frostblade',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike} with an accuracy bonus equal to the number of \\glossterm{ice crystals} you have.
        The strike deals double damage.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        If you hit any Medium or larger creature with the strike, you gain an \\glossterm{ice crystal}.
        \\injury The target is \\briefly \\slowed.
      `,
      rank: 5,
      roles: ['burst'],
      scaling: 'accuracy',
      tags: [],
    },
    {
      name: 'Chilling Slash',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        If you hit any Medium or larger creature with the strike, you gain an \\glossterm{ice crystal}.
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

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        If you hit any Medium or larger creature with the strike, you gain an \\glossterm{ice crystal}.
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
      name: 'Crystalline Blade',

      cost: 'One \\glossterm{ice crystal}.',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike} that deals double damage.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        \\hit If your attack result also hits the target's Fortitude defense, it is \\briefly \\slowed.
      `,
      rank: 4,
      roles: ['burst', 'trip'],
      scaling: 'accuracy',
      tags: [],
    },
    {
      name: 'Mighty Crystalline Blade',

      cost: 'One \\glossterm{ice crystal}.',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike} that deals quadruple damage.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        \\hit The target is \\briefly \\slowed.
      `,
      rank: 7,
      roles: ['burst', 'maim', 'trip'],
      scaling: 'accuracy',
      tags: [],
    },

    // Brief + injury ranged slow is about 2.4 EA, so 3.4 EA with damage, so 1.7 EA as a
    // double action, which is r3.
    // Normal medium range debuff damage would be dr2. Double is about dr4.
    {
      name: 'Bonechill',

      attack: {
        hit: `
          \\damagerankfour.
          In addition, the target is \\briefly \\slowed, and you gain an \\glossterm{ice crystal}.
        `,
        injury: `
          The target is slowed as a \\glossterm{condition}, and you gain an additional \\glossterm{ice crystal}.
        `,
        targeting: `
          When you cast this spell, ice forms on your body and the air chills around you.
          During your next turn, you can spend a \\glossterm{standard action} to make an attack vs. Fortitude against something within \\medrange.
        `,
      },
      rank: 3,
      roles: ['burst', 'softener', 'maim'],
      scaling: 'damage',
    },

    // Ranged slow is 5.2 EA, or 6.2 EA with damage. This is short range, so we fudge that
    // to 5.6 EA. As a double action, that's 2.8 EA, which is r7 with limited scope.
    // This may be slightly stronger than it should be? TODO: more EA math
    {
      name: 'Mighty Bonechill',

      attack: {
        crit: `Double damage, and at the end of your turn, the target is \\briefly locked in \\stasis.`,
        hit: `
          \\damageranknine, and any \\glossterm{extra damage} is doubled.
          In addition, the target is \\slowed as a \\glossterm{condition}, and you gain an \\glossterm{ice crystal}.
        `,
        targeting: `
          When you cast this spell, ice forms on your body and the air chills around you.
          During your next turn, you can spend a \\glossterm{standard action} to make an attack vs. Fortitude against something within \\medrange.
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
          Then, you gain an \\glossterm{ice crystal}.
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
        Whenever you cast or sustain this spell, you \\briefly have \\glossterm{cover} from all attacks.
        If you spent an ice crystal when you cast this spell, you are also \\briefly \\empowered.
      `,
      rank: 1,
      roles: ['focus', 'turtle'],
      type: 'Sustain (standard)',
      tags: ['Manifestation', 'Physical'],
    },

    {
      name: 'Greater Ice Shield',

      // Cover is 0.5 EA. Adding a turn of maximized is +0.7 EA, so 1.2 EA, which
      // is fine for an optional ice crystal.
      cost: OPTIONAL_ICE_CRYSTAL,
      effect: `
        Whenever you cast or sustain this spell, you \\briefly have \\glossterm{cover} from all attacks.
        If you spent an ice crystal when you cast this spell, you are also \\briefly \\maximized.
      `,
      rank: 6,
      roles: ['focus', 'turtle'],
      type: 'Sustain (standard)',
      tags: ['Manifestation', 'Physical'],
    },

    {
      name: 'Crystalline Power',

      effect: `
        Whenever you cast a non-attunable spell, you can spend an \\glossterm{ice crystal} to activate this effect as a \\glossterm{minor action}.
        If you do, the spell gains a \\plus2 accuracy bonus and deals 1d6 \\glossterm{extra damage} this turn.
        After you enhance a spell in this way, this ability is \\glossterm{dismissed}.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: `The extra damage increases to 2d6.`,
        5: `The extra damage increases to 2d10.`,
        7: `The extra damage increases to 4d10.`,
      },
      type: 'Attune',
    },

    {
      name: 'Chilling Pulse',

      attack: {
        hit: `
          \\damagerankthree.
        `,
        injury: `
          The target is \\briefly \\slowed.
        `,
        halfOnMiss: true,
        targeting: `
          When you cast or sustain this spell, make an attack vs. Fortitude against all \\glossterm{enemies} within a \\tinyarea radius of you.
          If you sustained the spell, you gain a \\plus2 accuracy bonus with the attack.

          If you \\glossterm{injure} any Medium or larger creatures with this spell, you gain an \\glossterm{ice crystal}.
        `,
      },
      rank: 2,
      roles: ['clear', 'maim'],
      scaling: 'damage',
      type: 'Sustain (standard)',
    },

    {
      name: 'Freezing Pulse',

      // -1dr for on-hit debuff
      attack: {
        hit: `
          \\damagerankfour, and the target is \\briefly \\slowed.
        `,
        injury: `
          The target is \\slowed as a \\glossterm{condition}.
        `,
        halfOnMiss: true,
        targeting: `
          When you cast or sustain this spell, make an attack vs. Fortitude against all \\glossterm{enemies} within a \\tinyarea radius of you.
          If you sustained the spell, you gain a \\plus2 accuracy bonus with the attack.

          If you \\glossterm{injure} any Medium or larger creatures with this spell, you gain an \\glossterm{ice crystal}.
        `,
      },
      rank: 4,
      roles: ['clear', 'maim'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Chilling Pulse',

      attack: {
        hit: `
          \\damagerankseven.
        `,
        injury: `
          The target is \\briefly \\slowed.
        `,
        halfOnMiss: true,
        targeting: `
          When you cast or sustain this spell, make an attack vs. Fortitude against all \\glossterm{enemies} within a \\tinyarea radius of you.
          If you sustained the spell, you gain a \\plus2 accuracy bonus with the attack.

          If you \\glossterm{injure} any Medium or larger creatures with this spell, you gain an \\glossterm{ice crystal}.
        `,
      },
      rank: 6,
      roles: ['clear', 'maim'],
      scaling: 'damage',
      type: 'Sustain (standard)',
    },
  ],
});
