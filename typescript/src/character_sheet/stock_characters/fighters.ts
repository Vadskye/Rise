import { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';
import {
  combatDisciplineModifiers,
  equipmentTrainingModifiers,
  martialMasteryModifiers,
} from '@src/classes/archetypes/fighter';
import { getArchetypeRanks } from '@src/classes/archetypes/apply_archetypes';

export function addFighters(stock: StockCharacters) {
  stock.addCharacter('Fighter', (c) => applyFighterBase(c, 1));
  for (let level = 1; level <= 21; level++) {
    stock.addCharacter(`Fighter ${level}`, (c) => applyFighterBase(c, level));
  }
}

function applyFighterBase(c: Creature, level: number) {
  c.setRequiredProperties({
    alignment: 'lawful neutral',
    base_class: 'fighter',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: level,
    size: 'medium',
  });
  c.setProperties({
    strength_at_creation: 3,
    dexterity_at_creation: 2,
    constitution_at_creation: 2,
    perception_at_creation: 1,
    intelligence_at_creation: 0,
    willpower_at_creation: 0,
  });
  c.setEquippedArmorName({ bodyArmor: 'breastplate', shield: 'standard shield' });
  c.setEquippedArmorEffects({ bodyArmor: 'breastplate', shield: 'standard shield' });
  c.addWeapon('broadsword');
  c.addWeaponMult('broadsword');
  c.addManeuver('Steady Slam');

  const [rank1, rank2, rank3] = getArchetypeRanks(level);

  martialMasteryModifiers(c, rank1);
  equipmentTrainingModifiers(c, rank2);
  combatDisciplineModifiers(c, rank3);
}
