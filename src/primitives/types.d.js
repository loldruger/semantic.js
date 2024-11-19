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
*             ? Readonly<Record<Tag, T>>
*             : Readonly<Record<Tag, null>>
* } TaggedUnionType<Tag, [T]>
*/
