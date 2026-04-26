# Standard Area Ranks

Rank -1 areas (why would these exist?):

- Small line, 5' wide from self

Rank 0 areas (4-8 squares) [Budget -1]:

- Cone:
  - Small cone from self (6/7s)
- Line:
  - Small, 10' wide line from self (6s)
  - Medium, 5' wide line from self (6s)
- Radius:
  - Small radius from self (24s)
    - This is obviously a larger area than a cone or line, but is also much harder to aim to only hit enemies
  - Enemies in Tiny radius from self (4s)
    - There is no such thing as "everything adjacent to you", because it's easy to make that functionally enemies-only on a grid system, but that's really annoying in practice.

Rank 1 areas (~12 squares) [Budget 0]:

- Cone:
  - Two Small cones from self (12/14s)
- Line:
  - Medium, 10' wide line from self (12s)
  - Two Small, 10' wide lines from self (12s)
- Radius:
  - Tiny radius in Short range (4s)
- Targets:
  - Up to two creatures in Short range
  - Short range, chain once

Rank 2 areas (~24 squares) [Budget +1]:

- Cone:
  - Medium cone from self (24s)
- Line:
  - Two Medium, 10' wide lines from self (24s)
  - Large, 5' wide line from self (12s)
- Radius:
  - Medium radius from self (96s)
- Targets:
  - Up to three creatures in Short range
  - Up to two creatures in Medium range
  - Short range, chain twice

Rank 3 areas [Budget +1]:

- Cone:
  - (unchanged) Medium cone from self (24s)
- Line:
  - Large line, 10' wide from self (24s)
  - (unchanged) Two Medium, 10' wide lines from self (24s)
- Radius:
  - (unchanged) Medium radius from self (96s)
  - Small radius in Short range (24s)
  - Two Tiny radii in Short range (8s)
- Targets:
  - Up to four creatures in Short range
  - Short range, chain three times
  - (unchanged) Up to two creatures in Medium range
  - Medium range, chain once

Rank 4 areas [Budget +2]:

- Cone:
  - Large cone
- Line:
  - Two Large, 10' wide lines from self
  - Large, 15' wide line from self?
- Radius
  - Large radius from self
  - Medium radius in Short range (discouraged due to self-inclusion)
- Targets:
  - Any number of creatures in Short range (equivalent to enemies-only Medium radius)
  - Up to three creatures in Medium range
  - Medium range, chain twice
  - Short range, chain five times

Rank 5 areas [Budget +2]:

- Cone:
  - Two Large cones from self
- Radius:
  - Two Small radii in Short range
  - Two Tiny radii in Med range
- Targets:
  - Any number of creatures in Medium range (equivalent to enemies-only Large radius)

## Extended Area Scaling

For debuff spells to use areas that extend beyond 60', you have to pay a -1 rank cost for debuff effect. Damaging effects have a slightly different tradeoff (see `damaging_abilities.md`). In exchange, you get access to the following additional rank scaling options:

Rank 2 areas:

- Radius:
  - Tiny radius in Med range

Rank 4 areas:

- Line:
  - Huge line, 10' wide from self
- Radius:
  - Small radius in Medium range

Rank 5 areas:

- Line:
  - Huge line, 15' wide from self
- Radius:
  - Medium radius in Medium range
  - Small radius in Long range

Rank 6 areas:

- Cone:
  - Huge cone from self
- Line:
  - Gargantuan line, 15' wide from self
- Radius:
  - Huge radius from self
  - Medium radius in Long range

Rank 7 areas:

- Radius:
  - Large radius in Medium range (a little odd, basically requires enemies-only)
  - Medium radius in Distant range

Rank 8 areas:

- Cone:
  - Gargantuan cone
- Radius:
  - Gargantuan radius from self

## Area Rank Modifiers

- +1 area rank: Only affects enemies in the area (except radius from self)
- +2 area rank: Only affects enemies in the area (radius from self).

## Walls and Barriers

Barriers are most effective in tunnel and constrained movement situations. They generally don't work as well on open battlefields. What is the correct size for a standard "you cannot pass" barrier? How should it scale with level?

- Rank 1:
  - Small wall in Short range (complete blockage)
  - Medium wall in Medium range (partial blockage)
- +1 rank: Short -> Med -> Long range
- +1 rank: +1x power HP
- +1 rank: Small -> Med wall
- +2 ranks: Med -> Large wall
- Wall HP:
  - Rank 1-2: 2x power
  - Rank 3-5: 3x power
  - Rank 6-8: 4x power
  - Rank 9: 5x power

Standard rank scaling is +1x power HP per 2 ranks.

## Area and Effect Rank

(This is an idea for terminology that has not been broadly adopted, but seems useful in theory.)

"Effect rank" refers to how strong the effect of an ability is. "Ability rank" refers to the minimum rank required to use the ability. A spell's ability rank is a combination of its effect rank and its targeting criteria.

For example, a Medium range erX spell deals drX damage.
