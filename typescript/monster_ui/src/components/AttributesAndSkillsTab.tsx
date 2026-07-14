import React from 'react';
import { MonsterData } from '../types/monster';
import { SKILL_CATEGORIES, formatSkillLabel } from '../utils/skills';

interface AttributesAndSkillsTabProps {
  monsterData: MonsterData;
  onChangeMonster: (updated: MonsterData) => void;
}

export const AttributesAndSkillsTab: React.FC<AttributesAndSkillsTabProps> = ({
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
      <h4 className="section-subtitle mb-8">Base Attributes</h4>
      <div className="attributes-grid">
        <div className="form-group">
          <label>Str</label>
          <input
            type="number"
            value={baseAttributes[0]}
            onChange={(e) => setAttribute(0, parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="form-group">
          <label>Dex</label>
          <input
            type="number"
            value={baseAttributes[1]}
            onChange={(e) => setAttribute(1, parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="form-group">
          <label>Con</label>
          <input
            type="number"
            value={baseAttributes[2]}
            onChange={(e) => setAttribute(2, parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="form-group">
          <label>Int</label>
          <input
            type="number"
            value={baseAttributes[3]}
            onChange={(e) => setAttribute(3, parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="form-group">
          <label>Per</label>
          <input
            type="number"
            value={baseAttributes[4]}
            onChange={(e) => setAttribute(4, parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="form-group">
          <label>Wil</label>
          <input
            type="number"
            value={baseAttributes[5]}
            onChange={(e) => setAttribute(5, parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <h4 className="section-subtitle mb-8">Trained Skills</h4>
      <div className="form-group search-wrapper mb-8">
        <input
          type="text"
          className="search-input"
          placeholder="Search skills..."
          value={skillSearch}
          onChange={(e) => setSkillSearch(e.target.value)}
        />
      </div>

      <div className="skills-categories-container">
        {Object.entries(SKILL_CATEGORIES).map(([category, skillsList]) => {
          const filteredSkills = skillsList
            .filter((s) => {
              const display = formatSkillLabel(s);
              return display.toLowerCase().includes(skillSearch.toLowerCase());
            })
            .sort((a, b) => {
              const displayA = formatSkillLabel(a);
              const displayB = formatSkillLabel(b);
              return displayA.localeCompare(displayB);
            });
          if (filteredSkills.length === 0) {
            return null;
          }

          return (
            <div key={category} className="skill-category-group">
              <div className="skill-category-title">{category}</div>
              <div className="skills-grid">
                {filteredSkills.map((skill) => {
                  const displayLabel = formatSkillLabel(skill);
                  return (
                    <div key={skill} className="form-checkbox-row">
                      <input
                        id={`skill-${skill}`}
                        type="checkbox"
                        checked={trainedSkills.includes(skill)}
                        onChange={() => toggleSkill(skill)}
                      />
                      <label
                        htmlFor={`skill-${skill}`}
                        className={trainedSkills.includes(skill) ? 'checked' : ''}
                      >
                        {displayLabel}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
