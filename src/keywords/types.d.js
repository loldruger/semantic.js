// @ts-check

/**
 * @template {ConstructableTypeUnion} T
 * @typedef {{mut: T}} Mut<T>
 */

/**
 * @template {ConstructableTypeUnion} T
 * @typedef {Readonly<{imut: T}>} IMut<T>
 */

/**
 * @template {unknown} T
 * @typedef {T extends Mut<infer U> ? Type.IsEqual<T, Mut<U>> : false} Type.IsMut<T>
 */

/**
 * @template {ConstructableTypeUnion} T
 * @typedef {As<T, Mut<T>>} AsMut<T>
 */

/**
 * @template {ConstructableTypeUnion} T
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
 * @typedef {ConstructableTypeUnion} StructTypeUnion
 */

/**
 * @template {String} Field
 * @template {ConstructableTypeUnion} T
 * @typedef {T extends Mut<infer _A>
 *   ? Record<Field, Type.ToInstanceType<T>>
 *   : Record<Field, Type.ToInstanceType<T>>
 * } StructType<Field, T>
 */

