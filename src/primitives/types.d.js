//@ts-check

/**
 * @template {String} Field
 * @template {ConstructableTypeUnion} T
 * @typedef {T extends Mut<any> 
 *   ? Record<Field, ToInstanceType<T>>
 *   : Readonly<Record<Field, ToInstanceType<T>>>
 * } StructType<Field, T>
 */
