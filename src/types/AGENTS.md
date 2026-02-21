---
applyTo: './**'
---
# src/types/ Directory Knowledge Base

> See root `AGENTS.md` and `src/AGENTS.md` for coding conventions and project-wide architecture.
> This file adds context specific to the `src/types/` directory.

## Role of This Directory

`src/types/` is the pure type machinery layer of the library. It contains two categories of files:

1. **Type-declaration files (`*.d.js`)** — contain only `@typedef` / `@template` JSDoc blocks with no runtime logic. These drive static analysis throughout the entire codebase.
2. **Runtime type implementations** — concrete classes that expose Rust-like types (`Option`, `OptionBaked`, `ResultBaked`) to application code.

Do not add runtime code to `*.d.js` files. Do not add `@typedef`-only content to runtime files.

## File Inventory

| File | Kind | Purpose |
|---|---|---|
| `types.d.js` | Type-only | Core generic utilities: `ToInstanceType`, `TypeCompiler`, `PickPublicKeys`, `As`, `IsEqual`, `Unwrap`, etc. |
| `types-array.d.js` | Type-only | Array utilities: `Array.Push`, `Array.Contains`, `Array.Flatten`, `Array.ToTupleType`, etc. |
| `types-math.d.js` | Type-only | Numeric/math type utilities. |
| `types-union.d.js` | Type-only | Union helpers: `Union.ToIntersection`, etc. |
| `option.js` | Runtime | `Option<T>` class — original implementation, built on `TaggedUnion`. WIP; see split note below. |
| `option-baked.js` | Runtime | `OptionBaked<T>` — simplified, self-contained `Option` implementation. No `TaggedUnion` dependency. |
| `result-baked.js` | Runtime | `ResultBaked<T, E>` — self-contained `Result` implementation. |
| `enums.js` | Runtime | `EnumConstructorType` helper for mapping JS primitives to their constructor types. |

## Key Type Utilities in `types.d.js`

### `Type.ToInstanceType<T>`

The most important generic in the library. Converts a constructor type (or a tuple/array of them) into the corresponding instance type, respecting `Mut<T>` and `IMut<T>` wrappers. Used throughout `Struct`, `Impl`, and `TaggedUnion` to translate field type descriptors into runtime shapes.

### `Internal.TypeCompiler.*`

A multi-stage type-level compiler that processes an `Impl` manifest (an array of descriptors) into a final frozen interface:

1. **`CreateFullInterface`** — walks the manifest and assembles a raw interface from all member descriptors.
2. **`ResolveFunctionSignatures`** — substitutes the resolved `SelfType` into every `self` parameter.
3. **`BindSelfToMethods`** — strips `self` from the public-facing method signatures (so callers don't see it).
4. **`ResolveImplementation`** / **`ResolveImplementationV2`** — entry points that combine the above and apply `Type.PickPublicKeys` to hide `_`-prefixed private members.

The V2 entry point (`ResolveImplementationV2`) is the preferred form; V1 exists for compatibility during the WIP transition.

### `Type.PickPublicKeys<T>`

Strips all `_`-prefixed keys from an object type, producing the public-facing interface. Used as the final filter in `ResolveImplementation` and `ResolveImplementationV2`.

### `As<T, U>`

A controlled assertion type. Returns `T` if `T extends U`, otherwise produces `Type.Error<...> & never`. Use this instead of TypeScript's `as` cast. At runtime, use JSDoc `/** @type {T} */ (value)` casting.

## The `Option` / `OptionBaked` Split (WIP)

There are currently **two separate `Option` implementations** in this directory. This is intentional but unresolved:

- **`option.js` (`Option<T>`)**: The original design. Uses `TaggedUnion` internally and requires a constructor-type argument (`Option.Of(NumberConstructor)`). The type parameter `T` is a constructor type, not an instance type. Several methods have known logical issues (the `isSome` / `isNone` logic is inverted in the current code). Considered unstable.

- **`option-baked.js` (`OptionBaked<T>`)**: A cleaner, standalone reimplementation. `T` is an instance type directly (e.g., `OptionBaked<number>`). Has a richer API (`map`, `andThen`, `or`, `orElse`). This is the preferred implementation for new code.

**Do not assume the two are interchangeable.** Their type parameters mean different things. When writing new code that needs an `Option`-like type, prefer `OptionBaked<T>`.

The long-term goal is to reconcile or replace `Option` with `OptionBaked`, but that refactor has not happened yet.

## Type Tests (`*.d.test.js`)

Type-only tests live in `tests/` and follow the `*.d.test.js` naming convention. They rely entirely on LSP diagnostics and do not execute at runtime. To verify them, open the file in VS Code and check that no type errors appear in the Problems panel. There is no automated runner for these.

Runtime behavior tests use the `*.test.js` pattern and are loaded via `index.html` in the browser.

## What Not to Do

- Do not add runtime logic to `*.d.js` files.
- Do not use `any` in type definitions. Prefer specific types or `unknown`.
- Do not add a new generic utility outside `types.d.js` (or the relevant `types-*.d.js` file) unless it is truly local to a single other file.
- Do not treat `Option` and `OptionBaked` as equivalent; they have different type-parameter semantics.
- Do not write runtime null, undefined, or type checks. All safety comes from static JSDoc analysis.
