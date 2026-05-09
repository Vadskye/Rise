import { Creature, KnowledgeResultsConfig } from '@src/character_sheet/creature';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import {
  characterSheetExists,
  createCharacterSheet,
} from '@src/character_sheet/current_character_sheet';
import { addAberrations } from '@src/monsters/individual_monsters/aberrations';
import { addAliens } from '@src/monsters/individual_monsters/aliens';
import { addAnimates } from '@src/monsters/individual_monsters/animates';
import { addBeasts } from '@src/monsters/individual_monsters/beasts';
import { addElementals } from '@src/monsters/individual_monsters/elementals';
import { addHumanoids } from '@src/monsters/individual_monsters/humanoids';
import { addSoulforged } from '@src/monsters/individual_monsters/soulforged';
import { addUndead } from '@src/monsters/individual_monsters/undead';

type MonsterInitializer = (creature: Creature) => void;

export interface MonsterGroup {
  description?: string;
  knowledge?: KnowledgeResultsConfig;
  hasArt: boolean;
  name: string;
  monsters: Creature[];
}

export interface MonsterGroupConfig {
  description?: string;
  hasArt?: boolean;
  knowledge?: KnowledgeResultsConfig;
  name: string;
  sharedInitializer?: MonsterInitializer;
}

export class Grimoire {
  private monsters: Record<string, Creature>;
  private monsterGroups: Record<string, MonsterGroup>;

  constructor() {
    this.monsters = {};
    this.monsterGroups = {};
  }

  addAllMonsters() {
    addAberrations(this);
    addAliens(this);
    addAnimates(this);
    addBeasts(this);
    addElementals(this);
    addHumanoids(this);
    addSoulforged(this);
    addUndead(this);
  }

  addMonster(name: string, initializer: MonsterInitializer) {
    if (this.monsters[name] || this.monsterGroups[name]) {
      throw new Error(`Can't add a duplicate monster with '${name}'.`);
    }
    if (characterSheetExists(name)) {
      throw new Error(`Can't add a duplicate character sheet named '${name}'.`);
    }
    const sheet = createCharacterSheet(name);
    sheet.setProperties({ name });
    this.monsters[name] = new Creature(sheet);
    initializer(this.monsters[name]);
    handleEverything();

    sheet.triggerRecalculation();

    this.monsters[name].checkValidMonster();
  }

  addMonsterGroup(config: MonsterGroupConfig, initializers: [string, MonsterInitializer][]) {
    if (this.monsterGroups[config.name]) {
      return;
    }
    if (this.monsters[config.name]) {
      throw new Error(
        `Can't add a monster group named '${config.name}'; a monster with that name already exists.`,
      );
    }

    this.monsterGroups[config.name] = {
      ...config,
      hasArt: Boolean(config.hasArt),
      monsters: [],
    };

    for (const [monsterName, initializer] of initializers) {
      const characterSheetName = `${config.name}.${monsterName}`;
      if (characterSheetExists(characterSheetName)) {
        throw new Error(`Can't add a duplicate character sheet named '${characterSheetName}'.`);
      }
      const sheet = createCharacterSheet(characterSheetName);
      sheet.setProperties({ name: monsterName });
      const creature = new Creature(sheet);
      // Some shared initializer logic can depend on the monster's rank, so initializing here can help.
      initializer(creature);
      if (config.sharedInitializer) {
        config.sharedInitializer(creature);
      }
      handleEverything();
      sheet.triggerRecalculation();
      this.monsterGroups[config.name].monsters.push(creature);
    }
  }

  getMonsterNames() {
    return Object.keys(this.monsters);
  }

  getMonsterGroupNames() {
    return Object.keys(this.monsterGroups);
  }

  getMonsterGroup(name: string): MonsterGroup | null {
    return this.monsterGroups[name] || null;
  }

  getMonster(name: string): Creature | null {
    return this.monsters[name] || null;
  }

  hasMonster(name: string): boolean {
    return this.monsters[name] !== undefined;
  }

  hasMonsterGroup(name: string): boolean {
    return this.monsterGroups[name] !== undefined;
  }
}
