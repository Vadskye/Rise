import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';

export function treant(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Nourishing Ingrain',
      isMagical: false,
      rank: 1,
      description: `
        At the end of your turn while you are \\ability{ingrained}, you regain hit points equal to your rank in this archetype, and you may choose to remove a \\glossterm{condition}.
        If you remove a condition, you reduce your \\glossterm{stamina} by one.
      `,
    },
    {
      complexity: 0,
      name: 'Sturdy as the Mighty Oak',
      isMagical: false,
      rank: 2,
      description: `
        You gain a \\plus1 bonus to your Brawn defense and a \\plus2 bonus to your Fortitude defense.
      `,
    },
    {
      complexity: 2,
      name: 'Animate Plants',
      isMagical: true,
      rank: 3,
      description: `
        \\begin{magicalactiveability}{Animate Plants}{Standard action}
          \\abilitytags \\abilitytag{Manifestation}
          \\rankline
          Make an attack vs. Reflex against one Large or smaller \\glossterm{grounded} creature within \\medrange.
          You gain a \\plus2 accuracy bonus if the target is in \\glossterm{undergrowth}.

          \\hit The target is \\glossterm{briefly} \\slowed.
          In addition, it is attacked by plants as a \\glossterm{condition}.
          It takes 1d8 damage immediately, and during each of your subsequent actions while this condition lasts.

          This condition can be removed if the target makes a \\glossterm{difficulty value} 10 Strength check as a \\glossterm{move action} to break the plants.
          If the target makes this check as a standard action, it gains a \\plus5 bonus.
          In addition, this condition is removed if the target takes damage from a \\atFire ability.
          \\crit The condition must be removed an additional time before the effect ends.
          \\rankline
          For each rank beyond 3, the attack's \\glossterm{accuracy} increases by \\plus2 and the \\glossterm{difficulty value} to break the plants increases by 2.
          In addition, the damage increases at each rank as described below.
          \\rank{4} 1d10 damage.
          \\rank{5} 2d6 damage.
          \\rank{6} 2d8 damage.
          \\rank{7} 2d10 damage.
        \\end{magicalactiveability}
      `,
    },
    {
      complexity: 0,
      name: 'Tall as the Noble Pine',
      isMagical: false,
      rank: 4,
      description: `
        Your size category increases to Large.
        Unlike normal for increasing your size, this does not increase your \\glossterm{base speed}.
        You also gain a \\plus1 bonus to your Strength, and a \\minus1 penalty to your Dexterity.
      `,
    },
    {
      complexity: 1,
      name: 'Nourishing Ingrain+',
      isMagical: false,
      rank: 5,
      description: `
        The healing from your \\textit{nourishing ingrain} ability increases to three times your rank in this archetype.
        In addition, removing a condition with that ability no longer reduces your stamina.
      `,
    },
    {
      complexity: 0,
      name: 'Sturdy as the Mighty Oak+',
      isMagical: false,
      rank: 6,
      description: `
        The durability bonus increases to \\plus5.
      `,
    },
    {
      complexity: 0,
      name: 'Tall as the Noble Pine+',
      isMagical: false,
      rank: 7,
      description: `
        Your size category increases to Huge.
        This increases your \\glossterm{base speed} to 40 feet.
        Your normal \\glossterm{speed} is still only 30 feet due to the penalty from \\textit{unhurried and unfaltering}.
        The modifiers to Strength and Dexterity increase to \\plus2 and \\minus2, respectively.
      `,
    },
  ];
}

export function treantModifiers(creature: Creature, rank: number) {
  // Sturdy as the Mighty Oak
  if (rank >= 2) {
    creature.addSimpleModifier({
      name: 'Sturdy as the Mighty Oak',
      statistic: 'brawn',
      value: 1,
    });
    creature.addSimpleModifier({
      name: 'Sturdy as the Mighty Oak',
      statistic: 'fortitude',
      value: 2,
    });
  }

  // Tall as the Noble Pine
  if (rank >= 7) {
    creature.setProperties({ size: 'huge' });
    creature.addSimpleModifier({
      name: 'Tall as the Noble Pine+',
      statistic: 'strength',
      value: 2,
    });
    creature.addSimpleModifier({
      name: 'Tall as the Noble Pine+',
      statistic: 'dexterity',
      value: -2,
    });
  } else if (rank >= 4) {
    creature.setProperties({ size: 'large' });
    creature.addSimpleModifier({
      name: 'Tall as the Noble Pine',
      statistic: 'strength',
      value: 1,
    });
    creature.addSimpleModifier({
      name: 'Tall as the Noble Pine',
      statistic: 'dexterity',
      value: -1,
    });
  }

  // Sturdy as the Mighty Oak+
  if (rank >= 6) {
    creature.addSimpleModifier({
      name: 'Sturdy as the Mighty Oak+',
      statistic: 'durability',
      value: 5,
    });
  }
}
