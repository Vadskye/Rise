---
trigger: model_decision
description: Definitive reference for all Rise combat-related mathematical formulas and rounding rules.
---

# Rise Combat Mathematics (Definitive Reference)

Use this document to resolve any mathematical discrepancies when calculating character statistics. These formulas take precedence over inferred logic from source code.

## 1. Core Rule: Rounding

- **Default:** Always round **down** (floor) for fractional results.
- **Negative Numbers:** Round **away from 0**.
  - Example: `floor(-2.5) = -3`.

## 2. Accuracy Formulas

| Attack Type           | Formula                           |
| :-------------------- | :-------------------------------- |
| **Standard Accuracy** | `floor((Level + Perception) / 2)` |
| **Brawling Accuracy** | `floor((Level + Strength) / 2)`   |

> [!TIP]
> **Weapon Bonuses:** Accuracy bonuses from items (like the Smallsword's +1) are added **last** to the base result.

## 3. Defense Formulas

Most classes provide a +3 bonus to non-Armor defenses, and a +0 bonus to Armor defense. This makes each defense generally similar in value.

| Defense        | Formula                                                                    |
| :------------- | :------------------------------------------------------------------------- |
| **Armor (AD)** | `floor(Level / 2) + Dexterity + ClassBonus + BodyArmorBonus + ShieldBonus` |
| **Brawn**      | `floor(Level / 2) + Strength + ClassBonus`                                 |
| **Mental**     | `floor(Level / 2) + Willpower + ClassBonus`                                |
| **Reflex**     | `floor(Level / 2) + Dexterity + ClassBonus + ShieldBonus`                  |
| **Fortitude**  | `floor(Level / 2) + Constitution + ClassBonus`                             |

## 4. Power Formulas

| Type              | Formula                        |
| :---------------- | :----------------------------- |
| **Mundane Power** | `floor(Level / 2) + Strength`  |
| **Magical Power** | `floor(Level / 2) + Willpower` |

## 5. Hit Points & Injury

| Statistic      | Formula Component                            |
| :------------- | :------------------------------------------- |
| **Durability** | `Constitution + ArmorBonus + (Level - Rank)` |
| **Base HP**    | `10 + (RankModifier * Durability)`           |

> [!IMPORTANT]
> **Helper Columns:** Many class tables include a **Bonus** column equal to `floor(Level / 2)`. Do **not** add this value on top of the formulas above; it is a reference for the `half-level` component already included in Accuracy, Power, and Defenses.
