//@ts-check

import { TaggedUnion, TupleType } from "../src/lib.js";
import { Option } from "../src/option.js";

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

const test3 = (() => {
    const option = Option.Of(TupleType(Number, String));
    const option2 = Option.Some(TupleType(1, "2"));


    console.log("asdf " + option2.typeInfo);
})();