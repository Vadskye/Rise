import React from 'react';

interface PillListInputProps {
  label: string;
  items: string[];
  onChange: (updated: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
  style?: React.CSSProperties;
}

export const PillListInput: React.FC<PillListInputProps> = ({
  label,
  items,
  onChange,
  placeholder,
  emptyMessage,
  style,
}) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onChange([...items, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="form-group" style={style}>
      <label>{label}</label>
      <div
        className="tag-list"
        style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}
      >
        {items.length === 0
          ? emptyMessage && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                {emptyMessage}
              </span>
            )
          : items.map((item, idx) => (
              <span
                key={idx}
                className="pill-tag"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  padding: '4px 10px',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                }}
              >
                {item}
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--danger-color)',
                    cursor: 'pointer',
                    padding: '0 2px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                  }}
                >
                  &times;
                </button>
              </span>
            ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
        />
        <button
          type="button"
          className="btn-add"
          onClick={handleAdd}
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            padding: '0 15px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          + Add
        </button>
      </div>
    </div>
  );
};
