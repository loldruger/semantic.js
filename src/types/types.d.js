//@ts-check

//////////////////////
// Type Definitions //
//////////////////////

/**
 * @typedef {undefined} UndefinedType
 */

/**
 * @template [P=any]
 * @template [R=unknown]
 * @typedef {(...args: ReadonlyArray<P>) => R|void} CallableType<P, R>
 */

/**
 * @template [P=unknown]
 * @template [R=unknown]
 * @typedef {abstract new (...args: ReadonlyArray<P>) => R} AbstConcreteType<P, R>
 */

/**
 * @typedef {ReadonlyArray<ConstructableTypeUnion>} ConstructableTypes
 */

/**
 * @typedef {CallableType|AbstConcreteType|ConstructableTypes} ConstructableTypeUnion
 */

/////////////////////////////////
// Conversion Type Definitions //
/////////////////////////////////

/**
 * @template T, U
 * @typedef {U} AsType<T, U>
 */

/**
 * @template T
 * @typedef {T extends number ? NumberConstructor :
 *     T extends string ? StringConstructor :
 *     T extends boolean ? BooleanConstructor :
 *     T extends Function ? FunctionConstructor :
 *     T extends Array<unknown> ? (IsTupleType<T> extends true ? ToTupleType<T> : ArrayConstructor) :
 *     T extends object ? { new (...args: Array<unknown>): T } :
 *     never
 * } ToConcreteType<T>
 */

/**
 * @template {Array<unknown>} T
 * @typedef {T extends []
 *     ? []
 *     : T extends [infer Head, ...infer Tail]
 *         ? [ToConcreteType<Head>, ...ToTupleType<Tail extends Array<unknown>
 *             ? Tail
 *             : []>
 *         ] : []
 * } ToTupleType<T>
 */

/**
 * @template {ConstructableTypeUnion} T
 * @typedef {IsTupleType<T> extends true
 *     ? {[K in keyof T]: (T[K] extends ConstructableTypes
 *         ? ToRecursivelyInstanceType<T[K]>
 *         : T[K] extends AbstConcreteType
 *             ? InstanceType<T[K]>
 *             : T[K] extends CallableType
 *                 ? T[K] extends (x: infer P) => infer R
 *                     ? true extends true
 *                          ? IsTupleType<R> extends true ? 'P R' : 'P'
 *                          : IsTupleType<R> extends true ? 'R' : (x: P) => InstanceType<R extends AbstConcreteType ? R : never>
 *                     : T[K] extends (...x: infer B) => infer A
 *                          ? true extends true
 *                              ? IsTupleType<R> extends true ? 'P R' : 'B'
 *                              : IsTupleType<R> extends true ? 'R' : (x: P) => InstanceType<R extends AbstConcreteType ? R : never>
 *                          : never
 *                 : never
 *       )}
 *     : T extends AbstConcreteType
 *         ? InstanceType<T>
 *         : T extends CallableType
 *             ? T
 *             : never
 * } ToRecursivelyInstanceType<T>
 */

///////////////////
// Type Checkers //
///////////////////

// /**
//  * @template {ReadonlyArray<unknown>} T
//  * @typedef {number extends T['length'] ? false : true} IsTupleType<T>
//  */

/**
 * @template T
 * @typedef {T extends ReadonlyArray<unknown> ? number extends T['length'] ? false : true : false} IsTupleType<T>
 */

/**
 * @template T
 * @typedef {T extends AbstConcreteType ? true : false} IsConcreteType<T>
 */

/**
 * @template T
 * @typedef {T extends CallableType ? true : false} IsFunctionType<T>
 */

////////////////////
// Type Utilities //
////////////////////

/**
 * @template T
 * @typedef { T extends infer U 
 *     ? U extends object 
 *         ? { [key: string]: any } extends U 
 *             ? true
 *             : false 
 *         : false 
 *     : false
 * } IsExtensible<T>
 */

/**
 * @template X, Y
 * @typedef { (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false } IsEqual<X, Y>
 */

/**
 * @template T
 * @typedef {T extends Array<infer U> ? U : T} UnwrapArray<T>
 */
