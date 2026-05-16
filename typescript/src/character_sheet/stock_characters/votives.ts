import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addVotives(stock: StockCharacters) {
  stock.addCharacter('Votive', (c) => applyVotiveBase(c, 1));
  stock.addCharacter('Votive 2', (c) => applyVotiveBase(c, 2));
  stock.addCharacter('Votive 5', (c) => applyVotiveBase(c, 5));
  stock.addCharacter('Votive 8', (c) => applyVotiveBase(c, 8));
  stock.addCharacter('Votive 11', (c) => applyVotiveBase(c, 11));
  stock.addCharacter('Votive 14', (c) => applyVotiveBase(c, 14));
  stock.addCharacter('Votive 17', (c) => applyVotiveBase(c, 17));
  stock.addCharacter('Votive 20', (c) => applyVotiveBase(c, 20));
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
  c.setEquippedArmor({ bodyArmor: 'scale', shield: 'standard shield' });
  c.addWeapon('broadsword');
  c.addWeaponMult('broadsword');
}
