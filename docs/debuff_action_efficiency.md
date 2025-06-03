# Debuff Action Efficiency

Debuffs can be grouped according to their action efficiency. Essentially, making a normal damaging attack is worth 1 "effective action". Each debuff can have its effective action count calculated. The effectiveness of many debuffs scales with party size. For this purpose, we assume a party size of 4. In general, debuffs are more effective with larger parties, but that's consistent across all debuffs and doesn't affect the relative tier of debuffs.

## Defense penalties

### From a debuff

Assume that there are four party members, and each party member has a baseline 70% chance to hit. What is the action effectiveness of a -2 defense debuff on the enemy?

Without the debuff, expected hits is 4 * 0.7 = 2.8.
With the debuff, expected hits is 4 * 0.9 = 3.6.

Consider the case with a 10% chance to hit.

Without the debuff, expected hits is 4 * 0.1 = 0.4.
With the debuff, expected hits is 4 * 0.3 = 1.2.

#### Stun with typical defenses

As a baseline, assume that all four party members have a 70% chance to hit. Expected hits with 8 regular attacks is 5.6.

If you use your first action for a stun, you have a 70% chance to apply the effect, which would result in 7 attacks at a 90% chance to hit, or 6.3 hits. You also have a 30% chance to miss, which results in 7 attacks at a 70% chance to hit, or 4.9 hits. That means the expected hit count when using the stun is 6.3 * .7 + 4.9 * .3 = 4.4 + 1.5 = 5.9.

The difference between you doing nothing and using the stun was therefore 5.9 - 4.9 = 1. In this scenario, stun was worth 1 full effective hit when a regular attack would only be worth 0.7 effective hits, so stun is worth 1.4 effective actions.

#### Stun with high defenses

Now assume that all four party members have a 10% chance to hit. Expected hits with 8 regular attacks is 0.8.

If you use your first action for a stun, you have a 10% chance to apply the effect, which would result in 7 attacks at a 30% chance to hit, or 2.1 hits. You also have a 90% chance to miss, which results in 7 attacks at a 10% chance to hit, or 0.7 hits. That means that the effective hit count when using the stun is 2.1 * .1 + .7 * .9 = .21 + .63 = .84.

The difference between you doing nothing and using the stun was therefore .84 - .7 = .14. In this scenario, stun was worth .14 full hits when a regular attack would only be worth .1 hits, so stun is worth 1.4 effective actions.

#### Conclusion

Stun is worth 0.2 action effectiveness per attack it affects, for a total of 1.4 action effectiveness.

### Accuracy Penalties

#### -2 with lowish defenses: 1.0

As a baseline, assume the enemy has a 70% chance to hit, 20% chance to glance. Expected hits with 4 actions is 2.8 hits + 0.4 glance = 3.2.

If they have a -2 accuracy penalty, they drop to a 50% chance to hit, so expected hits is 2 hits + 0.4 glance = 2.4. 25% of enemy actions were removed. That means a -2 accuracy penalty has an effective action value of 4 * 0.25 = 1 effective action.

#### -2 with 50% hit rate: 1.3

Expected hits with 4 actions is 2 hits + 0.4 glance = 2.4. With -2 accuracy, that's 30% chance to hit, so 1.2 hits + 0.4 glance = 1.6. 1/3 of enemy actions were removed. That's worth 1.3 effective actions.

#### -2 with high defenses: 2.0
As a baseline, assume the enemy has a 30% chance to hit. Expected hits with 4 actions is 1.2 hits + 0.4 glance = 1.6.

If they have a -2 accuracy penalty, they drop to a 10% chance to hit, so expected hits is 0.4 hits + 0.4 glance = 0.8. 50% of enemy actions were removed. That means a -2 accuracy penalty has an effective action value of 4 * 0.67 = 2 effective actions.

#### -4 with lowish defenses: 2.0

Baseline is 2.8 hits + 0.4 glance = 3.2. With -4 accuracy, 30% chance to hit, so expected hits is 1.2 hits + 0.4 glance = 1.6. 50% of enemy actions were removed, which is worth 2 effective actions.

#### -4 with 50% hit rate: 2.7

Baseline is 2 hits + 0.4 glance = 2.4. With -4 accuracy, 10% to hit, so expected hits is 0.4 hits + 0.4 glance = 0.8. 2/3 of enemy actions were removed, which is worth 2.7 EA.

#### Impervious with 50% hit rate: 3.3

Ignoring glance means they only get 0.4 hits instead of 0.8, so 83% action denial, which is worth 3.3 EA.

### Roll twice, keep lower with lowish defenses

Assume 70% hit rate, with 2.8 expected hits over 4 actions.

Expected hit rate is 0.7 * 0.7 = 0.5 chance to hit, so 2 hits. 29% of enemy actions were removed.

### Roll twice, keep lower with 50% hit rate

Baseline is 2 expected hits over 4 actions.

Expected hit rate is 0.5 * 0.5 = 0.25 chance to hit, so 1 hit. 50% of enemy actions were removed.

### Roll twice, keep lower with high defenses

Assume 30% hit rate, with 1.2 expected hits over 4 actions.

Expected hit rate is 0.3 * 0.3 = 0.09 chance to hit, so 0.36 hits. 70% of enemy actions were removed.

#### Conclusion

Accuracy penalties scale their its effective action value drastically based on the defenses of the creatures being attacked. In general, monsters should have a mixture of "regular" and high accuracy attacks, and they should regress to using their high accuracy attacks if their accuracy is debuffed, so they shouldn't enter the danger zone of reaching 30% accuracy or lower.

Assume that a brief debuff doesn't give the monsters time to intelligently adjust, so they use the 40% action denial figure from a 50% hit rate, but a condition should use the 29% action denial figure from a high hit rate.

## Calculating Specific Debuffs - Brief Effects

In this context, we assume that each debuff is applied as a brief effect.

### Action skip: 2.0

Skipping a standard action is tricky, since that removes 50% of a boss's action and 100% of a regular enemy's action. Against a boss, removing 50% of their actions is worth 2 effective actions. Against a normal enemy, removing 100% of their actions is worth 4 effective actions. But if you assume there are as many normal enemies as party members, using a single target action skip is worth only 1 effective action.

Overall, AOE action skip abilities have to be treated as stronger than single target action skip abilities, and they maybe shouldn't exist. For now, assume that action skip must always be combined with the "limited scope" modifier.

As with all full action denial effects, this always comes with a "once per creature" restriction.

### Banishment: 2.0

Fully removing a creature from combat is tricky. Against a boss, it removes both their standard action and their elite action, so it should theoretically be worth 4 effective actions. However, the party can't attack the boss, so it should be worth 0 effective actions. As a kind of lazy middle ground, we call this 2 effective actions; the party can spend some time to prepare for the boss, but their actions while the boss is gone are generally going to be less than 100% effective.

Note that this refers to the variation of banishment where the target also gets to take actions while it is in limbo. If they don't get to take actions, but are still invulnerable during the skipped round, see Time Skip.

As with all full action denial effects, this always comes with a "once per creature" restriction.

### Blinded: 3.0

Removing 50% of actions for a round is worth 50% of 4 = 2 effective actions. It doesn't affect AOE attacks, but it can also prevent normal targeting with even the 50% miss chance, so assume those cancel out.

In addition, a blinded creature is partially unaware of attacks. Using the same calculations as slowed, that's worth 1 effective action.

### Confused: 2.8

As a baseline, confused has the effect of stunned, which is worth 1.4 effective actions.
The random behavior of confusion is trickier to calculate.
Assume that a typical monster would normally have a 90% chance of attacking and a 10% chance of using a non-attack ability.
If it's forced to use an alternate ability, using a non-attack when it would rather attack is 25% as effective, while using an attack when it would rather not attack is 75% as effective.
Total monster effectiveness is 0.9 * (0.5 * 1 + 0.5 * 0.25) + 0.1 * (0.5 * 1 + 0.5 * 0.75) = 0.9 * 0.625 + 0.1 + 0.875 = 0.65.

Removing 0.35 monster actions is worth 1.4 effective actions.

### Dazzled: 0.6

Fully denying all enemies all actions for a round would have an effective action count of 4, since the party gets 4 actions per round. Therefore, removing  20% of enemy actions for a round is worth 20% of 4 = 0.8 effective actions.

In practice, it's a little lower than this, because dazzled doesn't affect AOE attacks. As a baseline, it's reasonable to assume that 75% of enemy attacks are individually targeted and 25% are AOE, so the total action effectiveness of a one-round dazzle is 75% of 0.8 = 0.6 effective actions.

### Deafened: 0.3

Deafened is basically the same as dazzled, except that the restriction is "spell with verbal components" rather than "targeted ability". That's less than half as common, so call it 0.3 EA.

### Frightened by you: 0.8

Frightened is a more complicated and conditional effect than most debuffs. It has two components: a local accuracy penalty and a Mental defense debuff.

Assuming that the enemy attacks all party members equally, the frightened accuracy penalty applies 33% of the time, and it removes 33% of enemy actions when it applies (see Accuracy Penalties, above). Therefore, it is worth 4 / 3 / 3 = 0.4 effective actions on average, with a maximum effectiveness of 1.3 assuming that the enemy always attacks the source of their fear. This is the same as the buff value of self-brace.

The Mental defense penalty can apply to 7 party attacks (see Stunned). However, most party members can't take full advantage of a single-defense penalty like that, and even if they can attack Mental it may still be a relatively high defense for the monster. As a wild estimate, assume that half of the party's attacks can benefit from the defense penalty, and that this is still only relevant for half of monsters. When the penalty is relevant, it provides 0.2 effective actions per attack. That would be worth 7 * 0.5 * 0.5 * 0.2 = 0.35 effective actions on average, to a maximum of 1.4 effective actions assuming that every party member always attacks Mental defense.

That adds up to 0.75 effective actions for frighten.

### Frightened by ally: 1.1

0.7 from Braced (ally) + 0.35 from defense penalty = 1.1.

### Frightened by all: 1.7

1.3 from Braced (all) + 0.35 from defense penalty = 1.7.

### Goaded: 1.0

Assuming that the monster attacks all party members equally, goaded applies to 75% of its attacks.

Since goaded is 33% action denial when it applies, that gives it 4 * 0.75 / 3 = 1.0 action effectiveness.

### Immobilized: N/A

Fully removing a creature's ability to move is too strong to exist; it would be too rare to define as an explicit debuff.

### Knockback 15' (horizontal): 0.9 (ranged) / 0.4 (melee)

Knockback is dangerous compared to push because it can send enemies into bottomless pits and cliffs. Treat knockback 15' as being the same EA as push 15', except that knockback requires HP loss.

### Knockback 15' (vertical): 1.6 (ranged) / 1.4 (melee)

In addition to the utility from pushing into hazards, a vertical knockback can leave enemies in midair. A -4 penalty to Armor/Brawn/Reflex against 3 potential party attacks is worth 1.2 EA by itself. Add in 0.4/0.2 EA from the regular push effect, since you can get either but not generally both.

### Knockback 30' (horizontal): 2.0 (ranged) / 1.5 (melee)

Same as push 30', but this always requires the target to have no remaining DR.

### Knockback 30' (vertical): 2.6 (ranged) / 2.1 (melee)

This time the push is a larger part of the EA contribution, so we'll start from the push and add half the defense effect, which is 0.6 EA extra.

### Panicked by self: 2.3

Using the same logic as being frightened, the -4 Mental defense penalty is worth 0.7 effective actions on average, to a maximum of 2.8 effective actions.

Being unable to attack the source of its panic is complicated to calculate. It's not the same as fully negating all attacks against that target, because it can redirect attacks to affect other creatures. It does make it impossible for the creature to use full AOE abilities, which is significant. As with dazzled, assume that 75% of enemy actions are targeted and 25% are AOE. The targeted actions are only 75% of normal effectiveness, since they can't target a creature who may be the preferred target. The AOE attacks are also 75% of normal effectiveness since the protected target is immune to the attack. So assume that panicked negates 25% of enemy actions, meaning that it's worth 1 effective action.

There is an important edge case with panicked, which is that it can make it easy to fully negate a fight by having only the source of its fear fight, or by having the monster be panicked by all party members. In that scenario, assuming that the monster still fights at 75% effectiveness is misleading. This is hard to calculate; assume it makes the overall action denial 50% more effective, for a total of 1.5 effective actions from action denial.

### Panicked by ally: 2.7

If you can freely choose which ally is protected, the protection is much stronger. Assume that it negates 50% of monster actions, which is worth 2 EA from action denial.

### Panicked by all: N/A

Being panicked by everyone is basically complete attack denial, which shouldn't exist.

### Prone: 1.6 (ranged) / 1 (melee)

A prone creature typically has a defense penalty against three attacks rather than the usual 7 from stun. Assume that 2 of the 3 attacks can take advantage of the defense penalty, giving it 0.4 action effectiveness from the defense penalty.

The movement penalty is about the same as a brief slow, but slightly more effective, so call that 1.2 effective actions.

If a prone or slow is applied by a melee ability, halve the EA contribution from the movement penalty, since that generally means it's not being used for full kiting.

### Pull 15': 0.5

A pull is hard to use for kiting, though it can be useful for locking an enemy down on the tank. It can also be used to trigger battlefield hazards. Assume that 75% of the time a pull will be used to control enemy attacks and 25% of the time it will be used for battlefield hazards.

When used to control enemy targeting, assume that the post-pull action is 25% action denial, and a 15' pull meaningfully changes enemy actions 50% of the time. That means it's worth 4 * 0.25 * 0.5 = 0.5 EA. The overall value is 0.75 * 0.5 + 0.25 * 0.5 = 0.5 EA.

### Pull 30': 1.5

Assume that a post-pull action is 33% action denial, and a 30' pull meaningfull changes enemy actions 75% of the time. That means it's worth 4 * 0.33 * 0.75 = 1 EA.

### Pull 60': 2.5

This seems like 50% action denial, so 2 EA.

### Push 15': 0.9 (ranged) / 0.4 (melee)

In many cases, a 15' push has no meaningful effect. Typically, forced movement is useful when combined with two things: kiting and battlefield hazards. In a kiting scenario, a 15' push will often force the target to sprint or charge, wasting a standard action. Triggering a battlefield hazard is generally worth half an action, since deployed hazards are generally less powerful than a full standard action attack. Assume that 75% of the time a push will be used for kiting and 25% of the time it will be used for battlefield hazards.

When used for kiting, a 15' push is basically the same EA as prone or slow, which we estimate as 1 effective action. Triggering a battlefield hazard is worth 0.5 EA. That gives a total EA value of 0.75 * 1 + 0.25 * 0.5 = 0.9.

### Push 30': 2.0 (ranged) / 1.5 (melee)

A 30' push will almost always cost a full action to get back in melee range. Treat this as 50% action denial, which is worth 2 EA. In melee, it can't generally be used for full kiting but still makes it easy to lock down a monster and only allow them to attack one party member, so it's 75% effective, or 1.5 EA.

### Single defense: 1.0

If you can freely choose a single defense to reduce, you can typically choose the best available defense. That probably affects 5 of the 7 possible allied attacks.

### Slowed: 2.0 (ranged) / 1.5 (melee)

Slowed has two effects: the movement speed debuff and the defense debuff.

The speed debuff is hard to calculate. It enables kiting, which can theoretically end some encounters, but that's a fairly rare circumstance. As a guess, assume that this forces the monster to use 50% of its actions to mitigate the speed debuff and that its replacement action is 50% as effective. For example, it may charge or sprint instead of making a stronger attack, and it may attack a frontline tank party member instead of being able to reach the backline. That gives it 4 * 0.5 * 0.5 = 1 effective action.

The defense debuff is mostly the same as stunned, except that not all party members will be able to take advantage of it. Armor + Reflex is still fairly common, so assume that 5 of the 7 attacks will benefit from the defense debuff, for a total of 1 action effectiveness.

If a prone or slow is applied by a melee ability, halve the EA contribution from the movement penalty, since that generally means it's not being used for full kiting.

### Stunned: 1.4

If you stun an enemy as the first action of the round, the party has 7 attacks that can take advantage of the stun debuff: your three party members during the first round, and the full party during the second round.

### Time Skip: 2.5

This refers to removing a creature from existence for a round. That gives the party time to prepare during the intervening round, but doesn't allow the target the same benefit. This is better than banishment. However, most bosses don't have anything particularly useful to do while they are banished, since they can't recover and generally don't have healing abilities. Assume that a boss acts at 10% effectiveness while banished, so removing that is worth 0.4 effective actions, or maybe 0.5 total since they also don't get a condition removal roll.

### Treat as invisible: 1.2

There are two components to being treated as invisible: the defense penalty and the miss chance.

The defense penalty only applies to your own attacks, so the party has 1 attack that can take advantage of it, so it's worth 0.2 effective actions.

The miss chance applies to roughly 25% of boss attacks. Since blindness is worse than a regular 50% miss chance due to needing to know the square, call it 75% action negation when it applies. In particular, if they treat you as briefly being invisible, they often can't follow you if you move away during the movement phase. That gives it an action effectiveness of 4 * 0.25 * 0.75 = 0.75 effective actions. As with panicked, this is a little low and doesn't take into account the edge case of multiple people using this ability, but a 50% miss chance is much less effective at completely debilitating a boss than panicked. Say that the action denial is 25% more effective, for a total of 0.94 effective actions.

### Vulnerable: 3.5

Following the logic of being stunned, being vulnerable to all damage would be worth 2.8 action effectiveness. Add 25% effectiveness because it negates impervious/immune, so 3.5 EA.

## Named Buffs

### Braced
A braced character gains a +2 bonus to all defenses.

### Empowered
An empowered character rolls damage twice and keeps the higher result.

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

### Empowered: 0.2

Empowered is roughly 20% more damage, averaging arbitrarily between strikes and spells, which have different dice scaling.

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

You are attacked 1/3 of the time, and shielded protects from 75% of enemy attacks, so 1.3 / 3 * .75 = 0.4

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

## Debuff Condition Action Effectiveness
Assume that a normal group combat lasts for 16 player effective actions, and a typical boss fight lasts for 20 player effective actions. If you apply a condition to a boss on round 1, it will have the opportunity to remove that condition at the end of rounds 2, 3, and 4. The condition lasts 1 + 1 + 5/6 * (1 + 5/6 * (1 + 5/6)) = 2 + 5/6 * (1 + 1.53) = 4.1 rounds.

Or, equivalently, 2 + 5/6 + (5/6)^2 + (5/6)^3 = 2 + 0.83 + 0.69 + 0.57 = 4.1. That's basically the same as the expected condition duration in a group fight, since non-elites can't remove conditions.

Basically, we can generally assume that a condition lasts for 4 rounds of combat. That generally means that the maximum player action count is 15, and 3 rounds of enemy attacks are affected by enemy attack debuffs.

### Action Denial

What is the correct action effectiveness of a hypothetical condition that prevents the boss from taking any actions? Start from our usual assumption of 4 rounds of combat, or 3 rounds of enemy attacks, which would be worth 12 effective actions. The real problem with this sort of condition is that it can be reapplied during the 12 action window, making it worth effectively infinite actions. For a more mild debuff like being dazzled, this reapplication problem doesn't really exist, and it's reasonable to just look at the 3 rounds of enemy attacks that we would normally consider. How do we scale the calculations between the small debuff and the infinite debuff?

We can solve that by making "cannot be reapplied" an intrinsic part of the definition of any sufficiently high action denial effects. There is no such thing as an action skip debuff that can be applied multiple times to the same creature. This lets us use 3 rounds of enemy attacks as the standard calculation for all action denial effects. This doesn't technically solve the problem for mooks, since a complete action denial on a creature that can't remove conditions is still worth infinite actions, but in practice this doesn't matter because total action denial is beyond the scope of any player-accessible condition.

In short, X% action denial is worth X% of 12 EA.

* A -2 accuracy penalty is 33% action denial of 4 boss attacks = 4 effective actions.
* Dazzled would remove 20% of 75% of 4 boss attacks = 2.4 effective actions.
* Confusion is more similar to dazzled in duration because it also has a defense debuff, so it removes 35% of 4 boss attacks = 5.6 effective actions.
* Slowed should also use the dazzled baseline, so it removes 12.5% of 4 boss attacks = 2 effective actions.

### Action skip: 12

### Banishment: 9
Say that this is 75% of the effectiveness of a full action skip.

### Blinded: 8.2
Removing 50% of enemy actions is worth 12 * 0.5 = 6 effective actions.

Partially unaware is worth 2.2 effective actions using the same logic as being slowed.

### Confused: 7.2
35% action denial is worth 4.2 EA. The defense debuff is worth 3 effective actions, just like stunned.

### Dazzled: 1.8
75% of 20% action denial is worth 1.8 EA.

### Deafened: 1.2
Assume this is 10% action denial.

### Frightened by you: 2.1
-2 accuracy applies 33% of the time, which is 1.3 EA.

Assuming the Mental penalty applies to 25% of attacks as before, it is worth 15 * 0.25 * 0.2 = 0.8 effective actions.

### Frightened by ally: 2.8
-2 accuracy applies 50% of the time, so 4 * 0.5 = 2 EA. Same defense modifier, so 2.8 EA.

### Frightened by all: 4.8

4 EA from accuracy penalty plus 0.8 EA from defense modifier

### Goaded: 3

-2 accuracy applies 75% of the time, which is 4 * 0.75 = 3 EA.

### Panicked by self: 6.1

The defense penalty is twice the Frightened penalty, so 1.6 effective actions.

As with the brief effect, assume 37.5% action denial, so 4.5 EA.

### Panicked by ally: 7.6

50% action denial is 6 EA, plus the 1.6 EA from the defense penalty.

### Prone: 6.0 (ranged) / 4.1 (melee)

Prone as a condition is basically the same as slow, but with a slightly more punishing action denial. Vaguely assume it's 25% more effective, so +0.8 EA (ranged) or +0.4 EA (melee).

### Single defense: 2.0

Choosing a single defense probably affects 10 of the 15 available player actions.

### Slowed: 5.2 (ranged) / 3.7 (melee)
We calculated the action denial from the speed debuff as 25% action denial, which is 3 effective actions. In melee, that would be 1.5 effective actions.
For the defense debuff, assume that 11 of the 15 party actions will take advantage of it, so it's worth 2.2 effective actions.

### Stunned: 3

15 affected player actions * 0.2 action effectiveness per action = 3 effective actions.

### Time Skip: 10.8

### Treat as invisible: 4.0

The defense penalty applies to 3 party attacks, so it provides 0.6 action effectiveness.

The blindness is 12 * 0.25 * 0.75 = 2.2 effective actions. The brief effect gets a 25% boost here, but a condition is easier to game by having only the invisible person stick around to fight, so give it a 50% boost to 3.4.

### Vulnerable: 7.5
Double stunned, plus 25% effectiveness for negating impervious/immune.

## HP-Only Condition Effectiveness

A condition that you can only apply after the target has entered HP is roughly the same power level as a brief effect. It has the upside of being able to last longer in boss fights or to fully remove non-elite enemies from the fight if they are in HP, but the downside of not working at all if the target has DR remaining.

In general, a monster will enter HP about halfway through the fight. Most enemies have more HP than DR, but enemies lose HP faster than DR. In group fights, individual enemies can easily enter HP after round 1, but it's rare for all enemies to enter HP simultaneously, making HP conditions difficult to use effectively unless you apply an AOE pre-fire debuff that works while they are at full HP. For bosses, assume that 10 of our standard 20 player actions are required to get the boss into HP. This means that defense debuffs are about 50% effective. Action denial debuffs only have 2 boss attack actions to negate with instead of the usual 4, which is also 50% effective.

Those are both best-case scenarios though. In practice, it's hard for an HP condition to reach that full 50% effectiveness, especially in a group fight. It seems reasonable to estimate HP-only conditions as being 40% of the effectiveness of a condition without prerequisites.

## Area and Targets

All of the above calculations assume that the debuffs are affecting all enemies in the fight. However, actual spells always have targeting limitations and areas, so they may not affect all enemies. One balancing factor is to consider how strong a debuff is if it only affects a subset of the enemies of the fight. Specifically, if the debuff affects 50% of the enemies, is it 50% as strong?

In general, most debuffs benefit to the same small degree with precision targeting. Affecting 50% of the enemies gives you slightly more than 50% of the power of the effect. This generally involves tactical changes - you prioritize targeting the enemies affected by defense-reducing debuffs, and you avoid targeting the enemies with accuracy-reducing debuffs.

## Buff Summary

By EA:
```
  Buff           & Self & Ally & Any two & All \\
  Accuracy (+1)  & 0.1  & 0.2  & 0.3     & 0.4 \\
  Accuracy (+2)  & 0.3  & 0.5  & 0.8     & 1.1 \\
  Accuracy (+4)  & 0.6  & 0.9  & 1.5     & 2.1 \\
  Braced         & 0.4  & 0.7  & 1.0     & 1.3 \\
  Empowered      & 0.2  & 0.3  & 0.5     & 0.7 \\
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

## Debuff Summary

By EA:
```
  Debuff             & Brief & HP Condition & Condition \\
  Action skip        & 2.0   & 4.8          & 12        \\
  Banishment         & 2.0   & 3.6          & 9         \\
  Blinded            & 3.0   & 3.3          & 8.2       \\
  Confused           & 2.8   & 2.9          & 7.2       \\
  Dazzled            & 0.6   & 0.7          & 1.8       \\
  Deafened           & 0.3   & 0.5          & 1.2       \\
  Frightened by you  & 0.8   & 0.8          & 2.1       \\
  Frightened by ally & 1.1   & 1.1          & 2.8       \\
  Frightened by all  & 1.7   & 1.9          & 4.8       \\
  Goaded             & 1.0   & 1.2          & 3.0       \\
  Panicked by self   & 2.3   & 2.4          & 6.1       \\
  Panicked by ally   & 2.7   & 3.0          & 7.6       \\
  Prone (ranged)     & 1.6   & 2.4          & 6.0       \\
  Prone (melee)      & 1.0   & 1.6          & 4.1       \\
  Pull 15'           & 0.5   & N/A          & N/A       \\
  Pull 30'           & 1.5   & N/A          & N/A       \\
  Pull 60'           & 2.5   & N/A          & N/A       \\
  Push 15' (ranged)  & 0.9   & N/A          & N/A       \\
  Push 15' (melee)   & 0.4   & N/A          & N/A       \\
  Push 30' (ranged)  & 2.0   & N/A          & N/A       \\
  Push 30' (melee)   & 1.5   & N/A          & N/A       \\
  Single defense     & 1.0   & 0.7          & 2.0       \\
  Slowed (ranged)    & 2.0   & 2.1          & 5.2       \\
  Slowed (melee)     & 1.5   & 1.5          & 3.7       \\
  Stunned            & 1.4   & 1.2          & 3.0       \\
  Time skip          & 2.5   & 4.3          & 10.8      \\
  Treat as invis:    & 1.2   & 1.6          & 4.0       \\
  Vulnerable         & 3.5   & 3.0          & 7.5       \\
```

By rank:
"2d" means "rank 2 if combined with damage". It's used for effects that are too weak to ever appear as standalone spells.
"inf" means the effect is too strong to ever appear as a spell without weird tricks.
```
  Debuff             & Brief & HP Condition & Condition \\
  Action skip        & 4     & inf          & inf       \\
  Banishment         & 4     & inf          & inf       \\
  Blinded            & 9     & 11           & inf       \\
  Confused           & 8     & 9            & inf       \\
  Dazzled            & 2d    & 3d           & 3         \\
  Deafened           & 1d    & 2d           & 0         \\
  Frightened by you  & 3d    & 3d           & 5         \\
  Frightened by ally & 0     & 0            & 8         \\
  Frightened by all  & 3     & 4            & inf       \\
  Goaded             & 4d    & 0            & 9         \\
  Panicked by self   & 6     & 6            & inf       \\
  Panicked by ally   & 8     & 9            & inf       \\
  Prone (ranged)     & 2     & 6            & inf       \\
  Prone (melee)      & 4d    & 2            & inf       \\
  Pull 15'           & 2d    & N/A          & N/A       \\
  Pull 30'           & 2     & N/A          & N/A       \\
  Pull 60'           & 7     & N/A          & N/A       \\
  Push 15' (ranged)  & 4d    & N/A          & N/A       \\
  Push 15' (melee)   & 1d    & N/A          & N/A       \\
  Push 30' (ranged)  & 4     & N/A          & N/A       \\
  Push 30' (melee)   & 2     & N/A          & N/A       \\
  Single defense     & 4d    & 3d           & 4         \\
  Slowed (ranged)    & 4     & 5            & inf       \\
  Slowed (melee)     & 2     & 2            & inf       \\
  Stunned            & 1     & 0            & 9         \\
  Time skip          & 7     & inf          & inf       \\
  Treat as invis:    & 0     & 2            & inf       \\
  Vulnerable         & 8     & 9            & inf       \\
```

### Effective actions by rank

* Rank 1: 1.4
* Rank 2: 1.6
* Rank 3: 1.8
* Rank 4: 2
* Rank 5: 2.2
* Rank 6: 2.4
* Rank 7: 2.6
* Rank 8: 2.8
* Rank 9: 3.0
* Rank 10: 3.2
* Rank 11: 3.4
* Rank 12: 3.6

### Effective Action Modifiers

These are EA modifiers, as opposed to rank modifiers that apply after calculating EA and damage.

* +0.2 EA: Condition becomes a Sustain (minor)
* +0.4 EA: Can prefire an HP condition (instead of only applying the condition if the target is already in HP, the condition automatically has its full effect as soon as the target is in HP)
* +0.4 EA: You can combine a brief effect with an HP condition effect, starting from the higher EA of the two. For example, "briefly stunned, or stunned as a condition if out of DR" is a 2.0 EA effect.
* +0.4 EA: Condition becomes a curse
* +1 EA: The effect becomes a Sustain (minor) zone that repeats its attack each round. This also comes with -2dr, and the area must be a ranged radius (not a radius from self).
* -1 EA: The effect only works if you hit the creature with it twice.
* -2 EA: The effect only works if you hit the creature with it twice, both times while it is in HP.

## Effective Actions and Accuracy

A debuff's effective action count is measured assuming that the ability hits, but effective action count measures a value that does not assume a hit.

One "effective action" of damage is not the same as the damage dealt by a standard attack *on hit*; it corresponds to the damage dealt by that attack assuming average hit results. Consider a hypothetical "debuff" that inflicted 1 effective action of damage on hit. The correct value of that damage is about 0.7x the damage dealt by a spell of the same rank on hit.

Put another way, in order to be worth using, a debuff has to provide more than 1 effective action of value when it hits, because attacks deal more than 1 "effective action" of damage on hit. Since we generally assume a 70% hit chance, the standard effective action value for a rank 1 Medium debuff should be 1 / 0.7 = about 1.4 effective actions.

### Accuracy scaling

Since a rank 1 debuff should provide 1.4 effective actions of value on hit, what happens when it is used at rank 4? Automatic rank scaling means that it should hit 100% of the time at rank 4. To be of comparable power, a rank 4 spell would need to provide 1.4 / 0.7 = about 2 effective actions of value. That suggests that one rank is worth approximately 0.2 effective actions.

In theory, we could extend this logic to rank 4 spells and multiply them to get rank 7 spells, generating a higher EA per rank than 0.2. However, it seems safer to keep effective actions on a linear scale, especially if we use a fixed EA of 1 to calculate how much damage a damage + debuff effect should do. Higher rank spells already get more area, and they have the ability to reach fully disabling debuffs. So we stick with 0.2 EA per rank, or roughly equivalently, 0.2 EA per accuracy.

### Accuracy penalties

Spells can have accuracy penalties to get access to more powerful debuffs early. However, starting from a baseline hit rate of 0.7 would cause that to scale too quickly - most people who cast those spells don't actually have a baseline hit rate of 70% with a normal spell thanks to various character specializations. In addition, this category of spell is extremely powerful in combination with setup effects and Desperate Exertion. At the risk of being overly penalizing, start with an assumed hit rate of 100% when calculating power.

For example, a rank 1 spell normally provides 1.4 EA of value on hit. A rank 1 spell with a -4 accuracy penalty would instead provide 1.4 / 0.6 = 2.3 EA of value on hit. This only affects debuff tier, not area. Although the rank 1 spell will have the same accuracy and debuff effect as a standard rank 5 spell when cast at rank 5, it will still be significantly behind a "normal" spell of the higher rank after rank scaling is applied.

Because this scaling balance requires the corresponding effect to have area scaling, this accuracy penalty cannot be applied to spells using limited scope (see Debuff Area).

Essentially, -4 accuracy at rank X is equivalent to a standard effect of rank X+4. 

## Standard effects by rank

* Rank 1 (1.4 EA):
  * Briefly stunned
  * Goaded if in HP, +1 accuracy
  * Prone, +2 accuracy
  * Stunned as a HP condition, +2 accuracy
  * 1 EA of damage, briefly deafened
  * Briefly confused, -3 accuracy
* Rank 2 (1.6 EA):
  * 1 EA of damage, briefly dazzled
  * 1 EA of damage, deafened if lose HP
  * 1 EA of damage, goaded briefly / as a HP condition
  * Briefly slowed
  * Slowed as a HP condition
  * Deafened as a condition
* Rank 3 (1.8 EA):
  * 1 EA of damage, briefly frightened
  * 1 EA of damage, frightened as a HP condition
  * Vulnerable as a HP condition
* Rank 4 (2 EA):
  * Action skip
  * Banished
  * Frightened as a condition
  * 1 EA of damage, briefly prone
  * 1 EA of damage, stunned as a HP condition
* Rank 5 (2.2 EA):
  * 1 EA of damage, briefly treat as invisible
* Rank 6 (2.4 EA):
  * 1 EA of damage, briefly stunned
  * Briefly panicked
  * Dazzled as a condition
  * Goaded as a condition
* Rank 7 (2.6 EA):
  * 1 EA of damage, deafened as a condition
  * 1 EA of damage, briefly slowed
  * Brief time skip
  * Panicked as a HP condition
* Rank 8 (2.8 EA):
  * Briefly confused
  * Briefly vulnerable
* Rank 9 (3.0 EA):
  * 1 EA of damage, action skip
  * 1 EA of damage, banishment
  * 1 EA of damage, frightened as a HP condition
  * Briefly blinded
  * Confused as a HP condition
  * Stunned as a condition
* Rank 10 (3.2 EA):
* Rank 11 (3.4 EA):
  * 1 EA of damage, dazzled as a condition
* Rank 12 (3.6 EA):
* Rank 13 (3.8 EA):
* Rank 14 (4 EA):

### Debuff + Damage

If a debuff deals damage, the damage depends on the area affected by the debuff. A standard area debuff deals drX-2 damage, which is about 65% of drX damage, and 80% of the standard damage for an area attack.

A 30' range single-target debuff deals drX-1 damage, since a normal 30' range single-target damage ability would deal drX+1 damage. Likewise, a melee range single-target debuff deals drX, since a normal melee single-target damage ability would deal drX+2.

### Strike-based debuffs

A strike with unrestricted weapon types uses "limited scope", so -1 rank. A melee-only strike uses melee-only, so -2 ranks.

* Rank 1: A normal damage strike takes up 1.2 of the 1.4 (unrestricted) or 1.6 (melee) EA available, so the baseline EA available for debuffs is only 0.2/0.4.
* Rank 3: A normal damage strike takes up 1 EA of the 1.8 (unrestricted) or 2.0 (melee) EA available, so the baseline EA available for debuffs is 0.8/1.0.
* Rank 5: 2x damage takes up 1.2 EA, so 1.2/1.4.
* Rank 7: 3x damage takes up 1.2 EA, so 1.6/1.8.

These accuracy modifiers are separate from the normal accuracy modifier calculation, and do not directly affect the resulting rank of the debuff.

#### Specific strike-based effects
* Rank 1:
  * Unrestricted:
    * Strike and 0.2 EA debuff
    * Strike, if beat Fort/Ment, 0.4 EA debuff
    * Strike and crit, 0.6 EA debuff
  * Melee only:
    * Strike and 0.4 EA debuff
    * Strike, if beat Fort/Ment, 0.6 EA debuff
    * Strike and crit, 0.8 EA debuff
* Rank 3:
  * Unrestricted:
    * strike and 0.8 EA debuff
    * strike, if beat Fort/Ment, 1.0 EA debuff
    * strike and crit, 1.2 EA debuff
  * Melee only:
    * strike and 1 EA debuff
    * strike, if beat Fort/Ment, 1.2 EA debuff
    * strike and crit, 1.4 EA debuff
* Rank 5:
  * Unrestricted:
    * double damage strike and 1.2 EA debuff
    * double damage strike, if beat Fort/Ment, 1.4 EA debuff
    * double damage strike and crit, 1.6 EA debuff
  * Melee only:
    * double damage strike and 1.4 EA debuff
    * double damage strike, if beat Fort/Ment, 1.6 EA debuff
    * double damage strike and crit, 1.8 EA debuff
* Rank 7:
  * Unrestricted:
    * triple damage strike and 1.6 EA debuff
    * triple damage strike, if beat Fort/Ment, 1.8 EA debuff
    * triple damage strike and crit, 2.0 EA debuff
  * Melee only:
    * triple damage strike and 1.8 EA debuff
    * triple damage strike, if beat Fort/Ment, 2.0 EA debuff
    * triple damage strike and crit, 2.2 EA debuff

### Rank modifiers

All rank modifiers apply after calculating EA and the debuff to be applied.

These rank modifiers apply before calculating area and damage:

* +1 rank: Condition becomes a Sustain (minor)
* +2 ranks: Condition becomes a curse

* -1 rank: +2 area ranks (net +1 area rank, -1 effect rank)
* -1 rank: Damage requires one defense, debuff requires beating a separate non-Reflex defense
* -1 rank: -2 accuracy (max -4; see Accuracy vs Damage doc)
* -2 ranks: Condition is removed when the target takes damage
* -2 ranks: Condition can be removed with movement (burning Dex check)

These rank modifiers apply after calculating damage, but before calculating area.
For pure damage effects, this is equivalent to directly modifying damage rank:

* -1 rank: Must beat two defenses instead of one, one of which is Reflex
* -1 rank: Effect is inescapably delayed by one round
* -1 rank: Easy combo condition:
  * Target must have already taken damage this round
  * Target must have one of your allies adjacent to it
  * You must be focused or primed
* -2 ranks: Effect is escapably delayed by one round (can leave area) - can't be combined with enemies-only area targeting
* -2 ranks: Must beat two non-Reflex defenses instead of one
* -2 ranks: Difficult combo condition:
  * You must be one of braced, empowered, fortified, shielded, or steeled (no accuracy buff)

These rank modifiers apply after calculating both area and damage:
* -1 rank: Limited scope (see Debuff Area, below)
* -2 ranks: Melee range (see Debuff Area, below)

## Debuff Area

All of the effective action calculations assume that every enemy in the fight is affected by the debuff. For that reason, a "standard" debuff affects a large area: a rank X spell uses a rank X area (see Area Tiers, below).

### Limited Scope Debuffs

You can apply a stronger debuff if you are willing to affect fewer enemies. There are three versions of a limited scope debuff:
* Rank - 1: Rank X / 2 area, to a minimum at Rank 0 of a single creature within 30' range
* Rank - 2: Single target melee range

## Area and Effect Rank

"Effect rank" refers to how strong the effect of an ability is. "Ability rank" refers to the minimum rank required to use the ability. A spell's ability rank is a combination of its effect rank and its targeting criteria.

For example, a Medium range erX spell deals drX damage.

### Standard Area Ranks

Rank -1 areas (why would these exist?):
* Small line, 5' wide from self

Rank 0 areas:
* Cone:
  * Small cone from self
* Line:
  * Small line, 10' wide from self
  * Medium line, 5' wide from self (only for splitting)
* Radius:
  * Small radius from self
    * This is obviously a larger area than a cone or line, but is also much harder to aim to only hit enemies
  * Enemies in Tiny radius from self
    * There is no such thing as "everything adjacent to you", because it's easy to make that functionally enemies-only on a grid system, but that's really annoying in practice.

Rank 1 areas:
* Cone:
  * Medium cone from self
* Line:
  * Medium line, 10' wide from self
* Radius:
  * Medium radius from self
* Targets:
  * Up to two creatures in Short range

Rank 2 areas:
* Cone:
  * (no change) Medium cone from self
  * Two Small cones from self
* Line:
  * (no change) Medium line, 10' wide from self
  * Large line, 5' wide from self (only for splitting)
  * Two Small, 10' wide lines from self
  * Two Medium, 5' wide lines from self
* Radius:
  * (no change) Medium radius from self
  * Tiny radius in Short range (rare, since Tiny radius is so close to single target)
* Targets:
  * Up to three creatures in Short range
  * Up to two creatures in Medium range

Rank 3 areas:
* Cone:
  * Large cone from self
  * Two Medium cones from self
* Line:
  * Large line, 10' wide from self
  * Two Medium, 10' wide lines from self
* Radius:
  * Large radius from self
  * Small radius in Short range
  * Tiny radius in Med range (only for splitting)
* Targets:
  * Up to four creatures in Short range
  * (unchanged) Up to two creatures in Medium range

After rank 3, spells have mostly reached their maximum range, since they are not allowed to go past 60 feet by default. Instead, area scaling comes from splitting areas.

Rank 4 areas:
* Cone:
  * (unchanged) Two Medium cones from self
* Line:
  * (unchanged) Two Medium, 10' wide lines from self
* Radius
  * Medium radius in Short range (discouraged due to self-inclusion)
* Targets:
  * Any number of creatures in Short range (equivalent to enemies-only Medium radius)
  * Up to three creatures in Medium range

Rank 5 areas:
* Cone:
  * Two Large cones from self
* Line:
  * Two Large, 10' wide lines from self
* Radius:
  * Two Small radii in Short range
  * Two Tiny radii in Med range
* Targets:
  * Any number of creatures in Medium range (equivalent to enemies-only Large radius)

#### Extended Area Scaling

To use areas that extend beyond 60', you have to pay a -1 rank cost. This reduces the damage dealt by the spell and the debuff tier (if any), but you still use the spell's normal rank for calculating its area. In exchange, you get access to the following additional rank scaling options:

Rank 4 areas:
* Radius:
  * Small radius in Medium range

Rank 5 areas:
* Cone:
  * Huge cone from self
* Line:
  * Huge line, 15' wide from self
* Radius:
  * Huge radius from self
  * Medium radius in Medium range
  * Small radius in Long range

Rank 6 areas:
* Radius:
  * Medium radius in Long range

Rank 7 areas:
* Cone:
  * Gargantuan cone from self
* Line:
  * Gargantuan line, 15' wide from self
* Radius:
  * Gargantuan radius from self
  * Large radius in Medium range (a little odd, basically requires enemies-only)
  * Medium radius in Distant range

### Area Rank Modifiers

* +1 area rank: Only affects enemies in the area (except radius from self)
* +2 area rank: Only affects enemies in the area (radius from self).

## Walls and Barriers

Barriers are most effective in tunnel and constrained movement situations. They generally don't work as well on open battlefields. What is the correct size for a standard "you cannot pass" barrier? How should it scale with level?

* Rank 1: Small wall in Short range
* +1 rank: Short -> Med -> Long range
* +1 rank: +1x power HP
* +1 rank: Small -> Med wall
* +2 ranks: Med -> Large wall
* Wall HP:
  * Rank 1-2: 2x power
  * Rank 3-5: 3x power
  * Rank 6-8: 4x power
  * Rank 9: 5x power

Standard rank scaling is +1x power HP per 2 ranks.

## Stock effects

### Naming prefixes
THIS IS AN ORDERED LIST.
If a spell improves in multiple ways, use the first name in this list that applies.
* Efficient: lower requirements (on damage instead of on HP loss)
* Intense: a stronger (non-damaging) hostile effect, like dazed -> stunned
* Certain: more accuracy
* Massive: more AOE
* Empowered: a strong non-hostile numeric effect, like healing
* Greater: a stronger non-hostile, non-numeric effect, like phasestep -> greater phasestep
* Distant: more range
* Mighty: more damage

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
  * Then brief 0.2 EA (empowered)
* rX-2 damage:
  * First brief 0.2 EA (empowered)
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

## Attuned effects

It should be possible to calculate the effective action value of combat-relevant attunements.
