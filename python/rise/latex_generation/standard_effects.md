# Standard spell and maneuver effects

## Range balancing

Standard range = Med range for spell, melee/ranged for martial

Martials have five delivery options:
* Sword and shield = +2 Armor
* 2h sword = +1d damage
* Bow = Med+ range
* Dual wield medium = +0.5 accuracy
* Dual wield light = +2.5 accuracy, -1d damage

This means that an effect martials can get at weapon range is equivalent to a Medium range spell.

However, martials and casters *do* have different balancing for very close range effects, like AOE
from self effects.
Even ignoring somatic component failure, casters have to concentrate to cast spells, so they should
generally have slightly stronger effects with strictly close range effects.

## Accuracy vs. damage tradeoffs

In general, +1 accuracy = +1 damage. However, there are exceptions:
* For AOE damage effects, damage penalties can make them pointless, while accuracy penalties make
  them still useful against swarms of weak enemies
  * AOE damage effects should generally have accuracy penalties instead of damage penalties
  * AOE damage effects should generally gain damage bonuses instead of accuracy bonuses
* For combination damage/condition effects, damage penalties still allow the condition to be
  applied, while accuracy penalties make the whole ability likely to be useless
  * Damage/condition effects should generally have damage penalties instead of accuracy penalties
  * Damage/condition effects should generally have accuracy bonuses instead of damage bonuses

## Condition ranks

* Rank 1
  * Generally give -2 to a category (accuracy/defenses)
  * List: dazed, fatigued, ignited, sickened, slowed
* Rank 2
  * Generally give -4 to a category (accuracy/defenses)
  * List: decelerated, exhausted, frightened, nauseated
* Rank 3
  * Generally cause partial action denial
  * List: confused, immobilized
* Rank 4
  * Generally cause complete action denial
  * List: paralyzed, panicked, stunned

## Stock spell effects

For spell effects that only deal damage, "deal standard damage" can be replaced with "inflict r1
condition".

1st level spell / rank 1 maneuver / level 1 feat ability:
* Shared:
  * Self-only:
    * Remove condition
    * Heal std +1d
    * Take half damage
  * Single-target:
    * Deal std +1d/+1a in std range
    * Deal std -2d in std range and apply r1 condition
    * Deal conditional std +2d/+2a in std range
    * Heal std in std range
    * 
  * AOE:
    * Heal std damage -2d to all within Medium radius from you
* Spells only:
  * Single-target:
    * Deal std in long range
  * AOE:
    * Deal std to all within Med line (5' wide)
    * Deal std -1a to all within Med cone / Med line (10' wide)
    * Deal std -1d/-2a to all within Small radius in Close range
    * Deal std -1d/-2a to enemies within Small radius from you
    * Deal std to all within Small radius from you
* Maneuvers only:
  * AOE:
    * Deal std to 2 in reach
    * Deal std to all within Med line (5' wide)
    * Deal std -1a to any number in reach
    * Deal std -1a/-1d to all within Med cone / Med line (10' wide)

2nd level spell / rank 3 maneuver / level 4 feat ability:
* Shared:
  * Single-target:
    * Remove condition in close range
* Spells only:
  * Single-target:
    * Deal std +1d to 1 in close range
  * AOE:
    * Deal std to all within Small radius in Close range

4th level spell / rank 5 maneuver / level 10 feat ability:
* Shared:
  * Single-target:
    * r2 condition in std range
  * AOE:
    * Remove condition from non-self in Med radius from you

## Standard level modifiers

* Shared:
  * +2 levels: +1a/+1d with other minor buff
  * +2 levels: +1 area size with other minor benefit
  * +2 levels: +1 rank to condition
  * +2 levels: Add crit-only +2r condition
* Spells only:
  * +1 level: remove -1 or -2 accuracy or damage penalty
  * +1 level: +1 range increment
  * +3 levels: +2 area size
  * +3 levels: +2a/+2d
  * +3 levels: Add r1 condition to damaging effect
* Maneuvers only:
  * Assuming unrelated ability at +2 ranks:
    * +4 ranks: +2a/+2d
    * +4 ranks: +2 area size
    * +4 ranks: Add r1 condition to damaging effect
