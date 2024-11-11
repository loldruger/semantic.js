//@ts-check

import { TaggedUnion, TupleType } from "../src/lib.js";

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
