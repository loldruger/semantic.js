//@ts-check

import { Impl, tuple, Struct, TaggedUnion } from "../src/lib.js";

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
        .prv("callable", () => String)
        .build();

    // console.log(struct.callable(() => "Hello, World!"));
})();

//@ts-ignore
const test4 = (() => {
    /** @type {(a: String, b: Boolean) => StringConstructor} */
    const a = (_a, _b) => String;

    const struct = Struct.new()
        .prv("callable", tuple(Number, a))
        .build();

    // console.log(struct.callable([1, (_a) => "Hello, World!"]));
})();

//@ts-ignore
const test5 = (() => {
    /** @type {(a: String) => [BooleanConstructor]} */
    const a = (_a) => tuple(Boolean);

    const struct = Struct.new()
        .prv("callable", tuple(Number, a))
        .build();

    // console.log(struct.callable([1, (_q) => [true]]));
})();

//@ts-ignore
const test6 = (() => {
    /** @type {(a: String) => [StringConstructor, BooleanConstructor, [NumberConstructor]]} */
    const a = (_a) => tuple(String, Boolean, tuple(Number));

    const struct = Struct.new()
        .prv("callable", tuple(Number, a))
        .build();

    // console.log(struct.callable([1, (_q) => ["Hello, World!", true, [1]]]));
})();

//@ts-ignore
const test7 = (() => {
    /** @type {(a: [String, Number]) => StringConstructor} */
    const a = ([_a, _b]) => String;

    const struct = Struct.new()
        .prv("callable", tuple(Number, a))
        .build();

    // console.log(struct.callable([1, (_q) => "Hello, World!"]));
})();

//@ts-ignore
const test8 = (() => {
    /** @type {(a: [String, Number]) => [StringConstructor, BooleanConstructor, [NumberConstructor]]} */
    const a = ([_a, _b]) => tuple(String, Boolean, tuple(Number));

    const struct = Struct.new()
        .prv("callable", tuple(Number, a))
        .build();

    // console.log(struct.callable([1, (_q) => ["Hello, World!", true, [1]]]));
})();

//@ts-ignore
const test9 = (() => {

})();

