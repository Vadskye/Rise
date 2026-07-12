import React, { useState, useMemo } from 'react';
import { StandardAbilityConfig } from '../../types/monster';
import { isMissingWeaponWarning } from '../../utils/validation';

interface AutocompleteSearchProps {
  label: string;
  placeholder: string;
  items: string[];
  excludeItems: string[];
  onSelect: (item: string) => void;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({
  label,
  placeholder,
  items,
  excludeItems,
  onSelect,
}) => {
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const excludeSet = useMemo(() => {
    return new Set(excludeItems.map((i) => i.toLowerCase()));
  }, [excludeItems]);

  const filtered = useMemo(() => {
    const searchLower = search.toLowerCase();
    return items.filter(
      (item) => item.toLowerCase().includes(searchLower) && !excludeSet.has(item.toLowerCase()),
    );
  }, [items, excludeSet, search]);

  return (
    <div className="autocomplete-container" style={{ position: 'relative' }}>
      <label style={{ fontWeight: '600' }}>{label}</label>
      <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
      </div>
      {showSuggestions && search && filtered.length > 0 && (
        <ul className="autocomplete-suggestions">
          {filtered.slice(0, 8).map((item) => (
            <li
              key={item}
              onMouseDown={() => {
                onSelect(item);
                setSearch('');
                setShowSuggestions(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface StandardAbilitiesSectionProps {
  standardAbilities: StandardAbilityConfig[];
  referenceSpells: string[];
  referenceManeuvers: string[];
  referenceWeapons: string[];
  onChange: (updatedAbilities: StandardAbilityConfig[]) => void;
  expandedCard: string | null;
  onToggleExpand: (cardId: string) => void;
  setExpandedCard: (cardId: string | null) => void;
  warnings?: string[];
}

export const StandardAbilitiesSection: React.FC<StandardAbilitiesSectionProps> = ({
  standardAbilities,
  referenceSpells,
  referenceManeuvers,
  referenceWeapons,
  onChange,
  expandedCard,
  onToggleExpand,
  setExpandedCard,
  warnings = [],
}) => {
  const SPECIAL_MANEUVERS = ['Equip Weapon', 'Weapon Multiplier', 'Grappling Strike', 'Sneak Attack', 'Latch On'];

  const addStandardAbility = (type: 'spell' | 'maneuver', name: string) => {
    const isSpecial = SPECIAL_MANEUVERS.includes(name);
    if (!isSpecial && standardAbilities.some((a) => a.type === type && a.name === name)) {
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
    if (expandedCard === `standard-${index}`) {
      setExpandedCard(null);
    }
  };

  const updateStandardAbility = (index: number, updatedAbility: StandardAbilityConfig) => {
    const updated = standardAbilities.map((a, i) => (i === index ? updatedAbility : a));
    onChange(updated);
  };

  return (
    <div className="ability-section-card">
      <h4 className="section-subtitle">Standard Spells & Maneuvers</h4>
      <p className="section-description">
        Add standard spells and combat maneuvers from the game engine registries and override their
        usage options.
      </p>

      <div className="form-grid" style={{ marginBottom: '15px' }}>
        {/* Autocomplete Spell */}
        <AutocompleteSearch
          label="Add Standard Spell"
          placeholder="Search spells (e.g. Word of Power)..."
          items={referenceSpells}
          excludeItems={standardAbilities.filter((a) => a.type === 'spell').map((a) => a.name)}
          onSelect={(name) => addStandardAbility('spell', name)}
        />

        {/* Autocomplete Maneuver */}
        <AutocompleteSearch
          label="Add Standard Maneuver"
          placeholder="Search maneuvers (e.g. Charge)..."
          items={referenceManeuvers}
          excludeItems={standardAbilities
            .filter((a) => a.type === 'maneuver' && !SPECIAL_MANEUVERS.includes(a.name))
            .map((a) => a.name)}
          onSelect={(name) => addStandardAbility('maneuver', name)}
        />
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
                  <div className="ability-card-header-main">
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
                      {ability.options?.weapon && (
                        <span
                          style={{
                            marginLeft: '8px',
                            fontWeight: 'normal',
                            fontSize: '0.85em',
                            color: 'var(--text-secondary)',
                            background: 'rgba(255, 255, 255, 0.1)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                          }}
                        >
                          {ability.options.weapon}
                        </span>
                      )}
                    </strong>
                  </div>
                  <div className="ability-card-header-controls" onClick={(e) => e.stopPropagation()}>
                    {ability.type === 'maneuver' && (
                      <div className="quick-weapon-select-container">
                        <select
                          className="quick-weapon-select"
                          value={ability.options?.weapon || ''}
                          onChange={(e) =>
                            updateStandardAbility(idx, {
                              ...ability,
                              options: {
                                ...(ability.options || {}),
                                weapon: e.target.value || undefined,
                              },
                            })
                          }
                        >
                          <option value="">-- No Weapon --</option>
                          {referenceWeapons.map((w) => (
                            <option key={w} value={w}>
                              {w}
                            </option>
                          ))}
                        </select>
                        {warnings.some((w) =>
                          isMissingWeaponWarning(
                            w,
                            ability.options?.displayName || ability.name,
                          ),
                        ) && (
                          <span
                            className="quick-weapon-warning"
                            title="Maneuver makes a strike and doesn't have a weapon."
                          >
                            ⚠️
                          </span>
                        )}
                      </div>
                    )}
                    <span className="expand-chevron" onClick={() => onToggleExpand(cardId)}>
                      {isExpanded ? '▲' : '▼'}
                    </span>
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

                    <div className="form-group" style={{ marginTop: '15px' }}>
                      <label>Tags Override (Comma-separated, e.g. Fire, Attack, Evocation)</label>
                      <input
                        type="text"
                        placeholder="e.g. Fire, Attack, Evocation"
                        value={ability.options?.tags?.join(', ') || ''}
                        onChange={(e) =>
                          updateStandardAbility(idx, {
                            ...ability,
                            options: {
                              ...(ability.options || {}),
                              tags: e.target.value
                                ? e.target.value
                                    .split(',')
                                    .map((t) => t.trim())
                                    .filter(Boolean)
                                : undefined,
                            },
                          })
                        }
                      />
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
