//@ts-check

import { TaggedUnionConstructor, TaggedUnion } from "../src/lib.js";
import { Tuple1 } from "../src/primitives/tuple.js";

const test1 = (() => {
    const option = TaggedUnionConstructor.new()
        .variant('Some', Tuple1.new('value'))
        .variant('None')
        .build();

    console.log(option);
    const some = option.Some(42);
    const none = option.None();

    console.log(some);
    console.log(none);
})();
