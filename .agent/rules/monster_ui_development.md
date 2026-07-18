---
trigger: model_decision
description: Guidelines and documentation for developing and debugging the Rise Monster Creator UI app, its React frontend, Express backend, and interaction with the game engine.
---

# Rise Monster Creator UI Development

Local web app for monster creation: [monster_ui](../../typescript/monster_ui/).

## Codebase Structure

- **Vite Frontend (`src/`)**: React app. Entry: [main.tsx](../../typescript/monster_ui/src/main.tsx), Layout/State: [App.tsx](../../typescript/monster_ui/src/App.tsx).
- **Express Backend (`server/`)**: [index.ts](../../typescript/monster_ui/server/index.ts) serves API.
- **Database**: [monsters_from_ui.json](../../typescript/monster_ui/monsters_from_ui.json) (source of truth).

## Commands

Run from [monster_ui/](../../typescript/monster_ui/):

- **Dev**: `npm run dev` (starts Vite frontend on `http://localhost:5173` and Express API proxy on `http://localhost:3001`).
- **Test**: `npm run test` (runs unit, integration, and Puppeteer UI tests in [tests/](../../typescript/monster_ui/tests/)).

## API Endpoints

- `GET /api/reference`: Returns rulebook data (spells, maneuvers, etc.) from the game engine.
- `POST /api/preview`: Compiles monster in-memory to return calculated stats & validation warnings.
- `POST /api/save`: Persists JSON database and triggers [codegen.ts](../../typescript/monster_ui/server/codegen.ts) to write class definitions.

## Workflows

**Adding a property**:

1. Add to type definitions: [monster.ts](../../typescript/monster_ui/src/types/monster.ts).
2. Add input control: [MonsterForm.tsx](../../typescript/monster_ui/src/components/MonsterForm.tsx) (or within `abilities/`).
3. Support in validation: [validate.ts](../../typescript/monster_ui/server/validate.ts).
4. Support in codegen: [codegen.ts](../../typescript/monster_ui/server/codegen.ts).

**Saved Output**:
Saves compiled TypeScript classes to [monsters_from_ui.ts](../../typescript/src/monsters/individual_monsters/monsters_from_ui.ts), imported by [grimoire.ts](../../typescript/src/monsters/grimoire.ts).

## Development Guidelines

- **Avoid `any` Casts**: Always build configurations using fully typed interfaces (e.g. `CustomMonsterAbility`) instead of relying on `any`.
- **DRY Codegen and Validation**: Keep utility mapping logic shared between `codegen.ts` and `validate.ts` DRY by extracting shared helper functions.
- **Component Reuse**: Extract repetitive UI controls (like tag lists or autocomplete search boxes) into local or shared reusable React components to prevent JSX and state duplication.

## Folders & Organization
- **Database representation**: Folder organization is represented by the `folder` string field on `MonsterData` and `MonsterGroupData`. Explicit/empty folders are stored as a string array (`folders?: string[]`) in the database `DatabaseData`.
- **Sidebar rendering**: Folders shown in the sidebar are derived by combining the list of explicit folders with the `folder` values of all existing monsters and groups, ensuring they are unique and sorted.
- **Folder updates**: Renaming a folder requires updating the folder name in `folders` as well as the `folder` properties on all monsters/groups belonging to that folder. Deleting a folder unsets the `folder` field on those items (moving them to individual/ungrouped lists) and removes the folder name from `folders`.
- **Styling**: Styles are written in [App.less](../../typescript/monster_ui/src/App.less). Vite compiles LESS into CSS automatically.