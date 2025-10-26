import { MysticSphere } from '.';
import { BRIEF_COOLDOWN, CONDITION_CRIT, MINOR_FATIGUE } from '../constants';

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

      // Focused once is 0.4 EA, which is too low for a rank 1 attunement, but fine for a
      // cantrip.
      effect: `
        Whenever you make an \\glossterm{attack roll}, you can \\glossterm{reroll} it.
        After you do, this ability is \\glossterm{dismissed}.

        You can decide to activate this effect after you learn whether the original roll hit or missed.
        However, you must use it before you learn what the effects of a hit would be, such as the damage it would deal on a hit.
      `,
      roles: ['attune'],
      type: 'Attune',
    },
  ],
  spells: [
    // TODO: calculate EA for movement effects
    {
      name: 'Burst of Speed',

      effect: `
        When you use the \\ability{sprint} ability as a \\glossterm{move action}, you can choose not to increase your \\glossterm{fatigue level}.
        After you sprint in this way, this ability is \\glossterm{dismissed}.
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
        After you rewind time in this way, this ability is \\glossterm{dismissed}.
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
        After you rewind time in this way, this ability is \\glossterm{dismissed}.
      `,
      rank: 5,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Quicksilver Flurry',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make two \\glossterm{mundane} \\glossterm{strikes}.
      `,
      rank: 5,
      roles: ['burst'],
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
      roles: ['clear'],
      scaling: 'accuracy',
    },
    {
      name: 'Quicksilver Perfection',

      cost: BRIEF_COOLDOWN,
      // `output [highest 1 of 5d[explode 1d10]]` has a mean of 11.5, or +6 accuracy.
      // Assuming a 6 hits, it gets a crit (16 or higher) 22% of the time.
      // Expected damage is 0.96 + 0.22 + 0.25 = 1.43x hit damage.
      // A normal strike is 0.6 + 0.2 + 0.02 = 0.82x hit damage, but double damage, so
      // 1.64x hit damage.
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{mundane} melee \\glossterm{strike}.
        You can reroll the attack roll up to four times, keeping the highest result.
      `,
      rank: 4,
      roles: ['burst'],
      scaling: 'accuracy',
    },
    {
      name: 'Quicksilver Infinity',

      cost: 'One \\glossterm{fatigue level}.',
      // `output [highest 1 of 5d[explode 1d10]]` has a mean of 11.5, or +6 accuracy.
      // Assuming a 6 hits, it gets a crit (16 or higher) 22% of the time.
      // Expected damage is 0.96 + 0.22 + 0.25 = 1.43x hit damage, x2 from double damage,
      // x2 from two strikes = 5.72x hit damage.
      // A normal strike is 0.6 + 0.2 + 0.02 = 0.82x hit damage, but doubled (two standard
      // actions) and tripled (normal rank 7 strike) = 4.92x hit damage.
      effect: `
        This spell has no \\glossterm{somatic components}.

        When you cast this spell, time begins to visibly twist and warp around you.
        Next round, you can spend a \\glossterm{standard action} to make two \\glossterm{mundane} melee \\glossterm{strikes}.
        Each strike deals double damage.
        You can reroll the attack roll for the strike up to four times, keeping the highest result.
      `,
      rank: 7,
      roles: ['burst', 'exertion'],
      scaling: 'accuracy',
    },
    {
      name: 'Quicksilver Ambush',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Move up to your speed, then make a \\glossterm{mundane} melee strike.
        If the target was \\partiallyunaware or \\unaware of you before your movement, they remain so until after your strike.
        From an observer's perspective, the movement and the strike happen simultaneously in a blur of motion.
      `,
      rank: 3,
      roles: ['dive'],
      scaling: 'accuracy',
    },
    {
      name: 'Quicksilver Assassination',

      functionsLike: {
        name: 'quicksilver ambush',
        exceptThat: 'the strike deals double damage.',
      },
      roles: ['dive'],
      rank: 6,
    },

    // TODO: greater version
    {
      name: 'Hostile Timeseal',

      // Time skip is normally 2.5 EA. Assume that it's 75% effectiveness with the HP
      // condition, so 1.9 EA, which is about rank 4.
      attack: {
        hit: `
          If the target is \\glossterm{injured}, it becomes \\glossterm{briefly} frozen in time.
          It becomes completely immune to all damage, attacks, and effects of any kind.
          In addition, it cannot act in any way, and the duration of other effects on it does not expire.
          At the end of the next round, it returns to normal, with no awareness of the intervening time.
          After it returns to normal, it \\glossterm{briefly} becomes immune to this effect.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 4,
      roles: ['maim', 'stasis'],
      scaling: 'accuracy',
      tags: [],
    },

    // Brief slow is r2, so melee is r0. We can get HP with r2
    {
      name: 'Slowing Grasp',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target \\glossterm{briefly} \\slowed.
          If it is \\glossterm{injured}, is also slowed as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Mental against one creature you \\glossterm{touch}.
        `,
      },
      rank: 2,
      roles: ['softener', 'maim'],
      scaling: 'accuracy',
    },

    {
      name: 'Efficient Slowing Grasp',

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
      rank: 7,
      roles: ['softener'],
      // scaling: 'accuracy',
    },

    // Slow HP is 2.1 EA. Short range is a little closer to melee, so call it 2 EA, or r4.
    {
      name: 'Slow',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          If the target is \\glossterm{injured}, it is \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 4,
      roles: ['maim'],
      scaling: 'accuracy',
    },

    {
      name: 'Accelerated Dodge',

      cost: BRIEF_COOLDOWN,
      effect: `
        You are \\braced this round.
        In addition, you can move up to half your \\glossterm{speed}.
        This defense bonus is \\atSwift, so it protects you against attacks during the current phase, but the movement is not Swift.
      `,
      rank: 1,
      roles: ['turtle', 'mobility'],
      tags: ['Swift (see text)'],
    },
    {
      name: 'Distant Accelerated Dodge',

      // TODO: full EA math. What is sprint + total defense worth?
      effect: `
        You are \\braced this round.
        In addition, you can move up to twice your \\glossterm{speed}.
        This defense bonus is \\atSwift, so it protects you against attacks during the current phase, but the movement is not Swift.
      `,
      rank: 5,
      roles: ['turtle'],
      tags: ['Swift (see text)'],
    },

    {
      name: 'Slowtime Field',

      // Brief slow is 2 EA, so a field would be 3 EA. HP condition is 75% Ea, so 2.2 EA,
      // which is r5. Add +1r for area, so Medium in Medium range? Not sure how the area
      // calculations work here.
      effect: `
        You create a field of slowed time in a \\medarea radius \\glossterm{zone} within \\medrange.
        All \\glossterm{injured} creatures are \\slowed while they are in the area.
      `,
      rank: 6,
      roles: ['flash', 'hazard'],
      type: 'Sustain (minor)',
    },

    // Treat this as 60% of the effectiveness of a regular slow. Normal HP slow is 2.1 EA,
    // 2.5 EA with preapply, so this would be 1.5 EA.
    {
      name: 'Stutterstop',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, the target randomly slows down.
          At the start of each round, if it \\glossterm{injured}, it has a 50\\% chance to be \\slowed during that round.
        `,
        targeting: `
          Make an attack vs. Mental against up to two creatures in \\shortrange.
        `,
      },
      rank: 2,
      roles: ['maim'],
      scaling: 'accuracy',
    },

    {
      name: 'Haste',

      effect: `
        You gain a +10 foot \\glossterm{enhancement bonus} to your \\glossterm{speed}.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Greater Haste',

      effect: `
        You gain a +10 foot \\glossterm{enhancement bonus} to your \\glossterm{speed}.
        In addition, you can take two \\glossterm{minor actions} each round instead of one.
      `,
      rank: 7,
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    {
      name: 'Weapon Haste',

      effect: `
        As a \\glossterm{minor action}, you can make a \\glossterm{mundane} \\glossterm{strike} with a \\minus2 accuracy penalty.
        All \\glossterm{extra damage} does not apply to this strike.
      `,
      rank: 4,
      roles: ['attune'],
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Weapon Haste',

      effect: `
        As a \\glossterm{minor action}, you can make a \\glossterm{mundane} \\glossterm{strike} that deals double damage.
        All \\glossterm{extra damage} does not apply to this strike.
      `,
      rank: 7,
      roles: ['attune'],
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    {
      name: 'Temporal Duplicate',

      // TODO: EA math
      usageTime: 'minor',
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
      rank: 7,
      roles: ['boon', 'exertion'],
    },

    {
      name: 'Temporal Stasis',

      usageTime: 'minor',
      effect: `
        Choose either yourself or one Medium or smaller \\glossterm{ally} or \\glossterm{unattended} object within \\medrange.
        The target is placed into stasis.
        While in stasis, it cannot be targeted, moved, damaged, or otherwise affected in any way, and a creature is \\glossterm{unconscious}.

        % TODO: wording
        This effect normally lasts as long as you \\glossterm{sustain} it.
        Since releasing sustained effects is \\atSwift, it can attack and be attacked during the action phase when you release it from stasis.
        If you use this ability on yourself, it instead lasts for a number of rounds you choose when you cast the spell, up to a maximum of five rounds.
      `,
      rank: 3,
      roles: ['boon'],
      scaling: {
        5: `The maximum size of the target increases to Large.`,
        7: `The maximum size of the target increases to Huge.`,
      },
      type: 'Sustain (minor)',
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
      roles: ['cleanse', 'exertion'],
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
        When the time lock is unsealed, this effect ends.
      `,
      rank: 1,
      roles: ['mobility'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Time Lock -- Health',

      effect: `
        Choose yourself or an \\glossterm{ally} within \\medrange.
        You create a \\sphereterm{time lock} for the target's current \\glossterm{hit points}.
        You can unseal the time lock as a standard action.

        Unsealing the time lock causes the creature's hit points to become identical to the locked hit points.
        In addition, the creature increases its \\glossterm{fatigue level} by one.
      `,
      rank: 6,
      roles: ['healing', 'exertion'],
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
        The creature increases its \\glossterm{fatigue level} by three for each vital wound removed in this way.
      `,
      rank: 7,
      roles: ['healing', 'exertion'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Time Stop',

      // TODO: EA math
      cost: 'One \\glossterm{fatigue level}, and you are \\stunned as a \\glossterm{condition}. You also cannot cast this spell again until you finish a \\glossterm{short rest}.',
      effect: `
        You can take two full rounds of actions immediately.
        During this time, all other creatures and objects are fixed in time, and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.
        You can still affect yourself and create areas or new effects.
        When this effect ends, you are \\stunned as a \\glossterm{condition}.

        You are still vulnerable to danger, such as from heat or dangerous gases.
        However, you cannot be detected by any means while you travel.

        After you cast this spell, you cannot cast it again until you finish a \\glossterm{short rest}.
      `,
      roles: ['focus', 'exertion'],
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
      type: 'Attune',
    },

    {
      name: 'Greater Accelerated Evasion',

      effect: `
        You take no damage from \\glossterm{glancing blows} or misses caused by abilities that affect an area.
        This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
      `,
      rank: 5,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Instant Analysis',

      usageTime: 'minor',
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
      roles: ['focus'],
    },

    {
      name: 'Accelerated Draw',

      effect: `
        This spell has no \\glossterm{somatic components}.

        You draw one or two weapons into your \\glossterm{free hands}.
        Then, you can make a \\glossterm{mundane} \\glossterm{strike}.
      `,
      narrative: `
        This spell seeks to mimic with time-altering magic what some skilled warriors can do naturally.
      `,
      rank: 1,
      roles: ['burst'],
      scaling: 'accuracy',
    },

    {
      name: 'Quickchange',

      effect: `
        You can change your appearance or equipment with superhuman speed.
        This has no effect on any creatures other than yourself.
        This can have any one of the following effects, which are completed at the end of the current round regardless of the time they would normally take:
        \\begin{mdframeditemize}
          \\item You can take off your body armor or clothing, along with any weapons or shields you have equipped.
            You can leave the items on the ground in your square or stow them in an available location, such as in a backpack you wear.
          \\item You can don a new set of body armor or clothing and equip any weapons or shields.
            All of the items you equip this way must be unattended and in your square, but they can be in a hidden location, such as in a backpack.
          \\item You can use the \\textit{change appearance} ability to affect yourself with a \\minus2 penalty (see \\pcref{Change Appearance}.
        \\end{mdframeditemize}
      `,
      narrative: `
        You become a blur of motion as you quickly don your armor, readying yourself against an unexpected attack.
      `,
      rank: 2,
      roles: ['narrative'],
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
        The target regains 1d8 \\glossterm{hit points} \\plus1 per power.
        This recovery is doubled for each consecutive round that you have cast this spell on the same target.
      `,
      rank: 2,
      roles: ['healing', 'exertion'],
      // At rank 3, expected power is about 6. dr3 is 4.5+6 = 10.5 healing, and dr4 would
      // be 5.5+7 = 12.5 healing.
      scaling: { special: 'The recovery increases by +2 for each rank beyond 2.' },
      tags: ['Swift'],
    },

    {
      name: 'Greater Rewind Damage',

      functionsLike: {
        name: 'rewind damage',
        exceptThat: 'the recovery increases to 1d8 plus 1d8 per 3 power.',
      },
      rank: 5,
      roles: ['healing', 'exertion'],
      scaling: { special: 'The recovery increases by 1d8 for each rank beyond 5.' },
      tags: ['Swift'],
    },

    // Deafened hp is 0.5 EA. dazzled hp is 0.7 EA. Combined is 1.2 EA, plus brief is 1.6
    // EA. Add +1 rank for area, so total area rank 4.
    // weird accuracy bonus doesn't get a rank value
    {
      name: 'Wave of Senescence',
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\glossterm{briefly} \\deafened and \\dazzled.
          If it is \\glossterm{injured}, it is also deafened and dazzled as a single \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against each \\glossterm{enemy} in a \\largearea cone.
          You gain a +2 accuracy bonus against creatures that are too young or too old to be ordinary adults.
        `,
      },
      rank: 3,
      roles: ['flash', 'maim'],
      scaling: 'accuracy',
      tags: ['Auditory', 'Visual'],
    },

    // Sum is 3.0 EA. Limited scope is rank 8, then drop to rank 7 for lack of synergy.
    {
      name: 'Massive Wave of Senescence',
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\dazzled and \\deafened as a single \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against each \\glossterm{enemy} in a \\largearea cone.
          You gain a +2 accuracy bonus against creatures that are too young or too old to be ordinary adults.
        `,
      },
      rank: 7,
      roles: ['flash'],
      scaling: 'accuracy',
      tags: ['Auditory', 'Visual'],
    },
    {
      name: 'Unstable Aging',
      attack: {
        hit: `
          \\damagerankthree.
        `,
        targeting: `
          Make an attack vs. Fortitude with a -4 accuracy penalty against one living creature within \\medrange.
          You gain a +2 accuracy bonus against creatures that are too young or too old to be ordinary adults.
        `,
      },
      rank: 1,
      roles: ['burst'],
      scaling: 'damage',
    },
    {
      name: 'Mighty Unstable Aging',
      attack: {
        hit: `
          \\damageranksix, and any \\glossterm{extra damage} is doubled.
        `,
        targeting: `
          Make an attack vs. Fortitude with a -4 accuracy penalty against one living creature within \\medrange.
          You gain a +2 accuracy bonus against creatures that are too young or too old to be ordinary adults.
        `,
      },
      rank: 4,
      roles: ['burst'],
      scaling: 'damage',
    },

    // This spends a standard action to gain an extra minor action, kind of.
    // Spending time in stasis an also be valuable; this is a strong escape effect.
    {
      name: 'Pour Time Sideways',

      effect: `
        You are \\glossterm{briefly} locked in stasis.
        While in stasis, you are \\debuff{unconscious} and cannot be targeted, moved, damaged, or otherwise affected in any way.
        In the round after your stasis ends, you can take an extra \\glossterm{move action} during the \\glossterm{movement phase} and an extra \\glossterm{minor action} during the \\glossterm{action phase}.
      `,
      rank: 2,
      roles: ['focus'],
    },

    // This spends two move actions to relocate a standard action.
    {
      name: 'Greater Pour Time Sideways',

      effect: `
        You are \\glossterm{briefly} locked in stasis.
        While in stasis, you are \\debuff{unconscious} and cannot be targeted, moved, damaged, or otherwise affected in any way.
        In the round after your stasis ends, you cannot take any actions during the \\glossterm{movement phase}.
        However, you can take an extra standard action during that round's \\glossterm{action phase}.
      `,
      rank: 6,
      roles: ['focus'],
    },

    {
      name: 'Timeseal',

      cost: MINOR_FATIGUE,
      effect: `
        Choose yourself or one Medium or smaller \\glossterm{ally} within \\medrange.
        The target becomes \\glossterm{briefly} frozen in time.
        It becomes completely immune to all damage, attacks, and effects of any kind.
        In addition, it cannot act in any way, and the duration of other effects on it does not expire.
        At the end of the next round, it returns to normal, with no awareness of the intervening time.
        After it returns to normal, it \\glossterm{briefly} becomes immune to this effect.
      `,
      roles: ['boon'],
      rank: 2,
      scaling: {
        4: 'The maximum size increases to Large.',
        6: 'The maximum size increases to Huge.',
      },
    },

    // 0.8 EA
    {
      name: 'Time Ebbs and Flows',

      effect: `
        You are \\braced this round.
        Next round, you are \\focused.
        This defense bonus is \\atSwift, so it protects you against attacks during the current phase.
      `,
      rank: 1,
      roles: ['turtle', 'focus'],
      tags: ['Swift'],
    },

    {
      name: 'Time Bends and Twists',

      effect: `
        You are \\braced this round.
        Next round, you are \\primed.
        This defense bonus is \\atSwift, so it protects you against attacks during the current phase.
      `,
      rank: 6,
      roles: ['turtle', 'focus'],
      tags: ['Swift'],
    },
  ],
};
