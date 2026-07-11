import React from 'react';
import { CustomAbilityConfig } from '../../types/monster';

interface CustomAbilitiesSectionProps {
  customAbilities: CustomAbilityConfig[];
  onChange: (updatedAbilities: CustomAbilityConfig[]) => void;
  expandedCard: string | null;
  onToggleExpand: (cardId: string) => void;
  setExpandedCard: (cardId: string | null) => void;
}

export const CustomAbilitiesSection: React.FC<CustomAbilitiesSectionProps> = ({
  customAbilities,
  onChange,
  expandedCard,
  onToggleExpand,
  setExpandedCard,
}) => {
  const addCustomAbility = (type: 'spell' | 'maneuver') => {
    const newAbility: CustomAbilityConfig = {
      type,
      name: `New Custom ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      isMagical: type === 'spell',
      usageTime: 'Standard',
      effect: '',
      tags: [],
    };
    const updated = [...customAbilities, newAbility];
    onChange(updated);
    setExpandedCard(`custom-${updated.length - 1}`);
  };

  const removeCustomAbility = (index: number) => {
    const updated = customAbilities.filter((_, i) => i !== index);
    onChange(updated);
    if (expandedCard === `custom-${index}`) setExpandedCard(null);
  };

  const updateCustomAbility = (index: number, updatedAbility: CustomAbilityConfig) => {
    const updated = customAbilities.map((a, i) => (i === index ? updatedAbility : a));
    onChange(updated);
  };

  return (
    <div className="ability-section-card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
        }}
      >
        <div>
          <h4 className="section-subtitle" style={{ marginBottom: '0' }}>
            Custom Active Abilities
          </h4>
          <p className="section-description" style={{ marginBottom: '0' }}>
            Build new spells or maneuvers completely from scratch with custom effects, costs, and
            combat attacks.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" className="btn-add" onClick={() => addCustomAbility('spell')}>
            + Spell
          </button>
          <button type="button" className="btn-add" onClick={() => addCustomAbility('maneuver')}>
            + Maneuver
          </button>
        </div>
      </div>

      {/* Custom Abilities List */}
      <div className="ability-items-list">
        {customAbilities.length === 0 ? (
          <div className="empty-state">
            No custom abilities built yet. Click "+ Spell" or "+ Maneuver" to build.
          </div>
        ) : (
          customAbilities.map((ability, idx) => {
            const cardId = `custom-${idx}`;
            const isExpanded = expandedCard === cardId;
            return (
              <div key={idx} className={`ability-item-card ${isExpanded ? 'expanded' : ''}`}>
                <div className="ability-card-header" onClick={() => onToggleExpand(cardId)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      className={`ability-type-badge ${ability.type === 'spell' ? 'spell-badge' : 'maneuver-badge'}`}
                    >
                      CUSTOM {ability.type.toUpperCase()}
                    </span>
                    <strong className="ability-name">{ability.name}</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span className="expand-chevron">{isExpanded ? '▲' : '▼'}</span>
                    <button
                      type="button"
                      className="btn-delete-card"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCustomAbility(idx);
                      }}
                    >
                      &times;
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="ability-card-body">
                    {/* Core Form Fields */}
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Ability Name</label>
                        <input
                          type="text"
                          value={ability.name}
                          onChange={(e) =>
                            updateCustomAbility(idx, { ...ability, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Usage Time</label>
                        <select
                          value={ability.usageTime || 'Standard'}
                          onChange={(e) =>
                            updateCustomAbility(idx, { ...ability, usageTime: e.target.value })
                          }
                        >
                          <option value="Standard">Standard Action</option>
                          <option value="Move">Move Action</option>
                          <option value="Swift">Swift Action</option>
                          <option value="Minor">Minor Action</option>
                          <option value="Reaction">Reaction</option>
                          <option value="Free">Free Action</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Cost (e.g. 1 Stamina, 1 Reagent)</label>
                        <input
                          type="text"
                          placeholder="None"
                          value={ability.cost || ''}
                          onChange={(e) =>
                            updateCustomAbility(idx, {
                              ...ability,
                              cost: e.target.value || undefined,
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
                            checked={Boolean(ability.isMagical)}
                            onChange={(e) =>
                              updateCustomAbility(idx, { ...ability, isMagical: e.target.checked })
                            }
                          />
                          Is Magical
                        </label>
                      </div>
                    </div>

                    {/* Effect and Tags */}
                    <div className="form-group" style={{ marginTop: '15px' }}>
                      <label>Effect Description (LaTeX strings allowed)</label>
                      <textarea
                        rows={3}
                        placeholder="Describe the ability's effects. You may use LaTeX macros like \damagerankthree."
                        value={ability.effect || ''}
                        onChange={(e) =>
                          updateCustomAbility(idx, {
                            ...ability,
                            effect: e.target.value || undefined,
                          })
                        }
                      />
                    </div>

                    <div className="form-group" style={{ marginTop: '15px' }}>
                      <label>Tags (Comma-separated, e.g. Ranged, Area, Mind)</label>
                      <input
                        type="text"
                        placeholder="e.g. Fire, Attack, Evocation"
                        value={ability.tags?.join(', ') || ''}
                        onChange={(e) =>
                          updateCustomAbility(idx, {
                            ...ability,
                            tags: e.target.value
                              .split(',')
                              .map((t) => t.trim())
                              .filter(Boolean),
                          })
                        }
                      />
                    </div>

                    {/* Optional Attack Subform */}
                    <div className="card-subform" style={{ marginTop: '20px' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '10px',
                        }}
                      >
                        <h5 style={{ margin: '0' }}>Attack Details</h5>
                        <label className="checkbox-row" style={{ margin: '0' }}>
                          <input
                            type="checkbox"
                            checked={Boolean(ability.attack)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateCustomAbility(idx, {
                                  ...ability,
                                  attack: {
                                    targeting: 'Mental Defense',
                                    hit: 'The target is stunned.',
                                  },
                                });
                              } else {
                                updateCustomAbility(idx, { ...ability, attack: undefined });
                              }
                            }}
                          />
                          Has Attack Form
                        </label>
                      </div>

                      {ability.attack && (
                        <div
                          className="attack-grid"
                          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                        >
                          <div className="form-group">
                            <label>Targeting (e.g. Brawn Defense, Reflex Defense)</label>
                            <input
                              type="text"
                              placeholder="e.g. Mental Defense"
                              value={ability.attack.targeting}
                              onChange={(e) =>
                                updateCustomAbility(idx, {
                                  ...ability,
                                  attack: { ...ability.attack!, targeting: e.target.value },
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>Hit Effect</label>
                            <textarea
                              rows={2}
                              placeholder="What happens on a hit..."
                              value={ability.attack.hit}
                              onChange={(e) =>
                                updateCustomAbility(idx, {
                                  ...ability,
                                  attack: { ...ability.attack!, hit: e.target.value },
                                })
                              }
                            />
                          </div>
                          <div className="form-grid">
                            <div className="form-group">
                              <label>Crit Effect (Optional)</label>
                              <input
                                type="text"
                                placeholder="What happens on critical hit..."
                                value={ability.attack.crit || ''}
                                onChange={(e) =>
                                  updateCustomAbility(idx, {
                                    ...ability,
                                    attack: { ...ability.attack!, crit: e.target.value || null },
                                  })
                                }
                              />
                            </div>
                            <div className="form-group">
                              <label>Miss Effect (Optional)</label>
                              <input
                                type="text"
                                placeholder="What happens on a miss..."
                                value={ability.attack.miss || ''}
                                onChange={(e) =>
                                  updateCustomAbility(idx, {
                                    ...ability,
                                    attack: {
                                      ...ability.attack!,
                                      miss: e.target.value || undefined,
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="form-grid">
                            <div className="form-group">
                              <label>Injury (Optional)</label>
                              <input
                                type="text"
                                placeholder="Injury triggers..."
                                value={ability.attack.injury || ''}
                                onChange={(e) =>
                                  updateCustomAbility(idx, {
                                    ...ability,
                                    attack: {
                                      ...ability.attack!,
                                      injury: e.target.value || undefined,
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
                                  checked={Boolean(ability.attack.halfOnMiss)}
                                  onChange={(e) =>
                                    updateCustomAbility(idx, {
                                      ...ability,
                                      attack: { ...ability.attack!, halfOnMiss: e.target.checked },
                                    })
                                  }
                                />
                                Half damage on miss
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
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
