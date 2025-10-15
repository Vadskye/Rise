import { Creature, KnowledgeResultsConfig } from '@src/character_sheet/creature';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import {
  getCurrentCharacterSheet,
  setCurrentCharacterSheet,
} from '@src/character_sheet/current_character_sheet';

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

  addMonster(name: string, initializer: MonsterInitializer) {
    if (this.monsters[name] || this.monsterGroups[name]) {
      throw new Error(`Can't add a duplicate monster with '${name}'.`);
    }
    setCurrentCharacterSheet(name);
    handleEverything();
    const sheet = getCurrentCharacterSheet();
    sheet.setProperties({ name });
    this.monsters[name] = new Creature(sheet);
    initializer(this.monsters[name]);

    this.monsters[name].checkValidMonster();
  }

  addMonsterGroup(config: MonsterGroupConfig, initializers: [string, MonsterInitializer][]) {
    if (this.monsterGroups[config.name] || this.monsters[config.name]) {
      throw new Error(`Can't add a duplicate monster group with '${config.name}'.`);
    }

    this.monsterGroups[config.name] = {
      ...config,
      hasArt: Boolean(config.hasArt),
      monsters: [],
    };

    for (const [monsterName, initializer] of initializers) {
      setCurrentCharacterSheet(monsterName);
      handleEverything();
      const sheet = getCurrentCharacterSheet();
      sheet.setProperties({ name: monsterName });
      const creature = new Creature(sheet);
      initializer(creature);
      if (config.sharedInitializer) {
        config.sharedInitializer(creature);
      }
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
}
