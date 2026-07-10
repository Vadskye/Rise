import React, { useState, useEffect, useRef } from 'react';
import { DatabaseData, MonsterData, MonsterGroupData, ComputedStats } from './types/monster';
import { MonsterSidebar, SidebarSelection } from './components/MonsterSidebar';
import { MonsterForm } from './components/MonsterForm';
import { BookPreview } from './components/BookPreview';
import { ValidationBox } from './components/ValidationBox';
import { getChangedPaths } from './utils/compare';
import './App.less';

const defaultRequiredProperties = {
  alignment: 'neutral',
  base_class: 'warrior',
  elite: false,
  creature_origin: 'natural',
  creature_type: 'beast',
  size: 'medium',
  level: 1,
};

const getValueAtPath = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
};

const DISCRETE_SELECT_FIELDS = new Set([
  'alignment',
  'base_class',
  'creature_origin',
  'creature_type',
  'size',
  'equippedArmor',
  'type',
  'usageTime',
]);

export const App: React.FC = () => {
  const [db, setDb] = useState<DatabaseData>({ monsters: [], monsterGroups: [] });
  const [referenceData, setReferenceData] = useState<{
    spells: string[];
    maneuvers: string[];
    weapons: string[];
    spheres: string[];
  }>({ spells: [], maneuvers: [], weapons: [], spheres: [] });
  const [activeSelection, setActiveSelection] = useState<SidebarSelection>(null);
  const lastSelectionRef = useRef<SidebarSelection>(null);
  const prevMonsterDataRef = useRef<MonsterData | null>(null);
  const lastFetchTimeRef = useRef<number>(0);

  const [previewStats, setPreviewStats] = useState<ComputedStats | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Fetch reference data on mount
  useEffect(() => {
    fetch('/api/reference')
      .then((res) => res.json())
      .then((data) => setReferenceData(data))
      .catch((err) => console.error('Failed to load reference data:', err));
  }, []);

  // Fetch initial database on mount
  useEffect(() => {
    fetch('/api/monsters')
      .then((res) => res.json())
      .then((data: DatabaseData) => {
        setDb(data);
        // Select first item if available
        if (data.monsters.length > 0) {
          setActiveSelection({ type: 'monster', name: data.monsters[0].name });
        } else if (data.monsterGroups.length > 0) {
          setActiveSelection({ type: 'group', name: data.monsterGroups[0].name });
        }
      })
      .catch((err) => {
        setErrors([`Failed to load database: ${err.message || err}`]);
      });
  }, []);

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
      setWarnings([]);
      lastSelectionRef.current = null;
      prevMonsterDataRef.current = null;
      return;
    }

    if (activeSelection.type === 'group') {
      // Group configurations do not have a single computed stats card
      setPreviewStats(null);
      setErrors([]);
      setWarnings([]);
      lastSelectionRef.current = activeSelection;
      prevMonsterDataRef.current = null;
      return;
    }

    let monsterData: MonsterData | undefined;
    let sharedFreeformCode: string | undefined;

    if (activeSelection.type === 'monster') {
      monsterData = db.monsters.find((m) => m.name === activeSelection.name);
    } else if (activeSelection.type === 'group-monster') {
      const group = db.monsterGroups.find((g) => g.name === activeSelection.groupName);
      monsterData = group?.monsters.find((m) => m.name === activeSelection.name);
      sharedFreeformCode = group?.sharedFreeformCode;
    }

    if (!monsterData) {
      setPreviewStats(null);
      lastSelectionRef.current = activeSelection;
      prevMonsterDataRef.current = null;
      return;
    }

    // Check if user switched to a completely different monster
    const selectionChanged =
      !lastSelectionRef.current ||
      lastSelectionRef.current.type !== activeSelection.type ||
      lastSelectionRef.current.name !== activeSelection.name ||
      (activeSelection.type === 'group-monster' &&
        lastSelectionRef.current.type === 'group-monster' &&
        lastSelectionRef.current.groupName !== activeSelection.groupName);

    lastSelectionRef.current = activeSelection;

    // Check if the change was to a text field
    let isTextFieldChange = false;
    if (!selectionChanged && prevMonsterDataRef.current && monsterData) {
      const changedPaths = getChangedPaths(prevMonsterDataRef.current, monsterData);
      isTextFieldChange = changedPaths.length > 0 && changedPaths.every((path) => {
        const val = getValueAtPath(monsterData, path);
        if (typeof val !== 'string') return false;
        const lastKey = path.split('.').pop() || '';
        return !DISCRETE_SELECT_FIELDS.has(lastKey);
      });
    }

    prevMonsterDataRef.current = monsterData || null;

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
            activeSelection.type === 'group-monster' ? activeSelection.groupName : undefined,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Preview server returned error status');
          return res.json();
        })
        .then((result) => {
          if (!active) return;
          setErrors(result.errors || []);
          setWarnings(result.warnings || []);
          setPreviewStats(result.computedStats);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name === 'AbortError') return;
          if (!active) return;
          setErrors([`Engine calculation failed: ${err.message || err}`]);
          setPreviewStats(null);
          setLoading(false);
        });
    };

    if (selectionChanged) {
      // Selection changed: fetch instantly
      setPreviewStats(null);
      fetchPreview();
      lastFetchTimeRef.current = Date.now();
    } else {
      // Statistics changed while selecting the same monster: leading-edge debounce
      const now = Date.now();
      const timeSinceLastFetch = now - lastFetchTimeRef.current;

      if (!isTextFieldChange && timeSinceLastFetch > 300) {
        fetchPreview();
        lastFetchTimeRef.current = now;
      } else {
        const debounceDelay = isTextFieldChange ? 500 : 50;
        handler = setTimeout(() => {
          fetchPreview();
          lastFetchTimeRef.current = Date.now();
        }, debounceDelay);
      }
    }

    return () => {
      active = false;
      controller.abort();
      if (handler) {
        clearTimeout(handler);
      }
    };
  }, [activeSelection, db]);

  // Database mutations
  const handleSaveDb = (updatedDb = db) => {
    setIsSaving(true);
    fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDb),
    })
      .then((res) => res.json())
      .then((result) => {
        setIsSaving(false);
        if (!result.success) {
          alert(`Save failed: ${result.error}`);
        } else {
          // If save was successful, we might receive compile-time validations for all monsters
          console.log('Compile-time validations:', result.validations);
        }
      })
      .catch((err) => {
        setIsSaving(false);
        alert(`Save failed: ${err.message || err}`);
      });
  };

  const handleUpdateMonster = (updated: MonsterData) => {
    let updatedDb: DatabaseData;
    if (activeSelection?.type === 'monster') {
      updatedDb = {
        ...db,
        monsters: db.monsters.map((m) => (m.name === activeSelection.name ? updated : m)),
      };
      // If name changed, update the active selection pointer as well
      if (updated.name !== activeSelection.name) {
        setActiveSelection({ type: 'monster', name: updated.name });
      }
    } else if (activeSelection?.type === 'group-monster') {
      updatedDb = {
        ...db,
        monsterGroups: db.monsterGroups.map((g) =>
          g.name === activeSelection.groupName
            ? {
              ...g,
              monsters: g.monsters.map((m) => (m.name === activeSelection.name ? updated : m)),
            }
            : g,
        ),
      };
      if (updated.name !== activeSelection.name) {
        setActiveSelection({
          type: 'group-monster',
          groupName: activeSelection.groupName,
          name: updated.name,
        });
      }
    } else {
      return;
    }
    setDb(updatedDb);
  };

  const handleUpdateGroup = (updated: MonsterGroupData) => {
    if (activeSelection?.type !== 'group') return;
    const updatedDb = {
      ...db,
      monsterGroups: db.monsterGroups.map((g) => (g.name === activeSelection.name ? updated : g)),
    };
    setDb(updatedDb);
    if (updated.name !== activeSelection.name) {
      setActiveSelection({ type: 'group', name: updated.name });
    }
  };

  const handleAddMonster = () => {
    const name = `New Monster ${db.monsters.length + 1}`;
    const newMonster: MonsterData = {
      name,
      requiredProperties: { ...defaultRequiredProperties },
      freeformCode: '',
    };
    const updatedDb = {
      ...db,
      monsters: [...db.monsters, newMonster],
    };
    setDb(updatedDb);
    setActiveSelection({ type: 'monster', name });
    handleSaveDb(updatedDb);
  };

  const handleAddGroup = () => {
    const name = `New Group ${db.monsterGroups.length + 1}`;
    const newGroup: MonsterGroupData = {
      name,
      hasArt: false,
      sharedFreeformCode: '',
      monsters: [],
    };
    const updatedDb = {
      ...db,
      monsterGroups: [...db.monsterGroups, newGroup],
    };
    setDb(updatedDb);
    setActiveSelection({ type: 'group', name });
    handleSaveDb(updatedDb);
  };

  const handleAddMonsterToGroup = (groupName: string) => {
    const group = db.monsterGroups.find((g) => g.name === groupName);
    if (!group) return;
    const name = `New Member ${group.monsters.length + 1}`;
    const newMonster: MonsterData = {
      name,
      requiredProperties: { ...defaultRequiredProperties },
      freeformCode: '',
    };
    const updatedDb = {
      ...db,
      monsterGroups: db.monsterGroups.map((g) =>
        g.name === groupName ? { ...g, monsters: [...g.monsters, newMonster] } : g,
      ),
    };
    setDb(updatedDb);
    setActiveSelection({ type: 'group-monster', groupName, name });
    handleSaveDb(updatedDb);
  };

  const handleDeleteMonster = (name: string) => {
    const updatedDb = {
      ...db,
      monsters: db.monsters.filter((m) => m.name !== name),
    };
    setDb(updatedDb);
    if (activeSelection?.type === 'monster' && activeSelection.name === name) {
      setActiveSelection(null);
    }
    handleSaveDb(updatedDb);
  };

  const handleDeleteGroup = (name: string) => {
    const updatedDb = {
      ...db,
      monsterGroups: db.monsterGroups.filter((g) => g.name !== name),
    };
    setDb(updatedDb);
    if (
      (activeSelection?.type === 'group' && activeSelection.name === name) ||
      (activeSelection?.type === 'group-monster' && activeSelection.groupName === name)
    ) {
      setActiveSelection(null);
    }
    handleSaveDb(updatedDb);
  };

  const handleDeleteMonsterFromGroup = (groupName: string, name: string) => {
    const updatedDb = {
      ...db,
      monsterGroups: db.monsterGroups.map((g) =>
        g.name === groupName ? { ...g, monsters: g.monsters.filter((m) => m.name !== name) } : g,
      ),
    };
    setDb(updatedDb);
    if (
      activeSelection?.type === 'group-monster' &&
      activeSelection.groupName === groupName &&
      activeSelection.name === name
    ) {
      setActiveSelection(null);
    }
    handleSaveDb(updatedDb);
  };

  // Find active editor content
  const activeMonster =
    activeSelection?.type === 'monster'
      ? db.monsters.find((m) => m.name === activeSelection.name)
      : activeSelection?.type === 'group-monster'
        ? db.monsterGroups
          .find((g) => g.name === activeSelection.groupName)
          ?.monsters.find((m) => m.name === activeSelection.name)
        : undefined;

  const activeGroup =
    activeSelection?.type === 'group'
      ? db.monsterGroups.find((g) => g.name === activeSelection.name)
      : undefined;

  // Filter global warnings/errors (not displayed inline on structured fields)
  const isInline = (str: string) => {
    const s = str.toLowerCase();
    return s.includes('name') || s.includes('alignment');
  };
  const globalErrors = errors.filter((e) => !isInline(e));
  const globalWarnings = warnings.filter((w) => !isInline(w));

  return (
    <div className="app-container">
      <MonsterSidebar
        db={db}
        activeSelection={activeSelection}
        onSelect={setActiveSelection}
        onAddMonster={handleAddMonster}
        onAddGroup={handleAddGroup}
        onAddMonsterToGroup={handleAddMonsterToGroup}
        onDeleteMonster={handleDeleteMonster}
        onDeleteGroup={handleDeleteGroup}
        onDeleteMonsterFromGroup={handleDeleteMonsterFromGroup}
        onSaveDb={() => handleSaveDb()}
        isSaving={isSaving}
      />

      <main className="workspace">
        {/* Editor Form */}
        <section className="editor-panel">
          <div className="editor-header">
            <h3>
              {activeSelection
                ? activeSelection.type === 'group'
                  ? `Group Settings: ${activeSelection.name}`
                  : `Editing Monster: ${activeSelection.name}`
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
                monsterData={activeMonster}
                groupData={activeGroup}
                onChangeMonster={handleUpdateMonster}
                onChangeGroup={handleUpdateGroup}
                errors={errors}
                warnings={warnings}
                referenceData={referenceData}
              />
              {activeSelection.type !== 'group' && (
                <div
                  style={{
                    padding: '0 25px 25px 25px',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '20px',
                  }}
                >
                  <ValidationBox errors={globalErrors} warnings={globalWarnings} />
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
    </div>
  );
};
