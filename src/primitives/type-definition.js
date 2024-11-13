//@ts-check

/**
 * @enum {AbstConcreteType}
 * @type {{[K in keyof TYPES]: Readonly<TYPES[K]>}}
 */
const TYPES = Object.freeze({
    NUMBER: Number,
    STRING: String,
    BOOLEAN: Boolean,
    FUNCTION: Function,
    ARRAY: Array,
    OBJECT: Object
});

/**
 * @template {Number} Num
 * @template {Array<0>} [Arr=[]]
 * @typedef {Num extends Arr['length'] ? [...Arr, 0]['length'] : Increment<Num, [...Arr, 0]>} Increment<T>
 */

/**
 * @typedef {Increment<50>} A
 */
let a;

/**
 * @template T
 * @typedef {T extends number ? NumberConstructor :
 *   T extends string ? StringConstructor :
 *   T extends boolean ? BooleanConstructor :
 *   T extends Function ? FunctionConstructor :
 *   T extends Array<any> ? (IsTupleType<T> extends true ? ToTupleType<T> : ArrayConstructor) :
 *   T extends object ? { new (...args: Array<any>): T } :
 *   never
 * } ToConcreteType<T>
 */

/**
 * @template {Array<any>} T
 * @typedef {T extends [] 
 *     ? []
 *     : T extends [infer Head, ...infer Tail]
 *         ? [ToConcreteType<Head>, ...ToTupleType<Tail extends Array<any>
 *             ? Tail
 *             : []>
 *         ] : []
 * } ToTupleType<T>
 */

/**
 * @template {ReadonlyArray<any>} T
 * @typedef {number extends T['length'] ? false : true} IsTupleType<T>
 */

/**
 * @template T
 * @typedef {T extends AbstConcreteType ? true : false} IsConcreteType<T>
 */

/**
 * @template [T=any]
 * @template [U=any]
 * @typedef {new (...args: Array<T>) => U} ConcreteType<T, U>
 */

/**
 * @template [T=any]
 * @template [U=any]
 * @typedef {abstract new (...args: Array<T>) => U} AbstConcreteType<T, U>
 */

/**
 * @typedef {Array<AbstConcreteType|AbstConcreteTypes>} AbstConcreteTypes
 */

/**
 * @template {AbstConcreteType|AbstConcreteTypes} T
 * @typedef {T extends Array<any>
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