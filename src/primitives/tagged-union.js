// @ts-check

import { Matchable } from "../interfaces/matchable.js";
import { Tuple } from "./tuple.js";

export class TaggedUnion {
    /**
     * @type {Record<String, Tuple|undefined>}
     */
    #variants = {};

    /**
     * @private
     */
    constructor() { }

    /**
     * @returns {TaggedUnion} - A new TaggedUnion instance.
     */
    static new() {
        return new TaggedUnion();
    }

    /**
     * @param {String} tag - The name of the variant.
     * @param {Tuple|undefined} fields - The field names associated with the variant.
     * @returns {TaggedUnion} - Returns the TaggedUnion instance for chaining.
     */
    variant(tag, fields = undefined) {
        if (fields === undefined || fields === null) {
            return this;
        }
        
        this.#variants[tag] = fields;

        return this;
    }

    /**
     * @returns {Readonly<Record<String, Tuple>>} - An object containing constructors for each variant.
     */
    build() {
        const variants = { ...this.#variants };

        const union = Object
            .keys(variants)
            .reduce((acc, tag) => {
                acc[tag] = (...args) => {
                    const fields = variants[tag];
                    const obj = Object.create(null);

                    for (const key in fields) {
                        obj[key] = args.shift();
                    }

                    return obj;
                };
                return acc;

            }, Object.create(null));

        return Object.freeze(union);
    }
}
