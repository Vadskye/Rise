---
trigger: model_decision
description: Guidelines, log locations, and step-by-step procedures for debugging LaTeX and latexrun compilation failures in Rise rulebooks.
---

# Debugging LaTeX Compilation Failures

This guide provides procedures and domain knowledge for diagnosing and resolving LaTeX compilation errors when building Rise rulebooks (`Rise.tex`, `TomeOfGuidance.tex`, `ComprehensiveCodex.tex`, `Omnibook.tex`).

---

## 1. Compilation Architecture

Rise uses a multi-stage pipeline orchestrated by `bin/rcompile`:
1. **Art Generation & Conversion (`bin/rgen`)**: Copies art from Google Drive and optimizes/converts images using ImageMagick into `lib/images/`. Logs to `rgen.log`.
2. **TypeScript Generation (`bin/rtgen`)**: Runs TypeScript generators (`typescript/src/scripts/generate_latex.ts`, `generate_uncommon_species_classes.ts`, etc.) to produce `.tex` files into `core_book/generated/` and `comprehensive_codex/generated/`. Logs to `rtgen.log`.
3. **LaTeX Engine (`latexrun`)**: Python script wrapping `pdflatex` with `-recorder`. Output files and intermediate artifacts are isolated inside `latex.out/` in each book's directory.

---

## 2. Understanding `latexrun` Errors

When `latexrun` fails, it often displays a summary line:
```
There were errors; ComprehensiveCodex.pdf not updated
```
or
```
No pages of output; ComprehensiveCodex.pdf not updated
```

### What this means:
- `latexrun` executes `pdflatex` as a subprocess.
- If `pdflatex` exits with a non-zero exit code (i.e. an unrecoverable or fatal TeX error), `latexrun` will refuse to commit the temporary PDF to the target location (`<BookName>.pdf`).
- `latexrun` filters benign warnings by default (such as multiply-defined labels or standard undefined references), which can sometimes hide the actual underlying error unless you inspect the raw log file or run with higher verbosity.

---

## 3. Log File Locations

| Log File | Path | Purpose |
| :--- | :--- | :--- |
| Comprehensive Codex | `comprehensive_codex/latex.out/ComprehensiveCodex.log` | Raw `pdflatex` log for the primary codex |
| Player's Primer / Rise | `core_book/latex.out/Rise.log` | Raw `pdflatex` log for the core book |
| Tome of Guidance | `core_book/latex.out/TomeOfGuidance.log` | Raw `pdflatex` log for the guidance tome |
| Omnibook (HTML) | `html_book/latex.out/Omnibook.log` | Raw log for the unified HTML build |
| TypeScript Generation | `rtgen.log` (repository root) | Output and errors from TypeScript AST/LaTeX generation |
| Image Generation | `rgen.log` (repository root) | Output from ImageMagick conversions |

---

## 4. Step-by-Step Debugging Workflow

### Step 1: Identify Which Document Failed
Check the output of `bin/rcompile` or run the books individually to isolate the failure:
- Core book: `cd core_book && latexrun Rise.tex`
- Guidance tome: `cd core_book && latexrun TomeOfGuidance.tex`
- Comprehensive Codex: `cd comprehensive_codex && latexrun ComprehensiveCodex.tex`

### Step 2: Search the Raw `.log` for TeX Errors
**Do not view the entire log at once** — `ComprehensiveCodex.log` can exceed 20,000 lines. Instead:
- Use `grep_search` with regular expression `^!` on the relevant log file (e.g. `comprehensive_codex/latex.out/ComprehensiveCodex.log`).
- Every native TeX/LaTeX error starts with an exclamation point (`!`), for example:
  - `! Undefined control sequence.`
  - `! LaTeX Error: ...`
  - `! Missing $ inserted.`
  - `! Extra }, or forgotten $.`
  - `! Emergency stop.`
  - `! Package <pkg> Error: ...`
- Inspect the lines immediately following the `!` in the log file using `view_file`. TeX prints the context and the offending input line starting with `l.<line_number>`.

### Step 3: Identify the Source File
Because LaTeX documents use extensive `\input{...}` and `\include{...}`:
- Look directly above the error in the log for the most recent open parenthesis `(` without a matching closing parenthesis `)`.
- This shows the specific file TeX was parsing when the error occurred (e.g., `(./generated/archetype_descriptions.tex` or `(characters/attributes.tex`).

### Step 4: Trace Generated Files to Source
**CRITICAL**: If the error occurs in a file under `core_book/generated/` or `comprehensive_codex/generated/`:
- **DO NOT** edit the `.tex` file in `generated/` directly; your changes will be overwritten next time `bin/rtgen` runs.
- Search for the offending ability, spell, or item name in `typescript/src/` (e.g. `typescript/src/abilities/` or `typescript/src/classes/`).
- Fix the issue in the TypeScript source, run `npm run test` (in `typescript/`), regenerate via `bin/rtgen` (or rerun `bin/rcompile`), and verify.

### Step 5: Clean Build State When Stale
Corrupted `.aux`, `.toc`, or `.out` files from a broken compile run can cause subsequent runs to fail even after the source syntax is fixed.
- Run `latexrun --clean-all` within the appropriate directory before recompiling.

---

## 5. Common Causes & Fixes

1. **Unescaped Special Characters**:
   - `%` begins a comment in LaTeX and must be escaped as `\%` unless intending a comment. An unescaped `%` cuts off the rest of the line and frequently leaves unclosed braces (`{` or `[`).
   - `_` and `&` have special LaTeX meanings. `&` separates table columns; using `&` in body text triggers `! Misplaced alignment tab character &`. Use `and` or `\&`.
   - Math delimiters: Unbalanced `$` or `$$`.

2. **Typo in Macro Names**:
   - `\pcref{...}` vs `\ref{...}`: `\pcref` expects a valid label name.
   - Using standard Markdown/plaintext characters where project macros are required (e.g. using `+2` or `-4` instead of `\plus2` or `\minus4`).
   - Using non-existent environments or commands. Check `lib/packages.tex`, `lib/macros.tex`, and `lib/buffs_and_debuffs.tex`.

3. **Malformed Table Rows**:
   - Tables (`tabularx`, `longtable`, `tabu`) require an exact number of column dividers (`&`). Extra or missing `&` delimiters cause alignment errors.
   - Missing `\\` row terminators.

4. **Missing Graphic or Image File**:
   - If an image file path referenced in `\includegraphics{...}` does not exist, pdflatex halts with `! LaTeX Error: File '<path>' not found`.
   - Check if `rgen` ran or if the image was converted to `.jpg` while the source code still referenced `.png` (or vice versa).

5. **Compilation Timeouts**:
   - `ComprehensiveCodex.tex` is ~470+ pages with hundreds of embedded images. Full compilation typically takes 30–90 seconds.
   - Commands should be run asynchronously with a sufficient background wait duration (`WaitMsBeforeAsync` around 10000ms) and monitored via background task completion notifications.
