# Extra Damage Scaling

Weapons and staffs can provide extra damage. This section documents how much extra damage they should provide.

From the spreadsheet, "raw" values for extra damage at each rank would be:
* Rank 1: +1
* Rank 2: +1.5
* Rank 3: +2.5 (1d4) / +1.3
* Rank 4: +2
* Rank 5: +3.2 (1d6)
* Rank 6: +4.8 (1d8) / +3.2 (1d6)
* Rank 7: +7.7 (2d6) / +5 (1d10)

There are a few complicating factors here. We generally assume that maneuvers gain a 2x multiplier at rank 3 and a 3x multiplier at rank 6. In contrast, we assume that spells gain a 2x multiplier at rank 4 and never gain a 3x multiplier. Also, the existence of these multipliers creates a nonlinear progression path.

Smoothed, we come up with the following standard progression:
* Rank 1: +1
* Rank 2: +1
* Rank 3: +2
* Rank 4: +1d4
* Rank 5: +1d6
* Rank 6: +1d8
* Rank 7: +1d10
* Rank 8: +2d6
* Rank 9: +2d8

## Prerequisites vs Universal Items

Although characters can't generally use *every* item with special requirements, like Brutish, they can generally use *some* item with special requirements. For that reason, items with prerequisites or downsides that don't directly affect damage use the standard extra damage scaling. Universal items should be rare, and are one rank behind standard.
