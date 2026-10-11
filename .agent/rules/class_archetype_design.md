---
trigger: model_decision
description: When reviewing, designing, or implementing class archetypes in Rise.
---

# Class Archetype Design Principles

This document establishes the official design standards, mathematical formulas, structural templates, and implementation requirements for creating and evaluating class archetypes in Rise.

---

## 1. System Architecture: The "5 Archetypes, Choose 3" Model

In Rise, class design is governed by modularity and combinatorial balance:

1. **Class Composition**: Every base class provides exactly five archetypes.
2. **Player Selection**: Every character selects exactly **three** of those five archetypes (or substitutes choices via multiclassing).
3. **Progression Pacing**:
   * Characters gain Rank 1 in their first archetype at Level 1, their second at Level 2, and their third at Level 3.
   * After 3rd level, ranks advance evenly across all three chosen archetypes, reaching Rank 7 in each archetype by Level 21:
     $$\text{Ranks}(\text{level}) = \left[\lceil \text{level} / 3 \rceil,\, \lceil (\text{level} - 1) / 3 \rceil,\, \lceil (\text{level} - 2) / 3 \rceil\right]$$
   * Archetypes span **Rank 1 to Rank 7**. Characters never "rush" an archetype to Rank 7 while neglecting their other two.
4. **The 10-Combination Rule ($\binom{5}{3} = 10$)**:
   * Every archetype must be designed to function cohesively in **any** of the 10 possible combinations within its native class.
   * No archetype may assume the presence of a specific sibling archetype unless explicitly labeled as a dependent mastery archetype (such as [Nature Spell Mastery](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/archetypes/druid.ts) requiring [Nature Magic](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/archetypes/druid.ts)).
5. **Caster vs. Non-Caster Adaptability**:
   * In hybrid/spellcasting classes (e.g., Druid, Cleric, Paladin, Votive), players can build fully functional characters **without** selecting the spellcasting archetype.
   * Archetypes intended to support both paths should either:
     * Provide features that function **identically and universally** regardless of whether the character casts spells, makes weapon strikes, or uses unarmed/natural attacks, or
     * Include explicit branching clauses (e.g., [Elementalist](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/archetypes/druid.ts): *"If you have access to nature magic... / If you do not have access to nature magic, you gain..."*).

---

## 2. Structural Rank Blueprint & Ability Budgeting

### 2.1 Ability Count Budget (The "One Ability Per Rank" Rule)
* **Standard Budget**: Archetypes should generally have **one ability per rank** (7 abilities total across Ranks 1 to 7).
* **Double Abilities are Rare**: Having two abilities at the same rank is unusual. When an archetype has two abilities at the same rank, it is generally because at least one is **highly situational or purely narrative** (a "ribbon"), and its paired ability must be **particularly simple** (e.g., a simple +1 attribute increase or a +1 defense bonus) to compensate.
* **Avoid Bloat**: Do not stack multiple combat-effective abilities on a single rank.

### 2.2 Progression Template (Ranks 1 through 7)

| Rank | Primary Role | Complexity | Typical Ability Type & Purpose |
| :---: | :--- | :---: | :--- |
| **Rank 1** | **Identity Anchor** | 1–3 | The signature feature defining the archetype's thematic and mechanical fantasy (e.g., *Rage*, *Wild Aspects*, *Bulwark*, *Lay on Hands*). Provides immediate, distinctive gameplay. |
| **Rank 2** | **Enabler / Broadener** | 0–2 | Defensive boost, passive utility, resource booster, or secondary stance (e.g., *Shift Body*, *Battle-Scarred*, *Healer's Grace*, *Enduring Discipline*). |
| **Rank 3** | **Core Engine / Workhorse** | 1–2 | Signature scalable active ability OR core mechanical engine (e.g., *Shifting Claw*, *Resilient Blow*, *Earth's Nourishment*, *Stalwart Defense*). **See Strike Redundancy note below.** |
| **Rank 4** | **Midgame Milestone** | 0–2 | Core attribute increase (+1 to Str, Con, Dex, or Per) **OR** major expansion to the Rank 1 signature ability. May optionally pair with a narrative utility ribbon. |
| **Rank 5** | **Power / Action Spike** | 0–2 | Substantial leap in versatility, second-tier defense bump (*Ironwood Bark+*, *Specialized Bulwark*), or removal of resource friction (*Shift Body+* losing Attune cost). |
| **Rank 6** | **Tier 3 Resilience / Scaling** | 0–1 | High-tier durability scaling (+4 to +8 durability, +2 vital rolls), second power bump (+2 power), or vital wound mitigation. |
| **Rank 7** | **The Capstone** | 1–2 | The pinnacle of the archetype fantasy: permanent advanced mobility (*Airdance*), potent immunities (*True Discipline*), or mastery over vital trauma (*Last to Fall*, *Ancient of the Forest*). |

### 2.3 Rank 3 Nuance: Avoid Strike Redundancy
* **Do NOT force an active strike at Rank 3** if:
  1. The archetype is intended to function for spellcasters who do not make weapon strikes, and
  2. The class's martial archetypes already provide their own active strikes (e.g., in Druid, [Shifter](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/archetypes/druid.ts) provides *Shifting Claw* and [Elementalist](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/archetypes/druid.ts) provides *Elemental Infusion*).
* Forcing a strike onto a universal archetype creates a dead feature for casters and redundant action competition for martials. Instead, use Rank 3 for a universal defensive engine, passive regeneration, or stance that serves any build.

---

## 3. Keystone Ability Uniqueness vs. Statistical Standards

* **Statistical Improvements (Standardized)**: Simple numerical bonuses do **not** need to be unique. Using standard progressions for +1/+2 defenses, +1 attribute increases, +2/+4 durability, and +1/+2 vital rolls ensures cross-class balance and predictable math.
* **Keystone Abilities (Must Be Fully Unique)**: Signature abilities, auras, stances, and active mechanics must be **completely unique**.
  * **Never clone keystones**: Do not copy or lightly reskin an existing keystone from another archetype (e.g., do not copy Sentinel's *Threatening Influence* as a plant aura).
  * Every archetype must introduce its own distinct mechanical hook that reinforces its specific lore and fantasy.

---

## 4. Action Economy, Resources, & Tabletop Usability

### 4.1 Tabletop Usability: Avoid Fiddly Auras
* **No Small Emanation Ally Auras**: Small numerical bonuses that affect allies in a small radius emanation (e.g., +1 defenses to adjacent allies) are **extremely difficult to track in real gameplay and constantly forgotten**.
* **Preferred Support Mechanics**:
  * Direct targeted actions with clear instantaneous durations (e.g., *Lay on Hands*).
  * Explicit reactive triggered interventions (e.g., interposing to absorb a vital wound when an ally within reach is struck).
  * Self-contained personal benefits that do not require checking ally positioning on every attack roll.

### 4.2 Action Economy Guidelines
* **Standard Action**: Reserved for primary attacks, major spells, active heals, and decisive turns. Limit archetypes to at most one primary standard action to prevent cannibalizing the character's core actions.
* **Minor Action**: Used for activating stances, recovery, or secondary utilities.
* **Free Action**: Mode toggling, stance dismissals, drawing weapons.
* **Triggered / Reactive**: Immediate responses to being hit, rolling critical hits, or allies taking trauma.
* **The "Brief" Clause**: Temporary combat adjustments must use the `\glossterm{briefly}` / `\brief` mechanic rather than arbitrary round tracking.

---

## 5. Mathematical Budgeting & Scaling Standards

All abilities must strictly follow Rise math standards (see [combat-math.md](file:///c:/Users/vadsk/github/Rise/.agent/rules/combat-math.md), [damaging_abilities.md](file:///c:/Users/vadsk/github/Rise/docs/damaging_abilities.md), and [extra_damage_scaling.md](file:///c:/Users/vadsk/github/Rise/docs/extra_damage_scaling.md)):

### 5.1 Defensive & Attribute Budgets
* **Defenses**: Passive defense bonuses are almost always **+1** or **+2** to specific defenses (Brawn, Fortitude, Reflex, Mental, Armor).
* **Attributes**: Archetype attribute increases grant **+1** to a single designated attribute, almost always placed at **Rank 4** (e.g., *Primal Resilience*, *Stalwart Core*, *Oak's Endurance*).
* **Durability & Vital Rolls**:
  * Early tier (Rank 2): +2 Durability; +1 Vital Rolls.
  * Late tier (Rank 5–6): Increases to +4 Durability; +2 Vital Rolls.
* **Resistance & Immunities**:
  * `\resistant` (half damage) can be applied to specific tags (e.g., Fire, Poison) at mid tiers (Rank 4–5).
  * Condition immunities (e.g., immune to `\debuff{bleed}`, `\sickened`, or `\prone`) fit thematic physical profiles (e.g., wood having no blood to bleed).

### 5.2 Power Scaling
* Power bonuses grant **+1** at **Rank 3** and increase to **+2** at **Rank 6** (e.g., *Elemental Power / Elemental Power+*, *Paragon Power / Paragon Power+*).
* Hybrid archetypes should boost both `mundane_power` and `magical_power` unless strictly locked to one damage profile.

### 5.3 Active Strike Scaling (When Applicable)
When an archetype includes an active combat strike at Rank 3, it scales at Ranks 4, 5, 6, and 7:
* **Damage Multipliers**:
  * Rank 3: Double weapon damage (or base strike with condition/special effect).
  * Rank 4–5: Double or triple weapon damage; extra damage equal to half power.
  * Rank 6–7: Quadruple weapon damage, or triple weapon damage with extra damage equal to power (or $1\text{d}6$ per 2 power).
* **Healing Scaling**: Active heals use macros `\hprankfour` (Rank 1) through `\hpranknine` (Rank 7) (e.g., *Lay on Hands*, *Divine Aid*).

### 5.4 Complexity Budget
The `complexity` field in [`RankAbility`](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/types.ts#L104-L110) governs cognitive load:
* `complexity: 0`: Pure passive numerical bonuses (+1 Fortitude, +1 Power, +1 Attribute).
* `complexity: 1`: Simple passive rules, triggers, or static action tweaks (e.g., immunity to bleed, speaking with plants).
* `complexity: 2`: Standard active abilities, stances, or strikes with 2–4 choice options.
* `complexity: 3–4`: Broad subsystem engines (spell lists, wild aspect menus, portable workshops, maneuver learning).
* **Target Archetype Profile**: No more than one complexity 3–4 ability per archetype, several complexity 0–1 abilities, and 1–2 complexity 2 features.

---

## 6. Code & LaTeX Implementation Standards

Archetypes exist in TypeScript and generate LaTeX for rulebook compilation:

### 6.1 TypeScript Architecture
1. **Ability Array Function**:
   * Exported function in `typescript/src/classes/archetypes/<class>.ts` returning `RankAbility[]`.
   * Descriptions use valid LaTeX with Rise commands (`\glossterm`, `\ability`, `\pcref`, `\plus1`, `\minus1`, `\rankline`, `\rank{X}`).
2. **Modifier Function**:
   * Exported function `<archetypeName>Modifiers(creature: Creature, rank: number)`.
   * Calls [`applyArchetypeActiveAbilities(creature, abilities(), rank)`](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/archetypes/apply_archetypes.ts#L16-L29).
   * Applies simple modifiers via `creature.addSimpleModifier({ name, statistic, value })`.
   * Applies multi-statistic or conditional modifiers via `creature.addCustomModifier({ name, numericEffects: [...] })`.
3. **Registration**:
   * Add archetype string to [`ClassArchetype`](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/types.ts#L24-L102).
   * Register in [`archetypes.ts`](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/archetypes.ts): name mapping, short description, ability getter, class association, and modifier invocation.
   * Add LaTeX chapter entry in [`classes.ts`](file:///c:/Users/vadsk/github/Rise/typescript/src/latex/classes.ts).

### 6.2 LaTeX Environment Formatting
Active abilities must use the standardized LaTeX environments:
* `\begin{activeability}{Name}{Action}` ... `\end{activeability}`
* `\begin{magicalactiveability}{Name}{Action}` ... `\end{magicalactiveability}`
* `\begin{sustainability}{Name}{Action}` ... `\end{sustainability}`
* `\begin{magicalsustainability}{Name}{Action}` ... `\end{magicalsustainability}`
* `\begin{magicalattuneability}{Name}{Duration}` ... `\end{magicalattuneability}`

Inside active abilities:
* `\abilitytags` (e.g., `\atPhysical`, `\atPlant`, `\atSustain (minor)`)
* `\abilitycost` for stamina or cooldowns.
* `\rankline` before the base effect, and before rank scaling blocks.
* `\rank{N}` for rank-specific improvements.

---

## 7. The Druid Ecosystem & Case Study: Designing "Oakheart"

Applying these principles to the [Oakheart](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/archetypes/druid.ts#L568-L571) archetype demonstrates how to build a universal, clean, and distinct class archetype:

### 7.1 The Druid Niches & The Triad of Nature
1. **Nature Magic**: The core spellcasting engine.
2. **Nature Spell Mastery**: Metamagic and spell enhancement.
3. **Elementalist**: The inanimate natural forces (air, earth, fire, water).
4. **Shifter**: Fauna (animals, predators, natural weapons, beast forms).
5. **Oakheart (The 5th Archetype)**: Flora (ancient trees, roots, ironwood bark, living soil resilience).

### 7.2 Canonical Constraints & Theme
* **Tagline**: *"This archetype deepens your physical connection to nature, granting you the durability of the mighty oak."*
* **Blighter Prohibition**: In [OptionalRules.tex](file:///c:/Users/vadsk/github/Rise/comprehensive_codex/OptionalRules.tex#L30-L35), Blighters are strictly forbidden from taking Oakheart. Oakheart embodies living, uncorrupted flora and deep harmony with the earth.
* **Universal Usability**: Must function identically for a backline spellcaster, a frontline beast-shifter, or an elementalist warrior without redundant strikes or wasted spell requirements.

### 7.3 Reference Archetype Blueprint: Oakheart
* **Rank 1: Ironwood Bark**: +1 Armor and Fortitude defenses; +2 Brawn/Fortitude vs. forced movement and knockdown while grounded.
* **Rank 2: Heart of Oak**: +2 Durability, +1 Vital Rolls; immune to bleed.
* **Rank 3: Earth's Nourishment**: Regain HP equal to rank at end of turn when grounded and remaining stationary (doubled on natural earth).
* **Rank 4: Oak's Endurance & Woodland Communion**: +1 Constitution paired with a narrative ribbon (communicating with plants).
* **Rank 5: Ironwood Bark+**: Defense bonuses increase to +2; resistant to Poison, immune to sickened.
* **Rank 6: Heart of Oak+**: Durability increases to +4, vital rolls to +2; roll twice on vital rolls and take higher.
* **Rank 7: Ancient of the Forest**: Immune to prone and forced movement; vital wound penalty halved to -1; free vital wound removal on short rest on natural soil.
