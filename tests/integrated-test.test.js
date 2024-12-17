//@ts-check

import { Impl, TupleType, Struct } from "../src/lib.js";

//@ts-ignore
const test1 = (() => {
    const struct = Struct.new()
        .field("Some", TupleType(TupleType(String), Number, String, TupleType(Boolean, Number, TupleType(Number))))
        .field("None", String)
        .build();

    // const some = struct.Some([["1"], 1, "1", [true, 1, [1]]]);

    // const none = struct.None;

    // console.log(some);
    // console.log(none);
})();

//@ts-ignore
const test2 = (() => {

})();

//@ts-ignore
const test3 = (() => {
    const struct = Struct.new()
        .field("callable", () => String)
        .build();

    // console.log(struct.callable(() => "Hello, World!"));
})();

//@ts-ignore
const test4 = (() => {
    /** @type {(a: String, b: Boolean) => StringConstructor} */
    const a = (_a, _b) => String;

    const struct = Struct.new()
        .field("callable", TupleType(Number, a))
        .build();

    // console.log(struct.callable([1, (_a) => "Hello, World!"]));
})();

//@ts-ignore
const test5 = (() => {
    /** @type {(a: String) => [BooleanConstructor]} */
    const a = (_a) => TupleType(Boolean);

    const struct = Struct.new()
        .field("callable", TupleType(Number, a))
        .build();

    // console.log(struct.callable([1, (_q) => [true]]));
})();

//@ts-ignore
const test6 = (() => {
    /** @type {(a: String) => [StringConstructor, BooleanConstructor, [NumberConstructor]]} */
    const a = (_a) => TupleType(String, Boolean, TupleType(Number));

    const struct = Struct.new()
        .field("callable", TupleType(Number, a))
        .build();

    // console.log(struct.callable([1, (_q) => ["Hello, World!", true, [1]]]));
})();

//@ts-ignore
const test7 = (() => {
    /** @type {(a: [String, Number]) => StringConstructor} */
    const a = ([_a, _b]) => String;

    const struct = Struct.new()
        .field("callable", TupleType(Number, a))
        .build();

    // console.log(struct.callable([1, (_q) => "Hello, World!"]));
})();

//@ts-ignore
const test8 = (() => {
    /** @type {(a: [String, Number]) => [StringConstructor, BooleanConstructor, [NumberConstructor]]} */
    const a = ([_a, _b]) => TupleType(String, Boolean, TupleType(Number));

    const struct = Struct.new()
        .field("callable", TupleType(Number, a))
        .build();

    // console.log(struct.callable([1, (_q) => ["Hello, World!", true, [1]]]));
})();

//@ts-ignore
const test9 = (() => {


})();

