import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { saveTypeScriptFile, DatabaseData } from './codegen';
import { validateMonster } from './validate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const dbPath = path.resolve(__dirname, '../monsters_from_ui.json');

export function getDb(): DatabaseData {
  console.log(`[DB] Loading database from path: ${dbPath}`);
  if (!fs.existsSync(dbPath)) {
    console.log('[DB] Database file not found. Creating default empty database.');
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
  console.log(`[DB] Writing database JSON to: ${dbPath}`);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('[DB] Database JSON written successfully. Triggering TypeScript code generation.');
  saveTypeScriptFile(db);
  console.log('[DB] TypeScript code generation completed.');
}

export function saveAndValidateAll(db: DatabaseData) {
  console.log('[DB] Beginning save and validation process...');
  saveDb(db);

  const validations: Record<string, any> = {};

  const monsters = db.monsters || [];
  if (monsters.length > 0) {
    console.log(`[DB] Validating ${monsters.length} individual monsters...`);
    for (const monster of monsters) {
      validations[monster.name] = validateMonster(monster);
    }
  }

  const groups = db.monsterGroups || [];
  if (groups.length > 0) {
    console.log(`[DB] Validating ${groups.length} monster groups...`);
    for (const group of groups) {
      const groupMonsters = group.monsters || [];
      console.log(`[DB] Validating group "${group.name}" with ${groupMonsters.length} monsters...`);
      for (const monster of groupMonsters) {
        validations[`${group.name}.${monster.name}`] = validateMonster(
          monster,
          group.sharedFreeformCode,
        );
      }
    }
  }

  console.log('[DB] All validations complete.');
  return { success: true, validations };
}
