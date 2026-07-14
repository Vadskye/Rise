import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface WeaponComboboxProps {
  selectedWeapon?: string;
  weapons: string[];
  onSelect: (weapon: string | undefined) => void;
}

export const WeaponCombobox: React.FC<WeaponComboboxProps> = ({
  selectedWeapon,
  weapons,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Position the portal dropdown relative to the trigger button
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom + 6,
        left: rect.left,
        zIndex: 9999,
      });
    }
  }, [isOpen]);

  // Close on click outside (both trigger and portal dropdown)
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

  const filteredWeapons = weapons.filter((w) =>
    w.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (w: string | undefined) => {
    onSelect(w);
    setIsOpen(false);
    setSearch('');
  };

  const dropdown = isOpen
    ? ReactDOM.createPortal(
        <div
          className="weapon-combobox-dropdown"
          ref={dropdownRef}
          style={dropdownStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            className="weapon-combobox-search"
            placeholder="Search weapons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <div className="weapon-combobox-list-container">
            <div className="weapon-combobox-grid">
              <button
                type="button"
                className={`weapon-btn clear-btn ${!selectedWeapon ? 'selected' : ''}`}
                onClick={() => handleSelect(undefined)}
              >
                -- No Weapon --
              </button>
              {filteredWeapons.map((w) => (
                <button
                  key={w}
                  type="button"
                  className={`weapon-btn ${selectedWeapon === w ? 'selected' : ''}`}
                  onClick={() => handleSelect(w)}
                >
                  {w}
                </button>
              ))}
              {filteredWeapons.length === 0 && (
                <div style={{ gridColumn: 'span 2', textAlign: 'center', fontSize: '0.75rem', padding: '10px', color: 'var(--text-muted)' }}>
                  No matching weapons
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <div className="weapon-combobox-container" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        ref={triggerRef}
        className={`weapon-combobox-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Quickly assign a weapon to this maneuver"
      >
        <span className="weapon-combobox-trigger-text">{selectedWeapon || 'No Weapon'}</span>
        <span className="chevron">{isOpen ? '▲' : '▼'}</span>
      </button>

      {dropdown}
    </div>
  );
};
