import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { saveTypeScriptFile, DatabaseData } from './codegen';
import { validateMonster } from './validate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const dbPath = path.resolve(__dirname, '../monsters_from_ui.json');

export function getDb(): DatabaseData {
  if (!fs.existsSync(dbPath)) {
    const defaultDb: DatabaseData = { monsters: [], monsterGroups: [] };
    const parentDir = path.dirname(dbPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(defaultDb, null, 2), 'utf8');
    return defaultDb;
  }
  const raw = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(raw);
}

export function saveDb(db: DatabaseData) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  saveTypeScriptFile(db);
}

export function saveAndValidateAll(db: DatabaseData) {
  saveDb(db);
  
  const validations: Record<string, any> = {};
  for (const monster of db.monsters || []) {
    validations[monster.name] = validateMonster(
      monster.name, 
      monster.requiredProperties, 
      monster.freeformCode
    );
  }
  for (const group of db.monsterGroups || []) {
    for (const monster of group.monsters || []) {
      validations[`${group.name}.${monster.name}`] = validateMonster(
        monster.name,
        monster.requiredProperties,
        monster.freeformCode,
        group.sharedFreeformCode
      );
    }
  }
  return { success: true, validations };
}
