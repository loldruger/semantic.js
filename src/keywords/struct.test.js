//@ts-check

import { TupleType } from '../lib.js';
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