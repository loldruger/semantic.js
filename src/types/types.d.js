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
 * @template {ReadonlyArray<any>} [P=ReadonlyArray<any>]
 * @template {any | void} [R=any | void]
 * @typedef {(...args: P) => R} Type.CallableType <P, R>
 */

/**
 * @template {ReadonlyArray<any>} [P=ReadonlyArray<any>]
 * @template {any} [R=any]
 * @typedef {new (...args: P) => R} Type.ConstructorType <P, R>
 */

/**
 * @template {ReadonlyArray<any>} [P=ReadonlyArray<any>]
 * @template {any} [R=any]
 * @typedef {abstract new (...args: P) => R} Type.AbstConstructorType <P, R>
 */

/**
 * @template {ReadonlyArray<any>} [P=ReadonlyArray<any>]
 * @template {any} [R=any]
 * @typedef {Type.CallableType<P, R> | Type.ConstructorType<P, R> | Type.AbstConstructorType<P, R>} Type.ConstructableType <P, R>
 */

/**
 * @template {ReadonlyArray<any>} [P=ReadonlyArray<any>]
 * @template {any} [R=any]
 * @typedef {IMut<Internal.ConstructableType<P, R>>} Type.ImmutableConstructableType <P, R>
 */

/**
 * @template {ReadonlyArray<any>} [P=ReadonlyArray<any>]
 * @template {any} [R=any]
 * @typedef {Mut<Internal.ConstructableType<P, R>>} Type.MutableConstructableType <P, R>
 */

/**
 * @template {ReadonlyArray<any>} [P=ReadonlyArray<any>]
 * @template {any} [R=any]
 * @typedef {Type.ConstructableType<P, R> | ReadonlyArray<Type.ConstructableType<P, R>>} Internal.ConstructableType <P, R>
 */

/**
 * @template {ReadonlyArray<any>} [P=ReadonlyArray<any>]
 * @template {any} [R=any]
 * @typedef {Type.ImmutableConstructableType<P, R> | ReadonlyArray<Type.ImmutableConstructableType<P, R>>} Internal.ImmutableConstructableType <P, R>
 */

/**
 * @template {ReadonlyArray<any>} [P=ReadonlyArray<any>]
 * @template {any} [R=any]
 * @typedef {Type.MutableConstructableType<P, R> | ReadonlyArray<Type.MutableConstructableType<P, R>>} Internal.MutableConstructableType <P, R>
 */

/**
 * @template {ReadonlyArray<any>} [P=ReadonlyArray<any>]
 * @template {any} [R=any]
 * @typedef {Internal.ConstructableType<P, R> | Internal.ImmutableConstructableType<P, R> | Internal.MutableConstructableType<P, R>} Internal.AnyConstructable <P, R>
 */

/**
 * @typedef {Internal.AnyConstructable | ReadonlyArray<Internal.AnyConstructable>} Internal.AnyConstructableType
 * @typedef {Internal.AnyConstructableType | ReadonlyArray<Internal.AnyConstructableType>} Internal.AnyConstructableTypes
 *
 * @typedef {Internal.AnyConstructableTypes | ReadonlyArray<Internal.AnyConstructableTypes>} Internal.ConstructableTypeUnion
 * @typedef {Internal.ConstructableTypeUnion | ReadonlyArray<Internal.ConstructableTypeUnion>} Internal.UnknownTypes
 */

/////////////////////////////////
// Conversion Type Definitions //
/////////////////////////////////

/**
 * @template T, U
 * @typedef {T extends U ? T : never} As <T, U>
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
 * } Type.ToConstructorType <T>
 */
/**
 * @template R
 * @typedef {R extends Promise<infer U> ? Promise<Type.ToInstanceType<U>> : Type.ToInstanceType<R>} Internal.MapReturnTypeToInstance
 */

/**
 * @template {Function} Fn
 * @typedef {Fn extends (self: any, ...args: infer P) => infer R
 * ? (...args: Internal.TupleToInstances<P>) => Internal.MapReturnTypeToInstance<R>
 * : never
 * } Internal.InferFnType
 */
/**
 * @template {ReadonlyArray<any>} T
 * @typedef {T extends readonly [infer Head, ...infer Tail]
 *     ? [Type.ToInstanceType<Head>, ...Internal.TupleToInstances<Tail>]
 *     : []
 * } Internal.TupleToInstances
 */

/**
 * @template {unknown} Arg_T
 * @typedef {|
 *     Type.IsTupleType<Arg_T> extends true
 *         ? { [K in keyof Arg_T]:
 *             Match<Arg_T[K], [
 *                 (p: any) => Type.ToInstanceType<As<Arg_T[K], any>>
 *             ]>
 *           }
 *         : Match<Arg_T, [
 *             (p: Type.AbstConstructorType) => Readonly<InstanceType<As<Arg_T, Type.AbstConstructorType>>>,
 *             (p: Type.CallableType) =>
 *                 (...args: As<Type.ToInstanceType<Parameters<As<Arg_T, Type.CallableType>>>, ReadonlyArray<any>>) =>
 *                     Type.ToInstanceType<ReturnType<As<Arg_T, Type.CallableType>>>,
 *             (p: IMut<ReadonlyArray<any>>) => Internal.TupleToInstances<As<As<Arg_T, IMut<ReadonlyArray<any>>>['imut'], ReadonlyArray<any>>>,
 *             (p: IMut<Type.AbstConstructorType>) => Readonly<InstanceType<As<Arg_T, IMut<Type.AbstConstructorType>>['imut']>>,
 *             (p: IMut<Type.CallableType>) =>
 *                 (...args: As<Type.ToInstanceType<Parameters<As<Arg_T, IMut<Type.CallableType>>['imut']>>, ReadonlyArray<any>>) =>
 *                     Type.ToInstanceType<ReturnType<As<Arg_T, IMut<Type.CallableType>>['imut']>>,
 *             (p: Mut<ReadonlyArray<any>>) => Internal.TupleToInstances<As<As<Arg_T, Mut<ReadonlyArray<any>>>['mut'], ReadonlyArray<any>>>,
 *             (p: Mut<Type.AbstConstructorType>) => InstanceType<As<Arg_T, Mut<Type.AbstConstructorType>>['mut']>,
 *             (p: Mut<Type.CallableType>) =>
 *                 (...args: As<Type.ToInstanceType<Parameters<As<Arg_T, Mut<Type.CallableType>>['mut']>>, ReadonlyArray<any>>) =>
 *                     Type.ToInstanceType<ReturnType<As<Arg_T, Mut<Type.CallableType>>['mut']>>,
 *         ]>
 * } Type.ToInstanceType <Arg_T>
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
 * @typedef {Type.ToInstanceType<(a: Mut<[NumberConstructor]>) => [NumberConstructor, BooleanConstructor]>} Test13
 * @typedef {Type.ToInstanceType<Mut<(a: [NumberConstructor]) => [NumberConstructor, BooleanConstructor]>>} Test17
 * @typedef {Type.ToInstanceType<Mut<[(a: [NumberConstructor]) => [NumberConstructor, BooleanConstructor]]>>} Test18
 * @typedef {Type.ToInstanceType<[(a: [NumberConstructor]) => [NumberConstructor, BooleanConstructor]]>} Test14
 * @typedef {Type.ToInstanceType<[(a: [NumberConstructor], b: [BooleanConstructor]) => [NumberConstructor, BooleanConstructor]]>} Test15
 */

///////////////////
// Type Checkers //
///////////////////

/**
 * @template T
 * @typedef {T extends ReadonlyArray<unknown> ? number extends T['length'] ? false : true : false} Type.IsTupleType <T>
 */

/**
 * @template T
 * @typedef {T extends Type.AbstConstructorType ? true : false} Type.IsConstructorType <T>
 */

/**
 * @template T
 * @typedef {T extends Type.CallableType ? true : false} Type.IsFunctionType <T>
 */

/**
 * @template T
 * @typedef {|
 *     T extends string | number | boolean | symbol | bigint
 *         ? (string extends T
 *             ? never
 *             : number extends T
 *                 ? never
 *                 : boolean extends T
 *                     ? never
 *                     : symbol extends T
 *                         ? never
 *                         : bigint extends T
 *                             ? never
 *                             : T
 *         )
 *         : never
 * } Type.IsLiteralType <T>
 */

////////////////////
// Type Utilities //
////////////////////
/**
 * @template T
 * @typedef {{[K in keyof T as K extends `_${string}` ? never : K]: T[K]}} Type.PickPublicKeys
 * - 객체 타입 T에서 `_`로 시작하지 않는 public 키와 해당 값만 골라내어 새로운 타입을 만듭니다.
 * - 이 타입은 최종적으로 외부에 노출될 객체의 형태를 정의하는 데 사용됩니다.
 */

/**
 * @template T
 * @typedef {{[K in keyof T]: T[K]} & {}} Internal.Prettify
 */

/**
 * @template T
 * @typedef {|
 *     T extends object
 *         ? (string extends keyof T
 *             ? true
 *             : number extends keyof T
 *                 ? true
 *                 : symbol extends keyof T
 *                     ? true
 *                     : (keyof T extends never
 *                         ? true
 *                         : { [K in keyof T]-?: T[K] } extends T ? true : false)
 *         )
 *         : false
 * } Type.IsExtensible <T>
 */

/**
 * @template T
 * @template U
 * @typedef {T extends U ? true : false} Type.IsSubType <T, U>
 */

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
 * @typedef {|
 *     T extends { [k: string]: unknown }
 *         ? T extends { [K in keyof T]: infer U }[keyof T]
 *             ? U
 *             : never
 *         : T extends Array<infer U>
 *             ? U
 *             : T extends (...args: Array<unknown>) => infer U
 *                 ? U
 *                 : T extends Promise<infer U>
 *                     ? U
 *                     : T
 * } Unwrap <T>
 */

/**
 * @template T
 * @typedef {{[K in keyof T]: T[K]} & {[P in Exclude<string, keyof T>]?: never}} Strict <T> - A type that ensures all properties of T are present and no additional properties are allowed.
 */

/**
 * @template T
 * @template X
 * @typedef {T & {[K in keyof X]: K extends keyof T ? X[K] : never}} Exact <T, X> - A type that ensures all properties of T are present and no additional properties are allowed.
 */
