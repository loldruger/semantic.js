/**
 * @template {ReadonlyArray<any>} T
 * @typedef {T extends [infer First, ...infer Rest]
*     ? First extends Rest[number]
*         ? true
*         : Array.HasDuplication<Rest> 
*     : false
* } Array.HasDuplication<T>
*/

/**
 * @template {Array<ItemType>} Target
 * @template {ItemType} Item
 * @template [ItemType=unknown]
 * @typedef {[...Target, Item]} Array.Push<Target, Item>
 */

/**
 * @template {Array<any>} Container
 * @template Item
 * @typedef {Container extends [infer First, ...infer Rest]
 *     ? First extends Item 
 *         ? true 
 *         : Array.Contains<Rest, Item>
 *     : false
 * } Array.Contains
 */