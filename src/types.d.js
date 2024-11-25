//@ts-check

/**
 * @template {ReadonlyArray<CodeBlock<unknown>>} T
 * @typedef {{[K in keyof T]: T[K]}} Process<T>
 */

/**
 * @template P
 * @template {ReadonlyArray<<Binding>(a?: any, binding?: Binding) => unknown>} MatchCases
 * @typedef {MatchCases extends [infer First, ...infer Rest]
 *     ? First extends (a: P) => infer S
 *         ? S
 *         : First extends () => infer DS
 *            ? DS
 *            : Match<P, AsType<Rest, ReadonlyArray<<Binding>(a?: any, binding?: Binding) => unknown>>>
 *     : never
 * } Match<P, Cases>
 */

/**
 * @typedef {Match<0, [
 *     (a: 0) => [true],
 *     (a: 1) => false,
 *     (a: 2) => 'false',
 *     () => 'Default'
 * ]>} TestMatch
 */

/**
 * @template Code
 * @typedef {Code} CodeBlock<Code>
 */

/**
 * @template {Boolean} Condition
 * @template {ReadonlyArray<CodeBlock<Exec>> | unknown} Exec
 * @typedef {Condition extends true ? Loop<Condition, Exec> : never} Loop<Condition, Exec>
 */

/**
 * @template {ReadonlyArray<unknown>} T
 * @template {(item: any) => any} CustomMapFn
 * @typedef {{[K in keyof T]: CustomMapFn extends (item: T[K]) => infer R ? R : EvalFailed}} IterToMap<T, CustomMapFn>
 */

/**
 * @template {Boolean} Condition
 * @template {ReadonlyArray<CodeBlock<Then>> | unknown} Then
 * @template {ReadonlyArray<CodeBlock<Else>> | unknown} Else
 * @typedef {Condition extends true ? Then : Else} If<Condition, Then, Else>
 */
