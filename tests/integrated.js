//@ts-check

import { TaggedUnionConstructor, TaggedUnion } from "../src/lib.js";

const main = () => {
    const option = TaggedUnionConstructor.new()
        .variant('Some', { value: null })
        .variant('None')
        .build();

    console.log(option);
    const some = option.Some(42);
    const none = option.None();

    console.log(some);
    console.log(none);
}

main();