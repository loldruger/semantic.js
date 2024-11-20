// @ts-check

import { TupleType } from "./tuple";

export class Struct {
    /**
     * @type {Record<String, String>}
     */
    #fields = {};

    /**
     * @private
     */
    constructor() { }

    /**
     * @returns {Struct}
     */
    static new() {
        return new Struct();
    }

    /**
     * Defines a variant of the tagged union.
     * @param {String} tag - The name of the variant.
     * @param {Type} [type] - The field names associated with the variant.
     * @returns {Struct} - Returns the TaggedUnion instance for chaining.
     */
    field(tag, type) {
        if (type === undefined || type === null) {
            return this;
        }

        this.#fields[tag] = type;

        return this;
    }

    /**
     * Builds the tagged union type with constructors for each variant.
     * @returns {Readonly<Struct>} - An object containing constructors for each variant.
     */
    build() {
        const fields = { ...this.#fields };

        const union = Object
            .keys(fields)
            .reduce((acc, tag) => {
                acc[tag] = (...args) => {
                    const data = fields[tag];
                    const obj = Object.create(null);

                    for (const key in data) {
                        obj[key] = args.shift();
                    }

                    return obj;
                };
                return acc;

            }, Object.create(null));

        return Object.freeze(union);
    }
}
