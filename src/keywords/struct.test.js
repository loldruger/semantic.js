//@ts-check

import { Struct, tuple, mut, Impl } from '../lib.js';

//@ts-ignore
const test0 = (() => {
    const struct = Struct.new()
        .prv("string", Boolean)
        .prv("tag", mut(Number))
        .build();

    console.log("Struct1: ", struct);
})();

//@ts-ignore
const test1 = (() => {
    let struct = Struct.new()
        .pub("string", mut(tuple(Number, Boolean)))
        .pub("tag", Number)
        .build();

    struct = {
        string: [1, true],
        tag: 11123,
    };

    console.log("Struct2: ", struct);
})();

//@ts-ignore
const test2 = (() => {
    const struct = Struct.new()
        .prv("string", mut(Boolean))
        .pub("tag", Number)
        .build();

    Impl.for(struct)
        .pub.const("CONST", 123)
        .pub.fn("fnName", (self, { a = Number, b = Number }) => {
            console.log("fnName called with: ", a, b);
        });



})();
