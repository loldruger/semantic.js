// @ts-check

/**
 * @template {object} Target
 * @template {ReadonlyArray<any>} Manifest
 */
class Accessor {
    /** @private */ _target;
    /** @private */ _manifest;

    /**
     * @description Public members builder
     * @type {{
     *  const: <Name extends string, Value>(name: Name, value: Value) => Accessor<Target, [...Manifest, { kind: 'pubConst', name: Name, value: Value }]>,
     *  fn: <Name extends string, M extends (self: Internal.ResolveSelfTypeForBuilder<Target, Manifest>,...args: any) => any>(name: Name, method: M) => Accessor<Target, [...Manifest, { kind: 'pubFn', name: Name, method: M }]>,
     *  async: {
     *      fn: <Name extends string, M extends (self: Internal.ResolveSelfTypeForBuilder<Target, Manifest>,...args: any) => Promise<any>>(name: Name, method: M) => Accessor<Target, [...Manifest, { kind: 'pubAsyncFn', name: Name, method: M }]>
     *  }
     * }}
     */
    pub;

    /**
     * @description Private members builder
     * @type {{
     *  const: <Name extends string, Value>(name: Name, value: Value) => Accessor<Target, [...Manifest, { kind: 'prvConst', name: `_${Name}`, value: Value }]>,
     *  fn: <Name extends string, M extends (self: Internal.ResolveSelfTypeForBuilder<Target, Manifest>,...args: any) => any>(name: Name, method: M) => Accessor<Target, [...Manifest, { kind: 'prvFn', name: `_${Name}`, method: M }]>
     * }}
     */
    prv;

    /**
     * @param {Target} target
     * @param {Manifest} manifest
     */
    constructor(target, manifest) {
        this._target = target;
        this._manifest = manifest;

        this.pub = {
            const: (name, value) => {
                const newManifest = [...this._manifest, { kind: 'pubConst', name, value }];
                return /** @type {*} */ (new Accessor(this._target, newManifest));
            },
            fn: (name, method) => {
                const newManifest = [...this._manifest, { kind: 'pubFn', name, method }];
                return /** @type {*} */ (new Accessor(this._target, newManifest));
            },
            async: {
                fn: (name, method) => {
                    const newManifest = [...this._manifest, { kind: 'pubAsyncFn', name, method }];
                    return /** @type {*} */ (new Accessor(this._target, newManifest));
                }
            }
        };

        this.prv = {
            const: (name, value) => {
                const newManifest = [...this._manifest, { kind: 'prvConst', name: `_${name}`, value }];
                return /** @type {*} */ (new Accessor(this._target, newManifest));
            },
            fn: (name, method) => {
                const newManifest = [...this._manifest, { kind: 'prvFn', name: `_${name}`, method }];
                return /** @type {*} */ (new Accessor(this._target, newManifest));
            }
        };
    }

    /** @private */
    _applyToTarget() {
        /** @type {Map<string, Function>} */
        const pendingFns = new Map();

        // 첫 번째 패스: 상수(const)를 적용하고 함수(fn)를 수집합니다.
        for (const descriptor of this._manifest) {
            if (descriptor.kind === 'pubConst' || descriptor.kind === 'prvConst') {
                Object.defineProperty(this._target, descriptor.name, {
                    value: descriptor.value,
                    writable: false,
                    enumerable: !descriptor.name.startsWith('_'),
                    configurable: true,
                });
            } else if (descriptor.kind === 'pubFn' || descriptor.kind === 'prvFn' || descriptor.kind === 'pubAsyncFn') {
                pendingFns.set(descriptor.name, descriptor.method);
            }
        }

        // 셸링(Shelling) 단계: 런타임 상호 재귀를 위해 모든 함수가 대상 객체에 존재하도록 셸(껍데기)을 만듭니다.
        for (const name of pendingFns.keys()) {
            Object.defineProperty(this._target, name, {
                value: () => { throw new Error(`'${name}' is called before implementation binding.`); },
                writable: true,
                enumerable: !name.startsWith('_'),
                configurable: true,
            });
        }

        // 바인딩(Binding) 단계: 이제 완전해진 대상 객체에 실제 구현을 바인딩합니다.
        for (const [name, fnBody] of pendingFns) {
            /** @type {Record<string, any>} */(this._target)[name] = fnBody.bind(null, this._target);
        }

        Object.freeze(this._target);
    }

    /**
     * @description Applies the implementation to the target object.
     * @returns {void}
     */
    build() {
        this._applyToTarget();
    }
}

export const Impl = {};

/**
 * 대상 객체에 대한 구현을 시작하기 위한 빌더를 반환합니다.
 *
 * @template {object} T
 * @param {Type.IsExtensible<T> extends true ? T : never} target 대상 객체. 반드시 확장 가능(extensible)해야 합니다.
 * @returns {Accessor<T, []>}
 */
Impl.for = (target) => {
    return new Accessor(target, []);
};

Object.setPrototypeOf(Impl, null);
Object.setPrototypeOf(Accessor.prototype, null);