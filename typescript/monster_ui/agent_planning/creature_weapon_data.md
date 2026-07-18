# Refactor: Weapons as Simple Weapons + Separate Maneuvers

## Background

Currently, `WeaponConfig` has boolean flags (`addStandard`, `addMult`, `addGrappling`, `addSneak`, `addLatchOn`) that bundle both weapon equipping and strike-modification maneuvers into a single object. This is a strange design because the system already has a separate `standardAbilities` list for maneuvers.

The goal is to align with the design of `character_sheet/items_page.py`: weapons are just weapons (a name + options), and all special strike maneuvers (Weapon Multiplier, Grappling Strike, Sneak Attack, Latch On) are stored as `standardAbilities` with a `weapon` field pointing to the weapon they apply to.

## Proposed Design

### New `WeaponConfig`

```ts
export interface WeaponConfig {
  name: string;
  options?: {
    displayName?: string;
    isMagical?: boolean;
  };
}
```

The weapon is simply equipped (calls `creature.addWeapon(name)`). Removed: `addStandard`, `addMult`, `addGrappling`, `addSneak`, `addLatchOn`.

### `StandardAbilityConfig` (unchanged)

Strike modification maneuvers (`Weapon Multiplier`, `Grappling Strike`, `Sneak Attack`, `Latch On`) are already handled as `standardAbilities` with a `weapon` option pointing at the weapon name. This is already fully implemented in `creature_builder.ts` (`compileStandardManeuver`) and `codegen.ts` (`generateSharedPropertiesCode`).

### Existing `monsters_from_ui.json`

The existing JSON data uses the old `WeaponConfig` shape. A **one-time migration** will be performed:

For each weapon entry, the new data becomes:

1. A weapon entry in `weapons`: `{ name, options: { displayName, isMagical } }`
2. For each truthy flag:
   - `addMult` → new `standardAbility`: `{ type: 'maneuver', name: 'Weapon Multiplier', options: { weapon: name, isMagical, displayName } }`
   - `addGrappling` → `{ type: 'maneuver', name: 'Grappling Strike', options: { weapon: name, ... } }`
   - `addSneak` → `{ type: 'maneuver', name: 'Sneak Attack', options: { weapon: name, ... } }`
   - `addLatchOn` → `{ type: 'maneuver', name: 'Latch On', options: { weapon: name, ... } }`
   - `addStandard` is dropped (the weapon entry itself now implies equipping)

## Proposed Changes

### Shared Type Definitions

#### [MODIFY] [monster.ts](file:///c:/Users/vadsk/github/Rise/typescript/monster_ui/src/types/monster.ts)

- Remove `addStandard`, `addMult`, `addGrappling`, `addSneak`, `addLatchOn` from `WeaponConfig`.
- Keep `options.displayName` and `options.isMagical` on `WeaponConfig` (used for the base weapon itself).
- Remove `options.usageTime` from `WeaponConfig` — usage time belongs on maneuvers, not on weapon equips.

#### [MODIFY] [codegen.ts](file:///c:/Users/vadsk/github/Rise/typescript/monster_ui/server/codegen.ts)

- Update `WeaponConfig` interface to match new shape.
- Update `generateSharedPropertiesCode`: remove the old weapon-flag logic (which was actually already commented out/missing in `generateSharedPropertiesCode` — the `weapons` key was never emitted there!). Add a new "4. Weapons" section that calls `creature.addWeapon(name, options)` for each weapon.

---

### Server

#### [MODIFY] [creature_builder.ts](file:///c:/Users/vadsk/github/Rise/typescript/monster_ui/server/creature_builder.ts)

- Update weapon handling in both the group section (lines 179–197) and the monster section (lines 308–326):
  - Replace the `if (weapon.addStandard)` / `if (weapon.addMult)` / etc. block with a simple `creature.addWeapon(weapon.name, toMonsterAbilityOptions(weapon.options))`.

---

### Frontend

#### [MODIFY] [WeaponsSection.tsx](file:///c:/Users/vadsk/github/Rise/typescript/monster_ui/src/components/abilities/WeaponsSection.tsx)

- Remove all checkbox fields (`addStandard`, `addMult`, `addGrappling`, `addSneak`, `addLatchOn`).
- The section becomes simpler: just a weapon name + options (displayName, isMagical).
- The section header/description should be updated to "Weapons" (not "Weapons & Strike Modifications").

---

### Data Migration

#### [MODIFY] [monsters_from_ui.json](file:///c:/Users/vadsk/github/Rise/typescript/monster_ui/monsters_from_ui.json)

- Migrate each existing weapon to:
  1. Strip `addStandard`, `addMult`, `addGrappling`, `addSneak`, `addLatchOn`.
  2. Add any strike-modification maneuvers as new `standardAbilities`.

The existing sample data (`Goblin Skirmisher`, `Wolf Rider`, `Goblin Shaman`) all have `addStandard: true` and `addMult: true`. After migration:

- The `weapons` array will only have `{ name, options }`.
- A new `{ type: 'maneuver', name: 'Weapon Multiplier', options: { weapon: name, isMagical } }` will be added to `standardAbilities`.

## Verification Plan

### Manual Verification

- Load the UI and verify existing Goblin monsters now show their weapon as a simple weapon card, with the previously bundled maneuvers appearing in the Standard Abilities section.
- Validate a monster (click Preview/Validate) and confirm stats and active abilities are computed correctly.
- Add a new weapon and confirm the weapon is saved and re-loaded correctly.
