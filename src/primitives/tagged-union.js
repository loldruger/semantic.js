// @ts-check

import { Matchable } from "../interfaces/matchable.js";
import { Tuple, Tuple0 } from "./tuple.js";

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
     * @template {Array<Function>=} Constructor
     * @param {Tag} tag
     * @param {Constructor=} constructor
     * @returns {TaggedUnion<Readonly<Variants> & Record<Tag, Constructor>>}
     */
    variant(tag, constructor) {
        const fns = constructor?.map(fn => {
            return (arg) => {
                return { arg };
            };
        });

        this.#variants = {
            ...this.#variants,
            [tag]: fns,
        };

        return /** @type {TaggedUnion<Readonly<Variants> & Record<Tag, Constructor>>} */ (this);
    }

    /**
     * @returns {Variants}
     */
    build() {
        return Object.freeze(this.#variants);
    }
}

