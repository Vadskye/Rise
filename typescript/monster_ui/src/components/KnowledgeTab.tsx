import React from 'react';
import { MonsterData } from '../types/monster';

interface KnowledgeTabProps {
  monsterData: MonsterData;
  onChangeMonster: (updated: MonsterData) => void;
}

export const KnowledgeTab: React.FC<KnowledgeTabProps> = ({
  monsterData,
  onChangeMonster,
}) => {
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
    <div className="tab-content">
      <h4 className="section-subtitle">Knowledge Check Results</h4>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div className="form-group">
          <label style={{ fontSize: '0.75rem' }}>Easy Check</label>
          <textarea
            rows={2}
            value={knowledge.easy || ''}
            onChange={(e) => setKnowledgeVal('easy', e.target.value)}
            placeholder="Basic rumors or obvious features..."
          />
        </div>
        <div className="form-group">
          <label style={{ fontSize: '0.75rem' }}>Normal Check</label>
          <textarea
            rows={2}
            value={knowledge.normal || ''}
            onChange={(e) => setKnowledgeVal('normal', e.target.value)}
            placeholder="General habitat, biology, and combat habits..."
          />
        </div>
        <div className="form-group">
          <label style={{ fontSize: '0.75rem' }}>Hard Check</label>
          <textarea
            rows={2}
            value={knowledge.hard || ''}
            onChange={(e) => setKnowledgeVal('hard', e.target.value)}
            placeholder="Specific details, weaknesses, and origins..."
          />
        </div>
        <div className="form-group">
          <label style={{ fontSize: '0.75rem' }}>Legendary Check</label>
          <textarea
            rows={2}
            value={knowledge.legendary || ''}
            onChange={(e) => setKnowledgeVal('legendary', e.target.value)}
            placeholder="Unique individuals, mythical variants, ancient history..."
          />
        </div>
      </div>

      <h4 className="section-subtitle">Freeform Script Escape Hatch</h4>
      <div className="form-group">
        <label htmlFor="freeform-code">Freeform Initialization Code (TypeScript)</label>
        <textarea
          id="freeform-code"
          data-testid="freeform-code-textarea"
          className="code-textarea"
          value={monsterData.freeformCode}
          onChange={(e) => onChangeMonster({ ...monsterData, freeformCode: e.target.value })}
          placeholder={`// e.g. add custom abilities or complex modifiers:\ncreature.addWeaponMult('fists');`}
        />
      </div>
    </div>
  );
};
