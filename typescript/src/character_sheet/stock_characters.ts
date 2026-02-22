import { Creature } from '@src/character_sheet/creature';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import {
  characterSheetExists,
  createCharacterSheet,
} from '@src/character_sheet/current_character_sheet';
import { addBarbarians } from '@src/character_sheet/stock_characters/barbarians';
import { addClerics } from '@src/character_sheet/stock_characters/clerics';
import { addDruids } from '@src/character_sheet/stock_characters/druids';
import { addFighters } from '@src/character_sheet/stock_characters/fighters';
import { addMonks } from '@src/character_sheet/stock_characters/monks';
import { addPaladins } from '@src/character_sheet/stock_characters/paladins';
import { addRangers } from '@src/character_sheet/stock_characters/rangers';
import { addRogues } from '@src/character_sheet/stock_characters/rogues';
import { addSorcerers } from '@src/character_sheet/stock_characters/sorcerers';
import { addVotives } from '@src/character_sheet/stock_characters/votives';
import { addWizards } from '@src/character_sheet/stock_characters/wizards';

type CharacterInitializer = (creature: Creature) => void;

export class StockCharacters {
  private characters: Record<string, Creature>;

  constructor() {
    this.characters = {};
  }

  addAllCharacters() {
    addBarbarians(this);
    addFighters(this);
    addMonks(this);
    addRangers(this);
    addRogues(this);
    addClerics(this);
    addDruids(this);
    addPaladins(this);
    addSorcerers(this);
    addVotives(this);
    addWizards(this);
  }

  addCharacter(name: string, initializer: CharacterInitializer) {
    if (this.characters[name]) {
      throw new Error(`Can't add a duplicate character with '${name}'.`);
    }
    if (characterSheetExists(name)) {
      throw new Error(`Can't add a duplicate character sheet named '${name}'.`);
    }
    const sheet = createCharacterSheet(name);
    sheet.setProperties({ name });
    this.characters[name] = new Creature(sheet);
    initializer(this.characters[name]);

    handleEverything();
    sheet.triggerOpened();
  }

  getCharacter(name: string): Creature | null {
    return this.characters[name] || null;
  }

  getCharacterNames(): string[] {
    return Object.keys(this.characters);
  }

  hasCharacter(name: string): boolean {
    return this.characters[name] !== undefined;
  }
}
