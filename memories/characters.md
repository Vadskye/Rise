# Rise Character System Overview

This document summarizes the core rules and mechanics for character definition and progression in Rise, derived from `comprehensive_codex/Characters.tex`.

## 1. Character Creation Process

Character creation blends thematic and mechanical decisions, typically following a structured sequence:
1.  **Concept & Motivation:** Define the character's essence and goals.
2.  **Species:** Choose a species, which can modify attributes and influence languages.
3.  **Attributes:** Distribute points (8 points, max 3 per attribute) or use arrays (Standard, Specialized, Balanced). Species modifiers are applied.
4.  **Class & Archetypes:** Select a base class and an archetype. Additional archetypes are gained at levels 2 and 3.
5.  **Insight Points:** Spend these points to gain new abilities, often after other choices are made.
6.  **Skills:** Choose trained skills, influenced by class and Intelligence.
7.  **Equipment:** Acquire starting items based on item ranks.
8.  **Personality, Background, Appearance, Alignment, Name:** Define narrative elements.

## 2. Core Character Statistics

### 2.1. Attributes (Str, Dex, Con, Int, Per, Wil)

*   **Definition:** Represent raw talent. A value of 0 signifies average human capability. Player characters are typically exceptional, with higher attributes.
*   **Impact:**
    *   **Strength (Str):** Muscle, physical power. Affects Brawn defense, mundane power, brawling accuracy, carrying capacity, and Strength-based skills (Climb, Jump, Swim).
    *   **Dexterity (Dex):** Hand-eye coordination, agility, reflexes. Affects Armor defense (halved for medium/heavy armor/shields), Reflex defense, Dexterity-based skills (Balance, Flexibility, Ride, Sleight of Hand, Stealth), and dual strikes.
    *   **Constitution (Con):** Health, stamina. Affects Hit Points, Fatigue Tolerance, Fortitude defense, and Constitution-based skills (Endurance).
    *   **Intelligence (Int):** Learning, reasoning. Affects number of trained skills (if positive) and Insight Points. Affects Intelligence-based skills (Craft, Deduction, Disguise, Knowledge, Medicine). Creatures incapable of complex cognition (e.g., animals) have \minus6 or lower.
    *   **Perception (Per):** Observation, awareness. Affects accuracy with most attacks and Perception-based skills (Awareness, Creature Handling, Social Insight, Survival).
    *   **Willpower (Wil):** Mental endurance. Affects magical power and Mental defense.
*   **Attribute Penalties:** Voluntarily reducing an attribute by \minus1 grants a trained skill; by \minus2 grants an insight point. Cannot reduce below \minus2 or gain benefits from more than two attributes this way.

### 2.2. Combat Statistics

*   **Accuracy:** Number added to attack rolls. Normally half (level + Perception).
    *   **Brawling Accuracy:** Used for \glossterm{brawling attacks}. Normally half (level + Strength). General accuracy modifiers apply; some abilities affect only brawling accuracy.
*   **Defenses (AD, Brawn, Reflex, Fortitude, Mental):** Value needed to hit.
    *   **Armor Defense (AD):** Physical attacks (e.g., sword). Most common.
    *   **Brawn Defense:** Physical restraint/control (e.g., grappling).
    *   **Reflex Defense:** Dodging/evading (e.g., area attacks).
    *   **Fortitude Defense:** Attacks against body/life (e.g., poisons).
    *   **Mental Defense:** Attacks against mind (e.g., mind manipulation).
    *   **Calculation:** Half level + primary attribute + class/equipment bonuses.
*   **Encumbrance:** Penalty from armor to Dexterity-based checks and Strength-based skill checks (not direct Strength checks).
*   **Hit Points:** Measures how much damage a character can take before dying. Defined by class, increase with level and Constitution. Cannot be less than 1. Represent resilience, luck, and determination, not literal injury.
*   **Injury Point:** 
*   **Power (Mundane & Magical):** Represents ability strength.
    *   **Mundane Power:** Strength + half level. Affects mundane abilities.
    *   **Magical Power:** Willpower + half level. Affects magical abilities.
    *   Unspecified "power" bonuses affect both.

## 3. Resources

*   **Attunement Points:** Required for many special abilities and magic items. Defined by base class, can be granted by other sources. \glossterm{Deep attunement} properties reduce maximum attunement points.
*   **Fatigue:** Represents exertion.
    *   **Fatigue Level:** Measures current fatigue, increased by abilities/attacks.
    *   **Fatigue Tolerance:** Maximum \glossterm{fatigue level} without penalty (3 + Constitution, min 0).
    *   **Fatigue Penalty:** \glossterm{fatigue level} \sub \glossterm{fatigue tolerance} (min 0), applied to accuracy and checks.
    *   **Exhaustion:** Occurs when \glossterm{fatigue penalty} reaches \minus5, causing unconsciousness.
    *   **Recovery:** Resets to 0 after a \glossterm{long rest}; no other methods.
    *   **Paying Costs:** Fatigue costs increase \glossterm{fatigue level} after ability resolves; no immediate penalty from this increase.
*   **Insight Points:** Flexible points to gain new special abilities (e.g., combat styles, spells, multiclassing). Sources include base class, Intelligence, and other abilities.
*   **Trained Skills:** Increase bonus with skills. Granted by base class (from class skills), Intelligence (any skill), and other abilities (any skill).

## 4. Size and Weight

### 4.1. Size Categories

*   Affects \glossterm{space}, \glossterm{base speed}, attributes, and noticeability.
*   **Space:** Area controlled in combat. Humanoids typically 5x5 ft. (one \glossterm{square}). Larger than physical body for maneuvering. Multiple smaller creatures can occupy a single square.
*   **Base Speed:** Movement distance based on size category.
*   **Other Effects:** Affects some skills/abilities (e.g., immunity to \atSizeBased abilities from much smaller creatures).
*   **Very Small Creatures:** Multiple can occupy a single square (e.g., 4 Small, 25 Tiny, 100 Diminutive, 400 Fine; more if flying). Creatures two size categories smaller are not obstacles.
*   **Very Large Creatures:** Occupy multiple squares. Creatures two size categories larger are not obstacles. Weapons are automatically \weapontag{Sweeping} (Huge+).

### 4.2. Weight Limits

*   Determined by Strength (see \trefnp{Weight Limits by Strength}).
*   Measured in \glossterm{weight categories}.
*   **Carrying Capacity:** Max weight held without penalty. Beyond this, objects can be pushed/dragged.
*   **General Rule:** Ignore weight of objects lighter than your maximum weight category. 8 objects of one category = 1 object of next heavier category.
*   **Modifiers:** Large/small creatures gain Strength bonus for weight limits. Multi-legged creatures carry/push/drag twice as much.

### 4.3. Weight Categories

*   Use same terms as \glossterm{size categories} (see \tref{Weight Categories}). Generally, a creature's weight category matches its size category.
*   **Lightweight/Heavyweight:** Objects can be one category lighter/heavier than their size category.

### 4.4. Falling Damage

*   Falling creatures/objects descend 300 ft./phase. Take damage on impact; obstacle takes half damage (max of falling object's HP).
*   Damage based on \glossterm{weight category} (see \tref{Weight Categories}). Roll damage die once per 10 ft. fallen (max 300 ft.). No damage for falls < 10 ft.
*   Intentional falls are 10 ft. shorter. Jumping falls measure from 10 ft. below jump start.

## 5. Calculation Guidelines

*   **Stacking Rules:** Modifiers usually stack. Non-stacking bonuses/penalties apply only the largest. Exceptions: same-named abilities, enhancement bonuses, multiple instances of same condition (tracked separately), multiple magical size changes (offset one-for-one), special senses (ranges sum).
*   **Minimum and Maximum Modifiers:** Bonuses with max values apply last. If multiple maxes, use lowest. If value already exceeds max, ignore bonus. Minimums apply after all other modifiers.
*   **Doubling and Halving:** Normal doubling/halving applies. If a single effect doubles something twice, it becomes three times the original value (not four).
*   **Changing Statistics:** Changes take effect immediately. Loss of prerequisites (e.g., Intelligence reduction) results in immediate loss of relevant abilities until within new limits.
*   **Rounding:** Round down fractional numbers. For negative numbers, round away from 0.

## 6. Character Advancement and Gaining Levels

*   Gaining experience leads to leveling up, granting abilities (see \trefnp{Character Advancement and Gaining Levels}).
*   **Per-Level Increases:** Hit Points, archetype rank, accuracy (may), power (even levels), trained skills bonus (even levels), defenses (even levels).
*   **Irregular Advancements:**
    *   Attributes: +1 to two attributes at 3rd level and every 6 levels thereafter.
    *   Character Rank: Increases at 4th level and every 3 levels thereafter.
    *   Legacy Item: Gained at 6th level, improves every 6 levels thereafter.
*   **GM Discretion:** GM may allow changing character choices (skills, attributes, mystic spheres) upon leveling up, potentially requiring narrative justification or in-game retraining.

### 6.1. Character Rank

*   General indication of overall power, determined by level.
*   Maximum rank in any individual archetype equals character rank.

### 6.2. Legacy Items

*   **Purpose:** Items gain magical properties with character advancement.
*   **Acquisition:** At 6th level, choose a weapon, body armor, shield, apparel, or implement. Gains a rank 3 or lower magic item property.
*   **Attunement:** No attunement required, but \glossterm{deep attunement} properties reduce maximum attunement points.
*   **Properties:** Retains normal properties. Can be imbued/reforged like mundane items. Property must be appropriate for item category (e.g., amulet can gain boot effects).
*   **Scaling:** Improves at 12th (rank 5 property) and 18th (rank 7 property) levels.
*   **Loss/Destruction:** Must be retrieved if lost. If destroyed, a new item of the same type can be designated after a \glossterm{long rest}.
*   **Unique Legacy Items:** Players can work with GMs to create custom magical effects reflecting character personality/powers.

## 7. Narrative Elements

### 7.1. Alignment

*   **Types:** Lawful Good, Neutral Good, Chaotic Good, Lawful Neutral, Neutral, Chaotic Neutral, Lawful Evil, Neutral Evil, Chaotic Evil.
*   **Purpose:** Tool for character development, broad framework for personality/philosophy.
*   **Spectrum:** Not binary. Angels/demons are "pure." Population ratios: ~50% Neutral, ~25% Good, ~25% Evil (similar for Law/Chaos). Distribution varies (e.g., humanoids more good/lawful, monsters more chaotic/evil).
*   **Good vs. Evil:** Defined by intent.
    *   **Good:** Altruistic intentions, respect/empathy for others.
    *   **Evil:** Selfish intentions, prioritizing personal desires over others' known needs.
    *   **Neutral:** Neither consistently altruistic nor selfish. Intentions not involving others, or for mandatory needs, are neutral. Non-sapient beings are typically neutral.
*   **Law vs. Chaos:**
    *   **Law:** Values consistency, adheres to rules (external or self-imposed).
    *   **Chaos:** Values flexibility/freedom, decisions based on immediate thoughts/feelings.
    *   **Neutral:** Neither exceptionally consistent nor inconsistent. Non-sapient beings are typically neutral.

### 7.2. Backgrounds

*   **Purpose:** Character history before campaign. Explains statistics narratively.
*   **Structure:** Benefits and flaws. Choosing a benefit requires a flaw. Mixed backgrounds provide both. Generally, limit to one benefit/flaw or one mixed background.
*   **Acquisition:** Can be acquired during campaign at GM's discretion.
*   **Relevance:** Primarily relevant where reputation is known.
*   **Examples (Benefits):** Criminal Connections, Folk Hero, Guild Member, Mysterious Heirloom, Landed, Noble.
*   **Examples (Flaws):** Escapee, Indebted, Nemesis, Repulsive, Wanted.
*   **Examples (Mixed):** Scion.

### 7.3. Personal Appearance

*   **Age:** Typical ages by species (Adulthood, Middle Age, Old, Venerable, Maximum Age). Old/Venerable characters incur attribute penalties/bonuses.
*   **Height and Weight:** Typical values vary by species.
