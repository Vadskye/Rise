# Project: Rust to TypeScript Migration

## Progress Tracker

- [x] **Phase 1: Core Infrastructure & Shared Utilities**
- [x] **Phase 2: Creature & Modifier System**
- [x] **Phase 3: Equipment System Migration**
  - [x] **Phase 3.1: Equipment Infrastructure & Armor**
  - [x] **Phase 3.2: Held Items (Weapons & Implements)**
  - [x] **Phase 3.3: Apparel**
  - [x] **Phase 3.4: Consumables (Potions, Alchemical Items, Poisons)**
  - [x] **Phase 3.5: Tools & Relics**
- [ ] **Phase 4: Class & Archetype Migration** (See [rust_to_typescript_classes.md](./rust_to_typescript_classes.md))
- [ ] **Phase 5: Module Migration**
- [ ] **Phase 6: Integration & Verification**
- [ ] **Phase 7: Cleanup**

## Progress Tracking Methodology

To maintain a consistent and transparent record of the migration progress, the following protocol must be followed:

1. **Progress Tracker**: Update the high-level `Progress Tracker` section in this file at the end of each task to reflect completed phases.
2. **Granular Tasks**: Use the `task.md` artifact in the App Data Directory to track specific, immediate sub-tasks during an active session.
3. **Walkthroughs**: Document significant architectural changes and completed milestones in the `walkthrough.md` artifact.
4. **Verification**: Mark phases as complete only after normalized semantic parity (ignoring irrelevant whitespace) has been verified.
5. **Test Pass Guarantee**: A phase is not considered complete until `npm run test` is fully passing in the TypeScript project. This ensures that new features haven't introduced regressions.

## Goal

Migrate all Rust-based LaTeX generation logic in the `Rise` repository to the TypeScript project. This includes core game mechanics, equipment, classes, modules, and shared utilities. The goal is normalized semantic parity (ignoring irrelevant whitespace) in the generated `.tex` files.

## Principles

- **String Unions over Enums**: Use TypeScript string literal unions instead of enums to match existing codebase conventions and leverage TypeScript's string checking.
- **Unified Models**: Use `typescript/src/character_sheet/creature.ts` and `sheet_worker.ts` as the absolute source of truth for all character statistics and calculations. Do not duplicate logic for size-based modifiers, attribute modifiers, etc.
- **Separation of Concerns**: Keep LaTeX generation logic separate from the core data models.
- **LaTeX Braces over Angle Brackets**: Use standard LaTeX curly braces `{}` in TypeScript code. Do not port the Rust `<>` hack (used to avoid Rust string interpolation conflicts). LaTeX generation utilities like `latexify` should NOT convert angle brackets to braces.

## User Review Required

> [!IMPORTANT]
> This migration will transition the source of truth for many game rules from Rust to TypeScript. All new generation commands will be added to `bin/rtgen` (fish) and `bin/rtgen.ps1` (PowerShell) alongside the existing TypeScript generation tasks.

> [!WARNING]
> The Rust `monsters/` directory (including `specific_monsters/dragons.rs`) and `calculations/spell_damage_scaling` are dead code and will be deleted without migration.

---

## Phase 1: Core Infrastructure & Shared Utilities

### LaTeX Formatting Utilities

Review and extend existing utilities in `typescript/src/latex/format/`. These should be kept in sync with or replace the logic in `rust/src/latex_formatting.rs`.

- `latexify.ts`: Ensure it handles all replacements from Rust's `latexify` (angle brackets → braces, `+N` → `\plus N`, ` - N` → ` \sub N`, ` -N` → ` \minus N`, `+` → `\add`, tab/CR warnings, midline `\\` warnings, `pcref` warnings).
- `join_string_list.ts`: Already exists (verify it supports custom conjunctions like Rust's `join_str_list_custom`).
- `modifier.ts`, `uppercase_first.ts`: Already exist.
- Add `text_number.ts` (converts integers 0–10 to words; panics on out-of-range).
- Port `remove_indentation` and `non_indented_block` as test helpers.
- Port `assert_multiline_eq` from `rust/src/testing/assertions.rs` to facilitate bit-for-bit parity testing.

### Shared Game Types

Create or extend `typescript/src/types/core.ts` for constants used across the system:

- Attributes (Strength, Dexterity, etc.) — use `RiseAttribute` from `rise_data.ts`.
- Defenses (Armor, Fortitude, etc.) — use `RiseDefense` from `rise_data.ts`.
- Skills (24 skills with attribute mappings) — use `RiseSkill` from `rise_data.ts` and metadata from `creature.ts`.
- Sizes (Fine through Colossal) — use `RiseSize` from `rise_data.ts` (correcting any misspellings) and calculations from `sheet_worker.ts`.
- Senses
- Resources
- Tags — use `RiseTag`
- Debuffs — use `RiseDebuff`
- Damage dice and dice pools — port from `rust/src/core_mechanics/damage_dice.rs` and `dice_pool.rs` (these are generation-specific).
- Movement modes and speeds — use `creature.ts` / `sheet_worker.ts`.
- Passive abilities
- Vital wounds
- Damage absorption

---

## Phase 2: Creature & Modifier System

> [!IMPORTANT]
> The existing `typescript/src/character_sheet/creature.ts` must be used as the **baseline for all creature calculations**. This ensures consistency between Roll20 and the generated book. However, LaTeX generation logic must remain separate from the core `Creature` class to avoid polluting the Roll20-specific logic.

### Core Types

Port the attack and ability infrastructure from `rust/src/core_mechanics/`, integrating it into the existing TypeScript models:

- `abilities.rs` — `ActiveAbility`, `AbilityTag`, `AttuneType`, `replace_attack_terms()`
- `attacks.rs` / `attacks/` — `Attack`, `Maneuver`, `StandardAttack`

### Modifier System

Port from `rust/src/creatures/modifier.rs`:

- `Modifier` enum (use TypeScript discriminated unions) — 25+ variant types covering accuracy, defenses, attributes, attacks, maneuvers, active/passive abilities, etc.
- `ModifierType` enum
- `IdentifiedModifier` struct with priority-based replacement logic
- `HasModifiers` trait → TypeScript interface/mixin

### Creature

Port from `rust/src/creatures/creature.rs`:

- `Creature` struct with attributes, armor, weapons, modifiers, movement, senses, etc.
- `calculate_standard_rank()` and `calculate_minimum_level()` functions
- `add_standard_maneuvers()` and `add_standard_spells()` methods (for testing)

### Supporting Creature Files

- `rust/src/creatures/character.rs` → character creation and standard sets
- `rust/src/creatures/modifier_bundle.rs` → modifier bundle utilities
- `rust/src/creatures/points.rs` → point calculations
- `rust/src/creatures/latex.rs` → creature LaTeX formatting (for monsters/module NPCs)
- `rust/src/creatures/damage_tracking.rs` → damage tracking utilities

> [!NOTE]
> The existing `typescript/src/character_sheet/creature.ts` and `typescript/src/classes/archetypes/barbarian.ts` already implement parts of this system for the character sheet. The migration should unify or extend these rather than creating a parallel system.

---

## Phase 3: Equipment System Migration

> [!NOTE]
> Phase 3 is split into several sub-phases due to the volume of equipment data.

### Key Implementation Notes (Lessons from Phase 3.1)

#### Placeholder Replacement

Item descriptions use `$accuracy`, `$damage`, `$dr4`, `$mundanepower`, etc. — the same placeholder system used by monster abilities. The Rust code calls `replace_attack_terms()` for this; the TypeScript equivalent is `replacePlaceholders()` from `typescript/src/latex/monsters/replace_placeholders.ts`.

- **Both item descriptions and table row short descriptions** go through placeholder replacement. The Rust `item_latex.rs` calls `replace_attack_terms()` on descriptions, and `latex_table.rs` calls it on table rows.
- The TypeScript `replacePlaceholders()` function requires a `Creature` with a **non-empty, title-cased name** (it calls `replaceNames()` which throws on lowercase/undefined names). The `getItemCreature()` factory must set a name (currently `"The Item"`) via `creature.setProperties()`, not `creature.setRequiredProperties()` (which doesn't accept `name`).
- Pass `{ isMagical: item.magical }` as the `ReplacementContext` to ensure the correct power type (mundane vs magical) is used for damage calculations.

#### Format Differences: Tables vs Item Blocks

- **Table rows** use the raw `getRankAndPriceText()` output directly (e.g., `2 (20 gp)`).
- **Item blocks** (`item_latex.ts`) prefix it with `Rank` (e.g., `Rank 2 (20 gp)`). This is baked into the `\begin{magicalattuneitem}{Name}{Rank ...}` format string, not into `getRankAndPriceText()` itself.

#### Rust-to-TypeScript Function Mapping

| Rust Function            | TypeScript Equivalent   | Location                                 |
| :----------------------- | :---------------------- | :--------------------------------------- |
| `replace_attack_terms()` | `replacePlaceholders()` | `latex/monsters/replace_placeholders.ts` |
| `item_creature()`        | `getItemCreature()`     | `equipment/item_creature.ts`             |
| `item_price()`           | `getItemPrice()`        | `equipment/item_price.ts`                |
| `rank_and_price_text()`  | `getRankAndPriceText()` | `equipment/item_price.ts`                |
| `item_latex()`           | `itemLatex()`           | `equipment/latex/item_latex.ts`          |
| `TableRow::from_item()`  | `fromItem()`            | `equipment/latex/latex_table.ts`         |
| `TableRow::to_latex()`   | `rowToLatex()`          | `equipment/latex/latex_table.ts`         |
| `longtable()`            | `longtable()`           | `equipment/latex/latex_table.ts`         |
| `longtable_percentile()` | `longtablePercentile()` | `equipment/latex/latex_table.ts`         |
| `standard_sort()`        | `standardSort()`        | `equipment/latex/latex_table.ts`         |
| `latexify()`             | `latexify()`            | `latex/format/latexify.ts`               |

#### StandardItem and Tags

- `StandardItem.tags` uses `ActiveAbility['tags']` (the same tag type used by abilities). Tag values like `"Attune"`, `"Attune (deep)"`, `"Attune (target)"` are string literals, not a separate enum. The `formatTagLatex()` function from `latex/format` handles rendering these as `\abilitytag{Attune}` etc.
- The Rust `AbilityTag` enum (with variants like `Attune(AttuneType)`) maps to simple strings in TypeScript. Check `isAttuned` by testing `tag.toLowerCase().includes('attune')`.

### Phase 3.1: Equipment Infrastructure & Armor ✅

#### Supporting Types & Logic

Port the core equipment infrastructure (used by all sub-phases):

- `rust/src/equipment/item_rarity.rs` → `ItemRarity` (Common, Relic)
- `rust/src/equipment/item_price.rs` → `item_price()`, `rank_and_price_text()`
- `rust/src/equipment/item_upgrade.rs` → `ItemUpgrade` struct
- `rust/src/equipment/item_creature.rs` → `item_creature()` factory
- `rust/src/equipment/item_latex.rs` → `item_latex()` formatting logic
- `rust/src/equipment/latex_table.rs` → `longtable` helpers

#### Armor Data & Logic

- `rust/src/equipment/armor.rs` → `Armor` stats, materials, and definitions
- `rust/src/equipment/magic_armor/` → `body_armor.rs`, `shields.rs`
- LaTeX output: `magic_armor.tex`, `magic_armor_table.tex`

### Phase 3.2: Held Items (Weapons & Implements) ✅

Each sub-phase only needs to port the **data definitions and any category-specific logic** (e.g., crafting text strings, `ToTableRows` implementations). The shared infrastructure (`itemLatex()`, `fromItem()`, `longtable()`, `replacePlaceholders()`, etc.) was completed in Phase 3.1.

- `rust/src/equipment/weapons.rs` → `Weapon` stats, tags, groups, and materials
- `rust/src/equipment/magic_weapons/` → `melee.rs`, `ranged.rs`, `unrestricted.rs`
- `rust/src/equipment/implements/` → `rods.rs`, `staffs.rs`, `wands.rs`
- LaTeX output: `magic_weapons.tex`, `magic_weapons_table.tex`, `implements.tex`, `implements_table.tex` [✅ Verified Tables]

### Phase 3.3: Apparel

- `rust/src/equipment/apparel/` → `arms.rs`, `head.rs`, `jewelry.rs`, `legs.rs`, `torso.rs`
- LaTeX output: `apparel.tex`, `apparel_table.tex`

### Phase 3.4: Consumables (Potions, Alchemical Items, Poisons)

- `rust/src/equipment/poison.rs` → `Exposure`, `Form`, and description logic
- `rust/src/equipment/tools/` → `alchemical_items.rs`, `elixirs.rs`, `poisons.rs`, `potions.rs`
- LaTeX output: `consumable_tools.tex`, `consumable_tools_table.tex`

### Phase 3.5: Tools & Relics

- `rust/src/equipment/tools/` → `kits.rs`, `mounts.rs`, `objects.rs`, `traps.rs`
- `rust/src/equipment/relics.rs` → `relics.ts`
- `rust/src/equipment/everything.rs` → Combined table logic
- LaTeX output: `permanent_tools.tex`, `permanent_tools_table.tex`, `relics.tex`, `relics_table.tex`, `everything_table.tex`

---

## Phase 4: Class & Archetype Migration

See [rust_to_typescript_classes.md](./rust_to_typescript_classes.md) for details.

---

## Phase 5: Module Migration [COMPLETED]

Port `rust/src/modules/` to `typescript/src/modules/`:

- [x] `Module` struct (introduction, name, description) and `to_latex()` method
- [x] `the_house_of_liberation.rs` (16KB) → `typescript/src/modules/the_house_of_liberation.ts`
- The module contains embedded creature references (skeleton_guard, orc_butcher, human_cleric, human_warrior) that currently render as empty strings — preserve this behavior or implement the creature formatting.

### Output Files

| Output File   | Directory              | Content                    |
| :------------ | :--------------------- | :------------------------- |
| `modules.tex` | `core_book/generated/` | All modules sorted by name |

> [!NOTE]
> `modules_chapter` (The House of Liberation) is currently commented out in the Rust generation pipeline. This migration will restore its availability.

---

## Phase 6: Integration & Verification [COMPLETED]

### Integration

- [x] Add new generation commands to `typescript/src/scripts/generate_latex.ts` for all migrated categories.
- [x] Update `bin/rtgen` and `bin/rtgen.ps1` to include the new generation commands.
- [x] Implement uncommon species classes generation script.

### Verification Strategy

- [x] Verify full pipeline execution and parity with legacy outputs.

#### How to Run a Comparison

This is the canonical workflow for comparing Rust vs TypeScript output for any equipment category. Follow it exactly — do not read source files speculatively.

**Step 1: Generate the Rust baseline** (run from `rust/` directory)

```powershell
cargo run --bin item_latex -- --category <CATEGORY> --table > rust_<category>_table.txt
cargo run --bin item_latex -- --category <CATEGORY> --descriptions > rust_<category>_descriptions.txt
```

Valid `--category` values: `implements`, `apparel`, `magic armor`, `magic weapons`, `consumable tools`, `permanent tools`, `relics`, `everything`.

**Step 2: Generate the TypeScript output** (run from `typescript/` directory)

```powershell
npx tsx src/scripts/compare_equipment.ts --category <category> --table > ts_<category>_table.txt
npx tsx src/scripts/compare_equipment.ts --category <category> --descriptions > ts_<category>_descriptions.txt
```

(See `typescript/src/scripts/compare_equipment.ts` — create this script if it does not exist.)

**Step 3: Diff using the normalize-aware script**

```powershell
npx tsx typescript/src/scripts/verify_latex_parity.ts rust_<category>_table.txt ts_<category>_table.txt
npx tsx typescript/src/scripts/verify_latex_parity.ts rust_<category>_descriptions.txt ts_<category>_descriptions.txt
```

The `verify_latex_parity.ts` script normalizes whitespace and encoding differences before comparing. Any remaining difference is a semantic discrepancy that must be fixed.

**Step 4: Fix discrepancies, then re-run Step 3 until clean.**

> [!IMPORTANT]
> Do NOT read Rust or TypeScript source files to reason about what the output _should_ be. Run both generators and compare the actual output. The diff tells you exactly what to fix.

#### Other Verification Notes

- **Whitespace normalization**: `verify_latex_parity.ts` normalizes all whitespace, so insignificant formatting differences are ignored.
- **Encoding**: PowerShell redirects may produce UTF-16LE. `verify_latex_parity.ts` handles this automatically.
- **Validation warnings**: Port the Rust `eprintln!` validation checks (e.g., item descriptions starting with "as an action", damage types in short descriptions) as `console.warn` calls in TypeScript.
- **Parity gate**: A phase is complete only when `verify_latex_parity.ts` reports `MATCH` for all relevant files.

---

## Phase 7: Cleanup

- Delete the `rust/` directory entirely (including dead code: `monsters/`, `calculations/`, `testing/`).
- Remove `bin/rcgen` (fish script for Rust generation).
- Remove `generate_rust_files.fish`.
- Update project documentation to reflect the unified TypeScript system.

---

## Existing TypeScript Assets to Leverage

| Existing File                                    | Relevant Phase | Notes                                                                              |
| :----------------------------------------------- | :------------- | :--------------------------------------------------------------------------------- |
| `typescript/src/classes/archetypes/barbarian.ts` | Phase 4        | Partial archetype port for character sheet — useful as a reference for conventions |
| `typescript/src/monsters/equipment.ts`           | Phase 3        | Monster equipment definitions already in TS                                        |
| `typescript/src/monsters/weapons.ts`             | Phase 3        | Monster weapon definitions already in TS                                           |
| `typescript/src/latex/format/latexify.ts`        | Phase 1        | Already exists with tests                                                          |
| `typescript/src/latex/format/spell_effect.ts`    | Phase 2        | Contains `replace_attack_terms`-like logic for spells                              |
| `typescript/src/character_sheet/creature.ts`     | Phase 2        | Existing creature model for character sheet                                        |

## Risk Assessment

| Risk                                                     | Severity | Mitigation                                                                                        |
| :------------------------------------------------------- | :------- | :------------------------------------------------------------------------------------------------ |
| `replace_attack_terms` is complex and deeply integrated  | High     | Port early (Phase 2) with comprehensive tests                                                     |
| `class.rs` is 80KB with complex validation logic         | High     | Break into sub-tasks per class; verify incrementally                                              |
| Modifier system is Rust-idiomatic (enums with data)      | Medium   | Use TypeScript discriminated unions                                                               |
| `latexify` regex behavior may differ between Rust and TS | Medium   | Port existing Rust tests; add edge case tests                                                     |
| Existing TS creature model conflicts with ported logic   | High     | Use `character_sheet/creature.ts` as the baseline; refactor carefully to separate math from LaTeX |
