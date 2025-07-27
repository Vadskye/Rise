# Debuff Action Efficiency

Debuffs can be grouped according to their action efficiency. Essentially, making a normal damaging attack is worth 1 "effective action". Each debuff can have its effective action count calculated. The effectiveness of many debuffs scales with party size. For this purpose, we assume a party size of 4. In general, debuffs are more effective with larger parties, but that's consistent across all debuffs and doesn't affect the relative tier of debuffs.

## Summary

By EA:
```
  Debuff             & Brief & HP Condition & Condition \\
  Action skip        & 3.0   & 4.8          & 12        \\
  Action skip (HP)   & 2.0   & 4.8          & N/A        \\
  Banishment         & 3.0   & 3.6          & 9         \\
  Banishment (HP)    & 2.0   & 3.6          & N/A         \\
  Blinded            & 3.4   & 3.6          & 9.0       \\
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
  Submerged          & 2.5   & 2.6          & 6.6       \\
  Single defense     & 1.0   & 0.8          & 2.0       \\
  Slowed (ranged)    & 2.0   & 2.1          & 5.2       \\
  Slowed (melee)     & 1.5   & 1.5          & 3.7       \\
  Stunned            & 1.4   & 1.2          & 3.0       \\
  Time skip          & 3.5   & 4.3          & 10.8      \\
  Treat as invis:    & 1.2   & 1.6          & 4.0       \\
  Vulnerable         & 3.5   & 3.0          & 7.5       \\
```

By rank:
"2d" means "rank 2 if combined with damage". It's used for effects that are too weak to ever appear as standalone spells.
"inf" means the effect is too strong to ever appear as a spell without weird tricks.
```
  Debuff             & Brief & HP Condition & Condition \\
  Action skip        & 9     & inf          & inf       \\
  Action skip (HP)   & 4     & inf          & N/A       \\
  Banishment         & 9     & inf          & inf       \\
  Banishment (HP)    & 4     & inf          & N/A       \\
  Blinded            & 11    & inf           & inf       \\
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
  Submerged          & 7     & 7            & inf       \\
  Time skip          & inf   & inf          & inf       \\
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

* +0.8 EA: Condition becomes a static zone that does not require attacks or persist effects on creatures that leave - Sustain (attuneable, minor)
* -0.2 EA: Condition becomes a static zone that does not require attacks or persist effects on creatures that leave - Sustain (attuneable, standard)
* x0.4 EA: Condition becomes a HP-only condition
* +0.2 EA: Condition becomes a Sustain (minor)
* +0.4 EA: Can prefire an HP condition (instead of only applying the condition if the target is already in HP, the condition automatically has its full effect as soon as the target is in HP)
* +0.4 EA: You can combine a brief effect with an HP condition effect, starting from the higher EA of the two. For example, "briefly stunned, or stunned as a condition if out of DR" is a 2.0 EA effect.
* +0.4 EA: Condition becomes a curse
* +1 EA: The effect becomes a Sustain (minor) zone that repeats its attack each round. This also comes with -2dr, and the area must be a ranged radius (not a radius from self).
* -1 EA: The effect only works if you hit the creature with it twice.
* -2 EA: The effect only works if you hit the creature with it twice, both times while it is in HP.

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

#### -1 with 50% hit rate:

2.4 normal, 40% chance to hit with -1, so 1.6 hits + 0.4 glance = 2.0. ~17% of enemy actions were removed, which is worth 0.7 effective actions.

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

### Action skip: 3.0

Skipping a standard action is tricky, since that removes 50% of a boss's action and 100% of a regular enemy's action. Against a boss, removing 50% of their actions is worth 2 effective actions. Against a normal enemy, removing 100% of their actions is worth 4 effective actions. But if you assume there are as many normal enemies as party members, using a single target action skip is worth only 1 effective action.

However, this understates the power of a full action skip. Many EA calculations make some mitigating assumptions, such as assuming that the party coordinates to take advantage of the debuff, or that you use it early enough in the fight to get its full benefit. Action skips are unconditionally powerful, and are an easy way to turn a fight into a non-fight. For no specific reason, give them a 50% EA bonus.

Overall, AOE action skip abilities have to be treated as stronger than single target action skip abilities, and they maybe shouldn't exist. For now, assume that action skip must always be combined with the "limited scope" modifier.

As with all full action denial effects, this always comes with a "once per creature" restriction.

### Action skip (HP only): 2.0

Say that requiring HP makes this 2/3 as effective?

### Banishment: 3.0

Fully removing a creature from combat is tricky. Against a boss, it removes both their standard action and their elite action, so it should theoretically be worth 4 effective actions. However, the party can't attack the boss, so it should be worth 0 effective actions. As a kind of lazy middle ground, we call this 2 effective actions; the party can spend some time to prepare for the boss, but their actions while the boss is gone are generally going to be less than 100% effective. This gets the usual 50% total action skip multiplier.

Note that this refers to the variation of banishment where the target also gets to take actions while it is in limbo. If they don't get to take actions, but are still invulnerable during the skipped round, see Time Skip.

As with all full action denial effects, this always comes with a "once per creature" restriction.

### Blinded: 3.4

Removing 50% of actions for a round is worth 50% of 4 = 2 effective actions. It doesn't affect AOE attacks, but it can also prevent normal targeting with even the 50% miss chance, so assume those cancel out.

In addition, a blinded creature is partially unaware of attacks. Using the same calculations as stunned, that's worth 1.4 effective action.

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

### Submerged: 2.5

1.3 from Braced (all) 1.2 from Armor/Ref defense penalty = 2.5.

### Stunned: 1.4

If you stun an enemy as the first action of the round, the party has 7 attacks that can take advantage of the stun debuff: your three party members during the first round, and the full party during the second round.

### Teleport 15': 1.1 (ranged) / 0.6 (melee)

Teleportation is often the same as a push. It's slightly more effective at navigating odd obstacles, so give it +0.2 EA over a push, so call it 1.1 / 0.6.

### Teleport 30': 2.2 (ranged) / 1.7 (melee)

+0.2 EA over push

### Time Skip: 3.5

This refers to removing a creature from existence for a round. That gives the party time to prepare during the intervening round, but doesn't allow the target the same benefit. This is better than banishment. However, most bosses don't have anything particularly useful to do while they are banished, since they can't recover and generally don't have healing abilities. Assume that a boss acts at 10% effectiveness while banished, so removing that is worth 0.4 effective actions, or maybe 0.5 total since they also don't get a condition removal roll.

### Treat as invisible: 1.2

There are two components to being treated as invisible: the defense penalty and the miss chance.

The defense penalty only applies to your own attacks, so the party has 1 attack that can take advantage of it, so it's worth 0.2 effective actions.

The miss chance applies to roughly 25% of boss attacks. Since blindness is worse than a regular 50% miss chance due to needing to know the square, call it 75% action negation when it applies. In particular, if they treat you as briefly being invisible, they often can't follow you if you move away during the movement phase. That gives it an action effectiveness of 4 * 0.25 * 0.75 = 0.75 effective actions. As with panicked, this is a little low and doesn't take into account the edge case of multiple people using this ability, but a 50% miss chance is much less effective at completely debilitating a boss than panicked. Say that the action denial is 25% more effective, for a total of 0.94 effective actions.

### Vulnerable: 3.5

Following the logic of being stunned, being vulnerable to all damage would be worth 2.8 action effectiveness. Add 25% effectiveness because it negates impervious/immune, so 3.5 EA.

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

### Blinded: 9
Removing 50% of enemy actions is worth 12 * 0.5 = 6 effective actions.

Partially unaware is worth 3 effective actions using the same logic as being stunned.

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

### Submerged: 6.6

4 EA from accuracy penalty plus 2.6 EA from Armor/Reflex penalty = 6.6 EA

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
* Rank - 1: Rank X / 2 area, to a minimum of rank 0
* Rank - 2: Single target melee range

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
