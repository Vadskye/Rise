import React from 'react';
import { PassiveAbilityConfig } from '../../types/monster';

interface PassiveAbilitiesSectionProps {
  passiveAbilities: PassiveAbilityConfig[];
  onChange: (updatedPassives: PassiveAbilityConfig[]) => void;
  expandedCard: string | null;
  onToggleExpand: (cardId: string) => void;
  setExpandedCard: (cardId: string | null) => void;
}

export const PassiveAbilitiesSection: React.FC<PassiveAbilitiesSectionProps> = ({
  passiveAbilities,
  onChange,
  expandedCard,
  onToggleExpand,
  setExpandedCard,
}) => {
  const addPassiveAbility = () => {
    const newPassive: PassiveAbilityConfig = {
      name: 'New Passive Ability',
      effect: '',
      isMagical: false,
    };
    const updated = [...passiveAbilities, newPassive];
    onChange(updated);
    setExpandedCard(`passive-${updated.length - 1}`);
  };

  const removePassiveAbility = (index: number) => {
    const updated = passiveAbilities.filter((_, i) => i !== index);
    onChange(updated);
    if (expandedCard === `passive-${index}`) setExpandedCard(null);
  };

  const updatePassiveAbility = (index: number, updatedPassive: PassiveAbilityConfig) => {
    const updated = passiveAbilities.map((a, i) => (i === index ? updatedPassive : a));
    onChange(updated);
  };

  return (
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
        {passiveAbilities.length === 0 ? (
          <div className="empty-state">No passive abilities built yet. Click "+ Add Passive" to build one.</div>
        ) : (
          passiveAbilities.map((passive, idx) => {
            const cardId = `passive-${idx}`;
            const isExpanded = expandedCard === cardId;
            return (
              <div key={idx} className={`ability-item-card ${isExpanded ? 'expanded' : ''}`}>
                <div className="ability-card-header" onClick={() => onToggleExpand(cardId)}>
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
  );
};
