import { Creature } from '@src/character_sheet/creature';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import { getCurrentCharacterSheet, setCurrentCharacterSheet } from '@src/character_sheet/current_character_sheet';

export class Grimoire {
  creatures: Record<string, Creature>;

  constructor() {
    this.creatures = {};
  }

  addMonster(name: string, initializer: (creature: Creature) => void) {
    if (this.creatures[name]) {
      throw new Error(`Can't add a duplicate creature with '${name}'.`);
    }
    setCurrentCharacterSheet(name);
    handleEverything();
    const sheet = getCurrentCharacterSheet();
    sheet.setProperties({ name });
    this.creatures[name] = new Creature(sheet);
    initializer(this.creatures[name]);
  }

  getMonster(name: string, callback: (creature: Creature) => void) {
    if (!this.creatures[name]) {
      throw new Error(`No existing monster named '${name}'.`);
    }
    setCurrentCharacterSheet(name);
    callback(this.creatures[name]);
  }
}
