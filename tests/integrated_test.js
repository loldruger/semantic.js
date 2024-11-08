//@ts-check

import { TaggedUnion, TupleType } from "../src/lib.js";

const test1 = (() => {
    const Option = TaggedUnion.new()
        .variant("Some", TupleType(String, Number, String, TupleType(Boolean, Number, TupleType(Number))))
        .variant("None")
        .build();

    console.log(Option);
    const some = Option.Some(["1", 1, "1", [true, 1, [1]]]);
    const none = Option.None;
})();
