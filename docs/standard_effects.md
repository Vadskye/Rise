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
In practice, it is difficult to disentangle the effects of close range from the effects of other
elements of spells, since they all trade off against each other.
The way the system currently represents this is by giving spells an extra +1 level of effects for
AOE effects.

### Radius from self effects
Normally, a radius is a stronger effect than a line or cone because it hits a larger area.
However, when using a radius from self, it's actually weaker because it removes your ability to avoid hitting allies.
For this reason, all radius from self abilities can get the "exclude enemies" effect at no extra
cost.

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

* Rank 0
  * Generally do relatively little
  * List: deafened, prone
* Rank 1
  * Generally give -2 to a category (accuracy/defenses)
  * List: dazed, fatigued, ignited, sickened, slowed
* Rank 2
  * Generally give -4 to a category (accuracy/defenses)
  * List: decelerated, exhausted, frightened, nauseated, generic -2 to all
* Rank 3
  * Generally cause partial action denial
  * List: confused, blinded, disoriented, immobilized
* Rank 4
  * Generally cause complete action denial
  * List: paralyzed, panicked, stunned

## Damage type modifiers

* Physical damage: +0d
* Energy damage: +0d
* Untyped damage: -1d

## Stock spell effects

For spell effects that only deal damage, "deal standard damage" can be replaced with "inflict r1
condition".

1st level spell / rank 1 maneuver / level 1 feat ability:
* Shared:
  * Self-only:
    * Remove condition
    * Take half damage
  * Single-target:
    * Deal std +1d/+1a in std range
    * Deal std -2d in std range and apply r1 condition
    * Deal conditional std +2d/+2a in std range
    * Heal std +1d in std range
    * r1 condition with r3 crit-only condition in std range
    * r2 condition in close range
  * AOE:
    * Heal std damage -2d to all within Med radius from you
* Spells only:
  * Single-target:
    * Deal std in long range
  * AOE:
    * Deal std to all within Med/10 line from you
    * Deal std to all within Med cone from you
* Maneuvers only:
  * AOE:
    * Deal std to 2 in reach
    * Deal std to all within Med/5 line
    * Deal std -1a to any number in reach
    * Deal std -1a/-1d to all within Med cone or Med/10 line

2nd level spell / rank 3 maneuver / level 4 feat ability:
* Special notes
  * The gap between 1st level spells / rank 1 maneuvers and 2nd level spells / rank 3 maneuvers
    works differently than the gaps between other levels
    * For spells, 1st level spells are farther apart from 2nd level spells than 2nd is from 3rd, so
      they should generally be a slightly larger upgrade than normal; in general, this doesn't
      require any specific effort, because this follows naturally from how linear progression works
    * For maneuvers, 1st rank maneuvers are closer to 3rd rank maneuvers than 3rd rank maneuvers are
      to 5th rank maneuvers, so the first upgrade should be smaller than the other two; this
      requires thought to make the upgrade weaker than the normal +2 spell level bump
* Shared:
  * Single-target:
    * Remove condition in close range
    * r2 condition in std range
* Spells only:
  * Single-target:
    * Deal std +2d to 1 in melee range
  * AOE:
    * Deal std to all within Large/10 line from you
    * Deal std to all within Small radius in Close range
    * Deal std to enemies within Med radius from you
    * Deal std to all within Med/5 line entirely within Med range

3rd level spell:
* Spells only:
  * Single-target:
    * Deal std damage and r1 condition
  * AOE:
    * Deal std to all within Large/15 line from you
    * Deal std to all within Large cone from you
    * Deal std to all within Small radius in Med range

4th level spell / rank 5 maneuver / level 10 feat ability:
* Shared:
  * Single-target:
    * r3 condition in std range
  * AOE:
    * Remove condition from non-self in Med radius from you
    * Deal std to all within Huge/15 line from you
    * Deal std to enemies within Large radius from you
    * Deal std to all within Large/10 line entirely within Med range
    * Deal std to all within Med radius in Med range
* Maneuvers only:
  * AOE: see 3rd level spell AOE

5th level spell / level 13 feat ability:
* Spells only:
  * AOE:
    * Deal std to all within Huge/20 line from you
    * Deal std to all within Huge cone from you
    * Deal std to all within Med radius in Med range

6th level spell / rank 7 maneuver / level 16 feat ability:
* Shared:
  * AOE:
    * Deal std to all within Huge radius from you

## Standard level modifiers

* Real costs
  * +1.5 levels: +1a/+1d
* Shared:
  * +0 levels: trade -1a/-1d for minor benefit
  * +2 levels: +1a/+1d with other minor buff
  * +2 levels: +1 area size
  * +2 levels: +1 rank to condition
  * +2 level: Add additional +0r condition removed at the same time as existing condition
* Spells only:
  * +1 level: Add crit-only +2r condition that replaces existing condition
  * +1 level: Add crit-only +1r condition in addition to existing condition
  * +1 level: selective targets instead of all targets
  * +1 level: remove -1 accuracy or damage penalty
  * +1 level: +1 range increment
  * +1 level: Increase line width by 5'
  * +1 level: Add additional -1r condition removed at the same time as existing condition
  * +1 level: Add Sustain (standard) to instant damaging effect
  * +2 levels: Add Sustain (minor) to instant damaging effect
  * +3 levels: +2a/+2d
  * +3 levels: Add r1 condition to damaging effect
* Maneuvers only:
  * Assuming unrelated ability at +2 ranks:
    * +4 ranks: +2a/+2d
    * +4 ranks: Add r1 condition to damaging effect
