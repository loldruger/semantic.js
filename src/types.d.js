//@ts-check

/**
 * @template {Boolean} B
 * @typedef {{ flag: B }} ExactMatch<B>
 */

/**
 * @template {unknown} P
 * @typedef {ReadonlyArray<
 *     | ((p: any, e: ExactMatch<Boolean>, when: true) => unknown)
 *     | ((p: any, e: ExactMatch<Boolean>, when: false) => unknown)
 *     | ((p: any, when: true, e: ExactMatch<Boolean>) => unknown)
 *     | ((p: any, when: false, e: ExactMatch<Boolean>) => unknown)
 *     | ((e: ExactMatch<Boolean>, p: any, when: true) => unknown)
 *     | ((e: ExactMatch<Boolean>, p: any, when: false) => unknown)
 *     | ((e: ExactMatch<Boolean>, when: true, p: any) => unknown)
 *     | ((e: ExactMatch<Boolean>, when: false, p: any) => unknown)
 *     | ((when: true, p: any, e: ExactMatch<Boolean>) => unknown)
 *     | ((when: true, e: ExactMatch<Boolean>, p: any) => unknown)
 *     | ((when: false, p: any, e: ExactMatch<Boolean>) => unknown)
 *     | ((when: false, e: ExactMatch<Boolean>, p: any) => unknown)
 *     | ((p: any, e: ExactMatch<Boolean>) => unknown)
 *     | ((p: any, when: true) => unknown)
 *     | ((p: any, when: false) => unknown)
 *     | ((e: ExactMatch<Boolean>, p: any) => unknown)
 *     | ((e: ExactMatch<Boolean>, when: true) => unknown)
 *     | ((e: ExactMatch<Boolean>, when: false) => unknown)
 *     | ((when: true, p: any) => unknown)
 *     | ((when: true, e: ExactMatch<Boolean>) => unknown)
 *     | ((when: false, p: any) => unknown)
 *     | ((when: false, e: ExactMatch<Boolean>) => unknown)
 *     | ((p: any) => unknown)
 *     | ((when: true) => unknown)
 *     | ((when: false) => unknown)
 *     | (() => unknown)
 * >
 * } MatchCases
 */

/**
 * @template P, A, Rest, S
 * @typedef {P extends (...args: any) => infer RetA
 *     ? A extends (...args: any) => infer RetB
 *         ? IsEqual<Parameters<P>, Parameters<A>> extends true
 *             ? IsEqual<ReturnType<P>, ReturnType<A>> extends true
 *                 ? RetA extends (...args: any) => any
 *                     ? RetB extends (...args: any) => any
 *                         ? IsEqual<Parameters<RetA>, Parameters<RetB>> extends true
 *                             ? IsEqual<ReturnType<RetA>, ReturnType<RetB>> extends true
 *                                 ? S
 *                                 : Match<P, AsType<Rest, MatchCases<P>>>
 *                             : Match<P, AsType<Rest, MatchCases<P>>>
 *                         : never
 *                     : S
 *                 : Match<P, AsType<Rest, MatchCases<P>>>
 *             : Match<P, AsType<Rest, MatchCases<P>>>
 *         : S
 *     : S
 * } MatchMatcher<P, A, Rest, S>
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
 *                         : [P] extends [A]
 *                             ? MatchMatcher<P, A, Rest, S>
 *                             : Match<P, AsType<Rest, MatchCases<P>>>
 *                 : First extends ((a: infer A, e: infer B) => infer S)
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
 *                                     : [P] extends [A]
 *                                         ? MatchMatcher<P, A, Rest, S>
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
 *                                             : [P] extends [B]
 *                                                 ? MatchMatcher<P, B, Rest, S>
 *                                                 : Match<P, AsType<Rest, MatchCases<P>>>
 *                                     : [A] extends [P]
 *                                         ? [B] extends [P]
 *                                             ? ErrorType<"Pattern parameter 'p' is duplicated">
 *                                             : [B] extends [ExactMatch<Boolean>]
 *                                                 ? MatchMatcher<P, A, Rest, S>
 *                                                 : Match<P, AsType<Rest, MatchCases<P>>>
 *                                         : [A] extends [ExactMatch<Boolean>]
 *                                             ? [B] extends [ExactMatch<Boolean>]
 *                                                 ? ErrorType<"Binding parameter 'b' is duplicated">
 *                                                 : [B] extends [P]
 *                                                     ? MatchMatcher<P, B, Rest, S>
 *                                                     : Match<P, AsType<Rest, MatchCases<P>>>
 *                                             : [B] extends [P]
 *                                                 ? [A] extends [ExactMatch<Boolean>]
 *                                                     ? MatchMatcher<P, B, Rest, S>
 *                                                     : Match<P, AsType<Rest, MatchCases<P>>>
 *                                                 : Match<P, AsType<Rest, MatchCases<P>>>
 *                     : First extends ((a: infer A, e: infer B, c: infer C) => infer S)
 *                         ? [C] extends [false]
 *                             ? [A] extends [false]
 *                                 ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                 : [A] extends [true]
 *                                     ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                     : [B] extends [false]
 *                                         ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                         : [B] extends [true]
 *                                             ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                             : Match<P, AsType<Rest, MatchCases<P>>>
 *                             : [C] extends [true]
 *                                 ? [A] extends [false]
 *                                     ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                     : [A] extends [true]
 *                                         ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                         : [B] extends [false]
 *                                             ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                             : [B] extends [true]
 *                                                 ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                 : [B] extends [ExactMatch<Boolean>]
 *                                                     ? [A] extends [ExactMatch<Boolean>]
 *                                                         ? ErrorType<"Binding parameter 'b' is duplicated">
 *                                                         : [P] extends [B]
 *                                                             ? MatchMatcher<P, A, Rest, S>
 *                                                             : Match<P, AsType<Rest, MatchCases<P>>>
 *                                                     : [B] extends [P]
 *                                                         ? [A] extends [P]
 *                                                             ? ErrorType<"Pattern parameter 'p' is duplicated">
 *                                                             : [A] extends [ExactMatch<Boolean>]
 *                                                                 ? MatchMatcher<P, B, Rest, S>
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
 *                                                         : [A] extends [ExactMatch<Boolean>]
 *                                                             ? [C] extends [ExactMatch<Boolean>]
 *                                                                 ? ErrorType<"Binding parameter 'b' is duplicated">
 *                                                                 : [P] extends [C]
 *                                                                     ? MatchMatcher<P, C, Rest, S>
 *                                                                     : Match<P, AsType<Rest, MatchCases<P>>>
 *                                                             : [A] extends [P]
 *                                                                 ? [C] extends [P]
 *                                                                     ? ErrorType<"Pattern parameter 'p' is duplicated">
 *                                                                     : [C] extends [ExactMatch<Boolean>]
 *                                                                         ? MatchMatcher<P, A, Rest, S>
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
 *                                                         : [C] extends [false]
 *                                                             ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                             : [C] extends [true]
 *                                                                 ? ErrorType<"Condition parameter 'when' is duplicated">
 *                                                                 : [C] extends [ExactMatch<Boolean>]
 *                                                                     ? [A] extends [ExactMatch<Boolean>]
 *                                                                         ? ErrorType<"Binding parameter 'b' is duplicated">
 *                                                                         : [P] extends [A]
 *                                                                             ? MatchMatcher<P, A, Rest, S>
 *                                                                             : Match<P, AsType<Rest, MatchCases<P>>>
 *                                                                     : [C] extends [P]
 *                                                                         ? [B] extends [P]
 *                                                                             ? ErrorType<"Pattern parameter 'p' is duplicated">
 *                                                                             : [B] extends [ExactMatch<Boolean>]
 *                                                                                 ? MatchMatcher<P, C, Rest, S>
 *                                                                                 : Match<P, AsType<Rest, MatchCases<P>>>
 *                                                                         : Match<P, AsType<Rest, MatchCases<P>>>
 *                                                 : never
 *                         : Match<P, AsType<Rest, MatchCases<P>>>
 *         : never
 * } Match<P, MatchArm>
 */

/**
 * @template {ReadonlyArray<any>} T
 * @typedef {{[K in keyof T]: T[K]}} Process<T>
 */

/**
 * @template {String} L
 * @typedef {{label: L}} Label<L>
 */

/**
 * @template {String} T
 * @typedef {{label: T}} Goto<T>
 */

/**
 * @template Code
 * @typedef {{code: Code}} CodeBlock<Code>
 */

/**
 * @template {CodeBlock<any>|Label<any>|Goto<any>} Exec
 * @template {Boolean} Condition
 * @template {ReadonlyArray<CodeBlock<any>|Label<any>|Goto<any>>} ExecAll
 * @typedef {Match<Exec, [
 *     (p: Label<any>) => Exec,
 *     (p: Goto<any>) => Loop<Condition, ExecAll>,
 *     (p: CodeBlock<any>) => Exec
 * ]>} LoopMatcher<Exec>
 */

/**
 * @template {Boolean} Condition
 * @template {ReadonlyArray<CodeBlock<any>|Label<any>|Goto<any>>} Exec
 * @template {ReadonlyArray<CodeBlock<any>|Label<any>|Goto<any>>} [LoopBody=[Label<"continue">, ...Exec, Goto<"continue">]]
 * @typedef {If<Condition, {
 *         [K in keyof LoopBody]: LoopMatcher<LoopBody[K], Condition, Exec>
 *     }, never>
 * } Loop<Condition, Exec>
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
