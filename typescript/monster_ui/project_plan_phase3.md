# Rise Monster Creation UI — Phase 3 Project Plan (Complex Structure)

This plan details the third phase of the Monster Creation UI, focusing on adding structured UI builders for complex entities like abilities, spells, maneuvers, and weapons.

## Goal
Migrate the complex ability definitions from freeform TypeScript code into a robust, structured JSON schema and dynamic UI builders.

## Target Fields to Structure
The following monster configuration methods require complex UI builders:

1.  **Standard Spells & Maneuvers** (`addSpell`, `addManeuver`):
    *   **UI**: A searchable dropdown to select existing spells/maneuvers from the game engine. An options sub-form to override properties like `displayName`, `usageTime` (Standard, Swift, Move, etc.), and `isMagical`.
    *   **Data Model**: Array of objects: `{ type: 'standardSpell' | 'standardManeuver', name: string, options: { usageTime?: string, displayName?: string, ... } }`

2.  **Custom Abilities** (`addCustomSpell`, `addCustomManeuver`):
    *   **UI**: A full ability builder form. Fields for Name, Usage Time, Cost, Effect text, Targeting, Hit text, Crit text, Miss text, Tags, Scaling, etc.
    *   **Data Model**: Array of `CustomMonsterAbility` objects mirroring the TypeScript interface.

3.  **Passive Abilities** (`addPassiveAbility`):
    *   **UI**: A builder with fields for Name, Effect text, and an `isMagical` toggle.
    *   **Data Model**: Array of `{ name: string, effect: string, isMagical: boolean }`

4.  **Weapons & Strikes** (`addWeaponMult`, `addGrapplingStrike`, `addSneakAttack`):
    *   **UI**: Selectors for weapon types (e.g., 'fists', 'claws') and specific strike modifications (e.g., adding grappling or sneak attack properties).
    *   **Data Model**: Dedicated arrays or objects tracking natural/manufactured weapons and their special attack properties.

5.  **Rituals** (`addRituals`):
    *   **UI**: Multi-select dropdown for Mystic Spheres (e.g., 'Death', 'Life', 'Creation').
    *   **Data Model**: `rituals: string[]` (array of sphere names)

## Implementation Steps

1.  **Update JSON Schema (`src/types/monster.ts`)**: Define rigorous interfaces for custom abilities, standard ability references, and weapons.
2.  **API Integration**: Update the backend to serve lists of valid Spells, Maneuvers, and Weapons so the frontend can populate dropdowns. (Requires exposing new getters from the `Grimoire` or ability registries).
3.  **Update Codegen (`server/codegen.ts`)**: Map the complex JSON structures back into exact TypeScript method calls (`creature.addCustomSpell(...)`).
4.  **Update React UI (`src/components/MonsterForm.tsx`)**: 
    *   Create a dynamic list interface (e.g., "Add Ability" button).
    *   Create modular sub-components for the different builder types (e.g., `CustomAbilityBuilder.tsx`, `StandardAbilitySelector.tsx`).

## Challenges
*   **LaTeX Formatting in UI**: Custom abilities heavily use LaTeX macros (e.g., `\damagerankthree.`). The UI will either need to accept raw LaTeX strings or provide specialized rich-text/macro-insertion tools. For Phase 3, accepting raw LaTeX strings in textareas is sufficient.
