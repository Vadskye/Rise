import React from 'react';
import { MonsterData, MonsterGroupData } from '../types/monster';
import { AbilitiesTab } from './AbilitiesTab';
import { IdentityTab } from './IdentityTab';
import { AttributesAndSkillsTab } from './AttributesAndSkillsTab';
import { TraitsTab } from './TraitsTab';
import { CombatAndGearTab } from './CombatAndGearTab';
import { KnowledgeTab } from './KnowledgeTab';
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
}) => {
  // Design Decisions:
  // 1. Tabbed Layout: Rather than presenting a giant list of inputs that is overwhelming and hard
  //    to navigate, we group fields into logical tabs: Identity, Attributes & Skills, Traits & Senses,
  //    Combat & Gear, and Knowledge & Script.
  // 2. Local Tag Input State: Incomplete inputs for array fields (senses, movement speeds, defenses)
  //    are kept in local component states (e.g. `newSense`, `newSpeed`) and only committed to the
  //    parent state via `onChangeMonster` once the user clicks "+ Add" or presses Enter. This ensures
  //    we don't trigger the game-engine validation pipeline for partial, half-typed tags.
  const [activeTab, setActiveTab] = React.useState<
    'identity' | 'stats' | 'traits' | 'combat' | 'knowledge' | 'abilities'
  >('identity');

  React.useEffect(() => {
    setActiveTab('identity');
  }, [mode]);

  const isGroup = mode === 'group';

  const handleGroupFieldsChange = (updatedMonsterFields: MonsterData) => {
    if (onChangeGroup && groupData) {
      onChangeGroup({
        ...groupData,
        traits: updatedMonsterFields.traits,
        customSenses: updatedMonsterFields.customSenses,
        customMovementSpeeds: updatedMonsterFields.customMovementSpeeds,
        equippedArmor: updatedMonsterFields.equippedArmor,
        equippedShield: updatedMonsterFields.equippedShield,
        immunities: updatedMonsterFields.immunities,
        resistances: updatedMonsterFields.resistances,
        vulnerabilities: updatedMonsterFields.vulnerabilities,
        weapons: updatedMonsterFields.weapons,
        standardAbilities: updatedMonsterFields.standardAbilities,
        customAbilities: updatedMonsterFields.customAbilities,
        passiveAbilities: updatedMonsterFields.passiveAbilities,
        rituals: updatedMonsterFields.rituals,
      });
    }
  };

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
        {!isGroup && (
          <button
            type="button"
            data-testid="tab-btn-knowledge"
            className={`tab-btn ${activeTab === 'knowledge' ? 'active' : ''}`}
            onClick={() => setActiveTab('knowledge')}
          >
            Knowledge & Script
          </button>
        )}
      </div>

      {/* Tab 1: Identity / Group Settings */}
      {activeTab === 'identity' && (
        isGroup && groupData && onChangeGroup ? (
          <GroupForm
            groupData={groupData}
            onChangeGroup={onChangeGroup}
            errors={errors}
            warnings={warnings}
          />
        ) : monsterData && onChangeMonster ? (
          <IdentityTab
            monsterData={monsterData}
            onChangeMonster={onChangeMonster}
            errors={errors}
            warnings={warnings}
          />
        ) : null
      )}

      {/* Tab 2: Attributes & Skills */}
      {activeTab === 'stats' && !isGroup && monsterData && onChangeMonster && (
        <AttributesAndSkillsTab
          monsterData={monsterData}
          onChangeMonster={onChangeMonster}
        />
      )}

      {/* Tab 3: Traits & Senses */}
      {activeTab === 'traits' && (
        isGroup && groupData && onChangeGroup ? (
          <TraitsTab
            monsterData={groupData as unknown as MonsterData}
            onChangeMonster={handleGroupFieldsChange}
          />
        ) : monsterData && onChangeMonster ? (
          <TraitsTab
            monsterData={monsterData}
            onChangeMonster={onChangeMonster}
          />
        ) : null
      )}

      {/* Tab 4: Combat & Gear */}
      {activeTab === 'combat' && (
        isGroup && groupData && onChangeGroup ? (
          <CombatAndGearTab
            monsterData={groupData as unknown as MonsterData}
            onChangeMonster={handleGroupFieldsChange}
          />
        ) : monsterData && onChangeMonster ? (
          <CombatAndGearTab
            monsterData={monsterData}
            onChangeMonster={onChangeMonster}
          />
        ) : null
      )}

      {/* Tab: Spells & Abilities */}
      {activeTab === 'abilities' && (
        isGroup && groupData && onChangeGroup ? (
          <AbilitiesTab
            monsterData={groupData as unknown as MonsterData}
            onChangeMonster={handleGroupFieldsChange}
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
        ) : null
      )}

      {/* Tab 5: Knowledge & Script */}
      {activeTab === 'knowledge' && !isGroup && monsterData && onChangeMonster && (
        <KnowledgeTab
          monsterData={monsterData}
          onChangeMonster={onChangeMonster}
          warnings={warnings}
        />
      )}
    </div>
  );

  return null;
};
