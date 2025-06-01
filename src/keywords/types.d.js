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
 * @typedef {As<T, Mut<T>>} AsMut<T>
 */

/**
 * @template T
 * @typedef {As<T, Imut<T>>} AsImut<T>
 */

/**
 * @typedef {IsMut<Imut<String>>} Test.MutTest1 // false
 * @typedef {IsMut<Mut<String>>} Test.MutTest2 // true
 * @typedef {IsMut<String>} Test.MutTest3       // false
 * @typedef {IsMut<Imut<Object>>} Test.MutTest4 // false
 * @typedef {IsMut<Mut<Object>>} Test.MutTest5  // true
 * @typedef {IsMut<Object>} Test.MutTest6       // false
 */

/**
 * @typedef {ConstructableTypeUnion} StructTypeUnion
 */

/**
 * @template {String} Field
 * @template {ConstructableTypeUnion} T
 * @typedef {T extends Mut<any> 
 *   ? Record<Field, Type.ToInstanceType<T>>
 *   : Readonly<Record<Field, Type.ToInstanceType<T>>>
 * } StructType<Field, T>
 */

