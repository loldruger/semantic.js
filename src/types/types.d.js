//@ts-check

//////////////////////
// Type Definitions //
//////////////////////

/**
 * @typedef {undefined} UndefinedType
 */

/**
 * @template [T=unknown]
 * @typedef {(...args: Array<String>) => T|void} CallableType
 */

/**
 * @template [T=unknown]
 * @template [U=unknown]
 * @typedef {abstract new (...args: Array<T>) => U} AbstConcreteType<T, U>
 */

/**
 * @typedef {Array<ConstructableTypeUnion>} ConstructableTypes
 */

/**
 * @typedef {CallableType|AbstConcreteType|ConstructableTypes} ConstructableTypeUnion
 */

/////////////////////////////////
// Conversion Type Definitions //
/////////////////////////////////
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
 * @typedef {T extends Array<unknown>
*     ? {[K in keyof T]: (T[K] extends ConstructableTypes
*         ? ToRecursivelyInstanceType<T[K]>
*         : T[K] extends AbstConcreteType
*             ? InstanceType<T[K]>
*             : T[K] extends CallableType
*                 ? T[K]
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

/**
 * @template {ReadonlyArray<unknown>} T
 * @typedef {number extends T['length'] ? false : true} IsTupleType<T>
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

