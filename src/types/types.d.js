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
 * @typedef {`${"ERROR: "}${Message}` & { __brand: 'error' }} Type.Error<Message>
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
 * @typedef {new (...args: ReadonlyArray<P>) => R} Type.ConstructorType<P, R>
 */

/**
 * @template [P=any]
 * @template [R=any]
 * @typedef {abstract new (...args: ReadonlyArray<P>) => R} Type.AbstConstructorType<P, R>
 */

/**
 * @typedef {Array<ConstructableTypeUnion|Imut<ConstructableTypeUnion>|Mut<ConstructableTypeUnion>>} Type.ConstructableTypes
 */

/**
 * @typedef {|
 *     Type.CallableType | Imut<Type.CallableType> | Mut<Type.CallableType>
 *     | Type.ConstructorType | Imut<Type.ConstructorType> | Mut<Type.ConstructorType>
 *     | Type.AbstConstructorType | Imut<Type.AbstConstructorType> | Mut<Type.AbstConstructorType>
 *     | Type.ConstructableTypes | Imut<Type.ConstructableTypes> | Mut<Type.ConstructableTypes>
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
 *     T extends Number ? NumberConstructor :
 *     T extends string ? StringConstructor :
 *     T extends String ? StringConstructor :
 *     T extends boolean ? BooleanConstructor :
 *     T extends Boolean ? BooleanConstructor :
 *     T extends Function ? FunctionConstructor :
 *     T extends Array<unknown> ? (Type.IsTupleType<T> extends true ? Type.ToTupleType<T> : ArrayConstructor) :
 *     T extends object ? ObjectConstructor :
 *     T extends Object ? ObjectConstructor :
 *     Type.Error<`Unsupported type T has been provided`>
 * } Type.ToConstructorType<T>
 */

/**
 * @template {ReadonlyArray<unknown>} T
 * @typedef {T extends []
 *     ? []
 *     : T extends [infer Head, ...infer Tail]
 *         ? [Type.ToConstructorType<Head>, ...Type.ToTupleType<Tail extends ReadonlyArray<unknown>
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
 *             (p: Type.ConstructableTypes) => Readonly<Internal.ToInstanceTypeMatcher<As<Arg_T[K], Type.ConstructableTypes>>>,
 *             (p: Type.AbstConstructorType) => Readonly<InstanceType<As<Arg_T[K], Type.AbstConstructorType>>>,
 *             (p: Type.CallableType) =>
 *                 Readonly<(a: Internal.ToInstanceTypeMatcher<As<Parameters<As<Arg_T[K], Type.CallableType>>, Type.ConstructableTypes>>) =>
 *                     Internal.ToInstanceTypeMatcher<As<ReturnType<As<Arg_T[K], Type.CallableType>>, any>>>,
 *             (p: Mut<Type.ConstructableTypes>) => Internal.ToInstanceTypeMatcher<As<Arg_T[K], Mut<Type.ConstructableTypes>>['mut']>,
 *             (p: Mut<Type.AbstConstructorType>) => InstanceType<As<Arg_T[K], Mut<Type.AbstConstructorType>>['mut']>,
 *             (p: Mut<Type.CallableType>) =>
 *                 (a: Internal.ToInstanceTypeMatcher<As<Parameters<As<Arg_T[K], Mut<Type.CallableType>>['mut']>, Type.ConstructableTypes>>) =>
 *                     Internal.ToInstanceTypeMatcher<As<ReturnType<As<Arg_T[K], Mut<Type.CallableType>>['mut']>, any>>,
 *     ]>)} :
 *     Match<Arg_T, [
 *         (p: Type.AbstConstructorType) => InstanceType<As<Arg_T, Type.AbstConstructorType>>,
 *         (p: Type.CallableType) =>
 *             (a: Internal.ToInstanceTypeMatcher<As<Parameters<As<Arg_T, Type.CallableType>>, Type.ConstructableTypes>>) =>
 *                 Internal.ToInstanceTypeMatcher<As<ReturnType<As<Arg_T, Type.CallableType>>, any>>,
 *         (p: Mut<Type.AbstConstructorType>) => InstanceType<As<Arg_T, Mut<Type.AbstConstructorType>>['mut']>,
 *         (p: Mut<Type.CallableType>) =>
 *             (a: Internal.ToInstanceTypeMatcher<As<Parameters<As<Arg_T, Mut<Type.CallableType>>['mut']>, Type.ConstructableTypes>>) =>
 *                 Internal.ToInstanceTypeMatcher<As<ReturnType<As<Arg_T, Mut<Type.CallableType>>['mut']>, any>>,
 *     ]>
 * } Internal.ToInstanceTypeMatcher<Arg_T>
 */

/**
 * @template {ConstructableTypeUnion} Arg_T
 * @typedef {Type.IsMut<Arg_T> extends true
 *     ? Internal.ToInstanceTypeMatcher<As<Arg_T, Mut<ConstructableTypeUnion>>['mut']>
 *     : Internal.ToInstanceTypeMatcher<As<Arg_T, ConstructableTypeUnion>>
 * } Type.ToInstanceType<Arg_T>
 */

/**
 * @typedef {Type.ToInstanceType<NumberConstructor>} Test1
 * @typedef {Type.ToInstanceType<[NumberConstructor, BooleanConstructor, StringConstructor]>} Test2
 * @typedef {Type.ToInstanceType<[NumberConstructor, [BooleanConstructor, StringConstructor]]>} Test3
 * @typedef {Type.ToInstanceType<[[NumberConstructor], BooleanConstructor, StringConstructor, ObjectConstructor]>} Test4
 * @typedef {Type.ToInstanceType<(a: BooleanConstructor) => StringConstructor>} Test5
 * @typedef {Type.ToInstanceType<(a: [any]) => any>} Test6
 * @typedef {Type.ToInstanceType<(a: [any, any]) => any>} Test7
 * @typedef {Type.ToInstanceType<(a: [BooleanConstructor, [NumberConstructor]]) => any>} Test8
 * @typedef {Type.ToInstanceType<(a: NumberConstructor, b: StringConstructor) => [any]>} Test22
 * @typedef {Type.ToInstanceType<(a: any) => [any]>} Test9
 * @typedef {Type.ToInstanceType<(a: any) => [any, any]>} Test10
 * @typedef {Type.ToInstanceType<(a: any) => [StringConstructor, [BooleanConstructor]]>} Test11
 * @typedef {Type.ToInstanceType<(a: [any]) => [any]>} Test12
 * @typedef {Type.ToInstanceType<(a: [any]) => [any, any]>} Test13
 * @typedef {Type.ToInstanceType<[(a: [any]) => [any, any]]>} Test14
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