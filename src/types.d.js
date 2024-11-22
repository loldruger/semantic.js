//@ts-check

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
 * @template {ReadonlyArray<CodeBlock<unknown>>} T
 * @typedef {{[K in keyof T]: T[K]}} Process<T>
 */

/**
 * @template {PropertyKey} Key
 * @template {ReadonlyArray<CodeBlock<unknown>> | unknown} Body
 * @template {'break'=} [Break=undefined]
 * @typedef {Body} Case<Key, Body, Break>
 */

/**
 * @template {PropertyKey} Key
 * @template {ReadonlyArray<Case<Key, unknown>>} Cases
 * @typedef {Cases extends ReadonlyArray<infer K>
 *     ? K extends Case<Key, infer Body, infer Break>
 *         ? Break extends 'break'
 *             ? Body
 *             : Cases extends [unknown, ...infer Rest] ? Switch<Key, Rest> : never
 *         : never
 *     : never
 * } Switch<Key, Cases>
 */

/**
 * @typedef {Switch<'type_tuple', [
 *     Case<'type_tuple',
 *         [true, false]
 *     >,
 *     Case<'type_abst_concrete',
 *         false,
 *         'break'
 *     >,
 *     Case<'type_abst_concrete2',
 *         'false',
 *         'break'
 *     >
 * ]>} TestFn2
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
