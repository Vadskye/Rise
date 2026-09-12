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

### Core Base Accuracy

| Attack Type           | Formula                           | Usage |
| :-------------------- | :-------------------------------- | :---- |
| **Standard Accuracy** | `floor((Level + Perception) / 2)` | Standard weapon strikes and ranged/area spell attacks |
| **Brawling Accuracy** | `floor((Level + Strength) / 2)`   | Brawling attacks, grabs, shoves, and unarmed touches |

### Total Attack Accuracy

`TotalAccuracy = BaseAccuracy + WeaponAccuracy + AttackModifier + ScalingAccuracyModifier`

- **`BaseAccuracy`**: Standard vs Brawling accuracy as above.
- **`WeaponAccuracy`**: From weapon definition (e.g., Stinger `+1`, Smallsword `+1`, Flail `-1`). Plural weapons (e.g. Claws) double this value when used as a pair.
- **`AttackModifier`**: Any local modifier stated in the ability text (e.g., "with a -2 accuracy penalty" -> `-2`).
- **`ScalingAccuracyModifier`**: Applied when the ability rank is lower than the creature's rank:
  - If ability scales with `accuracy`: `max(0, CreatureRank - AbilityRank)`
  - If ability scales with `double_accuracy`: `2 * max(0, CreatureRank - AbilityRank)`

---

## 4. Defense Formulas

Most classes provide a +3 bonus to non-Armor defenses, and a +0 bonus to Armor defense. This makes each defense generally similar in value.

| Defense        | Formula                                                                    |
| :------------- | :------------------------------------------------------------------------- |
| **Armor (AD)** | `floor(Level / 2) + Dexterity + ClassBonus + BodyArmorBonus + ShieldBonus` |
| **Brawn**      | `floor(Level / 2) + Strength + ClassBonus`                                 |
| **Mental**     | `floor(Level / 2) + Willpower + ClassBonus`                                |
| **Reflex**     | `floor(Level / 2) + Dexterity + ClassBonus`                                |
| **Fortitude**  | `floor(Level / 2) + Constitution + ClassBonus`                             |

---

## 5. Power Formulas

| Type              | Formula                        | Usage |
| :---------------- | :----------------------------- | :---- |
| **Mundane Power** | `floor(Level / 2) + Strength`  | Mundane strikes and physical maneuvers |
| **Magical Power** | `floor(Level / 2) + Willpower` | Spells, magical strikes, and supernatural abilities |

> [!NOTE]
> Monsters also add monster-specific or elite bonuses to Mundane and Magical Power via character sheet calculations.

---

## 6. Weapon Dice Increment Progression

A bonus or penalty to weapon dice increment steps base weapon damage dice along a fixed 12-step progression ladder:

```
1d2 -> 1d3 -> 1d4 -> 1d6 -> 1d8 -> 1d10 -> 2d6 -> 2d8 -> 2d10 -> 4d6 -> 4d8 -> 4d10
```

| Step | Dice Pool | Notes |
| :--- | :-------- | :---- |
| 1    | `1d2`     | Minimum boundary (clamps below with warning) |
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
| 12   | `4d10`    | Maximum boundary (clamps above with warning) |

- **Step Application:** Each `+1` bonus steps base damage dice one step right; each `-1` steps one step left.
- **Timing:** Weapon dice increment adjusts base weapon dice *before* damage multipliers or power modifiers are applied.
- **Monster Level Progression:** Monsters automatically gain `+1` increment at Level 7–12, `+2` at Level 13–18, and `+3` at Level 19+.

---

## 7. Strike Damage Calculation (Weapons)

Used for all weapon-based strikes (maneuvers and strike spells).

### Strike Formula

$$\text{Dice} = (\text{BaseDiceCount} \times \text{WeaponMult} \times \text{GlobalMult})\text{d}(\text{DieSize})$$
$$\text{FlatModifier} = \text{GlobalMult} \times (\lfloor\text{RelevantPower} \times \text{PowerMultiplier}\rfloor + \text{ExtraFlatDamage})$$
$$\text{TotalDamage} = \text{Dice} + \text{FlatModifier}$$

### Variables & Rules

1. **Base Dice & Step Increment:**
   - Look up base weapon dice `{count, size}` (e.g. Horn = `1d6`, Bite = `1d8`).
   - If weapon is plural (e.g., Claws), double base dice count (e.g., `1d4` -> `2d4`).
   - Shift base dice along the Step Ladder (Section 6) by the creature's `weapon_dice_increment`.
2. **Multipliers:**
   - **`WeaponMult`**: Parsed from `"deals [double|triple|...] weapon damage"` (multiplies dice count only; default `1`).
   - **`GlobalMult`**: Parsed from `"deals [double|triple|...] damage"` without the word "weapon" (multiplies *both* dice count and flat modifier; default `1`).
3. **Power Multiplier (`PowerMultiplier`):**
   - Natural weapon: `1.0`
   - Manufactured weapon: `0.5` (exceptions: `giant boulder` = `1.0`, `pick` = `1.0`, `heavy crossbow` = `0.5`)
   - Plural weapon: `0.5`
4. **Relevant Power:**
   - Mundane strike: `MundanePower`
   - Magical strike: `MagicalPower`
   - If text specifies "higher of...": `max(MundanePower, MagicalPower)`
5. **Extra Damage:**
   - Extra flat damage (e.g., `+X extra damage`) is added to the power bonus *before* `GlobalMult`.
   - Extra dice (e.g., `+XdY extra damage`) are appended directly to the dice pool.

---

## 8. Damage Rank (DR) & Spell Damage Calculation

Used for spells, mystic spheres, and non-strike abilities. Expressed as `\damagerank<number>` (or `$dr<N>`) and low-power variants `\damagerank<number>low` (or `$dr<N>l`).

### DR Formula

$$\text{ExcessRank} = \max(0, \text{CreatureRank} - \text{AbilityRank})$$
$$\text{TotalPool} = \text{BaseDice} + (\text{ExcessRank} \times \text{RankScaling}) + \text{PowerScaling}(\text{RelevantPower})$$

- **`RelevantPower`**: `MagicalPower` for magical abilities; `MundanePower` for mundane abilities.

### Standard DR Scaling Table

| DR | Base Dice | Excess Rank Scaling | Power Scaling | Formula Summary |
| :- | :-------- | :------------------ | :------------ | :-------------- |
| **0** | `1d4` | `+1 flat / rank` | `+1 flat per 2 Power` | `1d4 + Excess + floor(Power / 2)` |
| **1** | `1d6` | `+2 flat / rank` | `+1 flat per 2 Power` | `1d6 + (2 * Excess) + floor(Power / 2)` |
| **2** | `1d10` | `+1d6 / rank` | `+1 flat per 2 Power` | `(Excess)d6 + 1d10 + floor(Power / 2)` |
| **3** | `1d8` | `+1d6 / rank` | `+1 flat per 1 Power` | `(Excess)d6 + 1d8 + Power` |
| **4** | `2d6` | `+2d6 / rank` | `+1 flat per 1 Power` | `(2 * Excess + 2)d6 + Power` |
| **5** | `1d6` | `+2d6 / rank` | `+1d6 per 2 Power` | `(2 * Excess + 1 + floor(Power / 2))d6` |
| **6** | `3d6` | `+2d6 / rank` | `+1d6 per 2 Power` | `(2 * Excess + 3 + floor(Power / 2))d6` |
| **7** | `3d8` | `+2d8 / rank` | `+1d8 per 2 Power` | `(2 * Excess + 3 + floor(Power / 2))d8` |
| **8** | `3d10` | `+2d10 / rank` | `+1d10 per 2 Power` | `(2 * Excess + 3 + floor(Power / 2))d10` |
| **9** | `6d6` | `+4d6 / rank` | `+1d6 per 1 Power` | `(4 * Excess + 6 + Power)d6` |
| **10** | `6d8` | `+4d8 / rank` | `+1d8 per 1 Power` | `(4 * Excess + 6 + Power)d8` |

### Low-Power DR Scaling Table (`drl`)

Low-power variants have **zero power scaling** (Power adds nothing). They deal fixed high base dice with rank-up scaling:

| DR | Base Dice | Excess Rank Scaling | Power Scaling |
| :- | :-------- | :------------------ | :------------ |
| **0** | `1d6` | `+2 flat / rank` | None (`+0`) |
| **1** | `1d10` | `+3 flat / rank` | None (`+0`) |
| **2** | `1d8 + 1d6` | `+1d8 / rank` | None (`+0`) |
| **3** | `3d8` | `+1d8 / rank` | None (`+0`) |
| **4** | `5d6` | `+2d6 / rank` | None (`+0`) |
| **5** | `7d6` | `+3d6 / rank` | None (`+0`) |
| **6** | `6d10` | `+3d10 / rank` | None (`+0`) |
| **7** | `9d10` | `+4d10 / rank` | None (`+0`) |
| **8** | `12d10` | `+5d10 / rank` | None (`+0`) |
| **9** | `17d10` | `+6d10 / rank` | None (`+0`) |
| **10** | `22d10` | `+8d10 / rank` | None (`+0`) |

---

## 9. Other Damage & Scaling Placeholders

- **`$d<die>p<power>` (e.g. `$d6p2`)**: `floor(RelevantPower / power)` dice of size `die`.
- **`$damage` / `$fullweapondamage`**: Standard weapon strike damage (`IncrementedDice + floor(RelevantPower * PowerMultiplier)`).
- **Consumable / Flat Damage**: Fixed dice/numbers (e.g., Alchemist's Fire `3d8 damage`) without power scaling.

---

## 10. Hit Points & Injury

| Statistic      | Formula Component                            |
| :------------- | :------------------------------------------- |
| **Durability** | `Constitution + ArmorBonus + (Level - Rank)` |
| **Base HP**    | `10 + (RankModifier * Durability)`           |

> [!IMPORTANT]
> **Helper Columns:** Many class tables include a **Bonus** column equal to `floor(Level / 2)`. Do **not** add this value on top of the formulas above; it is a reference for the `half-level` component already included in Accuracy, Power, and Defenses.

---

## 11. 3D Distance & Movement

`Distance = max(HorizontalDistance, VerticalDistance)`

- Used for both 3D range and 3D movement costs (flight, jumping).
- Never calculate Euclidean hypotenuse for vertical distance.
- Horizontal diagonals still use alternating 5-10-5.


