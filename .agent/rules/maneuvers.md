---
trigger: model_decision
description: When reviewing or designing maneuvers and combat styles
---

# Maneuvers Design Rules

When designing, modifying, or reviewing combat maneuvers, always adhere to the following core philosophy:

## Core Philosophy: Situational Uniqueness

Maneuvers must be distinct and uniquely useful in particular combat circumstances. A player should not be incentivized to use the exact same maneuver every single round.

- **Circumstantial Trade-offs:** Well-designed maneuvers have clear situations where they are _especially good_ to use, and clear situations where they are _especially bad_ (or sub-optimal) to use.
- **No Universal Solutions:** While they do not strictly require an explicit precondition or a cooldown, they must avoid being generically "the best" option in all scenarios.

## Examples of Good Design

_(Reference: [`typescript/src/abilities/combat_styles/brute_force.ts`](../../typescript/src/abilities/combat_styles/brute_force.ts); see also combat styles directory [`typescript/src/abilities/combat_styles/`](../../typescript/src/abilities/combat_styles/))_

- **Ground Slam:**
  - _Good:_ When fighting multiple enemies clustered near you.
  - _Bad:_ When fighting a single isolated enemy.
- **Armorcrusher:**
  - _Good:_ When targeting an enemy whose Fortitude defense is lower than their Armor defense.
  - _Bad:_ When targeting an enemy whose Fortitude defense is higher than their Armor defense.
- **Concussion:**
  - _Good:_ When targeting an enemy whose hit points are low enough that they are injured.
  - _Bad:_ When targeting an enemy whose hit points remain high.

## Implementation Details

- **Maneuver Structure:** Maneuvers are defined as [`ActiveAbility`](../../typescript/src/abilities/active_abilities.ts) objects with `kind: 'maneuver'`.
- **Strike Damage Calculation:** See [`combat-math.md#7-strike-damage-calculation-weapons`](./combat-math.md#7-strike-damage-calculation-weapons) and [`calculateStrikeDamage()`](../../typescript/src/latex/monsters/player_abilities.ts).
- **Weapon Association:** Player maneuvers decouple the weapon (`weapon: undefined`) so characters can wield any equipped weapon; when evaluating damage, infer the weapon from equipped weapons via [`isWeapon()`](../../typescript/src/monsters/equipment.ts).

**Agent Directive:** When creating or evaluating a new maneuver, explicitly ensure there are combat circumstances where it shines and where it falls short.
