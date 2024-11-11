//@ts-check

/**
 * @typedef {new (...args: any) => any} InstantiableType
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