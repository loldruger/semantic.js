// @ts-check

/**
 * @template {unknown} T
 * @typedef {{mut: T}} Mut<T>
 */

/**
 * @template {unknown} T
 * @typedef {Readonly<{imut: T}>} Imut<T>
 */

/**
 * @template {unknown} T
 * @typedef {T extends Mut<infer U> ? (T extends Imut<U> ? false : true) : false} Type.IsMut<T>
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
 * @typedef {Type.IsMut<Imut<String>>} MutTest1 // false
 * @typedef {Type.IsMut<Mut<String>>} MutTest2 // true
 * @typedef {Type.IsMut<String>} MutTest3       // false
 * @typedef {Type.IsMut<Imut<Object>>} MutTest4 // false
 * @typedef {Type.IsMut<Mut<Object>>} MutTest5  // true
 * @typedef {Type.IsMut<Object>} MutTest6       // false
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

