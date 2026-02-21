---
trigger: glob
description: Applied when running or writing tests in the TypeScript project to ensure cross-platform compatibility and efficient test execution.
globs: "typescript/**/*.test.ts, typescript/package.json"
---

# Testing in the Rise project

## Running Tests
Tests are located in the `typescript/src/` directory and use the `tap` framework with `tsx` for TypeScript support.

### Cross-Platform Testing
To ensure tests run correctly on both Windows and Unix-like systems, always use the following npm scripts:

* `npm run test`: Runs all tests.
* `npm run tap -- <path/to/test.ts>`: Runs a specific test file.

These scripts are configured to use `npx tap --node-arg=--import=tsx`, which correctly sets up the TypeScript loader without requiring shell-specific environment variable syntax.

### Manual Test Execution
If you need to run tests manually without `npm run`, use:
```bash
npx tap --node-arg=--import=tsx src/path/to/test.ts
```

## Writing Tests
* **Imports**: Use `import t from 'tap';` for the test harness.
* **Mocks/Shims**: Be aware of the `roll20_shim.ts` if testing code that interacts with the Roll20 environment.
* **Database/Grimoire**: Extensive monsters can cause timeouts. When testing monster-related logic, prefer loading only the necessary groups or individual monsters using their specific `addX` functions (e.g., `addBeasts(gen.grimoire)`) rather than `grimoire.addAllMonsters()`.
