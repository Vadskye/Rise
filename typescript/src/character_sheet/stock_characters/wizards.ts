import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addWizards(stock: StockCharacters) {
  stock.addCharacter('Wizard', (c) => applyWizardBase(c, 1));
  stock.addCharacter('Wizard 2', (c) => applyWizardBase(c, 2));
  stock.addCharacter('Wizard 5', (c) => applyWizardBase(c, 5));
  stock.addCharacter('Wizard 8', (c) => applyWizardBase(c, 8));
  stock.addCharacter('Wizard 11', (c) => applyWizardBase(c, 11));
  stock.addCharacter('Wizard 14', (c) => applyWizardBase(c, 14));
  stock.addCharacter('Wizard 17', (c) => applyWizardBase(c, 17));
  stock.addCharacter('Wizard 20', (c) => applyWizardBase(c, 20));
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
  c.setEquippedArmor({ bodyArmor: 'mage armor' });
  c.addSpell('Fireball');
}
