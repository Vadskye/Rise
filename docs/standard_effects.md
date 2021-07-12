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

Debuff abilities get much better with higher tier debuffs. It's hard to justify using a daze
effect with +1 accuracy when you could use a stun effect instead. For that reason, non-damaging
debuffs get +1 accuracy per rank instead of a +1 accuracy per two levels scaling.

An ability's rank scaling should always be relevant to its glancing blow effect. It would be a
bad idea to have a spell with normal damage scaling use a glancing blow effect that does not
reduce its damage.

#### Spell vs maneuver scaling

Spells have very few mechanics for increasing their base damage dice in archetypes and feats. In
general, their only scaling comes from the spells themselves, so the rank upgrades carry a lot of
the weight for keeping them relevant. Therefore, they increase at +1d per rank.

Maneuvers have a more complicated damage situation. They should feel different from spells, and
there are several abilities that give ordinary strikes that should have some level of scaling into
higher levels. Therefore, martial classes need to grant more static bonuses to damage with all
strikes and mundane abilities. That leaves relatively little room for rank upgrades to damaging
maneuvers.

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
* For combination damage/debuff effects, damage penalties still allow the debuff to be
  applied, while accuracy penalties make the whole ability likely to be useless. Therefore:
  * Damage/debuff effects should generally have damage penalties instead of accuracy penalties
  * Damage/debuff effects should generally have accuracy bonuses instead of damage bonuses

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

### Debuff ranks
Note: This is duplicated in the Metacaster feat.
Each debuff rank is +4 spell ranks over its predecessor

* Rank 0
  * Generally do relatively little
  * List: deafened, prone
* Rank 1
  * Generally give -2 to a category (accuracy/defenses)
  * List: Dazed, dazzled, shaken (-1 level due to proximity), sickened, slowed
  * Special: end of round low damage (remove if vital, DR 10 check to remove)
* Rank 2
  * Generally give -4 to a category (accuracy/defenses)
  * List: decelerated, frightened (-1 level due to proximity), nauseated, generic -2 to all, stunned, fighting underwater
  * Special: end of round low damage (remove if vital)
* Rank 3
  * Generally cause partial action denial
  * List: confused, blinded, disoriented, immobilized, panicked (-1 level due to proximity)
* Rank 4
  * Generally cause complete action denial
  * List: Asleep, paralyzed

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
  * Medium: (weapon damage dice) + (half power) OR (weapon damage dice -2d) + (power)
    * For AOE, use half power instead of -2d because large weapons feel like they should generally be
      better at AOE. If the weapon damage dice were reduced but you still added full power, it would
      be worse for large weapons than for small weapons, which seems odd. Large weapons should
      generally be better for damage, including AOE, since small weapons are generally better for
      applying debuffs and special effects.
    * For debuffs, use -2d and full power.
  * Low: (weapon damage dice -2d) + (half power)
* Non-strike-based attacks:
  * High: (1d8 + 1d per rank) + (power)
  * Medium: (1d6 + 1d per rank) + (half power)
  * Low: (1d4 + 1d per rank)

## Stock effects

### Standard level modifiers

Note that these are used for determining the levels of new effects, not rank upgrades. Rank upgrades
have their own logic which may differ significantly from this.

* Both strike-based and non-strike-based:
  * +0 levels: trade -1a for +1d or vice versa
  * +0 levels: trade -1a/-1d for minor benefit
  * +0 level: add specific crit effect to non-damaging effect; standard crit effects:
    * +1 rank debuff that replaces existing debuff
    * +0 rank debuff in addition to existing debuff, removed at the same time
    * condition must be removed twice before it is gone
  * +1 levels: +1a (non-damaging debuffs)
  * +1 levels: convert condition to poison (including poison crit and +1r debuff on third stage)
  * +1 level: convert condition to curse (including replacing crit effect)
    * It's possible that this should be +2 levels, but the curse crit effect is worse than a
      standard crit effect, so it might also be fine
  * +2 levels: +1a (damaging attacks, damaging debuffs)
  * +2 levels: +1d (above standard rank progression, if any)
  * +3 levels: +1 rank to debuff
  * +3 levels: Add additional debuff of the same rank removed at the same time as existing debuff
  * +3 levels: increase one damage tier (low -> medium -> high); only for Finisher attacks
  * +3 levels: add r1 debuff on losing HP to a high damage attack
  * +4 levels: convert eonr area debuff to attuned autoattack with repeat immunity (Divine Presence)
* Non-strikes only:
  * +0 levels: add glancing blow mechanic (min rank 3)
    * Mathematically, this should be +2 levels to match +1 accuracy. However, at high levels the game
      plays better if this effect is common, so it's free.
    * This should not be found on spells below rank 3 to make sure the game plays differently at
      different levels, and to solve accuracy-related math.
  * +1 level: enemies only
    * This is free for abilities around self, because those abilities would otherwise be
      virtually useless
  * +1 level: +1 area size
  * +1 level: +1 range (not applicable to effects that intrinsically scale with range, like teleportation)
  * +1 level: Increase line width by 5'
  * +1 level: convert ability to attunement, no-focus, no-component standard action
  * +2 level: +1 range (for effects that intrinsically scale with range, like teleportation)
  * +2 level: remove Focus tag (dangerous; only for narratively relevant spells)
* Strikes only:

### Standard areas:
Tier 0 areas:
* Tiny radius from self
* Small line, 5' wide from self

Tier 1 areas:
* Small cone from self
* Medium line, 5' wide from self
* Small line, 10' wide from self
* Small radius from self
  * This is obviously a larger area than a cone or line, but is also much harder to aim to only hit enemies
* Enemies in Tiny radius from self
* Tiny radius in Short range
  * This should be rare, since it's more flexible than other tier 1 ranges but is too weak for tier 2

Tier 2 areas:
* Medium cone from self
* Large line, 5' wide from self
* Medium line, 10' wide from self
* Medium radius from self
* Enemies in Small radius from self
* Tiny radius in Med range
* Small radius in Short range

Tier 3 areas:
* Large cone from self
* Large line, 10' wide from self
* Large radius from self
* Enemies in Medium radius from self
* Small radius in Med range

Tier 4 areas:
* Huge line, 10' wide from self
* Large line, 15' wide from self
* Enemies in Large radius from self
* Medium radius in Med range
* Enemies in Small radius in Med range
* Small radius in Long range
* Tiny radius in Distant range

Tier 5 areas:
* Huge cone from self
* Huge radius from self
* Huge line, 15' wide from self
* Medium radius in Long range
* Small radius in Distant range
* Tiny radius in Long range

Tier 6 areas:
* Enemies in Huge radius from self
* Medium radius in Distant range
* Small radius in Extreme range

Tier 7 areas:
* Huge radius in Long range
* Medium radius in Extreme range

### Standard effects

#### Pure damage

Maneuvers
* Rank 1
  * Strike with -2 acc, +2d
  * Strike with +3 acc, -2d
  * Strike with -1d, move half speed
  * Strike with -1d, attack Fort or Ref defense
* Rank 2
  * AOE: strike against ~5 targets, half power
  * Strike with weird random benefit (reroll miss chance)
* Rank 3
  * Strike with +1d or +1 acc
* Rank 5
  * Strike with +2d or +2 acc
* Rank 7
  * Strike with +3d or +3 acc

Spells: Single Target
* Rank 1
  * Med range, 1d10 + power
  * t1 area, 1d8 + half power
* Rank 2
  * Close range, 2d8 + power
* Rank 3
  * Med range, 2d10 + power
  * t1 area, 2d8 + half power
* Rank 4
  * Close range, 4d8 + power
* Rank 5
  * Med range, 4d10 + power
  * t1 area, 4d8 + half power

Spells: AOE
* Rank 1
  * t1 area, 1d8 + half power
* Rank 5
  * t1 area, 4d6 + power

#### Pure debuff

Spells: Single-target debuff
* Rank 1
  * Med range, condition: r1 debuff, or r2 on crit
  * Med range, condition: r2 debuff while no DR, must remove twice on crit
* Rank 3
  * Med range, curse: r1 debuff, lasts forever on crit
  * Med range, condition: r1 debuff while DR, or r2 debuff while no DR, must remove twice on crit
    * This is worse than a damage + debuff in that it doesn't deal damage, but better in that you can pre-cast it and have the full effect become active later
* Rank 5
  * Med range, condition: r2 debuff, or r3 on crit
  * Med range, condition: r3 debuff while no DR, must remove twice on crit
  * Med range, curse: r1 debuff while DR, or r2 debuff while no DR, lasts forever on crit
* Rank 7
  * Med range, curse: r2 debuff, lasts forever on crit
  * Med range, curse: r3 debuff while no DR, lasts forever on crit
  * Med range, condition: r2 and r1 debuff, must remove twice on crit
  * Med range, condition: r2 debuff while DR, or r3 debuff while no DR, must remove twice on crit

Spells: AOE debuff
The minimum area size here should be a t2 area to make these feel different from single-target
* Rank 1
  * t3 area, brief r1 debuff, condition on crit
  * t3 area, brief r2 debuff if no DR, condition on crit
* Rank 2
  * t2 area, brief r1 debuff if DR or r2 debuff if no DR, condition on crit
* Rank 4
  * t2 area, brief r3 debuff if no DR, condition on crit
  * t2 area, brief r2 debuff, condition on crit
* Rank 6
  * t2 area, brief r2 debuff if DR or r3 debuff if no DR, condition on crit

#### Hybrid damage/debuff

Maneuvers: single-target medium damage + debuff
* Rank 3
  * Strike with -2d, brief r1 debuff if lose HP
* Rank 6
  * Strike with -2d, brief r1 debuff
* Rank 7
  * Strike with -2d, brief r2 debuff if lose HP

Spells: single-target medium damage + debuff
* Rank 1
  * Med range, 1d8 + half power damage, brief r1 debuff if lose HP
* Rank 4
  * Med range, 2d8 + half power damage, brief r1 debuff
* Rank 5
  * Med range, 2d10 + half power damage, brief r2 debuff if lose HP
* Rank 6
  * Med range, 4d6 + half power damage, brief r2 debuff if lose HP, otherwise r1 debuff
* Rank 7
  * Close range, 4d8 + half power damage, brief r2 debuff

Maneuvers: single-target low damage + debuff
* Rank 1
  * Strike with -2d, r1 debuff condition if lose HP
* Rank 3
  * Strike with -2d and half power, r2 debuff condition if lose HP
* Rank 5
  * Strike with -2d and half power, r2 debuff condition if lose HP, otherwise r1 debuff condition
* Rank 7
  * Strike with -2d and half power, r3 debuff condition if lose HP

Spells: single-target low damage + debuff
* Rank 1
  * Med range, 1d6 damage, r2 debuff condition if lose HP
* Rank 3
  * Med range, 1d10 damage, r2 debuff condition if lose HP, otherwise r1 debuff condition
* Rank 5
  * Med range, 2d8 damage, r3 debuff condition if lose HP
* Rank 7
  * Med range, 4d6 damage, r3 debuff condition if lose HP, otherwise r2 debuff condition
