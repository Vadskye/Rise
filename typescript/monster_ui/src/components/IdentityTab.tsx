import React from 'react';
import { MonsterData } from '../types/monster';
import { isFreeformCodeWarning } from '../utils/validation';

interface IdentityTabProps {
  monsterData: MonsterData;
  onChangeMonster: (updated: MonsterData) => void;
  errors: string[];
  warnings: string[];
  folders?: string[];
}

export const IdentityTab: React.FC<IdentityTabProps> = ({
  monsterData,
  onChangeMonster,
  errors,
  warnings,
  folders = [],
}) => {
  const { requiredProperties } = monsterData;

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

      <div className="form-group">
        <label htmlFor="folder">Folder Name</label>
        <input
          id="folder"
          data-testid="folder-input"
          type="text"
          list="folder-options"
          value={monsterData.folder || ''}
          onChange={(e) => onChangeMonster({ ...monsterData, folder: e.target.value })}
          placeholder="e.g. Green Monsters"
        />
        <datalist id="folder-options">
          {folders.map((f) => (
            <option key={f} value={f} />
          ))}
        </datalist>
      </div>

      <div className="form-row-grid">
        <div className="form-group">
          <label htmlFor="alignment">Alignment</label>
          <select
            id="alignment"
            data-testid="alignment-select"
            value={requiredProperties.alignment}
            onChange={(e) => setProp('alignment', e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="lawful good">Lawful Good</option>
            <option value="neutral good">Neutral Good</option>
            <option value="chaotic good">Chaotic Good</option>
            <option value="lawful neutral">Lawful Neutral</option>
            <option value="neutral">Neutral</option>
            <option value="chaotic neutral">Chaotic Neutral</option>
            <option value="lawful evil">Lawful Evil</option>
            <option value="neutral evil">Neutral Evil</option>
            <option value="chaotic evil">Chaotic Evil</option>
          </select>
          {getInlineError('alignment') && (
            <div className="inline-error">❌ {getInlineError('alignment')}</div>
          )}
          {getInlineWarning('alignment') && (
            <div className="inline-warning">⚠️ {getInlineWarning('alignment')}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="base_class">Base Class</label>
          <select
            id="base_class"
            data-testid="base-class-select"
            value={requiredProperties.base_class}
            onChange={(e) => setProp('base_class', e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="brute">Brute</option>
            <option value="leader">Leader</option>
            <option value="skirmisher">Skirmisher</option>
            <option value="sniper">Sniper</option>
            <option value="warrior">Warrior</option>
            <option value="barbarian">Barbarian</option>
            <option value="cleric">Cleric</option>
            <option value="druid">Druid</option>
            <option value="fighter">Fighter</option>
            <option value="monk">Monk</option>
            <option value="paladin">Paladin</option>
            <option value="ranger">Ranger</option>
            <option value="rogue">Rogue</option>
            <option value="sorcerer">Sorcerer</option>
            <option value="votive">Votive</option>
            <option value="wizard">Wizard</option>
          </select>
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
          <select
            id="creature_origin"
            data-testid="origin-select"
            value={requiredProperties.creature_origin}
            onChange={(e) => setProp('creature_origin', e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="artificial">Artificial</option>
            <option value="natural">Natural</option>
            <option value="undead">Undead</option>
          </select>
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
          <select
            id="creature_type"
            data-testid="type-select"
            value=""
            onChange={(e) => {
              const val = e.target.value;
              const current = requiredProperties.creature_types || [];
              if (val && !current.includes(val)) {
                setProp('creature_types', [...current, val]);
              }
            }}
          >
            <option value="">-- Add Type --</option>
            {[
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
            ].map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
                {(requiredProperties.creature_types || []).includes(t) ? ' (selected)' : ''}
              </option>
            ))}
          </select>
          {getInlineError('creature type') && (
            <div className="inline-error">❌ {getInlineError('creature type')}</div>
          )}
          {getInlineWarning('creature type') && (
            <div className="inline-warning">⚠️ {getInlineWarning('creature type')}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="size">Size</label>
          <select
            id="size"
            data-testid="size-select"
            value={requiredProperties.size}
            onChange={(e) => setProp('size', e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="fine">Fine</option>
            <option value="diminutive">Diminutive</option>
            <option value="tiny">Tiny</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="huge">Huge</option>
            <option value="gargantuan">Gargantuan</option>
            <option value="colossal">Colossal</option>
          </select>
          {getInlineError('size') && (
            <div className="inline-error">❌ {getInlineError('size')}</div>
          )}
          {getInlineWarning('size') && (
            <div className="inline-warning">⚠️ {getInlineWarning('size')}</div>
          )}
        </div>
      </div>

      <div className="form-row-grid" style={{ marginTop: '10px' }}>
        <div className="form-checkbox-row">
          <input
            id="elite"
            type="checkbox"
            checked={requiredProperties.elite}
            onChange={(e) => setProp('elite', e.target.checked)}
          />
          <label htmlFor="elite">Elite</label>
        </div>

        <div className="form-checkbox-row">
          <input
            id="has_art"
            type="checkbox"
            checked={Boolean(properties.has_art)}
            onChange={(e) => setMiscProperty('has_art', e.target.checked)}
          />
          <label htmlFor="has_art">Has art</label>
        </div>
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
