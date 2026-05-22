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
import { addMisc } from '@src/character_sheet/stock_characters/misc';

type CharacterInitializer = (creature: Creature) => void;

export class StockCharacters {
  private characters: Record<string, Creature>;
  private pending: Record<string, CharacterInitializer>;

  constructor() {
    this.characters = {};
    this.pending = {};
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
    addMisc(this);
  }

  addCharacter(name: string, initializer: CharacterInitializer) {
    if (this.characters[name] || this.pending[name]) {
      throw new Error(`Can't add a duplicate character with '${name}'.`);
    }
    this.pending[name] = initializer;
  }

  getCharacter(name: string): Creature | null {
    if (this.pending[name]) {
      const initializer = this.pending[name];
      delete this.pending[name];

      if (characterSheetExists(name)) {
        throw new Error(`Can't add a duplicate character sheet named '${name}'.`);
      }
      const sheet = createCharacterSheet(name);
      sheet.setProperties({ name });
      const creature = new Creature(sheet);
      this.characters[name] = creature;
      initializer(creature);

      handleEverything();
      sheet.triggerRecalculation();
    }

    const char = this.characters[name];
    if (char) {
      return char.clone(`${name}_clone_${Math.random().toString(36).substring(7)}`);
    }
    return null;
  }

  getCharacterNames(): string[] {
    return [...Object.keys(this.characters), ...Object.keys(this.pending)];
  }

  hasCharacter(name: string): boolean {
    return this.characters[name] !== undefined || this.pending[name] !== undefined;
  }
}
