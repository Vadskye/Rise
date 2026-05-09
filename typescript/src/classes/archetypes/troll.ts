import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';

export function troll(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Regeneration',
      isMagical: false,
      rank: 1,
      description: `
        At the end of your turn, you regain hit points equal to your rank in this archetype.
        Whenever you take damage from a \\atAcid or \\atFire ability, this effect is \\briefly suppressed.
      `,
    },
    {
      complexity: 1,
      name: 'Tough Hide',
      isMagical: false,
      rank: 2,
      description: `
        You gain a bonus to your maximum hit points equal to your \\glossterm{durability}.
      `,
    },
    {
      complexity: 1,
      name: 'Tough Hide+',
      isMagical: false,
      rank: 6,
      description: `
        The hit point bonus increases to twice your \\glossterm{durability}.
      `,
    },
    {
      complexity: 2,
      name: 'Subspecies Specialization',
      isMagical: false,
      rank: 3,
      description: `
        You gain a bonus based on your troll subspecies.
        \\begin{raggeditemize}
          \\item Cave: The range of your darkvision increases by 60 feet.
            In addition, the Stealth bonus increases to \\plus4.
          \\item Forest: You gain an additional \\glossterm{insight point}.
          \\item Mountain: You gain a \\plus1 bonus to your \\glossterm{mundane power}.
          \\item Scrag: You gain a \\glossterm{swim speed} 10 feet slower than your \\glossterm{base speed}.
        \\end{raggeditemize}
      `,
    },
    {
      complexity: 1,
      name: 'Tusks',
      isMagical: false,
      rank: 3,
      description: `
        Your bite natural weapon deals 1d10 damage instead of the normal 1d8.
      `,
    },
    {
      complexity: 2,
      name: 'Regeneration+',
      isMagical: false,
      rank: 4,
      description: `
        The recovery increases to twice your rank in this archetype.
        In addition, you also automatically remove one \\glossterm{vital wound}.
        While you are unconscious, this automatically removes your most severe vital wound.
        Whenever you remove a vital wound in this way, you increase your \\glossterm{fatigue level} by three.
      `,
    },
    {
      complexity: 1,
      name: 'Hulking Size',
      isMagical: false,
      rank: 5,
      description: `
        Your size category increases to Large.
        This increases your \\glossterm{base speed} to 40 feet, among other effects (see \\pcref{Size and Weight}).
      `,
    },
    {
      complexity: 2,
      name: 'Subspecies Specialization+',
      isMagical: false,
      rank: 6,
      description: `
        Your bonus based on your troll subspecies improves.
        \\begin{raggeditemize}
          \\item Cave: You gain a \\plus1 bonus to your Dexterity.
          \\item Forest: You gain a \\plus1 bonus to your Intelligence.
          \\item Mountain: You gain a \\plus1 bonus to your Strength.
          \\item Scrag: You gain a \\plus1 bonus to your Constitution.
        \\end{raggeditemize}
      `,
    },
    {
      complexity: 1,
      name: 'Tusks+',
      isMagical: false,
      rank: 6,
      description: `
        Your bite natural weapon deals 2d6 damage instead of the normal 1d8.
      `,
    },
    {
      complexity: 1,
      name: 'Regeneration++',
      isMagical: false,
      rank: 7,
      description: `
        The recovery increases to five times your rank in this archetype.
        In addition, removing a vital wound with this ability only increases your fatigue level by two.
      `,
    },
  ];
}

export function trollModifiers(creature: Creature, rank: number) {
  // Tough Hide
  if (rank >= 6) {
    creature.addSimpleModifier({
      name: 'Tough Hide+',
      statistic: 'hit_points',
      value: creature.durability * 2,
    });
  } else if (rank >= 2) {
    creature.addSimpleModifier({
      name: 'Tough Hide',
      statistic: 'hit_points',
      value: creature.durability,
    });
  }

  // Hulking Size
  if (rank >= 5) {
    creature.setProperties({ size: 'large' });
  }

  // Subspecies Specialization (Mountain)
  if (rank >= 3) {
    // Assume Mountain troll for now
    creature.addSimpleModifier({
      name: 'Subspecies Specialization (Mountain)',
      statistic: 'mundane_power',
      value: 1,
    });
  }
  if (rank >= 6) {
    creature.addSimpleModifier({
      name: 'Subspecies Specialization+ (Mountain)',
      statistic: 'strength',
      value: 1,
    });
  }
}
