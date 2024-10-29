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

    constructor() { }

    static new() {
        return new TaggedUnion();
    }

    /**
     * @template {String} Tag
     * @template {Tuple} Constructor
     * @template V
     * @param {Tag} tag
     * @param {Constructor=} constructor
     * @returns {TaggedUnion<V & Record<Tag, Constructor>>}
     */
    variant(tag, constructor) {
        this.#variants = {
            ...this.#variants,
            [tag]: constructor,
        };
        return /** @type {TaggedUnion<V & Record<Tag, Constructor>>} */ (this);
    }

    /**
     * @returns {Readonly<Variants>}
     */
    build() {
        return Object.freeze(this.#variants);
    }
}