import React from 'react';
import { StandardAbilityConfig } from '../../types/monster';
import { isMissingWeaponWarning, isMissingPoisonWarning } from '@src/monsters/monster_validation';
import { WeaponCombobox } from './WeaponCombobox';
import { Combobox } from '../Combobox';
import { AutocompleteSearch } from '../AutocompleteSearch';

export const USAGE_TIME_OPTIONS = [
  { value: '', label: '-- Original Value --' },
  { value: 'standard', label: 'Standard Action' },
  { value: 'elite', label: 'Elite Action' },
  { value: 'move', label: 'Move Action' },
  { value: 'minor', label: 'Minor Action' },
  { value: 'triggered', label: 'Triggered' },
  { value: 'free', label: 'Free Action' },
];

interface StandardAbilitiesSectionProps {
  standardAbilities: StandardAbilityConfig[];
  referenceSpells: string[];
  referenceManeuvers: string[];
  referenceWeapons: string[];
  referenceAlchemicalItems: string[];
  referencePoisons?: string[];
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
  referenceAlchemicalItems,
  referencePoisons = [],
  onChange,
  expandedCard,
  onToggleExpand,
  setExpandedCard,
  warnings = [],
}) => {
  const SPECIAL_MANEUVERS = [
    'Equip Weapon',
    'Weapon Multiplier',
    'Grappling Strike',
    'Sneak Attack',
    'Latch On',
    'Throw Item',
    'Poisonous Strike',
  ];

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
            const displayNameToUse = ability.options?.displayName || ability.name;
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
                      {displayNameToUse}
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
                  <div
                    className="ability-card-header-controls"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {ability.type === 'maneuver' && (
                      <div
                        className="quick-weapon-select-container"
                        style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                      >
                        <WeaponCombobox
                          selectedWeapon={ability.options?.weapon}
                          weapons={
                            ability.name === 'Throw Item'
                              ? referenceAlchemicalItems
                              : referenceWeapons
                          }
                          placeholder={
                            ability.name === 'Throw Item' ? 'Search items...' : 'Search weapons...'
                          }
                          clearLabel={
                            ability.name === 'Throw Item' ? '-- No Item --' : '-- No Weapon --'
                          }
                          triggerTitle={
                            ability.name === 'Throw Item'
                              ? 'Quickly assign an alchemical item to this maneuver'
                              : 'Quickly assign a weapon to this maneuver'
                          }
                          noSelectionLabel={ability.name === 'Throw Item' ? 'No Item' : 'No Weapon'}
                          noMatchesLabel={
                            ability.name === 'Throw Item'
                              ? 'No matching items'
                              : 'No matching weapons'
                          }
                          onSelect={(weapon) =>
                            updateStandardAbility(idx, {
                              ...ability,
                              options: {
                                ...(ability.options || {}),
                                weapon: weapon || undefined,
                              },
                            })
                          }
                        />
                        {warnings.some((w) =>
                          isMissingWeaponWarning(
                            w,
                            displayNameToUse,
                            ability.name === 'Throw Item',
                          ),
                        ) && (
                          <span
                            className="quick-weapon-warning"
                            title={
                              ability.name === 'Throw Item'
                                ? 'Maneuver requires an alchemical item.'
                                : "Maneuver makes a strike and doesn't have a weapon."
                            }
                          >
                            ⚠️
                          </span>
                        )}

                        {ability.name === 'Poisonous Strike' && (
                          <>
                            <WeaponCombobox
                              selectedWeapon={
                                ability.options?.poison
                                  ? ability.options.poison.replace(/^Poison,\s*/i, '')
                                  : undefined
                              }
                              weapons={referencePoisons}
                              placeholder="Search poisons..."
                              clearLabel="-- No Poison --"
                              triggerTitle="Quickly assign a poison to this maneuver"
                              noSelectionLabel="No Poison"
                              noMatchesLabel="No matching poisons"
                              onSelect={(poison) =>
                                updateStandardAbility(idx, {
                                  ...ability,
                                  options: {
                                    ...(ability.options || {}),
                                    poison: poison || undefined,
                                  },
                                })
                              }
                            />
                            {warnings.some((w) => isMissingPoisonWarning(w, displayNameToUse)) && (
                              <span
                                className="quick-weapon-warning"
                                title="Maneuver requires a poison."
                              >
                                ⚠️
                              </span>
                            )}
                          </>
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
                        <Combobox
                          value={ability.options?.usageTime || ''}
                          options={USAGE_TIME_OPTIONS}
                          onChange={(val) =>
                            updateStandardAbility(idx, {
                              ...ability,
                              options: {
                                ...(ability.options || {}),
                                usageTime: val || undefined,
                              },
                            })
                          }
                        />
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
                      <label>Tags Override (Comma-separated)</label>
                      <input
                        type="text"
                        value={ability.options?.tags?.join(', ') || ''}
                        onChange={(e) =>
                          updateStandardAbility(idx, {
                            ...ability,
                            options: {
                              ...(ability.options || {}),
                              tags: e.target.value
                                ? e.target.value.split(',').filter(Boolean)
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
