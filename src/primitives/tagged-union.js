// @ts-check

/**
 * @template {StructType<String, ReadonlyArray<ConstructableTypeUnion>>} Variants
 */
export class TaggedUnion {

    #variants = /** @type {Variants} */ (Object.create(null));

    /** @private */
    constructor() { }

    /**
     * @returns {TaggedUnion<{}>}
     */
    static new() {
        return new TaggedUnion();
    }

    /**
     * @template {String} Tag
     * @template {ConstructableTypeUnion} TypeInfo
     * @param {Tag} tag
     * @param {TypeInfo=} type
     * @returns {TaggedUnion<Variants & StructType<Tag, TypeInfo>>}
     */
    variant(tag, type) {
        const fn = type
            ? (/** @type {TypeInfo} */args) => args
            : null;

        this.#variants = {
            ...this.#variants,

            [tag]: fn
        };

        return /** @type {TaggedUnion<Variants & StructType<Tag, TypeInfo>>} */(this);
    }

    /**
     * @returns {{[K in keyof Variants]: Variants[K]}}
     */
    build() {
        return this.#variants;
    }
}

Object.setPrototypeOf(TaggedUnion, null);
Object.setPrototypeOf(TaggedUnion.prototype, null);