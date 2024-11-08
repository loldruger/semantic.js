// @ts-check

import { TupleType } from "./tuple.js";

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
     * @template T
     * @typedef {new (...args: any) => T} Tuple<T>
     */

    /**
     * @template T
     * @typedef {Array<Tuple<any>|Tuples<T>>} Tuples<T>
     */

    /**
     * @template {Tuples<any>} T
     * @typedef {T extends Array<any>
     *     ? {[K in keyof T]: Iterate<T[K]>}
     *     : T extends Tuple<any>
     *         ? InstanceType<T>
     *         : never
     * } Iterate<T>
     */

    /**
     * @template {String} Tag
     * @template {Tuple<any>|Tuples<any>} Constructors
     * @param {Tag} tag
     * @param {Constructors=} constructors
     * @returns {TaggedUnion<Readonly<Variants> & Record<Tag, (...args: Array<Iterate<Constructors>>) => args>>}
     */
    variant(tag, constructors) {
        // /**
        //  * @type {(...args: Params) => args?}
        //  */
        // const fn = (...args) => {
        //     if (constructors) {
        //         return /** @type {Params} */ (args.map((arg, _) => arg))
        //     } else {
        //         return null;
        //     }
        // };

        this.#variants = {
            ...this.#variants,
            [tag]: null//fn,
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

