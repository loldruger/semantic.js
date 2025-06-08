// @ts-check

/**
 * @template {ReadonlyArray<any>} T 
 * @param  {T} _ 
 * @returns {T}
 */
export const tuple = (..._) => _;


/**
 * @interface
 */
export class BaseTuple { }

/**
 * @implements {BaseTuple}
 */
export class Tuple0 {
    constructor() {
        Object.freeze(this);
    }

    static new() {
        return new Tuple0();
    }
}

/**
 * @template T1
 * @implements {BaseTuple}
 */
export class Tuple1 {
    /**
     * @param {T1} _0
     */
    constructor(_0) {
        /** @readonly */
        this._0 = _0;
        Object.freeze(this);
    }

    /**
     * @template T1
     * @param {T1} _0
     * @returns {Tuple1<T1>}
     */
    static new(_0) {
        return new Tuple1(_0);
    }
}

/**
 * @template T1, T2
 * @implements {BaseTuple}
 */
export class Tuple2 {
    /**
     * @param {T1} _0
     * @param {T2} _1
     */
    constructor(_0, _1) {
        /** @readonly */
        this._0 = _0;
        /** @readonly */
        this._1 = _1;
        Object.freeze(this);
    }

    /**
     * @template T1, T2
     * @param {T1} _0
     * @param {T2} _1
     * @returns {Tuple2<T1, T2>}
     */
    static new(_0, _1) {
        return new Tuple2(_0, _1);
    }
}

/**
 * @template T1, T2, T3
 * @implements {BaseTuple}
 */
export class Tuple3 {
    /**
     * @param {T1} _0
     * @param {T2} _1
     * @param {T3} _2
     */
    constructor(_0, _1, _2) {
        /** @readonly */
        this._0 = _0;
        /** @readonly */
        this._1 = _1;
        /** @readonly */
        this._2 = _2;
        Object.freeze(this);
    }

    /**
     * @template T1, T2, T3
     * @param {T1} _0
     * @param {T2} _1
     * @param {T3} _2
     * @returns {Readonly<Tuple3<T1, T2, T3>>}
     */
    static new(_0, _1, _2) {
        return new Tuple3(_0, _1, _2);
    }
}

/**
 * @template T1, T2, T3, T4
 * @implements {BaseTuple}
 */
export class Tuple4 {
    /**
     * @param {T1} _0
     * @param {T2} _1
     * @param {T3} _2
     * @param {T4} _3
     */
    constructor(_0, _1, _2, _3) {
        /** @readonly */
        this._0 = _0;
        /** @readonly */
        this._1 = _1;
        /** @readonly */
        this._2 = _2;
        /** @readonly */
        this._3 = _3;
        Object.freeze(this);
    }
    /**
     * @template T1, T2, T3, T4
     * @param {T1} _0
     * @param {T2} _1
     * @param {T3} _2
     * @param {T4} _3
     * @returns {Tuple4<T1, T2, T3, T4>}
     */
    static new(_0, _1, _2, _3) {
        return new Tuple4(_0, _1, _2, _3);
    }
}

/**
 * @template T1, T2, T3, T4, T5
 * @implements {BaseTuple}
 */
export class Tuple5 {
    /**
     * @param {T1} _0
     * @param {T2} _1
     * @param {T3} _2
     * @param {T4} _3
     * @param {T5} _4
     */
    constructor(_0, _1, _2, _3, _4) {
        /** @readonly */
        this._0 = _0;
        /** @readonly */
        this._1 = _1;
        /** @readonly */
        this._2 = _2;
        /** @readonly */
        this._3 = _3;
        /** @readonly */
        this._4 = _4;
        Object.freeze(this);
    }

    /**
     * @template T1, T2, T3, T4, T5
     * @param {T1} _0
     * @param {T2} _1
     * @param {T3} _2
     * @param {T4} _3
     * @param {T5} _4
     * @returns {Tuple5<T1, T2, T3, T4, T5>}
     */
    static new(_0, _1, _2, _3, _4) {
        return new Tuple5(_0, _1, _2, _3, _4);
    }
}

/**
 * @template T1, T2, T3, T4, T5, T6
 * @implements {BaseTuple}
 */
export class Tuple6 {
    /**
     * @param {T1} _0
     * @param {T2} _1
     * @param {T3} _2
     * @param {T4} _3
     * @param {T5} _4
     * @param {T6} _5
     */
    constructor(_0, _1, _2, _3, _4, _5) {
        /** @readonly */
        this._0 = _0;
        /** @readonly */
        this._1 = _1;
        /** @readonly */
        this._2 = _2;
        /** @readonly */
        this._3 = _3;
        /** @readonly */
        this._4 = _4;
        /** @readonly */
        this._5 = _5;
        Object.freeze(this);
    }

    /**
     * @template T1, T2, T3, T4, T5, T6
     * @param {T1} _0
     * @param {T2} _1
     * @param {T3} _2
     * @param {T4} _3
     * @param {T5} _4
     * @param {T6} _5
     * @returns {Tuple6<T1, T2, T3, T4, T5, T6>}
     */
    static new(_0, _1, _2, _3, _4, _5) {
        return new Tuple6(_0, _1, _2, _3, _4, _5);
    }
}