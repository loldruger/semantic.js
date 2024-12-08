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
 *     (p: String) => 'String',
 *     (p: Number) => 'Number',
 *     (p: Boolean, b: Binding<P>) => 'Boolean with binding',
 * ]>} TestMatch8<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: String) => 'String',
 *     (p: Number) => 'Number',
 *     (b: Binding<P>, p: Boolean) => 'Boolean with binding, swapping a and b parameters',
 *     () => 'Default',
 * ]>} TestMatch9<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: String) => 'String',
 *     (p: Number) => 'Number',
 *     (when: false, p: Boolean) => 'Swapping a and b parameters. Should never happen',
 *     () => 'Default',
 * ]>} TestMatch10<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: String) => 'String',
 *     (p: Number) => 'Number',
 *     (when: false, p: Boolean) => 'Should never happen',
 *     (when: true, p: Boolean) => 'Boolean with true, swapping a and b parameters.',
 *     () => 'Default',
 * ]>} TestMatch11<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: String) => 'String',
 *     (p: Number) => 'Number',
 *     (when: false, p: Boolean) => 'Should never happen',
 *     (at: Binding<P>, p: String) => 'String with binding, swapping a and b parameters.',
 *     (at: Binding<P>, p: Boolean) => 'Boolean with binding, swapping a and b parameters.',
 *     () => 'Default',
 * ]>} TestMatch12<P>
 */

/**
 * @typedef {TestMatch0<Boolean>} MatchTestCase0_Should_Error
 * @typedef {TestMatch1<Boolean>} MatchTestCase1_Should_Boolean
 * @typedef {TestMatch2<Boolean>} MatchTestCase2_Should_Boolean
 * @typedef {TestMatch3<Boolean>} MatchTestCase3_Should_Default
 * @typedef {TestMatch4<Boolean>} MatchTestCase4_Should_Value_Of_P
 * @typedef {TestMatch5<Boolean>} MatchTestCase5_Should_Default
 * @typedef {TestMatch6<Boolean>} MatchTestCase6_Should_Boolean_With_True
 * @typedef {TestMatch7<Boolean>} MatchTestCase7_Should_Boolean_With_True
 * @typedef {TestMatch8<Boolean>} MatchTestCase8_Should_Boolean_With_Binding
 * @typedef {TestMatch9<Boolean>} MatchTestCase9_Should_Default_With_Binding_Swapped_Params
 * @typedef {TestMatch10<Boolean>} MatchTestCase10_Should_Default
 * @typedef {TestMatch11<Boolean>} MatchTestCase11_Should_Boolean_With_True_Swapped_Params
 * @typedef {TestMatch12<Boolean>} MatchTestCase12_Should_Default_With_Binding_Swapped_Params
 */
