# Buff Action Efficiency

## Summary

By EA:
```
  Buff           & Self & Ally & Any two & All \\
  Accuracy (+1)  & 0.1  & 0.2  & 0.3     & 0.4 \\
  Accuracy (+2)  & 0.3  & 0.5  & 0.8     & 1.1 \\
  Accuracy (+4)  & 0.6  & 0.9  & 1.5     & 2.1 \\
  Braced         & 0.4  & 0.7  & 1.0     & 1.3 \\
  Empowered      & 0.4  & 0.5  & 0.7     & 1.0 \\
  Extra damage   & 0.4  & 0.6  & 1.0     & 1.4 \\
  Focused        & 0.4  & 0.6  & 1.0     & 1.4 \\
  Fortified      & 0.3  & 0.5  & 0.7     & 1.0 \\
  Impervious     & 1.1  & 1.7  & inf     & inf \\
  Half damage    & 0.7  & 1.0  & 1.5     & inf \\
  Honed          & 0.4  & 0.6  & 1.0     & 1.4 \\
  Maximized      & 0.7  & 1.0  & 1.8     & inf \\
  Primed         & 0.8  & 1.2  & 2       & inf \\
  Shielded       & 0.3  & 0.5  & 0.7     & 1.0 \\
  +4 defenses    & 0.9  & 1.4  & inf     & inf \\
  Single defense & 0.3  & 0.5  & 0.7     & 1.0 \\
  Steeled        & 0.2  & 0.3  & 0.5     & 0.6 \\
```
"You and all adjacent" can be used instead of "any two in Medium range".

## Named Buffs

### Braced
A braced character gains a +2 bonus to all defenses.

### Empowered
An empowered character deals extra damage equal to its character rank.

### Enraged
An enraged character must spend a standard action each round to attack.
Enraged is never inflicted on enemies as a debuff, but can be inflicted on characters as a downside along with other benefits.

### Focused
A focused character rolls attacks rolls twice and keeps the higher result.

### Fortified
A fortified character gains a +2 bonus to their Brawn, Fortitude, and Mental defenses.

### Honed
A honed character gains a +4 accuracy bonus with critical hits.

### Maximized
A maximized character deals maximum damage.

### Primed
A primed character automatically explodes on their attacks.

### Shielded
A shielded character gains a +2 bonus to their Armor and Reflex defenses.

### Steeled
A steeled characer is immune to critical hits.

## Calculating Specific Buffs - Single Action

If you give an ally a brief buff, it generally affects them for two actions.
On the other hand, if you give yourself a brief buff, it generally affects you for one action.
This is why effects like True Strike aren't brief, and instead say "this round" or "this phase".
For this section, assume that all buffs only affect the target for a single action.

For protective buffs, assume that a self-buff works 1/3 of the time and an ally buff works 50% of the time. We use 33% instead of 25% because AOE attacks mean the boss targets each party member more than a quarter of the time.

For buffs that increase defenses, start from the "medium defenses" / 50% hit chance baseline. Monsters generally miss more than player characters do. That means a global +2 defense bonus is 1/3 action denial, or 1.3 EA baseline.

For offensive buffs, assume that targeting a single ally is 50% more valuable than targeting yourself because it's easier to stack multiple buffs to create a devastating combo. For AOE offensive buffs, you aren't generally going to get the same multiplicative stacking effect, so assume that one ally is 50% more valuable and the rest are normal effectiveness. Offensive AOE buffs generally won't include you as an effective target, so you get one ally at 50% bonus effect and two allies at regular effect, for a total of 3.5x normal EA.

In short, that means:
* Self-targeting is 1x EA
* Single ally is 1.5x EA
* "Any two" is 2.5x EA
* "Everyone" is 3.5x EA

### +1 accuracy: 0.1
Assume you have a 70% hit rate, so you hit on a 4. Your expected damage per round is 0.7 + 0.1 from hit/glance + 0.07 from crits, or 0.87.

With +1a, you deal 0.8 + 0.1 + 0.08 = 0.98, which is ~13% more.

### +2 accuracy: 0.3

### +4 accuracy: 0.6

This is like honed, but it works all the time instead of only in specific circumstances, and the incremental degree by which each +1 accuracy is a little better than 0.1 adds up over time. Direct accuracy bonuses also stack with everything else, so they should be rare.

### Braced (self): 0.4

Braced applies 1/3 of the time, so it's 1.3 / 3 = 0.4 EA.

### Braced (ally): 0.7

Applies 50% of the time instead of 33% of the time, since you can choose the best target.

### Braced (any two): 1.0

Applies 75% of the time

### Braced (all): 1.3

Applies 100% of the time

### Empowered: 0.4

Empowered is roughly 40% more damage, averaging arbitrarily between strikes and spells, which have different dice scaling.

### Enraged: -0.2

### Extra damage: 0.4

Extra damage has to be scaled assuming roughly double damage at r5 and triple damage at r7.
That makes a smooth curve quite difficult, but these values should generally provided about 25% more damage, with high variance:

* Rank 1: 1
* Rank 2: 2
* Rank 3: 1d4
* Rank 4: 1d4
* Rank 5: 1d6
* Rank 6: 1d6
* Rank 7: 1d8
* Rank 8: 1d10
* Rank 9: 2d6

Extra damage like this tends to be better on low damage / high accuracy characters, or characters using large AOE attacks or making multiple attacks in a round.

### Extra damage (high): 0.8

This has a target of 50% more damage.

* Rank 1: 1d4
* Rank 2: 1d6
* Rank 3: 1d6
* Rank 4: 1d8
* Rank 5: 1d10
* Rank 6: 2d6
* Rank 7: 2d8
* Rank 8: 2d10
* Rank 9: 3d8

### Focused: 0.4
Assume you have a 60% hit rate, so you hit on a 5. Your expected damage per round is 0.6 + 0.1 from hit/glance + 0.06 from crits, or 0.76.

From Anydice, with a reroll:
* Odds of missing (1/2) are 4%
* Odds of glancing (3/4) are 5%+7% = 12%
* Odds of hitting (5/6/7/8/9/10) are 84%
* Odds of critting (15+) are 11.6%

That means total damage dealt is 0.12 * 0.5 + 0.84 + 0.12 = 1.02, which is 34% better. If we just think about debuffs that don't care much about glancing or critting, it's 84% vs 60%, which is 40% better.

Now assume you have a 120% hit rate (+1 vs AD 0), so you crit on a 9/10. Expected dpr is 1 + 0.2 + 0.1 * 0.2 = 1.22.

With a reroll, your odds of getting a single crit become 36% and a double crit is 4%, so expected dpr is 1 + 0.36 + 0.04 = 1.4, which is only 15% better. So focused is better on low accuracy targets, which makes sense.

### Fortified: 0.3 (self), 0.5 (ally), 0.7 (any two), 1.0 (all)
Same logic as Shielded.

### Impervious (self): 1.1

3.3 EA for normal impervious. You are attacked 33% of the time, so 1.1 EA.

### Impervious (ally): 1.7

Applies 50% of the time

### Half damage (self): 0.7

Applies 33% of the time, and 50% denial when it applies, so 4 / 3 * 0.5 = 0.7.

### Half damage (ally): 1.0

4 * 0.5 * 0.5 = 1.0

### Half damage (any two): 1.5

4 * 0.75 * 0.5 = 1.5

### Honed: 0.4

Assume you have a 80% hit rate (+0 vs AD 3). Expected dpr is 0.9 from hit/glance and 0.1 * 0.8 = 0.08 from crit, so 0.98 total. With Deadly Fortune, it's the same 0.9 from hit/glance, but you crit on a 9 and double crit on a 10 -> 9, so 0.22 damage from crit, so 1.2 total. That's 22% more damage.

Assume you have a 120% hit rate (+1 vs AD 0). Expected DPR is 1 from hit and 0.22 from crit + double crit, so 1.22 total. With Deadly Fortune, expected DPR gains 0.6 from crit and 0.06 from double crit, so 1.66 total, which is 38% more damage.

Assume you have a 150% hit rate (+4 vs AD 0). Expected DPR is 1.55. With Deadly Fortune, expected DPR is 1.99, which is 28% more damage.

0.4 EA is a bit high for honed since that's only true in its best case scenario, but it's risky to treat it as any lower EA than that.

### Maximized: 0.7

Maximized is roughly 70% more damage for spells, and about half that for strikes. Use the spell modifier, not the strike modifier.

### Primed: 0.8

Assume you have a 60% hit rate, so you hit on a 5. Breaking down each die roll outcome:
1: Explosion causes you to hit on 4-10, so 70% of the time
2: 80% of explosions hit
3: 90% of explosions hit
4: 100% of explosions hit, never crit
5: Always hit, 10% crit
6: Always hit, 20% crit
7: Always hit, 30% crit
8: Always hit, 40% crit
9: Always hit: 50% crit
10: No effect

So your effective hit rate increases by 0.1 * (0.7 + 0.8 + 0.9 + 1 + 0.1 + 0.2 + 0.3 + 0.4 + 0.5) = 0.5. That takes you from a 0.6 to 1.1, which is a 83% increase in your odds of hitting, so that's worth 0.8 effective actions.

Now assume you have an 80% hit rate, so you hit on a 7. From before, this is worth 0.1 * (0.9 + 1 + 0.1..0.7) = 0.47. That takes you from a 0.8 to a 1.27, which is a 59% increase in your odds of hitting. So exploding is stronger when your normal hit rate is low, which makes sense.

### Shielded (self): 0.3

You are attacked 1/3 of the time, and shielded protects from 75% of enemy attacks, so 1.3 / 3 * .75 = 0.3

### Shielded (ally): 0.5

Applies 50% of the time

### Shielded (any two): 0.7

Applies 75% of the time

### Shielded (all): 1.0

Applies 100% of the time

### +4 defenses (self): 0.9

From the -4 accuracy calculation, +4 defenses is 2/3 action denial when relevant. That's 4 / 3 * 2 / 3 = 0.9

### Single defense (self): 0.3
You can probably choose the best defense here, so it's pretty close in power to the other defense abilities.

### Steeled (self): 0.2
Assumptions:
* You are attacked 33% of the time
* The enemy gets a critical hit 5% of the time (standard 50% hit chance)
* Critical hits are *three* times as scary as a regular hit, because they have a disproportionate probability of killing / incapacitating.

With 50% hit chance, expected enemy hits per round is 2 hits + 0.4 glance + 0.2 crits * 2 (extra scary crits) = 2.8. If you remove crits from that possibility, expected incoming damage is 2.4. That's about 14% action denial, which has a base value of 0.6 EA. With the standard assumption that you are targeted by 33% of attacks, that's 0.2 EA as a self-buff.

### Steeled (ally): 0.3

0.6 * 0.5 = 0.3

### Steeled (any two): 0.5

0.6 * 0.75 = 0.5

### Steeled (all): 0.6

## Buff effect scaling

Buff effects should have fairly weak rank scaling. The danger with having strong rank scaling for buff effects is that they become useless at low levels and mandatory at high levels, since they have fairly consistent value.

### Maintaining diminishing returns
Debuffs have diminishing returns at higher levels in two ways: condition removal effects have rank scaling, and not being able to stack debuffs means it's more likely that monsters will already be affected by a debuff. We can't recreate the first effect on buffs, but we can use the second way to gain diminishing returns.

For example, assume that low rank abilities can only grant short-term buffs, such as brief duration effects. Low rank effects should never grant long-term empowerment, because that would devalue empowerment.

At high ranks, there could be more effect that grant long-term empowerment, which devalues the existence of brief empowerment effects. It would become more common to assume empowerment, which devalues low rank empowerment effects without technically making them action-inefficient.

Also, low-rank buff effects could be tied to damage or other benefits which don't scale well, and pure buff effects could be exclusive to high level characters.

### Stacking buffs

Buff-stacking is fairly dangerous. If it's easy to make one person primed + maximized, that will simply be better than using those abilities independently on anyone else, because they are both separately multiplicative. To a lesser extent, it's also easier to optimize targeted buffs with splitting, chaining, and so on. This has two main effects:

* Self-buffs use their listed EA, while buffs used on other creatures cost +50% EA.
* All buffs worth 0.7 EA or higher must be self-only in all cases.
  * This specifically affects braced, maximized, and primed

### Cleansing conditions

Removing conditions isn't exactly a buff, but it occupies a similar narrative space and can be useful to combine with abilities that grant buffs. The trick with condition removal is that, unlike most buffs, its EA scales with rank:

* Cleanse one:
  * Ranks 1-2: 1.2 EA
  * Ranks 3-4: 1 EA
  * Ranks 5-4: 0.8 EA
  * Ranks 7-8: 0.6 EA
* Cleanse all: +0.2 EA over cleanse one

### Buff and damage effects

Consider a standard damage effect to be 1 EA. For each damage rank you drop, you lose about 20% damage, so you can get 0.2 EA for self-buffs, to a maximum of 0.8 EA. That you can get some standard effects:

Rank X:
* rX-1 damage:
  * Then brief 0.2 EA
* rX-2 damage:
  * First brief 0.2 EA
  * Then brief 0.4 EA (focused, honed, steeled...)
  * And 0.4 EA this round (focused, honed, steeled...)
* rX-3 damage:
  * First briefly focused
  * Then briefly shielded / and shielded this round

Maneuvers:
* Rank 1:
  * -2 accuracy strike, then brief 0.2 EA buff
  * -1 accuracy strike, then brief 0.2 EA buff on hit?
* Rank 3:
  * -1 accuracy strike, then brief 0.4 EA buff
  * Strike, then brief 0.3 EA buff
  * Strike, then 0.4 EA buff on hit
  * Brief 0.2 EA buff, then strike
* Rank 5:
  * double damage strike, then brief 0.2 EA buff
  * strike, then 0.6 EA buff
* Rank 7:
  * triple damage strike, then brief 0.2 EA buff
  * -1 accuracy triple damage strike, then brief 0.3 EA buff
  * -2 accuracy triple damage strike, then brief 0.4 EA buff
  * +2 accuracy double damage strike, then brief 0.4 EA buff
  * -1 accuracy double damage strike, then brief 0.6 EA buff

You can pay one fatigue level to get either +1dr or +0.2EA, but not both. This allows granting braced / maximized / primed with rX-3 damage attached.

### Buff and debuff effects

Every 0.1 EA of buff removes 10% of the EA from the debuff, but does not reduce the debuff area. Examples:

* Rank 1:
  * 0.2 EA buff, 1.4 * 0.8 = 1.1 EA debuff, r1 area
  * 0.4 EA buff, 1.4 * 0.6 = 0.8 EA debuff, r1 area
  * 0.6 EA buff, 1.4 * 0.6 = 0.6 EA debuff, r1 area
* Rank 4:
  * 0.3 EA buff, 2.0 * 0.7 = 1.4 EA debuff, r4 area

Much like with damage spells, you start with a standard debuff spell. For every rank you drop the debuff by, including area, you gain 0.2 EA of buff, to a maximum of 0.8 EA. There should never be buff + debuff + damage effects, because that's just too much going on in one spell.

Note that this is somewhat unfair, since you normally get 0.8 EA of buff at r1 and 1.2 EA of buff at r7. We could use a more nuanced calculation, such as saying that a r7 effect with 0.4 EA of buff gets 2/3 debuff effectiveness instead of 0.6 debuff effectiveness. However, this isn't really worth the complexity, and debuffs already have strong scaling with level, so a simpler approximation is fine.

### Pure buff effects

Since we can't scale pure buff power much with rank, we use preconditions instead. At low ranks, pure buffs always have preconditions that you must meet to gain the full buff effect. The value of the buff when the precondition is met must always be about 1 EA, so you're never wasting an action to use the buff, but you might not always be able to use the buff when you want to.
After rank 4, pure buffs no longer have preconditions to meet their basic effects, and meeting a difficult precondition can give +0.2 EA. A low rank buff can also spend -0.2 EA to remove 50% of its precondition.

As a rough guide:
* Rank 1:
  * 0.8 EA
  * 1 EA, usable 25% of the time
* Rank 2:
  * 1 EA, usable 50% of the time
  * 0.6 EA, with +0.4 EA usable 25% of the time
* Rank 3:
  * 1 EA, usable 75% of the time
  * 0.6 EA, with +0.4 EA usable 50% of the time
* Rank 4:
  * 1 EA
* Rank 5:
  * 1.2 EA, usable 25% of the time
* Rank 6:
  * 1.2 EA, usable 50% of the time
  * 0.8 EA, with +0.4 EA usable 25% of the time
* Rank 7:
  * 1.2 EA, usable 75% of the time
  * 0.8 EA, with +0.4 EA usable 50% of the time

You can pay one fatigue level to get +0.2 EA.
