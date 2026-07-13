import { useState } from 'react';
import { SharedEditableProperties } from '../types/monster';
import { RitualsSection } from './abilities/RitualsSection';

import { StandardAbilitiesSection } from './abilities/StandardAbilitiesSection';
import { CustomAbilitiesSection } from './abilities/CustomAbilitiesSection';
import { PassiveAbilitiesSection } from './abilities/PassiveAbilitiesSection';

interface ReferenceData {
  spells: string[];
  maneuvers: string[];
  weapons: string[];
  spheres: string[];
}

interface AbilitiesTabProps<T extends SharedEditableProperties> {
  monsterData: T;
  onChangeMonster: (updated: T) => void;
  referenceData: ReferenceData;
  warnings?: string[];
}

export const AbilitiesTab = <T extends SharedEditableProperties>({
  monsterData,
  onChangeMonster,
  referenceData,
  warnings = [],
}: AbilitiesTabProps<T>) => {
  // Local state for expanded cards (maps to "type-index" e.g., "custom-0", "weapon-1")
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const updateField = <K extends keyof T>(key: K, value: T[K]) => {
    onChangeMonster({
      ...monsterData,
      [key]: value,
    });
  };

  return (
    <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* 2. STANDARD SPELLS & MANEUVERS SECTION */}
      <StandardAbilitiesSection
        standardAbilities={monsterData.standardAbilities || []}
        referenceSpells={referenceData.spells}
        referenceManeuvers={referenceData.maneuvers}
        referenceWeapons={referenceData.weapons}
        onChange={(updated) => updateField('standardAbilities', updated)}
        expandedCard={expandedCard}
        onToggleExpand={toggleExpand}
        setExpandedCard={setExpandedCard}
        warnings={warnings}
      />

      {/* 3. CUSTOM ABILITIES SECTION */}
      <CustomAbilitiesSection
        customAbilities={monsterData.customAbilities || []}
        onChange={(updated) => updateField('customAbilities', updated)}
        expandedCard={expandedCard}
        onToggleExpand={toggleExpand}
        setExpandedCard={setExpandedCard}
      />

      {/* 4. PASSIVE ABILITIES SECTION */}
      <PassiveAbilitiesSection
        passiveAbilities={monsterData.passiveAbilities || []}
        onChange={(updated) => updateField('passiveAbilities', updated)}
        expandedCard={expandedCard}
        onToggleExpand={toggleExpand}
        setExpandedCard={setExpandedCard}
      />

      {/* 5. RITUALS SECTION */}
      <RitualsSection
        rituals={monsterData.rituals || []}
        spheres={referenceData.spheres}
        onChange={(updated) => updateField('rituals', updated)}
      />
    </div>
  );
};
