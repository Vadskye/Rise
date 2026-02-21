import { Creature } from './creature';
import { handleEverything } from './sheet_worker';
import {
    characterSheetExists,
    createCharacterSheet,
} from './current_character_sheet';
import { addBarbarians } from './stock_characters/barbarians';
import { addClerics } from './stock_characters/clerics';
import { addDruids } from './stock_characters/druids';
import { addFighters } from './stock_characters/fighters';
import { addMonks } from './stock_characters/monks';
import { addPaladins } from './stock_characters/paladins';
import { addRangers } from './stock_characters/rangers';
import { addRogues } from './stock_characters/rogues';
import { addSorcerers } from './stock_characters/sorcerers';
import { addVotives } from './stock_characters/votives';
import { addWizards } from './stock_characters/wizards';

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
