//@ts-check

/**
 * @typedef {new (...args: any) => any} InstantiableType
 */

/**
 * @template T
 * @typedef {T extends number ? NumberConstructor :
 *   T extends string ? StringConstructor :
 *   T extends boolean ? BooleanConstructor :
 *   T extends Function ? FunctionConstructor :
 *   T extends any[] ? (IsTupleType<T> extends true ? TupleConstructors<T> : ArrayConstructor) :
 *   T extends object ? { new (...args: any[]): T } :
 *   never
 * } ConstructorType<T>
 */

/**
 * @template {ReadonlyArray<any>} T
 * @typedef {number extends T['length'] ? false : true} IsTupleType<T>
 */

/**
 * @template {Array<any>} T
 * @typedef {T extends [] ? [] : T extends [infer Head, ...infer Tail] ? [ConstructorType<Head>, ...TupleConstructors<Tail extends any[] ? Tail : []>] : []} TupleConstructors<T>
 */

/**
 * @typedef {InstantiableType} Tuple
 */

/**
 * @typedef {Array<Tuple|Tuples>} Tuples
 */

/**
 * @template {Tuple|Tuples} T
 * @typedef {T extends Array<any>
 *     ? {[K in keyof T]: (T[K] extends Tuples
 *         ? IterInstanceType<T[K]>
 *         : T[K] extends Tuple
 *             ? InstanceType<T[K]>
 *             : never
 *       )} 
 *     : T extends Tuple 
 *         ? InstanceType<T>
 *         : never
 * } IterInstanceType<T>
 */

/**
 * @template T
 * @typedef {T extends Array<infer U> ? U : T} UnwrapArray<T>
 */