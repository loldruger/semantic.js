// @ts-check

/**
 * @template T
 * @typedef {{[K in keyof T]: T[K]} & {}} Prettify
 */

/**
 * @template {StructType<String, Internal.UnknownTypes>} Pubs
 * @template {StructType<String, Internal.UnknownTypes>} Prvs
 */
export class Struct {
    #pubs = /** @type {Pubs} */ (Object.create(null));
    #prvs = /** @type {Prvs} */ (Object.create(null));

    /** @private */
    constructor() { }

    /** @returns {Struct<{}, {}>} */
    static new() {
        return new Struct();
    }

    /**
     * @template {String} Name
     * @template {Internal.UnknownTypes} TypeInfo
     * @param {Name} name
     * @param {TypeInfo} type
     * @returns {Struct<Pubs, Prvs & StructType<`_${Name}`, TypeInfo>>}
     */
    // @ts-ignore
    prv(name, type) {
        /** @type {Record<string, unknown>} */(this.#prvs)[`_${name}`] = undefined;

        return /** @type {Struct<Pubs, Prvs & StructType<`_${Name}`, TypeInfo>>} */ (/** @type {unknown} */ (this));
    }

    /**
     * @template {String} Name
     * @template {Internal.UnknownTypes} TypeInfo
     * @param {Name} name
     * @param {TypeInfo} type
     * @returns {Struct<Pubs & StructType<Name, TypeInfo>, Prvs>}
     */
    // @ts-ignore
    pub(name, type) {
        /** @type {Record<string, unknown>} */(this.#pubs)[name] = undefined;

        return /** @type {Struct<Pubs & StructType<Name, TypeInfo>, Prvs>} */ (/** @type {unknown} */ (this));
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