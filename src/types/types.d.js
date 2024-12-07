//@ts-check

//////////////////////
// Type Definitions //
//////////////////////

/**
 * @template {number} A
 * @template {number} B
 * @typedef {Pair<A, B>} RangeType<A, B>
 */

/**
 * @template {number} A
 * @template {RangeType<number, number>} T
 * @typedef {{[K in keyof T]: T[K]}} IsInRange<A, T>
 */

/**
 * @typedef {IsInRange<5, RangeType<0, 10>>} TestRangeType
 */

/**
 * @template {String} M
 * @template {String} [E='ERROR: ']
 * @typedef {`${E}${M}`} ErrorType<M>
 */

/**
 * @typedef {'EvalFailed'} EvalFailed
 * @typedef {undefined} UndefinedType
 */

/**
 * @template {PropertyKey} K
 * @template V
 * @typedef {Record<K, V>} Pair<T, V>
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
 * @typedef {T extends U ? T : never} AsType<T, U>
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
 * @template {ReadonlyArray<unknown>} T
 * @typedef {T extends []
 *     ? []
 *     : T extends [infer Head, ...infer Tail]
 *         ? [ToConcreteType<Head>, ...ToTupleType<Tail extends ReadonlyArray<unknown>
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
 *                         ? IsTupleType<R> extends true ? 'P R' : 'P'
 *                         : IsTupleType<R> extends true ? 'R' : (x: P) => InstanceType<R extends AbstConcreteType ? R : never>
 *                     : T[K] extends (...x: infer B) => infer A
 *                         ? true extends true
 *                             ? IsTupleType<R> extends true ? 'P R' : 'B'
 *                             : IsTupleType<R> extends true ? 'R' : (x: P) => InstanceType<R extends AbstConcreteType ? R : never>
 *                         : never
 *                 : never
 *     )}
 *     : T extends AbstConcreteType
 *         ? InstanceType<T>
 *         : T extends CallableType
 *             ? T
 *             : never
 * } ToRecursivelyInstanceType<T>
 */

/**
 * @template {ConstructableTypeUnion} Arg_T
 * @typedef {Match<Arg_T, [
 *     (p: ConstructableTypes) => Arg_T,
 *     (p: AbstConcreteType) => InstanceType<AsType<Arg_T, AbstConcreteType>>,
 *     (p: CallableType) => Match<Arg_T, [
 *         (p: (Arg_T extends (i: infer P) => infer R ? (a: P) => R : never)) => InstanceType<AsType<Arg_T, AbstConcreteType>>,
 *         (p: (Arg_T extends (...i: infer P) => infer R ? (a: P) => R : never)) => InstanceType<AsType<Arg_T, AbstConcreteType>>,
 *     ]>,
 *     () => 'Default'
 * ]>} TestFn<Arg_T>
 */

/**
 * @typedef {TestFn<NumberConstructor>} Test1
 * @typedef {TestFn<[NumberConstructor, BooleanConstructor, StringConstructor]>} Test2
 * @typedef {TestFn<[NumberConstructor, [BooleanConstructor, StringConstructor]]>} Test3
 * @typedef {TestFn<[[NumberConstructor], BooleanConstructor, StringConstructor, ObjectConstructor]>} Test4
 * @typedef {TestFn<(a: any) => any>} Test5
 * @typedef {TestFn<(a: [any]) => any>} Test6
 * @typedef {TestFn<(a: [any, any]) => any>} Test7
 * @typedef {TestFn<(a: [any, [any]]) => any>} Test8
 * @typedef {TestFn<(a: any) => [any]>} Test9
 * @typedef {TestFn<(a: any) => [any, any]>} Test10
 * @typedef {TestFn<(a: any) => [any, [any]]>} Test11
 * @typedef {TestFn<(a: [any]) => [any]>} Test12
 * @typedef {TestFn<(a: [any]) => [any, any]>} Test13
 *
 */

///////////////////
// Type Checkers //
///////////////////

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
 * @template T
 * @template U
 * @typedef {T extends U ? true : false} IsSubType<T, U>
 */

/**
 * @template X, Y
 * @typedef { (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false } IsEqual<X, Y>
 */

/**
 * @template T
 * @typedef {T extends Array<infer U> ? U : T} UnwrapArray<T>
 */
