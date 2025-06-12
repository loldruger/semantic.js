//@ts-check

/**
 * @typedef {((p: unknown, o: {e: true, when: true}) => unknown) |
 *     ((p: unknown, o: {e: true, when: false}) => unknown) |
 *     ((p: unknown, o: {e: false, when: true}) => unknown) |
 *     ((p: unknown, o: {e: false, when: false}) => unknown) |
 *     ((o: {when: false}) => unknown)
 * } Internal.Match.MatchCaseUnion
 */

/**
 * @template {unknown} Case
 * @typedef {|
 *     Or4<
 *         Type.IsSubType<{e: true, when: true}, Case>,
 *         Type.IsSubType<{e: true, when: false}, Case>,
 *         Type.IsSubType<{e: false, when: true}, Case>,
 *         Type.IsSubType<{e: false, when: false}, Case>
 *     >
 * } Internal.Match.IsOptionMatched <Case>
 */

/**
 * @template {unknown} Pattern - Pattern to match against
 * @template {unknown} Case - Case being matched
 * @template {ReadonlyArray<unknown>} RestCases
 * @template {unknown} Result
 * @template {Boolean} When
 * @template {Boolean} IsExactMatch
 * @typedef {|
 *     If<When,
 *         If<IsExactMatch,
 *             Type.IsEqual<Pattern, Case> extends true
 *                 ? Result
 *                 : Internal.Match.IsOptionMatched<Case> extends true
 *                     ? Result
 *                     : Match<Pattern, RestCases>,
 *             Type.IsSubType<Pattern, Case> extends true
 *                 ? Result
 *                 : Internal.Match.IsOptionMatched<Case> extends true
 *                     ? Result
 *                     : Match<Pattern, RestCases>
 *         >,
 *         Match<Pattern, RestCases>
 *     >
 * } Internal.Match.MatchEvaluator <Pattern, CaseArm, Cases, Result, When, IsExactMatch>
 */

/**
 * @template {unknown} Pattern
 * @template {ReadonlyArray<unknown>} CaseArms
 * @template {Boolean} [IsExactMatch=false]
 * @typedef {|
 *     CaseArms extends [infer First, ...infer Rest]
 *         ? First extends (() => infer S)
 *             ? S
 *             : First extends ((po: infer POrOption) => infer Result)
 *                 ? Internal.Match.MatchEvaluator<
 *                     Pattern,
 *                     POrOption,
 *                     Rest,
 *                     Result,
 *                     POrOption extends {when: false} ? false : true,
 *                     IsExactMatch
 *             >
 *             : First extends ((p: infer P, o: infer Option) => infer Result)
 *                 ? Internal.Match.MatchEvaluator<
 *                     Pattern,
 *                     P,
 *                     Rest,
 *                     Result,
 *                     Option extends {when: false} ? false : true,
 *                     Option extends {e: false} ? false : Option extends {e: true} ? true : IsExactMatch
 *                 >
 *                 : Match<Pattern, Rest>
 *         : Type.Error<"No match case found">
 * } Match <Pattern, CaseArms, IsExactMatch=false>
 */

/**
 * @template {unknown} T
 * @typedef {{[K in keyof T]: T[K]}} Process <T>
 */

/**
 * @template {String} L
 * @typedef {{label: L}} Label <L>
 */

/**
 * @template {String} T
 * @typedef {{label: T}} Goto <T>
 */

/**
 * @template Code
 * @typedef {{code: Code}} CodeBlock <Code>
 */

/** @typedef {{ tag: "goto" }} Internal.GotoAction */

/**
 * Helper to check if unknown element in a processed loop body tuple is Internal.GotoAction
 * @template ProcessedBodyTuple extends readonly unknown[]
 * @typedef {ProcessedBodyTuple extends [infer Head, ...infer Tail]
 *   ? Head extends Internal.GotoAction
 *     ? true
 *     : Internal.DoesProcessedBodyContainGoto<Tail>
 *   : false
 * } Internal.DoesProcessedBodyContainGoto <ProcessedBodyTuple>
 */

/**
 * Processes a single item in a loop body. If it's a Goto, returns a marker.
 * (Replaces LoopMatcher to break circular dependency)
 * @template {CodeBlock<unknown>|Label<String>|Goto<String>} ExecItem
 * @typedef {Match<ExecItem, [
 *     (p: Label<String>) => ExecItem,
 *     (p: Goto<String>) => Internal.GotoAction,
 *     (p: CodeBlock<unknown>) => ExecItem
 * ]>} Internal.ProcessLoopItem <ExecItem>
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
 * >} Loop <Condition, Exec>
 */

/**
 * @template {Array<unknown>} T
 * @template {(item: unknown) => unknown} CustomMapFn
 * @typedef {{[K in keyof T]: CustomMapFn extends (item: T[K]) => infer R ? R : EvalFailed}} IterToMap <T, CustomMapFn>
 */

/**
 * @template {Boolean} Condition
 * @template {unknown} Then
 * @template {unknown} Else
 * @typedef {Condition extends true ? Then : Else} If <Condition, Then, Else>
 */

/**
 * @template {Boolean} A
 * @template {Boolean} B
 * @typedef {A extends true
*     ? B extends true
*         ? true
*         : false
*     : false
* } And <A, B>
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
 * } And3 <A, B, C>
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
 * } And4 <A, B, C, D>
 */

/**
 * @template {Boolean} T
 * @template {Boolean} U
 * @typedef {T extends true
 *     ? true
 *     : U extends true
 *         ? true
 *         : false
 * } Or <A, B>
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
 * } Or3 <A, B>
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
 * } Or4 <A, B, C, D>
 */

/**
 * @template {Boolean} A
 * @typedef {A extends true ? false : true} Not <A>
 */