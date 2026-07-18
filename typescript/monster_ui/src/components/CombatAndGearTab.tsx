import { SharedEditableProperties } from '../types/monster';
import { PillListInput } from './PillListInput';
import { BODY_ARMORS, SHIELDS } from '@src/monsters/equipment';

const STANDARD_ARMORS = Array.from(BODY_ARMORS);

const STANDARD_SHIELDS = Array.from(SHIELDS);

interface CombatTabProps<T extends SharedEditableProperties> {
  monsterData: T;
  onChangeMonster: (updated: T) => void;
}

export const CombatAndGearTab = <T extends SharedEditableProperties>({
  monsterData,
  onChangeMonster,
}: CombatTabProps<T>) => {
  return (
    <div className="tab-content">
      <h4 className="section-subtitle">Equipment</h4>
      <div className="equipment-row">
        <div className="form-group equipment-col">
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

        <div className="form-group equipment-col">
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
        className="mb-15"
        items={monsterData.immunities || []}
        onChange={(updated) => onChangeMonster({ ...monsterData, immunities: updated })}
        placeholder="e.g. Fire"
        emptyMessage="No immunities."
      />

      <PillListInput
        label="Resistances"
        className="mb-15"
        items={monsterData.resistances || []}
        onChange={(updated) => onChangeMonster({ ...monsterData, resistances: updated })}
        placeholder="e.g. Cold"
        emptyMessage="No resistances."
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
