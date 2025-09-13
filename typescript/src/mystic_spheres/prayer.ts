import { MysticSphere } from '.';

// Normally, curses would be +0.4 EA, because immunity to condition removal is powerful.
// This sphere is limited and has few attacks, so it gets curses at only +0.2 EA.
export const prayer: MysticSphere = {
  name: 'Prayer',
  shortDescription: 'Grant divine blessings to aid allies and improve combat prowess.',
  sources: ['divine'],

  cantrips: [
    {
      // "Any two" fortify is 0.7 EA.
      effect: `
        Choose two \\glossterm{allies} within \\medrange.
        Each target is \\fortified this round.
        Because this ability has the \\abilitytag{Swift} tag, this protects each target from attacks during the current phase.
      `,
      name: 'Fortifying Boon',
      roles: ['boon'],
      tags: ['Swift'],
    },
  ],
  spells: [
    {
      name: 'Blessing of Freedom',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange. 
        Each target is immune to being \\slowed and \\paralyzed.
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
      rank: 3,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Blessing of Proficiency',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each target becomes proficient with all armor and non-exotic weapons.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Blessing of Precision',

      // Focused once is 0.4 EA, which is too low for a rank 1 attunement. Only removing
      // the attunement on a hit makes it more reasonable.
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Whenever a target misses or gets a \\glossterm{glancing blow} with an \\glossterm{attack}, it can choose to \\glossterm{reroll} that attack and keep the higher result.
        If it hits or critically hits with the reroll, this ability is \\glossterm{dismissed} for that creature.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Boon of Aggression',

      // Ally focused + empowered is 0.9 EA
      effect: `
        Choose one \\glossterm{ally} within \\medrange.
        The target is \\focused, \\empowered, and \\enraged this round.
      `,
      rank: 1,
      roles: ['boon'],
      tags: [],
    },

    {
      name: 'Boon of Precision',

      // "any two" is 1.0 EA
      effect: `
        Choose up to two \\glossterm{allies} within \\medrange.
        Each target is \\focused this round.
      `,
      rank: 4,
      roles: ['boon'],
      tags: [],
    },

    {
      name: 'Boon of Tempered Steel',

      // Steeled + empowered any two is 1 EA; one rank early for not hitting self, which
      // is a more meaningful cost on a defensive effect
      effect: `
        Choose up to two \\glossterm{allies} within \\medrange.
        Each target is \\empowered and \\steeled this round.
        Because this ability has the \\abilitytag{Swift} tag, this protects each target from attacks during the current phase.
      `,
      rank: 3,
      roles: ['boon'],
      tags: ['Swift'],
    },

    {
      name: 'Boon of Deadly Fortune',

      // Any two honed is 1 EA, though it seems unlikely that two party members can gain
      // the full benefit from honed which has a high accuracy requirement, so r3 is
      // reasonable.
      effect: `
        Choose two \\glossterm{allies} within \\medrange.
        Each target is \\honed this round.
      `,
      rank: 3,
      roles: ['boon'],
      tags: [],
    },

    // Steeled + fortified is 0.8 EA on an ally
    {
      name: 'Boon of Living Steel',

      effect: `
        Choose one \\glossterm{ally} within \\medrange.
        The target is \\fortified and \\steeled this round.
        Because this ability has the \\abilitytag{Swift} tag, this protects the target from attacks during the current phase.
      `,
      rank: 1,
      roles: ['boon'],
      tags: ['Swift'],
    },

    {
      name: 'Boon of Invulnerability',

      // 1 EA on an ally
      effect: `
        Choose one \\glossterm{ally} within \\medrange.
        The target takes half damage from all sources this round.
        Because this ability has the \\abilitytag{Swift} tag, it affects all damage the target takes during the current phase.
      `,
      rank: 4,
      roles: ['boon'],
      tags: ['Swift'],
    },

    // No reason why this is rank 5 instead of rank 4 except that maximized seems scary
    {
      name: 'Boon of Annihilation',

      effect: `
        Choose one \\glossterm{ally} within \\medrange.
        The target is \\maximized this round.
      `,
      rank: 5,
      roles: ['boon'],
      tags: [],
    },

    {
      name: 'Boon of Protection',

      // Choosing between shielded and fortified is almost as good as braced, which is 1
      // EA for any two. But you can't target yourself with this.
      effect: `
        Choose up to two \\glossterm{allies} within \\medrange.
        Each target is either \\fortified or \\shielded this round.
        You must make the same choice for each target.
        Because this ability has the \\abilitytag{Swift} tag, this protects each target from attacks during the current phase.
      `,
      rank: 1,
      roles: ['boon'],
      tags: ['Swift'],
    },

    {
      name: 'Mass Boon of Protection',

      // All braced is 1.3 EA, but you can't target yourself with this.
      functionsLike: {
        name: 'boon of protection',
        exceptThat: 'you can target up to five \\glossterm{allies}.',
      },
      rank: 5,
      roles: ['boon'],
      tags: ['Swift'],
    },

    {
      name: 'Blessing of the Purified Body',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each target is \\impervious to \\glossterm{poisons} and \\glossterm{diseases}.
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
        Each target is \\impervious to \\abilitytag{Compulsion} and \\abilitytag{Emotion} effects.
        In addition, at the end of each round, it automatically removes one \\glossterm{condition} from a Compulsion or Emotion effect that was not applied during that round.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    // TODO: EA math
    {
      name: 'Blessing of Perseverance',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Whenever each target would gain a \\glossterm{condition}, that condition is automatically removed, and this ability is \\glossterm{dismissed} for that creature.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    // TODO: EA math
    {
      name: 'Boon of Cleansing',

      cost: 'One \\glossterm{fatigue level} from each target.',
      effect: `
        Two \\glossterm{allies} within \\medrange can each remove a \\glossterm{condition}.
      `,
      rank: 4,
      roles: ['cleanse'],
    },

    // TODO: EA math
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
      rank: 5,
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
      name: 'Blessing of Resilience',

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

    // TODO: EA math
    {
      name: 'Blessing of Vitality',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Whenever each target would gain a \\glossterm{vital wound}, that vital wound is automatically negated.
        After negating a vital wound for a creature in this way, this ability is \\glossterm{dismissed} for that creature.
      `,
      rank: 5,
      roles: ['attune'],
      type: 'Attune (deep, target)',
    },

    {
      name: 'Boon of Shielding',

      // Any two shielded is 0.5 EA, so we reduce the healing to dr2.
      // TODO: more clear guidelines on how healing interacts with buffs, and who pays the
      // fatigue for this sort of effect.
      cost: 'One \\glossterm{fatigue level}.',
      // dr3
      effect: `
        Choose two \\glossterm{allies} within \\medrange.
        Each target is \\shielded this round and regains 1d4 \\glossterm{hit points} +1 per \\glossterm{power}.
      `,
      rank: 2,
      roles: ['healing', 'boon'],
      scaling: { special: 'The recovery increases by +2 for each rank beyond 2.' },
      tags: ['Swift'],
    },

    {
      name: 'Greater Boon of Shielding',

      // dr6
      functionsLike: {
        name: 'boon of shielding',
        exceptThat: 'the recovery increases to 1d6 plus 1d6 per 2 power.',
      },
      rank: 5,
      roles: ['healing', 'boon'],
      scaling: { special: 'The recovery increases by 2d8 for each rank beyond 5.' },
      tags: ['Swift'],
    },

    {
      name: 'Bless the Worthy',

      // Assume that it typically affects two people, and anything more than that is a
      // bonus. Normal healing ability would be dr4, so use half of that (where possible).
      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        You and all \\glossterm{allies} within a \\largearea radius from you each regain 2d8 \\glossterm{hit points}.
      `,
      rank: 3,
      roles: ['healing'],
      // This is very strong scaling because of the AOE nature of the spell; no need for
      // an empowered version of the spell.
      scaling: { special: 'The recovery increases by 1d8 for each rank beyond 3.' },
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
      effect: `
        Make a \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        Then, you are \\glossterm{briefly} \\fortified.
      `,
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

    // May be too weak? Don't want to move to r5 since that conflicts with mighty
    // consecrated blow.
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

    // dazzled hp condition is 0.7 EA. +0.2 EA for curse, +0.4 EA for prebuff = 1.3 EA.
    // Drop it to 1.2 EA since prebuff is lame for such a low rank effect. That gives room
    // for +1 area tier, so r3 area.
    {
      name: 'Curse of Blurred Vision',

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        hit: `
          The target has difficulty seeing until it finishes a \\glossterm{short rest}.
          While it is below its maximum \\glossterm{hit points}, it is \\dazzled.
        `,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 1,
      roles: ['softener'],
      scaling: 'accuracy',
      tags: ['Curse', 'Visual'],
    },

    // +0.2 EA for curse makes this a 2 EA debuff.
    {
      name: 'Efficient Curse of Blurred Vision',

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        hit: `
          The target is \\dazzled until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 4,
      roles: ['softener'],
      scaling: 'accuracy',
      tags: ['Curse', 'Visual'],
    },
    // +0.2 EA for curse, +0.4 EA for prebuff makes this a 2.7 EA debuff. Maybe drop to
    // 2.6 EA for short range, which is closer to melee.
    // -1r for limited scope
    {
      name: 'Curse of Sloth',

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        hit: `
          The target becomes slothful until it finishes a \\glossterm{short rest}.
          While a slothful creature is below its maximum \\glossterm{hit points}, it is \\slowed.
        `,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 6,
      roles: ['maim'],
      scaling: 'accuracy',
      tags: ['Curse'],
    },

    {
      name: 'Nemesis Curse',

      // Frightened and goaded together are a simple 33% action denial, or 4 EA, plus
      // the 0.8 EA from Mental defense. That's 4.8 EA, or 1.9 EA as a HP condition. +0.2
      // EA for curse and 0.4 EA for prebuff to get 2.5 EA. -1r for limited scope.
      attack: {
        crit: `The effect lasts until the curse is removed.`,
        hit: `
          The target perceives you as its nemesis until it finishes a \\glossterm{short rest}.
          While it is below its maximum hit points, it is \\goaded by you and \\frightened by you.
        `,
        targeting: `
          Make an attack vs. Mental against up to two creatures in \\medrange.
        `,
      },
      rank: 6,
      roles: ['maim'],
      scaling: 'accuracy',
      tags: ['Curse', 'Emotion'],
    },

    // Frightened by all HP condition is 1.9 EA, +0.2 EA for curse, -0.4 EA for damage
    // requirement, +0.4 EA for prebuff = 2.1 EA. -1r for limited scope.
    {
      name: 'Curse of Anxiety',

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        hit: `
          The target becomes anxious until it finishes a \\glossterm{short rest}.
          Whenever a creature causes the target to lose \\glossterm{hit points}, it becomes \\frightened by that creature until this effect ends.
          As normal, the target stops being frightened if the source of its fear is \\glossterm{defeated}, but this does not remove the anxiety.
        `,
        targeting: `
          Make an attack vs. Mental against up to two creatures within \\shortrange.
        `,
      },
      rank: 4,
      roles: ['maim'],
      scaling: 'accuracy',
      tags: ['Curse', 'Emotion'],
    },
    // Invisible HP condition is 1.6 EA. +0.2 EA for curse, +0.4 EA for prebuff = 2.2 EA.
    {
      name: 'Curse of Selective Sight',

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        hit: `
          The target has difficulty looking at you until it finishes a \\glossterm{short rest}.
          While it is below its maximum \\glossterm{hit points}, it treats you as being \\trait{invisible}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 5,
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
