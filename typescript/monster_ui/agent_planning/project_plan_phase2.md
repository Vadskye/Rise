# Rise Monster Creation UI — Phase 2 Project Plan (Simple Structure)

This plan details the second phase of the Monster Creation UI, focusing on adding structured UI components for "simple" data-value fields that are currently handled via the freeform code escape hatch.

## Goal
Migrate simple, discrete data fields from arbitrary TypeScript code into structured JSON properties and corresponding React form components.

## Target Fields to Structure
The following monster configuration methods will be replaced by structured UI inputs:

1.  **Attributes** (`setBaseAttributes`):
    *   **UI**: A grid or row of 6 number inputs (Strength, Dexterity, Constitution, Intelligence, Perception, Willpower).
    *   **Data Model**: `baseAttributes: [number, number, number, number, number, number]`

2.  **Skills** (`setTrainedSkills`):
    *   **UI**: A multi-select dropdown or a searchable checklist containing all standard Rise skills.
    *   **Data Model**: `trainedSkills: string[]`

3.  **Knowledge Results** (`setKnowledgeResults`):
    *   **UI**: Four textareas for `easy`, `normal`, `hard`, and `legendary` knowledge check results.
    *   **Data Model**: `knowledge: { easy?: string; normal?: string; hard?: string; legendary?: string; }`

4.  **Traits** (`addTrait`):
    *   **UI**: A multi-select dropdown or searchable checklist of standard traits (e.g., 'mindless', 'undead', 'construct').
    *   **Data Model**: `traits: string[]`

5.  **Senses & Movement** (`addCustomSense`, `addCustomMovementSpeed`):
    *   **UI**: Dynamic lists where users can add/remove string inputs (e.g., "Darkvision (60 ft.)").
    *   **Data Model**: `customSenses: string[]`, `customMovementSpeeds: string[]`

6.  **Defenses** (`addImmunity`, `addResistant`, `addVulnerability`):
    *   **UI**: Dynamic lists or multi-selects for damage types and conditions.
    *   **Data Model**: `immunities: string[]`, `resistances: string[]`, `vulnerabilities: string[]`

7.  **Equipment** (`setEquippedArmorName`):
    *   **UI**: A text input or dropdown for armor names.
    *   **Data Model**: `equippedArmor: string`

8.  **Misc Properties** (`setProperties`):
    *   **UI**: Checkboxes for common boolean properties (e.g., `has_art`).
    *   **Data Model**: `properties: Record<string, any>`

## Implementation Steps

1.  **Update JSON Schema (`src/types/monster.ts`)**: Expand the `MonsterData` interface to include the new optional properties listed above.
2.  **Update Codegen (`server/codegen.ts`)**: Modify the code generator to read these new properties and emit the corresponding `creature.set...` and `creature.add...` TypeScript calls before the freeform code block.
3.  **Update React UI (`src/components/MonsterForm.tsx`)**: Build the new form components. Group them logically (e.g., a "Stats" tab/section, a "Details" tab/section) to prevent the form from becoming overwhelmingly long.
4.  **Data Migration**: (Optional/Manual) Existing monsters in `monsters_from_ui.json` will need to have their freeform code manually ported to the new structured fields via the UI.

## Out of Scope for Phase 2
*   Complex abilities (Spells, Maneuvers, Weapons). These belong in Phase 3.
*   Removal of the freeform textarea. It remains as the fallback for anything not covered here or in Phase 1.
