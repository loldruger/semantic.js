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
    #target = /** @type {Target} */ (Object.create(null));
    #consts = /** @type {Consts} */ (Object.create(null));
    #fns = /** @type {Fns} */ (Object.create(null));
    #staticFns = /** @type {StaticFns} */ (Object.create(null));

    /**
     * @template {Object} T
     * @param {IsExtensible<T> extends true ? T : never} target
     * @returns {Accessor<T, {}, {}, {}>}
     */
    static for(target) {
        return new Accessor(target, {}, {}, {});
    }

    /**
     * @private
     * @param {Target} target 
     */
    constructor(target) {
        this.#target = target;
    }

    /**
     * @returns {Target & Consts & Fns & StaticFns}
     */
    build() {
        Object.setPrototypeOf(this.#target, this.#staticFns);
        Object.assign(this.#target, this.#fns);
        Object.assign(this.#target, this.#consts);

        return Object.freeze(/** @type {Target & Consts & Fns & StaticFns} */(this.#target));
    }
}

/**
 * @template {Object} Target
 * @template {Function} Fn
 * @template {ToConcreteType<unknown>} T
 * @typedef {Fn extends (self: Target, params: T) => infer R 
 *   ? (self: Target, params: ToInstanceType<T>) => R 
 *   : never
 * } NormalizedFn<Target, Fn>
 */

/**
 * @template {Object} Target
 * @template {ConstMap} Consts
 * @template {FnMap<String, CallableType>} Fns
 * @template {FnMap<String, CallableType>} StaticFns
 */
class Accessor {
    /** @type {Accessor<Target, Consts, Fns, StaticFns>} */
    pub = this;
    /** @type {Accessor<Target, Consts, Fns, StaticFns>} */
    prv = this;

    #target = /** @type {Target} */ (Object.create(null));
    #consts = /** @type {Consts} */ (Object.create(null));
    #fns = /** @type {Fns} */ (Object.create(null));
    #staticFns = /** @type {StaticFns} */ (Object.create(null));

    /**
     * @param {Target} target
     * @param {Consts} consts
     * @param {Fns} fns
     * @param {StaticFns} staticFns
     */
    constructor(target, consts, fns, staticFns) {
        this.#target = target;
        this.#consts = consts;
        this.#fns = fns;
        this.#staticFns = staticFns;
    }

    /**
     * @template {String} Name
     * @template Value
     * @param {Name extends Uppercase<Name> ? Name : never} name
     * @param {Value extends IsLiteralType<Value> ? Value : never} value
     * @return {Accessor<Target, Consts, Fns, StaticFns>}
     */
    const(name, value) {
        this.#consts = { ...this.#consts, [name]: value };

        return /** @type {Accessor<Target, Consts, Fns, StaticFns>} */ (this);
    }

    /**
     * @template {String} Name
     * @template {ToConcreteType<unknown>} T
     * @template {((self: Target, args: T) => ReturnType<Fn>)} Fn
     * @param {Name} name
     * @param {Fn} func
     * @return {Accessor<Target, Consts, Fns & Record<Name, Fn>, StaticFns>}
     */
    fn(name, func) {
        this.#fns = {
            ...this.#fns,
            [name]: (props) => func(this.#target, props)
        };

        return /** @type {Accessor<Target, Consts, Fns & Record<Name, Fn>, StaticFns>} */ (this);
    }
}

Object.setPrototypeOf(Impl, null);
Object.setPrototypeOf(Impl.prototype, null);
Object.setPrototypeOf(Accessor, null);
Object.setPrototypeOf(Accessor.prototype, null);
