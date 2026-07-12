import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure real base files exist so that compiler/grimoire can resolve imports without throwing MODULE_NOT_FOUND
const realDbPath = path.resolve(__dirname, '../monsters_from_ui.json');
if (!fs.existsSync(realDbPath)) {
  const defaultDb = { monsters: [], monsterGroups: [] };
  fs.writeFileSync(realDbPath, JSON.stringify(defaultDb, null, 2), 'utf8');
}

const realTsPath = path.resolve(__dirname, '../../src/monsters/individual_monsters/monsters_from_ui.ts');
if (!fs.existsSync(realTsPath)) {
  const parentDir = path.dirname(realTsPath);
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }
  const defaultTs = `// AUTO-GENERATED fallback\nimport { Grimoire } from '../grimoire';\nexport function addMonstersFromUi(grimoire: Grimoire) {}\n`;
  fs.writeFileSync(realTsPath, defaultTs, 'utf8');
}

export const dbPath = process.env.NODE_ENV === 'test'
  ? path.resolve(__dirname, `../monsters_from_ui.test.${process.pid}.json`)
  : path.resolve(__dirname, '../monsters_from_ui.json');

export const generatedTsPath = process.env.NODE_ENV === 'test'
  ? path.resolve(__dirname, `../../src/monsters/individual_monsters/monsters_from_ui.test.${process.pid}.ts`)
  : path.resolve(__dirname, '../../src/monsters/individual_monsters/monsters_from_ui.ts');
