// @ts-check

/**
 * @template {StructType<String, StructTypeUnion>} Pubs
 * @template {StructType<String, StructTypeUnion>} Prvs
 */
export class Struct {
    /**
     * @type {Pubs}
     */
    #pubs = /** @type {Pubs} */ (Object.create(null));

    /**
     * @type {Prvs}
     */
    #prvs = /** @type {Prvs} */ (Object.create(null));

    /**
     * @private
     */
    constructor() { }

    /**
     * @returns {Struct<{}, {}>}
     */
    static new() {
        return new Struct();
    }

    /**
     * @template {String} Name
     * @template {StructTypeUnion} TypeInfo
     * @param {Name} name
     * @param {TypeInfo} _typeInfo
     * @returns {Struct<Pubs, Prvs & StructType<Name, TypeInfo>>}
     */
    prv(name, _typeInfo) {
        // @ts-ignore
        this.#prvs[name] = undefined;

        return /** @type {Struct<Pubs, Prvs & StructType<Name, TypeInfo>>} */ (/** @type {unknown} */ (this));
    }

    /**
     * @template {String} Name
     * @template {StructTypeUnion} TypeInfo
     * @param {Name} name
     * @param {TypeInfo} _typeInfo
     * @returns {Struct<Pubs & StructType<Name, TypeInfo>, Prvs>}
     */
    pub(name, _typeInfo) {
        // @ts-ignore
        this.#pubs[name] = undefined;

        return /** @type {Struct<Pubs & StructType<Name, TypeInfo>, Prvs>} */ (/** @type {unknown} */ (this));
    }

    /**
     * @typedef {{[K in keyof Pubs]: Pubs[K]}} P
     * @typedef {{[K in keyof Prvs]: Prvs[K]}} R
     */

    /**
     * @returns {{[K in keyof (P & {new: (args: {[K in keyof (P & R)]: (P & R)[K]}) => typeof args})]: (P & {new: (args: {[K in keyof (P & R)]: (P & R)[K]}) => typeof args})[K]}}
     */
    build() {
        const returnedObject = Object.assign(this.#pubs, {
            /**
             * @param {P & R} args
             */
            new: (args) => {
                Object.assign(this.#pubs, args);
                Object.assign(this.#prvs, args);

                return args;
            }
        })

        /**
         * @returns {{[K in keyof (P & {new: (args: {[K in keyof (P & R)]: (P & R)[K]}) => typeof args})]: (P & {new: (args: {[K in keyof (P & R)]: (P & R)[K]}) => typeof args})[K]}}
         */
        return (returnedObject);
    }
}

Object.setPrototypeOf(Struct, null);
Object.setPrototypeOf(Struct.prototype, null);