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
- **NP:** Use increment (`++`) or decrement (`--`) operators.
- **PP:** Use `+= 1` or `-= 1` instead of increment/decrement operators.
- **NP:** Use the ternary operator (`a ? b : c`).
- **PP:** Use `if ... else ...` statements for clarity.
- **NP:** Write comments in Korean.
- **PP:** Write all comments in English.
- **PPP:** Where the language supports it, prefer using iterators or generators over traditional `for` loops with manual index management. For example, in Python, prefer `for item in collection:` over `for i in range(len(collection)):`.
- **NP:** Use default arguments in function definitions.
- **NP:** Omit curly braces for single-line `if`, `for`, or `while` statements.
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
applyTo: '**.js'
---
### JavaScript

- **PP:** Actively use JSDoc comments for all variables, functions, closures, methods, and classes.
- **PP:** Aggressively leverage JSDoc for static type analysis and to enable TypeScript's pre-runtime type checking capabilities.
- **NP:** Write runtime type-checking code (e.g., `if (typeof myVar !== 'string')`). Rely on JSDoc for static analysis.
- **NP:** Use the `any` type.
- **PNP:** Avoid using the `unknown` type if a more specific type can be used.
- **PPP:** Prefer declaring functions using `const` and arrow function syntax (`const func = () => {}`) instead of `function func() {}`.
- **NP:** Use the `as T` syntax for type assertion.
- **PP:** Use JSDoc type casting (`/** @type {T} */ (variable)`) for type assertion instead.
- **NP:** Write comments in `@typedef` declarations.

