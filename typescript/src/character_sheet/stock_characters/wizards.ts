import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addWizards(stock: StockCharacters) {
  stock.addCharacter('Wizard', (c) => applyWizardBase(c, 1));
  stock.addCharacter('Wizard 4', (c) => applyWizardBase(c, 4));
  stock.addCharacter('Wizard 7', (c) => applyWizardBase(c, 7));
  stock.addCharacter('Wizard 10', (c) => applyWizardBase(c, 10));
  stock.addCharacter('Wizard 13', (c) => applyWizardBase(c, 13));
  stock.addCharacter('Wizard 16', (c) => applyWizardBase(c, 16));
  stock.addCharacter('Wizard 19', (c) => applyWizardBase(c, 19));
  stock.addCharacter('Wizard 21', (c) => applyWizardBase(c, 21));
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
