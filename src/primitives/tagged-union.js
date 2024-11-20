// @ts-check

/**
 * @template {TaggedUnionType<String, ConstructableTypes>} Variants
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
     * @returns {TaggedUnion<{}>}
     */
    static new() {
        return new TaggedUnion();
    }

    /**
     * @template {String} Tag
     * @template {ConstructableTypeUnion} TypeInfo
     * @param {Tag} tag
     * @param {TypeInfo=} typeInfo
     * @returns {TaggedUnion<Variants & TaggedUnionType<Tag, TypeInfo>>}
     */
    variant(tag, typeInfo) {
        const fn = typeInfo
            ? (/** @type {[TypeInfo]} */...args) => args[0]
            : null;

        this.#variants = {
            ...this.#variants,
            [tag]: fn
        };

        return  /** @type {any} */ (this);
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