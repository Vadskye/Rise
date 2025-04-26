import { Creature } from '@src/character_sheet/creature';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import {
  getCurrentCharacterSheet,
  setCurrentCharacterSheet,
} from '@src/character_sheet/current_character_sheet';

type MonsterInitializer = (creature: Creature) => void;

export class Grimoire {
  private monsters: Record<string, Creature>;
  private monsterGroups: Record<string, Creature[]>;

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
  }

  addMonsterGroup(name: string, initializers: [string, MonsterInitializer][]) {
    if (this.monsterGroups[name] || this.monsters[name]) {
      throw new Error(`Can't add a duplicate monster group with '${name}'.`);
    }

    this.monsterGroups[name] = [];

    for (const [monsterName, initializer] of initializers) {
      setCurrentCharacterSheet(monsterName);
      handleEverything();
      const sheet = getCurrentCharacterSheet();
      sheet.setProperties({ name: monsterName });
      const creature = new Creature(sheet);
      initializer(creature);
      this.monsterGroups[name].push(creature);
    }
  }

  getMonsterNames() {
    return Object.keys(this.monsters);
  }

  getMonsterGroupNames() {
    return Object.keys(this.monsterGroups);
  }

  getMonsterGroup(name: string): Creature[] {
    if (!this.monsters[name]) {
      throw new Error(`No existing monster named '${name}'.`);
    }
    return this.monsterGroups[name];
  }

  getMonster(name: string): Creature {
    if (!this.monsters[name]) {
      throw new Error(`No existing monster named '${name}'.`);
    }
    // setCurrentCharacterSheet(name);
    return this.monsters[name];
  }
}
