---
trigger: model_decision
description: When reviewing, designing, or implementing class archetypes in Rise.
---

# Class Archetype Design Rules

Core standards, ability budgets, and implementation requirements for Rise class archetypes.

## 1. System Architecture: "5 Archetypes, Choose 3"

- **Structure**: Every base class provides 5 archetypes; characters choose exactly 3 (multiclassing allows substituting from another class).
- **Progression**: Archetypes span Ranks 1–7. Ranks advance evenly across all 3 chosen archetypes (Rank 1 at L1, Rank 2 at L2, Rank 3 at L3; Rank 7 in all three at L21). Formula: $\text{Rank}_i = \lceil (\text{level} - i)/3 \rceil$ for $i \in \{0, 1, 2\}$.
- **Combinatorial Cohesion ($\binom{5}{3} = 10$)**: Every archetype must function cohesively across all 10 combinations within its class without assuming sibling archetypes (unless explicitly designed as dependent mastery).
- **Caster/Martial Flexibility**: Hybrid classes must support both spellcaster and non-caster paths. Archetype features must be universal (functioning identically with weapons, unarmed strikes, and spells) or provide explicit branching clauses (*"If you can cast spells... / Otherwise..."*).

## 2. Ability Budget & Rank Template

Archetypes follow the **one ability per rank** rule (7 abilities total). Two abilities at a single rank is strictly reserved for a narrative ribbon paired with a simple passive (+1 defense or attribute). Avoid active action redundancy (e.g., do not force a strike at Rank 3 if martial siblings already supply one or if serving non-martial builds).

| Rank | Role | Complexity | Typical Ability Type & Purpose |
| :---: | :--- | :---: | :--- |
| **1** | Identity Anchor | 1–3 | Signature mechanical fantasy (*Rage*, *Wild Aspects*, *Bulwark*, *Lay on Hands*). |
| **2** | Enabler / Utility | 0–2 | Defensive bump, passive utility, resource booster (*Battle-Scarred*, *Shift Body*). |
| **3** | Core Engine | 1–2 | Scalable active ability, stance, or defensive/regen engine (*Resilient Blow*, *Earth's Nourishment*). |
| **4** | Midgame Milestone | 0–2 | +1 Core Attribute (Str/Con/Dex/Per) OR signature expansion. Optional narrative ribbon. |
| **5** | Power Spike | 0–2 | Second-tier defense (+2 defenses, resistance), or resource friction removal. |
| **6** | Tier 3 Scaling | 0–1 | Durability scaling (+4 durability, +2 vital rolls, +2 power), or vital wound mitigation. |
| **7** | Capstone | 1–2 | Pinnacle fantasy: permanent mobility (*Airdance*), potent immunities, or trauma mastery. |

## 3. Design Constraints & Tabletop Usability

- **Unique Keystones**: Signature mechanics, stances, and auras must be completely unique to the archetype. Never clone or lightly reskin keystones from other archetypes.
- **Standardized Math**: Numerical bonuses use standard progressions (see [combat-math.md](file:///c:/Users/vadsk/github/Rise/.agent/rules/combat-math.md)).
- **No Fiddly Auras**: Never use small radius ally emanation auras (+1 defenses within 10 ft is easily forgotten in play). Use targeted actions, triggered reactions, or personal buffs.
- **Action Economy**: Limit to $\le 1$ primary Standard action per archetype to prevent action competition. Use Minor for stances/buffs, Free for mode toggles, and Triggered for reactive effects. Use `\glossterm{briefly}` / `\brief` for temporary round-to-round effects.
- **Complexity Budget**: An archetype should contain at most one complexity 3–4 ability, 1–2 complexity 2 abilities, and mostly complexity 0–1 passives ([`RankAbility`](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/types.ts#L104-L110)).

## 4. Mathematical Benchmarks

- **Defenses**: Passive +1 or +2 to designated defenses (Brawn, Fortitude, Reflex, Mental, Armor).
- **Attributes**: +1 to a single designated attribute at Rank 4.
- **Durability & Vital Rolls**: Rank 2 (+2 Durability, +1 Vital); Rank 5–6 (+4 Durability, +2 Vital).
- **Power**: +1 at Rank 3, +2 at Rank 6 (hybrid archetypes boost both mundane and magical power).
- **Strike Multipliers (Rank 3 strikes)**: Rank 3: $2\times$ weapon; Rank 4–5: $2\times$–$3\times$ + half power; Rank 6–7: $3\times$–$4\times$ + full power.
- **Healing**: Active heals scale via macros `\hprankfour` (Rank 1) through `\hpranknine` (Rank 7).

## 5. Implementation Standards

- **TypeScript Architecture**:
  - Export ability array function in `typescript/src/classes/archetypes/<class>.ts` returning [`RankAbility[]`](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/types.ts).
  - Export modifier function `<archetypeName>Modifiers(creature, rank)` using [`applyArchetypeActiveAbilities`](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/archetypes/apply_archetypes.ts) and `creature.addSimpleModifier()` / `addCustomModifier()`.
  - Register in [`ClassArchetype`](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/types.ts), [`archetypes.ts`](file:///c:/Users/vadsk/github/Rise/typescript/src/classes/archetypes.ts), and [`classes.ts`](file:///c:/Users/vadsk/github/Rise/typescript/src/latex/classes.ts).
- **LaTeX Environments**:
  - Active abilities use `\begin{activeability}`, `\begin{magicalactiveability}`, `\begin{sustainability}`, or `\begin{magicalsustainability}` with `\abilitytags`, `\abilitycost`, `\rankline`, and `\rank{N}`.
