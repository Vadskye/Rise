#!/usr/bin/env python3
r"""
fix_broken_links.py

Scans .tex and .ts/.tsx source files to find and fix mismatched \spell and \ritual macros.
When a ritual is referenced using \spell{...} (or \\spell{...}), it is replaced with \ritual{...}.
When a spell is referenced using \ritual{...} (or \\ritual{...}), it is replaced with \spell{...}.

Also checks and fixes macro definitions in lib/links.tex and generator functions in TypeScript
if they incorrectly link \ritual to spell:* instead of ritual:*.

Usage:
    python3 utils/fix_broken_links.py [options]

Options:
    --dry-run       Preview changes without modifying files
    --check         Exit with code 1 if any mismatches are found (for CI/linting)
    --dir PATH      Search root directory (default: project root)
    --verbose       Print detailed match information
"""

import argparse
import os
import re
import sys
from collections import defaultdict
from pathlib import Path


def collect_spells_and_rituals(project_root: str):
    """
    Collect authoritative sets of spell and ritual names from TypeScript source files
    and LaTeX files.
    """
    ritual_names = set()
    spell_names = set()

    # 1. Check rituals.ts
    rituals_ts = os.path.join(project_root, "typescript", "src", "abilities", "mystic_spheres", "rituals.ts")
    if os.path.exists(rituals_ts):
        with open(rituals_ts, "r", encoding="utf-8", errors="ignore") as f:
            for line in f:
                m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", line)
                if m:
                    ritual_names.add(m.group(1).strip())

    # 2. Check sphere files for spells
    spheres_dir = os.path.join(project_root, "typescript", "src", "abilities", "mystic_spheres")
    if os.path.exists(spheres_dir):
        for fname in os.listdir(spheres_dir):
            if fname.endswith(".ts") and not fname.endswith(".test.ts") and fname != "rituals.ts":
                fpath = os.path.join(spheres_dir, fname)
                with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
                    for line in f:
                        m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", line)
                        if m:
                            spell_names.add(m.group(1).strip())

    # 3. Fallback / supplement: check generated LaTeX files if available
    for gen_dir in [
        os.path.join(project_root, "comprehensive_codex", "generated"),
        os.path.join(project_root, "html_book", "generated"),
        os.path.join(project_root, "core_book", "generated"),
    ]:
        if os.path.exists(gen_dir):
            r_desc = os.path.join(gen_dir, "ritual_descriptions.tex")
            if os.path.exists(r_desc):
                with open(r_desc, "r", encoding="utf-8", errors="ignore") as f:
                    for m in re.finditer(r"\\hypertarget(?:raised)?\{ritual:([^}]+)\}", f.read()):
                        ritual_names.add(m.group(1).strip())
            s_desc = os.path.join(gen_dir, "mystic_sphere_descriptions.tex")
            if os.path.exists(s_desc):
                with open(s_desc, "r", encoding="utf-8", errors="ignore") as f:
                    for m in re.finditer(r"\\hypertarget(?:raised)?\{spell:([^}]+)\}", f.read()):
                        spell_names.add(m.group(1).strip())

    return ritual_names, spell_names


def find_source_files(search_dir: str):
    """Find all .tex, .ts, and .tsx files to scan."""
    source_files = []
    ignore_dirs = {".git", "node_modules", "latex.out", "dist", "dist-test", "build", ".tap"}
    for root, dirs, files in os.walk(search_dir):
        dirs[:] = [d for d in dirs if d not in ignore_dirs]
        for f in files:
            if f.endswith((".tex", ".ts", ".tsx")):
                source_files.append(os.path.join(root, f))
    return sorted(source_files)


def fix_links_in_content(content: str, ritual_lower: dict, spell_lower: dict):
    """
    Scan content and replace mismatched \\spell vs \\ritual calls.
    Returns (new_content, list of changes).
    Each change is (line_no, old_snippet, new_snippet).
    """
    lines = content.splitlines(keepends=True)
    new_lines = []
    changes = []

    for line_idx, line in enumerate(lines, start=1):
        modified_line = line

        # Regex matches any number of leading backslashes followed by spell/cantrip/ritual{name}
        # Example matches: \spell{create water}, \\spell{create water}, \\\\spell{create water}
        def replacer(match):
            nonlocal changes, line_idx
            slashes = match.group(1)
            cmd = match.group(2)
            name = match.group(3)
            clean_name = name.strip().lower()

            old_call = match.group(0)

            # If \spell or \cantrip is used for a ritual (and it is not also a spell)
            if cmd in ("spell", "cantrip") and clean_name in ritual_lower and clean_name not in spell_lower:
                new_call = f"{slashes}ritual{{{name}}}"
                changes.append((line_idx, old_call, new_call))
                return new_call

            # If \ritual is used for a spell (and it is not also a ritual)
            if cmd == "ritual" and clean_name in spell_lower and clean_name not in ritual_lower:
                new_call = f"{slashes}spell{{{name}}}"
                changes.append((line_idx, old_call, new_call))
                return new_call

            return old_call

        # Apply replacement
        modified_line = re.sub(r"(\\+)(spell|cantrip|ritual)\{([^}]+)\}", replacer, modified_line)
        new_lines.append(modified_line)

    return "".join(new_lines), changes


def fix_lib_links(project_root: str, dry_run: bool):
    """Ensure lib/links.tex maps \\ritual to hyperlink{ritual:#1}{#1} instead of spell:#1."""
    links_file = os.path.join(project_root, "lib", "links.tex")
    if not os.path.exists(links_file):
        return []

    with open(links_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Look for \newcommand{\ritual}[1]{\mbox{\hyperlink{spell:#1}{#1}}}
    old_def = r"\newcommand{\ritual}[1]{\mbox{\hyperlink{spell:#1}{#1}}}"
    new_def = r"\newcommand{\ritual}[1]{\mbox{\hyperlink{ritual:#1}{#1}}}"

    if old_def in content:
        if not dry_run:
            new_content = content.replace(old_def, new_def)
            with open(links_file, "w", encoding="utf-8") as f:
                f.write(new_content)
        return [(links_file, [(0, old_def, new_def)])]
    return []


def fix_ts_generators(project_root: str, dry_run: bool):
    """
    Ensure generate_mystic_sphere_summaries.ts generates \\ritual{...} for rituals
    rather than \\spell{...}.
    """
    gen_file = os.path.join(
        project_root,
        "typescript",
        "src",
        "latex",
        "abilities",
        "mystic_spheres",
        "generate_mystic_sphere_summaries.ts",
    )
    if not os.path.exists(gen_file):
        return []

    with open(gen_file, "r", encoding="utf-8") as f:
        content = f.read()

    changes = []
    # If generateMysticSphereRitualSummary calls generateSpellsSummary
    old_call = "generateSpellsSummary(`Rank ${rank}`, sortByRankAndLevel(ritualsByRank[rank]))"
    new_call = "generateRitualsSummary(`Rank ${rank}`, sortByRankAndLevel(ritualsByRank[rank]))"

    if old_call in content:
        # Check if generateRitualsSummary already defined
        if "function generateRitualsSummary" not in content:
            # Add generateRitualsSummary
            helper_old = r"""function generateSpellsSummary(
  category: string,
  spells: CantripDefinition[] | SpellDefinition[],
): string {
  if (!(spells?.length > 0)) {
    return '';
  }
  return `\par\noindent ${category}: ${spells
    .map((s) => `\spell{${s.name.toLowerCase()}}`)
    .join(', ')}`;
}"""
            helper_new = r"""function generateSpellsSummary(
  category: string,
  spells: CantripDefinition[] | SpellDefinition[],
): string {
  if (!(spells?.length > 0)) {
    return '';
  }
  return `\par\noindent ${category}: ${spells
    .map((s) => `\spell{${s.name.toLowerCase()}}`)
    .join(', ')}`;
}

function generateRitualsSummary(
  category: string,
  ritualsList: any[],
): string {
  if (!(ritualsList?.length > 0)) {
    return '';
  }
  return `\par\noindent ${category}: ${ritualsList
    .map((r) => `\ritual{${r.name.toLowerCase()}}`)
    .join(', ')}`;
}"""
            if helper_old in content:
                content = content.replace(helper_old, helper_new)
                content = content.replace(old_call, new_call)
                changes.append((0, old_call, new_call))

        if changes and not dry_run:
            with open(gen_file, "w", encoding="utf-8") as f:
                f.write(content)
        return [(gen_file, changes)]

    return []


def main():
    parser = argparse.ArgumentParser(description="Fix mismatched \\spell and \\ritual link macros across the repository.")
    parser.add_argument("--dry-run", action="store_true", help="Report proposed changes without writing to disk")
    parser.add_argument("--check", action="store_true", help="Exit with code 1 if any mismatches are found")
    parser.add_argument("--dir", default=".", help="Root directory to search (default: .)")
    parser.add_argument("--verbose", action="store_true", help="Print detailed change lines")
    args = parser.parse_args()

    project_root = os.path.abspath(args.dir)
    print(f"==> Indexing spells and rituals in: {project_root}")
    ritual_names, spell_names = collect_spells_and_rituals(project_root)

    print(f"Found {len(ritual_names)} defined ritual(s) and {len(spell_names)} defined spell(s).")

    ritual_lower = {r.lower(): r for r in ritual_names}
    spell_lower = {s.lower(): s for s in spell_names}

    # 1. Fix lib/links.tex definition if broken
    lib_changes = fix_lib_links(project_root, args.dry_run)

    # 2. Fix TS generator if broken
    ts_changes = fix_ts_generators(project_root, args.dry_run)

    # 3. Find and scan all source files
    source_files = find_source_files(project_root)
    print(f"Scanning {len(source_files)} source files (.tex, .ts, .tsx)...")

    all_file_changes = []
    if lib_changes:
        all_file_changes.extend(lib_changes)
    if ts_changes:
        all_file_changes.extend(ts_changes)

    total_spell_to_ritual = 0
    total_ritual_to_spell = 0

    for fpath in source_files:
        try:
            with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
            new_content, changes = fix_links_in_content(content, ritual_lower, spell_lower)
            if changes:
                all_file_changes.append((fpath, changes))
                for _, old_c, new_c in changes:
                    if "ritual{" in new_c:
                        total_spell_to_ritual += 1
                    else:
                        total_ritual_to_spell += 1
                if not args.dry_run:
                    with open(fpath, "w", encoding="utf-8") as f:
                        f.write(new_content)
        except Exception as e:
            print(f"Error processing {fpath}: {e}", file=sys.stderr)

    # Print summary report
    print("\n" + "=" * 60)
    mode_str = "[DRY-RUN] PROPOSED CHANGES" if args.dry_run else "APPLIED CHANGES"
    print(f"{mode_str}:")
    print("=" * 60)

    if not all_file_changes:
        print("No mismatched \\spell or \\ritual links found! Everything is clean.")
        return

    for fpath, changes in all_file_changes:
        rel_path = os.path.relpath(fpath, project_root)
        print(f"\n📄 {rel_path} ({len(changes)} fix{'es' if len(changes) > 1 else ''}):")
        for line_no, old_call, new_call in changes[:10]:
            line_prefix = f"  Line {line_no}: " if line_no > 0 else "  "
            print(f"{line_prefix}{old_call}  -->  {new_call}")
        if len(changes) > 10:
            print(f"  ... and {len(changes) - 10} more in this file")

    print("\n" + "-" * 60)
    print(f"Total files modified: {len(all_file_changes)}")
    print(f"Total \\spell -> \\ritual replacements: {total_spell_to_ritual}")
    print(f"Total \\ritual -> \\spell replacements: {total_ritual_to_spell}")
    if lib_changes:
        print("Fixed lib/links.tex \\ritual macro definition.")
    if ts_changes:
        print("Fixed TypeScript ritual summary generator.")
    print("-" * 60)

    if args.dry_run:
        print("\nRun without `--dry-run` to apply these fixes.")

    if args.check and all_file_changes:
        sys.exit(1)


if __name__ == "__main__":
    main()
