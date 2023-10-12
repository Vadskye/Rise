# Background

Before this system, hit points were defined with the concept of "level for the purpose of calculating hit points", which was actually level + Con + class modifier. This value mapped to a level on a table, which connected this value to a particular hit point total. It turns out that players struggled to intuitively grasp this system.

# Goals

A hit point system should meet the following criteria:

* Percentage-based scaling
  * One of the fundamental principles of Rise is that characters should double their power at a consistent pace. Overall damage, ignoring accuracy, doubles every 6 levels, and hit points should follow the same progression.
  * At every level, characters should increase their hit points by about 12.3%.
  * Precisely matching this scaling at every individual level is not important. Players are unlikely to notice small deviations, and they don't affect the math of the system much. However, the doubling principle must remain true across large level gaps.
* Simplicity
  * Players should be able to quickly grasp the hit point system.
  * Rise already introduces unusual complexity by splitting hit points and damage resistance, so this is a particularly high priority for simplicity.
  * One point of confusion in the previous system was the conflation of "level" and "level + con + class modifier"
* Class variability
  * Hit points should vary based on a character's class.
  * Barbarians should have the most hit points of all base classes, and wizards should be lowest or tied for lowest.

# Hit Point System: Base Class Level + Con Breakpoints

Each base class defines a specific HP progression. Each progression takes the following form:

X base hit points, plus Y hit points per (level + Con).

## Baseline (Wizard) Hit Points

In the old system, 3 Con was about 42% more HP.

* Level 1: You have 6 hit points, plus 1 hit point per level beyond 1. You also add your Constitution to your hit points.
  * 0 Con benchmark: L1 is 6 HP, L4 is 9 HP, L7 is 12 HP
    * Old system:    L1 is 6 HP, L4 is 9 HP, L7 is 14 HP
  * 3 Con benchmark: L4 is 12 HP, L7 is 15 HP, L10 is 18 HP
    * Old system:    L4 is 14 HP, L7 is 20 HP, L10 is 28 HP
* Level 7: You have 14 hit points, plus 2 hit points per level beyond 7. You also add twice your Constitution to your hit points.
  * 0 Con benchmark: L7 is 14 HP, L10 is 20 HP, L13 is 26 HP
    * Old system:    L7 is 14 HP, L10 is 20 HP, L13 is 28 HP
  * 3 Con benchmark: L7 is 20 HP, L10 is 26 HP, L13 is 32 HP (143% / 130% / 123% of 0 con)
    * Old system:    L7 is 20 HP, L10 is 28 HP, L13 is 40 HP
* Level 13: You have 28 hit points, plus 4 hit points per level beyond 13. You also add four times your Constitution to your hit points.
  * 0 Con benchmark: L13 is 28 HP, L16 is 40 HP, L19 is 52 HP
    * Old system:    L13 is 28 HP, L16 is 40 HP, L19 is 56 HP
  * 3 Con benchmark: L13 is 40 HP, L16 is 52 HP, L19 is 64 HP (143% / 130% / 123% of 0 con)
    * Old system:    L13 is 40 HP, L16 is 56 HP, L19 is 80 HP
* Level 19: You have 56 hit points, plus 8 hit points per level beyond 19. You also add eight times your Constitution to your hit points.
  * 0 Con benchmark: L19 is 56 HP, L22 is 80 HP
    * Old system:    L19 is 56 HP, L22 is 80 HP
  * 3 Con benchmark: L19 is 80 HP, L22 is 104 HP (143% / 130%)
    * Old system:    L19 is 80 HP, L22 is 110 HP

## Barbarian Hit Points

Barbarians should have about 75% more hit points than wizards. In the old system, they got a +5 level modifier.

* Level 1: You have 10 hit points, plus 2 hit points per level beyond 1. You also add twice your Constitution to your hit points.
  * 0 Con benchmark: L1 is 10 HP, L4 is 16 HP, L7 is 22 HP (167% / 178% / 183% of wizard)
    * Old system:    L1 is 12 HP, L4 is 18 HP, L7 is 25 HP
  * 3 Con benchmark: L1 is 16 HP, L4 is 22 HP, L7 is 28 HP (178% / 183% / 186% of wizard)
    * Old system:    L1 is 18 HP, L4 is 25 HP, L7 is 36 HP
* Level 7: You have 24 hit points, plus 4 hit points per level beyond 7. You also add four times your Constitution to your hit points.
  * 0 Con benchmark: L7 is 24 HP, L10 is 36 HP, L13 is 48 HP (179% / 185% / 189% of wizard)
    * Old system:    L7 is 25 HP, L10 is 36 HP, L13 is 50 HP
  * 3 Con benchmark: L7 is 36 HP, L10 is 48 HP, L13 is 60 HP (185% / 189% / 191% of wizard) (150% / 133% / 125% of 0 Con)
    * Old system:    L7 is 36 HP, L10 is 50 HP, L13 is 70 HP
* Level 13: You have 50 hit points, plus 8 hit points per level beyond 13. You also add eight times your Constitution to your hit points.
  * 0 Con benchmark: L13 is 50 HP, L16 is 74 HP, L19 is 98 HP (179% / 185% / 188% of wizard)
    * Old system:    L13 is 50 HP, L16 is 70 HP, L19 is 110 HP
  * 3 Con benchmark: L13 is 74 HP, L16 is 98 HP, L19 is 122 HP (148% / 132% / 125% of 0 Con)
    * Old system:    L13 is 70 HP, L16 is 110 HP, L19 is 140 HP
* Level 19: You have 100 hit points, plus 15 hit points per level beyond 19. You also add fifteen times your Constitution to your hit points.
  * 0 Con benchmark: L19 is 100 HP, L21 is 130 HP
    * Old system:    L19 is 110 HP, L21 is 130 HP
  * 3 Con benchmark: L19 is 145 HP, L21 is 175 HP
    * Old system:    L19 is 140 HP, L21 is 160 HP

## Fighter Hit Points

Fighters should have about 42% more hit points than wizards. In the old system, they got a +3 level modifier.

* Level 1: You have 8 hit points, plus 2 hit points per level beyond 1. You also add twice your Constitution to your hit points.
  * 0 Con benchmark: L1 is 8 HP , L4 is 14 HP, L7 is 20 HP
    * Old system:    L1 is 9 HP , L4 is 14 HP, L7 is 20 HP
  * 3 Con benchmark: L1 is 14 HP, L4 is 20 HP, L7 is 26 HP
    * Old system:    L1 is 14 HP, L4 is 20 HP, L7 is 28 HP
* Level 7: You have 20 hit points, plus 3 hit points per level beyond 7. You also add three times your Constitution to your hit points.
  * 0 Con benchmark: L7 is 20 HP, L10 is 29 HP, L13 is 38 HP (143% / 145% / 146% of wizard)
    * Old system:    L7 is 20 HP, L10 is 28 HP, L13 is 40 HP
  * 3 Con benchmark: L7 is 29 HP, L10 is 38 HP, L13 is 47 HP (145% / 146% / 147% of wizard)
    * Old system:    L7 is 28 HP, L10 is 40 HP, L13 is 56 HP
* Level 13: You have 40 hit points, plus 6 hit points per level beyond 13. You also add six times your Constitution to your hit points.
  * 0 Con benchmark: L13 is 40 HP, L16 is 58 HP, L19 is 76 HP (143% / 145% / 146% of wizard)
    * Old system:    L13 is 40 HP, L16 is 56 HP, L19 is 80 HP
  * 3 Con benchmark: L13 is 58 HP, L16 is 76 HP, L19 is 94 HP (145% / ... of wizard)
    * Old system:    L13 is 56 HP, L16 is 80 HP, L19 is 110 HP
* Level 19: You have 80 hit points, plus 12 hit points per level beyond 19. You also add twelve times your Constitution to your hit points.
  * 0 Con benchmark: L19 is 80 HP, L21 is 104 HP
    * Old system:    L19 is 80 HP, L21 is 100 HP
  * 3 Con benchmark: L19 is 116 HP, L21 is 140 HP
    * Old system:    L19 is 110 HP, L21 is 130 HP

## Cleric Hit Points

Clerics should have about 25% more hit points than wizards. In the old system, they got a +2 level modifier.

* Level 1: You have 8 hit points, plus 1 hit point per level beyond 1. You also add your Constitution to your hit points.
* Level 4: You have 12 hit points, plus 2 hit points per level beyond 4. You also add twice your Constitution to your hit points.
  * 0 Con benchmark: L4 is 12 HP, L7 is 18 HP, L10 is 24 HP
    * Old system:    L4 is 12 HP, L7 is 18 HP, L10 is 25 HP
  * 3 Con benchmark: L4 is 18 HP, L7 is 24 HP, L10 is 30 HP
    * Old system:    L4 is 18 HP, L7 is 25 HP, L10 is 36 HP
* Level 10: You have 24 hit points, plus 4 hit points per level beyond 10. You also add four times your Constitution to your hit points.
  * 0 Con benchmark: L10 is 24 HP, L13 is 36 HP, L16 is 48 HP
    * Old system:    L10 is 25 HP, L13 is 36 HP, L16 is 50 HP
  * 3 Con benchmark: L10 is 36 HP, L13 is 48 HP, L16 is 60 HP
    * Old system:    L10 is 

## Problem: Negative Con

The breakpoints need to be chosen carefully to ensure that a character with a -2 Con never *loses* hit points when they hit HP breakpoints. At most, their hit points should remain the same. A character with -3 Con can lose hit points, but since no PC can have -3 Con, this can be safely ignored.

-2 Con wizard:
* L6: 6+5-2 = 9
* L7: 14-4 = 10
* L12: 14+10-4 = 20
* L13: 28-8 = 20
* L18: 28+20-8 = 40
* L19: 56-16 = 40

-2 Con barbarian:
* L6: 10+10-4 = 16
* L7: 24-8 = 16
* L12: 24+20-8 = 36
* L13: 50-16 = 34
* L18: 50+40-16 = 74
* L19: 100-30 = 70

## Smoothed Progressions

* Wizard
  * L1: 6 HP + 1 per (level + Con)
  * L7: 14 HP + 2 per (level + Con)
  * L13: 30 HP + 4 per (level + Con)
  * L19: 60 HP + 8 per (level + Con)
* Cleric
  * L1: 8 HP + 1 per
  * L7: 18 HP + 2 per
  * L13: 35 HP + 5 per
  * L19: 70 HP + 10 per
* Fighter
  * L1: 8 + 2 per
  * L7: 20 + 3 per
  * L13: 40 + 6 per
  * L19: 80 + 12 per
* Barbarian
  * L1: 10 + 2 per
  * L7: 24 + 4 per
  * L13: 50 + 8 per
  * L19: 100 + 16 per

# Damage Resistance

With hit points being more directly tied to base class, there is no room for damage resistance to also be tied to base class in the same way. The increased complexity of class-based hit points is too much.

Instead, damage resistance should be entirely separated from innate character progression. The basic damage resistance progression was weak anyway, and primarily existed to support monster mechanics. Character damage resistance should come entirely from armor and specific class abilities.

It's very hard to make damage resistance equal to hit points without intrinsic character progression, and trying to make the numbers that high places too much emphasis on magic items that are not guaranteed in low magic games.

## Proposal

* A typical character's damage resistance should be equal to half of their hit points
* The Recover action should recover all missing damage resistance and half max hit points
  * If DR is equal to half hit points, and Recover recovers full HP, then a character in a tough fight has 4x more hit points than damage resistance
  * With this recovery system, a character in a tough fight has 1.5x HP and 2x DR. They still have more HP than DR, but the two are much closer to being balanced.

## Expected Damage Resistance Benchmarks

### Damage Resistance Tiers

#### Tier Examples

* Average DR: equal to half hit points
  * Heavy armor fighters with 2 Con have Average DR
  * Medium armor clerics with 2 Con have Average DR
  * Light armor rogues with 0 Con have Average DR
  * Sorcerers and wizards with 2 Con have Average DR
* High DR: equal to hit points
  * Monks with 0 Con
  * Heavy armor paladins with 0 Con
* Low DR: equal to 1/4 hit points
  * Light armor barbarians with 4 Con

#### Tier Benchmarks

Benchmarks are defined at (level 2 / level 8 / level 14 / level 20).
Benchmarks assume a Ring of Protection.

* Average DR
  * Medium armor fighter with 0 Con:(10/27/54/108 HP) (5/13/27/54 DR)
  * Medium armor cleric with 2 Con: (11/28/58/116 HP) (5/14/29/58 DR)
  * Light armor rogue with 0 Con:   (9 /24/48/96 )    (4/12/24/48 DR)
  * Sorcerer with 2 Con:            (9 /24/48/96 )    (4/12/24/48 DR)
* High DR
  * Heavy armor fighter with 0 Con: (10/27/54/108 HP)
  * Monk with 0 Con:                (9 /24/48/96 )
  * Heavy armor paladin with 2 Con: (14/33/66/132 HP)
* Low DR
  * Barbarian with 4 Con:           (20/48/98/191)    (5/12/24/48 DR)

#### Ideal DR Source Progressions

Heavy armor: (10/20/40/80)
Medium armor: (5/12/24/48)
Light armor: (4/8/16/32)
Ring of protection: (0/4/8/16)
Mantle of faith:    (4/8/16/32)
Class rank ability: (4/8/16/32) - realistically, (3/9/15/28) from 3x rank until rank 6, then 4x rank
Triple progression class rank ability: (3/9/20/35) from 3x rank for ranks 1-3, 4x rank for ranks 4-6, and finally 5x rank at rank 7
Mage armor: (4/8/16/32) - realistically, (3/12/20/35) from 3x rank for ranks 1-2, 4x rank for ranks 3-5, and finally 5x rank at ranks 6-7
Ki barrier: (5/12/24/48) - realistically, (4/12/25/48) from 4x rank for ranks 1-3, 5x rank for ranks 4-6, and finally 7x rank at rank 7
Bloodforging: (8/16/32/64) - realistically, (5/15/30/70) from 5x rank for ranks 1-3, 6x rank for ranks 4-6, and finally 10x rank at rank 7

#### Armor Progression

* Rank 1
  * Light: 4 DR (chain shirt)
  * Medium: 5 DR (scale)
  * Heavy: 6 DR (layered hide)
* Rank 2
  * Light: 4 DR (chain shirt)
  * Medium: 6 DR (breastplate)
  * Heavy: 7 DR (plated mail)
* Rank 3: x2
  * Light: 8 DR (magic chain shirt)
  * Medium: 12 DR (magic breastplate)
  * Heavy: 16 DR (magic full plate)
* Rank 4: x3
  * Light: 12 DR (magic chain shirt)
  * Medium: 18 DR (magic breastplate)
  * Heavy: 24 DR (magic full plate)
* Rank 5: x4
  * Light: 16 DR (magic chain shirt)
  * Medium: 24 DR (magic breastplate)
  * Heavy: 32 DR (magic full plate)
* Rank 6: x6
  * Light: 24 DR (magic chain shirt)
  * Medium: 36 DR (magic breastplate)
  * Heavy: 48 DR (magic full plate)
* Rank 7: x8
  * Light: 32 (magic chain shirt)
  * Medium: 48 (magic breastplate)
  * Heavy: 64 DR (magic full plate)


### Old System Calculated

Before replacing the old system, we must define what reasonable values existed for damage resistance in the old system. For this purpose, we can use four stock characters:
* Fighter (heavy armor)
* Cleric (medium armor)
* Rogue (light armor)
* Sorcerer (mage armor)
* Monk (ki barrier)

Our benchmark ranks are 2/8/14/20. Each character has one rank-appropriate item, and any number of (rank - 1) items.

* Fighter (+0 level)
  * L2: 7 = 1 (level) + 6 (layered hide)
  * L8: 23 = 7 (level) + 10 (full plate) + 6 (resistant armor)
  * L14: 60 = 16 (level) + 40 (adamantine full plate) + 4 (ring of protection)
  * L20: 119 = 31 (level) + 80 (pure adamantine full plate) + 8 (ring of protection)
* Cleric (+2 level)
  * L2: 8 = 3 (level) + 5 (scale mail)
  * L8: 23 = 9 (level) + 6 (breastplate) + 8 (mantle of faith)
  * L14: 60 = 20 (level) + 24 (pure deepforged breastplate) + 16 (mantle of faith)
  * L20: 108 = 40 (level) + 36 (ancient dragonscale breastplate) + 32 (mantle of faith)
* Rogue (+0 level)
  * L2: 4 = 1 (level) + 3 (chain shirt)
  * L8: 16 = 7 (level) + 3 (chain shirt) + 6 (resistant armor)
  * L14: 34 = 16 (level) + 6 (resistant+ chain shirt) + 12 (resistant+ armor)
  * L20: 67 = 31 (level) + 12 (resistant++ chain shirt) + 24 (resistant++ armor)
* Monk (+4 level)
  * L2: 8 = 5 (level) + 3 (ki barrier)
  * L8: 25 = 12 (level) + 9 (ki barrier)    + 4 (ring of protection)
  * L14: 58 = 25 (level) + 25 (ki barrier)  + 8 (ring of protection)
  * L20: 101 = 50 (level) + 35 (ki barrier) + 16 (ring of protection)
* Sorcerer (+4 level)
  * L2: 6 = 5 (level) + 1 (mage armor)
  * L8: 22 = 12 (level) + 6 (mage armor)   + 4 (ring of protection)
  * L14: 43 = 25 (level) + 10 (mage armor) + 8 (ring of protection)
  * L20: 87 = 50 (level) + 21 (mage armor) + 16 (ring of protection)

### New System Calculated

* Fighter
  * L2: 8 = 8 (layered hide)
  * L8: 18 = 12 (full plate) + 6 (resistant armor)
  * L14: 52 = 48 (adamantine full plate) + 4 (ring of protection)
  * L20: 104 = 96 (pure adamantine full plate) + 8 (ring of protection)
* Cleric
  * L2: 6 = 6 (scale mail)
  * L8: 16 = 8 (breastplate) + 8 (mantle of faith)
  * L14: 58 = 32 (pure deepforged breastplate) + 16 (mantle of faith)
  * L20: 80 = 48 (ancient dragonscale breastplate) + 32 (mantle of faith)
* Rogue
  * L2: 5 = 5 (chain shirt)
  * L8: 11 = 5 (chain shirt) + 6 (resistant effect)
  * L14: 22 = 10 (resistant+ chain shirt) + 12 (resistant+ effect)
  * L20: 44 = 20 (resistant++ chain shirt) + 24 (resistant++ effect)
* Sorcerer
  * L2: 3 = 3 (mage armor)
  * L8: 16 = 12 (mage armor) + 4 (ring of protection)
  * L14: 28 = 20 (mage armor) + 8 (ring of protection)
  * L20: 51 = 35 (mage armor) + 16 (ring of protection)
