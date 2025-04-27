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

## Calculating Specific Debuffs

In this context, we assume that each debuff is applied as a brief effect.

### Action skip: 2.0

Skipping a standard action is tricky, since that removes 50% of a boss's action and 100% of a regular enemy's action. Against a boss, removing 50% of their actions is worth 2 effective actions. Against a normal enemy, removing 100% of their actions is worth 4 effective actions. But if you assume there are as many normal enemies as party members, using a single target action skip is worth only 1 effective action.

Overall, AOE action skip abilities have to be treated as stronger than single target action skip abilities, and they maybe shouldn't exist.

### Banishment: 2.0

Fully removing a creature from combat is tricky. Against a boss, it removes both their standard action and their elite action, so it should theoretically be worth 4 effective actions. However, the party can't attack the boss, so it should be worth 0 effective actions. As a kind of lazy middle ground, we call this 2 effective actions; the party can spend some time to prepare for the boss, but their actions while the boss is gone are generally going to be less than 100% effective.

Note that this refers to the variation of banishment where the target also gets to take actions while it is in limbo. If they don't get to take actions, but are still invulnerable during the skipped round, see Time Skip.

### Blinded: 3.0

Removing 50% of actions for a round is worth 50% of 4 = 2 effective actions.

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

### Enraged: 0.3

It's very hard to calculate the effectiveness of enrage. In a typical fight, enrage is basically worthless, but we can't penalize it too much for being rarely useful or else it would be overpowered whenever it actually mattered. Assume that an enraged enemy that is unable to use its preferred action because it is enraged has a replacement action that is 50% effective, and it would prefer to use that impossible action 25% of the time. That means enrage negates 12.5% of enemy actions, which is worth 0.5 effective actions to the party. In practice, this circumstance is rare, so enraged is worth more like 0.3 effective actions.

### Frightened: 0.6

Frightened is a more complicated and conditional effect than most debuffs. It has two components: a local accuracy penalty and a Mental defense debuff.

Assuming that the enemy attacks all party members equally, the frightened accuracy penalty applies 25% of the time, and it removes 20% of enemy actions when it applies. Therefore, it is worth 4 * 0.25 * 0.2 = 0.2 effective actions on average, with a maximum effectiveness of 0.8 assuming that the enemy always attacks the source of their fear.

The attack penalty is trickier to calculate because the enemy could choose to attack a different target in the party, meaning they take no accuracy penalty. On the other hand, convincing an enemy to reidrect their attacks may actually be better than an accuracy penalty if it gets them to stop attacking the most vulnerable member of the party. Let's ignore that complexity here and stick with the 0.2 effective action estimate.

The Mental defense penalty can apply to 7 party attacks (see Stunned). However, most party members can't take full advantage of a single-defense penalty like that, and even if they can attack Mental it may still be a relatively high defense for the monster. As a wild estimate, assume that half of the party's attacks can benefit from the defense penalty, and that this is still only relevant for half of monsters. When the penalty is relevant, it provides 0.2 effective actions per attack. That would be worth 7 * 0.5 * 0.5 * 0.2 = 0.35 effective actions on average, to a maximum of 1.4 effective actions assuming that every party member always attacks Mental defense.

That adds up to 0.55 effective actions for frighten, which we'll round up to 0.6 since it's so close to dazzled anyway and the maximum effectiveness is so high.

### Goaded: 0.6

Assuming that the monster attacks all party members equally, goaded applies to 75% of its attacks, and reduces its action effectiveness by 0.2 when it applies. That gives it 4 * .75 * .2 = 0.6 action effectiveness.

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

#### Typical defenses

As a baseline, assume that all four party members have a 70% chance to hit. Expected hits with 8 regular attacks is 5.6.

If you use your first action for a stun, you have a 70% chance to apply the effect, which would result in 7 attacks at a 90% chance to hit, or 6.3 hits. You also have a 30% chance to miss, which results in 7 attacks at a 70% chance to hit, or 4.9 hits. That means the expected hit count when using the stun is 6.3 * .7 + 4.9 * .3 = 4.4 + 1.5 = 5.9.

The difference between you doing nothing and using the stun was therefore 5.9 - 4.9 = 1. In this scenario, stun was worth 1 full effective hit when a regular attack would only be worth 0.7 effective hits, so stun is worth 1.4 effective actions.

#### High defenses

Now assume that all four party members have a 10% chance to hit. Expected hits with 8 regular attacks is 0.8.

If you use your first action for a stun, you have a 10% chance to apply the effect, which would result in 7 attacks at a 30% chance to hit, or 2.1 hits. You also have a 90% chance to miss, which results in 7 attacks at a 10% chance to hit, or 0.7 hits. That means that the effective hit count when using the stun is 2.1 * .1 + .7 * .9 = .21 + .63 = .84.

The difference between you doing nothing and using the stun was therefore .84 - .7 = .14. In this scenario, stun was worth .14 full hits when a regular attack would only be worth .1 hits, so stun is worth 1.4 effective actions.

#### Conclusion

Stun is worth 0.2 action effectiveness per attack it affects, for a total of 1.4 action effectiveness.

#### Vulnerable: 2.4

Following the logic of being stunned, being vulnerable to all damage would be worth 2.8 action effectiveness. It's actually a little lower since it doesn't affect pure debuffs, so assume that it affects 6 of the 7 actions, making it worth 2.4 action effectiveness.
