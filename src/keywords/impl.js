//@ts-check

/**
 * @template {String} Name
 * @template {CallableType} Fn
 * @typedef {Readonly<Record<Name, Fn>>} FnMap
 */

/**
 * @template {String} [Name=String]
 * @template [Value=any]
 * @typedef {Readonly<Record<Name, Value>>} ConstMap
 */

/**
 * @template {Object} Target
 * @template {ConstMap} Consts
 * @template {FnMap<String, CallableType>} Fns
 * @template {FnMap<String, CallableType>} StaticFns
 */
export class Impl {
    /**
     * @type {Target}
     */
    #target;

    /**
     * @type {Consts}
     */
    #consts = /** @type {Consts} */ ({});

    /**
     * @type {Fns}
     */
    #fns = /** @type {Fns} */ ({});

    /**
     * @type {StaticFns}
     */
    #staticFns = /** @type {StaticFns} */ ({});

    /**
     * @template {Object} T
     * @param {IsExtensible<T> extends true ? T : never} target
     * @returns {Impl<T, {}, {}, {}>}
     */
    static for(target) {
        return new Impl(target);
    }

    /**
     * @private
     * @param {Target} target 
     */
    constructor(target) {
        this.#target = target;
    }

    /**
     * @template {String} Name
     * @template {(props: {self: Self, [key: string]: any}) => any} Fn
     * @template {Target & Consts & Fns & FnMap<Name, Fn>} [Self=Target & Consts & Fns]
     * @param {Name} name
     * @param {Fn} func
     * @return {Impl<Target, Consts, Fns & FnMap<Name, Fn>, StaticFns>}
     */
    fn(name, func) {
        this.#fns = { ...this.#fns, [name]: func };

        return /** @type {Impl<Target, Consts, Fns & FnMap<Name, Fn>, StaticFns>} */ (/** @type {unknown} */ (this));
    }

    /**
     * @template {String} Name
     * @template {(Self: Target & Consts & FnMap<Name, Fn> & StaticFns, ...args: any) => any} Fn
     * @param {Name} name
     * @param {Fn} func
     * @return {Impl<Target, Consts, Fns, StaticFns & FnMap<Name, Fn>>}
     */
    staticFn(name, func) {
        this.#staticFns = { ...this.#staticFns, [name]: func };

        return /** @type {Impl<Target, Consts, Fns, StaticFns & FnMap<Name, Fn>>} */ (/** @type {unknown} */ (this));
    }

    /**
     * @template {String} Name
     * @template Value
     * @param {Name} name
     * @param {Value extends IsLiteralType<Value> ? Value : never} value
     * @return {Impl<Target, Consts & Record<Name, Value>, Fns, StaticFns>}
     */
    const(name, value) {
        this.#consts = { ...this.#consts, [name]: value };

        return /** @type {Impl<Target, Consts & Record<Name, Value>, Fns, StaticFns>} */ (/** @type {unknown} */ (this));
    }

    /**
     * @param {Boolean} freeze
     * @returns {Target & Consts & Fns & StaticFns}
     */
    build(freeze) {
        Object.setPrototypeOf(this.#target, this.#staticFns);
        Object.assign(this.#target, this.#fns);
        Object.assign(this.#target, this.#consts);

        if (freeze) {
            return Object.freeze(/** @type {Target & Consts & Fns & StaticFns} */(this.#target));
        }

        return /** @type {Target & Consts & Fns & StaticFns} */ (this.#target);
    }
}

Object.setPrototypeOf(Impl, null);
Object.setPrototypeOf(Impl.prototype, null);