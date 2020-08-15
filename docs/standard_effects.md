# Standard spell and maneuver effects

## Ability scaling

In general, automatic rank upgrades should be similar to to a normal spell of the higher level, but
slightly weaker. In general, high level spells should come with additional narrative effects, small
bonuses, and half-rank upgrades to make them more appealing and compensate for the downside of using
abilities that can't be augmented or upgraded. This is especially true for damaging effects, since
debuff abilities already have nonlinear scaling in a way that pure damage spells do not.

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

## Focus spells vs maneuvers

Maneuvers pay a two-rank penalty in their effects to make up for the fact that they don't have the
Focus tag.
Spells cost +4 levels to remove the Focus tag, because if they were able to remove the Focus tag at
no relative level cost then there would be no reason to have maneuvers.

## Non-choice effects

Non-choice effects gain a two-rank bonus to their effects relative to choice-based effects like
spells and maneuvers.
This represents the increased power granted to highly specialized characters; a character with a
"Healer" archetype should have access to more powerful healing effects than a spellcaster who
invests an insight point or two into healing spells.
Non-choice effects should generally not have the Focus tag, because the total +4 level difference
could give access to powerful abilities dangerously early for dedicated characters.

## Condition ranks
Note: This is duplicated in the Metacaster feat.

* Rank 0
  * Generally do relatively little
  * List: deafened, prone
* Rank 1
  * Generally give -2 to a category (accuracy/defenses)
  * List: dazed, fatigued, sickened, slowed
* Rank 2
  * Generally give -4 to a category (accuracy/defenses)
  * List: exhausted, frightened, nauseated, generic -2 to all, ignited (move action to remove), stunned
* Rank 3
  * Generally cause partial action denial
  * List: decelerated, confused, blinded, disoriented, ignited, immobilized, panicked
* Rank 4
  * Generally cause complete action denial
  * List: Asleep, paralyzed

## Stock effects

For effects that only deal damage, "deal standard damage" can be replaced with "inflict r1
condition".

Rank 1 non-Focus:
* AOE:
  * Deal std -1d to all in Small cone
  * Deal std -1d to all within Small/5 line
  * Deal std to 2 in reach
  * Deal std -1a to any number in reach
  * Deal std -1a/-1d to all within Med cone or Med/10 line
  * r1 condition until eonr or r1 condition on crit vs enemies in Medium radius from you

Rank 2 non-Focus:
* AOE:
  * Deal std -1d to all within Med/5 line
  * Deal std -1d to all within Small radius from you?

Rank 1 Focus/non-choice; Rank 3 non-Focus:
* Self-only:
  * Remove condition
  * Take half damage
* Single-target:
  * Deal std +1d/+1a in std range
  * Deal conditional std +2d/+2a in std range
  * Heal one hit point in close range
  * r1 condition with r3 crit-only condition in std range
  * Deal std in long range
* AOE:
  * r1 condition until eonr or r1 condition on crit vs enemies in Medium radius in std range
  * Deal std -1d to all within Med/10 line from you
  * Deal std -1d to all within Med cone from you
  * Deal std -1d to enemies within Small radius from you

Rank 2 Focus/non-choice; Rank 4 non-Focus:
* Special notes
* No actual rank 2 spells or maneuvers should exist, because they are insufficiently different
  from rank 1 abilities. This is more of an abstract concept that guides leveling.
* Shared:
* Single-target:
  * Remove condition in close range
  * r2 condition in close range
* Spells only:
* Single-target:
  * Deal std +2d to 1 in melee range
* AOE:
  * Deal std -1d to all within Large/5 line from you
  * Deal std -1d to all within Med/5 line entirely within Close range
  * Deal std -1d to all within Small radius in Close range

Rank 3 Focus/non-choice; Rank 5 non-Focus:
* Spells only:
* Single-target:
  * Deal std -2d in std range and apply r1 condition
  * Deal std in extreme range
  * r2 condition in std range
* AOE:
  * Heal one hit point to allies in Med radius from you
  * Deal std -1d to all within Large/10 line from you
  * Deal std -1d to all within Large cone from you
  * Deal std -1d to all within Small radius in Med range
  * Deal std -1d to enemies within Med radius from you

Rank 4 Focus/non-choice; Rank 6 non-Focus:
* Shared:
* Single-target:
  * Deal std damage -1d and r1 condition with r3 crit-only condition in std range
  * r2 condition with r4 crit-only condition in std range
* AOE:
  * Remove condition from non-self in Med radius from you
  * Deal std -1d to all within Large/15 line from you
  * Deal std -1d to all within Large/5 line entirely within Med range
  * Deal std -1d to all within Med radius in Close range
  * r2 condition until eonr or r2 condition on crit vs enemies in Medium radius in std range
* Maneuvers only:
* AOE: see 3rd level spell AOE

Rank 5 Focus/non-choice; Rank 7 non-Focus:
* Spells only:
* Single-target:
  * Deal std -1d in std range and apply r1 condition
  * r3 condition in close range
* AOE:
  * Heal two hit points to ally in Med range
  * Deal std -1d to all within Huge/10 line from you
  * Deal std -1d to all within Huge cone from you
  * Deal std -1d to enemies within Large radius from you
  * Deal std -1d to all within Med radius in Med range
  * r3 condition until eonr or r3 condition on crit vs enemies in Small radius in std range

Rank 6 Focus/non-choice; Rank 8 non-Focus:
* Shared:
* Single-target:
  * Deal std damage -1d and r2 condition in std range
  * r3 condition in std range
* AOE:
  * Deal std -1d to all within Huge radius from you
  * Deal std -1d to all within Huge/15 line from you

Rank 7 Focus:
* Shared:
* Single-target:
  * Deal std in std range and apply r1 condition
* AOE:
  * Deal std -1d to all within Huge/20 line from you
  * Deal std -1d to all within Ext/10 line from you
  * Deal std -1d to all within Med radius in Long range
  * Deal std -1d to all within Large radius in Med range
  * Deal std -1d to enemies within Huge radius from you
  * r3 condition until eonr or r3 condition on crit vs enemies in Medium radius in std range

Rank 8 Focus:
* Shared:
* Single-target:
  * r4 condition in close range
  * Deal std and r2 condition in std range

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

# Magic items

A magic item of a given level should generally function as if you had a tiny spellcaster nearby who
was 3 levels lower than the magic item's level casting a relevant spell.

This means that magic items can often mimic spell effects, but only Attune (target) effects, not
Attune (self) effects. They should generally not have rank upgrades at all, and to the extent that
they have rank upgrades, the upgrades should match those that a spellcaster 3 levels lower would
have.
