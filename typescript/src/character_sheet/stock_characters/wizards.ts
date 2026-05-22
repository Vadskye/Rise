import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';
import { getArchetypeRanks } from '@src/classes/archetypes/apply_archetypes';
import {
  arcaneMagicModifiers,
  arcaneScholarModifiers,
  schoolSpecialistModifiers,
} from '@src/classes/archetypes/wizard';

export function addWizards(stock: StockCharacters) {
  stock.addCharacter('Wizard', (c) => applyWizardBase(c, 1));
  for (let level = 1; level <= 21; level++) {
    stock.addCharacter(`Wizard ${level}`, (c) => applyWizardBase(c, level));
  }
}

function applyWizardBase(c: Creature, level: number) {
  c.setRequiredProperties({
    alignment: 'lawful good',
    base_class: 'wizard',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: level,
    size: 'medium',
  });
  c.setProperties({
    intelligence_at_creation: 3,
    perception_at_creation: 2,
    willpower_at_creation: 2,
    constitution_at_creation: 1,
    strength_at_creation: 0,
    dexterity_at_creation: 0,
  });
  c.setEquippedArmorName({ bodyArmor: 'mage armor' });
  c.setEquippedArmorEffects({ bodyArmor: 'mage armor' });
  c.addSpell('Fireball');

  const [rank1, rank2, rank3] = getArchetypeRanks(level);

  arcaneMagicModifiers(c, rank1);
  arcaneScholarModifiers(c, rank2);
  schoolSpecialistModifiers(c, rank3);
}
