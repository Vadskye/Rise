import { MysticSphere } from '.';

// Normally, curses would be +2 rank, because immunity to condition removal is powerful.
// This sphere is limited and has few attacks, so it gets curses at only +1 rank.
export const prayer: MysticSphere = {
  name: 'Prayer',
  shortDescription: 'Grant divine blessings to aid allies and improve combat prowess.',
  sources: ['divine'],

  cantrips: [
    {
      effect: `
        Choose one \\glossterm{ally} within \\medrange.
        Each target gains a +1 bonus to its Armor defense this round.
        Because this ability has the \\abilitytag{Swift} tag, this improves each target's defense against attacks made against it during the current phase.
      `,
      name: 'Boon of Protection',
      scaling: {
        2: 'You can target an additional \\glossterm{ally} within range.',
        4: 'The bonus increases to +2.',
        6: 'The maximum number of targets increases to three.',
      },
      tags: ['Swift'],
    },
  ],
  spells: [
    {
      name: 'Blessing of Freedom',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange. 
        Each target is immune to being \\slowed, \\immobilized, and \\paralyzed.
      `,
      rank: 4,
      type: 'Attune (target)',
    },

    {
      name: 'Blessing of Recovery',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Whenever each target finishes a \\glossterm{long rest}, it removes an additional \\glossterm{vital wound} (see \\pcref{Removing Vital Wounds}).
      `,
      rank: 4,
      scaling: {
        6: `Each target removes two additional vital wounds instead of only one.`,
      },
      type: 'Attune (target)',
    },

    {
      name: 'Blessing of Regeneration',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        At the end of each round, each target regains 2d6 \\glossterm{hit points}.
        This healing cannot increase a target's hit points above half its maximum hit points.
      `,
      rank: 5,
      scaling: {
        special: `
          The healing increases by 1d6 for each rank beyond 5.
        `,
      },
      type: 'Attune (target)',
    },

    {
      name: 'Blessing of Proficiency',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each target becomes proficient with one additional weapon group, including exotic weapons from that weapon group.
      `,
      rank: 1,
      type: 'Attune (target)',
    },

    {
      name: 'Blessing of Precision',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Whenever a target misses with an \\glossterm{attack}, it can \\glossterm{reroll} that attack.
        If it does, its attunement to this ability ends.
      `,
      rank: 1,
      type: 'Attune (target)',
    },

    {
      name: 'Boon of Precision',

      effect: `
        Choose two \\glossterm{allies} within \\medrange.
        The next time each target makes an attack this round, it rolls twice and takes the higher result.
      `,
      rank: 2,
      tags: [],
    },

    {
      name: 'Boon of Deadly Fortune',

      effect: `
        Choose two \\glossterm{allies} within \\medrange.
        Each target gains a +4 bonus to \\glossterm{accuracy} this round for the purpose of determining if its attacks get a \\glossterm{critical hit}.
      `,
      rank: 1,
      tags: [],
    },

    {
      name: 'Boon of Invulnerability',

      effect: `
        Choose two \\glossterm{allies} within \\medrange.
        Each target takes half damage from all sources this round.
        Because this ability has the \\abilitytag{Swift} tag, it affects all damage each target takes during the current phase.
      `,
      rank: 7,
      tags: ['Swift'],
    },

    {
      name: 'Boon of Avoidance',

      effect: `
        Choose two \\glossterm{allies} within \\medrange.
        Each target gains a +2 bonus to Armor and Reflex defenses this round.
        Because this ability has the \\abilitytag{Swift} tag, this improves the target's defenses against attacks made against it during the current phase.
      `,
      rank: 3,
      tags: ['Swift'],
    },

    {
      name: 'Blessing of the Purified Body',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each target is \\glossterm{impervious} to \\glossterm{poisons} and \\glossterm{diseases}.
        In addition, at the end of each round, it automatically gains one success to resist an active poison or disease affecting it that was not applied during that round.
      `,
      rank: 3,
      type: 'Attune (target)',
    },

    {
      name: 'Blessing of Mental Clarity',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each target is \\glossterm{impervious} to \\abilitytag{Compulsion} and \\abilitytag{Emotion} effects.
        In addition, at the end of each round, it automatically removes one \\glossterm{condition} from a Compulsion or Emotion effect that was not applied during that round.
      `,
      rank: 3,
      type: 'Attune (target)',
    },

    {
      name: 'Blessing of Perseverance',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Whenever each target would gain a \\glossterm{condition}, it can choose to negate that condition.
        After a creature negates a condition in this way, this spell ends for that creature.
      `,
      rank: 1,
      type: 'Attune (target)',
    },

    {
      name: 'Boon of Cleansing',

      cost: "One \\glossterm{fatigue level} from each target.",
      effect: `
        Two \\glossterm{allies} within \\medrange can each remove a \\glossterm{condition}.
      `,
      rank: 4,
    },

    {
      name: 'Cleansing Benediction',

      cost: "See text.",
      effect: `
        Each \\glossterm{ally} within a \\largearea radius from you can remove a \\glossterm{condition}.
        Each ally that removes a condition in this way increases its \\glossterm{fatigue level} by one.
      `,
      rank: 6,
    },

    {
      name: 'Blessing of Physical Prowess',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        When you cast this spell, choose a physical attribute: Strength, Dexterity, or Constitution.
        Each target gains a +2 \\glossterm{enhancement bonus} to checks using the chosen attribute.
        In addition, if you choose Strength, each target gains a +1 \\glossterm{enhancement bonus} to Strength for the purpose of determining its weight limits (see \\pcref{Weight Limits}).
      `,
      rank: 3,
      scaling: {
        5: `The bonus increases to +3.`,
        7: `The bonus increases to +4.`,
      },
      type: 'Attune (target)',
    },

    {
      name: 'Blessing of Endurance',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each target gains a +4 \\glossterm{enhancement bonus} to its maximum \\glossterm{hit points}.
        In addition, it immediately gains that many hit points.
        When this ability ends, each target loses \\glossterm{hit points} equal to the number of hit points it gained this way.
      `,
      rank: 2,
      scaling: {
        4: `The bonus increases to +8.`,
        6: `The bonus increases to +16.`,
      },
      type: 'Attune (target)',
    },

    {
      name: 'Blessing of Divine Warning',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each target is never \\unaware or \\partiallyunaware.
      `,
      rank: 6,
      type: 'Attune (target)',
    },

    {
      name: 'Blessing of Cleansing Renewal',

      cost: "See text.",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        At the end of each round, each target may remove one \\glossterm{condition} of its choice affecting it.
        Whenever it does, it increases its \\glossterm{fatigue level} by one.
      `,
      rank: 7,
      type: 'Attune (target)',
    },

    {
      name: 'Indomitable Blessing',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each target gains a +4 \\glossterm{enhancement bonus} to \\glossterm{hit points} and \\glossterm{damage resistance}.
        In addition, each target gains a +1 \\glossterm{enhancement bonus} to \\glossterm{vital rolls}.
      `,
      rank: 2,
      scaling: {
        4: `
          The bonuses to hit points and damage resistance increase to +8.
        `,
        6: `
          The bonuses to hit points and damage resistance increase to +16.
        `,
      },
      type: 'Attune (deep, target)',
    },

    {
      name: 'Blessing of Resilience',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each target gains a +4 \\glossterm{enhancement bonus} to its \\glossterm{damage resistance}.
      `,
      rank: 2,
      scaling: {
        4: `The bonus increases to +8.`,
        6: `The bonus increases to +16.`,
      },
      type: 'Attune (target)',
    },

    {
      name: 'Blessing of Vitality',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Whenever each target would gain a \\glossterm{vital wound}, that vital wound is automatically negated.
        After negating a vital wound for a creature in this way, this spell ends for that creature.
      `,
      rank: 5,
      type: 'Attune (deep, target)',
    },

    {
      name: 'Boon of Shielding',

      cost: "One \\glossterm{fatigue level} from each target.",
      // dr3
      effect: `
        Choose two \\glossterm{allies} within \\medrange.
        Each target regains 1d8 \\glossterm{damage resistance} +1 per \\glossterm{power}.
        In addition, it gains a +1 bonus to all \\glossterm{defenses} this round.
      `,
      rank: 2,
      scaling: { special: 'The recovery increases by +2 for each rank beyond 2.' },
      tags: ['Swift'],
    },

    {
      name: 'Empowered Boon of Shielding',

      // dr6
      functionsLike: {
        name: 'boon of shielding',
        exceptThat: 'the recovery increases to 1d8 plus 1d8 per 2 power.',
      },
      rank: 5,
      scaling: { special: 'The recovery increases by 2d8 for each rank beyond 5.' },
      tags: ['Swift'],
    },

    {
      name: 'Consecrated Blow',
      // No need to say "no somatic components" because no one who has somatic components
      // can get access to this sphere.
      effect: `
        Make a \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        Whether you hit or miss, you \\glossterm{briefly} gain a +2 bonus to your Mental defense.
      `,
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Consecrated Blow',
      functionsLike: {
        name: 'consecrated blow',
        exceptThat: 'the strike deals double \\glossterm{weapon damage}.',
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Exalted Excision',
      effect: `
        Make a \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        You gain a +1 \\glossterm{accuracy} bonus with the strike for each spell from the \\sphere{channel divinity} and \\sphere{prayer} \\glossterm{mystic spheres} that you are attuned to.
        If this accuracy bonus would be +4 or higher, you may reduce it by 4 to make the strike deal double \\glossterm{weapon damage}.
      `,
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Curse of Blurred Vision',

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        hit: `
          The target is \\dazzled until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\shortrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Curse', 'Visual'],
    },
    {
      name: 'Curse of Sloth',

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        hit: `
          While the target is below its maximum \\glossterm{hit points}, it is \\slowed.
          This effect lasts until the target finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\shortrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Curse'],
    },
    {
      name: 'Efficient Curse of Sloth',

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        hit: `
          The target is \\slowed until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\shortrange.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Curse'],
    },
    {
      name: 'Curse of Anxiety',

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        hit: `
          The target becomes anxious until it finishes a \\glossterm{short rest}.
          Whenever a creature deals damage to the target, it becomes \\frightened by that creature until this effect ends.
          As normal, it stops being frightened if the source of its fear is \\glossterm{defeated}, but this does not remove the anxiety.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\shortrange.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Curse', 'Emotion'],
    },
    {
      name: 'Curse of Blindness',

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        hit: `
          While the target is below its maximum \\glossterm{hit points}, it is \\blinded.
          This effect lasts until the target finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Curse', 'Visual'],
    },
    {
      name: 'Curse of Bewilderment',

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        hit: `
          While the target is below its maximum \\glossterm{hit points}, it is \\confused.
          Otherwise, it is \\stunned.
          This effect lasts until the target finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\shortrange.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
      tags: ['Compulsion', 'Curse'],
    },
    // {
    //   name: 'Holy Blades',

    //   effect: `
    //     Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
    //     Each target's \\glossterm{manufactured weapons} shed light like a torch.
    //     In addition, all damage they deal with \\glossterm{strikes} using those weapons becomes energy damage in addition to the attack's normal damage types.
    //   `,
    //   rank: 1,
    //   type: 'Attune (target)',
    // },
  ],
  rituals: [
    {
      name: 'Blessing of Fortification',

      castingTime: 'one hour',
      effect: `
        Choose one \\glossterm{unattended}, nonmagical object or part of an object of up to Large size.
        Unlike most abilities, this ritual can affect individual parts of a whole object.

        % How should this affect Strength break difficulty value?
        The target gains a +10 \\glossterm{enhancement bonus} to its \\glossterm{damage resistance}.
        If the target is moved, this effect ends.
        Otherwise, it lasts for one year.
      `,
      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Enduring Blessing of Fortification',

      castingTime: '24 hours',
      functionsLike: {
        exceptThat: `
          the effect lasts for one hundred years.
        `,
        name: 'blessing of fortification',
      },
      rank: 3,
    },

    {
      name: 'Enduring Blessing of Immutability',

      castingTime: '24 hours',
      functionsLike: {
        exceptThat: `
          the effect lasts for one hundred years.
        `,
        name: 'blessing of immutability',
      },
      rank: 6,
    },

    {
      name: 'Blessing of Immutability',

      castingTime: 'one hour',
      functionsLike: {
        exceptThat: `
          the bonus to \\glossterm{damage resistance} increases to +20.
        `,
        name: 'blessing of fortification',
      },
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Bless Water',

      castingTime: 'one minute',
      effect: `
        One pint of \\glossterm{unattended}, nonmagical water within \\shortrange becomes holy water.
        Holy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck undead or an evil planeforged.
        `,
      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Persistent Bless Water',

      castingTime: 'one hour',
      functionsLike: {
        exceptThat: `
          the effect lasts for one year.
        `,
        name: 'bless water',
      },
      rank: 3,
    },

    {
      name: 'Curse Water',

      castingTime: 'one minute',
      effect: `
        One pint of \\glossterm{unattended}, nonmagical water within \\shortrange becomes unholy water.
        Unholy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck good planeforged.
        `,
      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Permanent Curse Water',

      castingTime: 'one hour',
      functionsLike: {
        exceptThat: `
          it loses the \\abilitytag{Attune} tag and the effect lasts permanently.
        `,
        name: 'curse water',
      },
      rank: 3,
    },

    {
      name: 'Blessing of Purification',

      castingTime: 'one hour',
      effect: `
        All food and water in a single square within \\shortrange becomes purified.
        Spoiled, rotten, poisonous, or otherwise contaminated food and water becomes pure and suitable for eating and drinking.
        This does not prevent subsequent natural decay or spoiling.
      `,
      rank: 1,
    },
  ],
};
