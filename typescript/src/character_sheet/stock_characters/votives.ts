import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addVotives(stock: StockCharacters) {
  stock.addCharacter('Votive', (c) => applyVotiveBase(c, 1));
  stock.addCharacter('Votive 4', (c) => applyVotiveBase(c, 4));
  stock.addCharacter('Votive 7', (c) => applyVotiveBase(c, 7));
  stock.addCharacter('Votive 10', (c) => applyVotiveBase(c, 10));
  stock.addCharacter('Votive 13', (c) => applyVotiveBase(c, 13));
  stock.addCharacter('Votive 16', (c) => applyVotiveBase(c, 16));
  stock.addCharacter('Votive 19', (c) => applyVotiveBase(c, 19));
  stock.addCharacter('Votive 21', (c) => applyVotiveBase(c, 21));
}

function applyVotiveBase(c: Creature, level: number) {
  c.setRequiredProperties({
    alignment: 'neutral',
    base_class: 'votive',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: level,
    size: 'medium',
  });
  c.setProperties({
    strength_at_creation: 3,
    willpower_at_creation: 2,
    perception_at_creation: 2,
    constitution_at_creation: 1,
    dexterity_at_creation: 0,
    intelligence_at_creation: 0,
  });
  c.setEquippedArmor({ shield: 'standard shield' });
  c.addWeaponMult('broadsword');
}
