//@ts-check

import { TaggedUnion } from "../lib";

export const EnumConcreteType = TaggedUnion.new()
    .variant('number', Number)
    .variant('string', String)
    .variant('boolean', Boolean)
    .variant('function', Function)
    .variant('array', Array)
    .variant('object', Object)
    .variant('bigint', BigInt)
    .variant('symbol', Symbol)
    .variant('undefined', /** @type {undefined} */(void 0))
    .build();

/**
 * @readonly
 * @enum {ConstructableTypeUnion=}
 */
export const EnumConcreteTypeBaked = {
    'number': Number,
    'string': String,
    'boolean': Boolean,
    'function': Function,
    'array': Array,
    'object': Object,
    'bigint': BigInt,
    'symbol': Symbol,
    'undefined': /** @type {undefined} */(void 0)
};
