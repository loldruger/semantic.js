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
     * @template {keyof Variants} Tag
     * @template {Array<new (...args: Array<any>) => any>} Constructor
     * @template {(Constructor extends Array<any> ? (...args: Constructor extends Array<infer U> ? Array<U> : never) => any : null)} ActualConstructor
     * @param {Tag} tag
     * @param {Constructor=} constructor
     * @returns {TaggedUnion<Readonly<Variants> & Record<Tag, ActualConstructor>>}
     */
    variant(tag, constructor) {
        if (constructor) {
            /**
             * @param {Array<String>} args
             */
            this.#variants[tag] = (...args) => constructor.map(C => new C(...args))
        } else {
            this.#variants[tag] = null; // constructor가 없으면 null 할당
        }

        return /** @type {TaggedUnion<Readonly<Variants> & Record<Tag, ActualConstructor>>} */ (this);
    }

    /**
     * @returns {Variants}
     */
    build() {
        return Object.freeze(this.#variants);
    }
}

