//@ts-check

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
 * @template {unknown} PatternInput
 * @template {unknown} PatternToMatchAgainst
 * @template {ReadonlyArray<unknown>} RestCases
 * @template {unknown} Result
 * @template {Boolean} WhenFlagForThisArm
 * @template {Boolean} UseExactMatchForThisArm
 * @template {Boolean} IsExactMatch_GlobalDefault
 * @typedef {|
 *     If<WhenFlagForThisArm,
 *         If<UseExactMatchForThisArm,
 *             Type.IsEqual<PatternInput, PatternToMatchAgainst> extends true
 *                 ? Result
 *                 : Internal.Match.IsOptionMatched<PatternToMatchAgainst> extends true
 *                     ? Result
 *                     : Match<PatternInput, RestCases, IsExactMatch_GlobalDefault>,
 *             Type.IsSubType<PatternInput, PatternToMatchAgainst> extends true
 *                 ? Result
 *                 : Internal.Match.IsOptionMatched<PatternToMatchAgainst> extends true
 *                     ? Result
 *                     : Match<PatternInput, RestCases, IsExactMatch_GlobalDefault>
 *         >,
 *         Match<PatternInput, RestCases, IsExactMatch_GlobalDefault>
 *     >
 * } Internal.Match.MatchEvaluator <PatternInput, PatternToMatchAgainst, RestCases, Result, WhenFlagForThisArm, UseExactMatchForThisArm, IsExactMatch_GlobalDefault>
 */

/**
 * @template {unknown} PInput
 * @template {ReadonlyArray<unknown>} CaseArms
 * @template {Boolean} [IsExactMatch_GlobalDefault=false]
 * @typedef {|
 *     CaseArms extends [infer First, ...infer Rest]
 *         ? First extends (() => infer S)
 *             ? S
 *             : First extends ((p: infer P, o: infer Opt) => infer Result)
 *                 ? Internal.Match.MatchEvaluator<
 *                     PInput,
 *                     P,
 *                     Rest,
 *                     Result,
 *                     Opt extends {when: infer W extends boolean} ? W : true,
 *                     Opt extends {e: infer E extends boolean} ? E : IsExactMatch_GlobalDefault,
 *                     IsExactMatch_GlobalDefault
 *                   >
 *                 : First extends ((po: infer PatternOrOption) => infer Result)
 *                     ? PatternOrOption extends object
 *                         ? PatternOrOption extends { pattern: infer PFromOpt }
 *                             ? Internal.Match.MatchEvaluator<
 *                                 PInput,
 *                                 PFromOpt,
 *                                 Rest,
 *                                 Result,
 *                                 PatternOrOption extends {when: infer W extends boolean} ? W : true,
 *                                 PatternOrOption extends {e: infer E extends boolean} ? E : IsExactMatch_GlobalDefault,
 *                                 IsExactMatch_GlobalDefault
 *                               >
 *                           : Or<
 *                                 Type.IsSubType<PatternOrOption, {when: unknown}>,
 *                                 Type.IsSubType<PatternOrOption, {e: unknown}>
 *                             > extends true
 *                               ? Internal.Match.MatchEvaluator<
 *                                   PInput,
 *                                   PatternOrOption,
 *                                   Rest,
 *                                   Result,
 *                                   PatternOrOption extends {when: infer W extends boolean} ? W : true,
 *                                   PatternOrOption extends {e: infer E extends boolean} ? E : IsExactMatch_GlobalDefault,
 *                                   IsExactMatch_GlobalDefault
 *                                 >
 *                               : Internal.Match.MatchEvaluator<
 *                                   PInput,
 *                                   PatternOrOption,
 *                                   Rest,
 *                                   Result,
 *                                   true,
 *                                   IsExactMatch_GlobalDefault,
 *                                   IsExactMatch_GlobalDefault
 *                                 >
 *                         : Internal.Match.MatchEvaluator<
 *                             PInput,
 *                             PatternOrOption,
 *                             Rest,
 *                             Result,
 *                             true,
 *                             IsExactMatch_GlobalDefault,
 *                             IsExactMatch_GlobalDefault
 *                           >
 *                     : Match<PInput, Rest, IsExactMatch_GlobalDefault>
 *         : Type.Error<"No match case found">
 * } Match <PInput, CaseArms, IsExactMatch_GlobalDefault=false>
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