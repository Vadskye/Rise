import { Tool, StandardItem } from '../../types';

function createPotion(data: Partial<StandardItem>): Tool {
  return {
    category: 'Potion',
    item: {
      magical: true,
      rarity: 'Common',
      tags: [],
      upgrades: [],
      description: '',
      short_description: '',
      name: '',
      rank: 0,
      ...data,
    },
  };
}

export function potions(): Tool[] {
  return [
    createPotion({
      name: 'Cleansing Potion',
      rank: 2,
      short_description: 'Removes a condition',
      description: `
        When you drink this \\glossterm{potion}, you remove a \\glossterm{condition} affecting you and increase your \\glossterm{fatigue level} by one.
      `,
      upgrades: [
        {
          rank: 4,
          short_description: 'Removes two conditions',
          description: `
            You remove two conditions instead of only one.
            You increase your fatigue level by one for each condition that you remove in this way.
          `,
        },
      ],
    }),
    createPotion({
      name: 'Potion of Healing',
      rank: 0,
      short_description: 'Restores $dr4l hit points and mitigates vital wounds',
      description: `
        When you drink this \\glossterm{potion}, you regain $dr4l hit points and increase your \\glossterm{fatigue level} by one.
        In addition, you can increase one of your \\glossterm{vital wounds} with a \\glossterm{vital roll} of 0 to be equal to 1 instead (see \\pcref{Vital Wounds}).
      `,
      upgrades: [
        {
          rank: 1,
          short_description: 'Restores $dr5l hit points and mitigates vital wounds',
          description: `
            The healing increases to $dr5l, and the minimum vital roll affected improves to \\minus1.
          `,
        },
        {
          rank: 3,
          short_description: 'Restores $dr8l hit points and mitigates vital wounds',
          description: `
            The healing increases to $dr8l, and the minimum vital roll affected improves to \\minus2.
          `,
        },
        {
          rank: 5,
          short_description: 'Restores $dr10l hit points and mitigates vital wounds',
          description: `
            The healing increases to $dr10l, and the minimum vital roll affected improves to \\minus3.
          `,
        },
      ],
    }),
    createPotion({
      name: 'Godsblood',
      rank: 7,
      short_description: 'Restores $dr10l hit points over time',
      description: `
        When you drink this \\glossterm{potion}, you regain $dr10l hit points and increase your \\glossterm{fatigue level} by one.
        In addition, you increase all of your vital wounds with a \\glossterm{vital roll} of less than 1 to be equal to 1.
        At the end of your next turn, this effect repeats.
      `,
    }),
    createPotion({
      name: 'Potion of Regeneration',
      rank: 1,
      short_description: 'Remove vital wound after long rest',
      description: `
        When you drink this \\glossterm{potion}, your body's natural healing process is accelerated.
        The next time you finish a \\glossterm{long rest}, you can remove an additional \\glossterm{vital wound}.
        If you drink multiple potions of regeneration, their effects do not stack.
      `,
      upgrades: [
        {
          rank: 4,
          short_description: 'Removes two vital wounds after a long rest',
          description: `
            You remove two additional vital wounds instead of only one.
          `,
        },
      ],
    }),
    createPotion({
      name: 'Invigorating Potion',
      rank: 0,
      short_description: 'Grants power and fortification',
      description: `
        When you drink this \\glossterm{potion}, you are \\glossterm{briefly} \\empowered and \\fortified.
      `,
    }),
    createPotion({
      name: 'Mind-Whetting Potion',
      rank: 0,
      short_description: 'Grants focus',
      description: `
        When you drink this \\glossterm{potion}, you are \\glossterm{briefly} \\empowered and \\focused.
      `,
    }),
    createPotion({
      name: 'Potion of Impending Violence',
      rank: 1,
      short_description: 'Primes and enrages you',
      description: `
        When you drink this \\glossterm{potion}, you are \\glossterm{briefly} \\primed and \\enraged.
      `,
    }),
    createPotion({
      name: 'Potion of Sharpened Steel',
      rank: 1,
      short_description: 'Grants critical benefits',
      description: `
        When you drink this \\glossterm{potion}, you are \\glossterm{briefly} \\honed and \\steeled.
      `,
    }),
    createPotion({
      name: 'Potion of Maximal Might',
      rank: 1,
      short_description: 'Grants maximum damage',
      description: `
        When you drink this \\glossterm{potion}, you are \\glossterm{briefly} \\maximized.
      `,
    }),
    createPotion({
      name: 'Potion of Pure Power',
      rank: 5,
      short_description: 'Grants power and maximum damage',
      description: `
        When you drink this \\glossterm{potion}, you are \\glossterm{briefly} \\empowered and \\maximized.
      `,
    }),
  ];
}
