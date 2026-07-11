import React, { useState } from 'react';
import { StandardAbilityConfig } from '../../types/monster';

interface StandardAbilitiesSectionProps {
  standardAbilities: StandardAbilityConfig[];
  referenceSpells: string[];
  referenceManeuvers: string[];
  onChange: (updatedAbilities: StandardAbilityConfig[]) => void;
  expandedCard: string | null;
  onToggleExpand: (cardId: string) => void;
  setExpandedCard: (cardId: string | null) => void;
}

export const StandardAbilitiesSection: React.FC<StandardAbilitiesSectionProps> = ({
  standardAbilities,
  referenceSpells,
  referenceManeuvers,
  onChange,
  expandedCard,
  onToggleExpand,
  setExpandedCard,
}) => {
  // Autocomplete search states
  const [spellSearch, setSpellSearch] = useState('');
  const [showSpellSuggestions, setShowSpellSuggestions] = useState(false);
  const [maneuverSearch, setManeuverSearch] = useState('');
  const [showManeuverSuggestions, setShowManeuverSuggestions] = useState(false);

  const addStandardAbility = (type: 'spell' | 'maneuver', name: string) => {
    if (standardAbilities.some((a) => a.type === type && a.name === name)) {
      return;
    }
    const updated = [
      ...standardAbilities,
      {
        type,
        name,
        options: {
          isMagical: type === 'spell' ? true : false,
        },
      },
    ];
    onChange(updated);
    setExpandedCard(`standard-${updated.length - 1}`);
  };

  const removeStandardAbility = (index: number) => {
    const updated = standardAbilities.filter((_, i) => i !== index);
    onChange(updated);
    if (expandedCard === `standard-${index}`) setExpandedCard(null);
  };

  const updateStandardAbility = (index: number, updatedAbility: StandardAbilityConfig) => {
    const updated = standardAbilities.map((a, i) => (i === index ? updatedAbility : a));
    onChange(updated);
  };

  const filteredSpells = referenceSpells.filter(
    (s) =>
      s.toLowerCase().includes(spellSearch.toLowerCase()) &&
      !standardAbilities.some(
        (a) => a.type === 'spell' && a.name.toLowerCase() === s.toLowerCase(),
      ),
  );

  const filteredManeuvers = referenceManeuvers.filter(
    (m) =>
      m.toLowerCase().includes(maneuverSearch.toLowerCase()) &&
      !standardAbilities.some(
        (a) => a.type === 'maneuver' && a.name.toLowerCase() === m.toLowerCase(),
      ),
  );

  return (
    <div className="ability-section-card">
      <h4 className="section-subtitle">Standard Spells & Maneuvers</h4>
      <p className="section-description">
        Add standard spells and combat maneuvers from the game engine registries and override their
        usage options.
      </p>

      <div className="form-grid" style={{ marginBottom: '15px' }}>
        {/* Autocomplete Spell */}
        <div className="autocomplete-container" style={{ position: 'relative' }}>
          <label style={{ fontWeight: '600' }}>Add Standard Spell</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            <input
              type="text"
              placeholder="Search spells (e.g. Word of Power)..."
              value={spellSearch}
              onChange={(e) => {
                setSpellSearch(e.target.value);
                setShowSpellSuggestions(true);
              }}
              onFocus={() => setShowSpellSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSpellSuggestions(false), 200)}
            />
          </div>
          {showSpellSuggestions && spellSearch && filteredSpells.length > 0 && (
            <ul className="autocomplete-suggestions">
              {filteredSpells.slice(0, 8).map((s) => (
                <li
                  key={s}
                  onMouseDown={() => {
                    addStandardAbility('spell', s);
                    setSpellSearch('');
                    setShowSpellSuggestions(false);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Autocomplete Maneuver */}
        <div className="autocomplete-container" style={{ position: 'relative' }}>
          <label style={{ fontWeight: '600' }}>Add Standard Maneuver</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            <input
              type="text"
              placeholder="Search maneuvers (e.g. Charge)..."
              value={maneuverSearch}
              onChange={(e) => {
                setManeuverSearch(e.target.value);
                setShowManeuverSuggestions(true);
              }}
              onFocus={() => setShowManeuverSuggestions(true)}
              onBlur={() => setTimeout(() => setShowManeuverSuggestions(false), 200)}
            />
          </div>
          {showManeuverSuggestions && maneuverSearch && filteredManeuvers.length > 0 && (
            <ul className="autocomplete-suggestions">
              {filteredManeuvers.slice(0, 8).map((m) => (
                <li
                  key={m}
                  onMouseDown={() => {
                    addStandardAbility('maneuver', m);
                    setManeuverSearch('');
                    setShowManeuverSuggestions(false);
                  }}
                >
                  {m}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Standard Abilities List */}
      <div className="ability-items-list">
        {!standardAbilities.some((a) => a.type === 'spell' || a.type === 'maneuver') ? (
          <div className="empty-state">No standard spells or maneuvers configured.</div>
        ) : (
          standardAbilities.map((ability, idx) => {
            const cardId = `standard-${idx}`;
            const isExpanded = expandedCard === cardId;
            return (
              <div key={idx} className={`ability-item-card ${isExpanded ? 'expanded' : ''}`}>
                <div className="ability-card-header" onClick={() => onToggleExpand(cardId)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      className={`ability-type-badge ${ability.type === 'spell' ? 'spell-badge' : 'maneuver-badge'}`}
                    >
                      {ability.type.toUpperCase()}
                    </span>
                    <strong className="ability-name">
                      {ability.options?.displayName || ability.name}
                      {ability.options?.displayName && (
                        <span
                          style={{
                            fontStyle: 'italic',
                            fontWeight: 'normal',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {' '}
                          (Standard: {ability.name})
                        </span>
                      )}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span className="expand-chevron">{isExpanded ? '▲' : '▼'}</span>
                    <button
                      type="button"
                      className="btn-delete-card"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeStandardAbility(idx);
                      }}
                    >
                      &times;
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="ability-card-body">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Display Name Override</label>
                        <input
                          type="text"
                          placeholder="Defaults to original name"
                          value={ability.options?.displayName || ''}
                          onChange={(e) =>
                            updateStandardAbility(idx, {
                              ...ability,
                              options: {
                                ...(ability.options || {}),
                                displayName: e.target.value || undefined,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Usage Time Override</label>
                        <select
                          value={ability.options?.usageTime || ''}
                          onChange={(e) =>
                            updateStandardAbility(idx, {
                              ...ability,
                              options: {
                                ...(ability.options || {}),
                                usageTime: e.target.value || undefined,
                              },
                            })
                          }
                        >
                          <option value="">-- Original Spell Value --</option>
                          <option value="Standard">Standard Action</option>
                          <option value="Move">Move Action</option>
                          <option value="Swift">Swift Action</option>
                          <option value="Minor">Minor Action</option>
                          <option value="Reaction">Reaction</option>
                          <option value="Free">Free Action</option>
                        </select>
                      </div>
                      <div
                        className="form-group"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          alignSelf: 'end',
                          height: '38px',
                        }}
                      >
                        <label className="checkbox-row">
                          <input
                            type="checkbox"
                            checked={
                              ability.options?.isMagical !== undefined
                                ? ability.options.isMagical
                                : ability.type === 'spell'
                            }
                            onChange={(e) =>
                              updateStandardAbility(idx, {
                                ...ability,
                                options: {
                                  ...(ability.options || {}),
                                  isMagical: e.target.checked,
                                },
                              })
                            }
                          />
                          Is Magical
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
