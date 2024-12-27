/**
 * @template {ReadonlyArray<any>} T
 * @typedef {T extends [infer First, ...infer Rest]
*     ? First extends Rest[number]
*         ? true
*         : HasArrayDuplication<Rest> 
*     : false
* } HasArrayDuplication<T>
*/

/**
 * @template {Array<ItemType>} Target
 * @template {ItemType} Item
 * @template [ItemType=unknown]
 * @typedef {[...Target, Item]} PushIntoArray<Target, Item>
 */