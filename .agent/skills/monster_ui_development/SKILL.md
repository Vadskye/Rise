---
name: monster-ui-development
description: Guidelines and documentation for developing and debugging the Rise Monster Creator UI app, its React frontend, Express backend, and interaction with the game engine.
---

# Rise Monster Creator UI Development Skill

Use this skill when modifying, debugging, or researching the local web application for monster creation at `typescript/monster_ui/`.

## Codebase Architecture

The Monster UI is a self-contained package inside `Rise/typescript/monster_ui/` with its own `package.json`, dependencies, and build toolchain (Vite + TSX + Less) to avoid dependency and configuration conflicts with the main CommonJS TypeScript project.

```
Rise/typescript/monster_ui/
├── package.json                # React, Express, TSX, Vite, concurrently
├── tsconfig.json               # Frontend TS configuration (JSX, ESM)
├── tsconfig.server.json        # Backend TS configuration (CommonJS, extends parent)
├── vite.config.ts              # Vite frontend configuration with /api proxy to port 3001
├── index.html                  # Frontend entry page
├── monsters_from_ui.json       # Source-of-truth database of monsters
├── src/                        # Frontend React Application
│   ├── main.tsx                # Entry point
│   ├── App.tsx                 # App layout, state, API calls
│   ├── App.less                # Main styles
│   ├── types/
│   │   └── monster.ts          # Type definitions for the JSON schema and computed stats
│   └── components/
│       ├── MonsterSidebar.tsx  # Left sidebar: list of monsters and monster groups
│       ├── MonsterForm.tsx     # Left-center panel: structured form fields + freeform text
│       ├── BookPreview.tsx     # Right panel: real-time compiled PDF/HTML book preview card
│       └── ValidationBox.tsx   # Top/Global: warnings/errors box from character sheet compiler
└── server/                     # Backend Express API Server
    ├── index.ts                # API endpoints and server setup
    ├── validate.ts             # Calls the Rise core character sheet engine to compile stats
    └── codegen.ts              # Generates TypeScript monster code from monsters_from_ui.json
```

## Generated Code Output

When the database is saved (`POST /api/save`), the backend writes the updated list of monsters to:
`Rise/typescript/src/monsters/individual_monsters/monsters_from_ui.ts`

This file is automatically imported and registered by the main game rules registry in `Rise/typescript/src/monsters/grimoire.ts`.