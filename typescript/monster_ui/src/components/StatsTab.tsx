import React from 'react';
import { MonsterData } from '../types/monster';

const SKILL_CATEGORIES = {
  Movement: ['climb', 'jump', 'swim', 'balance', 'flexibility', 'ride', 'stealth'],
  Senses: ['analysis', 'awareness'],
  Social: ['deception', 'disguise', 'intimidate', 'perform', 'social_insight', 'persuasion'],
  Craft: [
    'craft_alchemy',
    'craft_bone',
    'craft_ceramics',
    'craft_leather',
    'craft_manuscripts',
    'craft_metal',
    'craft_poison',
    'craft_stone',
    'craft_textiles',
    'craft_traps',
    'craft_wood',
    'craft_untrained',
  ],
  Knowledge: [
    'knowledge_arcana',
    'knowledge_dungeoneering',
    'knowledge_engineering',
    'knowledge_items',
    'knowledge_local',
    'knowledge_nature',
    'knowledge_planes',
    'knowledge_religion',
    'knowledge_souls',
    'knowledge_untrained',
  ],
  Other: [
    'creature_handling',
    'devices',
    'endurance',
    'medicine',
    'sleight_of_hand',
    'survival',
    'profession',
  ],
};

interface StatsTabProps {
  monsterData: MonsterData;
  onChangeMonster: (updated: MonsterData) => void;
}

export const StatsTab: React.FC<StatsTabProps> = ({
  monsterData,
  onChangeMonster,
}) => {
  const [skillSearch, setSkillSearch] = React.useState('');

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

  return (
    <div className="tab-content">
      <h4 className="section-subtitle">Base Attributes</h4>
      <div
        className="attributes-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '15px',
          marginBottom: '20px',
        }}
      >
        <div className="form-group">
          <label>Str (Brawn)</label>
          <input
            type="number"
            value={baseAttributes[0]}
            onChange={(e) => setAttribute(0, parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="form-group">
          <label>Dex (Agility)</label>
          <input
            type="number"
            value={baseAttributes[1]}
            onChange={(e) => setAttribute(1, parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="form-group">
          <label>Con (Fortitude)</label>
          <input
            type="number"
            value={baseAttributes[2]}
            onChange={(e) => setAttribute(2, parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="form-group">
          <label>Int (Reason)</label>
          <input
            type="number"
            value={baseAttributes[3]}
            onChange={(e) => setAttribute(3, parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="form-group">
          <label>Per (Instinct)</label>
          <input
            type="number"
            value={baseAttributes[4]}
            onChange={(e) => setAttribute(4, parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="form-group">
          <label>Wil (Presence)</label>
          <input
            type="number"
            value={baseAttributes[5]}
            onChange={(e) => setAttribute(5, parseInt(e.target.value) || 0)}
          />
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

      <div
        className="skills-categories-container"
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        {Object.entries(SKILL_CATEGORIES).map(([category, skillsList]) => {
          const filteredSkills = skillsList.filter((s) =>
            s.toLowerCase().replace(/_/g, ' ').includes(skillSearch.toLowerCase()),
          );
          if (filteredSkills.length === 0) {
            return null;
          }

          return (
            <div
              key={category}
              className="skill-category-group"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'var(--accent-color)',
                  marginBottom: '8px',
                  letterSpacing: '0.5px',
                }}
              >
                {category}
              </div>
              <div
                className="skills-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: '10px',
                }}
              >
                {filteredSkills.map((skill) => (
                  <div
                    key={skill}
                    className="form-checkbox-row"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <input
                      id={`skill-${skill}`}
                      type="checkbox"
                      checked={trainedSkills.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                    />
                    <label
                      htmlFor={`skill-${skill}`}
                      style={{
                        fontSize: '0.85rem',
                        color: trainedSkills.includes(skill)
                          ? 'var(--text-primary)'
                          : 'var(--text-secondary)',
                        cursor: 'pointer',
                      }}
                    >
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
  );
};
