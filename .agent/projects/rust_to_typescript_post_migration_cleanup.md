# Project: Rust-to-TypeScript Post-Migration Cleanup

Now that bit-for-bit parity with the legacy Rust system has been achieved and verified, the focus has shifted to improving the TypeScript codebase's organization, robustness, and maintainability. This document tracks the progress of refactoring efforts that were deferred during the initial migration to maintain strict legacy compatibility.

## Current Objectives

1.  **Standardize Data Formatting**: Remove logic that specifically mimics Rust's idiosyncratic output ordering (e.g., skill list sorting).
2.  **Refactor Placeholder Logic**: Redesign the `replacePlaceholders` system to be more robust, safer, and less coupled to direct string manipulation.
3.  **Unify Data Models**: Bridge the gap between the LaTeX generation models and the Roll20 character sheet models (`creature.ts`).
4.  **Harden Test Coverage**: Add comprehensive unit tests for refactored components to ensure no regressions in game-mechanical output.

---

## Progress Tracker

### 1. Data Formatting Standardization ✅

- [x] **Skill List Sorting**: Updated `formatSkillList` in `metadata.ts` to sort Knowledge sub-skills alphabetically.
- [x] **Armor Proficiency Sorting**: Updated `latexArmorProficiencies` to sort specific armor lists alphabetically.
- [x] **Legacy Bug Fixes**:
  - [x] Removed duplicate `Craft` skill from Incarnation.
  - [x] Fixed `Composite Staff, 3rd` rank description.
  - [x] Standardized `Sleight of Hand` capitalization.

### 2. Refactor `replacePlaceholders` ✅

- [x] **Harden Test Coverage**: Added comprehensive unit tests in `replace_placeholders.test.ts` for names, power terms, and damage ranks.
- [x] **Refactor `replaceNames`**: Consolidated name replacement logic into a single pass that correctly handles titled monsters and article removal (e.g., "The $name" -> "Seraph").
- [x] **Improve Robustness**: Implemented safeguards against partial matches and fixed legacy bugs in `player_abilities.ts` that caused `$nameundefined` strings.

### 3. Data Model Unification ⏳

- [ ] **Extract Shared Interfaces**: Identify common properties between the character sheet `Creature` and LaTeX generation needs to reduce dependency on the full Roll20-coupled class.
- [ ] **Centralize Math Types**: Move `DicePool`, `DamageScaling`, and related types to a more central location if duplication is found.

---

## Key Changes & Design Decisions

### Name Replacement Refactor

- **Issue**: Titled monsters (e.g., "Seraph, Ophan") required special handling to remove "The" when using `$name` as a proper noun.

* **Solution**: Consolidated into a regex-based replacement that identifies the "The $name" pattern.
* **Learnings**: Order of operations matters; more specific patterns (like articles) must be replaced before general placeholders (`$name`) to prevent partial replacement collisions.

### Sortingdivergence

- **Decision**: We have officially diverged from Rust's output order for skill lists. TypeScript is now the authoritative source for how these should be presented (alphabetically).
