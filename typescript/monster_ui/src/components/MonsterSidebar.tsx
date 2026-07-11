import React from 'react';
import { DatabaseData } from '../types/monster';

export type SidebarSelection =
  | { type: 'monster'; name: string }
  | { type: 'group'; name: string }
  | { type: 'group-monster'; groupName: string; name: string }
  | null;

interface MonsterSidebarProps {
  db: DatabaseData;
  activeSelection: SidebarSelection;
  onSelect: (selection: SidebarSelection) => void;
  onAddMonster: () => void;
  onAddGroup: () => void;
  onAddMonsterToGroup: (groupName: string) => void;
  onDeleteMonster: (name: string) => void;
  onDeleteGroup: (name: string) => void;
  onDeleteMonsterFromGroup: (groupName: string, name: string) => void;
  onSaveDb: () => void;
  isSaving: boolean;
}

export const MonsterSidebar: React.FC<MonsterSidebarProps> = ({
  db,
  activeSelection,
  onSelect,
  onAddMonster,
  onAddGroup,
  onAddMonsterToGroup,
  onDeleteMonster,
  onDeleteGroup,
  onDeleteMonsterFromGroup,
  onSaveDb,
  isSaving,
}) => {
  const isSelected = (selection: SidebarSelection) => {
    if (!activeSelection || !selection) {
      return false;
    }
    if (activeSelection.type !== selection.type) {
      return false;
    }
    if (activeSelection.type === 'monster' && selection.type === 'monster') {
      return activeSelection.name === selection.name;
    }
    if (activeSelection.type === 'group' && selection.type === 'group') {
      return activeSelection.name === selection.name;
    }
    if (activeSelection.type === 'group-monster' && selection.type === 'group-monster') {
      return (
        activeSelection.groupName === selection.groupName && activeSelection.name === selection.name
      );
    }
    return false;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>👾 Creator</h2>
        <button
          className="save-db-btn"
          data-testid="save-db-btn"
          onClick={onSaveDb}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save DB'}
        </button>
      </div>

      <div className="sidebar-content">
        {/* Individual Monsters */}
        <div className="section-title">Individual Monsters</div>
        {db.monsters.map((monster) => (
          <div
            key={monster.name}
            className={`list-item ${isSelected({ type: 'monster', name: monster.name }) ? 'active' : ''}`}
            onClick={() => onSelect({ type: 'monster', name: monster.name })}
          >
            <span className="item-name">📄 {monster.name}</span>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`Delete individual monster "${monster.name}"?`)) {
                  onDeleteMonster(monster.name);
                }
              }}
            >
              ❌
            </button>
          </div>
        ))}
        {db.monsters.length === 0 && (
          <div style={{ padding: '8px 12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            No individual monsters.
          </div>
        )}

        {/* Monster Groups */}
        <div className="section-title">Monster Groups</div>
        {db.monsterGroups.map((group) => {
          const isGroupSelected = isSelected({ type: 'group', name: group.name });
          return (
            <div key={group.name} className="group-container">
              <div
                className={`group-header ${isGroupSelected ? 'active' : ''}`}
                onClick={() => onSelect({ type: 'group', name: group.name })}
              >
                <span className="group-title">📁 {group.name}</span>
                <span className="group-actions">
                  <button
                    title="Add monster to group"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddMonsterToGroup(group.name);
                    }}
                  >
                    ➕
                  </button>
                  <button
                    className="delete"
                    title="Delete group"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete group "${group.name}" and all its monsters?`)) {
                        onDeleteGroup(group.name);
                      }
                    }}
                  >
                    ❌
                  </button>
                </span>
              </div>

              <div className="group-children">
                {group.monsters.map((child) => (
                  <div
                    key={`${group.name}.${child.name}`}
                    className={`list-item ${
                      isSelected({
                        type: 'group-monster',
                        groupName: group.name,
                        name: child.name,
                      })
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      onSelect({
                        type: 'group-monster',
                        groupName: group.name,
                        name: child.name,
                      })
                    }
                  >
                    <span className="item-name">📄 {child.name}</span>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete monster "${child.name}" from group "${group.name}"?`)) {
                          onDeleteMonsterFromGroup(group.name, child.name);
                        }
                      }}
                    >
                      ❌
                    </button>
                  </div>
                ))}
                {group.monsters.length === 0 && (
                  <div
                    style={{ padding: '4px 10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}
                  >
                    Empty group.
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {db.monsterGroups.length === 0 && (
          <div style={{ padding: '8px 12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            No monster groups.
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <button data-testid="add-individual-btn" onClick={onAddMonster}>
          ➕ New Individual
        </button>
        <button data-testid="add-group-btn" onClick={onAddGroup}>
          📁 New Group
        </button>
      </div>
    </aside>
  );
};
