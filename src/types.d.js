//@ts-check

/**
 * @template {Boolean} B
 * @typedef {{ flag: B }} ExactMatch<B>
 */

/**
 * @template {unknown} P
 * @typedef {ReadonlyArray<
 *     | ((p: any, o?: {e?: true, when?: true}) => unknown)
 *     | ((p: any, o?: {e?: true, when?: false}) => unknown)
 *     | ((p: any, o?: {e?: false, when?: true}) => unknown)
 *     | ((p: any, o?: {e?: false, when?: false}) => unknown)
 * >} MatchCases
 */

/**
 * @template P, A, Rest, S
 * @template {Boolean} When
 * @template {Boolean} IsExactMatch
 * @typedef {If<When, 
 *     P extends (...args: any) => infer RetA
 *         ? A extends (...args: any) => infer RetB
 *             ? IsExactMatch extends true
 *                 ? And<
 *                     IsEqual<Parameters<P>, Parameters<A>>,
 *                     IsEqual<ReturnType<P>, ReturnType<A>>
 *                 > extends true
 *                     ? RetA extends (...args: any) => any
 *                         ? RetB extends (...args: any) => any
 *                             ? And<
 *                                 IsEqual<Parameters<RetA>, Parameters<RetB>>,
 *                                 IsEqual<ReturnType<RetA>, ReturnType<RetB>>
 *                             > extends true
 *                                 ? S
 *                                 : Match<P, AsType<Rest, MatchCases<P>>>
 *                             : never
 *                         : S
 *                     : Match<P, AsType<Rest, MatchCases<P>>>
 *                 : P extends A
 *                     ? S
 *                     : Match<P, AsType<Rest, MatchCases<P>>>
 *             : S
 *         : P extends A
 *             ? S
 *             : Match<P, AsType<Rest, MatchCases<P>>>,
 *     Match<P, AsType<Rest, MatchCases<P>>>
 * >} MatchEvaluator<P, A, Rest, S, When, IsExactMatch>
 */

/**
 * @template {unknown} P
 * @template {MatchCases<P>} MatchArm
 * @typedef {MatchArm extends []
 *     ? ErrorType<"No match case found">
 *     : MatchArm extends [infer First, ...infer Rest]
 *         ? First extends (() => infer S)
 *             ? S
 *             : First extends ((po: infer PO) => infer S)
 *                 ? MatchEvaluator<
 *                     P,
 *                     MatchCases<P>,
 *                     Rest,
 *                     S,
 *                     true,
 *                     PO extends {e?: true} ? true : false
 *                 >
 *                 : First extends ((p: infer P, o?: infer O) => infer S)
 *                     ? MatchEvaluator<
 *                         P,
 *                         MatchCases<P>,
 *                         Rest,
 *                         S,
 *                         O extends {when?: true} ? true : false,
 *                         O extends {e?: true} ? true : false
 *                     >
 *                     : Match<P, AsType<Rest, MatchCases<P>>>
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

/**
 * @template {Boolean} A
 * @template {Boolean} B
 * @typedef {A extends true
*     ? B extends true
*         ? true
*         : false
*     : false
* } And<A, B>
*/

/**
 * @template {Boolean} A
 * @template {Boolean} B
 * @template {Boolean} C
 * @typedef {A extends true
 *     ? B extends true
 *         ? C extends true
 *             ? true
 *             : false
 *         : false
 *     : false
 * } And3<A, B, C>
 */

/**
 * @template {Boolean} T
 * @template {Boolean} U
 * @typedef {T extends true
 *     ? true
 *     : U extends true
 *         ? true
 *         : false
 * } Or<A, B>
 */

/**
 * @template {Boolean} A
 * @template {Boolean} B
 * @template {Boolean} C
 * @typedef {A extends true
 *     ? true
 *     : B extends true
 *         ? true
 *         : C extends true
 *             ? true
 *             : false
 * } Or3<A, B>
 */

/**
 * @template {Boolean} A
 * @template {Boolean} B
 * @template {Boolean} C
 * @template {Boolean} D
 * @typedef {A extends true
 *     ? true
 *     : B extends true
 *         ? true
 *         : C extends true
 *             ? true
 *             : D extends true
 *                 ? true
 *                 : false
 * } Or4<A, B, C, D>
 */