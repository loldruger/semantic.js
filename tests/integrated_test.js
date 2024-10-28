//@ts-check

import { TaggedUnion } from "../src/lib.js";
import { Tuple, Tuple0, Tuple2 } from "../src/lib.js";

const test1 = (() => {
    const option = TaggedUnion.new()
        .variant('Some', Tuple2.new(Number, String))
        .variant('None')
        .build();

    console.log(option);
    let data = option.Some(42, 'Hello, world!');

    console.log(data);

    data = option.None;

    console.log(data);

})();
