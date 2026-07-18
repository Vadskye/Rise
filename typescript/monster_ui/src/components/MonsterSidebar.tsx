import React, { useEffect, useRef, useState } from 'react';
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
  onAddMonster: (folder?: string) => void;
  onAddGroup: (folder?: string) => void;
  onAddMonsterToGroup: (groupName: string) => void;
  onDeleteMonster: (name: string) => void;
  onDeleteGroup: (name: string) => void;
  onDeleteMonsterFromGroup: (groupName: string, name: string) => void;
  onMoveToFolder: (type: 'monster' | 'group', name: string, targetFolder?: string) => void;
  onCreateFolder: (name: string) => void;
  onRenameFolder: (oldName: string, newName: string) => void;
  onDeleteFolder: (name: string) => void;
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
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
  isSaving,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  // Track whether we've done the one-time auto-expand for the initial active selection.
  // activeSelection starts null and is set asynchronously after data loads, so we can't
  // use a lazy initializer — instead we watch for the first non-null value.
  const hasAutoExpanded = useRef(false);
  useEffect(() => {
    if (hasAutoExpanded.current || !activeSelection) {
      return;
    }
    hasAutoExpanded.current = true;

    // Determine which group (if any) should be expanded
    if (activeSelection.type === 'group') {
      setExpandedGroups({ [activeSelection.name]: true });
    } else if (activeSelection.type === 'group-monster') {
      setExpandedGroups({ [activeSelection.groupName]: true });
    }

    // Determine which folder (if any) should be expanded
    const activeItemName =
      activeSelection.type === 'group-monster'
        ? activeSelection.groupName
        : activeSelection.type === 'group'
          ? activeSelection.name
          : activeSelection.name; // 'monster'
    const allItems = [
      ...(db.monsters || []).map((m) => ({ name: m.name, folder: m.folder })),
      ...(db.monsterGroups || []).map((g) => ({ name: g.name, folder: g.folder })),
    ];
    const matchingFolder = allItems.find((item) => item.name === activeItemName)?.folder;
    if (matchingFolder) {
      setExpandedFolders({ [matchingFolder]: true });
    }
  }, [activeSelection, db]);
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
      if (!dataStr) {
        return;
      }
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
      [folderName]: prev[folderName] !== true,
    }));
  };

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: prev[groupName] !== true,
    }));
  };

  const handleGroupClick = (groupName: string) => {
    const isGroupSelected = isSelected({ type: 'group', name: groupName });
    onSelect({ type: 'group', name: groupName });
    if (isGroupSelected) {
      toggleGroup(groupName);
    }
  };

  // Extract list of unique folders in database
  const folders = Array.from(
    new Set([
      ...(db.folders || []),
      ...(db.monsters || []).map((m) => m.folder),
      ...(db.monsterGroups || []).map((g) => g.folder),
    ]),
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

          const isExpanded = expandedFolders[folderName] === true;

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
                  <span className={`folder-arrow ${isExpanded ? 'expanded' : ''}`}>▶</span> 📁{' '}
                  {folderName}
                </span>
                <span className="folder-actions">
                  <button
                    data-testid={`rename-folder-${folderName}`}
                    title="Rename folder"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newName = prompt(`Rename folder "${folderName}" to:`, folderName);
                      if (newName) {
                        onRenameFolder(folderName, newName);
                      }
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete"
                    data-testid={`delete-folder-${folderName}`}
                    title="Delete folder"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteFolder(folderName);
                    }}
                  >
                    ❌
                  </button>
                </span>
              </div>
              {isExpanded && (
                <div className="folder-children">
                  <div className="folder-inline-actions">
                    <button
                      data-testid={`add-monster-to-folder-${folderName}`}
                      title="New monster in folder"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddMonster(folderName);
                      }}
                    >
                      👤 + Monster
                    </button>
                    <button
                      data-testid={`add-group-to-folder-${folderName}`}
                      title="New group in folder"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddGroup(folderName);
                      }}
                    >
                      👥 + Group
                    </button>
                  </div>
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
                              onDeleteMonster(monster.name);
                            }}
                          >
                            ❌
                          </button>
                        </div>
                      );
                    } else {
                      const group = child.data;
                      const isGroupSelected = isSelected({ type: 'group', name: group.name });
                      const isGroupExpanded = expandedGroups[group.name] === true;
                      return (
                        <div
                          key={group.name}
                          className="group-container"
                          style={{ paddingLeft: '12px' }}
                        >
                          <div
                            className={`group-header ${isGroupSelected ? 'active' : ''}`}
                            data-testid={`group-item-${group.name}`}
                            onClick={() => handleGroupClick(group.name)}
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'group', group.name)}
                          >
                            <span className="group-title">
                              <span
                                className={`folder-arrow ${isGroupExpanded ? 'expanded' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleGroup(group.name);
                                }}
                                data-testid={`group-arrow-${group.name}`}
                              >
                                ▶
                              </span>{' '}
                              👥 {group.name}
                            </span>
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
                                  onDeleteGroup(group.name);
                                }}
                              >
                                ❌
                              </button>
                            </span>
                          </div>

                          {isGroupExpanded && (
                            <div className="group-children" style={{ paddingLeft: '12px' }}>
                              {group.monsters.map((groupChild) => (
                                <div
                                  key={`${group.name}.${groupChild.name}`}
                                  data-testid={`group-monster-item-${group.name}-${groupChild.name}`}
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
                                      onDeleteMonsterFromGroup(group.name, groupChild.name);
                                    }}
                                  >
                                    ❌
                                  </button>
                                </div>
                              ))}
                              {group.monsters.length === 0 && (
                                <div
                                  style={{
                                    padding: '4px 10px',
                                    fontSize: '0.8rem',
                                    color: 'var(--text-muted)',
                                  }}
                                >
                                  Empty group.
                                </div>
                              )}
                            </div>
                          )}
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
                  onDeleteMonster(monster.name);
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
            const isGroupExpanded = expandedGroups[group.name] === true;
            return (
              <div key={group.name} className="group-container">
                <div
                  className={`group-header ${isGroupSelected ? 'active' : ''}`}
                  data-testid={`group-item-${group.name}`}
                  onClick={() => handleGroupClick(group.name)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'group', group.name)}
                >
                  <span className="group-title">
                    <span
                      className={`folder-arrow ${isGroupExpanded ? 'expanded' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleGroup(group.name);
                      }}
                      data-testid={`group-arrow-${group.name}`}
                    >
                      ▶
                    </span>{' '}
                    👥 {group.name}
                  </span>
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
                        onDeleteGroup(group.name);
                      }}
                    >
                      ❌
                    </button>
                  </span>
                </div>

                {isGroupExpanded && (
                  <div className="group-children">
                    {group.monsters.map((child) => (
                      <div
                        key={`${group.name}.${child.name}`}
                        data-testid={`group-monster-item-${group.name}-${child.name}`}
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
                            onDeleteMonsterFromGroup(group.name, child.name);
                          }}
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                    {group.monsters.length === 0 && (
                      <div
                        style={{
                          padding: '4px 10px',
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        Empty group.
                      </div>
                    )}
                  </div>
                )}
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
        <button data-testid="add-individual-btn" onClick={() => onAddMonster()}>
          👤 New Individual
        </button>
        <button data-testid="add-group-btn" onClick={() => onAddGroup()}>
          👥 New Group
        </button>
        <button
          data-testid="add-folder-btn"
          onClick={() => {
            const name = prompt('Enter new folder name:');
            if (name) {
              onCreateFolder(name);
            }
          }}
        >
          📁 New Folder
        </button>
      </div>
    </aside>
  );
};
