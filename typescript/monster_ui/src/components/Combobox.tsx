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

const getVisibleFocusableElements = (excludeContainer: HTMLElement | null): HTMLElement[] => {
  const selector =
    'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const elements = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
  return elements.filter((el) => {
    if (excludeContainer && excludeContainer.contains(el)) {
      return false;
    }
    const style = window.getComputedStyle(el);
    return (
      el.offsetWidth > 0 &&
      el.offsetHeight > 0 &&
      style.display !== 'none' &&
      style.visibility !== 'hidden'
    );
  });
};

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
  const pointerDownRef = useRef(false);
  const ignoreNextFocusRef = useRef(false);

  const handleMousedown = () => {
    pointerDownRef.current = true;
    setTimeout(() => {
      pointerDownRef.current = false;
    }, 100);
  };

  const handleFocus = () => {
    if (ignoreNextFocusRef.current) {
      ignoreNextFocusRef.current = false;
      return;
    }
    if (!pointerDownRef.current) {
      setIsOpen(true);
    }
  };

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

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
    ignoreNextFocusRef.current = true;
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        handleSelect(filteredOptions[0].value);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      ignoreNextFocusRef.current = true;
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      setIsOpen(false);
      const focusable = getVisibleFocusableElements(dropdownRef.current);
      const index = focusable.indexOf(triggerRef.current!);
      if (index !== -1) {
        const nextIndex = e.shiftKey ? index - 1 : index + 1;
        const target = focusable[nextIndex];
        if (target) {
          target.focus();
        }
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
              data-testid={id ? `${id}-combobox-search` : undefined}
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
        onMouseDown={handleMousedown}
        onFocus={handleFocus}
        onClick={handleClick}
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
