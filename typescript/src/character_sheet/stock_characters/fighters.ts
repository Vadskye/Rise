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
  stock.addCharacter('Fighter 2', (c) => applyFighterBase(c, 2));
  stock.addCharacter('Fighter 5', (c) => applyFighterBase(c, 5));
  stock.addCharacter('Fighter 8', (c) => applyFighterBase(c, 8));
  stock.addCharacter('Fighter 11', (c) => applyFighterBase(c, 11));
  stock.addCharacter('Fighter 14', (c) => applyFighterBase(c, 14));
  stock.addCharacter('Fighter 17', (c) => applyFighterBase(c, 17));
  stock.addCharacter('Fighter 20', (c) => applyFighterBase(c, 20));
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
  c.setEquippedArmor({ bodyArmor: 'breastplate', shield: 'standard shield' });
  c.addWeapon('broadsword');
  c.addWeaponMult('broadsword');
  c.addManeuver('Steady Slam');

  const [rank1, rank2, rank3] = getArchetypeRanks(level);

  martialMasteryModifiers(c, rank1);
  equipmentTrainingModifiers(c, rank2);
  combatDisciplineModifiers(c, rank3);
}
