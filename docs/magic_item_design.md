# Magic Item Design

## Attuned Effects

Many effects that items can provide can also be gained from Attune (target) spells.
In general, an item providing a given effect should have an item level 3 levels lower than the
minimum level required to cast the corresponding spell on an arbitrary ally.
That corresponds to being 3 levels higher than the minimum level to cast a self-only version of that
effect.
This matches the minimum level required to gain access to an Attune version of that spell.
This ensures that items are valuable, since only one person can wear an item, but everyone can use
an Attune (target) spell.

Magic items can also only copy spells that were Attune (target) instead of Attune (self).
Attune (self) spells are often stronger, especially narratively, than Attune (target) spells.

### Examples
Deflective Shield becomes able to target allies at rank 4 (min level 10), so
Protective Armor is a level 7 item.

Deflective Shield increases its bonus to +2 at rank 6 (min level 16), so Greater Protective
Armor is a level 13 item.

Deflective Shield would hypothetically increase its bonus to +3 at rank 8 (min level 22), so Supreme Protective
Armor is a level 19 item.

Blessing of Precision is a rank 4 spell (min level 10), so a Surestrike weapon is a level 7 item.

Blessing of Precision increases its bonus to +2 at rank 6 (min level 16), so a Greater Surestrike weapon is a level 13 item.

Blessing of Precision would hypothetically increase its bonus to +3 at rank 8 (min level 22), so a Supreme Surestrike weapon is a level 19 item.

## Minor Level Modifiers
It would be weird if all items had 2/5/8/etc. levels.
Every level should bring new item options.
This is a list of small level modifiers that can be applied to items:

* +1: Trivial benefit, like shedding light
* +2: in generic/secondary item slot, like a movement effect in armor
* +5: Two different effects in the same item
* +10: Three different effects in the same item

## Active Effects

Magic items that grant active effects are challenging to design. Since magic item power doesn't
scale nearly as well as a character's power with their primary active abilities, it's difficult for
damaging magic items to keep pace. Active abilities that inflict conditions have similar struggles,
though mainly due to their lack of automatic accuracy scaling.
The easiest way to counteract that is to give strike-based actions, since strikes already have
automatic scaling and remain relevant for a while even if they have no intrinsic scaling.

Active abilities from magic items should be one rank behind maneuvers and one rank ahead of spells.
They do not have focus requirements, so they can be useful for spellcasters even if their effects
are a rank behind. They will fall behind maneuvers over time as martial characters get access to
higher rank maneuvers, so magic items should be ahead of basic maneveuvers at the time they are
acquired.

## Action Economy

It's dangerous for magic items to grant extra minor actions or automatic actions. In general, Rise
is balanced around allowing people to make approximately one attack each round. At high levels,
people can make some weaker extra attacks, but it takes a while to get there. Triggered magic items
are even riskier, since that potentially grants N additional actions each round, where N is the
(potentially large) number of magic items a character has equipped. Therefore, magic items should
grant passive or standard action abilities wherever possible. Where that is impossible, minor
actions are much better than non-actions, since that limits the potential power and complexity of
characters with many items. When magic items have to occupy minor actions, those minor actions
should not be repetitive - it's annoying to track a character who takes the same minor action every
round.
