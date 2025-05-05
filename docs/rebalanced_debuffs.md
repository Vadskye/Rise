# Overview

The basic value tradeoff between a damaging attack and a non-damaging attack should remain consistent at all levels. To make this true, low-level debuffs need to become stronger. Currently, it's almost never worth an action to impose a -1 penalty - and when it is worth the action, it still doesn't feel good.

## Math

A typical fight against an elite monster takes 5 rounds for a 4-person party. With some leeway for buffs, Recover, movement, and so on, that results in about 15 damaging attacks to defeat the monster, while the monster gets 5 standard actions and 5 elite actions.

Assume a baseline 60% chance to hit with a damaging attack. This means it takes 15 * 0.6 = 9 damaging hits to kill it. If you stun a monster, the hit chance increases to 80% instead of 60%. If it costs two actions on average to stun, the party only needs 9 / 0.8 = 11.25 damaging actions to kill it, which is an improvement if you stun early enough. So stunning an elite monster is worthwhile, but only if you do it early in the fight.

Normally, the party would take 10 attacks from the elite monster during a fight. If you dazzle it on round 1 instead of attacking, 8 of those attacks happen while it is dazzled, so you would negate 1.6 attacks on average assuming they are all single-target attacks. Trading one player action for 1.6 elite monster attacks is a great trade. Missing on round 1 but hitting on round 2 still negates 1.2 elite attacks, so dazzle is fine.

# Specific Changes

## Area Tiers
Tier 0 areas:
* Tiny radius from self
* Small line, 5' wide from self

Tier 1 areas:
* Small cone from self
* Medium line, 5' wide from self
* Small line, 10' wide from self
* Small radius from self
  * This is obviously a larger area than a cone or line, but is also much harder to aim to only hit enemies
* Tiny radius in Short range
  * This should be rare, since it's more flexible than other tier 1 ranges but is too weak for tier 2

Tier 2 areas:
* Medium cone from self
* Large line, 5' wide from self
* Medium line, 10' wide from self
* Medium radius from self
* Tiny radius in Med range
* Small radius in Short range

Tier 3 areas:
* Large cone from self
* Large line, 10' wide from self
* Large radius from self
* Small radius in Med range

Tier 4 areas:
* Huge line, 10' wide from self
* Large line, 15' wide from self
* Medium radius in Med range
* Small radius in Long range
* Tiny radius in Distant range

Tier 5 areas:
* Huge cone from self
* Huge radius from self
* Huge line, 15' wide from self
* Medium radius in Long range
* Small radius in Distant range
* Tiny radius in Long range

Tier 6 areas:
* Large radius in Long range
* Medium radius in Distant range
* Small radius in Extreme range

Tier 7 areas:
* Huge radius in Long range
* Medium radius in Extreme range

## Debuff Tiers

Remove "dazed" and "shaken". New debuff tiers:
* T0.5: Deafened, enraged, -2 to a specific non-Armor defense
  * Instant: push 15', teleport 15'
* T1: dazzled
  * Instant: knockback 15', push 30', teleport 30'
* T1.5: Frightened, difficult terrain (zone only)
  * Instant: prone, repeat
* T2: goaded, slowed, stunned
  * Instant: knockback 30', push 60', teleport 60'
* T2.5: submerged (swimming penalties), treat you as invisible
  * Instant: stop existing briefly / banishment, skip standard action
* T3: Confused, blinded, panicked, vulnerable to all damage
  * Instant: knockback 60', push 90', teleport 90', selfstrike
* T3.5: Immobilized, shapeshift into a form with no free hands
* T4: Asleep, paralyzed

Examples:
* Rank 3
  * dr2 damage at Short range, dazzled if take damage
  * dr3 damage at Short range, dazzled if beat extra defense
  * dr2 damage at Med range, dazzled if beat extra defense
  * dr3 damage at Grasp range, dazzled if take damage
* Rank 4
  * Stunned at Close range
* Rank 5
  * dr4 damage at Grasp range, stunned if take damage
  * dr5 damage at Short range, stunned if lose HP
  * dr4 damage at Med range, stunned if lose HP
  * Stunned at Med range
  * Submerged at Grasp range
* Rank 6
  * dr4 damage in t3 area, stunned if lose HP
  * Stunned at Long range
