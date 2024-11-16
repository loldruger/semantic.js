/**
 * @template {String} Tag
 * @template {AbstConcreteTypes} T
 * @typedef {IsTupleType<T> extends true
*     ? Readonly<Record<Tag, (..._: [IterInstanceType<T>]) => IterInstanceType<T>>>
*     : IsConcreteType<T> extends true
*         ? T extends AbstConcreteType
*             ? Readonly<Record<Tag, (x: InstanceType<T>) => InstanceType<T>>>
*             : never
*         : Readonly<Record<Tag, null>>
* } TaggedUnionType<Tag, [T]>
*/
