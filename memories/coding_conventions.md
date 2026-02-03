# Rise Coding Conventions

* **Line Breaks**: Each new sentence in a .tex file should be on a separate line. Long lines are discouraged, though there is no strict line length limit.
* **Wrapped Terms**: There are many LaTeX commands which wrap game terminology for additional formatting or context, such as `\glossterm` or `\ability`. Each paragraph of text or ability block should only wrap the first instance of that word. Subsequent uses of the word should appear as plaintext.
* **Ability References**: Use `\ability{ability name}`, in lower case, for specific named abilities. Do not use `\textit{...}` for ability names.
* **Glossary Terms**: Terms that are defined in the glossary (`core_book/Glossary.tex`) should be wrapped with `\glossterm{glossary entry}`, where "glossary entry" is the name of the term, if it is the first appearance of the term in its paragraph or ability block.
* **Buffs and Debuffs**: Debuffs and buffs should be written using custom commands defined in `lib/buffs_and_debuffs.tex` rather than using `\glossterm`. They are not glossary terms, and require special handling. This includes \blinded, \dazzled, \prone, \empowered, and others not listed here. If you are unsure about whether a term should use `\glossterm` or a custom command, check if there is a corresponding command in `lib/buffs_and_debuffs.tex`.
* **Numeric Modifiers**: In LaTeX code, use `\plusX` and `\minusX` (e.g., `a \plus2 bonus`, `a \minus4 penalty`) instead of `+` and `-` signs.
* **Cross-References**: Use `\pcref{Label}` for page references and `\tref{Label}` for table references. When referencing tables that are on the same page as the reference, use `\trefnp{Label}` instead, which omits the redundant page number in the book. 
* **Other Game Terminology**:
  * Use `\sphere{...}` for mystic spheres
  * Use `\combatstyle{...}` for combat styles
  * Use `\weapontag{...}` for weapon-specific tags defined in `comprehensive_codex/Equipment.tex`
  * Use `\abilitytag{...}` for ability tags defined in `core_book/Reference.tex`
  * Use `\trait{...}` for traits defined in `core_book/Reference.tex`
  * For other commands you don't recognize, check `lib/commands.tex` and the files it references
* **LaTeX Syntax**:
  * The percentage syntax ("%") must be backslash-escaped in LaTeX files and in any file which compiles to LaTeX.
  * LaTeX uses `{}` to refer to mandatory arguments in command or environment definitions, and `[]` to refer to optional arguments in command or environment definitions.
* **Environments**: Abilities are defined within environments like `\begin{activeability}{Name}[Tags]`, `\begin{magicalactiveability}{Name}{Tags}`, `\begin{sustainability}{Name}{Tags}`, and `\begin{attuneability}{Name}{Tags}`.
* **Rust Code Formatting**:
  * Multiline strings should start with `r"` followed by a linebreak. Text inside the multiline string should be indented by one level.
* **Typescript Code Formatting**:
  * LaTeX written in Typescript often uses a double backslash (`\\`), which can cause issues for your find/replace tool. Make sure you escape double backslashes correctly, which may require a quadruple backslash(`\\\\`).
