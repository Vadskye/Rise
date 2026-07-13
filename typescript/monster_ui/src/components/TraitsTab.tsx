import React from 'react';
import { SharedEditableProperties } from '../types/monster';
import { PillListInput } from './PillListInput';
import { RISE_TRAITS } from '@src/character_sheet/rise_data';

// Note: Standard traits in original code were:
// 'amphibious', 'blooded', 'bloodless', 'corporeal', 'dynamic', 'ensouled', 'floating',
// 'immortal', 'incorporeal', 'invisible', 'legless', 'living', 'mindless', 'mortal',
// 'quadrupedal', 'multipedal', 'nonliving', 'scent', 'sighted', 'sightless', 'simple-minded',
// 'soulless', 'static', 'swarm', 'telepathy'
// Wait, let's verify if there were any others. Let's make sure the array matches exactly the original one.
// Let's re-read the original STANDARD_TRAITS:
//   const STANDARD_TRAITS = [
//     'amphibious',
//     'blooded',
//     'bloodless',
//     'corporeal',
//     'dynamic',
//     'ensouled',
//     'floating',
//     'immortal',
//     'incorporeal',
//     'invisible',
//     'legless',
//     'living',
//     'mindless',
//     'mortal',
//     'quadrupedal',  Wait! In the original code, 'quadrupedal' was line 322, let's check order:
//     'quadrupedal', 'multipedal', 'nonliving', 'scent', 'sighted', 'sightless', 'simple-minded', 'soulless', 'static', 'swarm', 'telepathy'
// Let's copy it exactly to be completely safe.
// Original list:
//     'amphibious',
//     'blooded',
//     'bloodless',
//     'corporeal',
//     'dynamic',
//     'ensouled',
//     'floating',
//     'immortal',
//     'incorporeal',
//     'invisible',
//     'legless',
//     'living',
//     'mindless',
//     'mortal',
//     'quadrupedal',
//     'multipedal',
//     'nonliving',
//     'scent',
//     'sighted',
//     'sightless',
//     'simple-minded',
//     'soulless',
//     'static',
//     'swarm',
//     'telepathy',
// Wait, let's look at lines 305 to 331 of MonsterForm.tsx:
// 305:   const STANDARD_TRAITS = [
// 306:     'amphibious',
// 307:     'blooded',
// 308:     'bloodless',
// 309:     'corporeal',
// 310:     'dynamic',
// 311:     'ensouled',
// 312:     'floating',
// 313:     'immortal',
// 314:     'incorporeal',
// 315:     'invisible',
// 316:     'legless',
// 317:     'living',
// 318:     'mindless',
// 319:     'mortal',
// 320:     'multipedal',
// 321:     'nonliving',
// 322:     'quadrupedal',
// 323:     'scent',
// 324:     'sighted',
// 325:     'sightless',
// 326:     'simple-minded',
// 327:     'soulless',
// 328:     'static',
// 329:     'swarm',
// 330:     'telepathy',
// 331:   ];
// Ah! 'multipedal' was 320, 'nonliving' was 321, 'quadrupedal' was 322. Let's make sure the list is identical.
// Yes, let's order them exactly as in the original code, just in case!

interface TraitsTabProps<T extends SharedEditableProperties> {
  monsterData: T;
  onChangeMonster: (updated: T) => void;
}

export const TraitsTab = <T extends SharedEditableProperties>({
  monsterData,
  onChangeMonster,
}: TraitsTabProps<T>) => {
  const [traitSearch, setTraitSearch] = React.useState('');

  const traits = monsterData.traits || [];
  const toggleTrait = (trait: string) => {
    const newTraits = traits.includes(trait)
      ? traits.filter((t) => t !== trait)
      : [...traits, trait];
    onChangeMonster({
      ...monsterData,
      traits: newTraits,
    });
  };

  const standardTraits = Array.from(RISE_TRAITS);

  return (
    <div className="tab-content">
      <h4 className="section-subtitle">Standard Traits</h4>
      <div className="form-group search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search traits..."
          value={traitSearch}
          onChange={(e) => setTraitSearch(e.target.value)}
        />
      </div>
      <div className="traits-grid">
        {standardTraits
          .filter((t) => t.includes(traitSearch.toLowerCase()))
          .map((trait) => (
            <div
              key={trait}
              className="form-checkbox-row"
            >
              <input
                id={`trait-${trait}`}
                type="checkbox"
                checked={traits.includes(trait)}
                onChange={() => toggleTrait(trait)}
              />
              <label
                htmlFor={`trait-${trait}`}
                className={traits.includes(trait) ? 'checked' : ''}
              >
                {trait}
              </label>
            </div>
          ))}
      </div>

      <h4 className="section-subtitle">Senses & Movement</h4>
      <PillListInput
        label="Custom Senses"
        className="mb-15"
        items={monsterData.customSenses || []}
        onChange={(updated) => onChangeMonster({ ...monsterData, customSenses: updated })}
        placeholder="e.g. Darkvision (60 ft.)"
        emptyMessage="No custom senses added (defaults to Normal Senses)."
      />

      <PillListInput
        label="Custom Movement Speeds"
        items={monsterData.customMovementSpeeds || []}
        onChange={(updated) => onChangeMonster({ ...monsterData, customMovementSpeeds: updated })}
        placeholder="e.g. Fly 30 ft."
        emptyMessage="No custom movement speeds added (defaults to ground speed)."
      />
    </div>
  );
};
