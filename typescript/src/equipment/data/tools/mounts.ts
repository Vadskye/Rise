import { Tool, StandardItem } from '../../types';

function createMount(data: Partial<StandardItem>): Tool {
  return {
    category: 'Mount',
    item: {
      magical: false,
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

export function mounts(): Tool[] {
  return [
    createMount({
      name: 'Riding Dog',
      rank: 1,
      short_description: 'Medium dog trained for battle or riding',
      description: `
        This is a Medium dog that knows the Guard and Heel tricks (see \\pcref{Creature Handling}).
        It is trained to be effective in battle, and is a suitable mount for creatures with the \\textit{short stature} ability, such as kobolds and halflings.
      `,
    }),
    createMount({
      name: 'Horse, Light',
      rank: 1,
      short_description: 'Large horse trained for riding',
      description: `
        This is a Large light horse intended for riding.
        It is not trained to be effectively ridden in battle.
        % TODO: calculate horse as a monster
        It has 12 hit points.
      `,
    }),
    createMount({
      name: 'Horse, Draft',
      rank: 1,
      short_description: 'Large horse trained for labor',
      description: `
        This is a Large draft horse intended for working a farm or similar labor.
        It is not trained to be effectively ridden in battle.
        % TODO: calculate horse as a monster
        It has 16 hit points.
      `,
    }),
    createMount({
      name: 'Warhorse',
      rank: 2,
      short_description: 'Large horse trained for battle',
      description: `
        This is a Large warhorse.
        It is trained to be effectively ridden in battle.
        % TODO: calculate horse as a monster
        It has 20 hit points.
      `,
    }),
    createMount({
      name: 'Pony',
      rank: 1,
      short_description: 'Medium pony trained for riding',
      description: `
        This is a Medium pony.
        It is not trained to be effectively ridden in battle.
        However, it is an appropriate mount outside of battle for creatures with the \\textit{short stature} ability, such as kobolds and halflings.
      `,
    }),
    createMount({
      name: 'War Pony',
      rank: 2,
      short_description: 'Medium pony trained for battle',
      description: `
        This is a Medium horse.
        It is trained to be effectively ridden in battle, and it is an appropriate mount for creatures with the \\textit{short stature} ability, such as kobolds and halflings.
      `,
    }),
  ];
}
