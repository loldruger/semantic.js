// @ts-check

import { Matchable } from "../lib";
import { Tuple, Tuple0 } from "./tuple";

/**
 * @template {Tuple} T
 */
export class TaggedUnionConstructor {
    /**
     * @type {Record<String, T>}
     */
    #variants = {};

    /**
     * @private
     */
    constructor() { }

    /**
     * Static method to create a new TaggedUnion instance.
     * @returns {TaggedUnionConstructor} - A new TaggedUnion instance.
     */
    static new() {
        return new TaggedUnionConstructor();
    }

    /**
     * Defines a variant of the tagged union.
     * @param {String} tag - The name of the variant.
     * @param {T} [fields] - The field names associated with the variant.
     * @returns {TaggedUnionConstructor} - Returns the TaggedUnion instance for chaining.
     */
    variant(tag, fields = undefined) {
        if (fields === undefined || fields === null) {
            return this;
        }
        
        this.#variants[tag] = fields;

        return this;
    }

    /**
     * Builds the tagged union type with constructors for each variant.
     * @returns {Readonly<TaggedUnion>} - An object containing constructors for each variant.
     */
    build() {
        const variants = { ...this.#variants };

        return Object.freeze(Object.keys(variants).reduce((acc, tag) => {
            acc[tag] = (...args) => {
                const fields = variants[tag];
                const obj = Object.create(null);
                for (const key in fields) {
                    obj[key] = args.shift();
                }
                return obj;
            };
            return acc;
        }, Object.create(null)));
    }
}

/**
 * @implements {Matchable}
 */
export class TaggedUnion {
    
}