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

#### -2 with lowish defenses
As a baseline, assume the enemy has a 70% chance to hit. Expected hits with 4 actions is 2.8 hits.

If they have a -2 accuracy penalty, they drop to a 50% chance to hit, so expected hits is 2 hits. 29% of enemy actions were removed. That means a -2 accuracy penalty has an effective action value of 4 * 0.29 = 1.2 effective actions.

#### -2 with 50% hit rate

Expected hits with 4 actions is 2 hits. With -2 accuracy, that's 30% chance to hit, so 1.2 hits. 40% of enemy actions were removed. That's worth 1.6 effective actions.

#### -2 with high defenses
As a baseline, assume the enemy has a 30% chance to hit. Expected hits with 4 actions is 1.2 hits.

If they have a -2 accuracy penalty, they drop to a 10% chance to hit, so expected hits is 0.4 hits. 67% of enemy actions were removed. That means a -2 accuracy penalty has an effective action value of 4 * 0.67 = 2.7 effective actions.

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

Overall, AOE action skip abilities have to be treated as stronger than single target action skip abilities, and they maybe shouldn't exist.

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

Deafened is basically the same as dazzled, except that the restriction is "spell with verbal components" rather than "targeted ability". It gets the same rare circumstance modifier as enraged, so call it 0.3.

### Enraged: 0.2

It's very hard to calculate the effectiveness of enrage. In a typical fight, enrage is basically worthless, but we can't penalize it too much for being rarely useful or else it would be overpowered whenever it actually mattered. Assume that an enraged enemy that is unable to use its preferred action because it is enraged has a replacement action that is 50% effective, and it would prefer to use that impossible action 10% of the time. That means enrage negates 5% of enemy actions, which is worth 0.2 effective actions to the party.

### Frightened by you: 0.6

Frightened is a more complicated and conditional effect than most debuffs. It has two components: a local accuracy penalty and a Mental defense debuff.

Assuming that the enemy attacks all party members equally, the frightened accuracy penalty applies 25% of the time, and it removes 29% of enemy actions when it applies (see Accuracy Penalties, above). Therefore, it is worth 4 * 0.25 * 0.4 = 0.29 effective actions on average, with a maximum effectiveness of 1.2 assuming that the enemy always attacks the source of their fear.

The attack penalty is trickier to calculate because the enemy could choose to attack a different target in the party, meaning they take no accuracy penalty. On the other hand, convincing an enemy to redirect their attacks may actually be better than an accuracy penalty if it gets them to stop attacking the most vulnerable member of the party. Also, unlike most debuffs, frightened "stacks" its action denial, allowing the party to eventually make the enemy frightened of the entire party. That edge case doesn't really apply to "frightened by you", but it does apply to "frightened by a chosen target". say "frightened by you" gets no benefit, and "frightened by a chosen ally" gets a 25% effectiveness boost.

The Mental defense penalty can apply to 7 party attacks (see Stunned). However, most party members can't take full advantage of a single-defense penalty like that, and even if they can attack Mental it may still be a relatively high defense for the monster. As a wild estimate, assume that half of the party's attacks can benefit from the defense penalty, and that this is still only relevant for half of monsters. When the penalty is relevant, it provides 0.2 effective actions per attack. That would be worth 7 * 0.5 * 0.5 * 0.2 = 0.35 effective actions on average, to a maximum of 1.4 effective actions assuming that every party member always attacks Mental defense.

That adds up to 0.79 effective actions for frighten.

### Frightened by ally: 0.7

As discussed above, this makes the frightened action denial 25% more effective.

### Frightened by all: 1.5

The normal frightened debuff assumes the target is only frightened by one creature. What if they are instead frightened by everything? In that case, it's a simple 29% action denial, which gives it 4 * 0.29 = 1.16 EA, plus the usual 0.35 EA from the defense penalty.

### Goaded: 0.6

Assuming that the monster attacks all party members equally, goaded applies to 75% of its attacks. However, a brief goad doesn't generally apply to 75% of a monster's attacks. More often, it will shift priorities to the goading creature, or attacking a non-goaded creature is still obviously correct because their defense is so low, reducing the value of the goad. With those combined, assume that it's closer to 50% of the monster's attacks.

Since goaded is 29% action denial when it applies, that gives it 4 * 0.5 * 0.29 = 0.6 action effectiveness.

### Immobilized: 5

The -4 defense penalty is worth 2 action effectiveness, following the same logic as being slowed.

Being unable to use movement speeds is hard to calculate, but it can effectively make fights trivial. Assume that it negates 75% of enemy actions, so it's worth 3 action effectiveness.

### Panicked: 2.3

Using the same logic as being frightened, the -4 Mental defense penalty is worth 0.7 effective actions on average, to a maximum of 2.8 effective actions.

Being unable to attack the source of its panic is complicated to calculate. It's not the same as fully negating all attacks against that target, because it can redirect attacks to affect other creatures. It does make it impossible for the creature to use full AOE abilities, which is significant. As with dazzled, assume that 75% of enemy actions are targeted and 25% are AOE. The targeted actions are only 75% of normal effectiveness, since they can't target a creature who may be the preferred target. The AOE attacks are also 75% of normal effectiveness since the protected target is immune to the attack. So assume that panicked negates 25% of enemy actions, meaning that it's worth 1 effective action.

There is an important edge case with panicked, which is that it can make it easy to fully negate a fight by having only the source of its fear fight, or by having the monster be panicked by all party members. In that scenario, assuming that the monster still fights at 75% effectiveness is misleading. This is hard to calculate; assume it makes the overall action denial 50% more effective, for a total of 1.5 effective actions from action denial.

### Prone: 1.6 (ranged) / 1 (melee)

A prone creature typically has a defense penalty against three attacks rather than the usual 7 from stun. Assume that 2 of the 3 attacks can take advantage of the defense penalty, giving it 0.4 action effectiveness from the defense penalty.

The movement penalty is about the same as a brief slow, but slightly more effective, so call that 1.2 effective actions.

If a prone or slow is applied by a melee ability, halve the EA contribution from the movement penalty, since that generally means it's not being used for full kiting.

### Push 15': 0.5 (ranged) / 0.3 (melee)

In many cases, a 15' push has no meaningful effect. Typically, forced movement is useful when combined with two things: kiting and battlefield hazards. In a kiting scenario, a 15' push will often force the target to sprint or charge, wasting a standard action. Triggering a battlefield hazard is generally worth half an action, since deployed hazards are generally less powerful than a full standard action attack. Assume that 75% of the time a push will be used for kiting and 25% of the time it will be used for battlefield hazards, and 25% of the time it will be irrelevant.

When used for kiting, a 15' push is basically the same EA as prone or slow, which we estimate as 1 effective action. Triggering a battlefield hazard is worth 0.5 EA. That gives a total EA value of (1 + 0.5 + 0)/3 = 0.5.

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

The miss chance applies to roughly 25% of boss attacks. Since blindness is worse than a regular 50% miss chance due to needing to know the square, call it 75% action negation when it applies. That gives it an action effectiveness of 4 * 0.25 * 0.75 = 0.75 effective actions. As with panicked, this is a little low and doesn't take into account the edge case of multiple people using this ability, but a 50% miss chance is much less effective at completely debilitating a boss than panicked. Say that the action denial is 25% more effective, for a total of 0.94 effective actions.

### Vulnerable: 2.8

Following the logic of being stunned, being vulnerable to all damage would be worth 2.8 action effectiveness. It's actually a little lower since it doesn't affect pure debuffs, but it also bypasses impervious/immune, so call that even.

## Named Buffs

Possible damaging buff effects:
* Roll damage twice, keep the higher result (~25% more for spells, ~10% more for strikes)
* Maximum damage (~75% more for spells, ~33% more for strikes)
* Double damage

### Braced
A braced character gains a +2 bonus to all defenses.

### Empowered
An empowered character rolls damage twice and keeps the higher result.

### Focused
A focused character rolls attacks rolls twice and keeps the higher result.

### Fortified
A fortified character gains a +2 bonus to their Fortitude and Mental defenses.

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
For this section, assume that all buffs only affect you for a single action.

For defensive buffs, assume that 50% of enemy attacks are targeting the recipient of the buff.
This is higher than the baseline 25% assuming a 4 person party, but takes into account both AOE attacks and the assumption that defensive buffs are generally applied to characters who are more in the front line and expect to be hit more often.

### Braced: 0.8

Braced applies 50% of the time, and it removes 40% of enemy actions when it applies. Therefore, it is worth 4 * 0.5 * 0.4 = 0.8 effective actions.

### +4 for crits: 0.2

Assume you have a 80% hit rate (+0 vs AD 3). Expected dpr is 0.9 from hit/glance and 0.1 * 0.8 = 0.08 from crit, so 0.98 total. With Deadly Fortune, it's the same 0.9 from hit/glance, but you crit on a 9, so 0.2 damage from crit, so 1.18 total. That's 20% more damage, so it's roughly the same as Empowered, but better for strike-based people since it works for attacks with fewer dice.

### Empowered: 0.2

Empowered is roughly 20% more damage, averaging arbitrarily between strikes and spells, which have different dice scaling.

### Focused: 0.4
Assume you have a 60% hit rate. 40% of the time, you reroll with Focused, and that hits 60% of the time. So your effective hit rate is 0.6 + 0.4 * 0.6 = 0.84. That's a 40% increase in your odds of hitting, so it's worth 0.4 effective actions.

### Fortified: 0.4
Like Braced, but only affects 50% of enemy attacks.

### Maximized: 0.9

Maximized is roughly 70% more damage for spells, and about half that for strikes. Assume that players will use other combos or resources to take advantage of their state while maximized, so give it a 25% bonus.

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

### Shielded: 0.6
Like Braced, but only affects 75% of enemy attacks

### Steeled: 0.4
Assume that 5% of enemy attacks would get a critical hit, and they deal double damage on a crit, so this negates 10% of enemy actions when relevant. That means it's worth 4 * 0.5 * 0.1 = 0.2 effective actions. However, this is tricky, because critical hits are inordinately likely to make the difference between winning and losing a fight. Arbitrarily double the effectiveness, making it worth 0.4 effective actions.

## Debuff Condition Action Effectiveness
Assume that a normal group combat lasts for 16 player effective actions, and a typical boss fight lasts for 20 player effective actions. If you apply a condition to a boss on round 1, it will have the opportunity to remove that condition at the end of rounds 2, 3, and 4. The condition lasts 1 + 1 + 5/6 * (1 + 5/6 * (1 + 5/6)) = 2 + 5/6 * (1 + 1.53) = 4.1 rounds.

Or, equivalently, 2 + 5/6 + (5/6)^2 + (5/6)^3 = 2 + 0.83 + 0.69 + 0.57 = 4.1. That's basically the same as the expected condition duration in a group fight, since non-elites can't remove conditions.

Basically, we can generally assume that a condition lasts for 4 rounds of combat. That generally means that the maximum player action count is 15, and 3 rounds of enemy attacks are affected by enemy attack debuffs.

### Action Denial

What is the correct action effectiveness of a hypothetical condition that prevents the boss from taking any actions? The answer is less than "infinity", because bosses can remove conditions, but it's worth more than 3 rounds of player attacks. (5/6)^n converges to 5, so it would theoretically affect 7 rounds of combat, or 6 boss attacks, so it's worth 6 * 4 = 24 effective actions.

Instead of calculating the individual modifier for dazzled and blinded, we can use a percentage of this value. However, also assume that blinded affects one fewer round than maximum and dazzled affects two fewer rounds than maximum, since they have to be manually reapplied.

* A -2 accuracy penalty is 29% action denial of 4 boss attacks = 4.6 effective actions.
* Blinded would remove 50% of 5 boss attacks = 10 effective actions.
* Dazzled would remove 20% of 75% of 4 boss attacks = 2.4 effective actions.
* Confusion is more similar to dazzled in duration because it also has a defense debuff, so it removes 35% of 4 boss attacks = 5.6 effective actions.
* Slowed should also use the dazzled baseline, so it removes 12.5% of 4 boss attacks = 2 effective actions.

### Action skip: 24

### Banishment: 16
Say that this is 75% of the effectiveness of a full action skip.

### Blinded: 14.2
Removing 50% of enemy actions is worth 24 * 0.5 = 12 effective actions.

Partially unaware is worth 2.2 effective actions using the same logic as being slowed.

### Confused: 8.6
Removing 35% of 4 boss attacks = 5.6 effective actions. The defense debuff is worth 3 effective actions, just like stunned.

### Dazzled: 2.4
See Action Denial, above.

### Deafened: 1.6
Deafened is roughly half as effective as dazzled because few monsters have verbal components. Basically, assume it functions as 10% action denial.

### Enraged: 1.6
Assume it functions as 10% action denial.

### Frightened by you: 2.0
As with the brief effect, assume frightened applies 25% of the time, so it is worth 4.6 * 0.25 = 1.2 effective actions from action denial.

Assuming the Mental penalty applies to 25% of attacks as before, it is worth 15 * 0.25 * 0.2 = 0.8 effective actions.

### Frightened by ally: 2.3

### Frightened by all: 5.4

29% action denial is worth 4.64 EA, plus the usual 0.8 EA from the defense penalty.

### Goaded: 2.3
Applies to 50% of actions with 29% action denial, so 16 * 0.5 * 0.29 = 2.32

### Immobilized: 19.4
Defense penalty is twice slow, so 4.4 effective actions from that. Assuming that being immobilized is 75% action denial for 5 rounds, it's worth 15 effective actions.

### Panicked: 7.6

The defense penalty is twice the Frightened penalty, so 1.6 effective actions.

As with the brief effect, assume 37.5% action denial over 4 rounds, so 6 effective actions.

### Prone: 7.2 (ranged) / 4.7 (melee)

Prone as a condition is basically the same as slow, but with a slightly more punishing action denial. Vaguely assume it's 25% more effective, so +1 EA (ranged) or +0.5 EA (melee).

### Single defense: 2.0

Choosing a single defense probably affects 10 of the 15 available player actions.

### Slowed: 6.2 (ranged) / 4.2 (melee)
We calculated the action denial from the speed debuff as 25% action denial, which is 4 effective actions. In melee, that would be 2 effective actions.
For the defense debuff, assume that 11 of the 15 party actions will take advantage of it, so it's worth 2.2 effective actions.

### Stunned: 3

15 affected player actions * 0.2 action effectiveness per action = 3 effective actions.

### Time Skip: 20

### Treat as invisible: 5.3

The defense penalty applies to 4 party attacks, so it provides 0.8 action effectiveness.

The blindness is 16 * 0.25 * 0.75 = 3 effective actions. The brief effect gets a 25% boost here, but a condition is easier to game by having only the invisible person stick around to fight, so give it a 50% boost to 4.5.

### Vulnerable: 6
Double stunned.

## HP-Only Condition Effectiveness

A condition that you can only apply after the target has entered HP is roughly the same power level as a brief effect. It has the upside of being able to last longer in boss fights or to fully remove non-elite enemies from the fight if they are in HP, but the downside of not working at all if the target has DR remaining.

Rather than directly referencing brief effects, it's safer to start from the normal boss condition calculations and work down. Brief effects and conditions calculate the power of enemy action denial differently, and action denial is still strong for HP debuffs on bosses given how much HP they have. Assume that an HP-only condition is worth a third of the effective action count of a regular condition.

## Area and Targets

All of the above calculations assume that the debuffs are affecting all enemies in the fight. However, actual spells always have targeting limitations and areas, so they may not affect all enemies. One balancing factor is to consider how strong a debuff is if it only affects a subset of the enemies of the fight. Specifically, if the debuff affects 50% of the enemies, is it 50% as strong?

In general, most debuffs benefit to the same small degree with precision targeting. Affecting 50% of the enemies gives you slightly more than 50% of the power of the effect. This generally involves tactical changes - you prioritize targeting the enemies affected by defense-reducing debuffs, and you avoid targeting the enemies with accuracy-reducing debuffs.

## Summary

By EA:
```
  Debuff             & Brief & HP Condition & Condition \\
  Action skip        & 2.0   & 8            & 24        \\
  Banishment         & 2.0   & 5.3          & 16        \\
  Blinded            & 3.0   & 4.7          & 14.2      \\
  Confused           & 2.8   & 2.9          & 8.6       \\
  Dazzled            & 0.6   & 0.8          & 2.4       \\
  Deafened           & 0.3   & 0.5          & 1.6       \\
  Enraged            & 0.2   & 0.3          & 0.8       \\
  Frightened by you  & 0.6   & 0.7          & 2.0       \\
  Frightened by ally & 0.7   & 0.8          & 2.3       \\
  Frightened by all  & 1.5   & 1.8          & 5.4       \\
  Goaded             & 0.6   & 0.6          & 2.3       \\
  Immobilized        & 5.0   & 6.5          & 19.4      \\
  Panicked           & 2.3   & 2.5          & 7.6       \\
  Prone (ranged)     & 1.6   & 2.4          & 7.2       \\
  Prone (melee)      & 1.0   & 1.6          & 4.7       \\
  Push 15' (ranged)  & 0.5   & N/A          & N/A       \\
  Push 15' (melee)   & 0.3   & N/A          & N/A       \\
  Single defense     & 1.0   & 0.7          & 2.0       \\
  Slowed (ranged)    & 2.0   & 2.0          & 6.2       \\
  Slowed (melee)     & 1.5   & 1.4          & 4.2       \\
  Stunned            & 1.4   & 1.0          & 3.0       \\
  Time skip          & 2.5   & 6.7          & 20        \\
  Treat as invis:    & 1.2   & 1.8          & 5.3       \\
  Vulnerable         & 2.8   & 2.0          & 6.0       \\
```

By rank:
"2d" means "rank 2 if combined with damage". It's used for effects that are too weak to ever appear as standalone spells.
"inf" means the effect is too strong to ever appear as a spell without weird tricks.
```
  Debuff             & Brief & HP Condition & Condition \\
  Action skip        & 4     & inf          & inf       \\
  Banishment         & 5     & inf          & inf       \\
  Blinded            & 9     & inf          & inf       \\
  Confused           & 8     & 9            & inf       \\
  Dazzled            & 2d    & 3d           & 6         \\
  Deafened           & 1d    & 2d           & 2         \\
  Enraged            & 0d    & 1d           & 3d        \\
  Frightened         & 3d    & 3d           & 4         \\
  Frightened by you  & 2d    & 3d           & 4         \\
  Frightened by ally & 3d    & 3d           & 6         \\
  Frightened by all  & 2     & 3            & inf       \\
  Goaded             & 2d    & 2d           & 6         \\
  Immobilized        & inf   & inf          & inf       \\
  Panicked           & 6     & 7            & inf       \\
  Prone (ranged)     & 2     & 6            & inf       \\
  Prone (melee)      & 4d    & 2            & inf       \\
  Push 15' (ranged)  & 2d    & N/A          & N/A       \\
  Push 15' (melee)   & 1d    & N/A          & N/A       \\
  Single defense     & 4d    & 3d           & 4         \\
  Slowed (ranged)    & 4     & 4            & inf       \\
  Slowed (melee)     & 2     & 1            & inf       \\
  Stunned            & 1     & 4d           & 9         \\
  Time skip          & 7     & inf          & inf       \\
  Treat as invis:    & 0     & 3            & inf       \\
  Vulnerable         & 8     & 4            & inf       \\
```

### Effective Action Modifiers

These modifiers apply to EA, as opposed to rank modifiers that apply after calculating EA and damage.

* +0.4 EA: You can combine a brief effect with an HP condition effect, starting from the higher EA of the two. For example, "briefly stunned, or stunned as a condition if out of DR" is a 2.0 EA effect.
* +1 EA: The effect becomes a Sustain (minor) zone that repeats its attack each round.
* +1 EA: The effect becomes a Sustain (minor) zone that repeats its attack each round. This also comes with -2dr, and the area must be a ranged radius (not a radius from self).

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

### Effective actions by rank

* Rank 1: 1.4
* Rank 2: 1.6 (1.55)
* Rank 3: 1.8 (1.75)
* Rank 4: 2
* Rank 5: 2.2 (2.21)
* Rank 6: 2.5
* Rank 7: 2.9 (2.86)
* Rank 8: 3.2 (3.16)
* Rank 9: 3.6 (3.57)
* Rank 10: 4.1 (4.09)

## Standard effects by rank

* Rank 1 (1.4 EA):
  * Briefly stunned
  * Goaded if in HP, +1 accuracy
  * Prone, +2 accuracy
  * Stunned as a HP condition, +2 accuracy
  * 1 EA of damage, briefly enraged
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

* +1 rank: Can pre-apply an HP condition (instead of only applying the condition if the target is already in HP, the condition automatically has its full effect as soon as the target is in HP)
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
* Tiny radius from self
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
  * Medium radius in Long range

### Area Rank Modifiers

* +2 area rank: Only affects enemies in the area.
