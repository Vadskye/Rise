import { Tool, ItemRarity } from '../types';
import { consumables } from './consumables';
import { tools as permanentTools } from './tools';

export function allTools(options: { consumable?: boolean; rarity?: ItemRarity } = {}): Tool[] {
  let all: Tool[] = [...consumables(), ...permanentTools()];

  if (options.consumable !== undefined) {
    all = all.filter((t) => isConsumable(t) === options.consumable);
  }
  if (options.rarity !== undefined) {
    all = all.filter((t) => t.item.rarity === options.rarity);
  }

  all.sort((a, b) => a.item.name.localeCompare(b.item.name));
  return all;
}

function isConsumable(tool: Tool): boolean {
  if (typeof tool.category === 'string') {
    return (
      tool.category === 'Alchemical' || tool.category === 'Poison' || tool.category === 'Potion'
    );
  }
  return false;
}
