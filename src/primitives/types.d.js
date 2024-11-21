//@ts-check

/**
 * @template {String} Tag
 * @template {ConstructableTypes} T
 * @typedef {IsTupleType<T> extends true
 *     ? Readonly<Record<Tag, (..._: [ToRecursivelyInstanceType<T>]) => ToRecursivelyInstanceType<T>>>
 *     : IsConcreteType<T> extends true
 *         ? T extends AbstConcreteType
 *             ? Readonly<Record<Tag, (x: InstanceType<T>) => InstanceType<T>>>
 *             : never
 *         : IsFunctionType<T> extends true 
 *             ? T extends (...args: infer P) => infer R
 *                 ? Readonly<Record<Tag, (x: ((...args: P) => (R extends AbstConcreteType ? InstanceType<R> : R))) => (...args: P) => (R extends AbstConcreteType
 *                     ? InstanceType<R>
 *                     : R
 *                 )>>
 *                 : never
 *             : Readonly<Record<Tag, null>>
 * } TaggedUnionType<Tag, [T]>
 */
