//@ts-check

import { Struct, tuple, mut, imut, Impl } from '../lib.js';

//@ts-ignore
const test0 = (() => {
    const struct = Struct.new()
        .prv.field("string", Boolean)
        .prv.field("tag", Number)
        .build();

    // struct._string = true; // Private field, not accessible outside
    // struct._tag = 123; // Private field, not accessible outside

    console.log("Struct1: ", struct);
})();

//@ts-ignore
const test1 = (() => {
    let struct = Struct.new()
        .pub.field("string", mut(tuple(Number, Boolean)))
        .pub.field("tag", Number)
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
        .prv.field("string", mut(Boolean))
        .pub.field("tag", Number)
        .build();

    Impl.for(struct, i => i
        .pub.const("CONST", 123)
        .prv.fn("fnName", (self, a = mut(Number), b = imut(Boolean)) => {
            console.log("fnName called with: ", self, a, b);
            return a;
        })
        .pub.const("CONST2", 123)
        .pub.fn("asyncFnName", async (self, a = mut(Number), b = imut(Boolean)) => {
            console.log("asyncFnName called with: ", self, a, b);
            return a;
        })
    );

    console.log("Struct3: ", struct);
    struct._string = true;
})();
