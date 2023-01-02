import { MysticSphere } from '.';

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
      name: 'Accelerated Reading',

      effect: `
        You can read at twice your normal speed.
        However, the mental effort imposes a -4 penalty to your Mental defense.
      `,
      scaling: {
        2: 'You can read at three times your normal speed.',
        4: 'You can read at five times your normal speed.',
        6: 'You can read at ten times your normal speed.',
      },
      type: 'Sustain (minor)',
    },
    {
      name: 'Rapid Aging',

      effect: `
        Choose one Large or smaller \\glossterm{unattended}, nonmagical object within \\medrange.
        In addition, choose any number of hours, up to 24 hours.
        The target ages as if that much time had passed.
        When this spell ends, the object returns to its original state.
      `,
      scaling: {
        2: 'You can choose to age the target by up to a week.',
        4: 'You can choose to age the target by up to a month.',
        6: 'You can choose to age the target by up to three months.',
      },
      type: 'Sustain (minor)',
    },
    {
      name: 'Rewind',

      effect: `
        Whenever you make an \\glossterm{attack} or \\glossterm{check}, you can \\glossterm{reroll} it.
        If you do, this effect ends.

        You can decide to activate this effect after you learn whether the original roll succeeded or failed.
        You can even use it after you learn what the effects of a successful attack or check would be, if that is information you could normally learn if it succeeded.
        However, you must use it before using any other abilities or ending your turn.
      `,
      scaling: {
        2: 'You gain a +2 bonus to the reroll.',
        4: 'The bonus increases to +3.',
        6: 'The bonus increases to +4.',
      },
      type: 'Attune (deep)',
    },
  ],
  spells: [
    {
      name: 'Accelerated Twinstrike',

      effect: `
        Make a \\glossterm{strike}.
        You may use the higher of your Strength and your Willpower to determine your damage with the strike (see \\pcref{Dice Bonuses From Attributes}).
        You may reroll the accuracy roll and take the highest result.
        However, you do not add your \\glossterm{power} to damage with the strike.
      `,
      rank: 1,
      scaling: {
        3: 'You gain a +1 accuracy bonus with the strike.',
        5: 'The accuracy bonus increases to +2.',
        7: 'The accuracy bonus increases to +3.',
      },
      tags: [],
    },
    {
      name: 'Accelerated Triplestrike',

      effect: `
        Make a \\glossterm{strike}.
        You may use the higher of your Strength and your Willpower to determine your damage with the strike (see \\pcref{Dice Bonuses From Attributes}).
        You may reroll the accuracy roll twice and take the highest result.
        However, you do not add your \\glossterm{power} to damage with the strike.
      `,
      rank: 5,
      scaling: {
        7: 'You gain a +1 accuracy bonus with the strike.',
      },
    },

    // This is a very unique combination of triggers and effects, so correct rank is hard
    {
      name: 'Temporal Dislocation',

      attack: {
        crit: `
          The chance increases to 50\\% if the target takes damage, or 100\\% if it loses hit points.
        `,
        hit: `
          The target is dislocated in time as a \\glossterm{condition}.
          At the end of each round, if the target took damage during that round, it has a 20\\% chance to be sent forward in time by one round.
          This chance increases to 50\\% if it lost hit points during the round.
          During that time, it ceases to exist.
          At the end of the next round, it returns to its original location, or the closest open space if that location is occupied.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Disjointed Deceleration',

      attack: {
        hit: `
          The target takes 1d6 energy damage.
          If it loses \\glossterm{hit points} from this damage, it is \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'damage',
    },

    {
      name: 'Slow',

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `The target is \\slowed as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Mass Slow',

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `Each target is \\slowed as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
    },

    // -2 levels for 50% chance of activation
    {
      name: 'Stutterstop',

      attack: {
        crit: `The target is immobilized every round as long as it has no remaining damage resistance.`,
        hit: `
          As a \\glossterm{condition}, the target is \\slowed and randomly immobilized.
          At the start of each round, if it has no remaining \\glossterm{damage resistance}, it has a 50\\% chance to be \\immobilized during that round.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },

      rank: 7,
      scaling: 'accuracy',
    },

    {
      name: 'Haste',

      effect: `
        You gain a +10 foot \\glossterm{magic bonus} to your land speed.
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Greater Haste',

      effect: `
        You gain a +10 foot \\glossterm{magic bonus} to speed with all movement modes.
        In addition, you can take two \\glossterm{minor actions} each round instead of one.
        As normal, you cannot use the same ability twice in the same round.
      `,
      rank: 7,
      type: 'Attune (deep)',
    },

    {
      name: 'Weapon Haste',

      effect: `
        As a \\glossterm{minor action}, you can make a \\glossterm{strike} with a -3 penalty to \\glossterm{accuracy}.
        You may use the higher of your Strength and your Willpower to determine your damage with the strike (see \\pcref{Dice Bonuses From Attributes}).
        You do not add your \\glossterm{power} to damage with the strike.
      `,
      rank: 4,
      scaling: { 6: `The accuracy penalty is reduced to -2.` },
      type: 'Attune (deep)',
    },

    {
      name: 'Temporal Duplicate',

      castingTime: 'minor action',
      effect: `
        When you cast this spell, you increase your \\glossterm{fatigue level} by one.
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
      rank: 5,
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
        Choose yourself or one Medium or smaller \\glossterm{ally} within \\medrange.
        The target is placed into stasis, rendering it unconscious.
        While in stasis, it cannot take any actions and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.

        % TODO: wording
        This effect normally lasts as long as you \\glossterm{attune} to it, and until the end of the round when you release the attunement.
        If you use this ability on yourself, it instead lasts for a number of rounds you choose when you cast the spell, up to a maximum of five rounds.
      `,
      rank: 4,
      scaling: { 6: `The maximum size of the target increases to Large.` },
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
      rank: 2,
      type: 'Sustain (minor)',
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

        After you cast this spell, you cannot cast it again until you take a \\glossterm{short rest}.
      `,
      rank: 7,
    },

    {
      name: 'Evasion',

      effect: `
        You take half damage from abilities that affect an area and attack your Armor or Reflex defense.
        This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
      `,
      rank: 3,
      type: 'Attune (deep)',
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

        After casting this spell, you cannot cast it again until you take a \\glossterm{short rest}.
      `,
      rank: 3,
    },

    {
      name: 'Timeseal',

      // effect: '',
      // narrative: '',
      attack: {
        hit: `
          The target takes 1d10 + half \\glossterm{power} energy damage.
          If it loses \\glossterm{hit points} from this damage, it is \\glossterm{briefly} frozen in time.
          It becomes completely immune to all damage, attacks, and effects of any kind.
          In addition, it cannot act in any way, and the duration of other effects on it does not expire.
          At the end of the next round, it returns to normal, with no awareness of the intervening time.
          After it returns to normal, it becomes immune to being frozen in time in this way until it takes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 3,
      scaling: 'damage',
    },
    {
      name: 'Certain Timeseal',

      functionsLike: {
        name: 'timeseal',
        exceptThat:
          'you gain a +3 accuracy bonus with the attack, and the damage increases to 2d10 + half \\glossterm{power}.',
      },
      rank: 6,
      scaling: 'damage',
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
      scaling: {
        3: 'You gain a +1 accuracy bonus with the strike.',
        5: 'The accuracy bonus increases to +2.',
        7: 'The accuracy bonus increases to +3.',
      },
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
          \\item You can use the \\ability{disguise creature} ability to affect yourself with a \\minus2 penalty (see \\pcref{Disguise Creature}.
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
      name: 'Expeditious Retreat',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you gain a +10 foot \\glossterm{magic bonus} to your land speed for the duration of the movement.
        `,
        name: 'sprint',
      },
      narrative: `
        You accelerate your body to flee from combat with incredible alacrity.
      `,
      rank: 1,
      scaling: {
        3: 'The speed bonus increases to +20 feet.',
        5: 'The speed bonus increases to +30 feet.',
        7: 'The speed bonus increases to +40 feet.',
      },
    },

    {
      name: 'Sudden Expiration',

      effect: `
        You or one \\glossterm{ally} within \\medrange can remove a \\glossterm{condition}.
      `,
      rank: 4,
      narrative: `
        You twist time to let your ally's nausea run its natural course in mere seconds.
        It is painful to undergo such a selective temporal acceleration, but the consequences of such distraction on the battlefield would be far worse.
      `,
    },

    {
      name: 'Accelerated Legerdemain',

      effect: `
        If you are \\glossterm{trained} with the Sleight of Hand skill, you gain a +3 \\glossterm{magic bonus} to it.
        Otherwise, you are treated as being \\glossterm{trained} in that skill.
      `,
      rank: 1,
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

      effect: `
        Chose yourself or one \\glossterm{ally} within \\shortrange.
        The target regains 1d6 + \\glossterm{power} \\glossterm{damage resistance} and increases its \\glossterm{fatigue level} by one.
        This recovery is doubled for each consecutive round that you have cast this spell on the same target.
      `,
      rank: 1,
      scaling: { special: 'The recovery increases by +1d for each rank beyond 1.' },
      tags: ['Swift'],
    },

    {
      name: 'Empowered Rewind Damage',

      functionsLike: {
        name: 'rewind damage',
        exceptThat: 'the recovery increases to 4d6 + \\glossterm{power}.',
      },
      rank: 5,
      scaling: { special: 'The recovery increases by +1d for each rank beyond 5.' },
      tags: ['Swift'],
    },

    {
      name: 'Wave of Senescence',
      attack: {
        hit: `
          Each target takes 1d8 + half \\glossterm{power} energy damage.
          As a \\glossterm{condition}, each creature that loses hit points from this damage is \\dazzled if you focused on sight or \\deafened if you focused on hearing.
        `,
        targeting: `
          Make an attack vs. Fortitude against each creature in a \\smallarea cone.
          In addition, you choose to focus the aging effects of the cone on either sight or hearing.
        `,
      },
      rank: 2,
      scaling: 'damage',
    },

    {
      name: 'Intense Wave of Senescence',
      attack: {
        hit: `
          Each target takes 2d8 + half \\glossterm{power} energy damage.
          As a \\glossterm{condition}, each creature that loses hit points from this damage is \\dazzled and \\deafened.
        `,
        targeting: `
          Make an attack vs. Fortitude against each creature in a \\medarea cone.
        `,
      },
      rank: 5,
      scaling: 'damage',
    },
    // +1r for +2 acc
    {
      name: 'Unstable Aging',
      attack: {
        hit: `
          The target takes 1d10 + \\glossterm{power} energy damage.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
          You gain a +2 accuracy bonus against creatures that are too young or too old to be ordinary adults.
        `,
      },
      rank: 2,
      scaling: 'damage',
    },
    // +3r for +4 acc
    {
      name: 'Mighty Unstable Aging',
      attack: {
        hit: `
          The target takes 4d8 + \\glossterm{power} energy damage.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
          You gain a +4 accuracy bonus against creatures that are too young or too old to be ordinary adults.
        `,
      },
      rank: 6,
      scaling: 'damage',
    },
  ],
  rituals: [
    {
      name: 'Gentle Repose',

      castingTime: 'one minute',
      effect: `
        Choose one \\glossterm{unattended}, nonmagical object within \\shortrange.
        Time does not pass for the target, preventing it from decaying or spoiling.
        This can extend the time a poison or similar item lasts before becoming inert.
        The target can still be attacked and damaged normally.

        % What effects have an explicit time limit?
        If used on a corpse, this effectively extends the time limit for effects that require a fresh or intact body.
        Additionally, this can make transporting a fallen comrade more pleasant.

        % Does this need to explicitly clarify that it doesn't stop time from passing for the creature's soul?
      `,
      rank: 2,
      type: 'Attune',
    },
    {
      name: 'Ripen',

      castingTime: 'one minute',
      effect: `
        Choose up to one cubic feet of fruit or other food within \\shortrange that is capable of ripening or spoiling.
        The target becomes ripe and ready to eat.
        This accelerates time for food that is not yet ripe, and rewinds time for food that has already spoiled.
      `,
      rank: 1,
    },
    {
      name: 'Stasis Chamber',

      castingTime: 'one hour',
      effect: `
        Choose one Medium or smaller container.
        Anything placed into the container enters a state of temporal stasis at the end of the round.
        While in stasis, it cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.
        Creatures in stasis are \\glossterm{unconscious} and cannot take any actions.
        If the container is destroyed, the stasis effect ends.
      `,
      rank: 3,
      type: 'Attune',
    },
    {
      name: 'Overland Haste',
      rank: 3,
      // Worse than Overland Teleportation in rough terrain, but can be comparable on
      // smooth ground depending on party composition and size.
      effect: `
        Choose up to six ritual participants.
        Each target gains a +30 foot \\glossterm{magic bonus} to its land speed.
        If it takes any action other than movement or is dealt damage, this effect ends.
      `,
      tags: [],
      castingTime: 'one minute',
      type: 'Attune (target)',
    },
    {
      name: 'Greater Overland Haste',
      rank: 5,
      functionsLike: {
        exceptThat: `
          the bonus increases to +60 feet.
        `,
        name: 'overland haste',
      },
      tags: [],
      castingTime: 'one minute',
      type: 'Attune (target)',
    },
    {
      name: 'Reverse Breakage',

      castingTime: '24 hours',
      effect: `
        Choose one Large or smaller \\glossterm{broken} object within \\shortrange.
        The object is repaired as if it had never been broken.
      `,
      rank: 1,
    },
    {
      name: 'Reverse Destruction',

      castingTime: '24 hours',
      effect: `
        Choose one Large or smaller \\glossterm{destroyed} object within \\shortrange.
        The object is repaired as if it had never been destroyed.
      `,
      rank: 4,
    },
    {
      name: 'Reverse Death',

      castingTime: '24 hours',
      effect: `
        Choose one corpse within \\shortrange.
        The corpse is \\glossterm{resurrected}.
        It must have died no more than 48 hours before this ritual is completed.
      `,
      materialCost: true,
      rank: 4,
    },
    {
      name: 'Greater Reverse Death',

      castingTime: '24 hours',
      effect: `
        Choose one Diminuitive or larger piece of a corpse.
        It must have been part of the original creature's body at the time of death.
        The creature the corpse belongs to is \\glossterm{resurrected}.
        The corpse is completely restored to a healthy state, so it does not need to be fully intact.
        It must have died no more than 48 hours before this ritual is completed.
      `,
      materialCost: true,
      rank: 6,
    },
  ],
};
