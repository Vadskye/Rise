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

  const formatUsageTime = (usageTime?: string) => {
    if (!usageTime) {
      return 'Standard action';
    }
    const lower = usageTime.toLowerCase();
    if (lower === 'minor') {
      return 'Minor action';
    }
    if (lower === 'elite') {
      return 'Elite action';
    }
    if (lower === 'standard') {
      return 'Standard action';
    }
    return usageTime.charAt(0).toUpperCase() + usageTime.slice(1);
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
  const baseDifficulty = stats.level !== undefined ? Math.floor(stats.level / 2) + 5 : 5;
  const showKnowledge =
    knowledge && (knowledge.easy || knowledge.normal || knowledge.hard || knowledge.legendary);
  const relevantKnowledge = knowledge.relevantKnowledges?.[0] || 'nature';
  const skillLabel = relevantKnowledge.replace('knowledge_', '');
  const skillNameFormatted = skillLabel.charAt(0).toUpperCase() + skillLabel.slice(1);

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

  const filteredTraits = stats.traits
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    .sort();

  return (
    <div className={`book-preview-container ${loading ? 'loading-preview' : ''}`}>
      {/* Header */}
      <h4 className="monster-title">
        {stats.name}
        <span className="sub-info">
          Level {stats.level}
          {stats.elite ? ' — Elite' : ''}
        </span>
      </h4>

      <div className="monster-origin-type">
        {stats.size.charAt(0).toUpperCase() + stats.size.slice(1)} {stats.creature_origin} {stats.base_class.toLowerCase()}
      </div>

      {/* Stats Table */}
      <div className="stat-block">
        <div className="stat-line">
          <span className="stat-label">HP</span>
          <span className="stat-value">{stats.hit_points}</span>
          <span className="stat-label">IP</span>
          <span className="stat-value">{stats.injury_point}</span>
          {stats.creature_types && stats.creature_types.length > 0 && (
            <>
              <span className="stat-label" style={{ marginLeft: 'auto' }}>Types:</span>
              <span className="stat-value" style={{ marginRight: 0 }}>
                {stats.creature_types.join(', ')}
              </span>
            </>
          )}
        </div>
        <div className="stat-line">
          <span className="stat-label">Defenses</span>
          <span className="stat-value">
            Armor {stats.armor_defense} • Brawn {stats.brawn} • Fort {stats.fortitude}
            {mentalText} • Ref {stats.reflex}
          </span>
        </div>

        {/* Special Defenses */}
        {stats.immune && (
          <div className="stat-line">
            <span className="stat-label">Immune</span>
            <span className="stat-value">{stats.immune}</span>
          </div>
        )}
        {stats.resistant && (
          <div className="stat-line">
            <span className="stat-label">Resistant</span>
            <span className="stat-value">{stats.resistant}</span>
          </div>
        )}
        {stats.vulnerable && (
          <div className="stat-line">
            <span className="stat-label">Vulnerable</span>
            <span className="stat-value">{stats.vulnerable}</span>
          </div>
        )}

        <div className="stat-line">
          <span className="stat-label">Movement</span>
          <span className="stat-value">
            {stats.speed} ft.
            {stats.movementComponents && stats.movementComponents.length > 0
              ? `; ${stats.movementComponents.join(' • ')}`
              : ''}
          </span>
        </div>

        {/* Senses */}
        {stats.sensesComponents && stats.sensesComponents.length > 0 && (
          <div className="stat-line" style={{ marginTop: '2px' }}>
            <span className="stat-label">Senses</span>
            <span className="stat-value">{stats.sensesComponents.join(' • ')}</span>
          </div>
        )}

        {/* Social */}
        {stats.socialComponents && stats.socialComponents.length > 0 && (
          <div className="stat-line" style={{ marginTop: '2px' }}>
            <span className="stat-label">Social</span>
            <span className="stat-value">{stats.socialComponents.join(' • ')}</span>
          </div>
        )}

        {/* Other skills */}
        {stats.otherSkillsComponents && stats.otherSkillsComponents.length > 0 && (
          <div className="stat-line" style={{ marginTop: '2px' }}>
            <span className="stat-label">Other skills</span>
            <span className="stat-value">{stats.otherSkillsComponents.join(' • ')}</span>
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
            {formatModifier(stats.accuracy)}; Brawling {formatModifier(stats.brawling_accuracy)}
          </span>
          <span className="stat-label" style={{ marginLeft: 'auto' }}>
            Power
          </span>
          <span className="stat-value" style={{ marginRight: 0 }}>
            {stats.mundane_power}; {stats.magical_power} ✨
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

        {filteredTraits.length > 0 && (
          <div className="stat-line">
            <span className="stat-label">Traits</span>
            <span className="stat-value">{filteredTraits.join(' • ')}</span>
          </div>
        )}
      </div>

      {/* Knowledge */}
      {showKnowledge && (
        <div className="knowledge-block">
          <div className="knowledge-title">Knowledge Checks</div>
          {knowledge.easy && (
            <div className="knowledge-line">
              <span className="dv-label">
                {skillNameFormatted} DV {baseDifficulty - 5}:
              </span>{' '}
              {knowledge.easy}
            </div>
          )}
          {knowledge.normal && (
            <div className="knowledge-line">
              <span className="dv-label">
                {skillNameFormatted} DV {baseDifficulty}:
              </span>{' '}
              {knowledge.normal}
            </div>
          )}
          {knowledge.hard && (
            <div className="knowledge-line">
              <span className="dv-label">
                {skillNameFormatted} DV {baseDifficulty + 5}:
              </span>{' '}
              {knowledge.hard}
            </div>
          )}
          {knowledge.legendary && (
            <div className="knowledge-line">
              <span className="dv-label">
                {skillNameFormatted} DV {baseDifficulty + 10}:
              </span>{' '}
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
            <div key={`passive-${idx}`} className="passive-ability-item">
              <strong>
                {ability.name} {ability.isMagical ? '✨' : ''}
              </strong>
              : {ability.effect}
            </div>
          ))}

          {/* Active Abilities */}
          {sortedActiveAbilities.map((ability, idx) => {
            const hasMetadata = (ability.tags && ability.tags.length > 0) || ability.cost;
            return (
              <div key={`active-${idx}`} className="ability-item">
                <div className="ability-title-line">
                  <span className="ability-name">
                    {ability.name} {ability.isMagical ? '✨' : ''}
                  </span>
                  <span className="ability-usage">{formatUsageTime(ability.usageTime)}</span>
                </div>

                {hasMetadata && (
                  <div className="ability-metadata">
                    {ability.tags && ability.tags.length > 0 && (
                      <div className="metadata-line">
                        <span className="metadata-label">Tags:</span> {ability.tags.join(', ')}
                      </div>
                    )}
                    {ability.cost && (
                      <div className="metadata-line">
                        <span className="metadata-label">Cost:</span> {ability.cost}
                      </div>
                    )}
                  </div>
                )}

                <div className="ability-divider" />

                <div className="ability-body">
                  {ability.attack ? (
                    <>
                      <div className="ability-description">{ability.attack.targeting}</div>
                      {ability.attack.hit && (
                        <div className="ability-sub-description">
                          <span className="sub-label">Hit:</span> {ability.attack.hit}
                        </div>
                      )}
                      {ability.attack.injury && (
                        <div className="ability-sub-description">
                          <span className="sub-label">Injury:</span> {ability.attack.injury}
                        </div>
                      )}
                      {ability.attack.crit && (
                        <div className="ability-sub-description">
                          <span className="sub-label">Critical hit:</span> {ability.attack.crit}
                        </div>
                      )}
                      {ability.attack.halfOnMiss && (
                        <div className="ability-sub-description">
                          <span className="sub-label">Miss:</span> Half damage.
                        </div>
                      )}
                      {ability.attack.miss && (
                        <div className="ability-sub-description">
                          <span className="sub-label">Miss:</span> {ability.attack.miss}
                        </div>
                      )}
                    </>
                  ) : (
                    ability.effect && <div className="ability-description">{ability.effect}</div>
                  )}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
