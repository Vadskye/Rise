---
trigger: model_decision
description: When you need rules for character creation or core character statistics like attributes
---

# Rise Character System Overview

This document summarizes the core rules and mechanics for character definition and progression in Rise, derived from `comprehensive_codex/Characters.tex`.

## 1. Character Creation Process

Character creation blends thematic and mechanical decisions, typically following a structured sequence:
1.  **Concept & Motivation:** Define the character's essence and goals.
2.  **Species:** Choose a species, which can modify attributes and influence languages.
3.  **Attributes:** Distribute points (8 points, max 3 per attribute) or use arrays (Standard, Specialized, Balanced). Species modifiers are applied.
4.  **Class & Archetypes:** Select a base class and an archetype. Additional archetypes are gained at levels 2 and 3.
5.  **Insight Points:** Spend these points to gain new abilities, often after other choices are made.
6.  **Skills:** Choose trained skills, influenced by class and Intelligence.
7.  **Equipment:** Acquire starting items based on item ranks.
8.  **Personality, Background, Appearance, Alignment, Name:** Define narrative elements.

## 2. Core Character Statistics

### 2.1. Attributes (Str, Dex, Con, Int, Per, Wil)

*   **Definition:** Represent raw talent. A value of 0 signifies average human capability. Player characters are typically exceptional, with higher attributes.
*   **Impact:**
    *   **Strength (Str):** Muscle, physical power. Affects Brawn defense, mundane power, brawling accuracy, carrying capacity, and Strength-based skills (Climb, Jump, Swim).
    *   **Dexterity (Dex):** Hand-eye coordination, agility, reflexes. Affects Armor defense (halved for medium/heavy armor/shields), Reflex defense, Dexterity-based skills (Balance, Flexibility, Ride, Sleight of Hand, Stealth), and dual strikes.
    *   **Constitution (Con):** Health, stamina. Affects Hit Points, Fatigue Tolerance, Fortitude defense, and Constitution-based skills (Endurance).
    *   **Intelligence (Int):** Learning, reasoning. Affects number of trained skills (if positive) and Insight Points. Affects Intelligence-based skills (Craft, Deduction, Disguise, Knowledge, Medicine). Creatures incapable of complex cognition (e.g., animals) have \minus6 or lower.
    *   **Perception (Per):** Observation, awareness. Affects accuracy with most attacks and Perception-based skills (Awareness, Creature Handling, Social Insight, Survival).
    *   **Willpower (Wil):** Mental endurance. Affects magical power and Mental defense.
*   **Attribute Penalties:** Voluntarily reducing an attribute by \minus1 grants a trained skill; by \minus2 grants an insight point. Cannot reduce below \minus2 or gain benefits from more than two attributes this way.

### 2.2. Combat Statistics

*   **Accuracy:** Number added to attack rolls.
    *   **Formula:** `floor((Level + Perception) / 2)`
    *   **Brawling Accuracy:** Used for \glossterm{brawling attacks}.
    *   **Brawling Formula:** `floor((Level + Strength) / 2)`
    *   **Note:** General accuracy modifiers (like weapon bonuses) apply on top of this base.
*   **Defenses (AD, Brawn, Reflex, Fortitude, Mental):** Value needed to hit.
    *   **Calculation:** `floor(Level / 2) + primary attribute + class/equipment bonuses`
    *   **Armor Defense (AD):** Physical attacks (e.g., sword). Most common.
    *   **Brawn Defense:** Physical restraint/control (e.g., grappling).
    *   **Reflex Defense:** Dodging/evading (e.g., area attacks).
    *   **Fortitude Defense:** Attacks against body/life (e.g., poisons).
    *   **Mental Defense:** Attacks against mind (e.g., mind manipulation).
*   **Encumbrance:** Penalty from armor to Dexterity-based checks and Strength-based skill checks (not direct Strength checks).
*   **Hit Points:** Measures how much damage a character can take before dying. Defined by class, increase with level and Constitution. Cannot be less than 1. Represent resilience, luck, and determination, not literal injury.
*   **Injury Point:** 
*   **Power (Mundane & Magical):** Represents ability strength.
    *   **Mundane Power:** Strength + half level. Affects mundane abilities.
    *   **Magical Power:** Willpower + half level. Affects magical abilities.
    *   Unspecified "power" bonuses affect both.

## 3. Resources

*   **Attunement Points:** Required for many special abilities and magic items. Defined by base class, can be granted by other sources. \glossterm{Deep attunement} properties reduce maximum attunement points.
*   **Fatigue:** Represents exertion.
    *   **Fatigue Level:** Measures current fatigue, increased by abilities/attacks.
    *   **Fatigue Tolerance:** Maximum \glossterm{fatigue level} without penalty (3 + Constitution, min 0).
    *   **Fatigue Penalty:** \glossterm{fatigue level} \sub \glossterm{fatigue tolerance} (min 0), applied to accuracy and checks.
    *   **Exhaustion:** Occurs when \glossterm{fatigue penalty} reaches \minus5, causing unconsciousness.
    *   **Recovery:** Resets to 0 after a \glossterm{long rest}; no other methods.
    *   **Paying Costs:** Fatigue costs increase \glossterm{fatigue level} after ability resolves; no immediate penalty from this increase.
*   **Insight Points:** Flexible points to gain new special abilities (e.g., combat styles, spells, multiclassing). Sources include base class, Intelligence, and other abilities.
*   **Trained Skills:** Increase bonus with skills. Granted by base class (from class skills), Intelligence (any skill), and other abilities (any skill).

## 4. Size and Weight

### 4.1. Size Categories

| Size | Space | Base Speed | Weight Limits | Brawn | Reflex | Stealth | Weapons |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Fine | 1/4 ft. | 10 ft. | -4 Str | -4 | +4 | +16 | - |
| Diminutive | 1/2 ft. | 10 ft. | -3 Str | -3 | +3 | +12 | - |
| Tiny | 1 ft. | 20 ft. | -2 Str | -2 | +2 | +8 | - |
| Small | 2-1/2 ft. | 20 ft. | -1 Str | -1 | +1 | +4 | - |
| Medium | 5 ft. | 30 ft. | - | - | - | - | - |
| Large | 10 ft. | 40 ft. | +1 Str | +1 | -1 | -4 | - |
| Huge | 20 ft. | 50 ft. | +2 Str | +2 | -2 | -8 | Sweeping (1) |
| Gargantuan | 40 ft. | 60 ft. | +3 Str | +3 | -3 | -12 | Sweeping (2) |
| Colossal | 80+ ft. | 80 ft. | +4 Str | +4 | -4 | -16 | Sweeping (4) |

### 4.2. Weight Limits by Strength

| Strength | Carrying Capacity | Push/Drag |
| :--- | :--- | :--- |
| -2 | Tiny x8 | Small x8 |
| -1 | Small x2 | Medium x2 |
| 0 | Small x4 | Medium x4 |
| 1 | Small x8 | Medium x8 |
| 2 | Medium x2 | Large x2 |
| 3 | Medium x4 | Large x4 |
| 4 | Medium x8 | Large x8 |
| 5 | Large x2 | Huge x2 |

### 4.3. Weight Categories

| Weight Category | Falling Damage Die | Average Weight |
| :--- | :--- | :--- |
| Fine | - | 1/2 oz. |
| Diminutive | - | 1/4 lb. |
| Tiny | 1d2 | 2 lb. |
| Small | 1d6 | 15 lb. |
| Medium | 1d8 | 120 lb. |
| Large | 1d10 | 1,000 lb. |
| Huge | 2d6 | 8,000 lb. |
| Gargantuan | 2d8 | 64,000 lb. |
| Colossal | 2d10 | 512,000 lb. |

### 4.4. Falling Damage

*   Falling creatures/objects descend 300 ft./round. Take damage on impact; obstacle takes half damage (max of falling object's HP).
*   Damage based on \glossterm{weight category} (see \tref{Weight Categories}). Roll damage die once per 10 ft. fallen (max 300 ft.). No damage for falls < 10 ft.
*   Intentional falls are 10 ft. shorter. Jumping falls measure from 10 ft. below jump start.

## 5. Calculation Guidelines

*   **Stacking Rules:** Modifiers usually stack. Non-stacking bonuses/penalties apply only the largest. Exceptions: same-named abilities, enhancement bonuses, multiple instances of same condition (tracked separately), multiple magical size changes (offset one-for-one), special senses (ranges sum).
*   **Minimum and Maximum Modifiers:** Bonuses with max values apply last. If multiple maxes, use lowest. If value already exceeds max, ignore bonus. Minimums apply after all other modifiers.
*   **Doubling and Halving:** Normal doubling/halving applies. If a single effect doubles something twice, it becomes three times the original value (not four).
*   **Changing Statistics:** Changes take effect immediately. Loss of prerequisites (e.g., Intelligence reduction) results in immediate loss of relevant abilities until within new limits.
*   **Rounding:** 
    *   In general, round down fractional numbers (use `floor`).
    *   For negative numbers, round **away from 0**. For example, `-2.5` becomes `-3`.

## 6. Formula Quick Reference

| Statistic | Formula | Primary Attribute |
| :--- | :--- | :--- |
| **Accuracy** | `floor((Level + Per) / 2)` | Perception |
| **Brawling Acc** | `floor((Level + Str) / 2)` | Strength |
| **Defenses** | `floor(Level / 2) + Attr + Bonus` | (See 2.2) |
| **Mundane Power** | `floor(Level / 2) + Str` | Strength |
| **Magical Power** | `floor(Level / 2) + Wil` | Willpower |
| **Fatigue Tolerance** | `3 + Con` (standard) | Constitution |

> [!IMPORTANT]
> Some class tables include a "Bonus" column equal to `floor(Level / 2)`. This is the same value used in the formulas above; it is not an additional bonus to be added on top of the `half level` component already present in the Power or Defense calculations.

## 7. Character Advancement and Gaining Levels

*   Gaining experience leads to leveling up, granting abilities (see \trefnp{Character Advancement and Gaining Levels}).
*   **Per-Level Increases:** Hit Points, archetype rank, accuracy (may), power (even levels), trained skills bonus (even levels), defenses (even levels).
*   **Irregular Advancements:**
    *   Attributes: +1 to two attributes at 3rd level and every 6 levels thereafter.
    *   Character Rank: Increases at 4th level and every 3 levels thereafter.
    *   Legacy Item: Gained at 6th level, improves every 6 levels thereafter.
*   **GM Discretion:** GM may allow changing character choices (skills, attributes, mystic spheres) upon leveling up, potentially requiring narrative justification or in-game retraining.

### 6.1. Character Rank

*   General indication of overall power, determined by level.
*   Maximum rank in any individual archetype equals character rank.