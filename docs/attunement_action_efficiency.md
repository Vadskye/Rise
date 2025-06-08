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

### Empowered: 1.0

0.2 EA * 5 actions = 1 EA

### Evasion

Assume that 75% of abilities attack Armor and Reflex, 50% of abilities that target you are area attacks, 50% of area attacks that target you miss or glance, and this protects you from the 50% damage that you would take from the miss / glance. That's 20 / 3 * 0.75 * 0.5 * 0.5 * 0.5 = 0.6 EA. That's a lot of assumptions, so call it rank 2 to match rogue, but it's definitely not a deep attunement.

### 25% extra damage: 1.25

0.25 EA * 5 actions = 1.25

### Focused: 2.0

0.4 EA * 5 actions = 2 EA

### Singleton focused: 0.4

This is weak, but we 

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

Assume that the trigger for the damage will happen exactly once per fight and is generally easy to trigger, so it will happen on round 1 or 2. As with the singleton reactive debuff, we use the EA value *assuming a hit*, because this sort of effect is scary from an action economy perspective. So:

* Rank 1: dr0 (75%)
* Rank 2: 1d8 + half power (89%)
* Rank 3: dr3 (100%)
* Rank 4: dr4 (107%)
* Rank 5: dr6 (127%)
* Rank 7: 1d8 + 1d8 per power (154%)

If the reaction is hard to trigger, such as requiring total defense or recover, it gets +1 rank on the above scale.

### Singleton reactive debuff: ???

Assume that the trigger for the reactive debuff always happens, but it is limited to once per creature. That means it makes 1 attack per fight. However, incremental bonuses that add up to some EA value over a long fight are different from this sort of immediate trigger that happens on round 1. For that reason, unlike the minor action attack system that assumes that each attack is worth 1 EA, we use the direct EA value of the debuff, keeping in mind that brief
debuffs often have additional effect:
* Briefly stunned: 1.6 EA, since it affects your first attack too
* Briefly dazzled: 1.2 EA, since it affects two rounds of enemy attacks instead of one
* Briefly frightened by you: 1.2 EA, since 0.8 EA from double action denial and 0.4 EA from Mental debuff

This all counts EA *assuming a hit*, which is different from how we normally count buff/attunement effects. For now, let's test ignoring this discrepancy since auto-attacks are scary from an action economy perspective.

### Minor action attack: 1.75-3.0 EA

A minor action attack makes 5 attacks per combat, so the correct damage multiplier is (rank EA) / 5.

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
  * double damage strike (50%) - only double weapon damage, not double damage, because doubling extra damage on a minor action is scary

### Honed: 2.0

0.4 EA * 5 actions = 2 EA

### +4/8/16/32 HP: 0.7

Assuming 2 Con and fighter hp:

* Rank 1: +4 HP is 33% more
* Rank 2: +4 HP is 22% more
* Rank 3: +8 HP is 30% more
* Rank 4: +8 HP is 23% more
* Rank 5: +16 HP is 31% more
* Rank 6: +16 HP is 23% more
* Rank 7: +32 HP is 31% more

Assuming that HP is 50% of your total EHP, the HP buff is worth about 15% survivability. Raw EHP is less effective than defenses and other methods of increasing survivability, so call it 10% survivability instead. That's 10% action denial that works 1/3 of the time, so 20 * 0.1 / 3 = 0.7 EA, so rank 1.

### +64 HP: 1.5 EA

### +1 Armor: 0.75

Assuming that 2/3 of enemy attacks target Armor, +1 Armor is 17% action denial that works 2/3 of the time and you are attacked 1/3 of the time, so 20 * .17 * 2 / 3 / 3 = 0.75 EA, so rank 1.

### +2 Armor: 1.5

Twice as good as +1 Armor

### +2 Fort/Ref/Ment: 0.75

Assuming that 33% of enemy attacks target the defense, +2 is 33% action denial that works 1/3 of the time and you are attacked 1/3 of the time, so 20 / 3 / 3 / 3 = 0.75 EA, so rank 1.

### 20% miss chance: 1.0

20% miss chance is 20% action denial that works 25% of the time, so 20 * 0.25 * 0.2 = 1 EA. That's about rank 3.

### 20% failure chance: 1.3

20% failure chance is 20% action denial that works 33% of the time, so 1.3 EA. That's about rank 6.

### 50% miss chance

50% miss chance is 50% action denial that works 25% of the time, so 20 * 0.5 * 0.25 = 2.5 EA, which is a rank 5 deep attunement.

### Steeled: 0.9

14% action denial on 33% of attacks is 20 * 0.14 / 3 = 0.9 

### Regen: 2.0-3.3

Assume that you heal drX at the end of each action phase. How much does that help?

Assume that monsters spend one round your DR and four rounds doing some amount of HP damage. The healing on the first round is limited - assume that you only lose 1/4 of your max HP to the attack. The healing on the fifth round is "wasted" because end of action phase healing doesn't prevent you from gaining vital wounds. So you get 2 full triggers and a third trigger that is capped at 1/4 of max HP.

However, strong healing can make fights last longer, increasing the number of rounds that this effect remains active. To be safer, calculate the value of regeneration using a full 3 rounds of healing, even though a typical combat won't trigger all 3 rounds.

drX is about half of a typical character's HP pool, so drX healing twice is like having 100% more HP, or 125% extra HP counting the second round healing. If your HP pool is half your EHP, that's +60% survivability, or 40% action denial following the same 2/3 logic as the 4/8/16/32 calc. 40% action denial on you is 20 * 0.4 / 3 = 2.7 EA.

To simplify, since drX is half character HP, it's worth:
* +150% HP -> +75% survivability -> 50% action denial -> 20 / 3 * 0.5 = 3.3 EA

What about drX-1? That's:
* +120% HP -> +60% survivability -> 40% action denial -> 20 / 3 * 0.4 = 2.7 EA (rank 6 deep)

What about drX-2? That's:
* +98% HP -> +49% survivability -> 33% action denial -> 20 / 3 * 0.3 = 2 EA (rank 3 deep)

Note that drX-2 is extremely spiky. At rank 4, drX-2 is actually 80% healing, which is too strong. So we use slightly different scaling values:

* Rank 3: equal to power (66% of drX, 33% of 2con fighter HP)
  * Scaling: +2 per rank
* Rank 4: ???
* Rank 5: 2d6 + power (76% of drX, 38% of 2con fighter HP)
  * Scaling: +1d6 per rank
* Rank 6: 1d6 + 1d6 per 2 power (83% of drX, 43% of 2con fighter HP)
  * Scaling: +2d6 per rank
* Rank 7: 1d8 + 1d8 per 2 power (88% of drX, 40% of 2con fighter HP)

Weapons and armor need fixed values instead of power scaling:
* Rank 2: 18 * 0.3 = 5.5 = 1d10
* Rank 3: 26 / 3 = 8.6 = 2d8
* Rank 4: 35 * 0.35 = 12 = 3d8
* Rank 5: 52 * 0.38 = 20 = 4d10
* Rank 6: 70 * 0.4 = 28 = 5d10
* Rank 7: 104 * 0.43 = 45 = 8d10

Apparel has weaker scaling:
* Rank 3: 0.15 / 0.2 = 75% power, so 25% of 2con fighter HP, so 6.5 healing = 2d6
* Rank 5: 0.2 / 0.25 = 80% power, so 30% of 2con fighter HP, so 15.5 healing = 3d10
* Rank 7: 0.25 / 0.3 = 83% power, so 1/3 of 2con fighter HP, so 35 healing = 6d10

### Weapon tag: 1.0

Assume that all weapons are similar in power to +1 accuracy, so 1.0 EA.

### Standard action attack

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
* Rank 6, Large cone: normal damage is dr5 (83%), attuned damage is dr7 (130%, +57%)
