import express from 'express';
import { validateMonster } from './validate';
import { DatabaseData } from './codegen';
import { getDb, saveAndValidateAll } from './db';

const app = express();
const port = 3001;

app.use(express.json());

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
    const result = saveAndValidateAll(db);
    res.json(result);
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
