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

### 2. Refactor `replacePlaceholders` ⏳

- [x] **Harden Test Coverage**: Added comprehensive unit tests in `replace_placeholders.test.ts` for names, power terms, and damage ranks.
- [ ] **Improve Robustness**: Implement safeguards against partial matches and fix legacy bugs in `player_abilities.ts` that caused `$nameundefined` strings.
- [ ] **Remove Premature Evaluation**: `player_abilities.ts` eagerly evaluates damage ranks (e.g., `\damagerankfourlow`) by calling `calculateDamage`. It should instead normalize these to `$dr4l` placeholders and delegate the math to the unified `replaceDamageRankTerms` engine in `replace_placeholders.ts`.

### 3. Data Model Unification ⏳

- [ ] **Extract Shared Interfaces**: Identify common properties between the character sheet `Creature` and LaTeX generation needs to reduce dependency on the full Roll20-coupled class.
- [ ] **Centralize Math Types**: Move `DicePool`, `DamageScaling`, and related types to a more central location if duplication is found.
- [ ] **Remove Redundant Damage Logic**: `player_abilities.ts` has an ad-hoc `calculateDamage` method that manually re-implements damage scaling (constructing dice strings). This is redundant and should be replaced by the canonical `DamageScaling.dr(rank)` and `DamageScaling.drl(rank)` methods in `types/attack.ts`.
- [ ] **Remove Ad-Hoc Text Parsing**: `player_abilities.ts` uses hardcoded maps (e.g., `parseDamageRank` with its "Don't laugh at me" comment, `numericMultiplier`) to convert text strings like "two" and "half" into numbers. This requires further investigation to see if upstream data can be structured better to avoid parsing English words from regex matches.

---

## Key Changes & Design Decisions

### Name Replacement Refactor

- **Issue**: Titled monsters (e.g., "Seraph, Ophan") required special handling to remove "The" when using `$name` as a proper noun.

* **Solution**: Consolidated into a regex-based replacement that identifies the "The $name" pattern.
* **Learnings**: Order of operations matters; more specific patterns (like articles) must be replaced before general placeholders (`$name`) to prevent partial replacement collisions.

### Sorting divergence

- **Decision**: We have officially diverged from Rust's output order for skill lists. TypeScript is now the authoritative source for how these should be presented (alphabetically).

### Identified Architectural Issues

During a critical review of the TypeScript implementation following the migration, several overlapping and redundant structures were identified, primarily stemming from a literal port of Rust string-manipulation patterns that ignored the unified core models.

- **Ad-Hoc Text Parsing**: The `typescript/src/latex/monsters/player_abilities.ts` file contains hardcoded dictionary maps (`parseDamageRank` and `numericMultiplier`) to parse English words (e.g., "two", "half") into integers. This is a fragile pattern (acknowledged by a "Don't laugh at me" comment) that stems from extracting information from raw text via regex rather than working with structured data types. It requires refactoring to use robust parsing or upstream data restructuring.
- **Redundant Damage Scaling**: `player_abilities.ts` manually constructs dice strings (e.g., `1d8+...d6`) within `calculateDamage`, fully duplicating the canonical `DamageScaling` logic in `typescript/src/types/attack.ts`. This bypasses the unified game logic models in favor of ad-hoc string building.
- **Premature Evaluation of Placeholders**: `replaceDamageText` within `player_abilities.ts` attempts to immediately resolve LaTeX damage placeholders (like `\damagerankfourlow`) into final strings. This circumvents the central placeholder engine (`replace_placeholders.ts`), which already possesses a `replaceDamageRankTerms` function designed specifically to resolve `$dr4l` placeholders via the unified `DamageScaling` logic. The system should instead normalize the LaTeX terms to the standard placeholder format and delegate the calculation.
