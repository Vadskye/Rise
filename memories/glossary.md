# Rise Game System Learnings from Glossary Edit

This document summarizes key concepts and mechanics of the Rise tabletop role-playing game, learned during a comprehensive edit of the `core_book/Glossary.tex` file.

## 1. Core Resolution Mechanics

The game uses a d10-based system with clear distinctions between different types of rolls.

*   **Checks vs. Attacks**: This is a fundamental split.
    *   **Checks**: Used for tasks and skills. A d10 is rolled and a modifier is added to beat a static **Difficulty Value (DV)**.
    *   **Attacks**: Used in combat. A d10 is rolled and an **Accuracy** bonus is added to beat one of five **Defenses** (Armor, Brawn, Fortitude, Reflex, Mental).
*   **Degrees of Success**: Rolls are not simple pass/fail.
    *   **Critical Hit/Success**: Beating the target number by 10 or more results in a critical effect. For damaging attacks, this doubles damage dice and flat modifiers.
    *   **Glancing Blow**: Missing an attack roll by 2 or less results in a "glance," which still deals half damage. This makes combat more consistent and reduces the frustration of near misses.
*   **Power Stat**: Abilities scale off a **Power** statistic, which is divided into two types, creating a clear martial/magical divide:
    *   **Mundane Power**: Derived from Strength. Used for non-magical abilities.
    *   **Magical Power**: Derived from Willpower. Used for spells and magical effects.
*   **Rank System**: Progression is measured in **Ranks**.
    *   **Character Rank**: A tier of power based on total level. It acts as a gatekeeper, limiting the maximum **Archetype Rank** a character can have.
    *   **Ability/Item Rank**: Abilities and items also have ranks, indicating their power level and the character rank required to use them.

## 2. Combat System Overview

Combat appears to be tactical, with an emphasis on positioning, resource management, and lasting consequences.

*   **Action Economy**: A combat **Round** is divided into a **Movement Phase** and an **Action Phase**. Characters have a limited number of Standard, Minor, and Move actions per round, plus unlimited Free actions.
*   **Targeting & Range**:
    *   Abilities are categorized as **Melee** (adjacent), **Ranged** (at a distance), or **Area**.
    *   Targeting requires **Line of Sight** (can you see it?) and often **Line of Effect** (is there a solid barrier in the way?).
*   **Health and Damage**:
    *   **Damage Resistance**: Acts as a buffer that absorbs damage before Hit Points are lost.
    *   **Hit Points (HP)**: A character's basic health pool.
    *   **Vital Wounds**: Taking damage after running out of HP results in a Vital Wound. These are serious, debilitating injuries with lasting effects determined by a **Vital Roll**, making combat highly consequential.
    *   **Subdual Damage**: A non-lethal damage type that increases a character's **Fatigue Level** instead of causing Vital Wounds.
*   **Status Effects**:
    *   **Conditions**: The standard term for persistent, detrimental effects (debuffs).
    *   **Immunity vs. Unaffected**: A key distinction. **Immunity** prevents and removes an effect entirely. Being **unaffected** means the effect is temporarily ignored but remains on the character and can resume later (e.g., a barbarian raging is unaffected by fear, but the fear condition is still there and returns after the rage).

## 3. Character Abilities & Magic

*   **Classes & Archetypes**: A character's **Base Class** provides their core identity. They further specialize by investing in five class-specific **Archetypes**. **Multiclassing** is also possible.
*   **Magic**:
    *   **Mystic Spheres**: Magic is organized into thematic spheres (e.g., Pyromancy, Revelation).
    *   **Magic Sources**: A caster's power comes from one of four sources: Arcane, Divine, Nature, or Pact. This likely determines their spell list and flavor.
    *   **Spells & Rituals**: Spells are for combat and immediate effects. Rituals are more complex, taking longer to perform.
    *   **Attunement**: A key resource management mechanic. Maintaining powerful, ongoing magical effects requires investing a limited pool of **Attunement Points**. **Deep Attunement** abilities are even more costly.

## 4. Identified Rule Ambiguities & Design Patterns

My edit of the glossary revealed several areas where the rules text was unclear or contradictory. This provides insight into areas that may require careful attention in the future.

*   **Circular Definitions**: The original definitions for `area`, `melee`, and `ranged` were circular. This suggests a need for precise, independent definitions for core terms.
*   **Rule Interactions**: The contradiction between `damaging hit` and `glancing blow` highlights the importance of ensuring that interlocking rules are consistent with each other.
*   **"Attended" vs. "Unattended"**: The rules for what constitutes an "unattended" item were contradictory, especially concerning items held by allies. The apparent design intent is that allies' equipment is easier to affect with abilities, which is a significant rule with tactical implications.
*   **Glossary Philosophy**: Many terms pointed to other sections rather than providing a concise definition. A glossary should be a quick reference, defining terms succinctly.
