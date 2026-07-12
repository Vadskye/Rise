import React from 'react';
import { MonsterData, MonsterGroupData } from '../types/monster';
import { AbilitiesTab } from './AbilitiesTab';
import { IdentityTab } from './IdentityTab';
import { StatsTab } from './StatsTab';
import { TraitsTab } from './TraitsTab';
import { CombatTab } from './CombatTab';
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

  if (mode === 'group' && groupData && onChangeGroup) {
    return (
      <GroupForm
        groupData={groupData}
        onChangeGroup={onChangeGroup}
        errors={errors}
        warnings={warnings}
      />
    );
  }

  if (mode === 'monster' && monsterData && onChangeMonster) {
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
            Identity
          </button>
          <button
            type="button"
            data-testid="tab-btn-stats"
            className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            Attributes & Skills
          </button>
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
          <button
            type="button"
            data-testid="tab-btn-knowledge"
            className={`tab-btn ${activeTab === 'knowledge' ? 'active' : ''}`}
            onClick={() => setActiveTab('knowledge')}
          >
            Knowledge & Script
          </button>
        </div>

        {/* Tab 1: Identity */}
        {activeTab === 'identity' && (
          <IdentityTab
            monsterData={monsterData}
            onChangeMonster={onChangeMonster}
            errors={errors}
            warnings={warnings}
          />
        )}

        {/* Tab 2: Attributes & Skills */}
        {activeTab === 'stats' && (
          <StatsTab
            monsterData={monsterData}
            onChangeMonster={onChangeMonster}
          />
        )}

        {/* Tab 3: Traits & Senses */}
        {activeTab === 'traits' && (
          <TraitsTab
            monsterData={monsterData}
            onChangeMonster={onChangeMonster}
          />
        )}

        {/* Tab 4: Combat & Gear */}
        {activeTab === 'combat' && (
          <CombatTab
            monsterData={monsterData}
            onChangeMonster={onChangeMonster}
          />
        )}

        {/* Tab: Spells & Abilities */}
        {activeTab === 'abilities' && (
          <AbilitiesTab
            monsterData={monsterData}
            onChangeMonster={onChangeMonster}
            referenceData={referenceData}
            warnings={warnings}
          />
        )}

        {/* Tab 5: Knowledge & Script */}
        {activeTab === 'knowledge' && (
          <KnowledgeTab
            monsterData={monsterData}
            onChangeMonster={onChangeMonster}
          />
        )}
      </div>
    );
  }

  return null;
};
