// @ts-check

/**
 * 복잡하게 계산된 타입을 강제로 펼쳐서(expand) IDE에 예쁘게 표시합니다.
 * `& {}` 트릭을 사용하여 타입 별칭이 중첩되는 것을 방지합니다.
 * @template T
 * @typedef {{[K in keyof T]: T[K]} & {}} Prettify
 */

/**
 * @template {StructType<String, Internal.UnknownTypes>} Pubs
 * @template {StructType<String, Internal.UnknownTypes>} Prvs
 */
export class Struct {
    #pubs = /** @type {Pubs} */ (Object.create(null));
    #prvs = /** @type {Prvs} */ (Object.create(null));

    /** @private */
    constructor() { }

    /** @returns {Struct<{}, {}>} */
    static new() {
        return new Struct();
    }

    /**
     * @template {String} Name
     * @template {Internal.UnknownTypes} TypeInfo
     * @param {Name} name
     * @param {TypeInfo} type
     * @returns {Struct<Pubs, Prvs & StructType<`_${Name}`, TypeInfo>>}
     */
    // @ts-ignore
    prv(name, type) {
        /** @type {Record<string, unknown>} */(this.#prvs)[`_${name}`] = undefined;

        return /** @type {Struct<Pubs, Prvs & StructType<`_${Name}`, TypeInfo>>} */ (/** @type {unknown} */ (this));
    }

    /**
     * @template {String} Name
     * @template {Internal.UnknownTypes} TypeInfo
     * @param {Name} name
     * @param {TypeInfo} type
     * @returns {Struct<Pubs & StructType<Name, TypeInfo>, Prvs>}
     */
    // @ts-ignore
    pub(name, type) {
        /** @type {Record<string, unknown>} */(this.#pubs)[name] = undefined;

        return /** @type {Struct<Pubs & StructType<Name, TypeInfo>, Prvs>} */ (/** @type {unknown} */ (this));
    }

    /**
     * 최종적으로 평탄화된 타입의 객체를 빌드합니다.
     * @returns {Prettify<Pubs & Prvs>}
     */
    build() {
        return /** @type {Prettify<Pubs & Prvs>} */(Object.assign(this.#pubs, this.#prvs));
    }
}

Object.setPrototypeOf(Struct, null);
Object.setPrototypeOf(Struct.prototype, null);