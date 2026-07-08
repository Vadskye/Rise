import express from 'express';
import { validateMonster } from './validate';
import { DatabaseData } from './codegen';
import { getDb, saveAndValidateAll } from './db';

const app = express();
const port = 3001;

app.use(express.json());

// Get the full list of monsters and groups
app.get('/api/monsters', (req, res) => {
  console.log('[API] GET /api/monsters - Fetching all monsters and groups');
  try {
    const db = getDb();
    res.json(db);
  } catch (err: any) {
    console.error('[API Error] Failed to fetch monsters:', err);
    res.status(500).json({ error: err.message || err });
  }
});

// Save the entire database, trigger codegen, and run full validation
app.post('/api/save', (req, res) => {
  console.log('[API] POST /api/save - Saving database');
  try {
    const db = req.body as DatabaseData;
    const monsterCount = db.monsters?.length || 0;
    const groupCount = db.monsterGroups?.length || 0;
    console.log(
      `[API] Saving database with ${monsterCount} individual monsters and ${groupCount} groups.`,
    );
    const result = saveAndValidateAll(db);
    console.log('[API] Save and validation completed successfully');
    res.json(result);
  } catch (err: any) {
    console.error('[API Error] Failed to save database:', err);
    res.status(500).json({ error: err.message || err });
  }
});

// Live preview validation endpoint
app.post('/api/preview', (req, res) => {
  try {
    const { name, requiredProperties, freeformCode, sharedFreeformCode } = req.body;
    console.log(
      `[API] POST /api/preview - Calculating live preview for monster: "${name || 'unknown'}"`,
    );
    if (!name) {
      console.warn('[API Warning] Preview requested without a monster name');
      return res.status(400).json({ error: 'Monster name is required' });
    }
    const result = validateMonster(name, requiredProperties, freeformCode, sharedFreeformCode);
    res.json(result);
  } catch (err: any) {
    console.error('[API Error] Preview calculation failed:', err);
    res.status(500).json({ error: err.message || err });
  }
});

export { app };

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Monster Creator API Server listening on http://localhost:${port}`);
  });
}
