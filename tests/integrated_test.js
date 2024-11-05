//@ts-check

import { TaggedUnion, Tuple } from "../src/lib.js";

const test1 = (() => {
    const Option = TaggedUnion.new()
        .variant("Some", [Number, String, [Boolean, Object, [Number]]])
        .variant("None")
        .build();


    console.log(Option);
    const some = Option.Some([1, "2", [true, {}, [1]]]);
    const none = Option.None;
})();
