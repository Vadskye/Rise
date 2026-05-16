import { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';
import { combatDisciplineModifiers, equipmentTrainingModifiers, sentinelModifiers } from '@src/classes/archetypes/fighter';
import { getArchetypeRanks } from '@src/classes/archetypes/apply_archetypes';

export function addFighters(stock: StockCharacters) {
  stock.addCharacter('Fighter', (c) => applyFighterBase(c, 1));
  stock.addCharacter('Fighter 4', (c) => applyFighterBase(c, 4));
  stock.addCharacter('Fighter 7', (c) => applyFighterBase(c, 7));
  stock.addCharacter('Fighter 10', (c) => applyFighterBase(c, 10));
  stock.addCharacter('Fighter 13', (c) => applyFighterBase(c, 13));
  stock.addCharacter('Fighter 16', (c) => applyFighterBase(c, 16));
  stock.addCharacter('Fighter 19', (c) => applyFighterBase(c, 19));
  stock.addCharacter('Fighter 21', (c) => applyFighterBase(c, 21));
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
  c.addWeaponMult('broadsword');
  c.addManeuver('Steady Slam');
  
  const [rank1, rank2, rank3] = getArchetypeRanks(level);
  
  combatDisciplineModifiers(c, rank1);
  equipmentTrainingModifiers(c, rank2);
  sentinelModifiers(c, rank3);
}
