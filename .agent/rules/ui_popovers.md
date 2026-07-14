---
trigger: model_decision
description: Guidelines for how to create UI popovers, which are preferred over dropdown menus.
---

## UI Popovers

Many card components (e.g. `.ability-item-card`) use `overflow: hidden` for visual styling. Any `position: absolute` dropdown rendered inside such a card will be clipped, regardless of `z-index`.

**Solution: use `ReactDOM.createPortal` + `getBoundingClientRect`.**

Pattern (see [WeaponPopover.tsx](../../typescript/monster_ui/src/components/abilities/WeaponPopover.tsx) for a full example):

1. Attach a `ref` to the trigger button.
2. On open, call `triggerRef.current.getBoundingClientRect()` to get viewport-relative coordinates and store them as `position: fixed` inline styles on the dropdown.
3. Render the dropdown via `ReactDOM.createPortal(..., document.body)` so it is appended to `<body>`, escaping all ancestor clipping contexts.
4. In the "click outside" `mousedown` handler, check **both** the trigger ref and the dropdown ref (they are no longer in the same DOM subtree).
5. In the CSS, do **not** set `position`, `top`, or `left` on the dropdown class — those are provided entirely by the inline styles computed in step 2.

### Example

```tsx
import ReactDOM from 'react-dom';
const triggerRef = useRef<HTMLButtonElement>(null);
const dropdownRef = useRef<HTMLDivElement>(null);
const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
useEffect(() => {
  if (isOpen && triggerRef.current) {
    const rect = triggerRef.current.getBoundingClientRect();
    setDropdownStyle({ position: 'fixed', top: rect.bottom + 6, left: rect.left, zIndex: 9999 });
  }
}, [isOpen]);
// In JSX:
const dropdown = isOpen
  ? ReactDOM.createPortal(
      <div className="my-dropdown" ref={dropdownRef} style={dropdownStyle}>...</div>,
      document.body
    )
  : null;
```