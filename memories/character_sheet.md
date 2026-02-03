# Rise Character Sheet

## Sheet Worker
The character sheet has a worker that automatically character sheet fields using Rise's rule system. It is located at `typescript/src/character_sheet/sheet_worker.ts`. The following is a summary of how it works.

**Core Concepts:**
*   **Roll20 Shim:** `sheet_worker.ts` interacts with the Roll20 environment via `roll20_shim.ts`, providing functions like `on`, `getAttrs`, `setAttrs`, `getSectionIDs`, `generateRowID`, and `removeRepeatingRow`.
*   **`onGet` Function:** A central utility for listening to attribute changes and performing calculations.
    *   Takes `variables` (numeric, boolean, string attributes to listen to) and a `callback`.
    *   Automatically includes `level` in `numeric` variables by default.
    *   Uses `miscName` to identify attributes that can have `custom`, `creation`, `debuff`, and `vital_wound` modifiers.
    *   Constructs `changeString` for the `on` listener and `getVariables` for `getAttrs`.
    *   Populates a `v` object with fetched attribute values inside the `getAttrs` callback.
    *   `v.misc` accumulates values from `_custom_modifier`, `_creation_modifier`, `_debuff_modifier`, and `_vital_wound_modifier` based on `miscName`.
    *   `v.miscExplanation` accumulates explanations from these modifiers.
*   **Modifier Types:**
    *   `CustomModifierType`: `attuned`, `legacy`, `temporary`, `permanent`. Handled by `handleCustomModifiers`.
    *   `Creation Modifiers`: Applied based on `base_class` (and potentially `species`). Handled by `handleCreationModifiers`. Affects attributes like `armor_defense`, `attunement_points`, `brawn`, `fortitude`, `insight_points`, `intelligence`, `mental`, `perception`, `reflex`, `speed`, `strength`, `willpower`, and `class_skill_count`.
    *   `Debuff Modifiers`: Applied based on various debuff statuses (e.g., `grappled`, `blinded`, `slowed`). Handled by `handleDebuffs`. Affects `accuracy`, `armor_defense`, `brawling_accuracy`, `brawn`, `fortitude`, `reflex`, `mental`, and `speed`.
    *   `Vital Wound Modifiers`: Applied based on vital wound rolls. Handled by `handleVitalWounds`. Affects `accuracy`, `brawling_accuracy`, `all_defenses`, `fatigue_tolerance`, `brawn`, `fortitude`, `reflex`, `mental`, and `speed`.
*   **Explanation Formatting:**
    *   `formatNamedModifierExplanation`: Formats individual modifiers (e.g., `+5 (level)`). Filters out `0` value modifiers.
    *   `collectNamedModifierExplanations`: Collects and formats multiple named modifiers.
    *   `formatCombinedExplanation`: Combines `miscExplanation` (from `onGet`'s `miscName` handling) with locally provided named modifiers. Joins them with `  ` (two spaces) after replacing commas with two spaces.

**Specific Statistic Calculations (and observed behaviors):**

*   **`armor_defense` (handled by `handleArmorDefense`):**
    *   Calculated from `level`, `dexterity` (modified by `armor_usage_class`), `body_armor_defense`, `shield_defense`, `misc` (custom modifiers), `all_defenses_vital_wound_modifier`, and `challenge_rating`.
    *   The `dexterity` contribution is calculated into `attributeModifier` and then used in the explanation.
*   **`hit_points` (handled by `handleHitPoints`):**
    *   Calculated from `level`, `constitution`, `misc` (custom modifiers), and `challenge_rating`.
    *   Uses `calcHpBonuses` which depends on `progressionName` (from `base_class`).
*   **`fortitude` (handled by `handleNonArmorDefense`):**
    *   Calculated from `level`, `constitution`, `misc` (custom modifiers, *including creation modifiers from `base_class`*), `all_defenses_vital_wound_modifier`, `challenge_rating`, and `size_reflex_modifier` (though `size_reflex_modifier` is 0 for fortitude).
    *   **Observed Discrepancy:** `v.constitution` was observed to be `0` within the `onGet` callback for `handleNonArmorDefense`, leading to `constitution` not contributing to the total or explanation, despite being set in `setAttrs`. This suggests a potential bug in the Roll20 shim or the `onGet` mechanism's handling of direct attributes that are not `miscName` attributes.
*   **`attunement_points` (handled by `handleAttunementPoints`):**
    *   Calculated from a `base` of 3 and `misc` (custom modifiers, *including creation modifiers from `base_class`*).
*   **`insight_points` (handled by `handleInsightPoints`):**
    *   Calculated from a `base` of 1, `intelligence`, and `misc` (custom modifiers, *including creation modifiers from `base_class`*).
    *   **Observed Discrepancy:** Similar to fortitude, `v.intelligence` was observed to be `0` within the `onGet` callback, leading to `intelligence` not contributing to the total or explanation.
*   **`fatigue_tolerance` (handled by `handleFatigueTolerance`):**
    *   Calculated from a `base` of 3, `constitution`, and `misc` (custom modifiers, vital wound modifiers).
    *   **Observed Discrepancy:** Similar to fortitude and insight points, `v.constitution` was observed to be `0` within the `onGet` callback, leading to `constitution` not contributing to the total or explanation.
*   **`speed` (handled by `handleSpeed`):**
    *   Calculated from `base_speed` (defaults to 30), `body_armor_speed`, and `misc` (custom modifiers, vital wound modifiers).
    *   **Observed Discrepancy:** `body_armor_speed` was observed to be `0` within the `onGet` callback, leading to it not contributing to the total or explanation.

**General Observations:**
*   The `formatNamedModifierExplanation` function filters out modifiers with a `value` of `0`, which can lead to parts of the explanation being omitted (e.g., `+0 (Con)`).
