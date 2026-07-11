import express from 'express';
import { validateMonster } from './validate';
import { DatabaseData } from './codegen';
import { getDb, saveAndValidateAll } from './db';
import { allMysticSpheres } from '@src/abilities/mystic_spheres';
import { allCombatStyles } from '@src/abilities/combat_styles';
import { MONSTER_WEAPONS } from '@src/monsters/weapons';

const app = express();
const port = 3001;

app.use(express.json());

// Fetch available spells, maneuvers, weapons, and mystic spheres from the game engine
app.get('/api/reference', (req, res) => {
  console.log('[API] GET /api/reference - Fetching engine reference data');
  try {
    const uniqueSpells = Array.from(
      new Set(
        allMysticSpheres
          .flatMap((sphere) => sphere.spells ?? [])
          .map((spell) => spell.name),
      ),
    ).sort();

    const uniqueManeuvers = Array.from(
      new Set(
        allCombatStyles
          .flatMap((style) => style.maneuvers ?? [])
          .map((maneuver) => maneuver.name),
      ),
    ).sort();

    const weaponNames = Array.from(MONSTER_WEAPONS).sort();

    const sphereNames = allMysticSpheres
      .map((s) => s.name)
      .filter((name) => name !== 'Non-Sphere Spells')
      .sort();

    res.json({
      spells: uniqueSpells,
      maneuvers: uniqueManeuvers,
      weapons: weaponNames,
      spheres: sphereNames,
    });
  } catch (err: any) {
    console.error('[API Error] Failed to fetch reference data:', err);
    res.status(500).json({ error: err.message || err });
  }
});

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
    const { monster, sharedFreeformCode, groupName } = req.body;
    if (!monster || !monster.name) {
      console.warn('[API Warning] Preview requested without a valid monster');
      return res.status(400).json({ error: 'Monster data with name is required' });
    }
    console.log(
      `[API] POST /api/preview - Calculating live preview for monster: "${monster.name}"${groupName ? ` in group "${groupName}"` : ''}`,
    );
    const result = validateMonster(monster, sharedFreeformCode, groupName);
    res.json(result);
  } catch (err: any) {
    console.error('[API Error] Preview calculation failed:', err);
    res.status(500).json({ error: err.message || err });
  }
});

export { app };

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, '127.0.0.1', () => {
    console.log(`Monster Creator API Server listening on http://localhost:${port}`);
  });
}
