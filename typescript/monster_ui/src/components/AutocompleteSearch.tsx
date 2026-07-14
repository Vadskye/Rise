import React, { useState, useMemo, useEffect } from 'react';

export interface AutocompleteSearchProps {
  label: string;
  placeholder: string;
  items: string[];
  excludeItems: string[];
  onSelect: (item: string) => void;
}

export const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({
  label,
  placeholder,
  items,
  excludeItems,
  onSelect,
}) => {
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const excludeSet = useMemo(() => {
    return new Set(excludeItems.map((i) => i.toLowerCase()));
  }, [excludeItems]);

  const filtered = useMemo(() => {
    const searchLower = search.toLowerCase();
    return items.filter(
      (item) => item.toLowerCase().includes(searchLower) && !excludeSet.has(item.toLowerCase()),
    );
  }, [items, excludeSet, search]);

  useEffect(() => {
    setActiveIndex(0);
  }, [filtered]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || !search || filtered.length === 0) {
      return;
    }
    const maxItems = Math.min(filtered.length, 8);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, maxItems - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectedItem = filtered[activeIndex];
      if (selectedItem) {
        onSelect(selectedItem);
        setSearch('');
        setShowSuggestions(false);
        setActiveIndex(0);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="autocomplete-container" style={{ position: 'relative' }}>
      <label style={{ fontWeight: '600' }}>{label}</label>
      <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {showSuggestions && search && filtered.length > 0 && (
        <ul className="autocomplete-suggestions">
          {filtered.slice(0, 8).map((item, idx) => (
            <li
              key={item}
              className={idx === activeIndex ? 'active' : ''}
              onMouseDown={() => {
                onSelect(item);
                setSearch('');
                setShowSuggestions(false);
                setActiveIndex(0);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
