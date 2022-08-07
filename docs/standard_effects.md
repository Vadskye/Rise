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

### Standard damage categories

There are three standard categories of damage: high, medium, and low.
Broadly, Medium corresponds to 75% of the damage of High, and Low is about 50%.
AOE attacks should use Medium, since splitting damage between multiple targets is tactically worse
than doing the same amount of damage to a single target, and they're also useless in some
situations.

* Strike-based attacks:
  * High: (weapon damage dice) + (power)
  * Medium: (weapon damage dice) + (half power)
  * Low: (weapon damage dice)
* Non-strike-based attacks:
  * High: (1d6 + 1d per rank) + (power)
  * Medium: (1d4 + 1d per rank) + (half power)
  * Low: (1d3 + 1d per rank)

## Stock effects

### Debuff ranks
Note: This is duplicated in the Metacaster feat.
Each debuff rank is +4 spell ranks over its predecessor

* Rank 0
  * Generally do relatively little
  * List: deafened
* Rank 1
  * Generally give -2 to a category (accuracy/defenses)
  * Goaded and shaken have proximity requirements, but also debuffing accuracy is scary, so they are considered the same rank as others in this tier
  * List: Dazed, dazzled, goaded, shaken, slowed, prone (brief = instant knockover only)
  * Special: end of round medium damage (DR 5/10 check to remove), unable to regain HP (-1 level), lose one attunement, enraged (cannot take non-attack actions)
* Rank 2
  * Generally give -4 to a category (accuracy/defenses)
  * List: frightened, stunned
  * Special: end of round medium damage, knockback 30', lose two attunements and be unable to attune as a condition
* Rank 2.5
  * List: fighting underwater, not existing
* Rank 3
  * Generally cause partial action denial or debilitating penalties
  * List: confused, blinded, immobilized, panicked, vulnerable to all damage
* Rank 4
  * Generally cause complete action denial
  * List: Asleep, paralyzed

### Standard level modifiers

Note that these are used for determining the levels of new effects, not rank upgrades. Rank upgrades
have their own logic which may differ significantly from this.

* Both strike-based and non-strike-based:
  * -2 levels: debuff is brief instead of condition (single-target only, can't be combined with HP loss trigger)
  * -2 levels: become immune to debuff after first success - only valid for non-HP brief debuffs
  * -4 levels: debuff only applies when the target loses HP from the attack
  * +0 levels: trade -1a for +1d or vice versa
  * +0 levels: trade -1a/-1d for minor benefit
  * +0 level: add specific crit effect to non-damaging effect; standard crit effects:
    * +1 rank debuff that replaces existing debuff
    * +0 rank debuff in addition to existing debuff, removed at the same time
    * condition must be removed twice before it is gone
  * +1 levels: +1a (any attack other than a high-damage attack)
  * +1 levels: convert condition to poison (including poison crit and +1r debuff on third stage)
  * +2 levels: +1a (high-damage attacks)
  * +2 levels: +1d (above standard rank progression, if any; spells only)
  * +4 levels: +1 rank to debuff
  * +4 levels: Add additional debuff of the same rank removed at the same time as existing debuff
* Non-strikes only:
  * +0 levels: add glancing blow mechanic (min rank 3)
    * Mathematically, this should be +2 levels to match +1 accuracy. However, at high levels the game
      plays better if this effect is common, so it's free.
    * This should not be found on spells below rank 3 to make sure the game plays differently at
      different levels, and to solve accuracy-related math.
  * +1 level: +1 range (not applicable to effects that intrinsically scale with range, like teleportation)
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

## Standard effects
AOE maneuvers can add full power instead of half power as long as they obey the -2 level rule
Single-target maneuvers that do not use weapons get +1d extra damage dice

Maneuvers that are rank 3 or lower scale their damage as +2 +5 +10 +15 +20.
Maneuvers that are rank 4 or higher scale their damage as +5 +10 +15 +20.

### Pure damage

#### Maneuvers
* Rank 1
  * Strike with -2 acc, +2d
  * Strike with +3 acc, -2d
  * Strike with -1d, move half speed
  * Strike, attack Fort or Ref defense
* Rank 2
  * AOE: strike against ~5 targets, half power
  * Strike with weird random benefit (reroll miss chance)
* Rank 3
  * Strike with +1d or +1 acc
* Rank 5
  * Strike with +2d or +2 acc
* Rank 7
  * Strike with +3d or +3 acc

#### Spells: Single target
* Rank 1
  * Med range, 1d10 + power
  * t1 area, 1d6 + half power
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
* Modifiers
  * "Med range" can be replaced with "Reach, no focus"

#### Spells: AOE
* Rank 1
  * t1 area, 1d6 + half power
* Modifiers
  * +4 levels gives +5d and full power instead of half power

#### Spells: Autoattack

* Rank 1
  * 1d8 damage as a non-action vs creatures in a Medium radius that made you lose HP (Deep)
  * 1d8 damage as a non-action vs adjacent creatures if you lose HP (Deep)
* Rank 3
  * 2d6 damage as a non-action vs creatures that attacked you in melee (Deep)
  * r1 debuff condition in Small radius as non-action, crit = remove twice, once per creature (Deep)
* Rank 4
  * 2d8 damage as a minor action vs one creature in short range (Deep)
  * Strike with -3 accuracy and no power as a minor action (Deep)
* Rank 6
  * 2d10 damage as a minor action vs everything in Small radius (Deep)
* Rank 7
  * r2 debuff condition in Small radius as non-action, once per creature (Deep)

### Pure debuff

#### Spells: Single-target debuff
* Rank 1
  * Med range, condition: r1 debuff, or r2 on crit
  * Med range, condition: r2 debuff while no DR, must remove twice on crit
    * This is worse than a damage + debuff in that it doesn't deal damage, but better in that you can pre-cast it and have the full effect become active later
* Rank 2
  * Med range, poison: r1 debuff, escalates to r2 on third stage
* Rank 3
  * Med range, curse: r1 debuff, lasts forever on crit
  * Med range, condition: r1 debuff while DR, or r2 debuff while no DR, must remove twice on crit
* Rank 5
  * Med range, condition: r2 debuff, or r3 on crit
  * Med range, condition: r3 debuff while no DR, must remove twice on crit
  * Med range, curse: r1 debuff while DR, or r2 debuff while no DR, lasts forever on crit
* Rank 6
  * Med range, poison: r2 debuff, escalates to r3 on third stage
* Rank 7
  * Med range, curse: r2 debuff, lasts forever on crit
  * Med range, curse: r3 debuff while no DR, lasts forever on crit
  * Med range, condition: r2 and r1 debuff, must remove twice on crit
  * Med range, condition: r2 debuff while DR, or r3 debuff while no DR, must remove twice on crit
* Modifiers
  * "while no DR" can be replaced with "while below max HP", which is worse against minions but better against blood mages and weird stuff

#### Spells: AOE debuff
For the purpose of pure debuffs, treat single-target Medium range as being a t0 area, and scale from there.
For AOE spells, brief r2 = condition r1
* Rank 1
  * t2 area: if no DR, brief r2 debuff, condition r1 debuff; on crit, works vs DR
  * t4 area, condition: r0 debuff, or r1 on crit
  * t4 area: brief r1 debuff, condition on crit
  * t4 area: brief r2 debuff if no DR, condition on crit
  * t2 area: brief r1 debuff if DR or r2 if no DR, condition on crit
* Rank 2
  * t1 area, condition: r1 debuff, or r2 on crit
  * t1 area, condition: r2 debuff while no DR, must remove twice on crit
    * This is worse than a damage + debuff in that it doesn't deal damage, but better in that you can pre-cast it and have the full effect become active later
  * t1 area: brief r2 debuff, condition on crit
  * t1 area: brief r3 debuff if no DR, condition on crit
* Rank 4
  * t1 area, curse: r1 debuff, lasts forever on crit
  * t1 area, condition: r1 debuff while DR, or r2 debuff while no DR, must remove twice on crit
  * t1 area: if no DR, brief r3 debuff, condition r2 debuff; on crit, works vs DR
  * t1 area: brief r1 debuff if DR or r2 if no DR, condition on crit
* Rank 6
  * t1 area, condition: r2 debuff, or r3 on crit
  * t1 area, condition: r3 debuff while no DR, must remove twice on crit
  * t1 area, curse: r1 debuff while DR, or r2 debuff while no DR, lasts forever on crit
  * t1 area: brief r3 debuff, condition on crit
* Modifiers
  * "while no DR" can be replaced with "while below max HP", which is worse against minions but better against blood mages and weird stuff

#### Spells: Attuned AOE debuff
The minimum area size here should be a t2 area to make these feel different from single-target
* Rank 3
  * t2 area, brief r1 debuff, condition on crit, immune after *attack* (not success)
* Rank 7
  * t2 area, brief r2 debuff, condition on crit, immune after *attack* (not success)

### Hybrid damage/debuff

For strikes, going from full power -> half power and half -> none buys +3 effect levels

#### Maneuvers: single-target high damage + debuff
* Rank 3
  * Strike, brief r0 debuff
  * Strike, brief r1 debuff if lose HP
* Rank 5
  * Strike, brief r1 debuff, immune after first success
  * Strike, r1 debuff condition if lose HP
* Rank 7
  * Strike, brief r1 debuff
  * Strike, brief r2 debuff if lose HP

#### Maneuvers: single-target medium damage + debuff
* Rank 1
  * Strike with half power, brief r0 debuff
  * Strike with half power, r1 debuff condition if lose HP
  * Strike with half power, brief r1 debuff, immune after first success
* Rank 3
  * Strike with half power, brief r1 debuff
  * Strike with half power, brief r2 debuff if lose HP
* Rank 5
  * Strike with half power, r1 debuff condition
  * Strike with half power, r2 debuff condition if lose HP
  * Strike with half power, brief r2 debuff, immune after first success
* Rank 7
  * Strike with half power, brief r2 debuff
  * Strike with half power, brief r3 debuff if lose HP

#### Maneuvers: single-target low damage + debuff
* Rank 1
  * Strike with no power, brief r1 debuff if take damage
* Rank 3
  * Strike with no power, r2 debuff condition if lose HP - ANCHOR
  * Strike with no power, brief r2 debuff, immune after first success
  * Strike with no power, r1 debuff condition if take damage
* Rank 5
  * Strike with no power, r2 debuff condition if lose HP, otherwise r1 debuff condition
  * Strike with no power, brief r2 debuff if take damage
* Rank 7
  * Strike with no power, r3 debuff condition if lose HP
  * Strike with no power, brief r3 debuff if take damage, immune after first success
  * Strike with no power, r2 debuff condition if take damage

#### Spells: single-target high damage + debuff
* Rank 3
  * Med range, 2d8 + power damage, brief r1 debuff, immune after first success
  * Med range, 2d8 + power damage, r1 debuff condition if lose HP
* Rank 5
  * Med range, 4d6 + power damage, brief r1 debuff
  * Med range, 4d6 + power damage, brief r2 debuff if lose HP
* Rank 7
  * Med range, 4d10 + power damage, brief r2 debuff, immune after first success
  * Med range, 4d10 + power damage, r2 debuff condition if lose HP

#### Spells: single-target medium damage + debuff
* Rank 1
  * Med range, 2d6 + half power damage, brief r1 debuff
  * Med range, 2d6 + half power damage, brief r2 debuff if lose HP
  * Med range, 2d6 + half power damage, r1 debuff condition if lose HP
* Rank 3
  * Med range, 2d10 + half power damage, brief r2 debuff if lose HP, otherwise brief r1 debuff
  * Med range, 2d10 + half power damage, brief r2 debuff, immune after first success
  * Med range, 2d10 + half power damage, r2 debuff condition if lose HP
* Rank 5
  * Med range, 2d6 + half power damage, r1 debuff condition
  * Med range, 4d8 + half power damage, brief r2 debuff
  * Med range, 4d8 + half power damage, brief r3 debuff if lose HP
* Rank 7
  * Med range, 4d8 + half power damage, brief r3 debuff if lose HP, otherwise brief r2 debuff
  * Med range, 4d8 + half power damage, brief r3 debuff, immune after first success
  * Med range, 4d8 + half power damage, r3 debuff condition if lose HP
* Modifiers
  * "Med range" can be replaced with "Reach, no focus"
  * For +4 levels, you get +5d and full power instead of half power

#### Spells: AOE medium damage + debuff
* Rank 4
  * t2 area, 2d6 + half power damage, brief r1 debuff if lose HP
* Rank 6
  * t2 area, 2d10 + half power damage, brief r1 debuff, immune after first success

#### Spells: single-target low damage + debuff
* Rank 1
  * Med range, 1d6 damage, r2 debuff condition if lose HP -- ANCHOR
  * Med range, 1d6 damage, brief r2 debuff, immune after first success
  * Med range, 1d6 damage, r1 debuff condition if take damage
    * This is very close to being better than a pure debuff, but the lack of crit effect and non-accuracy scaling makes this rank acceptable
    * Note that there is no glance damage, which means no hidden +2 accuracy
* Rank 3
  * Med range, 1d10 damage, r2 debuff condition if lose HP, otherwise r1 debuff condition
  * Med range, 1d10 damage, brief r2 debuff
* Rank 5
  * Med range, 2d8 damage, r3 debuff condition if lose HP
  * Med range, 2d8 damage, brief r3 debuff, immune after first success
  * Med range, 2d8 damage, r2 debuff condition
* Rank 7
  * Med range, 4d6 damage, r3 debuff condition if lose HP, otherwise r2 debuff condition
  * Med range, 4d6 damage, brief r3 debuff
