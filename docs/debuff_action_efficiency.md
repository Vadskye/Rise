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

Removing 50% of actions for a round is worth 50% of 4 = 2 effective actions. It doesn't affect AOE attacks, but it can also prevents normal targeting with even the 50% miss chance, so assume those cancel out.

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

### Frightened: 0.8

Frightened is a more complicated and conditional effect than most debuffs. It has two components: a local accuracy penalty and a Mental defense debuff.

Assuming that the enemy attacks all party members equally, the frightened accuracy penalty applies 25% of the time, and it removes 40% of enemy actions when it applies (see Accuracy Penalties, above). Therefore, it is worth 4 * 0.25 * 0.4 = 0.4 effective actions on average, with a maximum effectiveness of 1.6 assuming that the enemy always attacks the source of their fear.

The attack penalty is trickier to calculate because the enemy could choose to attack a different target in the party, meaning they take no accuracy penalty. On the other hand, convincing an enemy to redirect their attacks may actually be better than an accuracy penalty if it gets them to stop attacking the most vulnerable member of the party. Let's ignore that complexity here and stick with the 0.4 effective action estimate.

The Mental defense penalty can apply to 7 party attacks (see Stunned). However, most party members can't take full advantage of a single-defense penalty like that, and even if they can attack Mental it may still be a relatively high defense for the monster. As a wild estimate, assume that half of the party's attacks can benefit from the defense penalty, and that this is still only relevant for half of monsters. When the penalty is relevant, it provides 0.2 effective actions per attack. That would be worth 7 * 0.5 * 0.5 * 0.2 = 0.35 effective actions on average, to a maximum of 1.4 effective actions assuming that every party member always attacks Mental defense.

That adds up to 0.75 effective actions for frighten, which we'll round up to 0.8.

### Goaded: 1.2

Assuming that the monster attacks all party members equally, goaded applies to 75% of its attacks. However, a brief goad doesn't generally apply to 75% of a monster's attacks. More often, it will shift priorities to the goading creature, or attacking a non-goaded creature is still obviously correct because their defense is so low, reducing the value of the goad. With those combined, assume that it's closer to 50% of the monster's attacks.

Since goaded reduces the enemy's action effectiveness by 0.4 when it applies. That gives it 4 * 0.5 * 0.4 = 0.8 action effectiveness.

### Immobilized: 5

The -4 defense penalty is worth 2 action effectiveness, following the same logic as being slowed.

Being unable to use movement speeds is hard to calculate, but it can effectively make fights trivial. Assume that it negates 75% of enemy actions, so it's worth 3 action effectiveness.

### Panicked: 2.3

Using the same logic as being frightened, the -4 Mental defense penalty is worth 0.7 effective actions on average, to a maximum of 2.8 effective actions.

Being unable to attack the source of its panic is complicated to calculate. It's not the same as fully negating all attacks against that target, because it can redirect attacks to affect other creatures. It does make it impossible for the creature to use full AOE abilities, which is significant. As with dazzled, assume that 75% of enemy actions are targeted and 25% are AOE. The targeted actions are only 75% of normal effectiveness, since they can't target a creature who may be the preferred target. The AOE attacks are also 75% of normal effectiveness since the protected target is immune to the attack. So assume that panicked negates 25% of enemy actions, meaning that it's worth 1 effective action.

There is an important edge case with panicked, which is that it can make it easy to fully negate a fight by having only the source of its fear fight, or by having the monster be panicked by all party members. In that scenario, assuming that the monster still fights at 75% effectiveness is misleading. This is hard to calculate; assume it makes the overall action denial 50% more effective, for a total of 1.5 effective actions from action denial.

### Prone: 0.9

A prone creature typically has a defense penalty against three attacks rather than the usual 7 from stun. Assume that 2 of the 3 attacks can take advantage of the defense penalty, giving it 0.4 action effectiveness from the defense penalty.

The movement penalty is about the same as a brief slow, so call that 0.5 effective actions.

### Slowed: 1.5

Slowed has two effects: the movement speed debuff and the defense debuff.

The speed debuff is hard to calculate. It enables kiting, which can theoretically end some encounters, but that's a fairly rare circumstance. As a guess, assume that this forces the monster to use 25% of its actions to mitigate the speed debuff and that its replacement action is 50% as effective. For example, it may charge or sprint instead of making a stronger attack, and it may attack a frontline tank party member instead of being able to reach the backline. That gives it 0.25 * 4 * 0.5 = 0.5 effective actions.

The defense debuff is mostly the same as stunned, except that not all party members will be able to take advantage of it. Armor + Reflex is still fairly common, so assume that 5 of the 7 attacks will benefit from the defense debuff, for a total of 1 action effectiveness.

### Stunned: 1.4

If you stun an enemy as the first action of the round, the party has 7 attacks that can take advantage of the stun debuff: your three party members during the first round, and the full party during the second round.

### Time Skip: 2.5

This refers to removing a creature from existence for a round. That gives the party time to prepare during the intervening round, but doesn't allow the target the same benefit. This is better than banishment. However, most bosses don't have anything particularly useful to do while they are banished, since they can't recover and generally don't have healing abilities. Assume that a boss acts at 10% effectiveness while banished, so removing that is worth 0.4 effective actions, or maybe 0.5 total since they also don't get a condition removal roll.

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
An empowered character deals maximum damage.

### Focused
A focused character rolls attacks rolls twice and keeps the higher result.

### Fortified
A fortified character gains a +2 bonus to their Fortitude and Mental defenses.

### Primed
A primed character automatically explodes on their attacks. 90% of the time, this provides +5.5 accuracy, so this is worth +5 accuracy overall.

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

### Empowered: 0.7

Empowered is roughly 75% more damage, so it's worth 0.7 effective actions.

### Focused: 0.4
Assume you have a 60% hit rate. 40% of the time, you reroll with Focused, and that hits 60% of the time. So your effective hit rate is 0.6 + 0.4 * 0.6 = 0.84. That's a 40% increase in your odds of hitting, so it's worth 0.4 effective actions.

### Fortified: 0.4
Like Braced, but only affects 50% of enemy attacks.

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

### Enraged: 0.8
Assume it functions as 5% action denial.

### Frightened: 2
As with the brief effect, assume frightened applies 25% of the time, so it is worth 4.6 * 0.25 = 1.2 effective actions from action denial.

Assuming the Mental penalty applies to 25% of attacks as before, it is worth 15 * 0.25 * 0.2 = 0.8 effective actions.

### Goaded: 0.8
Applies to 50% of actions with 29% action denial, so 16 * 0.5 * 0.29 = 2.32

### Immobilized: 19.4
Defense penalty is twice slow, so 4.4 effective actions from that. Assuming that being immobilized is 75% action denial for 5 rounds, it's worth 15 effective actions.

### Panicked: 7.6

The defense penalty is twice the Frightened penalty, so 1.6 effective actions.

As with the brief effect, assume 37.5% action denial over 4 rounds, so 6 effective actions.

### Prone: 5.2

Prone as a condition is basically the same as slow, but with a slightly more punishing action denial. Vaguely assume it's worth an extra effective action.

### Slowed: 4.9
Unlike the brief effect, it's easier for a party to coordinate to waste the actions of a creature that is slowed as a condition. That increases the action denial to roughly 33% frequency with 50% replacement effect value, or 17% action denial over 4 rounds, so 2.7 effective actions.
For the defense debuff, assume that 11 of the 15 party actions will take advantage of it, so it's worth 2.2 effective actions.

### Stunned: 3

15 affected player actions * 0.2 action effectiveness per action = 3 effective actions.

### Time Skip: 20

### Vulnerable: 6
Double stunned.

## HP-Only Condition Effectiveness

A condition that you can only apply after the target has entered HP is roughly the same power level as a brief effect. It has the upside of being able to last longer in boss fights or to fully remove non-elite enemies from the fight if they are in HP, but the downside of not working at all if the target has DR remaining.

Rather than directly referencing brief effects, it's safer to start from the normal boss condition calculations and work down. Brief effects and conditions calculate the power of enemy action denial differently, and action denial is still strong for HP debuffs on bosses given how much HP they have. Assume that an HP-only condition is worth a third of the effective action count of a regular condition.

## Area and Targets

All of the above calculations assume that the debuffs are affecting all enemies in the fight. However, actual spells always have targeting limitations and areas, so they may not affect all enemies. One balancing factor is to consider how strong a debuff is if it only affects a subset of the enemies of the fight. Specifically, if the debuff affects 50% of the enemies, is it 50% as strong?

In general, most debuffs benefit to the same small degree with precision targeting. Affecting 50% of the enemies gives you slightly more than 50% of the power of the effect. This generally involves tactical changes - you prioritize targeting the enemies affected by defense-reducing debuffs, and you avoid targeting the enemies with accuracy-reducing debuffs.

## Summary

```
  Debuff      & Brief & HP Condition & Condition \\
  Action skip & 2.0   & 8            & 24        \\
  Banishment  & 2.0   & 5.3          & 16        \\
  Blinded     & 3.0   & 4.7          & 14.2      \\
  Confused    & 2.8   & 2.9          & 8.6       \\
  Dazzled     & 0.6   & 0.8          & 2.4       \\
  Deafened    & 0.3   & 0.5          & 1.6       \\
  Enraged     & 0.2   & 0.3          & 0.8       \\
  Frightened  & 0.8   & 0.7          & 2.0       \\
  Goaded      & 0.8   & 0.8          & 2.3       \\
  Immobilized & 5.0   & 6.5          & 19.4      \\
  Panicked    & 2.3   & 2.5          & 7.6       \\
  Prone       & 0.9   & 1.7          & 5.2       \\
  Slowed      & 1.5   & 1.6          & 4.9       \\
  Stunned     & 1.4   & 1.0          & 3.0       \\
  Time skip   & 2.5   & 6.7          & 20        \\
  Vulnerable  & 2.8   & 2.0          & 6.0       \\
```

## Effective Actions and Accuracy

A debuff's effective action count is measured assuming that the ability hits, but effective action count measures a value that does not assume a hit.

One "effective action" of damage is not the same as the damage dealt by a standard attack *on hit*; it corresponds to the damage dealt by that attack assuming average hit results. Consider a hypothetical "debuff" that inflicted 1 effective action of damage on hit. The correct value of that damage is about 0.7x the damage dealt by a spell of the same rank on hit.

Put another way, in order to be worth using, a debuff has to provide more than 1 effective action of value when it hits, because attacks deal more than 1 "effective action" of damage on hit. Since we generally assume a 70% hit chance, the standard effective action value for a rank 1 Medium debuff should be 1 / 0.7 = about 1.4 effective actions.

### Accuracy scaling

Since a rank 1 debuff should provide 1.4 effective actions of value on hit, what happens when it is used at rank 4? Automatic rank scaling means that it should hit 100% of the time at rank 4. To be of comparable power, a rank 4 spell would need to provide 1.4 / 0.7 = about 2 effective actions of value. Likewise, a rank 4 spell used at rank 7 hits 100% of the time, so a rank 7 spell should provide about 2.9 effective actions of value.

At low ranks, you can generally assume that giving a spell +1 accuracy is worth 0.2 effective actions.

### Accuracy penalties

Spells can have accuracy penalties to get access to more powerful debuffs early. However, starting from a baseline hit rate of 0.7 would cause that to scale too quickly - most people who cast those spells don't actually have a baseline hit rate of 70% with a normal spell thanks to various character specializations. In addition, this category of spell is extremely powerful in combination with setup effects and Desperate Exertion. At the risk of being overly penalizing, start with an assumed hit rate of 100% when calculating power.

For example, a rank 1 spell normally provides 1.4 EA of value on hit. A rank 1 spell with a -4 accuracy penalty would instead provide 1.4 / 0.7 = 2.2 EA of value on hit. This only affects debuff tier, not area. Although the rank 1 spell will have the same accuracy and debuff effect as a standard rank 5 spell when cast at rank 5, it will still be significantly behind a "normal" spell of the higher rank after rank scaling is applied.

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
  * Briefly goaded, +1 accuracy
  * Goaded if in HP, +1 accuracy
  * Prone, +2 accuracy
  * Stunned as a HP condition, +2 accuracy
  * 1 EA of damage, briefly enraged
  * 1 EA of damage, briefly deafened
  * Briefly confused, -3 accuracy
* Rank 2 (1.6 EA):
  * 1 EA of damage, briefly dazzled
  * Briefly slowed
  * Slowed as a HP condition
  * Deafened as a condition
* Rank 3 (1.8 EA):
  * 1 EA of damage, briefly frightened
  * 1 EA of damage, frightened as a HP condition
  * 1 EA of damage, goaded as a HP condition
  * Vulnerable as a HP condition
* Rank 4 (2 EA):
  * Action skip
  * Banished
  * Frightened as a condition
  * 1 EA of damage, briefly prone
  * 1 EA of damage, stunned as a HP condition
* Rank 5 (2.2 EA):
  * Briefly panicked
* Rank 6 (2.5 EA):
  * 1 EA of damage, briefly slowed
  * 1 EA of damage, briefly stunned
  * Dazzled as a condition
  * Panicked as a HP condition
  * Time skip
* Rank 7 (2.9 EA):
  * 1 EA of damage, action skip
  * 1 EA of damage, banishment
  * Briefly blinded
  * Briefly confused
  * Briefly vulnerable
  * Confused as a HP condition
  * Stunned as a condition
* Rank 8 (3.2 EA):
  * 1 EA of damage, frightened as a HP condition
* Rank 9 (3.6 EA):
  * 1 EA of damage, dazzled as a condition
* Rank 10 (4.1 EA):
  * 
* Rank 11 (4.6 EA):
  * 

### Debuff + Damage

If a debuff deals damage, the damage depends on the area affected by the debuff. A standard area debuff deals drX-2 damage, which is about 65% of drX damage. A single-target debuff deals drX-1 damage, which is about 80% of drX damage.

### Strike-based debuffs

A strike with unrestricted weapon types uses "limited scope", so -1 rank. A melee-only strike uses melee-only, so -2 ranks. In either case, use the following scaling for damage:

* Rank 1: Normal damage
* Rank 3: +1 accuracy, normal damage
* Rank 5: -1 accuracy, 2x damage
* Rank 7: -1 accuracy, 3x damage

These accuracy modifiers are separate from the normal accuracy modifier calculation, and do not directly affect the resulting rank of the debuff.

#### Specific strike-based effects
* Rank 1:
  * Unrestricted:
    * Strike and 0.6 EA debuff
    * Strike, if beat Fort/Ment, 0.8 EA debuff
    * Strike while affected by non-accuracy buff, 1 EA debuff
  * Melee only:
    * Strike and 0.8 EA debuff
    * Strike, if beat Fort/Ment, 1 EA debuff
    * Strike while affected by non-accuracy buff, 1.2 EA debuff
* Rank 3:
  * Unrestricted:
    * +1a strike and 1 EA debuff
    * +1a strike, if beat Fort/Ment, 1.2 EA debuff
    * +1a strike while affected by non-accuracy buff, 1.5 EA debuff
  * Melee only:
    * +1a strike and 1 EA debuff
    * +1a strike, if beat Fort/Ment, 1.2 EA debuff
    * +1a strike while affected by non-accuracy buff, 1.9 EA debuff
* Rank 5:
  * Unrestricted:
    * -1a double damage strike and 1.5 EA debuff
    * -1a double damage strike, if beat Fort/Ment, 1.9 EA debuff
    * -1a double damage strike while affected by non-accuracy buff, 2.2 EA debuff
  * Melee only:
    * -1a double damage strike and 1.9 EA debuff
    * -1a double damage strike, if beat Fort/Ment, 2.2 EA debuff
    * -1a double damage strike while affected by non-accuracy buff, 2.6 EA debuff
* Rank 7:
  * Unrestricted:
    * -1a triple damage strike and 2.2 EA debuff
    * -1a triple damage strike, if beat Fort/Ment, 2.6 EA debuff
    * -1a triple damage strike while affected by non-accuracy buff, 3.1 EA debuff
  * Melee only:
    * -1a triple damage strike and 2.6 EA debuff
    * -1a triple damage strike, if beat Fort/Ment, 3.1 EA debuff
    * -1a triple damage strike while affected by non-accuracy buff, 3.6 EA debuff

### Rank modifiers

All rank modifiers apply after calculating EA and the debuff to be applied.

These rank modifiers apply before calculating area and damage:

* -1 rank: Must beat two defenses instead of one, one of which is Reflex
* -1 rank: Damage requires one defense, debuff requires beating a separate non-Reflex defense
* -1 rank: Effect is inescapably delayed by one round
* -1 rank: -1 accuracy (max -4)
* -1 rank: Limited scope (see Debuff Area, below)
* -1 rank: Easy combo condition:
  * Target must have already taken damage this round
  * Target must have one of your allies adjacent to it
  * You must be focused or primed
* -2 ranks: Effect is escapably delayed by one round (can leave area) - can't be combined with enemies-only area targeting
* -2 ranks: Must beat two non-Reflex defenses instead of one
* -2 ranks: Condition is removed when the target takes damage
* -2 ranks: Condition can be removed with movement (burning Dex check)
* -2 ranks: Melee range (see Debuff Area, below)
* -2 ranks: Difficult combo condition:
  * You must be one of braced, empowered, fortified, shielded, or steeled (no accuracy buff)

These rank modifiers apply after calculating area and damage:

* +1 rank: Can pre-apply an HP condition (instead of only applying the condition if the target is already in HP, the condition automatically has its full effect as soon as the target is in HP)
* +1 rank: Condition becomes a Sustain (minor)
* +2 ranks: Condition becomes a curse

## Debuff Area

All of the effective action calculations assume that every enemy in the fight is affected by the debuff. For that reason, a "standard" debuff affects a large area: a rank X spell uses a Tier X+1 area (see Area Tiers, below).

### Limited Scope Debuffs

You can apply a stronger debuff if you are willing to affect fewer enemies. There are three versions of a limited scope debuff:
* Rank - 1: Tier X / 2 area, to a minimum at Tier 0/1 of a single creature within 30' range
* Rank - 2: Single target melee range

### Area Tiers

Tier 0 areas:
* Tiny radius from self
* Small line, 5' wide from self

Tier 1 areas:
* Small cone from self
* Medium line, 5' wide from self
* Small line, 10' wide from self
* Small radius from self
  * This is obviously a larger area than a cone or line, but is also much harder to aim to only hit enemies
* Tiny radius in Short range
  * This should be rare, since it's more flexible than other tier 1 ranges but is too weak for tier 2

Tier 2 areas:
* Medium cone from self
* Large line, 5' wide from self
* Medium line, 10' wide from self
* Medium radius from self
* Tiny radius in Med range
* Small radius in Short range

Tier 3 areas:
* Large cone from self
* Large line, 10' wide from self
* Large radius from self
* Small radius in Med range

Tier 4 areas:
* Huge line, 10' wide from self
* Large line, 15' wide from self
* Medium radius in Med range
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
* Large radius in Long range
* Medium radius in Distant range
* Small radius in Extreme range

Tier 7 areas:
* Huge radius in Long range
* Medium radius in Extreme range

## Examples

### Maneuvers

* Rank 1
  * Unrestricted strike, briefly dazzle if it deals damage
  * Melee strike, goaded as a HP condition
  * Melee strike, briefly frightened
  * Melee strike, frightened as a HP condition
