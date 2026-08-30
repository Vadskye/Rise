#!/usr/bin/env python3
"""
find_broken_links.py

Parses LaTeX compiler logs (such as ComprehensiveCodex.log) to identify:
1. Missing hyperref link destinations (pdfTeX destination warnings).
2. Undefined cross-references (LaTeX Warning: Reference `...' undefined).
3. Multiply-defined labels.

It maps these issues back to source .tex files with exact filenames and line numbers,
diagnoses common issues (such as mismatched casing, singular/plural forms, or incorrect macro syntax),
and provides suggestions for fixes.

Usage:
    python3 utils/find_broken_links.py [options]

Options:
    --log PATH        Path to the LaTeX .log file (default: comprehensive_codex/latex.out/ComprehensiveCodex.log)
    --src DIR         Root directory or source directory to search (default: .)
    --category CAT    Filter by category/prefix (e.g. gloss, ability, spell, trait, ref, etc.)
    --summary         Show summary counts only
    --report PATH     Save a detailed Markdown report to PATH
"""

import argparse
import difflib
import os
import re
import sys
from collections import defaultdict


def unescape_pdf_name(raw_name: str) -> str:
    """Unescape octal escape sequences in PDF destination names (e.g. \\040 -> space)."""
    def oct_replace(match):
        return chr(int(match.group(1), 8))
    return re.sub(r'\\([0-7]{3})', oct_replace, raw_name)


def normalize_log_text(raw_log: str) -> str:
    """
    TeX log lines are hard-wrapped at 79-80 characters.
    Unwrap lines that break mid-warning to ensure reliable regex matching.
    """
    lines = raw_log.splitlines()
    unwrapped = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if "pdfTeX warning (dest):" in line or "LaTeX Warning:" in line:
            accum = [line]
            i += 1
            while i < len(lines):
                next_line = lines[i]
                if (next_line.startswith(" ") or
                    ("has been referenced but does not exist" in next_line) or
                    ("undefined on input line" in next_line) or
                    ("multiply defined" in next_line) or
                    (accum[-1].endswith("b") and next_line.startswith("ut")) or
                    (accum[-1].endswith("ex") and next_line.startswith("ist"))):
                    accum.append(next_line.strip())
                    i += 1
                    if "replaced by a fixed one" in next_line or "input line" in next_line or "multiply defined" in next_line:
                        break
                else:
                    break
            unwrapped.append(" ".join(accum))
        else:
            unwrapped.append(line)
            i += 1
    return "\n".join(unwrapped)


def parse_log(log_path: str):
    """Extract missing destination warnings and undefined reference warnings from the log file."""
    if not os.path.exists(log_path):
        print(f"Error: Log file not found at '{log_path}'", file=sys.stderr)
        sys.exit(1)

    with open(log_path, "r", encoding="utf-8", errors="ignore") as f:
        raw_text = f.read()

    # 1. Missing hyperref destinations:
    # Example: pdfTeX warning (dest): name{gloss:Line\040of\040sight} has been referenced but does not exist, replaced by a fixed one
    dest_pattern = re.compile(r"pdfTeX warning \(dest\):\s*name\{([^}]+)\}", re.IGNORECASE)
    missing_dest_raw = dest_pattern.findall(raw_text)
    missing_dests = [unescape_pdf_name(d.replace("\n", "").strip()) for d in missing_dest_raw]

    # 2. Undefined references:
    # Example: LaTeX Warning: Reference `Alignment' on page 42 undefined on input line 76.
    ref_pattern = re.compile(r"LaTeX Warning:\s*Reference\s*['`\"]([^'`\"\n]+)['`\"]\s*on page\s*(\d+)\s*undefined", re.IGNORECASE)
    undefined_refs = ref_pattern.findall(raw_text)

    # 3. Multiply-defined labels:
    # Example: LaTeX Warning: Label `Gliding' multiply defined.
    dup_pattern = re.compile(r"LaTeX Warning:\s*Label\s*['`\"]([^'`\"\n]+)['`\"]\s*multiply defined", re.IGNORECASE)
    multiply_defined = dup_pattern.findall(raw_text)

    return {
        "missing_destinations": sorted(list(set(missing_dests))),
        "missing_destinations_raw_count": len(missing_dests),
        "undefined_references": undefined_refs,
        "multiply_defined": sorted(list(set(multiply_defined))),
    }


def find_tex_files(search_dir: str):
    """Find all .tex files in search_dir, skipping hidden folders and build output."""
    tex_files = []
    for root, dirs, files in os.walk(search_dir):
        dirs[:] = [d for d in dirs if d not in {".git", "node_modules", "latex.out", "dist", "dist-test", "build"}]
        for f in files:
            if f.endswith(".tex"):
                tex_files.append(os.path.join(root, f))
    return sorted(tex_files)


def build_defined_targets_index(tex_files: list):
    """Scan all .tex files to collect defined hypertargets and labels."""
    defined_targets = defaultdict(list)
    defined_labels = defaultdict(list)

    ht_pat = re.compile(r"\\hypertarget(?:raised)?\{([^}]+)\}")
    lbl_pat = re.compile(r"\\label\{([^}]+)\}")
    glossdef_pat = re.compile(r"\\glossdef\{([^}]+)\}(?:\[([^\]]+)\])?(?:\{([^}]+)\})?")
    glosssyn_pat = re.compile(r"\\glosssynonym\{([^}]+)\}")
    traitdef_pat = re.compile(r"\\traitdef\{([^}]+)\}(?:\{([^}]+)\})?")
    termdef_pat = re.compile(r"\\(sense|creatureorigin|creaturetype|creaturesubtype|sphere|debuff|buff|abilitytag|weapontag)def\{([^}]+)\}(?:\[([^\]]+)\])?")

    for fpath in tex_files:
        rel_path = os.path.relpath(fpath)
        try:
            with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
                for line_no, line in enumerate(f, start=1):
                    for m in ht_pat.finditer(line):
                        defined_targets[m.group(1)].append((rel_path, line_no))

                    for m in lbl_pat.finditer(line):
                        defined_labels[m.group(1)].append((rel_path, line_no))

                    for m in glossdef_pat.finditer(line):
                        main_term = m.group(1)
                        bracket_alt = m.group(2)
                        brace_alt = m.group(3)
                        defined_targets[f"gloss:{main_term}"].append((rel_path, line_no))
                        defined_targets[f"gloss:{main_term}s"].append((rel_path, line_no))
                        if bracket_alt:
                            defined_targets[f"gloss:{bracket_alt}"].append((rel_path, line_no))
                            defined_targets[f"gloss:{bracket_alt}s"].append((rel_path, line_no))
                        if brace_alt:
                            defined_targets[f"_SYNTAX_ERROR_gloss:{brace_alt}"].append((rel_path, line_no))

                    for m in glosssyn_pat.finditer(line):
                        syn = m.group(1)
                        defined_targets[f"gloss:{syn}"].append((rel_path, line_no))
                        defined_targets[f"gloss:{syn}s"].append((rel_path, line_no))

                    for m in traitdef_pat.finditer(line):
                        main_t = m.group(1)
                        alt_t = m.group(2)
                        defined_targets[f"trait:{main_t}"].append((rel_path, line_no))
                        if alt_t:
                            defined_targets[f"trait:{alt_t}"].append((rel_path, line_no))

                    for m in termdef_pat.finditer(line):
                        prefix, main_t, alt_t = m.group(1), m.group(2), m.group(3)
                        defined_targets[f"{prefix}:{main_t}"].append((rel_path, line_no))
                        defined_targets[f"{prefix}:{main_t}s"].append((rel_path, line_no))
                        if alt_t:
                            defined_targets[f"{prefix}:{alt_t}"].append((rel_path, line_no))
                            defined_targets[f"{prefix}:{alt_t}s"].append((rel_path, line_no))
        except Exception as e:
            print(f"Warning: Failed to read {fpath}: {e}", file=sys.stderr)

    return defined_targets, defined_labels


def locate_references_in_sources(items_to_find: list, tex_files: list, is_label: bool = False):
    """
    Search .tex files for references to the given missing targets or labels.
    Returns: dict mapping item -> list of (filepath, line_number, snippet)
    """
    found_locations = defaultdict(list)
    search_map = {}

    for item in items_to_find:
        if is_label:
            escaped = re.escape(item)
            pattern = re.compile(r"\\(?:pcref|pref|tref|trefnp|ref|pageref|featpref|featpcref)\*?(?:\[[^\]]*\])?\{" + escaped + r"\}")
            search_map[item] = (pattern, [item])
        else:
            if ":" in item:
                prefix, name = item.split(":", 1)
            else:
                prefix, name = "", item

            candidates = [name]
            if name.endswith("s") and len(name) > 2:
                candidates.append(name[:-1])

            patterns = []
            escaped_name = re.escape(name)

            if prefix == "gloss":
                patterns.append(re.compile(r"\\glossterm(?:\[" + escaped_name + r"\]|\{" + escaped_name + r"\})"))
            elif prefix == "ability":
                patterns.append(re.compile(r"\\ability\{" + escaped_name + r"\}", re.IGNORECASE))
            elif prefix == "spell":
                patterns.append(re.compile(r"\\(?:spell|cantrip|ritual|spellindirect)\*?(?:\{" + escaped_name + r"\}|\[" + escaped_name + r"\])", re.IGNORECASE))
            elif prefix == "maneuver":
                patterns.append(re.compile(r"\\maneuver\{" + escaped_name + r"\}", re.IGNORECASE))
            elif prefix == "stance":
                patterns.append(re.compile(r"\\stance\{" + escaped_name + r"\}", re.IGNORECASE))
            elif prefix == "style":
                patterns.append(re.compile(r"\\combatstyle\{" + escaped_name + r"\}", re.IGNORECASE))
            elif prefix == "sphere":
                patterns.append(re.compile(r"\\(?:sphere|sphereterm)\{" + escaped_name + r"\}", re.IGNORECASE))
            elif prefix in ("trait", "sense", "creatureorigin", "creaturetype", "creaturesubtype", "debuff", "buff", "abilitytag", "weapontag"):
                patterns.append(re.compile(r"\\" + prefix + r"(?:\[" + escaped_name + r"\]|\{" + escaped_name + r"\})"))
            elif prefix == "feat":
                patterns.append(re.compile(r"\\(?:featref|magicalfeatref)\*?\{" + escaped_name + r"\}"))
            elif prefix == "item":
                patterns.append(re.compile(r"\\itemref\*?\{" + escaped_name + r"\}"))
            elif prefix in ("archetype", "archetypetable"):
                parts = name.split(":")
                arch_name = parts[-1] if parts else name
                patterns.append(re.compile(r"\\archetypref\*?\{[^}]+\}\{" + re.escape(arch_name) + r"\}"))

            patterns.append(re.compile(r"\\hyperlink\{" + re.escape(item) + r"\}"))
            search_map[item] = (patterns, candidates)

    for fpath in tex_files:
        rel_path = os.path.relpath(fpath)
        try:
            with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
                for line_no, line in enumerate(f, start=1):
                    for item, (pattern_obj, candidates) in search_map.items():
                        matched = False
                        if is_label:
                            if pattern_obj.search(line):
                                matched = True
                        else:
                            for pat in pattern_obj:
                                if pat.search(line):
                                    matched = True
                                    break
                        if matched:
                            found_locations[item].append((rel_path, line_no, line.strip()))
        except Exception:
            pass

    return found_locations


def generate_diagnosis(missing_item: str, defined_targets: dict, defined_labels: dict):
    """Diagnose why an item is missing and suggest fixes."""
    suggestions = []

    if ":" in missing_item:
        prefix, name = missing_item.split(":", 1)
    else:
        prefix, name = "", missing_item

    # 1. Check for syntax error in \glossdef (e.g. \glossdef{attached}{attach})
    syntax_error_key = f"_SYNTAX_ERROR_gloss:{name}"
    if syntax_error_key in defined_targets:
        locs = ", ".join(f"{f}:{l}" for f, l in defined_targets[syntax_error_key])
        suggestions.append(f"SYNTAX BUG: Defined using curly braces instead of square brackets at {locs} (use \\glossdef{{...}}[{name}]).")

    # 2. Check if the target is defined under a different category/prefix (e.g. \\trait{blindsense} vs \\sense{blindsense})
    if prefix:
        all_targets = list(defined_targets.keys())
        other_prefix_matches = [
            t for t in all_targets
            if ":" in t and t.split(":", 1)[1].lower() == name.lower() and not t.startswith(f"{prefix}:")
        ]
        if other_prefix_matches:
            suggestions.append(f"Prefix mismatch: Defined under '{other_prefix_matches[0]}' (change \\{prefix}{{{name}}} to \\{other_prefix_matches[0].split(':')[0]}{{{name}}}).")

    # 3. Check for case mismatch
    all_known = list(defined_targets.keys()) if prefix else list(defined_labels.keys())
    lower_target = missing_item.lower()
    casing_matches = [k for k in all_known if k.lower() == lower_target and k != missing_item]
    if casing_matches:
        suggestions.append(f"Casing mismatch: Target is defined as '{casing_matches[0]}'.")

    # 4. Check close fuzzy matches (typos)
    if not casing_matches and not suggestions:
        close = difflib.get_close_matches(missing_item, all_known, n=3, cutoff=0.7)
        if close:
            suggestions.append(f"Possible typo / similar target exists: {', '.join(close)}")

    return suggestions


def main():
    parser = argparse.ArgumentParser(description="Find and diagnose broken LaTeX links and references.")
    parser.add_argument("--log", default="comprehensive_codex/latex.out/ComprehensiveCodex.log",
                        help="Path to compiler log file")
    parser.add_argument("--src", default=".", help="Root directory of LaTeX source files")
    parser.add_argument("--category", default=None, help="Filter by target category (e.g. gloss, ability, spell, ref)")
    parser.add_argument("--summary", action="store_true", help="Print summary statistics only")
    parser.add_argument("--report", default=None, help="Write markdown report to file")
    args = parser.parse_args()

    print(f"==> Parsing log file: {args.log}")
    log_data = parse_log(args.log)

    missing_dests = log_data["missing_destinations"]
    undefined_refs = log_data["undefined_references"]
    multiply_defined = log_data["multiply_defined"]

    print(f"Found {len(missing_dests)} unique missing hyperref destinations ({log_data['missing_destinations_raw_count']} total references).")
    print(f"Found {len(undefined_refs)} undefined LaTeX reference warnings.")
    print(f"Found {len(multiply_defined)} multiply-defined labels.")

    # Group missing destinations by category
    categories = defaultdict(list)
    for dest in missing_dests:
        prefix = dest.split(":")[0] if ":" in dest else "other"
        categories[prefix].append(dest)

    print("\n--- Summary by Destination Category ---")
    for cat, items in sorted(categories.items(), key=lambda x: -len(x[1])):
        print(f"  {cat:<18}: {len(items):>4} broken destination(s)")

    if args.summary:
        return

    print(f"\n==> Scanning .tex files in '{args.src}'...")
    tex_files = find_tex_files(args.src)
    print(f"Found {len(tex_files)} .tex source files.")

    defined_targets, defined_labels = build_defined_targets_index(tex_files)

    # Filter items if requested
    dests_to_process = missing_dests
    if args.category:
        if args.category == "ref":
            dests_to_process = []
        else:
            dests_to_process = [d for d in missing_dests if d.startswith(args.category + ":") or (args.category == "other" and ":" not in d)]

    print("==> Locating broken references in source files...")
    dest_locations = locate_references_in_sources(dests_to_process, tex_files, is_label=False)

    undef_ref_names = list(set([r[0] for r in undefined_refs]))
    ref_locations = {}
    if not args.category or args.category == "ref":
        ref_locations = locate_references_in_sources(undef_ref_names, tex_files, is_label=True)

    report_lines = []
    report_lines.append("# Broken LaTeX Links & Missing References Report\n")
    report_lines.append(f"- **Log File**: `{args.log}`")
    report_lines.append(f"- **Unique Broken Hyperlinks**: {len(missing_dests)}")
    report_lines.append(f"- **Undefined LaTeX References**: {len(undefined_refs)}")
    report_lines.append(f"- **Multiply-Defined Labels**: {len(multiply_defined)}\n")

    report_lines.append("## Breakdown by Category\n")
    report_lines.append("| Category | Missing Count | Description |")
    report_lines.append("| :--- | :--- | :--- |")
    for cat, items in sorted(categories.items(), key=lambda x: -len(x[1])):
        report_lines.append(f"| `{cat}` | {len(items)} | Missing `{cat}:...` destinations |")
    if undefined_refs:
        report_lines.append(f"| `ref (LaTeX)` | {len(undef_ref_names)} | Undefined `\\ref` / `\\pcref` / `\\pageref` labels |")
    report_lines.append("\n---\n")

    if dests_to_process:
        report_lines.append("## Missing Hyperlink Destinations\n")
        grouped_dests = defaultdict(list)
        for dest in sorted(dests_to_process):
            p = dest.split(":")[0] if ":" in dest else "other"
            grouped_dests[p].append(dest)

        for cat, items in sorted(grouped_dests.items()):
            report_lines.append(f"### Category: `{cat}` ({len(items)} issues)\n")
            for dest in items:
                report_lines.append(f"#### Destination: `{dest}`")
                diag = generate_diagnosis(dest, defined_targets, defined_labels)
                for d in diag:
                    report_lines.append(f"> ⚠️ **Diagnosis**: {d}")

                locs = dest_locations.get(dest, [])
                if locs:
                    report_lines.append("**Referenced at:**")
                    for fpath, lno, snippet in locs:
                        report_lines.append(f"- [{os.path.basename(fpath)}:{lno}](file://{os.path.abspath(fpath)}#L{lno}): `{snippet}`")
                else:
                    report_lines.append("*Referenced during compilation (exact macro source pattern not matched).*")
                report_lines.append("")

    if (not args.category or args.category == "ref") and undef_ref_names:
        report_lines.append("## Undefined LaTeX Cross-References\n")
        for ref_name in sorted(undef_ref_names):
            report_lines.append(f"#### Reference: `{ref_name}`")
            diag = generate_diagnosis(ref_name, defined_targets, defined_labels)
            for d in diag:
                report_lines.append(f"> ⚠️ **Diagnosis**: {d}")

            locs = ref_locations.get(ref_name, [])
            if locs:
                report_lines.append("**Referenced at:**")
                for fpath, lno, snippet in locs:
                    report_lines.append(f"- [{os.path.basename(fpath)}:{lno}](file://{os.path.abspath(fpath)}#L{lno}): `{snippet}`")
            else:
                report_lines.append("*Could not locate exact source line.*")
            report_lines.append("")

    full_report = "\n".join(report_lines)
    if args.report:
        with open(args.report, "w", encoding="utf-8") as f:
            f.write(full_report)
        print(f"\n==> Full Markdown report written to: {args.report}")
    else:
        print("\n" + "=" * 60)
        print("SAMPLE OF BROKEN DESTINATIONS & LOCATIONS")
        print("=" * 60)
        active_grouped = defaultdict(list)
        for dest in dests_to_process:
            p = dest.split(":")[0] if ":" in dest else "other"
            active_grouped[p].append(dest)

        for cat, items in sorted(active_grouped.items(), key=lambda x: -len(x[1])):
            print(f"\n[{cat.upper()}] ({len(items)} items)")
            for item in items[:5]:
                locs = dest_locations.get(item, [])
                loc_str = f" -> {locs[0][0]}:{locs[0][1]}" if locs else ""
                diag = generate_diagnosis(item, defined_targets, defined_labels)
                diag_str = f" | {diag[0]}" if diag else ""
                print(f"  - {item}{loc_str}{diag_str}")
            if len(items) > 5:
                print(f"    ... and {len(items) - 5} more")

    print("\nTip: Run with `--report report.md` to generate a complete markdown checklist of all broken links!")


if __name__ == "__main__":
    main()
