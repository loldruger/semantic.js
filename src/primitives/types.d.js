//@ts-check

/**
 * @template {String} Field
 * @template {ConstructableTypeUnion|Mut<ConstructableTypeUnion>} T
 * @typedef {T extends Mut<any> 
 *   ? Record<Field, ToInstanceType<T>>
 *   : Readonly<Record<Field, ToInstanceType<T>>>
 * } StructType<Field, T>
 */
