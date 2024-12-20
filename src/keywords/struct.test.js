//@ts-check

import { Struct, tuple, mut } from '../lib.js';

//@ts-ignore
const test0 = (() => {
    const struct = Struct.new()
        .field("string", Boolean)
        .field("tag", mut(Number))
        .build();

    // should error
    struct.tag = 11;
    console.log("Struct: ", struct);
})();

//@ts-ignore
const test1 = (() => {
    const struct = Struct.new()
        .field("string", tuple(Number, mut(Boolean)))
        .field("tag", Number)
        .build();

    struct.init({
        string: [1, true],
        tag: 11123
    });

    console.log("Struct: ", struct);
})();
