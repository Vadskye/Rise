import React from 'react';
import { ComputedStats } from '../types/monster';

interface BookPreviewProps {
  stats: ComputedStats | null;
  loading: boolean;
}

export const BookPreview: React.FC<BookPreviewProps> = ({ stats, loading }) => {
  if (loading && !stats) {
    return (
      <div
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          fontStyle: 'italic',
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
        Recalculating stat block...
      </div>
    );
  }

  if (!stats) {
    return (
      <div
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.95rem',
          fontStyle: 'italic',
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
        Enter valid properties on the left to generate the preview.
      </div>
    );
  }

  const formatModifier = (val: number) => {
    return val >= 0 ? `+${val}` : `${val}`;
  };

  const isMindless = stats.traits.map((t) => t.toLowerCase()).includes('mindless');

  // Format Attributes: [Brawn, Agility, Reason, Instinct, Presence, Will]
  // In our validate.ts backend code, the attributes array was returned as:
  // [strength, dexterity, constitution, intelligence, perception, willpower]
  const attributesStr = [
    stats.attributes[0], // Brawn
    stats.attributes[1], // Agility
    stats.attributes[2], // Fortitude (Constitution)
    isMindless ? '---' : stats.attributes[3], // Reason (Intelligence)
    stats.attributes[4], // Instinct (Perception)
    isMindless ? '---' : stats.attributes[5], // Presence/Will (Willpower)
  ]
    .map((attr) =>
      attr === '---' ? '---' : typeof attr === 'number' && attr > -10 ? String(attr) : '—',
    )
    .join(', ');

  // Defenses
  const mentalText = isMindless ? '' : ` • Ment ${stats.mental}`;

  // Knowledge DVs
  const knowledge = stats.knowledge;
  const baseDifficulty = knowledge ? Math.floor(knowledge.monsterLevel / 2) + 5 : 5;
  const showKnowledge =
    knowledge && (knowledge.easy || knowledge.normal || knowledge.hard || knowledge.legendary);

  // Sorting active abilities: usage time then name
  const sortedActiveAbilities = [...stats.activeAbilities].sort((a, b) => {
    const usageA = a.usageTime || 'standard';
    const usageB = b.usageTime || 'standard';
    const usageCompare = usageA.localeCompare(usageB);
    if (usageCompare !== 0) {
      return usageCompare;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className={`book-preview-container ${loading ? 'loading-preview' : ''}`}>
      {/* Header */}
      <h4 className="monster-title">
        {stats.name}
        <span className="sub-info">
          Level {stats.level} {stats.base_class.charAt(0).toUpperCase() + stats.base_class.slice(1)}
          {stats.elite ? ' — Elite' : ''}
        </span>
      </h4>

      <div className="monster-origin-type">
        {stats.size.charAt(0).toUpperCase() + stats.size.slice(1)} {stats.creature_origin}
        {stats.creature_type ? ` ${stats.creature_type}` : ''}
      </div>

      {/* Stats Table */}
      <div className="stat-block">
        <div className="stat-line">
          <span className="stat-label">HP</span>
          <span className="stat-value">{stats.hit_points}</span>
          <span className="stat-label">IP</span>
          <span className="stat-value">{stats.injury_point}</span>
        </div>
        <div className="stat-line">
          <span className="stat-label">Defenses</span>
          <span className="stat-value">
            Armor {stats.armor_defense} • Brawn {stats.brawn} • Fort {stats.fortitude}
            {mentalText} • Ref {stats.reflex}
          </span>
        </div>
        <div className="stat-line">
          <span className="stat-label">Movement</span>
          <span className="stat-value">
            {stats.speed} ft.
            {stats.skills.includes('jump') ? ` • Jump ${formatModifier(stats.attributes[1])}` : ''}
          </span>
        </div>

        {/* Senses/Skills */}
        {stats.skills.length > 0 && (
          <div className="stat-line" style={{ marginTop: '2px' }}>
            <span className="stat-label">Trained Skills</span>
            <span className="stat-value">
              {stats.skills.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}
            </span>
          </div>
        )}

        <div
          className="stat-line"
          style={{
            marginTop: '4px',
            paddingTop: '4px',
            borderTop: '1px dashed var(--book-border)',
          }}
        >
          <span className="stat-label">Attributes</span>
          <span className="stat-value">{attributesStr}</span>
          <span className="stat-label" style={{ marginLeft: 'auto' }}>
            Alignment
          </span>
          <span className="stat-value" style={{ marginRight: 0 }}>
            {stats.alignment
              .split(' ')
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' ')}
          </span>
        </div>

        <div className="stat-line">
          <span className="stat-label">Accuracy</span>
          <span className="stat-value">
            {formatModifier(stats.armor_defense - 10 /* estimate basic accuracy */)}; Brawling{' '}
            {formatModifier(stats.brawn - 10)}
          </span>
          <span className="stat-label" style={{ marginLeft: 'auto' }}>
            Power
          </span>
          <span className="stat-value" style={{ marginRight: 0 }}>
            {stats.level + 2} ✦
          </span>
        </div>

        {stats.equipment.length > 0 && (
          <div className="stat-line">
            <span className="stat-label">Equipment</span>
            <span className="stat-value">
              {stats.equipment.map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(', ')}
            </span>
          </div>
        )}

        {stats.traits.filter(
          (t) =>
            t.toLowerCase() !== 'blooded' &&
            t.toLowerCase() !== 'living' &&
            t.toLowerCase() !== 'mortal',
        ).length > 0 && (
          <div className="stat-line">
            <span className="stat-label">Traits</span>
            <span className="stat-value">
              {stats.traits
                .filter(
                  (t) =>
                    t.toLowerCase() !== 'blooded' &&
                    t.toLowerCase() !== 'living' &&
                    t.toLowerCase() !== 'mortal',
                )
                .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                .join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Knowledge */}
      {showKnowledge && (
        <div className="knowledge-block">
          <div className="knowledge-title">Knowledge Checks</div>
          {knowledge.easy && (
            <div className="knowledge-line">
              <span className="dv-label">Easy (DV {baseDifficulty - 5}):</span> {knowledge.easy}
            </div>
          )}
          {knowledge.normal && (
            <div className="knowledge-line">
              <span className="dv-label">Normal (DV {baseDifficulty}):</span> {knowledge.normal}
            </div>
          )}
          {knowledge.hard && (
            <div className="knowledge-line">
              <span className="dv-label">Hard (DV {baseDifficulty + 5}):</span> {knowledge.hard}
            </div>
          )}
          {knowledge.legendary && (
            <div className="knowledge-line">
              <span className="dv-label">Legendary (DV {baseDifficulty + 10}):</span>{' '}
              {knowledge.legendary}
            </div>
          )}
        </div>
      )}

      {/* Abilities */}
      {(stats.passiveAbilities.length > 0 || sortedActiveAbilities.length > 0) && (
        <>
          <div className="abilities-header">Abilities</div>

          {/* Passive Abilities */}
          {stats.passiveAbilities.map((ability, idx) => (
            <div key={`passive-${idx}`} className="ability-item">
              <div className="ability-title-line">
                <span className="ability-name">
                  {ability.name} {ability.isMagical ? '✦' : ''}
                </span>
                <span className="ability-usage">Passive</span>
              </div>
              <div className="ability-details" style={{ fontStyle: 'italic' }}>
                {ability.effect}
              </div>
            </div>
          ))}

          {/* Active Abilities */}
          {sortedActiveAbilities.map((ability, idx) => (
            <div key={`active-${idx}`} className="ability-item">
              <div className="ability-title-line">
                <span className="ability-name">
                  {ability.name} {ability.isMagical ? '✦' : ''}
                  {ability.tags && ability.tags.length > 0 ? ` [${ability.tags.join(', ')}]` : ''}
                </span>
                <span className="ability-usage">
                  {ability.usageTime
                    ? ability.usageTime.charAt(0).toUpperCase() + ability.usageTime.slice(1)
                    : 'Standard'}
                </span>
              </div>
              <div className="ability-details">
                {ability.cost && (
                  <div className="detail-line">
                    <span className="detail-label">Cost:</span>
                    <span>{ability.cost}</span>
                  </div>
                )}
                {ability.attack && (
                  <>
                    <div className="detail-line">
                      <span className="detail-label">Target:</span>
                      <span>{ability.attack.targeting}</span>
                    </div>
                    <div className="detail-line">
                      <span className="detail-label">Hit:</span>
                      <span>{ability.attack.hit}</span>
                    </div>
                    {ability.attack.crit && (
                      <div className="detail-line">
                        <span className="detail-label">Critical:</span>
                        <span>{ability.attack.crit}</span>
                      </div>
                    )}
                  </>
                )}
                {ability.effect && (
                  <div className="detail-line">
                    <span className="detail-label">Effect:</span>
                    <span>{ability.effect}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
