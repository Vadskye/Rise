# Accuracy vs. Damage

Total damage dealt is accuracy * flat damage * damage multipliers. If the system provides multiple separate ways to trade off parts of these three components, it may result in unintuitive or narratively inappropriate results.

For weapons, "flat damage" has multiple subcomponents:
Total flat damage = (weapon damage multiplier) * (weapon damage die + (power bonus) * (power multiplier)) + (extra damage).

If you are comparing a high accuracy / low damage weapon vs a low accuracy / high damage weapon, the correct answer depends on how high your power is, which relates to how high your Strength is. The higher your Strength, the more you prefer using a smaller, higher accuracy weapon that provides little damage. The lower your Strength, the more you prefer using a larger, lower accuracy weapon that provides high flat damage.

The existence of the Heavy tag can help increase the power of weapons with a high damage die by also increasing power scaling. However, there's nothing that intrinsically ties the Heavy tag to high damage dice. The ideal weapon for a a high Strength character would have the Heavy tag, a high accuracy bonus, and a low damage die. That still violates narrative expectations.

## Diminishing Returns and Scaling

The key to the whole system is the concept of diminishing returns. Hyperoptimizing any one of the components of damage tends not to be rewarding, so you want to balance your investment across as many axes as possible.

### Accuracy

Assume you start with a base hit rate of 60% (+0 vs 5 Armor, hit on a 5) and deal 10 damage when you hit.

* Baseline: 7.6dpr = 0.6 * 10 + 0.2 * 5 + 0.1 * 0.6 * 10 = 6 + 1 + 0.6
* +1 accuracy: 8.7 = 0.7 * 10 + 0.2 * 5 + 0.1 * 0.7 * 10 = 7 + 1 + 0.7
  * 13% more damage than previous accuracy increment
* +2 accuracy: 9.8 = 0.8 * 10 + 0.2 * 5 + 0.1 * 0.8 * 10 = 8 + 1 + 0.8
  * 12% more damage than previous accuracy increment
* +3 accuracy: 10.4 = 0.9 * 10 + 0.1 * 1 + 0.1 * 0.9 * 10 = 9 + 0.5 + 0.9
  * 6% more damage than previous accuracy increment
* +4 accuracy: 11 = 1.0 * 10 + 0 * 1 + 0.1 * 1.0 * 10 = 10 + 0 + 1
  * 5.7% more damage than previous accuracy increment
  * 45% more damage than +0 accuracy
* +5 accuracy: 11
  * 0% more damage than previous accuracy increment; double crit still requires 10 -> 10, which we ignore
* +6 accuracy: 11.1 = 1.0 * 10 + 0.1 * 10 + 0.1 * 0.1 * 10 = 10 + 1 + 0.1
  * ~0% more damage than previous accuracy increment; first chance to crit without exploding
* +7 accuracy: 12.2 = 1.0 * 10 + 0.2 * 10 + 0.1 * 0.2 * 10 = 10 + 2 + 0.2
  * 9% more damage than previous accuracy increment
* +8 accuracy: 13.3 = 10 + 3 + 0.3
  * 9% more damage than previous accuracy increment
* +9 accuracy: 14.4 = 10 + 4 + 0.4
  * 8% more damage than previous accuracy increment
* +10 accuracy: 15.5 = 10 + 5 + 0.5
  * 7.5% more damage than previous accuracy increment
  * 204% more damage than baseline

Getting your first few chunks of extra accuracy is a big deal, but it falls off fairly quickly. Different enemies have different defense values, and higher accuracy characters will generally be stronger against bosses while higher damage characters will generally be stronger against minions. However, high damage characters get more benefit from using abilities like desperate exertion to improve their boss damage, so the overall balance is reasonable.

Since accuracy has such inconsistent diminishing returns, it's hard to say precisely how much value you expect to gain from a +1 accuracy bonus. As a rough estimate, it's reasonable to say that +1 accuracy is worth 10% increased damage, with 10% -> 20% -> 30% diminishing returns.

### Damage Scaling
In one sense, damage is simpler than accuracy. It's obvious that increasing 10 flat damage to 12 flat damage is a 20% damage increase, with no complex math required.

On the other hand, damage scales with level while accuracy stays on more of a treadmill. This means that +2 damage is a different percentage increase at level 1 vs level 20, while +2 accuracy has roughly the same value at all levels.

One way to calculate reasonable damage values is to ask what damage increase is equivalent to +1 accuracy. As discussed above, we can use the assumption that +1 accuracy is worth +10% expected damage for this purpose. For a typical character with a high but still plausible damage investment, we use drX+1 damage, so:

* Rank 1: 0.8 damage
* Rank 2: 1.2 damage
* Rank 3: 1.5 damage
* Rank 4: 2.3 damage
* Rank 5: 3.3 damage
* Rank 6: 4.7 damage
* Rank 7: 6.1 damage

Or, for a larger value, -4 accuracy for +40% expected damage:

* Rank 1: 3.2 damage
* Rank 2: 4.6 damage
* Rank 3: 6.0 damage
* Rank 4: 9.1 damage
* Rank 5: 13 damage
* Rank 6: 19 damage
* Rank 7: 25 damage

### Tradeoffs and Diminishing Returns

Some abilities allow you to trade off one aspect of the damage equation for other aspects. This is dangerous because it extends the effective scaling of any individual aspect, allowing you to hyperoptimize that aspect without hitting diminishing returns.

Some amount of tradeoffs are necessary and narratively useful. However, tradeoffs should obey some constraints:
* The tradeoff should be balanced from the perspective of a character who has a high investment in the statistic being reduced, not a low investment. Characters should generally not use a tradeoff abilities that reduce statistics they are not investing in.
* Every tradeoff reward must also increase a statistic that is subject to diminishing returns. There is no accuracy or damage tradeoff that makes "double damage" a reasonable reward, because it's a simple math problem that is the same for all character types. Trading accuracy for flat damage is more reasonable because it becomes worse the higher your flat damage is.

### Maneuver Tradeoffs

Maneuvers that make tradeoffs coexist with weapons that also make tradeoffs, often in similar ways. A maneuver that directly trades accuracy for flat damage is generally best used with a small weapon, and a maneuver that directly trades flat damage for accuracy is generally best used with a large weapon.

One solution to this problem is to make the maneuver scale the weapon damage die rather than providing flat damage directly. However, this has two issues:
* What is the name of the weapon damage die, and how does it differ from the total damage dealt by the weapon including the power modifier? High level manuevers need to scale both the weapon damage die and the power multiplier, but not necessarily by the same amount.
* It's not easy to scale the weapon damage die by increments smaller than 2x/3x/4x. You can roll damage twice (+25% damage dice) or maximize damage (+75% damage dice).

The scaling differences between large and small weapons work better if you multiply total strike damage, but that breaks the rule of always providing a benefit that is subject to diminishing returns.

In general, tradeoff maneuvers work best if they have an easy way to directly multiply weapon damage dice. To avoid creating separate mechanics for "double weapon damage" and "double damage", that means tradeoff maneuvers should use empowered/maximized mechanics.

### Spell Tradeoffs

Spells can comfortably trade accuracy for damage since there is no "weapon" system that already makes the same tradeoff to conflict with.

#### Extra Defenses

Requiring any two defenses is +1dr, since that's roughly similar to -2 accuracy.

#### Power-scaling damage

In general, using a drX+1 spell instead of drX is about 25% more damage, and using a drX+2 spell is worth about 40-60% more damage. The drX+2 scaling is not even across ranks, with a breakpoint at rank 4.

However, most high damage spells will also be short or melee range. If you look at the difference between drX+1 and drX+2, you get different results, and dropping accuracy looks very weak at character ranks 1-2.

#### Flat damage

Flat damage spells work differently. They pretty consistently deal 40% more damage with each rank regardless of which rank you are currently at.

## Combined system

* Power-scaling spells:
  * You can trade -2 accuracy for +1 DR, or -4 accuracy for +2 DR, to a maximum of drX+3.
  * Requiring two defenses is worth +1 DR.
* Flat damage spells:
  * You can trade -3 accuracy for +1 DR.
  * Requiring two defenses with -1 accuracy is worth +1 DR.
  * Short range with -1 accuracy is worth +1 DR.
  * Short range with double defenses is worth +1 DR?
  * Melee range is worth +1 DR.
