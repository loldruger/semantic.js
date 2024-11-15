/**
 * @typedef {Readonly<Object>} EnumConcreteType
 * @property {NumberConstructor} number
 * @property {StringConstructor} string
 * @property {BooleanConstructor} boolean
 * @property {FunctionConstructor} function
 * @property {ArrayConstructor} array
 * @property {ObjectConstructor} object
 * @property {BigIntConstructor} bigint
 * @property {SymbolConstructor} symbol
 * @property {undefined} undefined
 * @property {null} null
 */

/**
 * @enum {EnumConcreteType}
 */
export const ConcreteTypes = Object.freeze({
    'number': Number,
    'string': String,
    'boolean': Boolean,
    'function': Function,
    'array': Array,
    'object': Object,
    'bigint': BigInt,
    'symbol': Symbol,
    'undefined': /** @type {undefined} */ (void 0),
    'null': null
});
