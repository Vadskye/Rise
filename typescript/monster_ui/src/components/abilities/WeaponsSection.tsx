import React, { useState } from 'react';
import { WeaponConfig } from '../../types/monster';

interface WeaponsSectionProps {
  weapons: WeaponConfig[];
  referenceWeapons: string[];
  onChange: (updatedWeapons: WeaponConfig[]) => void;
  expandedCard: string | null;
  onToggleExpand: (cardId: string) => void;
  setExpandedCard: (cardId: string | null) => void;
}

export const WeaponsSection: React.FC<WeaponsSectionProps> = ({
  weapons,
  referenceWeapons,
  onChange,
  expandedCard,
  onToggleExpand,
  setExpandedCard,
}) => {
  // Autocomplete search states
  const [weaponSearch, setWeaponSearch] = useState('');
  const [showWeaponSuggestions, setShowWeaponSuggestions] = useState(false);

  const addWeapon = (name: string) => {
    if (weapons.some((w) => w.name === name)) {
      return;
    }
    const updated = [
      ...weapons,
      {
        name,
        addStandard: true,
        addMult: true,
        options: {
          isMagical: false,
        },
      },
    ];
    onChange(updated);
    setExpandedCard(`weapon-${updated.length - 1}`);
  };

  const removeWeapon = (index: number) => {
    const updated = weapons.filter((_, i) => i !== index);
    onChange(updated);
    if (expandedCard === `weapon-${index}`) {
      setExpandedCard(null);
    }
  };

  const updateWeapon = (index: number, updatedWeapon: WeaponConfig) => {
    const updated = weapons.map((w, i) => (i === index ? updatedWeapon : w));
    onChange(updated);
  };

  const filteredWeapons = referenceWeapons.filter(
    (w) =>
      w.toLowerCase().includes(weaponSearch.toLowerCase()) &&
      !weapons.some((ex) => ex.name.toLowerCase() === w.toLowerCase()),
  );

  return (
    <div className="ability-section-card">
      <h4 className="section-subtitle">Weapons & Strike Modifications</h4>
      <p className="section-description">
        Equip standard/natural weapons and apply combat maneuvers (like Multiplier strikes,
        Grappling, Sneak Attack, or Latch On).
      </p>

      {/* Add Weapon Autocomplete */}
      <div
        className="autocomplete-container"
        style={{ position: 'relative', marginBottom: '15px' }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search weapons to add (e.g. fists, claws, broadsword)..."
            value={weaponSearch}
            onChange={(e) => {
              setWeaponSearch(e.target.value);
              setShowWeaponSuggestions(true);
            }}
            onFocus={() => setShowWeaponSuggestions(true)}
            onBlur={() => setTimeout(() => setShowWeaponSuggestions(false), 200)}
          />
          <button
            type="button"
            className="btn-add"
            style={{ padding: '0 20px', whiteSpace: 'nowrap' }}
            onClick={() => {
              if (weaponSearch.trim()) {
                addWeapon(weaponSearch.trim().toLowerCase());
                setWeaponSearch('');
              }
            }}
          >
            Add Custom
          </button>
        </div>
        {showWeaponSuggestions && weaponSearch && filteredWeapons.length > 0 && (
          <ul className="autocomplete-suggestions">
            {filteredWeapons.slice(0, 8).map((w) => (
              <li
                key={w}
                onMouseDown={() => {
                  addWeapon(w);
                  setWeaponSearch('');
                  setShowWeaponSuggestions(false);
                }}
              >
                {w}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Weapons List */}
      <div className="ability-items-list">
        {weapons.length === 0 ? (
          <div className="empty-state">No weapons configured. Add a weapon above.</div>
        ) : (
          weapons.map((weapon, idx) => {
            const cardId = `weapon-${idx}`;
            const isExpanded = expandedCard === cardId;
            return (
              <div key={idx} className={`ability-item-card ${isExpanded ? 'expanded' : ''}`}>
                <div className="ability-card-header" onClick={() => onToggleExpand(cardId)}>
                  <div className="ability-card-header-main">
                    <span className="ability-type-badge weapon-badge">WEAPON</span>
                    <strong className="ability-name">{weapon.name}</strong>
                    <span className="ability-meta-summary">
                      {[
                        weapon.addStandard && 'Equipped',
                        weapon.addMult && 'WeaponMult',
                        weapon.addGrappling && 'Grappling',
                        weapon.addSneak && 'SneakAttack',
                        weapon.addLatchOn && 'LatchOn',
                      ]
                        .filter(Boolean)
                        .join(', ') || 'No actions'}
                    </span>
                  </div>
                  <div className="ability-card-header-controls">
                    <span className="expand-chevron" onClick={() => onToggleExpand(cardId)}>
                      {isExpanded ? '▲' : '▼'}
                    </span>
                    <button
                      type="button"
                      className="btn-delete-card"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeWeapon(idx);
                      }}
                    >
                      &times;
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="ability-card-body">
                    {/* Configuration Checkboxes */}
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                        Equip and Action Setup
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                        <label className="checkbox-row">
                          <input
                            type="checkbox"
                            checked={Boolean(weapon.addStandard)}
                            onChange={(e) =>
                              updateWeapon(idx, { ...weapon, addStandard: e.target.checked })
                            }
                          />
                          Equip Base Weapon (addWeapon)
                        </label>
                        <label className="checkbox-row">
                          <input
                            type="checkbox"
                            checked={Boolean(weapon.addMult)}
                            onChange={(e) =>
                              updateWeapon(idx, { ...weapon, addMult: e.target.checked })
                            }
                          />
                          Weapon Multiplier (addWeaponMult)
                        </label>
                        <label className="checkbox-row">
                          <input
                            type="checkbox"
                            checked={Boolean(weapon.addGrappling)}
                            onChange={(e) =>
                              updateWeapon(idx, { ...weapon, addGrappling: e.target.checked })
                            }
                          />
                          Grappling Strike (addGrapplingStrike)
                        </label>
                        <label className="checkbox-row">
                          <input
                            type="checkbox"
                            checked={Boolean(weapon.addSneak)}
                            onChange={(e) =>
                              updateWeapon(idx, { ...weapon, addSneak: e.target.checked })
                            }
                          />
                          Sneak Attack (addSneakAttack)
                        </label>
                        <label className="checkbox-row">
                          <input
                            type="checkbox"
                            checked={Boolean(weapon.addLatchOn)}
                            onChange={(e) =>
                              updateWeapon(idx, { ...weapon, addLatchOn: e.target.checked })
                            }
                          />
                          Latch On (addLatchOn)
                        </label>
                      </div>
                    </div>

                    {/* Overrides Subform */}
                    <div className="card-subform">
                      <h5>Options Overrides (Optional)</h5>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Display Name Override</label>
                          <input
                            type="text"
                            placeholder={`e.g. Flaming ${weapon.name}`}
                            value={weapon.options?.displayName || ''}
                            onChange={(e) =>
                              updateWeapon(idx, {
                                ...weapon,
                                options: {
                                  ...(weapon.options || {}),
                                  displayName: e.target.value || undefined,
                                },
                              })
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label>Usage Time</label>
                          <select
                            value={weapon.options?.usageTime || ''}
                            onChange={(e) =>
                              updateWeapon(idx, {
                                ...weapon,
                                options: {
                                  ...(weapon.options || {}),
                                  usageTime: e.target.value || undefined,
                                },
                              })
                            }
                          >
                            <option value="">-- Engine Default --</option>
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
                              checked={Boolean(weapon.options?.isMagical)}
                              onChange={(e) =>
                                updateWeapon(idx, {
                                  ...weapon,
                                  options: {
                                    ...(weapon.options || {}),
                                    isMagical: e.target.checked,
                                  },
                                })
                              }
                            />
                            Is Magical Strike
                          </label>
                        </div>
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
