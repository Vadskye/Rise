import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addDruids(stock: StockCharacters) {
  stock.addCharacter('Druid', (c) => applyDruidBase(c, 1));
  stock.addCharacter('Druid 4', (c) => applyDruidBase(c, 4));
  stock.addCharacter('Druid 7', (c) => applyDruidBase(c, 7));
  stock.addCharacter('Druid 10', (c) => applyDruidBase(c, 10));
  stock.addCharacter('Druid 13', (c) => applyDruidBase(c, 13));
  stock.addCharacter('Druid 16', (c) => applyDruidBase(c, 16));
  stock.addCharacter('Druid 19', (c) => applyDruidBase(c, 19));
  stock.addCharacter('Druid 21', (c) => applyDruidBase(c, 21));
}

function applyDruidBase(c: Creature, level: number) {
  c.setRequiredProperties({
    alignment: 'neutral',
    base_class: 'druid',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: level,
    size: 'medium',
  });
  c.setProperties({
    willpower_at_creation: 3,
    perception_at_creation: 2,
    constitution_at_creation: 2,
    strength_at_creation: 1,
    dexterity_at_creation: 0,
    intelligence_at_creation: 0,
  });
  c.setEquippedArmor({ shield: 'standard shield' });
  c.addWeaponMult('sickle');
}
