**Pure Damage Dice**

# The Problem
Flat power modifiers and damage dice both need to increase with level, and the incremental improvements need to feel noticeable, so you can't say things like "you gain half a damage this level". Because there are two separate systems that each need to scale in increments no smaller than one or two, it's basically impossible to not end up with 50-100 damage hits by level 20. This requires characters that have multiple hundreds of hp/dr in damage absorption, so the numbers get Very Big. If you scaled either damage dice or flat damage, but not both, you could cut damage numbers in half and every improvement would still feel subjectively meaningful

# Early Math

Assume that a minimum reasonable level 1 attack deals 1d6 damage. That represents a basic weapon with no Strength. With sufficient investment, a character could plausibly double that to 2d6. Assume we're trying to keep the "double every 6 levels" system.

Note that "invested" would mean "including class features and possibly feats", not just from maximizing Str/Wil. Str/Wil alone should increase damage by about 50-60%, but shouldn't reach all the way to the "fully invested" doubling.

## Damage By Level

* L1: 1d6 base / 2d6 invested
* L7: 2d6 base / 4d6 invested
* L13: 4d6 base / 8d6 invested
* L19: 8d6 base / 16d6 invested

Alternately:
* L1, R1: 3.5 base / 7 invested
* L4, R2: 5 base / 10 invested
* L7, R3: 7 base / 14 invested
* L10, R4: 10 base / 20 invested
* L13, R5: 14 base / 28 invested
* L16, R6: 20 base / 40 invested
* L19, R7: 28 base / 56 invested

## Boss HP

A boss needs to survive at least 5 rounds of combat with its attackers. Assume its attackers have a 40% hit chance, so they deal 50% of their base damage (with glance). For a 4 person party, a boss needs to survive (4 people * 5 rounds * 0.5 hpr) = 10x a single character's damage. For this calculation, wildly assume that the party has to spend some of their time dealing with the boss's actions, and that means we only consider the damage of a baseline party member instead of a maximally invested party member.

* L1: 35 HP
* L7: 70 HP
* L13: 140 HP
* L19: 280 HP

## Perception Scaling

Assume a "base" damage investment. How much does maximizing Perception help? Intuitively, we want 6 Per to feel about as good as 6 Str or 6 Con, which is a roughly 50-70% damage or survivability boost. We don't need to look at damage numbers to do this math.

0 Per -> 4 Per increases hit rate from 60% to 80%, so 33% more damage.
0 Per -> 6 Per increases hit rate from 60% to 90%, so 50% more damage.

On more difficult enemies with a base hit rate of 40%:
0 Per -> 4 Per increases 40% to 60%, so 50% more damage.
0 Per -> 6 Per increases 40% to 70%, so 75% more damage.

This is within acceptable bounds, and enforces the idea that min Str vs max Str should be about a 50% damage boost and not double damage.

## Single-Target Spell Scaling

Assume these numbers represent simple pure damage Medium range spells. This is the maximum value you can reasonably get for the baseline value of a spell.

* R1: 1d6 damage, +1d per rank
  * At R3, 1d10 damage
  * At R5, 2d8 (9) damage
* R2: no damage buff possible without sacrifice
* R3: 2d6 damage, +1d4 per rank
  * At R5, 2d6+2d4 (12) damage
* R4: 2d8 damage, +1d8 per rank
  * At R5, 3d8 (13.5) damage
* R5: 4d6 (14) damage, +1d10 per rank
  * At R7, 4d6+2d10 (23) damage
* R6: 4d8 (18) damage, +1d10 per rank
  * At R7, 4d8+2d10 (27) damage
* R7: 8d6 (28) damage

## Damage Per Rank Tradeoffs

In the old system, +2r for damage gave +1d. +1d is about a 25% damage increase from damage dice alone. For those spells, damage dice would generally contribute more than half of your total damage, so call that a 15% damage increase for +2r, or maybe a 20% increase if your power was unreasonably low.

Put another way, +2r for damage gave a 50% increase in the damage *difference* between rank X and rank X+2, or a 25% increase after taking into account the effect of power.

# Nonlinear Power Scaling

Your power is on a (level + str/wil)-based track. Power doubles every 6 levels on that track. Spells deal damage based on your power. You should gain other flat damage modifiers over time from other sources, like class features and feats, so 6 Wil doesn't fully double your damage.

## Power per Level

Level: Power 
1:  1 
2:  2 
3:  2 
4:  3 
5:  3 
6:  4 
7:  4 
8:  5 
9:  6 
10: 7 
11: 8 
12: 9 
13: 10
14: 12
15: 14
16: 16
17: 18
18: 20
19: 22
20: 24
21: 26
+3 per point beyond 21.

## Power per Rank

* R1: base 1, max 3
* R2: base 3, max 5
* R3: base 4, max 8
* R4: base 7, max 14
* R5: base 10, max 22
* R6: base 16, max 29
* R7: base 22, max 41

## Single-Target Spell Scaling

* R1: 1d6 damage, +1d per 2 power
  * 1d6 (3.5) base, 1d8 (4.5) max
  * At R3: 1d10 (5.5) base, 1d8+1d6 (8) max
* R3: 1d6 damage, +1d6 per 4 power
  * 2d6 (7) base, 3d6 (10.5) max
  * At R5: 3d6 (10.5) base, 6d6 (21) max
  * At R7: 6d6 (28) base, 11d6 (38.5) max
* R5: 2d6 base, +1d6 per 4 power

## Problems

+1d6 per 4 power is the baseline scaling for all spells, and it's kind of boring / slow. That reduces differentiation between spells, and is cumbersome. What would AOE spells be? 1d6 per 6 power?

# Linear Power Scaling

Your power is equal to half your level + full Str/Wil. At low levels, power for high investment characters is a large multiple of power for low investment characters. However, this can be solved by providing abilities with weak power scaling at low levels, and strong power scaling at high levels.

## Power per Rank
* R1: base 0, max 4
* R2: base 2, max 6
* R3: base 3, max 8
* R4: base 5, max 10
* R5: base 6, max 12
* R6: base 8, max 14
* R7: base 9, max 16

## Single-Target Spell Scaling

* R1: 1d6 damage, +1d per 2 power (0.5x power)
  * 1d6 (3.5) base, 1d10 (5.5) max, +57% investment
  * At R3: 1d8 (4.5) base, 1d8+1d6 (8) max
* R3: 1d10 damage, +1d per 2 power (0.5x power)
  * 2d6 (7) base, 3d6 (10.5) max, +50% investment
* R3: 1d8 damage, +1d6 per 4 power (0.9x power)
  * 1d8 (4.5, 7.1 partial) base, 1d8+2d6 (11.5) max, +61% investment counting partial
  * At R5: 1d8+1d6 (8, 9.7 partial) base, 1d8+3d6 (15) max, +54% investment counting partial
* R4: 1d8 + 1d6 damage per 3 power (1.2x power)
  * 1d8+1d6 (8, 10.3 partial) base, 1d8+3d6 (15, 16.2 partial) max, +57% investment counting partial
* R5: 1d8 damage, +1d8 per 3 power (1.5x power)
  * 3d8 (13.5) base, 5d8 (22.5) max, +66% investment
  * At R7: 4d8 (18) base, 6d8 (27) max), +50% investment
* R5: 1d10 damage, +1d10 per 4 power (1.4x power)
  * 2d10 (11, 13.8 partial) base, 4d10 (22) max, +59% investment counting partial
  * At R7: 3d10 (16.5) base, 5d10 (27.5) max, +67% investment
* R5: 2d6 damage, +1d6 per 3 power (1.2x power)
  * 4d6 (14) base, 6d6 (21) max, +50% investment
  * At R7: 5d6 (17.5) base, 7d6 (24.5) max, +40% investment
* R5: 1d10 damage per 3 power (1.8x power)
  * 2d10 (11) base, 4d10 (22) max, +100% investment
* R7: 4d6 damage, +1d6 per 2 power (1.8x power)
  * 8d6 (28) base, 12d6 (42) max, +50% investment
* R7: 1d10 damage per 2 power (2.8x power)
  * 4d10 (22) base, 8d10 (44) max, +100% investment

<!-- * R3: 1d6 damage, +1d6 per 3 power -->
<!--   * 2d6 (7) base, 3d6 (10.5) max, +83% investment counting partial progress -->
<!--   * At R5: 3d6 (10.5) base, 5d6 (17.5) max -->
<!-- * R3: 1d6 damage, +1d per power -->
<!--   * 2d6 (7) base, 1d10+2d6 (12.5) max, +78% investment -->
<!-- * R3: 1d10 damage, +1d6 per 4 power -->
<!--   * 1d10 (5.5, 8.1 partial) base, 1d10+2d6 (12.5) max, +54% investment counting partial -->
<!--   * At R5: 1d10+1d6 (9, 10.7 partial) base, 1d10+3d6 (16) max, +50% investment counting partial -->
<!-- * R5: 1d8 damage per 2 power -->
<!--   * 3d8 (13.5) base, 6d8 (27) max -->
<!--   * At R7: 4d8 (18) base, 8d8 (36) max -->
<!-- * R7: 1d10 damage, +1d10 per 2 power -->
<!--   * 5d10 (27.5) base, 9d10 (49.5) max, +80% investment -->
<!-- * R5: 1d8 damage per 2 power -->
<!--   * 3d8 (13.5) base, 6d8 (27) max, +100% investment -->
<!-- * R4: 1d10 damage per 4 power -->
<!--   * 1d10 (5.5, 6.8 partial) base, 2d10 (11, 13.8 partial) max, +100% investment counting partial -->

## Autocalculated Single-Target Damage Scaling

* R1
  * 1d6 + 1d per 2 power
* R2
  * Low scaling
    * 1d8 + 1d per 2 power
  * High scaling
    * 1d4 + d4 per 3 power
    * 1d6 + d6 per 4 power (strong)
* R3
  * 1d6 + d6 per 4 power (weak)
  * 1d8 + d6 per 4 power (strong)
  * High scaling
    * 1d4 + d8 per 4 power
* R4
  * 1d8 + d8 per 4 power
  * Low scaling
    * 1d10 + d6 per 4 power
  * High scaling
    * 1d6 + d6 per 3 power
    * d8 per 3 power
    * 1d8 + d6 per 3 power (strong)
* R5
  * 2d6 + d6 per 3 power
  * 2d6 + d8 per 4 power
  * 1d6 + d8 per 3 power
  * 1d10 + d8 per 1 power (strong)
  * Low scaling
    * 2d8 + d6 per 4 power
  * High scaling
    * d6 per 2 power
    * d10 per 3 power
* R6
  * 1d10 + d6 per 2 power
  * 1d10 + d10 per 3 power
  * 2d6 + d8 per 3 power (weak)
  * 2d6 + d6 per 2 power (strong)
  * d6 + d10 per 3 power
  * 2d8 + d8 per 3 power
  * 1d8 + d10 per 3 power
  * Low scaling
    * 4d6 + d6 per 4 power
    * 3d6 + d6 per 3 power
    * 3d6 + d10 per 4 power
    * 3d8 + d6 per 4 power
    * 2d8 + d10 per 4 power
    * 2d10 + d6 per 3 power
    * 2d10 + d10 per 4 power (strong)
  * High scaling
    * d6 and d8 per 4 power (weak)
    * d6 and d10 per 4 power
    * d8 per 2 power
* R7
  * 4d6 + d6 per 2 power (strong)
  * 3d6 + d10 per 3 power
  * 2d6 + d8 per 2 power
  * 2d8 + d8 per 2 power (strong)
  * 2d10 + d10 per 3 power
  * Low scaling
    * 6d6 + d6 per 4 power
    * 5d6 + d6 per 3 power
    * 5d6 + d8 per 4 power
    * 4d6 + d8 per 3 power
    * 4d8 + d8 per 4 power
    * 3d8 + d6 per 2 power
    * 3d8 + d8 per 3 power
    * 4d10 + d6 per 4 power
    * 3d10 + d8 per 3 power
    * 3d10 + d10 per 4 power
  * High scaling
    * 1d8 + d8 per 3 power (weak)
    * 1d10 + d8 per 2 power (weak)
    * d10 per 2 power

## Scaling By Rank Equations

* R1: x + 0.5y = 3.5, x + 4.5y = 5.6
  * 3.2 base damage, 0.53 damage per power
* R2: x + 2y = 5, x + 7y = 8
  * 3.8 base damage, 0.6 damage per power
* R3: x + 3.5y = 7, x + 8.5y = 11.2
  * 4.1 base damage, 0.84 damage per power
* R4: x + 5y = 10, x + 11y = 16
  * 5 base damage, 1 damage per power
* R5: x + 6.5y = 14, x + 12.5y = 22.4
  * 5 base damage, 1.4 damage per power
* R6: x + 8.0y = 20, x + 15y = 32
  * 6.3 base damage, 1.7 damage per power
* R7: x + 9.5y = 28, x + 17.5y = 44.8
  * 8 base damage, 2.1 damage per power

## Lower Rank Spell Scaling

Expected damage at rank 3 (3.5/8.3 power)
* R1: 5/7.35 (71% / 65%)
* R2: 5.9/8.78 (84% / 78%)
* R3: 7/11.2

Expected damage at rank 4 (5/11 power):
* R2: 6.8/10.4 (68% damage / 65% damage)
* R3: 8.3/13.3 (83% damage / 83% damage)
* R4: 10/16

Expected damage at rank 6 (8/15 power):
* R3: 10.8/16.7 (54% / 52%)
* R4: 13/20 (65% damage / 63%)
* R5: 16.2/26 (81% damage / 81%)
* R6: 20/32

So area spells should use a damage progression from about two ranks lower. Very large areas might go three ranks lower, and very small areas might go one rank lower.

In general, if you spend 2 ranks on non-damage upgrades (like range), you should use a strongish scaling 1 rank lower.
