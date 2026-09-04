import React, { useState, useEffect, useRef } from 'react';
import {
  DatabaseData,
  MonsterData,
  MonsterGroupData,
  ComputedStats,
  SaveRequestPayload,
  SidebarSelection,
} from './types/monster';
import { MonsterSidebar } from './components/MonsterSidebar';
import { MonsterForm } from './components/MonsterForm';
import { BookPreview } from './components/BookPreview';
import { ValidationBox } from './components/ValidationBox';
import './App.less';

const defaultRequiredProperties = {
  alignment: '',
  base_class: '',
  elite: false,
  creature_origin: '',
  creature_types: [],
  size: '',
  level: 0,
};

const generateId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : 'm_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

interface AppSettings {
  lastActiveSelection?: SidebarSelection;
}

function isValidSelection(selection: SidebarSelection, dbData: DatabaseData): boolean {
  if (!selection) {
    return false;
  }
  if (selection.type === 'monster') {
    return dbData.monsters.some((m) => m.id === selection.id);
  }
  if (selection.type === 'group') {
    return dbData.monsterGroups.some((g) => g.id === selection.id);
  }
  if (selection.type === 'group-monster') {
    const group = dbData.monsterGroups.find((g) => g.id === selection.groupId);
    return !!group && group.monsters.some((m) => m.id === selection.id);
  }
  return false;
}

function getUniqueMonsterName(baseName: string, db: DatabaseData): string {
  const existingNames = new Set<string>();
  for (const m of db.monsters || []) {
    existingNames.add(m.name);
  }
  for (const g of db.monsterGroups || []) {
    for (const m of g.monsters || []) {
      existingNames.add(m.name);
    }
  }

  let candidate = `${baseName} (Copy)`;
  let counter = 2;
  while (existingNames.has(candidate)) {
    candidate = `${baseName} (Copy ${counter})`;
    counter++;
  }
  return candidate;
}

export const App: React.FC = () => {
  const [db, setDb] = useState<DatabaseData>({ monsters: [], monsterGroups: [] });
  const dbRef = useRef<DatabaseData>(db);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingSavePayloadRef = useRef<SaveRequestPayload | null>(null);
  const saveQueueTailRef = useRef<Promise<unknown>>(Promise.resolve());

  useEffect(() => {
    dbRef.current = db;
  }, [db]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      if (pendingSavePayloadRef.current) {
        fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pendingSavePayloadRef.current),
        }).catch((err) => console.error('Failed to save on unmount:', err));
      }
    };
  }, []);

  const [referenceData, setReferenceData] = useState<{
    spells: string[];
    maneuvers: string[];
    weapons: string[];
    spheres: string[];
    alchemicalItems: string[];
    poisons: string[];
  }>({ spells: [], maneuvers: [], weapons: [], spheres: [], alchemicalItems: [], poisons: [] });
  const [activeSelection, setActiveSelection] = useState<SidebarSelection>(null);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState<boolean>(false);
  const lastSelectionRef = useRef<SidebarSelection>(null);
  const lastInputWasTextRef = useRef<boolean>(false);

  // Global listener to detect if the user's last interaction was in a text field
  useEffect(() => {
    const handleInteraction = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) {
        return;
      }

      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        const isText =
          target.tagName === 'TEXTAREA' ||
          (target.tagName === 'INPUT' &&
            ['text', 'number'].includes((target as HTMLInputElement).type));
        lastInputWasTextRef.current = isText;
      }
    };

    document.addEventListener('input', handleInteraction, true);
    document.addEventListener('change', handleInteraction, true);

    return () => {
      document.removeEventListener('input', handleInteraction, true);
      document.removeEventListener('change', handleInteraction, true);
    };
  }, []);

  const [previewStats, setPreviewStats] = useState<ComputedStats | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [guidelines, setGuidelines] = useState<string[]>([]);
  const warnings = React.useMemo(
    () => [...requirements, ...guidelines],
    [requirements, guidelines],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    message: string;
    onUndo: () => void;
  } | null>(null);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = setTimeout(() => {
      setToast(null);
    }, 8000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Fetch reference data on mount
  useEffect(() => {
    fetch('/api/reference')
      .then((res) => res.json())
      .then((data) => setReferenceData(data))
      .catch((err) => console.error('Failed to load reference data:', err));
  }, []);

  // Fetch initial database and settings on mount
  useEffect(() => {
    Promise.all([
      fetch('/api/monsters').then((res) => res.json()),
      fetch('/api/settings')
        .then((res) => res.json())
        .catch((err) => {
          console.warn('Failed to load settings, defaulting to empty:', err);
          return {};
        }),
    ])
      .then(([dbData, settingsData]: [DatabaseData, AppSettings]) => {
        setDb(dbData);

        let initialSelection: SidebarSelection = null;
        if (
          settingsData.lastActiveSelection &&
          isValidSelection(settingsData.lastActiveSelection, dbData)
        ) {
          initialSelection = settingsData.lastActiveSelection;
        } else if (dbData.monsters.length > 0) {
          initialSelection = {
            type: 'monster',
            id: dbData.monsters[0].id,
          };
        } else if (dbData.monsterGroups.length > 0) {
          initialSelection = {
            type: 'group',
            id: dbData.monsterGroups[0].id,
          };
        }

        setActiveSelection(initialSelection);
        setIsInitialLoadComplete(true);
      })
      .catch((err) => {
        setErrors([`Failed to load database/settings: ${err.message || err}`]);
      });
  }, []);

  // Save settings whenever activeSelection changes (after initial load)
  useEffect(() => {
    if (!isInitialLoadComplete) {
      return;
    }
    fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lastActiveSelection: activeSelection }),
    }).catch((err) => {
      console.error('Failed to save settings:', err);
    });
  }, [activeSelection, isInitialLoadComplete]);

  // Debounced preview calculation effect.
  // Design Decisions:
  // 1. Selection Changes: When switching between different monsters, we fetch preview stats instantly
  //    and clear the stale preview (`setPreviewStats(null)`) so there is no layout jump or visual lag.
  // 2. Text Input Changes (Typing): If editing name or freeform code, we apply a 500ms debounce delay.
  //    This avoids flooding the backend API on every single keystroke.
  // 3. Discrete Input Changes (Clicking): Toggling check-boxes or changing standard drop-downs
  //    uses a fast 50ms/leading-edge update because they don't produce rapid keystroke floods
  //    and should reflect visually in the book preview almost instantly.
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    let handler: NodeJS.Timeout | undefined;

    if (!activeSelection) {
      setPreviewStats(null);
      setErrors([]);
      setRequirements([]);
      setGuidelines([]);
      lastSelectionRef.current = null;
      return;
    }

    if (activeSelection.type === 'group') {
      // Group configurations do not have a single computed stats card
      setPreviewStats(null);
      setErrors([]);
      setRequirements([]);
      setGuidelines([]);
      lastSelectionRef.current = activeSelection;
      return;
    }

    let monsterData: MonsterData | undefined;
    let sharedFreeformCode: string | undefined;
    let groupObj: MonsterGroupData | undefined;

    if (activeSelection.type === 'monster') {
      monsterData = db.monsters.find((m) => m.id === activeSelection.id);
    } else if (activeSelection.type === 'group-monster') {
      const group = db.monsterGroups.find((g) => g.id === activeSelection.groupId);
      monsterData = group?.monsters.find((m) => m.id === activeSelection.id);
      sharedFreeformCode = group?.sharedFreeformCode;
      groupObj = group;
    }

    if (!monsterData) {
      setPreviewStats(null);
      lastSelectionRef.current = activeSelection;
      return;
    }

    // Check if user switched to a completely different monster
    const isSameMonster =
      lastSelectionRef.current &&
      lastSelectionRef.current.type === activeSelection.type &&
      lastSelectionRef.current.id === activeSelection.id &&
      (activeSelection.type !== 'group-monster' ||
        (lastSelectionRef.current.type === 'group-monster' &&
          lastSelectionRef.current.groupId === activeSelection.groupId));

    const selectionChanged = !isSameMonster;

    lastSelectionRef.current = activeSelection;

    const fetchPreview = () => {
      setLoading(true);
      fetch('/api/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          monster: monsterData,
          sharedFreeformCode,
          groupName:
            activeSelection.type === 'group-monster' ? groupObj?.name : undefined,
          group: groupObj ? { ...groupObj, monsters: [] } : undefined,
        }),
      })
        .then(async (res) => {
          if (!res.ok) {
            let errMsg = 'Preview server returned error status';
            try {
              const data = await res.json();
              if (data && data.error) {
                errMsg = data.error;
              }
            } catch {
              if (res.statusText) {
                errMsg = `${res.statusText} (${res.status})`;
              } else {
                errMsg = `Server error (${res.status})`;
              }
            }
            throw new Error(errMsg);
          }
          return res.json();
        })
        .then((result) => {
          if (!active) {
            return;
          }
          setErrors(result.errors || []);
          setRequirements(result.requirements || []);
          setGuidelines(result.guidelines || []);
          setPreviewStats(result.computedStats);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            return;
          }
          if (!active) {
            return;
          }
          setErrors([`Engine calculation failed: ${err.message || err}`]);
          setPreviewStats(null);
          setLoading(false);
        });
    };

    if (selectionChanged) {
      // Selection changed: fetch instantly
      setPreviewStats(null);
    }
    fetchPreview();

    return () => {
      active = false;
      controller.abort();
      if (handler) {
        clearTimeout(handler);
      }
    };
  }, [activeSelection, db]);

  const enqueueSave = (payload: SaveRequestPayload) => {
    const nextPromise = saveQueueTailRef.current
      .then(() => {
        return fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      })
      .then(async (res) => {
        if (!res.ok) {
          let errMsg = 'Save server returned error status';
          try {
            const data = await res.json();
            if (data && data.error) {
              errMsg = data.error;
            }
          } catch {
            if (res.statusText) {
              errMsg = `${res.statusText} (${res.status})`;
            } else {
              errMsg = `Server error (${res.status})`;
            }
          }
          throw new Error(errMsg);
        }
        return res.json();
      })
      .then((result) => {
        setIsSaving(false);
        if (!result.success) {
          console.error('Save failed:', result.error);
        } else {
          console.log('Compile-time validations:', result.validations);
        }
      })
      .catch((err) => {
        setIsSaving(false);
        console.error('Save failed:', err.message || err);
      });
    saveQueueTailRef.current = nextPromise;
  };

  // Database mutations
  const handleSaveDb = (payload: SaveRequestPayload, immediate = false) => {
    if (immediate) {
      // Flush any pending debounced save first before the immediate save
      if (saveTimeoutRef.current && pendingSavePayloadRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
        enqueueSave(pendingSavePayloadRef.current);
        pendingSavePayloadRef.current = null;
      }
      setIsSaving(true);
      enqueueSave(payload);
    } else {
      if (pendingSavePayloadRef.current) {
        // Monster update chaining
        if (payload.monster && pendingSavePayloadRef.current.monster) {
          const prevMonster = pendingSavePayloadRef.current.monster;
          if (payload.monster.data.id !== prevMonster.data.id) {
            // Flush pending save for previous monster
            enqueueSave(pendingSavePayloadRef.current);
            pendingSavePayloadRef.current = null;
          }
        }
        // Group update chaining
        if (payload.group && pendingSavePayloadRef.current?.group) {
          const prevGroup = pendingSavePayloadRef.current.group;
          if (payload.group.data.id !== prevGroup.data.id) {
            // Flush pending save for previous group
            enqueueSave(pendingSavePayloadRef.current);
            pendingSavePayloadRef.current = null;
          }
        }
      }

      pendingSavePayloadRef.current = payload;
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      setIsSaving(true);
      saveTimeoutRef.current = setTimeout(() => {
        saveTimeoutRef.current = null;
        if (pendingSavePayloadRef.current) {
          enqueueSave(pendingSavePayloadRef.current);
          pendingSavePayloadRef.current = null;
        }
      }, 1000);
    }
  };

  const handleSelect = (selection: SidebarSelection) => {
    if (saveTimeoutRef.current && pendingSavePayloadRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
      enqueueSave(pendingSavePayloadRef.current);
      pendingSavePayloadRef.current = null;
    }
    setActiveSelection(selection);
  };

  const handleUpdateMonster = (updated: MonsterData) => {
    const sortedCreatureTypes = updated.requiredProperties.creature_types
      ? [...updated.requiredProperties.creature_types].sort()
      : [];
    const monsterWithSortedTypes: MonsterData = {
      ...updated,
      requiredProperties: {
        ...updated.requiredProperties,
        creature_types: sortedCreatureTypes,
      },
    };

    let updatedDb: DatabaseData;
    if (activeSelection?.type === 'monster') {
      const activeMonsterId = activeSelection.id;
      updatedDb = {
        ...db,
        monsters: db.monsters.map((m) =>
          m.id === activeMonsterId ? monsterWithSortedTypes : m,
        ),
      };
      setDb(updatedDb);
      handleSaveDb(
        { monster: { data: monsterWithSortedTypes } },
        false,
      );
    } else if (activeSelection?.type === 'group-monster') {
      const activeMonsterId = activeSelection.id;
      const activeGroupId = activeSelection.groupId;
      updatedDb = {
        ...db,
        monsterGroups: db.monsterGroups.map((g) =>
          g.id === activeGroupId
            ? {
                ...g,
                monsters: g.monsters.map((m) =>
                  m.id === activeMonsterId ? monsterWithSortedTypes : m,
                ),
              }
            : g,
        ),
      };
      setDb(updatedDb);
      const updatedGroup = updatedDb.monsterGroups.find(
        (g) => g.id === activeGroupId,
      );
      if (updatedGroup) {
        handleSaveDb({ group: { data: updatedGroup } }, false);
      }
    }
  };

  const handleDuplicateMonster = () => {
    if (!activeMonster) {
      return;
    }
    const newName = getUniqueMonsterName(activeMonster.name, db);
    const duplicatedMonster: MonsterData = JSON.parse(JSON.stringify(activeMonster));
    duplicatedMonster.name = newName;
    duplicatedMonster.id = generateId();

    let updatedDb: DatabaseData;
    if (activeSelection?.type === 'group-monster') {
      const groupId = activeSelection.groupId;
      updatedDb = {
        ...db,
        monsterGroups: db.monsterGroups.map((g) =>
          g.id === groupId ? { ...g, monsters: [...g.monsters, duplicatedMonster] } : g,
        ),
      };
      setDb(updatedDb);
      setActiveSelection({
        type: 'group-monster',
        groupId,
        id: duplicatedMonster.id,
      });
      const updatedGroup = updatedDb.monsterGroups.find((g) => g.id === groupId);
      if (updatedGroup) {
        handleSaveDb({ group: { data: updatedGroup } }, true);
      }
    } else {
      updatedDb = {
        ...db,
        monsters: [...db.monsters, duplicatedMonster],
      };
      setDb(updatedDb);
      setActiveSelection({ type: 'monster', id: duplicatedMonster.id });
      handleSaveDb({ monster: { data: duplicatedMonster } }, true);
    }
  };

  const handleUpdateGroup = (updated: MonsterGroupData) => {
    if (activeSelection?.type !== 'group') {
      return;
    }
    const activeGroupId = activeSelection.id;
    const updatedDb = {
      ...db,
      monsterGroups: db.monsterGroups.map((g) =>
        g.id === activeGroupId ? updated : g,
      ),
    };
    setDb(updatedDb);
    handleSaveDb({ group: { data: updated } }, false);
  };

  const handleAddMonster = (folder?: unknown) => {
    const name = `New Monster ${db.monsters.length + 1}`;
    const folderStr = typeof folder === 'string' ? folder : undefined;
    const newMonster: MonsterData = {
      id: generateId(),
      name,
      folder: folderStr,
      requiredProperties: { ...defaultRequiredProperties },
      freeformCode: '',
    };
    const updatedDb = {
      ...db,
      monsters: [...db.monsters, newMonster],
    };
    setDb(updatedDb);
    setActiveSelection({ type: 'monster', id: newMonster.id });
    handleSaveDb({ monster: { data: newMonster } }, true);
  };

  const handleAddGroup = (folder?: unknown) => {
    const name = `New Group ${db.monsterGroups.length + 1}`;
    const folderStr = typeof folder === 'string' ? folder : undefined;
    const newGroup: MonsterGroupData = {
      id: generateId(),
      name,
      folder: folderStr,
      hasArt: false,
      sharedFreeformCode: '',
      monsters: [],
    };
    const updatedDb = {
      ...db,
      monsterGroups: [...db.monsterGroups, newGroup],
    };
    setDb(updatedDb);
    setActiveSelection({ type: 'group', id: newGroup.id });
    handleSaveDb({ group: { data: newGroup } }, true);
  };

  const handleAddMonsterToGroup = (groupId: string) => {
    const group = db.monsterGroups.find((g) => g.id === groupId);
    if (!group) {
      return;
    }
    const name = `New Member ${group.monsters.length + 1}`;
    const newMonster: MonsterData = {
      id: generateId(),
      name,
      requiredProperties: { ...defaultRequiredProperties },
      freeformCode: '',
    };
    const updatedDb = {
      ...db,
      monsterGroups: db.monsterGroups.map((g) =>
        g.id === groupId ? { ...g, monsters: [...g.monsters, newMonster] } : g,
      ),
    };
    setDb(updatedDb);
    setActiveSelection({ type: 'group-monster', groupId, id: newMonster.id });
    const updatedGroup = updatedDb.monsterGroups.find((g) => g.id === groupId);
    if (updatedGroup) {
      handleSaveDb({ group: { data: updatedGroup } }, true);
    }
  };


  const handleDeleteMonster = (id: string) => {
    const monsterToDelete = db.monsters.find((m) => m.id === id);
    if (!monsterToDelete) {
      return;
    }
    const originalIndex = db.monsters.findIndex((m) => m.id === id);

    const updatedDb = {
      ...db,
      monsters: db.monsters.filter((m) => m.id !== id),
    };
    setDb(updatedDb);
    if (activeSelection?.type === 'monster' && activeSelection.id === id) {
      setActiveSelection(null);
    }
    handleSaveDb({ deleteMonster: id }, true);

    setToast({
      message: `Deleted individual monster "${monsterToDelete.name}"`,
      onUndo: () => {
        setDb((prevDb) => {
          const newMonsters = [...prevDb.monsters];
          newMonsters.splice(originalIndex, 0, monsterToDelete);
          const restoredDb = { ...prevDb, monsters: newMonsters };
          handleSaveDb({ monster: { data: monsterToDelete } }, true);
          return restoredDb;
        });
        setActiveSelection({ type: 'monster', id: monsterToDelete.id });
        setToast(null);
      },
    });
  };

  const handleDeleteGroup = (id: string) => {
    const groupToDelete = db.monsterGroups.find((g) => g.id === id);
    if (!groupToDelete) {
      return;
    }
    const originalIndex = db.monsterGroups.findIndex((g) => g.id === id);

    const updatedDb = {
      ...db,
      monsterGroups: db.monsterGroups.filter((g) => g.id !== id),
    };
    setDb(updatedDb);
    if (
      (activeSelection?.type === 'group' && activeSelection.id === id) ||
      (activeSelection?.type === 'group-monster' && activeSelection.groupId === id)
    ) {
      setActiveSelection(null);
    }
    handleSaveDb({ deleteGroup: id }, true);

    setToast({
      message: `Deleted group "${groupToDelete.name}" and all its monsters`,
      onUndo: () => {
        setDb((prevDb) => {
          const newGroups = [...prevDb.monsterGroups];
          newGroups.splice(originalIndex, 0, groupToDelete);
          const restoredDb = { ...prevDb, monsterGroups: newGroups };
          handleSaveDb({ group: { data: groupToDelete } }, true);
          return restoredDb;
        });
        setActiveSelection({ type: 'group', id: groupToDelete.id });
        setToast(null);
      },
    });
  };

  const handleDeleteMonsterFromGroup = (groupId: string, id: string) => {
    const group = db.monsterGroups.find((g) => g.id === groupId);
    if (!group) {
      return;
    }
    const monsterToDelete = group.monsters.find((m) => m.id === id);
    if (!monsterToDelete) {
      return;
    }
    const originalIndex = group.monsters.findIndex((m) => m.id === id);

    const updatedDb = {
      ...db,
      monsterGroups: db.monsterGroups.map((g) =>
        g.id === groupId ? { ...g, monsters: g.monsters.filter((m) => m.id !== id) } : g,
      ),
    };
    setDb(updatedDb);
    if (
      activeSelection?.type === 'group-monster' &&
      activeSelection.groupId === groupId &&
      activeSelection.id === id
    ) {
      setActiveSelection(null);
    }
    const updatedGroup = updatedDb.monsterGroups.find((g) => g.id === groupId);
    if (updatedGroup) {
      handleSaveDb({ group: { data: updatedGroup } }, true);
    }

    setToast({
      message: `Deleted monster "${monsterToDelete.name}" from group "${group.name}"`,
      onUndo: () => {
        setDb((prevDb) => {
          let restoredGroup: MonsterGroupData | undefined;
          const restoredGroups = prevDb.monsterGroups.map((g) => {
            if (g.id === groupId) {
              const newMonsters = [...g.monsters];
              newMonsters.splice(originalIndex, 0, monsterToDelete);
              restoredGroup = { ...g, monsters: newMonsters };
              return restoredGroup;
            }
            return g;
          });
          const restoredDb = { ...prevDb, monsterGroups: restoredGroups };
          if (restoredGroup) {
            handleSaveDb({ group: { data: restoredGroup } }, true);
          }
          return restoredDb;
        });
        setActiveSelection({ type: 'group-monster', groupId, id: monsterToDelete.id });
        setToast(null);
      },
    });
  };

  const handleMoveToFolder = (type: 'monster' | 'group', id: string, targetFolder?: string) => {
    let updatedDb: DatabaseData;
    if (type === 'monster') {
      updatedDb = {
        ...db,
        monsters: db.monsters.map((m) =>
          m.id === id ? { ...m, folder: targetFolder || undefined } : m,
        ),
      };
      setDb(updatedDb);
      const updatedMonster = updatedDb.monsters.find((m) => m.id === id);
      if (updatedMonster) {
        handleSaveDb({ monster: { data: updatedMonster } }, true);
      }
    } else {
      updatedDb = {
        ...db,
        monsterGroups: db.monsterGroups.map((g) =>
          g.id === id ? { ...g, folder: targetFolder || undefined } : g,
        ),
      };
      setDb(updatedDb);
      const updatedGroup = updatedDb.monsterGroups.find((g) => g.id === id);
      if (updatedGroup) {
        handleSaveDb({ group: { data: updatedGroup } }, true);
      }
    }
  };

  const handleCreateFolder = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }
    if (existingFolders.includes(trimmed)) {
      alert(`A folder named "${trimmed}" already exists.`);
      return;
    }
    const updatedDb = {
      ...db,
      folders: [...(db.folders || []), trimmed],
    };
    setDb(updatedDb);
    handleSaveDb({ folders: updatedDb.folders }, true);
  };

  const handleRenameFolder = (oldName: string, newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed || trimmed === oldName) {
      return;
    }
    if (existingFolders.includes(trimmed)) {
      alert(`A folder named "${trimmed}" already exists.`);
      return;
    }
    const updatedDb = {
      ...db,
      folders: (db.folders || []).map((f) => (f === oldName ? trimmed : f)),
      monsters: db.monsters.map((m) => (m.folder === oldName ? { ...m, folder: trimmed } : m)),
      monsterGroups: db.monsterGroups.map((g) =>
        g.folder === oldName ? { ...g, folder: trimmed } : g,
      ),
    };
    setDb(updatedDb);
    handleSaveDb({ renameFolder: { oldName, newName } }, true);
  };

  const handleDeleteFolder = (folderName: string) => {
    if (
      !confirm(
        `Delete folder "${folderName}"? All monsters and groups inside it will be moved to individual/ungrouped lists.`,
      )
    ) {
      return;
    }
    const updatedDb = {
      ...db,
      folders: (db.folders || []).filter((f) => f !== folderName),
      monsters: db.monsters.map((m) => (m.folder === folderName ? { ...m, folder: undefined } : m)),
      monsterGroups: db.monsterGroups.map((g) =>
        g.folder === folderName ? { ...g, folder: undefined } : g,
      ),
    };
    setDb(updatedDb);
    handleSaveDb({ deleteFolder: folderName }, true);
  };

  // Find active editor content
  const activeMonster =
    activeSelection?.type === 'monster'
      ? db.monsters.find((m) => m.id === activeSelection.id)
      : activeSelection?.type === 'group-monster'
        ? db.monsterGroups
            .find((g) => g.id === activeSelection.groupId)
            ?.monsters.find((m) => m.id === activeSelection.id)
        : undefined;

  const activeGroup =
    activeSelection?.type === 'group'
      ? db.monsterGroups.find((g) => g.id === activeSelection.id)
      : undefined;

  // Filter global warnings/errors (not displayed inline on structured fields)
  const isInline = (str: string) => {
    const s = str.toLowerCase();
    return s.includes('name') || s.includes('alignment');
  };
  const globalErrors = errors.filter((e) => !isInline(e));
  const globalRequirements = requirements.filter((r) => !isInline(r));
  const globalGuidelines = guidelines.filter((g) => !isInline(g));

  const existingFolders = Array.from(
    new Set([
      ...(db.folders || []),
      ...(db.monsters || []).map((m) => m.folder),
      ...(db.monsterGroups || []).map((g) => g.folder),
    ]),
  )
    .filter(Boolean)
    .sort() as string[];

  return (
    <div className="app-container">
      <MonsterSidebar
        db={db}
        activeSelection={activeSelection}
        onSelect={handleSelect}
        onAddMonster={handleAddMonster}
        onAddGroup={handleAddGroup}
        onAddMonsterToGroup={handleAddMonsterToGroup}
        onDeleteMonster={handleDeleteMonster}
        onDeleteGroup={handleDeleteGroup}
        onDeleteMonsterFromGroup={handleDeleteMonsterFromGroup}
        onMoveToFolder={handleMoveToFolder}
        onCreateFolder={handleCreateFolder}
        onRenameFolder={handleRenameFolder}
        onDeleteFolder={handleDeleteFolder}
        isSaving={isSaving}
      />

      <main className="workspace">
        {/* Editor Form */}
        <section className="editor-panel">
          <div className="editor-header">
            <h3>
              {activeSelection
                ? activeSelection.type === 'group'
                  ? `Group Settings: ${activeGroup?.name || ''}`
                  : `Editing Monster: ${activeMonster?.name || ''}`
                : 'Select or Create a Monster'}
            </h3>
            {loading && (
              <div className="loading-indicator">
                <div className="spinner" /> Calculating...
              </div>
            )}
          </div>

          {activeSelection ? (
            <>
              <MonsterForm
                mode={activeSelection.type === 'group' ? 'group' : 'monster'}
                isGroupMonster={activeSelection.type === 'group-monster'}
                monsterData={activeMonster}
                groupData={activeGroup}
                onChangeMonster={handleUpdateMonster}
                onChangeGroup={handleUpdateGroup}
                onDuplicateMonster={handleDuplicateMonster}
                errors={errors}
                warnings={warnings}
                referenceData={referenceData}
                folders={existingFolders}
              />
              {activeSelection.type !== 'group' && (
                <div
                  style={{
                    padding: '0 25px 25px 25px',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '20px',
                  }}
                >
                  <ValidationBox
                    errors={globalErrors}
                    requirements={globalRequirements}
                    guidelines={globalGuidelines}
                  />
                </div>
              )}
            </>
          ) : (
            <div style={{ padding: '40px', color: 'var(--text-muted)', textAlign: 'center' }}>
              Create a new monster or group from the sidebar to begin editing.
            </div>
          )}
        </section>

        {/* Book Preview */}
        <section className="preview-panel">
          <div className="preview-header">
            <h3>Book Preview</h3>
          </div>
          <div className="preview-scroll">
            {activeSelection?.type === 'group' ? (
              <div
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.95rem',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  marginTop: '40px',
                }}
              >
                Select a monster inside the group to preview its statistics.
              </div>
            ) : (
              <BookPreview stats={previewStats} loading={loading} />
            )}
          </div>
        </section>
      </main>
      {toast && (
        <div className="undo-toast" data-testid="undo-toast">
          <span className="undo-toast-message">{toast.message}</span>
          <button className="undo-toast-btn" onClick={toast.onUndo} data-testid="undo-btn">
            Undo
          </button>
          <button
            className="undo-toast-close"
            onClick={() => setToast(null)}
            data-testid="undo-close-btn"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
