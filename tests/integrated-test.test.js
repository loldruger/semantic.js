//@ts-check

import { Impl, TaggedUnion, TupleType } from "../src/lib.js";
import { Option } from "../src/types/option.js";

//@ts-ignore
const test1 = (() => {
    const Option = TaggedUnion.new()
        .variant("Some", Number)
        .variant("None")
        .build();

    console.log(Option);
    const some = Option.Some(1);
    const none = Option.None;

    console.log(some);
    console.log(none);

    Option.Some(2);

    console.assert(some === Option.Some(2));

    console.log(some);
})();

//@ts-ignore
const test2 = (() => {
    const Option = TaggedUnion.new()
        .variant("Some", TupleType(String, Number, String, TupleType(Boolean, Number, TupleType(Number))))
        .variant("None")
        .build();

    // console.log(Option);
    const some = Option.Some(["1", 1, "1", [true, 1, [1]]]);

    const none = Option.None;

    console.log(some);
    console.log(none);
})();

//@ts-ignore
const test3 = (() => {
    const SomeUnion = TaggedUnion.new()
        .variant("callable", () => String)
        .build();

    console.log(SomeUnion.callable(() => "Hello, World!"));
})();

//@ts-ignore
const test4 = (() => {
    /** @type {(a: String, b: Boolean) => StringConstructor} */
    const a = (a, b) => String;

    const SomeUnion = TaggedUnion.new()
        .variant("callable", TupleType(Number, a))
        .build();

    console.log(SomeUnion.callable([1, (a, b) => "Hello, World!"]));
})();

//@ts-ignore
const test5 = (() => {
    /** @type {(a: String) => [BooleanConstructor]} */
    const a = (_a) => TupleType(Boolean);

    const SomeUnion = TaggedUnion.new()
        .variant("callable", TupleType(Number, a))
        .build();

    console.log(SomeUnion.callable([1, (q) => [true]]));
})();

//@ts-ignore
const test6 = (() => {
    /** @type {(a: String) => [StringConstructor, BooleanConstructor, [NumberConstructor]]} */
    const a = (_a) => TupleType(String, Boolean, TupleType(Number));

    const SomeUnion = TaggedUnion.new()
        .variant("callable", TupleType(Number, a))
        .build();

    console.log(SomeUnion.callable([1, (q) => ["Hello, World!", true, [1]]]));
})();

//@ts-ignore
const test7 = (() => {
    /** @type {(a: [String, Number]) => StringConstructor} */
    const a = ([_a, _b]) => String;

    const SomeUnion = TaggedUnion.new()
        .variant("callable", TupleType(Number, a))
        .build();

    console.log(SomeUnion.callable([1, (q) => "Hello, World!"]));
})();

//@ts-ignore
const test8 = (() => {
    /** @type {(a: [String, Number]) => [StringConstructor, BooleanConstructor, [NumberConstructor]]} */
    const a = ([_a, _b]) => TupleType(String, Boolean, TupleType(Number));

    const SomeUnion = TaggedUnion.new()
        .variant("callable", TupleType(Number, a))
        .build();

    console.log(SomeUnion.callable([1, (q) => "Hello, World!"]));
})();

//@ts-ignore
const test9 = (() => {
    // const option = Option.Of(String);
    // const option1 = Option.Of(TupleType(Number, String));
    // const option2 = Option.Some(TupleType(1, "2"));
    const option3 = Option.Some(3);

    console.log("asdf " + option3.typeInfo);

})();

//@ts-ignore
const test10 = (() => {
    const Option = TaggedUnion.new()
        .variant("Some", Number)
        .variant("None")
        .build();

    const Opt = Impl.for(Option)
        .const("typeInfo", 1)
        .fn("qwe", ({ self, a }) => {
            self.aaa(); // cannot find function aaa
        })
        .fn("aaa", (self) => {
            console.log("yaho");
        })
        .staticFn("unwrap", (Self) => {

        })
        .build(true);

    console.log("Option: ", Opt.aaa({ a: 1 }));
})();
