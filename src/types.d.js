/**
 * @template {String} K
 * @template V
 * @typedef {Record<K, V>} Pair<T, V>
 */

/**
 * @template {ReadonlyArray<Pair<String, unknown>>} T
 * @typedef {T} ListOfPair<T>
 */

/**
 * @template {ReadonlyArray<Pair<String, unknown>>} PairMap
 * @template {String} Keyword
 * @typedef {PairMap extends ReadonlyArray<infer P>
 *      ? P extends Pair<Keyword, infer V>
 *          ? V
 *          : never
 *      : never
 * } Find
 */

/**
 * @typedef {[
*      Pair<'A', {}>,
*      Pair<'name', {a: Pair<String, 1>, b: 1}>,
* ]} Pairs
*/

/**
 * @typedef {Find<Pairs, 'name'>} Finder
 */