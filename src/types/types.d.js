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
 * @template {ReadonlyArray<any>} T
 * @typedef {T extends readonly [infer Head, ...infer Tail]
 *     ? [Type.ToInstanceType<Head>, ...Internal.TupleToInstances<Tail>]
 *     : []
 * } Internal.TupleToInstances <T>
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
// 각 빌더 호출에 대한 정보를 담는 타입입니다.
/**
 * @template {String} Name
 * @template {unknown} Value
 * @typedef {{ kind: 'pub_const', name: Name, value: Value }} PubConstDescriptor <Name, Value>
 */
/**
 * @template {String} Name
 * @template {unknown} Value
 * @typedef {{ kind: 'prv_const', name: `_${Name}`, value: Value }} PrvConstDescriptor <Name, Value>
 */
/**
 * @template {String} Name
 * @template {(self: unknown, ...args: ReadonlyArray<unknown>) => unknown} M
 * @typedef {{ kind: 'pub_fn', name: Name, method: M }} PubFnDescriptor <Name, M>
 */
/**
 * @template {String} Name
 * @template {(self: unknown, ...args: ReadonlyArray<unknown>) => unknown} M
 * @typedef {{ kind: 'prv_fn', name: `_${Name}`, method: M }} PrvFnDescriptor <Name, M>
 */
/**
 * @template {String} Name
 * @template {(self: unknown, ...args: ReadonlyArray<unknown>) => Promise<unknown>} M
 * @typedef {{ kind: 'pub_async_fn', name: Name, method: M }} PubAsyncFnDescriptor <Name, M>
 */

/**
 * @typedef {PubConstDescriptor<String, unknown> | PrvConstDescriptor<String, unknown> | PubFnDescriptor<String, any> | PrvFnDescriptor<String, any> | PubAsyncFnDescriptor<String, any>} AnyDescriptor
 */

      
// --- 타입 레벨 컴파일러(Type-Level Compiler) v3 ---

/**
 * @description 1단계: 매니페스트를 재귀적으로 순회하여 모든 멤버의 이름과 (아직 처리되지 않은) 타입을 포함하는 기본 인터페이스를 생성합니다.
 * @template {Object} Base
 * @template {ReadonlyArray<AnyDescriptor>} Manifest
 * @typedef {|
 *     Manifest extends readonly [infer Head, ...infer Tail]
 *         ? Head extends AnyDescriptor
 *             ? Tail extends ReadonlyArray<AnyDescriptor>
 *                 ? Internal.Prettify<Internal.TypeCompiler.CreateFullInterface<Base & Internal.TypeCompiler.DescriptorToProperty<Head>, Tail>>
 *                 : Base
 *             : Base
 *         : Base
 * } Internal.TypeCompiler.CreateFullInterface <Base, Manifest>
 */

/**
 * @description CreateFullInterface의 헬퍼 타입. 단일 디스크립터를 속성으로 변환합니다.
 * @template {AnyDescriptor} Desc
 * @typedef {|
 *     Desc extends { name: infer N, value: infer V }
 *         ? N extends String
 *             ? { [K in N]: V }
 *             : {}
 *         : Desc extends { name: infer N, method: infer M }
 *             ? N extends String
 *                 ? { [K in N]: M }
 *                 : {}
 *             : {}
 * } Internal.TypeCompiler.DescriptorToProperty <Desc>
 */

/**
 * @description 2단계: 완전한 'SelfType'을 사용하여 각 함수의 'self' 매개변수 타입을 올바르게 지정합니다.
 * @template {Object} SelfType
 * @template {ReadonlyArray<AnyDescriptor>} Manifest
 * @typedef {|
 *     Manifest extends readonly [infer Head, ...infer Tail]
 *         ? Head extends AnyDescriptor
 *             ? Tail extends ReadonlyArray<AnyDescriptor>
 *                 ? Internal.TypeCompiler.ResolveFunctionSignatures<SelfType, Tail> & Internal.TypeCompiler.DescriptorToResolvedProperty<SelfType, Head>
 *                 : Internal.TypeCompiler.DescriptorToResolvedProperty<SelfType, Head>
 *             : {}
 *         : {}
 * } Internal.TypeCompiler.ResolveFunctionSignatures <SelfType, Manifest>
 */

/**
 * @description ResolveFunctionSignatures의 헬퍼 타입. 디스크립터를 'self' 타입이 적용된 완전한 속성으로 변환합니다.
 * @template {Object} SelfType
 * @template {AnyDescriptor} Desc
 * @typedef {|
 *     Desc extends { kind: 'pub_const' | 'prv_const', name: infer N, value: infer V }
 *         ? N extends String
 *             ? Readonly<{ [K in N]: V }>
 *             : {}
 *         : Desc extends { name: infer N, method: (self: any, ...args: infer A) => infer R }
 *             ? N extends String
 *                 ? { [K in N]: (self: SelfType, ...args: A) => R }
 *                 : {}
 *             : {}
 * } Internal.TypeCompiler.DescriptorToResolvedProperty <SelfType, Desc>
 */

/**
 * @description 3단계: 'self'가 바인딩되어 제거된 최종 함수 시그니처를 가진 객체 타입을 생성합니다.
 * @template {Object} SelfType
 * @template {ReadonlyArray<AnyDescriptor>} Manifest
 * @typedef {|
 *     Manifest extends readonly [infer Head, ...infer Tail]
 *         ? Head extends AnyDescriptor
 *             ? Tail extends ReadonlyArray<AnyDescriptor>
 *                 ? Internal.TypeCompiler.BindSelfToMethods<SelfType, Tail> & Internal.TypeCompiler.DescriptorToBoundMethod<SelfType, Head>
 *                 : Internal.TypeCompiler.DescriptorToBoundMethod<SelfType, Head>
 *             : {}
 *         : {}
 * } Internal.TypeCompiler.BindSelfToMethods <SelfType, Manifest>
 */

/**
 * @description BindSelfToMethods의 헬퍼 타입.
 * @template {Object} SelfType
 * @template {AnyDescriptor} Desc
 * @typedef {|
 *     Desc extends { kind: 'pub_const' | 'prv_const', name: infer N, value: infer V }
 *         ? N extends String ? Readonly<{ [K in N]: V }> : {}
 *         : Desc extends { name: infer N, method: (self: unknown, ...args: infer A) => infer R }
 *             ? N extends String ? { [K in N]: (self: SelfType, ...args: A) => R } : {}
 *             : {}
 * } Internal.TypeCompiler.DescriptorToBoundMethod <SelfType, Desc>
 */

// --- 컴파일러 진입점(Entry Points) ---

/**
 * @description [진입점 1] 빌더 콜백 내의 'self' 타입을 결정합니다. 모든 멤버와 그 시그니처가 포함된 완전한 타입입니다.
 * @template {Object} Target
 * @template {ReadonlyArray<AnyDescriptor>} Manifest
 * @typedef {|
 *     Internal.Prettify<
 *         Target & Internal.TypeCompiler.ResolveFunctionSignatures<
 *             Internal.Prettify<Target & Internal.TypeCompiler.CreateFullInterface<Target, Manifest>>,
 *             Manifest
 *         >
 *     >
 * } Internal.TypeCompiler.ResolveSelfTypeForBuilder <Target, Manifest>
 */

/**
 * @description [진입점 2] 최종 빌드 결과물의 타입을 결정합니다. Public 멤버만 필터링하고, self가 바인딩된 최종 함수 시그니처를 포함합니다.
 * @template {Object} Target
 * @template {ReadonlyArray<AnyDescriptor>} Manifest
 * @typedef {|
 *     Type.PickPublicKeys<
 *         Target & Internal.TypeCompiler.BindSelfToMethods<
 *             Internal.Prettify<Target & Internal.TypeCompiler.CreateFullInterface<Target, Manifest>>,
 *             Manifest
 *         >
 *     >
 * } Internal.TypeCompiler.ResolveImplementation <Target, Manifest>
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
 * @typedef {|
 *     keyof T extends never
 *         ? {}
 *         : {[K in keyof T as K extends `_${string}`
 *             ? never
 *             : K
 *         ]: T[K]}
 * } Type.PickPublicKeys <T>
 */

/**
 * @template T
 * @typedef {{[K in keyof T]: T[K]} & {}} Internal.Prettify <T>
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
 * @template X
 * @template Y
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
