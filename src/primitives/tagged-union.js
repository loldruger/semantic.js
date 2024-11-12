// @ts-check

/**
 * @template {String} Tag
 * @template {[InstantiableType]} T
 * @typedef {IsTupleType<T> extends true
 *     ? Record<Tag, (...args: [IterInstanceType<T>]) => IterInstanceType<T>>
 *     : IsInstantiableType<T> extends true
 *         ? T extends InstantiableType
 *             ? Record<Tag, (a: InstanceType<T>) => InstanceType<T>>
 *             : never
 *         : Record<Tag, null>
 * } Form<Tag, [T]>
 */

/**
 * @template {Form<String, [InstantiableType]>} Variants
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
     * @returns {TaggedUnion<Form<String, [InstantiableType]>>}
     */
    static new() {
        return new TaggedUnion();
    }

    /**
     * @template {String} Tag
     * @template {InstantiableType|InstantiableTypes|undefined} TypeInfo
     * @param {Tag} tag
     * @param {TypeInfo=} typeInfo
     * @returns {TaggedUnion<Readonly<Variants> & Form<Tag, TypeInfo>>}
     */
    variant(tag, typeInfo) {
        const fn = typeInfo
            ? (/** @type {[TypeInfo]} */...args) => args[0]
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
