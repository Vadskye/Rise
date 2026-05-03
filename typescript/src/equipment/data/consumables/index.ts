import { Tool } from '../../types';
import { alchemicalItems } from './alchemical_items';
import { elixirs } from './elixirs';
import { poisons } from './poisons';
import { potions } from './potions';

export function consumables(): Tool[] {
  return [
    ...alchemicalItems(),
    ...elixirs(),
    ...poisons(),
    ...potions(),
  ];
}
