import express from 'express';
import { generatePreview } from './preview';
import { DatabaseData, MonsterData, MonsterGroupData } from './codegen';
import { getDb, saveAndValidateAll } from './db';
import { allMysticSpheres } from '@src/abilities/mystic_spheres';
import { allCombatStyles } from '@src/abilities/combat_styles';
import { MONSTER_WEAPONS } from '@src/monsters/weapons';
import { showDetailedTiming } from './timing';
import { getSettings, saveSettings } from './settings';
import { alchemicalItems } from '@src/equipment/data/consumables/alchemical_items';
import { getPoisonNames } from '@src/equipment/poison';

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
      'Throw Item',
      'Poisonous Strike',
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

    const alchemicalItemNames = Array.from(
      new Set(alchemicalItems().map((tool) => tool.item.name)),
    ).sort();

    const poisonNames = getPoisonNames();

    const dWeaponsSpheres = performance.now() - s3;

    res.json({
      spells: uniqueSpells,
      maneuvers: uniqueManeuvers,
      weapons: weaponNames,
      spheres: sphereNames,
      alchemicalItems: alchemicalItemNames,
      poisons: poisonNames,
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

interface SaveRequestPayload {
  monster?: {
    data: MonsterData;
    oldName?: string;
  };
  group?: {
    data: MonsterGroupData;
    oldName?: string;
  };
  deleteMonster?: string;
  deleteGroup?: string;
  folders?: string[];
  renameFolder?: {
    oldName: string;
    newName: string;
  };
  deleteFolder?: string;
}

const isFullDb = (body: any): body is DatabaseData => {
  return body && (Array.isArray(body.monsters) || Array.isArray(body.monsterGroups));
};

// Save the database (supporting full or incremental updates), trigger codegen, and run validation
app.post('/api/save', (req, res) => {
  const start = performance.now();
  console.log('[API] POST /api/save - Saving database');
  try {
    let db = getDb();
    const payload = req.body;

    if (isFullDb(payload)) {
      console.log(`[API] Saving database with full DB format.`);
      db = payload;
    } else {
      console.log(`[API] Processing incremental save.`);
      // 1. Monster Upsert
      if (payload.monster) {
        const { data, oldName } = payload.monster;
        const targetName = oldName || data.name;
        db.monsters = db.monsters || [];
        const index = db.monsters.findIndex((m) => m.name === targetName);
        if (index !== -1) {
          db.monsters[index] = data;
        } else {
          db.monsters.push(data);
        }
      }

      // 2. Monster Delete
      if (payload.deleteMonster) {
        db.monsters = (db.monsters || []).filter((m) => m.name !== payload.deleteMonster);
      }

      // 3. Group Upsert
      if (payload.group) {
        const { data, oldName } = payload.group;
        const targetName = oldName || data.name;
        db.monsterGroups = db.monsterGroups || [];
        const index = db.monsterGroups.findIndex((g) => g.name === targetName);
        if (index !== -1) {
          db.monsterGroups[index] = data;
        } else {
          db.monsterGroups.push(data);
        }
      }

      // 4. Group Delete
      if (payload.deleteGroup) {
        db.monsterGroups = (db.monsterGroups || []).filter((g) => g.name !== payload.deleteGroup);
      }

      // 5. Folders List Update
      if (payload.folders) {
        db.folders = payload.folders;
      }

      // 6. Rename Folder
      if (payload.renameFolder) {
        const { oldName, newName } = payload.renameFolder;
        db.folders = (db.folders || []).map((f) => (f === oldName ? newName : f));
        db.monsters = (db.monsters || []).map((m) =>
          m.folder === oldName ? { ...m, folder: newName } : m,
        );
        db.monsterGroups = (db.monsterGroups || []).map((g) =>
          g.folder === oldName ? { ...g, folder: newName } : g,
        );
      }

      // 7. Delete Folder
      if (payload.deleteFolder) {
        const folderName = payload.deleteFolder;
        db.folders = (db.folders || []).filter((f) => f !== folderName);
        db.monsters = (db.monsters || []).map((m) =>
          m.folder === folderName ? { ...m, folder: undefined } : m,
        );
        db.monsterGroups = (db.monsterGroups || []).map((g) =>
          g.folder === folderName ? { ...g, folder: undefined } : g,
        );
      }
    }

    const monsterCount = db.monsters?.length || 0;
    const groupCount = db.monsterGroups?.length || 0;
    console.log(
      `[API] Merged database now has ${monsterCount} individual monsters and ${groupCount} groups.`,
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

// Fetch application settings (such as last active selection)
app.get('/api/settings', (req, res) => {
  const start = performance.now();
  console.log('[API] GET /api/settings - Fetching app settings');
  try {
    const settings = getSettings();
    res.json(settings);
    if (showDetailedTiming) {
      console.log(`[Timing] GET /api/settings took ${(performance.now() - start).toFixed(2)}ms`);
    }
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[API Error] Failed to fetch settings:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save application settings
app.post('/api/settings', (req, res) => {
  const start = performance.now();
  console.log('[API] POST /api/settings - Saving app settings');
  try {
    saveSettings(req.body);
    res.json({ success: true });
    if (showDetailedTiming) {
      console.log(`[Timing] POST /api/settings took ${(performance.now() - start).toFixed(2)}ms`);
    }
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[API Error] Failed to save settings:', error);
    res.status(500).json({ error: error.message });
  }
});

export { app };

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, '127.0.0.1', () => {});
}
