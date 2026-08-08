import React from 'react';

interface ValidationBoxProps {
  errors: string[];
  requirements: string[];
  guidelines: string[];
}

export const ValidationBox: React.FC<ValidationBoxProps> = ({ errors, requirements, guidelines }) => {
  // If there are no errors, requirements, or guidelines, show a clean compiling state
  const hasErrors = errors.length > 0;
  const hasRequirements = requirements.length > 0;
  const hasGuidelines = guidelines.length > 0;

  if (!hasErrors && !hasRequirements && !hasGuidelines) {
    return (
      <div
        className="validation-container"
        style={{ borderColor: 'var(--success-color)', backgroundColor: 'rgba(16, 185, 129, 0.05)' }}
      >
        <div className="validation-title" style={{ color: 'var(--success-color)' }}>
          ✅ Validation Passed
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          This monster compiles cleanly and is ready for LaTeX book generation.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {hasErrors && (
        <div className="validation-container has-errors">
          <div className="validation-title error-title">❌ Engine Compile Errors</div>
          <ul className="validation-list">
            {errors.map((error, idx) => (
              <li key={idx} className="error-item">
                • {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasRequirements && (
        <div className="validation-container has-errors">
          <div className="validation-title error-title">❌ Unmet Requirements</div>
          <ul className="validation-list">
            {requirements.map((req, idx) => (
              <li key={idx} className="error-item">
                • {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasGuidelines && (
        <div className="validation-container has-warnings">
          <div className="validation-title warning-title">⚠️ Validation Guidelines</div>
          <ul className="validation-list">
            {guidelines.map((guide, idx) => (
              <li key={idx} className="warning-item">
                • {guide}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
