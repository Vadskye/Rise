import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  id?: string;
  'data-testid'?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No options found',
  className = '',
  id,
  'data-testid': dataTestId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update position of portal dropdown on open or scroll/resize
  useLayoutEffect(() => {
    const updatePosition = () => {
      if (isOpen && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setDropdownStyle({
          position: 'fixed',
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width,
          zIndex: 9999,
        });
      }
    };

    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);

  // Click outside detection (trigger button and portal dropdown)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Filter options based on search query
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        handleSelect(filteredOptions[0].value);
      }
    }
  };

  // Find currently selected option to show its label
  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  const dropdown =
    isOpen && dropdownStyle.position
      ? ReactDOM.createPortal(
          <div
            className="combobox-dropdown"
            ref={dropdownRef}
            style={dropdownStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              className="combobox-search"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <div className="combobox-list-container">
              <div className="combobox-list">
                {filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`combobox-option-btn ${value === option.value ? 'selected' : ''}`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
                {filteredOptions.length === 0 && (
                  <div className="combobox-empty">{emptyMessage}</div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className={`combobox-container ${className}`} onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        ref={triggerRef}
        className={`combobox-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="combobox-trigger-text">{displayLabel}</span>
        <span className="chevron">{isOpen ? '▲' : '▼'}</span>
      </button>
      <select
        id={id}
        data-testid={dataTestId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ display: 'none' }}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {dropdown}
    </div>
  );
};
