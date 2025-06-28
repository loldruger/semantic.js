# GitHub Copilot Instructions

## Architecture

`Semantic.js` is a JavaScript library that brings Rust-inspired features and types to the browser environment. Key architectural points are:

- **Core Goal**: To provide Rust-like types such as `Option<T>`, `Result<T, E>`, and concepts like `struct` and `tagged union`.
- **Type Safety**: The project achieves static type safety without runtime overhead by leveraging extensive JSDoc annotations. TypeScript's `checkJs` feature is used to validate types.
- **Environment**: It is designed to run directly in modern web browsers, with Firefox being the primary development and debugging target.
- **Dependencies**: The project intentionally avoids using package managers like npm. A `minify` binary is downloaded during the build process for code compression.
- **Structure**:
    - `src/`: Contains the core source code.
        - `interfaces/`: Defines common interfaces like `Cloneable`.
        - `keywords/`: Implements Rust-like keywords (`struct`, `impl`).
        - `primitives/`: Contains fundamental types like `tagged-union`.
        - `types/`: Holds implementations for types like `Option` and `Result`.
    - `dist/`: Contains the minified and bundled output files for production.
    - `tests/`: Contains integration and unit tests.

## Core Commands

- **Build**: To build the project, run the default VS Code build task (`Ctrl+Shift+B` or `Cmd+Shift+B`). This executes the `build.sh` script, which handles:
    - Downloading the `minify` tool if it's not present.
    - Minifying all `.js` files from `src/` into the `dist/` directory.
    - Creating a bundled `semantic.min.js` file.
    - To run manually: `chmod +x build.sh && ./build.sh`

- **Test**: The project contains a test suite but does not use a standard test runner. Tests are run in the browser.
    - The "Integrated Tests" task is a placeholder. To run tests, open `index.html` in a browser with the developer console open.
    - Test files are located in `tests/` and alongside source files with a `.test.js` extension.

- **Linting/Type-Checking**: Static analysis is performed via TypeScript's JS checking capabilities, configured in `jsconfig.json`. There is no separate lint command; checking happens automatically in a configured editor like VS Code.

## Style Rules

### General

- **Clarity**: Prefer explicit `if ... else ...` statements over the ternary operator (`a ? b : c`).
- **Operators**: Do not use increment (`++`) or decrement (`--`) operators. Use `+= 1` or `-= 1` instead.
- **Blocks**: Always use curly braces for `if`, `for`, or `while` statements, even for single lines.
- **Comments**: All comments must be written in English.

### JavaScript (via `jsconfig.json` and project conventions)

- **JSDoc**: All functions, methods, classes, and variables must have comprehensive JSDoc comments. This is critical for static type analysis.
- **Type System**:
    - **No Runtime Checks**: Do not write runtime type-checking code (e.g., `typeof myVar === 'string'`). Rely on JSDoc for static analysis.
    - **No `any`**: The `any` type is forbidden. Avoid `unknown` when a more specific type can be used.
    - **Type Casting**: Use JSDoc-style casting `/** @type {T} */ (variable)` instead of the `as T` syntax.
- **Function Declarations**: Prefer `const func = () => {}` over `function func() {}`.
- **Strictness**: The project enforces a strict set of rules via `jsconfig.json`, including:
    - `strict: true`
    - `noUncheckedIndexedAccess: true`
    - `noUnusedLocals: true`
    - `noUnusedParameters: true`
