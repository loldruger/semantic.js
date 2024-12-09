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
 *     () => 'Default',
 * ]>} TestMatch1<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: String) => 'String',
 *     (p: Boolean) => 'Boolean',
 *     () => 'Default',
 * ]>} TestMatch2<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: String) => 'String',
 *     () => 'Default',
 * ]>} TestMatch3<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Number) => 'Number',
 *     (b: Binding<P>) => 'Value of P',
 *     (p: String) => 'String',
 *     () => 'Default',
 * ]>} TestMatch4<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     () => 'Default',
 *     (p: Boolean) => 'Boolean',
 *     (p: Number) => 'Number',
 *     (p: String) => 'String',
 * ]>} TestMatch5<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (when: true) => 'Boolean with true',
 *     (p: Number) => 'Number',
 *     (p: String) => 'String',
 *     () => 'Default',
 * ]>} TestMatch6<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Boolean, when: false) => 'Should never happen',
 *     (p: Boolean, when: true) => 'Boolean when true',
 *     () => 'Default',
 * ]>} TestMatch7<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Boolean, b: Binding<P>) => 'Boolean with binding',
 * ]>} TestMatch8<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (b: Binding<P>, p: Boolean) => 'Boolean with binding, swapping a and b parameters',
 *     () => 'Default',
 * ]>} TestMatch9<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (when: false, p: Boolean) => 'Swapping a and b parameters. Should never happen',
 *     () => 'Default',
 * ]>} TestMatch10<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (when: false, p: Boolean) => 'Should never happen',
 *     (when: true, p: Boolean) => 'Boolean with true, swapping a and b parameters.',
 *     () => 'Default',
 * ]>} TestMatch11<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (when: false, p: Boolean) => 'Should never happen',
 *     (at: Binding<P>, p: String) => 'String with binding, swapping a and b parameters.',
 *     (at: Binding<P>, p: Boolean) => 'Boolean with binding, swapping a and b parameters.',
 *     () => 'Default',
 * ]>} TestMatch12<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (when: true, b: Binding<P>) => b['binding'],
 *     () => 'Default',
 * ]>} TestMatch13<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Boolean, when: false, b: Binding<P>) => 'Feels Bad',
 *     (p: Boolean, when: true, b: Binding<P>) => 'Feels Good',
 *     () => 'Default',
 * ]>} TestMatch14<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Boolean, when: false, b: Binding<P>) => 'Feels Bad',
 *     (when: true, p: Boolean, b: Binding<P>) => 'Feels Good',
 *     () => 'Default',
 * ]>} TestMatch15<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Boolean, b: Binding<P>, when: false) => 'Feels Bad',
 *     (p: Boolean, b: Binding<P>, when: true) => 'Feels Good',
 *     () => 'Default',
 * ]>} TestMatch16<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Number) => 'Number',
 *     (p: (a: Number) => Boolean) => 'Num to Bool',
 *     (p: () => Boolean) => 'Function to Boolean',
 *     () => 'Default',
 * ]>} TestMatch17<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Number) => 'Number',
 *     (p: (a: (a: Number) => Boolean) => Boolean) => 'Num to Bool to Bool',
 *     (p: () => Boolean) => 'Function to Boolean',
 *     () => 'Default',
 * ]>} TestMatch18<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Number) => 'Number',
 *     (p: (a: (a: Number) => Boolean) => (a: Boolean) => Number) => 'Num to Bool to Fn of (Bool to Num)',
 *     (p: () => Boolean) => 'Function to Boolean',
 *     () => 'Default',
 * ]>} TestMatch19<P>
 */

/**
 * @typedef {TestMatch0<Boolean>} MatchTestCase0_ShouldBe_Error
 * @typedef {TestMatch1<Boolean>} MatchTestCase1_ShouldBe_Boolean
 * @typedef {TestMatch2<Boolean>} MatchTestCase2_ShouldBe_Boolean
 * @typedef {TestMatch3<Boolean>} MatchTestCase3_ShouldBe_Default
 * @typedef {TestMatch4<Boolean>} MatchTestCase4_ShouldBe_Value_Of_P
 * @typedef {TestMatch5<Boolean>} MatchTestCase5_ShouldBe_Default
 * @typedef {TestMatch6<Boolean>} MatchTestCase6_ShouldBe_Boolean_With_True
 * @typedef {TestMatch7<Boolean>} MatchTestCase7_ShouldBe_Boolean_With_True
 * @typedef {TestMatch8<Boolean>} MatchTestCase8_ShouldBe_Boolean_With_Binding
 * @typedef {TestMatch9<Boolean>} MatchTestCase9_ShouldBe_Default_With_Binding_Swapped_Params
 * @typedef {TestMatch10<Boolean>} MatchTestCase10_ShouldBe_Default
 * @typedef {TestMatch11<Boolean>} MatchTestCase11_ShouldBe_Boolean_With_True_Swapped_Params
 * @typedef {TestMatch12<Boolean>} MatchTestCase12_ShouldBe_Default_With_Binding_Swapped_Params
 * @typedef {TestMatch13<Boolean>} MatchTestCase13_ShouldBe_Boolean
 * @typedef {TestMatch14<Boolean>} MatchTestCase14_ShouldBe_Feels_Good
 * @typedef {TestMatch15<Boolean>} MatchTestCase15_ShouldBe_Feels_Good
 * @typedef {TestMatch16<Boolean>} MatchTestCase16_ShouldBe_Feels_Good
 * @typedef {TestMatch17<(a: Number) => Boolean>} MatchTestCase17_ShouldBe_Num_To_Bool
 * @typedef {TestMatch17<(a: String) => Boolean>} MatchTestCase18_ShouldBe_Default
 * @typedef {TestMatch18<(a: (a: Number) => Boolean) => Boolean>} MatchTestCase19_ShouldBe_Num_To_Bool_To_Bool
 * @typedef {TestMatch19<(a: (a: Number) => Boolean) => (a: Boolean) => Number>} MatchTestCase20_ShouldBe_Num_To_Bool_To_Fn_Of_Bool_To_Num
 */
