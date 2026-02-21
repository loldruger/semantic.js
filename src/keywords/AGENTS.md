---
applyTo: './**'
---
# keywords/ Directory Knowledge Base

> See root `AGENTS.md` and `src/AGENTS.md` for coding conventions and overall architecture.
> This file covers patterns specific to the `keywords/` directory.

## Purpose

This directory implements the builder API that mimics Rust keywords. The two primary modules are `struct.js` (data shapes) and `impl.js` (behaviors). Together they let callers define typed, frozen objects with a clean, chainable API and zero runtime type checks.

## `struct.js` — Struct Builder

`Struct` defines a data shape by chaining field declarations and calling `.build()`.

```js
const shape = Struct.new()
    .pub.field("name", String)
    .pub.field("age",  Number)
    .prv.field("id",   Number)  // stored as `_id` at runtime
    .build();
```

Key facts:

- `.pub.field(name, typeInfo)` declares a public field. The key is stored as-is.
- `.prv.field(name, typeInfo)` declares a private field. The key is stored with a `_` prefix (e.g., `"id"` becomes `"_id"`).
- `.build()` merges public and private records into a single plain object. The return type exposes only public keys to the type checker via `Type.PickPublicKeys`.
- The prototype chain is severed (`Object.setPrototypeOf(Struct, null)`). Do not assume any `Object.prototype` methods on builder instances.
- `typeInfo` is a pure type-level hint; its runtime value is discarded.

## `impl.js` — Impl Builder

`Impl.for(target)` attaches behavior to an existing object (typically one produced by `Struct.build()`) and then freezes it.

```js
Impl.for(shape)
    .pub.const("VERSION", 1)
    .pub.fn("greet", (self, greeting) => `${greeting}, ${self.name}`)
    .prv.fn("validate", (self) => self._id > 0)
    .pub.async.fn("fetch", async (self) => { /* ... */ })
    .build();
```

Key facts:

- **`(self, ...args)` is mandatory.** Every function must accept the target object as its first argument. The builder binds it automatically so callers invoke `shape.greet(greeting)` without passing `self`.
- **Never use `this` inside an Impl function.** `self` is the bound target; `this` will be `null` at runtime.
- `.pub.fn` / `.pub.async.fn` / `.pub.const` declare enumerable, public members.
- `.prv.fn` / `.prv.async.fn` / `.prv.const` declare non-enumerable private members. Names get the `_` prefix automatically, matching the `Struct` convention.
- Build process runs in three passes:
  1. Apply all constants via `Object.defineProperty`.
  2. Place placeholder shell functions on the target so mutual recursion works correctly.
  3. Bind the real implementations.
- `.build()` calls `Object.freeze` on the target. The object is immutable after this point.
- `Impl` itself has no prototype (`Object.setPrototypeOf(Impl, null)`).

## `_` Prefix Convention

The `_` prefix signals a private member at both the type level and the runtime level:

- `Struct.prv.field("x", ...)` stores `_x`.
- `Impl.prv.fn("x", ...)` stores `_x`.
- Private members are defined as non-enumerable so they do not appear in `Object.keys()` or `for...in`.
- Access them only from within the module that owns the struct/impl definition. They are reachable at runtime but treated as internal by convention.

## `mut.js` — Mutability Wrappers

`mut(value)` and `imut(value)` are thin wrappers with no runtime behavior beyond wrapping the value. Their sole purpose is to carry mutability intent through JSDoc generic types (e.g., `Type.ToInstanceType` inspects them). Do not add logic here.

## `types.d.js`

Contains `@typedef` declarations local to this module. Type-only file; no runtime code. Supplements `src/types/types.d.js` with `keywords/`-specific helpers.

## What Not to Do

- Do not use `this` inside functions passed to `Impl.for().pub.fn()` or `.prv.fn()`. Use `self`.
- Do not access `_`-prefixed fields from outside the owning module.
- Do not mutate or extend an object after `.build()` has been called on it.
- Do not add runtime null/type/undefined checks. Use JSDoc for static guarantees.
