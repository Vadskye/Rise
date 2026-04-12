# Damaging Abilities

## Damage Rank Calculations

A damaging ability's Damage Rank (dr) is determined by its ability rank plus or minus the "costs" of its range, area, and special effects.

Formula: Damage Rank = Ability Rank - (Target/Area Cost) - (Effect Costs) + (Budget Bonuses)

### Targeting Costs

| Cost | Single Target | Area (Rank) | Examples                                               |
| :--- | :------------ | :---------- | :----------------------------------------------------- |
| -2   | Melee         | —           | Burning Grasp                                          |
| -1   | Short         | R0          | Small cone from self, Enemies in Tiny radius from self |
| 0    | Medium        | R1          | Tiny radius in Short range, Medium line from self      |
| +1   | Long          | R2 / R3     | Small radius in Short range, Medium radius from self   |
| +2   | Distant       | R4 / R5     | Medium radius in Medium range, Large radius from self  |
| +3   | —             | R6 / R7     | Large radius in Medium range, Huge radius from self    |

#### Defense Penalties

Single-target attacks against Reflex defense incur a +1 cost (-1 dr) because Reflex is unusually low for large monsters.

### Effect Costs

| Cost | Effect Category           | Specifics                                                 |
| :--- | :------------------------ | :-------------------------------------------------------- |
| +2   | Sustain (minor) zone      | Full size radius or emanation                             |
| +1   | Sustain (minor) zone      | Wall or limited scope (half area level)                   |
| +2   | Damage over time          | "Immediately and next round" (drX-2)                      |
| +2   | DoT condition (Move)      | "As a condition" with Move action removal (drX-2)         |
| +3   | DoT condition (Standard)  | "As a condition" with Standard action removal (drX-3)     |
| +1   | Debuff                    | If the spell includes a debuff (Rank X+1)                 |
| -2   | Injury-only               | Spell only affects injured targets                        |
| +1   | Injury-only double damage | Immediate for most areas, delayed if targeting cost is -1 |
| +2   | Injury-only double damage | Only for touch range                                      |

Reasoning: A typical sustain (minor) radius will hit the same target about twice, which makes -2dr a reasonable penalty, though it has significant possible upside for long fights.

#### Double standard actions

This category of ability has no immediate effect, and allows you to make a special attack with a standard action next round.

Delayed damage normally deals +1d, but that assumes that you're making an attack on an active target, so it doesn't allow precombat usage. This type of effect can be used precombat, which is dangerous. It also scales unusually well with buffs or single-ability enhancements.

Therefore, this type of ability doesn't get the +1d delayed damage modifier, and it simply deals double damage relative to a single attack. In addition, it must have no longer than short range to make it more difficult to initiate combat with it.

#### Buff Costs

Buffs granted by a damaging ability cost budget based on their Effective Actions (EA). For details, see `buff_action_efficiency.md`.

### Budget Bonuses

| Bonus | Category            | Specifics                                              |
| :---- | :------------------ | :----------------------------------------------------- |
| +1    | Cooldown            | For permanent abilities only                           |
| +1    | Attune (R1-4)       | Standard action attack granted by attunement           |
| +2    | Attune (R5+)        | Standard action attack granted by attunement           |
| +1    | Fatigue Cost        | Paying a fatigue level adds +1 to budget               |
| +1    | Self-Hit Penalty    | If an area ability must include the caster as a target |
| +1    | Escapable Damage    | If a repeat or delayed hit is easily escapable         |
| +1    | Inescapably Delayed | Damage that happens 1 round later (not escapable)      |
| +2    | Escapably Delayed   | Damage that happens 1 round later (escapable)          |
| +1    | Double defense      | Must hit two separate defenses to succeed              |

### Injury and Flat Damage

#### Injury-only damage

Damage that only works on injured targets gains a -2 cost (+2 dr) bonus.

- Medium range / AOE: +1 dr for injury bonus damage
- Short range: +1 dr for _delayed_ injury bonus damage (so drX=rank overall)
- Touch range: +2 dr for injury bonus damage

#### Flat damage

Flat damage effects suffer more for using lower rank damage scaling. Halve all modifiers to relative damage rank for flat damage effects, rounded down.

- drX in Short range (budget -1)
- drX+1 in melee range (budget -2)
- drX-1 in Distant range (budget +2)
- drX-1 in RX area (budget +2), ignoring extreme areas
