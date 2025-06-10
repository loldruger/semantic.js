//@ts-check

/**
 * @typedef {((p: unknown, o: {e: true, when: true}) => unknown) |
 *     ((p: unknown, o: {e: true, when: false}) => unknown) |
 *     ((p: unknown, o: {e: false, when: true}) => unknown) |
 *     ((p: unknown, o: {e: false, when: false}) => unknown) |
 *     ((o: {when: false}) => unknown)
 * } Internal.MatchCaseUnion
 */

/**
 * @template {unknown} Pattern
 * @template {unknown} CaseArm
 * @template {Array<unknown>} RestCases
 * @template {unknown} Result
 * @template {Boolean} When
 * @template {Boolean} IsExactMatch
 * @typedef {If<When,
 *     If<IsExactMatch,
 *         Pattern extends (...args: Array<unknown>) => unknown
 *             ? And<
 *                 Type.IsSubType<CaseArm, (...args: Array<unknown>) => unknown>,
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
 * @template {Array<unknown>} CaseArms
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

/** @typedef {{ tag: "Internal.GotoAction" }} Internal.GotoAction */

/**
 * Helper to check if unknown element in a processed loop body tuple is Internal.GotoAction
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
 * @template {CodeBlock<unknown>|Label<String>|Goto<String>} ExecItem
 * @typedef {Match<ExecItem, [
 *     (p: Label<String>) => ExecItem,
 *     (p: Goto<String>) => Internal.GotoAction,
 *     (p: CodeBlock<unknown>) => ExecItem
 * ]>} Internal.ProcessLoopItem<ExecItem>
 */

/**
 * @template {Boolean} Condition
 * @template {Array<CodeBlock<unknown>|Label<String>|Goto<String>>} Exec
 * @template {Array<CodeBlock<unknown>|Label<String>|Goto<String>>} [LoopBody=[Label<"continue">, ...Exec, Goto<"continue">]]
 * @typedef {If<Condition, 
 *   Internal.DoesProcessedBodyContainGoto<{[K in keyof LoopBody]: Internal.ProcessLoopItem<LoopBody[K]>}> extends true
 *     ? Loop<Condition, Exec> 
 *     : {[K in keyof LoopBody]: Internal.ProcessLoopItem<LoopBody[K]>}, 
 *   never
 * >} Loop<Condition, Exec>
 */

/**
 * @template {Array<unknown>} T
 * @template {(item: unknown) => unknown} CustomMapFn
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