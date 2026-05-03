import { Tool, StandardItem } from '../../types';
import { getPoisonDescription } from '../../poison';

function createPoison(data: Partial<StandardItem>): Tool {
  return {
    category: 'Poison',
    item: {
      magical: false,
      rarity: 'Common',
      tags: ['Poison'],
      upgrades: [],
      description: '',
      short_description: '',
      name: '',
      rank: 0,
      ...data,
    },
  };
}

export function poisons(): Tool[] {
  return [
    createPoison({
      name: 'Poison, Snakeroot',
      rank: 0,
      short_description: 'Repeatedly deals $dr1l damage',
      description: getPoisonDescription(
        'contact',
        'powder',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr1l damage immediately and with each escalation.
        `
      ),
    }),
    createPoison({
      name: 'Poison, Nightshade',
      rank: 2,
      short_description: 'Repeatedly deals $dr3l damage',
      description: getPoisonDescription(
        'ingestion',
        'powder',
        `
          The poison's accuracy is $consumableaccuracy-3.
          It inflicts $dr4l damage immediately and with each escalation.
        `
      ),
    }),
    createPoison({
      name: 'Poison, Wolfsbane',
      rank: 1,
      short_description: 'Repeatedly deals $dr1l damage',
      description: getPoisonDescription(
        'contact',
        'powder',
        `
          The poison's accuracy is $consumableaccuracy+4.
          It inflicts $dr1l damage immediately and with each escalation.
        `
      ),
    }),
    createPoison({
      name: 'Poison, Jellyfish Extract',
      rank: 1,
      short_description: 'Repeatedly deals $dr0l damage',
      description: getPoisonDescription(
        'contact',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr0l damage immediately and with each escalation.
        `
      ),
    }),
    createPoison({
      name: 'Poison, Baneberry',
      rank: 1,
      short_description: 'Repeatedly deals $dr1l damage',
      description: getPoisonDescription(
        'ingestion',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr1l damage immediately and with each escalation.
        `
      ),
    }),
    createPoison({
      name: 'Poison, Tree Frog Coating',
      rank: 2,
      short_description: 'Repeatedly deals $dr2l damage',
      description: getPoisonDescription(
        'contact',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy-3.
          It inflicts $dr2l damage immediately and with each escalation.
        `
      ),
    }),
    createPoison({
      name: 'Poison, Bloodroot',
      rank: 3,
      short_description: 'Repeatedly deals $dr3l damage',
      description: getPoisonDescription(
        'contact',
        'powder',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr4l damage immediately and with each escalation.
        `
      ),
    }),
    createPoison({
      name: 'Poison, Arsenic',
      rank: 2,
      short_description: 'Repeatedly deals $dr3l damage',
      description: getPoisonDescription(
        'ingestion',
        'powder',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr3l damage immediately and with each escalation.
        `
      ),
    }),
    createPoison({
      name: 'Poison, Dragon Bile',
      rank: 4,
      short_description: 'Repeatedly deals $dr3l damage',
      description: getPoisonDescription(
        'contact',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr3l damage immediately and with each escalation.
        `
      ),
    }),
    createPoison({
      name: 'Poison, Mind Fog',
      rank: 4,
      short_description: 'Repeatedly deals $dr2l damage and eventually stuns',
      description: getPoisonDescription(
        'ingestion',
        'gas',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr2l damage immediately and with each escalation.
          The second escalation also makes the target \\stunned.
        `
      ),
    }),
    createPoison({
      name: 'Poison, Black Lotus',
      rank: 6,
      short_description: 'Repeatedly deals $dr5l damage',
      description: getPoisonDescription(
        'contact',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr5l damage immediately and with each escalation.
        `
      ),
    }),
    ...injuryPoisons(),
  ];
}

function injuryPoisons(): Tool[] {
  return [
    createPoison({
      name: 'Poison, Asp Venom',
      rank: 1,
      short_description: 'Stuns',
      description: getPoisonDescription(
        'injury',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          A poisoned creature is \\stunned while the poison lasts.
          The second escalation also inflicts $dr2l damage.
        `
      ),
    }),
    createPoison({
      name: 'Poison, Giant Wasp Venom',
      rank: 2,
      short_description: 'Slows',
      description: getPoisonDescription(
        'injury',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy+2.
          A poisoned creature is \\slowed while the poison lasts.
          The second escalation also inflicts $dr3l damage.
        `
      ),
    }),
    createPoison({
      name: 'Poison, Black Adder Venom',
      rank: 2,
      short_description: 'Repeatedly deals $dr3l damage',
      description: getPoisonDescription(
        'injury',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy+1.
          It inflicts $dr3l damage immediately and with each escalation.
        `
      ),
    }),
    createPoison({
      name: 'Poison, Wyvern Venom',
      rank: 3,
      short_description: 'Repeatedly deals $dr3l damage',
      description: getPoisonDescription(
        'injury',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy+1.
          It inflicts $dr3l damage immediately and with each escalation.
        `
      ),
    }),
    createPoison({
      name: 'Poison, Blood Leech Venom',
      rank: 4,
      short_description: 'Repeatedly deals $dr4l damage',
      description: getPoisonDescription(
        'injury',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy+5.
          It inflicts $dr4l damage immediately and with each escalation.
        `
      ),
    }),
    createPoison({
      name: 'Poison, Purple Worm Venom',
      rank: 5,
      short_description: 'Repeatedly deals $dr6l damage',
      description: getPoisonDescription(
        'injury',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy+1.
          It inflicts $dr6l damage immediately and with each escalation.
        `
      ),
    }),
  ];
}
