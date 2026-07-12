import React from 'react';
import { MonsterGroupData } from '../types/monster';

interface GroupFormProps {
  groupData: MonsterGroupData;
  onChangeGroup: (updated: MonsterGroupData) => void;
  errors: string[];
  warnings: string[];
}

export const GroupForm: React.FC<GroupFormProps> = ({
  groupData,
  onChangeGroup,
  errors,
  warnings,
}) => {
  const getInlineError = (field: string) => {
    const match = errors.find((e) => e.toLowerCase().includes(field.toLowerCase()));
    return match || null;
  };

  const getInlineWarning = (field: string) => {
    const match = warnings.find((w) => w.toLowerCase().includes(field.toLowerCase()));
    return match || null;
  };

  return (
    <div className="editor-scroll">
      <div className="form-group">
        <label htmlFor="group-name">Group Name</label>
        <input
          id="group-name"
          type="text"
          value={groupData.name}
          onChange={(e) => onChangeGroup({ ...groupData, name: e.target.value })}
        />
        {getInlineError('name') && <div className="inline-error">❌ {getInlineError('name')}</div>}
        {getInlineWarning('name') && (
          <div className="inline-warning">⚠️ {getInlineWarning('name')}</div>
        )}
      </div>

      <div className="form-checkbox-row">
        <input
          id="group-art"
          type="checkbox"
          checked={groupData.hasArt}
          onChange={(e) => onChangeGroup({ ...groupData, hasArt: e.target.checked })}
        />
        <label htmlFor="group-art">Group Has Art</label>
      </div>

      <div className="form-group">
        <label htmlFor="group-desc">Group Description</label>
        <textarea
          id="group-desc"
          rows={3}
          value={groupData.description || ''}
          onChange={(e) =>
            onChangeGroup({ ...groupData, description: e.target.value || undefined })
          }
          placeholder="Introduce the monster family..."
        />
      </div>

      <div className="form-group">
        <label>Group Knowledge Table</label>
        <div className="form-row-grid group-knowledge-table" style={{ marginTop: '5px' }}>
          <div>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Normal</label>
            <textarea
              rows={3}
              value={groupData.knowledge?.normal || ''}
              onChange={(e) =>
                onChangeGroup({
                  ...groupData,
                  knowledge: { ...groupData.knowledge, normal: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Hard</label>
            <textarea
              rows={3}
              value={groupData.knowledge?.hard || ''}
              onChange={(e) =>
                onChangeGroup({
                  ...groupData,
                  knowledge: { ...groupData.knowledge, hard: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Legendary</label>
            <textarea
              rows={3}
              value={groupData.knowledge?.legendary || ''}
              onChange={(e) =>
                onChangeGroup({
                  ...groupData,
                  knowledge: { ...groupData.knowledge, legendary: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="group-shared-code">
          Shared Freeform Code (runs for all monsters in group)
        </label>
        {groupData.sharedFreeformCode && groupData.sharedFreeformCode.trim() && (
          <div className="inline-warning" style={{ marginBottom: '8px' }}>
            ⚠️ Group has shared freeform initialization code.
          </div>
        )}
        <textarea
          id="group-shared-code"
          className="code-textarea"
          value={groupData.sharedFreeformCode}
          onChange={(e) => onChangeGroup({ ...groupData, sharedFreeformCode: e.target.value })}
          placeholder="e.target.addCustomSense('Darkvision (90 ft.)');"
        />
      </div>
    </div>
  );
};
