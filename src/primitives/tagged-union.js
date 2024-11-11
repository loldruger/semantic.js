// @ts-check

/**
 * @template T
 * @typedef {T extends undefined ? null : T} SomeOrNone<T>
 */

/**
 * @template {String} Tag
 * @template {Array<T>} T
 * @typedef {T extends undefined ? Record<Tag, null> : Record<Tag, (...args: Array<IterInstanceType<T>>) => IterInstanceType<T>>} Form<Tag, T>
 */

/**
 * @template {Form<String, any>} Variants
 */
export class TaggedUnion {
    /**
     * @type {Variants}
     */
    #variants = /** @type {Variants} */ ({});

    /**
     * @private
     */
    constructor() { }

    /**
     * @returns {TaggedUnion<any>}
     */
    static new() {
        return new TaggedUnion();
    }

    /**
     * @template {String} Tag
     * @template {Tuple|Tuples|undefined} Fields
     * @param {Tag} tag
     * @param {Fields=} fields
     * @returns {TaggedUnion<Readonly<Variants> & Form<Tag, Fields>>}
     */
    variant(tag, fields) {
        const fn = fields
            ? (/** @type {Array<Fields>} */...args) => args[0]
            : null;

        this.#variants = {
            ...this.#variants,
            [tag]: fn
        };

        return /** @type {any} */ (this);
    }

    /**
     * @returns {Variants}
     */
    build() {
        return Object.freeze(this.#variants);
    }
}
