# Damaging Abilities

## Damaging Ability Area

Because area size scales strongly with rank, at low ranks, a single-target ability may be more versatile than an area ability. What is the crossover point?

### Damage by ability rank

If it's a damage plus debuff spell, reduce the listed damage rank by 1.

* Rank X:
  * drX in Med range
  * drX in R1 area
  * drX+1 in Short range
  * Debuff rank X+1 in Short range
  * drX+1 in R0 area
  * drX+2 in melee range
* Rank X, where X >= 2:
  * drX-1 in Long range
  * drX-1 in R(X/2) area, to a minimum of R2 area
  * Debuff rank X+1 in R(X/2) area
* Rank X, where X >= 3:
  * drX-2 in Distant range
  * drX-2 in RX area, ignoring extreme areas
* Rank X, where X >= 5:
  * drX-3 in RX area, including extreme areas

#### Flat damage

Flat damage effects suffer more for using lower rank damage scaling. Halve all modifiers to relative damage rank for flat damage effects, rounded down. That means:

* drX in Short range (so don't use Short range without special stuff)
* drX+1 in melee range
* drX-1 in Distant range
* drX-1 in RX area, ignoring extreme areas

### Damage for Sustain (minor) zones

A sustain (minor) zone must be a ranged radius effect or wall. It deals -2dr as a full size radius, or -1dr as a wall or limited scope (half area level to minimum of r2) area.

Reasoning: A typical sustain (minor) radius will hit the same target about twice, which makes -2dr a reasonable penalty, though it has significant possible upside for long fights.

### Damage over time

* "Immediately and next round" is drX-2
* "As a condition" is drX-2 if it has move action DV 10 removal
* "As a condition" is drX-3 if it has standard action DV 10 removal

### Injury-only damage

Damage that only works on injured targets should be about +40% damage, which is roughly +2dr.
If it deals one tick of damage then checks for another damage tick on injury, it scales poorly with extra damage, so it can get only -1dr (expected damage: 2x -1dr = 1.6x baseline)

### Delayed damage

Inescapably delayed damage gains +1dr.
Escapably delayed damage, such as damage that happens one round later in a fixed area, gains +2dr as long as it is not enemies-only. If it is enemies-only, then it's functionally inescapably delayed damage, so it only gains +1dr.

### Delayed double standard action
This category of ability has no immediate effect, and allows you to make a special attack with a standard action next round.

Delayed damage normally deals +1d, but that assumes that you're making an attack on an active target, so it doesn't allow precombat usage. This type of effect can be used precombat, which is dangerous. It also scales unusually well with buffs or single-ability enhancements.

Therefore, this type of ability doesn't get the +1d delayed damage modifier, and it simply deals double damage relative to a single attack. In addition, it must have no longer than short range to make it more difficult to initiate combat with it.
