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

_(Reference: `typescript/src/abilities/combat_styles/brute_force.ts`)_

- **Ground Slam:**
  - _Good:_ When fighting multiple enemies clustered near you.
  - _Bad:_ When fighting a single isolated enemy.
- **Armorcrusher:**
  - _Good:_ When targeting an enemy whose Fortitude defense is lower than their Armor defense.
  - _Bad:_ When targeting an enemy whose Fortitude defense is higher than their Armor defense.

**Agent Directive:** When creating or evaluating a new maneuver, explicitly ensure there are combat circumstances where it shines and where it falls short.
