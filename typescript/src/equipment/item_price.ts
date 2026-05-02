import { ItemRarity } from './types';

export function getItemPrice(rank: number): string {
  let value: number;
  switch (rank) {
    case -1:
      value = 5;
      break;
    case 0:
      value = 1;
      break;
    case 1:
      value = 4;
      break;
    case 2:
      value = 20;
      break;
    case 3:
      value = 100;
      break;
    case 4:
      value = 500;
      break;
    case 5:
      value = 2500;
      break;
    case 6:
      value = 12500;
      break;
    case 7:
      value = 62500;
      break;
    case 8:
      value = 312500;
      break;
    default:
      throw new Error(`Unrecognized item rank ${rank}`);
  }
  return value.toLocaleString('en-US');
}

export function getRankAndPriceText(rank: number, rarity: ItemRarity): string {
  if (rarity === 'Common') {
    if (rank < 0) {
      return `\\tdash (${getItemPrice(rank)} sp)`;
    }
    return `${rank} (${getItemPrice(rank)} gp)`;
  } else {
    // Relic
    if (rank < 0) {
      return `\\tdash`;
    }
    return `${rank}`;
  }
}
