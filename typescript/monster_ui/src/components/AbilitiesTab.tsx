import React, { useState } from 'react';
import {
  MonsterData,
  StandardAbilityConfig,
  CustomAbilityConfig,
  PassiveAbilityConfig,
  WeaponConfig,
} from '../types/monster';

interface ReferenceData {
  spells: string[];
  maneuvers: string[];
  weapons: string[];
  spheres: string[];
}

interface AbilitiesTabProps {
  monsterData: MonsterData;
  onChangeMonster: (updated: MonsterData) => void;
  referenceData: ReferenceData;
}

export const AbilitiesTab: React.FC<AbilitiesTabProps> = ({
  monsterData,
  onChangeMonster,
  referenceData,
}) => {
  // Local state for expanded cards (maps to "type-index" e.g., "custom-0", "weapon-1")
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Autocomplete search states
  const [spellSearch, setSpellSearch] = useState('');
  const [showSpellSuggestions, setShowSpellSuggestions] = useState(false);
  const [maneuverSearch, setManeuverSearch] = useState('');
  const [showManeuverSuggestions, setShowManeuverSuggestions] = useState(false);
  const [weaponSearch, setWeaponSearch] = useState('');
  const [showWeaponSuggestions, setShowWeaponSuggestions] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const updateField = <K extends keyof MonsterData>(key: K, value: MonsterData[K]) => {
    onChangeMonster({
      ...monsterData,
      [key]: value,
    });
  };

  // --- RITUALS HANDLERS ---
  const handleRitualToggle = (sphere: string) => {
    const current = monsterData.rituals || [];
    const updated = current.includes(sphere)
      ? current.filter((s) => s !== sphere)
      : [...current, sphere];
    updateField('rituals', updated);
  };

  // --- STANDARD ABILITY HANDLERS ---
  const addStandardAbility = (type: 'spell' | 'maneuver', name: string) => {
    const list = monsterData.standardAbilities || [];
    // Prevent duplicate additions of the exact same ability
    if (list.some((a) => a.type === type && a.name === name)) {
      return;
    }
    const updated = [
      ...list,
      {
        type,
        name,
        options: {
          isMagical: type === 'spell' ? true : false,
        },
      },
    ];
    updateField('standardAbilities', updated);
    setExpandedCard(`standard-${updated.length - 1}`);
  };

  const removeStandardAbility = (index: number) => {
    const list = monsterData.standardAbilities || [];
    const updated = list.filter((_, i) => i !== index);
    updateField('standardAbilities', updated);
    if (expandedCard === `standard-${index}`) setExpandedCard(null);
  };

  const updateStandardAbility = (index: number, updatedAbility: StandardAbilityConfig) => {
    const list = monsterData.standardAbilities || [];
    const updated = list.map((a, i) => (i === index ? updatedAbility : a));
    updateField('standardAbilities', updated);
  };

  // --- CUSTOM ABILITY HANDLERS ---
  const addCustomAbility = (type: 'spell' | 'maneuver') => {
    const list = monsterData.customAbilities || [];
    const newAbility: CustomAbilityConfig = {
      type,
      name: `New Custom ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      isMagical: type === 'spell',
      usageTime: 'Standard',
      effect: '',
      tags: [],
    };
    const updated = [...list, newAbility];
    updateField('customAbilities', updated);
    setExpandedCard(`custom-${updated.length - 1}`);
  };

  const removeCustomAbility = (index: number) => {
    const list = monsterData.customAbilities || [];
    const updated = list.filter((_, i) => i !== index);
    updateField('customAbilities', updated);
    if (expandedCard === `custom-${index}`) setExpandedCard(null);
  };

  const updateCustomAbility = (index: number, updatedAbility: CustomAbilityConfig) => {
    const list = monsterData.customAbilities || [];
    const updated = list.map((a, i) => (i === index ? updatedAbility : a));
    updateField('customAbilities', updated);
  };

  // --- PASSIVE ABILITY HANDLERS ---
  const addPassiveAbility = () => {
    const list = monsterData.passiveAbilities || [];
    const newPassive: PassiveAbilityConfig = {
      name: 'New Passive Ability',
      effect: '',
      isMagical: false,
    };
    const updated = [...list, newPassive];
    updateField('passiveAbilities', updated);
    setExpandedCard(`passive-${updated.length - 1}`);
  };

  const removePassiveAbility = (index: number) => {
    const list = monsterData.passiveAbilities || [];
    const updated = list.filter((_, i) => i !== index);
    updateField('passiveAbilities', updated);
    if (expandedCard === `passive-${index}`) setExpandedCard(null);
  };

  const updatePassiveAbility = (index: number, updatedPassive: PassiveAbilityConfig) => {
    const list = monsterData.passiveAbilities || [];
    const updated = list.map((a, i) => (i === index ? updatedPassive : a));
    updateField('passiveAbilities', updated);
  };

  // --- WEAPON HANDLERS ---
  const addWeapon = (name: string) => {
    const list = monsterData.weapons || [];
    if (list.some((w) => w.name === name)) {
      return;
    }
    const updated = [
      ...list,
      {
        name,
        addStandard: true,
        addMult: true,
        options: {
          isMagical: false,
        },
      },
    ];
    updateField('weapons', updated);
    setExpandedCard(`weapon-${updated.length - 1}`);
  };

  const removeWeapon = (index: number) => {
    const list = monsterData.weapons || [];
    const updated = list.filter((_, i) => i !== index);
    updateField('weapons', updated);
    if (expandedCard === `weapon-${index}`) setExpandedCard(null);
  };

  const updateWeapon = (index: number, updatedWeapon: WeaponConfig) => {
    const list = monsterData.weapons || [];
    const updated = list.map((w, i) => (i === index ? updatedWeapon : w));
    updateField('weapons', updated);
  };

  // Suggestions filter
  const filteredSpells = referenceData.spells.filter(
    (s) =>
      s.toLowerCase().includes(spellSearch.toLowerCase()) &&
      !(monsterData.standardAbilities || []).some(
        (a) => a.type === 'spell' && a.name.toLowerCase() === s.toLowerCase(),
      ),
  );

  const filteredManeuvers = referenceData.maneuvers.filter(
    (m) =>
      m.toLowerCase().includes(maneuverSearch.toLowerCase()) &&
      !(monsterData.standardAbilities || []).some(
        (a) => a.type === 'maneuver' && a.name.toLowerCase() === m.toLowerCase(),
      ),
  );

  const filteredWeapons = referenceData.weapons.filter(
    (w) =>
      w.toLowerCase().includes(weaponSearch.toLowerCase()) &&
      !(monsterData.weapons || []).some((ex) => ex.name.toLowerCase() === w.toLowerCase()),
  );

  return (
    <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* 1. RITUALS SECTION */}
      <div className="ability-section-card">
        <h4 className="section-subtitle">Rituals & Mystic Spheres</h4>
        <p className="section-description">
          Configure which Mystic Spheres this creature can cast rituals from. This maps to the <code>creature.addRituals()</code> engine calls.
        </p>
        <div className="spheres-checklist-grid">
          {referenceData.spheres.map((sphere) => {
            const isChecked = (monsterData.rituals || []).includes(sphere);
            return (
              <label key={sphere} className="checkbox-pill-label" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: isChecked ? 'var(--accent-color)' : 'var(--bg-tertiary)',
                color: isChecked ? '#12131a' : 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                fontWeight: isChecked ? '600' : 'normal',
                transition: 'all 0.2s ease',
              }}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleRitualToggle(sphere)}
                  style={{ display: 'none' }}
                />
                {sphere}
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. WEAPONS & STRIKES SECTION */}
      <div className="ability-section-card">
        <h4 className="section-subtitle">Weapons & Strike Modifications</h4>
        <p className="section-description">
          Equip standard/natural weapons and apply combat maneuvers (like Multiplier strikes, Grappling, Sneak Attack, or Latch On).
        </p>
        
        {/* Add Weapon Autocomplete */}
        <div className="autocomplete-container" style={{ position: 'relative', marginBottom: '15px' }}>
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
          {(monsterData.weapons || []).length === 0 ? (
            <div className="empty-state">No weapons configured. Add a weapon above.</div>
          ) : (
            (monsterData.weapons || []).map((weapon, idx) => {
              const cardId = `weapon-${idx}`;
              const isExpanded = expandedCard === cardId;
              return (
                <div key={idx} className={`ability-item-card ${isExpanded ? 'expanded' : ''}`}>
                  <div className="ability-card-header" onClick={() => toggleExpand(cardId)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="ability-type-badge weapon-badge">WEAPON</span>
                      <strong className="ability-name">{weapon.name}</strong>
                      <span className="ability-meta-summary">
                        {[
                          weapon.addStandard && 'Equipped',
                          weapon.addMult && 'WeaponMult',
                          weapon.addGrappling && 'Grappling',
                          weapon.addSneak && 'SneakAttack',
                          weapon.addLatchOn && 'LatchOn'
                        ].filter(Boolean).join(', ') || 'No actions'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span className="expand-chevron">{isExpanded ? '▲' : '▼'}</span>
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
                        <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Equip and Action Setup</label>
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
                          <div className="form-group" style={{ display: 'flex', alignItems: 'center', alignSelf: 'end', height: '38px' }}>
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

      {/* 3. STANDARD SPELLS & MANEUVERS SECTION */}
      <div className="ability-section-card">
        <h4 className="section-subtitle">Standard Spells & Maneuvers</h4>
        <p className="section-description">
          Add standard spells and combat maneuvers from the game engine registries and override their usage options.
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
          {!(monsterData.standardAbilities || []).some((a) => a.type === 'spell' || a.type === 'maneuver') ? (
            <div className="empty-state">No standard spells or maneuvers configured.</div>
          ) : (
            (monsterData.standardAbilities || []).map((ability, idx) => {
              const cardId = `standard-${idx}`;
              const isExpanded = expandedCard === cardId;
              return (
                <div key={idx} className={`ability-item-card ${isExpanded ? 'expanded' : ''}`}>
                  <div className="ability-card-header" onClick={() => toggleExpand(cardId)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={`ability-type-badge ${ability.type === 'spell' ? 'spell-badge' : 'maneuver-badge'}`}>
                        {ability.type.toUpperCase()}
                      </span>
                      <strong className="ability-name">
                        {ability.options?.displayName || ability.name}
                        {ability.options?.displayName && <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'var(--text-secondary)' }}> (Standard: {ability.name})</span>}
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
                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', alignSelf: 'end', height: '38px' }}>
                          <label className="checkbox-row">
                            <input
                              type="checkbox"
                              checked={ability.options?.isMagical !== undefined ? ability.options.isMagical : ability.type === 'spell'}
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

      {/* 4. CUSTOM ABILITIES SECTION */}
      <div className="ability-section-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div>
            <h4 className="section-subtitle" style={{ marginBottom: '0' }}>Custom Active Abilities</h4>
            <p className="section-description" style={{ marginBottom: '0' }}>
              Build new spells or maneuvers completely from scratch with custom effects, costs, and combat attacks.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn-add"
              onClick={() => addCustomAbility('spell')}
            >
              + Spell
            </button>
            <button
              type="button"
              className="btn-add"
              onClick={() => addCustomAbility('maneuver')}
            >
              + Maneuver
            </button>
          </div>
        </div>

        {/* Custom Abilities List */}
        <div className="ability-items-list">
          {(monsterData.customAbilities || []).length === 0 ? (
            <div className="empty-state">No custom abilities built yet. Click "+ Spell" or "+ Maneuver" to build.</div>
          ) : (
            (monsterData.customAbilities || []).map((ability, idx) => {
              const cardId = `custom-${idx}`;
              const isExpanded = expandedCard === cardId;
              return (
                <div key={idx} className={`ability-item-card ${isExpanded ? 'expanded' : ''}`}>
                  <div className="ability-card-header" onClick={() => toggleExpand(cardId)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={`ability-type-badge ${ability.type === 'spell' ? 'spell-badge' : 'maneuver-badge'}`}>
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
                            onChange={(e) => updateCustomAbility(idx, { ...ability, name: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Usage Time</label>
                          <select
                            value={ability.usageTime || 'Standard'}
                            onChange={(e) => updateCustomAbility(idx, { ...ability, usageTime: e.target.value })}
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
                            onChange={(e) => updateCustomAbility(idx, { ...ability, cost: e.target.value || undefined })}
                          />
                        </div>
                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', alignSelf: 'end', height: '38px' }}>
                          <label className="checkbox-row">
                            <input
                              type="checkbox"
                              checked={Boolean(ability.isMagical)}
                              onChange={(e) => updateCustomAbility(idx, { ...ability, isMagical: e.target.checked })}
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
                          onChange={(e) => updateCustomAbility(idx, { ...ability, effect: e.target.value || undefined })}
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
                              tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                            })
                          }
                        />
                      </div>

                      {/* Optional Attack Subform */}
                      <div className="card-subform" style={{ marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <h5 style={{ margin: '0' }}>Attack Details</h5>
                          <label className="checkbox-row" style={{ margin: '0' }}>
                            <input
                              type="checkbox"
                              checked={Boolean(ability.attack)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  updateCustomAbility(idx, {
                                    ...ability,
                                    attack: { targeting: 'Mental Defense', hit: 'The target is stunned.' },
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
                          <div className="attack-grid" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div className="form-group">
                              <label>Targeting (e.g. Brawn Defense, Reflex Defense)</label>
                              <input
                                type="text"
                                placeholder="e.g. Mental Defense"
                                value={ability.attack.targeting}
                                onChange={(e) =>
                                  updateCustomAbility(idx, {
                                    ...ability,
                                    attack: { ...(ability.attack!), targeting: e.target.value },
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
                                    attack: { ...(ability.attack!), hit: e.target.value },
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
                                      attack: { ...(ability.attack!), crit: e.target.value || null },
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
                                      attack: { ...(ability.attack!), miss: e.target.value || undefined },
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
                                      attack: { ...(ability.attack!), injury: e.target.value || undefined },
                                    })
                                  }
                                />
                              </div>
                              <div className="form-group" style={{ display: 'flex', alignItems: 'center', alignSelf: 'end', height: '38px' }}>
                                <label className="checkbox-row">
                                  <input
                                    type="checkbox"
                                    checked={Boolean(ability.attack.halfOnMiss)}
                                    onChange={(e) =>
                                      updateCustomAbility(idx, {
                                        ...ability,
                                        attack: { ...(ability.attack!), halfOnMiss: e.target.checked },
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

      {/* 5. PASSIVE ABILITIES SECTION */}
      <div className="ability-section-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div>
            <h4 className="section-subtitle" style={{ marginBottom: '0' }}>Passive Abilities</h4>
            <p className="section-description" style={{ marginBottom: '0' }}>
              Add custom passive features that apply static modifiers or ongoing effects to this creature.
            </p>
          </div>
          <button
            type="button"
            className="btn-add"
            onClick={addPassiveAbility}
          >
            + Add Passive
          </button>
        </div>

        {/* Passives List */}
        <div className="ability-items-list">
          {(monsterData.passiveAbilities || []).length === 0 ? (
            <div className="empty-state">No passive abilities built yet. Click "+ Add Passive" to build one.</div>
          ) : (
            (monsterData.passiveAbilities || []).map((passive, idx) => {
              const cardId = `passive-${idx}`;
              const isExpanded = expandedCard === cardId;
              return (
                <div key={idx} className={`ability-item-card ${isExpanded ? 'expanded' : ''}`}>
                  <div className="ability-card-header" onClick={() => toggleExpand(cardId)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="ability-type-badge passive-badge">PASSIVE</span>
                      <strong className="ability-name">{passive.name}</strong>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span className="expand-chevron">{isExpanded ? '▲' : '▼'}</span>
                      <button
                        type="button"
                        className="btn-delete-card"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePassiveAbility(idx);
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="ability-card-body">
                      <div className="form-grid">
                        <div className="form-group" style={{ flex: '2' }}>
                          <label>Passive Name</label>
                          <input
                            type="text"
                            value={passive.name}
                            onChange={(e) => updatePassiveAbility(idx, { ...passive, name: e.target.value })}
                          />
                        </div>
                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', alignSelf: 'end', height: '38px', flex: '1' }}>
                          <label className="checkbox-row">
                            <input
                              type="checkbox"
                              checked={Boolean(passive.isMagical)}
                              onChange={(e) => updatePassiveAbility(idx, { ...passive, isMagical: e.target.checked })}
                            />
                            Is Magical
                          </label>
                        </div>
                      </div>
                      <div className="form-group" style={{ marginTop: '15px' }}>
                        <label>Effect Description (LaTeX allowed)</label>
                        <textarea
                          rows={3}
                          placeholder="Describe the passive effect..."
                          value={passive.effect}
                          onChange={(e) => updatePassiveAbility(idx, { ...passive, effect: e.target.value })}
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

    </div>
  );
};
