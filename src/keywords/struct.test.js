//@ts-check

import { Impl, Struct } from '../lib.js';

//@ts-ignore
const test10 = (() => {
    const struct = Struct.new()
        .field("tag", Number)
        .field("string", String)
        .build();

    const Opt = Impl.for(struct)
        .fn("some", ({ self, x }) => {
            self?.tag = 1;
        })
        .fn("isSome", ({ self }) => {
            // self?.string = "Hello, World!";

            return self?.string;
        })
        .fn("isNone", ({ self }) => {

        })
        .build(true);

    console.log("Struct: ", Opt.some({ x: 1 }));
})();