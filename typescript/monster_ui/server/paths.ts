import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure real base files exist so that compiler/grimoire can resolve imports without throwing MODULE_NOT_FOUND
const realDbPath = path.resolve(__dirname, '../monsters_from_ui.json');
if (!fs.existsSync(realDbPath)) {
  const defaultDb = { monsters: [], monsterGroups: [] };
  fs.writeFileSync(realDbPath, JSON.stringify(defaultDb, null, 2), 'utf8');
}

const realTsPath = path.resolve(
  __dirname,
  '../../src/monsters/individual_monsters/monsters_from_ui.ts',
);
if (!fs.existsSync(realTsPath)) {
  const parentDir = path.dirname(realTsPath);
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }
  const defaultTs = `// AUTO-GENERATED fallback\nimport { Grimoire } from '../grimoire';\nexport function addMonstersFromUi(grimoire: Grimoire) {}\n`;
  fs.writeFileSync(realTsPath, defaultTs, 'utf8');
}

const productionDbPath = path.resolve(__dirname, '../monsters_from_ui.json');
const productionTsPath = path.resolve(
  __dirname,
  '../../src/monsters/individual_monsters/monsters_from_ui.ts',
);

/**
 * Mutable paths object. All server code reads from this at call-time so that
 * tests can call `configurePaths()` before any DB operations and get isolated
 * storage without touching the production files.
 */
export const paths = {
  dbPath: productionDbPath,
  generatedTsPath: productionTsPath,
};

/**
 * Override the database and generated TypeScript file paths. Call this before
 * any DB operations — typically in test setup — to point the server at an
 * isolated location.
 */
export function configurePaths(dbPath: string, generatedTsPath: string): void {
  paths.dbPath = dbPath;
  paths.generatedTsPath = generatedTsPath;
}

/** Convenience accessors kept for backward compatibility with any direct imports. */
export function getDbPath(): string {
  return paths.dbPath;
}

export function getGeneratedTsPath(): string {
  return paths.generatedTsPath;
}
