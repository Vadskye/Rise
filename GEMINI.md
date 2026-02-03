# Gemini Instructions

In this session, you will be focusing on development of the Rise tabletop role-playing game. You have relevant memory files in `./memories/`. Consult those files for context on game rules and coding conventions in Rise.

## Project File Structure

| Directory | Purpose |
| :--- | :--- |
| `core_book/` | Main `.tex` files for the core rulebook. |
| `comprehensive_codex/` | `.tex` files for the expanded rulebook. |
| `html_book/` | `.tex` source for the unified HTML version of the rulebooks. |
| `character_sheet/` | Python, Less, and JS for the dynamic character sheet. |
| `lib/` | Common `.tex` files used by all books. |
| `docs/` | Design documents and development notes (not for final output). |
| `bin/` | Shell scripts for compiling books and other automated tasks. |
| `rust/` | Rust project for generating LaTeX content (classes, monsters, equipment). |
| `typescript/` | TypeScript project for generating LaTeX content (spells, maneuvers). |
| `utils/` | Utility scripts. |

## Key Generation Logic

*   **Rust:** Generates LaTeX for classes, monsters, and equipment.
    *   Source: `rust/src/`
    *   Generation script: `rust/src/bin/generate_rust_files.fish`
    *   **Important:** Ignore the `rust/target` directory in all searches.
*   **TypeScript:** Generates LaTeX for spells and combat maneuvers.
    *   Source: `typescript/src/`
    *   Generation script: `typescript/src/scripts/generate_latex`

## Memory File Quick Reference

| Memory File | Content |
| :--- | :--- |
| `character_sheet.md` | Character sheet functionality. |
| `characters.md` | Character creation and rules. |
| `classes.md` | Summary of character classes. |
| `coding_conventions.md` | LaTeX and coding style guide. |
| `combat.md` | Combat rules. |
| `equipment.md` | Equipment rules. |
| `glossary.md` | Key game terms and concepts. |
| `spells.md` | Spellcasting and mystic spheres. |

## Writing Style

Rise has a mixture of game rules and more general prose directed at players and Game Masters. Rules should be written in a clear, declarative form. However, advice and narrative text should have a more casual, engaging tone. Contractions are acceptable.
