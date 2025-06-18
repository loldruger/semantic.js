//@ts-check

import { TaggedUnion } from "../lib.js";

export const EnumConstructorType = TaggedUnion.new()
    .variant("number", Number)
    .variant("string", String)
    .variant("boolean", Boolean)
    .variant("function", Function)
    .variant("array", Array)
    .variant("object", Object)
    .variant("bigint", BigInt)
    .variant("symbol", Symbol)
    .variant("undefined", void 0)
    .build();

/**
 * @readonly
 * @enum {Internal.ConstructableTypeUnion?}
 */
export const EnumConstructorTypeBaked = {
    number: Number,
    string: String,
    boolean: Boolean,
    function: Function,
    array: Array,
    object: Object,
    bigint: BigInt,
    symbol: Symbol,
    undefined: null,
};
