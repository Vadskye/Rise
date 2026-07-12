import express from 'express';
import { generatePreview } from './preview';
import { DatabaseData } from './codegen';
import { getDb, saveAndValidateAll } from './db';
import { allMysticSpheres } from '@src/abilities/mystic_spheres';
import { allCombatStyles } from '@src/abilities/combat_styles';
import { MONSTER_WEAPONS } from '@src/monsters/weapons';
import { showDetailedTiming } from './timing';

const app = express();
const port = 3001;

app.use(express.json());

// Fetch available spells, maneuvers, weapons, and mystic spheres from the game engine
app.get('/api/reference', (req, res) => {
  const start = performance.now();
  console.log('[API] GET /api/reference - Fetching engine reference data');
  try {
    const s1 = performance.now();
    const uniqueSpells = Array.from(
      new Set(allMysticSpheres.flatMap((sphere) => sphere.spells ?? []).map((spell) => spell.name)),
    ).sort();
    const dSpells = performance.now() - s1;

    const s2 = performance.now();
    const SPECIAL_MANEUVERS = [
      'Equip Weapon',
      'Weapon Multiplier',
      'Grappling Strike',
      'Sneak Attack',
      'Latch On',
    ];
    const uniqueManeuvers = Array.from(
      new Set([
        ...SPECIAL_MANEUVERS,
        ...allCombatStyles
          .flatMap((style) => style.maneuvers ?? [])
          .map((maneuver) => maneuver.name),
      ]),
    )
      .filter((name) => {
        return !/^(Weapon Mult|Sneak Attack|Ranged Sneak Attack) \d+$/.test(name);
      })
      .sort();
    const dManeuvers = performance.now() - s2;

    const s3 = performance.now();
    const weaponNames = Array.from(MONSTER_WEAPONS).sort();

    const sphereNames = allMysticSpheres
      .map((s) => s.name)
      .filter((name) => name !== 'Non-Sphere Spells')
      .sort();
    const dWeaponsSpheres = performance.now() - s3;

    res.json({
      spells: uniqueSpells,
      maneuvers: uniqueManeuvers,
      weapons: weaponNames,
      spheres: sphereNames,
    });

    if (showDetailedTiming) {
      const total = performance.now() - start;
      console.log(
        `[Timing] GET /api/reference took ${total.toFixed(2)}ms (Spells: ${dSpells.toFixed(2)}ms, Maneuvers: ${dManeuvers.toFixed(2)}ms, Weapons/Spheres: ${dWeaponsSpheres.toFixed(2)}ms)`,
      );
    }
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[API Error] Failed to fetch reference data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get the full list of monsters and groups
app.get('/api/monsters', (req, res) => {
  const start = performance.now();
  console.log('[API] GET /api/monsters - Fetching all monsters and groups');
  try {
    const db = getDb();
    res.json(db);
    if (showDetailedTiming) {
      console.log(`[Timing] GET /api/monsters took ${(performance.now() - start).toFixed(2)}ms`);
    }
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[API Error] Failed to fetch monsters:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save the entire database, trigger codegen, and run full validation
app.post('/api/save', (req, res) => {
  const start = performance.now();
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
    if (showDetailedTiming) {
      console.log(`[Timing] POST /api/save took ${(performance.now() - start).toFixed(2)}ms`);
    }
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[API Error] Failed to save database:', error);
    res.status(500).json({ error: error.message });
  }
});

// Live preview validation endpoint
app.post('/api/preview', (req, res) => {
  const start = performance.now();
  try {
    const { monster, sharedFreeformCode, groupName, group } = req.body;
    if (!monster || !monster.name) {
      console.warn('[API Warning] Preview requested without a valid monster');
      return res.status(400).json({ error: 'Monster data with name is required' });
    }
    console.log(
      `[API] POST /api/preview - Calculating live preview for monster: "${monster.name}"${groupName ? ` in group "${groupName}"` : ''}`,
    );
    const result = generatePreview(monster, group || sharedFreeformCode, groupName);
    res.json(result);
    if (showDetailedTiming) {
      console.log(
        `[Timing] POST /api/preview for "${monster.name}" took ${(performance.now() - start).toFixed(2)}ms`,
      );
    }
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[API Error] Preview calculation failed:', error);
    res.status(500).json({ error: error.message });
  }
});

export { app };

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, '127.0.0.1', () => {});
}
