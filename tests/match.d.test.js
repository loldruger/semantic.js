//@ts-check

/**
 * @template {unknown} P
 * @typedef {Match<P, [
 * ]>} TestMatch0<P>
 */

/**
 * @template {unknown} P
 * @typedef {Match<P, [
 *     () => void
 * ]>} TestMatch023<P>
 */


/**
 * @template {unknown} P
 * @typedef {Match<P, [
 *     (p: Boolean) => 'Boolean',
 *     (p: String) => 'String',
 *     () => void,
 * ]>} TestMatch1<P>
 */

/**
 * @template {unknown} P
 * @typedef {Match<P, [
 *     () => void,
 *     (p: Boolean) => 'Boolean',
 *     (p: Number) => 'Number',
 *     (p: String) => 'String',
 * ]>} TestMatch2<P>
 */

/**
 * @template {unknown} P
 * @typedef {Match<P, [
 *     (o: {when: true}) => 'Boolean with true',
 *     (p: Number) => 'Number',
 *     (p: String) => 'String',
 *     () => void,
 * ]>} TestMatch3<P>
 */

/**
 * @template {unknown} P
 * @typedef {Match<P, [
 *     (p: Boolean, o: {when: false}) => 'Should never happen',
 *     (p: Boolean, o: {when: true}) => 'Boolean when true',
 *     () => void,
 * ]>} TestMatch4<P>
 */

/**
 * @template {unknown} P
 * @typedef {Match<P, [
 *     (p: Number, o: {when: true, e: true}) => 'Number',
 * ]>} TestMatch7<P>
 */

/**
 * @template {unknown} P
 * @typedef {Match<P, [
 *     (p: Number) => 'Number',
 *     (p: (a: Number) => Boolean, o: {e: true}) => 'Num to Bool',
 *     (p: () => Boolean, o: {e: true}) => 'Void to Boolean',
 *     () => void,
 * ]>} TestMatch8<P>
 */

/**
 * @template {unknown} P
 * @typedef {Match<P, [
 *     (p: Number) => 'Number',
 *     (p: (a: (a: Number) => Boolean) => Boolean, o: {e: true}) => 'Num to Bool to Bool',
 *     (p: () => Boolean, o: {e: true}) => 'Void to Boolean',
 *     () => void,
 * ]>} TestMatch9<P>
 */

/**
 * @template {unknown} P
 * @typedef {Match<P, [
 *     (p: Number) => 'Number',
 *     (p: (a: (a: Number) => Boolean) => (a: Boolean) => Number, o: {e: true}) => 'Num to Bool to Fn of (Bool to Num)',
 *     (p: (a: (a: Number) => Boolean) => Boolean, o: {e: true}) => 'Num to Bool to Bool',
 *     (p: (a: (a: Boolean) => Boolean) => Boolean, o: {e: true}) => 'Intercepted',
 *     (p: (a: (a: Number, b: Boolean) => void) => Boolean, o: {e: true}) => '(Number, Boolean) to void',
 *     (p: (a: (a: Boolean, b: Number) => void) => Boolean, o: {e: true}) => '(Boolean, Number) to void',
 *     (p: () => Boolean) => 'Void to Boolean',
 *     () => void,
 * ]>} TestMatch10<P>
 */

/**
 * @template {unknown} P
 * @typedef {Match<P, [
 *     (p: (a: (a: (a: Boolean) => void) => Boolean) => Boolean, o: {e: true}) => 'Intercepted',
 *     (p: (a: (a: (a: String, b: Boolean) => void, b: Number) => void) => Boolean, o: {e: true}) => '((String, Boolean)=>void, Number) to void',
 *     (p: (a: (a: (a: Boolean, b: String) => void, b: Number) => void) => Boolean, o: {e: true}) => '((Boolean, String)=>void, Number) to void',
 *     () => void,
 * ]>} TestMatch11<P>
 */

/**
 * @template {unknown} P
 * @typedef {Match<P, [
 *     (p: () => (a: Boolean) => void) => 'Intercepted',
 *     (p: () => (a: Boolean, b: String) => void) => 'void to (Boolean, String) to void',
 *     (p: () => (a: String, b: Boolean) => void) => 'void to (String, Boolean) to void',
 *     (p: () => () => () => void) => 'void to void to void to void',
 *     (p: () => () => (a: () => Boolean) => void) => 'void to void to Boolean to void',
 *     () => void,
 * ], true>} TestMatch12<P>
 */

/**
 * @template {unknown} P
 * @typedef {Match<P, [
 *     (p: String | Boolean) => 'String or Boolean',
 *     () => void,
 * ], false>} TestMatch13<P>
 */

/**
 * @typedef {TestMatch0<Boolean>} MatchTestCase0_ShouldBe_Error
 * @typedef {TestMatch1<Boolean>} MatchTestCase1_ShouldBe_Boolean
 * @typedef {TestMatch1<String>} MatchTestCase2_ShouldBe_String
 * @typedef {TestMatch1<Number>} MatchTestCase3_ShouldBe_Void
 * @typedef {TestMatch2<Boolean>} MatchTestCase4_ShouldBe_Void
 * @typedef {TestMatch3<Boolean>} MatchTestCase5_ShouldBe_Boolean_With_True
 * @typedef {TestMatch4<Boolean>} MatchTestCase6_ShouldBe_Boolean_When_True
 * @typedef {TestMatch7<Number>} MatchTestCase9_ShouldBe_Number
 * @typedef {TestMatch8<(a: Number) => Boolean>} MatchTestCase10_ShouldBe_Num_To_Bool
 * @typedef {TestMatch8<(a: String) => Boolean>} MatchTestCase11_ShouldBe_Void
 * @typedef {TestMatch9<(a: (a: Number) => Boolean) => Boolean>} MatchTestCase12_ShouldBe_Num_To_Bool_To_Bool
 * @typedef {TestMatch10<(a: (a: Number) => Boolean) => (a: Boolean) => Number>} MatchTestCase13_ShouldBe_Num_To_Bool_To_Fn_Of_Bool_To_Num
 * @typedef {TestMatch10<(a: (a: Number, b: Boolean) => void) => Boolean>} MatchTestCase14_ShouldBe_Pair_Of_Number_Boolean_To_Void
 * @typedef {TestMatch10<(a: (a: Boolean, b: Number) => void) => Boolean>} MatchTestCase15_ShouldBe_Pair_Of_Boolean_Number_To_Void
 * @typedef {TestMatch11<(a: (a: (a: Boolean, b: String) => void, b: Number) => void) => Boolean>} MatchTestCase16_ShouldBe_Pair_Of_Fn_Of_Bool_String_To_Void_Number_To_Void
 * @typedef {TestMatch12<() => () => void>} MatchTestCase17_ShouldBe_void
 * @typedef {TestMatch12<() => (a: Boolean) => void>} MatchTestCase18_ShouldBe_Intercepted
 * @typedef {TestMatch12<() => (a: String) => void>} MatchTestCase19_ShouldBe_Void
 * @typedef {TestMatch12<() => (a: Boolean, b: String) => void>} MatchTestCase20_ShouldBe_Void_To_Pair_Of_Boolean_String_To_Void
 * @typedef {TestMatch12<() => (a: String, b: Boolean) => void>} MatchTestCase21_ShouldBe_Void_To_Pair_Of_String_Boolean_To_Void
 * @typedef {TestMatch12<() => () => (a: () => Boolean) => void>} MatchTestCase22_ShouldBe_Void_To_Void_To_Boolean_To_Void //failed
 * @typedef {TestMatch13<String>} MatchTestCase23_ShouldBe_String_Or_Boolean
 * @typedef {TestMatch13<Boolean>} MatchTestCase24_ShouldBe_String_Or_Boolean
 * @typedef {TestMatch13<String | Boolean>} MatchTestCase25_ShouldBe_String_Or_Boolean
 */
// --- Type.IsEqual Test Cases ---

/** 
 * @typedef {Type.IsEqual<
 *     () => () => void,
 *     () => (a: Boolean) => void
 * >} TestTypeIsEqual0_ShouldBe_False
 **/

/** 
 * @typedef {Type.IsEqual<
 *     () => (a: String) => void,
 *     () => (a: String, b: Boolean) => void
 * >} TestTypeIsEqual1_ShouldBe_False
 **/

/**
 * @typedef {{e: false, when: false}  extends {when: true} ? 'yes' : 'no'} Egfgfd
 */



