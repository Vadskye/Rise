---
trigger: always_on
---

# Rise Project Organization

## Project File Structure

| Directory | Purpose |
| :--- | :--- |
| `core_book/` | Main `.tex` files for the introductory rulebook aimed at new players. Rarely used. |
| `comprehensive_codex/` | `.tex` files for the comprehensive, primary rulebook. |
| `html_book/` | `.tex` source for the unified HTML version of the rulebooks. |
| `character_sheet/` | Python, Less, and JS for the dynamic character sheet. |
| `lib/` | Common `.tex` files used by all books. |
| `docs/` | Design documents and development notes (not for final output). |
| `bin/` | Shell scripts for compiling books and other automated tasks. |
| `rust/` | Rust project for generating LaTeX content (classes, monsters, equipment). |
| `typescript/` | TypeScript project for generating LaTeX content (spells, maneuvers). |
| `utils/` | Utility scripts. |