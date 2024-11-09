// @ts-check

/**
 * @template {Array<any>} T
 * @typedef {Record<String, (...args: T) => T>} Form<T>
 */

/**
 * @template {Form<any>} Variants
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
     * @returns {TaggedUnion<Form<any>>}
     */
    static new() {
        return new TaggedUnion();
    }

    /**
     * @template {String} Tag
     * @template {Tuple<any>|Tuples<any>} Constructors
     * @param {Tag} tag
     * @param {Constructors=} constructors
     * @returns {TaggedUnion<Readonly<Variants> & Record<Tag, (...args: Array<ToInstanceType<Constructors>>) => args>>}
     */
    variant(tag, constructors) {
        const fn = constructors
            ? (/** @type {Array<ToInstanceType<Constructors>>} */...args) => args.at(0)
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

