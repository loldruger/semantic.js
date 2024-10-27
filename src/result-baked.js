// @ts-check

import { Cloneable } from './interfaces/cloneable.js';
import { Matchable } from './interfaces/matchable.js';

/**
 * @readonly
 * @enum {Number}
 */
const ResultType = Object.freeze({
    Err: -1,
    Ok: 0,
});

/**
 * @template T, E
 * @implements {Matchable}
 * @implements {Cloneable}
 */
export class ResultBaked {    
    /**
     * @type {ResultType}
     */
    #type;

    /**
     * @type {T}
     */
    #value;

    /**
     * @type {E}
     */
    #error;

    /**
     * @private
     * @param {ResultType} type
     * @param {T} value
     * @param {E} error
     */
    constructor(type, value, error) {
        this.#type = type;
        this.#value = value;
        this.#error = error;
    }

    /**
     * @template T, E
     * @param {T} value 
     * @return {ResultBaked<T, E>}
     */
    static Ok(value) {
        return new ResultBaked(ResultType.Ok, value, /** @type {E} */ (undefined));
    }

    /**
     * @template T, E
     * @param {E} error 
     * @return {ResultBaked<T, E>}
     */
    static Err(error) {
        return new ResultBaked(ResultType.Err, /** @type {T} */ (undefined), error);
    }

    /**
     * @return {Boolean}
     */
    isOk() {
        return this.#type === ResultType.Ok;
    }

    /**
     * @return {Boolean}
     */
    isErr() {
        return this.#type === ResultType.Err;
    }

    /**
     * @template U
     * @param {(value: T) => ResultBaked<U, E>} op
     * @return {ResultBaked<U, E>}
     */
    andThen(op) {
        return this.match({
            ok: (value) => op(value),
            err: (error) => ResultBaked.Err(error),
        });
    }

    /**
     * @template F
     * @param {(error: E) => ResultBaked<T, F>} op
     * @return {ResultBaked<T, F>}
     */
    orElse(op) {
        return this.match({
            ok: (value) => ResultBaked.Ok(value),
            err: (error) => op(error),
        });
    }

    /**
     * @return {T}
     */
    unwrap() {
        return this.match({
            ok: (value) => value,
            err: () => {
                throw new Error('Called unwrap on an Err value');
            },
        });
    }

    /**
     * @return {E}
     */
    unwrapErr() {
        return this.match({
            ok: () => {
                throw new Error('Called unwrapErr on an Ok value');
            },
            err: (error) => error,
        });
    }

    /**
     * @template U, F
     * @param {Object} match
     * @param {(value: T) => U} match.ok
     * @param {(error: E) => F} match.err
     * @return {U|F}
     */
    match({ ok, err }) {
        switch (this.isOk()) {
            case true: return ok(this.#value);
            case false: return err(this.#error);
        }
    }

    clone() {
        if (this.isOk()) {
            return ResultBaked.Ok(this.#value);
        } else {
            return ResultBaked.Err(this.#error);
        }
    }
}
