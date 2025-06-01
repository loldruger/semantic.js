//@ts-check

//////////////////////
// Type Definitions //
//////////////////////

/**
 * @template {number} A
 * @template {number} B
 * @typedef {Type.Pair<A, B>} Type.Range<A, B>
 */

/**
 * @template {number} A
 * @template {Type.Range<number, number>} T
 * @typedef {{[K in keyof T]: T[K]}} IsInRange<A, T>
 */

/**
 * @typedef {IsInRange<5, Type.Range<0, 10>>} TestRangeType
 */

/**
 * @template {String} Message
 * @typedef {`ERROR: ${Message}` & { __brandErrorType?: never }} Type.Error<Message>
 */

/**
 * @typedef {Type.Error<'This is an error message'>} Test.ErrorType
 */

/**
 * @typedef {'EvalFailed'} EvalFailed
 * @typedef {undefined} Type.Undefined
 */

/**
 * @template {PropertyKey} K
 * @template V
 * @typedef {Record<K, V>} Type.Pair<T, V>
 */

/**
 * @template [P=any]
 * @template [R=any|void]
 * @typedef {(...args: ReadonlyArray<P>) => R} Type.CallableType<P, R>
 */

/**
 * @template [P=any]
 * @template [R=any]
 * @typedef {new (...args: ReadonlyArray<P>) => R} Type.ConcreteType<P, R>
 */

/**
 * @template [P=any]
 * @template [R=any]
 * @typedef {abstract new (...args: ReadonlyArray<P>) => R} Type.AbstConcreteType<P, R>
 */

/**
 * @typedef {Array<ConstructableTypeUnion|Mut<ConstructableTypeUnion>>} ConstructableTypes
 */

/**
 * @typedef {|
 *       Type.CallableType | Mut<Type.CallableType>
 *     | Type.ConcreteType | Mut<Type.ConcreteType>
 *     | Type.AbstConcreteType | Mut<Type.AbstConcreteType>
 *     | ConstructableTypes | Mut<ConstructableTypes>
 * } ConstructableTypeUnion
 */

/////////////////////////////////
// Conversion Type Definitions //
/////////////////////////////////

/**
 * @template T, U
 * @typedef {T extends U ? T : never} As<T, U>
 */

/**
 * @template T
 * @typedef {|
 *     T extends number ? NumberConstructor :
 *     T extends string ? StringConstructor :
 *     T extends boolean ? BooleanConstructor :
 *     T extends Function ? FunctionConstructor :
 *     T extends Array<unknown> ? (Type.IsTupleType<T> extends true ? Type.ToTupleType<T> : ArrayConstructor) :
 *     T extends object ? { new (...args: Array<unknown>): T } :
 *     never
 * } Type.ToConcreteType<T>
 */

/**
 * @template {ReadonlyArray<unknown>} T
 * @typedef {T extends []
 *     ? []
 *     : T extends [infer Head, ...infer Tail]
 *         ? [Type.ToConcreteType<Head>, ...Type.ToTupleType<Tail extends ReadonlyArray<unknown>
 *             ? Tail
 *             : []>
 *         ] : []
 * } Type.ToTupleType<T>
 */

/**
 * @template {ConstructableTypeUnion} Arg_T
 * @typedef {Type.IsTupleType<Arg_T> extends true ? {
 *     [K in keyof Arg_T]: (
 *         Match<Arg_T[K], [
 *             (p: ConstructableTypes) => Readonly<ToInstanceTypeMatcher<As<Arg_T[K], ConstructableTypes>>>,
 *             (p: Type.AbstConcreteType) => Readonly<InstanceType<As<Arg_T[K], Type.AbstConcreteType>>>,
 *             (p: Type.CallableType) =>
 *                 Readonly<(a: ToInstanceTypeMatcher<As<Parameters<As<Arg_T[K], Type.CallableType>>, ConstructableTypes>>) =>
 *                     ToInstanceTypeMatcher<As<ReturnType<As<Arg_T[K], Type.CallableType>>, any>>>,
 *             (p: Mut<ConstructableTypes>) => ToInstanceTypeMatcher<As<Arg_T[K], Mut<ConstructableTypes>>['mut']>,
 *             (p: Mut<Type.AbstConcreteType>) => InstanceType<As<Arg_T[K], Mut<Type.AbstConcreteType>>['mut']>,
 *             (p: Mut<Type.CallableType>) =>
 *                 (a: ToInstanceTypeMatcher<As<Parameters<As<Arg_T[K], Mut<Type.CallableType>>['mut']>, ConstructableTypes>>) =>
 *                     ToInstanceTypeMatcher<As<ReturnType<As<Arg_T[K], Mut<Type.CallableType>>['mut']>, any>>,
 *     ]>)} :
 *     Match<Arg_T, [
 *         (p: Type.AbstConcreteType) => InstanceType<As<Arg_T, Type.AbstConcreteType>>,
 *         (p: Type.CallableType) =>
 *             (a: ToInstanceTypeMatcher<As<Parameters<As<Arg_T, Type.CallableType>>, ConstructableTypes>>) =>
 *                 ToInstanceTypeMatcher<As<ReturnType<As<Arg_T, Type.CallableType>>, any>>,
 *         (p: Mut<Type.AbstConcreteType>) => InstanceType<As<Arg_T, Mut<Type.AbstConcreteType>>['mut']>,
 *         (p: Mut<Type.CallableType>) =>
 *             (a: ToInstanceTypeMatcher<As<Parameters<As<Arg_T, Mut<Type.CallableType>>['mut']>, ConstructableTypes>>) =>
 *                 ToInstanceTypeMatcher<As<ReturnType<As<Arg_T, Mut<Type.CallableType>>['mut']>, any>>,
 *     ]>
 * } ToInstanceTypeMatcher<Arg_T>
 */

/**
 * @template {ConstructableTypeUnion} Arg_T
 * @typedef {IsMut<Arg_T> extends true
 *     ? ToInstanceTypeMatcher<As<Arg_T, Mut<ConstructableTypeUnion>>['mut']>
 *     : ToInstanceTypeMatcher<As<Arg_T, ConstructableTypeUnion>>
 * } Type.ToInstanceType<Arg_T>
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
 * @typedef {T extends ReadonlyArray<unknown> ? number extends T['length'] ? false : true : false} Type.IsTupleType<T>
 */

/**
 * @template T
 * @typedef {T extends Type.AbstConcreteType ? true : false} Type.IsConcreteType<T>
 */

/**
 * @template T
 * @typedef {T extends Type.CallableType ? true : false} Type.IsFunctionType<T>
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
 * } Type.IsLiteralType<T>
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
 * : false
 * } Type.IsExtensible<T>
 */

/**
 * @template T
 * @template U
 * @typedef {T extends U ? true : false} Type.IsSubType<T, U>
 */

/**
 * @template X, Y
 * @typedef { (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false } Type.IsEqual<X, Y>
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
 * @template T
 * @typedef {{[K in keyof T]: T[K]
 * } & {
 *     [P in Exclude<string, keyof T>]?: never
 * }
 * } Strict<T>
 */


/**
 * @template T
 * @template X
 * @typedef {T & {
 *   [K in keyof X]: K extends keyof T ? X[K] : never
 * }} Exact<T, X>
 */