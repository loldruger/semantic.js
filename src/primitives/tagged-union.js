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
     * @template {String} Tag
     * @template {Array<new (...args: Array<any>) => any>} Constructor
     * @template {Constructor extends Array<any> ? Constructor : null} ActualConstructor
     * @param {Tag} tag
     * @param {Constructor=} constructor
     * @returns {TaggedUnion<Readonly<Variants> & Record<Tag, ActualConstructor>>}
     */
    variant(tag, constructor) {
        const fn = constructor?.reduce((acc, x) => {
            acc = {
                ...acc,
                x
            };
            return x;
        }, {});

        this.#variants = {
            ...this.#variants,
            [tag]: fn,
        };

        return /** @type {TaggedUnion<Readonly<Variants> & Record<Tag, ActualConstructor>>} */ (this);
    }

    /**
     * @returns {Variants}
     */
    build() {
        return Object.freeze(this.#variants);
    }
}

