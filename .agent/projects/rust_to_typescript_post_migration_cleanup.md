# Project: Rust-to-TypeScript Post-Migration Cleanup

Now that bit-for-bit parity with the legacy Rust system has been achieved and verified, the focus has shifted to improving the TypeScript codebase's organization, robustness, and maintainability. This document tracks the progress of refactoring efforts that were deferred during the initial migration to maintain strict legacy compatibility.

## ✅ Project Complete

All actionable items have been addressed. See below for closure notes on items that were not implemented.

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

### 3. Data Model Unification ✅ (Won't Fix)

- [x] **Centralize Math Types**: `DicePool` and `DamageScaling` are already in `core_mechanics/`. No further action needed.
- [~] **Extract Shared Interfaces**: Won't fix. No concrete use case identified; `Creature` already serves as the shared model.
- [~] **Remove Redundant Damage Logic**: Won't fix. After critical review, `calculateDamage` in `player_abilities.ts` and `replaceDamageRankTerms` in `replace_placeholders.ts` are **not redundant** — they handle different input formats (`\damagerankthree` LaTeX macros vs. `$dr3` numeric placeholders) at different pipeline stages with different requirements (excess rank calculation, LaTeX sign formatting). Merging them would add an unnecessary translation step and thread complexity into the placeholder engine.
- [~] **Remove Ad-Hoc Text Parsing**: Won't fix. `parseDamageRank` (English words → integers) and `numericMultiplier` (multiplier words → floats) parse a **fixed, bounded domain** from upstream LaTeX prose. Changing the upstream format would require touching 400+ spell/maneuver definitions for no functional benefit. The `parseDamageRank` comment should be updated to explain the rationale rather than treating this as a code smell.

---

## Key Changes & Design Decisions

### Name Replacement Refactor

- **Issue**: Titled monsters (e.g., "Seraph, Ophan") required special handling to remove "The" when using `$name` as a proper noun.
- **Solution**: Consolidated into a regex-based replacement that identifies the "The $name" pattern.
- **Learnings**: Order of operations matters; more specific patterns (like articles) must be replaced before general placeholders (`$name`) to prevent partial replacement collisions.

### Sorting Divergence

- **Decision**: We have officially diverged from Rust's output order for skill lists. TypeScript is now the authoritative source for how these should be presented (alphabetically).

### Damage Pipeline Architecture (Clarification)

During initial post-migration review, `player_abilities.ts` was flagged for "redundant" and "ad-hoc" damage logic. After a more thorough review, this analysis was incorrect:

- **`calculateDamage` is not redundant**: It handles `\damagerankthree`-style LaTeX macros from player-facing spell/maneuver definitions, correctly applying excess rank and formatting output with `\plus`/`\minus`. The `replaceDamageRankTerms` function handles `$dr3`-style numeric placeholders used in custom monster abilities, traps, and consumables — a different input format with different requirements.
- **English word parsing is correct**: `parseDamageRank` and `numericMultiplier` parse a fixed, bounded vocabulary from LaTeX prose. This is the right approach when the upstream data is English text. The "Don't laugh at me" comment in `parseDamageRank` reflects discomfort with the pattern, not a real problem; the domain is well-defined and the code is well-tested.
