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
    const struct = Struct.new()
        .pub("string", mut(tuple(Number, Boolean)))
        .pub("tag", Number)
        .build();

    struct.new({
        string: [1, true],
        tag: 11123
    });

    console.log("Struct2: ", struct);
})();

//@ts-ignore
const test2 = (() => {
    //     const struct = Struct.new()
    //         .prv("string", mut(Boolean))
    //         .pub("tag", Number)
    //         .build();

    //     const impl = Impl.for(struct)
    //         .staticFn("new2", ({ Self, Args: { a: mut(Boolean), b: Number } }) => {
    //     return Self.new({
    //         string: a,
    //         tag: b
    //     });
    // })
    //         .staticFn("staticFunc2", ({ Self, a: Number }) => {
    //     return Self.tag;
    // })
    //     .fn("getTag", ({ self }) => {
    //         return self.tag;
    //     })
    //     .build(true);

    // impl.new2({ a: [1, true], b: 123 });
    // console.log("Struct3: ", struct);
})();
