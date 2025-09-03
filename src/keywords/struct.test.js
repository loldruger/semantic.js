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

    const result = Impl.for(struct)
        .pub.const("CONST", 123)
        .prv.fn("fnName", (self, a = mut(Number), b = imut(Boolean)) => {
            console.log("fnName called with: ", self, a, b);
            return a;
        })
        .pub.const("CONST2", 123)
        .pub.async.fn("asyncFnName", async (self, a = mut(Number), b = imut(Boolean)) => {
            console.log("asyncFnName called with: ", self, a, b);
            return a;
        })
        .build();

    console.log("Struct3: ", result);

    // @ts-expect-error - Private field access now properly detected by TypeScript
    result._string = false;

    // @ts-expect-error - Private method access now properly detected by TypeScript
    result._fnName(1, 1)
})();

//@ts-ignore
const test3 = (() => {
    const struct = Struct.new()
        .build();

    console.log("Struct3: ", struct);
});