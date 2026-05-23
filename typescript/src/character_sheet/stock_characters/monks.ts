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
  for (let level = 1; level <= 21; level++) {
    stock.addCharacter(`Monk ${level}`, (c) => applyMonkBase(c, level));
  }
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
