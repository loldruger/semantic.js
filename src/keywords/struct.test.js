//@ts-check

import { tuple } from '../lib.js';
import { Impl } from './impl.js';
import { mut, imut } from './mut.js';
import { Struct } from './struct.js';

//@ts-ignore
const test0 = (() => {
    const struct = Struct.new()
        .field("string", Boolean)
        .field("tag", mut(Number))
        .build();

    struct.tag = 11;
    console.log("Struct: ", struct);
})();

//@ts-ignore
const test1 = (() => {
    const struct = Struct.new()
        .field("string", tuple(mut(Boolean), Number))
        .field("tag", mut(Number))
        .build();

    struct.tag = 1;
    console.log("Struct: ", struct);
})();