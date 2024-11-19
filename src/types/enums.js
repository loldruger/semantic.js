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

// /**
//  * @typedef {Readonly<{
// * readonly 'number': NumberConstructor,
// * readonly 'string': StringConstructor,
// * readonly 'boolean': BooleanConstructor,
// * readonly 'function': FunctionConstructor,
// * readonly 'array': ArrayConstructor,
// * readonly 'object': ObjectConstructor,
// * readonly 'bigint': BigIntConstructor,
// * readonly 'symbol': SymbolConstructor,
// * readonly 'undefined': undefined,
// * readonly 'null': null
// * }>} EnumConcreteType
// */

// /**
// * @enum {EnumConcreteType}
// */
// export const ConcreteTypes = Object.freeze({
//    'number': Number,
//    'string': String,
//    'boolean': Boolean,
//    'function': Function,
//    'array': Array,
//    'object': Object,
//    'bigint': BigInt,
//    'symbol': Symbol,
//    'undefined': /** @type {undefined} */ (void 0),
//    'null': null
// });
