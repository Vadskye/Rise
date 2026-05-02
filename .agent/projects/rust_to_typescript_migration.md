# Project: Rust to TypeScript Migration

## Progress Tracker

- [x] **Phase 1: Core Infrastructure & Shared Utilities**
- [ ] **Phase 2: Creature & Modifier System**
- [ ] **Phase 3: Equipment System Migration**
- [ ] **Phase 4: Class & Archetype Migration**
- [ ] **Phase 5: Module Migration**
- [ ] **Phase 6: Integration & Verification**
- [ ] **Phase 7: Cleanup**

## Goal

Migrate all Rust-based LaTeX generation logic in the `Rise` repository to the TypeScript project. This includes core game mechanics, equipment, classes, modules, and shared utilities. The goal is bit-for-bit parity in the generated `.tex` files.

## Principles

- **String Unions over Enums**: Use TypeScript string literal unions instead of enums to match existing codebase conventions and leverage TypeScript's string checking.
- **Unified Models**: Use `typescript/src/character_sheet/creature.ts` and `sheet_worker.ts` as the absolute source of truth for all character statistics and calculations. Do not duplicate logic for size-based modifiers, attribute modifiers, etc.
- **Separation of Concerns**: Keep LaTeX generation logic separate from the core data models.

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
- Passive abilitiess
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

### Supporting Types

Port the equipment infrastructure:

- `rust/src/equipment/item_rarity.rs` → `ItemRarity` (Common, Uncommon, Rare, etc.)
- `rust/src/equipment/item_price.rs` → `item_price()`, `rank_and_price_text()` (price is derived from rank + rarity)
- `rust/src/equipment/item_upgrade.rs` → `ItemUpgrade` struct (rank, short_description, description)
- `rust/src/equipment/item_creature.rs` → `item_creature()` factory (creates synthetic `Creature` for `replace_attack_terms`)
- `rust/src/equipment/poison.rs` → `Exposure`, `Form` enums and `poison_description()` function

### Data Structures

Define interfaces in `typescript/src/equipment/types.ts`:

- `StandardItem`: name, rank, rarity (`ItemRarity`), description, short_description, magical (bool), upgrades (`ItemUpgrade[]`), tags (`AbilityTag[]`)
- `Weapon`: base weapon stats (damage, accuracy, tags, group, material) — from `rust/src/equipment/weapons.rs` (20KB)
- `Armor`: base armor stats (defense, usage class, material) — from `rust/src/equipment/armor.rs`
- Static factory methods: `attribute_item()`, `skill_item()`, `reliable_skill_item()`

### LaTeX Generation

Port from `rust/src/equipment/`:

- `item_latex.rs` → `item_latex()` function generating `\begin{magicalattuneitem}` / `\begin{passiveitem}` blocks, including upgrade sections with `\upgraderank` and description validation warnings
- `latex_table.rs` → `TableRow`, `longtable()`, `longtable_percentile()` (with percentile range calculation for random loot), `standard_sort()`, `table_header()`

### Data Porting

Migrate all item data. Note that several Rust files have subdirectories with multiple files:

- `rust/src/equipment/apparel/` (arms.rs, head.rs, jewelry.rs, legs.rs, torso.rs) → `typescript/src/equipment/data/apparel/`
- `rust/src/equipment/implements/` (rods.rs, staffs.rs, wands.rs) → `typescript/src/equipment/data/implements/`
- `rust/src/equipment/magic_armor/` (body_armor.rs, shields.rs) → `typescript/src/equipment/data/magic_armor/`
- `rust/src/equipment/magic_weapons/` (melee.rs, ranged.rs, unrestricted.rs) → `typescript/src/equipment/data/magic_weapons/`
- `rust/src/equipment/tools/` (alchemical_items.rs, elixirs.rs, kits.rs, mounts.rs, objects.rs, poisons.rs, potions.rs, traps.rs) → `typescript/src/equipment/data/tools/`
- `rust/src/equipment/relics.rs` → `typescript/src/equipment/data/relics.ts`
- `rust/src/equipment/everything.rs` → `typescript/src/equipment/data/everything.ts` (combined table)

### Output Files

Equipment generates the following `.tex` files (preserving the Rust output destinations):

| Output File                                           | Directory                        | Content                |
| :---------------------------------------------------- | :------------------------------- | :--------------------- |
| `apparel.tex` / `apparel_table.tex`                   | `comprehensive_codex/generated/` | Descriptions and table |
| `implements.tex` / `implements_table.tex`             | `comprehensive_codex/generated/` | Descriptions and table |
| `magic_armor.tex` / `magic_armor_table.tex`           | `comprehensive_codex/generated/` | Descriptions and table |
| `magic_weapons.tex` / `magic_weapons_table.tex`       | `comprehensive_codex/generated/` | Descriptions and table |
| `consumable_tools.tex` / `consumable_tools_table.tex` | `comprehensive_codex/generated/` | Descriptions and table |
| `permanent_tools.tex` / `permanent_tools_table.tex`   | `comprehensive_codex/generated/` | Descriptions and table |
| `relics.tex` / `relics_table.tex`                     | `core_book/generated/`           | Descriptions and table |
| `everything_table.tex`                                | `core_book/generated/`           | Combined table         |

---

## Phase 4: Class & Archetype Migration

### Standard Modifiers Utility

Port `rust/src/classes/archetype_rank_abilities/standard_modifiers.rs` first as a shared utility used by many archetype files.

### Archetype Rank Abilities

Port each of the 22 Rust files in `rust/src/classes/archetype_rank_abilities/` to corresponding TypeScript files in `typescript/src/classes/definitions/`:

- 11 core classes: barbarian, cleric, druid, fighter, monk, paladin, ranger, rogue, sorcerer, votive, wizard
- 10 uncommon species classes: automaton, dragon, dryad, harpy, incarnation, naiad, oozeborn, treant, troll, vampire
- 1 utility: `standard_modifiers.ts`

### Cleric Domains

Port `rust/src/classes/cleric_domains.rs` (24KB) — cleric domain definitions and LaTeX generation.

### Class Metadata

Port `rust/src/classes/class.rs` (80KB) and `rust/src/classes/archetypes.rs` (25KB) to `typescript/src/classes/metadata.ts`:

- `Class` struct with `core_classes()`, `uncommon_classes()`, `latex_section()`, `validate_points()`
- `ClassArchetype` struct with `latex_description()`

### LaTeX Generation

Port `rust/src/classes/basic_class_abilities.rs` (13KB) and the formatting logic in `rust/src/classes/archetypes.rs`:

- `generate_latex_basic_class_abilities()` function
- Archetype LaTeX description formatting

### Output Files

| Output File                            | Directory                        | Content                                 |
| :------------------------------------- | :------------------------------- | :-------------------------------------- |
| `classes.tex`                          | `comprehensive_codex/generated/` | Full classes chapter (all core classes) |
| `<classname>.tex` (per uncommon class) | `comprehensive_codex/generated/` | Individual uncommon species class files |

> [!NOTE]
> The uncommon species class files should follow the construction logic found in `rust/src/bin/uncommon_species_classes.rs`, which combines the archetype description and basic class abilities.

> [!IMPORTANT]
> The `classes_chapter` binary calls `Class::validate_points()` after generating LaTeX. This validation must be preserved in the TypeScript version.

---

## Phase 5: Module Migration

Port `rust/src/modules/` to `typescript/src/modules/`:

- `Module` struct (introduction, name, description) and `to_latex()` method
- `the_house_of_liberation.rs` (16KB) → `typescript/src/modules/the_house_of_liberation.ts`
- The module contains embedded creature references (skeleton_guard, orc_butcher, human_cleric, human_warrior) that currently render as empty strings — preserve this behavior or implement the creature formatting.

### Output Files

| Output File   | Directory              | Content                    |
| :------------ | :--------------------- | :------------------------- |
| `modules.tex` | `core_book/generated/` | All modules sorted by name |

> [!NOTE]
> `modules_chapter` (The House of Liberation) is currently commented out in the Rust generation pipeline. This migration will restore its availability.

---

## Phase 6: Integration & Verification

### Integration

Add new generation commands to `typescript/src/scripts/generate_latex.ts` for all migrated categories:

- Equipment descriptions and tables (apparel, implements, magic armor, magic weapons, consumable tools, permanent tools, relics, everything)
- Classes chapter
- Uncommon species classes
- Modules chapter

Update `bin/rtgen` and `bin/rtgen.ps1` to include the new generation commands.

> [!IMPORTANT]
> `typescript/src/scripts/generate_latex.ts` must be extended to support categories and flags (descriptions vs tables) for equipment, matching the functionality of the Rust `item_latex` binary. Alternatively, create granular `--type` values for each combination (e.g., `equipment_apparel_descriptions`, `equipment_apparel_table`).

### Verification Strategy

1. **Capture baseline snapshots**: Before starting migration work, run `generate_rust_files.fish` and save all generated `.tex` files as a reference baseline.
2. **Per-phase verification**: After completing each phase, diff the specific outputs that phase covers rather than waiting until the end:
   - Phase 3: diff each equipment `.tex` file
   - Phase 4: diff `classes.tex` and each uncommon species `.tex` file
   - Phase 5: diff `modules.tex`
3. **Whitespace normalization**: Account for possible whitespace-only differences between Rust and TypeScript `latexify` implementations during comparison.
4. **Validation warnings**: Port the Rust `eprintln!` validation checks (e.g., item descriptions starting with "as an action", damage types in short descriptions) as `console.warn` calls in TypeScript.
5. **Parity gate**: Fix any discrepancies until `diff` shows zero meaningful changes for each output file.

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
