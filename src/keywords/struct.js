// @ts-check

/**
 * @template T
 * @typedef {{[K in keyof T]: T[K]} & {}} Prettify
 */

/**
 * @template {String} Field
 * @template {Internal.UnknownTypes} T
 * @typedef {Record<Field, Type.ToInstanceType<T>>} StructType
 */

/**
 * @template {StructType<String, Internal.UnknownTypes>} Pubs
 * @template {StructType<String, Internal.UnknownTypes>} Prvs
 */
export class Struct {
    #pubs = /** @type {Pubs} */ (Object.create(null));
    #prvs = /** @type {Prvs} */ (Object.create(null));

    /**
     * @description Public members builder
     * @type {{
     * field: <Name extends String, TypeInfo extends Internal.UnknownTypes>(name: Name, type: TypeInfo) => Struct<Pubs & StructType<Name, TypeInfo>, Prvs>
     * }}
     */
    pub;

    /**
     * @description Private members builder
     * @type {{
     * field: <Name extends String, TypeInfo extends Internal.UnknownTypes>(name: Name, type: TypeInfo) => Struct<Pubs, Prvs & StructType<`_${Name}`, TypeInfo>>
     * }}
     */
    prv;

    /** @private */
    constructor() {
        this.pub = {
            field: (name, type) => {
                /** @type {Record<string, unknown>} */(this.#pubs)[name] = undefined;
                return /** @type {*} */ (this);
            }
        };
        this.prv = {
            field: (name, type) => {
                /** @type {Record<string, unknown>} */(this.#prvs)[`_${name}`] = undefined;
                return /** @type {*} */ (this);
            }
        };
    }

    /** @returns {Struct<{}, {}>} */
    static new() {
        return new Struct();
    }

    /**
     * @returns {Prettify<Pubs & Prvs>}
     */
    build() {
        return /** @type {Prettify<Pubs & Prvs>} */(Object.assign(this.#pubs, this.#prvs));
    }
}

Object.setPrototypeOf(Struct, null);
Object.setPrototypeOf(Struct.prototype, null);

