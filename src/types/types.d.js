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
 * @template {String} Message
 * @template {String} [E='ERROR: ']
 * @typedef {never extends never ? `${E}${Message}` : never} ErrorType<Message>
 */

/**
 * @typedef {ErrorType<'This is an error message'>} TestErrorType
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
 * @typedef {new (...args: ReadonlyArray<P>) => R} ConcreteType<P, R>
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
 * @typedef {CallableType|ConcreteType|AbstConcreteType|ConstructableTypes} ConstructableTypeUnion
 */

/////////////////////////////////
// Conversion Type Definitions //
/////////////////////////////////

/**
 * @template T, U
 * @typedef {T extends U ? T : String extends U ? ErrorType<"AsType<T, U> casting failed"> : never} AsType<T, U>
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
 *                             : IsTupleType<R> extends true ? 'R' : (x: Params) => InstanceType<R extends AbstConcreteType ? R : never>
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
 * @typedef {If<IsTupleType<Arg_T>, {
 *     [K in keyof Arg_T]: (
 *         Match<Arg_T[K], [
 *             (p: ConstructableTypes) => ToInstanceType<AsType<Arg_T[K], ConstructableTypes>>,
 *             (p: AbstConcreteType) => InstanceType<AsType<Arg_T[K], AbstConcreteType>>,
 *             (p: ConcreteType) => InstanceType<AsType<Arg_T[K], ConcreteType>>,
 *             (p: CallableType) => Match<Arg_T[K], [
 *                 <P, R>(p: (a: P) => R) => InstanceType<AsType<Arg_T[K], AbstConcreteType>>,
 *                 (p: ((...i: any) => any)) => InstanceType<AsType<Arg_T[K], AbstConcreteType>>,
 *                 () => void
 *             ]>,
 *             () => void
 *         ]>)},
 *     Match<Arg_T, [
 *         (p: AbstConcreteType) => InstanceType<AsType<Arg_T, AbstConcreteType>>,
 *         (p: ConcreteType) => InstanceType<AsType<Arg_T, ConcreteType>>,
 *         (p: CallableType) => Match<Arg_T, [
 *                 (p: (a: any) => any) => InstanceType<AsType<Arg_T, AbstConcreteType>>,
 *                 (p: ((...i: any) => any)) => InstanceType<AsType<Arg_T, AbstConcreteType>>,
 *                 () => void
 *             ]>,
 *         () => void
 *     ]>>
 * } ToInstanceType<Arg_T>
 */

/**
 * @typedef {ToInstanceType<NumberConstructor>} Test1
 * @typedef {ToInstanceType<[NumberConstructor, BooleanConstructor, StringConstructor]>} Test2
 * @typedef {ToInstanceType<[NumberConstructor, [BooleanConstructor, StringConstructor]]>} Test3
 * @typedef {ToInstanceType<[[NumberConstructor], BooleanConstructor, StringConstructor, ObjectConstructor]>} Test4
 * @typedef {ToInstanceType<(a: BooleanConstructor) => StringConstructor>} Test5
 * @typedef {ToInstanceType<(a: [any]) => any>} Test6
 * @typedef {ToInstanceType<(a: [any, any]) => any>} Test7
 * @typedef {ToInstanceType<(a: [any, [any]]) => any>} Test8
 * @typedef {ToInstanceType<(a: any) => [any]>} Test9
 * @typedef {ToInstanceType<(a: any) => [any, any]>} Test10
 * @typedef {ToInstanceType<(a: any) => [any, [any]]>} Test11
 * @typedef {ToInstanceType<(a: [any]) => [any]>} Test12
 * @typedef {ToInstanceType<(a: [any]) => [any, any]>} Test13
 * @typedef {ToInstanceType<[(a: [any]) => [any, any]]>} Test14
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
 * @typedef {T extends { [k: string]: any }
 *     ? T extends { [K in keyof T]: infer U }[keyof T]
 *         ? U
 *         : never
 *     : T extends Array<infer U>
 *         ? U
 *         : T extends (...args: any[]) => infer U
 *             ? U
 *             : T extends Promise<infer U>
 *                 ? U
 *                 : T
 * } Unwrap<T>
 */

/**
 * @template {ReadonlyArray<any>} T
 * @typedef {T extends [infer First, ...infer Rest]
*     ? First extends Rest[number]
*         ? true
*         : HasArrayDuplication<Rest> 
*     : false
* } HasArrayDuplication<T>
*/