# Copilot Instructions for semantic.js

This is a JS-only, browser-first library that brings Rust-like ergonomics (Option/Result, struct, tagged union) to JavaScript using aggressive JSDoc typing. No TypeScript files; all typing is via JSDoc with `// @ts-check`.

## Big picture
- Core idea: describe data shapes and behavior via builders, then rely on JSDoc advanced types for static guarantees.
- Key modules:
  - `src/keywords/struct.js`: defines data shape via a builder. Public fields vs private fields (`_` prefix) are tracked in types.
  - `src/keywords/impl.js`: attaches behavior to an object using a manifest builder (pub/prv const/fn/async.fn). Binds functions to the finalized object and freezes it.
  - `src/primitives/tuple.js`, `src/keywords/mut.js`: wrappers like `tuple`, `mut`, `imut` used as type-level signals.
  - `src/types/types.d.js`: heavy JSDoc type utilities (ToInstanceType, constructor→instance conversions, manifest compilation, public key picking).

## Project conventions (must follow)
- JS only; no `.ts`. Use JSDoc everywhere for types and generics.
- Comments in English only. Use JSDoc for public APIs, functions, variables, classes.
- Prefer arrow functions assigned to `const`.
- No `++`/`--`, no ternary; always use braces for control flow.
- Do not write runtime type checks; rely on static JSDoc types. Avoid `any` (prefer `unknown` or specific types). Avoid default parameters.

## Patterns you’ll use
- Define shapes with Struct:
  - `Struct.new().pub.field("name", TypeInfo).prv.field("secret", TypeInfo).build()` → returns an object with public + private keys at runtime. Private keys start with `_`.
- Attach behavior with Impl:
  - `Impl.for(target).pub.const("FOO", 1).prv.fn("do", (self, x) => {...}).pub.async.fn("load", async (self) => {...}).build();`
  - Functions are declared `(self, ...args)` and bound as methods `(...args)` on the target. Private members are defined as non-enumerable.
  - After build, the target is frozen (`Object.freeze`). Don’t mutate or extend it afterward.
- Type wrappers:
  - Use `mut(...)`/`imut(...)` and `tuple(...)` to express mutability/tuple intent at the type level when defining fields or function params.

## Developer workflows
- Build (minify for dist):
  - VS Code: press `Ctrl+Shift+B` to run the task “Minify and Copy Files to dist”, which executes `build.sh`.
  - The script fetches a static `minify` binary, minifies JS files under `src`, and emits `dist/semantic.min.js`.
- Run in browser:
  - Open `index.html` and use DevTools. Example module tests live under `src/keywords/struct.test.js` and can be toggled in `index.html`.
- Tests:
  - There are browser-loaded examples under `tests/` and `src/**.test.js`. No Node test runner; prefer opening in a browser.

## Important file references
- `src/keywords/struct.js`: Struct builder API. Public vs private field typing.
- `src/keywords/impl.js`: Implementation builder API. `pub|prv.{const, fn, async.fn}`, then `build()` to bind and freeze.
- `src/types/types.d.js`: type-level machinery (manifest → interface compile, self binding, public key pickers, constructor/instance conversions).
- `jsconfig.json`: strict `@ts-check` settings; JS is type-checked like TS.
- `build.sh`: release build/minify for the browser (no npm).

## Practical tips for contributions
- New APIs: add precise JSDoc types (generics, templates) and keep comments in English. Ensure public/private keys align with the `_` prefix rule.
- When adding functions to `Impl`, follow `(self, ...args)` form and let the builder bind them. Do not rely on `this`.
- Avoid using private keys from outside; treat `_`-prefixed members as internal even though they exist at runtime.
- If you need new type utilities, colocate them in `src/types/types.d.js` and prefer composable conditional/mapped types.

If any of the above is unclear (e.g., how `mut/imut/tuple` flow through `ToInstanceType`, or expected public-only exposure), tell me where you’re adding code and I’ll refine these instructions for that path.
