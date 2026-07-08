import React from 'react';
import { MonsterData, MonsterGroupData } from '../types/monster';

interface MonsterFormProps {
  mode: 'monster' | 'group';
  monsterData?: MonsterData;
  groupData?: MonsterGroupData;
  onChangeMonster?: (updated: MonsterData) => void;
  onChangeGroup?: (updated: MonsterGroupData) => void;
  errors: string[];
  warnings: string[];
}

export const MonsterForm: React.FC<MonsterFormProps> = ({
  mode,
  monsterData,
  groupData,
  onChangeMonster,
  onChangeGroup,
  errors,
  warnings,
}) => {
  // Categorize errors/warnings for inline display
  const getInlineError = (field: string) => {
    const match = errors.find((e) => e.toLowerCase().includes(field.toLowerCase()));
    return match || null;
  };

  const getInlineWarning = (field: string) => {
    const match = warnings.find((w) => w.toLowerCase().includes(field.toLowerCase()));
    return match || null;
  };

  if (mode === 'group' && groupData && onChangeGroup) {
    return (
      <div className="editor-scroll">
        <div className="form-group">
          <label htmlFor="group-name">Group Name</label>
          <input
            id="group-name"
            type="text"
            value={groupData.name}
            onChange={(e) => onChangeGroup({ ...groupData, name: e.target.value })}
          />
          {getInlineError('name') && <div className="inline-error">❌ {getInlineError('name')}</div>}
          {getInlineWarning('name') && <div className="inline-warning">⚠️ {getInlineWarning('name')}</div>}
        </div>

        <div className="form-checkbox-row">
          <input
            id="group-art"
            type="checkbox"
            checked={groupData.hasArt}
            onChange={(e) => onChangeGroup({ ...groupData, hasArt: e.target.checked })}
          />
          <label htmlFor="group-art">Group Has Art</label>
        </div>

        <div className="form-group">
          <label htmlFor="group-desc">Group Description</label>
          <textarea
            id="group-desc"
            rows={3}
            value={groupData.description || ''}
            onChange={(e) => onChangeGroup({ ...groupData, description: e.target.value || undefined })}
            placeholder="Introduce the monster family..."
          />
        </div>

        <div className="form-group">
          <label>Group Knowledge Table</label>
          <div className="form-row-grid" style={{ marginTop: '5px' }}>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Normal</label>
              <textarea
                rows={3}
                value={groupData.knowledge?.normal || ''}
                onChange={(e) =>
                  onChangeGroup({
                    ...groupData,
                    knowledge: { ...groupData.knowledge, normal: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Hard</label>
              <textarea
                rows={3}
                value={groupData.knowledge?.hard || ''}
                onChange={(e) =>
                  onChangeGroup({
                    ...groupData,
                    knowledge: { ...groupData.knowledge, hard: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Legendary</label>
              <textarea
                rows={3}
                value={groupData.knowledge?.legendary || ''}
                onChange={(e) =>
                  onChangeGroup({
                    ...groupData,
                    knowledge: { ...groupData.knowledge, legendary: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="group-shared-code">Shared Freeform Code (runs for all monsters in group)</label>
          <textarea
            id="group-shared-code"
            className="code-textarea"
            value={groupData.sharedFreeformCode}
            onChange={(e) => onChangeGroup({ ...groupData, sharedFreeformCode: e.target.value })}
            placeholder="e.target.addCustomSense('Darkvision (90 ft.)');"
          />
        </div>
      </div>
    );
  }

  if (mode === 'monster' && monsterData && onChangeMonster) {
    const { requiredProperties } = monsterData;

    const setProp = (key: keyof typeof requiredProperties, value: any) => {
      onChangeMonster({
        ...monsterData,
        requiredProperties: {
          ...requiredProperties,
          [key]: value,
        },
      });
    };

    return (
      <div className="editor-scroll">
        {/* Name */}
        <div className="form-group">
          <label htmlFor="monster-name">Monster Name</label>
          <input
            id="monster-name"
            type="text"
            value={monsterData.name}
            onChange={(e) => onChangeMonster({ ...monsterData, name: e.target.value })}
            placeholder="e.g. Corpsetree"
          />
          {getInlineError('name') && <div className="inline-error">❌ {getInlineError('name')}</div>}
          {getInlineWarning('name') && <div className="inline-warning">⚠️ {getInlineWarning('name')}</div>}
        </div>

        {/* Required Properties Grid */}
        <div className="form-row-grid">
          {/* Alignment */}
          <div className="form-group">
            <label htmlFor="alignment">Alignment</label>
            <select
              id="alignment"
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
            {getInlineError('alignment') && <div className="inline-error">❌ {getInlineError('alignment')}</div>}
            {getInlineWarning('alignment') && <div className="inline-warning">⚠️ {getInlineWarning('alignment')}</div>}
          </div>

          {/* Base Class */}
          <div className="form-group">
            <label htmlFor="base_class">Base Class</label>
            <select
              id="base_class"
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

          {/* Level */}
          <div className="form-group">
            <label htmlFor="level">Level</label>
            <input
              id="level"
              type="number"
              min={1}
              max={30}
              value={requiredProperties.level}
              onChange={(e) => setProp('level', parseInt(e.target.value) || 1)}
            />
          </div>
        </div>

        <div className="form-row-grid">
          {/* Origin */}
          <div className="form-group">
            <label htmlFor="creature_origin">Origin</label>
            <select
              id="creature_origin"
              value={requiredProperties.creature_origin}
              onChange={(e) => setProp('creature_origin', e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="artificial">Artificial</option>
              <option value="natural">Natural</option>
              <option value="undead">Undead</option>
            </select>
          </div>

          {/* Type */}
          <div className="form-group">
            <label htmlFor="creature_type">Type</label>
            <select
              id="creature_type"
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

          {/* Size */}
          <div className="form-group">
            <label htmlFor="size">Size</label>
            <select
              id="size"
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

        {/* Elite */}
        <div className="form-checkbox-row">
          <input
            id="elite"
            type="checkbox"
            checked={requiredProperties.elite}
            onChange={(e) => setProp('elite', e.target.checked)}
          />
          <label htmlFor="elite">Elite Monster</label>
        </div>

        {/* Freeform Code Block */}
        <div className="form-group">
          <label htmlFor="freeform-code">Freeform Initialization Code (TypeScript)</label>
          <textarea
            id="freeform-code"
            className="code-textarea"
            value={monsterData.freeformCode}
            onChange={(e) => onChangeMonster({ ...monsterData, freeformCode: e.target.value })}
            placeholder={`creature.setBaseAttributes([7, -2, 5, -5, 2, 2]);\ncreature.addWeaponMult('fists');`}
          />
        </div>
      </div>
    );
  }

  return null;
};
