//@ts-check

import { TaggedUnion } from "../src/lib.js";
import { Tuple, Tuple0, Tuple3 } from "../src/lib.js";

const test1 = (() => {
    /**'
     * @type {{
     *     Some: (a: number, b: string, c: Number) => { _0: number, _1: string, _2: Number },
     *     None: {}
     * }}
     */
    const Option = TaggedUnion.new()
        .variant('Some', Tuple3.new(Number, String, Number))
        .variant('None')
        .build();

    console.log(Option);
    /** @type {ReturnType<typeof Option.Some> | typeof Option.None} */
    let data = Option.Some(42, 'Hello, world!', 3.14);

    console.log(data);

    data = Option.None;

    console.log(data);
})();
