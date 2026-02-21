---
applyTo: '**'
---
# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-22
**Commit:** 7c25caa
**Branch:** main

## OVERVIEW

`semantic.js` is a pure JavaScript, browser-first library that brings Rust-like ergonomics to JS. It implements `Option<T>`, `Result<T, E>`, `struct`, `impl`, and tagged unions using JSDoc for full static type safety. There is no TypeScript compilation step; all type guarantees come from `// @ts-check` + JSDoc annotations interpreted by the TS language server.

## STRUCTURE

```
./
├── src/
│   ├── interfaces/   # Interfaces mimicking rust traits (Cloneable, Matchable)
│   ├── keywords/     # Struct, Impl, Mut builder APIs
│   ├── primitives/   # Tuple, TaggedUnion
│   └── types/        # Heavy JSDoc utilities (*.d.js) & core types (Option, Result)
└── tests/            # Browser-loaded example tests (no Node runner)
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| **Adding a new type utility** | `src/types/types.d.js` | Generic/mapped types |
| **Extending Struct behavior** | `src/keywords/struct.js` | Defines data shapes |
| **Extending Impl behavior** | `src/keywords/impl.js` | Attaches behavior/freezes object |
| **Runtime type implementations**| `src/types/{option,result}*`| Prefer `-baked` versions |
| **Running tests** | `index.html` | Open in browser (toggle modules) |
| **Building for release** | `build.sh` | Run minification pipeline |

## CODE MAP

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `Struct` | class | `src/keywords/struct.js` | Struct builder API |
| `Impl` | object | `src/keywords/impl.js` | Impl builder API |
| `OptionBaked` | class | `src/types/option-baked.js` | Standalone Option implementation |
| `ResultBaked` | class | `src/types/result-baked.js` | Standalone Result implementation |
| `TaggedUnion` | class | `src/primitives/tagged-union.js` | Tagged union primitive |

## CONVENTIONS

### General Coding Style
- **Language:** Always respond in Korean. Write all comments in English.
- **Control Flow:** NO ternary operators (`a ? b : c`). NO single-line `if`/`for` without braces. ALWAYS use `if ... else ...` for clarity.
- **Iteration:** Prefer iterators/generators over traditional `for` loops (e.g., `for...of` instead of manual index management).
- **Operators:** NO increment (`++`) or decrement (`--`) operators. Use `+= 1` or `-= 1` instead.
- **Functions:** NO default arguments. Prefer `const func = () => {}` over `function func() {}`.

### Architecture & Typing
- **Pure JS files only (`.js`), no `.ts` allowed.**
- **Typing:** Actively use JSDoc for static type analysis. NO `any` type (prefer `unknown` or specific types). NO `as T` syntax; use `/** @type {T} */ (variable)` instead. NO comments in `@typedef` declarations.
- **Testing:** Tests are executed solely in the browser via `index.html`. No `npm` test scripts.

## ANTI-PATTERNS (THIS PROJECT)

- **NO runtime type-checking:** (e.g. `if (typeof myVar !== 'string')`).
- **NO runtime null/undefined-checking.** (e.g., `if (myVar !== null)` or `!== undefined`). Rely on JSDoc for static analysis.
- **NO TypeScript compilation:** Do not write `.ts` code.
- **NO `this` in Impl:** Functions passed to `Impl` must use `(self, ...args)`.
- **NO mutation after `build()`:** `Impl`-built objects are permanently frozen.

## UNIQUE STYLES

- **`_` prefix for private fields:** Both structurally (`.prv.field()`) and functionally. They are runtime-accessible but treated as internal.
- **Mutability signaled at type level:** Use `mut(val)` and `imut(val)`.

## COMMANDS

```bash
./build.sh    # Minify for dist (or Ctrl+Shift+B in VS Code)
```

## NOTES

- See `src/keywords/AGENTS.md` and `src/types/AGENTS.md` for deeper module-specific rules.
