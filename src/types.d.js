//@ts-check

/**
 * @template {ReadonlyArray<CodeBlock<unknown>>} T
 * @typedef {{[K in keyof T]: T[K]}} Process<T>
 */

/**
 * @template T
 * @typedef {{ v: T }} Binding<T>
 */

/**
 * @template {unknown} P
 * @typedef {ReadonlyArray<
 *     | ((p: any, b: Binding<P>, when: true) => unknown)
 *     | ((p: any, b: Binding<P>, when: false) => unknown)
 *     | ((p: any, when: true, b: Binding<P>) => unknown)
 *     | ((p: any, when: false, b: Binding<P>) => unknown)
 *     | ((b: Binding<P>, p: any, when: true) => unknown)
 *     | ((b: Binding<P>, p: any, when: false) => unknown)
 *     | ((b: Binding<P>, when: true, p: any) => unknown)
 *     | ((b: Binding<P>, when: false, p: any) => unknown)
 *     | ((when: true, p: any, b: Binding<P>) => unknown)
 *     | ((when: true, b: Binding<P>, p: any) => unknown)
 *     | ((when: false, p: any, b: Binding<P>) => unknown)
 *     | ((when: false, b: Binding<P>, p: any) => unknown)
 *     | ((p: any, b: Binding<P>) => unknown)
 *     | ((p: any, when: true) => unknown)
 *     | ((p: any, when: false) => unknown)
 *     | ((b: Binding<P>, p: any) => unknown)
 *     | ((b: Binding<P>, when: true) => unknown)
 *     | ((b: Binding<P>, when: false) => unknown)
 *     | ((when: true, p: any) => unknown)
 *     | ((when: true, b: Binding<P>) => unknown)
 *     | ((when: false, p: any) => unknown)
 *     | ((when: false, b: Binding<P>) => unknown)
 *     | ((p: any) => unknown)
 *     | ((b: Binding<P>) => unknown)
 *     | ((when: true) => unknown)
 *     | ((when: false) => unknown)
 *     | (() => unknown)
 * >} MatchCases
 */

/**
 * @template {unknown} P
 * @template {MatchCases<P>} MatchArm
 * @typedef {MatchArm extends []
 *     ? ErrorType<"No match case found">
 *     : MatchArm extends [infer First, ...infer Rest]
 *         ? First extends (() => infer S)
 *             ? S
 *             : First extends ((a: infer A) => infer S)
 *                 ? [A] extends [false]
 *                     ? Match<P, AsType<Rest, MatchCases<P>>>
 *                     : [A] extends [true]
 *                         ? S
 *                         : [A] extends [Binding<P>] | [P]
 *                             ? S
 *                             : Match<P, AsType<Rest, MatchCases<P>>>
 *                 : First extends ((a: infer A, b: infer B) => infer S)
 *                     ? [B] extends [false]
 *                         ? [A] extends [false]
 *                             ? ErrorType<"Condition parameter 'when' is duplicated">
 *                             : [A] extends [true]
 *                                 ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                 : Match<P, AsType<Rest, MatchCases<P>>>
 *                         : [B] extends [true]
 *                             ? [A] extends [false]
 *                                 ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                 : [A] extends [true]
 *                                     ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                     : [A] extends [Binding<P>] | [P]
 *                                         ? S
 *                                         : Match<P, AsType<Rest, MatchCases<P>>>
 *                             : [A] extends [false]
 *                                 ? [B] extends [false]
 *                                     ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                     : [B] extends [true]
 *                                         ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                         : Match<P, AsType<Rest, MatchCases<P>>>
 *                                 : [A] extends [true]
 *                                     ? [B] extends [false]
 *                                         ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                         : [B] extends [true]
 *                                             ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                             : [B] extends [Binding<P>] | [P]
 *                                                 ? S
 *                                                 : Match<P, AsType<Rest, MatchCases<P>>>
 *                                     : [A] extends [P]
 *                                         ? [B] extends [P]
 *                                             ? ErrorType<"Pattern parameter 'p' is duplicated">
 *                                             : [B] extends [Binding<P>]
 *                                                 ? S
 *                                                 : Match<P, AsType<Rest, MatchCases<P>>>
 *                                         : [A] extends [Binding<P>]
 *                                             ? [B] extends [Binding<P>]
 *                                                 ? ErrorType<"Binding parameter 'b' is duplicated">
 *                                                 : [B] extends [P]
 *                                                     ? S
 *                                                     : Match<P, AsType<Rest, MatchCases<P>>>
 *                                             : [B] extends [P]
 *                                                 ? [A] extends [Binding<P>]
 *                                                     ? S
 *                                                     : Match<P, AsType<Rest, MatchCases<P>>>
 *                                                 : Match<P, AsType<Rest, MatchCases<P>>>
 *                     : First extends ((a: infer A, b: infer B, c: infer C) => infer S)
 *                         ? [C] extends [false]
 *                             ? [B] extends [false]
 *                                 ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                 : [B] extends [true]
 *                                     ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                     : [A] extends [false]
 *                                         ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                         : [A] extends [true]
 *                                             ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                             : Match<P, AsType<Rest, MatchCases<P>>>
 *                             : [C] extends [true]
 *                                 ? [B] extends [false]
 *                                     ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                     : [B] extends [true]
 *                                         ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                         : [A] extends [false]
 *                                             ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                             : [A] extends [true]
 *                                                 ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                 : [A] extends [Binding<P>]
 *                                                     ? [B] extends [Binding<P>]
 *                                                         ? ErrorType<"Binding parameter 'b' is duplicated">
 *                                                         : [B] extends [P]
 *                                                             ? S
 *                                                             : Match<P, AsType<Rest, MatchCases<P>>>
 *                                                      : [A] extends [P]
 *                                                         ? [B] extends [P]
 *                                                             ? ErrorType<"Pattern parameter 'p' is duplicated">
 *                                                             : [B] extends [Binding<P>]
 *                                                                 ? S
 *                                                                 : Match<P, AsType<Rest, MatchCases<P>>>
 *                                                         : Match<P, AsType<Rest, MatchCases<P>>>
 *                                 : [B] extends [false]
 *                                     ? [C] extends [false]
 *                                         ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                         : [C] extends [true]
 *                                             ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                             : [A] extends [false]
 *                                                 ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                 : [A] extends [true]
 *                                                     ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                     : Match<P, AsType<Rest, MatchCases<P>>>
 *                                     : [B] extends [true]
 *                                         ? [C] extends [false]
 *                                             ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                             : [C] extends [true]
 *                                                 ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                 : [A] extends [false]
 *                                                     ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                     : [A] extends [true]
 *                                                         ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                         : [A] extends [Binding<P>]
 *                                                             ? [C] extends [Binding<P>]
 *                                                                 ? ErrorType<"Binding parameter 'b' is duplicated">
 *                                                                 : [C] extends [P]
 *                                                                     ? S
 *                                                                     : Match<P, AsType<Rest, MatchCases<P>>>
 *                                                             : [A] extends [P]
 *                                                                 ? [C] extends [P]
 *                                                                     ? ErrorType<"Pattern parameter 'p' is duplicated">
 *                                                                     : [C] extends [Binding<P>]
 *                                                                         ? S
 *                                                                         : Match<P, AsType<Rest, MatchCases<P>>>
 *                                                                 : Match<P, AsType<Rest, MatchCases<P>>>
 *                                         : [A] extends [false]
 *                                             ? [B] extends [false]
 *                                                 ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                 : [B] extends [true]
 *                                                     ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                     : [C] extends [false]
 *                                                         ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                         : [C] extends [true]
 *                                                             ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                             : Match<P, AsType<Rest, MatchCases<P>>>
 *                                             : [A] extends [true]
 *                                                 ? [B] extends [false]
 *                                                     ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                     : [B] extends [true]
 *                                                         ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                         : [B] extends [false]
 *                                                             ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                             : [B] extends [true]
 *                                                                 ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                                 : [B] extends [Binding<P>]
 *                                                                     ? [B] extends [Binding<P>]
 *                                                                         ? ErrorType<"Binding parameter 'b' is duplicated">
 *                                                                         : [B] extends [P]
 *                                                                             ? S
 *                                                                             : Match<P, AsType<Rest, MatchCases<P>>>
 *                                                                     : [C] extends [P]
 *                                                                         ? [B] extends [P]
 *                                                                             ? ErrorType<"Pattern parameter 'p' is duplicated">
 *                                                                             : [B] extends [Binding<P>]
 *                                                                                 ? S
 *                                                                                 : Match<P, AsType<Rest, MatchCases<P>>>
 *                                                                         : Match<P, AsType<Rest, MatchCases<P>>>
 *                                                 : never
 *                         : Match<P, AsType<Rest, MatchCases<P>>>
 *         : never
 * } Match<P, MatchArm>
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
