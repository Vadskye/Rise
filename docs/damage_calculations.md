# Standard damage estimation

## Higher standard damage chart
```
0--1   & 1d6  \\
2--3   & 1d8 \\
4--5   & 1d10  \\
6--7   & 2d6  \\
8--9   & 2d8 \\
10--11 & 2d10  \\
12--13 & 4d6  \\
14--15 & 4d8 \\
16--17 & 4d10 \\
18--19 & 5d10 \\
20--21 & 6d10 \\
22--23 & 7d10 \\
24--25 & 8d10 \\
26 & +10 \\
28 & +20 \\
30 & +30 \\
32 & +40 \\
34 & +50 \\
36 & +60 \\
38 & +70 \\
40 & +80 \\
42 & +90 \\
```

## Design goals

### Wounds

A high damage attack should have about a 95% probability of inflicting a wound if it hits a squishy
target. It's still possible for it to fail, but that should be the exception rather than the rule,
and high damage attacks should only fail to wound highly resistant targets. The main problem should
be *hitting* with a high damage attack, not inflicting a wound.

A high damage attack should have about a 50% probability of inflicting a wound on a high
resistance target. Similarly, a low damage attack should have about a 50% probability of inflicting
a wound on a low resistance target.

### Vital wounds

In a standard encounter, a party should have approximately a 25% chance of suffering a vital wound
to an arbitrary party member, ignoring bloodied mechanics and tactics. A typical combat should
take about 5 rounds, with only one high damage attack per round. This suggests about a 5% chance
to inflict a vital wound per high damage attack. Tank characters should be able to easily push this
down to make vital wounds impossible without critical hits, and unusually squishy characters can go
much higher.

Attacks can vary widely in their accuracy. High damage attacks tend not to have high accuracy, so we
assume an accuracy of 50%. With a 50% chance to hit and a standard 10% chance to explode, this
suggests that high damage attacks would be balanced if they never dealt vital wounds on non-critical
hits and always dealt vital wounds on critical hits. It doesn't break down quite that cleanly, but
that does suggest that the chance of dealing a vital wound on a non-critical hit should hover at
around 0.1% to get the expected ratio taking into account critical hits.

## Calculating current base values

### Squishy resistance values
Resistance bonuses can vary widely, but even with no meaningful investment we assume
a flat bonus of at least 1 + half level, leaving base values:

level 1: 3 WR, 15 VR
level 5: 9 WR, 29 VR
level 10: 17 WR, 50 VR
level 15: 29 WR, 80 VR
level 20: 46 WR, 120 VR

### High damage attack
Assume 3 starting Willpower and a single-target damage spell. Expected power at level 1 is:
(level 1) + (willpower 3) + (spell 2) = 6.

Standard power upgrade levels:
+2 at level 5 from rank 3 spells
+1 at level 6 from wellspring
+2 at level 9 from magic implement
+2 at level 11 from rank 5 spells
+1 at level 14 from wellspring
+2 at level 17 from rank 7 spells
+2 at level 18 from magic implement
+1 at level 20 to make even/odd work out better

so at level 20, a standard spellcaster would expect to have:
(level1 6) + (levels 19) + (bonuses 12) = 37 effective power.

We use the following standard checkpoints:

1st level: 6 power = 2d6 damage
5th level: 12 power = 4d6 damage
10th level: 20 power = 6d10 damage
15th level: 28 power = 10d10 damage / 8d10 + 20
20th level: 38 power = 15d10 damage / 8d10 + 70

### Low damage attack
Assume 3 starting Willpower and an AOE damage spell (similar to Certain Strike, etc.). Expected power at level 1 is:
(level 1) + (willpower 3) + (spell -2) = 2.

Standard power upgrade levels:
+1 at level 6 from wellspring
+2 at level 9 from magic implement
+1 at level 14 from wellspring
+2 at level 17 from rank 7 spells

so at level 20, a standard spellcaster would expect to have:
(level1 6) + (levels 19) + (bonuses 12) = 37 effective power.

We use the following standard checkpoints:

1st level: 2 power = 1d8 damage
5th level: 6 power = 2d6 damage
10th level: 14 power = 4d8 damage
15th level: 20 power = 6d10 damage
20th level: 27 power = 9d10 damage

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

### Wound resistance

#### HDA vs low resistance target

To maintain 95% chance of wounding, the following values work:
output [crit 2d6 1d20] >= 3 named "level 1"
output [crit 4d6 1d20] >= 9 named "level 5"
output [crit 6d10 1d20] >= 22 named "level 10"
output [crit 10d10 1d20] >= 41 named "level 15"
output [crit 14d10 1d20] >= 60 named "level 20"

Subtracting the current (1 + half level) assumption for minimal investment bonuses to resistances,
that suggests base wound resistance values of:

level 1: 2
level 5: 6
level 10: 16
level 15: 33
level 20: 49

#### LDA vs low resistance target

To maintain 50% chance of wounding at low damage values and squishy wound resistance values, the following values work:

output [crit 1d8 1d20] >= 3 named "level 1"
output [crit 2d6 1d20] >= 8 named "level 5"
output [crit 4d8 1d20] >= 19 named "level 10"
output [crit 6d10 1d20] >= 35 named "level 15"
output [crit 9d10 1d20] >= 51 named "level 20"

Subtracting the current (1 + half level) assumption for minimal investment bonuses to resistances,
that suggests base wound resistance values of:

level 1: 2
level 5: 5
level 10: 13
level 15: 27
level 20: 40

#### HDA vs high resistance target

To maintain a 50% chance of wounding, the following values work:

output [crit 2d6 1d20] >= 7 named "level 1"
output [crit 4d6 1d20] >= 15 named "level 5"
output [crit 6d10 1d20] >= 34 named "level 10"
output [crit 10d10 1d20] >= 57 named "level 15"
output [crit 14d10 1d20] >= 79 named "level 20"

This requires a bonus from investment of:

level 1: 5
level 5: 9
level 10: 

### Vital resistance

#### HDA vs low resistance target

To maintain a 5% chance of getting a vital wound at standard damage values and squishy resistance
values, the following values work:

output [crit 2d6 1d20] >= 13 named "level 1"
output [crit 4d6 1d20] >= 23 named "level 5"
output [crit 6d10 1d20] >= 52 named "level 10"
output [crit 10d10 1d20] >= 84 named "level 15"
output [crit 14d10 1d20] >= 120 named "level 20"

Subtracting the current (1 + half level) assumption for minimal investment bonuses to resistances,
that suggests base wound resistance values of:

level 1: 12
level 5: 20
level 10: 46
level 15: 76
level 20: 109

#### HDA vs lower level target

A high damage attack should have a 95% chance of vitally wounding a low resistance target 5
levels lower. However, in the current system, the odds of 

output [crit 4d6 1d20] >= 15 named "level 5"
output [crit 6d10 1d20] >= 29 named "level 10"
output [crit 10d10 1d20] >= 67 named "level 15"
output [crit 14d10 1d20] >= 111 named "level 20"

#### HDA vs low resistance target - high damage calcs

output [crit 2d6 1d20] >= 13 named "level 1"
output [crit 4d6 1d20] >= 23 named "level 5"
output [crit 8d8 1d20] >= 55 named "level 10"
output [crit 8d10+30 1d20] >= 105 named "level 15"
output [crit 8d10+80 1d20] >= 160 named "level 20"

#### HDA vs lower level target - high damage calcs

output [crit 4d6 1d20] >= 12 named "level 5"
output [crit 8d8 1d20] >= 23 named "level 10"
output [crit 8d10+30 1d20] >= 55 named "level 15"
output [crit 8d10+80 1d20] >= 105 named "level 20"
