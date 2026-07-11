import React from 'react';

interface RitualsSectionProps {
  rituals: string[];
  spheres: string[];
  onChange: (updatedRituals: string[]) => void;
}

export const RitualsSection: React.FC<RitualsSectionProps> = ({ rituals, spheres, onChange }) => {
  const handleRitualToggle = (sphere: string) => {
    const updated = rituals.includes(sphere)
      ? rituals.filter((s) => s !== sphere)
      : [...rituals, sphere];
    onChange(updated);
  };

  return (
    <div className="ability-section-card">
      <h4 className="section-subtitle">Rituals & Mystic Spheres</h4>
      <p className="section-description">
        Configure which Mystic Spheres this creature can cast rituals from. This maps to the{' '}
        <code>creature.addRituals()</code> engine calls.
      </p>
      <div className="spheres-checklist-grid">
        {spheres.map((sphere) => {
          const isChecked = rituals.includes(sphere);
          return (
            <label
              key={sphere}
              className="checkbox-pill-label"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: isChecked ? 'var(--accent-color)' : 'var(--bg-tertiary)',
                color: isChecked ? '#12131a' : 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                fontWeight: isChecked ? '600' : 'normal',
                transition: 'all 0.2s ease',
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleRitualToggle(sphere)}
                style={{ display: 'none' }}
              />
              {sphere}
            </label>
          );
        })}
      </div>
    </div>
  );
};
