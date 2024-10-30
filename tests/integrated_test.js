//@ts-check

import { TaggedUnion } from "../src/lib.js";

const test1 = (() => {
    const Option = TaggedUnion.new()
        .variant("Some", [Number, String])
        .variant("None")
        .build();

    console.log(Option);
    const some = Option.Some(42, "Hello, world!");
    const none = Option.None;

    console.log(some);
    console.log(none);
})();
