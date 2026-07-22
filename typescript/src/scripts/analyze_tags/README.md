# Spell Tag Analysis Utilities

This directory contains analysis scripts designed to inspect, dump, and audit ability tags (`Physical`, `Manifestation`, `Barrier`, `Creation`, etc.) across all Mystic Spheres and Rituals defined in `typescript/src/abilities/mystic_spheres/`.

## Why These Scripts Were Created

These scripts were created to identify spells and rituals that are missing specific tags (such as `Physical` or `Manifestation`) based on their mechanical definitions in `comprehensive_codex/Reference.tex` and their implied narratives (e.g. creating physical walls, temporary constructs, body armor/carapaces, or physical restraints that shouldn't affect incorporeal creatures).

## Available Scripts & Usage

### 1. Dump All Spells (`dump_by_sphere.ts`)
Extracts all cantrips, spells, and rituals across all spheres into a JSON structure (`all_spells_dump.json`).

```bash
npx tsx src/scripts/analyze_tags/dump_by_sphere.ts
```

### 2. Find Tag Candidates (`find_all_candidates.ts`)
Analyzes `all_spells_dump.json` against rule definitions and narrative indicators to suggest missing tags.

```bash
npx tsx src/scripts/analyze_tags/find_all_candidates.ts
```

## How to Adapt for Other Tags

To audit a new tag (e.g., `Fire`, `Cold`, `Compulsion`, `Emotion`, `Barrier`):
1. Update `find_all_candidates.ts` or write a custom checker reading `all_spells_dump.json`.
2. Inspect `s.tags`, `s.effect`, `s.narrative`, and `s.attack` fields for keyword rules.
