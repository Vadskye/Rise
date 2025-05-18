import { MysticSphere } from '.';
import { BRIEF_COOLDOWN, CONDITION_CRIT } from './constants';

// This sphere gets maneuvers at equal rank to combat styles.
// However, they are strictly mundane and limited in scope.
export const chronomancy: MysticSphere = {
  name: 'Chronomancy',
  hasImage: true,
  shortDescription: 'Manipulate the passage of time to inhibit foes and aid allies.',
  sources: ['arcane', 'pact'],
  specialRules: `
    Some spells from this mystic sphere can create a time lock on creatures.
    \\spheredef{time lock} A time lock causes an aspect of a creature to be frozen in time.
    It always locks a specific statistic or status, such as a creature's current \\glossterm{hit points} or location.

    Some effects can unseal the time lock.
    This restores the creature to match the state it was in when the time lock was created.
    For example, the creature's hit points might be restored to their original value.
    Only the specific aspect of the creature sealed by the time lock is changed.
    Everything else about the creature remains the same unless otherwise stated.
    Unsealing a time lock ends the effect.

    If a time locked creature dies, the time lock ends without being unsealed.
  `,

  cantrips: [
    {
      name: 'Instant Reversal -- Attack',

      effect: `
        Whenever you make an \\glossterm{attack} or \\glossterm{check}, you can \\glossterm{reroll} it.
        After you do, this ability ends.

        You can decide to activate this effect after you learn whether the original roll succeeded or failed.
        You can even use it after you learn what the effects of a successful attack or check would be, if that is information you could normally learn if it succeeded.
        However, you must use it before using any other abilities or ending your turn.
      `,
      roles: ['attune'],
      scaling: {
        2: 'You gain a +2 bonus to the reroll.',
        4: 'The bonus increases to +3.',
        6: 'The bonus increases to +4.',
      },
      type: 'Attune (deep)',
    },
    {
      name: 'Timeseal',

      effect: `
        Choose yourself or one Medium or smaller \\glossterm{ally} within \\medrange.
        The target becomes \\glossterm{briefly} frozen in time.
        It becomes completely immune to all damage, attacks, and effects of any kind.
        In addition, it cannot act in any way, and the duration of other effects on it does not expire.
        At the end of the next round, it returns to normal, with no awareness of the intervening time.
        After it returns to normal, it \\glossterm{briefly} becomes immune to this effect.
      `,
      scaling: {
        2: 'The maximum size increases to Large.',
        4: 'The maximum size increases to Huge.',
        6: 'The maximum size increases to Gargantuan.',
      },
    },
  ],
  spells: [
    {
      name: 'Burst of Speed',

      effect: `
        When you use the \\ability{sprint} ability as a \\glossterm{movement}, you can choose not to increase your \\glossterm{fatigue level}.
        After you sprint in this way, this ability ends.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Instant Reversal -- Movement',

      effect: `
        At the end of each movement phase, you can use this ability to rewind time to the start of the movement phase.
        All other creatures make the same movements, but you can change your movement based on your knowledge of their previous movements.
        After you rewind time in this way, this ability ends.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Instant Reversal -- Decision',

      effect: `
        Whenever you make an attack during your action and learn whether you hit or missed, you can use this ability to rewind time to the start of your action.
        You must use this ability before determining any damage dealt or any other effects of the attack.
        All effects of your action are undone, except that you keep any \\glossterm{fatigue levels} you gained during your original action.
        You can use an different ability on your new action, or simply make a new attack roll with the same ability and hope it succeeds this time.
        After you rewind time in this way, this ability ends.
      `,
      rank: 5,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Quicksilver Flurry',

      // Rerolling is about +2 accuracy
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{mundane} \\glossterm{strike} with a \\minus1 accuracy penalty using a single weapon.
        You may reroll the accuracy roll and take the highest result.
      `,
      rank: 2,
      scaling: 'accuracy',
    },
    {
      name: 'Quicksilver Double Flurry',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make two \\glossterm{mundane} \\glossterm{strikes} with a \\minus1 accuracy penalty using a single weapon.
      `,
      rank: 5,
      scaling: 'accuracy',
    },
    {
      name: 'Quicksilver Blitz',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Move up to your speed.
        At the end of your movement, you can make a \\glossterm{mundane} \\glossterm{strike}.
        If the strike is a melee strike, you gain a \\plus2 accuracy bonus.
        Otherwise, you take a \\minus2 accuracy penalty.
      `,
      rank: 4,
      scaling: 'accuracy',
    },
    {
      name: 'Quicksilver Sweep',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{mundane} melee \\glossterm{strike}.
        The strike gains the \\weapontag{Sweeping} (8) \\glossterm{weapon tag}, allowing you to hit up to 8 additional targets (see \\pcref{Weapon Tags}).
      `,
      rank: 2,
      scaling: 'accuracy',
    },
    {
      name: 'Quicksilver Perfection',

      cost: BRIEF_COOLDOWN,
      // TODO: figure out how to do math??
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{mundane} melee \\glossterm{strike} using a single weapon.
        You can reroll the attack roll up to five times, keeping the highest result.
        Before rerolling, you can learn whether your result would be a hit or critical hit, but not the damage you would deal.
        When you finish rolling, you gain an accuracy bonus with the strike equal to the number of unused rerolls.
      `,
      rank: 6,
      scaling: {
        7: 'You can reroll six times instead of five.',
      },
    },
    {
      name: 'Quicksilver Ambush',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Move up to half your speed, then make a \\glossterm{mundane} melee strike.
        If the target was \\partiallyunaware or \\unaware of you before your movement, they remain so until after your strike.
        From an observer's perspective, the movement and the strike happen simultaneously in a blur of motion.
      `,
      rank: 3,
      scaling: 'accuracy',
    },
    {
      name: 'Quicksilver Assassination',

      functionsLike: {
        name: 'quicksilver ambush',
        exceptThat: 'the strike deals double \\glossterm{weapon damage}.',
      },
      rank: 7,
    },

    {
      name: 'Hostile Timeseal',

      attack: {
        hit: `
          If the target has no remaining damage resistance, it becomes \\glossterm{briefly} frozen in time.
          It becomes completely immune to all damage, attacks, and effects of any kind.
          In addition, it cannot act in any way, and the duration of other effects on it does not expire.
          At the end of the next round, it returns to normal, with no awareness of the intervening time.
          After it returns to normal, it \\glossterm{briefly} becomes immune to this effect.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Slowing Grasp',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Mental against one creature you \\glossterm{touch}.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Slow',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target's local time stream is disturbed as a \\glossterm{condition}.
          While it is below its maximum \\glossterm{hit points}, it is \\slowed.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Efficient Slow',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Mass Slow',

      functionsLike: {
        name: 'slow',
        exceptThat: 'it affects all creatures in a \\medarea radius within \\medrange.',
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Accelerated Dodge',

      effect: `
        You gain a \\plus2 bonus to your Armor and Reflex defenses this round.
        In addition, you can move up to half your land speed.
        This defense bonus is \\atSwift, so it protects you against attacks during the current phase, but the movement is not Swift.
      `,
      rank: 1,
      tags: ['Swift (see text)'],
    },
    {
      name: 'Distant Accelerated Dodge',

      effect: `
        You gain a \\plus3 bonus to your Armor and Reflex defenses this round.
        In addition, you can move up to your land speed.
        This defense bonus is \\atSwift, so it protects you against attacks during the current phase, but the movement is not Swift.
      `,
      rank: 5,
      tags: ['Swift (see text)'],
    },

    {
      name: 'Slowtime Field',

      effect: `
        You create a field of slowed time in a \\smallarea radius \\glossterm{zone} within \\shortrange.
        All creatures with no remaining \\glossterm{damage resistance} are \\slowed while they are in the area.
      `,
      rank: 2,
      type: 'Sustain (minor)',
    },

    {
      name: 'Efficient Slowtime Field',

      effect: `
        You create a field of slowed time in a \\smallarea radius \\glossterm{zone} within \\shortrange.
        All creatures are \\slowed while they are in the area.
      `,
      rank: 6,
      type: 'Sustain (minor)',
    },

    // -3 ranks for 50% chance of activation, +1 rank for preapply.
    {
      name: 'Stutterstop',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, each target randomly slows down.
          At the start of each round, if it is below its maximum \\glossterm{hit points}, it has a 50\\% chance to be \\slowed during that round.
        `,
        targeting: `
          Make an attack vs. Mental against everything in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 3,
      roles: ['maim'],
      scaling: 'accuracy',
    },

    {
      name: 'Haste',

      effect: `
        You gain a +10 foot \\glossterm{enhancement bonus} to your land speed.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Greater Haste',

      effect: `
        You gain a +10 foot \\glossterm{enhancement bonus} to speed with all movement modes.
        In addition, you can take two \\glossterm{minor actions} each round instead of one.
      `,
      rank: 7,
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    {
      name: 'Weapon Haste',

      effect: `
        As a \\glossterm{minor action}, you can make a \\glossterm{strike} with a -2 accuracy penalty using a single weapon.
        This strike cannot be a \\glossterm{dual strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with this ability (see \\pcref{Power}).
      `,
      rank: 4,
      roles: ['attune'],
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    {
      name: 'Temporal Duplicate',

      castingTime: 'minor action',
      cost: 'One \\glossterm{fatigue level}, and you \\glossterm{briefly} cannot cast this spell again.',
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        You reach into a possible future and create a duplicate of the target.
        The duplicate is identical in all ways to the target when the spell resolves.

        The target and its duplicate can act during the next round.
        At the end of that round, the target and its duplicate cease to exist.
        During that round, time does not pass for the target.
        At the end of the following round, the target reappears in the place where it ceased to exist.
        If that space is occupied, it appears in the closest unoccupied space.
        When the target reappears, its condition is unchanged from when it left.
        Its \\glossterm{hit points}, conditions, and all other statistics are unaffected, regardless of any damage or other negative effects suffered by the duplicate.

        The duplicate is fragile, and its actions are limited.
        It cannot use abilities that have limitations on their usage, such as only being usable once per short rest.
        It cannot use abilities that would increase its \\glossterm{fatigue level}, cause it to lose hit points, or otherwise directly suffer negative consequences as a cost of the action.
        If it loses any \\glossterm{hit points}, it ceases to exist.
      `,
      rank: 6,
    },

    {
      name: 'Time Hop',

      castingTime: 'minor action',
      effect: `
        Choose either yourself or one Medium or smaller \\glossterm{ally} or \\glossterm{unattended} object within \\medrange.
        You send the target into the future, causing it to temporarily cease to exist.
        When you cast this spell, you choose how many rounds the target ceases to exist for, up to a maximum of five rounds.
        At the end of the last round, it reappears in the same location where it disappeared.

        The area the target occupied can be physically crossed, but it is treated as an invalid destination for teleportation and other similar magic.
        When the target reappears, all of its surroundings are adjusted as if the object had retroactively always existed in its space.
        For example, if the location is occupied by a creature that walked into the area, the creature is relocated to the closest unoccupied space along the path it took to reach the target.
      `,
      rank: 2,
      scaling: {
        4: `The maximum size of the target increases to Large.`,
        6: `The maximum size of the target increases to Huge.`,
      },
    },

    {
      name: 'Temporal Stasis',

      castingTime: 'minor action',
      effect: `
        Choose yourself or one Large or smaller \\glossterm{ally} within \\medrange.
        The target is placed into stasis, rendering it unconscious.
        While in stasis, it cannot take any actions and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.

        % TODO: wording
        This effect normally lasts as long as you \\glossterm{attune} to it, and until the end of the round when you release the attunement.
        If you use this ability on yourself, it instead lasts for a number of rounds you choose when you cast the spell, up to a maximum of five rounds.
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Time Lock -- Mind',

      effect: `
        Choose yourself or an \\glossterm{ally} within \\medrange.
        You create a \\sphereterm{time lock} for the target's current \\glossterm{conditions}.
        You can unseal the time lock as a standard action.

        Unsealing the time lock causes the creature's conditions to become identical to the locked conditions.
        This removes any excess conditions and reapplies any missing conditions.
        In addition, the creature increases its \\glossterm{fatigue level} by one.
      `,
      rank: 4,
      type: 'Sustain (minor)',
    },

    {
      name: 'Time Lock -- Location',

      effect: `
        Choose yourself or an \\glossterm{ally} within \\medrange.
        You create a \\sphereterm{time lock} for the target's current location.
        You can unseal the time lock as a standard action.

        Unsealing the time lock causes the creature to disappear from its current location and reappear in the locked location.
        This looks and behaves similarly to \\glossterm{teleportation}, but it is not a teleportation effect and does not require \\glossterm{line of sight} or \\glossterm{line of effect}.
        If the locked location is occupied, the creature reappears in the closest open space.
      `,
      rank: 1,
      type: 'Sustain (minor)',
    },

    {
      name: 'Efficient Time Lock -- Location',

      functionsLike: {
        name: 'time lock -- location',
        exceptThat: `
          the target attunes to the effect, so you don't have to sustain it.
          When you cast this spell, you can choose whether the lock unseals automatically when the target ends its attunement.
          If you do, you can still \\glossterm{dismiss} the effect to end it without unsealing the lock.
        `,
      },
      rank: 5,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Time Lock -- Health',

      effect: `
        Choose yourself or an \\glossterm{ally} within \\medrange.
        You create a \\sphereterm{time lock} for the target's current \\glossterm{hit points}.
        You can unseal the time lock as a standard action.

        Unsealing the time lock causes the creature's hit points to become identical to the locked hit points.
        In addition, the creature increases its \\glossterm{fatigue level} by two.
      `,
      rank: 4,
      type: 'Sustain (minor)',
    },

    {
      name: 'Time Lock -- Vitality',

      effect: `
        Choose yourself or an \\glossterm{ally} within \\medrange.
        You create a \\sphereterm{time lock} for the target's current \\glossterm{vital wounds}.
        You can unseal the time lock as a standard action.

        Unsealing the time lock causes the creature's vital wounds to become identical to the locked vital wounds.
        This removes any excess vital wounds and reapplies any missing vital wounds.
        In addition, the creature increases its \\glossterm{fatigue level} by four.
      `,
      rank: 7,
      type: 'Sustain (minor)',
    },

    {
      name: 'Time Stop',

      effect: `
        You can take two full rounds of actions immediately.
        During this time, all other creatures and objects are fixed in time, and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.
        You can still affect yourself and create areas or new effects.
        When this effect ends, you are \\stunned as a \\glossterm{condition}.

        You are still vulnerable to danger, such as from heat or dangerous gases.
        However, you cannot be detected by any means while you travel.

        After you cast this spell, you cannot cast it again until you finish a \\glossterm{short rest}.
      `,
      rank: 7,
    },

    {
      name: 'Accelerated Evasion',

      effect: `
        You take no damage from \\glossterm{glancing blows} or misses caused by abilities that affect an area and attack your Armor or Reflex defense.
        This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune (deep)',
    },
    {
      name: 'Efficient Accelerated Evasion',

      functionsLike: {
        name: 'accelerated evasion',
        exceptThat: 'it has the \\abilitytag{Attune} tag instead of \\abilitytag{Attune} (deep).',
      },
      rank: 6,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Instant Analysis',

      effect: `
        You accelerate your mind to incredible speed, allowing you to process information quickly.
        From your perspective, you freeze time for five rounds.
        During this time, all creatures and objects are fixed in time, and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.
        Your mind remains active during this time, and you are the only one aware of the stoppage of time.
        You cannot move or take any actions other than to observe your surroundings.
        In addition, you can release the time freeze as a \\glossterm{free action}.
        When this spell ends, time resumes in the same phase that it was originally frozen.

        After casting this spell, you cannot cast it again until you finish a \\glossterm{short rest}.
      `,
      rank: 3,
    },

    {
      name: 'Accelerated Draw',

      effect: `
        This spell has no \\glossterm{somatic components}.

        You draw one or two weapons into your \\glossterm{free hands}.
        Then, you can make a \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with this ability (see \\pcref{Power}).
      `,
      narrative: `
        This spell seeks to mimic with time-altering magic what some skilled warriors can do naturally.
      `,
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Quickchange',

      effect: `
        You can change your appearance or equipment with superhuman speed.
        This has no effect on any creatures other than yourself.
        This can have any one of the following effects, which are completed at the end of the current round regardless of the time they would normally take:
        \\begin{itemize}
          \\item You can take off your body armor or clothing, along with any weapons or shields you have equipped.
            You can leave the items on the ground in your square or stow them in an available location, such as in a backpack you wear.
          \\item You can don a new set of body armor or clothing and equip any weapons or shields.
            All of the items you equip this way must be unattended and in your square, but they can be in a hidden location, such as in a backpack.
          \\item You can use the \\textit{change appearance} ability to affect yourself with a \\minus2 penalty (see \\pcref{Change Appearance}.
        \\end{itemize}

        % There must be text between an itemize block and the end of a mdframed env
        \\hypertarget{itemizespace}{}
      `,
      narrative: `
        You become a blur of motion as you quickly don your armor, readying yourself against an unexpected attack.
      `,
      rank: 2,
      scaling: {
        4: 'You can perform any two of the listed actions.',
        6: 'You can perform any combination of the listed actions.',
      },
    },

    {
      name: 'Accelerated Legerdemain',

      effect: `
        If you have Sleight of Hand as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
        Otherwise, you are treated as being trained in that skill.
      `,
      rank: 1,
      roles: ['attune'],
      narrative: `
        You speed up your fine motions, allowing you to lift pockets and perform subtle feats with ease.
      `,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: 'Attune',
    },

    {
      name: 'Rewind Damage',

      cost: 'One \\glossterm{fatigue level} from the target.',
      effect: `
        Chose yourself or one \\glossterm{ally} within \\shortrange.
        The target regains 1d8 \\glossterm{damage resistance} \\plus1 per power.
        This recovery is doubled for each consecutive round that you have cast this spell on the same target.
      `,
      rank: 2,
      // At rank 3, expected power is about 6. dr3 is 4.5+6 = 10.5 healing, and dr4 would
      // be 5.5+7 = 12.5 healing.
      scaling: { special: 'The recovery increases by +2 for each rank beyond 2.' },
      tags: ['Swift'],
    },

    {
      name: 'Empowered Rewind Damage',

      functionsLike: {
        name: 'rewind damage',
        exceptThat: 'the recovery increases to 1d8 plus 1d8 per 3 power.',
      },
      rank: 5,
      scaling: { special: 'The recovery increases by 1d8 for each rank beyond 5.' },
      tags: ['Swift'],
    },

    // small cone instead of med cone because you can choose the condition and it has the
    // weird accuracy bonus
    {
      name: 'Wave of Senescence',
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, each target is \\dazzled if you focused on sight or \\deafened if you focused on hearing.
        `,
        targeting: `
          Make an attack vs. Fortitude against each creature in a \\smallarea cone.
          In addition, you choose to focus the aging effects of the cone on either sight or hearing.
          This ability has the \\atVisual tag if you focus on sight, and the \\atAuditory tag if you focus on hearing.
          You gain a +2 accuracy bonus against creatures that are too young or too old to be ordinary adults.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    // +1 rank to combine dazzled and deafened
    {
      name: 'Massive Wave of Senescence',
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, each target is \\dazzled and \\deafened.
        `,
        targeting: `
          Make an attack vs. Fortitude against each creature in a \\largearea cone.
          This ability has the \\atVisual tag if you focus on sight, and the \\atAuditory tag if you focus on hearing.
          You gain a +2 accuracy bonus against creatures that are too young or too old to be ordinary adults.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
    },
    // d2l instead of d2 for accuracy
    {
      name: 'Unstable Aging',
      attack: {
        hit: `
          \\damageranktwolow.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
          You gain a +2 accuracy bonus against creatures that are too young or too old to be ordinary adults.
        `,
      },
      rank: 2,
      scaling: { special: 'The damage increases by 1d8 for each rank beyond 2.' },
    },
    // d6l instead of d6 for accuracy
    {
      name: 'Mighty Unstable Aging',
      attack: {
        hit: `
          \\damageranksixlow.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
          You gain a +4 accuracy bonus against creatures that are too young or too old to be ordinary adults.
        `,
      },
      rank: 6,
      scaling: { special: 'The damage increases by 3d8 for each rank beyond 6.' },
    },

    {
      name: 'Accelerated Expiration',

      effect: `
        You remove a \\glossterm{condition} of your choice.
      `,
      rank: 4,
    },
  ],
};
