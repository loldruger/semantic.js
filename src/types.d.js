//@ts-check

/**
 * @template {ReadonlyArray<CodeBlock<unknown>>} T
 * @typedef {{[K in keyof T]: T[K]}} Process<T>
 */

/**
 * @template {unknown} P
 * @template {ReadonlyArray<
 *     (<Binding>(p?: any) => unknown) | 
 *     (<Binding>(p: any, when: true) => unknown) |
 *     (<Binding>(p: any, when: false) => unknown)
 * >} MatchCases
 * @typedef {MatchCases extends [infer First, ...infer Rest]
 *     ? First extends (p: P) => infer S
 *         ? S
 *         : First extends (p: P, when: infer Cond) => infer CS
 *             ? Cond extends true 
 *                 ? CS
 *                 : never
 *             : First extends (when: infer Cond) => infer WCS
 *                 ? Cond extends true
 *                     ? WCS
 *                     : Match<P, AsType<Rest, ReadonlyArray<
 *                         (<Binding>(p?: any) => unknown) |
 *                         (<Binding>(p: any, when: true) => unknown) |
 *                         (<Binding>(p: any, when: false) => unknown)
 *                     >>>
 *                 : First extends () => infer DS
 *                     ? DS
 *                     : Match<P, AsType<Rest, ReadonlyArray<
 *                         (<Binding>(p?: any) => unknown) |
 *                         (<Binding>(p: any, when: true) => unknown) |
 *                         (<Binding>(p: any, when: false) => unknown)
 *                     >>>
 *     : ErrorType<'Not all cases are handled'>
 * } Match<P, MatchCases>
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
 *     Match<Exec, [
 *          <Binding = String>(p: any) => Binding,
 *          () => 'Exec'
 *     ]>, never>
 * } Loop<Condition, Exec>
 */

/**
 * @template {Boolean} T
 * @typedef {Loop<T, []>} TestLoop<T>
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
