import { MysticSphere } from '.';

// Normally, curses would be +0.4 EA, because immunity to condition removal is powerful.
// This sphere is limited and has few attacks, so it gets curses at only +0.2 EA.
export const prayer: MysticSphere = {
  name: 'Prayer',
  shortDescription: 'Grant divine blessings to aid allies and improve combat prowess.',
  sources: ['divine'],

  cantrips: [
    {
      // fortified + empowered is 0.6 EA, or 0.9 EA on an ally.
      effect: `
        Choose one \\glossterm{ally} you \\glossterm{touch}.
        The target is \\fortified this round.
        If it is currently \\glossterm{attuned} to one of your spells from this mystic sphere, it is also \\empowered this round.
        Because this ability has the \\abilitytag{Swift} tag, this protects the target against attacks made against it during the current phase.
      `,
      name: 'Fortifying Boon',
      roles: ['boon'],
      scaling: {
        2: 'The range increases to \\shortrange.',
        4: 'The range increases to \\medrange.',
        6: 'If the target is currently attuned to one of your spells from this mystic sphere, it is also \\steeled this round.',
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
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Blessing of Recovery',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Whenever each target finishes a \\glossterm{long rest}, it removes an additional \\glossterm{vital wound} (see \\pcref{Removing Vital Wounds}).
      `,
      rank: 4,
      roles: ['attune'],
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
      roles: ['healing'],
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
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Blessing of Precision',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Whenever a target misses or gets a \\glossterm{glancing blow} with an \\glossterm{attack}, it can \\glossterm{reroll} that attack.
        If it does, this ability ends for that creature.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Boon of Precision',

      effect: `
        Choose two \\glossterm{allies} within \\medrange.
        Each target is \\focused this round.
      `,
      rank: 3,
      roles: ['boon'],
      tags: [],
    },

    {
      name: 'Boon of Steel',

      // 0.8 EA, or 1.2 EA on an ally.
      effect: `
        Choose one \\glossterm{ally} within \\medrange.
        The target is \\honed and \\steeled this round.
        Because this ability has the \\abilitytag{Swift} tag, this protects the target against attacks made against it during the current phase.
      `,
      rank: 6,
      roles: ['boon'],
      tags: ['Swift'],
    },

    {
      name: 'Boon of Deadly Fortune',

      // 0.8 EA, or 1.2 EA on allies. But what are the odds that both allies get full
      // value from honed? Seems closer to 1 EA.
      effect: `
        Choose two \\glossterm{allies} within \\shortrange.
        Each target is \\honed this round.
      `,
      rank: 1,
      roles: ['boon'],
      tags: [],
    },

    {
      name: 'Boon of Living Steel',

      effect: `
        Choose one \\glossterm{ally} within \\medrange.
        The target is \\glossterm{briefly} \\fortified and \\steeled.
        Because this ability has the \\abilitytag{Swift} tag, this protects the target against attacks made against it during the current phase.
      `,
      rank: 2,
      roles: ['boon'],
      tags: ['Swift'],
    },

    {
      name: 'Boon of Invulnerability',

      cost: 'One \\glossterm{fatigue level}, and you \\glossterm{briefy} cannot use this ability again.',
      effect: `
        Choose one \\glossterm{ally} within \\medrange.
        The target takes half damage from all sources this round.
        Because this ability has the \\abilitytag{Swift} tag, it affects all damage each target takes during the current phase.
      `,
      rank: 4,
      roles: ['boon'],
      tags: ['Swift'],
    },

    {
      name: 'Boon of Annihilation',

      cost: 'Two \\glossterm{fatigue levels}, and you \\glossterm{briefly} cannot use this ability again.',
      effect: `
        Choose one \\glossterm{ally} within \\medrange.
        The target is \\primed and \\maximized this round.
      `,
      rank: 7,
      roles: ['boon'],
      tags: ['Swift'],
    },

    {
      name: 'Boon of Shielding',

      effect: `
        Choose two \\glossterm{allies} within \\medrange.
        Each target is \\shielded this round.
        Because this ability has the \\abilitytag{Swift} tag, this improves the target's defenses against attacks made against it during the current phase.
      `,
      rank: 3,
      roles: ['boon'],
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
      roles: ['attune'],
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
      roles: ['attune'],
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
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Boon of Cleansing',

      cost: 'One \\glossterm{fatigue level} from each target.',
      effect: `
        Two \\glossterm{allies} within \\medrange can each remove a \\glossterm{condition}.
      `,
      rank: 4,
      roles: ['cleanse'],
    },

    {
      name: 'Cleansing Benediction',

      cost: 'See text.',
      effect: `
        Each \\glossterm{ally} within a \\largearea radius from you can remove a \\glossterm{condition}.
        Each ally that removes a condition in this way increases its \\glossterm{fatigue level} by one.
      `,
      rank: 6,
      roles: ['cleanse'],
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
      roles: ['attune'],
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
      `,
      rank: 2,
      roles: ['attune'],
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
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Blessing of Cleansing Renewal',

      cost: 'See text.',
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        At the end of each round, each target may remove one \\glossterm{condition} of its choice affecting it.
        Whenever it does, it increases its \\glossterm{fatigue level} by one.
      `,
      rank: 7,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Indomitable Blessing',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each target gains a +4 \\glossterm{enhancement bonus} to its maximum \\glossterm{hit points} and \\glossterm{damage resistance}.
        In addition, each target gains a +1 \\glossterm{enhancement bonus} to \\glossterm{vital rolls}.
      `,
      rank: 2,
      roles: ['attune'],
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
        Each target gains a +4 \\glossterm{enhancement bonus} to its maximum \\glossterm{damage resistance}.
      `,
      rank: 2,
      roles: ['attune'],
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
      roles: ['attune'],
      type: 'Attune (deep, target)',
    },

    {
      name: 'Boon of Shielding',

      cost: 'One \\glossterm{fatigue level} from each target.',
      // dr3
      effect: `
        Choose two \\glossterm{allies} within \\medrange.
        Each target regains 1d8 \\glossterm{damage resistance} +1 per \\glossterm{power}.
        In addition, it gains a +1 bonus to all \\glossterm{defenses} this round.
      `,
      rank: 2,
      roles: ['healing'],
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
      roles: ['healing'],
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
        Then, you \\glossterm{briefly} gain a +2 bonus to your Mental defense.
      `,
      rank: 1,
      roles: ['burst'],
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Consecrated Blow',
      functionsLike: {
        name: 'consecrated blow',
        exceptThat: 'the strike deals double damage.',
      },
      rank: 5,
      roles: ['burst'],
      scaling: 'accuracy',
    },

    {
      name: 'Exalted Excision',
      effect: `
        Make a \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        You gain a +1 \\glossterm{accuracy} bonus with the strike for each spell from the \\sphere{channel divinity} and \\sphere{prayer} \\glossterm{mystic spheres} that you are attuned to.
      `,
      rank: 2,
      roles: ['burst'],
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Exalted Excision',
      functionsLike: {
        name: 'exalted excision',
        exceptThat: 'the strike deals double damage.',
      },
      rank: 6,
      roles: ['burst'],
      scaling: 'accuracy',
    },

    // +1r for curse, -1r for limited scope
    {
      name: 'Curse of Blurred Vision',

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        hit: `
          Each target is \\dazzled until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 6,
      roles: ['softener'],
      scaling: 'accuracy',
      tags: ['Curse', 'Visual'],
    },
    // +1r for curse, +1r for prebuff, -1r for limited scope
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
      rank: 3,
      roles: ['maim'],
      scaling: 'accuracy',
      tags: ['Curse'],
    },
    // +1r for curse, -2r for damage requirement, -1r for limited scope
    {
      name: 'Curse of Anxiety',

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        hit: `
          The target becomes anxious until it finishes a \\glossterm{short rest}.
          Whenever a creature causes the target to lose \\glossterm{hit points}, it becomes \\frightened by that creature until this effect ends.
          As normal, it stops being frightened if the source of its fear is \\glossterm{defeated}, but this does not remove the anxiety.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\shortrange.
        `,
      },
      rank: 1,
      roles: ['maim'],
      scaling: 'accuracy',
      tags: ['Curse', 'Emotion'],
    },
    // +1r for curse, +1r for prebuff, -1r for limited scope
    {
      name: 'Curse of Selective Sight',

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        hit: `
          While each target is below its maximum \\glossterm{hit points}, it treats you as being \\invisible.
          This effect lasts until the target finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 4,
      roles: ['maim'],
      scaling: 'accuracy',
      tags: ['Curse', 'Visual'],
    },
    // {
    //   name: 'Holy Blades',

    //   effect: `
    //     Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
    //     Each target's \\glossterm{manufactured weapons} shed light like a torch.
    //     In addition, all damage they deal with \\glossterm{strikes} using those weapons becomes damage in addition to the attack's normal damage types.
    //   `,
    //   rank: 1,
    //   type: 'Attune (target)',
    // },
  ],
};
