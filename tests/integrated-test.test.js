//@ts-check

import { Impl, tuple, Struct, TaggedUnion, mut, imut } from "../src/lib.js";

//@ts-ignore
const test1 = (() => {
    const taggedUnion = TaggedUnion.new()
        .variant("Some", tuple(tuple(String), Number, String, tuple(Boolean, Number, tuple(Number))))
        .variant("None", String)
        .build();

    // const some = struct.Some([["1"], 1, "1", [true, 1, [1]]]);

    // const none = struct.None;

    // console.log(some);
    // console.log(none);
})();

//@ts-ignore
const test2 = (() => {
    const taggedUnion = TaggedUnion.new()
        .variant("Some")
        // .variant("None")
        .build();
})();

//@ts-ignore
const test3 = (() => {
    const struct = Struct.new()
        .prv.field("callable", () => String)
        .build();

    // console.log(struct.callable(() => "Hello, World!"));
})();

//@ts-ignore
const test4 = (() => {
    /** @type {(a: String, b: Boolean) => StringConstructor} */
    const a = (_a, _b) => String;

    const struct = Struct.new()
        .prv.field("callable", tuple(Number, a))
        .build();

    // console.log(struct.callable([1, (_a) => "Hello, World!"]));
})();

//@ts-ignore
const test5 = (() => {
    /** @type {(a: String) => [BooleanConstructor]} */
    const a = (_a) => tuple(Boolean);

    const struct = Struct.new()
        .prv.field("callable", tuple(Number, a))
        .build();

    // console.log(struct.callable([1, (_q) => [true]]));
})();

//@ts-ignore
const test6 = (() => {
    /** @type {(a: String) => [StringConstructor, BooleanConstructor, [NumberConstructor]]} */
    const a = (_a) => tuple(String, Boolean, tuple(Number));

    const struct = Struct.new()
        .prv.field("callable", tuple(Number, a))
        .build();

    // console.log(struct.callable([1, (_q) => ["Hello, World!", true, [1]]]));
})();

//@ts-ignore
const test7 = (() => {
    /** @type {(a: [String, Number]) => StringConstructor} */
    const a = ([_a, _b]) => String;

    const struct = Struct.new()
        .prv.field("callable", tuple(Number, a))
        .build();

    // console.log(struct.callable([1, (_q) => "Hello, World!"]));
})();

//@ts-ignore
const test8 = (() => {
    /** @type {(a: [String, Number]) => [StringConstructor, BooleanConstructor, [NumberConstructor]]} */
    const a = ([_a, _b]) => tuple(String, Boolean, tuple(Number));

    const struct = Struct.new()
        .prv.field("callable", tuple(Number, a))
        .build();

    // console.log(struct.callable([1, (_q) => ["Hello, World!", true, [1]]]));
})();

//@ts-ignore
const test9 = (() => {

})();

// @ts-check
const test0 = (() => {



    // 1. 테스트할 기본 객체 타입
    /** @typedef {{ _string: boolean, tag: number }} MyStruct */

    // 2. 사용자가 Impl.for에서 호출했다고 가정한 동작들의 Manifest
    /**
     * @typedef {[
     *  { kind: 'pub_const', name: 'CONST', value: 123 },
     *  { kind: 'prv_fn', name: '_fnName', method: (self: unknown, a: Mut<number>, b: IMut<boolean>) => Mut<number> },
     *  { kind: 'pub_async_fn', name: 'asyncFnName', method: (self: unknown, a: Mut<number>, b: IMut<boolean>) => Promise<Mut<number>> }
     * ]} MyManifest
     */

    // 3. 우리의 타입 컴파일러를 직접 실행!
    /**
     * @typedef {Internal.Prettify<Internal.TypeCompiler.ResolveImplementation<MyStruct, MyManifest>>} FinalType
     */

    /** @type {FinalType} */
    let result;

    // 이제 VSCode에서 `result` 변수에 마우스를 올려보세요.
    // 예상되는 타입은 다음과 같아야 합니다:
    /*
    let result: {
        tag: number;
        readonly CONST: 123;
        asyncFnName: (self: {
            readonly tag: number;
            readonly _string: boolean;
            readonly CONST: 123;
            readonly _fnName: (self: any, a: Mut<number>, b: IMut<boolean>) => Mut<number>; // Self 타입이 올바르게 적용되어야 함
            readonly asyncFnName: (self: any, a: Mut<number>, b: IMut<boolean>) => Promise<Mut<number>>; // Self 타입이 올바르게 적용되어야 함
        }, a: Mut<number>, b: IMut<boolean>) => Promise<Mut<number>>;
    }
    */

    // 그리고 `FinalType`의 `asyncFnName` 내부의 `self` 매개변수 타입에
    // `_string`, `tag`, `CONST`, `_fnName`, `asyncFnName`이 모두 포함되어 있는지 확인하세요.
})();

const test10 = (() => {
    /** @typedef {{ tag: number, _string: boolean }} MockTarget */

    /**
     * @typedef {[
     *   { kind: 'pub_const', name: 'CONST', value: 123 },
     *   { kind: 'prv_fn', name: '_fnName', method: (self: any, a: number) => number },
     *   { kind: 'pub_async_fn', name: 'asyncFnName', method: (self: any, b: boolean) => Promise<number> }
     * ]} MockManifest
     */

    /**
     * `Internal.CreateFullInterface`가 `self`의 완전한 형태를 만드는지 테스트합니다.
     * @typedef {Internal.Prettify<
     *   Internal.TypeCompiler.CreateFullInterface<MockTarget, MockManifest>
     * >} Test_SelfType
     *
     * // 예상 결과 (IDE에서 마우스를 올려 확인):
     * // type Test_SelfType = {
     * //   tag: number;
     * //   _string: boolean;
     * //   CONST: 123;
     * //   _fnName: (self: any, a: number) => number;
     * //   asyncFnName: (self: any, b: boolean) => Promise<number>;
     * // }
     */

    /**
     * 최종 구현이 `self` 타입을 올바르게 주입하고 public만 남기는지 테스트합니다.
     * @typedef {Internal.Prettify<
     *   Internal.TypeCompiler.ResolveImplementation<MockTarget, MockManifest>
     * >} Test_FinalPublicType
     *
     * // 예상 결과 (IDE에서 마우스를 올려 확인):
     * // type Test_FinalPublicType = {
     * //   tag: number;
     * //   readonly CONST: 123;
     * //   readonly asyncFnName: (self: Test_SelfType, b: boolean) => Promise<number>;
     * // }
     * // 참고: self 타입이 재귀적으로 올바르게 들어가야 성공입니다.
     */

    /** @type {Internal.TypeCompiler.ResolveImplementation<MockTarget, MockManifest>} */
    const a;
})();