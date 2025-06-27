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
 * @typedef {{__message: `${"ERROR: "}${Message}`,  __brand: 'Error' }} Type.Error <Message>
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
 * @typedef {T extends U ? T : Type.Error<"Failed assertion"> & never} As <T, U>
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

/**
 * =================================================================================
 * 타입 레벨 고정점 조합기 (Y-Combinator) - 인터페이스 재귀 패턴 (최종본)
 * =================================================================================
 */

// --- 매니페스트 디스크립터(Manifest Descriptors) ---
/**
 * @template {string} Name
 * @template {unknown} Value
 * @typedef {{ kind: 'pubConst', name: Name, value: Value }} PubConstDescriptor
 */
/**
 * @template {string} Name
 * @template {unknown} Value
 * @typedef {{ kind: 'prvConst', name: Name, value: Value }} PrvConstDescriptor
 */
/**
 * @template {string} Name
 * @template {Function} M
 * @typedef {{ kind: 'pubFn', name: Name, method: M }} PubFnDescriptor
 */
/**
 * @template {string} Name
 * @template {Function} M
 * @typedef {{ kind: 'prvFn', name: Name, method: M }} PrvFnDescriptor
 */
/**
 * @template {string} Name
 * @template {Function} M
 * @typedef {{ kind: 'pubAsyncFn', name: Name, method: M }} PubAsyncFnDescriptor
 */

/**
 * @typedef {PubConstDescriptor<any, any> | PrvConstDescriptor<any, any> | PubFnDescriptor<any, any> | PrvFnDescriptor<any, any> | PubAsyncFnDescriptor<any, any>} Internal.AnyDescriptor
 */

// --- 타입 레벨 컴파일러(Type-Level Compiler) ---
/**
 * @private
 * @description Manifest 배열에서 모든 디스크립터의 `name` 속성을 유니온 타입으로 추출합니다.
 * @template {ReadonlyArray<Internal.AnyDescriptor>} Manifest
 * @typedef {Manifest[number]['name']} Internal.ManifestKeys
 */
/** @private */
/**
 * @template {string} Name
 * @template {ReadonlyArray<Internal.AnyDescriptor>} Manifest
 * @template {object} SelfType
 * @typedef {Extract<Manifest[number], { name: Name }> extends infer Desc
 *   ? Desc extends { kind: 'pubConst' | 'prvConst', value: infer V }
 *     ? Readonly<V>
 *     : Desc extends { method: (...args: [any, ...infer A]) => infer R }
 *       ? (self: SelfType, ...args: A) => R
 *       : Desc extends { method: () => infer R }
 *         ? (self: SelfType) => R
 *         : never
 *   : never
 * } Internal.ResolveDescriptor
 */
/**
 * @description 1단계: Manifest를 순회하며 모든 멤버의 "초안"을 포함하는 단일 객체 타입을 빌드합니다.
 * 이 단계의 함수 시그니처는 `self` 타입이 아직 확인되지 않은 상태입니다.
 * @template {object} Base
 * @template {ReadonlyArray<Internal.AnyDescriptor>} Manifest
 * @typedef {Manifest extends readonly [infer Head, ...infer Tail]
 *   ? Head extends Internal.AnyDescriptor
 *     ? Tail extends ReadonlyArray<Internal.AnyDescriptor>
 *       ? Internal.CreateFullInterface<Base & Internal.DescriptorToProperty<Head>, Tail>
 *       : Base
 *     : Base
 *   : Base
 * } Internal.CreateFullInterface
 */

/**
 * @description CreateFullInterface의 헬퍼 타입. 단일 디스크립터를 속성(오염된 타입)으로 변환합니다.
 * @template {Internal.AnyDescriptor} Desc
 * @typedef {Desc extends { name: infer N, value: infer V }
 *    ? N extends string ? { [K in N]: V } : {}
 *    : Desc extends { name: infer N, method: infer M }
 *      ? N extends string ? { [K in N]: M } : {}
 *      : {}
 * } Internal.DescriptorToProperty
 */

/**
 * @description 2단계: "전지적 Self 타입"을 사용하여 각 함수의 'self' 매개변수 타입을 올바르게 교체합니다.
 * 이것은 이전과 달리, `SelfType`의 속성들을 "덮어쓰는(override)" 방식으로 동작합니다.
 * @template {object} SelfType
 * @template {ReadonlyArray<Internal.AnyDescriptor>} Manifest
 * @typedef {{
 *   [K in keyof SelfType]: K extends Internal.ExtractFunctionNames<Manifest>
 *     ? Internal.FindAndResolveDescriptor<K, Manifest, SelfType>
 *     : SelfType[K]
 * }} Internal.ResolveFunctionSignatures
 */

/**
 * @description ResolveFunctionSignatures의 헬퍼 타입. 디스크립터를 완전히 확인된 함수 시그니처를 가진 속성으로 변환합니다.
 * @template {object} SelfType
 * @template {Internal.AnyDescriptor} Desc
 * @typedef {Desc extends { kind: 'pubConst' | 'prvConst', name: infer N, value: infer V }
 *    ? N extends string ? Readonly<{ [K in N]: V }> : {}
 *    : Desc extends { name: infer N, method: (firstArg: any, ...args: infer A) => infer R }
 *      ? N extends string ? { [K in N]: (self: SelfType, ...args: A) => R } : {}
 *      : Desc extends { name: infer N, method: () => infer R }
 *        ? N extends string ? { [K in N]: (self: SelfType) => R } : {}
 *        : {}
 * } Internal.DescriptorToResolvedProperty
 */

/**
 * @description 타입 레벨 컴파일러의 주 진입점.
 * @template {object} TTarget
 * @template {ReadonlyArray<Internal.AnyDescriptor>} Manifest
 * @typedef {|
 *    Internal.Prettify<
 *      Type.PickPublicKeys<
 *        Internal.FinalType<TTarget, Manifest>
 *      >
 *    >
 * } Internal.ResolveImplementation
 */

/** @helper */
/**
 * @template {ReadonlyArray<Internal.AnyDescriptor>} Manifest
 * @typedef {Extract<Manifest[number], { kind: 'pubFn' | 'prvFn' | 'pubAsyncFn' }>['name']} Internal.ExtractFunctionNames
 */

/** @helper */
/**
 * @template {string} Name
 * @template {ReadonlyArray<Internal.AnyDescriptor>} Manifest
 * @template {object} SelfType
 * @typedef {Extract<Manifest[number], { name: Name }> extends { method: (...args: [any, ...infer A]) => infer R }
 *   ? (self: SelfType, ...args: A) => R
 *   : Extract<Manifest[number], { name: Name }> extends { method: () => infer R }
 *     ? (self: SelfType) => R
 *     : never
 * } Internal.FindAndResolveDescriptor
 */
/** @private */
/**
 * @template {object} Base
 * @template {ReadonlyArray<Internal.AnyDescriptor>} Manifest
 * @typedef {{
 *   [K in keyof Base | Internal.ManifestKeys<Manifest>]:
 *     K extends Internal.ManifestKeys<Manifest>
 *       ? Internal.ResolveDescriptor<K & string, Manifest, Internal.FinalType<Base, Manifest>>
 *       : K extends keyof Base
 *         ? Base[K]
 *         : never
 * }} Internal.FinalType
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
 * @memberof Type
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
