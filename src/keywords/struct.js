// @ts-check

/**
 * @template {StructType<String, StructTypeUnion>} Fields
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
     * @template {StructTypeUnion} TypeInfo
     * @param {Name} name
     * @param {TypeInfo} _typeInfo
     * @returns {Struct<Fields & StructType<Name, TypeInfo>>}
     */
    field(name, _typeInfo) {
        this.#fields = {
            ...this.#fields,
            //@ts-ignore
            [name]: undefined
        };

        return /** @type {Struct<Fields & StructType<Name, TypeInfo>>} */ (/** @type {unknown} */ (this));
    }

    /**
     * @returns {Readonly<{[K in keyof Fields]: Fields[K]} & {init: (args: {[K in keyof Fields]: Fields[K]}) => void}>}
     */
    build() {
        Object.assign(this.#fields, {
            /**
             * @param {{[K in keyof Fields]: Fields[K]}} args
             */
            init: (args) => {
                Object.assign(this.#fields, args);
            }
        })

        return /** @type {Readonly<{[K in keyof Fields]: Fields[K]} & {init: (args: {[K in keyof Fields]: Fields[K]}) => void}>}*/ (this.#fields);
    }
}

Object.setPrototypeOf(Struct, null);
Object.setPrototypeOf(Struct.prototype, null);