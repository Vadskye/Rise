import { Creature } from '@src/character_sheet/creature';
import { RiseBaseClass } from '@src/character_sheet/rise_data';
import { BodyArmor, Shield } from '@src/monsters/equipment';
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
    addMisc(this);
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
    const creature = this.characters[name];
    applyStandardEquipment(creature, creature.level);

    handleEverything();
    sheet.triggerRecalculation();
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

function getDefaultBodyArmor(baseClass: RiseBaseClass): BodyArmor | undefined {
  switch (baseClass) {
    case 'fighter':
    case 'paladin':
    case 'automaton':
    case 'treant':
      return 'breastplate'; // Heavy
    case 'barbarian':
    case 'cleric':
    case 'ranger':
    case 'votive':
    case 'troll':
      return 'scale'; // Medium
    case 'druid':
    case 'monk':
    case 'rogue':
    case 'dragon':
    case 'dryad':
    case 'harpy':
    case 'incarnation':
    case 'naiad':
    case 'oozeborn':
    case 'vampire':
      return 'buff leather'; // Light
    default:
      return undefined; // None
  }
}

export function applyStandardEquipment(creature: Creature, level: number) {
  const baseClass = creature.base_class;

  if (!creature.body_armor_name) {
    const defaultArmor = getDefaultBodyArmor(baseClass);
    if (defaultArmor) {
      creature.setEquippedArmor({ bodyArmor: defaultArmor });
    }
  }

  if (baseClass === 'fighter' || baseClass === 'paladin') {
    creature.setEquippedArmor({ shield: 'standard shield' });
  }
}
