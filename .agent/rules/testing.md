---
trigger: glob
description: Applied when running or writing tests in the TypeScript project to ensure cross-platform compatibility and efficient test execution.
globs: "typescript/**/*.test.ts, typescript/package.json"
---

# Testing in the Rise project

## Running Tests
Tests are located in the `typescript/src/` directory and use the `tap` framework with `tsx` for TypeScript support.

### Cross-Platform Testing
To ensure tests run correctly on both Windows and Unix-like systems, always use the `@bin/run_typescript_tests` script. It can be run in three modes:

* `run_typescript_tests`: Runs all tests.
* `run_typescript_tests --save_output`: Saves test output to a `test_output.txt` file for review.
* `run_typescript_tests -- <path/to/test.ts>`: Runs a specific test file.

These scripts are configured to use `npx tap --node-arg=--import=tsx`, which correctly sets up the TypeScript loader without requiring shell-specific environment variable syntax.

## Writing Tests
* **Imports**: Use `import t from 'tap';` for the test harness.
* **Mocks/Shims**: Be aware of the `roll20_shim.ts` if testing code that interacts with the Roll20 environment.
* **Database/Grimoire**: Extensive monsters can cause timeouts. When testing monster-related logic, prefer loading only the necessary groups or individual monsters using their specific `addX` functions (e.g., `addBeasts(gen.grimoire)`) rather than `grimoire.addAllMonsters()`.