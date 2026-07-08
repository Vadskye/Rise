import React from 'react';

interface ValidationBoxProps {
  errors: string[];
  warnings: string[];
}

export const ValidationBox: React.FC<ValidationBoxProps> = ({ errors, warnings }) => {
  // If there are no warnings or errors, show a clean compiling state
  const hasErrors = errors.length > 0;
  const hasWarnings = warnings.length > 0;

  if (!hasErrors && !hasWarnings) {
    return (
      <div className="validation-container" style={{ borderColor: 'var(--success-color)', backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
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
          <div className="validation-title error-title">
            ❌ Engine Compile Errors
          </div>
          <ul className="validation-list">
            {errors.map((error, idx) => (
              <li key={idx} className="error-item">
                • {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasWarnings && (
        <div className="validation-container has-warnings">
          <div className="validation-title warning-title">
            ⚠️ Book Validation Warnings
          </div>
          <ul className="validation-list">
            {warnings.map((warning, idx) => (
              <li key={idx} className="warning-item">
                • {warning}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
