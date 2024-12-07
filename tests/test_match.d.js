/**
 * @template P
 * @typedef {Match<P, [
 * ]>} TestMatch0<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Boolean) => 'Boolean',
 *     () => 'Default',
 * ]>} TestMatch1<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
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
 *     (p: Boolean) => 'Boolean',
 *     (p: String) => 'String',
 *     () => 'Default',
 * ]>} TestMatch4<P>
 */

/**
 * @template P
 * @typedef {Match<P, [
 *     (p: Boolean) => 'Boolean',
 *     (p: Number) => 'Number',
 *     (p: String) => 'String',
 *     () => 'Default',
 * ]>} TestMatch5<P>
 */


/**
 * @template P
 * @typedef {Match<P, [
 *     (p: String) => 'String',
 *     (p: Number) => 'Number',
 *     (p: Boolean) => 'Boolean1',
 *     (p: Boolean, when: false) => 'Boolean',
 *     (p: Boolean, when: true) => 'Boolean when true',
 *     (p: Boolean, at: At<P>) => at['v'],
 *     (when: true) => 'Default when true',
 *     (at: At<P>) => at['v'],
 *     () => 'Default',
 * ]>} TestMatch9<P>
 */

/**
 * @typedef {TestMatch0<Boolean>} MatchTestCase0
 * @typedef {TestMatch1<Boolean>} MatchTestCase1
 * @typedef {TestMatch2<Boolean>} MatchTestCase2
 * @typedef {TestMatch3<Boolean>} MatchTestCase3
 * @typedef {TestMatch4<Boolean>} MatchTestCase4
 * @typedef {TestMatch5<Boolean>} MatchTestCase5
 * @typedef {TestMatch9<Boolean>} MatchTestCase9
 */
