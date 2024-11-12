// @ts-check

import { Cloneable } from './interfaces/cloneable.js';
import { Matchable } from './interfaces/matchable.js';

import { TaggedUnion } from './primitives/tagged-union.js';

/**
 * @template {InstantiableType|InstantiableTypes} T
 * @implements {Cloneable<Option<T>>}
 * @implements {Matchable<T>}
 */
export class Option {
    /**
     * @type {T}
     */
    #typeInfo;

    /**
     * @type {IterInstanceType<T>?=}
     */
    #value;

    #option;

    /**
     * @private
     * @param {T} type
     */
    constructor(type) {
        this.#typeInfo = type;
        this.#option = TaggedUnion.new()
            .variant('Some', this.#typeInfo)
            .variant('None')
            .build();
    }

    /**
     * @template {InstantiableType|InstantiableTypes} T
     * @param {T} type
     * @returns {Option<T>}
     */
    static Of(type) {
        return new Option(type);
    }

    /**
     * @template {IterInstanceType<InstantiableType|InstantiableTypes>} T
     * @template {ConstructorType<T>} TypeInfo
    
     * @param {T} value
     * @returns {Option<ConstructorType<T>>}
     */
    static Some(value) {
        return new Option(/** @type {TypeInfo} */(typeof value));
    }

    /**
     * @param {InstanceType<T>} value
     * @returns {Option<T>}
     */
    some(value) {
        this.#value = value;

        return this.#option.Some(value);
    }

    /**
     * @returns {null}
     */
    get none() {
        this.#value = null;

        return this.#option.None;
    }

    /**
     * @returns {Boolean}
     */
    isSome() {
        return this.#value ? false : true;
    }

    /**
     * @returns {Boolean}
     */
    isNone() {
        return this.#value ? true : false;
    }

    /**
     * @template {InstantiableType} U
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
            Some: () => this.#option.Some(this.#value),
            None: () => op()
        });
    }

    /**
     * @returns {InstanceType<T>}
     */
    unwrap() {
        switch (this.isSome()) {
            case true: return this.#option.Some(this.#value);
            case false: throw new Error('Option is None');
        }
    }

    /**
     * @returns {Option<T>}
     */
    clone() {
        const cloned = Option.Of(this.#typeInfo);
        cloned.#value = this.#value;

        return cloned;
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
            case true: return Some(this.unwrap());
            case false: return None();
        }
    }
}

