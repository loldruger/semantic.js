---
applyTo: '**'
---
# GitHub Copilot Instructions

## About Me

I am a developer who values clear, explicit, and modern code. I prefer static type checking over runtime checks and follow strict coding conventions for consistency.

## General Rules

### Prompting Guide (Meta-instructions)

- **PP (Positive Prompt):** This is a mandatory instruction that you **MUST** follow without exception.
- **PPP (Preferred Positive Prompt):** This is a preferred instruction. You should try to follow it whenever possible.
- **NP (Negative Prompt):** This is a negative instruction. You **MUST NOT** do this under any circumstances.
- **PNP (Preferred Negative Prompt):** This is a preferred negative instruction. You should try to avoid doing this.

### General Coding Style

- **PP:** Always respond in Korean.
- **PPP:** If your response is expected to be long, split it into multiple messages.
- **NP:** Do not use increment (`++`) or decrement (`--`) operators.
- **PP:** Use `+= 1` or `-= 1` instead of increment/decrement operators.
- **NP:** Do not use the ternary operator (`a ? b : c`).
- **PP:** Use `if ... else ...` statements for clarity.
- **NP:** Do not write comments in Korean.
- **PP:** Write all comments in English.
- **PPP:** Where the language supports it, prefer using iterators or generators over traditional `for` loops with manual index management. For example, in Python, prefer `for item in collection:` over `for i in range(len(collection)):`.
- **NP:** Do not use default arguments in function definitions.
- **NP:** Do not omit curly braces for single-line `if`, `for`, or `while` statements.
  - **Correct:**
    ```
    if (condition) {
        doSomething();
    }
    ```
  - **Incorrect:**
    ```
    if (condition) doSomething();
    ```

---
applyTo: '**.cs'
---
## Language Specific Instructions

### C#

- **PP:** Always use the `this` keyword when accessing instance-level properties or methods within a class. (e.g., `this.myVariable`)
- **PP:** Always access static members through the class name, even when it's possible to omit it. (e.g., `ClassName.StaticProperty`)

---
applyTo: '**.js'
---
### JavaScript

- **PP:** Actively use JSDoc comments for all variables, functions, closures, methods, and classes.
- **PP:** Aggressively leverage JSDoc for static type analysis and to enable TypeScript's pre-runtime type checking capabilities.
- **NP:** Do not write runtime type-checking code (e.g., `if (typeof myVar !== 'string')`). Rely on JSDoc for static analysis.
- **NP:** Do not use the `any` type.
- **PNP:** Avoid using the `unknown` type if a more specific type can be used.
- **PPP:** Prefer declaring functions using `const` and arrow function syntax (`const func = () => {}`) instead of `function func() {}`.
- **NP:** Do not use the `as T` syntax for type assertion.
- **PP:** Use JSDoc type casting (`/** @type {T} */ (variable)`) for type assertion instead.
- **NP:** Do not write comments in `@typedef` declarations.

---
applyTo: '**.py'
---
### Python

- **PP:** Always use type hints for function arguments and return values.
  - **Example:** `def my_function(param: int) -> str:`
- **NP:** Do not use `Any`, `object`, or untyped container types (like `list` or `dict` without type parameters in older Python versions).
- **NP:** Do not write runtime type-checking code (e.g., `if not isinstance(my_var, str):`).
- **PP:** Rely on type hints for static analysis. When a type is clear to the developer but not to the type checker, use `typing.cast()`.
- **PP:** If the Python version is 3.10 or newer:
  - Use `dict` and `list` for type hints instead of `typing.Dict` and `typing.List`.
  - Use `set` and `tuple` for type hints instead of `typing.Set` and `typing.Tuple`.
  - Use the pipe operator (`|`) for union types instead of `typing.Union`. (e.g., `int | str`)