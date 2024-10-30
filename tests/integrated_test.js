//@ts-check

import { TaggedUnion } from "../src/lib.js";
import { Tuple, Tuple1, Tuple3 } from "../src/lib.js";

const test1 = (() => {
    const Option = TaggedUnion.new()
        .variant("Some", [Number, String])
        .variant("None")
        .build();

    const some = Option.Some(42, "Hello, world!");
    const none = Option.None;

    console.log(some);
    console.log(none);

    /**
     * @type {Number & String}
     */
    let a;
})();
