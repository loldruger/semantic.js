//@ts-check

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
 * @template {ReadonlyArray<unknown>} T
 * @typedef {number extends T['length'] ? false : true} IsTupleType<T>
 */

/**
 * @template T
 * @typedef {T extends AbstConcreteType ? true : false} IsConcreteType<T>
 */

/**
 * @template [T=unknown]
 * @template [U=unknown]
 * @typedef {new (...args: Array<T>) => U} ConcreteType<T, U>
 */

/**
 * @template [T=unknown]
 * @template [U=unknown]
 * @typedef {abstract new (...args: Array<T>) => U} AbstConcreteType<T, U>
 */

/**
 * @typedef {Array<AbstConcreteType|AbstConcreteTypes>} AbstConcreteTypes
 */

/**
 * @template {AbstConcreteType|AbstConcreteTypes} T
 * @typedef {T extends Array<unknown>
 *     ? {[K in keyof T]: (T[K] extends AbstConcreteTypes
 *         ? IterInstanceType<T[K]>
 *         : T[K] extends AbstConcreteType
 *             ? InstanceType<T[K]>
 *             : never
 *       )} 
 *     : T extends AbstConcreteType 
 *         ? InstanceType<T>
 *         : never
 * } IterInstanceType<T>
 */

/**
 * @template T
 * @typedef {T extends Array<infer U> ? U : T} UnwrapArray<T>
 */