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
  private pendingMonsters: Record<string, MonsterInitializer>;
  private pendingMonsterGroups: Record<
    string,
    {
      config: MonsterGroupConfig;
      initializers: [string, MonsterInitializer][];
    }
  >;

  constructor() {
    this.monsters = {};
    this.monsterGroups = {};
    this.pendingMonsters = {};
    this.pendingMonsterGroups = {};
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
    if (
      this.monsters[name] ||
      this.pendingMonsters[name] ||
      this.monsterGroups[name] ||
      this.pendingMonsterGroups[name]
    ) {
      throw new Error(`Can't add a duplicate monster with '${name}'.`);
    }
    this.pendingMonsters[name] = initializer;
  }

  addMonsterGroup(config: MonsterGroupConfig, initializers: [string, MonsterInitializer][]) {
    if (this.monsterGroups[config.name] || this.pendingMonsterGroups[config.name]) {
      return;
    }
    if (this.monsters[config.name] || this.pendingMonsters[config.name]) {
      throw new Error(
        `Can't add a monster group named '${config.name}'; a monster with that name already exists.`,
      );
    }

    this.pendingMonsterGroups[config.name] = {
      config,
      initializers,
    };
  }

  private initializeMonster(
    sheetName: string,
    monsterName: string,
    initializer: MonsterInitializer,
    sharedInitializer?: MonsterInitializer,
  ): Creature {
    if (characterSheetExists(sheetName)) {
      throw new Error(`Can't add a duplicate character sheet named '${sheetName}'.`);
    }
    const sheet = createCharacterSheet(sheetName);
    sheet.setProperties({ name: monsterName });
    const creature = new Creature(sheet);
    initializer(creature);
    if (sharedInitializer) {
      sharedInitializer(creature);
    }
    handleEverything();
    sheet.triggerRecalculation();
    creature.checkValidMonster();
    return creature;
  }

  getMonsterNames() {
    return [...new Set([...Object.keys(this.monsters), ...Object.keys(this.pendingMonsters)])];
  }

  getMonsterGroupNames() {
    return [
      ...new Set([...Object.keys(this.monsterGroups), ...Object.keys(this.pendingMonsterGroups)]),
    ];
  }

  getMonsterGroup(name: string): MonsterGroup | null {
    if (this.monsterGroups[name]) {
      return this.monsterGroups[name];
    }
    const pending = this.pendingMonsterGroups[name];
    if (pending) {
      const monsters: Creature[] = [];
      for (const [monsterName, initializer] of pending.initializers) {
        const sheetName = `${name}.${monsterName}`;
        const creature = this.initializeMonster(
          sheetName,
          monsterName,
          initializer,
          pending.config.sharedInitializer,
        );
        monsters.push(creature);
      }
      const group: MonsterGroup = {
        ...pending.config,
        hasArt: Boolean(pending.config.hasArt),
        monsters,
      };
      this.monsterGroups[name] = group;
      delete this.pendingMonsterGroups[name];
      return group;
    }
    return null;
  }

  getMonster(name: string): Creature | null {
    if (this.monsters[name]) {
      return this.monsters[name];
    }
    const initializer = this.pendingMonsters[name];
    if (initializer) {
      const creature = this.initializeMonster(name, name, initializer);
      this.monsters[name] = creature;
      delete this.pendingMonsters[name];
      return creature;
    }
    return null;
  }

  hasMonster(name: string): boolean {
    return this.monsters[name] !== undefined || this.pendingMonsters[name] !== undefined;
  }

  hasMonsterGroup(name: string): boolean {
    return this.monsterGroups[name] !== undefined || this.pendingMonsterGroups[name] !== undefined;
  }
}
