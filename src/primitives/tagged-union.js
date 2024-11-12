// @ts-check

/**
 * @template {String} Tag
 * @template {[ConcreteType]} T
 * @typedef {IsTupleType<T> extends true
 *     ? Record<Tag, (...args: [IterInstanceType<T>]) => IterInstanceType<T>>
 *     : IsInstantiableType<T> extends true
 *         ? T extends ConcreteType
 *             ? Record<Tag, (x: InstanceType<T>) => InstanceType<T>>
 *             : never
 *         : Record<Tag, null>
 * } Form<Tag, [T]>
 */

/**
 * @template {Form<String, [ConcreteType]>} Variants
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
     * @returns {TaggedUnion<Form<String, [ConcreteType]>>}
     */
    static new() {
        return new TaggedUnion();
    }

    /**
     * @template {String} Tag
     * @template {ConcreteType|ConcreteTypes} TypeInfo
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
