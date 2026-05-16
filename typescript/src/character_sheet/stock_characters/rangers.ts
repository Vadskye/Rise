import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addRangers(stock: StockCharacters) {
  stock.addCharacter('Ranger', (c) => applyRangerBase(c, 1));
  stock.addCharacter('Ranger 2', (c) => applyRangerBase(c, 2));
  stock.addCharacter('Ranger 5', (c) => applyRangerBase(c, 5));
  stock.addCharacter('Ranger 8', (c) => applyRangerBase(c, 8));
  stock.addCharacter('Ranger 11', (c) => applyRangerBase(c, 11));
  stock.addCharacter('Ranger 14', (c) => applyRangerBase(c, 14));
  stock.addCharacter('Ranger 17', (c) => applyRangerBase(c, 17));
  stock.addCharacter('Ranger 20', (c) => applyRangerBase(c, 20));
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
  c.setEquippedArmor({ bodyArmor: 'scale' });
  c.addWeapon('smallswords');
  c.addWeaponMult('smallswords');
}
