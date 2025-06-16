//@ts-check

//////////////////////
// Type Definitions //
//////////////////////

/**
 * @template {number} A
 * @template {number} B
 * @typedef {Type.Pair<A, B>} Type.Range <A, B>
 */

/**
 * @template {number} A
 * @template {Type.Range<number, number>} T
 * @typedef {{[K in keyof T]: T[K]}} IsInRange <A, T>
 */

/**
 * @typedef {IsInRange<5, Type.Range<0, 10>>} TestRangeType
 */

/**
 * @template {String} Message
 * @typedef {`${"ERROR: "}${Message}` & { __brand: 'error' }} Type.Error <Message>
 */

/**
 * @template {PropertyKey} K
 * @template {unknown} V
 * @typedef {Record<K, V>} Type.Pair <T, V>
 */

/**
 * @template {unknown} [P=unknown|void]
 * @template {unknown} [R=unknown]
 * @typedef {(...args: ReadonlyArray<unknown>) => unknown} Type.CallableType <P, R>
 */

/**
 * @template {unknown} [P=unknown|void]
 * @template {unknown} [R=unknown]
 * @typedef {new (...args: ReadonlyArray<unknown>) => unknown} Type.ConstructorType <P, R>
 */

/**
 * @template {unknown} [P=unknown|void]
 * @template {unknown} [R=unknown]
 * @typedef {abstract new (...args: ReadonlyArray<unknown>) => unknown} Type.AbstConstructorType <P, R>
 */

/**
 * @typedef {Type.CallableType | Type.ConstructorType | Type.AbstConstructorType} Type.ConstructableType
 * @typedef {IMut<Type.CallableType> | IMut<Type.ConstructorType> | IMut<Type.AbstConstructorType>} Type.ImmutableConstructableType
 * @typedef {Mut<Type.CallableType> | Mut<Type.ConstructorType> | Mut<Type.AbstConstructorType>} Type.MutableConstructableType
 *
 * @typedef {Type.ConstructableType | Type.ImmutableConstructableType | Type.MutableConstructableType} Internal.AnyConstructableType
 * @typedef {Internal.AnyConstructableType | ReadonlyArray<Internal.AnyConstructableType>} Internal.AnyConstructableTypes
 *
 * @typedef {Internal.AnyConstructableTypes | ReadonlyArray<Internal.AnyConstructableTypes>} ConstructableTypeUnion
 * @typedef {ConstructableTypeUnion | ReadonlyArray<ConstructableTypeUnion>} Internal.UnknownTypes
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
 *     T extends Number ? NumberConstructor :
 *     T extends string ? StringConstructor :
 *     T extends String ? StringConstructor :
 *     T extends boolean ? BooleanConstructor :
 *     T extends Boolean ? BooleanConstructor :
 *     T extends Function ? FunctionConstructor :
 *     T extends Array<unknown> ? (Type.IsTupleType<T> extends true ? Array.ToTupleType<T> : ArrayConstructor) :
 *     T extends object ? ObjectConstructor :
 *     T extends Object ? ObjectConstructor :
 *     Type.Error<`Unsupported type T has been provided`>
 * } Type.ToConstructorType<T>
 */

/**
 * @template {unknown} Arg_T
 * @typedef {|
 *     Type.IsTupleType<Arg_T> extends true
 *         ? {[K in keyof Arg_T]: (
 *             Match<Arg_T[K], [
 *                 (p: Internal.UnknownTypes) => Type.ToInstanceType<As<Arg_T[K], Internal.UnknownTypes>>,
 *                 (p: Type.AbstConstructorType) => InstanceType<As<Arg_T[K], IMut<Type.AbstConstructorType>['imut']>>,
 *                 (p: Type.CallableType) =>
 *                     (a: Type.ToInstanceType<As<Parameters<As<Arg_T[K], IMut<Type.CallableType>>['imut']>, Internal.UnknownTypes>>) =>
 *                         Type.ToInstanceType<As<ReturnType<As<Arg_T[K], IMut<Type.CallableType>>['imut']>, Internal.UnknownTypes>>,
 *                 (p: IMut<Type.AbstConstructorType>) => InstanceType<As<Arg_T[K], IMut<Type.AbstConstructorType>>['imut']>,
 *                 (p: IMut<Type.CallableType>) =>
 *                     (a: Type.ToInstanceType<As<Parameters<As<Arg_T[K], IMut<Type.CallableType>>['imut']>, Internal.UnknownTypes>>) =>
 *                         Type.ToInstanceType<As<ReturnType<As<Arg_T[K], IMut<Type.CallableType>>['imut']>, Internal.UnknownTypes>>,
 *                 (p: Mut<Type.AbstConstructorType>) => InstanceType<As<Arg_T[K], Mut<Type.AbstConstructorType>>['mut']>,
 *                 (p: Mut<Type.CallableType>) =>
 *                     (a: Type.ToInstanceType<As<Parameters<As<Arg_T[K], Mut<Type.CallableType>>['mut']>, Internal.UnknownTypes>>) =>
 *                         Type.ToInstanceType<As<ReturnType<As<Arg_T[K], Mut<Type.CallableType>>['mut']>, Internal.UnknownTypes>>,
 *         ]>)}
 *         : Match<Arg_T, [
 *             (p: Type.AbstConstructorType) => InstanceType<As<Arg_T, IMut<Type.AbstConstructorType>['imut']>>,
 *             (p: Type.CallableType) =>
 *                 (a: Type.ToInstanceType<As<Parameters<As<Arg_T, IMut<Type.CallableType>>['imut']>, Internal.UnknownTypes>>) =>
 *                     Type.ToInstanceType<As<ReturnType<As<Arg_T, IMut<Type.CallableType>>['imut']>, Internal.UnknownTypes>>,
 *             (p: IMut<Type.AbstConstructorType>) => InstanceType<As<Arg_T, IMut<Type.AbstConstructorType>>['imut']>,
 *             (p: IMut<Type.CallableType>) =>
 *                 (a: Type.ToInstanceType<As<Parameters<As<Arg_T, IMut<Type.CallableType>>['imut']>, Internal.UnknownTypes>>) =>
 *                     Type.ToInstanceType<As<ReturnType<As<Arg_T, IMut<Type.CallableType>>['imut']>, Internal.UnknownTypes>>,
 *             (p: Mut<Type.AbstConstructorType>) => InstanceType<As<Arg_T, Mut<Type.AbstConstructorType>>['mut']>,
 *             (p: Mut<Type.CallableType>) =>
 *                 (a: Type.ToInstanceType<As<Parameters<As<Arg_T, Mut<Type.CallableType>>['mut']>, Internal.UnknownTypes>>) =>
 *                     Type.ToInstanceType<As<ReturnType<As<Arg_T, Mut<Type.CallableType>>['mut']>, Internal.UnknownTypes>>,
 *         ]>
 * } Type.ToInstanceType<Arg_T>
 */

/**
 * @typedef {Type.ToInstanceType<NumberConstructor>} Test1
 * @typedef {Type.ToInstanceType<[Mut<NumberConstructor>, BooleanConstructor, StringConstructor]>} Test2
 * @typedef {Type.ToInstanceType<[NumberConstructor, [BooleanConstructor, IMut<StringConstructor>]]>} Test3
 * @typedef {Type.ToInstanceType<[[NumberConstructor], BooleanConstructor, StringConstructor, ObjectConstructor]>} Test4
 * @typedef {Type.ToInstanceType<() => StringConstructor>} Test16
 * @typedef {Type.ToInstanceType<(a: BooleanConstructor) => StringConstructor>} Test5
 * @typedef {Type.ToInstanceType<(a: [Mut<NumberConstructor>]) => BooleanConstructor>} Test6
 * @typedef {Type.ToInstanceType<(a: [NumberConstructor, NumberConstructor]) => NumberConstructor>} Test7
 * @typedef {Type.ToInstanceType<(a: [BooleanConstructor, [NumberConstructor]]) => NumberConstructor>} Test8
 * @typedef {Type.ToInstanceType<(a: NumberConstructor, b: StringConstructor) => [NumberConstructor]>} Test22
 * @typedef {Type.ToInstanceType<(a: Mut<NumberConstructor>) => [NumberConstructor]>} Test9
 * @typedef {Type.ToInstanceType<(a: Mut<NumberConstructor>) => [NumberConstructor, BooleanConstructor]>} Test10
 * @typedef {Type.ToInstanceType<(a: Mut<NumberConstructor>) => [StringConstructor, [BooleanConstructor]]>} Test11
 * @typedef {Type.ToInstanceType<(a: [NumberConstructor]) => [BooleanConstructor]>} Test12
 * @typedef {Type.ToInstanceType<(a: [NumberConstructor]) => [NumberConstructor, BooleanConstructor]>} Test13
 * @typedef {Type.ToInstanceType<[(a: [NumberConstructor]) => [NumberConstructor, BooleanConstructor]]>} Test14
 * @typedef {Type.ToInstanceType<[(a: [NumberConstructor], b: [BooleanConstructor]) => [NumberConstructor, BooleanConstructor]]>} Test15
 */

///////////////////
// Type Checkers //
///////////////////

/**
 * @template T
 * @typedef {T extends ReadonlyArray<unknown> ? number extends T['length'] ? false : true : false} Type.IsTupleType<T>
 */

/**
 * @template T
 * @typedef {T extends Type.AbstConstructorType ? true : false} Type.IsConstructorType<T>
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

// /**
//  * @template X, Y
//  * @typedef { (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false } Type.IsEqual <X, Y>
//  */

/**
 * @template X The first type to compare.
 * @template Y The second type to compare, or a pattern containing 'infer' to match against X.
 * @typedef {|
 *     X extends Y
 *         ? ((<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false)
 *         : false
 * } Type.IsEqual <X, Y>
 */

/**
 * @template T
 * @typedef {T extends { [k: string]: unknown }
 *     ? T extends { [K in keyof T]: infer U }[keyof T]
 *         ? U
 *         : never
 *     : T extends Array<infer U>
 *         ? U
 *         : T extends (...args: Array<unknown>) => infer U
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

// /**
//  * @template T An object type.
//  * @template F A generic type constructor that takes a type argument and returns a new type (e.g., Array, Option).
//  * @typedef {{[K in keyof T]: F<T[K]>}} Internal.TransformedObjectProperties<T, F>
//  */

// /**
//  * Takes an object type T and a generic type constructor F.
//  * It first transforms each property of T using F,
//  * and then creates a union of all these transformed property types.
//  * @template T An object type.
//  * @template F A generic type constructor that takes a type argument and returns a new type (e.g., Array, Option).
//  * @typedef {Internal.TransformedObjectProperties<T, F>[keyof T]} Type.UnionOfTransformedProperties<T, F>
//  */

/**
 * @template T
 * @template X
 * @typedef {T & {
 *   [K in keyof X]: K extends keyof T ? X[K] : never
 * }} Exact<T, X>
 */
