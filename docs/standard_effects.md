# Standard spell and maneuver effects

## Philosophy and guidelines

### Rank upgrades and ability scaling

#### Context

In general, character power should increase nonlinearly over time. Part of this comes from damage,
which should double every 6 levels. For this reason, the overall power of active abilities should
increase nonlinearly over time in a way that's tricky to represent with automatic rank upgrades.

In addition, players should feel excited about getting access to new abilities. If you use a rank 1
spell from level 1 through level 20, you've lost some of the excitement of novelty from acquiring
new abilities.

More complex rank upgrades can solve this problem, but in general rank upgrades can be tricky. Each
rank upgrades creates an unwritten new spell that comes from combining the original text of the
spell with the text of the rank upgrade. If you layer multiple rank upgrades of even moderate
complexity, it can be hard to understand the overall effect of the new spell.

#### Scaling guidelines

Each automatic rank upgrade should be enough to keep the spell interesting for the next
few ranks, but it should gradually off in value over time relative to other options. Rank upgrades
should be minimally complicated, and generally limited to increasing damage, area, and so on. If a
spell has multiple explicit rank upgrades, each successive rank upgrade should revise the previous
rank upgrade, rather than having each one layer on additional complexity to the effect.

Each unique spell or ability should have an upgraded version either 2 or 3 ranks ahead to ensure a
fairly consistent progression. These upgrades should avoid being simply "Foo, Greater"; they should
push the effect in more specific and narratively interesting directions, since rank 1 effects tend
to be fairly limited in scope and complexity by design. It's reasonable to have two different
upgrades for the same basic effect that push it in different directions.

Class abilities like Sneak Attack or Smite need unusually powerful rank upgrade mechanics to
compensate for their lack of replacement abilities.

AOE softener abilities generally don't really do a lot even if they succeed, and they quickly scale
out of being worth the action they take. For that reason, they get +2 accuracy bonuses with each
rank upgrade instead of a more common +1.

#### Spell vs maneuver scaling

Spells have very few mechanics for increasing their base damage dice in archetypes and feats. In
general, their only scaling comes from the spells themselves, so the rank upgrades carry a lot of
the weight for keeping them relevant. Therefore, they increase at +1d per rank.

Maneuvers have a more complicated damage situation. They should feel different from spells, and
there are several abilities that give ordinary strikes that should have some level of scaling into
higher levels. Therefore, martial classes need to grant more static bonuses to damage with all
strikes and mundane abilities. That leaves relatively little room for rank upgrades to damaging
maneuvers.

#### Finisher condition scaling
Strike-based abilities that inflict finisher conditions do not have explicit scaling, so they
implicitly scale their damage.
Non-strike-based abilities that inflict finisher abilities don't really have any purpose to
increasing their damage; that's not really the point of finisher abilities. Instead, they should
scale their accuracy, area, or other benefits.

#### Rank text references

References to your rank should be isolated to the rank upgrade text where possible. If abilities
reference rank too directly in their core description, it can be hard to look at a new ability and
figure out what its actual effect is.

#### Cantrip scaling

Cantrips often have weird narrative abilities that aren't a good fit for proper spells. No one wants
invest a high level spell known into "Create Lots of Water". Therefore, cantrips should have more
aggressive rank scaling to keep them relevant at higher levels.

### Range balancing

Standard range = Med range for spell, melee/ranged for martial

Martials have five delivery options:
* Sword and shield = +2 Armor
* 2h melee = +1d damage, 1.5x power
* Dual wield light = +2 accuracy, -1d, 1.5x power
* Bow = Med+ range
* Dual wield medium = +0.5 accuracy

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

### Accuracy vs. damage tradeoffs

Further testing is needed to compare accuracy and damage. It seems plausible that +1 accuracy = +2d
damage in general. In any case, there are some exceptions:
* For AOE damage effects, damage penalties can make them pointless, while accuracy penalties make
  them still useful against swarms of weak enemies. Therefore:
  * AOE damage effects should generally have accuracy penalties instead of damage penalties
  * AOE damage effects should generally gain damage bonuses instead of accuracy bonuses
* For combination damage/condition effects, damage penalties still allow the condition to be
  applied, while accuracy penalties make the whole ability likely to be useless. Therefore:
  * Damage/condition effects should generally have damage penalties instead of accuracy penalties
  * Damage/condition effects should generally have accuracy bonuses instead of damage bonuses

### Focus spells vs maneuvers

Maneuvers pay a two-rank penalty in their effects to make up for the fact that they don't have the
Focus tag.
Spells cost +4 levels to remove the Focus tag, because if they were able to remove the Focus tag at
no relative level cost then there would be no reason to have maneuvers.

### Non-choice effects

Non-choice effects gain a two-rank bonus to their effects relative to choice-based effects like
spells and maneuvers.
This represents the increased power granted to highly specialized characters; a character with a
"Healer" archetype should have access to more powerful healing effects than a spellcaster who
invests an insight point or two into healing spells.
Non-choice effects should generally not have the Focus tag, because the total +4 level difference
could give access to powerful abilities dangerously early for dedicated characters.

### Condition ranks
Note: This is duplicated in the Metacaster feat.

* Rank 0
  * Generally do relatively little
  * List: deafened, prone
* Rank 1
  * Generally give -2 to a category (accuracy/defenses)
  * List: dazed, dazzled, sickened, slowed
* Rank 2
  * Generally give -4 to a category (accuracy/defenses)
  * List: exhausted, frightened, nauseated, generic -2 to all, ignited (move action to remove), stunned, fighting underwater
* Rank 3
  * Generally cause partial action denial
  * List: decelerated, confused, blinded, disoriented, ignited, immobilized, panicked
* Rank 4
  * Generally cause complete action denial
  * List: Asleep, paralyzed

#### End of next round effects

A enemies-only rank 1 debuff until eonr with the same rank 1 condition on a crit
is -4 ranks relative to a standard damage attack.

### Effect categories

There are three basic types of effects:

* Softener: These effects are designed to weaken strong targets so they are easier to defeat.
They tend to have accuracy bonuses and deal small amounts of damage or apply debuffs that work
through resistances. In general, AOE softener effects are slightly oxymoronic - if you're fighting
large groups of enemies, a softener isn't generally worth the effort. Therefore, AOE softeners
shouldn't apply conditions, which are a hassle to track against large groups anyway. Instead, AOE
softeners should apply debuffs that apply until the end of the next round. AOE softener effects also
therefore are the one exception to the universal glancing blow rule, since it's hard to make those
effects weaker than they already are.
  * Examples: Certain Strike
* Damage: These effects work at any stage of a fight. They reduce resistances and finish off weak
  targets, but aren't as efficient at weakening strong targets as softener effects and they aren't
  as efficient at finishing off weakened targets as finisher effects.
* Finisher: These effects only work later in a fight, either due to lowered defenses or lowered
  resistances. They may inflict strong debuffs or unusually high damage values, but with accuracy
  penalties or, more commonly, requirements to only work on targets without resistances. Finisher
  effects may deal incidental damage to check that the target has no resistances.

### Standard damage categories

There are three standard categories of damage: high, medium, and low.
Broadly, Medium corresponds to 75% of the damage of High, and Low is about 50%.
AOE attacks should use Medium, since splitting damage between multiple targets is tactically worse
than doing the same amount of damage to a single target, and they're also useless in some
situations.

* Strike-based attacks:
  * High: (weapon damage dice) + (power)
  * Medium: (weapon damage dice) + (half power)
    * This uses half power instead of -2d because large weapons feel like they should generally be
      better at AOE. If the weapon damage dice were reduced but you still added full power, it would
      be worse for large weapons than for small weapons, which seems odd. Large weapons should
      generally be better for damage, including AOE, since small weapons are generally better for
      applying conditions and special effects.
  * Low: (weapon damage dice -2d) + (half power)
* Non-strike-based attacks:
  * High: (1d8 + 1d per rank) + (power)
  * Medium: (1d6 + 1d per rank) + (half power)
  * Low: (1d3 + 1d per rank)

## Stock effects

### Rank 1 standard effects

### Strike-based

Rank 1 maneuver:
* Softener:
  * Make a strike with +2a, low damage
* Damage:
  * Make a strike against Fort/Ref defense
  * Make a strike with a highly circumstantial benefit (reroll miss chance)
* Finisher:
  * low damage, r2 condition if lose HP

### Non-strike-based

Rank 1 Focus/non-upgrading, Rank 3 maneuver:
* Softener:
  * Med range: r1 condition
  * Large cone from self: r1 eonr, condition on crit
  * Large line, 10' wide, from self: r1 eonr, condition on crit
  * Enemies in Medium radius from self: r1 eonr, condition on crit
  * Small radius in Med range: r1 eonr, condition on crit
* Damage:
  * Med range: high damage
  * Med cone from self: medium damage
  * Med line, 10' wide, from self: medium damage
  * Enemies in small radius from self: medium damage
  * Small radius in Med range: medium damage
* Finisher:
  * Med range: +1a, low damage, r2 condition if lose HP
  * Med cone from self: r2 condition if no resistances
  * Med line, 10' wide, from self: r2 condition if no resistances
  * Small radius around self: r2 condition if no resistances
  * Small radius in Med range: r2 condition if no resistances

### Standard level modifiers

Note that these are used for determining the levels of new effects, not rank upgrades. Rank upgrades
have their own logic which may differ significantly from this.

* Both strike-based and non-strike-based:
  * +0 levels: trade -1a for +1d or vice versa
  * +0 levels: trade -1a/-1d for minor benefit
  * +2 levels: +1 area size
  * +2 levels: +1a/+1d (above standard rank progression, if any)
  * +2 levels: convert condition to curse
  * +3 levels: +1 rank to condition
  * +3 levels: Add additional condition of the same rank removed at the same time as existing condition
  * +3 levels: increase one damage tier (low -> medium -> high); only for Finisher attacks
* Non-strikes only:
  * +0 levels: add glancing blow mechanic
    * Mathematically, this should be +2 levels to match +1 accuracy. However, at high levels the game
      plays better if this effect is common, so it's just free for rank 3 or higher abilities.
    * This should not be found on spells below rank 3 to make sure the game plays differently at
      different levels, and to solve accuracy-related math.
  * +1 levels: enemies only
    * This is free for abilities around self, because those abilities would otherwise be
      virtually useless
  * +1 level: Add crit-only +2r condition that replaces existing condition
  * +1 level: Add crit-only +1r condition in addition to existing condition
  * +1 level: +1 range increment
  * +1 level: Increase line width by 5'
  * +1 level: Add additional -1r condition removed at the same time as existing condition
* Strikes only:

### Higher rank specific examples

Rank 3 Focus/non-upgrading, Rank 5 maneuver:
* Softener:
  * r1 curse in medium range
* Finisher:


Rank 4 Focus/non-upgrading, Rank 6 maneuver:
* Softener:
  * Med range: r2 condition in medium range

Rank 5 Focus/non-upgrading, Rank 7 maneuver:
* Finisher:
  * Med range: high damage, r2 condition if lose HP

Rank 6 Focus/non-upgrading:
* Softener:
  * Med range: r2 curse
* Finisher:




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

# Magic items

A magic item of a given level should generally function as if you had a tiny spellcaster nearby who
was 3 levels lower than the magic item's level casting a relevant spell.

This means that magic items can often mimic spell effects, but only Attune (target) effects, not
Attune (self) effects. They should generally not have rank upgrades at all, and to the extent that
they have rank upgrades, the upgrades should match those that a spellcaster 3 levels lower would
have.
