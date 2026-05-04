# Phase 4: Class & Archetype Migration

- [x] **Phase 4.1: Core Types & Standard Modifiers**
- [x] **Phase 4.2: Core Martial Archetypes**
- [x] **Phase 4.3: Core Spellcasting Archetypes**
- [x] **Phase 4.4: Uncommon Martial Archetypes**
- [x] **Phase 4.5: Uncommon Spellcasting Archetypes**
- [x] **Phase 4.6: Cleric Domains**
- [x] **Phase 4.7: Class Metadata & Base Class LaTeX Generation**

### Key Implementation Notes (Lessons from Phase 4.1-4.7)

#### Indentation in Template Literals
A major challenge when porting raw LaTeX text (such as class narratives) into TypeScript was maintaining exact indentation for the final output to achieve bit-for-bit parity. Rust uses 4-space string literals that naturally preserve formatting. In TypeScript, multi-line template literals introduce relative leading whitespace based on the code's indentation. 
- **Solution**: Use a robust `dedent` utility function that accepts an optional `baseIndent` argument. This allows you to write clean TypeScript code while uniformly stripping common leading whitespace and re-applying exactly the spacing needed for the final LaTeX output (e.g., 8 spaces for narrative paragraphs).

#### Escaping Backticks in TypeScript
LaTeX frequently uses sequences like \`\`ki'' for quotation marks. When writing these sequences inside TypeScript template literals, the literal backticks conflict with the template literal syntax and must be escaped.
- **Correct approach**: Use `\`` (backslash + backtick) to escape a literal backtick inside a template literal. For example, `\`\`ki''` safely produces the desired `\`\`ki''` output. 
- **Anti-pattern**: Avoid over-escaping (e.g., `\\\`\\``). This sequence evaluates to an escaped backslash followed by an unescaped backtick, terminating the template literal prematurely and causing build failures (e.g., `TransformError` in `tsx`).

#### Script Execution and Module Imports
When executing standalone verification scripts (like `verify_classes.ts`) directly via `tsx` or `ts-node` during the migration process, absolute path aliases (e.g., `@src/...`) may result in `MODULE_NOT_FOUND` errors if the path resolution isn't actively injected into the execution context.
- **Solution**: Use relative imports (e.g., `../equipment/armor` instead of `@src/equipment/armor`) in metadata and utility files that will be imported by these standalone CLI verification scripts. This ensures smooth, out-of-the-box execution for parity testing.

### Standard Modifiers Utility ✅

Port `rust/src/classes/archetype_rank_abilities/standard_modifiers.rs` first as a shared utility used by many archetype files.

### Indentation & Formatting

Archetype rank ability descriptions must be formatted as code in the TypeScript source files.

- **Base Indentation**: The description content should be indented with 8 spaces relative to the file.
- **Block Indentation**: Content within `\begin{...}` blocks must have an additional 2 spaces of indentation.
- **Formatting Script**: Use `npm run format_archetype -- --class-name=<name>` to consistently reformat an archetype file (e.g., `npm run format_archetype -- --class-name=barbarian`). This script handles proper LaTeX block indentation.
- **Conversion Logic**: The `metadata.ts` file contains a `cleanDescription` helper that automatically trims and dedents these descriptions during LaTeX generation.

### Phase 4.2: Core Martial Archetype Rank Abilities ✅

Port the martial core class archetype definitions:

- barbarian, fighter, monk, ranger, rogue

### Phase 4.3: Core Spellcasting Archetype Rank Abilities ✅

Port the spellcasting core class archetype definitions:

- cleric, druid, paladin, sorcerer, votive, wizard

### Phase 4.4: Uncommon Martial Archetype Rank Abilities ✅

Port the martial uncommon species class archetype definitions:

- automaton, dragon, dryad, harpy, incarnation, naiad, oozeborn, treant, troll, vampire

### Phase 4.5: Uncommon Spellcasting Archetype Rank Abilities ✅

(No uncommon species classes currently implement standard spellcasting.)

### Phase 4.6: Cleric Domains

Port `rust/src/classes/cleric_domains.rs` (24KB) — cleric domain definitions and LaTeX generation.

### Phase 4.7: Class Metadata & Base Class LaTeX Generation

Port `rust/src/classes/class.rs` (80KB) and `rust/src/classes/archetypes.rs` (25KB) to `typescript/src/classes/metadata.ts`:

- `Class` struct with `core_classes()`, `uncommon_classes()`, `latex_section()`, `validate_points()`
- `ClassArchetype` struct with `latex_description()`

#### Ongoing Work: Discrepancy Resolution in `metadata.ts`

The initial migration of `metadata.ts` resulted in inaccurate values for several class properties compared to the authoritative Rust source (`class.rs`). To achieve parity, the following helper functions must be refactored:

- **`getClassFatigueTolerance`**: Many classes are missing their correct value of 3 (defaulting to 2 instead).
- **`getClassInsightPoints`**: The value of 1 is missing for many classes.
- **`getClassTrainedSkills`**: The returned counts do not match the number of skills defined in the Rust source.
- **`getClassSkills`**: The arrays of skills are significantly truncated compared to the Rust source (e.g., Rogue has 13 skills in TS instead of 22).
- **`getClassVitalRollBonus`**: The bonus of 1 for Incarnation, Oozeborn, and Troll is missing.
- **`validateClassPoints`**: Needs to match the Rust validation logic which allows a +1 leeway (`actual_points > class_expected_points + 1`).

Note: `getClassDefenseBonus` was initially suspected to be incorrect, but has been verified to correctly implement the `baseBonus + classBonus` logic.

The goal is to update these functions to perfectly match the logic and values in `rust/src/classes/class.rs`, enabling accurate class point validation (71 points for core, 73 for uncommon).

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
