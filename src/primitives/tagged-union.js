// @ts-check

/**
 * @template Variants
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
     * @template Variants
     * @returns {TaggedUnion<Variants>}
     */
    static new() {
        return new TaggedUnion();
    }

    /**
     * @template {any} T
     * @typedef {new (...args: any) => T} Constructor
     */

    /**
     * @template {String} Tag
     * @template {Array<Constructor<any>>} Constructors
     * @template {{ [K in keyof Constructors]: Constructors[K] extends Constructor<infer U> ? U : never }} Params
     * @param {Tag} tag
     * @param {Constructors=} constructors
     * @returns {TaggedUnion<Readonly<Variants> & Record<Tag, (...args: Params) => args>>}
     */
    variant(tag, constructors) {
        /**
         * @type {(...args: Params) => args?}
         */
        const fn = (...args) => {
            if (constructors) {
                return /** @type {Params} */ (args.map((arg, _) => arg))
            } else {
                return null;
            }
        };

        this.#variants = {
            ...this.#variants,
            [tag]: fn,
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

