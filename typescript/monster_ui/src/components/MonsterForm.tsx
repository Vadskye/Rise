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

  const [activeTab, setActiveTab] = React.useState<'identity' | 'stats' | 'traits' | 'combat' | 'knowledge'>('identity');
  const [skillSearch, setSkillSearch] = React.useState('');
  const [traitSearch, setTraitSearch] = React.useState('');
  
  const [newSense, setNewSense] = React.useState('');
  const [newSpeed, setNewSpeed] = React.useState('');
  const [newImmunity, setNewImmunity] = React.useState('');
  const [newResistance, setNewResistance] = React.useState('');
  const [newVulnerability, setNewVulnerability] = React.useState('');

  const SKILL_CATEGORIES = {
    Movement: ['climb', 'jump', 'swim', 'balance', 'flexibility', 'ride', 'stealth'],
    Senses: ['analysis', 'awareness'],
    Social: ['deception', 'disguise', 'intimidate', 'perform', 'social_insight', 'persuasion'],
    Craft: [
      'craft_alchemy', 'craft_bone', 'craft_ceramics', 'craft_leather', 'craft_manuscripts',
      'craft_metal', 'craft_poison', 'craft_stone', 'craft_textiles', 'craft_traps', 'craft_wood', 'craft_untrained'
    ],
    Knowledge: [
      'knowledge_arcana', 'knowledge_dungeoneering', 'knowledge_engineering', 'knowledge_items',
      'knowledge_local', 'knowledge_nature', 'knowledge_planes', 'knowledge_religion', 'knowledge_souls', 'knowledge_untrained'
    ],
    Other: ['creature_handling', 'devices', 'endurance', 'medicine', 'sleight_of_hand', 'survival', 'profession']
  };

  const STANDARD_TRAITS = [
    'amphibious', 'blooded', 'bloodless', 'corporeal', 'dynamic', 'ensouled', 'floating',
    'immortal', 'incorporeal', 'invisible', 'legless', 'living', 'mindless', 'mortal',
    'multipedal', 'nonliving', 'quadrupedal', 'scent', 'sighted', 'sightless', 'simple-minded',
    'soulless', 'static', 'swarm', 'telepathy'
  ];

  const STANDARD_ARMORS = [
    'buff leather', 'mail shirt', 'rawhide', 'leather lamellar', 'scale',
    'brigandine', 'breastplate', 'half plate', 'full plate', 'mage armor', 'ki barrier'
  ];

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

    const properties = monsterData.properties || {};
    const setMiscProperty = (key: string, val: any) => {
      onChangeMonster({
        ...monsterData,
        properties: {
          ...properties,
          [key]: val,
        },
      });
    };

    const baseAttributes = monsterData.baseAttributes || [0, 0, 0, 0, 0, 0];
    const setAttribute = (idx: number, val: number) => {
      const newAttrs = [...baseAttributes] as [number, number, number, number, number, number];
      newAttrs[idx] = val;
      onChangeMonster({
        ...monsterData,
        baseAttributes: newAttrs,
      });
    };

    const trainedSkills = monsterData.trainedSkills || [];
    const toggleSkill = (skill: string) => {
      const newSkills = trainedSkills.includes(skill)
        ? trainedSkills.filter((s) => s !== skill)
        : [...trainedSkills, skill];
      onChangeMonster({
        ...monsterData,
        trainedSkills: newSkills,
      });
    };

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

    const customSenses = monsterData.customSenses || [];
    const handleAddSense = () => {
      if (newSense.trim()) {
        onChangeMonster({
          ...monsterData,
          customSenses: [...customSenses, newSense.trim()],
        });
        setNewSense('');
      }
    };
    const handleRemoveSense = (index: number) => {
      onChangeMonster({
        ...monsterData,
        customSenses: customSenses.filter((_, i) => i !== index),
      });
    };

    const customMovementSpeeds = monsterData.customMovementSpeeds || [];
    const handleAddSpeed = () => {
      if (newSpeed.trim()) {
        onChangeMonster({
          ...monsterData,
          customMovementSpeeds: [...customMovementSpeeds, newSpeed.trim()],
        });
        setNewSpeed('');
      }
    };
    const handleRemoveSpeed = (index: number) => {
      onChangeMonster({
        ...monsterData,
        customMovementSpeeds: customMovementSpeeds.filter((_, i) => i !== index),
      });
    };

    const immunities = monsterData.immunities || [];
    const handleAddImmunity = () => {
      if (newImmunity.trim()) {
        onChangeMonster({
          ...monsterData,
          immunities: [...immunities, newImmunity.trim()],
        });
        setNewImmunity('');
      }
    };
    const handleRemoveImmunity = (index: number) => {
      onChangeMonster({
        ...monsterData,
        immunities: immunities.filter((_, i) => i !== index),
      });
    };

    const resistances = monsterData.resistances || [];
    const handleAddResistance = () => {
      if (newResistance.trim()) {
        onChangeMonster({
          ...monsterData,
          resistances: [...resistances, newResistance.trim()],
        });
        setNewResistance('');
      }
    };
    const handleRemoveResistance = (index: number) => {
      onChangeMonster({
        ...monsterData,
        resistances: resistances.filter((_, i) => i !== index),
      });
    };

    const vulnerabilities = monsterData.vulnerabilities || [];
    const handleAddVulnerability = () => {
      if (newVulnerability.trim()) {
        onChangeMonster({
          ...monsterData,
          vulnerabilities: [...vulnerabilities, newVulnerability.trim()],
        });
        setNewVulnerability('');
      }
    };
    const handleRemoveVulnerability = (index: number) => {
      onChangeMonster({
        ...monsterData,
        vulnerabilities: vulnerabilities.filter((_, i) => i !== index),
      });
    };

    const knowledge = monsterData.knowledge || {};
    const setKnowledgeVal = (key: 'easy' | 'normal' | 'hard' | 'legendary', value: string) => {
      onChangeMonster({
        ...monsterData,
        knowledge: {
          ...knowledge,
          [key]: value,
        },
      });
    };

    return (
      <div className="editor-scroll">
        {/* Navigation Tabs */}
        <div className="form-tabs">
          <button type="button" className={`tab-btn ${activeTab === 'identity' ? 'active' : ''}`} onClick={() => setActiveTab('identity')}>Identity</button>
          <button type="button" className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>Attributes & Skills</button>
          <button type="button" className={`tab-btn ${activeTab === 'traits' ? 'active' : ''}`} onClick={() => setActiveTab('traits')}>Traits & Senses</button>
          <button type="button" className={`tab-btn ${activeTab === 'combat' ? 'active' : ''}`} onClick={() => setActiveTab('combat')}>Combat & Gear</button>
          <button type="button" className={`tab-btn ${activeTab === 'knowledge' ? 'active' : ''}`} onClick={() => setActiveTab('knowledge')}>Knowledge & Script</button>
        </div>

        {/* Tab 1: Identity */}
        {activeTab === 'identity' && (
          <div className="tab-content">
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

            <div className="form-row-grid">
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
        )}

        {/* Tab 2: Attributes & Skills */}
        {activeTab === 'stats' && (
          <div className="tab-content">
            <h4 className="section-subtitle">Base Attributes</h4>
            <div className="attributes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
              <div className="form-group">
                <label>Str (Brawn)</label>
                <input type="number" value={baseAttributes[0]} onChange={(e) => setAttribute(0, parseInt(e.target.value) || 0)} />
              </div>
              <div className="form-group">
                <label>Dex (Agility)</label>
                <input type="number" value={baseAttributes[1]} onChange={(e) => setAttribute(1, parseInt(e.target.value) || 0)} />
              </div>
              <div className="form-group">
                <label>Con (Fortitude)</label>
                <input type="number" value={baseAttributes[2]} onChange={(e) => setAttribute(2, parseInt(e.target.value) || 0)} />
              </div>
              <div className="form-group">
                <label>Int (Reason)</label>
                <input type="number" value={baseAttributes[3]} onChange={(e) => setAttribute(3, parseInt(e.target.value) || 0)} />
              </div>
              <div className="form-group">
                <label>Per (Instinct)</label>
                <input type="number" value={baseAttributes[4]} onChange={(e) => setAttribute(4, parseInt(e.target.value) || 0)} />
              </div>
              <div className="form-group">
                <label>Wil (Presence)</label>
                <input type="number" value={baseAttributes[5]} onChange={(e) => setAttribute(5, parseInt(e.target.value) || 0)} />
              </div>
            </div>

            <h4 className="section-subtitle">Trained Skills</h4>
            <div className="form-group" style={{ marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Search skills..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
              />
            </div>
            
            <div className="skills-categories-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {Object.entries(SKILL_CATEGORIES).map(([category, skillsList]) => {
                const filteredSkills = skillsList.filter(s => s.toLowerCase().replace(/_/g, ' ').includes(skillSearch.toLowerCase()));
                if (filteredSkills.length === 0) return null;

                return (
                  <div key={category} className="skill-category-group" style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '8px', letterSpacing: '0.5px' }}>{category}</div>
                    <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
                      {filteredSkills.map((skill) => (
                        <div key={skill} className="form-checkbox-row" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <input
                            id={`skill-${skill}`}
                            type="checkbox"
                            checked={trainedSkills.includes(skill)}
                            onChange={() => toggleSkill(skill)}
                          />
                          <label htmlFor={`skill-${skill}`} style={{ fontSize: '0.85rem', color: trainedSkills.includes(skill) ? 'var(--text-primary)' : 'var(--text-secondary)', cursor: 'pointer' }}>
                            {skill.replace(/_/g, ' ')}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Traits & Senses */}
        {activeTab === 'traits' && (
          <div className="tab-content">
            <h4 className="section-subtitle">Standard Traits</h4>
            <div className="form-group" style={{ marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Search traits..."
                value={traitSearch}
                onChange={(e) => setTraitSearch(e.target.value)}
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
              />
            </div>
            <div className="traits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px', backgroundColor: 'var(--bg-secondary)', padding: '15px', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
              {STANDARD_TRAITS.filter(t => t.includes(traitSearch.toLowerCase())).map((trait) => (
                <div key={trait} className="form-checkbox-row" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    id={`trait-${trait}`}
                    type="checkbox"
                    checked={traits.includes(trait)}
                    onChange={() => toggleTrait(trait)}
                  />
                  <label htmlFor={`trait-${trait}`} style={{ fontSize: '0.85rem', color: traits.includes(trait) ? 'var(--text-primary)' : 'var(--text-secondary)', cursor: 'pointer' }}>
                    {trait}
                  </label>
                </div>
              ))}
            </div>

            <h4 className="section-subtitle">Senses & Movement</h4>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label>Custom Senses</label>
              <div className="tag-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                {customSenses.length === 0 ? (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No custom senses added (defaults to Normal Senses).</span>
                ) : (
                  customSenses.map((sense, idx) => (
                    <span key={idx} className="pill-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', padding: '4px 10px', borderRadius: '15px', fontSize: '0.8rem' }}>
                      {sense}
                      <button type="button" onClick={() => handleRemoveSense(idx)} style={{ background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', padding: '0 2px', fontSize: '0.85rem', fontWeight: 'bold' }}>&times;</button>
                    </span>
                  ))
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="e.g. Darkvision (60 ft.)" value={newSense} onChange={(e) => setNewSense(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSense())} />
                <button type="button" className="btn-add" onClick={handleAddSense} style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0 15px', borderRadius: '6px', cursor: 'pointer' }}>+ Add</button>
              </div>
            </div>

            <div className="form-group">
              <label>Custom Movement Speeds</label>
              <div className="tag-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                {customMovementSpeeds.length === 0 ? (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No custom movement speeds added (defaults to ground speed).</span>
                ) : (
                  customMovementSpeeds.map((speed, idx) => (
                    <span key={idx} className="pill-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', padding: '4px 10px', borderRadius: '15px', fontSize: '0.8rem' }}>
                      {speed}
                      <button type="button" onClick={() => handleRemoveSpeed(idx)} style={{ background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', padding: '0 2px', fontSize: '0.85rem', fontWeight: 'bold' }}>&times;</button>
                    </span>
                  ))
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="e.g. Fly 30 ft." value={newSpeed} onChange={(e) => setNewSpeed(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpeed())} />
                <button type="button" className="btn-add" onClick={handleAddSpeed} style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0 15px', borderRadius: '6px', cursor: 'pointer' }}>+ Add</button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Combat & Gear */}
        {activeTab === 'combat' && (
          <div className="tab-content">
            <h4 className="section-subtitle">Equipment</h4>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="equipped-armor">Equipped Armor</label>
              <select
                id="equipped-armor"
                value={monsterData.equippedArmor || ''}
                onChange={(e) => onChangeMonster({ ...monsterData, equippedArmor: e.target.value || undefined })}
              >
                <option value="">-- None --</option>
                {STANDARD_ARMORS.map((arm) => (
                  <option key={arm} value={arm}>{arm.charAt(0).toUpperCase() + arm.slice(1)}</option>
                ))}
              </select>
            </div>

            <h4 className="section-subtitle">Defenses & Modifiers</h4>
            
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label>Immunities</label>
              <div className="tag-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                {immunities.length === 0 ? (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No immunities.</span>
                ) : (
                  immunities.map((immunity, idx) => (
                    <span key={idx} className="pill-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', padding: '4px 10px', borderRadius: '15px', fontSize: '0.8rem' }}>
                      {immunity}
                      <button type="button" onClick={() => handleRemoveImmunity(idx)} style={{ background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', padding: '0 2px', fontSize: '0.85rem', fontWeight: 'bold' }}>&times;</button>
                    </span>
                  ))
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="e.g. Fire" value={newImmunity} onChange={(e) => setNewImmunity(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImmunity())} />
                <button type="button" className="btn-add" onClick={handleAddImmunity} style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0 15px', borderRadius: '6px', cursor: 'pointer' }}>+ Add</button>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label>Resistances</label>
              <div className="tag-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                {resistances.length === 0 ? (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No resistances.</span>
                ) : (
                  resistances.map((res, idx) => (
                    <span key={idx} className="pill-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', padding: '4px 10px', borderRadius: '15px', fontSize: '0.8rem' }}>
                      {res}
                      <button type="button" onClick={() => handleRemoveResistance(idx)} style={{ background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', padding: '0 2px', fontSize: '0.85rem', fontWeight: 'bold' }}>&times;</button>
                    </span>
                  ))
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="e.g. Cold" value={newResistance} onChange={(e) => setNewResistance(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddResistance())} />
                <button type="button" className="btn-add" onClick={handleAddResistance} style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0 15px', borderRadius: '6px', cursor: 'pointer' }}>+ Add</button>
              </div>
            </div>

            <div className="form-group">
              <label>Vulnerabilities</label>
              <div className="tag-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                {vulnerabilities.length === 0 ? (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No vulnerabilities.</span>
                ) : (
                  vulnerabilities.map((vuln, idx) => (
                    <span key={idx} className="pill-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', padding: '4px 10px', borderRadius: '15px', fontSize: '0.8rem' }}>
                      {vuln}
                      <button type="button" onClick={() => handleRemoveVulnerability(idx)} style={{ background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', padding: '0 2px', fontSize: '0.85rem', fontWeight: 'bold' }}>&times;</button>
                    </span>
                  ))
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="e.g. Acid" value={newVulnerability} onChange={(e) => setNewVulnerability(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddVulnerability())} />
                <button type="button" className="btn-add" onClick={handleAddVulnerability} style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0 15px', borderRadius: '6px', cursor: 'pointer' }}>+ Add</button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Knowledge & Script */}
        {activeTab === 'knowledge' && (
          <div className="tab-content">
            <h4 className="section-subtitle">Knowledge Check Results</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div className="form-group">
                <label style={{ fontSize: '0.75rem' }}>Easy Check</label>
                <textarea rows={2} value={knowledge.easy || ''} onChange={(e) => setKnowledgeVal('easy', e.target.value)} placeholder="Basic rumors or obvious features..." />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '0.75rem' }}>Normal Check</label>
                <textarea rows={2} value={knowledge.normal || ''} onChange={(e) => setKnowledgeVal('normal', e.target.value)} placeholder="General habitat, biology, and combat habits..." />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '0.75rem' }}>Hard Check</label>
                <textarea rows={2} value={knowledge.hard || ''} onChange={(e) => setKnowledgeVal('hard', e.target.value)} placeholder="Specific details, weaknesses, and origins..." />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '0.75rem' }}>Legendary Check</label>
                <textarea rows={2} value={knowledge.legendary || ''} onChange={(e) => setKnowledgeVal('legendary', e.target.value)} placeholder="Unique individuals, mythical variants, ancient history..." />
              </div>
            </div>

            <h4 className="section-subtitle">Freeform Script Escape Hatch</h4>
            <div className="form-group">
              <label htmlFor="freeform-code">Freeform Initialization Code (TypeScript)</label>
              <textarea
                id="freeform-code"
                className="code-textarea"
                value={monsterData.freeformCode}
                onChange={(e) => onChangeMonster({ ...monsterData, freeformCode: e.target.value })}
                placeholder={`// e.g. add custom abilities or complex modifiers:\ncreature.addWeaponMult('fists');`}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};
