import React from 'react';
import {
  SharedEditableProperties,
  StructuredSense,
  StructuredMovementSpeed,
} from '../types/monster';
import { RISE_TRAITS } from '@src/character_sheet/rise_data';

// Note: Standard traits in original code were:
// 'amphibious', 'blooded', 'bloodless', 'corporeal', 'dynamic', 'ensouled', 'floating',
// 'immortal', 'incorporeal', 'invisible', 'legless', 'living', 'mindless', 'mortal',
// 'quadrupedal', 'multipedal', 'nonliving', 'scent', 'sighted', 'sightless', 'simple-minded',
// 'soulless', 'static', 'swarm', 'telepathy'
// Let's copy it exactly to be completely safe.
// Original list:
//     'amphibious',
//     'blooded',
//     'bloodless',
//     'corporeal',
//     'dynamic',
//     'ensouled',
//     'floating',
//     'immortal',
//     'incorporeal',
//     'invisible',
//     'legless',
//     'living',
//     'mindless',
//     'mortal',
//     'quadrupedal',
//     'multipedal',
//     'nonliving',
//     'scent',
//     'sighted',
//     'sightless',
//     'simple-minded',
//     'soulless',
//     'static',
//     'swarm',
//     'telepathy',

const STANDARD_SENSES = [
  { name: 'Blindsense', hasRange: true, defaultRange: 30 },
  { name: 'Blindsight', hasRange: true, defaultRange: 60 },
  { name: 'Darkvision', hasRange: true, defaultRange: 60 },
  { name: 'Lifesense', hasRange: true, defaultRange: 30 },
  { name: 'Lifesight', hasRange: true, defaultRange: 60 },
  { name: 'Low-light Vision', hasRange: false },
  { name: 'Scent', hasRange: false },
  { name: 'Telepathy', hasRange: true, defaultRange: 100 },
  { name: 'Tremorsense', hasRange: true, defaultRange: 30 },
  { name: 'Tremorsight', hasRange: true, defaultRange: 60 },
] as const;

const STANDARD_MOVEMENT_MODES = [
  { name: 'Fly', hasLimit: true, defaultLimit: 60 },
  { name: 'Glide', hasLimit: true, defaultLimit: 30 },
  { name: 'Burrow', hasLimit: false },
  { name: 'Climb', hasLimit: false },
  { name: 'Swim', hasLimit: false },
  { name: 'Land', hasLimit: false },
  { name: 'Walk', hasLimit: false },
] as const;

interface TraitsTabProps<T extends SharedEditableProperties> {
  monsterData: T;
  onChangeMonster: (updated: T) => void;
}

export const TraitsTab = <T extends SharedEditableProperties>({
  monsterData,
  onChangeMonster,
}: TraitsTabProps<T>) => {
  const [traitSearch, setTraitSearch] = React.useState('');
  const [selectedSenseType, setSelectedSenseType] = React.useState<string>('Darkvision');
  const [customSenseName, setCustomSenseName] = React.useState<string>('');
  const [senseRange, setSenseRange] = React.useState<string>('60');

  const [selectedSpeedMode, setSelectedSpeedMode] = React.useState<string>('Fly');
  const [customSpeedMode, setCustomSpeedMode] = React.useState<string>('');
  const [speedCategory, setSpeedCategory] = React.useState<'slow' | 'average' | 'normal' | 'fast'>(
    'average',
  );
  const [speedLimitType, setSpeedLimitType] = React.useState<'none' | 'limitless' | 'limit'>(
    'limit',
  );
  const [speedLimitValue, setSpeedLimitValue] = React.useState<string>('60');

  const traits = monsterData.traits || [];
  const toggleTrait = (trait: string) => {
    const newTraits = traits.includes(trait)
      ? traits.filter((t) => t !== trait)
      : [...traits, trait];
    onChangeMonster({
      ...monsterData,
      traits: newTraits,
    });
  };

  const handleSenseTypeChange = (type: string) => {
    setSelectedSenseType(type);
    const standard = STANDARD_SENSES.find((s) => s.name === type);
    if (standard && 'defaultRange' in standard) {
      setSenseRange(String(standard.defaultRange));
    } else {
      setSenseRange('');
    }
  };

  const handleAddSense = () => {
    let newSense: StructuredSense;
    if (selectedSenseType === 'Other') {
      const name = customSenseName.trim();
      if (!name) {
        return;
      }
      const rangeNum = parseInt(senseRange, 10);
      newSense = {
        type: 'Other',
        customName: name,
        range: !isNaN(rangeNum) && senseRange.trim() !== '' ? rangeNum : undefined,
      };
    } else {
      const standard = STANDARD_SENSES.find((s) => s.name === selectedSenseType);
      if (!standard) {
        return;
      }
      if (standard.hasRange) {
        const rangeNum = parseInt(senseRange, 10);
        newSense = {
          type: selectedSenseType,
          range: !isNaN(rangeNum) ? rangeNum : undefined,
        };
      } else {
        newSense = {
          type: selectedSenseType,
        };
      }
    }

    const currentSenses = monsterData.customSenses || [];
    const exists = currentSenses.some(
      (s) =>
        s.type === newSense.type &&
        s.customName === newSense.customName &&
        s.range === newSense.range,
    );
    if (!exists) {
      onChangeMonster({
        ...monsterData,
        customSenses: [...currentSenses, newSense],
      });
    }
    setCustomSenseName('');
  };

  const handleSpeedModeChange = (mode: string) => {
    setSelectedSpeedMode(mode);
    const standard = STANDARD_MOVEMENT_MODES.find((m) => m.name === mode);
    if (standard) {
      if (standard.hasLimit) {
        setSpeedLimitType('limit');
        setSpeedLimitValue(String(standard.defaultLimit));
      } else {
        setSpeedLimitType('none');
        setSpeedLimitValue('');
      }
    } else {
      setSpeedLimitType('none');
      setSpeedLimitValue('');
    }
  };

  const handleAddSpeed = () => {
    const isOther = selectedSpeedMode === 'Other';
    const modeName = isOther ? customSpeedMode.trim() : selectedSpeedMode;
    if (!modeName) {
      return;
    }

    const limitVal = parseInt(speedLimitValue, 10);
    const newSpeed: StructuredMovementSpeed = {
      mode: selectedSpeedMode,
      customMode: isOther ? modeName : undefined,
      category: speedCategory,
      limitType: speedLimitType !== 'none' ? speedLimitType : undefined,
      limitValue: speedLimitType === 'limit' && !isNaN(limitVal) ? limitVal : undefined,
    };

    const currentSpeeds = monsterData.customMovementSpeeds || [];
    const exists = currentSpeeds.some(
      (s) =>
        s.mode === newSpeed.mode &&
        s.customMode === newSpeed.customMode &&
        s.category === newSpeed.category &&
        s.limitType === newSpeed.limitType &&
        s.limitValue === newSpeed.limitValue,
    );
    if (!exists) {
      onChangeMonster({
        ...monsterData,
        customMovementSpeeds: [...currentSpeeds, newSpeed],
      });
    }
    setCustomSpeedMode('');
  };

  const standardTraits = Array.from(RISE_TRAITS);

  return (
    <div className="tab-content">
      <h4 className="section-subtitle">Standard Traits</h4>
      <div className="form-group search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search traits..."
          value={traitSearch}
          onChange={(e) => setTraitSearch(e.target.value)}
        />
      </div>
      <div className="traits-grid">
        {standardTraits
          .filter((t) => t.includes(traitSearch.toLowerCase()))
          .map((trait) => (
            <div key={trait} className="form-checkbox-row">
              <input
                id={`trait-${trait}`}
                type="checkbox"
                checked={traits.includes(trait)}
                onChange={() => toggleTrait(trait)}
              />
              <label htmlFor={`trait-${trait}`} className={traits.includes(trait) ? 'checked' : ''}>
                {trait}
              </label>
            </div>
          ))}
      </div>

      <h4 className="section-subtitle">Senses & Movement</h4>

      <div className="form-group mb-15">
        <label>Senses</label>
        <div
          className="tag-list"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}
        >
          {(monsterData.customSenses || []).length === 0 ? (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              No custom senses added (defaults to Normal Senses).
            </span>
          ) : (
            (monsterData.customSenses || []).map((sense, idx) => {
              const isStandard = sense.type !== 'Other';
              const name = isStandard ? sense.type : sense.customName;
              return (
                <span
                  key={idx}
                  className="pill-tag"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    padding: '4px 10px',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                  }}
                >
                  <strong>{name}</strong>
                  {sense.range !== undefined && sense.range !== null && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      ({sense.range} ft.)
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      const currentSenses = monsterData.customSenses || [];
                      onChangeMonster({
                        ...monsterData,
                        customSenses: currentSenses.filter((_, i) => i !== idx),
                      });
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
              );
            })
          )}
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            marginTop: '10px',
          }}
        >
          <div className="form-group" style={{ margin: 0, flex: '1 1 150px' }}>
            <label style={{ fontSize: '0.75rem', marginBottom: '4px', display: 'block' }}>
              Sense Type
            </label>
            <select
              value={selectedSenseType}
              onChange={(e) => handleSenseTypeChange(e.target.value)}
              style={{ width: '100%', padding: '6px 10px' }}
            >
              {STANDARD_SENSES.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
              <option value="Other">Other (Custom)...</option>
            </select>
          </div>

          {selectedSenseType === 'Other' && (
            <div className="form-group" style={{ margin: 0, flex: '1 1 150px' }}>
              <label style={{ fontSize: '0.75rem', marginBottom: '4px', display: 'block' }}>
                Custom Name
              </label>
              <input
                type="text"
                placeholder="e.g. Infravision"
                value={customSenseName}
                onChange={(e) => setCustomSenseName(e.target.value)}
                style={{ width: '100%', padding: '6px 10px' }}
              />
            </div>
          )}

          {(selectedSenseType === 'Other' ||
            STANDARD_SENSES.find((s) => s.name === selectedSenseType)?.hasRange) && (
            <div className="form-group" style={{ margin: 0, width: '100px' }}>
              <label style={{ fontSize: '0.75rem', marginBottom: '4px', display: 'block' }}>
                Range (ft.)
              </label>
              <input
                type="number"
                min="0"
                step="5"
                placeholder="e.g. 60"
                value={senseRange}
                onChange={(e) => setSenseRange(e.target.value)}
                style={{ width: '100%', padding: '6px 10px' }}
              />
            </div>
          )}

          <button
            type="button"
            className="btn-add"
            onClick={handleAddSense}
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              padding: '8px 15px',
              borderRadius: '6px',
              cursor: 'pointer',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
            }}
          >
            Add Sense
          </button>
        </div>
      </div>

      <div className="form-group mb-15">
        <label>Custom Movement Speeds</label>
        <div
          className="tag-list"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}
        >
          {(monsterData.customMovementSpeeds || []).length === 0 ? (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              No custom movement speeds added (defaults to ground speed).
            </span>
          ) : (
            (monsterData.customMovementSpeeds || []).map((speed, idx) => {
              const isStandard = speed.mode !== 'Other';
              const name = isStandard ? speed.mode : speed.customMode;
              return (
                <span
                  key={idx}
                  className="pill-tag"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    padding: '4px 10px',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                  }}
                >
                  <strong>{name}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    ({speed.category}
                    {speed.limitType === 'limitless' && ', limitless'}
                    {speed.limitType === 'limit' &&
                      speed.limitValue !== undefined &&
                      `, ${speed.limitValue} ft. limit`}
                    )
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const currentSpeeds = monsterData.customMovementSpeeds || [];
                      onChangeMonster({
                        ...monsterData,
                        customMovementSpeeds: currentSpeeds.filter((_, i) => i !== idx),
                      });
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
              );
            })
          )}
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            marginTop: '10px',
          }}
        >
          <div className="form-group" style={{ margin: 0, flex: '1 1 120px' }}>
            <label style={{ fontSize: '0.75rem', marginBottom: '4px', display: 'block' }}>
              Movement Mode
            </label>
            <select
              value={selectedSpeedMode}
              onChange={(e) => handleSpeedModeChange(e.target.value)}
              style={{ width: '100%', padding: '6px 10px' }}
            >
              <option value="Fly">Fly</option>
              <option value="Glide">Glide</option>
              <option value="Burrow">Burrow</option>
              <option value="Climb">Climb</option>
              <option value="Swim">Swim</option>
              <option value="Land">Land</option>
              <option value="Walk">Walk</option>
              <option value="Other">Other...</option>
            </select>
          </div>

          {selectedSpeedMode === 'Other' && (
            <div className="form-group" style={{ margin: 0, flex: '1 1 120px' }}>
              <label style={{ fontSize: '0.75rem', marginBottom: '4px', display: 'block' }}>
                Custom Mode
              </label>
              <input
                type="text"
                placeholder="e.g. Teleport"
                value={customSpeedMode}
                onChange={(e) => setCustomSpeedMode(e.target.value)}
                style={{ width: '100%', padding: '6px 10px' }}
              />
            </div>
          )}

          <div className="form-group" style={{ margin: 0, flex: '1 1 120px' }}>
            <label style={{ fontSize: '0.75rem', marginBottom: '4px', display: 'block' }}>
              Speed Category
            </label>
            <select
              value={speedCategory}
              onChange={(e) => setSpeedCategory(e.target.value as any)}
              style={{ width: '100%', padding: '6px 10px' }}
            >
              <option value="slow">slow</option>
              <option value="average">average</option>
              <option value="normal">normal</option>
              <option value="fast">fast</option>
            </select>
          </div>

          {(selectedSpeedMode === 'Fly' ||
            selectedSpeedMode === 'Glide' ||
            selectedSpeedMode === 'Other') && (
            <>
              <div className="form-group" style={{ margin: 0, flex: '1 1 120px' }}>
                <label style={{ fontSize: '0.75rem', marginBottom: '4px', display: 'block' }}>
                  Range Limit Type
                </label>
                <select
                  value={speedLimitType}
                  onChange={(e) => setSpeedLimitType(e.target.value as any)}
                  style={{ width: '100%', padding: '6px 10px' }}
                >
                  <option value="none">No Limit Specified</option>
                  <option value="limitless">Limitless</option>
                  <option value="limit">Has Limit</option>
                </select>
              </div>

              {speedLimitType === 'limit' && (
                <div className="form-group" style={{ margin: 0, width: '100px' }}>
                  <label style={{ fontSize: '0.75rem', marginBottom: '4px', display: 'block' }}>
                    Limit (ft.)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    placeholder="e.g. 60"
                    value={speedLimitValue}
                    onChange={(e) => setSpeedLimitValue(e.target.value)}
                    style={{ width: '100%', padding: '6px 10px' }}
                  />
                </div>
              )}
            </>
          )}

          <button
            type="button"
            className="btn-add"
            onClick={handleAddSpeed}
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              padding: '8px 15px',
              borderRadius: '6px',
              cursor: 'pointer',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
            }}
          >
            Add Speed
          </button>
        </div>
      </div>
    </div>
  );
};
