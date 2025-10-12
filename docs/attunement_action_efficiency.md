# Attunement action efficiency

It should be possible to calculate the effective action value of combat-relevant attunements.
Since they start the combat active and aren't removed like enemy conditions, an attunement functions for all 5 rounds of a typical combat. Therefore, action denial buffs start from a baseline of 20 EA, and offensive buffs affect 5 player actions.

As with active buffs, assume that a self-buff works 33% of the time for normal buffs, or 25% of the time for buffs that only affect targeted attacks, like a miss chance.

Self-buff spells should have the same EA target as weapons and armor, which is a higher target than apparel with less limited slots. That means:

* Rank 1: 15% boost, so ~0.75 EA
* Rank 3: 20% boost, so 1 EA
* Rank 5: 25% boost, so ~1.25 EA
* Rank 7: 30% boost, so 1.5 EA

Apparel is 5% lower, so:
* Rank 1: 10% boost, so 0.5 EA
* Rank 3: 15% boost, so ~0.75 EA
* Rank 5: 20% boost, so 1 EA
* Rank 7: 25% boost, so ~1.25 EA

## Specific effects

### +1 Accuracy: 1.0

As with weapons, we treat +1 accuracy as 0.2 EA per hit, and this applies to 5 actions, so 1 EA.

### +2 accuracy: 1.5

As with weapons, we treat +2 accuracy as 0.3 EA per hit, so 1.5 EA.

### Singleton +5 accuracy: 0.7

### Braced: 2.2

If you could be braced as an attunement, it would be 33% action denial that works 33% of the time, so 20 / 3 / 3 = 2.2 EA. That's too powerful for a single attunement, but within scope for a deep attunement.

### Empowered: 2.0

0.4 EA * 5 actions = 2.0 EA

### Evasion

Assume that 75% of abilities attack Armor and Reflex, 50% of abilities that target you are area attacks, 50% of area attacks that target you miss or glance, and this protects you from the 50% damage that you would take from the miss / glance. That's 20 / 3 * 0.75 * 0.5 * 0.5 * 0.5 = 0.6 EA. That's a lot of assumptions, so call it rank 2 to match rogue, but it's definitely not a deep attunement.

### Fortified: 1.6

0.325 EA * 5 actions = 1.6 EA

### 25% extra damage: 1.25

0.25 EA * 5 actions = 1.25

### Focused: 2.0

0.4 EA * 5 actions = 2 EA

### Shielded: 1.6

0.325 EA * 5 actions = 1.6 EA

### Singleton focused: 0.6

A non-action focus is comparable in power to an "ally" buff, since you can combine it fully with other setup effects and it doesn't cost an action by itself.

### Vital rolls: ???

Tricky to calculate in terms of EA. In most fights, this won't do anything, even if you do take a vital wound. However, this also makes you *much* less likely to die. Without making any actual EA calculation, use arbitrary values to make reasonable ranks:

* +1: 0.5 EA
* +2: 1.0 EA
* +3: 1.5 EA

### Uncommon reactive debuff

Assume that the trigger for uncommon reactive debuff happens 50% of the time, so it makes a total of 2.5 attacks per fight. That means the correct EA value is (rank EA) / 2.5.

So the EA of the debuff is:
* Rank 2: 0.7 EA (1.75 / 2.5)
* Rank 3: 0.8 EA (2 / 2.5)
* Rank 4: 0.9 EA
* Rank 5: 1 EA
* Rank 6: 1.1 EA
* Rank 7: 1.2 EA

As an example, assume that the debuff is a brief stun. Each time it triggers on an enemy turn, it affects 4 party attacks, so 0.8 EA. It triggers 2.5 times during the fight, so it's worth 2 EA overall. That matches up with a rank 3 deep attunement.

### Uncommon reactive damage: 1.75-3.0

Assume that the trigger for uncommon reactive damage happens 50% of the time, so it makes a total of 2.5 attacks per fight. That means the correct damage multiplier is (rank EA) / 2.5.

* Rank 2: 70% damage (0.7 EA * 2.5 attacks = 1.75 EA)
* Rank 3: 80% damage (0.8 EA * 2.5 attacks = 2 EA)
* Rank 4: 90% damage
* Rank 5: 100% damage (1 EA * 2.5 attacks = 2.5 EA)
* Rank 6: 110% damage
* Rank 7: 120% damage (1.2 EA * 2.5 attacks = 3 EA)

Translating that into usable scaling:
* Rank 2: dr1 (80% damage, but weak scaling)
* Rank 3: ???
* Rank 4: dr3 (86% damage)
* Rank 5: dr5 (100% damage)
* Rank 6: ???
* Rank 7: dr8 (120% damage)

### Common reactive damage: 

Assume that the trigger for common reactive damage happens 75% of the time, so it makes a total of 3.75 attacks per fight. So the damage multiplier is (rank EA) / 3.75.

* Rank 3: (2 EA / 3.75 = 53% damage)
* Rank 4: (2.25 EA / 3.75 = 60% damage)
* Rank 5: (2.5 EA / 3.75 = 67% damage)
* Rank 6: (2.75 EA / 3.75 = 73% damage)
* Rank 7: (3 EA / 3.75 = 80% damage)

Translating that into usable scaling:
* Rank 3: 1d4 + half power (53%)
* Rank 4: full power (61%)
* Rank 5: dr3 (66%)
* Rank 6: dr4 (73%)
* Rank 7: dr6 (81%)

### Singleton reactive damage:

Assume that the trigger for the damage will happen exactly once per fight and is generally easy to trigger, so it will happen on round 1 or 2. As with the singleton reactive debuff, we use the EA value *assuming a hit*, because this sort of effect is scary from an action economy perspective. Also, this sort of effect can "double dip" from other attunements and bonuses, so the scaling needs to drop off at higher levels. So:

* Rank 1: dr0 (75%)
* Rank 2: 1d8 + half power (89%)
* Rank 3: dr3 (100%)
* Rank 4: dr4 (107%)
* Rank 5: dr5
* Rank 6: dr6
* Rank 7: dr7

If the reaction is hard to trigger, such as requiring total defense or recover, it gets +1 rank on the above scale.

Singleton echo/repeat is rank 5 / 125% on this scale because it's more versatile than a simple damage value.

Note that this assumes single-target damage. AOE damage would be lower as normal based on AOE relative to drX.

### Singleton extra damage:

Extra damage is tricky because it can be attached to any spell, including AOE spells, spells with unusually high accuracy, or spells that double extra damage multipliers. At low ranks, none of those shenanigans are possible, so it should have a greater discount at higher ranks. Calculate damage relative to singleton reactive damage, except that it doesn't power scale.

Note that this requires a minor action to activate to avoid stacking multiple attunements on the same attack.

* Rank 1: 1d6 (78% of dr0)
* Rank 2: 1d10 (69% of 1d8 + half power)
* Rank 3: 2d6 (54% of dr3)
* Rank 4: 2d8 (50% of dr4)
* Rank 5: 2d10 (44% of dr6)
* Rank 6: 4d6 (40% of dr6)
* Rank 7: 4d10 (43% of dr7)

### Singleton reactive debuff: ???

Assume that the trigger for the reactive debuff always happens, but it is limited to once per creature. That means it makes 1 attack per fight. However, incremental bonuses that add up to some EA value over a long fight are different from this sort of immediate trigger that happens on round 1. For that reason, unlike the minor action attack system that assumes that each attack is worth 1 EA, we use the direct EA value of the debuff, keeping in mind that brief
debuffs often have additional effect:
* Briefly stunned: 1.6 EA, since it affects your first attack too
* Briefly dazzled: 1.2 EA, since it affects two rounds of enemy attacks instead of one
* Briefly frightened by you: 1.2 EA, since 0.8 EA from double action denial and 0.4 EA from Mental debuff

This all counts EA *assuming a hit*, which is different from how we normally count buff/attunement effects. For now, let's test ignoring this discrepancy since auto-attacks are scary from an action economy perspective.

### Minor action attack: 1.75-3.0 EA

A minor action attack makes 5 attacks per combat, so the correct damage multiplier is (rank EA) / 5.Minor action attacks do not apply extra damage because that seems like a scary double stacking vector.

* Rank 2: 35% damage
* Rank 3: 40% damage = 2 EA / 5
* Rank 4: 45% damage
* Rank 5: 50% damage = 2.5 EA / 5
* Rank 6: 55% damage
* Rank 7: 60% damage = 3 EA / 5

Translating that into usable scaling, assuming medium range:
* Rank 3: 1d10 (43%; dr1l, with normal +2 per rank scaling)
* Rank 4:
  * dr0, 1d4 + half power (45%)
  * Strike with -2 accuracy penalty (45%)
* Rank 5:
  * full power, not a real scaling (49%)
  * strike? (42%)
* Rank 6: dr3, 1d8 + power (55%)
* Rank 7:
  * dr4, 1d6 per 2 (56%)
  * double damage strike (50%) - note that extra damage doesn't apply anyway

### Honed: 2.0

0.4 EA * 5 actions = 2 EA

### Spell/armor HP: Invalid

Math!
20 / 3 * (1 - 1/(HP mult)) = (EA)
6.67 * (1 - 1/h) = a
1 - 1/h = a/6.67
-1/h = a/6.67 - 1
1/h = 1 - a/6.67
1 = h * (1 - a/6.67)
1/(1 - a/6.67) = h
6.67 / (6.67 - a) = h

* Rank 1: +13% HP = 6.67 / (6.67 - 0.75)
* Rank 3: +18% HP = 6.67 / (6.67 - 1)
* Rank 5: +23% HP = 6.67 / (6.67 - 1.25)
* Rank 7: +29% HP = 6.67 / (6.67 - 1.5)

Using a Med HP progression as a baseline:

* Rank 1: 2 HP
* Rank 2: 4 HP
* Rank 3: 8 HP
* Rank 4: 15 HP
* Rank 5: 25 HP
* Rank 6: 40 HP
* Rank 7: 60 HP

Or, for spells that want more infrequent HP progression:
* Rank 1: 4 HP
* Rank 3: 10 HP
* Rank 5: 25 HP
* Rank 7: 60 HP

These jumps are insane. It seems like it would be a lot easier to boost durability instead of HP. Therefore, enhancement bonuses to HP *do not exist*.

### Apparel HP: Invalid

Using the same math as above:

* Rank 1: +8% HP
* Rank 3: +13% HP
* Rank 5: +18% HP
* Rank 7: +23% HP

Using Med HP as a baseline:
* Rank 2: 3 HP
* Rank 3: 6 HP
* Rank 4: 12 HP
* Rank 5: 20 HP
* Rank 6: 30 HP
* Rank 7: 45 HP

### Spell/Armor Durability: Varies

Translating the raw HP values from above into durability bonuses:
* Rank 1: +2
* Rank 2: +2
* Rank 3: +3
* Rank 4: +3
* Rank 5: +4
* Rank 6: +4
* Rank 7: +5 (technically a little too low, but eh)

### Apparel Durability: Varies

Just +1 durability behind the spell version:

* Rank 1: +1
* Rank 2: +1
* Rank 3: +2
* Rank 4: +2
* Rank 5: +3
* Rank 6: +3
* Rank 7: +4

### +64 HP: 1.9 EA (at rank 7)

40% more HP, so 71% action efficiency, or 29% action denial, so 20 * 0.29 / 3 = 1.9 EA at rank 7, which would require 0.4 EA of detriment to be balanced.

### +1 Armor: 0.75

Assuming that 2/3 of enemy attacks target Armor, +1 Armor is 17% action denial that works 2/3 of the time and you are attacked 1/3 of the time, so 20 * .17 * 2 / 3 / 3 = 0.75 EA, so rank 1.

### +2 Armor: 1.5

Twice as good as +1 Armor

### +2 Brawn/Fort/Ref/Ment: 0.75

Assuming that 33% of enemy attacks target the defense, +2 is 33% action denial that works 1/3 of the time and you are attacked 1/3 of the time, so 20 / 3 / 3 / 3 = 0.75 EA, so rank 1.

### 20% miss chance: 1.0

20% miss chance is 20% action denial that works 25% of the time, so 20 * 0.25 * 0.2 = 1 EA. That's about rank 3.

### 20% failure chance: 1.3

20% failure chance is 20% action denial that works 33% of the time, so 1.3 EA. That's about rank 6.

### 50% miss chance

50% miss chance is 50% action denial that works 25% of the time, so 20 * 0.5 * 0.25 = 2.5 EA, which is a rank 5 deep attunement.

### Steeled: N/A

14% action denial on 33% of attacks is 20 * 0.14 / 3 = 0.9.

In practice, you build characters very differently if they can be permanently steeled in ways that seem probably not good for the game, so this is simply disallowed.

### Regen: Varies

Assume that you heal drX-2 at the end of each action phase. How much does that help?

The healing on the first round is limited, because sometimes monsters miss - assume that you only lose 1/4 of your max HP to attacks. The healing on the fifth round is "wasted" because end of action phase healing doesn't prevent you from gaining vital wounds. So you get 3 full triggers and a fourth trigger that is capped at 1/4 of max HP.

However, strong healing can make fights last longer, increasing the number of rounds that this effect remains active. To be safer, calculate the value of regeneration using a full 4 rounds of healing, even though a typical combat won't trigger all 4 rounds.

drX is about a third of a typical character's HP pool, so 4 rounds of drX healing twice is like having 133% more HP, or 125% extra HP counting the first round healing limit. That's too much to exist.

drX-3 is about 50% as strong, so about 66% more HP. Having 66% more HP is 1/1.66 = 60% action efficiency, or 40% action denial. (100% more HP is 1/2 = 50% action efficiency, so 50% action denial). 40% action denial that works 1/3 of the time, since you are attacked 1/3 of the time, is 20 * 0.4 / 3 = 2.7 EA.

Put another way, since drX-2 is about a quarter of character HP, it's worth:
* +100% HP -> 50% action denial -> 20 * 0.5 / 3 = 3.3 EA

What about drX-3? That's:
* +66% HP -> 40% action denial -> 20 * 0.4 / 3 = 2.6 EA (rank 6 deep)

These values are all too high. Instead, let's try recovering 10% of a typical HP pool.
* +40% HP -> 29% action denial -> 20 * 0.29 / 3 = 1.9 EA (rank 3 deep)
* +50% HP -> 33% action denial -> 20 * 0.33 / 3 = 2.2 EA (rank 4 deep)
* +60% HP -> 38% action denial -> 20 * 0.38 / 3 = 2.5 EA (rank 5 deep)
* +70% HP -> 41% action denial -> 20 * 0.41 / 3 = 2.75 EA (rank 6 deep)
* +80% HP -> 44% action denial -> 20 * 0.41 / 3 = 3 EA (rank 7 deep)

Correct numeric values:
* Rank 3: 3 HP (10%)
* Rank 4: 8 HP (12%)
* Rank 5: 16 HP (15%)
* Rank 6: 28 HP (17%)
* Rank 7: 44 HP (20%)

As dice:
* Rank 3: 1d6
* Rank 4: 2d6
* Rank 5: 4d6
* Rank 6: 6d8
* Rank 7: 8d10

As power scaling:
* Rank 3: Half power (= 4)
* Rank 4: dr1 (1d6 + half power = 3.5 + 5 = 8.5)
* Rank 5: dr3 (1d8 + power = 4.5 + 12.5 = 17)
* Rank 6: dr4 (1d6 per 2 power = 3.5 * 15 / 2 = 26)
* Rank 7: dr6 (1d8 + 1d8 per 2 power = 4.5 + 4.5 * 16 / 2 = 40.5)

As rank multiplier:
* Rank 3: 1x
* Rank 4: 2x
* Rank 5: 3x
* Rank 6: 4x
* Rank 7: 6x

TODO: calculate apparel value, since apparel is 0.5 EA worse than self-cast spells

### Weapon tag: 1.0

Assume that all weapons are similar in power to +1 accuracy, so 1.0 EA.

### Standard action damaging attack

Assume that you use an attunement which grants you a special standard action attack. The attack should always have a brief cooldown because otherwise we'd have to balance it assuming you used that special attack every round, which would be weak and also boring.

Assume you use the attack 3 times in a combat (rounds 1/3/5). That attack would need to be some amount better than a "regular" attack of that level:

* Rank 1: 0.75 / 3 = +25% damage
* Rank 2: +29% damage
* Rank 3: 1 / 3 = +33% damage
* Rank 4: +37% damage
* Rank 5: 1.25 / 3 = +42% damage
* Rank 6: +46% damage
* Rank 7: 1.5 / 3 = +50% damage

Translating this into direct scaling values is difficult because attacks can have widely varying range and area. We can provide some examples:

* Rank 1, Short range single target: normal damage is dr2 (109%), attuned damage is dr3 (141%, +29%)
* Rank 3, Large cone: normal damage is dr1 (53%), attuned damage is dr2 (86%, +62% but dr1 cone is just bad)
* Rank 3, Medium cone: normal damage is dr3 (102%), attuned damage is dr4 (116%, but high scaling)
* Rank 3, area rank 2: normal damage is dr2 (86%), attuned damage is dr4 (116%, +34%)
* Rank 4, Large cone: normal damage is dr2 (75%), attuned damage is dr4 (107%)
* Rank 6, Large cone: normal damage is dr5 (83%), attuned damage is dr7 (130%, +57%)

This type of effect should never be a deep attunement because the standard action granted would have to be too strong to be reasonable.

### Standard action debuff

Using the rank multiplication logic above:
* Rank 1: 1.75 = 1.4 * 1.25
* Rank 2: 2.1 = 1.6 * 1.29
* Rank 3: 2.4 = 1.8 * 1.33
* Rank 4: 2.75 = 2.0 * 1.37
* Rank 5: 3.1 = 2.2 * 1.42
* Rank 6: 3.5 = 2.4 * 1.46
* Rank 7: 3.9 = 2.6 * 1.5

### Special weapon

Assume that you have attunement that grants you an unusual weapon. The weapon's power would have to be comparable to a magic weapon of the same rank?

### 25% condition avoidance

Assume that 2/3 of incoming attacks deal damage, 1/3 have brief debuffs, and 1/3 inflict conditions. This adds to over 1 because some damaging attacks also inflict debuffs. A 25% chance to avoid conditions is 20 / 3 / 3 * 0.25 = 0.55 EA.

### 50% condition avoidance
20 / 3 / 3 * 0.5 = 1.1 EA

### 100% condition avoidance

20 / 3 / 3 = 2.2 EA
