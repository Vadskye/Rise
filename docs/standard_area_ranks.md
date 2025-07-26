# Standard Area Ranks

Rank -1 areas (why would these exist?):
* Small line, 5' wide from self

Rank 0 areas:
* Cone:
  * Small cone from self
* Line:
  * Small, 10' wide line from self
  * Medium, 5' wide line from self (rare due to unusual range for r0)
* Radius:
  * Small radius from self
    * This is obviously a larger area than a cone or line, but is also much harder to aim to only hit enemies
  * Enemies in Tiny radius from self
    * There is no such thing as "everything adjacent to you", because it's easy to make that functionally enemies-only on a grid system, but that's really annoying in practice.

Rank 1 areas:
* Cone:
  * Medium cone from self
  * Two Small cones from self
* Line:
  * Medium, 10' wide line from self
  * Two Small, 10' wide lines from self
* Radius:
  * Medium radius from self
* Targets:
  * Up to two creatures in Short range

Rank 2 areas:
* Cone:
  * Two Medium cones from self
* Line:
  * Two Medium, 10' wide lines from self
  * Large, 5' wide line from self (rare due to unusual range for r2)
* Radius:
  * (no change) Medium radius from self
  * Tiny radius in Short range (rare, since Tiny radius is so close to single target)
* Targets:
  * Up to three creatures in Short range
  * Up to two creatures in Medium range

Rank 3 areas:
* Cone:
  * Large cone from self
* Line:
  * Large line, 10' wide from self
  * (unchanged) Two Medium, 10' wide lines from self
* Radius:
  * Large radius from self
  * Small radius in Short range
* Targets:
  * Up to four creatures in Short range
  * (unchanged) Up to two creatures in Medium range

After rank 3, spells have mostly reached their maximum range, since they are not allowed to go past 60 feet by default. Instead, area scaling comes from splitting areas.

Rank 4 areas:
* Cone:
  * Two Large cones from self
* Line:
  * (unchanged) Two Medium, 10' wide lines from self
* Radius
  * Medium radius in Short range (discouraged due to self-inclusion)
* Targets:
  * Any number of creatures in Short range (equivalent to enemies-only Medium radius)
  * Up to three creatures in Medium range

Rank 5 areas:
* Cone:
  * (unchanged) Two Large cones from self
* Line:
  * Two Large, 10' wide lines from self
* Radius:
  * Two Small radii in Short range
  * Two Tiny radii in Med range
* Targets:
  * Any number of creatures in Medium range (equivalent to enemies-only Large radius)

## Extended Area Scaling

To use areas that extend beyond 60', you have to pay a -1 rank cost. This reduces the damage dealt by the spell and the debuff tier (if any), but you still use the spell's normal rank for calculating its area. In exchange, you get access to the following additional rank scaling options:

Rank 3 areas:
* Radius:
  * Tiny radius in Med range (only for splitting)

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

## Area Rank Modifiers

* +1 area rank: Only affects enemies in the area (except radius from self)
* +2 area rank: Only affects enemies in the area (radius from self).

## Walls and Barriers

Barriers are most effective in tunnel and constrained movement situations. They generally don't work as well on open battlefields. What is the correct size for a standard "you cannot pass" barrier? How should it scale with level?

* Rank 1:
  * Small wall in Short range (complete blockage)
  * Medium wall in Medium range (partial blockage)
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

## Area and Effect Rank

(This is an idea for terminology that has not been broadly adopted, but seems useful in theory.)

"Effect rank" refers to how strong the effect of an ability is. "Ability rank" refers to the minimum rank required to use the ability. A spell's ability rank is a combination of its effect rank and its targeting criteria.

For example, a Medium range erX spell deals drX damage.
