// @ts-check

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
     * @returns {Struct<Pubs, Prvs & StructType<Name, TypeInfo>>}
     */
    // @ts-ignore
    prv(name, type) {
        /** @type {Record<string, unknown>} */(this.#prvs)[name] = undefined;

        return /** @type {Struct<Pubs, Prvs & StructType<Name, TypeInfo>>} */ (/** @type {unknown} */ (this));
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
     * @typedef {{[K in keyof Prvs]: Prvs[K]}} Prv
     */

    /**
     * @returns {{[K in keyof (Pubs & Prv)]: (Pubs & Prv)[K]}}
     */
    build() {
        /**
         * @type {{[K in keyof (Pubs & Prv)]: (Pubs & Prv)[K]}}
         */
        return (this.#pubs);
    }
}

Object.setPrototypeOf(Struct, null);
Object.setPrototypeOf(Struct.prototype, null);