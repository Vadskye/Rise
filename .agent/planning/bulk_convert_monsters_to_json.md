# Monster Conversion Implementation Progress & Plan

This document outlines the progress and plan for converting TypeScript-defined monsters to the UI JSON database format. To ensure data integrity and clean code, the conversion is split into two sequential phases.

---

## Phase 1: Natively Supported Monsters (Existing Schema)

**Objective**: Convert all monsters and monster groups that are *fully* supported by the existing `.json` structure, without using any freeform code escapes or requiring dynamic enhancements.

### Target Monsters and Groups in Phase 1

These creatures only use standard properties, attributes, skills, senses, speeds, and standard spells/maneuvers:

1. **`animates.ts`**:
   - Individual: `Darkwraith`
   - Group: `Animated Objects`
2. **`beasts.ts`**:
   - Individuals: `Ankheg`, `Carrion Crow`, `Warg`, `Nightcrawler`, `Hydra Maggot`, `Grumblegrub`, `Grumblegrub Swarm`, `Darkmantle`, `Griffon`, `Yrthak`, `Stygian Leech`, `Quadrilla`
   - Groups: `Animals`, `Dire Animals`
3. **`elementals.ts`**:
   - Group: `Magma Elementals`
4. **`soulforged.ts`**:
   - Groups: `Demonspawn`, `Imps`
5. **`undead.ts`**:
   - Individuals: `Corpsetree`, `Corpsemound`
   - Groups: `Fleshwrought`, `Ghosts`, `Halfsouls`, `Liches`, `Skeletons`, `Zombies`

### Conversion & Verification Process

For each of the target groups/monsters above, we will:
1. Run the existing conversion script to extract the monster data and merge it into [monsters_from_ui.json](file:///c:/Users/vadsk/github/Rise/typescript/monster_ui/monsters_from_ui.json).
2. Clean up the source files by replacing converted initializers with empty registrations (preserving registration signatures to prevent compile errors).
3. Regenerate the TypeScript output by running `npm run monster_ts` inside `typescript/monster_ui`.
4. Run `npm test` inside `typescript` to ensure 100% passing tests and zero regressions.

---

## Phase 2: Infrastructure Improvement & Advanced Conversion

**Objective**: Instead of using `freeformCode` escapes, extend the underlying JSON schema and engine adapters so all advanced/dynamic monster properties are represented natively in the JSON structure.

### 1. Required Infrastructure Enhancements

We will modify [creature_builder.ts](file:///c:/Users/vadsk/github/Rise/typescript/monster_ui/server/creature_builder.ts) and [codegen.ts](file:///c:/Users/vadsk/github/Rise/typescript/monster_ui/server/codegen.ts) to support the following structural features:

- **Structural Custom Modifiers**:
  - Add a `customModifiers` array property to the monster/group JSON schema.
  - Structure: `{ name: string, immune?: string, resistant?: string, vulnerable?: string, numericEffects?: Array<{ statistic: string, modifier: number }> }`.
  - Compile and generate native `creature.addCustomModifier(...)` calls directly from the JSON.
- **Conditional / Rank-Dependent Items**:
  - Add `minRank` and `minLevel` properties to ability, spell, sense, and movement speed schemas.
  - Wrap code generation and creature building in conditional blocks based on `creature.calculateRank()` or `creature.level` checks.
- **Inherited Weapon Multipliers**:
  - Add `inheritsWeaponMult: boolean` and `weapon: string` flags to custom maneuvers.
  - Compile them by invoking `getWeaponMultByRank(creature.calculateRank())` and merging custom text/effects in-place.
- **Poisonous Strikes**:
  - Add a `poison` object schema to custom abilities: `{ name: string, injury: boolean, accuracyModifier: number, it: string }`.
  - Auto-generate poison-infused strike maneuvers based on the specified weapon.
- **Shared Ability Effects Mutation**:
  - Add a group-level `sharedAbilityEffectAppend: string` property.
  - Loop through and append the specified effect to all active abilities during the build/codegen phase.

### 2. Phase 2 Target Monsters & Groups

Once the infrastructure enhancements are complete, we will convert the remaining advanced creatures:

1. **`aberrations.ts`**:
   - Individual: `Aboleth` (requires structural custom modifiers)
2. **`aliens.ts`**:
   - Group: `Formians` (requires poisonous strikes and rank-dependent mechanics)
3. **`animates.ts`**:
   - Individual: `Gelatinous Cube` (requires custom modifiers)
   - Groups: `Golems`, `Treants` (requires custom modifiers and conditional rank checks)
4. **`beasts.ts`**:
   - Individuals: `Giant Wasp`, `Frostweb Spider` (requires poisonous strikes)
   - Group: `Ichor-Tainted` (requires custom modifiers and shared ability effects append)
5. **`elementals.ts`**:
   - Individual: `Fusion Elemental` (requires rank-dependent checks)
   - Groups: `Air Elementals`, `Fire Elementals` (requires conditional spells/maneuvers based on rank)
6. **`soulforged.ts`**:
   - Group: `Angels` (requires conditional range values based on rank)
7. **`undead.ts`**:
   - Group: `Vampires` (requires inherited weapon multipliers and rank-dependent charm spells)

---

## Current Implementation Status & Challenges

### 1. Progress Completed
- **`animates.ts`**: Safely isolated Phase 2 registrations (`Gelatinous Cube`, `addGolems`, `addTreants`), ran the conversion script to migrate Phase 1 targets (`Darkwraith` and the `Animated Objects` group), cleaned up the Phase 1 code, and restored the Phase 2 target registrations.

### 2. Challenges & Issues Encountered
- **Large File Code Replacements (`beasts.ts`)**:
  - The `beasts.ts` file is extremely large (1042 lines) and complex.
  - When trying to clean up Phase 1 targets after running the conversion script, the standard target block replace tools encountered inaccuracies due to minor block differences, causing partial mismatches and code corruption.
  - To preserve codebase integrity, we immediately discarded the corrupted edits using `git checkout`.
  - We attempted to run a programmatic cleanup script (`clean_beasts.js`) to safely parse and reconstruct the file without relying on manual block matching, but ran into permission controls. We have paused the beast conversion to discuss how to proceed safely with large-file cleanup.
