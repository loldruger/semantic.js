// @ts-check

/**
 * @template {StructType<String, ConstructableTypeUnion>} Fields
 */
export class Struct {
    /**
     * @type {Fields}
     */
    #fields = /** @type {Fields} */ ({});

    /**
     * @private
     */
    constructor() { }

    /**
     * @returns {Struct<{}>}
     */
    static new() {
        return new Struct();
    }

    /**
     * @template {String} Name
     * @template {ConstructableTypeUnion} TypeInfo
     * @param {Name} name
     * @param {TypeInfo} typeInfo
     * @returns {Struct<Fields & StructType<Name, TypeInfo>>}
     */
    field(name, typeInfo) {
        /** @type {Record<String, PropertyDescriptor>} */
        const info = {};
        info[name] = {
            [`_${name}`]: undefined,
            get [name]() { return info[`_${name}`] },
            set [name](/** @type {TypeInfo} */ value) { info[`_${name}`] = value }
        }

        this.#fields = {
            ...this.#fields,
            ...info[name]
        };

        return /** @type {Struct<Fields & StructType<Name, TypeInfo>>} */ (/** @type {unknown} */ (this));
    }

    /**
     * @returns {{[K in keyof Fields]: Fields[K]}}
     */
    build() {
        return this.#fields;
    }
}

Object.setPrototypeOf(Struct, null);
Object.setPrototypeOf(Struct.prototype, null);