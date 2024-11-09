//@ts-check

/**
 * @template T
 * @typedef {new (...args: any) => Readonly<T>} Tuple<T>
 */

/**
 * @template T
 * @typedef {Array<Tuple<any>|Tuples<T>>} Tuples<T>
 */

/**
 * @template {Tuples<any>} T
 * @typedef {T extends Array<any>
*     ? {[K in keyof T]: ToInstanceType<T[K]>}
*     : T extends Tuple<any>
*         ? InstanceType<T>
*         : never
* } ToInstanceType<T>
*/

/**
 * @template T
 * @typedef {T extends Array<infer U> ? U : T} UnwrapArray<T>
 */