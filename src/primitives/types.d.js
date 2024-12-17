//@ts-check

/**
 * @template {String} Field
 * @template {ConstructableTypes|ConstructableTypeUnion|Mut<ConstructableTypeUnion>} T
 * @typedef {If<IsTupleType<T>,
 *     Readonly<Record<Field, (..._: [ToInstanceType<T>]) => ToInstanceType<T>>>,
 *     IsConcreteType<T> extends true
 *         ? T extends AbstConcreteType
 *             ? Readonly<Record<Field, (x: InstanceType<T>) => InstanceType<T>>>
 *             : never
 *         : IsFunctionType<T> extends true 
 *             ? T extends (...args: infer P) => infer R
 *                 ? Readonly<Record<Field, (x: ((...args: P) => (R extends AbstConcreteType ? InstanceType<R> : R))) => (...args: P) => (R extends AbstConcreteType
 *                     ? InstanceType<R>
 *                     : R
 *                 )>>
 *                 : never
 *             : Readonly<Record<Field, null>>
 * >} StructType<Tag, [T]>
 */
