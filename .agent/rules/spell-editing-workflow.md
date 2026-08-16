---
trigger: model_decision
description: When making bulk edits to spell or maneuver definitions across mystic sphere files
---

# Spell and Maneuver Editing Workflow

## Verification

When editing spell or maneuver definitions in `typescript/src/abilities/`:

- **Run `npm run test`** to verify changes. This is sufficient — you do NOT need to regenerate LaTeX output.
- Do NOT run `bin/rtgen.ps1` or `npm run generate_latex` to verify text changes. The test suite covers spell validation.
- The `npm run test` command handles compilation and runs all test files. Do not specify individual test files unless debugging a specific failure.

## Research Approach

Spell and maneuver definitions are plain TypeScript objects. Use `grep_search` and `view_file` to understand the pattern, then make edits directly. Do NOT write complex AST-parsing scripts to analyze spell data — the grep output provides file, line number, and context, which is sufficient.

## Bulk Edits Across Mystic Spheres

When making the same type of change across many mystic sphere files:

1. Use `grep_search` to find all occurrences of the relevant text pattern.
2. For each file, use `view_file` to understand the surrounding context (spell name, rank, structure).
3. Edit each file directly. Group related edits in the same file using `multi_replace_file_content`.
4. Run `npm run test` once after all edits are complete.

## Spell Structure Reference

Each spell object in a mystic sphere file typically has:
- `name`: The spell's display name.
- `rank`: The spell's rank (1–7).
- `attack.hit`: The hit effect text (where damage and extra damage phrasing lives).
- `functionsLike.exceptThat`: For "Mighty" variants, describes how the spell differs from its base version.
- `roles`, `scaling`, `tags`: Metadata fields.

"Mighty" variants of spells typically use `functionsLike` to reference the base spell and override specific properties via `exceptThat`. When moving phrasing from a base spell to its Mighty variant (or vice versa), update both the base spell's `attack.hit` and the variant's `functionsLike.exceptThat`.
