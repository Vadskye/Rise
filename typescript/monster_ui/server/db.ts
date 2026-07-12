import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { saveTypeScriptFile, DatabaseData } from './codegen';
import { validateMonster } from './validate';
import { keepOnlyCharacterSheets } from '@src/character_sheet/current_character_sheet';
import { showDetailedTiming } from './timing';

import { dbPath, generatedTsPath } from './paths';
export { dbPath, generatedTsPath };

export function getDb(): DatabaseData {
  const start = performance.now();
  if (showDetailedTiming) {
    console.log(`[Timing] [DB] Loading database from path: ${dbPath}`);
  } else {
    console.log(`[DB] Loading database from path: ${dbPath}`);
  }

  if (!fs.existsSync(dbPath)) {
    console.log('[DB] Database file not found. Creating default empty database.');
    const defaultDb: DatabaseData = { monsters: [], monsterGroups: [] };
    const parentDir = path.dirname(dbPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(defaultDb, null, 2), 'utf8');
    if (showDetailedTiming) {
      console.log(
        `[Timing] [DB] Created default database in ${(performance.now() - start).toFixed(2)}ms`,
      );
    }
    return defaultDb;
  }
  const raw = fs.readFileSync(dbPath, 'utf8');
  const parsed = JSON.parse(raw);
  if (showDetailedTiming) {
    console.log(
      `[Timing] [DB] Loaded and parsed database in ${(performance.now() - start).toFixed(2)}ms`,
    );
  }
  return parsed;
}

export function saveDb(db: DatabaseData) {
  const start = performance.now();
  console.log(`[DB] Writing database JSON to: ${dbPath}`);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  const writeJsonDuration = performance.now() - start;

  console.log('[DB] Database JSON written successfully. Triggering TypeScript code generation.');
  const codegenStart = performance.now();
  saveTypeScriptFile(db);
  const codegenDuration = performance.now() - codegenStart;
  console.log('[DB] TypeScript code generation completed.');

  if (showDetailedTiming) {
    console.log(
      `[Timing] [DB] saveDb detail: Write JSON: ${writeJsonDuration.toFixed(2)}ms, Codegen: ${codegenDuration.toFixed(2)}ms, Total: ${(performance.now() - start).toFixed(2)}ms`,
    );
  }
}

export function saveAndValidateAll(db: DatabaseData) {
  const start = performance.now();
  console.log('[DB] Beginning save and validation process...');

  const saveStart = performance.now();
  saveDb(db);
  const saveDuration = performance.now() - saveStart;

  const validations: Record<string, ReturnType<typeof validateMonster>> = {};

  const monsters = db.monsters || [];
  const validateMonstersStart = performance.now();
  if (monsters.length > 0) {
    console.log(`[DB] Validating ${monsters.length} individual monsters...`);
    for (const monster of monsters) {
      const monsterStart = performance.now();
      validations[monster.name] = validateMonster(monster);
      if (showDetailedTiming) {
        console.log(
          `[Timing] Validated monster "${monster.name}" in ${(performance.now() - monsterStart).toFixed(2)}ms (cacheHit: ${validations[monster.name].cacheHit})`,
        );
      }
    }
  }
  const validateMonstersDuration = performance.now() - validateMonstersStart;

  const groups = db.monsterGroups || [];
  const validateGroupsStart = performance.now();
  if (groups.length > 0) {
    console.log(`[DB] Validating ${groups.length} monster groups...`);
    for (const group of groups) {
      const groupStart = performance.now();
      const groupMonsters = group.monsters || [];
      console.log(`[DB] Validating group "${group.name}" with ${groupMonsters.length} monsters...`);
      for (const monster of groupMonsters) {
        const monsterStart = performance.now();
        validations[`${group.name}.${monster.name}`] = validateMonster(monster, group, group.name);
        if (showDetailedTiming) {
          console.log(
            `[Timing] Validated group monster "${group.name}.${monster.name}" in ${(performance.now() - monsterStart).toFixed(2)}ms (cacheHit: ${validations[`${group.name}.${monster.name}`].cacheHit})`,
          );
        }
      }
      if (showDetailedTiming) {
        console.log(
          `[Timing] Validated entire group "${group.name}" in ${(performance.now() - groupStart).toFixed(2)}ms`,
        );
      }
    }
  }
  const validateGroupsDuration = performance.now() - validateGroupsStart;

  // Garbage collect sheets for deleted/renamed monsters
  const gcStart = performance.now();
  const activeNames: string[] = [];
  for (const monster of monsters) {
    activeNames.push(monster.name);
  }
  for (const group of groups) {
    const groupMonsters = group.monsters || [];
    for (const monster of groupMonsters) {
      activeNames.push(monster.name);
    }
  }
  keepOnlyCharacterSheets(activeNames);
  const gcDuration = performance.now() - gcStart;

  const totalDuration = performance.now() - start;
  console.log(
    `[DB] All validations complete. Total save & validate process took ${totalDuration.toFixed(2)}ms`,
  );

  if (showDetailedTiming) {
    console.log(`[Timing] Save and Validate Breakdown:`);
    console.log(`  - saveDb (JSON + Codegen): ${saveDuration.toFixed(2)}ms`);
    console.log(`  - Validate individual monsters: ${validateMonstersDuration.toFixed(2)}ms`);
    console.log(`  - Validate monster groups: ${validateGroupsDuration.toFixed(2)}ms`);
    console.log(`  - Garbage collection: ${gcDuration.toFixed(2)}ms`);
  }

  return { success: true, validations };
}
