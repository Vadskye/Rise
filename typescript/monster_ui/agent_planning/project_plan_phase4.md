# Rise Monster Creation UI — Phase 4 Project Plan (Total Elimination of Freeform Code)

This plan details the fourth and final phase of the Monster Creation UI, focusing on the complete elimination of the freeform TypeScript code editor.

## Goal
To achieve a 100% structured data approach for monster creation, ensuring that every possible configuration parameter in the Rise engine is supported via JSON configuration and the UI.

## Scope & Target
At the start of Phase 4, the UI will support required properties (Phase 1), simple data fields (Phase 2), and complex ability builders (Phase 3). However, there may still be edge cases or highly specific overrides that rely on the freeform code block. Phase 4 aims to close those gaps.

1.  **Audit the Engine**: Perform a comprehensive audit of `MonsterBase`, `Creature`, and all associated mixins/traits to identify any public configuration methods not yet supported by the UI (e.g., deeply nested tactical behavior, highly specialized rule exceptions, unique aura configurations).
2.  **Schema Completion**: Expand `MonsterData` to include exhaustive configuration options for these remaining edge cases.
3.  **UI Refinement**: 
    *   Add "Advanced Settings" panels to hide the complexity of these edge cases from the average user.
    *   Remove the `freeformCode` field entirely from the UI, the JSON schema, and the database.
4.  **Codegen Hardening**:
    *   Update `server/codegen.ts` to rely solely on the structured schema.
    *   Since freeform code is gone, we no longer need to worry about arbitrary code injection or syntax errors originating from the user input. The code generator can guarantee syntactically valid output.
5.  **Monster Migration**: 
    *   All existing monsters that still have code in their `freeformCode` block must be completely ported to the new structured fields.

## Implementation Steps
1.  **Codebase Scan**: Run queries to find all usages of `creature.` in existing monster files that aren't mapped to the current schema.
2.  **Schema Updates**: Incrementally add fields to `src/types/monster.ts`.
3.  **UI Updates**: Build form components for the new schema fields and remove the `<textarea>` for freeform code.
4.  **Validation**: Run exhaustive generation tests against the entire database of monsters to ensure 100% compatibility with the LaTeX export pipeline.
