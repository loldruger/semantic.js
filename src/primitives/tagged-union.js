// @ts-check

import { Tuple as TupleFn } from "./tuple.js";

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
     * @template T
     * @typedef {(T extends any ? (k: T) => void : never) extends (k: infer U) => void ? U : never} UnionToIndersection<T>
     */

    /**
     * @template T
     * @typedef {UnionToIndersection<T extends any ? (x: T) => void : never> extends (x: infer U) => void ? U : never} LastOf<T>
     */

    /**
     * @template {Array<any>} T
     * @template V
     * @typedef {[...T, V]} Push<T, V>
     */

    /**
     * @template T
     * @template [L = LastOf<T>]
     * @template [N = [T] extends [never] ? true : false]
     * @typedef {true extends N ? [] : Push<UnionToTuple<Exclude<T, L>>, L>} UnionToTuple<T>
     */

    /**
     * @template T
     * @template [U = T]
     * @typedef {UnionToTuple<T> extends infer R ? R extends Array<any> ? { [K in keyof R]: Extract<U, R[K]> } : never : never} SortUnion<T>
     */
    /**
     * @template {Tuple<any> | Tuples<any>} T
     * @typedef {T extends Array<infer U> 
     *     ? ReturnType<typeof TupleFn<UnionToTuple<U extends Tuples<any> ? RecursiveInstanceType<U> : U extends Tuple<any> ? InstanceType<U> : InstanceType<Tuple<U>>>>>
     *     : (T extends Tuple<any> ? InstanceType<T> : never)
     * } RecursiveInstanceType<T>
     */

    /**
     * @template {Tuples<any>} T
     * @typedef {{ [K in keyof T]: RecursiveInstanceType<T[K]> }} Params
     */

    /**
     * @template {Tuples<any>} T
     * @typedef {Params<T> extends Array<infer U> ? Array<SortUnion<U>> : never} RecursiveUnionToTuple<T>
     */

    /**
     * @template {String} Tag
     * @template {Tuples<any>} Constructors
     * @param {Tag} tag
     * @param {Constructors=} constructors
     * @returns {TaggedUnion<Readonly<Variants> & Record<Tag, (...args: RecursiveUnionToTuple<Constructors>) => args>>}
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

