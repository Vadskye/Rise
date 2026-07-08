import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { validateMonster } from './validate';
import { saveTypeScriptFile, DatabaseData } from './codegen';

const app = express();
const port = 3001;

app.use(express.json());

const dbPath = path.resolve(__dirname, '../monsters_from_ui.json');

function getDb(): DatabaseData {
  if (!fs.existsSync(dbPath)) {
    const defaultDb: DatabaseData = { monsters: [], monsterGroups: [] };
    // Ensure parent directory exists (though it should since it's the root of monster_ui)
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

function saveDb(db: DatabaseData) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  saveTypeScriptFile(db);
}

// Get the full list of monsters and groups
app.get('/api/monsters', (req, res) => {
  try {
    const db = getDb();
    res.json(db);
  } catch (err: any) {
    res.status(500).json({ error: err.message || err });
  }
});

// Save the entire database, trigger codegen, and run full validation
app.post('/api/save', (req, res) => {
  try {
    const db = req.body as DatabaseData;
    saveDb(db);
    
    // Run full validation on every monster
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

    res.json({ success: true, validations });
  } catch (err: any) {
    res.status(500).json({ error: err.message || err });
  }
});

// Live preview validation endpoint
app.post('/api/preview', (req, res) => {
  try {
    const { name, requiredProperties, freeformCode, sharedFreeformCode } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Monster name is required' });
    }
    const result = validateMonster(name, requiredProperties, freeformCode, sharedFreeformCode);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message || err });
  }
});

app.listen(port, () => {
  console.log(`Monster Creator API Server listening on http://localhost:${port}`);
});
