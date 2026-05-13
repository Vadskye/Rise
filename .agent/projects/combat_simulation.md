# Combat Simulation Project

Build a general-purpose combat simulator for Rise that can answer balance questions across the system: class vs class, monster vs player, elite vs non-elite equivalence, and more. The simulator should handle the mechanical features that materially affect combat outcomes.

## Design Principles

1. **Structured ability data over LaTeX parsing.** Many abilities store targeting and defense info as free-form LaTeX text. Rather than parsing LaTeX at _execution_ time in the simulator, we bridge this gap by adding structured combat metadata to `ActiveAbility`.
2. **Normalization over Manual Entry.** To avoid a massive rewrite of every ability in the game, we implement a "normalization" layer that uses the existing LaTeX parsing regexes to auto-populate metadata for the simulator. Manual metadata entry is only required for complex exceptions.
3. **Incremental fidelity.** Start with the mechanics that most affect outcomes (defense targeting, ability selection, damage), then layer in secondary mechanics (status effects, cooldowns, positioning) in later phases.
4. **Test-driven.** Each phase and subphase must include tests that validate the new mechanics against expected outcomes.

---

## Phase 1: Structured Combat Metadata & Normalization

**Goal:** Give the simulator structured data it can use to make decisions, primarily through automated parsing of existing LaTeX strings.

### 1a. Add combat metadata to attack definition

In [active_abilities.ts](file:///c:/Users/vadsk/github/Rise/typescript/src/abilities/active_abilities.ts):

```typescript
export interface ActiveAbility {
  attack?: ActiveAbilityAttack | SimulatorReadyAttack;
  // ...
}

export interface SimulatorReadyAttack extends ActiveAbilityAttack {
  // -- Defensive Metadata --
  /** Which defense(s) the attack targets. The attack must hit all listed defenses. */
  defenses: RiseDefense[];
  /** Area rank, as defined in docs/standard_area_ranks.md. Used to estimate how many targets an ability hits in combat. Larger areas can hit more enemies, though we won't actually simulate a battlemap or creature positions. */
  areaRank: number | null;
  /** Attack-local accuracy modifier. */
  accuracyModifier: number;
  /** How much damage the attack deals on a hit. */
  damage: DicePool;
  /** The usage time of the ability, to distinguish between elite and standard actions. */
  usageTime?: ActiveAbilityUsageTime;
}
```

### 1b. Build Combat Normalization Engine

Create `typescript/src/combat/parse_attack_effect.ts` to automatically extract metadata from `ActiveAbility` text:

- **Targeting Parser**: Search `targeting` for "vs. [Defense]" to populate `defenses`.
- **Damage Parser**: Populate the `damage` field with a `DicePool`. Reuse and refactor the complex string-based parsing logic already implemented in `typescript/src/latex/monsters/player_abilities.ts` (`calculateDamage` and `calculateStrikeDamage`). Modify these functions (or create simulator-ready variants) to return the actual `DicePool` object instead of a formatted string. This handles both rank-based spell/ability damage and complex strike math (weapon dice, multipliers, power scaling).
- **Area Detector**: Search for keywords like `radius`, `cone`, `line`, `emanation` to set `isArea: true`.

Update `Creature.addActiveAbility()` to run this normalization on every ability as it is added. Note that many attack abilities are not automatically parsable by this effect for a variety of reasons, including not dealing damage, so not all attacks will become a SimulatorReadyAttack.

### 1c. Populate metadata on priority monster abilities

Update monster definitions that have non-Armor targeting or area attacks where the parser might need help. Priority:

- Ankheg (Spew Acid: area, vs Reflex)
- Frostweb Spider (Iceweb: area, vs Armor+Reflex; Frost Breath: area, vs Fortitude)
- Hydra Maggot (Impaling Tentacles: vs Reflex)
- Yrthak (Sonic Lance: area, vs Fortitude)

### 1d. Populate metadata on player abilities (maneuvers/spells)

Extend `ManeuverDefinition` and `SpellDefinition` to support the same optional fields. Ensure standard weapon strike maneuvers are correctly identified as `isStrike: true`.

---

## Phase 2: Combat AI & Resolution Improvements

**Goal:** Make the simulator use the correct defense for each attack and choose abilities intelligently using robust damage math.

### 2a. Robust Damage Resolution

In [combat_turn.ts](file:///c:/Users/vadsk/github/Rise/typescript/src/combat/combat_turn.ts), replace the hardcoded `damageTable` with the newly populated `damage` field on `SimulatorReadyAttack`:

- The simulator can simply read the pre-calculated `damage: DicePool` from the attack metadata.
- To resolve an attack, the simulator can roll the dice in the `DicePool` or use `damage.averageDamage()` for expected value calculations.

### 2b. Defense targeting in `resolveAttack`

Update `resolveAttack` to:

1. Read `ability.attack.defenses` (defaulting to `['armor_defense']`).
2. Beat _all_ listed defenses for multi-defense attacks.
3. Use target values: `defender.armor_defense`, `defender.reflex`, `defender.fortitude`, `defender.brawn`, `defender.mental`.

### 2c. Intelligent ability selection

Replace the "pick first weapon ability" logic with a scoring function:

- Estimate expected damage: `P(hit) * damage`.
- `P(hit)` uses the correct target defense and accuracy modifiers.
- Scale area damage by estimated targets (e.g., assume 2 targets for area attacks in group combat).
- Choose the ability with the highest expected value.
- Exclude abilities on cooldown.

### 2d. Elite action reform

- Elite monsters get two actions per round: one elite action and one standard action.
- The simulator must choose the best *elite* action (where `usageTime === 'elite'`) and the best *standard* action separately.
- They cannot use the same ability for both actions.
- If no better elite action exists, elites use a default "Elite Area Sweep" (area rank 2, at a -2 rank damage penalty).

### 2e. Cooldown tracking

Add `cooldowns: Record<string, number>` to `FightState`.

- Track `BRIEF_COOLDOWN` (1 round).
- Decrement at turn start.
- AI ignores abilities on cooldown.

---

## Phase 3: Stock Character Improvements

**Goal:** Make stock characters representative enough to answer class balance questions.

### 3a. Equipment automation

Create `applyStandardEquipment(creature: Creature, level: number)` in [stock_characters.ts](file:///c:/Users/vadsk/github/Rise/typescript/src/character_sheet/stock_characters.ts):

- Body armor is already assigned by class via `getDefaultBodyArmor` — keep that.
- Add shield assignment for relevant classes (fighter, paladin).
- Add scaling magic item bonuses by level if Rise's item system supports numeric bonuses at certain level thresholds. If not, skip this for now.

### 3b. Fill in stock character levels

Currently barbarians exist at levels 1, 4, 7, 10, 13, 16, 19, 21. For balance testing, we want characters at every 3rd level. Add missing levels for barbarian (and other classes as needed) using the existing `applyBarbarianBase` pattern.

### 3c. Archetype ability integration (future)

Archetypes are defined in `typescript/src/classes/archetypes/` but they output LaTeX descriptions, not structured `ActiveAbility` objects. Bridging this gap is a significant engineering task.

**Deferred approach:** For now, manually add representative abilities to stock characters that approximate their archetype choices. For example, a Battlerager barbarian stock character could manually `addManeuver('Reckless Strike')` or similar. This avoids the need to build a general archetype → Creature pipeline.

**Long-term approach:** Build infrastructure to extract archetype rank abilities as `ActiveAbility` objects and apply them to Creatures. This is out of scope for the initial simulator.

---

## Phase 4: Status Effects (Deferred)

**Goal:** Model conditions that meaningfully change combat math.

### 4a. Status effect tracking

Add to `FightState`:

```typescript
conditions: Record<string, Set<string>>; // creatureId → set of active conditions
```

### 4b. Grappled

- When a Grappling Strike hits and also beats the target's Brawn defense, mark the target as grappled.
- Grappled creatures suffer a -2 penalty to Armor defense and Reflex defense.
- Grappled creatures can attempt to escape on their turn (Brawn check vs grappler's Brawn).
- The grappler cannot use that limb for other attacks while maintaining the grapple.

### 4c. Other conditions (future)

Conditions like Prone, Stunned, Dazed, Slowed, etc. can be added incrementally as abilities that inflict them become relevant to test scenarios.

---

## Phase 5: Simulation CLI & Reporting

### 5a. CLI tool

Create `typescript/src/combat/simulate_fight.ts` as a standalone script:

```
npx ts-node src/combat/simulate_fight.ts --team1 "Barbarian 7" --team2 "Ankheg" --iterations 1000
```

- Supports both stock character names and monster names.
- Outputs win rates, average turns, HP remaining, and hit rates.

### 5b. Detailed combat logging

Add an optional verbose mode that logs each round's actions for debugging:

```
Round 1: Ankheg uses Spew Acid (area) vs Reflex → hits Barbarian for 12 damage
Round 1: Barbarian uses Greataxe (strike) vs Armor → hits Ankheg for 15 damage
```

---

## Dependency Order

```
Phase 1 (data model) → Phase 2 (AI) → Phase 3 (characters) → Phase 5 (CLI)
                                    ↘ Phase 4 (status effects, can be done in parallel with 3/5)
```

Phase 1 is a strict prerequisite for Phase 2. Phases 3, 4, and 5 can proceed in any order after Phase 2.

---

## Verification Plan

### Automated

- Existing combat tests in `combat_scenario.test.ts` continue to pass (expected values may shift and should be updated after Phase 2).
- New tests for defense targeting: attack vs Reflex should use `defender.reflex`, not `defender.armor_defense`.
- New tests for ability selection: creature with both a weapon strike and a higher-damage area ability should prefer the area ability when facing multiple targets.
- New tests for cooldowns: ability with BRIEF_COOLDOWN cannot be used on consecutive turns.
- Balance spot-checks: elite monster vs 4× non-elite of the same monster should be roughly 50/50.

### Manual

- Run the CLI with known matchups and verify results are plausible against manual combat math.
- Compare simulator damage-per-round output against the damage tables in the sheet worker.

---

## Progress Tracking

- [x] Phase 1a: Add structured fields to `ActiveAbilityAttack`
- [x] Phase 1b: Populate metadata on priority monster abilities (Normalization Engine)
- [ ] Phase 1c: Populate metadata on player abilities
- [x] Phase 2a: Defense targeting in `resolveAttack`
- [x] Phase 2b: Intelligent ability selection
- [x] Phase 2c: Elite action reform
- [ ] Phase 2d: Cooldown tracking
- [ ] Phase 3a: Equipment automation
- [ ] Phase 3b: Fill in stock character levels
- [ ] Phase 3c: Manual archetype abilities on stock characters
- [ ] Phase 4a: Status effect tracking infrastructure
- [ ] Phase 4b: Grappled condition
- [ ] Phase 5a: Simulation CLI
- [ ] Phase 5b: Verbose combat logging
- [x] Update existing test expectations
