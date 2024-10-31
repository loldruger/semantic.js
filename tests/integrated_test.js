//@ts-check

import { TaggedUnion } from "../src/lib.js";
import { Tuple } from "../src/primitives/tuple.js";

const test1 = (() => {
    const Option = TaggedUnion.new()
        .variant("Some", Tuple(Number, String))
        .variant("None")
        .build();

    console.log(Option);
    const some = Option.Some(42, "Hello, world!");
    const none = Option.None();

    console.log(some);
    console.log(none);
})();
