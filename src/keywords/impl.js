// @ts-check

/**
 * @template {String} Name
 * @template {Internal.AnyConstructable} Fn
 * @typedef {Record<Name, Fn>} FnMap
 */

/**
 * @template {String} [Name=String]
 * @template {unknown} [Value=unknown]
 * @typedef {Record<Name, Value>} ConstMap
 */

/**
 * 복잡하게 계산된 타입을 강제로 펼쳐서(expand) IDE에 예쁘게 표시합니다.
 * `& {}` 트릭을 사용하여 타입 별칭이 중첩되는 것을 방지합니다.
 * @template T
 * @typedef {{[K in keyof T]: T[K]} & {}} Prettify
 */

/**
 * Impl 빌더. 상태를 가지며, 메서드 체이닝을 통해 구현을 추가합니다.
 * @template {Object} Target
 * @template {ConstMap} Consts
 * @template {FnMap<String, Internal.AnyConstructable<ReadonlyArray<Internal.UnknownTypes>>>} Fns
 * @template {FnMap<String, Internal.AnyConstructable>} StaticFns
 */
class Accessor {
    pub = this;
    prv = this;
    async = this;
    /** @private */_target;
    /** @private */_consts;
    /** @private */_fns;
    /** @private */_staticFns;
    /** @type {Prettify<Readonly<Consts> & Fns & StaticFns>} */_finalImplType;

    /**
     * @param {Target} target
     * @param {Consts} consts
     * @param {Fns} fns
     * @param {StaticFns} staticFns
     */
    constructor(target, consts, fns, staticFns) {
        this._target = target; this._consts = consts; this._fns = fns; this._staticFns = staticFns;
        // @ts-ignore
        this._finalImplType = undefined;
    }
    /** 
     * @template {String} Name
     * @template Value
     * @param {Name} name
     * @param {Value} value
     * @returns {Accessor<Target, Consts & Record<Name, Value>, Fns, StaticFns>}
     **/
    const(name, value) {
        const newConsts = { ...this._consts, [name]: value };
        return new Accessor(this._target, newConsts, this._fns, this._staticFns);
    }
    /**
     * @template {String} Name
     * @template {ReadonlyArray<Internal.UnknownTypes>} T
     * @template R
     * @param {Name} name
     * @param {(self: Target, ...args: T) => R} method
     * @returns {Accessor<Target, Consts, Fns & Record<Name, (...args: T) => R>, StaticFns>}
     */
    fn(name, method) {
        const newFns = { ...this._fns, [name]: (...parameters) => method(this._target, .../** @type {T} */(parameters)) };
        return new Accessor(this._target, this._consts, newFns, this._staticFns);
    }
    /** @private */
    _applyToTarget() {
        Object.setPrototypeOf(this._target, this._staticFns);
        Object.assign(this._target, this._fns);
        Object.assign(this._target, this._consts);
        Object.freeze(this._target);
    }
}

const Impl = {};

// 2. Impl.for 함수를 정의하면서, 그 위에 완전한 JSDoc 시그니처를 직접 작성합니다.
//    (별도의 @typedef나 @type 캐스팅 없이)

/**
 * 대상 객체의 타입을 확장하고, 객체를 직접 수정합니다.
 * @template {object} TTarget
 * @template {Accessor<TTarget, any, any, any>} TAccessor
 * @param {Type.IsExtensible<TTarget> extends true ? TTarget : never} target
 * @param {(builder: Accessor<TTarget, {}, {}, {}>) => TAccessor} implCallback
 * @returns {asserts target is Prettify<(Type.IsExtensible<TTarget> extends true ? TTarget : never) & TAccessor['_finalImplType']>}
 */
Impl.for = (target, implCallback) => {
    const initialAccessor = new Accessor(target, {}, {}, {});
    const finalAccessor = implCallback(initialAccessor);
    // @ts-ignore
    finalAccessor._applyToTarget();
};

// 3. 최종 Impl 객체를 export 합니다.
Object.setPrototypeOf(Impl, null);
Object.setPrototypeOf(Accessor.prototype, null);
export { Impl };