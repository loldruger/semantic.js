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
 * @template [R=any|void]
 * @typedef {(...args: ReadonlyArray<P>) => R} CallableType<P, R>
 */

/**
 * @template [P=any]
 * @template [R=any]
 * @typedef {new (...args: ReadonlyArray<P>) => R} ConcreteType<P, R>
 */

/**
 * @template [P=any]
 * @template [R=any]
 * @typedef {abstract new (...args: ReadonlyArray<P>) => R} AbstConcreteType<P, R>
 */

/**
 * @typedef {Array<ConstructableTypeUnion|Mut<ConstructableTypeUnion>>} ConstructableTypes
 */

/**
 * @typedef {|
 *       CallableType | Mut<CallableType>
 *     | ConcreteType | Mut<ConcreteType>
 *     | AbstConcreteType | Mut<AbstConcreteType>
 *     | ConstructableTypes | Mut<ConstructableTypes>
 * } ConstructableTypeUnion
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
 * @typedef {|
 *     T extends number ? NumberConstructor :
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
 * @template {ConstructableTypeUnion} Arg_T
 * @typedef {IsTupleType<Arg_T> extends true ? {
 *     [K in keyof Arg_T]: (
 *         Match<Arg_T[K], [
 *             (p: ConstructableTypes) => Readonly<ToInstanceTypeMatcher<AsType<Arg_T[K], ConstructableTypes>>>,
 *             (p: AbstConcreteType) => Readonly<InstanceType<AsType<Arg_T[K], AbstConcreteType>>>,
 *             (p: CallableType) =>
 *                 Readonly<(a: ToInstanceTypeMatcher<AsType<Parameters<AsType<Arg_T[K], CallableType>>, ConstructableTypes>>) =>
 *                     ToInstanceTypeMatcher<AsType<ReturnType<AsType<Arg_T[K], CallableType>>, any>>>,
 *             (p: Mut<ConstructableTypes>) => ToInstanceTypeMatcher<AsType<Arg_T[K], Mut<ConstructableTypes>>['mut']>,
 *             (p: Mut<AbstConcreteType>) => InstanceType<AsType<Arg_T[K], Mut<AbstConcreteType>>['mut']>,
 *             (p: Mut<CallableType>) =>
 *                 (a: ToInstanceTypeMatcher<AsType<Parameters<AsType<Arg_T[K], Mut<CallableType>>['mut']>, ConstructableTypes>>) =>
 *                     ToInstanceTypeMatcher<AsType<ReturnType<AsType<Arg_T[K], Mut<CallableType>>['mut']>, any>>,
 *     ]>)} :
 *     Match<Arg_T, [
 *         (p: AbstConcreteType) => InstanceType<AsType<Arg_T, AbstConcreteType>>,
 *         (p: CallableType) =>
 *             (a: ToInstanceTypeMatcher<AsType<Parameters<AsType<Arg_T, CallableType>>, ConstructableTypes>>) =>
 *                 ToInstanceTypeMatcher<AsType<ReturnType<AsType<Arg_T, CallableType>>, any>>,
 *         (p: Mut<AbstConcreteType>) => InstanceType<AsType<Arg_T, Mut<AbstConcreteType>>['mut']>,
 *         (p: Mut<CallableType>) =>
 *             (a: ToInstanceTypeMatcher<AsType<Parameters<AsType<Arg_T, Mut<CallableType>>['mut']>, ConstructableTypes>>) =>
 *                 ToInstanceTypeMatcher<AsType<ReturnType<AsType<Arg_T, Mut<CallableType>>['mut']>, any>>,
 *     ]>
 * } ToInstanceTypeMatcher<Arg_T>
 */

/**
 * @template {ConstructableTypeUnion} Arg_T
 * @typedef {IsMut<Arg_T> extends true
 *     ? ToInstanceTypeMatcher<AsType<Arg_T, Mut<ConstructableTypeUnion>>['mut']>
 *     : ToInstanceTypeMatcher<AsType<Arg_T, ConstructableTypeUnion>>
 * } ToInstanceType<Arg_T>
 */

// /**
//  * @typedef {ToInstanceType<NumberConstructor>} Test1
//  * @typedef {ToInstanceType<[NumberConstructor, BooleanConstructor, StringConstructor]>} Test2
//  * @typedef {ToInstanceType<[NumberConstructor, [BooleanConstructor, StringConstructor]]>} Test3
//  * @typedef {ToInstanceType<[[NumberConstructor], BooleanConstructor, StringConstructor, ObjectConstructor]>} Test4
//  * @typedef {ToInstanceType<(a: BooleanConstructor) => StringConstructor>} Test5
//  * @typedef {ToInstanceType<(a: [any]) => any>} Test6
//  * @typedef {ToInstanceType<(a: [any, any]) => any>} Test7
//  * @typedef {ToInstanceType<(a: [BooleanConstructor, [NumberConstructor]]) => any>} Test8
//  * @typedef {ToInstanceType<(a: NumberConstructor, b: StringConstructor) => [any]>} Test22
//  * @typedef {ToInstanceType<(a: any) => [any]>} Test9
//  * @typedef {ToInstanceType<(a: any) => [any, any]>} Test10
//  * @typedef {ToInstanceType<(a: any) => [StringConstructor, [BooleanConstructor]]>} Test11
//  * @typedef {ToInstanceType<(a: [any]) => [any]>} Test12
//  * @typedef {ToInstanceType<(a: [any]) => [any, any]>} Test13
//  * @typedef {ToInstanceType<[(a: [any]) => [any, any]]>} Test14
//  */

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

/**
 * @template T
 * @typedef {T extends string | number | boolean | symbol | bigint
 *     ? (string extends T
 *         ? never
 *         : number extends T
 *             ? never
 *             : boolean extends T
 *                 ? never
 *                 : symbol extends T
 *                     ? never
 *                     : bigint extends T
 *                         ? never
 *                         : T
 *     )
 *     : never
 * } IsLiteralType<T>
 */

////////////////////
// Type Utilities //
////////////////////

/**
 * @template T
 * @typedef {T extends object
 * ? (
 *     string extends keyof T
 *     ? true
 *     : number extends keyof T
 *         ? true
 *         : symbol extends keyof T
 *           ? true
 *           : (keyof T extends never ? true:
 *               { [K in keyof T]-?: T[K] } extends T ? true : false)
 *   )
 * : false} IsExtensible<T>
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

