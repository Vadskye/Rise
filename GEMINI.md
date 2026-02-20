# Gemini Instructions

In this session, you will be focusing on development of the Rise tabletop role-playing game.

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

## Generation Logic

*   **Rust:** Generates LaTeX for classes, monsters, and equipment.
    *   Source: `rust/src/`
    *   Generation script: `rust/src/bin/generate_rust_files.fish`
    *   **Important:** Ignore the `rust/target` directory in all searches.
*   **TypeScript:** Generates LaTeX for spells and combat maneuvers.
    *   Source: `typescript/src/`
    *   Generation script: `typescript/src/scripts/generate_latex`

## Memories

@./memories/characters.md
@./memories/equipment.md
@./memories/spells.md
@./memories/combat.md
@./memories/glossary.md
@./memories/character_sheet.md    
@./memories/classes.md
@./memories/coding_conventions.md

## Writing Style

Rise has a mixture of game rules and more general prose directed at players and Game Masters. Rules should be written in a clear, declarative form. However, advice and narrative text should have a more casual, engaging tone. Contractions are acceptable.
