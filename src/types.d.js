/**
 * @template {String} K
 * @template V
 * @typedef {Record<K, V>} Pair<T, V>
 */

/**
 * @template {ReadonlyArray<Pair<String, unknown>>} T
 * @typedef {T} ListOfPair<T>
 */

/**
 * @template {ReadonlyArray<Pair<String, unknown>>} PairMap
 * @template {String} Keyword
 * @typedef {PairMap extends ReadonlyArray<infer P>
 *     ? P extends Pair<Keyword, infer V>
 *         ? V
 *         : never
 *     : never
 * } Find
 */

/**
 * @template {CodeBlock<unknown>} T
 * @typedef {{[K in keyof T]: T[K]}} Process<T>
 */

/**
 * @template Code
 * @typedef {ReadonlyArray<Code>} CodeBlock<Code>
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

