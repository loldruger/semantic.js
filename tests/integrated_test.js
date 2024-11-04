//@ts-check

import { TaggedUnion, Tuple } from "../src/lib.js";

const test1 = (() => {
    const Option = TaggedUnion.new()
        .variant("Some", [Number, String, [Boolean, Object, [String]]])
        .variant("None")
        .build();

    console.log(Option);
    const some = Option.Some(42, "Hello, world!", ["Hello", 1, ["!"]]);
    const none = Option.None;


    // const Option2 = TaggedUnion.new()
    //     .variant("Some", [Number])
    //     .variant("None")
    //     .build();

    // const some2 = Option2.Some(42);
})();

/**
 * @typedef {Array<String|Number|Boolean>} Union
 */

/**
 * @template {Array<any>} T
 * @typedef {T extends infer U ? [T, ...Exclude<T, U>] : never} UnionToOrderedTuple
 */

/**
 * @param {UnionToOrderedTuple<Union>} args
 * @returns {Parameters<typeof test2>}
 */
const test2 = (...args) => args;


test2("Hello", 42, true);