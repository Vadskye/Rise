import React, { useState } from 'react';
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
  onMoveToFolder: (type: 'monster' | 'group', name: string, targetFolder?: string) => void;
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
  onMoveToFolder,
  isSaving,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const [dragOverFolder, setDragOverFolder] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, type: 'monster' | 'group', name: string) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ type, name }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, folderName: string | null) => {
    e.preventDefault();
    if (dragOverFolder !== folderName) {
      setDragOverFolder(folderName);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverFolder(null);
  };

  const handleDrop = (e: React.DragEvent, targetFolder: string | null) => {
    e.preventDefault();
    setDragOverFolder(null);
    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (!dataStr) return;
      const { type, name } = JSON.parse(dataStr);
      if (type && name) {
        onMoveToFolder(type, name, targetFolder || undefined);
      }
    } catch (err) {
      console.error('Failed to parse drag and drop data:', err);
    }
  };


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

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  // Extract list of unique folders in database
  const folders = Array.from(
    new Set([
      ...(db.monsters || []).map((m) => m.folder),
      ...(db.monsterGroups || []).map((g) => g.folder),
    ])
  )
    .filter(Boolean)
    .sort() as string[];

  // Folderless items
  const folderlessMonsters = (db.monsters || []).filter((m) => !m.folder);
  const folderlessGroups = (db.monsterGroups || []).filter((g) => !g.folder);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>👾 Creator</h2>
        <span className={`save-status ${isSaving ? 'saving' : 'saved'}`} data-testid="save-status">
          {isSaving ? 'Saving...' : 'Saved'}
        </span>
      </div>

      <div className="sidebar-content">
        {/* Folders */}
        {folders.map((folderName) => {
          const folderMonsters = (db.monsters || []).filter((m) => m.folder === folderName);
          const folderGroups = (db.monsterGroups || []).filter((g) => g.folder === folderName);
          const folderChildren = [
            ...folderMonsters.map((m) => ({ type: 'monster' as const, name: m.name, data: m })),
            ...folderGroups.map((g) => ({ type: 'group' as const, name: g.name, data: g })),
          ].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

          const isExpanded = expandedFolders[folderName] !== false;

          return (
            <div
              key={folderName}
              data-testid={`folder-container-${folderName}`}
              className={`folder-container ${dragOverFolder === folderName ? 'drag-over' : ''}`}
              onDragOver={(e) => handleDragOver(e, folderName)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, folderName)}
            >
              <div className="folder-header" onClick={() => toggleFolder(folderName)}>
                <span className="folder-title">
                  <span className={`folder-arrow ${isExpanded ? 'expanded' : ''}`}>▶</span> 📁 {folderName}
                </span>
              </div>
              {isExpanded && (
                <div className="folder-children">
                  {folderChildren.map((child) => {
                    if (child.type === 'monster') {
                      const monster = child.data;
                      return (
                        <div
                          key={monster.name}
                          data-testid={`monster-item-${monster.name}`}
                          className={`list-item ${isSelected({ type: 'monster', name: monster.name }) ? 'active' : ''}`}
                          onClick={() => onSelect({ type: 'monster', name: monster.name })}
                          style={{ paddingLeft: '24px' }}
                          draggable
                          onDragStart={(e) => handleDragStart(e, 'monster', monster.name)}
                        >
                          <span className="item-name">👤 {monster.name}</span>
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
                      );
                    } else {
                      const group = child.data;
                      const isGroupSelected = isSelected({ type: 'group', name: group.name });
                      return (
                        <div key={group.name} className="group-container" style={{ paddingLeft: '12px' }}>
                          <div
                            className={`group-header ${isGroupSelected ? 'active' : ''}`}
                            data-testid={`group-item-${group.name}`}
                            onClick={() => onSelect({ type: 'group', name: group.name })}
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'group', group.name)}
                          >
                            <span className="group-title">👥 {group.name}</span>
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

                          <div className="group-children" style={{ paddingLeft: '12px' }}>
                            {group.monsters.map((groupChild) => (
                              <div
                                key={`${group.name}.${groupChild.name}`}
                                className={`list-item ${
                                  isSelected({
                                    type: 'group-monster',
                                    groupName: group.name,
                                    name: groupChild.name,
                                  })
                                    ? 'active'
                                    : ''
                                }`}
                                onClick={() =>
                                  onSelect({
                                    type: 'group-monster',
                                    groupName: group.name,
                                    name: groupChild.name,
                                  })
                                }
                              >
                                <span className="item-name">👤 {groupChild.name}</span>
                                <button
                                  className="delete-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm(`Delete monster "${groupChild.name}" from group "${group.name}"?`)) {
                                      onDeleteMonsterFromGroup(group.name, groupChild.name);
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
                    }
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Individual Monsters */}
        <div
          className={`folderless-section ${dragOverFolder === 'folderless-monsters' ? 'drag-over' : ''}`}
          data-testid="folderless-monsters-section"
          onDragOver={(e) => handleDragOver(e, 'folderless-monsters')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, null)}
        >
          <div className="section-title">Individual Monsters</div>
          {folderlessMonsters.map((monster) => (
            <div
              key={monster.name}
              data-testid={`monster-item-${monster.name}`}
              className={`list-item ${isSelected({ type: 'monster', name: monster.name }) ? 'active' : ''}`}
              onClick={() => onSelect({ type: 'monster', name: monster.name })}
              draggable
              onDragStart={(e) => handleDragStart(e, 'monster', monster.name)}
            >
              <span className="item-name">👤 {monster.name}</span>
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
          {folderlessMonsters.length === 0 && (
            <div style={{ padding: '8px 12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              No individual monsters.
            </div>
          )}
        </div>

        {/* Monster Groups */}
        <div
          className={`folderless-section ${dragOverFolder === 'folderless-groups' ? 'drag-over' : ''}`}
          data-testid="folderless-groups-section"
          onDragOver={(e) => handleDragOver(e, 'folderless-groups')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, null)}
        >
          <div className="section-title">Monster Groups</div>
          {folderlessGroups.map((group) => {
            const isGroupSelected = isSelected({ type: 'group', name: group.name });
            return (
              <div key={group.name} className="group-container">
                <div
                  className={`group-header ${isGroupSelected ? 'active' : ''}`}
                  data-testid={`group-item-${group.name}`}
                  onClick={() => onSelect({ type: 'group', name: group.name })}
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'group', group.name)}
                >
                  <span className="group-title">👥 {group.name}</span>
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
                      <span className="item-name">👤 {child.name}</span>
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
          {folderlessGroups.length === 0 && (
            <div style={{ padding: '8px 12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              No monster groups.
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-footer">
        <button data-testid="add-individual-btn" onClick={onAddMonster}>
          👤 New Individual
        </button>
        <button data-testid="add-group-btn" onClick={onAddGroup}>
          👥 New Group
        </button>
      </div>
    </aside>
  );
};
