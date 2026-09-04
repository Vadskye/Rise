import React, { useEffect, useRef, useState } from 'react';
import { DatabaseData, SidebarSelection } from '../types/monster';

interface MonsterSidebarProps {
  db: DatabaseData;
  activeSelection: SidebarSelection;
  onSelect: (selection: SidebarSelection) => void;
  onAddMonster: (folder?: string) => void;
  onAddGroup: (folder?: string) => void;
  onAddMonsterToGroup: (groupId: string) => void;
  onDeleteMonster: (id: string) => void;
  onDeleteGroup: (id: string) => void;
  onDeleteMonsterFromGroup: (groupId: string, id: string) => void;
  onMoveToFolder: (type: 'monster' | 'group', id: string, targetFolder?: string) => void;
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
      setExpandedGroups({ [activeSelection.id]: true });
    } else if (activeSelection.type === 'group-monster') {
      setExpandedGroups({ [activeSelection.groupId]: true });
    }

    // Determine which folder (if any) should be expanded
    let activeFolder: string | undefined;
    if (activeSelection.type === 'monster') {
      activeFolder = (db.monsters || []).find((m) => m.id === activeSelection.id)?.folder;
    } else if (activeSelection.type === 'group') {
      activeFolder = (db.monsterGroups || []).find((g) => g.id === activeSelection.id)?.folder;
    } else if (activeSelection.type === 'group-monster') {
      activeFolder = (db.monsterGroups || []).find((g) => g.id === activeSelection.groupId)?.folder;
    }
    if (activeFolder) {
      setExpandedFolders({ [activeFolder]: true });
    }
  }, [activeSelection, db]);
  const [dragOverFolder, setDragOverFolder] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, type: 'monster' | 'group', id: string) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ type, id }));
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
      const { type, id } = JSON.parse(dataStr);
      if (type && id) {
        onMoveToFolder(type, id, targetFolder || undefined);
      }
    } catch (err) {
      console.error('Failed to parse drag and drop data:', err);
    }
  };

  const isSelected = (selection: SidebarSelection) => {
    if (!activeSelection || !selection || activeSelection.type !== selection.type) {
      return false;
    }
    if (activeSelection.type === 'group-monster' && selection.type === 'group-monster') {
      return (
        activeSelection.groupId === selection.groupId &&
        activeSelection.id === selection.id
      );
    }
    return activeSelection.id === selection.id;
  };

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: prev[folderName] !== true,
    }));
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: prev[groupId] !== true,
    }));
  };

  const handleGroupClick = (group: { id: string }) => {
    const isGroupSelected = isSelected({ type: 'group', id: group.id });
    onSelect({ type: 'group', id: group.id });
    if (isGroupSelected) {
      toggleGroup(group.id);
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
                          key={monster.id}
                          data-testid={`monster-item-${monster.name}`}
                          className={`list-item ${isSelected({ type: 'monster', id: monster.id }) ? 'active' : ''}`}
                          onClick={() => onSelect({ type: 'monster', id: monster.id })}
                          style={{ paddingLeft: '16px' }}
                          draggable
                          onDragStart={(e) => handleDragStart(e, 'monster', monster.id)}
                        >
                          <span className="item-name">👤 {monster.name}</span>
                          <button
                            className="delete-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteMonster(monster.id);
                            }}
                          >
                            ❌
                          </button>
                        </div>
                      );
                    } else {
                      const group = child.data;
                      const isGroupSelected = isSelected({ type: 'group', id: group.id });
                      const isGroupExpanded = expandedGroups[group.id] === true;
                      return (
                        <div
                          key={group.id}
                          className="group-container"
                          style={{ paddingLeft: '8px' }}
                        >
                          <div
                            className={`group-header ${isGroupSelected ? 'active' : ''}`}
                            data-testid={`group-item-${group.name}`}
                            onClick={() => handleGroupClick(group)}
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'group', group.id)}
                          >
                            <span className="group-title">
                              <span
                                className={`folder-arrow ${isGroupExpanded ? 'expanded' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleGroup(group.id);
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
                                  onAddMonsterToGroup(group.id);
                                }}
                              >
                                ➕
                              </button>
                              <button
                                className="delete"
                                title="Delete group"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteGroup(group.id);
                                }}
                              >
                                ❌
                              </button>
                            </span>
                          </div>

                          {isGroupExpanded && (
                            <div className="group-children" style={{ paddingLeft: '8px' }}>
                              {group.monsters.map((groupChild) => (
                                <div
                                  key={groupChild.id}
                                  data-testid={`group-monster-item-${group.name}-${groupChild.name}`}
                                  className={`list-item ${
                                    isSelected({
                                      type: 'group-monster',
                                      groupId: group.id,
                                      id: groupChild.id,
                                    })
                                      ? 'active'
                                      : ''
                                  }`}
                                  onClick={() =>
                                    onSelect({
                                      type: 'group-monster',
                                      groupId: group.id,
                                      id: groupChild.id,
                                    })
                                  }
                                >
                                  <span className="item-name">👤 {groupChild.name}</span>
                                  <button
                                    className="delete-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onDeleteMonsterFromGroup(group.id, groupChild.id);
                                    }}
                                  >
                                    ❌
                                  </button>
                                </div>
                              ))}
                              {group.monsters.length === 0 && (
                                <div
                                  style={{
                                    padding: '2px 4px',
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
              key={monster.id}
              data-testid={`monster-item-${monster.name}`}
              className={`list-item ${isSelected({ type: 'monster', id: monster.id }) ? 'active' : ''}`}
              onClick={() => onSelect({ type: 'monster', id: monster.id })}
              draggable
              onDragStart={(e) => handleDragStart(e, 'monster', monster.id)}
            >
              <span className="item-name">👤 {monster.name}</span>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteMonster(monster.id);
                }}
              >
                ❌
              </button>
            </div>
          ))}
          {folderlessMonsters.length === 0 && (
            <div style={{ padding: '2px 4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
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
            const isGroupSelected = isSelected({ type: 'group', id: group.id });
            const isGroupExpanded = expandedGroups[group.id] === true;
            return (
              <div key={group.id} className="group-container">
                <div
                  className={`group-header ${isGroupSelected ? 'active' : ''}`}
                  data-testid={`group-item-${group.name}`}
                  onClick={() => handleGroupClick(group)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'group', group.id)}
                >
                  <span className="group-title">
                    <span
                      className={`folder-arrow ${isGroupExpanded ? 'expanded' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleGroup(group.id);
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
                        onAddMonsterToGroup(group.id);
                      }}
                    >
                      ➕
                    </button>
                    <button
                      className="delete"
                      title="Delete group"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteGroup(group.id);
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
                        key={child.id}
                        data-testid={`group-monster-item-${group.name}-${child.name}`}
                        className={`list-item ${
                          isSelected({
                            type: 'group-monster',
                            groupId: group.id,
                            id: child.id,
                          })
                            ? 'active'
                            : ''
                        }`}
                        onClick={() =>
                          onSelect({
                            type: 'group-monster',
                            groupId: group.id,
                            id: child.id,
                          })
                        }
                      >
                        <span className="item-name">👤 {child.name}</span>
                        <button
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteMonsterFromGroup(group.id, child.id);
                          }}
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                    {group.monsters.length === 0 && (
                      <div
                        style={{
                          padding: '2px 4px',
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
            <div style={{ padding: '4px 8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
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
