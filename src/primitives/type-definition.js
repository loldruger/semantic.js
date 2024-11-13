//@ts-check

/**
 * @typedef {new (...args: any) => any} ConcreteType
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
 * @template {Array<any>} T
 * @typedef {T extends [] ? [] : T extends [infer Head, ...infer Tail] ? [ConstructorType<Head>, ...TupleConstructors<Tail extends any[] ? Tail : []>] : []} TupleConstructors<T>
 */

/**
 * @template {ReadonlyArray<any>} T
 * @typedef {number extends T['length'] ? false : true} IsTupleType<T>
 */

/**
 * @template T
 * @typedef {T extends ConcreteType ? true : false} IsConcreteType<T>
 */

/**
 * @typedef {Array<ConcreteType|ConcreteTypes>} ConcreteTypes
 */

/**
 * @template {ConcreteType|ConcreteTypes} T
 * @typedef {T extends Array<any>
 *     ? {[K in keyof T]: (T[K] extends ConcreteTypes
 *         ? IterInstanceType<T[K]>
 *         : T[K] extends ConcreteType
 *             ? InstanceType<T[K]>
 *             : never
 *       )} 
 *     : T extends ConcreteType 
 *         ? InstanceType<T>
 *         : never
 * } IterInstanceType<T>
 */

/**
 * @template T
 * @typedef {T extends Array<infer U> ? U : T} UnwrapArray<T>
 */