---
trigger: model_decision
description: When interacting with combat, including movement
---

# Combat Summary
This is a Gemini-generated summary of the Rise combat rules defined in `comprehensive_codex/Combat.tex`.

**Combat Flow & Core Mechanics:**
*   **Attack Resolution:** Attacks proceed through a sequence of outcomes: Miss (below defense, no effect), Critical Hit (10+ above defense, double damage, effects can repeat), and Regular Hit. Exploding d10s add to attack rolls.
*   **Rule Precedence:** Rules defined in `.agent/rules` take precedence over logic inferred directly from source code or generated tables, as they are curated to match the intent of the LaTeX source (`comprehensive_codex/Combat.tex`). 
*   **Damage Calculation:** Weapon damage is influenced by Power (Mundane/Magical). Extra damage behaves like inherent damage (doubled on crit) and applies once per attack roll per creature, excluding poisons.
*   **Taking Damage:** Damage reduces Hit Points (HP). Vital Wounds are incurred when HP drops below 0, with specific detrimental effects determined by a Vital Roll. Negative HP is temporary, resetting to 0 at the start of your turn. Environmental damage reduces DR without consuming it, while Subdual damage increases fatigue instead of inflicting vital wounds.

**Combat Time & Turn Structure:**
*   **Turns & Rounds:** Combat is structured in turns, representing about six seconds. During your turn, you can take one move action, one minor action, one standard action, and any number of free actions.
*   **Initiative:** To determine turn order, characters choose to roll initiative (1d10) or follow an ally leader (using their initiative result). Higher results act first. Leading requires clear communication (noise/motion), detectable with a DV 5 Awareness check.
*   **Initiative Groups:** Allies with no enemies between them in initiative order form an initiative group, sharing a turn. Group members can act in any order. An action must be fully completed before another creature in the group can start theirs (though free/minor actions can be used during move actions). Effects lasting "until the end of your turn" last until the end of the group's turn.

**Movement & Positioning:**
*   Jumping distances are determined by Strength and the Jump skill.
*   Movement is measured in 5-foot increments, with specific rules for diagonals.
*   Impediments include Difficult Terrain, Obstacles, and Undergrowth (Light/Heavy).
*   Squeezing rules apply for tight spaces or shared spaces.
*   Forced Movement comes in two types: Push (constant force, ends at obstacles, allows reactive Climb checks) and Fling (single impact, damages on collision, no support needed).
*   Aerial Movement has specific rules regarding carrying capacity, encumbrance, midair penalties, falling, and height limits.

**Specific Attack Types:**
*   **Strikes:** The most common attack (Melee, Projectile, Thrown), with accuracy from the weapon and damage from weapon damage.
*   **Dual Strikes:** Allow attacking with two weapons together, combining stats and applying specific weapon tag rules.
*   **Split Strikes:** A dual strike variant that deals half damage but targets an additional creature.

**Universal Abilities & Conditions:**
*   There are Universal Combat Abilities like Grapple, Shove, Sprint, and Recover, which can be used by all characters regardless of their class.
*   Vision and Light rules define illumination levels (Bright, Shadowy, Brilliant, Total Darkness), affecting visibility and miss chances against unseen/concealed foes.
*   Obstacles and Cover rules detail Line of Sight (LOS) and Line of Effect (LOE), and how cover provides defense bonuses.
*   Awareness and Surprise mechanics differentiate between Aware, Unaware, and Partially Unaware states, impacting defense and combat initiation.
*   Special Combat Rules cover Fighting in Water, Mounted Combat, and the definitions of Allies, Enemies, and Neutral Parties.

**Ability Usage & Properties:**
*   Abilities are either Magical (Willpower-based Power) or Mundane (Strength-based Power).
*   Abilities have defined Ranges and often require LOS/LOE.
*   Usage Components (Verbal, Somatic) are necessary for some abilities.
*   "Functioning Like Other Abilities" means inheriting effects and bonuses but not rank upgrades.
*   Rules for Touch Range, Noticing Abilities, and various Ability Targeting scenarios (Primary/Secondary, Invalid, Unknown Locations, Targeting Proxies).
*   Understanding of Area Shapes (Cone, Cylinder, Line, Sphere, Wall) and Area Types (Burst, Emanation, Zone).
*   Impossible Abilities simply fail.
*   Ability Durations include Attuned (single/deep/targeted attunement points), Conditions (last until removed), Sustained (action to sustain, can be attuned), and Permanent.
*   Rules for Combining Effects (conflicting effects, precedence) and Suppressing Abilities.
*   Ability Tags provide descriptive information.
*   Dismissal allows ending lingering effects, primarily for magical abilities.
*   Rank Upgrades are optional power increases based on character rank or level.
