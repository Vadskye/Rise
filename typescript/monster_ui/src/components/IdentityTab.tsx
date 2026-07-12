import React from 'react';
import { MonsterData } from '../types/monster';

interface IdentityTabProps {
  monsterData: MonsterData;
  onChangeMonster: (updated: MonsterData) => void;
  errors: string[];
  warnings: string[];
}

export const IdentityTab: React.FC<IdentityTabProps> = ({
  monsterData,
  onChangeMonster,
  errors,
  warnings,
}) => {
  const { requiredProperties } = monsterData;

  const setProp = <K extends keyof typeof requiredProperties>(
    key: K,
    value: (typeof requiredProperties)[K],
  ) => {
    onChangeMonster({
      ...monsterData,
      requiredProperties: {
        ...requiredProperties,
        [key]: value,
      },
    });
  };

  const properties = monsterData.properties || {};
  const setMiscProperty = (key: string, val: string | number | boolean) => {
    onChangeMonster({
      ...monsterData,
      properties: {
        ...properties,
        [key]: val,
      },
    });
  };

  const getInlineError = (field: string) => {
    const match = errors.find((e) => e.toLowerCase().includes(field.toLowerCase()));
    return match || null;
  };

  const getInlineWarning = (field: string) => {
    const match = warnings.find((w) => w.toLowerCase().includes(field.toLowerCase()));
    return match || null;
  };

  return (
    <div className="tab-content">
      <div className="form-group">
        <label htmlFor="monster-name">Monster Name</label>
        <input
          id="monster-name"
          data-testid="monster-name-input"
          type="text"
          value={monsterData.name}
          onChange={(e) => onChangeMonster({ ...monsterData, name: e.target.value })}
          placeholder="e.g. Corpsetree"
        />
        {getInlineError('name') && (
          <div className="inline-error">❌ {getInlineError('name')}</div>
        )}
        {getInlineWarning('name') && (
          <div className="inline-warning">⚠️ {getInlineWarning('name')}</div>
        )}
      </div>

      <div className="form-row-grid">
        <div className="form-group">
          <label htmlFor="alignment">Alignment</label>
          <select
            id="alignment"
            data-testid="alignment-select"
            value={requiredProperties.alignment}
            onChange={(e) => setProp('alignment', e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="lawful good">Lawful Good</option>
            <option value="neutral good">Neutral Good</option>
            <option value="chaotic good">Chaotic Good</option>
            <option value="lawful neutral">Lawful Neutral</option>
            <option value="neutral">Neutral</option>
            <option value="chaotic neutral">Chaotic Neutral</option>
            <option value="lawful evil">Lawful Evil</option>
            <option value="neutral evil">Neutral Evil</option>
            <option value="chaotic evil">Chaotic Evil</option>
          </select>
          {getInlineError('alignment') && (
            <div className="inline-error">❌ {getInlineError('alignment')}</div>
          )}
          {getInlineWarning('alignment') && (
            <div className="inline-warning">⚠️ {getInlineWarning('alignment')}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="base_class">Base Class</label>
          <select
            id="base_class"
            data-testid="base-class-select"
            value={requiredProperties.base_class}
            onChange={(e) => setProp('base_class', e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="brute">Brute</option>
            <option value="leader">Leader</option>
            <option value="skirmisher">Skirmisher</option>
            <option value="sniper">Sniper</option>
            <option value="warrior">Warrior</option>
            <option value="barbarian">Barbarian</option>
            <option value="cleric">Cleric</option>
            <option value="druid">Druid</option>
            <option value="fighter">Fighter</option>
            <option value="monk">Monk</option>
            <option value="paladin">Paladin</option>
            <option value="ranger">Ranger</option>
            <option value="rogue">Rogue</option>
            <option value="sorcerer">Sorcerer</option>
            <option value="votive">Votive</option>
            <option value="wizard">Wizard</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="level">Level</label>
          <input
            id="level"
            data-testid="level-input"
            type="number"
            min={1}
            max={30}
            value={requiredProperties.level}
            onChange={(e) => setProp('level', parseInt(e.target.value) || 1)}
          />
        </div>
      </div>

      <div className="form-row-grid">
        <div className="form-group">
          <label htmlFor="creature_origin">Origin</label>
          <select
            id="creature_origin"
            data-testid="origin-select"
            value={requiredProperties.creature_origin}
            onChange={(e) => setProp('creature_origin', e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="artificial">Artificial</option>
            <option value="natural">Natural</option>
            <option value="undead">Undead</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="creature_type">Type</label>
          <select
            id="creature_type"
            data-testid="type-select"
            value={requiredProperties.creature_type}
            onChange={(e) => setProp('creature_type', e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="aberration">Aberration</option>
            <option value="animal">Animal</option>
            <option value="beast">Beast</option>
            <option value="construct">Construct</option>
            <option value="dragon">Dragon</option>
            <option value="fey">Fey</option>
            <option value="ghost">Ghost</option>
            <option value="humanoid">Humanoid</option>
            <option value="indwelt">Indwelt</option>
            <option value="insect">Insect</option>
            <option value="ooze">Ooze</option>
            <option value="plant">Plant</option>
            <option value="soulforged">Soulforged</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="size">Size</label>
          <select
            id="size"
            data-testid="size-select"
            value={requiredProperties.size}
            onChange={(e) => setProp('size', e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="fine">Fine</option>
            <option value="diminutive">Diminutive</option>
            <option value="tiny">Tiny</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="huge">Huge</option>
            <option value="gargantuan">Gargantuan</option>
            <option value="colossal">Colossal</option>
          </select>
        </div>
      </div>

      <div className="form-row-grid" style={{ marginTop: '10px' }}>
        <div className="form-checkbox-row">
          <input
            id="elite"
            type="checkbox"
            checked={requiredProperties.elite}
            onChange={(e) => setProp('elite', e.target.checked)}
          />
          <label htmlFor="elite">Elite Monster</label>
        </div>

        <div className="form-checkbox-row">
          <input
            id="has_art"
            type="checkbox"
            checked={Boolean(properties.has_art)}
            onChange={(e) => setMiscProperty('has_art', e.target.checked)}
          />
          <label htmlFor="has_art">Monster Has Art</label>
        </div>
      </div>
    </div>
  );
};
