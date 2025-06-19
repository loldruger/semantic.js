//@ts-check

/**
 * @template {String} Name
 * @template {Internal.AnyConstructable} Fn
 * @typedef {Record<Name, Fn>} FnMap <Name, Fn>
 */

/**
 * @template {String} [Name=String]
 * @template {unknown} [Value=unknown]
 * @typedef {Record<Name, Value>} ConstMap <Name, Value>
 */

/**
 * @template {Object} Target
 * @template {ConstMap} Consts
 * @template {FnMap<String, Internal.AnyConstructable>} Fns
 * @template {FnMap<String, Internal.AnyConstructable>} StaticFns
 */
export class Impl {
    #target = /** @type {Target} */ (Object.create(null));
    #consts = /** @type {Consts} */ (Object.create(null));
    #fns = /** @type {Fns} */ (Object.create(null));
    #staticFns = /** @type {StaticFns} */ (Object.create(null));

    /**
     * @template {Object} T
     * @param {Type.IsExtensible<T> extends true ? T : never} target
     * @returns {Accessor<T, ConstMap, FnMap<String, Type.CallableType>, FnMap<String, Type.CallableType>>}
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
 * @template {ConstMap} Consts
 * @template {FnMap<String, Internal.AnyConstructable<ReadonlyArray<Internal.UnknownTypes>>>} Fns
 * @template {FnMap<String, Internal.AnyConstructable>} StaticFns
 */
class Accessor {
    pub = this;
    prv = this;
    async = this;

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
     * @param {Name extends Uppercase<Name> ? Name : Type.Error<"Name must be uppercase">} name
     * @param {Value extends Type.IsLiteralType<Value> ? Value : Type.Error<"Value must be a literal type">} value
     * @return {Accessor<Target, Consts, Fns, StaticFns>}
     */
    const(name, value) {
        this.#consts = { ...this.#consts, [name]: value };

        return this;
    }

    /**
     * @template {String} Name
     * @template {ReadonlyArray<Internal.UnknownTypes>} T
     * @template R
     * @template {(self: Target, ...args: T) => R} Fn
     * @param {Name} name
     * @param {Fn} method
     * @return {Accessor<Target, Consts, Fns & Record<Name, (...args: T) => R>, StaticFns>}
     */
    fn(name, method) {
        this.#fns = {
            ...this.#fns,
            [name]: (...parameters) => method(this.#target, .../** @type {T} */(parameters))
        };

        return /** @type {Accessor<Target, Consts, Fns & Record<Name, (...args: T) => R>, StaticFns>} */ (this);
    }
}

Object.setPrototypeOf(Impl, null);
Object.setPrototypeOf(Impl.prototype, null);
Object.setPrototypeOf(Accessor, null);
Object.setPrototypeOf(Accessor.prototype, null);
