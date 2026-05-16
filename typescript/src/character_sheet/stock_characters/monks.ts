import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addMonks(stock: StockCharacters) {
  stock.addCharacter('Monk', (c) => applyMonkBase(c, 1));
  stock.addCharacter('Monk 4', (c) => applyMonkBase(c, 4));
  stock.addCharacter('Monk 7', (c) => applyMonkBase(c, 7));
  stock.addCharacter('Monk 10', (c) => applyMonkBase(c, 10));
  stock.addCharacter('Monk 13', (c) => applyMonkBase(c, 13));
  stock.addCharacter('Monk 16', (c) => applyMonkBase(c, 16));
  stock.addCharacter('Monk 19', (c) => applyMonkBase(c, 19));
  stock.addCharacter('Monk 21', (c) => applyMonkBase(c, 21));
}

function applyMonkBase(c: Creature, level: number) {
  c.setRequiredProperties({
    alignment: 'lawful neutral',
    base_class: 'monk',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: level,
    size: 'medium',
  });
  c.setProperties({
    dexterity_at_creation: 3,
    strength_at_creation: 2,
    willpower_at_creation: 2,
    constitution_at_creation: 1,
    intelligence_at_creation: 0,
    perception_at_creation: 0,
  });
  c.setEquippedArmor({ bodyArmor: 'ki barrier' });
  c.addWeaponMult('fists');
}
