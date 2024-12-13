/**
 * @template P
 * @typedef {Match<P, [
 * ]>} TestMatch0<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Boolean) => 'Boolean',
 *     (p: String) => 'String',
 *     () => void,
 * ]>} TestMatch1<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     () => void,
 *     (p: Boolean) => 'Boolean',
 *     (p: Number) => 'Number',
 *     (p: String) => 'String',
 * ]>} TestMatch2<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (when: true) => 'Boolean with true',
 *     (p: Number) => 'Number',
 *     (p: String) => 'String',
 *     () => void,
 * ]>} TestMatch3<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Boolean, when: false) => 'Should never happen',
 *     (p: Boolean, when: true) => 'Boolean when true',
 *     () => void,
 * ]>} TestMatch4<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (when: true, p: Boolean) => 'Boolean with true, swapping params',
 *     () => void,
 * ]>} TestMatch5<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (when: false, p: Boolean) => 'Boolean with false, Swapping a and b parameters. Should never happen',
 *     () => void,
 * ]>} TestMatch9<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Boolean, when: false) => 'Feels Bad',
 *     (when: true, p: Boolean) => 'Feels Good',
 *     () => void,
 * ]>} TestMatch10<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Number) => 'Number',
 *     (p: (a: Number) => Boolean) => 'Num to Bool',
 *     (p: () => Boolean) => 'Void to Boolean',
 *     () => void,
 * ]>} TestMatch11<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Number) => 'Number',
 *     (p: (a: (a: Number) => Boolean) => Boolean) => 'Num to Bool to Bool',
 *     (p: () => Boolean) => 'Void to Boolean',
 *     () => void,
 * ]>} TestMatch12<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Number) => 'Number',
 *     (p: (a: (a: Number) => Boolean) => (a: Boolean) => Number) => 'Num to Bool to Fn of (Bool to Num)',
 *     (p: (a: (a: Number) => Boolean) => Boolean) => 'Num to Bool to Bool',
 *     (p: (a: (a: Boolean) => Boolean) => Boolean) => 'Intercepted',
 *     (p: (a: (a: Number, b: Boolean) => void) => Boolean) => '(Number, Boolean) to void',
 *     (p: (a: (a: Boolean, b: Number) => void) => Boolean) => '(Boolean, Number) to void',
 *     (p: () => Boolean) => 'Void to Boolean',
 *     () => void,
 * ]>} TestMatch13<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: (a: (a: (a: Boolean) => void) => Boolean) => Boolean) => 'Intercepted',
 *     (p: (a: (a: (a: String, b: Boolean) => void, b: Number) => void) => Boolean) => '((String, Boolean)=>void, Number) to void',
 *     (p: (a: (a: (a: Boolean, b: String) => void, b: Number) => void) => Boolean) => '((Boolean, String)=>void, Number) to void',
 *     () => void,
 * ]>} TestMatch14<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: () => (a: Boolean) => void) => 'Intercepted',
 *     (p: () => (a: Boolean, b: String) => void) => 'void to (Boolean, String) to void',
 *     (p: () => (a: String, b: Boolean) => void) => 'void to (String, Boolean) to void',
 *     (p: () => () => () => void) => 'void to void to void to void',
 *     (p: () => () => (a: () => Boolean) => void) => 'void to void to Boolean to void',
 *     () => void,
 * ]>} TestMatch15<P>
 */

/**
 * @typedef {TestMatch0<Boolean>} MatchTestCase0_ShouldBe_Error
 * @typedef {TestMatch1<Boolean>} MatchTestCase1_ShouldBe_Boolean
 * @typedef {TestMatch1<String>} MatchTestCase2_ShouldBe_String
 * @typedef {TestMatch1<Number>} MatchTestCase3_ShouldBe_Void
 * @typedef {TestMatch2<Boolean>} MatchTestCase4_ShouldBe_Void
 * @typedef {TestMatch3<Boolean>} MatchTestCase5_ShouldBe_Boolean_With_True
 * @typedef {TestMatch4<Boolean>} MatchTestCase6_ShouldBe_Boolean_With_True
 * @typedef {TestMatch5<Boolean>} MatchTestCase7_ShouldBe_Boolean_With_True_Swapping_Params
 * @typedef {TestMatch9<Boolean>} MatchTestCase8_ShouldBe_Void
 * @typedef {TestMatch10<Boolean>} MatchTestCase9_ShouldBe_Feels_Good
 * @typedef {TestMatch11<(a: Number) => Boolean>} MatchTestCase10_ShouldBe_Num_To_Bool
 * @typedef {TestMatch11<(a: String) => Boolean>} MatchTestCase11_ShouldBe_Void
 * @typedef {TestMatch12<(a: (a: Number) => Boolean) => Boolean>} MatchTestCase12_ShouldBe_Num_To_Bool_To_Bool
 * @typedef {TestMatch13<(a: (a: Number) => Boolean) => (a: Boolean) => Number>} MatchTestCase13_ShouldBe_Num_To_Bool_To_Fn_Of_Bool_To_Num
 * @typedef {TestMatch13<(a: (a: Number, b: Boolean) => void) => Boolean>} MatchTestCase14_ShouldBe_Pair_Of_Number_Boolean_To_Void
 * @typedef {TestMatch13<(a: (a: Boolean, b: Number) => void) => Boolean>} MatchTestCase15_ShouldBe_Pair_Of_Boolean_Number_To_Void
 * @typedef {TestMatch14<(a: (a: (a: Boolean, b: String) => void, b: Number) => void) => Boolean>} MatchTestCase16_ShouldBe_Pair_Of_Fn_Of_Bool_String_To_Void_Number_To_Void
 * @typedef {TestMatch15<() => () => void>} MatchTestCase17_ShouldBe_void
 * @typedef {TestMatch15<() => (a: Boolean) => void>} MatchTestCase18_ShouldBe_Intercepted
 * @typedef {TestMatch15<() => (a: Boolean, b: String) => void>} MatchTestCase19_ShouldBe_Void_To_Pair_Of_Boolean_String_To_Void
 * @typedef {TestMatch15<() => (a: String, b: Boolean) => void>} MatchTestCase20_ShouldBe_Void_To_Pair_Of_String_Boolean_To_Void
 * @typedef {TestMatch15<() => () => (a: () => Boolean) => void>} MatchTestCase21_ShouldBe_Void_To_Void_To_Boolean_To_Void
 */

/**
 * @typedef {Parameters<() => () => (a: () => Boolean) => void>} AP
 * @typedef {ReturnType<() => () => (a: () => Boolean) => void>} AR
 * @typedef {ReturnType<() => (a: Boolean) => void>} A1RC
 * 
 * @typedef {Parameters<() => () => void>} BP
 * @typedef {ReturnType<() => () => void>} BR
 * @typedef {ReturnType<() => (a: Boolean) => void>} BRC
 * @typedef {IsEqual<BR, BRC>} BRC_EQ_BR
 */