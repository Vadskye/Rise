# Combat Simulation Improvements

Refactor the existing combat simulator to resolve architectural bottlenecks, improve performance, and formalize the action economy and state management. These improvements will prepare the simulator to handle more complex abilities, conditions, and tactical targeting.

## Design Principles

1. **Performance via Caching.** Avoid heavy operations like regex matching and LaTeX parsing in the hot loop of the simulation. Parse once, simulate many times.
2. **Standardized Systems over Hardcoding.** Combat rules like action economy, condition modifiers, and targeting should be handled by generalized systems rather than hardcoded `if/else` statements in the combat turn loop.
3. **Decoupled Resolution.** Complex functions like `resolveAttack` should be broken down into discrete, testable steps (hit evaluation, damage calc, effect application) to allow for easier integration of future mechanics (e.g., resistances, miss effects).

---

## Phase 1: Performance & Caching

**Goal:** Remove `parseAttackEffect` from the hot loop to drastically improve simulation iteration speed.

### 1a. Cache Parsing Results

- Modify `parseAttackEffect` to return `SimulatorReadyAttack | null`.
- Update the simulator initialization to run `parseAttackEffect` on every `ActiveAbility` for every creature at the start of the simulation (or ideally, when the ability is added to the `Creature` via `addActiveAbility`).
- Cache the resulting `SimulatorReadyAttack[]` arrays on the `Creature` object.

### 1b. Update Combat Turn Logic

- Update `executeAttackerAction` to read from the cached array of `SimulatorReadyAttack`s instead of dynamically parsing `attacker.getActiveAbilities()` on every turn.

---

## Phase 2: Structured Condition Engine

**Goal:** Move away from unstructured string sets for status effects to a typed, extensible system.

### 2a. Condition Interface

- Replace `FightState.conditions: Record<string, Set<string>>` with a structured system: `Record<string, Condition[]>`.
- Define `Condition` interface: `{ type: string; sourceId?: string; durationRemaining?: number; }`.

### 2b. Centralize Stat Modifiers

- Remove hardcoded modifiers (like `-2` armor for grappled) from `resolveAttack`.
- Instead of duplicating condition logic, apply conditions directly to the `Creature`'s underlying `CharacterSheet` (e.g., `defender.sheet.setProperties({ grappled: '1' })`) when they are gained or lost in combat. This allows the simulator to read the correctly modified defense directly from the `Creature` object using the existing debuff logic in `sheet_worker.ts`.

---

## Phase 3: Decouple Damage Resolution

**Goal:** Break `resolveAttack` into smaller, manageable functions to support future mechanics.

### 3a. Hit Evaluation

- Create `calculateHitDegree(attacker, defender, attack, state)` returning `Miss`, `Hit`, or `Crit`.

### 3b. Damage Calculation & Application

- Create `calculateDamageDealt(hitDegree, attack, state)` to calculate final damage (handling crit multipliers).
- Create `applyDamageAndEffects(target, damage, hitDegree, attack, state)` to deduct HP and apply conditions (like the grapple effect).
- Update `selectAndExecuteAction` to orchestrate these new functions instead of calling the monolithic `resolveAttack`.

---

## Progress Tracking

- [ ] Phase 1a: Cache Parsing Results
- [ ] Phase 1b: Update Combat Turn Logic
- [ ] Phase 2a: Condition Interface
- [ ] Phase 2b: Centralize Stat Modifiers
- [ ] Phase 3a: Hit Evaluation
- [ ] Phase 3b: Damage Calculation & Application
