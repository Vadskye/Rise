# Damage calculations

## Design goals

### Time to kill
A typiecal combat should take about 5 rounds. That means that each attack should typically
remove about 20% of the target's health on average. Assuming a 50% accuracy and a 20% chance of a
glancing blow for half damage, that means that a typical attack inflicts about 60% of its
listed damage per round. Therefore, each attack should normally deal a third of the target's
maximum HP on a successful hit.

### Low level combat
At low levels, combat should feel dangerous. It's also very difficult to build reasonable damage
numbers for the system if a 1st level attack still deals only a third of a target's maximum HP on a
successful hit. To solve this, low-level combat should have lower accuracy assumptions and no
glancing blow mechanics. Higher level characters should generally have higher accuracy and the
glancing blow mechanic. This can be represented by assuming a 40% accuracy at level 1 and scaling by
5% every 3 levels until it reaches the expected 50% accuracy at level 7. We assume glancing blow for
all attacks starting at level 10.

This suggests the following ratios:


### Doubling principles

In general, overall character power should double approximately every 2 levels.
Character power is measured across a wide range of dimensions, but it's easiest to think of it in
terms of accuracy, defenses, hit points, and damage.
If hit points and damage each double every 6 levels, the overall difference in character power would
double approximately every 3 levels.
Taking into account accuracy and defenses is slightly more annoying, but it seems reasonable to
assume that it would make the extra difference between 3 and 2, so the goal should be to double
damage every 2 levels.
Doubling hit points is fairly easy, since it can be easily determined by an arbitrary chart.

### Doubling damage
The challenge with doubling damage is that nonlinear damage scaling is difficult to generate
naturally using smoothly scaling values.

### Vital wounds

In a standard encounter, a party should have approximately a 25% chance of suffering a vital wound
to an arbitrary party member, ignoring bloodied mechanics and tactics. A typical combat should
take about 5 rounds, with only one high damage attack per round. This suggests about a 5% chance
to inflict a vital wound per high damage attack. Tank characters should be able to easily push this
down to make vital wounds impossible without critical hits, and unusually squishy characters can go
much higher.

Attacks can vary widely in their accuracy. High damage attacks tend not to have high accuracy, so we
assume an accuracy of 50%. With a 50% chance to hit and a standard 10% chance to explode, this
suggests that high damage attacks would be balanced if they dealt vital wounds on non-critical
hits 1% of the time and always dealt vital wounds on critical hits.

## Recommended values

```
function: crit A:d B:n {
  if B = 10 {
    result: A + A
  } else {
    result: A
  }
}
```

### Bleed resistance

#### HDA vs low resistance target

To maintain 95% chance of wounding, the following values work:
* output [crit 2d6 1d20] named "level 1 -- 3"
* output [crit 4d6 1d20] named "level 5 -- 9"
* output [crit 6d10 1d20] named "level 10 -- 22"
* output [crit 8d10+20 1d20] named "level 15 -- 51"
* output [crit 8d10+80 1d20] named "level 20 -- 111"

Subtracting the current (1 + half level) assumption for minimal investment bonuses to resistances,
that suggests base bleed resistance values of:

* level 1: 2
* level 5: 6
* level 10: 16
* level 15: 43
* level 20: 100

#### LDA vs low resistance target

To maintain 50% chance of wounding at low damage values and squishy bleed resistance values, the following values work:

* output [crit 1d8 1d20] named "level 1 -- 5"
* output [crit 2d6 1d20] named "level 5 -- 8"
* output [crit 4d8 1d20] named "level 10 -- 19"
* output [crit 6d10 1d20] named "level 15 -- 34"
* output [crit 8d10+10 1d20] named "level 20 -- 55"

Subtracting the current (1 + half level) assumption for minimal investment bonuses to resistances,
that suggests base bleed resistance values of:

* level 1: 4
* level 5: 5
* level 10: 13
* level 15: 26
* level 20: 44

#### HDA vs high resistance target

To maintain a 50% chance of wounding, the following values work:

* output [crit 2d6 1d20] >= 7 named "level 1"
* output [crit 4d6 1d20] >= 15 named "level 5"
* output [crit 6d10 1d20] >= 34 named "level 10"
* output [crit 10d10 1d20] >= 57 named "level 15"
* output [crit 14d10 1d20] >= 79 named "level 20"

This requires a bonus from investment of:

TODO

### Vital resistance

#### HDA vs low resistance target

To maintain a 5% chance of getting a vital wound at standard damage values and squishy resistance
values, the following values work:

* output [crit 2d6 1d20] named "level 1 -- 12"
* output [crit 4d6 1d20] named "level 5 -- 22"
* output [crit 6d10 1d20] named "level 10 -- 49"
* output [crit 8d10+20 1d20] named "level 15 -- 83"
* output [crit 8d10+80 1d20] named "level 20 -- 143"

Subtracting the current (1 + half level) assumption for minimal investment bonuses to resistances,
that suggests base vital resistance values of:

* level 1: 11
* level 5: 19
* level 10: 43
* level 15: 75
* level 20: 132

#### HDA vs lower level target

A high damage attack should have a 96% chance of vitally wounding a low resistance target 5
levels lower. Or so. This sort of works out, though things get a bit crazy at high levels.

* output [crit 4d6 1d20] >= 11 named "level 5"
* output [crit 6d10 1d20] >= 22 named "level 10"
* output [crit 8d10+20 1d20] >= 49 named "level 15"
* output [crit 8d10+80 1d20] >= 83 named "level 20"

#### HDA vs low resistance target - high damage calcs

* output [crit 2d6 1d20] >= 13 named "level 1"
* output [crit 4d6 1d20] >= 23 named "level 5"
* output [crit 8d8 1d20] >= 55 named "level 10"
* output [crit 8d10+30 1d20] >= 105 named "level 15"
* output [crit 8d10+80 1d20] >= 160 named "level 20"

#### HDA vs lower level target - high damage calcs

* output [crit 4d6 1d20] >= 12 named "level 5"
* output [crit 8d8 1d20] >= 23 named "level 10"
* output [crit 8d10+30 1d20] >= 55 named "level 15"
* output [crit 8d10+80 1d20] >= 105 named "level 20"
