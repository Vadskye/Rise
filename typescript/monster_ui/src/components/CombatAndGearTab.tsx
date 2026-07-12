import React from 'react';
import { MonsterData } from '../types/monster';
import { PillListInput } from './PillListInput';

const STANDARD_ARMORS = [
  'buff leather',
  'mail shirt',
  'rawhide',
  'leather lamellar',
  'scale',
  'brigandine',
  'breastplate',
  'half plate',
  'full plate',
  'mage armor',
  'ki barrier',
];

const STANDARD_SHIELDS = ['buckler', 'standard shield', 'tower shield'];

interface CombatTabProps {
  monsterData: MonsterData;
  onChangeMonster: (updated: MonsterData) => void;
}

export const CombatAndGearTab: React.FC<CombatTabProps> = ({ monsterData, onChangeMonster }) => {
  return (
    <div className="tab-content">
      <h4 className="section-subtitle">Equipment</h4>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label htmlFor="equipped-armor">Equipped Armor</label>
          <select
            id="equipped-armor"
            value={monsterData.equippedArmor || ''}
            onChange={(e) =>
              onChangeMonster({ ...monsterData, equippedArmor: e.target.value || undefined })
            }
          >
            <option value="">-- None --</option>
            {STANDARD_ARMORS.map((arm) => (
              <option key={arm} value={arm}>
                {arm.charAt(0).toUpperCase() + arm.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label htmlFor="equipped-shield">Equipped Shield</label>
          <select
            id="equipped-shield"
            value={monsterData.equippedShield || ''}
            onChange={(e) =>
              onChangeMonster({ ...monsterData, equippedShield: e.target.value || undefined })
            }
          >
            <option value="">-- None --</option>
            {STANDARD_SHIELDS.map((shld) => (
              <option key={shld} value={shld}>
                {shld.charAt(0).toUpperCase() + shld.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h4 className="section-subtitle">Defenses & Modifiers</h4>

      <PillListInput
        label="Immunities"
        items={monsterData.immunities || []}
        onChange={(updated) => onChangeMonster({ ...monsterData, immunities: updated })}
        placeholder="e.g. Fire"
        emptyMessage="No immunities."
        style={{ marginBottom: '15px' }}
      />

      <PillListInput
        label="Resistances"
        items={monsterData.resistances || []}
        onChange={(updated) => onChangeMonster({ ...monsterData, resistances: updated })}
        placeholder="e.g. Cold"
        emptyMessage="No resistances."
        style={{ marginBottom: '15px' }}
      />

      <PillListInput
        label="Vulnerabilities"
        items={monsterData.vulnerabilities || []}
        onChange={(updated) => onChangeMonster({ ...monsterData, vulnerabilities: updated })}
        placeholder="e.g. Acid"
        emptyMessage="No vulnerabilities."
      />
    </div>
  );
};
