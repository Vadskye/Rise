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
- **Code Implementation:** [`Creature.calculateRank()`](../../typescript/src/character_sheet/creature.ts) calculates character and monster rank dynamically from level.

## 3. Accuracy Formulas

### Core Base Accuracy

| Attack Type           | Formula                           | Usage |
| :-------------------- | :-------------------------------- | :---- |
| **Standard Accuracy** | `floor((Level + Perception) / 2)` | Standard weapon strikes and ranged/area spell attacks |
| **Brawling Accuracy** | `floor((Level + Strength) / 2)`   | Brawling attacks, grabs, shoves, and unarmed touches |

- **Code Implementation:** [`Creature.accuracy`](../../typescript/src/character_sheet/creature.ts) and [`Creature.brawling_accuracy`](../../typescript/src/character_sheet/creature.ts), calculated in [`sheet_worker.ts`](../../typescript/src/character_sheet/sheet_worker.ts).

### Total Attack Accuracy

`TotalAccuracy = BaseAccuracy + WeaponAccuracy + AttackModifier + ScalingAccuracyModifier`

- **`BaseAccuracy`**: Standard vs Brawling accuracy as above.
- **`WeaponAccuracy`**: Looked up via [`getWeaponAccuracy()`](../../typescript/src/monsters/weapons.ts) from the weapon definition (e.g., Stinger `+1`, Smallsword `+1`, Flail `-1`). Plural weapons (e.g. Claws) double this value when used as a pair.
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

- **Code Implementation:** Defenses and their calculation breakdowns are exposed via [`Creature.armor_defense`](../../typescript/src/character_sheet/creature.ts), `brawn`, `fortitude`, `mental`, `reflex`, and [`getCommonExplanations()`](../../typescript/src/character_sheet/creature.ts).

---

## 5. Power Formulas

| Type              | Formula                        | Usage |
| :---------------- | :----------------------------- | :---- |
| **Mundane Power** | `floor(Level / 2) + Strength`  | Mundane strikes and physical maneuvers |
| **Magical Power** | `floor(Level / 2) + Willpower` | Spells, magical strikes, and supernatural abilities |

- **Code Implementation:** Properties `mundane_power` and `magical_power` on [`Creature`](../../typescript/src/character_sheet/creature.ts). Method [`Creature.getRelevantPower(isMagical)`](../../typescript/src/character_sheet/creature.ts) selects between mundane and magical power.
- **Attribute Scaling:** Player characters scale primary attributes by `floor((Level + 3) / 6)` via [`setCharacterAttributeScaling()`](../../typescript/src/character_sheet/creature.ts).

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
- **Code Implementation:** [`getWeaponDamageDice(weapon, diceIncrement)`](../../typescript/src/monsters/weapons.ts) maps weapons and increments to the stepped dice pool.

---

## 7. Strike Damage Calculation (Weapons)

Used for all weapon-based strikes (maneuvers and strike spells).
- **Code Implementation:** [`calculateStrikeDamage(creature, ability, isMagical)`](../../typescript/src/latex/monsters/player_abilities.ts) in `typescript/src/latex/monsters/player_abilities.ts`.
- **Power Multiplier Lookup:** [`getWeaponPowerMultiplier(weapon)`](../../typescript/src/monsters/weapons.ts) in `typescript/src/monsters/weapons.ts`.
- **Rank Multipliers:** Maneuvers that scale weapon damage by rank (e.g. Fighter *Broadsword*) use [`getWeaponMultByRank(rank)`](../../typescript/src/abilities/combat_styles.ts) in `typescript/src/abilities/combat_styles.ts`.

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
   - Natural weapon: `1.0` (unarmed, bite, horn, claws)
   - Manufactured weapon: `0.5` (exceptions: `giant boulder` = `1.0`, `pick` = `1.0`, `heavy crossbow` = `0.5`)
   - Plural weapon: `0.5`
   - *Note on Manufactured Weapons:* Because manufactured weapons use `0.5`, characters only add half of their Mundane Power to weapon strike flat damage (`floor(RelevantPower * 0.5)`).
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
- **Code Implementation:** [`calculateDamage(creature, ability, damageRank, lowPowerScaling)`](../../typescript/src/core_mechanics/damage_calculation.ts) in `typescript/src/core_mechanics/damage_calculation.ts`.
- **Scaling Tables & Scaled Pools:** [`DamageScaling`](../../typescript/src/core_mechanics/damage_scaling.ts) in `typescript/src/core_mechanics/damage_scaling.ts` returning a [`DicePool`](../../typescript/src/core_mechanics/dice_pool.ts).

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

---

## 12. Default / Fallback Attacks (Combat Simulation)

When a creature has no specific active attack or needs a baseline attack in the simulator, [`getDefaultAttack(attacker)`](../../typescript/src/combat/combat_turn.ts) provides a level- and rank-scaled attack against Armor defense:

$$\text{Power} = \max(\text{MundanePower}, \text{MagicalPower})$$
$$\text{Rank} = \lfloor(\text{Level} + 2) / 3\rfloor + \text{RankOffset}$$
$$\text{HalfPower} = \lfloor\text{Power} / 2\rfloor$$

| Rank | Default Damage Pool |
| :--- | :------------------ |
| **-1** | `HalfPower` (flat) |
| **0**  | `1d4 + HalfPower`  |
| **1**  | `1d6 + HalfPower`  |
| **2**  | `1d10 + HalfPower` |
| **3**  | `1d8 + Power`      |
| **4**  | `(HalfPower)d6`    |
| **5**  | `(HalfPower + 1)d6`|
| **6**  | `(HalfPower + 1)d8`|
| **7**  | `(HalfPower + 1)d10`|

Elite creatures additionally receive [`getDefaultEliteAttack(attacker)`](../../typescript/src/combat/combat_turn.ts), which uses RankOffset `-2` with `areaRank: 2` (Standard Elite Area Sweep).

---

## 13. Player vs. Monster Ability Architecture & Weapon Inference

A key architectural difference between monster abilities and player character abilities in the codebase:

1. **Monster Abilities:**
   - Pre-baked with hardcoded weapons (`weapon: 'bite'`) and explicit attack definitions (`attack: { hit, targeting }`).
   - Reformatting via [`reformatAsMonsterAbility()`](../../typescript/src/latex/monsters/player_abilities.ts) expects `ability.weapon` to already be set for any strike ability.
2. **Player Character Maneuvers:**
   - Maneuvers learned by player characters (e.g., *Steady Slam*, *Heartpiercer*, *Quickfire*) are decoupled from weapons and defined with `weapon: undefined`.
   - Players choose which wielded weapon to perform the strike with.
3. **Weapon Inference Rule:**
   - When evaluating, parsing ([`parseAttackEffect()`](../../typescript/src/combat/parse_attack_effect.ts)), or explaining ([`explainCreatureAttacks()`](../../typescript/src/scripts/explain_monster.ts)) player strikes, the weapon must be inferred from the character's equipment:
     1. Check manufactured weapons in [`creature.getEquipment()`](../../typescript/src/character_sheet/creature.ts) filtered by [`isWeapon()`](../../typescript/src/monsters/equipment.ts).
     2. If no equipped weapons exist (e.g. Monks), check active natural weapon abilities (e.g. `fists` from `addWeaponMult('fists')`).
   - **Pitfall:** Calling [`calculateStrikeDamage()`](../../typescript/src/latex/monsters/player_abilities.ts) or [`reformatAsMonsterAbility()`](../../typescript/src/latex/monsters/player_abilities.ts) on a strike without assigning this inferred weapon will fail with `Strike ability has no weapon` or evaluate to an empty damage pool (`DicePool.empty()`).

---

## 14. Codebase Implementation & Diagnostic Tools Map

| Subsystem | Primary Implementation File(s) | Description |
| :--- | :--- | :--- |
| **Creature State & Sheet** | [`typescript/src/character_sheet/creature.ts`](../../typescript/src/character_sheet/creature.ts)<br>[`typescript/src/character_sheet/sheet_worker.ts`](../../typescript/src/character_sheet/sheet_worker.ts) | Stats, defenses, powers, listeners, attribute scaling |
| **Stock Characters** | [`typescript/src/character_sheet/stock_characters/`](../../typescript/src/character_sheet/stock_characters/) | Standard builds per class & level (1–21) |
| **Weapons & Equipment** | [`typescript/src/monsters/weapons.ts`](../../typescript/src/monsters/weapons.ts)<br>[`typescript/src/monsters/equipment.ts`](../../typescript/src/monsters/equipment.ts) | Damage dice, power multipliers, accuracy, tags, equipment checking |
| **Strike Damage** | [`typescript/src/latex/monsters/player_abilities.ts`](../../typescript/src/latex/monsters/player_abilities.ts) | `calculateStrikeDamage()`, `reformatAsMonsterAbility()` |
| **Spell / DR Damage** | [`typescript/src/core_mechanics/damage_calculation.ts`](../../typescript/src/core_mechanics/damage_calculation.ts)<br>[`typescript/src/core_mechanics/damage_scaling.ts`](../../typescript/src/core_mechanics/damage_scaling.ts)<br>[`typescript/src/core_mechanics/dice_pool.ts`](../../typescript/src/core_mechanics/dice_pool.ts) | Damage Rank calculation, scaling tables, dice math |
| **Combat Turn & Simulator** | [`typescript/src/combat/combat_turn.ts`](../../typescript/src/combat/combat_turn.ts)<br>[`typescript/src/combat/combat_scenario.ts`](../../typescript/src/combat/combat_scenario.ts)<br>[`typescript/src/combat/parse_attack_effect.ts`](../../typescript/src/combat/parse_attack_effect.ts) | Combat loop, attack scoring, hit degree, debuffs, default attacks |
| **Character Explainer CLI** | [`typescript/src/scripts/explain_stock_character.ts`](../../typescript/src/scripts/explain_stock_character.ts) | CLI to inspect stock character stats, defenses, accuracy & attack damage |
| **Monster Explainer CLI** | [`typescript/src/scripts/explain_monster.ts`](../../typescript/src/scripts/explain_monster.ts) | CLI to inspect monster stats, defenses, accuracy & attack damage |
| **Combat Debug CLI** | [`typescript/src/scripts/debug_stock_combat.ts`](../../typescript/src/scripts/debug_stock_combat.ts) | CLI to sample damage rolls across stock characters |


