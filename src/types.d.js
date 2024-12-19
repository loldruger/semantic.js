//@ts-check

/**
 * @typedef {
 *     | ((p: any, o: {e: true, when: true}) => unknown)
 *     | ((p: any, o: {e: true, when: false}) => unknown)
 *     | ((p: any, o: {e: false, when: true}) => unknown)
 *     | ((p: any, o: {e: false, when: false}) => unknown)
 *     | ((o: {when: false}) => unknown)
 * } MatchCaseUnion
 */

/**
 * @template {MatchCaseUnion} Pattern
 * @template {MatchCaseUnion} CaseArm
 * @template {ReadonlyArray<MatchCaseUnion>} RestCases
 * @template Result
 * @template {Boolean} When
 * @template {Boolean} IsExactMatch
 * @typedef {If<When,
 *     If<IsExactMatch,
 *         Pattern extends (...args: any) => infer RetA
 *             ? CaseArm extends (...args: any) => infer RetB
 *                 ? And<
 *                     IsEqual<Parameters<Pattern>, Parameters<CaseArm>>,
 *                     IsEqual<ReturnType<Pattern>, ReturnType<CaseArm>>
 *                 > extends true
 *                     ? RetA extends (...args: any) => any
 *                         ? RetB extends (...args: any) => any
 *                             ? And<
 *                                 IsEqual<Parameters<RetA>, Parameters<RetB>>,
 *                                 IsEqual<ReturnType<RetA>, ReturnType<RetB>>
 *                             > extends true
 *                                 ? Result
 *                                 : Match<Pattern, RestCases>
 *                             : Match<Pattern, RestCases>
 *                         : Result
 *                     : Match<Pattern, RestCases>
 *                 : Match<Pattern, RestCases>
 *             : IsEqual<Pattern, CaseArm> extends true
 *                 ? Result
 *                 : Or4<
 *                     IsSubType<{e: true, when: true}, CaseArm>,
 *                     IsSubType<{e: true, when: false}, CaseArm>,
 *                     IsSubType<{e: false, when: true}, CaseArm>,
 *                     IsSubType<{e: false, when: false}, CaseArm>
 *                 > extends true
 *                     ? Result
 *                     : Match<Pattern, RestCases>,
 *     Pattern extends CaseArm
 *         ? Result
 *         : Or4<
 *             IsSubType<{e: true, when: true}, CaseArm>,
 *             IsSubType<{e: true, when: false}, CaseArm>,
 *             IsSubType<{e: false, when: true}, CaseArm>,
 *             IsSubType<{e: false, when: false}, CaseArm>
 *         > extends true
 *             ? Result
 *             : Match<Pattern, RestCases>>,
 *     Match<Pattern, RestCases>
 * >} MatchEvaluator<Pattern, CaseArm, Cases, Result, When, IsExactMatch>
 */

/**
 * @template {unknown} Pattern
 * @template {ReadonlyArray<MatchCaseUnion>} CaseArms
 * @template {Boolean} [IsExactMatch=false]
 * @typedef {CaseArms extends []
 *     ? ErrorType<"No match case found">
 *     : CaseArms extends [infer First, ...infer Rest]
 *         ? First extends (() => infer S)
 *             ? S
 *             : First extends ((po: infer PtnOrOpt) => infer Result)
 *                 ? MatchEvaluator<
 *                     Pattern,
 *                     PtnOrOpt,
 *                     Rest,
 *                     Result,
 *                     PtnOrOpt extends {when: false} ? false : true,
 *                     IsExactMatch
 *                 >
 *                 : First extends ((p: infer Ptn, o: infer Opt) => infer Result)
 *                     ? MatchEvaluator<
 *                         Pattern,
 *                         Ptn,
 *                         Rest,
 *                         Result,
 *                         Opt extends {when: false} ? false : true,
 *                         Opt extends {e: false} ? false : Opt extends {e: true} ? true : IsExactMatch
 *                     >
 *                     : Match<Pattern, Rest>
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
 * @template {unknown} Then
 * @template {unknown} Else
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