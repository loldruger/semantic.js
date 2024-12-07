//@ts-check

/**
 * @template {ReadonlyArray<CodeBlock<unknown>>} T
 * @typedef {{[K in keyof T]: T[K]}} Process<T>
 */

/**
 * @template T
 * @typedef {{ v: T }} At<T>
 */

/**
 * @template {unknown} P
 * @typedef {ReadonlyArray<
 *     | ((p: any, at: At<P>, when: true) => unknown)
 *     | ((p: any, at: At<P>, when: false) => unknown)
 *     | ((p: any, at: At<P>) => unknown)
 *     | ((p: any, when: true) => unknown)
 *     | ((p: any, when: false) => unknown)
 *     | ((p: any) => unknown)
 *     | ((at: At<P>) => unknown)
 *     | ((when: true) => unknown)
 *     | ((when: false) => unknown)
 *     | (() => unknown)
 * >} MatchCases
 */

/**
 * @template {unknown} P
 * @template {MatchCases<P>} MatchArm
 * @typedef {MatchArm extends []
 *       ? ErrorType<"No match case found">
 *       : MatchArm extends [infer First, ...infer Rest]
 *           ? First extends (() => infer S)
 *               ? S
 *               : First extends ((a: infer A) => infer S)
 *                   ? [A] extends [false]
 *                       ? Match<P, AsType<Rest, MatchCases<P>>>
 *                       : [A] extends [true] | [At<P>]
 *                           ? S
 *                           : [A] extends [P]
 *                               ? S
 *                               : Match<P, AsType<Rest, MatchCases<P>>>
 *               : First extends ((a: infer A, b: infer B) => infer S)
 *                   ? [B] extends [false]
 *                       ? Match<P, AsType<Rest, MatchCases<P>>>
 *                       : [B] extends [true]
 *                           ? [A] extends [P]
 *                               ? S
 *                               : Match<P, AsType<Rest, MatchCases<P>>>
 *                           : [B] extends [At<P>]
 *                               ? [A] extends [P]
 *                                   ? S
 *                                   : Match<P, AsType<Rest, MatchCases<P>>>
 *                               : ErrorType<"Invalid match case">
 *               : First extends ((a: infer A, b: infer B, c: infer C) => infer S)
 *                   ? [C] extends [false]
 *                       ? Match<P, AsType<Rest, MatchCases<P>>>
 *                       : [C] extends [true]
 *                           ? [A] extends [P]
 *                               ? [B] extends [At<P>]
 *                                   ? S
 *                                   : Match<P, AsType<Rest, MatchCases<P>>>
 *                               : Match<P, AsType<Rest, MatchCases<P>>>
 *                           : ErrorType<"Invalid match case">
 *               : Match<P, AsType<Rest, MatchCases<P>>>
 *     : never
 *   } Match<P, MatchArm>
 */

/**
 * @template {String} L
 * @typedef {L} Label<L>
 */

/**
 * @template Code
 * @typedef {Code} CodeBlock<Code>
 */

/**
 * @template {Boolean} Condition
 * @template {ReadonlyArray<CodeBlock<Exec> | Label<String>>} Exec
 * @typedef {If<Condition,
 *     Match<Infer<ReadonlyArray<Exec>, Exec>, [
 *          (p: Label<String>) => "Label",
 *          (p: CodeBlock<Exec>) => "CodeBlock",
 *          () => "Default"
 *     ]>,
 *     never>
 * } Loop<Condition, Exec>
 */

/**
 * @template {unknown} T
 * @typedef {T extends infer E ? E : never} ContainerType<T>
 */

/**
 * @template T
 * @template {T extends ContainerType<infer E> ? E : never} W
 * @typedef {W} Infer<W, T>
 */

/**
 * @template {Boolean} T
 * @typedef {Loop<T, [
 *     Label<any>,
 * ]>} TestLoop<T>
 */

/**
 * @typedef {TestLoop<true>} TestLoopTrue
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
