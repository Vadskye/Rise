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

# Linear Power Scaling

Your power is equal to half your level + full Str/Wil. At low levels, power for high investment characters is a large multiple of power for low investment characters. However, this can be solved by providing abilities with weak power scaling at low levels, and strong power scaling at high levels.

## Power per Rank
* R1: base 0.5, max 4.5
* R2: base 2, max 7
* R3: base 3.5, max 8.5
* R4: base 5, max 11
* R5: base 6.5, max 12.5
* R6: base 8, max 15
* R7: base 9.5, max 17.5

## Single-Target Damage Scaling

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
`x` is base damage, `y` is damage per power (dpp), and the right number is equal to the ideal damage target.
Note that, as a rough approximation, dX+3 deals approximately twice the damage of dX.
Each subsequent damage rank gives about 40% more damage scaling from power.

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

## Accuracy-Modified Damage Targets

* R1: 3.5/5.6 base, 2.1/3.4 modified
* R2: 5/8 base,     3/4.8 modified
* R3: 7/11.2 base,  4.2/6.7 modified
* R4: 10/16 base,   6/9.6 modified
* R5: 14/22.4 base, 8.4/13.4 modified
* R6: 20/32 base,   12/19.2 modified
* R7: 28/44.8 base, 16.8/26.9 modified

## Lower Rank Spell Scaling

Expected damage at rank 3 (3.5/8.3 power)
* R1: 5/7.35 (71% / 65%)
* R2: 5.9/8.78 (84% / 78%)
* R3: 7/11.2

Expected damage at rank 4 (5/11 power):
* R2: 6.8/10.4 (68% damage / 65% damage)
* R3: 8.3/13.3 (83% damage / 83% damage)
* R4: 10/16

Expected damage at rank 5 (6.5/12.5 power):
* R4: 11.5/17.5 (82% / 78%)

Expected damage at rank 6 (8/15 power):
* R3: 10.8/16.7 (54% / 52%)
* R4: 13/20 (65% damage / 63%)
* R5: 16.2/26 (81% damage / 81%)
* R6: 20/32

Expected damage at rank 7 (9.5/17.5 power):
* R5: 18.3/29.5 (65% / 66%)
* R6: 22.5/36 (80% / 80%)

So area spells should use a damage progression from about two ranks lower. Very large areas might go three ranks lower, and very small areas might go one rank lower.

In general, if you spend 2 ranks on non-damage upgrades (like range), you should use a strongish scaling 1 rank lower.

## Higher Rank Damage Scaling

At rank 2, base damage is 5/8, power is 2/7:
* Using dr3: 4.5 + 0.875dpp = 6.3/10.6 (126%/133%)
* Using dr4: 4.5 + 1.125dpp = 6.8/12.4 (136%/155%)
* Using dr5: 7.0 + 1.167dpp = 9.3/15.2 (186%/190%)

At rank 5, base damage is 14/22.4, power is 6.5/12.5:
* Using dr6: 5.5 + 1.833dpp = 17.4/28.4 (124%/127%)
* Using dr7: 11  + 1.833dpp = 22.9/33.9 (164%/151%)
* Using dr8: 22  + 1.833dpp = 33.9/44.9 (242%/200%)
* Using dr8h: 11 + 2.750dpp = 28.9/45.4 (206%/202%)

At rank 7, base damage is 28/44.8, power is 9.5/17.5:
* Using dr8: 22  + 1.833dpp = 39.0/55.8 (139%/126%)
* Using dr9: 22  + 2.750dpp = 48.1/70.1 (172%/157%)

## Weapon Damage Scaling

Base melee weapon damage at each rank:

* R1: 1d6/1d10 (3.5/5.5)
* R2: 1d8/2d6 (4.5/7)
* R3: 1d8/1d8+1d6 (5.5/8)
* R4: 1d10/1d10+1d6 (5.5/9)
* R5: 2d6/3d6 (7/10.5)
* R6: 1d8+1d6/1d8+2d6 (8/11.5)
* R7: 1d8+1d6/1d10+2d6 (9/12.5)

Weapon damage is just a R1 single-target damage spell: 3.2 + 0.53dpp.

actual damage at each rank (missing damage) (percent of correct damage):
* R1: 3.5/5.6 (0/0) (100%/100%)
* R2: 4.3/6.9 (0.7/1.1) (86%/86%)
* R3: 5.0/7.7 (2/3.5) (71%/69%)
* R4: 5.9/9.0 (4.1/7) (59%/56%)
* R5: 6.6/9.8 (7.4/12.6) (47%/44%)
* R6: 7.4/11.2 (12.6/20.8) (37%/35%)
* R7: 8.2/12.5 (19.8/32.3) (29%/28%)

Observation: In general, you can offset the damage difference with +1 accuracy per rank above rank 1, at least at first.

## Standard Maneuvers

For debuffs, see "Rebalanced Debuffs"

* R1
  * Damage
    * Glancing blow on miss if beat extra defense
    * Strike with 1d4 +1d/r extra damage, 1 fatigue
    * Strike, double weapon damage on crit, minor downside?
* R3
  * Damage
    * Strike against Fort/Ref
    * dr3 vs all adjacent
    * Strike in small cone
    * Thrown strike vs 3 in Small radius in Short range
    * Strike, deal same damage next round if beat extra defense (143%/138%)
    * Strike, 1d6 extra damage per 4 power (minimum 1d6) if beat extra defense
      * At R4, 1d6/2d6 extra damage and +1 accuracy from scaling: (6.6/11.2) vs (6/9.6) post-accuracy
      * At R7, 2d6/4d6 extra damage and +4 accuracy from scaling: (15.2/26.5) vs (16.8/26.9) post-accuracy
    * Move with a check, dr2h vs all adjacent if check was high enough
    * Strike with extra weapon tag
    * Strike, -2 accuracy, double weapon damage
    * Strike, double weapon damage if beat extra defense
* R5
  * Damage
    * Strike, deal same damage next round
    * Strike, double weapon damage, minor upside
    * Two strikes, -1 accuracy
* R7
  * Damage
    * Three strikes, -1 accuracy
    * dr7 vs adjacent enemies
    * Strike in large cone with +2d6??
    * Strike, triple weapon damage, minor downside?
    * Strike, 1d8 per 2 power extra damage if beat extra defense
      * +5d8/9d8

## Heavy Weapons

Heavy weapons need to have bonus power scaling to stay consistently ahead of 1h weapons and on par with dual-wielding.
At level 1, a person without a shield takes 60% weapon damage per round. If they have a shield, they take 40% weapon damage per round, so they are 50% more survivable. Heavy weapons should lose to sword and board in a direct duel, so heavy weapons should deal less than 50% more damage than regular weapons - say about 30% more damage. That's on par with a +1d damage increase at R1, and then it needs to stay at about 30% as levels increase.
Or does it? At higher levels, having a shield allows using a variety of powerful shield-specific feats/maneuvers/magic items that can significantly expand the gap in a duel scenario. It might be appropriate for heavy weapons to deal closer to 50% more damage than a shield at high levels.
Theory: Heavy weapons work best at +1d base, +1d per 3 power. That's +0.39dpp.
Equations: 3.2 + 0.53dpp medium, 4.2 + 0.92dpp heavy
* R1: med 3.5/5.6, heavy 4.7/8.3 (134%/148%)
* R2: med 4.3/6.9, heavy 6/10.6 (139%/153%)
* R4: med 5.9/9.0, heavy 8.8/14.3 (149%/159%)
* R7: med 8.2/12.5, heavy 12.9/20.3 (157%/162%)

## Heavy Weapons vs Dual Wielding

Assume 50% baseline accuracy (ignoring weapon-local accuracy for the moment). Same as greataxe, but greataxe gets glancing blows.
Probability of missing with both weapons: 0.5 * 0.5 = 0.25
Probability of hitting with both weapons: 0.5 * 0.5 = 0.25
Probability of hitting with either weapon: 0.5
Total damage = 0.5 * (weapon damage) + 0.25 * (weapon damage) * (roll twice multiplier)
If you simplify "roll twice modifier" as 120%, this reduces to 80% of weapon damage, as opposed to the standard greataxe 60% of weapon damage from glancing blows. That implies that two-handed weapons should only deal 33% more damage than light weapons.

What if dual-wielding let you add your damage with both weapons if you hit with both? 50% of 1x damage and 25% chance of 2x damage means you deal 100% of weapon damage on average each round. That would allow two-handed weapons to deal 67% more damage than light weapons.

Accuracy-adjusted damage per round is simple - just the normal 3.2 + 0.53dpp. Heavy weapon damage is 0.6 * (4.2 + 0.92dpp) = 2.52 + 0.56dpp.
* R1: dual 3.5/5.6, heavy 2.8/5.0
* R4: dual 5.9/9, heavy 5.3/8.6
* R7: dual 8.2/12.5, heavy 7.7/12.2

This is a little too strong. Dual wielding should have a -1 baseline accuracy penalty, removed eventually - dex 4?

This makes dual wielding better at low power and comparable at high power, which seems right. Dual wielding is also better for normal crit-fishing, but worse for desperate exertion crit-fishing. Dual wielding is also top tier for inflicting debuffs, which makes sense.

## Class Strike Ability Scaling

Ordinary strike maneuver example, accuracy-modified:
* R2, +1 acc: 3/4.8 (100%/100%)
* R3, +2 acc: 4/6.2 (95%/93%)
* R4, +4 acc: 5.9/9.0 (98%/94%)
* R5, +6 acc: 7.9/11.8 (94%/87%)
  * Note: using 1.2x modifier instead of smart math, crits get fuzzy
* R6, +10 acc: 13.2/20 (79%/74%)
Pure accuracy falls off at high levels no matter how much you give.
Attacks need some amount of damage scaling.
* R6, +2 acc, 2xw: 11.8/17.9 (99%/93%)
* R7, +4 acc, 2xw: 16.4/25 (98%/93%)
* L21, +6 acc, 2xw: 19.7/30 (117%/112%)

Spellstrike, accuracy-modified:
* L6: 3/4.6 (71%/69%)
* L9, +1acc: 4.1/6.3 (69%/65%)
* L12, +3acc: 5.9/8.8 (71%/66%)
* L15, +3acc, 2xw: 

Savage rush:
* R3: +0/+0
* R4: +3.1/+6.9
* R5: +5.7/+11
* R6: +9.3/+17.5
* R7: +17.4/+32

Double weapon damage, +1 accuracy per rank after, accuracy-modified:
* R5, 2xw: 7.9/11.8 (94%/88%)
* R6, 2xw, +1a: 10.4/15.7 (87%/81%)
* R7, 2xw, +2a: 13/20 (77%/74%)

Disciplined strike, accuracy-modified (30% miss -> glance, so 0.5+0.25 = 0.75x damage modifier)
* R3: 5.6/7.7
* R4: 7.8/10.1
* R5: 11.7/14.1
* R6: 15.7/18.5
* R7: 19.7/26.3

Enraged strike, accuracy-modified:
* R3, 2xw: 6/9.2 (142%/137%)
* R4, 2xw, +1a: 8.3/12.6 (138%/131%)
* R5, 2xw, +2a: 10.6/15.7 (126%/117%)
* R6, 2xw, +3a: 13.3/20.2 (110%/
* R7, 3xw, +3a: 22.1/33.8 (131%/

Enraged strike, non-accuracy scaling:
* R3, 2xw: 6/9.2 (142%/137%)
* R5, 3xw: 11.9/17.6 (141%/131%)
* R7, 4xw: 19.7/30 (117%/111%)

Enraged strike, hybrid scaling:
* R3, 2xw: 6/9.2 (142%/137%)
* R4, 2xw, +1a: 8.3/12.6 (138%/131%)
* R5, 3xw, +1a: 13.9/20.6 (165%/153%)
* R6, 3xw, +2a: 17.8/26.9 (148%/140%)
* R7, 3xw, +4a: 24.6/37.5 (146%/139%)

Ambush, accuracy-modified:
* R3, +2a: 4/6.2 (95%/93%)
* R4, +4a: 5.9/9 (98%/94%)
* R4, +2a, +1d4: 6.7/9.2 (112%/96%)
* R5, +2a, +1d8: 8.9/11.4 (106%/85%)
* R6, +4a, +1d8: 11.9/15.7 (99%/82%)
* R7, +4a, +2d10: 19.2/23.5 (114%/87%)

Sneak attack:
* R2, +1d4: 6.8/9.4 (136%/118%)
* R3, +1d8: 8.5/12.2 (136%/109%)
* R4, +2d8: 14.9/18 (149%/113%)
* R5, +4d6: 20.6/23.8 (147%/106%)
* R6, +4d10: 29.4/ (147%/)
* R7, +6d10: 41.2/ (147%/)

Exploit distraction, accuracy-modified:
* R4, 2xw: 7.1/10.8 (118%/113%)
* R5, 2xw, +1a: 9.2/13.7 (124%/109%)
* R6, 3xw, +1a: 15.5/23.5 (129%/123%)
* R7, 3xw, +3a: 22.1/33.8 (132%/125%)

Duelist Strike, accuracy-modified:
* R3: as Ambush
* R4: as Ambush
* R6, +2d8: 13.1/16.2 (109%/78%)
* R7, 2xw: 20.3/27.2 (103%/84%)
* R7, 2xw: 20.3/27.2 (103%/84%)

Execution, accuracy-modified:
* L6, 2xw: 6/9.2 (143%/138%)
* L9, 2xw, +1a: 8.3/12.6 (138%/131%)
* L12, 2xw, +2a: 10.6/15.7 (126%/117%)
* L15, 3xw, +2a: 17.8/26.7 (148%/140%)
* L18, 3xw, +3a: 22.1/ (132%/
* L21, 4xw, +3a: 

Spectral Strike:
* L6: 5/7.7 (71%/69%)
* L9, +1d6: 9.4/12.5 (94%/78%)
* L12, +2d6: 13.6/16.8 (97%/75%)
* L15, +2d6, +0.88dpp: 21.4/31.4 (107%/98%)
* L18, +2d8, +1.13dpp: 28/41.3 (100%/92%)
* L21, +2d10, +1.375dpp: 32.2/47.6 (115%/)

Power Attack (previously -1a for +25%ish damage):
* L6: 6.7 normal, 7.3 with -2a and +2d6
* L12: 13.4 normal, 13.2 with -2a and +3d6
* L18: 26.9 normal, 26.3 with -2a and +6d6

Generic Scaling Strike, accuracy-modified:
* R2, +1a: 3/4.8 (100%/100%)
* R3, +2a: 4/6.2 (95%/89%)
* R4, +2a, +1d4: 6.7/9.2 (112%/96%)
* R5, +2a, +0.63dpp: 8.5/14.1 (102%/105%)
* R6, +2a, +0.88dpp: 11.5/19.5 (96%/101%)
* R7, +2a, +1.17dpp: 15.4/26.3 (92%/98%)

Cyclone
* R3: 3/4.6 (71%/69%)
* R4, +1a: 4.1/6.3 (69%/66%)
* R5, +3a: 5.9/8.8 (71%/66%)
* R5, +1a, 1d6: 7/9.3 (84%/69%)
* R6, +1a, 0.875dpp: 10/17 (84%/89%)
* R7, +1a, 1.17dpp: 13.5/23 (80%/86%)

Flaming weapon
* R3: +1d10 (150%/118%)
* R5: +3d10 (165%/117%)
* R7: +7d10 (167%/114%)


## Class Non-Strike Ability Scaling

Lay on Hands (standard power scaling):
* R1: 3.5+0.5dpp: 3.75/5.75
* R2: 4.5+0.5dpp: 5.5/8
* R3: 4.5+0.875dpp: 7.6/11.9
* R4: 7+0.875dpp: 11.4/16.6
* R5: 7+1.375dpp: 15.9/24.2
* R6: 11+1.375dpp: 22/31.6
* R7: 11+1.83dpp: 28.4/43

Dirge of Doom (low power scaling):
* R1: 3.5+0.5dpp: 3.75/5.75
* R2: 4.5+0.5dpp: 5.5/8
* R3: 7+0.5dpp: 8.8/11.2
* R4: 11+0.5dpp: 13.5/16.5
* R5: 11+0.875dpp: 16.7/21.9
* R6: 18+0.875dpp: 25/31
* R7: 27.5+0.875dpp: 35.8/42.8

Abyssal Rebuke (high power scaling), accuracy-modified:
* R1: 3.5+0.5dpp: 2.3/3.5
* R2: 3.5+0.5dpp, +1a: 2.7/4.9
* R3: 3.5+0.83dpp, +1a: 4.5/7.4
* R4: 3.5+0.83dpp, +2a: 6.1/10.1
* R5: 3.5+1.17dpp, +2a: /14.5
* R6: 7+1.17dpp, +2a: /19.6
* R7: 7+1.75dpp, +2a: /30.1

Exchange Soul Fragment (high power scaling, d6-biased):
* R3: 3.5+0.875dpp: 6.6/10.9
* R4: 3.5+1.17dpp: 9.3/16.3
* R5: 7+1.17dpp: 14.6/21.6
* R6: 7+1.75dpp: 21/33.3
* R7: 14+1.75dpp: 30.6/44.6

Sudden Entropy (d10-biased, short range, use R power for convenience):
* L1: 4.5/6.6 (129%/118%)
  * 4.5 + 0.5dpp
* L3: 5.5/7.6 (110%/95%)
  * 5.5 + 0.5dpp
* L6: 9.4/14.9 (133%/133%)
  * 5.5 + 1.1dpp
* L9: 12.4/20.7 (124%/129%)
  * 5.5+1.38dpp
* L12: 20/28.3 (143%/126%)
  * 11+1.38dpp
* L15: 25.7/38.5 (129%/120%)
  * 11+1.83dpp
* L18: 33.9/54 (140%/120%)
  * 22+1.83dpp
* L21:
  * 22+

## Power Scaling

How much value does +2 power add?

* R1: +1.1 (+34%/+20%)
* R2: +1.2 (+24%/+15%)
* R3: +1.7 (+24%/+15%)
* R4: +2 (+20%/+13%)
* R5: +2.8 (+20%/+13%)
* R6: +3.4 (+17%/+10%)
* R7: +4.2 (+15%/+9.3%)

How much value does +4 power add?

* R7: +4 (+30%/+19%)

For context, in the old system, +2 power at rank 3 was about +13% damage at best, and no more than 10% for a dedicated high damage character. At rank 7, a default damage spell would deal 6d10+24 damage, or 57 damage. That's 10% more damage assuming 0 Willpower, or 9% more damage with 4 Willpower.

## Animal Companions

Use accuracy-adjusted, starting from 0.5x due to no Perception. Assume bite, so 1d10 base.
* R3: 3.7/4.9 (88%/73%)
  * normal attack
* R4: 4.7/6.4 (78%/66%)
  * +1a
* R5: 6.1/8.2 (73%/61%)
  * +2a
* R6: 8.6/11.7 (71%/60%)
  * +4a
* R7: 14.4/20 (85%/74%)
  * +2a, 2xw

Tag-Team Takedown:
* R3: +1.8
* R4: +3.3
* R5: +6.3
* R6: +14.9

## Smite

add both mundane and magical power, accuracy-adjusted. Base 1dpp.
* R2: 3.3/6.3 (110%/131%)
* R3: 4.9/8.4 (116%/125%)
  * +1a
* R4: 6.8/11.6 (113%/120%)
  * +2a
* R5: 10/16.8 (119%/125%)
  * +2a, replace +1d/2p with 1d6/5p (1.4dpp)
* R6: 14/23.8 (/123%)
  * +2a, 1d6/3p (1.75dpp)
* R7: 20.5/35.5 (122%/131%)
  * +2a, +1d10/3 power

add Str to magical power, accuracy-adjusted. To test extremes, double "max power" difference.
* R2: 2.1/5.7 (70%/119%)
* R3: 4.2/10.2 (100%/152%)
  * +1d4/5 power (total 1dpp)
* R4: 5.7/13.6 (95%/142%)
  * +1d6/5 power (total 1.2dpp)
* R5: 8.6/20.6 (102%/154%)
  * +1d6/3 power (total 1.67dpp)
* R6: /28.5 (/148%)
  * +1d8/3 power (total 2dpp)
* R7: /44.2 (/164%)
  * +1d8/2 power (total 2.75dpp)

* R6: /27.5 (/143%)
  * +1d6/3 power, +2a
* R7: /43.6 (162%)
  * +1d8/3 power, +2a

## Item Power
Halfway between "base power" and "max power":
* R1: 2
* R2: 4
* R3: 6
* R4: 8
* R5: 10
* R6: 12
* R7: 14
well that was easy.

Standard item pure damage:
* R0: ? (1d6)
* R1: 4.6 (1d8)
* R2: 6.2 (1d10/2d6)
* R3: 9 (2d8)
* R4: 13 (3d8/4d6)
* R5: 19 (4d8)
* R6: 26.7 (6d8/5d10)
* R7: 37.4 (8d8/7d10)

Each stage of a poison at rank X deals half the damage of a rank X+1 instant damage item.
This means that you only need to wait until stage 2 to deal more damage than an instant damage attack.

## HP Calculations

Goal: HP should be 3x/4x accuracy-modified damage target (assuming DR should be about 2x)
* R1: 6/10 (2.9x/2.9x)
* R2: 9/19 (3x/
* R3: 13/27
* R4: 18/38
* R5: 25/53
* R6: 36/77
* R7: 50/

## Standard Damage Spells
Notation: dX means "standard damage for rank X". A suffix of "h" means "high power scaling", and "l" means "low power scaling". High power scaling is generally stronger, while low power scaling is generally weaker.

Standard for all ranks:
* RX
  * Single-target pure damage
    * dX at Med range
    * dXh at Med range
    * dX+1 at Short range
    * dX-1 at Long range
    * dX-2h at Dist range
    * dX-2l at Ext range
    * dX-1 melee retributive with Deep attune
    * dX-2 Med range retributive with Deep attune
    * dX-1 at Short range twice (immediately and during next action)
    * dX-2 at Med range twice (immediately and during next action)
    * dX-1 at Med range, maximized if you beat an extra defense
    * dX-2 with -2 accuracy as a minor action (deep attune)
    * dX-2 with -2 accuracy as a minor action (sustain)
    * dX+1 at Med range with one round delay (must be same target in round 1 and 2)
    * dX at Med range with one round delay (choose target in round 2)
    * dX+2 adjacent (free hand, but not vs Reflex)
    * dX+1 adjacent (Grasp vs Reflex)
  * AOE
    * dX-2 in tX area
    * dX in t1 area
    * dX-1 in t(0.5X) area?
    * dX-2 in tX-2 area, Sustain (minor), no enemies-only
    * dX-2 in t(0.5X) zone, repeat next round so enemies can escape, no enemies-only
    * dX+1 in tX zone with a 1-round delay so creatures can escape, no enemies-only
    * dX-1 in tX self-based area (radius/cone/etc) with a 1-round delay, area chosen in second round
  * Damage + debuff
    * See "Rebalanced Debuffs"
* Damage over time
  * Instead of dealing dX damage:
    * dX-2 immediately and during next action
    * dX-1 immediately, again during next action if it lost HP the first time
    * dX-3 as a standard action removable condition condition
    * dX-3 as a sustained single-target effect?? (heat metal)
    * dX-2 as a movement-removable condition (fire Dex check)

## Accuracy-Modified Spell Damage Scaling

R1 spell with +1 accuracy per rank
* R1: 2.1/3.4 (100%/100%)
* R2: 3.0/4.8 (100%/100%)
* R3: 4.0/6.2 (95%/92%)
* R4: 5.3/8.1 (88%/84%)
* R5: 6.5/9.8 (77%/73%)

R3 spell with +1 accuracy per rank
* R3: 4.2/6.7 (100%/100%)
* R4: 5.8/13.3
* R5: 7.6/11.7
* R6: 9.7/15 (80%/78%)
* R7: 12/18.8 (71%/70%)

## Magic item bonuses

At rank 3, a +1d weapon provides (120%/113%) damage.
At rank 6, a +2d weapon provides (127%/118%) damage.

At rank 4, a +1d4 staff provides (125%/116%) damage.
At rank 6, a +1d8 staff provides (123%/114%) damage.

## Keen
The simple baseline for a weapon improvement is about 17% more damage (0.6 accuracy -> 0.7 accuracy).

Assume a 10% crit chance from aggressive accuracy-maximizing/crit-fishing.
That means you hit on a 1, and are +5 accuracy over normal, so glancing blows are impossible.
Example: +0 accuracy vs AD 1. You would crit on any explosion, but wouldn't crit a non-exploding 10.
Total damage per round starts at 1.11x weapon damage.

Keen is +4 accuracy to crits, so +4 vs AD 1. Crit on 7-10, and 4% chance to double-crit (10 -> 7/8/9/10).
Total damage per round is 1.44x weapon damage, or 30% more. That seems appropriate for how extreme this scenario is.
If Keen wasn't a significant damage improvement in an ultra crit-optimized scenario, it would be pointless.

In a baseline scenario of 0.65x weapon damage per round, Keen upgrades the 5% crit chance to a 9% crit chance, so about 0.7 total wdpr.

## Conditional Extra Damage Effects

### Must Beat Two Defenses

Hard to do math to validate how important this is. Estimate that it's about the same as -2 accuracy. On a base hit rate of 60%, -2 accuracy is the same as dealing 66% of normal damage, so it needs +50% damage to be reasonable. From "Higher Rank Damage Scaling", using an x+2 scaling is roughly +50% damage.

Conclusion: at rank X, deal dr(X+2) damage. If the result would be dr8 or higher, use "high power" scaling instead of regular scaling to limit the power from flat damage dice.

### If Beat Extra Defense

This applies to spells that deal damage if you beat one defense, and then have an increased effect if you also beat an extra defense. The simplest way to represent this is "if you also beat X defense, double damage" or "if you also beat X defense, maximum damage", since it's annoying to dynamically modify the actual dice pool situationally.

Overall, this should deal about 40% more damage when it works, since it has a better fallback than "must beat two defenses" but is useful in very similar situations.

If the base damage is 75% of a "normal" damaging effect, maximizing damage deals about 135% of base damage.

Conclusion: at rank X, deal dr(X-1) damage, maximized if you beat an extra defense.

### If Hit With Two Weapons

60% hit rate, so 36% chance of hitting with both weapons. About the same as "must beat two defenses", given the limitations.
