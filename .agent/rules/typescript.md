---
trigger: model_decision
description: Applied when editing TypeScript (.ts) files to ensure adherence to Rise project coding and formatting standards.
globs: "**/*.tex, rust/**/*.rs, typescript/**/*.ts"
---

# Coding Guidelines

- **Simplicity**: Code should prioritize clarity and simplicity over safety and edge case handling.
- **Errors Are Fine**: It's better for a program to throw a clear error than to try to continue in the face of unexpected circumstances.
- **LaTeX Backslashes**: Escape backslashes in TypeScript strings. High-level find/replace may require quadruple backslashes (`\\\\`) to represent a double backslash (`\\`) in the final output.

# Testing

## Running Tests

Tests are located in the `typescript/src/` directory and use the `tap` framework with `tsx` for TypeScript support.

### Cross-Platform Testing

To ensure tests run correctly on both Windows and Unix-like systems, always use the `@bin/run_typescript_tests` script. It can be run in three modes:

- `run_typescript_tests`: Runs all tests.
- `run_typescript_tests --save_output`: Saves test output to a `test_output.txt` file for review.
- `run_typescript_tests -- <path/to/test.ts>`: Runs a specific test file.

These scripts are configured to use `npx tap --node-arg=--import=tsx`, which correctly sets up the TypeScript loader without requiring shell-specific environment variable syntax.

## Writing Tests

- **Use Real Implementations**: Unless it's completely infeasible, use real implementations for everything in tests. Mocks and `any` casts should be avoided.
- **Imports**: Use `import t from 'tap';` for the test harness.

## TypeScript Development & Test Execution

- **Stale JS Files**: Be aware that compiled `.js` files in the `src/` directory can sometimes interfere with testing when using `tsx` or `ts-node`. If changes don't seem to be reflecting during execution or testing, clean up any existing `.js` and `.js.map` files in the `src/` directory.
- **Path Aliases**: The TypeScript project uses `@src/` as a path alias for `src/`. When adding new files or tests, ensure that imports respect this mapping to maintain consistency across the codebase.
