import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';
import { getArchetypeRanks } from '@src/classes/archetypes/apply_archetypes';
import {
  esotericWarriorModifiers,
  airdancerModifiers,
  kiModifiers,
} from '@src/classes/archetypes/monk';

export function addMonks(stock: StockCharacters) {
  stock.addCharacter('Monk', (c) => applyMonkBase(c, 1));
  stock.addCharacter('Monk 2', (c) => applyMonkBase(c, 2));
  stock.addCharacter('Monk 5', (c) => applyMonkBase(c, 5));
  stock.addCharacter('Monk 8', (c) => applyMonkBase(c, 8));
  stock.addCharacter('Monk 11', (c) => applyMonkBase(c, 11));
  stock.addCharacter('Monk 14', (c) => applyMonkBase(c, 14));
  stock.addCharacter('Monk 17', (c) => applyMonkBase(c, 17));
  stock.addCharacter('Monk 20', (c) => applyMonkBase(c, 20));
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
  c.setEquippedArmorName({ bodyArmor: 'ki barrier' });
  c.setEquippedArmorEffects({ bodyArmor: 'ki barrier' });
  c.addWeaponMult('fists');

  const [rank1, rank2, rank3] = getArchetypeRanks(level);

  esotericWarriorModifiers(c, rank1);
  kiModifiers(c, rank2);
  airdancerModifiers(c, rank3);
}
