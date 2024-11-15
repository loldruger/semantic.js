// @ts-check

import { Cloneable } from '../interfaces/cloneable.js';
import { Matchable } from '../interfaces/matchable.js';

/**
 * @template T
 * @implements {Cloneable<T>}
 * @implements {Matchable<T>}
 */
export class OptionBaked {
    /**
     * @type {{ tag: 'Some', value: T } | { tag: 'None', value: never }}
     */
    #state;

    constructor() {
        this.#state = { tag: 'None', value: /** @type {never} */ (undefined) };
    }

    /**
     * @param {T} value
     * @returns {this}
     */
    some(value) {
        this.#state = { tag: 'Some', value };
        return this;
    }

    /**
     * @returns {this}
     */
    none() {
        this.#state = { tag: 'None', value: /** @type {never} */ (undefined) };
        return this;
    }

    /**
     * @returns {Boolean}
     */
    isSome() {
        return this.#state.tag === 'Some';
    }

    /**
     * @returns {Boolean}
     */
    isNone() {
        return this.#state.tag === 'None';
    }

    /**
     * @returns {T}
     * @throws {Error}
     */
    unwrap() {
        if (this.isSome()) {
            return this.#state.value;
        }
        throw new Error('Called unwrap on a None value.');
    }

    /**
     * @returns {OptionBaked<T>}
     */
    clone() {
        const opt = new OptionBaked();
        if (this.isSome()) {
            opt.some(this.#state.value);
        }
        return opt;
    }

    /**
     * @template U, F
     * @param {Object} param
     * @param {(value: T) => U} param.Some
     * @param {() => F} param.None
     * @returns {U | F}
     */
    match({ Some, None }) {
        if (this.isSome()) {
            return Some(this.#state.value);
        }
        return None();
    }

    /**
     * @template U
     * @param {(value: T) => U} op
     * @returns {OptionBaked<U>}
     */
    map(op) {
        const opt = new OptionBaked();
        if (this.isSome()) {
            opt.some(op(this.#state.value));
        }
        return opt;
    }

    /**
     * @template U
     * @param {(value: T) => OptionBaked<U>} op
     * @returns {OptionBaked<U>}
     */
    andThen(op) {
        if (this.isSome()) {
            return op(this.#state.value);
        }
        return new OptionBaked();
    }

    /**
     * @param {OptionBaked<T>} optb
     * @returns {OptionBaked<T>}
     */
    or(optb) {
        if (this.isSome()) {
            return this;
        }
        return optb;
    }

    /**
     * @param {() => OptionBaked<T>} op
     * @returns {OptionBaked<T>}
     */
    orElse(op) {
        if (this.isSome()) {
            return this;
        }
        return op();
    }
}