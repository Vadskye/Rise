import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addRangers(stock: StockCharacters) {
  stock.addCharacter('Ranger', (c) => applyRangerBase(c, 1));
  stock.addCharacter('Ranger 4', (c) => applyRangerBase(c, 4));
  stock.addCharacter('Ranger 7', (c) => applyRangerBase(c, 7));
  stock.addCharacter('Ranger 10', (c) => applyRangerBase(c, 10));
  stock.addCharacter('Ranger 13', (c) => applyRangerBase(c, 13));
  stock.addCharacter('Ranger 16', (c) => applyRangerBase(c, 16));
  stock.addCharacter('Ranger 19', (c) => applyRangerBase(c, 19));
  stock.addCharacter('Ranger 21', (c) => applyRangerBase(c, 21));
}

function applyRangerBase(c: Creature, level: number) {
  c.setRequiredProperties({
    alignment: 'neutral good',
    base_class: 'ranger',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: level,
    size: 'medium',
  });
  c.setProperties({
    perception_at_creation: 3,
    dexterity_at_creation: 2,
    strength_at_creation: 2,
    constitution_at_creation: 1,
    intelligence_at_creation: 0,
    willpower_at_creation: 0,
  });
  c.addWeaponMult('smallswords');
}
