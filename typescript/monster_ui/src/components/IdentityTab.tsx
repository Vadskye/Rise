import React from 'react';
import { MonsterData } from '../types/monster';
import { isFreeformCodeWarning } from '../utils/validation';
import { Combobox } from './Combobox';

interface IdentityTabProps {
  monsterData: MonsterData;
  onChangeMonster: (updated: MonsterData) => void;
  errors: string[];
  warnings: string[];
  folders?: string[];
  isGroupMonster?: boolean;
}

export const IdentityTab: React.FC<IdentityTabProps> = ({
  monsterData,
  onChangeMonster,
  errors,
  warnings,
  folders = [],
  isGroupMonster = false,
}) => {
  const { requiredProperties } = monsterData;

  const [isCreatingNew, setIsCreatingNew] = React.useState<boolean>(false);
  const [prevMonsterName, setPrevMonsterName] = React.useState<string>(monsterData.name);

  if (monsterData.name !== prevMonsterName) {
    setPrevMonsterName(monsterData.name);
    setIsCreatingNew(monsterData.folder ? !folders.includes(monsterData.folder) : false);
  }

  const isNewFolder =
    isCreatingNew || (!!monsterData.folder && !folders.includes(monsterData.folder));

  const setProp = <K extends keyof typeof requiredProperties>(
    key: K,
    value: (typeof requiredProperties)[K],
  ) => {
    onChangeMonster({
      ...monsterData,
      requiredProperties: {
        ...requiredProperties,
        [key]: value,
      },
    });
  };

  const properties = monsterData.properties || {};
  const setMiscProperty = (key: string, val: string | number | boolean) => {
    onChangeMonster({
      ...monsterData,
      properties: {
        ...properties,
        [key]: val,
      },
    });
  };

  const getInlineError = (field: string) => {
    const match = errors.find((e) => e.toLowerCase().includes(field.toLowerCase()));
    return match || null;
  };

  const getInlineWarning = (field: string) => {
    const match = warnings.find((w) => w.toLowerCase().includes(field.toLowerCase()));
    return match || null;
  };

  const knowledge = monsterData.knowledge || {};
  const freeformWarning = warnings.find((w) => isFreeformCodeWarning(w, monsterData.name));

  const setKnowledgeVal = (key: 'easy' | 'normal' | 'hard' | 'legendary', value: string) => {
    onChangeMonster({
      ...monsterData,
      knowledge: {
        ...knowledge,
        [key]: value,
      },
    });
  };

  return (
    <div className="tab-content">
      <div className="form-group">
        <label htmlFor="monster-name">Monster Name</label>
        <input
          id="monster-name"
          data-testid="monster-name-input"
          type="text"
          value={monsterData.name}
          onChange={(e) => onChangeMonster({ ...monsterData, name: e.target.value })}
          placeholder="e.g. Corpsetree"
        />
        {getInlineError('name') && <div className="inline-error">❌ {getInlineError('name')}</div>}
        {getInlineWarning('name') && (
          <div className="inline-warning">⚠️ {getInlineWarning('name')}</div>
        )}
      </div>

      {!isGroupMonster && (
        <div className="form-group">
          <label htmlFor="folder-select">Folder Name</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <select
              id="folder-select"
              data-testid="folder-select"
              value={isNewFolder ? '__new_folder__' : monsterData.folder || ''}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '__new_folder__') {
                  setIsCreatingNew(true);
                  onChangeMonster({ ...monsterData, folder: '' });
                } else {
                  setIsCreatingNew(false);
                  onChangeMonster({ ...monsterData, folder: val });
                }
              }}
            >
              <option value="">-- No Folder --</option>
              {folders.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
              <option value="__new_folder__">+ Create New Folder...</option>
            </select>

            {isNewFolder && (
              <input
                id="folder"
                data-testid="folder-input"
                type="text"
                value={monsterData.folder || ''}
                onChange={(e) => onChangeMonster({ ...monsterData, folder: e.target.value })}
                placeholder="Enter new folder name"
                autoFocus
              />
            )}
          </div>
        </div>
      )}

      <div className="form-row-grid">
        <div className="form-group">
          <label htmlFor="alignment">Alignment</label>
          <Combobox
            id="alignment"
            data-testid="alignment-select"
            value={requiredProperties.alignment}
            onChange={(val) => setProp('alignment', val)}
            options={[
              { value: 'lawful good', label: 'Lawful Good' },
              { value: 'neutral good', label: 'Neutral Good' },
              { value: 'chaotic good', label: 'Chaotic Good' },
              { value: 'lawful neutral', label: 'Lawful Neutral' },
              { value: 'neutral', label: 'Neutral' },
              { value: 'chaotic neutral', label: 'Chaotic Neutral' },
              { value: 'lawful evil', label: 'Lawful Evil' },
              { value: 'neutral evil', label: 'Neutral Evil' },
              { value: 'chaotic evil', label: 'Chaotic Evil' },
            ]}
            placeholder="-- Select --"
          />
          {getInlineError('alignment') && (
            <div className="inline-error">❌ {getInlineError('alignment')}</div>
          )}
          {getInlineWarning('alignment') && (
            <div className="inline-warning">⚠️ {getInlineWarning('alignment')}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="base_class">Base Class</label>
          <Combobox
            id="base_class"
            data-testid="base-class-select"
            value={requiredProperties.base_class}
            onChange={(val) => setProp('base_class', val)}
            options={[
              { value: 'brute', label: 'Brute' },
              { value: 'leader', label: 'Leader' },
              { value: 'skirmisher', label: 'Skirmisher' },
              { value: 'sniper', label: 'Sniper' },
              { value: 'warrior', label: 'Warrior' },
              { value: 'barbarian', label: 'Barbarian' },
              { value: 'cleric', label: 'Cleric' },
              { value: 'druid', label: 'Druid' },
              { value: 'fighter', label: 'Fighter' },
              { value: 'monk', label: 'Monk' },
              { value: 'paladin', label: 'Paladin' },
              { value: 'ranger', label: 'Ranger' },
              { value: 'rogue', label: 'Rogue' },
              { value: 'sorcerer', label: 'Sorcerer' },
              { value: 'votive', label: 'Votive' },
              { value: 'wizard', label: 'Wizard' },
            ]}
            placeholder="-- Select --"
          />
          {getInlineError('base class') && (
            <div className="inline-error">❌ {getInlineError('base class')}</div>
          )}
          {getInlineWarning('base class') && (
            <div className="inline-warning">⚠️ {getInlineWarning('base class')}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="level">Level</label>
          <input
            id="level"
            data-testid="level-input"
            type="number"
            min={1}
            max={30}
            value={requiredProperties.level || ''}
            onChange={(e) => setProp('level', parseInt(e.target.value) || 0)}
          />
          {getInlineError('level') && (
            <div className="inline-error">❌ {getInlineError('level')}</div>
          )}
          {getInlineWarning('level') && (
            <div className="inline-warning">⚠️ {getInlineWarning('level')}</div>
          )}
        </div>
      </div>

      <div className="form-row-grid">
        <div className="form-group">
          <label htmlFor="creature_origin">Origin</label>
          <Combobox
            id="creature_origin"
            data-testid="origin-select"
            value={requiredProperties.creature_origin}
            onChange={(val) => setProp('creature_origin', val)}
            options={[
              { value: 'artificial', label: 'Artificial' },
              { value: 'natural', label: 'Natural' },
              { value: 'undead', label: 'Undead' },
            ]}
            placeholder="-- Select --"
          />
          {getInlineError('origin') && (
            <div className="inline-error">❌ {getInlineError('origin')}</div>
          )}
          {getInlineWarning('origin') && (
            <div className="inline-warning">⚠️ {getInlineWarning('origin')}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="creature_type">Types</label>
          <div
            className="tag-list"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}
          >
            {(requiredProperties.creature_types || []).map((type) => (
              <span
                key={type}
                className="pill-tag"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  padding: '4px 10px',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
                <button
                  type="button"
                  onClick={() => {
                    const current = requiredProperties.creature_types || [];
                    setProp(
                      'creature_types',
                      current.filter((t) => t !== type),
                    );
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--danger-color)',
                    cursor: 'pointer',
                    padding: '0 2px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                  }}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <Combobox
            id="creature_type"
            data-testid="type-select"
            value=""
            onChange={(val) => {
              const current = requiredProperties.creature_types || [];
              if (val && !current.includes(val)) {
                setProp('creature_types', [...current, val]);
              }
            }}
            options={[
              'aberration',
              'animal',
              'beast',
              'construct',
              'dragon',
              'fey',
              'ghost',
              'humanoid',
              'indwelt',
              'insect',
              'ooze',
              'plant',
              'soulforged',
            ].map((t) => ({
              value: t,
              label:
                t.charAt(0).toUpperCase() +
                t.slice(1) +
                ((requiredProperties.creature_types || []).includes(t) ? ' (selected)' : ''),
            }))}
            placeholder="-- Add Type --"
          />
          {getInlineError('creature type') && (
            <div className="inline-error">❌ {getInlineError('creature type')}</div>
          )}
          {getInlineWarning('creature type') && (
            <div className="inline-warning">⚠️ {getInlineWarning('creature type')}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="size">Size</label>
          <Combobox
            id="size"
            data-testid="size-select"
            value={requiredProperties.size}
            onChange={(val) => setProp('size', val)}
            options={[
              { value: 'fine', label: 'Fine' },
              { value: 'diminutive', label: 'Diminutive' },
              { value: 'tiny', label: 'Tiny' },
              { value: 'small', label: 'Small' },
              { value: 'medium', label: 'Medium' },
              { value: 'large', label: 'Large' },
              { value: 'huge', label: 'Huge' },
              { value: 'gargantuan', label: 'Gargantuan' },
              { value: 'colossal', label: 'Colossal' },
            ]}
            placeholder="-- Select --"
          />
          {getInlineError('size') && (
            <div className="inline-error">❌ {getInlineError('size')}</div>
          )}
          {getInlineWarning('size') && (
            <div className="inline-warning">⚠️ {getInlineWarning('size')}</div>
          )}
        </div>
      </div>

      <div className="form-row-grid" style={{ marginTop: '10px' }}>
        <label className="form-checkbox-row" htmlFor="elite">
          <input
            id="elite"
            type="checkbox"
            checked={requiredProperties.elite}
            onChange={(e) => setProp('elite', e.target.checked)}
          />
          <span>Elite</span>
        </label>

        <label className="form-checkbox-row" htmlFor="has_art">
          <input
            id="has_art"
            type="checkbox"
            checked={Boolean(properties.has_art)}
            onChange={(e) => setMiscProperty('has_art', e.target.checked)}
          />
          <span>Has art</span>
        </label>
      </div>

      <h4 className="section-subtitle" style={{ marginTop: '20px' }}>
        Knowledge Check Results
      </h4>
      <div className="knowledge-grid">
        <div className="form-group">
          <label style={{ fontSize: '0.75rem' }}>Easy Check</label>
          <textarea
            rows={2}
            value={knowledge.easy || ''}
            onChange={(e) => setKnowledgeVal('easy', e.target.value)}
            placeholder="Basic rumors or obvious features..."
          />
        </div>
        <div className="form-group">
          <label style={{ fontSize: '0.75rem' }}>Normal Check</label>
          <textarea
            rows={2}
            value={knowledge.normal || ''}
            onChange={(e) => setKnowledgeVal('normal', e.target.value)}
            placeholder="General habitat, biology, and combat habits..."
          />
        </div>
        <div className="form-group">
          <label style={{ fontSize: '0.75rem' }}>Hard Check</label>
          <textarea
            rows={2}
            value={knowledge.hard || ''}
            onChange={(e) => setKnowledgeVal('hard', e.target.value)}
            placeholder="Specific details, weaknesses, and origins..."
          />
        </div>
        <div className="form-group">
          <label style={{ fontSize: '0.75rem' }}>Legendary Check</label>
          <textarea
            rows={2}
            value={knowledge.legendary || ''}
            onChange={(e) => setKnowledgeVal('legendary', e.target.value)}
            placeholder="Unique individuals, mythical variants, ancient history..."
          />
        </div>
      </div>

      <h4 className="section-subtitle">Freeform Script Escape Hatch</h4>
      <div className="form-group">
        <label htmlFor="freeform-code">Freeform Initialization Code (TypeScript)</label>
        {freeformWarning && (
          <div className="inline-warning" style={{ marginBottom: '8px' }}>
            ⚠️ {freeformWarning}
          </div>
        )}
        <textarea
          id="freeform-code"
          data-testid="freeform-code-textarea"
          className="code-textarea"
          value={monsterData.freeformCode}
          onChange={(e) => onChangeMonster({ ...monsterData, freeformCode: e.target.value })}
          placeholder={`// e.g. add custom abilities or complex modifiers:\ncreature.addWeaponMult('fists');`}
        />
      </div>
    </div>
  );
};
