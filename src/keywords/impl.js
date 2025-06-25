// @ts-check

/**
 * @template {string} Name
 * @template {unknown} Value
 * @typedef {Record<Name, Value>} ConstMap
 */

/**
 * @template {string} Name
 * @template {Function} Fn
 * @typedef {Record<Name, Fn>} FnMap
 */

/**
 * @description This type represents the `self` parameter inside implementation functions.
 * It correctly reflects the sequentially accumulated state of the builder at any given point in the chain.
 * @template {Object} Target
 * @template {ConstMap<string, unknown>} PubConsts
 * @template {ConstMap<string, unknown>} PrvConsts
 * @template {FnMap<string, Function>} PubFns
 * @template {FnMap<string, Function>} PrvFns
 * @typedef {Internal.Prettify<Target & PubConsts & PrvConsts & PubFns & PrvFns>} InternalSelfType
 */

/**
 * @template {Object} Target
 * @template {ConstMap<string, unknown>} PubConsts
 * @template {ConstMap<string, unknown>} PrvConsts
 * @template {FnMap<string, Function>} PubFns
 * @template {FnMap<string, Function>} PrvFns
 * @template {FnMap<string, Function>} StaticFns
 */
class Accessor {
    /** @private */ _target;
    /** @private */ _pubConsts;
    /** @private */ _prvConsts;
    /** @private */ _pubFns;
    /** @private */ _prvFns;
    /** @private */ _staticFns;
    /** @private @type {Map<string, Function>} */ _pendingFns;

    /**
     * @description Public members builder
     * @type {{
     * const: <Name extends string, Value>(name: Name, value: Value) => Accessor<Target, PubConsts & Readonly<Record<Name, Value>>, PrvConsts, PubFns, PrvFns, StaticFns>,
     * fn: <Name extends string, TArgs extends any[], TReturn>(name: Name, method: (self: InternalSelfType<Target, PubConsts, PrvConsts, PubFns, PrvFns>, ...args: TArgs) => TReturn) => Accessor<Target, PubConsts, PrvConsts, PubFns & Record<Name, (self: any, ...args: TArgs) => TReturn>, PrvFns, StaticFns>
     * }}
     */
    pub;

    /**
     * @description Private members builder
     * @type {{
     * const: <Name extends string, Value>(name: Name, value: Value) => Accessor<Target, PubConsts, PrvConsts & Readonly<Record<`_${Name}`, Value>>, PubFns, PrvFns, StaticFns>,
     * fn: <Name extends string, TArgs extends any[], TReturn>(name: Name, method: (self: InternalSelfType<Target, PubConsts, PrvConsts, PubFns, PrvFns>, ...args: TArgs) => TReturn) => Accessor<Target, PubConsts, PrvConsts, PubFns, PrvFns & Record<`_${Name}`, (self: any, ...args: TArgs) => TReturn>, StaticFns>
     * }}
     */
    prv;

    /**
     * @param {Target} target
     * @param {PubConsts} pubConsts
     * @param {PrvConsts} prvConsts
     * @param {PubFns} pubFns
     * @param {PrvFns} prvFns
     * @param {StaticFns} staticFns
     * @param {Map<string, Function>} pendingFns
     */
    constructor(target, pubConsts, prvConsts, pubFns, prvFns, staticFns, pendingFns) {
        this._target = target;
        this._pubConsts = pubConsts;
        this._prvConsts = prvConsts;
        this._pubFns = pubFns;
        this._prvFns = prvFns;
        this._staticFns = staticFns;
        this._pendingFns = pendingFns;

        this.pub = {
            const: (name, value) => {
                const newPubConsts = { ...this._pubConsts, [name]: value };
                return new Accessor(this._target, newPubConsts, this._prvConsts, this._pubFns, this._prvFns, this._staticFns, this._pendingFns);
            },
            fn: (name, method) => {
                this._pendingFns.set(name, method);
                const newPubFns = { ...this._pubFns, [name]: /** @type {any} */(method) };
                return new Accessor(this._target, this._pubConsts, this._prvConsts, newPubFns, this._prvFns, this._staticFns, this._pendingFns);
            }
        };

        this.prv = {
            const: (name, value) => {
                const newPrvConsts = { ...this._prvConsts, [`_${name}`]: value };
                return new Accessor(this._target, this._pubConsts, newPrvConsts, this._pubFns, this._prvFns, this._staticFns, this._pendingFns);
            },
            fn: (name, method) => {
                const privateName = `_${name}`;
                this._pendingFns.set(privateName, method);
                const newPrvFns = { ...this._prvFns, [privateName]: /** @type {any} */(method) };
                return new Accessor(this._target, this._pubConsts, this._prvConsts, this._pubFns, newPrvFns, this._staticFns, this._pendingFns);
            }
        };
    }

    /** @private */
    _applyToTarget() {
        Object.setPrototypeOf(this._target, this._staticFns);
        Object.assign(this._target, this._pubConsts, this._prvConsts);

        // Shelling phase: Ensure all functions exist on the target for runtime mutual recursion.
        for (const name of this._pendingFns.keys()) {
             /** @type {Record<string, any>} */(this._target)[name] = () => { throw new Error(`'${name}' is called before implementation binding.`); };
        }

        // Binding phase: Bind the real implementation with the now-complete target.
        for (const [name, fnBody] of this._pendingFns) {
            /** @type {Record<string, any>} */(this._target)[name] = fnBody.bind(null, this._target);
        }

        Object.freeze(this._target);
    }

    /**
    * @private
    * @description This "fake" method is for type inference only. It returns the final public shape of the object.
    * @returns {Internal.Prettify<Type.PickPublicKeys<Target & PrvConsts & PrvFns> & Readonly<PubConsts> & PubFns & StaticFns>}
    */
    _build() {
        throw new Error("This method is for type inference only and should not be called.");
    }
}

export const Impl = {};

/**
 * Applies implementation to a target object, enabling full mutual recursion for methods at runtime.
 * @template {object} TTarget The raw object from `Struct.build()`.
 * @template {Accessor<TTarget, any, any, any, any, any>} TAccessor
 * @param {TTarget} target The target object. Must be extensible.
 * @param {(builder: Accessor<TTarget, {}, {}, {}, {}, {}>) => TAccessor} implCallback
 * @returns {asserts target is ReturnType<TAccessor['_build']>}
 */
Impl.for = (target, implCallback) => {
    // A runtime check to ensure the object is not frozen.
    if (!Object.isExtensible(target)) {
        throw new Error("Impl.for target must be an extensible object.");
    }

    const initialAccessor = new Accessor(target, {}, {}, {}, {}, {}, new Map());

    const finalAccessor = implCallback(initialAccessor);

    // This applies the collected implementations to the target object.
    // @ts-ignore
    finalAccessor._applyToTarget();
};

Object.setPrototypeOf(Impl, null);
Object.setPrototypeOf(Accessor.prototype, null);