import { Creature } from '@src/character_sheet/creature';
import {
  getCharacterSheet,
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
    if (this.characters[name]) {
      return this.characters[name].autoClone();
    }

    const sheet = getCharacterSheet(name);
    // This assumes that any existing creature with the same name will have the same
    // statistics as a stock character of the same name.
    if (sheet) {
      delete this.pending[name];
      this.characters[name] = new Creature(sheet);
      return this.characters[name].autoClone();
    }

    const initializer = this.pending[name];
    if (!initializer) {
      return null;
    }
    delete this.pending[name];

    const newSheet = createCharacterSheet(name);
    newSheet.setProperties({ name });
    const creature = new Creature(newSheet);
    this.characters[name] = creature;
    // createCharacterSheet enables listeners before running the initializer,
    // ensuring that repeating section and other listeners are active.
    initializer(creature);

    newSheet.triggerRecalculation();

    return creature.autoClone();
  }

  getCharacterNames(): string[] {
    return [...Object.keys(this.characters), ...Object.keys(this.pending)];
  }

  hasCharacter(name: string): boolean {
    return this.characters[name] !== undefined || this.pending[name] !== undefined;
  }
}
