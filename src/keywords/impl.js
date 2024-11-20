//@ts-check

/**
 * @template {CallableType} T
 * @typedef {Record<String, T>} FnMap
 */

/**
 * @template {Object} T
 */
export class Impl {
    /**
     * @type {T}
     */
    #target;

    /**
     * @type {FnMap<CallableType>}
     */
    #fns = {};

    /**
     * @type {FnMap<CallableType>}
     */
    #fnsStatic = {};

    /**
     * @template {Object} T
     * @param {IsReadonlyType<T> extends true ? never : T} target
     * @returns {Impl<T>}
     */
    static for(target) {    
        return new Impl(target);
    }

    /**
     * @private
     * @param {T} target 
     */
    constructor(target) {
        this.#target = target;
    }

    /**
     * @param {String} name
     * @param {CallableType} func
     * @return {this}
     */
    fn(name, func) {
        this.#fns.push({...this.#fns, name: func});

        return this;
    }

    /**
     * @param {String} name
     * @param {CallableType} func
     * @return {this}
     */
    fnStatic(name, func) {
        this.#fnsStatic.push(func);

        return this;
    }

    /**
     * @returns {T}
     */
    build() {
        Object.setPrototypeOf(this.#target, {...this.#fns})
        return this.#target;
    }
}

Object.setPrototypeOf(Impl, null);
Object.setPrototypeOf(Impl.prototype, null);