//@ts-check

/**
 * @typedef {((p: any, o: {e: true, when: true}) => any) |
 *     ((p: any, o: {e: true, when: false}) => any) |
 *     ((p: any, o: {e: false, when: true}) => any) |
 *     ((p: any, o: {e: false, when: false}) => any) |
 *     ((o: {when: false}) => any)
 * } Internal.MatchCaseUnion
 */

/**
 * @template {unknown} Pattern
 * @template {unknown} CaseArm
 * @template {ReadonlyArray<unknown>} RestCases
 * @template {unknown} Result
 * @template {Boolean} When
 * @template {Boolean} IsExactMatch
 * @typedef {If<When,
 *     If<IsExactMatch,
 *         Pattern extends (...args: ReadonlyArray<unknown>) => unknown
 *             ? And<
 *                 Type.IsSubType<CaseArm, (...args: ReadonlyArray<unknown>) => unknown>,
 *                 Type.IsEqual<Pattern, CaseArm>
 *             > extends true
 *                 ? Result
 *                 : Match<Pattern, RestCases>
 *             : Type.IsEqual<Pattern, CaseArm> extends true
 *                 ? Result
 *                 : Or4<
 *                     Type.IsSubType<{e: true, when: true}, CaseArm>,
 *                     Type.IsSubType<{e: true, when: false}, CaseArm>,
 *                     Type.IsSubType<{e: false, when: true}, CaseArm>,
 *                     Type.IsSubType<{e: false, when: false}, CaseArm>
 *                 > extends true
 *                     ? Result
 *                     : Match<Pattern, RestCases>,
 *     Pattern extends CaseArm
 *         ? Result
 *         : Or4<
 *             Type.IsSubType<{e: true, when: true}, CaseArm>,
 *             Type.IsSubType<{e: true, when: false}, CaseArm>,
 *             Type.IsSubType<{e: false, when: true}, CaseArm>,
 *             Type.IsSubType<{e: false, when: false}, CaseArm>
 *         > extends true
 *             ? Result
 *             : Match<Pattern, RestCases>>,
 *     Match<Pattern, RestCases>
 * >} Internal.MatchEvaluator<Pattern, CaseArm, Cases, Result, When, IsExactMatch>
 */

/**
 * @template {unknown} Pattern
 * @template {ReadonlyArray<unknown>} CaseArms
 * @template {Boolean} [IsExactMatch=false]
 * @typedef {CaseArms extends []
 *     ? Type.Error<"No match case found">
 *     : CaseArms extends [infer First, ...infer Rest]
 *         ? First extends (() => infer S)
 *             ? S
 *             : First extends ((po: infer PtnOrOpt) => infer Result)
 *                 ? Internal.MatchEvaluator<
 *                     Pattern,
 *                     PtnOrOpt,
 *                     Rest,
 *                     Result,
 *                     PtnOrOpt extends {when: false} ? false : true,
 *                     IsExactMatch
 *                 >
 *                 : First extends ((p: infer Ptn, o: infer Opt) => infer Result)
 *                     ? Internal.MatchEvaluator<
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
 * @template {unknown} T
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

/** @typedef {{ readonly _tag: "Internal.GotoAction" }} Internal.GotoAction */

/**
 * Helper to check if any element in a processed loop body tuple is Internal.GotoAction
 * @template ProcessedBodyTuple extends readonly unknown[]
 * @typedef {ProcessedBodyTuple extends [infer Head, ...infer Tail]
 *   ? Head extends Internal.GotoAction
 *     ? true
 *     : Internal.DoesProcessedBodyContainGoto<Tail>
 *   : false
 * } Internal.DoesProcessedBodyContainGoto<ProcessedBodyTuple>
 */

/**
 * Processes a single item in a loop body. If it's a Goto, returns a marker.
 * (Replaces LoopMatcher to break circular dependency)
 * @template {CodeBlock<any>|Label<any>|Goto<any>} ExecItem
 * @typedef {Match<ExecItem, [
 *     (p: Label<any>) => ExecItem,
 *     (p: Goto<any>) => Internal.GotoAction,
 *     (p: CodeBlock<any>) => ExecItem
 * ]>} Internal.ProcessLoopItem<ExecItem>
 */

/**
 * @template {Boolean} Condition
 * @template {ReadonlyArray<CodeBlock<any>|Label<any>|Goto<any>>} Exec
 * @template {ReadonlyArray<CodeBlock<any>|Label<any>|Goto<any>>} [LoopBody=[Label<"continue">, ...Exec, Goto<"continue">]]
 * @typedef {If<Condition, 
 *   Internal.DoesProcessedBodyContainGoto<{[K in keyof LoopBody]: Internal.ProcessLoopItem<LoopBody[K]>}> extends true
 *     ? Loop<Condition, Exec> 
 *     : {[K in keyof LoopBody]: Internal.ProcessLoopItem<LoopBody[K]>}, 
 *   never
 * >} Loop<Condition, Exec>
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
 * @template {Boolean} A
 * @template {Boolean} B
 * @template {Boolean} C
 * @template {Boolean} D
 * @typedef {A extends true
 *     ? B extends true
 *         ? C extends true
 *             ? D extends true
 *                 ? true
 *                 : false
 *             : false
 *         : false
 *     : false
 * } And4<A, B, C, D>
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

/**
 * @template {Boolean} A
 * @typedef {A extends true ? false : true} Not<A>
 */