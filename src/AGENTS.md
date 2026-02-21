---
applyTo: './**'
---
# src/ Directory Knowledge Base

> See root `AGENTS.md` for coding conventions (PP/NP rules, JSDoc requirements, style constraints).
> This file adds architectural context specific to the `src/` directory.

## Role of This Directory

`src/` contains the entire core implementation of the Rust-like type system. Everything exported by the library originates here. There is no separate runtime or polyfill layer; the files in `src/` are the library.

## Entry Point: `lib.js`

`src/lib.js` is the single public entry point. It re-exports every public symbol from the subdirectories. When adding a new module, you must add its export here. The file is intentionally thin; it contains only `export { ... } from '...'` statements and no logic.

Current exports at a glance:

| Export | Source |
|---|---|
| `Impl` | `keywords/impl.js` |
| `Struct` | `keywords/struct.js` |
| `mut`, `imut` | `keywords/mut.js` |
| `Cloneable` | `interfaces/cloneable.js` |
| `Matchable` | `interfaces/matchable.js` |
| `TaggedUnion` | `primitives/tagged-union.js` |
| `tuple`, `BaseTuple`, `Tuple0`...`Tuple6` | `primitives/tuple.js` |
| `EnumConstructorType` | `types/enums.js` |
| `Option` | `types/option.js` |
| `OptionBaked` | `types/option-baked.js` |
| `ResultBaked` | `types/result-baked.js` |

## Subdirectory Breakdown

### `keywords/`

The builder API that mimics Rust keywords.

- **`struct.js`**: `Struct` builder. Defines a data shape by chaining `.pub.field(name, typeInfo)` and `.prv.field(name, typeInfo)` calls, then calling `.build()`. Private fields get a `_` prefix at runtime.
- **`impl.js`**: `Impl` builder. Attaches behavior to a struct via `.pub.fn()`, `.prv.fn()`, `.pub.const()`, `.pub.async.fn()`, etc., then calls `.build()` which binds all functions and freezes the target with `Object.freeze`. All functions must use `(self, ...args)` form; `this` is never used.
- **`mut.js`**: `mut()` and `imut()` wrappers. Pure type-level signals for mutability; no runtime behavior beyond wrapping the value.
- **`types.d.js`**: Type definitions local to the `keywords/` module. Supplementary to the top-level `src/types/`.

### `primitives/`

Low-level type wrappers.

- **`tuple.js`**: `tuple()` factory and concrete `Tuple0`...`Tuple6` types. Used as a type-level signal for fixed-length heterogeneous collections.
- **`tagged-union.js`**: `TaggedUnion` builder for discriminated unions. Models Rust-style enums with associated data.
- **`types.d.js`**: Type definitions local to `primitives/`.

### `types/`

Pure type machinery and baked implementations of core Rust types.

- **`types.d.js`**: The heaviest file. Contains all advanced JSDoc generics: `ToInstanceType`, constructor-to-instance conversions, manifest compilation, public key pickers, and other mapped/conditional type helpers. If you need a new generic utility, add it here.
- **`types-array.d.js`**: Array-related type utilities.
- **`types-math.d.js`**: Numeric/math type utilities.
- **`types-union.d.js`**: Union type helpers.
- **`option.js`**: `Option<T>` type definition (None / Some).
- **`option-baked.js`**: `OptionBaked` — a concrete, runtime-usable `Option` implementation built on top of `Struct` + `Impl`.
- **`result-baked.js`**: `ResultBaked` — a concrete `Result<T, E>` implementation.
- **`enums.js`**: `EnumConstructorType` helper for constructing tagged enum variants.

### `interfaces/`

Trait-like interfaces that structs can implement.

- **`cloneable.js`**: `Cloneable` interface contract.
- **`matchable.js`**: `Matchable` interface contract. Used for pattern-matching against `Option` / `Result` / `TaggedUnion` variants.

## Key Patterns

### Adding a new module

1. Create the `.js` file in the appropriate subdirectory.
2. Add the `// @ts-check` directive at the top.
3. Write full JSDoc for every export.
4. Re-export from `src/lib.js`.

### Type-only files (`*.d.js`)

Files ending in `.d.js` (e.g., `types.d.js`) are type-declaration-only files. They contain `@typedef` and `@template` blocks but no runtime logic. Do not add runtime code to them.

### Test files (`*.test.js`)

`*.test.js` files are browser-loaded test modules. There is also a `*.d.test.js` pattern for type-only tests that rely purely on LSP diagnostics — no runtime execution needed. Toggle them in `index.html`.

## What Not to Do

- Do not add logic to `lib.js` beyond re-exports.
- Do not create `.ts` files under `src/`.
- Do not add runtime type, null, or undefined checks anywhere in `src/`.
- Do not mutate or extend objects after `Impl.build()` has been called on them.
- Do not access `_`-prefixed fields from outside their owning module.
