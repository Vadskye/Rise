import React from 'react';
import { MonsterData, MonsterGroupData } from '../types/monster';
import { AbilitiesTab } from './AbilitiesTab';
import { IdentityTab } from './IdentityTab';
import { AttributesAndSkillsTab } from './AttributesAndSkillsTab';
import { TraitsTab } from './TraitsTab';
import { CombatAndGearTab } from './CombatAndGearTab';
import { GroupForm } from './GroupForm';

interface MonsterFormProps {
  mode: 'monster' | 'group';
  monsterData?: MonsterData;
  groupData?: MonsterGroupData;
  onChangeMonster?: (updated: MonsterData) => void;
  onChangeGroup?: (updated: MonsterGroupData) => void;
  errors: string[];
  warnings: string[];
  referenceData?: {
    spells: string[];
    maneuvers: string[];
    weapons: string[];
    spheres: string[];
  };
  folders?: string[];
}

export const MonsterForm: React.FC<MonsterFormProps> = ({
  mode,
  monsterData,
  groupData,
  onChangeMonster,
  onChangeGroup,
  errors,
  warnings,
  referenceData = { spells: [], maneuvers: [], weapons: [], spheres: [] },
  folders = [],
}) => {
  // Design Decisions:
  // 1. Tabbed Layout: Rather than presenting a giant list of inputs that is overwhelming and hard
  //    to navigate, we group fields into logical tabs: Identity (including Knowledge & Script),
  //    Attributes & Skills, Traits & Senses, Combat & Gear, and Spells & Abilities.
  // 2. Local Tag Input State: Incomplete inputs for array fields (senses, movement speeds, defenses)
  //    are kept in local component states (e.g. `newSense`, `newSpeed`) and only committed to the
  //    parent state via `onChangeMonster` once the user clicks "+ Add" or presses Enter. This ensures
  //    we don't trigger the game-engine validation pipeline for partial, half-typed tags.
  const [activeTab, setActiveTab] = React.useState<
    'identity' | 'stats' | 'traits' | 'combat' | 'abilities'
  >('identity');

  React.useEffect(() => {
    setActiveTab('identity');
  }, [mode]);

  const isGroup = mode === 'group';

  if (isGroup && !groupData) {
    return null;
  }
  if (!isGroup && !monsterData) {
    return null;
  }

  return (
    <div className="editor-scroll">
      {/* Navigation Tabs */}
      <div className="form-tabs">
        <button
          type="button"
          data-testid="tab-btn-identity"
          className={`tab-btn ${activeTab === 'identity' ? 'active' : ''}`}
          onClick={() => setActiveTab('identity')}
        >
          {isGroup ? 'Group Settings' : 'Identity'}
        </button>
        {!isGroup && (
          <button
            type="button"
            data-testid="tab-btn-stats"
            className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            Attributes & Skills
          </button>
        )}
        <button
          type="button"
          data-testid="tab-btn-traits"
          className={`tab-btn ${activeTab === 'traits' ? 'active' : ''}`}
          onClick={() => setActiveTab('traits')}
        >
          Traits & Senses
        </button>
        <button
          type="button"
          data-testid="tab-btn-combat"
          className={`tab-btn ${activeTab === 'combat' ? 'active' : ''}`}
          onClick={() => setActiveTab('combat')}
        >
          Combat & Gear
        </button>
        <button
          type="button"
          data-testid="tab-btn-abilities"
          className={`tab-btn ${activeTab === 'abilities' ? 'active' : ''}`}
          onClick={() => setActiveTab('abilities')}
        >
          Spells & Abilities
        </button>
      </div>

      {/* Tab 1: Identity / Group Settings */}
      {activeTab === 'identity' &&
        (isGroup && groupData && onChangeGroup ? (
          <GroupForm
            groupData={groupData}
            onChangeGroup={onChangeGroup}
            errors={errors}
            warnings={warnings}
            folders={folders}
          />
        ) : monsterData && onChangeMonster ? (
          <IdentityTab
            monsterData={monsterData}
            onChangeMonster={onChangeMonster}
            errors={errors}
            warnings={warnings}
            folders={folders}
          />
        ) : null)}

      {/* Tab 2: Attributes & Skills */}
      {activeTab === 'stats' && !isGroup && monsterData && onChangeMonster && (
        <AttributesAndSkillsTab monsterData={monsterData} onChangeMonster={onChangeMonster} />
      )}

      {/* Tab 3: Traits & Senses */}
      {activeTab === 'traits' &&
        (isGroup && groupData && onChangeGroup ? (
          <TraitsTab monsterData={groupData} onChangeMonster={onChangeGroup} />
        ) : monsterData && onChangeMonster ? (
          <TraitsTab monsterData={monsterData} onChangeMonster={onChangeMonster} />
        ) : null)}

      {/* Tab 4: Combat & Gear */}
      {activeTab === 'combat' &&
        (isGroup && groupData && onChangeGroup ? (
          <CombatAndGearTab monsterData={groupData} onChangeMonster={onChangeGroup} />
        ) : monsterData && onChangeMonster ? (
          <CombatAndGearTab monsterData={monsterData} onChangeMonster={onChangeMonster} />
        ) : null)}

      {/* Tab: Spells & Abilities */}
      {activeTab === 'abilities' &&
        (isGroup && groupData && onChangeGroup ? (
          <AbilitiesTab
            monsterData={groupData}
            onChangeMonster={onChangeGroup}
            referenceData={referenceData}
            warnings={warnings}
          />
        ) : monsterData && onChangeMonster ? (
          <AbilitiesTab
            monsterData={monsterData}
            onChangeMonster={onChangeMonster}
            referenceData={referenceData}
            warnings={warnings}
          />
        ) : null)}
    </div>
  );

  return null;
};
