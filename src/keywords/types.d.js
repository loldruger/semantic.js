// @ts-check

/**
 * @template {unknown} T
 * @typedef {{mut: T}} Mut<T>
 */

/**
 * @template {unknown} T
 * @typedef {Readonly<{imut: T}>} IMut<T>
 */

/**
 * @template {Internal.UnknownTypes} T
 * @typedef {T extends Mut<infer U> ? Type.IsEqual<T, Mut<U>> : false} Type.IsMut<T>
 */

/**
 * @template {Internal.UnknownTypes} T
 * @typedef {As<T, Mut<T>>} AsMut<T>
 */

/**
 * @template {Internal.UnknownTypes} T
 * @typedef {As<T, IMut<T>>} AsIMut<T>
 */

/**
 * @typedef {Type.IsMut<IMut<StringConstructor>>} MutTest1 // false
 * @typedef {Type.IsMut<Mut<StringConstructor>>} MutTest2  // true
 * @typedef {Type.IsMut<StringConstructor>} MutTest3       // false
 * @typedef {Type.IsMut<IMut<ObjectConstructor>>} MutTest4 // false
 * @typedef {Type.IsMut<Mut<ObjectConstructor>>} MutTest5  // true
 * @typedef {Type.IsMut<ObjectConstructor>} MutTest6       // false
 */

/**
 * @template {String} Field
 * @template {Internal.UnknownTypes} T
 * @typedef {Record<Field, Type.ToInstanceType<T>>} StructType <Field, T>
 */
