import { Tool, StandardItem } from '../../types';

function createElixir(data: Partial<StandardItem>): Tool {
  return {
    category: 'Potion',
    item: {
      magical: true,
      rarity: 'Common',
      tags: ['Attune'],
      upgrades: [],
      description: '',
      short_description: '',
      name: '',
      rank: 0,
      ...data,
    },
  };
}

export function elixirs(): Tool[] {
  return [
    createElixir({
      name: 'Antitoxin Elixir',
      rank: 1,
      short_description: 'Resistant to poison',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you become \\resistant to \\atPoison effects.
        This effect expires after 10 minutes.
      `,
      upgrades: [
        {
          rank: 4,
          short_description: 'Immune to poison',
          description: `
            You become immune instead of resistant.
          `,
        },
      ],
    }),
    createElixir({
      name: 'Elixir of the Silver Tongue',
      rank: 2,
      short_description: 'Grants +2 to Creature Handling, Deception, and Persuasion',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you gain a +2 \\glossterm{enhancement bonus} to your Creature Handling, Deception, and Persuasion skills.
        This effect expires after 10 minutes.
      `,
      upgrades: [
        {
          rank: 4,
          short_description: 'Grants +3 to Creature Handling, Deception, and Persuasion',
          description: `
            The bonus increases to +3.
          `,
        },
        {
          rank: 6,
          short_description: 'Grants +4 to Creature Handling, Deception, and Persuasion',
          description: `
            The bonus increases to +4.
          `,
        },
      ],
    }),
    createElixir({
      name: 'Elixir of Grace',
      rank: 2,
      short_description: 'Grants +2 to Balance, Flexibility, and Stealth',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you gain a +2 \\glossterm{enhancement bonus} to your Balance, Flexibility, and Stealth skills.
        This effect expires after 10 minutes.
      `,
      upgrades: [
        {
          rank: 4,
          short_description: 'Grants +3 to Balance, Flexibility, and Stealth',
          description: `
            The bonus increases to +3.
          `,
        },
        {
          rank: 6,
          short_description: 'Grants +4 to Balance, Flexibility, and Stealth',
          description: `
            The bonus increases to +4.
          `,
        },
      ],
    }),
    createElixir({
      name: 'Fireproof Elixir',
      rank: 1,
      short_description: 'Resistant to fire',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you become \\resistant to \\atFire effects.
        This effect expires after 10 minutes.
      `,
      upgrades: [
        {
          rank: 4,
          short_description: 'Immune to fire',
          description: `
            You become immune instead of resistant.
          `,
        },
      ],
    }),
    createElixir({
      name: 'Elixir of Strength',
      rank: 1,
      short_description: 'Grants +1 bonus for weight limits',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you gain a +1 \\glossterm{enhancement bonus} to your Strength that only applies for the purpose of determining your \\glossterm{weight limits} (see \\pcref{Weight Limits}).
        This effect expires after 8 hours.
      `,
      upgrades: [
        {
          rank: 4,
          short_description: 'Grants +2 bonus for weight limits',
          description: `
            The bonus increases to +2.
          `,
        },
      ],
    }),
    createElixir({
      name: 'Fortifying Elixir',
      rank: 6,
      short_description: 'Fortifies you',
      description: `
        When you drink this \\glossterm{potion}, if you \\glossterm{attune} to its effects, you become \\fortified.
        This effect expires after 10 minutes.
      `,
    }),
  ];
}
