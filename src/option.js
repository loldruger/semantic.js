// @ts-check

import { Cloneable } from './interfaces/cloneable.js';
import { Matchable } from './interfaces/matchable.js';

import { TaggedUnionConstructor } from './primitives/tagged-union.js';

/**
 * @template T
 * @implements {Cloneable}
 * @implements {Matchable}
 */
export class Option {
    /**
     * @template T
     * @typedef {Readonly<{
     *    Some: (value: T) => Option<T>,
     *    None: null
     * }>} OptionType<T>
     */

    /**
     * @type {OptionType<T>}
     */
    #state = TaggedUnionConstructor.new()
        .variant('Some', {})
        .variant('None')
        .build();

    /**
     * @private
     * @param {T} value
     */
    constructor(value) { 
        this.#state.Some(value);
    }

    /**
     * @template T
     * @param {T} value
     * @returns {Option<T>}
     */
    static new(value) {
        return new Option(value);
    }

    /**
     * @template T
     * @param {T} value
     * @returns {Option<T>}
     */
    static Some(value) {
        return Option.new(value);
    }

    /**
     * @returns {Option<null>}
     */
    static get None() {
        return Option.new(null);
    }

    /**
     * @param {T} value
     */
    some(value) {
        return this.#state.Some(value);
    }

    /**
     * @returns {null}
     */
    get none() {
        return this.#state.None;
    }

    /**
     * @returns {Boolean}
     */
    isSome() {
        return this.#state.None ? false : true;
    }

    /**
     * @returns {Boolean}
     */
    isNone() {
        return this.#state.None ? true : false;
    }

    /**
     * @template U
     * @param {(value: T) => Option<U>} op
     * @return {Option<U>?}
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
        return this.match({
            Some: (value) => value,
            None: () => { throw new Error('Option is None'); }
        });
    }

    /**
     * @returns {Option<T>|Option<null>}
     */
    clone() {
        return this.match({
            Some: (value) => Option.Some(value),
            None: () => Option.None
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
            case true: return Some(this.some());
            case false: return None();
        }
    }
}

