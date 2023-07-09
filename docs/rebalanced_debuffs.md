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
* T2.5: submerged (swimming penalties), vulnerable to one damage type
  * Instant: stop existing briefly / banishment, skip standard action
* T3: Confused, blinded, panicked, vulnerable to all damage
  * Instant: knockback 60', push 90', teleport 90', selfstrike
* T3.5: Immobilized, shapeshift into a form with no free hands
* T4: Asleep, paralyzed

## Rank Modifiers

* Both strike-based and non-strike-based:
  * -4 ranks: debuff only applies once the target is out of damage resistance / is below max HP
  * -3 ranks: debuff is removed if the target takes damage
  * -2 ranks: debuff can be removed with movement (fire Dex check)
  * -2 ranks: debuff only applies if you beat an additional defense
  * -2 ranks: target is immune after first successful application until short rest (brief / instant effects)
  * -2 ranks: effect is delayed by one round
  * -1 ranks: target is immune after first successful application until short rest (conditions)
  * -1 ranks: requires adjacent ally or adjacent Medium+ object (not compatible with Close or closer range)
  * -1 ranks: requires target to have already taken damage during the current round
  * -1 ranks: Effect can be destroyed (HP = 3x power)
  * +4 ranks: Add additional debuff of the same rank removed at the same time as existing debuff
* Non-strikes only:
  * -4 ranks: effect is delayed by one round in a predefined area, allowing creatures to escape (can't combine with enemies only)
  * -1 ranks: convert ability to Sustained zone that automatically affects everything in the area (area only, can't combine with enemies only)
  * -1 ranks: convert ability to attunement, no-component standard action with brief cooldown
  * +0 ranks: convert ability to attunement, no-component standard action
  * +0 ranks: convert ability to deep attunement, automatically trigger when target enters area, immune after first attack
  * +1 ranks: convert condition to Sustain (minor)
  * +2 ranks: convert condition to curse
  * +2 ranks: Add sustain (minor) to repeat attack in same area each round (area only)
* Strikes only:

## Standard effects

### Pure debuffs
* Rank 1
  * vs one creature in Med range, all creatures in T2 area, or enemies in T1 area
    * T1 debuff condition
    * T1.5 debuff condition if beat extra defense
    * T2 debuff condition while below max HP / out of DR
    * T2 debuff instant effect if beat extra defense, immune after first application
  * vs one touched creature (must have a free hand, must hit Reflex)
    * T1.5 debuff condition
    * T2 debuff condition if beat extra defense
    * T2.5 debuff condition while below max HP / out of DR
    * T2.5 debuff instant effect if beat extra defense, immune after first application
* Rank 4
  * vs all creatures in T5 area
    * T1 debuff condition
    * T1.5 debuff condition if beat extra defense
    * T2 debuff condition while below max HP / out of DR
    * T2 debuff instant effect if beat extra defense, immune after first application
* Rank 5
  * vs one creature in Med range, all creatures in T2 area, or enemies in T1 area
    * T2 debuff condition
    * T2.5 debuff condition if beat extra defense
    * T3 debuff condition while below max HP / out of DR
    * T3 debuff instant effect if beat extra defense, immune after first application
  * vs one touched creature (must have a free hand, must hit Reflex)
    * T2.5 debuff condition
    * T3 debuff condition if beat extra defense
    * T3.5 debuff condition while below max HP / out of DR
    * T3.5 debuff instant effect if beat extra defense, immune after first application

### Debuff + damage
Notation:
* dX means "standard damage for rank X". A suffix of "h" means "high power scaling", and "l" means "low power scaling". High power scaling is generally stronger, while low power scaling is generally weaker.
* ctX means "condition that you could get as a pure debuff at Med range at rank X"
  * ct-1 = t0.5 condition
  * ct1 = t1 condition
  * ct3 = t1.5 condition
  * ct5 = t2 condition
  * ct7 = t2.5 condition
  * ct9 = t3 condition
  * ct11 = t3.5 condition

* At rank X
  * dX at Grasp range:
    * This trades Short to Grasp range for two condition tiers. It can't buff damage since Ref damage is strong.
    * ct(X+2) debuff condition if lose HP
    * ct(X) debuff condition if beat extra defense
    * ct(X-2) debuff condition if take damage
  * dX-1 at Grasp range:
    * This trades one damage rank for two condition tiers
    * ct(X+4) debuff condition if lose HP
    * ct(X+2) debuff condition if beat extra defense
    * ctX debuff condition if take damage
  * dX at Short range:
    * This gains one damage rank in exchange for shorter range, but not a debuff rank since the damage is so high
    * ctX debuff condition if lose HP
    * ct(X-2) debuff condition if beat extra defense
    * ct(X-4) debuff condition if take damage
  * dX - 1 in Med range or t1 area:
    * ctX debuff condition if lose HP
    * ct(X-2) debuff condition if beat extra defense
    * ct(X-4) debuff condition if take damage
  * dX - 1 at Short range:
    * This trades one damage rank for two condition tiers
    * ct(X+2) debuff condition if lose HP
    * ctX debuff condition if beat extra defense
    * ct(X-2) debuff condition if take damage
  * dX - 2 at Short range:
    * This trades two damage ranks for *three* condition tiers
    * ct(X+3) debuff condition if lose HP
    * ct(X+1) debuff condition if beat extra defense
    * ct(X-1) debuff condition if take damage
  * dX - 2 in Med range or t1 area
    * This trades one damage rank for two condition tiers
    * ctX+2 debuff condition if lose HP
    * ctX debuff condition if beat extra defense
    * ct(X-2) debuff condition if take damage
  * dX - 2 in Long range or t(0.5 * X) area:
    * This trades one damage *and* debuff rank for the range/area. The area may be wrong.
    * ct(X-1) debuff condition if lose HP
    * ct(X-3) debuff condition if beat extra defense
    * ct(X-5) debuff condition if take damage

* Strike-based debuffs
  * Rank 1
    * Melee strike matches "dX at Grasp range"
      * t1.5 condition if lose HP
      * t1 condition if beat extra defense
    * Unrestricted strike matches "dX at Short range"
      * t1 condition if lose HP
  * Rank 3
    * Melee strike matches "dX-1 at Grasp range"
      * t2.5 condition if lose HP
      * t2 condition if beat extra defense
      * t1.5 condition if damaged
    * Unrestricted strike matches "dX-2 at Med range"
      * t2 condition if lose HP
      * t1.5 condition if beat extra defense
      * t1 condition if damaged
  * Rank 5
    * Melee 2x damage strike matches "dX at Grasp range"
      * t2.5 condition if lose HP
      * t2 condition if beat extra defense
      * t1.5 condition if damaged
    * Unrestricted strike almost matches "dX-2 at Med range" but is too weak
      * As melee strike, plus trinket text that is worth about +1 accuracy
  * Rank 7
    * Melee 3x damage strike matches "dX at Grasp range"
      * t3 condition if lose HP
      * t2.5 condition if beat extra defense
      * t2 condition if damaged
    * Unrestricted 2x damage strike matches "dX-2 at Med range"
      * As melee strike
    * Melee 2x damage strike roughly matches "dX-1 at Grasp range"
      * t3.5 condition if lose HP
      * t3 condition if beat extra defense
      * t2.5 condition if damaged

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
