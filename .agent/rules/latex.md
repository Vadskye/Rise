---
trigger: model_decision
description: Applied when editing LaTeX (.tex) files to ensure adherence to Rise project coding and formatting standards.
---

- **Line Breaks**: Each new sentence in a .tex file should be on a separate line. Long lines are discouraged, though there is no strict line length limit.
- **Wrapped Terms**: Many LaTeX commands wrap game terminology for formatting or context (e.g., `\glossterm` or `\ability`). Wrap only the **first instance** of that word in each paragraph or ability block. Subsequent uses should be plaintext.
- **Ability References**: Use `\ability{ability name}` in lower case for specific named abilities. Do not use `\textit{...}`.
- **Glossary Terms**: Terms defined in `core_book/Glossary.tex` should be wrapped with `\glossterm{term}` if it's the first appearance in its paragraph or ability block.
- **Buffs and Debuffs**: Use custom commands from `lib/buffs_and_debuffs.tex` (e.g., `\blinded`, `\dazzled`, `\prone`, `\empowered`) instead of `\glossterm`.
- **Numeric Modifiers**: Use `\plusX` and `\minusX` (e.g., `a \plus2 bonus`, `a \minus4 penalty`) instead of `+` and `-` signs.
- **Cross-References**: Use `\pcref{Label}` for page references and `\tref{Label}` for table references. Use `\trefnp{Label}` if the table is on the same page.
- **Other Terminology**:
  - `\sphere{...}` for mystic spheres.
  - `\combatstyle{...}` for combat styles.
  - `\weapontag{...}` for weapon tags (`comprehensive_codex/Equipment.tex`).
  - `\abilitytag{...}` for ability tags (`core_book/Reference.tex`).
  - `\trait{...}` for traits (`core_book/Reference.tex`).
- **LaTeX Syntax**: Escape percentage signs (`\%`). Use `{}` for mandatory arguments and `[]` for optional ones.
- **Environments**: Use specific environments for abilities: `\begin{activeability}{Name}[Tags]`, `\begin{magicalactiveability}{Name}{Tags}`, `\begin{sustainability}{Name}{Tags}`, and `\begin{attuneability}{Name}{Tags}`.
