// @ts-check

/**
 * @template T
 * @typedef {Required<{mut: T}>} Mut<T>
 */

/**
 * @template T
 * @typedef {Readonly<{imut: T}>} Imut<T>
 */

/**
 * @template T
 * @typedef {T extends Mut<infer U> ? (T extends Imut<U> ? false : true) : false} IsMut<T>
 */
/**
 * @template T
 * @typedef {AsType<T, Mut<T>>} AsMut<T>
 */

/**
 * @template T
 * @typedef {AsType<T, Imut<T>>} AsImut<T>
 */

/**
 * @typedef {IsMut<Imut<String>>} MutTest1 // false
 * @typedef {IsMut<Mut<String>>} MutTest2 // true
 * @typedef {IsMut<String>} MutTest3       // false
 * @typedef {IsMut<Imut<Object>>} MutTest4 // false
 * @typedef {IsMut<Mut<Object>>} MutTest5  // true
 * @typedef {IsMut<Object>} MutTest6       // false
 */

/**
 * @typedef {ConstructableTypeUnion|Object} StructTypeUnion
 */

/**
 * @template {String} Field
 * @template {StructTypeUnion} T
 * @typedef {T extends Mut<any> 
 *   ? Record<Field, ToInstanceType<T>>
 *   : Readonly<Record<Field, ToInstanceType<T>>>
 * } StructType<Field, T>
 */

