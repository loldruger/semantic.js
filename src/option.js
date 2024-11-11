// @ts-check

import { Cloneable } from './interfaces/cloneable.js';
import { Matchable } from './interfaces/matchable.js';

import { TaggedUnion } from './primitives/tagged-union.js';

/**
 * @template {InstantiableType} T
 * @implements {Cloneable<T>}
 * @implements {Matchable<T>}
 */
export class Option {
    /**
     * @type {InstantiableType=}
     */
    #type = undefined;

    #option = TaggedUnion.new()
        .variant('Some', /** @type {InstantiableType=} */(this.#type))
        .variant('None')
        .build();

    /**
     * @private
     * @param {InstantiableType} value
     */
    constructor(value) {
        this.#type = value;
    }

    /**
     * @param {T} value
     * @returns {Option<T>}
     */
    some(value) {
        return this.#option.Some(value);
    }

    /**
     * @returns {Option<T>}
     */
    get none() {
        return this.#option.None;
    }

    /**
     * @returns {Boolean}
     */
    isSome() {
        return this.#option.None ? false : true;
    }

    /**
     * @returns {Boolean}
     */
    isNone() {
        return this.#option.None ? true : false;
    }

    /**
     * @template {InstantiableType} U
     * @param {(value: T) => Option<U>} op
     * @return {Option<U>}
     */
    andThen(op) {
        return this.match({
            Some: (value) => op(value),
            None: () => this.none
        });
    }

    /**
     * @param {() => Option<T>} op
     * @return {Option<T>}
     */
    orElse(op) {
        return this.match({
            Some: () => this.some(this.#value),
            None: () => op()
        });
    }

    /**
     * @returns {T}
     */
    unwrap() {
        switch (this.isSome()) {
            case true: return this.some();
            case false: throw new Error('Option is None');
        }
    }

    /**
     * @returns {Option<T>|Option<null>}
     */
    clone() {
        return this.match({
            Some: (value) => Option.Some(value),
            None: () => Option.none
        });
    }

    /**
     * @template U, F
     * @param {Object} param
     * @param {(value: T) => U} param.Some
     * @param {() => F} param.None
     * @return {U|F}
     */
    match({ Some, None }) {
        switch (this.isSome()) {
            case true: {
                const value = this.unwrap();

                return (value) => 
            };
            case false: return None();
        }
    }
}

