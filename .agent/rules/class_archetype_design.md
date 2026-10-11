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
   * Archetypes that provide combat strikes or magical abilities should either:
     * Support both weapon/unarmed attacks and spellcasting, or
     * Include branching clauses (e.g., [Elementalist](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/archetypes/druid.ts): *"If you have access to nature magic... / If you do not have access to nature magic, you gain..."*).

---

## 2. Structural Rank Blueprint (Ranks 1 through 7)

A well-crafted archetype follows an established progression curve that balances identity, combat effectiveness, passive resilience, and action economy:

| Rank | Primary Role | Complexity | Typical Ability Type & Purpose |
| :---: | :--- | :---: | :--- |
| **Rank 1** | **Identity Anchor** | 2–4 | The signature feature defining the archetype's thematic and mechanical fantasy (e.g., *Rage*, *Wild Aspects*, *Portable Workshop*, *Animal Companion*, *Lay on Hands*). Provides immediate gameplay options. |
| **Rank 2** | **Enabler / Broadener** | 1–2 | Defensive boost, passive utility, resource booster, or secondary stance/choice (e.g., *Shift Body*, *Battle-Scarred*, *Healer's Grace*, *Enduring Discipline*). |
| **Rank 3** | **Combat Workhorse** | 2 | Signature scalable active ability or strike that scales across Ranks 4–7 (e.g., *Shifting Claw*, *Disciplined Blow*, *Resilient Blow*, *Adaptive Blow*, *Tag-Team Takedown*), often paired with a +1 Power bonus. |
| **Rank 4** | **Midgame Milestone** | 0–2 | Attribute increase (+1 to a core attribute like Str, Con, Dex, or Per) **OR** major expansion to the Rank 1 signature ability (e.g., *Animal Shape*, *Aligned Aura+*, *Cleansing Discipline*). |
| **Rank 5** | **Action / Utility Spike** | 1–3 | Substantial leap in versatility, zone manipulation, or removal of action/resource friction (e.g., *Elemental Control*, *Shift Body+* losing the attunement cost, *Limitless Recovery*, *Metamagic+*). |
| **Rank 6** | **Tier 3 Resilience / Scaling** | 0–1 | High-tier defense buff, durability scaling (+4 to +8 durability, +1 vital rolls), or second power bump (+2 mundane/magical power). |
| **Rank 7** | **The Capstone** | 1–2 | The pinnacle of the archetype fantasy: dual-mode stances (*Hybrid Aspect*), powerful immunities (*True Discipline*, *Unbreakable*), permanent advanced mobility (*Airdance*, *Elemental Balance+* fly speed), or max-rank strike scaling. |

---

## 3. Mathematical Budgeting & Scaling Standards

All abilities must strictly follow Rise math standards (see [combat-math.md](file:///c:/Users/vadsk/github/Rise/.agent/rules/combat-math.md), [damaging_abilities.md](file:///c:/Users/vadsk/github/Rise/docs/damaging_abilities.md), and [extra_damage_scaling.md](file:///c:/Users/vadsk/github/Rise/docs/extra_damage_scaling.md)):

### 3.1 Defensive & Attribute Budgets
* **Defenses**: Passive defense bonuses are almost always **+1** or **+2** to specific defenses (Brawn, Fortitude, Reflex, Mental, Armor).
* **Attributes**: Archetype attribute increases grant **+1** to a single designated attribute, usually placed at **Rank 4** (e.g., *Primal Resilience*, *Primal Agility*, *Stalwart Core*).
* **Durability & Vital Rolls**:
  * Early tier (Rank 2): +2 to +4 Durability; +1 to Vital Rolls.
  * Late tier (Rank 5–6): Increases to +4 to +8 Durability; +1 to +2 to Vital Rolls.
* **Injury Point Modifiers**: High durability additions should be paired with proportional injury point increases if they represent raw grit rather than sheer invulnerability (e.g., Barbarian *Battle-Scarred*).

### 3.2 Power Scaling
* Power bonuses grant **+1** at **Rank 3** and increase to **+2** at **Rank 6** (e.g., *Elemental Power / Elemental Power+*, *Paragon Power / Paragon Power+*).
* Hybrid archetypes should boost both `mundane_power` and `magical_power` unless strictly locked to one damage profile.

### 3.3 Active Strike Scaling (Rank 3 Workhorse)
Active strikes introduced at Rank 3 scale at Ranks 4, 5, 6, and 7 using the standardized progression:
* **Weapon Damage Multipliers**:
  * Rank 3: Double weapon damage (or base strike with condition/special effect).
  * Rank 4–5: Double or triple weapon damage; extra damage equal to half power.
  * Rank 6–7: Quadruple weapon damage, or triple weapon damage with extra damage equal to power (or $1\text{d}6$ per 2 power).
* **Healing Scaling**:
  * Standard active heals use the macros `\hprankfour` (Rank 1) through `\hpranknine` (Rank 7) (e.g., *Lay on Hands*, *Divine Aid*).

### 3.4 Movement Modes
* **Glide / Swim / Climb**: Slow speeds appear at Rank 1–2; average speeds at Rank 3–5.
* **Fly**: Slow fly speed (with 15–30 ft height limit) is reserved for **Rank 7** capstones or Rank 4 with strict limitations.

### 3.5 Complexity Budget
The `complexity` field in [`RankAbility`](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/types.ts#L104-L110) governs cognitive load at the table:
* `complexity: 0`: Pure passive numerical bonuses (+1 Fortitude, +1 Power, +1 Attribute).
* `complexity: 1`: Simple passive rules, triggers, or static action tweaks (e.g., drawing weapons as free action, ignoring undergrowth).
* `complexity: 2`: Standard active abilities, strikes with 2–4 choice options, or basic sustainability stances.
* `complexity: 3–4`: Broad subsystem engines (spell lists, wild aspect menus, portable workshops, maneuver learning).
* **Target Archetype Profile**: A healthy archetype contains no more than one complexity 3–4 ability (at Rank 1), several complexity 0–1 abilities, and 2–3 complexity 2 active features.

---

## 4. Action Economy & Resource Management

Archetypes must fit cleanly into the Rise action economy:

1. **Action Types**:
   * **Standard Action**: Reserved for attacks, major spells, active strikes, and primary combat moves. Each archetype should provide at most one primary go-to standard action strike/ability per round to avoid cannibalizing the character's core action.
   * **Minor Action**: Used for activating stances, drinking potions, recovery buffs, or secondary utilities.
   * **Free Action**: Mode toggling, drawing weapons, dismissals. Stances like *Rage* or *Aligned Aura* activate as a free action.
   * **Triggered / Reactive**: Responses to getting hit, rolling critical hits, or allies taking damage.
2. **Resource Consumption**:
   * **Stamina**: Costs 1 stamina for minor perks/heals, 2 stamina for strong combat boosts, 3+ stamina for encounter-defining miracles or daily surges.
   * **Attunement**: Used for persistent passive gear/power commitments (`\abilitytag{Attune}`). High ranks (Rank 5+) may waive attunement requirements (*Shift Body+*).
   * **Insight Points**: Used to purchase additional choices from broad menus (extra spells, extra wild aspects, extra craft recipes, exotic proficiencies).
3. **The "Brief" Clause**:
   * Buffs or debuffs intended to last only until the end of the next turn or action must use the `\glossterm{briefly}` / `\brief` mechanics rather than complicated duration tracking.

---

## 5. Tactical Identity & Role Fit

Per [tactical_abilities.md](file:///c:/Users/vadsk/github/Rise/docs/tactical_abilities.md), abilities should not just be generic math bonuses—they must provide distinct advantages in recognizable tactical contexts:

* **Superiority vs. Swarm (Crowd Control / Hazard)**: Zones, light undergrowth difficult terrain, area pushes, sweeping strikes.
* **Superiority vs. Boss (Execution / Sustain)**: Extra damage against injured targets, consistent single-target damage, condition resistance.
* **Inferiority vs. Boss (David vs. Goliath / Tanking)**: High defenses, vital wound mitigation, defensive stances, rooting, retaliatory damage, damage absorption for allies.
* **Mobility & Battlefield Geometry**: Interacting with terrain (trees, undergrowth, earth, elevation), anchoring against forced movement, creating difficult terrain.

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

To design the missing [Oakheart](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/archetypes/druid.ts#L568-L571) archetype, we apply these principles to the specific context of the Druid class:

### 7.1 Existing Druid Archetype Niches
1. **Nature Magic**: The core spellcasting engine (mystic spheres, cantrips, nature spells).
2. **Nature Spell Mastery**: The metamagic specialist (empowering spells, plant proxy targeting, rituals).
3. **Elementalist**: The inanimate natural forces (air, earth, fire, water; strikes, resistance, flight/swim, environmental control).
4. **Shifter**: The animal / fauna specialist (beast forms, natural weapons, predatory combat, shapeshifting).
5. **Oakheart (The Missing 5th)**: The plant / flora specialist (**botanical embodiment, ancient tree resilience, root/bark defense, plant manipulation**).

### 7.2 Thematic Mandate & Canonical Constraints
* **Short Description**: *"This archetype deepens your physical connection to nature, granting you the durability of the mighty oak."*
* **Blighter Prohibition**: In [OptionalRules.tex](file:///c:/Users/vadsk/github/Rise/comprehensive_codex/OptionalRules.tex#L30-L35), Blighters (corrupted defilers of nature) are strictly barred from choosing Oakheart and from gaining the Verdamancy sphere. Oakheart represents pristine vegetative life, primordial growth, and flourishing plant vigor.
* **The Triad of Nature**:
  * Elementalist = Elements (Air, Earth, Fire, Water)
  * Shifter = Fauna (Animals, Predators, Prowlers)
  * Oakheart = Flora (Trees, Roots, Vines, Bark, Thorns, Brambles)

### 7.3 Combinatorial Support for Oakheart
Oakheart must pair gracefully in all 4 Druid trios:
* **Caster Builds** (e.g., *Nature Magic + Nature Spell Mastery + Oakheart*): Oakheart provides a resilient botanical anchor, granting barkskin defenses, rooting stability, and battlefield area control while casting spells.
* **Martial / Non-Caster Build** (*Shifter + Elementalist + Oakheart*): The druid has **no spells**. Oakheart must provide physical/plant combat capabilities (e.g., vine lash / branch strikes, plant durability, root regeneration) that synergize with natural weapons and elemental infusions without requiring a spellcasting resource pool.
* **Primal Guardian** (*Nature Magic + Shifter + Oakheart*): The quintessential primal protector combining animal ferocity with botanical resilience.
* **Elemental Warden** (*Nature Magic + Elementalist + Oakheart*): A frontline guardian blending elemental forces with ancient living wood.
