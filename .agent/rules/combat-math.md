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

## 2. Rank Formula

`ActiveAbilityRank = min(7, floor((Level + 2) / 3))`

Rank determines the power level of abilities a creature can use (rank 1 at level 1, rank 2 at level 4, etc., up to rank 7 at level 19+).

## 3. Accuracy Formulas

| Attack Type           | Formula                           |
| :-------------------- | :-------------------------------- |
| **Standard Accuracy** | `floor((Level + Perception) / 2)` |
| **Brawling Accuracy** | `floor((Level + Strength) / 2)`   |

> [!TIP]
> **Weapon Bonuses:** Accuracy bonuses from items (like the Smallsword's +1) are added **last** to the base result.

## 4. Defense Formulas

Most classes provide a +3 bonus to non-Armor defenses, and a +0 bonus to Armor defense. This makes each defense generally similar in value.

| Defense        | Formula                                                                    |
| :------------- | :------------------------------------------------------------------------- |
| **Armor (AD)** | `floor(Level / 2) + Dexterity + ClassBonus + BodyArmorBonus + ShieldBonus` |
| **Brawn**      | `floor(Level / 2) + Strength + ClassBonus`                                 |
| **Mental**     | `floor(Level / 2) + Willpower + ClassBonus`                                |
| **Reflex**     | `floor(Level / 2) + Dexterity + ClassBonus`                  |
| **Fortitude**  | `floor(Level / 2) + Constitution + ClassBonus`                             |

## 5. Power Formulas

| Type              | Formula                        |
| :---------------- | :----------------------------- |
| **Mundane Power** | `floor(Level / 2) + Strength`  |
| **Magical Power** | `floor(Level / 2) + Willpower` |

## 6. Hit Points & Injury

| Statistic      | Formula Component                            |
| :------------- | :------------------------------------------- |
| **Durability** | `Constitution + ArmorBonus + (Level - Rank)` |
| **Base HP**    | `10 + (RankModifier * Durability)`           |

> [!IMPORTANT]
> **Helper Columns:** Many class tables include a **Bonus** column equal to `floor(Level / 2)`. Do **not** add this value on top of the formulas above; it is a reference for the `half-level` component already included in Accuracy, Power, and Defenses.

## 7. 3D Distance & Movement

`Distance = max(HorizontalDistance, VerticalDistance)`

- Used for both 3D range and 3D movement costs (flight, jumping).
- Never calculate Euclidean hypotenuse for vertical distance.
- Horizontal diagonals still use alternating 5-10-5.

## 8. Weapon Dice Increment Progression

A bonus or penalty to weapon dice increment increases or reduces the base weapon damage dice along a fixed 12-step progression ladder:

```
1d2 -> 1d3 -> 1d4 -> 1d6 -> 1d8 -> 1d10 -> 2d6 -> 2d8 -> 2d10 -> 4d6 -> 4d8 -> 4d10
```

| Step | Dice Pool | Notes |
| :--- | :-------- | :---- |
| 1    | `1d2`     | Minimum boundary |
| 2    | `1d3`     | |
| 3    | `1d4`     | |
| 4    | `1d6`     | |
| 5    | `1d8`     | |
| 6    | `1d10`    | |
| 7    | `2d6`     | |
| 8    | `2d8`     | |
| 9    | `2d10`    | |
| 10   | `4d6`     | |
| 11   | `4d8`     | |
| 12   | `4d10`    | Maximum boundary |

- **Step Application:** Each +1 bonus increases weapon damage dice by one step to the right. Each -1 penalty reduces weapon damage dice by one step to the left.
- **Timing:** Weapon dice increment adjusts the base weapon damage dice *before* any damage multipliers or power modifiers are applied.
- **Monster Advancement:** Monsters automatically gain a +1 bonus to their weapon dice increment at 7th level, 13th level, and 19th level (+1 at level 7–12, +2 at level 13–18, +3 at level 19+).
- **Boundaries:** Progressions beyond 4d10 or below 1d2 clamp to the respective boundary with a warning.


